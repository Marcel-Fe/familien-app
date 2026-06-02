// pollinations.mjs — Bild-Generator über Pollinations.ai (FLUX, gratis, kein API-Key).
//
// Lädt ein Bild zu einem Prompt herunter und speichert es lokal.
// Bei festem `seed` ist das Ergebnis reproduzierbar (für Charakter-Konsistenz).

import { writeFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname } from "node:path";

const BASE = "https://image.pollinations.ai/prompt/";

/**
 * @param {string} prompt   Beschreibung des Bildes
 * @param {string} outPath  Zielpfad (z.B. /tmp/bild.jpg)
 * @param {object} opts     { width, height, seed, model, nologo, enhance }
 * @returns {Promise<string>} outPath
 */
export async function generateImage(prompt, outPath, opts = {}) {
  const {
    width = 1080,
    height = 1920,
    seed = 42,
    model = "flux",
    nologo = true,
    enhance = true,
    negativePrompt = "",
    timeoutMs = 90000,
  } = opts;

  if (existsSync(outPath)) {
    const s = await stat(outPath);
    if (s.size > 5000) return outPath;
  }

  let url = `${BASE}${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}&nologo=${nologo}&enhance=${enhance}&private=true`;
  if (negativePrompt) url += `&negative_prompt=${encodeURIComponent(negativePrompt)}`;

  await mkdir(dirname(outPath), { recursive: true });

  let lastErr;
  const MAX_ATTEMPTS = 5;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const ctrl = new AbortController();
      const tm = setTimeout(() => ctrl.abort(), timeoutMs);
      const res = await fetch(url, { signal: ctrl.signal, headers: { "user-agent": "FamilienApp-Bot/1.0" } });
      clearTimeout(tm);
      if (!res.ok) {
        const e = new Error(`Pollinations HTTP ${res.status}`);
        e.status = res.status;
        throw e;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 5000) throw new Error(`Bild zu klein (${buf.length} Bytes)`);
      await writeFile(outPath, buf);
      return outPath;
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_ATTEMPTS) {
        // Bei Rate-Limit (402/429): lange warten. Sonst: kurzer Backoff.
        const isRateLimit = err.status === 402 || err.status === 429;
        const waitMs = isRateLimit ? 30000 + attempt * 15000 : 3000 * attempt;
        await new Promise(r => setTimeout(r, waitMs));
      }
    }
  }
  throw new Error(`Pollinations-Download fehlgeschlagen nach ${MAX_ATTEMPTS} Versuchen: ${lastErr.message}`);
}
