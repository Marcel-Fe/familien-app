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

// Warme, natürliche, REIN deutsche Stimme (Katja — natürlichste deutsche Edge-TTS).
// Wichtig: monolinguale Stimme, sonst werden Wörter wie "App" englisch ausgesprochen.
const VOICE = "de-DE-KatjaNeural";
const VOICE_RATE = "+0%";

// Charakter-Beschreibungen kommen ab jetzt aus brands.json (Multi-Brand-Setup).
// Hier nur noch der stilistische Anstrich, der für ALLE Marken gilt.
// Cartoon-Editorial-Stil — KEIN 3D, KEIN Photorealismus (vom User klar gefordert).
const STYLE = "modern 3D animated cartoon, polished CG animation, soft cel-shaded 3D characters with big friendly expressive eyes, warm cinematic studio lighting, vibrant clean colors, charming modern Pixar-quality character design, anatomically correct faces with properly placed eyes above mouth and nose between them, two distinct symmetrical eyes per character, well-formed facial features, smooth subsurface skin shading, professional 3D animation look, family-friendly, characters positioned in upper two thirds of frame leaving lower third clear for text, 9:16 vertical composition, full frame edge to edge, no black bars, no letterboxing, no text overlay, no logos, no watermark";

// Drückt FLUX von Realismus weg + verhindert Nahaufnahmen.
const NEGATIVE_PROMPT = "deformed face, distorted face, broken anatomy, malformed features, eyes inside mouth, mouth above eyes, misplaced features, asymmetric face, extra eyes, missing eye, fused features, melted face, wrong proportions, anatomy error, disfigured, mutated, photorealistic photograph, real photo of person, hyperrealistic skin pores, voxel art, pixelated, low poly, blurry, soft focus, washed out, low contrast, close-up, portrait crop, subject filling the frame, macro shot, extreme zoom";

const SCENE_SETTINGS = {
  wohnzimmer: "in a sunlit warm cozy living room with a plush sofa, arched window, houseplants, warm dusk light",
  kueche: "in a bright family kitchen with wooden table, warm morning sunlight through the window",
  kinderzimmer: "in a colorful cheerful child's bedroom with plush toys, books, soft pastel colors, sunset light",
  park: "in a vibrant sunny park with blooming flowers, soft green grass, golden afternoon sunlight",
  buero: "in a cozy home office with a wooden desk, paperwork, a green lamp, warm side light",
};
// Strategie: max 1 Person pro Frame (FLUX-Anatomie kollabiert bei 2+ Cartoon-Gesichtern).
// 2 Frames Atmosphäre/Objekt (keine Gesichter), 2 Frames Solo-Person.
const SEGMENT_MOOD = {
  hook:    { text: "an evocative atmospheric scene with everyday family-life objects (open notebook, coffee mug, smartphone, scattered papers, soft natural light), no people in frame, warm inviting still-life composition", noPeople: true },
  problem: { text: "ONE single adult person alone in the scene, thoughtful concerned expression, looking gently to the side, no other people visible, soft warm light, modern editorial portrait", solo: true },
  loesung: { text: "close-up of HANDS only holding a smartphone with a glowing simple map or list interface visible on screen, no face, no head visible, just hands and the device, warm soft light", noPeople: true },
  cta:     { text: "ONE single adult person alone, warm friendly smile looking gently toward the viewer, holding a smartphone, no other people visible, golden sunset light, modern editorial illustration", solo: true },
};

// Baut den Charakter-String aus brand.cast + optionalem topic.cast.
// Bei `solo: true` wird nur EIN Charakter aus default_cast genommen (FLUX-Anatomie-Fix).
// Bei `noPeople: true` wird leer zurückgegeben.
function resolveCharacter(brand, topic, moodObj) {
  if (moodObj && moodObj.noPeople) return "";
  if (!brand.cast) return brand.character;
  let castIds = (topic.cast && topic.cast.length) ? topic.cast : (brand.default_cast || Object.keys(brand.cast));
  if (moodObj && moodObj.solo) {
    // Nimm den ersten "Erwachsenen" aus dem Cast — bevorzugt Mutter, sonst Vater, sonst erstes Element
    const preferred = ["mutter", "vater", "oma", "opa"];
    const pick = preferred.find(p => castIds.includes(p) && brand.cast[p]) || castIds[0];
    castIds = [pick];
  }
  const parts = castIds.map(id => brand.cast[id]).filter(Boolean);
  const styleAnchor = brand.style_anchor ? `${brand.style_anchor}. ` : "";
  return `${styleAnchor}Featuring: ${parts.join("; ")}`;
}

