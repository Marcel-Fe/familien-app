// generate-reel.mjs — FamilienApp Instagram-Reel (Voiceover-Stil)
//
// Profi-Reel-Format: EINE warme Stimme erzählt, schöne Pixar-3D-Bilder,
// kräftige Zoom-Punch-Animation, animierte Karaoke-Untertitel (Wort für Wort
// synchron zur Stimme), Outro. Optimiert für Instagram-Reach.
//
// Usage:
//   node generate-reel.mjs                 # zufälliges Thema
//   node generate-reel.mjs wohngeld-check  # bestimmtes Thema
//   node generate-reel.mjs --list

import { readFile, writeFile, mkdir, rm, stat } from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer-core";
import ffmpegStatic from "ffmpeg-static";
import { generateImage } from "./pollinations.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FPS = 25;
const VIEWPORT = { width: 1080, height: 1920 };
const INTRO_PAUSE = 0.25;
const OUTRO_DURATION = 3.0;
const SEGMENT_GAP = 0.18;

// Eine warme, natürliche deutsche Erzählerin
const VOICE = "de-DE-SeraphinaMultilingualNeural";

// Charakter-Beschreibungen kommen ab jetzt aus brands.json (Multi-Brand-Setup).
// Hier nur noch der stilistische Anstrich, der für ALLE Marken gilt.
const STYLE = "Pixar 3D animated movie style, Disney animation aesthetic, cinematic 3D render, expressive cartoon characters with soft round features, smooth volumetric shading, big eyes with bright catchlights, warm cinematic lighting, soft golden hour glow, vibrant warm pastel color palette, depth of field, ultra detailed Pixar quality, wholesome scene, 9:16 vertical composition, no text, no logos, no watermark";

const SCENE_SETTINGS = {
  wohnzimmer: "in a sunlit warm Pixar-style cozy living room with a plush sofa, arched window, houseplants, warm dusk light",
  kueche: "in a bright Pixar-style family kitchen with wooden table, warm morning sunlight through the window",
  kinderzimmer: "in a colorful Pixar-style cheerful child's bedroom with plush toys, books, soft pastel colors, sunset light",
  park: "in a vibrant Pixar-style sunny park with blooming flowers, soft green grass, golden afternoon sunlight",
  buero: "in a cozy Pixar-style home office with a wooden desk, paperwork, a green lamp, warm side light",
};
const SEGMENT_MOOD = {
  hook:    "the whole family gathered together looking warmly toward the viewer, hopeful inviting expressions, the dog wagging its tail",
  problem: "the parents with worried thoughtful faces, official letters and bills on the table, the daughter quiet in the background, soft warm light",
  loesung: "the family gathered closely around a glowing smartphone, bright hopeful happy smiles, soft magical glow on their faces",
  cta:     "the family laughing and hugging together joyfully, the father holding a smartphone, the dog jumping happily, golden sunset light",
};

function buildPrompt(topic, moodOrKey, brandCharacter) {
  const setting = SCENE_SETTINGS[topic.scene] || SCENE_SETTINGS.wohnzimmer;
  // moodOrKey: App-Segment-Key (hook/problem/...) ODER freier Mood-Text (Situations-Reel)
  const mood = SEGMENT_MOOD[moodOrKey] || moodOrKey || SEGMENT_MOOD.hook;
  return `${brandCharacter}, ${setting}, ${mood}. ${STYLE}`;
}

// ---------- helpers ----------
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  // Dedizierter, heruntergeladener chrome-headless-shell (keine Kollision mit System-Browser)
  const chsDir = join(__dirname, "chrome-headless-shell");
  if (existsSync(chsDir)) {
    for (const sub of readdirSync(chsDir)) {
      const exe = join(chsDir, sub, "chrome-headless-shell-win64", "chrome-headless-shell.exe");
      if (existsSync(exe)) return exe;
    }
  }
  // Fallback: System-Browser
  const c = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Users\\" + process.env.USERNAME + "\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  for (const p of c) if (existsSync(p)) return p;
  throw new Error("Chrome/Edge nicht gefunden. Setze CHROME_PATH.");
}
function findPython() { return process.env.PYTHON || "python"; }
function run(cmd, args, opts = {}) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: false, ...opts });
    p.on("error", rej);
    p.on("close", code => code === 0 ? res() : rej(new Error(`${cmd} exited ${code}`)));
  });
}
function pad(n, w = 5) { return String(n).padStart(w, "0"); }
function log(...a) { console.log(`[${new Date().toISOString().slice(11,19)}]`, ...a); }
function seedFromString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h) % 9999999;
}
async function silentMp3(path, seconds) {
  await run(ffmpegStatic, [
    "-y", "-f", "lavfi", "-i", "anullsrc=channel_layout=mono:sample_rate=24000",
    "-t", String(seconds), "-c:a", "libmp3lame", "-b:a", "64k", path,
  ], { stdio: "ignore" });
}

