import { randomBytes, scryptSync } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const filePath = process.env.ANALYTICS_DB_PATH || "/app/data/analytics.sqlite";
const folder = dirname(filePath);
const credentialFile = join(folder, ".credentials.json");
const initialPasswordFile = join(folder, "bootstrap-password.txt");

mkdirSync(folder, { recursive: true, mode: 0o700 });

let credentials;
if (existsSync(credentialFile)) {
  credentials = JSON.parse(readFileSync(credentialFile, "utf8"));
} else {
  const password = randomBytes(18).toString("base64url");
  const salt = randomBytes(16);
  credentials = {
    passwordSalt: salt.toString("hex"),
    passwordHash: scryptSync(password, salt, 64).toString("hex"),
    sessionSecret: randomBytes(32).toString("hex"),
    analyticsSecret: randomBytes(32).toString("hex"),
  };
  const staging = credentialFile + ".tmp";
  writeFileSync(staging, JSON.stringify(credentials), { mode: 0o600, flag: "wx" });
  renameSync(staging, credentialFile);
  writeFileSync(initialPasswordFile, password + "\n", { mode: 0o600, flag: "wx" });
  console.info("Admin credentials initialized. Initial password is stored at /app/data/bootstrap-password.txt. Never publish it.");
}

if (!process.env.ADMIN_PASSWORD_SALT || !process.env.ADMIN_PASSWORD_HASH) {
  process.env.ADMIN_PASSWORD_SALT = credentials.passwordSalt;
  process.env.ADMIN_PASSWORD_HASH = credentials.passwordHash;
}
process.env.ADMIN_SESSION_SECRET ||= credentials.sessionSecret;
process.env.ANALYTICS_HASH_SECRET ||= credentials.analyticsSecret;
process.env.ANALYTICS_DB_PATH ||= filePath;

await import("./server.js");
