// generate-hedra-video.mjs — Pixar-Charakter spricht wirklich (Hedra Character-3).
//
// Pipeline pro Topic (4 Segmente):
//   1) Pollinations FLUX -> 4 Standbilder (gecacht in output/<slug>/images/)
//   2) Edge-TTS -> 4 MP3s (gecacht in output/<slug>/audio/)
//   3) Hedra: pro Segment Bild + MP3 -> Sprech-Video (1080x1920, 9:16)
//   4) ffmpeg concat -> output/<slug>/reel.mp4
//
// Usage:
//   node generate-hedra-video.mjs                       # zufälliges Thema, alle 4 Segmente
//   node generate-hedra-video.mjs spielplatz-finden     # bestimmtes Thema
//   node generate-hedra-video.mjs --dry-run             # nur 1 Segment (Credit-schonend)
//   node generate-hedra-video.mjs spielplatz-finden --segments 0,2   # nur Segment 0+2
//
// Erfordert HEDRA_API_KEY in instagram-bot/.env (siehe HEDRA-SETUP.md).

import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegStatic from "ffmpeg-static";
import { generateImage } from "./pollinations.mjs";
import {
  findCharacter3ModelId, uploadImage, uploadAudio,
  createGeneration, pollGenerationUntilDone, downloadVideo, getCredits,
} from "./hedra.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const STYLE = "modern Disney Pixar 3D animated movie style, polished CG animation, expressive characters, glossy cinematic lighting, vibrant warm colors, 9:16 vertical, no text, no logos";
const NEGATIVE_PROMPT = "close-up, portrait, cropped, subject filling the frame, macro shot, extreme zoom";
const VOICE = "de-DE-AmalaNeural";
const VOICE_RATE = "+0%";

const SCENE_SETTINGS = {
  wohnzimmer: "in a sunlit warm cozy living room with a plush sofa, arched window, houseplants, warm dusk light",
  kueche: "in a bright family kitchen with wooden table, warm morning sunlight through the window",
  kinderzimmer: "in a colorful cheerful child's bedroom with plush toys, books, soft pastel colors, sunset light",
  park: "in a vibrant sunny park with blooming flowers, soft green grass, golden afternoon sunlight",
  buero: "in a cozy home office with a wooden desk, paperwork, a green lamp, warm side light",
  garten: "in a lush family garden with flowers and a wooden bench, soft warm afternoon light",
};

// Hedra braucht den Charakter prominent (Mund sichtbar) — daher näher als FLUX-Standard, aber nicht Close-up.
const SEGMENT_MOOD = {
  hook:    "the main adult character facing the camera with a warm hopeful expression, slight smile, eyes toward viewer, upper-body framing",
  problem: "the main adult character with a worried thoughtful face, papers or a phone visible, upper-body framing",
  loesung: "the main adult character holding a glowing smartphone, bright hopeful smile, upper-body framing",
  cta:     "the main adult character smiling warmly toward the viewer, upper-body framing, golden sunset light",
};

function buildPrompt(topic, moodKey, character) {
  const setting = SCENE_SETTINGS[topic.scene] || SCENE_SETTINGS.wohnzimmer;
  const mood = SEGMENT_MOOD[moodKey] || moodKey || SEGMENT_MOOD.hook;
  return `${STYLE}. Medium shot ${setting}. Scene: ${mood}. ${character}. Character mouth visible and clear for lip-sync, neutral mouth pose, face well-lit.`;
}

function resolveCharacter(brand, topic) {
  if (!brand.cast) return brand.character;
  const ids = (topic.cast && topic.cast.length) ? topic.cast : (brand.default_cast || Object.keys(brand.cast));
  const parts = ids.map(i => brand.cast[i]).filter(Boolean);
  const anchor = brand.style_anchor ? `${brand.style_anchor}. ` : "";
  return `${anchor}Featuring: ${parts.join("; ")}`;
}

function findPython() { return process.env.PYTHON || "python"; }
function run(cmd, args, opts = {}) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: false, ...opts });
    p.on("error", rej);
    p.on("close", code => code === 0 ? res() : rej(new Error(`${cmd} exited ${code}`)));
  });
}
function seedFromString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h) % 9999999;
}
function log(...a) { console.log(`[${new Date().toISOString().slice(11,19)}]`, ...a); }

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { dryRun: false, segments: null, topicId: null };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--dry-run") out.dryRun = true;
    else if (args[i] === "--segments") out.segments = args[++i].split(",").map(n => parseInt(n, 10));
    else if (!out.topicId) out.topicId = args[i];
  }
  return out;
}

