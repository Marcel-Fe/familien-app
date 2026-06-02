// generate-lipsync-voiceover.mjs — Voiceover-Reel mit Lip-Sync (kostenlos via Wav2Lip).
//
// Wiederverwendet die schon gerenderten Bilder + TTS aus generate-reel.mjs.
// Pipeline:
//   1) bestehende Bilder + Audio aus output/<date>_<topic>_reel/ holen (sonst frisch generieren)
//   2) lipsync.py (Wav2Lip auf HuggingFace, gratis, HF_TOKEN aus .env) -> Sprech-Clip pro Segment
//   3) ffmpeg concat aller Clips + Outro -> reel.mp4
//
// Usage:
//   node generate-lipsync-voiceover.mjs spielplatz-finden
//   node generate-lipsync-voiceover.mjs spielplatz-finden --fresh   # ignoriere _reel-Cache
//
// Erfordert HF_TOKEN in instagram-bot/.env (ist schon eingerichtet).

import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { existsSync, cpSync, readdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
import ffmpegStatic from "ffmpeg-static";
import { generateImage } from "./pollinations.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const VIEWPORT = { width: 1080, height: 1920 };
const FPS = 25;
const SEGMENT_GAP = 0.2;
const OUTRO_DURATION = 3.0;
const VOICE = "de-DE-AmalaNeural";
const VOICE_RATE = "+0%";

// Lip-Sync braucht ein klar sichtbares Gesicht — daher Medium-Shot, ein Erwachsener im Fokus.
const STYLE = "modern Disney Pixar 3D animated movie style, polished CG animation, expressive characters, glossy cinematic lighting, vibrant warm colors, 9:16 vertical, no text, no logos";
const NEGATIVE_PROMPT = "extreme close-up, two people side by side, group shot, crowd, multiple faces, side profile, looking away";

const SCENE_SETTINGS = {
  wohnzimmer: "in a sunlit warm cozy living room",
  kueche: "in a bright family kitchen with warm morning sunlight",
  kinderzimmer: "in a colorful cheerful child's bedroom",
  park: "in a vibrant sunny park with blooming flowers and soft green grass",
  buero: "in a cozy home office with a wooden desk and warm lamp",
  garten: "in a lush family garden with flowers, soft warm light",
};

const SEGMENT_MOOD = {
  hook:    "a warm hopeful expression, looking directly at the camera, gentle smile",
  problem: "a thoughtful concerned face, looking directly at the camera",
  loesung: "holding a glowing smartphone, bright hopeful smile, looking at camera",
  cta:     "smiling warmly toward the viewer, friendly inviting look",
};

function buildMediumPrompt(topic, moodKey, brand) {
  const setting = SCENE_SETTINGS[topic.scene] || SCENE_SETTINGS.wohnzimmer;
  const mood = SEGMENT_MOOD[moodKey] || moodKey || SEGMENT_MOOD.hook;
  // Charakter: nur EINE Person aus dem Cast, damit Wav2Lip ein klares Gesicht hat
  const speakerId = (topic.speaker) || (brand.default_cast && brand.default_cast[0]) || "vater";
  const character = (brand.cast && brand.cast[speakerId]) || brand.character || "";
  const anchor = brand.style_anchor || "";
  return `${STYLE}. ${anchor}. Medium shot, one person, ${setting}. ${character}. Scene: ${mood}. Face well-lit, mouth visible and closed neutrally, looking at camera, no other people in frame.`;
}

function findPython() { return process.env.PYTHON || "python"; }
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const chsDir = join(__dirname, "chrome-headless-shell");
  if (existsSync(chsDir)) {
    for (const sub of readdirSync(chsDir)) {
      const exe = join(chsDir, sub, "chrome-headless-shell-win64", "chrome-headless-shell.exe");
      if (existsSync(exe)) return exe;
    }
  }
  const c = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  for (const p of c) if (existsSync(p)) return p;
  throw new Error("Chrome/Edge nicht gefunden.");
}
function run(cmd, args, opts = {}) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: false, ...opts });
    p.on("error", rej);
    p.on("close", code => code === 0 ? res() : rej(new Error(`${cmd} exited ${code}`)));
  });
}
function runQuiet(cmd, args) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { stdio: "ignore", shell: false });
    p.on("error", rej);
    p.on("close", code => code === 0 ? res() : rej(new Error(`${cmd} exited ${code}`)));
  });
}
function log(...a) { console.log(`[${new Date().toISOString().slice(11,19)}]`, ...a); }
function seedFromString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h) % 9999999;
}

