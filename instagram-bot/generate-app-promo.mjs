// generate-app-promo.mjs — FamilienApp Vorstellungs-Video (Feature-Highlights)
//
// Erzeugt ein hochformatiges Werbevideo (9:16, 1080x1920) mit animierten
// Feature-Karten und einer warmen deutschen Erzaehlerin (Edge-TTS).
// Nutzt dieselbe Pipeline wie die Reels: chrome-headless-shell + ffmpeg-static.
//
// Usage:  node generate-app-promo.mjs
//   KEEP_FRAMES=1 node generate-app-promo.mjs   (Frames zum Pruefen behalten)

import { readFile, writeFile, mkdir, rm, stat } from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer-core";
import ffmpegStatic from "ffmpeg-static";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FPS = 25;
const VIEWPORT = { width: 1080, height: 1920 };
const INTRO_PAUSE = 0.35;
const VOICE = "de-DE-SeraphinaMultilingualNeural";

// ---------- Drehbuch: Feature-Highlights ----------
// voice = was die Erzaehlerin sagt | title/sub = was auf dem Bild steht
const SCENES = [
  { icon:"✨", title:"Die FamilienApp", sub:"Alles für deine Familie — an einem Ort.",
    voice:"Die FamilienApp — alles für deine Familie an einem Ort.",
    c1:"#4F46E5", c2:"#1E1B4B", glow:"#6366F1", tail:0.7 },
  { icon:"💰", title:"Zuschüsse finden", sub:"Welche Hilfen stehen dir zu?",
    voice:"Finde mit wenigen Klicks heraus, welche finanziellen Hilfen dir zustehen.",
    c1:"#059669", c2:"#064E3B", glow:"#10B981", tail:0.6 },
  { icon:"📍", title:"Umgebung entdecken", sub:"Ärzte, Spielplätze und Ämter ganz in der Nähe.",
    voice:"Entdecke Ärzte, Spielplätze und Ämter direkt in deiner Nähe.",
    c1:"#2563EB", c2:"#1E3A8A", glow:"#3B82F6", tail:0.6 },
  { icon:"🩺", title:"Gesund & sicher", sub:"Symptom-Check, Medikamente, Erste Hilfe.",
    voice:"Symptom-Check, Medikamenten-Erinnerung und Erste-Hilfe-Anleitungen — immer dabei.",
    c1:"#DC2626", c2:"#7F1D1D", glow:"#EF4444", tail:0.6 },
  { icon:"📅", title:"Familien-Alltag", sub:"Kalender, Essensplan, Rezepte & Spar-Tipps.",
    voice:"Kalender, Essensplan, Rezepte und clevere Spar-Tipps für jeden Tag.",
    c1:"#D97706", c2:"#78350F", glow:"#F59E0B", tail:0.6 },
  { icon:"🌐", title:"Praktische Helfer", sub:"Übersetzer, Pflanzen-Erkennung & Wissen.",
    voice:"Ein Sprach-Übersetzer, Pflanzen-Erkennung per Foto und vieles mehr.",
    c1:"#7C3AED", c2:"#3B0764", glow:"#A855F7", tail:0.6 },
  { icon:"📲", title:"Jetzt kostenlos starten", sub:"Ohne Anmeldung. Für die ganze Familie.",
    voice:"Die FamilienApp — kostenlos und ohne Anmeldung. Hol sie dir jetzt!",
    c1:"#DB2777", c2:"#500724", glow:"#EC4899", tail:1.6 },
];

// ---------- Helfer ----------
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
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
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
async function silentMp3(path, seconds) {
  await run(ffmpegStatic, [
    "-y", "-f", "lavfi", "-i", "anullsrc=channel_layout=mono:sample_rate=24000",
    "-t", String(seconds), "-c:a", "libmp3lame", "-b:a", "64k", path,
  ], { stdio: "ignore" });
}