async function main() {
  const { topicId, dryRun, segments: segArg } = parseArgs();

  log("Hedra-Verbindung prüfen...");
  const credits = await getCredits();
  if (credits.error) log("  (Credits-Endpoint nicht abrufbar:", credits.error.slice(0, 100), "— fahre fort)");
  else log("  Credits:", JSON.stringify(credits));
  const modelId = await findCharacter3ModelId();
  log("  Character-3 Model-ID:", modelId);

  const topicsAll = JSON.parse(await readFile(join(__dirname, "topics.json"), "utf-8")).topics;
  const brandsCfg = JSON.parse(await readFile(join(__dirname, "brands.json"), "utf-8"));
  const topic = topicId ? topicsAll.find(t => t.id === topicId) : topicsAll[Math.floor(Math.random() * topicsAll.length)];
  if (!topic) throw new Error(`Topic "${topicId}" nicht gefunden.`);
  const brand = brandsCfg.brands[topic.brand || brandsCfg.default_brand];
  if (!brand) throw new Error(`Brand fehlt für Topic ${topic.id}.`);

  const isSituation = topic.typ === "situation";
  const segTexts = isSituation ? topic.segments : [topic.hook, topic.problem, topic.loesung, topic.cta];
  const moods = isSituation ? topic.moods : (topic.moods || ["hook", "problem", "loesung", "cta"]);

  const segIndices = dryRun ? [0] : (segArg || segTexts.map((_, i) => i));
  log(`Thema: ${topic.id} [${brand.name}] — ${segIndices.length}/${segTexts.length} Segment(e)`);

  const slug = `${new Date().toISOString().slice(0,10)}_${topic.id}_hedra`;
  const outDir = join(__dirname, "output", slug);
  const imagesDir = join(outDir, "images");
  const audioDir = join(outDir, "audio");
  const videosDir = join(outDir, "videos");
  await mkdir(imagesDir, { recursive: true });
  await mkdir(audioDir, { recursive: true });
  await mkdir(videosDir, { recursive: true });

  const character = resolveCharacter(brand, topic);
  const baseSeed = seedFromString(topic.id);

  // ---------- 1) Bilder (gecacht) ----------
  log("Stelle Standbilder bereit (Pollinations FLUX, gecacht)...");
  for (const i of segIndices) {
    const imgPath = join(imagesDir, `${i}_seg.jpg`);
    if (existsSync(imgPath)) { log(`  [${i}] (cache)`); continue; }
    log(`  [${i}] generiere...`);
    await generateImage(buildPrompt(topic, moods[i], character), imgPath, {
      width: 768, height: 1344, seed: baseSeed + i * 17,
      model: "flux", nologo: true, enhance: false, negativePrompt: NEGATIVE_PROMPT,
    });
    await new Promise(r => setTimeout(r, 16000));
  }

  // ---------- 2) TTS (gecacht) ----------
  log("Stelle TTS bereit (Edge-TTS, gecacht)...");
  const segsForTTS = segIndices
    .filter(i => !existsSync(join(audioDir, `${i}.mp3`)))
    .map(i => ({ id: String(i), text: segTexts[i], voice: VOICE, rate: VOICE_RATE }));
  if (segsForTTS.length) {
    await writeFile(join(audioDir, "_segments.json"), JSON.stringify(segsForTTS, null, 2));
    await run(findPython(), [join(__dirname, "tts.py"), audioDir, join(audioDir, "_segments.json")]);
  } else log("  (alle gecacht)");

  // ---------- 3) Hedra-Sprech-Videos ----------
  log("Sende an Hedra (parallel, mit Polling)...");
  const tasks = segIndices.map(async i => {
    const videoPath = join(videosDir, `${i}.mp4`);
    if (existsSync(videoPath)) { log(`  [${i}] (cache)`); return { i, path: videoPath }; }
    const imgPath = join(imagesDir, `${i}_seg.jpg`);
    const audPath = join(audioDir, `${i}.mp3`);
    log(`  [${i}] upload Bild + Audio...`);
    const [imageId, audioId] = await Promise.all([uploadImage(imgPath), uploadAudio(audPath)]);
    log(`  [${i}] starte Generation (image=${imageId.slice(0,8)} audio=${audioId.slice(0,8)})...`);
    const gen = await createGeneration({
      imageId, audioId, modelId,
      aspectRatio: "9:16",
      resolution: "720p",
    });
    log(`  [${i}] generation_id=${gen.id?.slice(0,8) || "?"}, warte...`);
    const done = await pollGenerationUntilDone(gen.id, {
      onTick: s => log(`    [${i}] ${(s.status||"?")} ${s.progress !== undefined ? `(${Math.round(s.progress*100)}%)` : ""}`),
    });
    const url = done.url || done.video_url || done.download_url || done.asset?.url || done.output_url;
    if (!url) throw new Error(`[${i}] Hedra-Antwort hat keine video-url:\n${JSON.stringify(done).slice(0, 600)}`);
    log(`  [${i}] download...`);
    await downloadVideo(url, videoPath);
    log(`  [${i}] ✓ ${videoPath}`);
    return { i, path: videoPath };
  });
  const results = (await Promise.all(tasks)).sort((a, b) => a.i - b.i);

  // ---------- 4) Concat ----------
  if (results.length === 1) {
    const final = join(outDir, "reel.mp4");
    await run("cmd", ["/c", "copy", "/Y", results[0].path.replace(/\//g, "\\"), final.replace(/\//g, "\\")]);
    log(`✓ Fertig (Dry-Run): ${final}`);
    return;
  }
  log("ffmpeg concat...");
  const listFile = join(outDir, "_concat.txt");
  await writeFile(listFile, results.map(r => `file '${r.path.replace(/\\/g, "/")}'`).join("\n"));
  const finalPath = join(outDir, "reel.mp4");
  await run(ffmpegStatic, [
    "-y", "-f", "concat", "-safe", "0", "-i", listFile,
    "-c", "copy", finalPath,
  ]);
  log(`✓ Fertig: ${finalPath}`);
}

main().catch(e => { console.error("✗", e.message || e); process.exit(1); });
