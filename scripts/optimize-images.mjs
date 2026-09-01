import { readdir, stat, writeFile } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = new URL("../public/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const AVIF_QUALITY = 50;
const WEBP_QUALITY = 78;
const PHOTO_EXT = new Set([".png", ".jpg", ".jpeg"]);

const WEBP_ONLY_BASENAMES = new Set([
  "portifolio",
]);

async function main() {
  const entries = await readdir(PUBLIC_DIR);
  const photos = [];
  for (const name of entries) {
    const ext = extname(name).toLowerCase();
    if (!PHOTO_EXT.has(ext)) continue;
    const full = join(PUBLIC_DIR, name);
    const s = await stat(full);
    if (!s.isFile()) continue;
    photos.push({ name, ext, full, size: s.size });
  }

  const basenameCounts = new Map();
  for (const { name } of photos) {
    const base = basename(name, extname(name));
    basenameCounts.set(base, (basenameCounts.get(base) ?? 0) + 1);
  }
  const collisions = [...basenameCounts.entries()].filter(([, count]) => count > 1);
  if (collisions.length > 0) {
    const names = collisions.map(([base]) => base).join(", ");
    throw new Error(
      `Nomes de arquivo colidindo apos remover extensao: ${names}. ` +
      `Isso faz o AVIF/WebP de um arquivo sobrescrever o outro. Renomeie um deles antes de rodar o script.`,
    );
  }

  if (photos.length === 0) {
    console.log("Nenhuma foto encontrada em public/.");
    return;
  }

  const report = [];
  for (const { name, full, size } of photos) {
    const base = basename(name, extname(name));
    const webpOnly = WEBP_ONLY_BASENAMES.has(base);
    const webpPath = join(PUBLIC_DIR, `${base}.webp`);
    const avifPath = join(PUBLIC_DIR, `${base}.avif`);

    const img = sharp(full, { failOn: "none" });
    const meta = await img.metadata();

    const webpBuf = await img
      .clone()
      .webp({ quality: WEBP_QUALITY, effort: 5, smartSubsample: true })
      .toBuffer();
    await writeFile(webpPath, webpBuf);

    let avifBuf = null;
    if (!webpOnly) {
      avifBuf = await img
        .clone()
        .avif({ quality: AVIF_QUALITY, effort: 4, chromaSubsampling: "4:4:4" })
        .toBuffer();
      await writeFile(avifPath, avifBuf);
    }

    report.push({
      original: name,
      width: meta.width,
      height: meta.height,
      originalKB: +(size / 1024).toFixed(1),
      webpKB: +(webpBuf.length / 1024).toFixed(1),
      avifKB: avifBuf ? +(avifBuf.length / 1024).toFixed(1) : null,
    });
  }

  console.log("\nResultados:");
  console.log("-".repeat(78));
  console.log(
    "original".padEnd(22) + "dim".padEnd(12) + "orig KB".padStart(10) + "webp KB".padStart(10) + "avif KB".padStart(10) + "  ganho",
  );
  console.log("-".repeat(78));
  let totalOrig = 0;
  let totalWebp = 0;
  let totalAvif = 0;
  for (const r of report) {
    const dim = `${r.width}x${r.height}`;
    const avifCell = r.avifKB != null ? r.avifKB.toFixed(1) : "-";
    const best = r.avifKB != null ? r.avifKB : r.webpKB;
    const gain = ((1 - best / r.originalKB) * 100).toFixed(0) + "%";
    console.log(
      r.original.padEnd(22) + dim.padEnd(12) + r.originalKB.toFixed(1).padStart(10) + r.webpKB.toFixed(1).padStart(10) + avifCell.padStart(10) + "  " + gain,
    );
    totalOrig += r.originalKB;
    totalWebp += r.webpKB;
    if (r.avifKB != null) totalAvif += r.avifKB;
  }
  console.log("-".repeat(78));
  const bestTotal = totalAvif || totalWebp;
  const totalGain = ((1 - bestTotal / totalOrig) * 100).toFixed(0) + "%";
  console.log(
    "TOTAL".padEnd(34) + totalOrig.toFixed(1).padStart(10) + totalWebp.toFixed(1).padStart(10) + (totalAvif || 0).toFixed(1).padStart(10) + "  " + totalGain,
  );
  console.log("");
}

main().catch((err) => {
  console.error("Falha:", err);
  process.exit(1);
});
