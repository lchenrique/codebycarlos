// Build de export estatico com output: export + unoptimized.
// Preserva o next.config.js original (faz backup, modifica, builda, restaura).
// Limpa a rota /api/send (nao funciona em estatico).
// O resultado fica em ./out

import { readFile, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const CONFIG = resolve(ROOT, "next.config.js");
const OUT = resolve(ROOT, "out");

const ORIGINAL = await readFile(CONFIG, "utf8");
const EXPORT_CONFIG = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true, formats: ["image/avif", "image/webp"] },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "@gsap/react"],
  },
};

module.exports = nextConfig;
`;

function run(cmd, args) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { stdio: "inherit", cwd: ROOT, shell: true });
    p.on("exit", (code) => (code === 0 ? res() : rej(new Error(`${cmd} exited ${code}`))));
  });
}

try {
  await writeFile(CONFIG, EXPORT_CONFIG, "utf8");
  console.log("next.config.js -> modo export");

  if (existsSync(OUT)) {
    await rm(OUT, { recursive: true, force: true });
  }

  await run("npx", ["next", "build"]);

  const apiDir = resolve(OUT, "api");
  if (existsSync(apiDir)) {
    await rm(apiDir, { recursive: true, force: true });
    console.log("removido out/api/");
  }

  console.log(`\nArtefato em: ${OUT}`);
  const fsp = await import("node:fs/promises");
  for (const entry of await fsp.readdir(OUT)) {
    console.log("  " + entry);
  }
} finally {
  await writeFile(CONFIG, ORIGINAL, "utf8");
  console.log("\nnext.config.js restaurado");
}
