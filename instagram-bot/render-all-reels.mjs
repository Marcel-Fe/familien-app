// render-all-reels.mjs — Rendert alle Topics mit existierendem Bild/TTS-Cache
// neu (mit aktuellem Template) und kopiert das fertige reel.mp4 in einen
// Sammelordner mit sprechenden Namen. Format 1080x1920 mp4 = Instagram Reels,
// TikTok, WhatsApp Status, YouTube Shorts — überall direkt verwendbar.
//
// Usage:
//   node render-all-reels.mjs                  # alle gecachten Topics
//   node render-all-reels.mjs --all            # auch ungecachte (langsam!)
//   node render-all-reels.mjs --only kindergeld-antrag,wohngeld-check
//
// Ergebnis: instagram-bot/reels-fertig/<topic-id>.mp4 + README.md mit Übersicht.

import { readFile, writeFile, mkdir, copyFile, stat, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const TODAY = new Date().toISOString().slice(0, 10);

// Kopiert Bilder/Audio aus altem _reel-Ordner in den heutigen Slug-Ordner,
// damit generate-reel.mjs nicht alles neu generiert (FLUX-Rate-Limit + API hängt).
async function primeCacheForToday(topicId, outputDir) {
  const entries = existsSync(outputDir) ? await readdir(outputDir) : [];
  const todayDir = join(outputDir, `${TODAY}_${topicId}_reel`);
  const older = entries
    .filter(n => n.endsWith(`_${topicId}_reel`) && !n.startsWith(TODAY))
    .sort()
    .reverse();
  for (const o of older) {
    const srcImages = join(outputDir, o, "images");
    const srcAudio = join(outputDir, o, "audio");
    if (!existsSync(srcImages) || !existsSync(srcAudio)) continue;
    const dstImages = join(todayDir, "images");
    const dstAudio = join(todayDir, "audio");
    await mkdir(dstImages, { recursive: true });
    await mkdir(dstAudio, { recursive: true });
    let copied = 0;
    for (const f of await readdir(srcImages)) {
      const dst = join(dstImages, f);
      if (!existsSync(dst)) { await copyFile(join(srcImages, f), dst); copied++; }
    }
    for (const f of await readdir(srcAudio)) {
      const dst = join(dstAudio, f);
      if (!existsSync(dst)) { await copyFile(join(srcAudio, f), dst); copied++; }
    }
    return { from: o, copied };
  }
  return null;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "output");
const COLLECT_DIR = join(__dirname, "reels-fertig");

function log(...a) { console.log(`[${new Date().toISOString().slice(11,19)}]`, ...a); }
function runReel(topicId) {
  return new Promise(resolve => {
    const p = spawn("node", [join(__dirname, "generate-reel.mjs"), topicId],
      { stdio: "inherit", shell: false });
    p.on("close", code => resolve(code === 0));
    p.on("error", () => resolve(false));
  });
}

async function findLatestReelDir(topicId) {
  if (!existsSync(OUTPUT_DIR)) return null;
  const entries = await readdir(OUTPUT_DIR);
  const matches = entries.filter(n => n.endsWith(`_${topicId}_reel`)).sort().reverse();
  for (const m of matches) {
    const dir = join(OUTPUT_DIR, m);
    if (existsSync(join(dir, "reel.mp4"))) return dir;
  }
  return null;
}

async function hasCache(topicId) {
  if (!existsSync(OUTPUT_DIR)) return false;
  const entries = await readdir(OUTPUT_DIR);
  for (const m of entries.filter(n => n.endsWith(`_${topicId}_reel`))) {
    const imagesDir = join(OUTPUT_DIR, m, "images");
    if (existsSync(imagesDir)) {
      const imgs = (await readdir(imagesDir)).filter(f => f.endsWith(".jpg"));
      if (imgs.length >= 4) return true;
    }
  }
  return false;
}

async function main() {
  const args = process.argv.slice(2);
  const renderAll = args.includes("--all");
  const onlyArg = args.find(a => a.startsWith("--only"));
  const only = onlyArg ? (onlyArg.split("=")[1] || args[args.indexOf(onlyArg) + 1] || "").split(",").filter(Boolean) : null;

  const topicsAll = JSON.parse(await readFile(join(__dirname, "topics.json"), "utf-8")).topics;
  const brandsCfg = JSON.parse(await readFile(join(__dirname, "brands.json"), "utf-8"));
  const defaultBrand = brandsCfg.default_brand || "familie";

  // Auswahl: only > cached > all
  let queue = [];
  if (only) {
    queue = topicsAll.filter(t => only.includes(t.id));
  } else {
    for (const t of topicsAll) {
      if (renderAll || await hasCache(t.id)) queue.push(t);
    }
  }

  // Skip-Logik: Topics, deren reels-fertig/<id>.mp4 schon existiert, ueberspringen
  // (Batch kann nach Hängern neu gestartet werden, ohne von vorn anzufangen).
  if (!only) {
    const before = queue.length;
    queue = queue.filter(t => !existsSync(join(COLLECT_DIR, `${t.id}.mp4`)));
    if (queue.length < before) log(`Skip-Cache: ${before - queue.length} bereits fertige Reels uebersprungen.`);
  }

  log(`${queue.length} Topics in Queue (von ${topicsAll.length} insgesamt).`);

  await mkdir(COLLECT_DIR, { recursive: true });

  const results = [];
  for (let i = 0; i < queue.length; i++) {
    const t = queue[i];
    console.log(`\n========== [${i + 1}/${queue.length}] ${t.id} ==========`);
    const primed = await primeCacheForToday(t.id, OUTPUT_DIR);
    if (primed) log(`Cache aus ${primed.from} uebernommen (${primed.copied} Dateien).`);
    const ok = await runReel(t.id);
    let collected = false;
    if (ok) {
      const dir = await findLatestReelDir(t.id);
      if (dir) {
        const src = join(dir, "reel.mp4");
        const dst = join(COLLECT_DIR, `${t.id}.mp4`);
        try { await copyFile(src, dst); collected = true; } catch (e) { log("Copy-Fehler:", e.message); }
      }
    }
    results.push({ topic: t, ok, collected });
    log(`${ok ? "✓" : "✗"} ${t.id} ${collected ? "(kopiert)" : ""}`);
  }

  // README
  const readmeLines = [
    "# Fertige Reels — FamilienApp Instagram-Bot",
    "",
    `Stand: ${new Date().toISOString().slice(0,16).replace("T"," ")} — ${results.filter(r => r.collected).length} Reels`,
    "",
    "Alle Dateien sind 1080x1920 MP4 (9:16). Direkt nutzbar für **Instagram Reels**,",
    "**TikTok**, **YouTube Shorts** und **WhatsApp Status**.",
    "",
  ];
  // Gruppiere nach Brand
  const byBrand = {};
  for (const r of results.filter(r => r.collected)) {
    const brandId = r.topic.brand || defaultBrand;
    const brandName = brandsCfg.brands[brandId]?.name || brandId;
    if (!byBrand[brandName]) byBrand[brandName] = [];
    byBrand[brandName].push(r.topic);
  }
  for (const [brand, items] of Object.entries(byBrand)) {
    readmeLines.push(`## ${brand}`, "");
    for (const t of items) {
      const headline = t.hook || (t.segments && t.segments[0]) || "";
      readmeLines.push(`- **[${t.id}.mp4](${t.id}.mp4)** — ${headline.slice(0, 90)}`);
    }
    readmeLines.push("");
  }
  const failed = results.filter(r => !r.ok || !r.collected);
  if (failed.length) {
    readmeLines.push("## ⚠ Nicht gerendert / fehlgeschlagen", "");
    for (const r of failed) readmeLines.push(`- ${r.topic.id}`);
    readmeLines.push("");
  }
  await writeFile(join(COLLECT_DIR, "README.md"), readmeLines.join("\n"), "utf-8");

  console.log("\n========== BATCH FERTIG ==========");
  console.log(`  ${results.filter(r => r.collected).length} Reels in ${COLLECT_DIR}`);
  console.log(`  ${results.filter(r => !r.collected).length} fehlgeschlagen`);
  console.log(`  README: ${join(COLLECT_DIR, "README.md")}`);
}

main().catch(e => { console.error("FEHLER:", e.message); process.exit(1); });
