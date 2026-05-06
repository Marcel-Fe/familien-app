// ===== AUTH (localStorage) =====
const AUTH_KEY = 'familienapp_user';

function getUser()     { try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; } }
function saveUser(u)   { localStorage.setItem(AUTH_KEY, JSON.stringify(u)); }
function isLoggedIn()  { return !!getUser(); }
function logout()      { if (confirm('Abmelden und alle Daten löschen?')) { localStorage.clear(); location.reload(); } }

// ===== APP-ZUSTAND =====
const state = {
  sektion: 'dashboard',
  bundesland: null,
  antragId: null, antragTab: 'schritte',
  leistungFilter: 'alle',
  sparTab: 'supermarkt',
  regSchritt: 1, regDaten: { vorname:'', plz:'', ort:'', lat:null, lng:null, bundesland:'', kinder:[] },
  umgebungKat: 'supermarkt', umgebungLaden: false, umgebungOrte: [], umgebungStandort: null,
  umgebungRadius: 0, // 0 = Kategorie-Standard; sonst in Metern
  karte: null, markerSchicht: null,
  // Neue Features
  kalenderTab: 'termine', kalenderMonat: new Date(),
  familieTab: 'ausfluege',
  rezeptTab: 'lokal', rezeptFilter: 'alle', rezeptKatAPI: 'Vegetarian',
  rezeptApiMeals: [], rezeptApiLaden: false, rezeptSucheAPI: '',
  extrasTab: 'steuer', checklisteTyp: 'reise',
  suchQuery: '', terminAddOffen: false,
  wohnungOrt: '', wohnungPlz: '', wohnungRadius: 10,
  tippsKat: 'alle',
  budgetTab: 'rechner',
  spritTyp: 'e10', spritDaten: [],
  vertraegeKat: null,
  urlaubTab: 'angebote', urlaubFilter: 'strand',
  jobsOrt: '', jobsWas: '', jobsErgebnisse: [], jobsLaden: false, jobsGeladen: false
};

// ===== PWA INSTALL PROMPT =====
let _pwaPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); _pwaPrompt = e;
  document.querySelectorAll('#install-android-btn').forEach(el => el.style.display = 'block');
});
function pwaInstallieren() {
  if (_pwaPrompt) { _pwaPrompt.prompt(); _pwaPrompt.userChoice.then(() => { _pwaPrompt = null; }); }
}

// Demo-Modus für Screenshots (URL-Parameter ?demo=1)
if (new URLSearchParams(location.search).get('demo') === '1' && !isLoggedIn()) {
  saveUser({ vorname:'Sarah', plz:'80333', ort:'München', lat:48.137, lng:11.575, bundesland:'by', kinder:[{name:'Emma',alter:7},{name:'Luca',alter:4}] });
}

// ===== SPLASH SCREEN =====
function splashSchliessen() {
  const s = el('splash');
  if (!s) return;
  s.classList.add('splash-out');
  setTimeout(() => { s.style.display = 'none'; }, 700);
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(splashSchliessen, 3000);
});

