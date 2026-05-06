const CACHE = 'familienapp-v2';
const OFFLINE = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/data.js',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(OFFLINE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network-first für API-Aufrufe
  if (e.request.url.includes('overpass-api') ||
      e.request.url.includes('nominatim') ||
      e.request.url.includes('tankerkoenig') ||
      e.request.url.includes('themealdb') ||
      e.request.url.includes('unsplash')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  // Cache-first für App-Dateien
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      if (resp.ok && e.request.method === 'GET') {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return resp;
    }))
  );
});
