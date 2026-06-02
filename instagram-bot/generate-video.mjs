// generate-video.mjs — FamilienApp Reel-Generator (AI-Bilder + Ken Burns)
//
// Lädt ein Thema aus topics.json:
//  1) Generiert pro Sprech-Segment ein AI-Bild via Pollinations.ai (FLUX, gratis)
//  2) Generiert deutsche TTS via Python edge-tts (Stimme: Seraphina)
//  3) Rendert Frames via Puppeteer (Vollbild AI-Bild + Ken Burns + Subtitles + Outro)
//  4) Kombiniert mit ffmpeg zu MP4
//
// Usage:
//   node generate-video.mjs                 # zufälliges Thema
//   node generate-video.mjs wohngeld-check  # bestimmtes Thema
//   node generate-video.mjs --list          # alle Themen anzeigen

import { readFile, writeFile, mkdir, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer-core";
import ffmpegStatic from "ffmpeg-static";
import { generateImage } from "./pollinations.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FPS = 30;
const VIEWPORT = { width: 1080, height: 1920 };

const INTRO_PAUSE = 0.3;
const OUTRO_DURATION = 3.0;
const SEGMENT_GAP = 0.15;

// Eine warme moderne deutsche Sprecherin (Multilingual-Neural = höchste Qualität)
const VOICE = "de-DE-SeraphinaMultilingualNeural";

// Stimme + Pitch pro Sprecher (Edge-TTS hat keine Kinderstimme mehr → Katja + Pitch-Shift)
const SPEAKER_VOICES = {
  kind:     { voice: "de-DE-KatjaNeural",                rate: "+15%", pitch: "+60Hz" },  // hoch & schnell = Kind
  mama:     { voice: "de-DE-SeraphinaMultilingualNeural", rate: "+0%",  pitch: "+0Hz"  },  // warm weiblich
  papa:     { voice: "de-DE-ConradNeural",               rate: "-5%",  pitch: "-15Hz" },  // tief männlich
  narrator: { voice: "de-DE-FlorianMultilingualNeural",  rate: "+5%",  pitch: "+0Hz"  },  // Voiceover
  baby:     { voice: "de-DE-KatjaNeural",                rate: "+20%", pitch: "+80Hz" },  // sehr hoch = Baby
};

// Speaker-Label-Farben für die UI
const SPEAKER_COLORS = {
  kind: "#F4B6B0",      // Rosa
  mama: "#F4D27A",      // Gelb
  papa: "#7AA3D8",      // Blau
  narrator: "#C8628A",  // Berry
  baby: "#FFCBA5",      // Pfirsich
};

// =====================================================================
// PROMPT-TEMPLATES für AI-Bilder
// =====================================================================
// Konstante Familien-Beschreibung im Disney/Pixar 3D-Stil.
// Hochdetaillierte feste Beschreibung + fester Seed → maximale Konsistenz mit FLUX.
// Hinweis: 100% identische Charaktere wie in einem echten Pixar-Film sind ohne
// bezahltes Character-Reference-Tool (Midjourney --cref / DALL-E refs) nicht erreichbar.
const FAMILY = "stylized 3D animated family of four: mother around 32 years old with chestnut brown hair tied in a soft loose bun, big expressive warm hazel eyes, soft rounded face, gentle smile, wearing a mustard yellow knit cardigan over a cream blouse; father around 34 years old with short dark brown hair, neatly trimmed short beard, warm green eyes, kind expression, wearing a soft sky blue button-up shirt; 8-year-old daughter with chestnut brown hair in two cute pigtails tied with pink ribbons, big sparkling blue eyes, light freckles on her nose, wearing a pink dress with tiny white polka dots; chubby cheerful baby around 14 months old with a small tuft of brown hair, big bright eyes, peach colored onesie with cream details; a fluffy small golden retriever puppy with floppy ears";

const STYLE = "Pixar 3D animated movie style, Disney animation aesthetic, cinematic 3D render, expressive cartoon characters with soft round features, smooth volumetric shading, subsurface scattering skin, big eyes with bright catchlights, warm cinematic lighting, soft golden hour glow, vibrant but warm pastel color palette, depth of field, ultra detailed Pixar quality, family-friendly wholesome scene, 9:16 vertical composition, no text, no logos, no watermark";

// Pro Szenen-Typ ein Setting (im Disney-Film-Look)
const SCENE_SETTINGS = {
  wohnzimmer: "in a sunlit warm Pixar-style cozy living room with a plush beige sofa, a large arched window with soft curtains, lush green houseplants, wooden floor, picture frames on the wall, warm orange-pink dusk lighting filtering through window",
  kueche: "in a bright Pixar-style modern family kitchen with a wooden farmhouse table, baked bread and fruit bowl, hanging copper pots, warm morning sunlight streaming through window above sink, herbs on windowsill",
  kinderzimmer: "in a colorful Pixar-style cheerful child's bedroom with plush stuffed animals on a bed, picture books stacked, hot air balloon mobile, soft pastel pink and mint colors, sunset light through window",
  park: "in a vibrant Pixar-style sunny city park with blooming colorful flowers, a curved cobblestone path, soft green grass, blurred trees with dappled golden afternoon sunlight, butterflies",
  buero: "in a cozy Pixar-style home office nook with a wooden desk, stacked paperwork, a green table lamp, plants, a steaming coffee mug, soft afternoon light from a side window",
};

// Pro Segment ein Action/Stimmungs-Modifier
const SEGMENT_MOOD = {
  hook:    "the whole family gathered together looking at the viewer with warm welcoming smiles, hopeful expressions, golden warm light catching their faces, the puppy near their feet wagging its tail",
  problem: "the parents with worried concerned expressions, leaning over scattered official German letters and bills on a table, the daughter playing quietly behind them with the puppy, soft melancholic warm lighting",
  loesung: "the whole family gathered closely together looking at a glowing smartphone screen with bright hopeful happy smiles, soft magical glow on their faces, the puppy curiously peeking up, optimistic uplifting light",
  cta:     "the family laughing and hugging together joyfully in a tight group hug, the father holding up a smartphone with a vibrant family app icon visible, the daughter waving, the puppy jumping with joy, golden sunset light streaming in, celebratory wholesome moment",
};

function buildPrompt(topic, segmentKey) {
  // wenn topic.imagePrompts existiert → nutze override
  if (topic.imagePrompts && topic.imagePrompts[segmentKey]) {
    return topic.imagePrompts[segmentKey] + ". " + STYLE;
  }
  const setting = SCENE_SETTINGS[topic.scene] || SCENE_SETTINGS.wohnzimmer;
  const mood = SEGMENT_MOOD[segmentKey] || SEGMENT_MOOD.hook;
  return `${FAMILY}, ${setting}, ${mood}. ${STYLE}`;
}

// =====================================================================
// Helpers
// =====================================================================

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Users\\" + process.env.USERNAME + "\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  for (const p of candidates) if (existsSync(p)) return p;
  throw new Error("Chrome/Edge nicht gefunden. Setze CHROME_PATH=<pfad-zu-chrome.exe>");
}

