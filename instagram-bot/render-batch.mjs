// render-batch.mjs — rendert mehrere Reels nacheinander.
//
// Usage: node render-batch.mjs <topic1> <topic2> ...
// Ohne Argumente: rendert eine kuratierte Auswahl quer durch die Kategorien.

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DEFAULT = [
  "kinderzuschlag",         // finanzen
  "trotzphase-supermarkt",  // erziehung
  "morgenstress",           // alltag
  "fieber-kind",            // gesundheit
  "beikost-start",          // baby
  "einschulung",            // kinder/schule
];

function runReel(topic) {
  return new Promise((resolve) => {
    const p = spawn("node", [join(__dirname, "generate-reel.mjs"), topic],
      { stdio: "inherit", shell: false });
    p.on("close", code => resolve(code === 0));
    p.on("error", () => resolve(false));
  });
}

const topics = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT;
const results = [];

for (let i = 0; i < topics.length; i++) {
  console.log(`\n========== [${i + 1}/${topics.length}] Reel: ${topics[i]} ==========\n`);
  const ok = await runReel(topics[i]);
  results.push({ topic: topics[i], ok });
}

console.log("\n========== BATCH FERTIG ==========");
for (const r of results) {
  console.log(`  ${r.ok ? "✓" : "✗ FEHLER"}  ${r.topic}`);
}
const okCount = results.filter(r => r.ok).length;
console.log(`\n${okCount}/${results.length} Reels erfolgreich.`);