function buildPrompt(topic, moodKey, brandCharacter, moodObj) {
  const setting = SCENE_SETTINGS[topic.scene] || SCENE_SETTINGS.wohnzimmer;
  let moodText = (moodObj && moodObj.text) || (typeof SEGMENT_MOOD[moodKey] === "string" ? SEGMENT_MOOD[moodKey] : null) || moodKey || (SEGMENT_MOOD.hook.text || SEGMENT_MOOD.hook);
  moodText = moodText.replace(/\b(big|large|huge|giant)\b/gi, "small");
  const characterPart = brandCharacter ? ` ${brandCharacter}.` : "";
  const noPeopleHint = (moodObj && moodObj.noPeople)
    ? " IMPORTANT: absolutely no people, no faces, no characters in this frame — only objects and atmosphere."
    : (moodObj && moodObj.solo)
      ? " IMPORTANT: exactly ONE person in frame, no other people, no crowds, no group, properly drawn face with two clear eyes above the mouth."
      : "";
  return `${STYLE}. Wide establishing shot ${setting}, the whole scene and `
    + `environment clearly visible, filling most of the frame with rich background detail. `
    + `Scene: ${moodText}.${characterPart}${noPeopleHint}`;
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

  // Legacy-Fallback: ältere Skripte lesen brand.character direkt — aus cast/default_cast auto-bauen.
  for (const b of Object.values(brandsCfg.brands)) {
    if (b.cast && !b.character) {
      const ids = b.default_cast || Object.keys(b.cast);
      const anchor = b.style_anchor ? `${b.style_anchor}. ` : "";
      b.character = `${anchor}Featuring: ${ids.map(i => b.cast[i]).filter(Boolean).join("; ")}`;
    }
  }

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
  // Brand-Wording entschärfen:
  // - Hook + Problem: keine Marke (oft schon so)
  // - Lösung: Prefix "Wir haben da eine Lösung für dich." + alle App-Verweise raus
  // - CTA: Marke darf 1x am Schluss
  // - Outro-Branding bleibt (visuell)
  const stripAppRefs = s => s
    // "in der App." am Satzende → einfach weg (kein "damit." Krücke)
    .replace(/\s+in\s+der\s+(FamilienApp|App)\s*\./gi, ".")
    // "Mit der App ..." → "Damit ..."
    .replace(/\bMit\s+der\s+(FamilienApp|App)\b/gi, "Damit")
    // "In der App ..." (mitten im Satz) → "Damit"
    .replace(/\bIn\s+der\s+(FamilienApp|App)\b/g, "Damit")
    .replace(/\bin\s+der\s+(FamilienApp|App)\b/g, "damit")
    // Subjekt "Die App / Die FamilienApp" → Pronomen "Sie"
    .replace(/\bDie\s+(FamilienApp|App)\b/g, "Sie")
    .replace(/\bdie\s+(FamilienApp|App)\b/g, "sie")
    .replace(/\bDer\s+(FamilienApp|App)\b/g, "Ihr")
    .replace(/\bder\s+(FamilienApp|App)\b/g, "ihr")
    // "FamilienApp" am Satzanfang vor Verb → "Sie" (z.B. "FamilienApp zeigt...")
    .replace(/(^|[.!?]\s+)FamilienApp\b/g, "$1Sie")
    // Restliches "FamilienApp" (sehr selten) → "Sie"
    .replace(/\bFamilienApp\b/g, "Sie")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .trim();
  const softenCta = s => s
    // "kostenlos" raus (User-Vorgabe: keine kostenlos-Bewerbung)
    .replace(/\bkostenlos(es|en|er|e)?\s*/gi, "")
    .replace(/\bFamilienApp laden\b/gi, "Hol dir die App")
    .replace(/\bApp laden\b/gi, "Hol dir die App")
    .replace(/\bFamilienApp\b/g, "App")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .trim();
  let segTexts;
  if (isSituation) {
    segTexts = topic.segments.map(stripAppRefs);
  } else {
    const loesungBody = stripAppRefs(topic.loesung || "");
    const loesungFinal = `Wir haben da eine Lösung für dich. ${loesungBody}`.replace(/\s+/g, " ").trim();
    segTexts = [
      stripAppRefs(topic.hook || ""),
      stripAppRefs(topic.problem || ""),
      loesungFinal,
      softenCta(topic.cta || ""),
    ];
  }
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
    const moodObj = (typeof SEGMENT_MOOD[moods[i]] === "object") ? SEGMENT_MOOD[moods[i]] : null;
    const character = resolveCharacter(brand, topic, moodObj);
    await generateImage(buildPrompt(topic, moods[i], character, moodObj), imgPath, {
      width: 896, height: 1568, seed: baseSeed + i * 17,
      model: "flux", nologo: true, enhance: true, negativePrompt: NEGATIVE_PROMPT,
    });
    imagePaths.push(imgPath);
    if (!cached && i < segTexts.length - 1) await new Promise(r => setTimeout(r, 16000));
  }

  // ---------- 2) TTS + Wort-Timings ----------
  log("Generiere TTS (Seraphina) + Wort-Timings...");
  const segs = segTexts.map((text, i) => ({ id: String(i), text, voice: VOICE, rate: VOICE_RATE }));
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
