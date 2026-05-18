const CACHE_VERSION = 'familienapp-v44';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Kern-Assets die immer offline verfügbar sein sollen
const CORE_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './js/data.js',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  // Externe Dependencies
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Install: Kern-Assets cachen + sofort aktiv werden
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then(c => Promise.all(CORE_ASSETS.map(url =>
        c.add(url).catch(err => console.warn('Cache miss:', url, err))
      )))
      .then(() => self.skipWaiting())
  );
});

// Activate: alte Caches aufräumen
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !k.startsWith(CACHE_VERSION)).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch-Strategien
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);

  // Nur GET cachen
  if (req.method !== 'GET') return;

  // Bilder (Unsplash, Pexels, QR-Server, Google Charts) - stale-while-revalidate
  if (req.destination === 'image' ||
      url.hostname.includes('unsplash.com') ||
      url.hostname.includes('pexels.com') ||
      url.hostname.includes('qrserver.com') ||
      url.hostname.includes('googleapis.com')) {
    e.respondWith(staleWhileRevalidate(req, IMAGE_CACHE));
    return;
  }

  // Live-API-Aufrufe (Wetter, OSM, Tankerkönig, RSS-Feeds): Network-first mit Cache-Fallback
  if (url.hostname.includes('overpass-api.de') ||
      url.hostname.includes('nominatim.openstreetmap.org') ||
      url.hostname.includes('tile.openstreetmap.org') ||
      url.hostname.includes('arbeitsagentur.de') ||
      url.hostname.includes('open-meteo.com') ||
      url.hostname.includes('pollinations.ai') ||
      url.hostname.includes('themealdb.com') ||
      url.hostname.includes('allorigins.win') ||
      url.hostname.includes('corsproxy.io') ||
      url.hostname.includes('codetabs.com') ||
      url.hostname.includes('thingproxy') ||
      url.hostname.includes('router.project-osrm.org')) {
    e.respondWith(networkFirst(req, RUNTIME_CACHE));
    return;
  }

  // App-Dateien (eigene): Network-first — online immer aktuell, Cache nur als Offline-Reserve
  if (url.origin === self.location.origin) {
    e.respondWith(appAsset(req));
    return;
  }

  // Alles andere: Network mit Cache-Fallback
  e.respondWith(networkFirst(req, RUNTIME_CACHE));
});

// App-Dateien: Network-first mit Cache-Reserve.
// Online wird immer die frische Datei geladen — verhindert leere App durch alten Cache.
// Offline greift der Cache (ignoreSearch, damit Versions-URLs wie app.js?v=41 passen).
async function appAsset(req) {
  const cache = await caches.open(STATIC_CACHE);
  try {
    const resp = await fetch(req);
    if (resp.ok) cache.put(req, resp.clone());
    return resp;
  } catch (err) {
    const cached = await cache.match(req, { ignoreSearch: true });
    if (cached) return cached;
    if (req.destination === 'document') {
      const offline = await cache.match('./index.html', { ignoreSearch: true })
        || await cache.match('./', { ignoreSearch: true });
      if (offline) return offline;
    }
    throw err;
  }
}

// Cache-First: erst Cache, dann Netz (für vorab gecachte Kern-Assets)
async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const resp = await fetch(req);
    if (resp.ok) cache.put(req, resp.clone());
    return resp;
  } catch (err) {
    // Offline-Fallback für HTML-Seiten
    if (req.destination === 'document') {
      const offline = await cache.match('./index.html');
      if (offline) return offline;
    }
    throw err;
  }
}

// Network-First: erst Netz, dann Cache
async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const resp = await fetch(req);
    if (resp.ok) cache.put(req, resp.clone());
    return resp;
  } catch (err) {
    const cached = await cache.match(req);
    if (cached) return cached;
    throw err;
  }
}

// Stale-While-Revalidate: sofort aus Cache, im Hintergrund aktualisieren
async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const networkPromise = fetch(req).then(resp => {
    if (resp.ok) cache.put(req, resp.clone());
    return resp;
  }).catch(() => cached);
  return cached || networkPromise;
}

// Message-Handler für manuelle Cache-Updates
self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (e.data?.type === 'CLEAR_CACHE') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
  }
});

// Klick auf eine Benachrichtigung: App fokussieren bzw. öffnen und zur passenden Sektion springen
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const sektion = e.notification.data && e.notification.data.zuSektion;
  e.waitUntil((async () => {
    const clientList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of clientList) {
      if ('focus' in c) {
        await c.focus();
        if (sektion) c.postMessage({ type: 'NAVIGATE', sektion });
        return;
      }
    }
    if (self.clients.openWindow) await self.clients.openWindow('./');
  })());
});