async function findExistingReelDir(topicId) {
  // Schaut im output/-Ordner nach <date>_<topic>_reel mit fertigem images/+audio/
  const outRoot = join(__dirname, "output");
  if (!existsSync(outRoot)) return null;
  const entries = await readdir(outRoot);
  const candidates = entries
    .filter(n => n.endsWith(`_${topicId}_reel`))
    .sort()
    .reverse();
  for (const c of candidates) {
    const dir = join(outRoot, c);
    if (existsSync(join(dir, "images")) && existsSync(join(dir, "audio"))) return dir;
  }
  return null;
}

async function main() {
  const args = process.argv.slice(2);
  const topicId = args.find(a => !a.startsWith("--"));
  const fresh = args.includes("--fresh");
  if (!topicId) throw new Error("Usage: node generate-lipsync-voiceover.mjs <topic-id> [--fresh]");

  const topics = JSON.parse(await readFile(join(__dirname, "topics.json"), "utf-8")).topics;
  const brandsCfg = JSON.parse(await readFile(join(__dirname, "brands.json"), "utf-8"));
  const topic = topics.find(t => t.id === topicId);
  if (!topic) throw new Error(`Topic "${topicId}" nicht gefunden.`);
  const brand = brandsCfg.brands[topic.brand || brandsCfg.default_brand];
  if (!brand) throw new Error("Brand nicht gefunden.");

  const isSituation = topic.typ === "situation";
  const segTexts = isSituation ? topic.segments : [topic.hook, topic.problem, topic.loesung, topic.cta];
  const moods = isSituation ? topic.moods : (topic.moods || ["hook", "problem", "loesung", "cta"]);

  log(`Thema: ${topic.id} [${brand.name}] — ${segTexts.length} Segmente`);

  const slug = `${new Date().toISOString().slice(0,10)}_${topic.id}_voiceover`;
  const outDir = join(__dirname, "output", slug);
  const imagesDir = join(outDir, "images");
  const audioDir = join(outDir, "audio");
  const clipsDir = join(outDir, "clips");
  const finalDir = join(outDir, "final");
  await mkdir(imagesDir, { recursive: true });
  await mkdir(audioDir, { recursive: true });
  await mkdir(clipsDir, { recursive: true });
  await mkdir(finalDir, { recursive: true });

  // ---------- 1) Bilder ----------
  // Wav2Lip braucht klare Gesichter -> Medium-Shot, EIN Sprecher pro Frame.
  // Daher NEUE Bilder mit Medium-Shot-Prompt, NICHT die _reel-Cache (Wide-Shot der Familie).
  log("Generiere Medium-Shot-Bilder für Lip-Sync (Pollinations FLUX)...");
  const baseSeed = seedFromString(topic.id + "_voiceover");
  const imagePaths = [];
  for (let i = 0; i < segTexts.length; i++) {
    const imgPath = join(imagesDir, `${i}_seg.jpg`);
    const cached = existsSync(imgPath);
    log(`  [${i+1}/${segTexts.length}]${cached ? " (cache)" : ""}`);
    if (!cached) {
      await generateImage(buildMediumPrompt(topic, moods[i], brand), imgPath, {
        width: 768, height: 1344, seed: baseSeed + i * 17,
        model: "flux", nologo: true, enhance: false, negativePrompt: NEGATIVE_PROMPT,
      });
      if (i < segTexts.length - 1) await new Promise(r => setTimeout(r, 16000));
    }
    imagePaths.push(imgPath);
  }

  // ---------- 2) TTS ----------
  // Falls ein voriger _reel-Lauf existiert + nicht --fresh -> Audio recyclen.
  const existingReel = !fresh ? await findExistingReelDir(topicId) : null;
  if (existingReel) {
    log(`Recycle TTS aus ${existingReel.split(/[\\/]/).pop()}/audio/`);
    for (let i = 0; i < segTexts.length; i++) {
      const src = join(existingReel, "audio", `${i}.mp3`);
      const dst = join(audioDir, `${i}.mp3`);
      if (existsSync(src) && !existsSync(dst)) cpSync(src, dst);
    }
  }
  const ttsMissing = segTexts.map((_, i) => i).filter(i => !existsSync(join(audioDir, `${i}.mp3`)));
  if (ttsMissing.length) {
    log(`Generiere TTS für ${ttsMissing.length} Segment(e)...`);
    const segs = ttsMissing.map(i => ({ id: String(i), text: segTexts[i], voice: VOICE, rate: VOICE_RATE }));
    const segsFile = join(audioDir, "_segments.json");
    await writeFile(segsFile, JSON.stringify(segs, null, 2));
    await run(findPython(), [join(__dirname, "tts.py"), audioDir, segsFile]);
  } else log("Alle TTS-Segmente vorhanden.");

  // ---------- 3) Wav2Lip pro Segment ----------
  const resultFile = join(clipsDir, "lipsync_result.json");
  const resume = args.includes("--resume");
  let lipsyncResult;
  if (resume && existsSync(resultFile)) {
    lipsyncResult = JSON.parse(await readFile(resultFile, "utf-8"));
    log(`Resume-Modus: ueberspringe Wav2Lip, nutze ${Object.keys(lipsyncResult).length} gecachte Ergebnisse.`);
  } else {
    log("Lip-Sync via Wav2Lip (HuggingFace, kostenlos)...");
    const jobs = segTexts.map((_, i) => ({
      id: String(i),
      image: imagePaths[i],
      audio: join(audioDir, `${i}.mp3`),
    }));
    const jobsFile = join(clipsDir, "_jobs.json");
    await writeFile(jobsFile, JSON.stringify(jobs, null, 2));
    await run(findPython(), [join(__dirname, "lipsync.py"), jobsFile, clipsDir]);
    lipsyncResult = JSON.parse(await readFile(resultFile, "utf-8"));
  }

  // ---------- 4) Pro Segment: skalieren auf 1080x1920, kleine Pause anhängen ----------
  log("Skaliere Clips auf 1080x1920 + Pause...");
  const finalClips = [];
  for (let i = 0; i < segTexts.length; i++) {
    const hasClip = lipsyncResult[String(i)] === true && existsSync(join(clipsDir, `${i}.mp4`));
    const finalClip = join(finalDir, `clip_${String(i).padStart(2,"0")}.mp4`);
    const args = ["-y"];
    if (hasClip) {
      args.push(
        "-i", join(clipsDir, `${i}.mp4`),
        "-filter_complex",
        `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,tpad=stop_mode=clone:stop_duration=${SEGMENT_GAP}[v]`,
        "-map", "[v]", "-map", "0:a",
        "-af", `apad=pad_dur=${SEGMENT_GAP},aresample=44100`,
      );
    } else {
      // Wav2Lip-Fallback: Standbild + Audio mit kleinem Ken-Burns
      const audPath = join(audioDir, `${i}.mp3`);
      args.push(
        "-loop", "1", "-i", imagePaths[i],
        "-i", audPath,
        "-filter_complex",
        `[0:v]scale=1188:2112,zoompan=z='min(zoom+0.0006,1.12)':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=${FPS},setsar=1[v]`,
        "-map", "[v]", "-map", "1:a",
        "-shortest",
        "-af", `apad=pad_dur=${SEGMENT_GAP},aresample=44100`,
      );
    }
    args.push(
      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
      "-r", String(FPS), "-c:a", "aac", "-b:a", "192k", "-ar", "44100", finalClip,
    );
    await runQuiet(ffmpegStatic, args);
    finalClips.push(finalClip);
    log(`  Clip ${i+1}/${segTexts.length} ${hasClip ? "(Lip-Sync)" : "(Standbild-Fallback)"} fertig`);
  }

  // ---------- 5) Outro ----------
  log("Outro rendern...");
  const browser = await puppeteer.launch({
    executablePath: findChrome(), headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
    defaultViewport: VIEWPORT,
  });
  let outroClip;
  try {
    const page = await browser.newPage();
    await page.setViewport({ ...VIEWPORT, deviceScaleFactor: 1 });
    const outroUrl = pathToFileURL(join(__dirname, "templates", "outro.html")).href;
    await page.goto(outroUrl, { waitUntil: "networkidle0" });
    const outroPng = join(finalDir, "_outro.png");
    await page.screenshot({ path: outroPng, type: "png" });
    outroClip = join(finalDir, `clip_${String(segTexts.length).padStart(2,"0")}_outro.mp4`);
    await runQuiet(ffmpegStatic, [
      "-y", "-loop", "1", "-i", outroPng,
      "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
      "-t", String(OUTRO_DURATION),
      "-vf", `scale=1080:1920,setsar=1,fps=${FPS}`,
      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20",
      "-c:a", "aac", "-b:a", "192k", "-ar", "44100", outroClip,
    ]);
    finalClips.push(outroClip);
  } finally {
    await browser.close();
  }

  // ---------- 6) Concat ----------
  log("Concat...");
  const concatFile = join(finalDir, "_concat.txt");
  await writeFile(concatFile, finalClips.map(f => `file '${f.replace(/\\/g,"/")}'`).join("\n"));
  const finalPath = join(outDir, "reel.mp4");
  await run(ffmpegStatic, [
    "-y", "-f", "concat", "-safe", "0", "-i", concatFile,
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
    "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", finalPath,
  ]);

  const st = await stat(finalPath);
  log(`✓ Fertig: ${finalPath}`);
  log(`  Größe: ${(st.size/1024/1024).toFixed(1)} MB`);
}

main().catch(err => { console.error("\nFEHLER:", err.message); process.exit(1); });