// ===== HILFSFUNKTIONEN =====
function el(id)    { return document.getElementById(id); }
function esc(s)    { return String(s).replace(/[<>"'&]/g, c => ({'<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','&':'&amp;'}[c])); }
function tageszeit(){ const h=new Date().getHours(); return h<12?'Guten Morgen':h<18?'Guten Tag':'Guten Abend'; }

// ===== INIT =====
function init() {
  // Bundesland-Select befüllen
  const sel = el('bl-select');
  BUNDESLAENDER.forEach(bl => {
    const o = document.createElement('option');
    o.value = bl.id; o.textContent = `${bl.kurz} – ${bl.name}`; sel.appendChild(o);
  });
  sel.addEventListener('change', e => {
    state.bundesland = BUNDESLAENDER.find(b => b.id === e.target.value) || null; render();
  });
  if (!state.navGruppe) state.navGruppe = 'start';

  if (isLoggedIn()) {
    const user = getUser();
    if (user.bundesland) { state.bundesland = BUNDESLAENDER.find(b => b.id === user.bundesland) || null; if (sel) sel.value = user.bundesland; }
    if (user.lat && user.lng) state.umgebungStandort = { lat: user.lat, lng: user.lng, name: user.ort };
    zeigeApp(); render();
  } else {
    zeigeRegistrierung();
  }
}

function zeigeApp() {
  el('reg-overlay').classList.add('versteckt');
  el('app').classList.remove('versteckt');
  aktualisiereProfilBtn();
}

function aktualisiereProfilBtn() {
  const u = getUser(); if (!u) return;
  el('profil-avatar').textContent = u.vorname ? u.vorname[0].toUpperCase() : '?';
}

function zeigeRegistrierung() {
  el('reg-overlay').classList.remove('versteckt');
  el('app').classList.add('versteckt');
  state.regSchritt = 1;
  renderRegSchritt();
}

// ===== NAVIGATION =====
const NAV = {
  start:   [{s:'dashboard',  l:'🏠 Übersicht'}],
  geld:    [{s:'leistungen', l:'💶 Zuschüsse'},{s:'formular', l:'📋 Formulare'},{s:'sparen', l:'💡 Sparen'},{s:'extras', l:'💼 Extras'}],
  ort:     [{s:'umgebung',   l:'📍 Umgebung'},{s:'wohnung', l:'🏠 Wohnung'}],
  familie: [{s:'familie',    l:'👪 Familie'},{s:'kalender', l:'📅 Kalender'},{s:'beratung', l:'💬 Beratung'}],
  mehr:    [{s:'urlaub',     l:'✈️ Urlaub'},{s:'jobs', l:'💼 Jobs'},{s:'suche', l:'🔍 Suche'}]
};

function sektionZuGruppe(s) {
  return Object.entries(NAV).find(([,v])=>v.some(i=>i.s===s))?.[0]||'start';
}

function navGruppeWaehlen(g) {
  state.navGruppe = g;
  const items = NAV[g] || [];
  // Einzel-Gruppen (Start) navigieren direkt, ohne renderNavButtons
  if (items.length === 1) { zuSektion(items[0].s); return; }
  renderNavButtons();
}

function renderNavButtons() {
  document.querySelectorAll('.nav-g-btn').forEach(b => b.classList.toggle('aktiv', b.dataset.gruppe === state.navGruppe));
  const sub = el('nav-sub');
  if (!sub) return;
  const items = NAV[state.navGruppe] || [];
  sub.style.display = items.length > 1 ? 'flex' : 'none';
  if (items.length > 1) {
    sub.innerHTML = items.map(i=>`<button class="nav-btn${state.sektion===i.s?' aktiv':''}" onclick="zuSektion('${i.s}')">${i.l}</button>`).join('');
  }
}

function zuSektion(s) {
  state.sektion = s;
  state.navGruppe = sektionZuGruppe(s);
  state.antragId = null; state.antragTab = 'schritte';
  render(); window.scrollTo({ top:0, behavior:'smooth' });
}

// ===== HAUPT-RENDER =====
function render() {
  renderNavButtons();
  const sel = el('bl-select');
  if (sel && state.bundesland) sel.value = state.bundesland.id;

  const content = el('content');
  content.classList.remove('einblenden');
  void content.offsetWidth;
  content.classList.add('einblenden');

  switch (state.sektion) {
    case 'dashboard':  content.innerHTML = renderDashboard(); break;
    case 'umgebung':   content.innerHTML = renderUmgebung(); setTimeout(initKarte, 100); break;
    case 'leistungen': content.innerHTML = renderLeistungen(); break;
    case 'formular':   content.innerHTML = renderFormularAssistent(); break;
    case 'wohnung':    content.innerHTML = renderWohnung(); break;
    case 'sparen':     content.innerHTML = renderSparen(); break;
    case 'beratung':   content.innerHTML = renderBeratung(); break;
    case 'kalender':   content.innerHTML = renderKalender(); break;
    case 'familie':    content.innerHTML = renderFamilie(); break;
    case 'extras':     content.innerHTML = renderExtras(); break;
    case 'urlaub':     content.innerHTML = renderUrlaub(); break;
    case 'jobs':       content.innerHTML = renderJobs(); setTimeout(initJobs, 100); break;
    case 'suche':      content.innerHTML = renderSuche(); break;
    default:           content.innerHTML = renderDashboard();
  }
  if (state.sektion === 'sparen' && state.sparTab === 'liste') renderListeInhalt();
  // IP für Handy-Zugriff anzeigen
  const urlEl = el('install-url');
  if (urlEl) {
    const h = window.location.hostname;
    urlEl.textContent = h === 'localhost' || h === '127.0.0.1'
      ? 'http://192.168.178.38:' + window.location.port
      : window.location.href.split('?')[0];
  }
}

// ===== MODERNES DASHBOARD =====
function renderDashboard() {
  const user = getUser() || {};
  const kinder = user.kinder || [];
  const bl = state.bundesland || (user.bundesland ? BUNDESLAENDER.find(b=>b.id===user.bundesland) : null);

  // Monatliche Leistungen schätzen
  let min = kinder.length * 255, max = kinder.length * 255;
  kinder.forEach(k => {
    const a = parseInt(k.alter)||0;
    if (a < 6) max += 230; else if (a < 12) max += 301; else max += 395;
  });
  max += 370 + kinder.length * 292; // Wohngeld + Kinderzuschlag
  if (kinder.length === 0) { min = 0; max = 0; }

  const betragText = max > 0 ? `bis ${max.toLocaleString('de-DE')} €/Monat` : 'Profil ausfüllen';
  const standort = state.umgebungStandort || (user.lat ? { lat:user.lat, lng:user.lng, name:user.ort } : null);

  return `
  <!-- HERO -->
  <div class="dash-hero">
    <div class="hero-deko1"></div><div class="hero-deko2"></div><div class="hero-deko3"></div>
    <!-- Wasserzeichen-Familie -->
    <div class="dash-watermark" aria-hidden="true">
      <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="175" cy="220" rx="29" ry="29" fill="white"/><path d="M148 249 Q135 330 150 355 L200 355 Q215 330 202 249 Z" fill="white"/>
        <ellipse cx="295" cy="298" rx="24" ry="24" fill="white"/><path d="M272 322 Q263 375 275 390 L315 390 Q327 375 318 322 Z" fill="white"/>
        <ellipse cx="373" cy="319" rx="20" ry="20" fill="white"/><path d="M354 339 Q347 385 358 398 L388 398 Q399 385 392 339 Z" fill="white"/>
        <path d="M200 280 Q225 295 238 300" stroke="white" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M315 345 Q335 352 348 355" stroke="white" stroke-width="7" fill="none" stroke-linecap="round"/>
        <polygon points="300,145 235,200 365,200" fill="white" opacity=".4"/>
        <rect x="243" y="200" width="114" height="75" fill="white" opacity=".3"/>
      </svg>
    </div>
    <div class="hero-illustration">👨‍👧‍👦</div>
    <div class="hero-tag">${tageszeit()}! ☀️</div>
    <div class="hero-name">${user.vorname ? `Hallo, ${esc(user.vorname)}!` : 'Willkommen!'}</div>
    <div class="hero-ort">
      ${bl ? `📍 ${esc(bl.name)}` : ''}
      ${kinder.length > 0 ? ` · 👶 ${kinder.length} ${kinder.length===1?'Kind':'Kinder'}` : ''}
    </div>
    ${max > 0 ? `
    <div class="hero-betrag-box">
      <div>
        <div class="hero-betrag-label">Mögliche Leistungen</div>
        <div class="hero-betrag-zahl">${betragText}</div>
        <div class="hero-betrag-sub">Kindergeld + Wohngeld + Unterhaltsvorschuss</div>
      </div>
    </div>` : ''}
    <div class="hero-btns">
      <button class="hero-btn hero-btn-prim" onclick="zuSektion('leistungen')">💰 Meine Ansprüche</button>
      <button class="hero-btn hero-btn-sek" onclick="zuSektion('umgebung')">📍 Umgebung</button>
      <button class="hero-btn hero-btn-sek" onclick="profilOeffnen()">✏️ Profil</button>
    </div>
  </div>

  <!-- SCHNELLZUGRIFF (Übersicht aller Bereiche) -->
  <div class="block-title">📌 Alle Bereiche im Überblick</div>
  <div class="schnell-grid">
    ${[
      { icon:'💰', titel:'Zuschüsse & Anträge', sub:'Wohngeld, Kita, Unterhalt', badge:'8 Leistungen', farbe:'#4F46E5', bg:'#EDE9FE', s:'leistungen' },
      { icon:'📋', titel:'Formular-Assistent', sub:'Schritt-für-Schritt Ausfüllhilfe', badge:'13 Anträge', farbe:'#059669', bg:'#D1FAE5', s:'formular' },
      { icon:'📍', titel:'Umgebung', sub:'Läden, Sprit, Spielplätze, Kino', badge:'Live-Karte', farbe:'#2563EB', bg:'#DBEAFE', s:'umgebung' },
      { icon:'🏘️', titel:'Wohnung finden', sub:'Fotos sofort · ohne Anmeldung', badge:'6 Portale', farbe:'#D97706', bg:'#FEF3C7', s:'wohnung' },
      { icon:'💡', titel:'Sparen im Alltag', sub:'Sprit, Secondhand, 80+ Tipps', badge:'≤400 €/Mo.', farbe:'#EC4899', bg:'#FCE7F3', s:'sparen' },
      { icon:'📞', titel:'Beratung & Hilfe', sub:'Kostenlose Beratungsstellen', badge:'Kostenlos', farbe:'#7C3AED', bg:'#EDE9FE', s:'beratung' },
      { icon:'🗓️', titel:'Kalender & Checklisten', sub:'Termine, Reise, Einschulung', badge:'Persönlich', farbe:'#0EA5E9', bg:'#E0F2FE', s:'kalender' },
      { icon:'👨‍👩‍👧', titel:'Familie & Freizeit', sub:'Ausflüge, Rezepte (300+), Catering', badge:'300+ Rezepte', farbe:'#059669', bg:'#D1FAE5', s:'familie' },
      { icon:'💶', titel:'Budget & Extras', sub:'Haushaltsrechner, Steuer, KK', badge:'Neu!', farbe:'#B45309', bg:'#FEF3C7', s:'extras' },
      { icon:'🔍', titel:'Suche', sub:'Alle Inhalte durchsuchen', badge:'Schnellsuche', farbe:'#4B5563', bg:'#F1F5F9', s:'suche' }
    ].map(k => `
      <button class="schnell-karte" style="--farbe:${k.farbe}" onclick="${k.s==='extras'?`state.extrasTab='budget';`:''}zuSektion('${k.s}')">
        <div class="schnell-icon-box" style="background:${k.bg}">${k.icon}</div>
        <div class="schnell-titel">${k.titel}</div>
        <div class="schnell-sub">${k.sub}</div>
        <span class="schnell-badge">${k.badge}</span>
      </button>`).join('')}
  </div>

  <!-- IN MEINER NÄHE (wenn Standort bekannt) -->
  ${standort ? `
  <div class="block-title">📍 In Ihrer Nähe</div>
  <div class="card" style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;background:linear-gradient(135deg,#EDE9FE,#F5F3FF)">
    <span style="font-size:2rem">🗺️</span>
    <div style="flex:1">
      <div style="font-weight:700;font-size:.95rem">${esc(standort.name || user.ort)}</div>
      <div style="font-size:.82rem;color:#6B7280;margin-top:.2rem">Supermärkte, Tankstellen, Friseure und Bekleidungsläden in Ihrer Nähe</div>
    </div>
    <button class="btn btn-primary" onclick="zuSektion('umgebung')">Jetzt öffnen →</button>
  </div>` : ''}

  <!-- TOP LEISTUNGEN -->
  <div class="block-title">⭐ Ihre wichtigsten Leistungen</div>
  <div class="grid-2">
    ${BUNDESWEITE_LEISTUNGEN.slice(0,4).map(l => `
      <div class="leistung-card">
        <div class="leistung-card-header">
          <span class="leistung-emoji">${l.emoji}</span>
          <div class="leistung-info"><h3>${esc(l.name)}</h3><div class="leistung-behoerde">📌 ${esc(l.behoerde)}</div></div>
          <span class="betrag-badge">${esc(l.betrag)}</span>
        </div>
        <div class="leistung-card-body"><p class="leistung-desc">${esc(l.beschreibung)}</p></div>
        <div class="leistung-card-footer">
          <a href="${l.link}" target="_blank" class="btn btn-outline btn-sm">ℹ️ Info</a>
          <button class="btn btn-primary btn-sm" onclick="formularOeffnen('${l.id}')">📝 Ausfüllhilfe</button>
        </div>
      </div>`).join('')}
  </div>
  <div style="text-align:center;margin-top:1rem">
    <button class="btn btn-primary btn-lg" onclick="zuSektion('leistungen')">Alle Leistungen ansehen →</button>
  </div>

  <!-- APP INSTALLIEREN -->
  <div class="install-card" id="install-card">
    <div class="install-card-titel">📱 App auf Ihrem Handy installieren</div>
    <div class="install-grid">
      <div class="install-item" id="install-android-btn" style="display:none">
        <button class="btn btn-primary" style="width:100%;padding:.85rem" onclick="pwaInstallieren()">
          🤖 Android: Jetzt installieren
        </button>
        <div class="install-hint">Direkt als App installieren — kein App Store nötig</div>
      </div>
      <div class="install-item">
        <div class="install-plattform">🍎 iPhone / iPad</div>
        <ol class="install-steps">
          <li>App in <strong>Safari</strong> öffnen</li>
          <li>Teilen-Symbol tippen <strong>⬆</strong></li>
          <li>„Zum Home-Bildschirm" wählen</li>
          <li>„Hinzufügen" bestätigen</li>
        </ol>
      </div>
      <div class="install-item">
        <div class="install-plattform">🤖 Android (manuell)</div>
        <ol class="install-steps">
          <li>App in <strong>Chrome</strong> öffnen</li>
          <li>Drei-Punkte-Menü antippen</li>
          <li>„App installieren" wählen</li>
          <li>Bestätigen</li>
        </ol>
      </div>
    </div>
    <div class="install-ip">
      📡 Handy-Adresse (selbes WLAN): <strong id="install-url">wird geladen…</strong>
    </div>
  </div>

  <!-- NOTFALL-NUMMERN -->
  <div class="block-title">📞 Sofortige Hilfe</div>
  <div class="grid-2">
    <div class="card" style="border-left:4px solid #4F46E5">
      <div style="font-size:1.5rem;margin-bottom:.4rem">📞</div>
      <div style="font-weight:700">Familientelefon</div>
      <div style="font-size:1.5rem;font-weight:800;color:#4F46E5;margin:.2rem 0">0800 111 0 550</div>
      <div style="font-size:.8rem;color:#6B7280">Kostenlos · 24/7 · Anonym</div>
    </div>
    <div class="card" style="border-left:4px solid #059669">
      <div style="font-size:1.5rem;margin-bottom:.4rem">🏛️</div>
      <div style="font-weight:700">Bürgertelefon</div>
      <div style="font-size:1.5rem;font-weight:800;color:#059669;margin:.2rem 0">115</div>
      <div style="font-size:.8rem;color:#6B7280">Behörden & Formulare · Mo–Fr 8–18 Uhr</div>
    </div>
  </div>`;
}

// ===== UMGEBUNGSSUCHE =====
function renderUmgebung() {
  const user = getUser() || {};
  const plzVorausgefuellt = user.plz || '';
  const ortVorausgefuellt = user.ort || '';
  const standort = state.umgebungStandort;

  const kategorien = [
    { id:'supermarkt', label:'🛒 Supermärkte',   farbe:'#059669', radius:2000 },
    { id:'tankstelle', label:'⛽ Tankstellen',    farbe:'#D97706', radius:5000 },
    { id:'friseur',    label:'✂️ Friseure',       farbe:'#7C3AED', radius:3000 },
    { id:'kleidung',   label:'👕 Bekleidung',     farbe:'#EC4899', radius:3000 },
    { id:'apotheke',   label:'💊 Apotheken',      farbe:'#DC2626', radius:3000 },
    { id:'arzt',       label:'🏥 Ärzte',          farbe:'#2563EB', radius:3000 },
    { id:'spielplatz', label:'🎠 Spielplätze',    farbe:'#059669', radius:2000 },
    { id:'park',       label:'🌳 Parks & Natur',  farbe:'#16A34A', radius:4000 },
    { id:'museum',     label:'🏛️ Museen & Zoos',  farbe:'#9333EA', radius:10000 },
    { id:'freibad',    label:'🏊 Schwimmbäder',   farbe:'#0EA5E9', radius:8000 },
    { id:'minigolf',   label:'⛳ Minigolf',        farbe:'#EA580C', radius:10000 },
    { id:'bowling',    label:'🎳 Bowling',         farbe:'#7C3AED', radius:15000 },
    { id:'klettern',   label:'🧗 Klettern',        farbe:'#B45309', radius:15000 },
    { id:'kino',       label:'🎬 Kino',            farbe:'#BE185D', radius:15000 }
  ];

  return `
  <div class="section-title">📍 Umgebungssuche</div>
  <p class="section-sub">Läden, Tankstellen, Friseure und mehr in Ihrer Nähe — mit aktuellem Standort</p>

  <div class="standort-box">
    <div style="font-weight:700;font-size:.95rem;margin-bottom:.75rem">🔍 Ihren Standort eingeben</div>
    <div class="standort-eingabe">
      <input id="standort-input" class="standort-input" autocomplete="off"
        type="text"
        placeholder="PLZ oder Ort eingeben, z.B. München"
        value="${esc(state.umgebungStandort?.name || ortVorausgefuellt || '')}"
        onkeydown="if(event.key==='Enter')standortSuchen()" />
      <button class="btn btn-primary" onclick="standortSuchen()">🔍 Suchen</button>
      <button class="gps-btn" onclick="gpsStandort()">📡 GPS</button>
    </div>
    <div id="standort-fehler" style="display:none;margin-top:.6rem;padding:.5rem .75rem;background:#FEE2E2;color:#DC2626;border-radius:.5rem;font-size:.82rem;font-weight:600"></div>
    ${standort ? `<div style="font-size:.82rem;color:#059669;margin-top:.6rem;font-weight:600">✓ Standort: ${esc(standort.name)}</div>` : ''}
  </div>

  <div class="radius-control">
    <span class="radius-label">🔭 Suchradius:</span>
    <input type="range" class="radius-slider" id="radius-slider"
      min="500" max="25000" step="500"
      value="${state.umgebungRadius || OVERPASS_KAT[state.umgebungKat]?.r || 5000}"
      oninput="radiusAendern(this.value)" />
    <span class="radius-badge" id="radius-badge">${formatRadius(state.umgebungRadius || OVERPASS_KAT[state.umgebungKat]?.r || 5000)}</span>
  </div>

  <div class="kat-tabs">
    ${kategorien.map(k => `
      <button class="kat-tab ${state.umgebungKat===k.id?'aktiv':''}"
        onclick="umgebungKatWaehlen('${k.id}')"
        style="${state.umgebungKat===k.id?`background:${k.farbe};border-color:${k.farbe};`:''}">
        ${k.label}
      </button>`).join('')}
  </div>

  ${!standort ? `
  <div class="info-box lila">
    <span class="ib-icon">📍</span>
    <div class="ib-text"><strong>Standort eingeben</strong>Geben Sie Ihre PLZ oder Ihren Ort ein um Angebote in Ihrer Nähe zu sehen.</div>
  </div>
  <div id="karte" style="height:400px;background:linear-gradient(135deg,#F1F5F9,#E2E8F0);display:flex;align-items:center;justify-content:center;color:#94A3B8;border-radius:20px;font-size:1.1rem;font-weight:700;border:2px dashed #CBD5E1">
    📍 Bitte Standort eingeben
  </div>` : `
  <div class="umgebung-layout">
    <div id="karte"></div>
    <div class="umgebung-sidebar">
      <div class="umgebung-sidebar-header">
        <h3 id="sidebar-titel">Lädt...</h3>
        <p id="sidebar-sub">Suche in Ihrer Nähe</p>
      </div>
      <div class="ort-liste" id="ort-liste">
        <div class="loading-spinner"><div class="spinner"></div><span>Suche läuft...</span></div>
      </div>
    </div>
  </div>
  ${state.umgebungKat === 'tankstelle' ? `
  <div class="info-box orange" style="margin-top:1rem">
    <span class="ib-icon">⛽</span>
    <div class="ib-text">
      <strong>Live-Spritpreise:</strong>
      Die Karte zeigt Tankstellen in der Nähe. Für aktuelle Preise direkt vergleichen:
      <a href="https://www.clever-tanken.de/?lat=${standort.lat}&lng=${standort.lng}" target="_blank" style="color:#92400E;font-weight:700"> → clever-tanken.de öffnen</a>
    </div>
  </div>` : ''}
  `}`;
}

function standortFehler(msg) {
  const box = el('standort-fehler');
  if (box) { box.textContent = msg; box.style.display = 'block'; }
}
function standortFehlerAusblenden() {
  const box = el('standort-fehler');
  if (box) box.style.display = 'none';
}

async function standortSuchen() {
  const input = el('standort-input');
  if (!input) return;
  const query = input.value.trim();
  if (!query) return;

  standortFehlerAusblenden();
  input.disabled = true;
  const orig = input.value;
  input.value = '🔍 Suche läuft...';

  try {
    // PLZ-only Suche mit dediziertem Nominatim-Parameter
    const isPLZ = /^\d{5}$/.test(query);
    const url = isPLZ
      ? `https://nominatim.openstreetmap.org/search?postalcode=${query}&country=de&format=json&limit=1&accept-language=de&addressdetails=1`
      : `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query+', Deutschland')}&format=json&limit=3&countrycodes=de&accept-language=de&addressdetails=1`;

    const res = await fetch(url, { headers: { 'User-Agent': 'FamilienApp/1.0' } });
    const daten = await res.json();

    if (!daten.length) {
      input.disabled = false; input.value = orig;
      standortFehler('Ort nicht gefunden. Bitte PLZ (z.B. 80333) oder Stadtname eingeben.');
      return;
    }

    const ort = daten[0];
    const a = ort.address || {};
    const rawName = a.city || a.town || a.village || a.county
      || ort.display_name.split(',').find(p => !/^\d/.test(p.trim()))?.trim()
      || query;
    // PLZ aus Stadtname entfernen, falls Nominatim sie mitzieht
    const name = rawName.replace(/^\d{5}\s*,?\s*/, '').trim() || rawName;
    state.umgebungStandort = { lat: parseFloat(ort.lat), lng: parseFloat(ort.lon), name };

    const user = getUser();
    if (user) { user.lat = state.umgebungStandort.lat; user.lng = state.umgebungStandort.lng; saveUser(user); }

    input.disabled = false;
    render();
  } catch(e) {
    input.disabled = false; input.value = orig;
    standortFehler('Verbindungsfehler. Bitte Internetverbindung prüfen und erneut versuchen.');
  }
}

function gpsStandort() {
  if (!navigator.geolocation) { standortFehler('GPS nicht verfügbar auf diesem Gerät.'); return; }
  standortFehlerAusblenden();
  const btn = document.querySelector('.gps-btn');
  if (btn) btn.textContent = '📡 Ortung...';
  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude, lng = pos.coords.longitude;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=de`);
      const d = await res.json();
      const name = d.address?.city || d.address?.town || d.address?.village || 'Ihr Standort';
      state.umgebungStandort = { lat, lng, name };
      const user = getUser();
      if (user) { user.lat = lat; user.lng = lng; user.ort = name; saveUser(user); }
      render();
    } catch { state.umgebungStandort = { lat, lng, name: 'Ihr GPS-Standort' }; render(); }
  }, () => standortFehler('GPS-Zugriff verweigert. Bitte Standort manuell eingeben.'));
}

function umgebungKatWaehlen(kat) {
  state.umgebungKat = kat;
  // Reset radius to category default when switching category
  state.umgebungRadius = 0;
  render();
}

function formatRadius(m) {
  const v = parseInt(m);
  return v >= 1000 ? (v/1000).toFixed(1).replace('.0','') + ' km' : v + ' m';
}

function radiusAendern(val) {
  state.umgebungRadius = parseInt(val);
  const badge = el('radius-badge');
  if (badge) badge.textContent = formatRadius(val);
  // Re-load markers with new radius (debounced)
  clearTimeout(radiusAendern._t);
  radiusAendern._t = setTimeout(() => {
    if (state.karte) ladeOrte(state.karte);
  }, 400);
}

// Overpass-Kategorien
const OVERPASS_KAT = {
  supermarkt: { query: 'node["shop"~"supermarket|convenience|grocery|discount"](around:{r},{lat},{lng});', r:2000, farbe:'#059669', bg:'#D1FAE5', icon:'🛒' },
  tankstelle:  { query: 'node["amenity"="fuel"](around:{r},{lat},{lng});', r:5000, farbe:'#D97706', bg:'#FEF3C7', icon:'⛽' },
  friseur:     { query: 'node["shop"="hairdresser"](around:{r},{lat},{lng});', r:3000, farbe:'#7C3AED', bg:'#EDE9FE', icon:'✂️' },
  kleidung:    { query: 'node["shop"~"clothes|shoes|boutique|second_hand"](around:{r},{lat},{lng});', r:3000, farbe:'#EC4899', bg:'#FCE7F3', icon:'👕' },
  apotheke:    { query: 'node["amenity"="pharmacy"](around:{r},{lat},{lng});', r:3000, farbe:'#DC2626', bg:'#FEE2E2', icon:'💊' },
  arzt:        { query: 'node["amenity"~"doctors|clinic"](around:{r},{lat},{lng});', r:3000, farbe:'#2563EB', bg:'#DBEAFE', icon:'🏥' },
  spielplatz:  { query: 'node["leisure"="playground"](around:{r},{lat},{lng});', r:2000, farbe:'#059669', bg:'#D1FAE5', icon:'🎠' },
  park:        { query: 'node["leisure"~"park|garden|nature_reserve"](around:{r},{lat},{lng});', r:4000, farbe:'#16A34A', bg:'#DCFCE7', icon:'🌳' },
  museum:      { query: 'node["tourism"~"museum|attraction|zoo|aquarium|theme_park"](around:{r},{lat},{lng});', r:10000, farbe:'#9333EA', bg:'#F3E8FF', icon:'🏛️' },
  freibad:     { query: 'node["leisure"~"swimming_pool|water_park|sports_centre"](around:{r},{lat},{lng});', r:8000, farbe:'#0EA5E9', bg:'#E0F2FE', icon:'🏊' },
  minigolf:    { query: 'node["leisure"="miniature_golf"](around:{r},{lat},{lng});', r:10000, farbe:'#EA580C', bg:'#FFEDD5', icon:'⛳' },
  bowling:     { query: 'node["leisure"="bowling_alley"](around:{r},{lat},{lng});', r:15000, farbe:'#7C3AED', bg:'#EDE9FE', icon:'🎳' },
  klettern:    { query: 'node["leisure"~"climbing|climbing_wall"](around:{r},{lat},{lng});node["sport"~"climbing"](around:{r},{lat},{lng});', r:15000, farbe:'#B45309', bg:'#FEF3C7', icon:'🧗' },
  kino:        { query: 'node["amenity"="cinema"](around:{r},{lat},{lng});', r:15000, farbe:'#BE185D', bg:'#FCE7F3', icon:'🎬' }
};

function initKarte() {
  const mapEl = el('karte');
  if (!mapEl || !state.umgebungStandort || typeof L === 'undefined') return;
  if (mapEl.textContent.includes('Standort eingeben')) return;

  const { lat, lng } = state.umgebungStandort;

  // Alte Karte entfernen
  if (state.karte) { state.karte.remove(); state.karte = null; }

  // Neue Karte
  const karte = L.map('karte').setView([lat, lng], 14);
  state.karte = karte;

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(karte);

  // Eigener Standort-Marker
  const eigenerMarker = L.divIcon({
    html: '<div style="background:#4F46E5;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(79,70,229,.6)"></div>',
    iconSize: [16,16], iconAnchor: [8,8], className: ''
  });
  L.marker([lat, lng], { icon: eigenerMarker }).addTo(karte).bindPopup('<strong>📍 Ihr Standort</strong>');

  state.markerSchicht = L.layerGroup().addTo(karte);

  // Orte laden
  ladeOrte(karte);
}

async function ladeOrte(karte) {
  const kat = OVERPASS_KAT[state.umgebungKat];
  if (!kat || !state.umgebungStandort) return;

  const { lat, lng } = state.umgebungStandort;
  const radius = state.umgebungRadius || kat.r;
  const query = kat.query.replace(/\{r\}/g, radius).replace(/\{lat\}/g, lat).replace(/\{lng\}/g, lng);
  const overpassQ = `[out:json][timeout:25];(${query});out body;`;

  // Loading-State in Sidebar
  const liste = el('ort-liste');
  const titelEl = el('sidebar-titel');
  const subEl = el('sidebar-sub');
  if (liste) liste.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><span>Suche läuft...</span></div>';

  try {
    const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQ)}`);
    const daten = await res.json();
    const orte = daten.elements || [];

    // Marker hinzufügen
    if (state.markerSchicht) state.markerSchicht.clearLayers();

    // Entfernung berechnen & sortieren (nur Nodes mit Koordinaten)
    const mitEntfernung = orte
      .filter(o => o.lat && o.lon)
      .map(o => ({
        ...o,
        distanz: Math.round(haversine(lat, lng, o.lat, o.lon))
      })).sort((a,b) => a.distanz - b.distanz).slice(0,30);

    mitEntfernung.forEach(o => {
      const name = o.tags?.name || o.tags?.brand || 'Unbekannt';
      const icon = L.divIcon({
        html: `<div style="background:${kat.farbe};color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 2px 8px rgba(0,0,0,.3);border:2px solid white">${kat.icon}</div>`,
        iconSize: [32,32], iconAnchor: [16,16], className: ''
      });
      const m = L.marker([o.lat, o.lon], { icon }).addTo(state.markerSchicht);
      const popup = `<div class="popup-name">${esc(name)}</div>
        <div class="popup-info">${o.distanz < 1000 ? o.distanz+'m' : (o.distanz/1000).toFixed(1)+'km'} entfernt</div>
        ${o.tags?.['addr:street'] ? `<div class="popup-info">${esc(o.tags['addr:street'])} ${esc(o.tags['addr:housenumber']||'')}</div>` : ''}
        ${o.tags?.website ? `<a href="${esc(o.tags.website)}" target="_blank" class="popup-link">🌐 Website öffnen</a>` : ''}
        ${state.umgebungKat==='tankstelle' ? `<a href="https://www.clever-tanken.de" target="_blank" class="popup-link">⛽ Spritpreise vergleichen</a>` : ''}
        <a href="https://www.google.com/maps/dir/?api=1&destination=${o.lat},${o.lon}" target="_blank" class="popup-link popup-navi">🗺️ Route planen (Google Maps)</a>`;
      m.bindPopup(popup);
    });

    // Sidebar befüllen
    if (titelEl) titelEl.textContent = `${kat.icon} ${mitEntfernung.length} gefunden`;
    if (subEl) subEl.textContent = `im Umkreis von ${formatRadius(radius)}`;
    if (liste) {
      if (mitEntfernung.length === 0) {
        liste.innerHTML = `<div class="ort-leer">Keine Ergebnisse in ${formatRadius(radius)} gefunden.</div>`;
      } else {
        liste.innerHTML = mitEntfernung.map(o => {
          const name = o.tags?.name || o.tags?.brand || 'Unbekannt';
          const strasse = o.tags?.['addr:street'] ? `${o.tags['addr:street']} ${o.tags['addr:housenumber']||''}` : '';
          const dist = o.distanz < 1000 ? `${o.distanz} m` : `${(o.distanz/1000).toFixed(1)} km`;
          return `<div class="ort-item" onclick="karteFliegen(${o.lat},${o.lon})">
            <div class="ort-icon" style="background:${kat.bg};color:${kat.farbe}">${kat.icon}</div>
            <div class="ort-info">
              <div class="ort-name">${esc(name)}</div>
              ${strasse ? `<div class="ort-adresse">${esc(strasse)}</div>` : ''}
              <div class="ort-dist">📏 ${dist} entfernt</div>
            </div>
          </div>`;
        }).join('');
      }
    }
  } catch(e) {
    if (liste) liste.innerHTML = `<div class="ort-leer">⚠️ Fehler beim Laden. Bitte erneut versuchen.</div>`;
    console.error(e);
  }
}

function karteFliegen(lat, lng) {
  if (state.karte) state.karte.flyTo([lat, lng], 16);
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371000, φ1 = lat1*Math.PI/180, φ2 = lat2*Math.PI/180;
  const Δφ = (lat2-lat1)*Math.PI/180, Δλ = (lng2-lng1)*Math.PI/180;
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ===== REGISTRIERUNG =====
function renderRegSchritt() {
  const overlay = el('reg-inhalt');
  const d = state.regDaten;
  const punkte = [1,2,3].map(n => `<div class="reg-fortschritt-punkt${n<state.regSchritt?' fertig':n===state.regSchritt?' aktiv':''}"></div>`).join('');

  let html = `<div class="reg-fortschritt">${punkte}</div>`;

  if (state.regSchritt === 1) {
    html += `
    <div class="reg-schritt-titel">👋 Herzlich willkommen!</div>
    <div class="reg-schritt-sub">Erstellen Sie Ihr Profil — dauert nur 1 Minute</div>
    <div class="reg-feld">
      <label class="reg-label">Ihr Vorname</label>
      <input class="reg-input" id="r-vorname" type="text" placeholder="z.B. Anna" value="${esc(d.vorname)}" autocomplete="given-name" />
    </div>
    <div class="reg-feld">
      <label class="reg-label">PLZ oder Wohnort</label>
      <input class="reg-input" id="r-plz" type="text" placeholder="z.B. 80333 oder München" value="${esc(d.plz||d.ort)}" autocomplete="postal-code" />
    </div>
    <button class="reg-btn" onclick="regWeiter1()">Weiter →</button>
    <p class="reg-datenschutz">🔒 Ihre Daten bleiben nur auf Ihrem Gerät — kein Server, keine Weitergabe</p>`;
  } else if (state.regSchritt === 2) {
    html += `
    <div class="reg-schritt-titel">📍 Ihr Bundesland</div>
    <div class="reg-schritt-sub">Für länderspezifische Zuschüsse und Links</div>
    <div class="reg-feld">
      <label class="reg-label">Bundesland</label>
      <select class="reg-select" id="r-bl">
        <option value="">Bitte wählen...</option>
        ${BUNDESLAENDER.map(b => `<option value="${b.id}" ${d.bundesland===b.id?'selected':''}>${b.name}</option>`).join('')}
      </select>
    </div>
    <div class="reg-feld">
      <label class="reg-label">Anzahl Ihrer Kinder</label>
      <div class="kinder-stepper">
        <button class="stepper-btn" onclick="kinderAnzahlAendern(-1)">−</button>
        <div class="stepper-zahl" id="kinder-zahl">${d.kinder.length}</div>
        <button class="stepper-btn" onclick="kinderAnzahlAendern(1)">+</button>
      </div>
    </div>
    ${d.kinder.length > 0 ? `
    <div class="reg-feld">
      <label class="reg-label">Alter der Kinder (in Jahren)</label>
      <div class="reg-kinder-grid">
        ${d.kinder.map((k,i) => `
          <div class="reg-kind-card">
            <span>👶 Kind ${i+1}:</span>
            <input type="number" min="0" max="25" value="${k.alter||''}" placeholder="Alter" onchange="kinderAlterAendern(${i},this.value)" />
            <span>J.</span>
          </div>`).join('')}
      </div>
    </div>` : ''}
    <button class="reg-btn" onclick="regWeiter2()">Weiter →</button>
    <button class="reg-btn-back" onclick="state.regSchritt=1;renderRegSchritt()">← Zurück</button>`;
  } else if (state.regSchritt === 3) {
    const kinder = d.kinder;
    let min = kinder.length*255, max = kinder.length*255;
    kinder.forEach(k => { const a=parseInt(k.alter)||0; if(a<6) max+=230; else if(a<12) max+=301; else max+=395; });
    max += 370 + kinder.length*292;
    const bl = BUNDESLAENDER.find(b=>b.id===d.bundesland);

    html += `
    <div class="reg-schritt-titel">🎉 Alles bereit!</div>
    <div class="reg-schritt-sub">Ihr persönliches Profil</div>
    <div style="background:linear-gradient(135deg,#EDE9FE,#F5F3FF);border-radius:var(--r-lg);padding:1.25rem;margin-bottom:1.25rem">
      <div style="display:flex;flex-direction:column;gap:.5rem">
        <div style="font-size:1.1rem;font-weight:800">👋 ${esc(d.vorname)}</div>
        <div style="font-size:.85rem;color:#374151">📍 ${esc(d.ort||d.plz)} · ${bl?bl.name:'–'}</div>
        <div style="font-size:.85rem;color:#374151">👶 ${kinder.length} ${kinder.length===1?'Kind':'Kinder'}</div>
        ${max > 0 ? `<div style="font-size:.9rem;font-weight:700;color:#4F46E5;margin-top:.25rem">💰 Mögliche Leistungen: bis ${max.toLocaleString('de-DE')} €/Monat</div>` : ''}
      </div>
    </div>
    <button class="reg-btn" onclick="regAbschliessen()">🚀 App starten!</button>
    <button class="reg-btn-back" onclick="state.regSchritt=2;renderRegSchritt()">← Zurück</button>`;
  }
  overlay.innerHTML = html;
}

async function regWeiter1() {
  const vorname = el('r-vorname')?.value.trim();
  const plz     = el('r-plz')?.value.trim();
  if (!vorname) { alert('Bitte Ihren Vornamen eingeben.'); return; }
  if (!plz)     { alert('Bitte PLZ oder Ort eingeben.'); return; }

  state.regDaten.vorname = vorname;

  // Ort geocodieren
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(plz+', Deutschland')}&format=json&limit=1&countrycodes=de`);
    const d = await res.json();
    if (d.length > 0) {
      state.regDaten.lat  = parseFloat(d[0].lat);
      state.regDaten.lng  = parseFloat(d[0].lon);
      state.regDaten.ort  = d[0].display_name.split(',')[0];
      state.regDaten.plz  = plz;
    } else {
      state.regDaten.ort = plz; state.regDaten.plz = plz;
    }
  } catch { state.regDaten.ort = plz; state.regDaten.plz = plz; }

  state.regSchritt = 2;
  renderRegSchritt();
}

function regWeiter2() {
  const bl = el('r-bl')?.value;
  if (!bl) { alert('Bitte Bundesland auswählen.'); return; }
  state.regDaten.bundesland = bl;
  // Alter validieren
  for (let i=0; i<state.regDaten.kinder.length; i++) {
    if (!state.regDaten.kinder[i].alter && state.regDaten.kinder[i].alter !== 0) {
      alert(`Bitte Alter von Kind ${i+1} eingeben.`); return;
    }
  }
  state.regSchritt = 3;
  renderRegSchritt();
}

function regAbschliessen() {
  const d = state.regDaten;
  const user = { vorname:d.vorname, plz:d.plz, ort:d.ort, lat:d.lat, lng:d.lng, bundesland:d.bundesland, kinder:d.kinder, registriert:new Date().toISOString() };
  saveUser(user);

  if (user.bundesland) state.bundesland = BUNDESLAENDER.find(b=>b.id===user.bundesland) || null;
  if (user.lat) state.umgebungStandort = { lat:user.lat, lng:user.lng, name:user.ort };

  const sel = el('bl-select');
  if (sel && user.bundesland) sel.value = user.bundesland;

  zeigeApp(); render();
}

function kinderAnzahlAendern(delta) {
  const neu = Math.max(0, Math.min(10, state.regDaten.kinder.length + delta));
  while (state.regDaten.kinder.length < neu) state.regDaten.kinder.push({ alter:'' });
  state.regDaten.kinder = state.regDaten.kinder.slice(0, neu);
  renderRegSchritt();
}

function kinderAlterAendern(idx, val) { state.regDaten.kinder[idx].alter = parseInt(val)||0; }

// ===== PROFIL-MODAL =====
function profilOeffnen() {
  const user = getUser() || {};
  const html = `
  <div class="modal-overlay" id="profil-modal" onclick="if(event.target===this)profilSchliessen()">
    <div class="modal-box">
      <div class="modal-titel">✏️ Mein Profil</div>
      <div class="reg-feld"><label class="reg-label">Vorname</label>
        <input class="reg-input" id="pm-vorname" value="${esc(user.vorname||'')}" placeholder="Vorname" /></div>
      <div class="reg-feld"><label class="reg-label">PLZ / Ort</label>
        <input class="reg-input" id="pm-ort" value="${esc(user.ort||user.plz||'')}" placeholder="Ort oder PLZ" /></div>
      <div class="reg-feld"><label class="reg-label">Bundesland</label>
        <select class="reg-select" id="pm-bl">
          <option value="">Bitte wählen...</option>
          ${BUNDESLAENDER.map(b=>`<option value="${b.id}" ${user.bundesland===b.id?'selected':''}>${b.name}</option>`).join('')}
        </select></div>
      <div style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="profilSpeichern()">✓ Speichern</button>
        <button class="btn btn-outline" onclick="profilSchliessen()">Abbrechen</button>
        <button class="btn" style="color:#DC2626;border:1.5px solid #FCA5A5;margin-left:auto" onclick="logout()">Abmelden</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function profilSchliessen() { el('profil-modal')?.remove(); }

async function profilSpeichern() {
  const user = getUser() || {};
  user.vorname = el('pm-vorname')?.value.trim() || user.vorname;
  const ortNeu = el('pm-ort')?.value.trim();
  const blNeu  = el('pm-bl')?.value;
  if (blNeu) { user.bundesland = blNeu; state.bundesland = BUNDESLAENDER.find(b=>b.id===blNeu) || null; }
  if (ortNeu && ortNeu !== user.ort) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(ortNeu+', Deutschland')}&format=json&limit=1&countrycodes=de`);
      const d = await res.json();
      if (d.length > 0) { user.lat=parseFloat(d[0].lat); user.lng=parseFloat(d[0].lon); user.ort=d[0].display_name.split(',')[0]; user.plz=ortNeu; }
      else { user.ort = ortNeu; }
    } catch { user.ort = ortNeu; }
    if (user.lat) state.umgebungStandort = { lat:user.lat, lng:user.lng, name:user.ort };
  }
  saveUser(user);
  aktualisiereProfilBtn();
  const sel = el('bl-select');
  if (sel && user.bundesland) sel.value = user.bundesland;
  profilSchliessen();
  render();
}

// ===== BUNDESLAND-BANNER =====
function renderBundeslandBanner() {
  if (!state.bundesland) return `<div class="info-box blau"><span class="ib-icon">📍</span><div class="ib-text"><strong>Bundesland auswählen</strong>Wählen Sie oben Ihr Bundesland für länderspezifische Links.</div></div>`;
  const bl = state.bundesland;
  return `<div style="background:linear-gradient(135deg,#EDE9FE20,#DBEAFE20);border:1px solid #C4B5FD;border-radius:var(--r);padding:1rem 1.25rem;margin-bottom:1.25rem;display:flex;align-items:center;gap:.75rem">
    <span style="font-size:1.5rem">📍</span>
    <div>
      <div style="font-weight:700;font-size:.95rem;color:#1D4ED8">${esc(bl.name)}</div>
      <div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.4rem">
        ${bl.besonderheiten.map(b=>`<span style="background:#4F46E5;color:white;font-size:.7rem;font-weight:700;padding:.15rem .5rem;border-radius:99px">✓ ${esc(b)}</span>`).join('')}
      </div>
    </div>
  </div>`;
}

// ===== LEISTUNGEN =====
function renderLeistungen() {
  const f = state.leistungFilter;
  const liste = f==='alle' ? BUNDESWEITE_LEISTUNGEN : BUNDESWEITE_LEISTUNGEN.filter(l=>l.kategorie===f);
  const bl = state.bundesland;
  return `
  <div class="section-title">💰 Zuschüsse & Leistungen</div>
  <p class="section-sub">Alle staatlichen Leistungen für alleinerziehende Eltern — bundesweit</p>
  ${renderBundeslandBanner()}
  <div class="filter-tabs">
    ${[['alle','🔍 Alle'],['kinder','👶 Kinder'],['wohnen','🏠 Wohnen'],['grundsicherung','🛡️ Grundsicherung']].map(([v,l])=>
      `<button class="filter-tab ${f===v?'aktiv':''}" onclick="leistungFilter('${v}')">${l}</button>`).join('')}
  </div>
  <div class="grid-2">
    ${liste.map(l=>`
    <div class="leistung-card">
      <div class="leistung-card-header">
        <span class="leistung-emoji">${l.emoji}</span>
        <div class="leistung-info"><h3>${esc(l.name)}</h3><div class="leistung-behoerde">📌 ${esc(l.behoerde)}</div></div>
        <span class="betrag-badge">${esc(l.betrag)}</span>
      </div>
      <div class="leistung-card-body"><p class="leistung-desc">${esc(l.beschreibung)}</p></div>
      <div class="leistung-card-footer">
        <a href="${l.link}" target="_blank" class="btn btn-outline btn-sm">ℹ️ Info</a>
        ${l.onlineAntrag?`<a href="${l.onlineAntrag}" target="_blank" class="btn btn-gruen btn-sm">📋 Online</a>`:''}
        <button class="btn btn-primary btn-sm" onclick="formularOeffnen('${l.id}')">📝 Ausfüllhilfe</button>
      </div>
    </div>`).join('')}
  </div>
  ${bl?`<div class="block-title">📍 Direkte Links für ${esc(bl.name)}</div><div class="grid-2">${renderBundeslandLinks(bl)}</div>`:''}
  <div class="info-box gruen" style="margin-top:1.5rem">
    <span class="ib-icon">⭐</span>
    <div class="ib-text"><strong>Leistungen kombinieren!</strong>Wohngeld + Kinderzuschlag gleichzeitig möglich. Bürgergeld schließt Wohngeld aus — aber nie Kindergeld oder Unterhaltsvorschuss.</div>
  </div>`;
}

function renderBundeslandLinks(bl) {
  return [
    ['wohngeld','🏠 Wohngeld','#DBEAFE','#2563EB'],['kita','🏫 Kita-Zuschuss','#D1FAE5','#059669'],
    ['jugendamt','🤝 Unterhaltsvorschuss','#FEF3C7','#D97706'],['jobcenter','🛡️ Jobcenter','#EDE9FE','#7C3AED'],
    ['familienportal','👨‍👩‍👧 Familienportal','#FEE2E2','#DC2626']
  ].map(([key,titel,bg,farbe])=>{
    const l = bl.links[key]; if(!l) return '';
    return `<div class="card" style="border-left:4px solid ${farbe};background:${bg}20">
      <div style="font-weight:700;font-size:.88rem;margin-bottom:.5rem">${titel}</div>
      <a href="${l.url}" target="_blank" class="btn btn-primary btn-sm" style="background:${farbe}">${esc(l.text)} →</a>
    </div>`;
  }).join('');
}

function leistungFilter(f) { state.leistungFilter = f; render(); }
function formularOeffnen(id) { state.sektion='formular'; state.antragId=id; state.antragTab='schritte'; render(); window.scrollTo({top:0,behavior:'smooth'}); }

// ===== FORMULAR-ASSISTENT =====
function renderFormularAssistent() {
  if (state.antragId) {
    const a = ANTRAEGE.find(x=>x.id===state.antragId);
    if (a) return renderAntragDetail(a);
  }
  return `
  <div class="section-title">📋 Formular-Assistent</div>
  <p class="section-sub">Wählen Sie einen Antrag für die Schritt-für-Schritt Ausfüllhilfe</p>
  <div class="info-box lila"><span class="ib-icon">💡</span><div class="ib-text"><strong>So funktioniert es:</strong>Antrag wählen → Erklärung, Dokumente, Ausfüllhilfe und direkter Link zum Formular.</div></div>
  <div class="formular-grid" style="margin-top:1.25rem">
    ${ANTRAEGE.map(a=>`
    <button class="formular-auswahl-card" onclick="antragWaehlen('${a.id}')">
      <div class="fa-emoji">${a.emoji}</div>
      <div class="fa-name">${esc(a.name)}</div>
      <div class="fa-behoerde">📌 ${esc(a.behoerde)}</div>
      <div class="fa-betrag">💰 ${esc(a.betrag)}</div>
      <div style="margin-top:.75rem"><span class="btn btn-primary btn-sm">Ausfüllhilfe →</span></div>
    </button>`).join('')}
  </div>`;
}

function antragWaehlen(id)    { state.antragId=id; state.antragTab='schritte'; render(); window.scrollTo({top:0,behavior:'smooth'}); }
function antragTabWaehlen(tab){ state.antragTab=tab; render(); }

function renderAntragDetail(a) {
  const tabs = [
    {id:'schritte',label:'📋 Schritt für Schritt'},{id:'dokumente',label:'📁 Dokumente'},
    {id:'voraussetzungen',label:'✅ Voraussetzungen'},{id:'felder',label:'🖊️ Felder erklärt'}
  ];
  let inhalt = '';
  switch(state.antragTab) {
    case 'schritte': inhalt = a.schritte.map(s=>`
      <div class="schritt"><div class="schritt-nr">${s.nr}</div><div class="schritt-body">
        <div class="schritt-title">${esc(s.titel)}</div>
        <div class="schritt-text">${esc(s.text)}</div>
        ${s.tipp?`<div class="schritt-tipp">${esc(s.tipp)}</div>`:''}
      </div></div>`).join(''); break;
    case 'dokumente': inhalt = `<div class="info-box orange" style="margin-bottom:1rem"><span class="ib-icon">📌</span><div class="ib-text"><strong>Tipp:</strong>Nur Kopien einreichen — Originale immer behalten!</div></div><ul class="check-list">${a.dokumente.map(d=>`<li>${esc(d)}</li>`).join('')}</ul>`; break;
    case 'voraussetzungen': inhalt = `<ul class="check-list">${a.voraussetzungen.map(v=>`<li>${esc(v)}</li>`).join('')}</ul>`; break;
    case 'felder': inhalt = a.formularhilfe.map(f=>`<div class="feld-item"><div class="feld-name">📝 ${esc(f.feld)}</div><div class="feld-erklaerung">${esc(f.erklaerung)}</div></div>`).join(''); break;
  }
  const bl = state.bundesland; const blLink = bl?.links[a.id];
  return `
  <button class="zurueck-btn" onclick="state.antragId=null;render()">← Zurück zur Übersicht</button>
  <div class="antrag-detail">
    <div class="antrag-detail-header">
      <h2>${a.emoji} ${esc(a.name)}</h2><p>${esc(a.beschreibung)}</p>
      <div class="antrag-meta">
        <span class="meta-badge">💰 ${esc(a.betrag)}</span>
        <span class="meta-badge">📌 ${esc(a.behoerde)}</span>
        <span class="meta-badge">⏱️ ${esc(a.dauer)}</span>
      </div>
    </div>
    <div class="antrag-tabs">${tabs.map(t=>`<button class="antrag-tab ${state.antragTab===t.id?'aktiv':''}" onclick="antragTabWaehlen('${t.id}')">${t.label}</button>`).join('')}</div>
    <div class="antrag-tab-content">${inhalt}
      <div style="margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid #E2E8F0">
        <div style="font-weight:700;margin-bottom:.75rem">🔗 Zum Formular</div>
        <div style="display:flex;gap:.75rem;flex-wrap:wrap">
          ${blLink?`<a href="${blLink.url}" target="_blank" class="btn btn-primary">📍 ${esc(blLink.text)}</a>`:''}
          <a href="https://www.familienportal.de" target="_blank" class="btn btn-outline">🇩🇪 Bundesfamilienportal</a>
        </div>
      </div>
    </div>
  </div>`;
}

// ===== WOHNUNG FINDEN =====
function stadtSlug(name) {
  return (name||'').toLowerCase()
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
}

function wohnungOrtSpeichern() {
  const inp = document.getElementById('wohnung-ort-inp');
  const rad = document.getElementById('wohnung-radius-inp');
  if (inp) state.wohnungOrt = inp.value.trim();
  if (rad) state.wohnungRadius = parseInt(rad.value) || 10;
  render();
}

function renderWohnung() {
  const bl = state.bundesland;
  const user = getUser() || {};
  // Ort aus Eingabe, Profil oder leer
  if (!state.wohnungOrt && user.ort) state.wohnungOrt = user.ort;
  if (!state.wohnungPlz  && user.plz) state.wohnungPlz  = user.plz;
  const ort = state.wohnungOrt;
  const slug = stadtSlug(ort);
  const rad  = state.wohnungRadius || 10;

  // Portal-Konfiguration mit Unsplash-Fotos + Deep-Links
  const portale = [
    {
      name: 'ImmoScout24',
      badge: '🏆 Größtes Portal',
      desc: 'Größtes deutsches Immobilienportal mit echten Wohnungsfotos — keine Anmeldung zum Stöbern nötig.',
      tipp: 'Suchagent anlegen → sofortige E-Mail bei neuen Angeboten',
      foto: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=75',
      url: ort ? `https://www.immobilienscout24.de/Suche/de/${slug}/wohnung-mieten.html` : 'https://www.immobilienscout24.de',
      farbe: '#4F46E5',
      keinAnmelden: true
    },
    {
      name: 'Kleinanzeigen',
      badge: '🏷️ Ohne Makler',
      desc: 'Privatvermieter ohne Maklergebühr — echte Fotos direkt vom Vermieter. Täglich neue Angebote.',
      tipp: 'Schnell reagieren! Privatvermieter entscheiden oft in Stunden',
      foto: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=75',
      url: ort ? `https://www.kleinanzeigen.de/s-wohnung-mieten/${slug}/` : 'https://www.kleinanzeigen.de/s-wohnung-mieten/',
      farbe: '#D97706',
      keinAnmelden: true
    },
    {
      name: 'Immowelt',
      badge: '📸 Viele Fotos',
      desc: 'Zweitgrößtes Portal — viele Inserate mit ausführlichen Fotoserien, keine Anmeldung nötig.',
      tipp: 'Oft günstigere Angebote als ImmoScout, weniger Konkurrenz',
      foto: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=75',
      url: ort ? `https://www.immowelt.de/suche/${slug}/wohnungen/mieten` : 'https://www.immowelt.de',
      farbe: '#059669',
      keinAnmelden: true
    },
    {
      name: 'Wohnungsbörse',
      badge: '🏛️ Sozialwohnungen',
      desc: 'Viele Sozialwohnungen und WBS-Angebote — ideal für Alleinerziehende mit Wohnberechtigungsschein.',
      tipp: 'Filter "WBS akzeptiert" oder "Sozialwohnung" nutzen',
      foto: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=75',
      url: ort ? `https://www.wohnungsboerse.net/suche/?city=${encodeURIComponent(ort)}` : 'https://www.wohnungsboerse.net',
      farbe: '#7C3AED',
      keinAnmelden: true
    },
    {
      name: 'WG-Gesucht',
      badge: '🛋️ Auch mit Kind',
      desc: 'Wohnungen und WG-Zimmer — viele familienfreundliche Angebote. Fotos immer dabei.',
      tipp: 'Filter "Familienfreundlich" oder "Mit Kind erlaubt" nutzen',
      foto: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=75',
      url: ort ? `https://www.wg-gesucht.de/wohnungen-in-${slug}.html` : 'https://www.wg-gesucht.de',
      farbe: '#2563EB',
      keinAnmelden: true
    },
    {
      name: 'AWO / Caritas / Diakonie',
      badge: '❤️ Für Alleinerziehende',
      desc: 'Soziale Träger haben eigene günstige Wohnprojekte speziell für alleinerziehende Familien.',
      tipp: 'Direkt vor Ort anfragen — oft ohne Portal-Konkurrenz und schneller',
      foto: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=75',
      url: 'https://www.awo.org',
      farbe: '#DC2626',
      keinAnmelden: true
    }
  ];

  return `
  <div class="section-title">🏘️ Wohnung finden</div>
  <p class="section-sub">Echte Wohnungsfotos sofort — ohne Registrierung. Alle Portale auf Ihren Standort zugeschnitten.</p>

  <!-- Standort-Eingabe -->
  <div class="wohnung-standort-box">
    <div class="wohnung-standort-title">📍 Ihr Suchgebiet</div>
    <div class="wohnung-standort-row">
      <div style="flex:1;min-width:160px">
        <label class="wohnung-label">Ort / Stadt</label>
        <input id="wohnung-ort-inp" class="wohnung-inp" type="text" placeholder="z.B. München, Berlin…"
          value="${esc(ort)}" />
      </div>
      <div>
        <label class="wohnung-label">Suchradius</label>
        <select id="wohnung-radius-inp" class="wohnung-inp wohnung-radius-sel">
          ${[5,10,15,25,50].map(r=>`<option value="${r}" ${r===rad?'selected':''}>${r} km</option>`).join('')}
        </select>
      </div>
      <div style="display:flex;align-items:flex-end">
        <button class="btn btn-primary" onclick="wohnungOrtSpeichern()">🔍 Suchen</button>
      </div>
    </div>
    ${ort ? `<div class="wohnung-standort-info">✓ Suche in <strong>${esc(ort)}</strong> · Umkreis ${rad} km · Alle Links direkt vorausgefüllt</div>` : '<div class="wohnung-standort-info" style="color:var(--orange)">Ort eingeben für vorausgefüllte Suche in allen Portalen</div>'}
  </div>

  <!-- WBS Info -->
  <div class="wbs-box">
    <h3>🔑 Wohnberechtigungsschein (WBS)</h3>
    <p>Als Alleinerziehende haben Sie oft Anspruch auf günstigere Sozialwohnungen.</p>
    <div style="display:flex;gap:.75rem;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="formularOeffnen('wohnberechtigungsschein')">📋 WBS beantragen — Schritt für Schritt</button>
      ${bl?`<a href="${bl.links.wohngeld.url}" target="_blank" class="btn btn-outline">📍 Wohnungsamt ${esc(bl.name)}</a>`:''}
    </div>
  </div>

  ${bl?`<div class="block-title">🏛️ Wohnungsbaugesellschaften in ${esc(bl.name)}</div>
  <div class="grid-2">${bl.links.wohnungsbau.map(w=>`<div class="card" style="border-left:4px solid #7C3AED"><div style="font-weight:700;margin-bottom:.5rem">${esc(w.text)}</div><a href="${w.url}" target="_blank" class="btn btn-primary btn-sm">Zur Website →</a></div>`).join('')}</div>`:''}

  <div class="block-title">🌐 Wohnungsportale — Fotos sofort, keine Anmeldung</div>
  <div class="wohnung-portal-grid">
    ${portale.map(p=>`
    <div class="wohnung-portal-karte">
      <div class="wohnung-portal-bild" style="background-image:url('${p.foto}')">
        <span class="wohnung-kein-login">✓ Keine Anmeldung</span>
        <span class="wohnung-badge" style="background:${p.farbe}">${p.badge}</span>
      </div>
      <div class="wohnung-portal-body">
        <div class="wohnung-portal-name">${esc(p.name)}</div>
        <p class="wohnung-portal-desc">${esc(p.desc)}</p>
        <div class="wohnung-portal-tipp">💡 ${esc(p.tipp)}</div>
        <a href="${p.url}" target="_blank" class="btn btn-primary btn-sm" style="width:100%;text-align:center">
          ${ort ? `In ${esc(ort)} suchen →` : 'Jetzt suchen →'}
        </a>
      </div>
    </div>`).join('')}
  </div>`;
}

