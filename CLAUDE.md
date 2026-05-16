# FamilienApp — Projekt-Instruktionen

## Projekt-Überblick
- **Was**: Progressive Web App (PWA) für Familien — Zuschüsse, Anträge, Wohnungssuche, Umgebung, Rezepte, Gesundheit, Kalender, Spar-Tipps.
- **Vorgänger**: `alleinerziehende-Eltern-app` → umbenannt/erweitert zu `Familien-App` (Familien-Branding, breitere Zielgruppe).
- **Sprache**: Deutsch (UI, Texte, Daten). Code-Identifier auf Englisch.

## Tech-Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript — kein Framework, kein Build-Step.
- **PWA**: Service Worker (`sw.js`) mit drei Caches (static/runtime/images).
- **Karten**: Leaflet 1.9.4 (per CDN).
- **Daten**: Overpass API (OSM) für Orte/Umgebung.
- **Persistenz**: `localStorage` (Todos, Favoriten, Einstellungen, Begriffe).
- **Deployment**: Cloudflare Quick Tunnel via `cloudflared.exe`.

## Datei-Struktur (Core)
- [index.html](index.html) — App-Shell, PWA-Meta, Splash, Login.
- [js/app.js](js/app.js) — Hauptlogik (~14k Zeilen): Navigation, Suche, Features.
- [js/data.js](js/data.js) — Inhalts-DB: 812+ Einträge in 25+ Kategorien (`GESUNDHEIT_DATEN` allein 659 Heilmittel).
- [css/styles.css](css/styles.css) — komplettes Styling.
- [sw.js](sw.js) — Service Worker, Cache-Versionierung.
- [manifest.json](manifest.json) — PWA-Manifest.

## Cache-Versionierung (WICHTIG)
Bei jeder Auslieferung neuer Assets **immer beide** Stellen synchron hochzählen:
1. `sw.js` Zeile 1: `const CACHE_VERSION = 'familienapp-vXX'`
2. `index.html`: Query-String der CSS-Einbindung (`styles.css?v=XX`)

**Warum**: Ohne Bump bekommen User die alten Dateien aus dem Service-Worker-Cache. Aktuell: **v11**.

## Lokaler Start
- **Schnellstart (Windows)**: Doppelklick auf [FamilienApp-Starten.bat](FamilienApp-Starten.bat) — startet Python-Server + Cloudflared-Tunnel + öffnet QR-Anzeige.
- **Manuell**:
  ```
  python -m http.server 8000
  ```
  Dann im Browser: `http://localhost:8000`.
- **Hinweis**: Die `.bat` zeigt im `cd`-Pfad noch den alten Ordnernamen (`alleinerziehende Eltern app`). Falls Pfad falsch → vor Nutzung anpassen.

## Deployment-Workflow
1. Code-Änderungen committen.
2. Cache-Version bumpen (siehe oben).
3. `cloudflared.exe tunnel --url http://localhost:8000` starten.
4. Neue Public-URL aus `tunnel-url.txt` / `cf-out.txt` in `AKTUELLE-APP-URL.txt` eintragen.
5. Mit HTTP 200 verifizieren.

## Test- & Hilfs-Skripte
Im Root liegen viele `.mjs`-Helfer (Puppeteer/Playwright-basiert):
- `screenshot.mjs`, `multi-screenshot.mjs`, `ss*.mjs` — Screenshots erzeugen.
- `funktionstest.mjs`, `ux-pruefung.mjs`, `test-*.mjs` — UI-/Funktions-Checks.
- `count.mjs`, `bn-debug.mjs` — Debug-Utilities.
- Ausführen: `node <skript>.mjs` (App muss auf `localhost:8000` laufen).
- **Wichtig**: Diese Dateien sind **kein** Teil der App — nicht ins Deployment.

## App-Architektur

