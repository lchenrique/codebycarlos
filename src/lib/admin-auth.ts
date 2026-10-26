import "server-only";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "cbc_admin_session";
const attempts = new Map<string, { count: number; until: number }>();

export function loginAllowed(ip: string) {
  const record = attempts.get(ip);
  return !record || Date.now() > record.until || record.count < 6;
}

export function registerFailure(ip: string) {
  const current = attempts.get(ip);
  if (!current || Date.now() > current.until) attempts.set(ip, { count: 1, until: Date.now() + 15 * 60000 });
  else current.count++;
}

export function clearFailures(ip: string) {
  attempts.delete(ip);
}

export function passwordMatches(input: string) {
  const salt = process.env.ADMIN_PASSWORD_SALT;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!salt || !hash || input.length > 256) return false;
  try {
    const expected = Buffer.from(hash, "hex");
    const actual = scryptSync(input, Buffer.from(salt, "hex"), expected.length);
    return expected.length > 0 && timingSafeEqual(expected, actual);
  } catch { return false; }
}

function signature(payload: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("ADMIN_SESSION_SECRET ausente");
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSession() {
  const expires = Date.now() + 7 * 86400000;
  const payload = String(expires);
  return payload + "." + signature(payload);
}

export function validSession(cookie: string | undefined) {
  if (!cookie || !/^\d{13}\.[A-Za-z0-9_-]+$/.test(cookie)) return false;
  const [expires, received] = cookie.split(".");
  if (Number(expires) <= Date.now()) return false;
  try {
    const expected = Buffer.from(signature(expires));
    const supplied = Buffer.from(received);
    return expected.length === supplied.length && timingSafeEqual(expected, supplied);
  } catch { return false; }
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const source = new URL(origin);
    const url = new URL(request.url);
    // Next.js may see HTTP internally when HTTPS terminates at the Coolify reverse proxy.
    const host = (request.headers.get("x-forwarded-host") || request.headers.get("host") || url.host).split(",")[0].trim();
    const protocol = (request.headers.get("x-forwarded-proto") || url.protocol.slice(0, -1)).split(",")[0].trim();
    return source.host.toLowerCase() === host.toLowerCase() && source.protocol === protocol + ":";
  } catch { return false; }
}