// ===== BERATUNG =====
function renderBeratung() {
  return `
  <div class="section-title">📞 Beratung & Hilfe</div>
  <p class="section-sub">Kostenlose Beratungsstellen und Nummern für alleinerziehende Eltern</p>
  <div class="info-box gruen"><span class="ib-icon">❤️</span><div class="ib-text"><strong>Sie sind nicht allein!</strong>Es gibt viele kostenlose Anlaufstellen die Ihnen helfen.</div></div>
  ${BERATUNGSSTELLEN.map(kat=>`
    <div style="margin-bottom:1.5rem">
      <div class="block-title">${kat.emoji} ${esc(kat.kategorie)}</div>
      ${kat.stellen.map(s=>`
      <div class="beratung-card">
        <div>
          <div class="beratung-name">${esc(s.name)}</div>
          <div class="beratung-desc">${esc(s.beschreibung)}</div>
          ${s.kostenlos?'<span class="kostenlos-badge">✓ Kostenlos</span>':'<span class="kostenlos-badge" style="background:#FEE2E2;color:#DC2626">Kostenpflichtig</span>'}
        </div>
        <div class="beratung-actions">
          ${s.tel?`<a href="tel:${s.tel}" class="btn btn-primary btn-sm">📞 ${esc(s.tel)}</a>`:''}
          ${s.url?`<a href="${s.url}" target="_blank" class="btn btn-outline btn-sm">🌐 Website</a>`:''}
        </div>
      </div>`).join('')}
    </div>`).join('')}`;
}

// ===== SPAREN =====
function sparTabWaehlen(tab) { state.sparTab=tab; render(); }

function renderSparen() {
  const tabs = [
    {id:'liste',label:'🛍️ Einkaufsliste'},{id:'supermarkt',label:'🛒 Supermarkt'},
    {id:'sprit',label:'⛽ Spritpreise'},{id:'lebensmittel',label:'🥦 Günstig essen'},
    {id:'strom',label:'⚡ Strom & Handy'},{id:'vertraege',label:'🔄 Verträge'},
    {id:'kleidung',label:'👕 Kleidung'},{id:'tipps',label:'💡 Tipps'}
  ];
  let inhalt = '';
  switch(state.sparTab) {
    case 'liste':       inhalt = renderEinkaufsliste(); break;
    case 'supermarkt':  inhalt = renderSparSupermarkt(); break;
    case 'sprit':       inhalt = renderSparSprit(); break;
    case 'lebensmittel':inhalt = renderSparLebensmittel(); break;
    case 'strom':       inhalt = renderSparStrom(); break;
    case 'vertraege':   inhalt = renderVertraege(); break;
    case 'kleidung':    inhalt = renderSparKleidung(); break;
    case 'tipps':       inhalt = renderSparTipps(); break;
    default:            inhalt = renderSparSupermarkt();
  }
  return `
  <div class="section-title">💡 Sparen im Alltag</div>
  <p class="section-sub">Supermarkt-Angebote, Spritpreise, Secondhand und mehr</p>
  <div class="antrag-tabs" style="margin-bottom:1.25rem">
    ${tabs.map(t=>`<button class="antrag-tab ${state.sparTab===t.id?'aktiv':''}" onclick="sparTabWaehlen('${t.id}')">${t.label}</button>`).join('')}
  </div>${inhalt}`;
}

// Einkaufsliste
function listeleden() { try { return JSON.parse(localStorage.getItem('einkaufsliste')||'[]'); } catch { return []; } }
function listeSpeichern(items) { localStorage.setItem('einkaufsliste', JSON.stringify(items)); }

function listeHinzufuegen() {
  const input=el('liste-input'), menge=el('liste-menge');
  const text=input?.value.trim(); if(!text){input?.focus();return;}
  const items=listeleden(); items.push({id:Date.now(),text,menge:menge?.value.trim()||'',erledigt:false});
  listeSpeichern(items); if(input)input.value=''; if(menge)menge.value=''; input?.focus(); renderListeInhalt();
}
function schnellHinzufuegen(a) { const items=listeleden(); items.push({id:Date.now(),text:a.split(' ').slice(1).join(' '),menge:'',erledigt:false}); listeSpeichern(items); renderListeInhalt(); }
function listeToggle(id) { listeSpeichern(listeleden().map(i=>i.id===id?{...i,erledigt:!i.erledigt}:i)); renderListeInhalt(); }
function listeLoeschen(id) { listeSpeichern(listeleden().filter(i=>i.id!==id)); renderListeInhalt(); }
function listeErledigtLoeschen() { listeSpeichern(listeleden().filter(i=>!i.erledigt)); renderListeInhalt(); }
function listeAlleLoeschen() { if(confirm('Gesamte Liste löschen?')){ listeSpeichern([]); renderListeInhalt(); } }

function renderListeInhalt() {
  const container=el('liste-container'); if(!container)return;
  const items=listeleden(), offen=items.filter(i=>!i.erledigt), erledigt=items.filter(i=>i.erledigt);
  if(items.length===0){container.innerHTML=`<div class="liste-leer"><div style="font-size:3rem;margin-bottom:.75rem">🛒</div><div style="font-weight:700">Liste ist leer</div><div style="font-size:.85rem;color:#94A3B8">Artikel oben hinzufügen</div></div>`;return;}
  const ri=i=>`<div class="liste-item ${i.erledigt?'erledigt':''}">
    <button class="liste-check" onclick="listeToggle(${i.id})">${i.erledigt?'✓':''}</button>
    <div class="liste-text"><span class="liste-name">${esc(i.text)}</span>${i.menge?`<span class="liste-menge-label">${esc(i.menge)}</span>`:''}</div>
    <button class="liste-del" onclick="listeLoeschen(${i.id})">✕</button>
  </div>`;
  container.innerHTML=`${offen.length?`<div class="liste-gruppe-titel">Noch zu kaufen (${offen.length})</div>${offen.map(ri).join('')}`:''}${erledigt.length?`<div class="liste-gruppe-titel" style="margin-top:1rem">Erledigt (${erledigt.length})</div>${erledigt.map(ri).join('')}<button class="btn btn-outline btn-sm" style="margin-top:.75rem;color:#64748B;border-color:#CBD5E1" onclick="listeErledigtLoeschen()">Erledigte löschen</button>`:''}`;
}

function renderEinkaufsliste() {
  const items=listeleden(), anzahl=items.filter(i=>!i.erledigt).length;
  return `<div class="liste-wrapper">
  <div class="liste-header-info">
    <div><div style="font-weight:700;font-size:1.05rem">🛍️ Meine Einkaufsliste</div>
    <div style="font-size:.82rem;color:#64748B;margin-top:.15rem">${anzahl>0?`${anzahl} Artikel offen`:'Alle erledigt ✓'}</div></div>
    ${items.length>0?`<button class="btn btn-sm" style="color:#DC2626;border:1.5px solid #FCA5A5;background:transparent" onclick="listeAlleLoeschen()">🗑 Alle löschen</button>`:''}
  </div>
  <div class="liste-eingabe-box">
    <input id="liste-input" class="liste-input" type="text" placeholder="Artikel eingeben, z.B. Milch..." onkeydown="if(event.key==='Enter')listeHinzufuegen()" autocomplete="off" />
    <input id="liste-menge" class="liste-menge-input" type="text" placeholder="Menge (2x)" onkeydown="if(event.key==='Enter')listeHinzufuegen()" autocomplete="off" />
    <button class="btn btn-primary" onclick="listeHinzufuegen()">+ Hinzufügen</button>
  </div>
  <div class="liste-schnell">
    <div style="font-size:.78rem;color:#64748B;margin-bottom:.4rem;font-weight:600">Schnell hinzufügen:</div>
    <div style="display:flex;flex-wrap:wrap;gap:.35rem">
      ${['🥛 Milch','🍞 Brot','🥚 Eier','🧴 Shampoo','🍌 Bananen','🧻 Klopapier','🧀 Käse','🥩 Fleisch','☕ Kaffee','🍝 Nudeln','🛢️ Öl','🧹 Spülmittel'].map(a=>`<button class="schnell-btn" onclick="schnellHinzufuegen('${a}')">${a}</button>`).join('')}
    </div>
  </div>
  <div id="liste-container" style="margin-top:1rem"></div>
  </div>`;
}

function renderSparSupermarkt() {
  return `
  <div class="info-box blau" style="margin-bottom:1.25rem"><span class="ib-icon">📰</span><div class="ib-text"><strong>Profi-Tipp:</strong> Donnerstag die neuen Prospekte auf Kaufda ansehen → gezielt nur Angebote kaufen. Spart 20–40 % der Einkaufskosten.</div></div>
  <div class="block-title">📰 Prospekte & Preisvergleich</div>
  <div class="grid-2">${SUPERMARKT_PORTALE.filter(p=>p.typ==='prospekte'||p.typ==='preisvergleich').map(p=>`
    <div class="portal-card" style="border-left:4px solid #2563EB"><div class="portal-header"><span class="portal-emoji">${p.emoji}</span><span class="portal-name">${esc(p.name)}</span></div>
    <p class="portal-desc">${esc(p.beschreibung)}</p><div class="portal-tipp">${esc(p.tipp)}</div>
    <a href="${p.url}" target="_blank" class="btn btn-primary btn-sm">Angebote ansehen →</a></div>`).join('')}</div>
  <div class="block-title">🏪 Supermarkt-Angebote direkt</div>
  <div class="grid-4">${SUPERMARKT_PORTALE.filter(p=>p.typ==='supermarkt').map(p=>`
    <a href="${p.url}" target="_blank" style="text-decoration:none">
    <div class="card" style="text-align:center;cursor:pointer">
      <div style="font-size:2rem;margin-bottom:.4rem">${p.emoji}</div>
      <div style="font-weight:700;font-size:.9rem;margin-bottom:.25rem">${esc(p.name.replace(' Angebote',''))}</div>
      <div style="font-size:.72rem;color:#64748B;margin-bottom:.5rem">${esc(p.tipp.split(' — ')[0])}</div>
      <span class="btn btn-primary btn-sm" style="width:100%;justify-content:center">Angebote</span>
    </div></a>`).join('')}</div>`;
}

// ===== LIVE SPRITPREISE (ohne Registrierung) =====
function spritTypWaehlen(typ) { state.spritTyp = typ; render(); }

function spritGPSOeffnen() {
  const u = getUser();
  const lat = state.umgebungStandort?.lat || u?.lat;
  const lng = state.umgebungStandort?.lng || u?.lng;
  const typ = state.spritTyp || 'e10';
  const kraftstoffId = {e5:'1', e10:'2', diesel:'3'}[typ] || '2';
  if (lat && lng) {
    window.open(`https://www.clever-tanken.de/tankstelle_liste?lat=${lat}&lng=${lng}&fuel_type_id=${kraftstoffId}&r=5`, '_blank');
  } else {
    navigator.geolocation.getCurrentPosition(
      p => window.open(`https://www.clever-tanken.de/tankstelle_liste?lat=${p.coords.latitude}&lng=${p.coords.longitude}&fuel_type_id=${kraftstoffId}&r=5`, '_blank'),
      () => window.open('https://www.clever-tanken.de', '_blank')
    );
  }
}

