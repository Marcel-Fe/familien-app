// generate-app-tour.mjs — FamilienApp Tour-Video (echte App, warme Erzaehlerin)
//
// Puppeteer navigiert durch die LIVE-App auf localhost:8000 und nimmt pro
// Szene Frames auf. Katja-Voice (warm-deutsch) als Voiceover.
// 9:16 1080x1920, ~22s, kein Cloud-Service, kostenlos.
//
// Voraussetzung: lokaler Server muss laufen — `python -m http.server 8000`
//
// Usage:
//   node generate-app-tour.mjs
//   KEEP_FRAMES=1 node generate-app-tour.mjs   (Frames zum Pruefen behalten)

import { readFile, writeFile, mkdir, rm, stat, copyFile } from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer-core";
import ffmpegStatic from "ffmpeg-static";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FPS = 25;
const VIEWPORT = { width: 1080, height: 1920 };
const INTRO_PAUSE = 0.35;
const VOICE = "de-DE-KatjaNeural";   // warme, natuerliche deutsche Stimme
const APP_URL = process.env.APP_URL || "http://localhost:8000/";

// ---------- Drehbuch ----------
// Pro Szene: was die Stimme sagt + welche Sektion gezeigt wird + wie lange
// die Szene nach dem Ende der Stimme noch nachleuchtet (tail).
// `setup` laeuft im Browser, bevor die Szene aufgenommen wird.
const SCENES = [
  {
    id: "intro",
    voice: "Eine App, die wirklich alles bündelt, was eine Familie braucht.",
    setup: `zuSektion('dashboard'); window.scrollTo({top:0, behavior:'instant'});`,
    scroll: 0,
    tail: 0.4,
    overlay: "intro",
  },
  {
    id: "antraege",
    voice: "Über zwanzig Behörden-Anträge — Wohngeld, Kindergeld, BAföG, Unterhaltsvorschuss. Schritt für Schritt erklärt für alle sechzehn Bundesländer.",
    setup: `state.antragId=null; zuSektion('formular'); window.scrollTo({top:0, behavior:'instant'});`,
    scroll: 350,
    tail: 0.4,
  },
  {
    id: "gesundheit",
    voice: "Sechshundert Hausmittel, Symptom-Check und Hebammen-Suche in der Nähe.",
    setup: `zuSektion('gesundheit'); window.scrollTo({top:0, behavior:'instant'});`,
    scroll: 300,
    tail: 0.4,
  },
  {
    id: "schwangerschaft-kinder",
    voice: "Begleitung von der Schwangerschaft bis zur Hausaufgaben-Hilfe für jede Klasse.",
    setup: `zuSektion('schwangerschaft'); window.scrollTo({top:0, behavior:'instant'});`,
    scroll: 300,
    tail: 0.4,
  },
  {
    id: "umgebung",
    voice: "Spielplätze, Bastelideen, Rezepte und Spar-Tipps — alles speziell für Familien.",
    setup: `zuSektion('familie'); window.scrollTo({top:0, behavior:'instant'});`,
    scroll: 300,
    tail: 0.4,
  },
  {
    id: "ki-assistent",
    voice: "Stell einfach deine Frage — der Familien-Assistent antwortet sofort.",
    setup: `state.suchQuery=''; zuSektion('suche'); window.scrollTo({top:0, behavior:'instant'}); setTimeout(function(){var inp=document.getElementById('ki-input-suche'); if(inp){inp.value='Wie viel Kindergeld steht uns zu?';} if(window.kiSuchStarten){kiSuchStarten('suche');} if(window.kiAbbrechen){kiAbbrechen();} setTimeout(function(){var b=document.getElementById('ki-antwort-suche'); if(b){b.scrollIntoView({block:'start'});}}, 200);}, 250);`,
    scroll: 0,
    tail: 0.6,
  },
  {
    id: "cta",
    voice: "Die FamilienApp gibt es bald im App Store und im Play Store. Und schon heute ganz einfach im Browser.",
    setup: `zuSektion('dashboard'); window.scrollTo({top:0, behavior:'instant'});`,
    scroll: 0,
    tail: 1.1,
    overlay: "cta",
  },
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
// Szenen-Overlay einsetzen (animiert): Intro-Headline, Schluss-CTA oder Standard-Untertitel.
async function addSceneOverlay(page, s) {
  if (s.overlay === 'intro') {
    await page.evaluate(() => {
      const o = document.createElement('div');
      o.className = '__tour_outro __tour_intro_style';
      o.innerHTML = '<div class="__tour_emoji">👨‍👩‍👧‍👦</div><h1>FamilienApp</h1><p>Alles für die ganze Familie<br>in einer App.</p>';
      document.body.appendChild(o);
    });
  } else if (s.overlay === 'cta') {
    await page.evaluate(() => {
      const o = document.createElement('div');
      o.className = '__tour_outro';
      o.innerHTML = '<div class="__tour_emoji">💛</div><h1>FamilienApp</h1><p>Bald im App Store<br>und Play Store</p>'
        + '<div class="__tour_store-row"><div class="__tour_store-pill">📱 App Store</div><div class="__tour_store-pill">🤖 Play Store</div></div>'
        + '<div class="__tour_url">Jetzt schon im Browser:<br>marcel-fe.github.io/familien-app</div>';
      document.body.appendChild(o);
    });
  } else {
    await page.evaluate(text => {
      const cap = document.createElement('div');
      cap.className = '__tour_caption';
      cap.innerHTML = '<div class="__tour_caption-inner">' + text + '</div>';
      document.body.appendChild(cap);
      const bar = document.createElement('div');
      bar.className = '__tour_brandbar';
      bar.innerHTML = '<span>📱 FamilienApp</span>';
      document.body.appendChild(bar);
    }, s.voice);
  }
}

// ---------- main ----------
async function main() {
  const slug = `${new Date().toISOString().slice(0,10)}_app-tour`;
  const outDir = join(__dirname, "output", slug);
  const framesDir = join(outDir, "frames");
  const audioDir = join(outDir, "audio");
  await rm(framesDir, { recursive: true, force: true });
  await rm(audioDir, { recursive: true, force: true });
  await mkdir(framesDir, { recursive: true });
  await mkdir(audioDir, { recursive: true });

  // ---------- 1) TTS (Katja, warm) ----------
  log("Generiere warme Erzaehler-Stimme (Edge-TTS, Katja)...");
  const segs = SCENES.map((s, i) => ({ id: String(i), text: s.voice, voice: VOICE }));
  await writeFile(join(audioDir, "_segments.json"), JSON.stringify(segs, null, 2));
  await run(findPython(), [join(__dirname, "tts.py"), audioDir, join(audioDir, "_segments.json")]);
  const durations = JSON.parse(await readFile(join(audioDir, "durations.json"), "utf-8"));
  log(`  ${Object.keys(durations).length} Audio-Segmente generiert`);

  // ---------- 2) Timeline ----------
  let t = INTRO_PAUSE;
  const timeline = [];
  for (let i = 0; i < SCENES.length; i++) {
    const dur = durations[String(i)];
    const tail = SCENES[i].tail;
    timeline.push({ index: i, start: t, end: t + dur + tail, dur, tail, scene: SCENES[i] });
    t += dur + tail;
  }
  const totalDuration = t;
  const totalFrames = Math.ceil(totalDuration * FPS);
  log(`Timeline: ${totalDuration.toFixed(1)}s, ${totalFrames} Frames`);

  // ---------- 3) Audio (Sprache + Stille passend zur Timeline) ----------
  const concatLines = [];
  await silentMp3(join(audioDir, "_intro.mp3"), INTRO_PAUSE);
  concatLines.push(`file '${join(audioDir, "_intro.mp3").replace(/\\/g,"/")}'`);
  for (let i = 0; i < SCENES.length; i++) {
    concatLines.push(`file '${join(audioDir, `${i}.mp3`).replace(/\\/g,"/")}'`);
    await silentMp3(join(audioDir, `_gap_${i}.mp3`), SCENES[i].tail);
    concatLines.push(`file '${join(audioDir, `_gap_${i}.mp3`).replace(/\\/g,"/")}'`);
  }
  await writeFile(join(audioDir, "concat.txt"), concatLines.join("\n"));
  const voicePath = join(outDir, "voice.mp3");
  await run(ffmpegStatic, ["-y", "-f", "concat", "-safe", "0",
    "-i", join(audioDir, "concat.txt"), "-c:a", "libmp3lame", "-b:a", "192k", voicePath]);

  // Ambient-Pad: warmer A-Dur-Akkord (drei tiefe Sinus-Töne) + lowpass + Hall,
  // sehr leise unter dem Voiceover. Keine externe Datei, keine Lizenz nötig.
  log("Erzeuge Ambient-Musik (warme Pad-Spur)...");
  const ambientPath = join(outDir, "ambient.mp3");
  const dur = totalDuration.toFixed(2);
  const fadeOutStart = (totalDuration - 2.5).toFixed(2);
  await run(ffmpegStatic, [
    "-y",
    "-f", "lavfi", "-i", `sine=frequency=220:sample_rate=44100:duration=${dur}`,
    "-f", "lavfi", "-i", `sine=frequency=277:sample_rate=44100:duration=${dur}`,
    "-f", "lavfi", "-i", `sine=frequency=165:sample_rate=44100:duration=${dur}`,
    "-f", "lavfi", "-i", `sine=frequency=110:sample_rate=44100:duration=${dur}`,
    "-filter_complex",
      `[0]volume=0.6[a0];[1]volume=0.4[a1];[2]volume=0.55[a2];[3]volume=0.35[a3];`
    + `[a0][a1][a2][a3]amix=inputs=4:duration=shortest:normalize=0,`
    + `lowpass=f=520,`
    + `aecho=0.7:0.45:900|1500:0.45|0.32,`
    + `volume=-22dB,`
    + `afade=t=in:st=0:d=2.5,afade=t=out:st=${fadeOutStart}:d=2.5`,
    "-c:a", "libmp3lame", "-b:a", "128k", ambientPath,
  ], { stdio: "ignore" });

  // Voice + Ambient mischen — Voice in voller Lautstärke, Ambient bereits leise
  const audioPath = join(outDir, "audio.mp3");
  await run(ffmpegStatic, [
    "-y", "-i", voicePath, "-i", ambientPath,
    "-filter_complex", "[0:a][1:a]amix=inputs=2:duration=first:dropout_transition=0:normalize=0",
    "-c:a", "libmp3lame", "-b:a", "192k", audioPath,
  ]);

  // ---------- 4) Browser starten + App laden ----------
  log("Starte Browser, lade App von " + APP_URL);
  const browser = await puppeteer.launch({
    executablePath: findChrome(), headless: "shell",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage",
           "--hide-scrollbars", "--no-first-run", "--no-default-browser-check"],
    defaultViewport: VIEWPORT,
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ ...VIEWPORT, deviceScaleFactor: 1, isMobile: true });
    // App im Demo-Modus laden (Splash, Banner, Popups skip)
    await page.goto(APP_URL + "?demo=1", { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => {
      const einst = JSON.parse(localStorage.getItem('familienapp_einstellungen')||'{}');
      einst.datenschutzAkzeptiert = true;
      einst.installBannerWeg = true;
      einst.tagesinfoPopup = false;
      einst.regenwarnung = false;
      localStorage.setItem('familienapp_einstellungen', JSON.stringify(einst));
      // Standort fuer Wetter/Radar/Umgebung: Wolfsburg als Beispiel
      const u = JSON.parse(localStorage.getItem('familienapp_user')||'{}');
      u.vorname = u.vorname || 'Familie';
      u.ort = u.ort || 'Wolfsburg';
      u.lat = u.lat || 52.42;
      u.lng = u.lng || 10.78;
      u.bundesland = u.bundesland || 'NI';
      localStorage.setItem('familienapp_user', JSON.stringify(u));
    });
    await page.reload({ waitUntil: "networkidle0" });
    await page.evaluate(() => {
      const s = document.getElementById('splash'); if (s) s.style.display = 'none';
      const r = document.getElementById('reg-overlay'); if (r) r.classList.add('versteckt');
      document.querySelectorAll('.tagesinfo-overlay, .tagesinfo-popup, .toast-msg').forEach(el => el.remove());
    });
    await new Promise(r => setTimeout(r, 800));

    // Brand-Outro-Stil als CSS injizieren (fuer letzte Szene)
    await page.addStyleTag({ content: `
      .__tour_outro {
        position: fixed; inset: 0; z-index: 99999;
        background: linear-gradient(135deg, rgba(76,29,149,.92) 0%, rgba(124,58,237,.85) 50%, rgba(219,39,119,.92) 100%);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        color: white; text-align: center; padding: 4rem 3rem;
        animation: __tour_fadein 600ms ease-out;
      }
      .__tour_outro h1 { font-size: 5.5rem; font-weight: 900; line-height: 1.05; margin: 0 0 1.5rem; letter-spacing: -.03em; }
      .__tour_outro p  { font-size: 2.2rem; font-weight: 700; line-height: 1.3; opacity: .96; margin: 0 0 2.5rem; }
      .__tour_outro .__tour_url {
        font-size: 1.4rem; font-weight: 700; background: rgba(255,255,255,.18);
        padding: .85rem 1.6rem; border-radius: 22px; border: 2px solid rgba(255,255,255,.3);
        line-height: 1.4; margin-top: 1.5rem;
      }
      .__tour_outro .__tour_store-row {
        display: flex; gap: 1rem; margin: 0 0 .5rem;
      }
      .__tour_outro .__tour_store-pill {
        background: rgba(255,255,255,.94); color: #1E1B4B;
        padding: 1rem 1.8rem; border-radius: 99px;
        font-size: 1.7rem; font-weight: 800;
      }
      .__tour_outro .__tour_emoji { font-size: 6rem; margin-bottom: 1.5rem; }
      @keyframes __tour_fadein { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }

      .__tour_caption {
        position: fixed; left: 0; right: 0; bottom: 6%; z-index: 99998;
        padding: 0 6%;
      }
      .__tour_caption-inner {
        background: linear-gradient(180deg, rgba(0,0,0,.0) 0%, rgba(0,0,0,.55) 100%);
        backdrop-filter: blur(8px);
        color: white; font-size: 2rem; font-weight: 700; line-height: 1.3;
        padding: 1.4rem 1.6rem; border-radius: 22px;
        text-shadow: 0 2px 8px rgba(0,0,0,.5);
        border: 1px solid rgba(255,255,255,.18);
      }

      .__tour_brandbar {
        position: fixed; top: 3%; left: 0; right: 0; z-index: 99997;
        text-align: center; pointer-events: none;
      }
      .__tour_brandbar span {
        display: inline-block;
        background: rgba(15,23,42,.78); backdrop-filter: blur(8px);
        color: white; font-size: 1.4rem; font-weight: 800;
        padding: .6rem 1.4rem; border-radius: 99px;
        border: 1px solid rgba(255,255,255,.2);
        letter-spacing: .04em;
        animation: __tour_barin .5s ease-out both;
      }

      /* Modern: Story-Fortschrittsbalken oben */
      .__tour_progress {
        position: fixed; top: 0; left: 0; right: 0; z-index: 100001;
        display: flex; gap: 5px; padding: 12px 14px 0; pointer-events: none;
      }
      .__tour_progress_seg {
        flex: 1; height: 4px; border-radius: 99px; overflow: hidden;
        background: rgba(255,255,255,.32);
        box-shadow: 0 1px 3px rgba(0,0,0,.28);
      }
      .__tour_progress_fill { height: 100%; width: 0; background: #fff; border-radius: 99px; }

      /* Modern: animierte Untertitel + Markenleiste */
      .__tour_caption-inner { animation: __tour_capin .55s cubic-bezier(.22,.8,.24,1) both; }
      @keyframes __tour_capin { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes __tour_barin { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: translateY(0); } }
    `});

    // Pro Szene: Setup + Crossfade + Ken-Burns-Zoom + animierte Untertitel + Fortschrittsbalken
    log("Render Frames...");
    let frameIdx = 0;
    const DISSOLVE = 10;   // Frames für die weiche Überblendung zwischen Szenen

    // Story-Fortschrittsbalken (persistent, oben) — ein Segment je Szene
    await page.evaluate(n => {
      const bar = document.createElement('div');
      bar.id = '__tour_progress'; bar.className = '__tour_progress';
      for (let i = 0; i < n; i++) bar.insertAdjacentHTML('beforeend',
        '<div class="__tour_progress_seg"><div class="__tour_progress_fill"></div></div>');
      document.body.appendChild(bar);
    }, SCENES.length);

    // INTRO_PAUSE — kurzer schwarzer Vorspann (Fade-in macht das Video sauber)
    const introFrames = Math.round(INTRO_PAUSE * FPS);
    await page.evaluate(() => {
      const o = document.createElement('div');
      o.id = '__tour_blackout';
      o.style.cssText = 'position:fixed;inset:0;z-index:100002;background:#0E141C';
      document.body.appendChild(o);
    });
    for (let f = 0; f < introFrames; f++) {
      await page.screenshot({ path: join(framesDir, `f_${pad(frameIdx++)}.jpg`), type: "jpeg", quality: 88 });
    }
    await page.evaluate(() => { document.getElementById('__tour_blackout')?.remove(); });

    for (let i = 0; i < SCENES.length; i++) {
      const s = SCENES[i];
      const sceneFrames = Math.ceil((s.dur ? s.dur : durations[String(i)]) * FPS) + Math.ceil(s.tail * FPS);
      const dissolveFrames = i > 0 ? DISSOLVE : 0;
      const zoom = !s.overlay && !(s.scroll > 0);   // Ken-Burns nur dort, wo nicht gescrollt wird
      const scrollDistance = s.scroll || 0;
      log(`  Szene ${i+1}/${SCENES.length} (${s.id}): ${sceneFrames} Frames`);

      // Crossfade: Schnappschuss der noch laufenden Szene als Überblend-Ebene festhalten
      let dissolveSrc = null;
      if (dissolveFrames) {
        const buf = await page.screenshot({ type: "jpeg", quality: 80 });
        // Buffer.from nötig: puppeteer liefert ein Uint8Array, dessen toString('base64') ungültig wäre
        dissolveSrc = "data:image/jpeg;base64," + Buffer.from(buf).toString("base64");
      }

      // Setup laufen lassen (Sektion öffnen etc.) + Overlays/Zoom zurücksetzen
      await page.evaluate(setupCode => {
        document.querySelectorAll('.__tour_caption, .__tour_outro, .toast-msg').forEach(el => el.remove());
        const c = document.getElementById('content');
        if (c) { c.style.transition = 'none'; c.style.transformOrigin = '50% 38%'; c.style.transform = 'scale(1)'; }
        try { eval(setupCode); } catch (e) { console.warn('setup error:', e); }
      }, s.setup);
      await new Promise(r => setTimeout(r, 600));    // Render-Zeit der Sektion

      // Überblend-Ebene einsetzen — über App + Untertitel, aber unter dem Fortschrittsbalken
      if (dissolveSrc) {
        await page.evaluate(async src => {
          const img = document.createElement('img');
          img.id = '__tour_dissolve'; img.src = src;
          img.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;object-fit:cover;z-index:100000;opacity:1;pointer-events:none';
          document.body.appendChild(img);
          try { await img.decode(); } catch {}   // sicherstellen, dass das Bild sichtbar ist, bevor geblendet wird
        }, dissolveSrc);
      }

      let overlayAdded = false;
      for (let f = 0; f < sceneFrames; f++) {
        const prog = sceneFrames > 1 ? f / (sceneFrames - 1) : 1;

        // Nach der Überblendung: Untertitel/Overlay animiert einsetzen
        if (f === dissolveFrames && !overlayAdded) {
          await page.evaluate(() => document.getElementById('__tour_dissolve')?.remove());
          await addSceneOverlay(page, s);
          overlayAdded = true;
        }

        // Alles fürs Frame in EINEM Browser-Aufruf (Fortschritt, Scroll, Zoom, Überblendung)
        await page.evaluate(a => {
          document.querySelectorAll('#__tour_progress .__tour_progress_fill').forEach((fl, j) => {
            fl.style.width = (j < a.idx ? 100 : j === a.idx ? Math.round(a.prog * 100) : 0) + '%';
          });
          if (a.scrollY != null) window.scrollTo(0, a.scrollY);
          if (a.scale != null) { const c = document.getElementById('content'); if (c) c.style.transform = 'scale(' + a.scale + ')'; }
          if (a.dissolveOp != null) { const d = document.getElementById('__tour_dissolve'); if (d) d.style.opacity = a.dissolveOp; }
        }, {
          idx: i, prog,
          scrollY: scrollDistance > 0 ? Math.round(scrollDistance * prog) : null,
          scale: zoom ? (1 + 0.07 * prog).toFixed(4) : null,
          dissolveOp: f < dissolveFrames ? (1 - (f + 1) / dissolveFrames).toFixed(3) : null,
        });

        await page.screenshot({ path: join(framesDir, `f_${pad(frameIdx++)}.jpg`), type: "jpeg", quality: 88 });
        if (frameIdx % 50 === 0) log(`    Frame ${frameIdx}/${totalFrames}`);
      }
    }

    log(`  ${frameIdx} Frames gerendert`);
  } finally {
    await browser.close();
  }

  // ---------- 5) MP4 encodieren ----------
  log("Encodiere MP4...");
  const videoPath = join(outDir, "familienapp-tour.mp4");
  await run(ffmpegStatic, [
    "-y", "-framerate", String(FPS), "-i", join(framesDir, "f_%05d.jpg"),
    "-i", audioPath, "-c:v", "libx264", "-pix_fmt", "yuv420p",
    "-preset", "medium", "-crf", "20", "-c:a", "aac", "-b:a", "192k",
    "-shortest", "-movflags", "+faststart",
    "-vf", "fade=t=in:st=0:d=0.4,fade=t=out:st=" + (totalDuration-0.6).toFixed(2) + ":d=0.5",
    videoPath,
  ]);

  // Kopie in reels-fertig (Standard-Ablage)
  const finalPath = join(__dirname, "reels-fertig", "familienapp-tour.mp4");
  await mkdir(dirname(finalPath), { recursive: true });
  await copyFile(videoPath, finalPath);

  if (!process.env.KEEP_FRAMES) await rm(framesDir, { recursive: true, force: true });

  const st = await stat(finalPath);
  log(`✓ Fertig: ${finalPath}`);
  log(`  Dauer: ${totalDuration.toFixed(1)}s   Groesse: ${(st.size/1024/1024).toFixed(1)} MB`);
}

main().catch(err => { console.error("\nFEHLER:", err.message); process.exit(1); });