// ---------- main ----------
async function main() {
  const slug = `${new Date().toISOString().slice(0,10)}_app-promo`;
  const outDir = join(__dirname, "output", slug);
  const framesDir = join(outDir, "frames");
  const audioDir = join(outDir, "audio");
  await rm(framesDir, { recursive: true, force: true });
  await rm(audioDir, { recursive: true, force: true });
  await mkdir(framesDir, { recursive: true });
  await mkdir(audioDir, { recursive: true });

  // ---------- 1) TTS ----------
  log("Generiere Erzaehler-Stimme (Edge-TTS, Seraphina)...");
  const segs = SCENES.map((s, i) => ({ id: String(i), text: s.voice, voice: VOICE }));
  await writeFile(join(audioDir, "_segments.json"), JSON.stringify(segs, null, 2));
  await run(findPython(), [join(__dirname, "tts.py"), audioDir, join(audioDir, "_segments.json")]);
  const durations = JSON.parse(await readFile(join(audioDir, "durations.json"), "utf-8"));

  // ---------- 2) Timeline ----------
  const timeline = [];
  let t = INTRO_PAUSE;
  for (let i = 0; i < SCENES.length; i++) {
    const dur = durations[String(i)];
    const tail = SCENES[i].tail;
    timeline.push({ start: t, end: t + dur + tail, scene: SCENES[i] });
    t += dur + tail;
  }
  const totalDuration = t;
  const totalFrames = Math.ceil(totalDuration * FPS);
  log(`Timeline: ${totalDuration.toFixed(1)}s, ${totalFrames} Frames`);

  // ---------- 3) Audio-Track (Sprache + Stille passend zur Timeline) ----------
  const concatLines = [];
  await silentMp3(join(audioDir, "_intro.mp3"), INTRO_PAUSE);
  concatLines.push(`file '${join(audioDir, "_intro.mp3").replace(/\\/g,"/")}'`);
  for (let i = 0; i < SCENES.length; i++) {
    concatLines.push(`file '${join(audioDir, `${i}.mp3`).replace(/\\/g,"/")}'`);
    await silentMp3(join(audioDir, `_gap_${i}.mp3`), SCENES[i].tail);
    concatLines.push(`file '${join(audioDir, `_gap_${i}.mp3`).replace(/\\/g,"/")}'`);
  }
  await writeFile(join(audioDir, "concat.txt"), concatLines.join("\n"));
  const audioPath = join(outDir, "audio.mp3");
  await run(ffmpegStatic, ["-y", "-f", "concat", "-safe", "0",
    "-i", join(audioDir, "concat.txt"), "-c:a", "libmp3lame", "-b:a", "192k", audioPath]);

  // ---------- 4) Frames rendern ----------
  log("Render Frames...");
  const browser = await puppeteer.launch({
    executablePath: findChrome(), headless: "shell",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage",
           "--hide-scrollbars", "--no-first-run", "--no-default-browser-check"],
    defaultViewport: VIEWPORT,
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ ...VIEWPORT, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(join(__dirname, "templates", "app-promo.html")).href,
      { waitUntil: "networkidle0" });
    await page.evaluate(tl => window.__setTimeline(tl), timeline);

    for (let i = 0; i < totalFrames; i++) {
      await page.evaluate(tt => window.__applyFrame(tt), i / FPS);
      await page.screenshot({ path: join(framesDir, `f_${pad(i)}.jpg`), type: "jpeg", quality: 92 });
      if (i % 100 === 0) log(`  Frame ${i}/${totalFrames}`);
    }
  } finally {
    await browser.close();
  }

  // ---------- 5) Encode ----------
  log("Encodiere MP4...");
  const videoPath = join(outDir, "familienapp-video.mp4");
  await run(ffmpegStatic, [
    "-y", "-framerate", String(FPS), "-i", join(framesDir, "f_%05d.jpg"),
    "-i", audioPath, "-c:v", "libx264", "-pix_fmt", "yuv420p",
    "-preset", "medium", "-crf", "20", "-c:a", "aac", "-b:a", "192k",
    "-shortest", "-movflags", "+faststart", videoPath,
  ]);
  if (!process.env.KEEP_FRAMES) await rm(framesDir, { recursive: true, force: true });

  const st = await stat(videoPath);
  log(`✓ Fertig: ${videoPath}`);
  log(`  Dauer: ${totalDuration.toFixed(1)}s   Groesse: ${(st.size/1024/1024).toFixed(1)} MB`);
}

main().catch(err => { console.error("\nFEHLER:", err.message); process.exit(1); });
