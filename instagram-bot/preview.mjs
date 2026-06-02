// preview.mjs — rendert nur einen einzelnen Vorschau-Frame zum Layout-Testen.
// Usage: node preview.mjs [scene] [text] [speaker]
//   z.B. node preview.mjs wohnzimmer "Hallo Familie!" mama

import puppeteer from "puppeteer-core";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cs = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  for (const p of cs) if (existsSync(p)) return p;
  throw new Error("Chrome/Edge nicht gefunden");
}

const scene = process.argv[2] || "wohnzimmer";
const text = process.argv[3] || "Kennst du das? Kindergeld-Antrag und du weißt nicht wo anfangen.";
const speaker = process.argv[4] || "mama";

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
  defaultViewport: { width: 1080, height: 1920 },
});
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(join(__dirname, "templates", "scene.html")).href, { waitUntil: "networkidle0" });
await page.evaluate((s, t, sp) => {
  window.__scene.setScene(s);
  window.__scene.setSubtitle(t);
  window.__scene.setSpeaker(sp);
  window.__scene.showOutro(false);
}, scene, text, speaker);
await new Promise(r => setTimeout(r, 600));
const out = join(__dirname, "output", `preview-${scene}-${speaker}.png`);
await page.screenshot({ path: out, fullPage: false });
console.log("Saved:", out);
await browser.close();
