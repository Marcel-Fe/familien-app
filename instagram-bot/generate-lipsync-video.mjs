// generate-lipsync-video.mjs — FamilienApp Reel mit echter Lippenbewegung
//
// Pipeline (Dialog-Modus, Topic braucht ein "dialog"-Array):
//   1) Pro Dialog-Zeile ein Pixar-Bild via Pollinations (gratis, gecacht)
//   2) Pro Zeile deutsche TTS via Edge-TTS (eigene Stimme je Sprecher)
//   3) Lip-Sync via Wav2Lip auf HuggingFace (lipsync.py) — Sprecher-Zeilen
//   4) Pro Zeile: Clip auf 1080x1920 + Overlay (Untertitel, Label, Badge)
//   5) Alle Clips + Outro zu reel.mp4
//
// Usage:
//   node generate-lipsync-video.mjs <topic-id>
//   node generate-lipsync-video.mjs --list

import { readFile, writeFile, mkdir, rm, stat, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer-core";
import ffmpegStatic from "ffmpeg-static";
import { generateImage } from "./pollinations.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const VIEWPORT = { width: 1080, height: 1920 };
const FPS = 25;
const LINE_PAUSE = 0.28;     // Pause nach jeder Dialog-Zeile (s)
const OUTRO_DURATION = 3.0;

const SPEAKER_VOICES = {
  kind:     { voice: "de-DE-KatjaNeural",                rate: "+15%", pitch: "+60Hz" },
  mama:     { voice: "de-DE-SeraphinaMultilingualNeural", rate: "+0%",  pitch: "+0Hz"  },
  papa:     { voice: "de-DE-ConradNeural",               rate: "-5%",  pitch: "-15Hz" },
  narrator: { voice: "de-DE-FlorianMultilingualNeural",  rate: "+5%",  pitch: "+0Hz"  },
  baby:     { voice: "de-DE-KatjaNeural",                rate: "+20%", pitch: "+80Hz" },
};
const SPEAKER_COLORS = {
  kind: "#F4B6B0", mama: "#F4D27A", papa: "#7AA3D8",
  narrator: "#C8628A", baby: "#FFCBA5",
};
// Diese Sprecher bekommen Lippenbewegung (narrator = Voiceover, kein Gesicht nötig)
const LIPSYNC_SPEAKERS = new Set(["kind", "mama", "papa", "baby"]);

const STYLE = "Pixar 3D animated movie style, Disney animation aesthetic, cinematic 3D render, expressive cartoon characters, soft volumetric shading, big eyes with bright catchlights, warm cinematic lighting, vibrant warm pastel palette, ultra detailed Pixar quality, family-friendly, 9:16 vertical, no text, no watermark";

// ---------- helpers ----------
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
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

// ---------- main ----------
async function main() {
  const arg = process.argv[2];
  const topics = JSON.parse(await readFile(join(__dirname, "topics.json"), "utf-8")).topics;

  if (arg === "--list") {
    log("Themen mit Dialog:");
    for (const t of topics) {
      if (Array.isArray(t.dialog)) console.log(`  ${t.id}  (${t.dialog.length} Zeilen)`);
    }
    return;
  }
  const topic = topics.find(t => t.id === arg);
  if (!topic) throw new Error(`Thema "${arg}" nicht gefunden.`);
  if (!Array.isArray(topic.dialog) || !topic.dialog.length)
    throw new Error(`Thema "${arg}" hat kein "dialog"-Array.`);

  log(`Thema: ${topic.id} — ${topic.dialog.length} Dialog-Zeilen`);

  const slug = `${new Date().toISOString().slice(0,10)}_${topic.id}_lipsync`;
  const outDir = join(__dirname, "output", slug);
  const imagesDir = join(outDir, "images");
  const audioDir = join(outDir, "audio");
  const clipsDir = join(outDir, "clips");      // rohe Lip-Sync-Clips (gecacht!)
  const finalDir = join(outDir, "final");      // veredelte Clips
  await mkdir(imagesDir, { recursive: true });
  await mkdir(audioDir, { recursive: true });
  await mkdir(clipsDir, { recursive: true });
  await rm(finalDir, { recursive: true, force: true });
  await mkdir(finalDir, { recursive: true });

  const baseSeed = seedFromString(topic.id);
  const lines = topic.dialog;

  // ---------- 1) Bilder ----------
  log("Generiere Pixar-Bilder (Pollinations, gecacht)...");
  const imagePaths = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const imgPath = join(imagesDir, `${i}_${line.speaker}.jpg`);
    const cached = existsSync(imgPath);
    log(`  [${i+1}/${lines.length}] ${line.speaker}${cached ? " (cache)" : ""}`);
    await generateImage((line.scenePrompt || "") + ". " + STYLE, imgPath, {
      width: 768, height: 1344, seed: baseSeed + i * 17,
      model: "flux", nologo: true, enhance: true,
    });
    imagePaths.push(imgPath);
    if (!cached && i < lines.length - 1) await new Promise(r => setTimeout(r, 16000));
  }

  // ---------- 2) TTS ----------
  log("Generiere TTS (eigene Stimme je Sprecher)...");
  const ttsSegs = lines.map((line, i) => {
    const v = SPEAKER_VOICES[line.speaker] || SPEAKER_VOICES.narrator;
    return { id: String(i), text: line.text, voice: v.voice, rate: v.rate, pitch: v.pitch };
  });
  const segsFile = join(audioDir, "_segments.json");
  await writeFile(segsFile, JSON.stringify(ttsSegs, null, 2));
  await run(findPython(), [join(__dirname, "tts.py"), audioDir, segsFile]);
  const durations = JSON.parse(await readFile(join(audioDir, "durations.json"), "utf-8"));

  // ---------- 3) Lip-Sync ----------
  // Alle Sprecher-Zeilen an lipsync.py — es prüft selbst Cache + verifiziert
  // jedes Ergebnis (Wav2Lip-Space liefert manchmal falsche Bilder).
  const lipsyncJobs = [];
  for (let i = 0; i < lines.length; i++) {
    if (!LIPSYNC_SPEAKERS.has(lines[i].speaker)) continue;
    lipsyncJobs.push({ id: String(i), image: imagePaths[i], audio: join(audioDir, `${i}.mp3`) });
  }
  let lipsyncResult = {};
  if (lipsyncJobs.length) {
    log(`Lip-Sync via Wav2Lip für ${lipsyncJobs.length} Sprecher-Zeilen...`);
    const jobsFile = join(clipsDir, "_jobs.json");
    await writeFile(jobsFile, JSON.stringify(lipsyncJobs, null, 2));
    await run(findPython(), [join(__dirname, "lipsync.py"), jobsFile, clipsDir]);
    const resFile = join(clipsDir, "lipsync_result.json");
    if (existsSync(resFile)) lipsyncResult = JSON.parse(await readFile(resFile, "utf-8"));
  }

  // ---------- 4) Veredeln: Overlay + Skalierung pro Clip ----------
  log("Veredle Clips (Overlay, Skalierung)...");
  const browser = await puppeteer.launch({
    executablePath: findChrome(), headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
    defaultViewport: VIEWPORT,
  });
  const finalClips = [];
  try {
    const page = await browser.newPage();
    await page.setViewport({ ...VIEWPORT, deviceScaleFactor: 1 });
    const overlayUrl = pathToFileURL(join(__dirname, "templates", "overlay.html")).href;
    await page.goto(overlayUrl, { waitUntil: "networkidle0" });

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const dur = durations[String(i)];
      // Lip-Sync-Clip nur nutzen wenn lipsync.py ihn als korrekt verifiziert hat
      const hasClip = lipsyncResult[String(i)] === true && existsSync(join(clipsDir, `${i}.mp4`));

      // Overlay-PNG rendern
      await page.evaluate(o => window.__setOverlay(o), {
        label: line.label || "",
        color: SPEAKER_COLORS[line.speaker] || "#FF7B6B",
        subtitle: line.text,
      });
      const overlayPng = join(finalDir, `_ov_${i}.png`);
      await page.screenshot({ path: overlayPng, type: "png", omitBackground: true });

      const finalClip = join(finalDir, `clip_${String(i).padStart(2,"0")}.mp4`);
      const args = ["-y"];
      if (hasClip) {
        // Wav2Lip-Clip (hat Audio) + Overlay
        args.push("-i", join(clipsDir, `${i}.mp4`), "-i", overlayPng,
          "-filter_complex",
          `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1[v];` +
          `[v][1:v]overlay=0:0,tpad=stop_mode=clone:stop_duration=${LINE_PAUSE}[vo]`,
          "-map", "[vo]", "-map", "0:a",
          "-af", `apad=pad_dur=${LINE_PAUSE},aresample=44100`);
      } else {
        // Standbild (narrator) + Audio, leichter Ken-Burns-Zoom
        const frames = Math.round((dur + LINE_PAUSE) * FPS);
        args.push("-loop", "1", "-i", imagePaths[i], "-i", join(audioDir, `${i}.mp3`),
          "-i", overlayPng,
          "-filter_complex",
          `[0:v]scale=1188:2112,zoompan=z='min(zoom+0.0006,1.12)':d=${frames}:` +
          `x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=${FPS},setsar=1[v];` +
          `[v][2:v]overlay=0:0[vo]`,
          "-map", "[vo]", "-map", "1:a",
          "-t", String(dur + LINE_PAUSE),
          "-af", `apad=pad_dur=${LINE_PAUSE},aresample=44100`);
      }
      args.push("-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
        "-r", String(FPS), "-c:a", "aac", "-b:a", "192k", "-ar", "44100", finalClip);
      await runQuiet(ffmpegStatic, args);
      finalClips.push(finalClip);
      log(`  Clip ${i+1}/${lines.length} ${hasClip ? "(Lip-Sync)" : "(Standbild)"} fertig`);
    }

    // ---------- 5) Outro ----------
    const outroUrl = pathToFileURL(join(__dirname, "templates", "outro.html")).href;
    await page.goto(outroUrl, { waitUntil: "networkidle0" });
    const outroPng = join(finalDir, "_outro.png");
    await page.screenshot({ path: outroPng, type: "png" });
    const outroClip = join(finalDir, `clip_${String(lines.length).padStart(2,"0")}.mp4`);
    await runQuiet(ffmpegStatic, [
      "-y", "-loop", "1", "-i", outroPng,
      "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
      "-t", String(OUTRO_DURATION),
      "-vf", `scale=1080:1920,setsar=1,fps=${FPS}`,
      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20",
      "-c:a", "aac", "-b:a", "192k", "-ar", "44100", outroClip,
    ]);
    finalClips.push(outroClip);
    log("  Outro fertig");
  } finally {
    await browser.close();
  }

  // ---------- 6) Concat ----------
  log("Füge Clips zusammen...");
  const concatFile = join(finalDir, "_concat.txt");
  await writeFile(concatFile, finalClips.map(f => `file '${f.replace(/\\/g,"/")}'`).join("\n"));
  const videoPath = join(outDir, "reel.mp4");
  await run(ffmpegStatic, [
    "-y", "-f", "concat", "-safe", "0", "-i", concatFile,
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
    "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", videoPath,
  ]);

  // ---------- 7) Caption ----------
  const caption = [
    topic.hook, "",
    topic.dialog.filter(l => l.speaker !== "narrator").map(l => `${l.label}: ${l.text}`).join("\n"), "",
    "📲 Lade die FamilienApp kostenlos — Link im Profil!", "",
    (topic.hashtags || []).join(" "),
  ].join("\n");
  await writeFile(join(outDir, "caption.txt"), caption, "utf-8");

  const st = await stat(videoPath);
  log(`✓ Fertig: ${videoPath}`);
  log(`  Größe: ${(st.size/1024/1024).toFixed(1)} MB`);
  log(`  Caption: ${join(outDir, "caption.txt")}`);
}

main().catch(err => { console.error("\nFEHLER:", err.message); process.exit(1); });
