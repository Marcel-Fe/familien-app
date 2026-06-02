# FamilienApp Instagram-Bot

Generiert automatisch animierte Reels (1080×1920, 9:16) für den FamilienApp-Instagram-Account: eine kleine animierte Familie (Mama, Papa, Kind, Baby) erklärt täglich ein anderes Familien-Problem und verweist auf die App.

**Stil**: 2D Flat-Illustration mit konsistenten Charakteren — gleicher Look in jedem Video.

**Pipeline** (kostenlos, ohne AI-Service-Abos):
1. Thema aus [topics.json](topics.json) (30 vorgefertigte, leicht erweiterbar).
2. Deutsche TTS via Microsoft Edge-TTS (gratis, klingt sehr natürlich).
3. HTML/CSS-Animation gerendert per Puppeteer.
4. ffmpeg packt Frames + Audio zu MP4.
5. Manueller Klick → Upload via Instagram Graph API.

---

## Erstmaliger Setup (einmalig, ~15 min)

### 1) Dependencies installieren

```
cd instagram-bot
npm install
pip install edge-tts mutagen
```

### 2) Test-Lauf (ohne Instagram)

```
node generate-video.mjs kindergeld-antrag
```

Beim ersten Lauf braucht es **2-3 Minuten** (Edge-TTS lädt Stimm-Modelle einmal, ffmpeg-Encode dauert).

Ergebnis liegt in `output/2026-05-12_kindergeld-antrag/reel.mp4`. Anschauen, prüfen.

### 3) Instagram-Setup

Sobald das Video gut aussieht, folge [INSTAGRAM-SETUP.md](INSTAGRAM-SETUP.md) — Schritt für Schritt zum Business-Account, Meta-App, Access-Token, Video-Hosting.

---

## Tägliche Nutzung

### Ein Video generieren

```
node generate-video.mjs                      # zufälliges Thema
node generate-video.mjs schwanger-app        # bestimmtes Thema
node generate-video.mjs --list               # alle 30 Themen anzeigen
```

### Posten (mit Bestätigung)

```
node post-to-instagram.mjs 2026-05-12_schwanger-app
```

Zeigt dir Caption und Video-URL, fragt: „Veröffentlichen? [j/n]".

### Vollautomatisch posten

```
node post-to-instagram.mjs 2026-05-12_schwanger-app --auto
```

Ohne Rückfrage. **Vorsicht**: erst nutzen wenn du sicher bist dass die Pipeline stabil läuft.

---

## Neue Themen hinzufügen

Editiere [topics.json](topics.json) — füge ein neues Objekt zum `topics`-Array hinzu:

```json
{
  "id": "mein-thema",
  "kategorie": "alltag",
  "hook": "Hook-Satz mit Spannung. Höchstens 1 Satz.",
  "problem": "Das Problem in 1-2 Sätzen.",
  "loesung": "Wie die FamilienApp hilft.",
  "cta": "Call to Action: App-Download.",
  "hashtags": ["#tag1", "#tag2", "#familienapp"],
  "scene": "wohnzimmer"
}
```

**Wichtig**:
- `scene` muss eins von `wohnzimmer | kueche | kinderzimmer | park | buero` sein.
- Texte kurz halten — die TTS spricht jeden Satz, lange Sätze → langes Video.
- Höchstens 4-5 Sekunden pro Segment → optimal für Instagram-Aufmerksamkeit.

---

## Charaktere ändern

Die Familie ist als SVG in [templates/scene.html](templates/scene.html) (Abschnitt `<!-- FAMILY CHARACTERS -->`).

Anpassbar:
- Hautfarbe: `fill="#F2C39A"` an Head/Neck/Hands.
- Haarfarbe: `fill="#6B3F1D"`.
- Kleidung: Pfad-Color der Body-Form.

Wenn du **mehr Vielfalt** willst (z.B. Großeltern, Geschwister, andere Hauttöne) → ich erweitere das gerne.

---

## Wie sieht ein Video aus?

**Format**: 1080×1920 (Instagram Reels)
**Dauer**: ca. 18-22 Sekunden
**Aufbau** (4 Akte):

1. **Hook** (3-5s) — Mama spricht in die Kamera, klare Problem-Frage.
2. **Problem** (4-5s) — Papa erklärt das Problem detaillierter.
3. **Lösung** (4-5s) — Mama präsentiert die App-Lösung.
4. **CTA** (3-4s) — Aufruf zum Download.
5. **Outro** (3s) — FamilienApp-Logo + „Jetzt kostenlos laden".

---

## Bekannte Limits

- **Rendering-Zeit**: ca. 1-2 Minuten pro Video (540 Frames + Audio + ffmpeg).
- **Charakter-Konsistenz**: durch SVG perfekt — gleiche Familie in jedem Video.
- **Sprech-Animation**: simpler Mund auf/zu, keine echte Lippen-Sync. Für Instagram absolut ausreichend, niemand schaut Reels mit Ton zu Hause genau hin.
- **Eine Szene pro Video**: alle 4 Akte spielen am gleichen Ort. Wenn du Szenen-Wechsel willst → Erweiterung möglich, ich baue gern dran.

---

## Wenn was nicht klappt

| Problem | Lösung |
|---------|--------|
| `edge_tts ist nicht installiert` | `pip install edge-tts mutagen` |
| `Chrome/Edge nicht gefunden` | In `.env`: `CHROME_PATH=C:\Pfad\zu\chrome.exe` |
| Video schwarz | Puppeteer-Render hat Frames nicht erfasst → `KEEP_FRAMES=1 node generate-video.mjs <id>` → in `output/*/frames/` schauen |
| TTS klingt komisch | Stimme wechseln in `generate-video.mjs`: `de-DE-KatjaNeural` ↔ `de-DE-AmalaNeural` ↔ `de-DE-SeraphinaMultilingualNeural` (alle Microsoft, gratis) |
| Instagram lehnt Upload ab | Reel zu kurz/lang? Account noch nicht Business? Token abgelaufen? → INSTAGRAM-SETUP.md, Abschnitt "Token-Probleme" |

---

## Roadmap (wenn Stufe 1 läuft, wir können erweitern)

- **Stufe 2**: bessere AI-Sprecher (ElevenLabs) für emotionalere Stimme — ~20€/Monat.
- **Stufe 3**: AI-generierte Hintergrund-Szenen (Midjourney/Sora) für visuelle Abwechslung — ~50€/Monat.
- **Stufe 4**: Vollautomatisches Posting per Cron-Job (täglich 18 Uhr) + Performance-Tracking.
- **Stufe 5**: A/B-Tests verschiedener Hooks, Hashtag-Optimierung basierend auf echten Insights.
