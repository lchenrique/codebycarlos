import "server-only";
import { DatabaseSync } from "node:sqlite";
import geoip from "geoip-lite";
import { createHmac } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";

export type AnalyticsEvent = {
  type: "pageview" | "cta" | "contact" | "lead";
  visitorId: string;
  path: string;
  referrer?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  target?: string;
};

type Row = { name: string; value: number };
type Daily = { day: string; views: number; visitors: number; contacts: number; leads: number };

let database: DatabaseSync | undefined;
let lastCleanup = 0;

function getDb() {
  if (database) return database;
  const filename = process.env.ANALYTICS_DB_PATH || path.join(process.cwd(), "data", "analytics.sqlite");
  mkdirSync(path.dirname(filename), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(filename);
  db.exec("PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;");
  db.exec([
    "CREATE TABLE IF NOT EXISTS events (",
    "id INTEGER PRIMARY KEY AUTOINCREMENT,",
    "at INTEGER NOT NULL,",
    "kind TEXT NOT NULL,",
    "visitor TEXT NOT NULL,",
    "page TEXT NOT NULL,",
    "referrer TEXT NOT NULL DEFAULT '',",
    "source TEXT NOT NULL DEFAULT '',",
    "medium TEXT NOT NULL DEFAULT '',",
    "campaign TEXT NOT NULL DEFAULT '',",
    "country TEXT NOT NULL DEFAULT '',",
    "region TEXT NOT NULL DEFAULT '',",
    "city TEXT NOT NULL DEFAULT '',",
    "device TEXT NOT NULL DEFAULT '',",
    "target TEXT NOT NULL DEFAULT ''",
    ");",
    "CREATE INDEX IF NOT EXISTS events_at_kind ON events(at, kind);",
    "CREATE INDEX IF NOT EXISTS events_visitor_at ON events(visitor, at);",
  ].join("\n"));
  database = db;
  return db;
}

function prune(db: DatabaseSync) {
  if (Date.now() - lastCleanup < 24 * 60 * 60 * 1000) return;
  lastCleanup = Date.now();
  const days = Math.max(30, Math.min(730, Number(process.env.ANALYTICS_RETENTION_DAYS) || 180));
  db.prepare("DELETE FROM events WHERE at < ?").run(Date.now() - days * 86400000);
}

function countryOf(ip: string) {
  const clean = ip.trim().replace(/^::ffff:/, "").replace(/:\d+$/, "");
  if (!clean || clean === "::1" || /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(clean)) return null;
  return geoip.lookup(clean);
}

export function collect(event: AnalyticsEvent, ip: string, userAgent: string) {
  const secret = process.env.ANALYTICS_HASH_SECRET;
  if (!secret) throw new Error("ANALYTICS_HASH_SECRET não configurado");
  const db = getDb();
  prune(db);
  const visitor = createHmac("sha256", secret).update(event.visitorId).digest("hex");
  const geo = event.type === "pageview" ? countryOf(ip) : null;
  const device = /tablet|ipad/i.test(userAgent) ? "Tablet" : /mobile|android|iphone/i.test(userAgent) ? "Celular" : "Computador";
  const referrer = event.referrer || "";
  const origin = referrer ? (() => { try { return new URL(referrer).hostname.replace(/^www\./, ""); } catch { return ""; } })() : "";
  const search = /google\./.test(origin) ? "Google" : /bing\./.test(origin) ? "Bing" : /duckduckgo\./.test(origin) ? "DuckDuckGo" : "";
  const source = event.source || search || (origin && origin !== "codebycarlos.dev" ? origin : "Direto / desconhecido");
  db.prepare("INSERT INTO events (at, kind, visitor, page, referrer, source, medium, campaign, country, region, city, device, target) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(
    Date.now(), event.type, visitor, event.path, origin, source, event.medium || "", event.campaign || "",
    geo?.country || "", geo?.region || "", geo?.city || "", device, event.target || "",
  );
}

export function overview(days: number) {
  const db = getDb();
  prune(db);
  const since = Date.now() - days * 86400000;
  const totals = db.prepare("SELECT SUM(CASE WHEN kind='pageview' THEN 1 ELSE 0 END) as views, COUNT(DISTINCT CASE WHEN kind='pageview' THEN visitor END) as visitors, SUM(CASE WHEN kind='cta' THEN 1 ELSE 0 END) as ctas, SUM(CASE WHEN kind='contact' THEN 1 ELSE 0 END) as contacts, SUM(CASE WHEN kind='lead' THEN 1 ELSE 0 END) as leads FROM events WHERE at >= ?").get(since) as {views: number | null; visitors: number; ctas: number | null; contacts: number | null; leads: number | null};
  const daily = db.prepare("SELECT date(at / 1000, 'unixepoch') as day, SUM(CASE WHEN kind='pageview' THEN 1 ELSE 0 END) as views, COUNT(DISTINCT CASE WHEN kind='pageview' THEN visitor END) as visitors, SUM(CASE WHEN kind='contact' THEN 1 ELSE 0 END) as contacts, SUM(CASE WHEN kind='lead' THEN 1 ELSE 0 END) as leads FROM events WHERE at >= ? GROUP BY day ORDER BY day").all(since) as Daily[];
  const group = (column: string, condition = "kind='pageview'") => db.prepare("SELECT COALESCE(NULLIF(" + column + ", ''), 'Não identificado') as name, count(*) as value FROM events WHERE at >= ? AND " + condition + " GROUP BY 1 ORDER BY value DESC LIMIT 8").all(since) as Row[];
  const cities = db.prepare("SELECT country || ' · ' || city as name, count(*) as value FROM events WHERE at >= ? AND kind='pageview' AND city != '' GROUP BY country, city ORDER BY value DESC LIMIT 8").all(since) as Row[];
  return {
    days, generatedAt: Date.now(),
    totals: { views: totals.views || 0, visitors: totals.visitors || 0, ctas: totals.ctas || 0, contacts: totals.contacts || 0, leads: totals.leads || 0 },
    daily, sources: group("source"), countries: group("country"), cities, devices: group("device"),
    pages: group("page"), campaigns: group("campaign", "kind='pageview' AND campaign != ''"),
    actions: group("target", "kind IN ('cta','contact','lead') AND target != ''"),
  };
}
