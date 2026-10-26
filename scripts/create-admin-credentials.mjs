import { randomBytes, scryptSync } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const password = randomBytes(18).toString("base64url");
const salt = randomBytes(16);
const file = resolve(process.cwd(), ".env.local");
const existing = existsSync(file) ? readFileSync(file, "utf8") : "";
const getExisting = (key) => existing.split(/\r?\n/).find((line) => line.startsWith(key + "="))?.split("=").slice(1).join("=");
const values = {
  ADMIN_PASSWORD_SALT: salt.toString("hex"),
  ADMIN_PASSWORD_HASH: scryptSync(password, salt, 64).toString("hex"),
  ADMIN_SESSION_SECRET: getExisting("ADMIN_SESSION_SECRET") || randomBytes(32).toString("hex"),
  ANALYTICS_HASH_SECRET: getExisting("ANALYTICS_HASH_SECRET") || randomBytes(32).toString("hex"),
};

if (process.argv.includes("--write-local")) {
  const lines = existing.split(/\r?\n/).filter((line) => !Object.keys(values).some((key) => line.startsWith(key + "=")));
  writeFileSync(file, lines.filter(Boolean).join("\n") + "\n" + Object.entries(values).map(([key, value]) => key + "=" + value).join("\n") + "\n", { mode: 0o600 });
  console.log("Credenciais salvas em .env.local (não versionar).");
} else {
  console.log(Object.entries(values).map(([key, value]) => key + "=" + value).join("\n"));
}
console.log("SENHA_TEMPORARIA=" + password);
console.log("Troque-a repetindo este comando após o primeiro acesso.");