function renderSparSprit() {
  const u = getUser();
  const standort = state.umgebungStandort || (u?.lat ? {lat:u.lat, lng:u.lng, name:u.ort} : null);
  const typ = state.spritTyp || 'e10';
  const typen = {e5:'Super E5', e10:'Super E10', diesel:'Diesel'};
  const kraftstoffId = {e5:'1', e10:'2', diesel:'3'}[typ];

  return `
  <div class="info-box orange"><span class="ib-icon">⛽</span><div class="ib-text"><strong>Aktuelle Spritpreise — ohne Registrierung!</strong> Einfach auf den Button klicken und sofort alle Tankstellen mit echten Preisen in Ihrer Nähe sehen.</div></div>

  <div class="sprit-typ-tabs" style="margin-bottom:1rem">
    ${Object.entries(typen).map(([k,v])=>`<button class="sprit-typ-btn ${typ===k?'aktiv':''}" onclick="spritTypWaehlen('${k}')">${v}</button>`).join('')}
  </div>

  <div style="display:flex;flex-direction:column;gap:.65rem;margin-bottom:1.5rem">
    <button class="btn btn-primary" style="padding:1rem;font-size:1rem;border-radius:var(--r)" onclick="spritGPSOeffnen()">
      📡 Aktuelle ${typen[typ]}-Preise in meiner Nähe anzeigen
    </button>
    ${standort ? `
    <a href="https://www.tankerkoenig.de/?lat=${standort.lat}&lng=${standort.lng}&zoom=13&type=${typ}" target="_blank"
       class="btn" style="text-align:center;text-decoration:none;background:#D97706;color:white;padding:.85rem;border-radius:var(--r)">
      👑 Tankerkönig-Karte öffnen (${esc(standort.name)})
    </a>
    <a href="https://www.adac.de/verkehr/tanken-kraftstoff-antrieb/kraftstoffpreise/" target="_blank"
       class="btn" style="text-align:center;text-decoration:none;background:#006EB7;color:white;padding:.85rem;border-radius:var(--r)">
      🚗 ADAC Kraftstoffpreise ansehen
    </a>` : `<p style="font-size:.85rem;color:var(--g500);text-align:center">Standort im Profil oder unter Orte → Umgebung eingeben für direkte Links</p>`}
  </div>

  <div class="block-title">🕐 Wann am günstigsten tanken?</div>
  <div class="grid-2">
    ${[
      ['📅','Di & Mi sind günstigste Tage','ADAC: Dienstag & Mittwoch im Schnitt 3–8 Ct./L billiger als am Wochenende.',true],
      ['🌙','Abends 18–22 Uhr tanken','Tagestiefpunkt der Preise: Abends bis zu 10 Ct./L günstiger als morgens.',true],
      ['🚗','Autobahn meiden','Autobahn-Tankstellen kosten 15–30 Ct./L mehr als in der Stadt.',false],
      ['📱','Kurz vergleichen lohnt sich','10–20 Ct. Unterschied × 50 L = 5–10 € gespart — bei jeder Tankfüllung!',true]
    ].map(([i,t,tx,g])=>`
    <div class="card" style="border-left:4px solid ${g?'#059669':'#DC2626'}">
      <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.35rem"><span style="font-size:1.25rem">${i}</span><div style="font-weight:700;font-size:.9rem;color:${g?'#059669':'#DC2626'}">${t}</div></div>
      <div style="font-size:.82rem;color:#334155;line-height:1.5">${esc(tx)}</div>
    </div>`).join('')}
  </div>`;
}

function renderSparLebensmittel() {
  return `
  <div class="info-box gruen"><span class="ib-icon">❤️</span><div class="ib-text"><strong>Kostenlose Lebensmittel gibt es wirklich!</strong>Die Tafel, Foodsharing und Mundraub — kein Grund zur Scham, genau dafür sind diese Angebote da.</div></div>
  <div class="grid-2">${LEBENSMITTEL_QUELLEN.map(q=>`
    <div class="card" style="border-left:4px solid ${q.kostenlos?'#059669':'#2563EB'}">
      <div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.5rem"><span style="font-size:1.75rem">${q.emoji}</span>
      <div><div style="font-weight:700;font-size:.95rem">${esc(q.name)}</div>${q.kostenlos?'<span class="kostenlos-badge">✓ Kostenlos</span>':'<span class="kostenlos-badge" style="background:#DBEAFE;color:#1D4ED8">Sehr günstig</span>'}</div></div>
      <p style="font-size:.83rem;color:#334155;line-height:1.5;margin-bottom:.6rem">${esc(q.beschreibung)}</p>
      <div class="portal-tipp" style="margin-bottom:.6rem">${esc(q.tipp)}</div>
      <a href="${q.url}" target="_blank" class="btn btn-primary btn-sm">Jetzt nutzen →</a>
    </div>`).join('')}</div>`;
}

function renderSparStrom() {
  return `
  <div class="info-box blau"><span class="ib-icon">⚡</span><div class="ib-text"><strong>Strom-Anbieter wechseln = einfachste 200–400 € im Jahr sparen.</strong>5 Min. auf Verivox oder Check24 reichen.</div></div>
  <div class="grid-2">${ENERGIE_PORTALE.map(p=>`
    <div class="portal-card" style="border-left:4px solid ${{strom:'#D97706',internet:'#2563EB',handy:'#059669'}[p.kategorie]||'#4F46E5'}">
      <div class="portal-header"><span class="portal-emoji">${p.emoji}</span><span class="portal-name">${esc(p.name)}</span></div>
      <p class="portal-desc">${esc(p.beschreibung)}</p><div class="portal-tipp">${esc(p.tipp)}</div>
      <a href="${p.url}" target="_blank" class="btn btn-primary btn-sm">Jetzt vergleichen →</a>
    </div>`).join('')}</div>`;
}

// ===== VERTRAGSWECHSEL-ASSISTENT =====
function vertraegeKatWaehlen(id) { state.vertraegeKat = id; render(); }

function renderVertraege() {
  const kat = state.vertraegeKat || null;

  const kategorien = [
    {
      id: 'strom',
      emoji: '⚡', name: 'Strom & Gas', farbe: '#D97706', bg: '#FEF3C7',
      ersparnis: '200–500 € / Jahr',
      beschreibung: 'Strom- und Gasanbieter wechseln ist der schnellste Weg zu hunderten Euro Ersparnis — in 5 Minuten erledigt.',
      wann: 'Jederzeit möglich. Kündigung läuft automatisch über das neue Unternehmen.',
      portale: [
        { name:'Verivox Strom', url:'https://www.verivox.de/strom/', emoji:'⚡', info:'Größter Vergleich, auch mit Ökostrom' },
        { name:'Check24 Strom', url:'https://www.check24.de/strom/', emoji:'💡', info:'Schnell, übersichtlich, guter Kundendienst' },
        { name:'Verivox Gas', url:'https://www.verivox.de/gas/', emoji:'🔥', info:'Gasanbieter vergleichen' },
        { name:'Sozialtarife prüfen', url:'https://www.verbraucherzentrale.de/wissen/energie/preise-tarife-und-abrechnungen/sozialtarife-fuer-strom-und-gas-gibt-es-sie-noch-7764', emoji:'🤝', info:'Bei Bürgergeld: Sozialtarif beim Stadtwerk anfragen' }
      ],
      schritte: [
        { nr:1, titel:'Verbrauch ermitteln', text:'Schauen Sie auf Ihre letzte Jahresabrechnung: kWh-Verbrauch für Strom und/oder Gas notieren. Ohne diesen Wert kein korrekter Vergleich.' },
        { nr:2, titel:'Vergleich starten', text:'Auf Verivox oder Check24 Verbrauch, PLZ und aktuellen Anbieter eingeben. Günstigsten Anbieter mit Vertragslaufzeit max. 12 Monate wählen.' },
        { nr:3, titel:'Online wechseln — 5 Minuten', text:'Name, Adresse, IBAN eingeben. Das neue Unternehmen kündigt beim alten Anbieter für Sie — Sie müssen nichts tun.' },
        { nr:4, titel:'Jährlich wiederholen', text:'Neukunden-Boni laufen nach 12 Monaten aus. Jedes Jahr erneut vergleichen — so immer günstig bleiben.' }
      ],
      spar_tipp: 'Grundversorger sind fast immer am teuersten. Wechsel zu einem Discounter-Anbieter spart oft 30–50 %.'
    },
    {
      id: 'kfz',
      emoji: '🚗', name: 'Kfz-Versicherung', farbe: '#2563EB', bg: '#DBEAFE',
      ersparnis: '100–400 € / Jahr',
      beschreibung: 'KfZ-Versicherung jährlich zum 30. November wechseln — oft 200–400 € Unterschied zwischen Anbietern für identischen Schutz.',
      wann: 'Hauptkündigungstermin: 30. November (zum 1. Januar). Sonst: bei Preiserhöhung (1 Monat Sonderkündigung).',
      portale: [
        { name:'Check24 KfZ', url:'https://www.check24.de/kfz-versicherung/', emoji:'🚗', info:'Größter Vergleich, inkl. Telematik-Tarife' },
        { name:'Verivox KfZ', url:'https://www.verivox.de/kfz-versicherung/', emoji:'🔵', info:'Unabhängiger Vergleich aller großen Anbieter' },
        { name:'HUK-COBURG', url:'https://www.huk.de', emoji:'🦁', info:'Günstigster Direktanbieter in vielen SF-Klassen' },
        { name:'Direktversicherung', url:'https://www.directline.com/kfz-versicherung', emoji:'📱', info:'Oft 20–30 % günstiger als Maklerverträge' }
      ],
      schritte: [
        { nr:1, titel:'Daten bereithalten', text:'Kfz-Schein: Kennzeichen, Fahrzeug-Daten. Fahrleistung pro Jahr, Schadenfreiheitsklasse (SF-Klasse steht auf aktuellem Versicherungsschein), Geburtsdatum.' },
        { nr:2, titel:'Vergleich ab Oktober starten', text:'Spätestens im Oktober vergleichen — bis 30. November kündigen. Auf Check24 alle Tarife mit gleichem Leistungsumfang vergleichen.' },
        { nr:3, titel:'Gleiche Leistung sicherstellen', text:'Haftpflicht ist Pflicht. Teilkasko oder Vollkasko nur wenn nötig. Wichtige Extras: Mallorca-Police, Schutzbrief, Fahrerschutz.' },
        { nr:4, titel:'Kündigung einreichen', text:'Neuer Anbieter kümmert sich oft um die Kündigung. Alternativ: Kündigung per Einschreiben bis 30. November schicken.' }
      ],
      spar_tipp: 'Als Alleinerziehende: Telematik-Tarife (Fahrstil-Bonus) können günstig sein wenn man wenig und vorsichtig fährt.'
    },
    {
      id: 'haftpflicht',
      emoji: '🛡️', name: 'Haftpflicht & Hausrat', farbe: '#7C3AED', bg: '#EDE9FE',
      ersparnis: '50–150 € / Jahr',
      beschreibung: 'Private Haftpflicht (Pflicht für jede Familie!) und Hausrat — beide jährlich prüfen. Neue Familiensituation ändert oft den Bedarf.',
      wann: 'Kündigung jährlich möglich, meist 3 Monate vor Ablauf.',
      portale: [
        { name:'Check24 Haftpflicht', url:'https://www.check24.de/privathaftpflicht/', emoji:'🛡️', info:'Familienpolicen ab 35 €/Jahr — Kinder gratis mitversichert' },
        { name:'Verivox Haftpflicht', url:'https://www.verivox.de/privathaftpflichtversicherung/', emoji:'💜', info:'Unabhängiger Vergleich inklusive Deckungssummen' },
        { name:'Check24 Hausrat', url:'https://www.check24.de/hausratversicherung/', emoji:'🏠', info:'Hausrat: Einbruch, Feuer, Wasser — ab 40 €/Jahr' },
        { name:'Stiftung Warentest', url:'https://www.test.de/themen/versicherungen-vorsorge/', emoji:'📋', info:'Unabhängige Testergebnisse für alle Versicherungstypen' }
      ],
      schritte: [
        { nr:1, titel:'Deckungssumme prüfen', text:'Private Haftpflicht muss mindestens 10 Mio. € Deckungssumme haben. Viele alte Verträge haben nur 5 Mio. — zu wenig!' },
        { nr:2, titel:'Familienstatus aktualisieren', text:'Nach Trennung/Scheidung: Alten Familienvertrag kündigen oder anpassen. Neuen Vertrag als Alleinerziehende/r (mit Kindern) schließen.' },
        { nr:3, titel:'Vergleichen und wechseln', text:'Gleiche Deckungssumme + Leistungen auf beiden Portalen eingeben. Günstigsten wählen — Wechsel dauert wenige Minuten.' },
        { nr:4, titel:'Hausrat: Wohnfläche aktualisieren', text:'Kleinere Wohnung nach Trennung = günstigere Hausrat. Wohnfläche und Adresse immer aktuell halten beim Anbieter.' }
      ],
      spar_tipp: 'Haftpflicht + Hausrat bei einem Anbieter bündeln spart oft 15–20 %. Kinder unter 18 sind in der Familienpolicy gratis mitversichert.'
    },
    {
      id: 'krankenkasse',
      emoji: '🏥', name: 'Krankenkasse wechseln', farbe: '#059669', bg: '#D1FAE5',
      ersparnis: '100–300 € / Jahr + bessere Zusatzleistungen',
      beschreibung: 'Krankenkassen unterscheiden sich stark bei Beitrag und Zusatzleistungen — Zahnersatz, Brillen, Heilpraktiker, Vorsorge und mehr.',
      wann: 'Jederzeit mit 2 Monaten Kündigungsfrist (nach mindestens 12 Monaten Mitgliedschaft).',
      portale: [
        { name:'Check24 Krankenkasse', url:'https://www.check24.de/gesetzliche-krankenversicherung/', emoji:'🏥', info:'Vergleich Beitragssatz + Zusatzleistungen aller GKV' },
        { name:'Krankenkassen-Info', url:'https://www.krankenkassen.de', emoji:'📊', info:'Ausführlicher Vergleich mit Testergebnissen' },
        { name:'Verivox Krankenkasse', url:'https://www.verivox.de/krankenkassen/', emoji:'💚', info:'Schnellvergleich nach PLZ und Einkommen' },
        { name:'Zusatzleistungen Stiftung Warentest', url:'https://www.test.de/themen/versicherungen-vorsorge/krankenkassen/', emoji:'📋', info:'Welche Kasse zahlt was? Unabhängiger Test' }
      ],
      schritte: [
        { nr:1, titel:'Aktuelle Leistungen notieren', text:'Was zahlt Ihre Kasse? Zahnersatz, Brillen, Heilpraktiker, Vorsorge, Impfungen — alles notieren und mit anderen vergleichen.' },
        { nr:2, titel:'Beitragssatz vergleichen', text:'Jede Kasse hat einen individuellen Zusatzbeitrag (Unterschied oft 0,3–0,8 %). Bei 3.000 € Brutto = bis 240 € Unterschied pro Jahr.' },
        { nr:3, titel:'Neue Kasse auswählen', text:'Online anmelden bei der neuen Kasse — die kümmert sich um die Kündigung bei der alten Kasse.' },
        { nr:4, titel:'Arbeitgeber informieren', text:'Neuen Krankenkassennachweis (Mitgliedsbescheinigung) sofort dem Arbeitgeber mitteilen.' }
      ],
      spar_tipp: 'Als Alleinerziehende: Kassen mit guten Kindervorsorge-Leistungen (Impfungen, Zahnprophylaxe, Brillenzuschuss) besonders attraktiv.'
    },
    {
      id: 'internet',
      emoji: '📶', name: 'Internet & Handy', farbe: '#0EA5E9', bg: '#E0F2FE',
      ersparnis: '100–400 € / Jahr',
      beschreibung: 'Handy-Discounter und DSL-Neukundentarife können 50–70 % günstiger sein als laufende Bestandsverträge.',
      wann: 'DSL: Zum Vertragsende (meist 24 Monate). Handy: nach 24 Monaten oder bei Preiserhöhung sofort.',
      portale: [
        { name:'Check24 DSL / Internet', url:'https://www.check24.de/dsl/', emoji:'📶', info:'Internet ab 15 €/Monat — Glasfaser und DSL vergleichen' },
        { name:'Check24 Handyvertrag', url:'https://www.check24.de/handytarife/', emoji:'📱', info:'Tarife ab 5 €/Monat — Discounter oft 70 % günstiger' },
        { name:'Handyflash', url:'https://www.handyflash.de', emoji:'⚡', info:'Spezialist für günstige Handytarife + Aktionen' },
        { name:'Tarifcheck', url:'https://www.tarifcheck.de/handytarife/', emoji:'📊', info:'Unabhängiger Tarif-Vergleich für Handy und Internet' }
      ],
      schritte: [
        { nr:1, titel:'Vertragsende prüfen', text:'Kündigung des DSL-Vertrags muss meist 3 Monate vor Ablauf erfolgen — schauen Sie in Ihren Unterlagen nach dem genauen Datum.' },
        { nr:2, titel:'Günstiger Tarif: Discounter bevorzugen', text:'Aldi Talk, Lidl Connect, Penny Mobile, Klarmobil — nutzen D-Netz (Telekom/Vodafone) und kosten 5–12 €/Monat statt 30–50 €.' },
        { nr:3, titel:'DSL: Neukundentarif wählen', text:'Nach Vertragsende sofort wechseln — Neukunden bekommen Aktionspreise. 1&1, O2, Telekom, Vodafone alle 1–2x jährlich mit günstigen Aktionen.' },
        { nr:4, titel:'Sozialrabatt anfragen', text:'Mit Sozialausweis oder Bürgergeld-Bescheid: manche Anbieter geben 50 % Rabatt. Direkt beim Anbieter nachfragen!' }
      ],
      spar_tipp: 'Handy-Tipp: Nummer behalten beim Wechsel — "Rufnummernmitnahme" ist kostenlos und dauert 1–2 Tage.'
    },
    {
      id: 'rundfunk',
      emoji: '📺', name: 'Rundfunkbeitrag — Befreiung', farbe: '#DC2626', bg: '#FEE2E2',
      ersparnis: '220 € / Jahr (komplette Befreiung)',
      beschreibung: 'Bei Bürgergeld, Sozialhilfe oder bestimmten anderen Leistungen können Sie sich vom Rundfunkbeitrag (17,50 €/Monat) befreien lassen.',
      wann: 'Sofort beantragen wenn Leistungsbezug besteht — rückwirkend bis 3 Jahre möglich.',
      portale: [
        { name:'ARD ZDF Beitragsservice', url:'https://www.rundfunkbeitrag.de/buergerinnen_und_buerger/formulare/befreiung_oder_ermaessigung/', emoji:'📺', info:'Offizieller Befreiungsantrag — kostenlos online' },
        { name:'Befreiungsgründe prüfen', url:'https://www.rundfunkbeitrag.de/buergerinnen_und_buerger/befreiung/', emoji:'📋', info:'Alle Befreiungsgründe auf einen Blick' }
      ],
      schritte: [
        { nr:1, titel:'Berechtigung prüfen', text:'Befreiung möglich bei: Bürgergeld/ALG II, Sozialhilfe, BAföG, Behindertenausweis (Merkzeichen RF), Blindengeld, Pflegegeld Stufe 4+.', tipp:'Auch Wohngeld alleine reicht nicht — aber Kombination mit sehr niedrigem Einkommen kann Ermäßigung ergeben.' },
        { nr:2, titel:'Online-Antrag stellen', text:'Auf rundfunkbeitrag.de → "Befreiung oder Ermäßigung beantragen". Bescheid (z.B. Bürgergeld-Bescheid) als PDF hochladen oder per Post schicken.', tipp:'Beitragsnummer steht auf der Rechnung des Rundfunkbeitrags.' },
        { nr:3, titel:'Bescheid abwarten', text:'Befreiung wird meist rückwirkend ab Antragstellung gewährt. Bei Bürgergeld-Bezug: direkt rückwirkend ab Leistungsbeginn möglich.', tipp:'Befreiung gilt für die Dauer des Leistungsbezugs — bei Änderung sofort neu beantragen.' }
      ],
      spar_tipp: 'Auch bei WG: Jede Wohnung zahlt nur einen Beitrag (17,50 €) — nicht pro Person! Mit Mitbewohnern teilen wenn möglich.'
    },
    {
      id: 'abos',
      emoji: '📱', name: 'Abos & Streaming prüfen', farbe: '#EC4899', bg: '#FCE7F3',
      ersparnis: '50–200 € / Jahr durch Kündigung ungenutzter Abos',
      beschreibung: 'Durchschnittlich 8–12 laufende Abos pro Haushalt — viele vergessen, keiner kündigt. Ein Abo-Check spart sofort Geld.',
      wann: 'Jederzeit. Die meisten Abos sind monatlich kündbar.',
      portale: [
        { name:'Treefin (Abo-Check)', url:'https://www.treefin.com', emoji:'🌳', info:'Kostenlose App findet alle laufenden Abos auf dem Konto' },
        { name:'Volders (Kündigung)', url:'https://www.volders.de', emoji:'✂️', info:'Kündigt Abos für Sie — kostenlos für einfache Kündigungen' },
        { name:'Netflix günstiger', url:'https://www.netflix.com/de/login', emoji:'🎬', info:'Werbefinanziertes Abo ab 4,99 € — spart 10 € vs. Standard' },
        { name:'Bibliothek statt Streaming', url:'https://www.onleihe.de', emoji:'📚', info:'Onleihe: Ebooks, Hörbücher, Filme gratis mit Bibliotheksausweis' }
      ],
      schritte: [
        { nr:1, titel:'Abo-Check machen', text:'Kontoauszüge der letzten 3 Monate durchschauen. Alle regelmäßigen Abbuchungen notieren — viele Abos sind gut versteckt.', tipp:'Besonders häufig vergessen: App-Store-Abos, Fitnessstudio, Zeitschriften, Lernplattformen.' },
        { nr:2, titel:'Priorisieren', text:'Liste aufteilen in: nutze ich, nutze ich kaum, nutze ich gar nicht. Alles was "kaum" oder "gar nicht" ist: sofort kündigen.' },
        { nr:3, titel:'Kündigen — möglichst alle', text:'Streaming: Netflix, Disney+, Amazon Prime — braucht man alle drei? Günstiger: im Wechsel je 1 Monat nutzen, dann kündigen.' },
        { nr:4, titel:'Familie sharing nutzen', text:'Netflix, Disney+, Spotify: Familien-Plan teilen spart 50 %. Mit Geschwistern, Eltern oder Freunden teilen.' }
      ],
      spar_tipp: 'Faustregel: Wenn Sie ein Abo weniger als 2x pro Woche nutzen — kündigen! 10 €/Monat gespart = 120 €/Jahr.'
    }
  ];

  if (kat) {
    const k = kategorien.find(x => x.id === kat);
    if (!k) return '';
    return `
    <button class="zurueck-btn" onclick="state.vertraegeKat=null;render()">← Zurück zur Übersicht</button>
    <div class="vertrag-detail">
      <div class="vertrag-detail-header" style="background:linear-gradient(135deg,${k.bg},white);border:2px solid ${k.farbe}30">
        <div style="font-size:2.5rem">${k.emoji}</div>
        <div>
          <div style="font-weight:900;font-size:1.25rem;color:${k.farbe}">${esc(k.name)}</div>
          <div class="vertrag-ersparnis-badge" style="background:${k.farbe}">💰 Ersparnis: ${esc(k.ersparnis)}</div>
        </div>
      </div>
      <div class="info-box" style="background:${k.bg};border:1.5px solid ${k.farbe}40;margin-bottom:1.25rem">
        <span class="ib-icon">${k.emoji}</span>
        <div class="ib-text">
          <strong>${esc(k.beschreibung)}</strong><br>
          <span style="font-size:.82rem">🕐 Wann wechseln: ${esc(k.wann)}</span>
        </div>
      </div>

      <div class="block-title">✅ Schritt für Schritt wechseln</div>
      ${k.schritte.map(s=>`
      <div class="schritt">
        <div class="schritt-nr" style="background:${k.farbe}">${s.nr}</div>
        <div class="schritt-body">
          <div class="schritt-title">${esc(s.titel)}</div>
          <div class="schritt-text">${esc(s.text)}</div>
          ${s.tipp?`<div class="schritt-tipp">💡 ${esc(s.tipp)}</div>`:''}
        </div>
      </div>`).join('')}

      <div class="vertrag-spar-tipp" style="border-left-color:${k.farbe}">
        <strong>💡 Profi-Tipp:</strong> ${esc(k.spar_tipp||'')}
      </div>

      <div class="block-title" style="margin-top:1.25rem">🔗 Direkt vergleichen & wechseln</div>
      <div class="grid-2">
        ${k.portale.map(p=>`
        <a href="${p.url}" target="_blank" class="portal-card" style="text-decoration:none;border-left:4px solid ${k.farbe}">
          <div class="portal-header"><span class="portal-emoji">${p.emoji}</span><span class="portal-name">${esc(p.name)}</span></div>
          <p class="portal-desc">${esc(p.info)}</p>
          <span class="btn btn-primary btn-sm" style="background:${k.farbe};border-color:${k.farbe}">Jetzt wechseln →</span>
        </a>`).join('')}
      </div>
    </div>`;
  }

  // Übersicht
  return `
  <div class="info-box lila"><span class="ib-icon">💡</span><div class="ib-text"><strong>Verträge prüfen = sofort Geld sparen.</strong> Durchschnittlich werden hier 500–1.000 € / Jahr eingespart — in wenigen Stunden erledigt.</div></div>
  <div class="vertrag-grid">
    ${kategorien.map(k=>`
    <button class="vertrag-karte" onclick="vertraegeKatWaehlen('${k.id}')" style="--vk-farbe:${k.farbe}">
      <div class="vertrag-karte-top" style="background:${k.bg}">
        <span class="vertrag-emoji">${k.emoji}</span>
        <span class="vertrag-ersparnis" style="color:${k.farbe}">💰 ${esc(k.ersparnis)}</span>
      </div>
      <div class="vertrag-karte-body">
        <div class="vertrag-name">${esc(k.name)}</div>
        <div class="vertrag-desc">${esc(k.beschreibung.split('—')[0].trim())}</div>
        <span class="btn btn-sm vertrag-btn" style="background:${k.farbe};color:white;border:none;width:100%;justify-content:center;margin-top:.75rem">Jetzt prüfen & wechseln →</span>
      </div>
    </button>`).join('')}
  </div>`;
}

