// post-to-instagram.mjs — lädt ein fertiges Reel zu Instagram hoch.
//
// Voraussetzungen (siehe INSTAGRAM-SETUP.md):
//   - Instagram Business/Creator Account
//   - Mit einer Facebook-Seite verknüpft
//   - Meta Developer App registriert
//   - Long-Lived Access Token + IG Business Account ID
//   - Video muss öffentlich per HTTPS erreichbar sein
//     (z.B. Cloudflare R2, Imgur, oder eigener Webserver)
//
// .env Datei im instagram-bot/ Ordner mit:
//   IG_ACCESS_TOKEN=EAAB...
//   IG_BUSINESS_ID=17841...
//   VIDEO_PUBLIC_BASE=https://deine-domain.example.com/reels
//
// Usage:
//   node post-to-instagram.mjs <slug>          # interaktiv mit Bestätigung
//   node post-to-instagram.mjs <slug> --auto   # ohne Rückfrage posten

import { readFile, access } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function loadEnv() {
  const envPath = join(__dirname, ".env");
  if (!existsSync(envPath)) {
    console.error("Keine .env Datei gefunden. Lege " + envPath + " an. Siehe INSTAGRAM-SETUP.md");
    process.exit(2);
  }
  const txt = await readFile(envPath, "utf-8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

async function confirm(question) {
  const rl = createInterface({ input, output });
  const answer = await rl.question(question + " [j/n] ");
  rl.close();
  return /^j(a)?$/i.test(answer.trim());
}

async function igRequest(path, params, method = "POST") {
  const url = new URL(`https://graph.facebook.com/v21.0${path}`);
  if (method === "GET") {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  }
  const body = method === "POST" ? new URLSearchParams(params).toString() : undefined;
  const res = await fetch(url.toString(), {
    method,
    headers: method === "POST" ? { "Content-Type": "application/x-www-form-urlencoded" } : {},
    body,
  });
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(`Instagram API Fehler: ${JSON.stringify(data.error || data)}`);
  }
  return data;
}

async function waitForReady(creationId, token) {
  for (let i = 0; i < 60; i++) {
    const status = await igRequest(`/${creationId}`, {
      fields: "status_code,status",
      access_token: token,
    }, "GET");
    process.stdout.write(`\r  Status: ${status.status_code}     `);
    if (status.status_code === "FINISHED") {
      process.stdout.write("\n");
      return;
    }
    if (status.status_code === "ERROR" || status.status_code === "EXPIRED") {
      throw new Error(`Container-Fehler: ${JSON.stringify(status)}`);
    }
    await new Promise(r => setTimeout(r, 5000));
  }
  throw new Error("Container wurde nicht fertig (Timeout)");
}

async function main() {
  const slug = process.argv[2];
  const isAuto = process.argv.includes("--auto");
  if (!slug) {
    console.error("Usage: node post-to-instagram.mjs <slug> [--auto]");
    console.error("Slug = Ordnername aus output/ (z.B. 2026-05-12_kindergeld-antrag)");
    process.exit(2);
  }

  await loadEnv();
  const token = process.env.IG_ACCESS_TOKEN;
  const igId = process.env.IG_BUSINESS_ID;
  const publicBase = process.env.VIDEO_PUBLIC_BASE;
  if (!token || !igId || !publicBase) {
    console.error("In .env fehlt: IG_ACCESS_TOKEN, IG_BUSINESS_ID oder VIDEO_PUBLIC_BASE");
    process.exit(2);
  }

  const dir = join(__dirname, "output", slug);
  const videoLocal = join(dir, "reel.mp4");
  const captionPath = join(dir, "caption.txt");
  try { await access(videoLocal); } catch {
    console.error(`Video nicht gefunden: ${videoLocal}`);
    process.exit(2);
  }
  const caption = await readFile(captionPath, "utf-8");
  const videoUrl = `${publicBase.replace(/\/$/, "")}/${slug}/reel.mp4`;

  console.log("──────────────────────────────────────");
  console.log("📲 Instagram Reel hochladen");
  console.log("──────────────────────────────────────");
  console.log("Slug:        " + slug);
  console.log("Video-URL:   " + videoUrl);
  console.log("Caption:");
  console.log(caption.split("\n").map(l => "  " + l).join("\n"));
  console.log("──────────────────────────────────────");

  if (!isAuto) {
    const ok = await confirm("Soll dieses Reel veröffentlicht werden?");
    if (!ok) {
      console.log("Abgebrochen.");
      return;
    }
  }

  // Hinweis: Video muss schon per HTTPS unter videoUrl verfügbar sein.
  console.log("\n[1/3] Container erstellen...");
  const container = await igRequest(`/${igId}/media`, {
    media_type: "REELS",
    video_url: videoUrl,
    caption,
    share_to_feed: "true",
    access_token: token,
  });
  console.log("    Container-ID: " + container.id);

  console.log("[2/3] Warte bis Video verarbeitet ist (kann 1-3 min dauern)...");
  await waitForReady(container.id, token);

  console.log("[3/3] Veröffentlichen...");
  const publish = await igRequest(`/${igId}/media_publish`, {
    creation_id: container.id,
    access_token: token,
  });
  console.log("✓ Veröffentlicht. Media-ID: " + publish.id);
}

main().catch(err => {
  console.error("\nFEHLER:", err.message);
  process.exit(1);
});
