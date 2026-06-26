// FamilienApp — KI-Proxy (Vercel Serverless Function)
// Hält den Gemini-Schlüssel GEHEIM als ENV-Variable. Die App ruft NUR diesen Proxy auf,
// niemals Google direkt. So sehen Endkunden nie einen Schlüssel.
//
// Deploy: siehe ../README.md  (kostenlos, ca. 5 Minuten)
// ENV-Variable setzen: GEMINI_API_KEY = dein Google-Gemini-Schlüssel

// Mehrere Modelle in Reihenfolge — faellt ein Modell weg (404), wird das naechste probiert.
// So bricht der Dienst nicht, wenn Google ein Modell abschaltet.
const MODELS = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.0-flash-001'];
// Optional: auf deine App-Domain einschränken (empfohlen, sobald die App live ist).
const ERLAUBTE_ORIGINS = ['https://marcel-fe.github.io', 'http://localhost:8000'];

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allow = ERLAUBTE_ORIGINS.includes('*') ? '*'
    : (ERLAUBTE_ORIGINS.includes(origin) ? origin : ERLAUBTE_ORIGINS[0]);
  res.setHeader('Access-Control-Allow-Origin', allow);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Nur POST erlaubt' });

  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: 'GEMINI_API_KEY ist nicht gesetzt (ENV-Variable).' });

  const warte = ms => new Promise(r => setTimeout(r, ms));
  const TRANSIENT = [429, 500, 502, 503];
  const basis = (req.body && typeof req.body === 'object') ? req.body : {};
  let letzte = { status: 502, data: { error: 'Verbindung zur KI fehlgeschlagen.' } };
  for (const model of MODELS) {
    // Internes "Thinking" abschalten, wo unterstuetzt (2.5 / latest) -> spart deutlich Tokens/Kosten.
    let payload = basis;
    if (/2\.5|flash-latest/.test(model)) {
      const gc = basis.generationConfig || {};
      payload = { ...basis, generationConfig: { ...gc, thinkingConfig: { ...(gc.thinkingConfig || {}), thinkingBudget: 0 } } };
    }
    let naechstesModell = false;
    // Pro Modell bis zu 2 Versuche bei kurzen Aussetzern (429/5xx) — damit die KI zuverlaessig antwortet.
    for (let v = 0; v < 2 && !naechstesModell; v++) {
      try {
        const upstream = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
        );
        const data = await upstream.json();
        if (upstream.status === 404) { letzte = { status: 404, data }; naechstesModell = true; break; }
        if (TRANSIENT.includes(upstream.status) && v < 1) { letzte = { status: upstream.status, data }; await warte(600); continue; }
        return res.status(upstream.status).json(data);
      } catch (e) {
        letzte = { status: 502, data: { error: 'Verbindung zur KI fehlgeschlagen.' } };
        if (v < 1) await warte(600);
      }
    }
  }
  return res.status(letzte.status).json(letzte.data);
}