function renderSparKleidung() {
  return `
  <div class="info-box gruen"><span class="ib-icon">👕</span><div class="ib-text"><strong>Kinderkleidung muss nicht neu sein!</strong>Kinder wachsen schnell — Secondhand spart 70–90 %.</div></div>
  <div class="grid-2">${SECONDHAND_PORTALE.map(p=>`
    <div class="portal-card"><div class="portal-header"><span class="portal-emoji">${p.emoji}</span><span class="portal-name">${esc(p.name)}</span></div>
    <p class="portal-desc">${esc(p.beschreibung)}</p><div class="portal-tipp">${esc(p.tipp)}</div>
    <a href="${p.url}" target="_blank" class="btn btn-primary btn-sm">Jetzt anschauen →</a></div>`).join('')}</div>`;
}

function tippKatWaehlen(id) { state.tippsKat = id; render(); }

function renderSparTipps() {
  const alle = typeof FAMILIEN_TIPPS_ALLE !== 'undefined' ? FAMILIEN_TIPPS_ALLE : [];
  const aktiv = state.tippsKat || 'alle';
  const gefiltert = aktiv === 'alle' ? alle : alle.filter(k => k.id === aktiv);
  const anzahl = alle.reduce((s,k) => s + k.tipps.length, 0);

  return `
  <div class="info-box blau"><span class="ib-icon">💡</span><div class="ib-text"><strong>${anzahl} Tipps für Alleinerziehende</strong> — Kleine Änderungen, großer Effekt. Realistisch 200–400 € / Monat gespart.</div></div>
  <div class="tipps-filter">
    <button class="tipps-filter-btn ${aktiv==='alle'?'aktiv':''}" onclick="tippKatWaehlen('alle')">Alle</button>
    ${alle.map(k=>`<button class="tipps-filter-btn ${aktiv===k.id?'aktiv':''}" onclick="tippKatWaehlen('${k.id}')">${k.emoji} ${esc(k.kategorie)}</button>`).join('')}
  </div>
  ${gefiltert.map(k=>`
    <div style="margin-bottom:1.5rem">
      <div class="block-title">${k.emoji} ${esc(k.kategorie)}</div>
      <div class="grid-2">${k.tipps.map(t=>`
        <div class="tipp-karte">
          <div class="tipp-karte-titel">✓ ${esc(t.titel)}</div>
          <div class="tipp-karte-text">${esc(t.text)}</div>
        </div>`).join('')}
      </div>
    </div>`).join('')}`;
}

// ===== SUCHE =====
function renderSuche() {
  const q = state.suchQuery;
  // Results update without re-rendering the input (prevents focus loss)
  setTimeout(() => sucheAktualisieren(q), 10);

  return `
  <div class="section-title">🔍 Suche</div>
  <p class="section-sub">Durchsuchen Sie alle Inhalte der FamilienApp</p>
  <div class="suche-eingabe-box">
    <span class="suche-icon-gross">🔍</span>
    <input id="suche-gross" class="suche-gross-input" type="search" placeholder="Wonach suchen Sie? z.B. Wohngeld, Rezepte, Kita..."
      value="${esc(q)}" oninput="state.suchQuery=this.value;sucheAktualisieren(this.value)" autocomplete="off" />
    ${q ? `<button class="btn btn-sm" style="white-space:nowrap" onclick="state.suchQuery='';var i=el('suche-gross');if(i){i.value='';i.focus();}sucheAktualisieren('')">✕ Löschen</button>` : ''}
  </div>
  <div id="suche-ergebnisse"></div>`;
}

function sucheAktualisieren(val) {
  const container = el('suche-ergebnisse');
  if (!container) return;
  const q = (val||'').toLowerCase().trim();

  if (!q) {
    container.innerHTML = `
    <div class="suche-vorschlaege">
      <div style="font-size:.8rem;color:var(--g500);margin-bottom:.5rem;font-weight:600">Beliebte Suchen:</div>
      <div style="display:flex;flex-wrap:wrap;gap:.4rem">
        ${['Wohngeld','Kindergeld','Unterhaltsvorschuss','Kita','Steuerklasse','Rezepte','Spielplatz','Haushaltshilfe','Checkliste Reise'].map(s=>
          `<button class="suche-chip" onclick="state.suchQuery='${s}';var i=el('suche-gross');if(i){i.value='${s}';}sucheAktualisieren('${s}')">${s}</button>`).join('')}
      </div>
    </div>
    <div class="info-box lila"><span class="ib-icon">💡</span><div class="ib-text"><strong>Tipp:</strong> Suchen Sie nach Leistungen, Behörden, Rezepten, Checklisten, Beratungsstellen und mehr.</div></div>`;
    return;
  }

  const ergebnisse = [];

  BUNDESWEITE_LEISTUNGEN.forEach(l => {
    if ((l.name+l.beschreibung+l.behoerde).toLowerCase().includes(q))
      ergebnisse.push({ icon:'💰', titel:l.name, sub:'Zuschuss · '+l.behoerde, betrag:l.betrag, aktion:`zuSektion('leistungen')`, sek:'Zuschüsse' });
  });

  ANTRAEGE.forEach(a => {
    if ((a.name+a.beschreibung+a.behoerde).toLowerCase().includes(q))
      ergebnisse.push({ icon:'📋', titel:a.name, sub:'Formular · '+a.behoerde, betrag:a.betrag, aktion:`antragWaehlen('${a.id}')`, sek:'Formulare' });
  });

  BERATUNGSSTELLEN.forEach(k => k.stellen.forEach(s => {
    if ((s.name+s.beschreibung).toLowerCase().includes(q))
      ergebnisse.push({ icon:'📞', titel:s.name, sub:s.beschreibung, betrag:s.kostenlos?'Kostenlos':'Kostenpflichtig', aktion:`zuSektion('beratung')`, sek:'Beratung' });
  }));

  if (typeof REZEPTE !== 'undefined') REZEPTE.forEach(r => {
    if ((r.name+(r.zutaten||[]).join(' ')+r.zubereitung).toLowerCase().includes(q))
      ergebnisse.push({ icon:'🍳', titel:r.name, sub:r.dauer+' · '+r.kosten, betrag:r.kategorieLabel, aktion:`state.familieTab='rezepte';state.rezeptFilter='${r.kategorie}';zuSektion('familie')`, sek:'Rezepte' });
  });

  WOHNUNGSPORTALE.forEach(p => {
    if ((p.name+p.beschreibung).toLowerCase().includes(q))
      ergebnisse.push({ icon:'🏘️', titel:p.name, sub:p.beschreibung, betrag:'Wohnungsportal', aktion:`zuSektion('wohnung')`, sek:'Wohnung' });
  });

  if (typeof KRANKENKASSE_LEISTUNGEN !== 'undefined') KRANKENKASSE_LEISTUNGEN.forEach(k => {
    if ((k.name+k.beschreibung).toLowerCase().includes(q))
      ergebnisse.push({ icon:'🏥', titel:k.name, sub:k.anspruch, betrag:'Krankenkasse', aktion:`state.extrasTab='krankenkasse';zuSektion('extras')`, sek:'Extras' });
  });

  if (typeof CHECKLISTEN_DATEN !== 'undefined') Object.entries(CHECKLISTEN_DATEN).forEach(([k,cl]) => {
    if (cl.titel.toLowerCase().includes(q) || cl.items.some(i => i.toLowerCase().includes(q)))
      ergebnisse.push({ icon:'✅', titel:cl.titel, sub:cl.items.length+' Punkte', betrag:'Checkliste', aktion:`state.kalenderTab='checklisten';state.checklisteTyp='${k}';zuSektion('kalender')`, sek:'Kalender' });
  });

  container.innerHTML = ergebnisse.length === 0
    ? `<div class="info-box orange"><span class="ib-icon">🔍</span><div class="ib-text"><strong>Keine Ergebnisse für "${esc(val)}"</strong> — Probieren Sie andere Suchbegriffe wie "Wohngeld", "Rezept" oder "Beratung".</div></div>`
    : `<div style="font-size:.85rem;color:var(--g500);margin:.75rem 0"><strong>${ergebnisse.length}</strong> Ergebnisse für "<strong>${esc(val)}</strong>"</div>
      <div class="grid-2">${ergebnisse.map(e=>`
        <div class="card suche-ergebnis-karte" onclick="${e.aktion}" style="cursor:pointer">
          <div style="display:flex;align-items:flex-start;gap:.65rem;margin-bottom:.6rem">
            <span style="font-size:1.5rem;flex-shrink:0">${e.icon}</span>
            <div style="flex:1">
              <div style="font-weight:700;font-size:.9rem;margin-bottom:.1rem">${esc(e.titel)}</div>
              <div style="font-size:.75rem;color:var(--g500);line-height:1.4">${esc(e.sub)}</div>
            </div>
            <span class="betrag-badge">${esc(e.betrag)}</span>
          </div>
          <div style="font-size:.7rem;color:var(--g400);margin-bottom:.5rem">📂 ${e.sek}</div>
          <span class="btn btn-primary btn-sm" style="width:100%;justify-content:center;pointer-events:none">Öffnen →</span>
        </div>`).join('')}
      </div>`;
}

// ===== KALENDER =====
function getTermine() { try { return JSON.parse(localStorage.getItem('familienapp_termine')||'[]'); } catch { return []; } }
function saveTermine(t) { localStorage.setItem('familienapp_termine', JSON.stringify(t)); }

function kalenderTabWaehlen(tab) { state.kalenderTab = tab; render(); }
function kalenderMonatAendern(delta) {
  const m = new Date(state.kalenderMonat);
  m.setMonth(m.getMonth() + delta);
  state.kalenderMonat = m;
  render();
}

function terminSpeichern() {
  const titel = el('t-titel')?.value.trim();
  const datum = el('t-datum')?.value;
  if (!titel || !datum) { alert('Bitte Titel und Datum eingeben.'); return; }
  const termine = getTermine();
  termine.push({
    id: Date.now(),
    titel,
    datum,
    uhrzeit: el('t-uhrzeit')?.value || '',
    typ: el('t-typ')?.value || 'sonstiges',
    notiz: el('t-notiz')?.value.trim() || ''
  });
  saveTermine(termine);
  state.terminAddOffen = false;
  render();
}

function terminLoeschen(id) {
  if (!confirm('Termin löschen?')) return;
  saveTermine(getTermine().filter(t => t.id !== id));
  render();
}

const TERMIN_TYPEN = {
  arzt:      { icon:'🏥', farbe:'#DC2626', label:'Arzttermin' },
  behoerde:  { icon:'🏛️', farbe:'#2563EB', label:'Behörde' },
  schule:    { icon:'🎒', farbe:'#D97706', label:'Schule/Kita' },
  sport:     { icon:'⚽', farbe:'#059669', label:'Sport' },
  freizeit:  { icon:'🎉', farbe:'#7C3AED', label:'Freizeit' },
  sonstiges: { icon:'📅', farbe:'#64748B', label:'Sonstiges' }
};

function renderKalender() {
  const tabs = [{id:'termine',label:'🗓️ Termine'},{id:'checklisten',label:'✅ Checklisten'}];
  let inhalt = state.kalenderTab === 'checklisten' ? renderChecklistenInhalt() : renderTermineInhalt();
  return `
  <div class="section-title">🗓️ Kalender & Checklisten</div>
  <p class="section-sub">Termine planen und Checklisten für Reise, Einschulung und Kita</p>
  <div class="antrag-tabs" style="margin-bottom:1.25rem">
    ${tabs.map(t=>`<button class="antrag-tab ${state.kalenderTab===t.id?'aktiv':''}" onclick="kalenderTabWaehlen('${t.id}')">${t.label}</button>`).join('')}
  </div>
  ${inhalt}`;
}

function renderTermineInhalt() {
  const monat = state.kalenderMonat;
  const jahr = monat.getFullYear();
  const mon = monat.getMonth();
  const heute = new Date();
  const termine = getTermine();
  const monatsName = monat.toLocaleDateString('de-DE', {month:'long', year:'numeric'});
  const ersterWochentag = (new Date(jahr, mon, 1).getDay() + 6) % 7;
  const letzterTag = new Date(jahr, mon + 1, 0).getDate();
  let zellen = Array(ersterWochentag).fill(null);
  for (let d = 1; d <= letzterTag; d++) zellen.push(d);

  const grid = `
  <div class="kal-wrapper">
    <div class="kal-header">
      <button class="kal-nav-btn" onclick="kalenderMonatAendern(-1)">‹</button>
      <div class="kal-monat">${monatsName}</div>
      <button class="kal-nav-btn" onclick="kalenderMonatAendern(1)">›</button>
    </div>
    <div class="kal-grid">
      ${['Mo','Di','Mi','Do','Fr','Sa','So'].map(w=>`<div class="kal-kopf">${w}</div>`).join('')}
      ${zellen.map(d => {
        if (!d) return `<div class="kal-leer"></div>`;
        const ds = `${jahr}-${String(mon+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const tt = termine.filter(t => t.datum === ds);
        const isHeute = heute.getFullYear()===jahr && heute.getMonth()===mon && heute.getDate()===d;
        return `<div class="kal-tag${isHeute?' heute':''}${tt.length?' hat-termine':''}" onclick="state.terminAddOffen=true;el('t-datum-pre')&&(el('t-datum-pre').value='${ds}');render()">
          <div class="kal-tag-nr">${d}</div>
          ${tt.slice(0,2).map(t=>`<div class="kal-punkt" style="background:${TERMIN_TYPEN[t.typ]?.farbe||'#64748B'}">${TERMIN_TYPEN[t.typ]?.icon||'📅'}</div>`).join('')}
          ${tt.length > 2 ? `<div class="kal-mehr">+${tt.length-2}</div>` : ''}
        </div>`;
      }).join('')}
    </div>
  </div>`;

  const heute0 = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate());
  const kommend = termine
    .filter(t => new Date(t.datum) >= heute0)
    .sort((a,b) => a.datum.localeCompare(b.datum))
    .slice(0, 10);

  const addForm = state.terminAddOffen ? `
  <div class="kal-add-box">
    <div style="font-weight:700;margin-bottom:.75rem;font-size:.95rem">➕ Neuen Termin eintragen</div>
    <div class="kal-form-grid">
      <input id="t-titel" class="reg-input" style="font-size:.88rem;padding:.5rem .75rem" type="text" placeholder="Titel, z.B. Arzttermin" />
      <select id="t-typ" class="reg-select" style="font-size:.88rem;padding:.5rem .75rem">
        ${Object.entries(TERMIN_TYPEN).map(([k,v])=>`<option value="${k}">${v.icon} ${v.label}</option>`).join('')}
      </select>
      <input id="t-datum" id="t-datum-pre" class="reg-input" style="font-size:.88rem;padding:.5rem .75rem" type="date" value="${heute.toISOString().split('T')[0]}" />
      <input id="t-uhrzeit" class="reg-input" style="font-size:.88rem;padding:.5rem .75rem" type="time" value="09:00" />
    </div>
    <input id="t-notiz" class="reg-input" style="font-size:.88rem;padding:.5rem .75rem;margin:.5rem 0" type="text" placeholder="Notiz (optional)" />
    <div style="display:flex;gap:.5rem">
      <button class="btn btn-primary" onclick="terminSpeichern()">✓ Speichern</button>
      <button class="btn btn-outline" onclick="state.terminAddOffen=false;render()">Abbrechen</button>
    </div>
  </div>` : '';

  return `
  ${grid}
  <div style="display:flex;align-items:center;justify-content:space-between;margin:1.25rem 0 .75rem">
    <div class="block-title" style="margin:0">📋 Kommende Termine</div>
    ${!state.terminAddOffen ? `<button class="btn btn-primary btn-sm" onclick="state.terminAddOffen=true;render()">➕ Termin hinzufügen</button>` : ''}
  </div>
  ${addForm}
  ${kommend.length === 0 && !state.terminAddOffen
    ? `<div class="info-box lila"><span class="ib-icon">🗓️</span><div class="ib-text"><strong>Noch keine Termine</strong>Klicken Sie auf einen Tag im Kalender oder den Button oben um einen Termin einzutragen.</div></div>`
    : kommend.map(t => {
        const tt = TERMIN_TYPEN[t.typ] || TERMIN_TYPEN.sonstiges;
        const datumText = new Date(t.datum+'T00:00:00').toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'short',year:'2-digit'});
        return `<div class="termin-item">
          <div class="termin-typ-icon" style="background:${tt.farbe}20;color:${tt.farbe}">${tt.icon}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:.9rem">${esc(t.titel)}</div>
            <div style="font-size:.78rem;color:var(--g500)">${datumText}${t.uhrzeit?' · '+t.uhrzeit+' Uhr':''}</div>
            ${t.notiz?`<div style="font-size:.75rem;color:var(--g700);margin-top:.1rem;font-style:italic">${esc(t.notiz)}</div>`:''}
          </div>
          <button class="liste-del" onclick="terminLoeschen(${t.id})" title="Termin löschen">✕</button>
        </div>`;
      }).join('')}`;
}

// ===== CHECKLISTEN =====
function getChecklistState(typ) { try { return JSON.parse(localStorage.getItem('checklist_'+typ)||'{}'); } catch { return {}; } }
function saveChecklistState(typ, s) { localStorage.setItem('checklist_'+typ, JSON.stringify(s)); }

function checklisteTypWaehlen(typ) { state.checklisteTyp = typ; render(); }

function checklisteToggle(typ, idx) {
  const s = getChecklistState(typ);
  s[idx] = !s[idx];
  saveChecklistState(typ, s);
  const container = el('checklist-items');
  if (container) container.innerHTML = renderChecklistItems(typ);
}

function checklisteReset(typ) {
  if (!confirm('Checkliste zurücksetzen?')) return;
  localStorage.removeItem('checklist_'+typ);
  render();
}

function renderChecklistItems(typ) {
  const cl = CHECKLISTEN_DATEN[typ];
  if (!cl) return '';
  const s = getChecklistState(typ);
  const erledigt = Object.values(s).filter(Boolean).length;
  return cl.items.map((item, idx) => `
    <div class="cl-item ${s[idx]?'erledigt':''}" onclick="checklisteToggle('${typ}',${idx})">
      <div class="cl-check" style="border-color:${s[idx]?cl.farbe:'var(--g300)'};background:${s[idx]?cl.farbe:'transparent'}">
        ${s[idx]?'✓':''}
      </div>
      <div class="cl-text">${esc(item)}</div>
    </div>`).join('') +
    `<div style="font-size:.82rem;color:var(--g500);margin-top:.75rem;text-align:center">${erledigt} / ${cl.items.length} erledigt</div>`;
}

function renderChecklistenInhalt() {
  const typen = Object.entries(CHECKLISTEN_DATEN);
  return `
  <div class="cl-tabs">
    ${typen.map(([k,cl]) => {
      const s = getChecklistState(k);
      const erledigt = Object.values(s).filter(Boolean).length;
      return `<button class="cl-tab-btn ${state.checklisteTyp===k?'aktiv':''}" style="${state.checklisteTyp===k?`background:${cl.farbe};border-color:${cl.farbe};color:white`:''}" onclick="checklisteTypWaehlen('${k}')">
        ${cl.titel.split(' ')[0]} ${cl.titel.split(' ').slice(1).join(' ')}
        <span class="cl-progress-badge" style="${state.checklisteTyp===k?'background:rgba(255,255,255,.3)':'background:'+cl.farbe+'20;color:'+cl.farbe}">${erledigt}/${cl.items.length}</span>
      </button>`;
    }).join('')}
  </div>
  ${typen.map(([k,cl]) => {
    if (k !== state.checklisteTyp) return '';
    const s = getChecklistState(k);
    const erledigt = Object.values(s).filter(Boolean).length;
    const prozent = cl.items.length ? Math.round(erledigt/cl.items.length*100) : 0;
    return `
    <div class="cl-header" style="background:${cl.bg};border-color:${cl.farbe}40">
      <div style="font-weight:800;font-size:1rem;color:${cl.farbe}">${cl.titel}</div>
      <div class="cl-fortschritt-bar"><div class="cl-fortschritt-fill" style="width:${prozent}%;background:${cl.farbe}"></div></div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:.4rem">
        <div style="font-size:.82rem;color:var(--g700)">${erledigt} von ${cl.items.length} erledigt (${prozent}%)</div>
        <button class="btn btn-sm btn-outline" style="font-size:.72rem;color:var(--g500)" onclick="checklisteReset('${k}')">↺ Zurücksetzen</button>
      </div>
    </div>
    <div id="checklist-items">${renderChecklistItems(k)}</div>`;
  }).join('')}`;
}

// ===== FAMILIE =====
function familieTabWaehlen(tab) { state.familieTab = tab; render(); }

function renderFamilie() {
  const tabs = [
    {id:'ausfluege', label:'🗺️ Ausflüge & Freizeit'},
    {id:'rezepte',   label:'🍳 Rezepte'},
    {id:'catering',  label:'🎉 Catering'}
  ];
  let inhalt = '';
  if (state.familieTab === 'rezepte') inhalt = renderRezepte();
  else if (state.familieTab === 'catering') inhalt = renderCatering();
  else inhalt = renderAusfluege();
  return `
  <div class="section-title">👨‍👩‍👧 Familie & Freizeit</div>
  <p class="section-sub">Ausflugsziele, günstige Rezepte und Catering für Familienfeiern</p>
  <div class="antrag-tabs" style="margin-bottom:1.25rem">
    ${tabs.map(t=>`<button class="antrag-tab ${state.familieTab===t.id?'aktiv':''}" onclick="familieTabWaehlen('${t.id}')">${t.label}</button>`).join('')}
  </div>
  ${inhalt}`;
}

function renderAusfluege() {
  const ausflugKats = [
    { id:'spielplatz', label:'Spielplätze', emoji:'🎠', farbe:'#059669', bg:'#D1FAE5', text:'Spielplätze in Ihrer Nähe auf der Karte' },
    { id:'park',       label:'Parks & Natur', emoji:'🌳', farbe:'#16A34A', bg:'#DCFCE7', text:'Parks, Grünanlagen und Naturreservate' },
    { id:'museum',     label:'Museen & Zoos', emoji:'🏛️', farbe:'#9333EA', bg:'#F3E8FF', text:'Museen, Zoos, Attraktionen in der Nähe' },
    { id:'freibad',    label:'Schwimmbäder', emoji:'🏊', farbe:'#0EA5E9', bg:'#E0F2FE', text:'Freibäder und Freizeitbäder finden' },
    { id:'minigolf',   label:'Minigolf', emoji:'⛳', farbe:'#EA580C', bg:'#FFEDD5', text:'Minigolf-Anlagen in der Nähe' },
    { id:'bowling',    label:'Bowling', emoji:'🎳', farbe:'#7C3AED', bg:'#EDE9FE', text:'Bowling-Center in der Umgebung' },
    { id:'kino',       label:'Kino', emoji:'🎬', farbe:'#BE185D', bg:'#FCE7F3', text:'Kinos für Familienfilme finden' },
    { id:'klettern',   label:'Klettern', emoji:'🧗', farbe:'#B45309', bg:'#FEF3C7', text:'Kletterparks und Kletterhallen' }
  ];
  return `
  <div class="info-box gruen"><span class="ib-icon">🎠</span><div class="ib-text"><strong>Viele Ausflüge sind kostenlos!</strong>Parks, Spielplätze, Museen an freien Tagen — Familienspaß für wenig Geld.</div></div>
  <div class="block-title">📍 In Ihrer Nähe finden</div>
  <p style="font-size:.85rem;color:var(--g500);margin-bottom:.75rem">Klicken Sie auf eine Kategorie um die Live-Karte zu öffnen</p>
  <div class="grid-2">${ausflugKats.map(k=>`
    <button class="schnell-karte" style="--farbe:${k.farbe}" onclick="umgebungKatWaehlen('${k.id}');zuSektion('umgebung')">
      <div class="schnell-icon-box" style="background:${k.bg};font-size:1.8rem">${k.emoji}</div>
      <div class="schnell-titel">${k.label}</div>
      <div class="schnell-sub">${k.text}</div>
      <span class="schnell-badge">Karte öffnen →</span>
    </button>`).join('')}
  </div>
  <div class="block-title">💡 Ausflugstipps für Familien</div>
  <div class="grid-2">${FAMILIEN_AUSFLUG_TIPPS.map(t=>`
    <div class="card" style="border-left:4px solid ${t.farbe}">
      <div style="font-size:1.5rem;margin-bottom:.35rem">${t.emoji}</div>
      <div style="font-weight:700;font-size:.9rem;margin-bottom:.25rem">${esc(t.titel)}</div>
      <div style="font-size:.82rem;color:var(--g700);line-height:1.5;margin-bottom:.6rem">${esc(t.text)}</div>
      ${t.url ? `<a href="${t.url}" target="_blank" class="btn btn-outline btn-sm">Mehr erfahren →</a>` : ''}
    </div>`).join('')}
  </div>`;
}

// TheMealDB Kategorien (deutsch beschriftet)
const MEAL_KATEGORIEN = [
  ['Chicken','🐔 Hühnchen'],['Beef','🥩 Rindfleisch'],['Vegetarian','🥦 Vegetarisch'],
  ['Pasta','🍝 Pasta'],['Seafood','🐟 Fisch & Meer'],['Dessert','🍰 Desserts'],
  ['Breakfast','🥞 Frühstück'],['Pork','🥓 Schwein'],['Lamb','🐑 Lamm'],
  ['Side','🥗 Beilagen'],['Starter','🥙 Vorspeisen'],['Vegan','🌱 Vegan'],
  ['Miscellaneous','🍲 Sonstiges'],['Goat','🐐 Ziege']
];

function rezeptTabWaehlen(tab) {
  state.rezeptTab = tab;
  if (tab === 'api' || tab === 'gesund') {
    const kat = tab === 'gesund'
      ? (['Vegetarian','Vegan','Starter'].includes(state.rezeptKatAPI) ? state.rezeptKatAPI : 'Vegetarian')
      : state.rezeptKatAPI;
    state.rezeptApiMeals = [];
    render();
    setTimeout(() => ladeRezepteKategorie(kat), 50);
  } else {
    render();
  }
}

function rezeptKatWaehlen(kat) {
  state.rezeptKatAPI = kat;
  state.rezeptApiMeals = [];
  const c = el('rezept-api-container');
  if (c) c.innerHTML = '<div class="rezept-laden">⏳ Rezepte werden geladen…</div>';
  ladeRezepteKategorie(kat);
}

async function ladeRezepteKategorie(kat) {
  state.rezeptApiLaden = true;
  state.rezeptKatAPI = kat;
  const c = el('rezept-api-container');
  if (c) c.innerHTML = '<div class="rezept-laden">⏳ Rezepte werden geladen…</div>';
  try {
    const r = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(kat)}`);
    const d = await r.json();
    state.rezeptApiMeals = d.meals || [];
  } catch(e) {
    state.rezeptApiMeals = [];
  }
  state.rezeptApiLaden = false;
  renderRezeptApiInhalt('rezept-api-container');
}

