import "server-only";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { defaultSiteSettings, siteSettingsSchema, type PublicSiteSettings } from "@/lib/public-site-settings";

let db: DatabaseSync | null = null;

function database() {
  if (db) return db;
  const filename = process.env.ANALYTICS_DB_PATH || path.join(process.cwd(), "data", "analytics.sqlite");
  mkdirSync(path.dirname(filename), { recursive: true, mode: 0o700 });
  db = new DatabaseSync(filename);
  db.exec("PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;");
  db.exec("CREATE TABLE IF NOT EXISTS site_config (id INTEGER PRIMARY KEY CHECK(id = 1), settings_json TEXT NOT NULL, updated_at INTEGER NOT NULL)");
  return db;
}

export function getPublicSiteSettings(): PublicSiteSettings {
  const row = database().prepare("SELECT settings_json FROM site_config WHERE id=1").get() as {settings_json:string} | undefined;
  if (!row) return siteSettingsSchema.parse(defaultSiteSettings);
  const saved = JSON.parse(row.settings_json) as unknown;
  // Novos campos adicionados em versões futuras recebem os valores padrão.
  return siteSettingsSchema.parse({ ...defaultSiteSettings, ...(saved && typeof saved === "object" ? saved : {}) });
}

export function updatePublicSiteSettings(settings: PublicSiteSettings) {
  const valid = siteSettingsSchema.parse(settings);
  database().prepare("INSERT INTO site_config(id,settings_json,updated_at) VALUES(1,?,?) ON CONFLICT(id) DO UPDATE SET settings_json=excluded.settings_json,updated_at=excluded.updated_at")
    .run(JSON.stringify(valid), Date.now());
  return valid;
}
