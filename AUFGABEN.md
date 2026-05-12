# FamilienApp – Aufgabenliste

> Quelle: Extraktion aus Session `fc987670…jsonl` (04.05. – 09.05.2026)
> Stand: 11.05.2026

## ✅ Heute erledigt (11.05.2026)

1. **Spritpreise komplett entfernt** — Sektion, Render-Funktionen, State, CSS, `SPRIT_PORTALE` in data.js, Service-Worker-Cache, Suche-Eintrag, Tipps-Kategorie "Tanken günstig", Spritpreis-Quellen-Block im Impressum, Hinweise im Tankstellen-Marker
2. **Splash/Login-Bild** — Pexels 7282818 (umstrittenes Einzelbild) ersetzt durch Pexels 3933027 (Familienfoto). CSS-Variable `--familien-foto` führt dazu, dass User-Upload auf Splash und Login durchschlägt — wird beim Laden direkt aus localStorage angewendet, also schon vor dem Splash-Anzeigen sichtbar
3. **Foto-Upload repariert** — `alert()` durch `toast()` ersetzt, MIME-Check für Bilddateien, Reader-Error-Handler, Familienfoto wird sofort als CSS-Variable auf Splash/Login/Reg-Overlay angewendet
4. **Einstellungen-Speichern** — bereits stabil (try/catch + Quota-Erkennung + Toast), kein Fix nötig
5. **Restaurants in Umgebung** — Popup und Sidebar zeigen jetzt: Küche (`cuisine`), Öffnungszeiten (`opening_hours`), Telefon (`tel:`-Link), Website (`website` + `contact:website`), Speisekarten-Link (`menu:url` direkt oder Google-Suche „[Name] [Stadt] Speisekarte")
6. **Freizeit** — Ausflugs-Kategorien führen zur Live-Karte mit haversine-Sortierung; Bastelideen haben je einen YouTube-Suchlink für Video-Anleitungen (bereits vorhanden)
7. **Dashboard frei konfigurierbar** — Limit von 6 auf **12 Bereiche** erhöht, **8 neue Bereiche** zur Auswahl hinzugefügt (News, Basteln, Hausaufgaben, Schwangerschaft, Recht, To-do, Kochbuch, Symptome, Essensplan, Checklisten, Tipps). **Reihenfolge anpassbar** via ↑↓-Buttons + ×-Entfernen-Button in den Einstellungen
8. **Gesundheit/Haushalt** — Bestand geprüft: **659 Tipps** in 30 Kategorien (Fieber, Bauch, Erkältung, Kopf, Schlaf, Verbrennungen, Insekten, Haut, Zähne, Augen, Erste Hilfe, Rücken, Ohren, Ernährung, Geld, Mental, Auto, Immunsystem, Küche, Schule, Haustiere, Wäsche, Garten, Kinder, Senioren, Saison, Fitness, Haushalt) — übersteigt die Zielmarke deutlich

## 🔧 Verifikation

- `node --check` auf `js/app.js`, `js/data.js`, `sw.js` → **All OK**
- Klammer-Balance: `app.js {/} 3701/3701, (/) 4091/4091` — 0/0 Diff
- Keine Sprit-Referenzen mehr (`grep` über `*.html|*.css|*.js|*.json` ergibt 0 Treffer)

## 🟢 Bereits umgesetzt (aus Vorgängersession)

App enthält bereits umfangreich: PWA-Manifest, Service Worker, Offline-Fähigkeit, Cloudflare Tunnel, Anträge für alle Bundesländer (Wohngeld, Kita-Zuschuss, Unterhaltsvorschuss, BAföG, Bildungsgutschein, Rentenauskunft, Beratungshilfe, Haushaltshilfe, Unterhaltstitel), Budgetrechner mit Ampel, Vertragswechsel (Strom, KfZ, Haftpflicht, Krankenkasse, Internet, Rundfunk, Abos), Umgebungssuche (Overpass + Nominatim, 19 Kategorien), Routenplaner, Wohnungssuche mit Bildern, Kalender mit Feiertagen/Ferien, Familienmitglieder, Erinnerungen, 30+ Urlaubsangebote, Jobportal, Gutscheine, Gerichtsschreiben, News (allgemein + 16 Bundesländer), To-do-Liste, Einkaufsliste, Essensplaner, Rezepte (deutsch + TheMealDB), Kochbuch, Schwangerschaft (Wochen, Stillen, Vorsorge), Hausaufgaben Klasse 1–12, Symptome (Körperteile + Sprach-Eingabe), Bastelideen mit YouTube-Videos, Veranstaltungen, stündliche Motivationssprüche.