function renderRezeptApiInhalt(containerId) {
  const c = el(containerId);
  if (!c) return;
  if (state.rezeptApiLaden) { c.innerHTML = '<div class="rezept-laden">⏳ Laden…</div>'; return; }
  if (!state.rezeptApiMeals.length) {
    c.innerHTML = '<div class="info-box orange"><span class="ib-icon">⚠️</span><div class="ib-text">Keine Rezepte gefunden oder keine Internetverbindung. Bitte andere Kategorie wählen.</div></div>';
    return;
  }
  c.innerHTML = `
    <div style="font-size:.82rem;color:#6B7280;margin-bottom:.75rem"><strong>${state.rezeptApiMeals.length}</strong> Rezepte gefunden</div>
    <div class="rezept-api-grid">${state.rezeptApiMeals.map(m=>`
      <div class="rezept-api-karte">
        <div class="rezept-api-img-wrap">
          <img src="${m.strMealThumb}/preview" alt="${esc(m.strMeal)}" loading="lazy"
            onerror="this.parentElement.innerHTML='<div class=\\'rezept-api-no-img\\'>🍽️</div>'" />
        </div>
        <div class="rezept-api-body">
          <div class="rezept-api-name">${esc(m.strMeal)}</div>
          <a href="https://www.themealdb.com/meal/${m.idMeal}" target="_blank" class="btn btn-primary btn-sm" style="margin-top:.5rem;display:block;text-align:center">📖 Rezept ansehen →</a>
        </div>
      </div>`).join('')}
    </div>`;
}

async function ladeRezepteSuche(query) {
  if (!query.trim()) { renderRezeptSucheInhalt([],''); return; }
  const c = el('rezept-suche-container');
  if (c) c.innerHTML = '<div class="rezept-laden">⏳ Suche läuft…</div>';
  try {
    const r = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
    const d = await r.json();
    renderRezeptSucheInhalt(d.meals || [], query);
  } catch(e) {
    renderRezeptSucheInhalt([], query);
  }
}

function renderRezeptSucheInhalt(meals, query) {
  const c = el('rezept-suche-container');
  if (!c) return;
  if (!meals.length) {
    c.innerHTML = `<div class="info-box orange"><span class="ib-icon">🔍</span><div class="ib-text">${query ? `Kein Rezept gefunden für "<strong>${esc(query)}</strong>". Suchen Sie auf Englisch, z.B. "chicken", "pasta", "soup", "rice".` : 'Suchbegriff eingeben und Enter drücken.'}</div></div>`;
    return;
  }
  c.innerHTML = `
    <div style="font-size:.82rem;color:#6B7280;margin-bottom:.75rem"><strong>${meals.length}</strong> Rezepte gefunden für "<strong>${esc(query)}</strong>"</div>
    <div class="rezept-api-grid">${meals.map(m=>`
      <div class="rezept-api-karte">
        <div class="rezept-api-img-wrap">
          <img src="${m.strMealThumb}/preview" alt="${esc(m.strMeal)}" loading="lazy"
            onerror="this.parentElement.innerHTML='<div class=\\'rezept-api-no-img\\'>🍽️</div>'" />
        </div>
        <div class="rezept-api-body">
          <div class="rezept-api-name">${esc(m.strMeal)}</div>
          ${m.strCategory?`<div style="font-size:.72rem;color:#6B7280;margin:.2rem 0">${esc(m.strCategory)} · ${esc(m.strArea||'')}</div>`:''}
          <a href="https://www.themealdb.com/meal/${m.idMeal}" target="_blank" class="btn btn-primary btn-sm" style="margin-top:.5rem;display:block;text-align:center">📖 Rezept ansehen →</a>
        </div>
      </div>`).join('')}
    </div>`;
}

function renderRezepte() {
  const tabs = [
    {id:'lokal',  label:'🇩🇪 Deutsche Rezepte'},
    {id:'api',    label:'🌍 International (300+)'},
    {id:'gesund', label:'🥦 Gesund & Vegan'},
    {id:'suche',  label:'🔍 Rezept suchen'}
  ];
  const tabNav = `<div class="antrag-tabs" style="margin-bottom:1rem">
    ${tabs.map(t=>`<button class="antrag-tab ${state.rezeptTab===t.id?'aktiv':''}" onclick="rezeptTabWaehlen('${t.id}')">${t.label}</button>`).join('')}
  </div>`;

  if (state.rezeptTab === 'lokal') {
    const filter = state.rezeptFilter;
    const filterOpt = [['alle','🍽️ Alle'],['schnell','⚡ Schnell'],['guenstig','💰 Günstig'],['kinder','👧 Kinder'],['resteessen','♻️ Reste']];
    const gefiltert = filter === 'alle' ? REZEPTE : REZEPTE.filter(r => r.kategorie === filter);
    return tabNav + `
    <div class="info-box orange"><span class="ib-icon">🍳</span><div class="ib-text"><strong>Günstig & lecker kochen!</strong> Alle Rezepte für unter 2 € pro Person — familienfreundlich und schnell zubereitet.</div></div>
    <div class="filter-tabs">${filterOpt.map(([v,l])=>`<button class="filter-tab ${filter===v?'aktiv':''}" onclick="state.rezeptFilter='${v}';render()">${l}</button>`).join('')}</div>
    <div class="grid-2">${gefiltert.map(r=>`
      <div class="rezept-karte">
        <div class="rezept-emoji">${r.emoji}</div>
        <div class="rezept-body">
          <div style="font-weight:700;font-size:.95rem;margin-bottom:.3rem">${esc(r.name)}</div>
          <div class="rezept-meta"><span>⏱️ ${r.dauer}</span><span>💰 ${r.kosten}/P.</span><span>🍽️ ${r.portionen} Port.</span></div>
          <div class="rezept-zutaten-titel">Zutaten:</div>
          <ul class="rezept-zutaten">${r.zutaten.map(z=>`<li>${esc(z)}</li>`).join('')}</ul>
          <div class="rezept-zubereitung">${esc(r.zubereitung)}</div>
          ${r.tipp?`<div class="rezept-tipp">💡 ${esc(r.tipp)}</div>`:''}
        </div>
      </div>`).join('')}
    </div>`;
  }

  if (state.rezeptTab === 'api') {
    const kat = state.rezeptKatAPI || 'Chicken';
    const html = tabNav + `
    <div class="info-box blau"><span class="ib-icon">🌍</span><div class="ib-text"><strong>Über 300 internationale Rezepte mit echten Fotos!</strong> Kategorie auswählen, Rezept anklicken — vollständige Zutaten & Anleitung auf TheMealDB.com (kostenlos, keine Anmeldung).</div></div>
    <div class="filter-tabs" style="flex-wrap:wrap;margin-bottom:.75rem">
      ${MEAL_KATEGORIEN.map(([v,l])=>`<button class="filter-tab ${kat===v?'aktiv':''}" onclick="rezeptKatWaehlen('${v}')">${l}</button>`).join('')}
    </div>
    <div id="rezept-api-container"><div class="rezept-laden">⏳ Rezepte werden geladen…</div></div>`;
    setTimeout(() => ladeRezepteKategorie(kat), 50);
    return html;
  }

  if (state.rezeptTab === 'gesund') {
    const gesundKats = [['Vegetarian','🥦 Vegetarisch'],['Vegan','🌱 Vegan'],['Starter','🥗 Vorspeisen']];
    const kat = ['Vegetarian','Vegan','Starter'].includes(state.rezeptKatAPI) ? state.rezeptKatAPI : 'Vegetarian';
    const html = tabNav + `
    <div class="info-box gruen"><span class="ib-icon">🥦</span><div class="ib-text"><strong>Gesund kochen für die Familie!</strong> Vegetarische und vegane Rezepte mit echten Fotos — preiswert, lecker und kinderfreundlich.</div></div>
    <div class="filter-tabs" style="margin-bottom:.75rem">
      ${gesundKats.map(([v,l])=>`<button class="filter-tab ${kat===v?'aktiv':''}" onclick="rezeptKatWaehlen('${v}')">${l}</button>`).join('')}
    </div>
    <div id="rezept-api-container"><div class="rezept-laden">⏳ Rezepte werden geladen…</div></div>`;
    setTimeout(() => ladeRezepteKategorie(kat), 50);
    return html;
  }

  // Tab: Suche
  const html = tabNav + `
  <div class="info-box lila"><span class="ib-icon">🔍</span><div class="ib-text"><strong>Rezept suchen</strong> — Tipp: Auf Englisch suchen für mehr Ergebnisse (z.B. "chicken", "pasta", "soup", "rice", "cake").</div></div>
  <div class="suche-eingabe-box" style="margin-bottom:1rem">
    <span class="suche-icon-gross">🔍</span>
    <input id="rezept-suche-input" class="suche-gross-input" type="search"
      placeholder="z.B. chicken, pasta, soup, cake…"
      value="${esc(state.rezeptSucheAPI)}"
      oninput="state.rezeptSucheAPI=this.value"
      onkeydown="if(event.key==='Enter')ladeRezepteSuche(this.value)" autocomplete="off" />
    <button class="btn btn-primary" onclick="ladeRezepteSuche(el('rezept-suche-input')?.value||'')">Suchen</button>
  </div>
  <div id="rezept-suche-container"><div style="text-align:center;padding:2rem;color:#6B7280;font-size:.9rem">👆 Suchbegriff eingeben und Enter drücken</div></div>`;
  if (state.rezeptSucheAPI) setTimeout(() => ladeRezepteSuche(state.rezeptSucheAPI), 50);
  return html;
}

function renderCatering() {
  return `
  <div class="info-box lila"><span class="ib-icon">🎉</span><div class="ib-text"><strong>Catering für Ihre Familienfeier!</strong>Geburtstag, Einschulung, Kommunion — von günstig bis professionell. Frühzeitig buchen spart 20–30%!</div></div>
  <div class="block-title">🔗 Catering-Portale & Anbieter</div>
  <div class="grid-2">${CATERING_PORTALE.map(p=>`
    <div class="portal-card" style="border-left:4px solid #7C3AED">
      <div class="portal-header"><span class="portal-emoji">${p.emoji}</span><span class="portal-name">${esc(p.name)}</span></div>
      <p class="portal-desc">${esc(p.beschreibung)}</p>
      <div class="portal-tipp">${esc(p.tipp)}</div>
      <a href="${p.url}" target="_blank" class="btn btn-primary btn-sm">Jetzt anfragen →</a>
    </div>`).join('')}
  </div>
  <div class="block-title">💡 Tipps für die Familienfeier</div>
  <div class="grid-2">
    ${[
      ['💰','Budget-Tipp: Selbst kochen','Für 20 Personen: Nudelsalat + Grillgut + Kuchen selbst gemacht kostet ca. 80–120 € statt 300 € beim Caterer.','#059669'],
      ['📋','Früh planen spart Geld','Mind. 3 Wochen vorher buchen. Spontan-Catering kostet 20–40% mehr!','#2563EB'],
      ['🛒','Supermarkt-Partyplatten','REWE, EDEKA und Real bieten günstige Partyplatten ab 15 € — ideal für Kindergeburtstage.','#D97706'],
      ['🎂','Kuchen selbst backen','Geburtstagstorte selbst backen: ~8 € statt 40–60 € beim Bäcker. Kinder helfen gern!','#EC4899']
    ].map(([e,t,tx,f])=>`
    <div class="card" style="border-left:4px solid ${f}">
      <div style="font-size:1.3rem;margin-bottom:.3rem">${e}</div>
      <div style="font-weight:700;font-size:.9rem;margin-bottom:.25rem">${t}</div>
      <div style="font-size:.82rem;color:var(--g700);line-height:1.5">${esc(tx)}</div>
    </div>`).join('')}
  </div>`;
}

// ===== BUDGETRECHNER =====
const BUDGET_KEY = 'familienapp_budget';
function getBudget() { try { return JSON.parse(localStorage.getItem(BUDGET_KEY)) || {}; } catch { return {}; } }
function saveBudget(b) { localStorage.setItem(BUDGET_KEY, JSON.stringify(b)); }

function budgetSpeichern() {
  const felder = ['lohn','kindergeld','unterhalt','wohngeld','kiz','buergergeld','einnahmen_sonstige',
    'miete','strom','internet','lebensmittel','kita','transport','kleidung','schule','versicherungen','ausgaben_sonstige'];
  const b = {};
  felder.forEach(f => {
    const el2 = document.getElementById('budget-' + f);
    b[f] = el2 ? (parseFloat(el2.value.replace(',','.')) || 0) : 0;
  });
  saveBudget(b);
  render();
}

function autoKindergeld() {
  const user = getUser() || {};
  const anzahl = (user.kinder || []).length;
  const inp = document.getElementById('budget-kindergeld');
  if (inp && anzahl > 0) { inp.value = (255 * anzahl).toFixed(0); }
}

function renderBudgetrechner() {
  const b = getBudget();
  const einnahmen = ['lohn','kindergeld','unterhalt','wohngeld','kiz','buergergeld','einnahmen_sonstige'];
  const ausgaben  = ['miete','strom','internet','lebensmittel','kita','transport','kleidung','schule','versicherungen','ausgaben_sonstige'];
  const sumE = einnahmen.reduce((s,k) => s+(b[k]||0), 0);
  const sumA = ausgaben.reduce((s,k) => s+(b[k]||0), 0);
  const bilanz = sumE - sumA;
  const ampel = bilanz >= 200 ? 'gruen' : bilanz >= -100 ? 'gelb' : 'rot';
  const ampelText = bilanz >= 200 ? 'Gut — Sie haben Spielraum zum Sparen!' : bilanz >= -100 ? 'Knapp — Ausgaben prüfen und optimieren' : 'Kritisch — sofort Einsparpotenzial suchen';

  const tippsNachLage = bilanz >= 200
    ? ['Rücklage aufbauen: 50–100 € / Monat zur Seite legen', 'Rentenvorsorge: Riester-Rente für Alleinerziehende prüfen', 'Bildungssparen für Kinder starten (Junior-Depot)']
    : bilanz >= -100
    ? ['Strom-Anbieter wechseln (Verivox) — spart 200–400 € / Jahr', 'Lebensmittel: Wochenplan + Eigenmarken — spart 50–80 € / Monat', 'Alle Sozialleistungen prüfen: KiZ, Wohngeld, BuT beantragen']
    : ['Sofort: Jobcenter kontaktieren — Bürgergeld oder Aufstockung möglich', 'Tafel nutzen für günstige Lebensmittel (tafel.de)', 'Schuldnerberatung kostenlos: AWO, Caritas, Diakonie kontaktieren', 'Energieschulden: Stadtwerk direkt anrufen — Ratenzahlung meist möglich'];

  function feld(id, label, placeholder, val, hint) {
    return `<div class="budget-feld">
      <label class="budget-label">${label}</label>
      <div class="budget-inp-wrap">
        <input id="budget-${id}" class="budget-inp" type="number" min="0" step="10" placeholder="${placeholder}" value="${val||''}" />
        <span class="budget-einheit">€</span>
      </div>
      ${hint ? `<div class="budget-hint">${hint}</div>` : ''}
    </div>`;
  }

  const user = getUser() || {};
  const kinderAnzahl = (user.kinder || []).length;
  const kgAuto = kinderAnzahl > 0 ? `${255 * kinderAnzahl} € (${kinderAnzahl} ${kinderAnzahl===1?'Kind':'Kinder'} × 255 €)` : '';

  return `
  <div class="budget-wrapper">
    <div class="info-box gruen" style="margin-bottom:1.5rem"><span class="ib-icon">💶</span><div class="ib-text"><strong>Ihr persönlicher Haushaltsrechner</strong> — Alle Felder ausfüllen, Bilanz sofort sehen. Wird nur auf Ihrem Gerät gespeichert.</div></div>

    <div class="budget-grid">
      <!-- EINNAHMEN -->
      <div class="budget-seite">
        <div class="budget-seite-titel einnahmen-titel">💚 Einnahmen pro Monat</div>
        ${feld('lohn',           '💼 Lohn / Gehalt (netto)',      '1500', b.lohn)}
        ${feld('kindergeld',     '👶 Kindergeld',                  kgAuto||'255', b.kindergeld, kinderAnzahl>0?`<button type="button" class="budget-auto-btn" onclick="autoKindergeld()">↺ Auto-berechnen (${kinderAnzahl} ${kinderAnzahl===1?'Kind':'Kinder'})</button>`:'')}
        ${feld('unterhalt',      '⚖️ Unterhalt / Unterhaltsvorschuss','0', b.unterhalt)}
        ${feld('wohngeld',       '🏠 Wohngeld',                   '0', b.wohngeld)}
        ${feld('kiz',            '👨‍👧 Kinderzuschlag (KiZ)',         '0', b.kiz)}
        ${feld('buergergeld',    '🏛️ Bürgergeld / Aufstockung',   '0', b.buergergeld)}
        ${feld('einnahmen_sonstige','➕ Sonstiges',                '0', b.einnahmen_sonstige)}
        <div class="budget-summe einnahmen-summe">Gesamt: ${sumE.toLocaleString('de-DE')} €</div>
      </div>

      <!-- AUSGABEN -->
      <div class="budget-seite">
        <div class="budget-seite-titel ausgaben-titel">❤️ Ausgaben pro Monat</div>
        ${feld('miete',          '🏠 Miete (warm, inkl. NK)',      '800', b.miete)}
        ${feld('strom',          '⚡ Strom / Gas',                  '80',  b.strom)}
        ${feld('internet',       '📶 Internet / Handy',            '40',  b.internet)}
        ${feld('lebensmittel',   '🛒 Lebensmittel',               '300', b.lebensmittel)}
        ${feld('kita',           '🎓 Kita / Hort / Tagespflege',   '0',  b.kita)}
        ${feld('transport',      '🚌 ÖPNV / Auto / Sprit',        '80',  b.transport)}
        ${feld('kleidung',       '👕 Kleidung',                    '50',  b.kleidung)}
        ${feld('schule',         '📚 Schule / Kinder-Aktivitäten', '30',  b.schule)}
        ${feld('versicherungen', '🛡️ Versicherungen',              '50',  b.versicherungen)}
        ${feld('ausgaben_sonstige','➕ Sonstiges',                 '50',  b.ausgaben_sonstige)}
        <div class="budget-summe ausgaben-summe">Gesamt: ${sumA.toLocaleString('de-DE')} €</div>
      </div>
    </div>

    <button class="btn btn-primary budget-speichern-btn" onclick="budgetSpeichern()">💾 Berechnen & Speichern</button>

    <!-- AMPEL -->
    ${sumE > 0 || sumA > 0 ? `
    <div class="budget-ampel-box ampel-${ampel}">
      <div class="budget-ampel-kreis ampel-kreis-${ampel}">
        ${ampel==='gruen'?'😊':ampel==='gelb'?'😐':'😟'}
      </div>
      <div class="budget-ampel-text">
        <div class="budget-bilanz-betrag">${bilanz>=0?'+':''}${bilanz.toLocaleString('de-DE')} € / Monat</div>
        <div class="budget-ampel-status">${ampelText}</div>
      </div>
    </div>
    <div class="block-title" style="margin-top:1.25rem">💡 Persönliche Empfehlungen</div>
    <div class="grid-1">
      ${tippsNachLage.map(t=>`<div class="tipp-karte" style="border-left-color:${ampel==='gruen'?'var(--gruen)':ampel==='gelb'?'var(--orange)':'var(--rot)'}"><div class="tipp-karte-text">→ ${esc(t)}</div></div>`).join('')}
    </div>` : ''}
  </div>`;
}

// ===== EXTRAS =====
function extrasTabWaehlen(tab) { state.extrasTab = tab; render(); }

function renderExtras() {
  const tabs = [
    {id:'budget',       label:'💶 Budget'},
    {id:'steuer',       label:'💼 Steuer'},
    {id:'krankenkasse', label:'🏥 Kasse'},
    {id:'gutscheine',   label:'🎟️ Gutscheine'},
    {id:'gericht',      label:'⚖️ Gericht'}
  ];
  let inhalt;
  if (state.extrasTab === 'krankenkasse') inhalt = renderKrankenkasse();
  else if (state.extrasTab === 'budget')  inhalt = renderBudgetrechner();
  else if (state.extrasTab === 'gutscheine') inhalt = renderGutscheine();
  else if (state.extrasTab === 'gericht') inhalt = renderGerichtsschreiben();
  else                                    inhalt = renderSteuer();
  return `
  <div class="section-title">💼 Extras</div>
  <p class="section-sub">Budget, Steuer, Krankenkasse, Gutscheine & Gerichtsschreiben erklärt</p>
  <div class="antrag-tabs" style="margin-bottom:1.25rem;flex-wrap:wrap">
    ${tabs.map(t=>`<button class="antrag-tab ${state.extrasTab===t.id?'aktiv':''}" onclick="extrasTabWaehlen('${t.id}')">${t.label}</button>`).join('')}
  </div>
  ${inhalt}`;
}

