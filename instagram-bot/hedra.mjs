// hedra.mjs — Minimaler Wrapper für die Hedra Character-3 Public API.
// Auth: X-API-Key Header (aus HEDRA_API_KEY oder .env).
// Docs: https://hedra.com/docs/openapi.json
//
// Flow für ein Sprech-Video:
//   1) createAsset({type:"image"}) -> uploadAssetFile(id, path)  -> imageAssetId
//   2) createAsset({type:"audio"}) -> uploadAssetFile(id, path)  -> audioAssetId
//   3) createGeneration({start_keyframe_id, audio_id, ai_model_id, aspect_ratio:"9:16"})
//   4) pollGenerationUntilDone(generationId) -> {asset_id, video_url}
//   5) downloadVideo(url, outPath)

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync, createReadStream } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_BASE = "https://api.hedra.com/web-app/public";
const MODEL_CACHE_FILE = join(__dirname, ".hedra-model-cache.json");

// ---- env / api-key ----
async function loadEnvFile() {
  const envPath = join(__dirname, ".env");
  if (!existsSync(envPath)) return;
  const txt = await readFile(envPath, "utf-8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
await loadEnvFile();

function getApiKey() {
  const k = process.env.HEDRA_API_KEY;
  if (!k) throw new Error(
    "HEDRA_API_KEY fehlt. Lege instagram-bot/.env an mit:\n" +
    "  HEDRA_API_KEY=sk-hedra-deinkeyhier\n" +
    "(Anleitung: HEDRA-SETUP.md)"
  );
  return k;
}

// ---- low-level HTTP ----
async function hedraFetch(path, opts = {}) {
  const url = path.startsWith("http") ? path : API_BASE + path;
  const headers = { "X-API-Key": getApiKey(), ...(opts.headers || {}) };
  const res = await fetch(url, { ...opts, headers });
  if (!res.ok) {
    let body = "";
    try { body = await res.text(); } catch {}
    throw new Error(`Hedra ${res.status} ${res.statusText} @ ${url}\n${body.slice(0, 800)}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("json") ? res.json() : res;
}

// ---- model lookup (cached) ----
export async function findCharacter3ModelId() {
  if (existsSync(MODEL_CACHE_FILE)) {
    const cache = JSON.parse(await readFile(MODEL_CACHE_FILE, "utf-8"));
    if (cache.id && cache.cached_at && (Date.now() - cache.cached_at) < 7 * 24 * 3600 * 1000) {
      return cache.id;
    }
  }
  const data = await hedraFetch("/models?types=video");
  const models = Array.isArray(data) ? data : (data.items || data.models || []);
  // Bevorzuge: Character-3 > Character > erstes Avatar-Modell mit audio-input
  const score = m => {
    const n = (m.name || "").toLowerCase();
    if (n.includes("character-3") || n.includes("character 3")) return 100;
    if (n.includes("character")) return 60;
    if (m.requires_audio_input) return 20;
    return 0;
  };
  const sorted = [...models].sort((a, b) => score(b) - score(a));
  if (!sorted.length) throw new Error("Keine Video-Modelle bei Hedra gefunden — Account-Status prüfen.");
  const pick = sorted[0];
  await writeFile(MODEL_CACHE_FILE, JSON.stringify({ id: pick.id, name: pick.name, cached_at: Date.now() }, null, 2));
  return pick.id;
}

// ---- assets ----
export async function createAsset(type, name) {
  return hedraFetch("/assets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name || `asset-${Date.now()}`, type }),
  });
}

export async function uploadAssetFile(assetId, filePath) {
  const buf = await readFile(filePath);
  const fd = new FormData();
  const ext = filePath.toLowerCase().split(".").pop();
  const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg"
             : ext === "png" ? "image/png"
             : ext === "mp3" ? "audio/mpeg"
             : ext === "wav" ? "audio/wav"
             : "application/octet-stream";
  fd.append("file", new Blob([buf], { type: mime }), basename(filePath));
  return hedraFetch(`/assets/${assetId}/upload`, { method: "POST", body: fd });
}

export async function uploadImage(filePath) {
  const a = await createAsset("image", basename(filePath));
  await uploadAssetFile(a.id, filePath);
  return a.id;
}

export async function uploadAudio(filePath) {
  const a = await createAsset("audio", basename(filePath));
  await uploadAssetFile(a.id, filePath);
  return a.id;
}

// ---- generation ----
export async function createGeneration({ imageId, audioId, modelId, textPrompt, aspectRatio = "9:16", resolution = "720p", durationSeconds }) {
  const body = {
    type: "video",
    ai_model_id: modelId,
    start_keyframe_id: imageId,
    audio_id: audioId,
    aspect_ratio: aspectRatio,
    resolution,
  };
  if (textPrompt) body.text_prompt = textPrompt;
  if (durationSeconds) body.duration_seconds = durationSeconds;
  return hedraFetch("/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function getGenerationStatus(generationId) {
  return hedraFetch(`/generations/${generationId}/status`);
}

export async function pollGenerationUntilDone(generationId, { timeoutMs = 10 * 60 * 1000, intervalMs = 5000, onTick } = {}) {
  const t0 = Date.now();
  let lastProgress = -1;
  while (true) {
    if (Date.now() - t0 > timeoutMs) throw new Error(`Hedra-Generation ${generationId}: Timeout (${timeoutMs}ms)`);
    const s = await getGenerationStatus(generationId);
    const status = (s.status || "").toLowerCase();
    if (s.progress !== undefined && s.progress !== lastProgress) {
      lastProgress = s.progress;
      onTick && onTick(s);
    }
    if (status === "complete" || status === "completed" || status === "succeeded" || status === "success") return s;
    if (status === "failed" || status === "error") {
      throw new Error(`Hedra-Generation ${generationId} fehlgeschlagen: ${JSON.stringify(s).slice(0, 600)}`);
    }
    await new Promise(r => setTimeout(r, intervalMs));
  }
}

// ---- download ----
export async function downloadVideo(url, outPath) {
  await mkdir(dirname(outPath), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download fehlgeschlagen: ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(outPath, buf);
  return outPath;
}

// ---- credits ----
export async function getCredits() {
  try { return await hedraFetch("/credits"); }
  catch (e) { return { error: e.message }; }
}

// ---- self-test (node hedra.mjs ping) ----
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/")}`) {
  const cmd = process.argv[2];
  if (cmd === "ping") {
    try {
      const credits = await getCredits();
      console.log("Credits:", JSON.stringify(credits, null, 2));
      const modelId = await findCharacter3ModelId();
      console.log("Character-3 Model-ID:", modelId);
      console.log("✓ Hedra-Verbindung OK");
    } catch (e) {
      console.error("✗ Fehler:", e.message);
      process.exit(1);
    }
  } else {
    console.log("Usage: node hedra.mjs ping   # testet Auth, listet Credits + Model-ID");
  }
}
