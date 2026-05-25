/**
 * Cloudflare Worker — Familien-Kalender-Sync für FamilienApp
 *
 * Speichert Termine in Cloudflare KV unter einem 6-stelligen Familien-Code.
 * Jedes Familienmitglied trägt denselben Code in der App ein — Termine
 * werden zwischen allen Geräten dieser "Familie" synchronisiert.
 *
 * SETUP: siehe KALENDER-WORKER-SETUP.md
 *
 * Endpunkte:
 *   GET  /sync?code=ABC123                — alle Termine + version-Stand zurück
 *   GET  /sync?code=ABC123&since=12345    — nur Termine, die nach Zeitstempel geändert wurden
 *   POST /sync?code=ABC123                — Body: { termine: [...] } — merged in KV
 *   GET  /ping                            — Health-Check
 *
 * Konflikt-Auflösung: pro Termin-ID gewinnt der höhere `updatedAt`-Wert.
 * Lösch-Tombstones (`_deleted: true`) bleiben 30 Tage liegen, dann purged.
 *
 * Kostenlos: Free-Tier reicht für eine Familie locker (1k KV-Writes/Tag,
 * 100k KV-Reads/Tag, 100k Requests/Tag).
 */

const CODE_REGEX = /^[A-Z0-9]{6}$/;
const MAX_TERMINE = 500;                 // pro Familie hart begrenzt
const MAX_BODY_BYTES = 256 * 1024;       // 256 KB Body-Limit
const TOMBSTONE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 Tage

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders();

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

    if (url.pathname === '/ping') {
      return json({ ok: true, ts: Date.now() }, 200, cors);
    }

    if (url.pathname !== '/sync') {
      return json({ ok: false, fehler: 'Unbekannter Pfad' }, 404, cors);
    }

    if (!env.FAMILIEN_KV) {
      return json({
        ok: false,
        fehler: 'KV-Namespace FAMILIEN_KV nicht gebunden — siehe KALENDER-WORKER-SETUP.md Schritt 3.'
      }, 500, cors);
    }

    const code = String(url.searchParams.get('code') || '').toUpperCase().trim();
    if (!CODE_REGEX.test(code)) {
      return json({ ok: false, fehler: 'Ungültiger Familien-Code (6 Zeichen A-Z 0-9 erwartet).' }, 400, cors);
    }
    const key = `kalender:${code}`;

    try {
      if (request.method === 'GET') {
        return await handleGet(request, env, key, url, cors);
      }
      if (request.method === 'POST') {
        return await handlePost(request, env, key, cors);
      }
      return json({ ok: false, fehler: 'Methode nicht erlaubt' }, 405, cors);
    } catch (e) {
      return json({ ok: false, fehler: 'Server-Fehler: ' + e.message }, 500, cors);
    }
  }
};

async function handleGet(request, env, key, url, cors) {
  const raw = await env.FAMILIEN_KV.get(key);
  const store = raw ? safeParse(raw) : { version: 0, termine: [], updatedAt: 0 };
  const since = parseInt(url.searchParams.get('since') || '0', 10) || 0;
  const termine = since > 0
    ? (store.termine || []).filter(t => (t.updatedAt || 0) > since)
    : (store.termine || []);
  return json({
    ok: true,
    version: store.version || 0,
    updatedAt: store.updatedAt || 0,
    anzahl: termine.length,
    termine
  }, 200, cors);
}

async function handlePost(request, env, key, cors) {
  const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, fehler: 'Body zu groß (max. 256 KB).' }, 413, cors);
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, fehler: 'Body ist kein gültiges JSON.' }, 400, cors);
  }
  const eingang = Array.isArray(body?.termine) ? body.termine : null;
  if (!eingang) {
    return json({ ok: false, fehler: 'Body muss { termine: [...] } enthalten.' }, 400, cors);
  }
  if (eingang.length > MAX_TERMINE) {
    return json({ ok: false, fehler: `Zu viele Termine (max. ${MAX_TERMINE}).` }, 400, cors);
  }

  const raw = await env.FAMILIEN_KV.get(key);
  const store = raw ? safeParse(raw) : { version: 0, termine: [], updatedAt: 0 };
  const bestand = Array.isArray(store.termine) ? store.termine : [];

  // Merge: pro ID höherer updatedAt gewinnt; Eingangs-Tombstones markieren als gelöscht.
  const merged = new Map();
  for (const t of bestand) {
    if (t && t.id != null) merged.set(String(t.id), t);
  }
  for (const t of eingang) {
    if (!t || t.id == null) continue;
    const id = String(t.id);
    const alt = merged.get(id);
    const tu = Number(t.updatedAt) || 0;
    const au = Number(alt?.updatedAt) || 0;
    if (!alt || tu >= au) {
      merged.set(id, sanitize(t));
    }
  }

  // Alte Tombstones purgen
  const cutoff = Date.now() - TOMBSTONE_TTL_MS;
  const termine = Array.from(merged.values()).filter(t =>
    !(t._deleted && (Number(t.updatedAt) || 0) < cutoff)
  );

  if (termine.length > MAX_TERMINE) {
    return json({ ok: false, fehler: `Familien-Kalender voll (max. ${MAX_TERMINE} Termine).` }, 409, cors);
  }

  const neu = {
    version: (store.version || 0) + 1,
    updatedAt: Date.now(),
    termine
  };
  await env.FAMILIEN_KV.put(key, JSON.stringify(neu));

  return json({
    ok: true,
    version: neu.version,
    updatedAt: neu.updatedAt,
    anzahl: termine.length,
    termine
  }, 200, cors);
}

// Erlaubte Termin-Felder durchlassen — verhindert, dass Clients beliebige Daten einschleusen.
function sanitize(t) {
  const erlaubt = ['id','titel','datum','zeit','uhrzeit','typ','notiz','person','personen',
                   '_deleted','_quelle','feiertag','recurring'];
  const o = {};
  for (const k of erlaubt) if (t[k] !== undefined) o[k] = t[k];
  o.updatedAt = Number(t.updatedAt) || Date.now();
  // String-Felder kappen
  for (const k of ['titel','notiz','typ','zeit','uhrzeit']) {
    if (typeof o[k] === 'string' && o[k].length > 500) o[k] = o[k].slice(0, 500);
  }
  return o;
}

function safeParse(raw) {
  try { return JSON.parse(raw); } catch { return { version: 0, termine: [], updatedAt: 0 }; }
}

function json(obj, status, extra) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extra }
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store'
  };
}