function renderSteuer() {
  return `
  <div class="info-box gruen"><span class="ib-icon">💡</span><div class="ib-text"><strong>Als Alleinerziehende haben Sie Anspruch auf Steuerklasse 2 — das spart bis zu 350 € im Jahr!</strong>Jetzt beantragen!</div></div>

  <div class="block-title">💼 Steuerklasse 2 — Was ist das?</div>
  <div class="card" style="margin-bottom:1rem">
    <div style="font-size:.92rem;line-height:1.7;color:var(--g700)">
      <p style="margin-bottom:.75rem">Als Alleinerziehende/r können Sie statt Steuerklasse 1 die günstigere <strong>Steuerklasse 2</strong> beantragen. Das bedeutet:</p>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:.5rem">
        <li style="display:flex;gap:.75rem"><span style="color:var(--gruen);font-weight:800">✓</span><span><strong>Entlastungsbetrag: 4.260 € pro Jahr</strong> steuerlich absetzbar (+ 240 € je weiteres Kind)</span></li>
        <li style="display:flex;gap:.75rem"><span style="color:var(--gruen);font-weight:800">✓</span><span>Direkt mehr Netto auf dem Konto: bei ~2.000 € Brutto ca. <strong>20–30 € mehr/Monat</strong></span></li>
        <li style="display:flex;gap:.75rem"><span style="color:var(--gruen);font-weight:800">✓</span><span>Gilt ab dem Monat, in dem Sie alleinerziehend sind</span></li>
      </ul>
    </div>
  </div>

  <div class="block-title">✅ Voraussetzungen für Steuerklasse 2</div>
  <div class="card" style="margin-bottom:1rem">
    <ul class="check-list">
      <li>Kind lebt in Ihrem Haushalt (gemeldet)</li>
      <li>Sie sind nicht mit dem anderen Elternteil verheiratet/verpartnert</li>
      <li>Keine weitere volljährige Person lebt in Ihrem Haushalt (außer Kinder)</li>
      <li>Für das Kind wird Kindergeld oder Freibetrag gewährt</li>
    </ul>
  </div>

  <div class="block-title">📋 So beantragen Sie Steuerklasse 2</div>
  ${[
    {nr:1, titel:'Antrag auf Lohnsteuerermäßigung', text:'Laden Sie das Formular "Antrag auf Lohnsteuerermäßigung" beim Finanzamt herunter oder stellen Sie den Antrag digital über ELSTER.', tipp:'Einfachste Methode: ELSTER-Portal (kostenlos) → Lohnsteuer → Steuerklassenwechsel'},
    {nr:2, titel:'Anlage K ausfüllen', text:'In der "Anlage K" (Kinderbetreuungskosten und Entlastungsbetrag) eintragen, dass Sie alleinerziehend sind. Kinderzahl und Geburtsdaten angeben.', tipp:'Falls unsicher: Lohnsteuerhilfeverein aufsuchen — Kosten ca. 50–100 € im Jahr, spart aber oft 300–600 €!'},
    {nr:3, titel:'Beim Finanzamt einreichen', text:'Antrag beim zuständigen Finanzamt einreichen (persönlich, per Post oder online über ELSTER). Das Finanzamt aktualisiert dann Ihr ELStAM (elektronische Lohnsteuerabzugsmerkmale).', tipp:'Arbeitgeber berücksichtigt die neue Steuerklasse automatisch ab dem nächsten Monat nach Änderung.'},
    {nr:4, titel:'Jährliche Steuererklärung', text:'In der Steuererklärung Kinderbetreuungskosten (bis 4.000 € absetzbar = 2/3 von max. 6.000 €) und weitere Posten geltend machen.', tipp:'Unterhaltszahlungen: bis 10.347 € als außergewöhnliche Belastung absetzbar!'}
  ].map(s=>`
    <div class="schritt">
      <div class="schritt-nr">${s.nr}</div>
      <div class="schritt-body">
        <div class="schritt-title">${s.titel}</div>
        <div class="schritt-text">${s.text}</div>
        <div class="schritt-tipp">${s.tipp}</div>
      </div>
    </div>`).join('')}

  <div class="block-title">🔗 Direkte Links</div>
  <div class="grid-2">
    <a href="https://www.elster.de" target="_blank" class="card" style="text-decoration:none;display:block;border-left:4px solid #4F46E5">
      <div style="font-weight:700;margin-bottom:.25rem">💻 ELSTER (Online-Steuer)</div>
      <div style="font-size:.82rem;color:var(--g700);margin-bottom:.5rem">Steuerklassenwechsel komplett online — kostenlos und einfach</div>
      <span class="btn btn-primary btn-sm">Zu ELSTER →</span>
    </a>
    <a href="https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Steuerarten/Lohnsteuer/lohnsteuer.html" target="_blank" class="card" style="text-decoration:none;display:block;border-left:4px solid #059669">
      <div style="font-weight:700;margin-bottom:.25rem">🏛️ Bundesfinanzministerium</div>
      <div style="font-size:.82rem;color:var(--g700);margin-bottom:.5rem">Alle Infos zu Lohnsteuer und Steuerklassen offiziell</div>
      <span class="btn btn-gruen btn-sm">Infos ansehen →</span>
    </a>
    <a href="https://www.vlh.de" target="_blank" class="card" style="text-decoration:none;display:block;border-left:4px solid #D97706">
      <div style="font-weight:700;margin-bottom:.25rem">📋 Lohnsteuerhilfe (VLH)</div>
      <div style="font-size:.82rem;color:var(--g700);margin-bottom:.5rem">Günstige Beratung für Arbeitnehmer — oft 300+ € Erstattung!</div>
      <span class="btn btn-sm" style="background:#D97706;color:white">Beratung finden →</span>
    </a>
    <a href="https://www.abgabenrechner.de" target="_blank" class="card" style="text-decoration:none;display:block;border-left:4px solid #2563EB">
      <div style="font-weight:700;margin-bottom:.25rem">🧮 Steuerrechner</div>
      <div style="font-size:.82rem;color:var(--g700);margin-bottom:.5rem">Berechnen Sie sofort wie viel Sie mit Steuerklasse 2 sparen</div>
      <span class="btn btn-primary btn-sm">Jetzt berechnen →</span>
    </a>
  </div>`;
}

function renderKrankenkasse() {
  return `
  <div class="info-box blau"><span class="ib-icon">🏥</span><div class="ib-text"><strong>Kennen Sie Ihre Rechte?</strong>Als alleinerziehende Eltern haben Sie besondere Ansprüche gegenüber der Krankenkasse — viele werden nicht aktiv angeboten!</div></div>
  <div class="grid-2">${KRANKENKASSE_LEISTUNGEN.map(k=>`
    <div class="kk-karte" style="border-left:4px solid ${k.farbe}">
      <div style="display:flex;align-items:flex-start;gap:.65rem;margin-bottom:.6rem">
        <span style="font-size:1.75rem;flex-shrink:0">${k.emoji}</span>
        <div>
          <div style="font-weight:700;font-size:.92rem">${esc(k.name)}</div>
          <span class="betrag-badge" style="background:${k.farbe}20;color:${k.farbe};margin-top:.25rem;display:inline-block">${esc(k.anspruch)}</span>
          ${k.wichtig ? '<span class="betrag-badge" style="background:#FEF3C7;color:#D97706;margin-left:.35rem;display:inline-block">⭐ Wichtig</span>' : ''}
        </div>
      </div>
      <p style="font-size:.82rem;color:var(--g700);line-height:1.55;margin-bottom:.6rem">${esc(k.beschreibung)}</p>
      <div style="background:var(--g50);border-radius:var(--r-sm);padding:.5rem .75rem;font-size:.78rem;color:var(--g700);border-left:3px solid ${k.farbe}">
        <strong>So beantragen:</strong> ${esc(k.wie)}
      </div>
    </div>`).join('')}
  </div>
  <div class="info-box orange" style="margin-top:1.5rem">
    <span class="ib-icon">📞</span>
    <div class="ib-text">
      <strong>Direkt bei Ihrer Krankenkasse nachfragen!</strong>
      Rufen Sie einfach die Servicenummer auf Ihrer Krankenkassenkarte an und fragen Sie konkret nach diesen Leistungen — Mitarbeitende sind verpflichtet zu informieren.
    </div>
  </div>`;
}

// ===== GUTSCHEINE =====
function renderGutscheine() {
  const angebote = [
    {
      emoji:'🎫', name:'Familienpass / Familienausweis',
      farbe:'#7C3AED', bg:'#EDE9FE',
      was:'Kostenlose oder stark ermäßigte Eintritte in Bäder, Museen, Theater, Zoos und Freizeitparks.',
      wie:'Beim Jugendamt oder Stadtbüro beantragen. Ausweis sofort gültig, oft auch online bestellbar.',
      link:'https://www.familienratgeber.de', linkText:'Infos ansehen'
    },
    {
      emoji:'🎭', name:'Kulturpass (16–18 Jahre)',
      farbe:'#2563EB', bg:'#DBEAFE',
      was:'200 € Guthaben pro Jahr für Jugendliche ab 16 — für Konzerte, Bücher, Kino, Museen. Bundesweit gültig.',
      wie:'Registrierung auf kulturpass.de mit Personalausweis. Sofort nutzbar mit App.',
      link:'https://www.kulturpass.de', linkText:'Jetzt registrieren'
    },
    {
      emoji:'🏖️', name:'BuT – Ausflüge & Ferienfreizeiten',
      farbe:'#059669', bg:'#D1FAE5',
      was:'Bis zu 15 € pro Schulausflug vollständig erstattet. Ferienfreizeiten bis 1 Tag komplett übernommen.',
      wie:'Bildungs- und Teilhabepaket beim Jobcenter oder Sozialamt beantragen — auch wenn Sie arbeiten!',
      link:'https://www.bmas.de/DE/Soziales/Bildungspaket/bildungspaket.html', linkText:'BuT beantragen'
    },
    {
      emoji:'🎟️', name:'mydealz – kostenlose Events',
      farbe:'#EA580C', bg:'#FFEDD5',
      was:'Täglich neue gratis Tickets, Gutscheine und Freikarten für Familien — Museen, Kino, Events, Freizeitparks.',
      wie:'Auf mydealz.de im Bereich "Gratis" oder "Familie" filtern. Kein Abo notwendig.',
      link:'https://www.mydealz.de/search?q=gratis+kinder', linkText:'Gratis-Deals ansehen'
    },
    {
      emoji:'🍕', name:'Tafel – Lebensmittel-Hilfe',
      farbe:'#DC2626', bg:'#FEE2E2',
      was:'Günstige bis kostenlose Lebensmittel für Familien. Über 900 Tafeln deutschlandweit.',
      wie:'Nächste Tafel unter tafel.de finden. Berechtigungsnachweis (Sozialleistungsbescheid o.ä.) mitbringen.',
      link:'https://www.tafel.de/infos-hilfe/tafel-suche/', linkText:'Tafel finden'
    },
    {
      emoji:'🏕️', name:'Sommerferien-Freizeiten kostenlos',
      farbe:'#0EA5E9', bg:'#E0F2FE',
      was:'Viele Kommunen und Verbände bieten kostenlose oder stark subventionierte Ferienfreizeiten an.',
      wie:'Bei der Gemeinde, dem Jugendamt oder Caritas/AWO/Diakonie nachfragen. Häufig BuT-finanzierbar.',
      link:'https://www.ferienwerk.de', linkText:'Freizeiten suchen'
    },
    {
      emoji:'📚', name:'Bücherei – Gratis-Ausweis für Kinder',
      farbe:'#9333EA', bg:'#F3E8FF',
      was:'In den meisten Städten ist der Bibliotheksausweis für Kinder bis 18 kostenlos. Zugang zu tausenden Büchern, Filmen, Musik und Online-Angeboten.',
      wie:'In der nächsten Stadtbibliothek anmelden — nur Personalausweis und Kindergeburtsurkunde nötig.',
      link:'https://www.bibliotheksportal.de', linkText:'Bücherei finden'
    },
    {
      emoji:'🎬', name:'Kino kostenlos / stark vergünstigt',
      farbe:'#BE185D', bg:'#FCE7F3',
      was:'Viele Kinos bieten Sondervorstellungen für Sozialhilfeempfänger und BuT-Berechtigte zu 1–3 €.',
      wie:'Direkt beim lokalen Kino nach dem "Sozialtarif" fragen. Personalausweis + Berechtigungsnachweis mitbringen.',
      link:'https://www.kinoprogramm.de', linkText:'Kino suchen'
    },
    {
      emoji:'⚽', name:'Sportvereins-Beitrag übernehmen lassen',
      farbe:'#16A34A', bg:'#DCFCE7',
      was:'BuT zahlt bis zu 15 € im Monat für Vereinsmitgliedschaften, Sportausrüstung und Musikunterricht.',
      wie:'Beim Jobcenter/Sozialamt Antrag stellen. Gilt auch für Tanzschule, Musikverein, Schwimmkurs etc.',
      link:'https://www.arbeitsagentur.de/familie-und-kinder/bildung-und-teilhabe', linkText:'BuT-Antrag stellen'
    },
    {
      emoji:'🎁', name:'Wunscherfüller & Spendenaktionen',
      farbe:'#D97706', bg:'#FEF3C7',
      was:'Organisationen wie "Ein Licht" oder "Wünschewagen" erfüllen Wünsche für bedürftige Kinder kostenlos.',
      wie:'Direkt bei der Organisation anmelden. Keine Einkommensgrenze bei allen Angeboten.',
      link:'https://www.ein-licht.de', linkText:'Zur Website'
    }
  ];
  return `
  <div class="info-box gruen"><span class="ib-icon">🎟️</span><div class="ib-text"><strong>Echte Gutscheine & Gratis-Angebote</strong> — Kein Abo, keine Registrierung notwendig. Alle Angebote sind kostenlos oder stark vergünstigt.</div></div>
  <div class="grid-2">
    ${angebote.map(a=>`
    <div class="kk-karte" style="border-left:4px solid ${a.farbe}">
      <div style="display:flex;align-items:flex-start;gap:.65rem;margin-bottom:.6rem">
        <span style="font-size:1.75rem;flex-shrink:0">${a.emoji}</span>
        <div>
          <div style="font-weight:700;font-size:.92rem">${esc(a.name)}</div>
          <span class="betrag-badge" style="background:${a.bg};color:${a.farbe};margin-top:.25rem;display:inline-block">Gratis / Förderung</span>
        </div>
      </div>
      <p style="font-size:.82rem;color:var(--g700);line-height:1.55;margin-bottom:.6rem">${esc(a.was)}</p>
      <div style="background:var(--g50);border-radius:var(--r-sm);padding:.5rem .75rem;font-size:.78rem;color:var(--g700);border-left:3px solid ${a.farbe};margin-bottom:.6rem">
        <strong>So geht's:</strong> ${esc(a.wie)}
      </div>
      <a href="${a.link}" target="_blank" class="btn btn-sm" style="background:${a.farbe};color:white;text-decoration:none;display:inline-block">${esc(a.linkText)} →</a>
    </div>`).join('')}
  </div>`;
}