### Navigation (8 Gruppen → 37 Sektionen)
Definiert in [js/app.js:228](js/app.js#L228) als `NAV`-Objekt:
- **start** → Dashboard
- **geld** → Zuschüsse, Sparen, Budget
- **formulare** → Alle Formulare
- **ort** → Umgebung, Wohnung
- **familie** → Freizeit, Kalender, Notizen, Essensplan, To-Do, Checklisten, Beratung
- **kinder** → Bastelideen, Hausaufgaben
- **gesund** → Gesundheit, Symptom-Check, Schwangerschaft, Kochbuch
- **mehr** → Events, News, Urlaub, Jobs, Tipps, Einstellungen, Suche

### Rendering-Pattern
- Zentrale Funktion `render()` → schaltet per `state.sektion` zwischen Sektionen.
- `zuSektion(id)` setzt State + scrollt nach oben.
- Kein virtuelles DOM — direktes `innerHTML`/`textContent`.

### State & Persistenz (`localStorage`)
- Todos, Favoriten, Einstellungen, Begriffe (CRUD mit Filter/Priorität).
- Keine Server-Persistenz, kein Login-Backend.

### Daten-Kategorien in [js/data.js](js/data.js)
- `GESUNDHEIT_DATEN` — 659 Heilmittel.
- 25+ weitere Kategorien (Beratung, Rezepte, Tipps, Events, …).
- Insgesamt 812+ getitelte Einträge.

## Feature-Übersicht (was die App kann)
- **Finanzen**: Zuschuss-Rechner, Budget, Spar-Tipps (Strom, Verträge, Lebensmittel).
- **Formulare**: Schritt-für-Schritt, Dokumenten-Listen, Felder erklärt.
- **Umgebung** (Leaflet + Overpass): 19 Orts-Kategorien (Supermarkt, Arzt, Spielplatz, Kino, …) mit individuellen Radien.
- **Routenplaner**: Auto, Fahrrad, zu Fuß.
- **Wohnungssuche**.
- **Familie**: Kalender (Feiertage), Notizen, Essensplan, To-Do, Checklisten, Beratungsstellen.
- **Kinder**: Bastelideen (mit Video), Hausaufgaben-Helfer, Ausmalbilder.
- **Gesundheit**: Heilmittel-DB, Symptom-Check, Schwangerschaft, eigenes Kochbuch.
- **Mehr**: Events (regional), News, Urlaub, Jobs, Spar-Tipps, KI-Sprachsuche, Volltext-Suche.
- **PWA**: Installierbar (iOS/Android), Offline-fähig per Service Worker.

## Git
- **Repo**: GitHub `Familien-app` (master).
- **Push**: nur auf explizite Anweisung des Users.
- **Niemals**: `git push --force`, Hooks überspringen (`--no-verify`), `.env`/Secrets committen.

## Bekannte Eigenheiten
- **Sprit-Preise**: Im Code zweimal definiert — Stub bei ~Zeile 2110, aktive async-Version bei ~Zeile 2220 überschreibt den Stub. UI nutzt vereinfachte Direktlinks, Hintergrund lädt voll asynchron.
- **Familien-Foto-Bug**: Persistenter Anzeige-Bug auf Splash/Login (Mobile-Testing-Phase).
- Viele `.mjs`-Skripte im Root sind **Test-/Screenshot-Helfer** (Puppeteer), nicht Teil der App.

## Sicherheits-Hinweise (offen)
- Keine **CSP** (Content-Security-Policy) im `index.html`.
- Keine **SRI** (Subresource Integrity) für CDN-Skripte (Leaflet).
- Mögliche Attribute-Injection-Stellen — bei DOM-Manipulation mit User-Daten prüfen.

## Stil-Regeln für diesen Code
- Vanilla JS — keine neuen Frameworks/Build-Tools einführen ohne Rücksprache.
- Bestehende `localStorage`-Patterns wiederverwenden (nicht neue Persistenz-Layer erfinden).
- Bei DOM-Updates: `textContent` statt `innerHTML` wo möglich; `esc()` (siehe [js/app.js:124](js/app.js#L124)) für HTML-Escaping verwenden.
- Datei-Struktur beibehalten: alles neue in `js/app.js` oder `js/data.js`, nicht aufsplitten.

## Code-Konventionen
- **Funktionsnamen auf Deutsch** — etablierter Stil im Projekt: `zuSektion`, `pwaInstallieren`, `splashSchliessen`, `motivationsZitat`, `tageszeit`, `navGruppeWaehlen`.
  - Ausnahmen: kurze Helper auf Englisch (`getUser`, `saveUser`, `isLoggedIn`, `logout`, `el`, `esc`).
  - Neue Funktionen: an bestehenden Stil anpassen — wenn drumherum deutsch, dann deutsch.
- **Variablen**: gemischt; Domänen-Begriffe deutsch (`bundesland`, `antragId`, `sektion`), Technisches englisch ist ok.
- **State**: globales `state`-Objekt — keine neuen Globals einführen.
- **Toasts statt `alert()`**: Es gibt eine `toast()`-Funktion; immer diese verwenden (siehe Lesson aus v11: `alert()` wurde bewusst durch `toast()` ersetzt).
- **Try/Catch um `localStorage`**: Quota-Erkennung + User-Feedback per Toast (siehe Einstellungen-Speichern).

## Bekannte Bugs & offene Punkte
- **Familien-Foto auf Splash/Login**: persistenter Anzeige-Bug in Mobile-Testing-Phase. Fix-Versuch über CSS-Variable `--familien-foto` aus `localStorage`, die vor dem Splash gesetzt wird — wenn weiterhin defekt, hier nachsehen.
- **Spritpreise**: laut [AUFGABEN.md](AUFGABEN.md) komplett entfernt — aber Memory-Eintrag #170 zeigt noch doppelte Funktionsdefinitionen im Code (Stub + aktive async-Version). Bei Touch in diesem Bereich: Status verifizieren.
- **`FamilienApp-Starten.bat` Pfad**: zeigt auf alten Ordnernamen `alleinerziehende Eltern app` — funktioniert nur, solange dieser Pfad existiert oder der Symlink stimmt.

## Was schon umgesetzt ist (nicht doppelt bauen!)
Vor neuen Features prüfen — laut [AUFGABEN.md](AUFGABEN.md) v11 ist Folgendes bereits drin:
- Anträge aller 16 Bundesländer (Wohngeld, Kita, Unterhaltsvorschuss, BAföG, Bildungsgutschein, …).
- Budget-Rechner mit Ampel.
- Vertragswechsel (Strom, KfZ, Haftpflicht, Krankenkasse, Internet, Rundfunk, Abos).
- Overpass-Umgebungssuche mit 19 Kategorien + Routenplaner (Auto/Fahrrad/Fuß).
- Wohnungssuche mit Bildern, Kalender + Feiertage/Ferien, Familienmitglieder, Erinnerungen.
- 30+ Urlaubsangebote, Jobportal, Gutscheine, Gerichtsschreiben, regionale News (16 Länder).
- To-Do, Einkaufsliste, Essensplaner, Rezepte (deutsch + TheMealDB), Kochbuch.
- Schwangerschaft (Wochen/Stillen/Vorsorge), Hausaufgaben Klasse 1-12.
- Symptom-Check mit Körperteilen + Sprach-Eingabe.
- Bastelideen mit YouTube-Suche, stündliche Motivationssprüche.
- Dashboard frei konfigurierbar (12 Bereiche, Reihenfolge per ↑↓).

## Lessons (aus Vorgänger-Sessions)
- **Nichts doppelt bauen**: vor neuem Feature immer `Grep` durch `js/app.js` + `js/data.js`.
- **Cache-Bump vergessen = User sehen alte Version** — der häufigste Fail nach Deploy.
- **Klammer-Balance prüfen** nach größeren Edits in `app.js`: `node --check js/app.js`.
- **Sprit-Feature-Entfernung war breit**: Code, CSS, data.js, Service-Worker, Suche, Impressum — bei "komplett entfernen"-Tasks immer überall greppen.
