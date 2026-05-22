// auto-post.mjs — veröffentlicht automatisch das nächste fertige Reel.
//
// Sucht in output/ das älteste gerenderte, noch nicht gepostete Reel,
// wartet einen zufälligen "menschlichen" Versatz ab und lädt es über
// post-to-instagram.mjs hoch. Gedacht für einen täglichen Aufruf per
// Windows-Aufgabenplanung (siehe AUTO-POST-SETUP.md).
//
// Voraussetzung: .env vollständig ausgefüllt + Video-Hosting eingerichtet
// (siehe INSTAGRAM-SETUP.md). Ohne .env bricht das Skript sauber ab.
//
// Usage:
//   node auto-post.mjs             1 Reel posten (Versatz 0-25 Min)
//   node auto-post.mjs --now       sofort posten, ohne Versatz
//   node auto-post.mjs --dry-run   nur anzeigen, was gepostet würde
//   node auto-post.mjs --status    Warteschlange + Verlauf anzeigen

import { readFile, writeFile, appendFile } from "node:fs/promises";
import { existsSync, readdirSync, statSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATE_FILE = join(__dirname, "post-state.json");
const LOG_FILE = join(__dirname, "auto-post.log");
const OUTPUT_DIR = join(__dirname, "output");
const MAX_JITTER_MIN = 25;

function ts() { return new Date().toISOString().slice(0, 19).replace("T", " "); }

async function log(msg) {
  const line = `[${ts()}] ${msg}`;
  console.log(line);
  try { await appendFile(LOG_FILE, line + "\n"); } catch { /* Log ist optional */ }
}

// .env wird wie in post-to-instagram.mjs geparst (gleiches Format).
async function loadEnv() {
  const envPath = join(__dirname, ".env");
  if (!existsSync(envPath)) return false;
  const txt = await readFile(envPath, "utf-8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return true;
}

async function loadState() {
  if (!existsSync(STATE_FILE)) return { posted: [] };
  try { return JSON.parse(await readFile(STATE_FILE, "utf-8")); }
  catch { return { posted: [] }; }
}

async function saveState(state) {
  await writeFile(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
}

// Fertige Reels in output/: Ordner *_reel mit reel.mp4 UND caption.txt.
function findReels() {
  if (!existsSync(OUTPUT_DIR)) return [];
  return readdirSync(OUTPUT_DIR)
    .filter(name => name.endsWith("_reel"))
    .filter(name => {
      const d = join(OUTPUT_DIR, name);
      return statSync(d).isDirectory()
        && existsSync(join(d, "reel.mp4"))
        && existsSync(join(d, "caption.txt"));
    })
    .sort(); // Ordnernamen beginnen mit ISO-Datum -> chronologische Reihenfolge
}

function buildQueue(state) {
  const done = new Set(state.posted.map(p => p.slug));
  return findReels().filter(slug => !done.has(slug));
}

// Token-Ablauf prüfen — nur eine Warnung, kein Abbruch.
async function checkToken(token) {
  try {
    const url = "https://graph.facebook.com/v21.0/debug_token"
      + `?input_token=${encodeURIComponent(token)}`
      + `&access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url);
    const exp = (await res.json())?.data?.expires_at;
    if (!exp) return;
    const daysLeft = Math.round((exp * 1000 - Date.now()) / 86400000);
    if (daysLeft <= 0) {
      await log("⚠️  ACCESS TOKEN ABGELAUFEN — bitte erneuern (INSTAGRAM-SETUP.md Teil 5).");
    } else if (daysLeft <= 7) {
      await log(`⚠️  Access Token läuft in ${daysLeft} Tagen ab — bald erneuern.`);
    }
  } catch { /* Netzwerk-/Formatfehler hier egal — nur ein Hinweis */ }
}

function postReel(slug) {
  return new Promise(resolve => {
    const p = spawn("node", [join(__dirname, "post-to-instagram.mjs"), slug, "--auto"],
      { stdio: "inherit", shell: false });
    p.on("close", code => resolve(code === 0));
    p.on("error", () => resolve(false));
  });
}

async function main() {
  const args = process.argv.slice(2);
  const isStatus = args.includes("--status");
  const isDry = args.includes("--dry-run");
  const isNow = args.includes("--now");

  const state = await loadState();
  const pending = buildQueue(state);

  if (isStatus) {
    console.log(`Gepostet: ${state.posted.length}   In Warteschlange: ${pending.length}\n`);
    console.log("Nächste in der Warteschlange:");
    if (!pending.length) console.log("  (leer — neue Reels rendern)");
    pending.slice(0, 10).forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
    console.log("\nZuletzt gepostet:");
    if (!state.posted.length) console.log("  (noch nichts)");
    state.posted.slice(-5).reverse().forEach(p => console.log(`  ${p.at}  ${p.slug}`));
    return;
  }

  if (pending.length === 0) {
    await log("Warteschlange leer — kein Reel zu posten. Erst neue Reels rendern.");
    return;
  }
  const slug = pending[0];

  if (isDry) {
    await log(`[dry-run] Würde posten: ${slug}  (${pending.length} in der Warteschlange)`);
    return;
  }

  if (!(await loadEnv())) {
    await log("Keine .env gefunden — Setup unvollständig. Siehe INSTAGRAM-SETUP.md.");
    process.exit(2);
  }
  const token = process.env.IG_ACCESS_TOKEN;
  if (!token || !process.env.IG_BUSINESS_ID || !process.env.VIDEO_PUBLIC_BASE) {
    await log("In .env fehlt IG_ACCESS_TOKEN, IG_BUSINESS_ID oder VIDEO_PUBLIC_BASE.");
    process.exit(2);
  }

  await checkToken(token);

  if (!isNow) {
    const jitterMs = Math.floor(Math.random() * MAX_JITTER_MIN * 60 * 1000);
    await log(`Menschlicher Versatz: warte ${Math.round(jitterMs / 60000)} Min, dann poste "${slug}".`);
    await new Promise(r => setTimeout(r, jitterMs));
  }

  await log(`Poste Reel: ${slug}`);
  const ok = await postReel(slug);
  if (ok) {
    state.posted.push({ slug, at: ts() });
    await saveState(state);
    await log(`✓ Gepostet: ${slug}  (noch ${pending.length - 1} in der Warteschlange)`);
  } else {
    await log(`✗ FEHLER beim Posten von ${slug} — nicht als gepostet markiert, nächster Lauf versucht es erneut.`);
    process.exit(1);
  }
}

main().catch(async err => {
  await log("FEHLER: " + (err?.message || err));
  process.exit(1);
});