// ---------- main ----------
async function main() {
  const arg = process.argv[2];
  const topics = JSON.parse(await readFile(join(__dirname, "topics.json"), "utf-8")).topics;
  const brandsCfg = JSON.parse(await readFile(join(__dirname, "brands.json"), "utf-8"));
  const defaultBrand = brandsCfg.default_brand || "familie";

  if (arg === "--list") {
    for (const t of topics) {
      const brandId = t.brand || defaultBrand;
      const brandTag = `[${(brandsCfg.brands[brandId]?.name || brandId).padEnd(11)}]`;
      const typTag = t.typ === "situation" ? "[Situation]" : "[App]      ";
      console.log(`  ${brandTag} ${typTag} ${t.id.padEnd(28)} ${t.hook || (t.segments && t.segments[0]) || ""}`);
    }
    return;
  }
  let topic = arg ? topics.find(t => t.id === arg) : topics[Math.floor(Math.random()*topics.length)];
  if (!topic) throw new Error(`Thema "${arg}" nicht gefunden.`);
  const brandId = topic.brand || defaultBrand;
  const brand = brandsCfg.brands[brandId];
  if (!brand) throw new Error(`Brand "${brandId}" nicht in brands.json definiert.`);
  const isSituation = topic.typ === "situation";
  const segTexts = isSituation ? topic.segments
    : [topic.hook, topic.problem, topic.loesung, topic.cta];
  // App-Reels nutzen die familienzentrierten SEGMENT_MOOD-Defaults; ein Topic darf
  // sie aber per eigenem moods-Array überschreiben (z.B. hund-Marke ohne Familie).
  const moods = isSituation ? topic.moods
    : (topic.moods || ["hook", "problem", "loesung", "cta"]);
  const brandReel = isSituation ? brand.situation_reel : brand.app_reel;
  log(`Thema: ${topic.id} [${brand.name}${isSituation ? " · Situation" : " · App"}] — ${segTexts[0]}`);

  const slug = `${new Date().toISOString().slice(0,10)}_${topic.id}_reel`;
  const outDir = join(__dirname, "output", slug);
  const framesDir = join(outDir, "frames");
  const audioDir = join(outDir, "audio");
  const imagesDir = join(outDir, "images");
  await rm(framesDir, { recursive: true, force: true });
  await rm(audioDir, { recursive: true, force: true });
  await mkdir(framesDir, { recursive: true });
  await mkdir(audioDir, { recursive: true });
  await mkdir(imagesDir, { recursive: true });

  const baseSeed = seedFromString(topic.id);

  // ---------- 1) Bilder ----------
  log("Generiere Pixar-Bilder (Pollinations, gecacht)...");
  const imagePaths = [];
  for (let i = 0; i < segTexts.length; i++) {
    const imgPath = join(imagesDir, `${i}_seg.jpg`);
    const cached = existsSync(imgPath);
    log(`  [${i+1}/${segTexts.length}]${cached ? " (cache)" : ""}`);
    await generateImage(buildPrompt(topic, moods[i], brand.character), imgPath, {
      width: 768, height: 1344, seed: baseSeed + i * 17,
      model: "flux", nologo: true, enhance: true,
    });
    imagePaths.push(imgPath);
    if (!cached && i < segTexts.length - 1) await new Promise(r => setTimeout(r, 16000));
  }

  // ---------- 2) TTS + Wort-Timings ----------
  log("Generiere TTS (Seraphina) + Wort-Timings...");
  const segs = segTexts.map((text, i) => ({ id: String(i), text, voice: VOICE }));
  await writeFile(join(audioDir, "_segments.json"), JSON.stringify(segs, null, 2));
  await run(findPython(), [join(__dirname, "tts.py"), audioDir, join(audioDir, "_segments.json")]);
  const durations = JSON.parse(await readFile(join(audioDir, "durations.json"), "utf-8"));
  const words = JSON.parse(await readFile(join(audioDir, "words.json"), "utf-8"));

  // ---------- 3) Timeline ----------
  const timeline = [];
  let t = INTRO_PAUSE;
  for (let i = 0; i < segTexts.length; i++) {
    const dur = durations[String(i)];
    timeline.push({
      start: t, end: t + dur, image: i,
      words: (words[String(i)] || []).map(w => ({ word: w.word, start: w.start, end: w.end })),
    });
    t += dur + SEGMENT_GAP;
  }
  timeline.push({ start: t, end: t + OUTRO_DURATION, outro: true });
  const totalDuration = t + OUTRO_DURATION;
  const totalFrames = Math.ceil(totalDuration * FPS);
  log(`Timeline: ${totalDuration.toFixed(1)}s, ${totalFrames} Frames`);

  // ---------- 4) Audio-Track ----------
  const concatLines = [];
  await silentMp3(join(audioDir, "_intro.mp3"), INTRO_PAUSE);
  concatLines.push(`file '${join(audioDir, "_intro.mp3").replace(/\\/g,"/")}'`);
  for (let i = 0; i < segTexts.length; i++) {
    concatLines.push(`file '${join(audioDir, `${i}.mp3`).replace(/\\/g,"/")}'`);
    await silentMp3(join(audioDir, `_gap_${i}.mp3`), SEGMENT_GAP);
    concatLines.push(`file '${join(audioDir, `_gap_${i}.mp3`).replace(/\\/g,"/")}'`);
  }
  await silentMp3(join(audioDir, "_outro.mp3"), OUTRO_DURATION);
  concatLines.push(`file '${join(audioDir, "_outro.mp3").replace(/\\/g,"/")}'`);
  await writeFile(join(audioDir, "concat.txt"), concatLines.join("\n"));
  const audioPath = join(outDir, "audio.mp3");
  await run(ffmpegStatic, ["-y", "-f", "concat", "-safe", "0",
    "-i", join(audioDir, "concat.txt"), "-c:a", "libmp3lame", "-b:a", "192k", audioPath]);

  // ---------- 5) Frames rendern ----------
  log("Render Frames...");
  // chrome-headless-shell ist dediziert — Puppeteer verwaltet ein eigenes Temp-Profil
  const browser = await puppeteer.launch({
    executablePath: findChrome(), headless: "shell",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage",
           "--hide-scrollbars", "--no-first-run", "--no-default-browser-check"],
    defaultViewport: VIEWPORT,
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ ...VIEWPORT, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(join(__dirname, "templates", "reel.html")).href,
      { waitUntil: "networkidle0" });
    await page.evaluate(u => window.__setImages(u),
      imagePaths.map(p => pathToFileURL(p).href));
    await page.evaluate(() => window.__imagesReady());
    await page.evaluate(tl => window.__setTimeline(tl), timeline);
    await page.evaluate(m => window.__setMode(m), {
      situation: isSituation,
      badgeText: brandReel.badge_text,
      outroTitle: brandReel.outro_title,
      outroSubHtml: brandReel.outro_sub_html,
      outroCta: brandReel.outro_cta,
    });

    for (let i = 0; i < totalFrames; i++) {
      await page.evaluate(tt => window.__applyFrame(tt), i / FPS);
      await page.screenshot({ path: join(framesDir, `f_${pad(i)}.jpg`), type: "jpeg", quality: 92 });
      if (i % 60 === 0) log(`  Frame ${i}/${totalFrames}`);
    }
  } finally {
    await browser.close();
  }

  // ---------- 6) Encode ----------
  log("Encodiere MP4...");
  const videoPath = join(outDir, "reel.mp4");
  await run(ffmpegStatic, [
    "-y", "-framerate", String(FPS), "-i", join(framesDir, "f_%05d.jpg"),
    "-i", audioPath, "-c:v", "libx264", "-pix_fmt", "yuv420p",
    "-preset", "medium", "-crf", "20", "-c:a", "aac", "-b:a", "192k",
    "-shortest", "-movflags", "+faststart", videoPath,
  ]);
  if (!process.env.KEEP_FRAMES) await rm(framesDir, { recursive: true, force: true });

  // ---------- 7) Caption ----------
  const caption = (isSituation
    ? [segTexts.join(" "), "", brandReel.caption_cta]
    : [topic.hook, "", topic.problem, "", "👉 " + topic.loesung, "", topic.cta, "",
       brandReel.caption_cta]
  ).concat(["", (topic.hashtags || []).join(" ")]).join("\n");
  await writeFile(join(outDir, "caption.txt"), caption, "utf-8");

  const st = await stat(videoPath);
  log(`✓ Fertig: ${videoPath}`);
  log(`  Dauer: ${totalDuration.toFixed(1)}s   Größe: ${(st.size/1024/1024).toFixed(1)} MB`);
}

main().catch(err => { console.error("\nFEHLER:", err.message); process.exit(1); });