// ===== GERICHTSSCHREIBEN ERKLÄRT =====
function renderGerichtsschreiben() {
  const gerichtTab = state.gerichtTab || 'sorgerecht';
  const themen = [
    {id:'sorgerecht',     label:'👶 Sorgerecht'},
    {id:'umgangsrecht',   label:'🤝 Umgangsrecht'},
    {id:'unterhalt',      label:'💶 Unterhalt'},
    {id:'scheidung',      label:'💔 Scheidung'},
    {id:'einstweilig',    label:'⚡ Eilantrag'}
  ];

  const inhalte = {
    sorgerecht: {
      titel:'👶 Sorgerecht — Was bedeutet das?',
      farbe:'#7C3AED',
      paragraf:'§ 1671 BGB',
      erklaerung:'Das Sorgerecht regelt, wer für das Kind wichtige Entscheidungen treffen darf (Schule, Arzt, Wohnort). Es gibt zwei Formen:',
      punkte:[
        '**Gemeinsames Sorgerecht:** Beide Eltern entscheiden zusammen — auch nach Trennung der häufigste Fall.',
        '**Alleiniges Sorgerecht:** Nur ein Elternteil entscheidet. Muss beim Familiengericht beantragt werden.',
        '**Aufenthaltsbestimmungsrecht:** Wer bestimmt, wo das Kind lebt — kann getrennt vom Sorgerecht geregelt werden.'
      ],
      schritte:[
        {titel:'Antrag beim Familiengericht', text:'Stellen Sie einen Antrag auf alleiniges Sorgerecht beim Amtsgericht (Familiengericht). Begründen Sie, warum das Kindeswohl es erfordert.'},
        {titel:'Begründung vorbereiten', text:'Nennen Sie konkrete Gründe: Gewalt, Sucht, Erreichbarkeit, fehlende Kooperationsbereitschaft des anderen Elternteils.'},
        {titel:'Jugendamt einschalten', text:'Das Jugendamt wird vom Gericht gehört. Nehmen Sie vorab Kontakt auf — das Jugendamt kann Ihnen auch helfen.'},
        {titel:'Anwalt nicht immer nötig', text:'Für einfache Verfahren können Sie selbst einen Antrag stellen. Bei Streit empfiehlt sich ein Fachanwalt für Familienrecht.'}
      ],
      tipp:'Beratungshilfe beim Amtsgericht beantragen — dann übernimmt der Staat die Anwaltskosten bei geringem Einkommen!'
    },
    umgangsrecht: {
      titel:'🤝 Umgangsrecht — Was bedeutet das?',
      farbe:'#2563EB',
      paragraf:'§ 1684 BGB',
      erklaerung:'Das Umgangsrecht gibt dem Kind das Recht, den anderen Elternteil zu sehen — und umgekehrt. Es ist ein Recht des Kindes, kein Recht der Eltern.',
      punkte:[
        '**Regelumgang:** Häufig jedes 2. Wochenende + die Hälfte der Ferien.',
        '**Ausschluss:** Nur möglich wenn der Umgang das Kindeswohl gefährdet (Nachweis nötig).',
        '**Begleiteter Umgang:** Bei Bedenken kann das Gericht anordnen, dass Umgang nur mit Begleitung (Jugendamt) stattfindet.'
      ],
      schritte:[
        {titel:'Einigung versuchen', text:'Sprechen Sie erst mit dem anderen Elternteil. Eine schriftliche Umgangsvereinbarung schützt beide Seiten.'},
        {titel:'Jugendamt als Vermittler', text:'Das Jugendamt bietet kostenlose Beratung und kann als Vermittler auftreten, ohne dass ein Gericht eingeschaltet wird.'},
        {titel:'Antrag auf Umgangsregelung', text:'Beim Familiengericht einen Antrag auf Festlegung des Umgangs stellen. Das Gericht entscheidet nach dem Kindeswohl.'},
        {titel:'Vollstreckung bei Verweigerung', text:'Wenn ein Elternteil den Umgang verhindert, kann das Gericht ein Ordnungsgeld verhängen (§ 89 FamFG).'}
      ],
      tipp:'Führen Sie ein Umgangs-Tagebuch mit Datum und Begründungen wenn Termine verweigert werden — das ist wichtig als Beweismittel!'
    },
    unterhalt: {
      titel:'💶 Unterhalt — Ansprüche durchsetzen',
      farbe:'#059669',
      paragraf:'§§ 1601–1615 BGB',
      erklaerung:'Kindesunterhalt ist eine gesetzliche Pflicht. Wer das Kind nicht hauptsächlich betreut, muss Geld zahlen — unabhängig vom eigenen Wunsch.',
      punkte:[
        '**Düsseldorfer Tabelle:** Legt fest, wie viel Unterhalt nach Einkommen zu zahlen ist (wird jährlich aktualisiert).',
        '**Mindestunterhalt (2025):** 480 € (0–5 J.), 551 € (6–11 J.), 645 € (12–17 J.) minus halbes Kindergeld.',
        '**Unterhaltsvorschuss:** Wenn kein Unterhalt gezahlt wird, zahlt der Staat — Antrag beim Jugendamt!'
      ],
      schritte:[
        {titel:'Unterhaltsvorschuss sofort beantragen', text:'Beim Jugendamt Unterhaltsvorschuss beantragen — bis 18 Jahre, max. 6 Jahre. Geht auch wenn Vater/Mutter unbekannt ist.'},
        {titel:'Unterhaltstitel erwirken', text:'Beim Jugendamt oder Gericht eine vollstreckbare Urkunde erstellen lassen. Damit kann direkt gepfändet werden.'},
        {titel:'Gehaltsauskunft erzwingen', text:'Falls der andere Elternteil keine Auskunft gibt: beim Familiengericht Auskunftsantrag stellen (§ 1605 BGB).'},
        {titel:'Beistandschaft des Jugendamts', text:'Das Jugendamt kann die Beistandschaft übernehmen und Unterhalt kostenlos für Sie eintreiben — ohne Anwalt!'}
      ],
      tipp:'Beistandschaft des Jugendamts kostenlos beantragen! Das spart Anwaltskosten und das Jugendamt kennt alle Tricks.'
    },
    scheidung: {
      titel:'💔 Scheidung — Der Ablauf',
      farbe:'#DC2626',
      paragraf:'§§ 1564–1587 BGB',
      erklaerung:'Eine Scheidung in Deutschland dauert mindestens 1 Jahr Trennung. Das Gericht prüft, ob die Ehe gescheitert ist — nicht wer "schuld" ist.',
      punkte:[
        '**Trennungsjahr:** Mindestens 1 Jahr getrennt leben (auch in der selben Wohnung möglich).',
        '**Scheidungsantrag:** Nur über einen Anwalt möglich. Mindestens ein Partner braucht einen Anwalt.',
        '**Versorgungsausgleich:** Rentenansprüche werden aufgeteilt — läuft automatisch im Scheidungsverfahren.',
        '**Trennungsunterhalt:** Während des Trennungsjahres kann der einkommensschwächere Partner Unterhalt verlangen.'
      ],
      schritte:[
        {titel:'Trennung vollziehen', text:'Haushalt trennen (getrennte Kassen, Zimmer). Das Datum der Trennung schriftlich festhalten — wichtig als Startpunkt.'},
        {titel:'Verfahrenskostenhilfe beantragen', text:'Haben Sie wenig Einkommen? Der Staat übernimmt alle Anwalts- und Gerichtskosten (früher: Prozesskostenhilfe).'},
        {titel:'Anwalt beauftragen', text:'Mindestens ein Partner braucht einen Anwalt. Bei einvernehmlicher Scheidung reicht einer. Verfahrenskostenhilfe möglich.'},
        {titel:'Folgesachen klären', text:'Sorgerecht, Umgang, Zugewinn, Wohnung — idealerweise vor der Scheidung schriftlich regeln (Scheidungsvereinbarung).'}
      ],
      tipp:'Einvernehmliche Scheidung (beide einig) ist schneller und günstiger. Dann braucht nur ein Anwalt beauftragt werden!'
    },
    einstweilig: {
      titel:'⚡ Einstweilige Verfügung — Sofort-Schutz',
      farbe:'#D97706',
      paragraf:'§§ 49-57 FamFG, § 935 ZPO',
      erklaerung:'Eine einstweilige Verfügung (eV) ist ein gerichtlicher Eilbeschluss — er wirkt sofort, noch bevor das Hauptverfahren beginnt. Wichtig bei Gefahr in Verzug.',
      punkte:[
        '**Wann sinnvoll?** Bei Gefahr (häusliche Gewalt), drohendem Wegzug eines Kindes, Verweigerung von Unterhalt.',
        '**Kontaktverbot:** Bei häuslicher Gewalt kann per eV ein Näherungsverbot erteilt werden.',
        '**Vorläufiges Aufenthaltsbestimmungsrecht:** Kind soll bei Ihnen bleiben — Eilantrag ist möglich.',
        '**Kosten:** Verfahrenskostenhilfe möglich bei geringem Einkommen.'
      ],
      schritte:[
        {titel:'Gefahr dokumentieren', text:'Fotos, Screenshots, Zeugenaussagen sammeln. Je mehr Beweise, desto schneller handelt das Gericht.'},
        {titel:'Antrag beim Amtsgericht', text:'Familienrechtlichen Eilantrag beim zuständigen Amtsgericht stellen. Oft innerhalb von 1–3 Tagen entschieden.'},
        {titel:'Bei akuter Gewalt: Polizei', text:'Polizei ruft das Gericht in Not-Situationen direkt an. Auch Frauenhäuser können bei rechtlichen Schritten helfen.'},
        {titel:'Verfahrenskostenhilfe', text:'Sofort beim Antrag mitbeantragen — das Gericht prüft beides gleichzeitig, kein Geld nötig zum Start.'}
      ],
      tipp:'In akuter Not: Frauenhaus anrufen (0800 111 0 111 — kostenlos, 24h). Die kennen die lokalen Anwälte und können sofort helfen!'
    }
  };

  const aktiv = inhalte[gerichtTab] || inhalte['sorgerecht'];

  return `
  <div class="info-box orange"><span class="ib-icon">⚖️</span><div class="ib-text"><strong>Gerichtsschreiben verständlich erklärt</strong> — Was bedeuten Briefe vom Familiengericht? Was sind Ihre Rechte? Alles in einfacher Sprache.</div></div>
  <div class="antrag-tabs" style="margin-bottom:1.25rem;flex-wrap:wrap">
    ${themen.map(t=>`<button class="antrag-tab ${gerichtTab===t.id?'aktiv':''}" onclick="gerichtTabWaehlen('${t.id}')">${t.label}</button>`).join('')}
  </div>

  <div class="card" style="border-left:4px solid ${aktiv.farbe};margin-bottom:1.25rem">
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">
      <span style="font-weight:700;font-size:1.05rem">${aktiv.titel}</span>
      <span class="betrag-badge" style="background:${aktiv.farbe}15;color:${aktiv.farbe}">${aktiv.paragraf}</span>
    </div>
    <p style="font-size:.88rem;color:var(--g700);line-height:1.6;margin-bottom:1rem">${aktiv.erklaerung}</p>
    <ul style="list-style:none;display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem">
      ${aktiv.punkte.map(p=>`<li style="display:flex;gap:.75rem;font-size:.85rem;color:var(--g700);line-height:1.5"><span style="color:${aktiv.farbe};font-weight:800;flex-shrink:0">›</span><span>${p.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</span></li>`).join('')}
    </ul>
  </div>

  <div class="block-title">📋 So gehen Sie vor</div>
  ${aktiv.schritte.map((s,i)=>`
  <div class="schritt">
    <div class="schritt-nr">${i+1}</div>
    <div class="schritt-body">
      <div class="schritt-title">${s.titel}</div>
      <div class="schritt-text">${s.text}</div>
    </div>
  </div>`).join('')}

  <div class="info-box gruen" style="margin-top:1.25rem">
    <span class="ib-icon">💡</span>
    <div class="ib-text"><strong>Tipp:</strong> ${aktiv.tipp}</div>
  </div>

  <div class="block-title" style="margin-top:1.5rem">📞 Kostenlose Rechtsberatung</div>
  <div class="grid-2">
    <a href="https://www.vdk.de" target="_blank" class="card" style="text-decoration:none;display:block;border-left:4px solid #7C3AED">
      <div style="font-weight:700;margin-bottom:.25rem">🏛️ Sozialverband VdK</div>
      <div style="font-size:.82rem;color:var(--g700);margin-bottom:.5rem">Kostenlose Rechtsberatung für Mitglieder — Beitrag ab 3,50 €/Monat</div>
      <span class="btn btn-sm" style="background:#7C3AED;color:white">vdk.de</span>
    </a>
    <a href="https://www.vamv.de" target="_blank" class="card" style="text-decoration:none;display:block;border-left:4px solid #2563EB">
      <div style="font-weight:700;margin-bottom:.25rem">👪 VAMV Verband</div>
      <div style="font-size:.82rem;color:var(--g700);margin-bottom:.5rem">Verband für Alleinerziehende — Beratung, Rechtsinfos, Selbsthilfe</div>
      <span class="btn btn-sm" style="background:#2563EB;color:white">vamv.de</span>
    </a>
    <a href="https://www.beratungshilfe.de" target="_blank" class="card" style="text-decoration:none;display:block;border-left:4px solid #059669">
      <div style="font-weight:700;margin-bottom:.25rem">💶 Beratungshilfe</div>
      <div style="font-size:.82rem;color:var(--g700);margin-bottom:.5rem">Anwalt fast kostenlos (15 € Eigenanteil) — beim Amtsgericht beantragen</div>
      <span class="btn btn-sm" style="background:#059669;color:white">Infos →</span>
    </a>
    <a href="https://www.notruf-frauenhaus.de" target="_blank" class="card" style="text-decoration:none;display:block;border-left:4px solid #DC2626">
      <div style="font-weight:700;margin-bottom:.25rem">🆘 Frauenhaus Notruf</div>
      <div style="font-size:.82rem;color:var(--g700);margin-bottom:.5rem">0800 111 0 111 — kostenlos, 24h, anonym. Hilfe bei Gewalt & Trennung.</div>
      <span class="btn btn-sm" style="background:#DC2626;color:white">Jetzt anrufen</span>
    </a>
  </div>`;
}

function gerichtTabWaehlen(tab) { state.gerichtTab = tab; render(); }

// ===== URLAUB =====
const URLAUB_ANGEBOTE = [
  {
    id:'mallorca', ziel:'Mallorca', land:'Spanien', emoji:'🏖️',
    bild:'https://images.unsplash.com/photo-1571406252241-db0280bd36cd?w=600&q=75',
    typ:'strand', dauer:'7 Nächte', verpflegung:'Halbpension',
    preis:'ab 299 €', preisPro:'p.P. inkl. Flug',
    highlight:'Familienfreundliche Hotelanlage mit Kinderpool',
    portal:'TUI', link:'https://www.tui.com/suche/?dest=Mallorca&dur=7&dep=EDDK&board=HP&rooms=1&ages=0'
  },
  {
    id:'ostsee', ziel:'Ostsee', land:'Deutschland', emoji:'⛵',
    bild:'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=75',
    typ:'natur', dauer:'5 Nächte', verpflegung:'Frühstück',
    preis:'ab 189 €', preisPro:'p.P. im DZ',
    highlight:'Sandstrand, Fahrradwege, kein Reisepass nötig',
    portal:'HRS', link:'https://www.hrs.com/suche/ostsee-urlaub'
  },
  {
    id:'gardaland', ziel:'Gardasee + Gardaland', land:'Italien', emoji:'🎢',
    bild:'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=75',
    typ:'abenteuer', dauer:'7 Nächte', verpflegung:'Frühstück',
    preis:'ab 349 €', preisPro:'p.P. inkl. Fahrt',
    highlight:'Freizeitpark + Badeurlaub in einem — Kinder lieben es!',
    portal:'ADAC Reisen', link:'https://reisen.adac.de/urlaub/gardasee'
  },
  {
    id:'nordsee', ziel:'Nordsee / Sylt', land:'Deutschland', emoji:'🌊',
    bild:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75',
    typ:'strand', dauer:'5 Nächte', verpflegung:'Frühstück',
    preis:'ab 219 €', preisPro:'p.P. im Ferienhaus',
    highlight:'Wattwandern, Muscheln, Strandkorb — typisch deutsch',
    portal:'Ferienhaus.de', link:'https://www.ferienhaus.de/nordsee'
  },
  {
    id:'kroatien', ziel:'Kroatien / Istrien', land:'Kroatien', emoji:'🌅',
    bild:'https://images.unsplash.com/photo-1555990538-c88f6a3ba877?w=600&q=75',
    typ:'strand', dauer:'7 Nächte', verpflegung:'Selbstversorgung',
    preis:'ab 259 €', preisPro:'p.P. Ferienwohnung',
    highlight:'Kristallklares Meer, günstiger als Mallorca, tolle Natur',
    portal:'Airbnb', link:'https://www.airbnb.de/s/Istrien--Kroatien/homes?adults=2'
  },
  {
    id:'bayerische-alpen', ziel:'Bayerische Alpen', land:'Deutschland', emoji:'⛰️',
    bild:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=75',
    typ:'natur', dauer:'5 Nächte', verpflegung:'Halbpension',
    preis:'ab 179 €', preisPro:'p.P. Pension',
    highlight:'Wandern, Seen, Burgen — günstig & traumhaft schön',
    portal:'Booking.com', link:'https://www.booking.com/searchresults.de.html?ss=Bayerische+Alpen&group_adults=2&group_children=1'
  },
  {
    id:'tunesien', ziel:'Tunesien / Hammamet', land:'Tunesien', emoji:'🌴',
    bild:'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=75',
    typ:'strand', dauer:'7 Nächte', verpflegung:'All-Inclusive',
    preis:'ab 449 €', preisPro:'p.P. All-Inclusive',
    highlight:'Günstigstes All-Inclusive-Ziel für Familien — Wärme garantiert',
    portal:'FTI', link:'https://www.fti.de/urlaub/tunesien.html'
  },
  {
    id:'schwarzwald', ziel:'Schwarzwald', land:'Deutschland', emoji:'🌲',
    bild:'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=75',
    typ:'natur', dauer:'3 Nächte', verpflegung:'Frühstück',
    preis:'ab 99 €', preisPro:'p.P. Gasthof',
    highlight:'Wälder, Wasserfälle, Baumkronenpfad — perfekt für Kinder',
    portal:'Hotel.de', link:'https://www.hotel.de/schwarzwald'
  },
  {
    id:'griechenland', ziel:'Kos / Griechenland', land:'Griechenland', emoji:'🏛️',
    bild:'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=75',
    typ:'strand', dauer:'7 Nächte', verpflegung:'Halbpension',
    preis:'ab 379 €', preisPro:'p.P. inkl. Flug',
    highlight:'Ruhige Insel, saubere Strände, tolle Küche',
    portal:'Neckermann', link:'https://www.neckermann-reisen.de/griechenland'
  },
  {
    id:'aldi-reisen', ziel:'ALDI Reisen Familienangebot', land:'Verschiedene Ziele', emoji:'💶',
    bild:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=75',
    typ:'guenstig', dauer:'7–14 Nächte', verpflegung:'je nach Angebot',
    preis:'ab 199 €', preisPro:'p.P. je nach Angebot',
    highlight:'Günstigste Pauschalreisen — wöchentlich neue Deals!',
    portal:'ALDI Reisen', link:'https://www.aldi-reisen.de/familienurlaub'
  },
  {
    id:'rewe-reisen', ziel:'REWE Reisen – Familien-Special', land:'Verschiedene Ziele', emoji:'🎫',
    bild:'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600&q=75',
    typ:'guenstig', dauer:'7 Nächte', verpflegung:'je nach Angebot',
    preis:'ab 249 €', preisPro:'p.P. inkl. Flug',
    highlight:'Kinder oft kostenlos! Regelmäßige Familien-Sonderpreise',
    portal:'REWE Reisen', link:'https://www.rewe-reisen.de'
  },
  {
    id:'sozialtarif', ziel:'Sozialurlaub / Erholungsreisen', land:'Deutschland & EU', emoji:'❤️',
    bild:'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=75',
    typ:'guenstig', dauer:'7–14 Tage', verpflegung:'Vollpension',
    preis:'ab 0 €', preisPro:'stark gefördert / kostenlos',
    highlight:'AWO, Caritas & Diakonie bieten Erholungsreisen für bedürftige Familien — oft komplett kostenlos!',
    portal:'Sozialurlaub.de', link:'https://www.sozialurlaub.de'
  }
];

function renderUrlaub() {
  const filter = state.urlaubFilter || 'alle';
  const filterOptionen = [
    {id:'alle', label:'🌍 Alle'},
    {id:'strand', label:'🏖️ Strand'},
    {id:'natur', label:'🌲 Natur'},
    {id:'abenteuer', label:'🎢 Abenteuer'},
    {id:'guenstig', label:'💶 Günstig'}
  ];
  const gefiltert = filter === 'alle' ? URLAUB_ANGEBOTE : URLAUB_ANGEBOTE.filter(a => a.typ === filter);

  return `
  <div class="section-hero" style="background:linear-gradient(135deg,rgba(14,165,233,.9),rgba(79,70,229,.85)),url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=70') center/cover;border-radius:var(--r-lg);padding:2rem 1.5rem;margin-bottom:1.5rem;color:white">
    <div style="font-size:2rem;margin-bottom:.5rem">✈️</div>
    <div style="font-size:1.3rem;font-weight:800;margin-bottom:.4rem">Urlaub mit der Familie</div>
    <div style="font-size:.88rem;opacity:.9">Echte Reiseangebote — sofort buchbar, kein Login nötig</div>
  </div>

  <div class="info-box gruen" style="margin-bottom:1.25rem"><span class="ib-icon">💡</span><div class="ib-text"><strong>Tipp:</strong> ALG-II-Empfänger und Geringverdiener haben Anspruch auf <strong>Sozialurlaub</strong> — oft komplett kostenlos über AWO, Caritas oder Diakonie. Unten im Filter "💶 Günstig" anschauen!</div></div>

  <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.25rem">
    ${filterOptionen.map(f=>`<button class="tipps-filter-btn ${filter===f.id?'aktiv':''}" onclick="urlaubFilterSetzen('${f.id}')">${f.label}</button>`).join('')}
  </div>

  <div class="wohnung-portal-grid">
    ${gefiltert.map(a=>`
    <div class="wohnung-portal-karte" style="cursor:default">
      <div class="wohnung-portal-foto" style="background:url('${a.bild}') center/cover;position:relative">
        <span style="position:absolute;top:.5rem;left:.5rem;background:rgba(0,0,0,.55);color:white;padding:.2rem .6rem;border-radius:1rem;font-size:.75rem;font-weight:700">${a.land}</span>
        <span style="position:absolute;top:.5rem;right:.5rem;background:rgba(79,70,229,.9);color:white;padding:.2rem .6rem;border-radius:1rem;font-size:.78rem;font-weight:800">${a.preis}</span>
      </div>
      <div class="wohnung-portal-info">
        <div style="font-weight:800;font-size:.95rem;margin-bottom:.25rem">${a.emoji} ${a.ziel}</div>
        <div style="font-size:.78rem;color:var(--g500);margin-bottom:.4rem">${a.dauer} · ${a.verpflegung} · ${a.preisPro}</div>
        <div style="font-size:.82rem;color:var(--g700);margin-bottom:.75rem;line-height:1.4">${a.highlight}</div>
        <a href="${a.link}" target="_blank" class="btn btn-primary" style="width:100%;text-align:center;text-decoration:none;display:block;font-size:.82rem">
          Bei ${a.portal} ansehen →
        </a>
      </div>
    </div>`).join('')}
  </div>

  <div class="block-title" style="margin-top:1.75rem">📋 Weitere Reiseplattformen</div>
  <div class="grid-2">
    ${[
      {name:'Lastminute.de', icon:'⚡', txt:'Spontanurlaub bis -70%', link:'https://www.lastminute.de/familienurlaub'},
      {name:'Expedia', icon:'🌐', txt:'Paket-Deals Flug+Hotel', link:'https://www.expedia.de/Familienurlaub'},
      {name:'Urlaubsguru', icon:'🧙', txt:'Versteckte Schnäppchen täglich', link:'https://www.urlaubsguru.de/familienurlaub/'},
      {name:'Holidaycheck', icon:'⭐', txt:'Echte Bewertungen von Familien', link:'https://www.holidaycheck.de/familienhotels'}
    ].map(p=>`
    <a href="${p.link}" target="_blank" class="card" style="text-decoration:none;display:flex;align-items:center;gap:.75rem">
      <span style="font-size:1.75rem">${p.icon}</span>
      <div>
        <div style="font-weight:700;font-size:.9rem">${p.name}</div>
        <div style="font-size:.78rem;color:var(--g500)">${p.txt}</div>
      </div>
    </a>`).join('')}
  </div>`;
}

function urlaubFilterSetzen(f) { state.urlaubFilter = f; render(); }

// ===== JOBS =====
function renderJobs() {
  const user = getUser() || {};
  const ortVorausgefuellt = state.jobsOrt || user.ort || '';
  const wasVorausgefuellt = state.jobsWas || '';
  const ergebnisse = state.jobsErgebnisse || [];
  const laden = state.jobsLaden;
  const geladen = state.jobsGeladen;

  return `
  <div class="section-hero" style="background:linear-gradient(135deg,rgba(5,150,105,.9),rgba(79,70,229,.85)),url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=70') center/cover;border-radius:var(--r-lg);padding:2rem 1.5rem;margin-bottom:1.5rem;color:white">
    <div style="font-size:2rem;margin-bottom:.5rem">💼</div>
    <div style="font-size:1.3rem;font-weight:800;margin-bottom:.4rem">Jobs in Ihrer Nähe</div>
    <div style="font-size:.88rem;opacity:.9">Live-Suche via Bundesagentur für Arbeit — kostenlos & ohne Anmeldung</div>
  </div>

  <div class="standort-box" style="margin-bottom:1.25rem">
    <div style="font-weight:700;margin-bottom:.75rem">🔍 Jobs suchen</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:.5rem">
      <input id="jobs-was" class="standort-input" type="text" placeholder="Berufsfeld, z.B. Verkäuferin"
        value="${esc(wasVorausgefuellt)}" onkeydown="if(event.key==='Enter')jobsSuchen()" />
      <input id="jobs-ort" class="standort-input" type="text" placeholder="Ort oder PLZ"
        value="${esc(ortVorausgefuellt)}" onkeydown="if(event.key==='Enter')jobsSuchen()" />
    </div>
    <div style="display:flex;gap:.5rem">
      <button class="btn btn-primary" style="flex:1" onclick="jobsSuchen()">🔍 Jobs suchen</button>
      <button class="gps-btn" onclick="jobsGPS()">📡 GPS</button>
    </div>
    <div id="jobs-fehler" style="display:none;margin-top:.6rem;padding:.5rem .75rem;background:#FEE2E2;color:#DC2626;border-radius:.5rem;font-size:.82rem;font-weight:600"></div>
  </div>

  <div id="jobs-ergebnisse">
    ${laden ? `<div class="loading-spinner"><div class="spinner"></div><span>Jobs werden geladen...</span></div>` :
      !geladen ? `
      <div class="info-box blau"><span class="ib-icon">💡</span><div class="ib-text">
        <strong>Einfach oben Ort eingeben und suchen!</strong><br>
        Live-Ergebnisse der Bundesagentur für Arbeit — alle aktuellen Stellen in Ihrer Nähe.
      </div></div>
      <div class="block-title" style="margin-top:1.25rem">📋 Direkt zu den Jobbörsen</div>
      <div class="grid-2">
        ${[
          {name:'Bundesagentur für Arbeit', icon:'🏛️', txt:'Größte Jobbörse Deutschlands', link:'https://www.arbeitsagentur.de/jobsuche/', farbe:'#2563EB'},
          {name:'StepStone', icon:'⭐', txt:'Top-Jobs & Gehaltsinformationen', link:'https://www.stepstone.de', farbe:'#F59E0B'},
          {name:'Indeed', icon:'🔍', txt:'Millionen Jobs weltweit', link:'https://de.indeed.com', farbe:'#2563EB'},
          {name:'Xing Jobs', icon:'💼', txt:'Jobs im DACH-Raum', link:'https://www.xing.com/jobs', farbe:'#006567'},
          {name:'Jobware', icon:'📋', txt:'Fach- und Führungskräfte', link:'https://www.jobware.de', farbe:'#DC2626'},
          {name:'Minijob-Zentrale', icon:'⏰', txt:'Minijobs & Teilzeit in der Nähe', link:'https://www.minijob-zentrale.de/arbeitnehmer/job-finden', farbe:'#7C3AED'}
        ].map(p=>`
        <a href="${p.link}" target="_blank" class="card" style="text-decoration:none;display:flex;align-items:center;gap:.75rem;border-left:4px solid ${p.farbe}">
          <span style="font-size:1.6rem">${p.icon}</span>
          <div>
            <div style="font-weight:700;font-size:.88rem">${p.name}</div>
            <div style="font-size:.78rem;color:var(--g500)">${p.txt}</div>
          </div>
        </a>`).join('')}
      </div>` :
      ergebnisse.length === 0 ? `
      <div class="info-box orange"><span class="ib-icon">🔍</span><div class="ib-text">Keine Stellen gefunden. Anderen Suchbegriff oder größeren Umkreis probieren.</div></div>
      ${jobsPortalLinks(state.jobsOrt, state.jobsWas)}` :
      `<div style="font-weight:700;margin-bottom:.75rem;color:var(--g700)">${ergebnisse.length} Stellen gefunden</div>
      ${ergebnisse.map(j => jobsKarte(j)).join('')}
      ${jobsPortalLinks(state.jobsOrt, state.jobsWas)}`
    }
  </div>`;
}

function jobsKarte(j) {
  const titel = j.titel || 'Stelle';
  const arbeitgeber = j.arbeitgeber || '';
  const ort = j.arbeitsort?.ort || j.arbeitsort?.plz || '';
  const beruf = j.beruf || '';
  const aktuelleVeroeffentlichung = j.aktuelleVeroeffentlichungsdatum || '';
  const tage = aktuelleVeroeffentlichung ? Math.floor((Date.now() - new Date(aktuelleVeroeffentlichung)) / 86400000) : null;
  const datum = tage !== null ? (tage === 0 ? 'Heute' : tage === 1 ? 'Gestern' : `vor ${tage} Tagen`) : '';
  const link = `https://www.arbeitsagentur.de/jobsuche/jobdetail/${j.hashId}`;
  return `
  <a href="${link}" target="_blank" class="job-karte">
    <div class="job-titel">${esc(titel)}</div>
    ${arbeitgeber ? `<div class="job-arbeitgeber">🏢 ${esc(arbeitgeber)}</div>` : ''}
    <div class="job-meta">
      ${ort ? `<span>📍 ${esc(ort)}</span>` : ''}
      ${beruf ? `<span>🏷️ ${esc(beruf)}</span>` : ''}
      ${datum ? `<span>🕐 ${datum}</span>` : ''}
    </div>
  </a>`;
}

function jobsPortalLinks(ort, was) {
  const ortEnc = encodeURIComponent(ort || '');
  const wasEnc = encodeURIComponent(was || '');
  return `
  <div class="block-title" style="margin-top:1.25rem">🔗 Direkt weitersuchen</div>
  <div style="display:flex;flex-direction:column;gap:.5rem">
    <a href="https://www.arbeitsagentur.de/jobsuche/suche?was=${wasEnc}&wo=${ortEnc}&umkreis=25&angebotsart=1" target="_blank" class="btn btn-primary" style="text-align:center;text-decoration:none">
      🏛️ Alle Treffer bei der Bundesagentur →
    </a>
    <a href="https://de.indeed.com/Jobs?q=${wasEnc}&l=${ortEnc}&radius=25" target="_blank" class="btn" style="text-align:center;text-decoration:none;background:#2557A7;color:white">
      🔍 Bei Indeed suchen →
    </a>
    <a href="https://www.stepstone.de/jobs/${wasEnc}/in-${ortEnc}.html" target="_blank" class="btn" style="text-align:center;text-decoration:none;background:#F59E0B;color:white">
      ⭐ Bei StepStone suchen →
    </a>
  </div>`;
}

async function jobsSuchen() {
  const wasEl = el('jobs-was');
  const ortEl = el('jobs-ort');
  if (!ortEl) return;
  const was = wasEl?.value.trim() || '';
  const ort = ortEl.value.trim();
  if (!ort) {
    const box = el('jobs-fehler');
    if (box) { box.textContent = 'Bitte Ort oder PLZ eingeben.'; box.style.display = 'block'; }
    return;
  }
  const box = el('jobs-fehler');
  if (box) box.style.display = 'none';

  state.jobsWas = was;
  state.jobsOrt = ort;
  state.jobsLaden = true;
  state.jobsGeladen = false;
  state.jobsErgebnisse = [];

  const ergebnisDiv = el('jobs-ergebnisse');
  if (ergebnisDiv) ergebnisDiv.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><span>Jobs werden geladen...</span></div>';

  try {
    const params = new URLSearchParams({
      was, wo: ort, umkreis: '25', size: '20', page: '0', angebotsart: '1'
    });
    const res = await fetch(`https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v4/jobs?${params}`, {
      headers: { 'X-API-Key': 'jobboerse-jobsuche-ui', 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('API nicht erreichbar');
    const daten = await res.json();
    state.jobsErgebnisse = daten.stellenangebote || [];
    state.jobsLaden = false;
    state.jobsGeladen = true;
    render();
  } catch(e) {
    state.jobsLaden = false;
    state.jobsGeladen = true;
    state.jobsErgebnisse = [];
    render();
  }
}

async function jobsGPS() {
  if (!navigator.geolocation) return;
  const btn = document.querySelector('[onclick="jobsGPS()"]');
  if (btn) btn.textContent = '📡 Ortung...';
  navigator.geolocation.getCurrentPosition(async pos => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&accept-language=de`);
      const d = await res.json();
      const name = d.address?.city || d.address?.town || d.address?.village || '';
      state.jobsOrt = name;
      const ortEl = el('jobs-ort');
      if (ortEl) ortEl.value = name;
      if (btn) btn.textContent = '📡 GPS';
      jobsSuchen();
    } catch { if (btn) btn.textContent = '📡 GPS'; }
  }, () => { if (btn) btn.textContent = '📡 GPS'; });
}

function initJobs() {
  const user = getUser() || {};
  // Auto-Suche wenn Profil-Ort vorhanden und noch nicht gesucht
  if (!state.jobsGeladen && (user.ort || user.plz)) {
    state.jobsOrt = user.ort || user.plz || '';
    const ortEl = el('jobs-ort');
    if (ortEl) ortEl.value = state.jobsOrt;
    jobsSuchen();
  }
}

// App starten
document.addEventListener('DOMContentLoaded', init);