function findPython() {
  return process.env.PYTHON || "python";
}

function run(cmd, args, opts = {}) {
  return new Promise((resolveP, rejectP) => {
    const proc = spawn(cmd, args, { stdio: "inherit", shell: false, ...opts });
    proc.on("error", rejectP);
    proc.on("close", code => code === 0 ? resolveP() : rejectP(new Error(`${cmd} exited ${code}`)));
  });
}

function pad(n, w = 5) { return String(n).padStart(w, "0"); }

function log(...args) {
  const t = new Date().toISOString().slice(11, 19);
  console.log(`[${t}]`, ...args);
}

// Deterministischer Seed aus Topic-ID für konsistente Bilder bei gleichem Topic
function seedFromString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % 9999999;
}

// =====================================================================
// Main
// =====================================================================

async function main() {
  const arg = process.argv[2];

  const topicsRaw = await readFile(join(__dirname, "topics.json"), "utf-8");
  const topics = JSON.parse(topicsRaw).topics;

  if (arg === "--list") {
    log("Verfügbare Themen:");
    for (const t of topics) console.log(`  ${t.id.padEnd(28)} ${t.kategorie.padEnd(14)} ${t.hook}`);
    return;
  }

  let topic;
  if (arg) {
    topic = topics.find(t => t.id === arg);
    if (!topic) throw new Error(`Thema "${arg}" nicht gefunden. Liste: node generate-video.mjs --list`);
  } else {
    topic = topics[Math.floor(Math.random() * topics.length)];
  }
  log(`Thema: ${topic.id}  (${topic.kategorie})`);
  log(`  Hook: ${topic.hook}`);

  const stamp = new Date().toISOString().slice(0, 10);
  const slug = `${stamp}_${topic.id}`;
  const outDir = join(__dirname, "output", slug);
  const framesDir = join(outDir, "frames");
  const audioDir = join(outDir, "audio");
  const imagesDir = join(outDir, "images");
  // Nur frames + audio neu erstellen; Bilder cachen wir (teure Pollinations-Calls)
  await rm(framesDir, { recursive: true, force: true });
  await rm(audioDir, { recursive: true, force: true });
  await mkdir(framesDir, { recursive: true });
  await mkdir(audioDir, { recursive: true });
  await mkdir(imagesDir, { recursive: true });

  // ---------- 1) AI-Bilder generieren ----------
  const baseSeed = seedFromString(topic.id);
  const isDialogMode = Array.isArray(topic.dialog) && topic.dialog.length > 0;

  let imageGroups;       // 2D: [[poseA, poseB], ...] — pro Sprech-Phase 1-2 Bilder
  let dialogLines = null; // Im Dialog-Modus: [{ speaker, label, text, voice, imgPath }, ...]

  if (isDialogMode) {
    log(`Dialog-Modus: ${topic.dialog.length} Sprech-Zeilen`);
    dialogLines = [];
    imageGroups = [];

    // Pollinations erlaubt anonym nur 1 Anfrage / 15s → sequenziell mit Pause.
    // Gecachte Bilder (existieren bereits) überspringen die Pause.
    for (let i = 0; i < topic.dialog.length; i++) {
      const line = topic.dialog[i];
      const voiceCfg = SPEAKER_VOICES[line.speaker] || { voice: VOICE, rate: "+0%", pitch: "+0Hz" };
      const prompt = (line.scenePrompt || buildPrompt(topic, "hook")) + ". " + STYLE;
      const imgPath = join(imagesDir, `dialog_${i}_${line.speaker}.jpg`);
      const wasCached = existsSync(imgPath);
      log(`  [${i+1}/${topic.dialog.length}] ${line.speaker}${wasCached ? " (cache)" : ""} → ${line.text.slice(0, 38)}...`);
      await generateImage(prompt, imgPath, {
        width: 1080, height: 1920,
        seed: baseSeed + i * 17,
        model: "flux", nologo: true, enhance: true,
      });
      imageGroups.push([imgPath, imgPath]);
      dialogLines.push({
        speaker: line.speaker,
        label: line.label || line.speaker,
        text: line.text,
        voice: voiceCfg.voice,
        rate: voiceCfg.rate,
        pitch: voiceCfg.pitch,
        color: SPEAKER_COLORS[line.speaker] || "#FFFFFF",
        imgPath,
        showApp: !!line.showApp,
      });
      // Rate-Limit-Schutz: 16s Pause nach jeder echten Generierung (nicht bei Cache, nicht beim letzten)
      if (!wasCached && i < topic.dialog.length - 1) {
        await new Promise(r => setTimeout(r, 16000));
      }
    }
    log("Alle Dialog-Bilder geladen.");
  } else {
    // Klassisches 4-Segment-Format: Hook/Problem/Lösung/CTA mit 2 Posen pro Segment
    const segmentKeys = ["hook", "problem", "loesung", "cta"];
    const IMAGES_PER_SEGMENT = 2;
    imageGroups = [];
    const totalImgs = segmentKeys.length * IMAGES_PER_SEGMENT;
    let imgCount = 0;
    log(`Generiere ${totalImgs} AI-Bilder (klassisches Format)...`);
    for (let i = 0; i < segmentKeys.length; i++) {
      const key = segmentKeys[i];
      const prompt = buildPrompt(topic, key);
      const group = [];
      for (let j = 0; j < IMAGES_PER_SEGMENT; j++) {
        imgCount++;
        const imgPath = join(imagesDir, `${i}_${key}_${j}.jpg`);
        log(`  [${imgCount}/${totalImgs}] ${key} pose ${j+1}`);
        await generateImage(prompt, imgPath, {
          width: 1080,
          height: 1920,
          seed: baseSeed + i * 13 + j * 1000,
          model: "flux",
          nologo: true,
          enhance: true,
        });
        group.push(imgPath);
      }
      imageGroups.push(group);
    }
    log("Alle Bilder geladen.");
  }

  // ---------- 2) TTS-Segmente vorbereiten ----------
  let segments;
  if (isDialogMode) {
    segments = dialogLines.map((line, i) => ({
      id: String(i),
      text: line.text,
      voice: line.voice,
      key: line.speaker,
      label: line.label,
      color: line.color,
      showApp: line.showApp,
    }));
  } else {
    segments = [
      { id: "0", text: topic.hook,    voice: VOICE, key: "hook" },
      { id: "1", text: topic.problem, voice: VOICE, key: "problem" },
      { id: "2", text: topic.loesung, voice: VOICE, key: "loesung" },
      { id: "3", text: topic.cta,     voice: VOICE, key: "cta" },
    ];
  }
  const segmentsForTTS = segments.map(s => {
    const ttsSeg = { id: s.id, text: s.text, voice: s.voice };
    if (isDialogMode && dialogLines) {
      const line = dialogLines[parseInt(s.id, 10)];
      if (line) { ttsSeg.rate = line.rate; ttsSeg.pitch = line.pitch; }
    }
    return ttsSeg;
  });
  const segsFile = join(audioDir, "_segments.json");
  await writeFile(segsFile, JSON.stringify(segmentsForTTS, null, 2));

  log("Generiere TTS (Seraphina Multilingual Neural)...");
  await run(findPython(), [join(__dirname, "tts.py"), audioDir, segsFile]);
  const durations = JSON.parse(await readFile(join(audioDir, "durations.json"), "utf-8"));
  log("Dauern:", durations);

  // ---------- 3) Timeline bauen ----------
  // Im Dialog-Modus: kürzere Pausen zwischen Sätzen damit's wie echter Dialog wirkt
  const gap = isDialogMode ? 0.08 : SEGMENT_GAP;
  const timeline = [];
  let t = INTRO_PAUSE;
  for (const seg of segments) {
    const dur = durations[seg.id];
    timeline.push({
      start: t,
      end: t + dur,
      text: seg.text,
      speaker: seg.key,
      label: seg.label,
      color: seg.color,
      showApp: seg.showApp,
    });
    t += dur + gap;
  }
  const outroStart = t;
  timeline.push({ start: outroStart, end: outroStart + OUTRO_DURATION, outro: true });
  const totalDuration = outroStart + OUTRO_DURATION;
  const totalFrames = Math.ceil(totalDuration * FPS);
  log(`Timeline: ${totalDuration.toFixed(2)}s, ${totalFrames} Frames @ ${FPS}fps`);

  // ---------- 4) Audio-Track ----------
  const concatFile = join(audioDir, "concat.txt");
  const concatLines = [];
  await silentMp3(join(audioDir, "_intro.mp3"), INTRO_PAUSE);
  concatLines.push(`file '${join(audioDir, "_intro.mp3").replace(/\\/g, "/")}'`);
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    concatLines.push(`file '${join(audioDir, `${seg.id}.mp3`).replace(/\\/g, "/")}'`);
    await silentMp3(join(audioDir, `_gap_${i}.mp3`), gap);
    concatLines.push(`file '${join(audioDir, `_gap_${i}.mp3`).replace(/\\/g, "/")}'`);
  }
  await silentMp3(join(audioDir, "_outro.mp3"), OUTRO_DURATION);
  concatLines.push(`file '${join(audioDir, "_outro.mp3").replace(/\\/g, "/")}'`);
  await writeFile(concatFile, concatLines.join("\n"));

  const audioPath = join(outDir, "audio.mp3");
  log("Kombiniere Audio-Spur...");
  await run(ffmpegStatic, [
    "-y", "-f", "concat", "-safe", "0",
    "-i", concatFile,
    "-c:a", "libmp3lame", "-b:a", "192k",
    audioPath,
  ]);

  // ---------- 5) Frames rendern ----------
  log("Starte Puppeteer für Frame-Rendering...");
  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
    ],
    defaultViewport: VIEWPORT,
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ ...VIEWPORT, deviceScaleFactor: 1 });
    const sceneUrl = pathToFileURL(join(__dirname, "templates", "scene.html")).href;
    await page.goto(sceneUrl, { waitUntil: "networkidle0" });

    // Bild-Gruppen als file:// URLs an die Seite übergeben (2D: pro Segment ein Array)
    const imageGroupsUrls = imageGroups.map(group => group.map(p => pathToFileURL(p).href));
    await page.evaluate(groups => window.__setImages(groups), imageGroupsUrls);
    await page.evaluate(() => window.__imagesReady());

    log(`Render ${totalFrames} Frames...`);
    for (let i = 0; i < totalFrames; i++) {
      const tt = i / FPS;
      await page.evaluate((t, tl) => window.__applyFrame(t, tl), tt, timeline);
      const framePath = join(framesDir, `frame_${pad(i)}.png`);
      await page.screenshot({ path: framePath, type: "png", omitBackground: false });
      if (i % 30 === 0) log(`  Frame ${i}/${totalFrames}`);
    }
  } finally {
    await browser.close();
  }

  // ---------- 6) Encode MP4 ----------
  const videoPath = join(outDir, "reel.mp4");
  log("Encodiere MP4...");
  await run(ffmpegStatic, [
    "-y",
    "-framerate", String(FPS),
    "-i", join(framesDir, "frame_%05d.png"),
    "-i", audioPath,
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "medium",
    "-crf", "20",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    "-movflags", "+faststart",
    videoPath,
  ]);

  if (!process.env.KEEP_FRAMES) {
    await rm(framesDir, { recursive: true, force: true });
  }

  // ---------- Caption für Instagram ----------
  const caption = [
    topic.hook,
    "",
    topic.problem,
    "",
    "👉 " + topic.loesung,
    "",
    topic.cta,
    "",
    "📲 Lade die FamilienApp kostenlos — Link im Profil!",
    "",
    topic.hashtags.join(" "),
  ].join("\n");
  await writeFile(join(outDir, "caption.txt"), caption, "utf-8");

  const stats = await stat(videoPath);
  log(`✓ Fertig: ${videoPath}`);
  log(`  Dauer: ${totalDuration.toFixed(1)}s   Größe: ${(stats.size / 1024 / 1024).toFixed(1)} MB`);
  log(`  Caption: ${join(outDir, "caption.txt")}`);
  log("");
  log("Nächster Schritt: Video prüfen, dann posten mit:");
  log(`  node post-to-instagram.mjs "${slug}"`);
}

async function silentMp3(path, seconds) {
  await run(ffmpegStatic, [
    "-y", "-f", "lavfi",
    "-i", "anullsrc=channel_layout=mono:sample_rate=24000",
    "-t", String(seconds),
    "-c:a", "libmp3lame", "-b:a", "64k",
    path,
  ], { stdio: "ignore" });
}

main().catch(err => {
  console.error("\nFEHLER:", err.message);
  process.exit(1);
});
