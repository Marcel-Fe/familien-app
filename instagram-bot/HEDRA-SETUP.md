# Hedra Character-3 Setup

Hedra macht aus einem **Bild + Audio** ein animiertes Video, wo die Figur spricht, blinzelt und Mimik zeigt — mit Pixar-Qualität.

## Was du als User machen musst

### 1. Account anlegen
- Gehe auf https://www.hedra.com
- Klick "Sign up" oben rechts
- Login per Google oder Email
- Free Plan reicht zum Starten

### 2. API-Key besorgen
- Eingeloggt → oben rechts auf dein Profilbild → **Settings**
- Im linken Menü: **Developer** oder **API Keys**
- Klick **"Create API Key"** oder **"Generate"**
- **Kopiere den Key sofort** (er wird nur einmal angezeigt)
- Sieht aus wie: `sk-hedra-xxxxxxxxxxxxxxxxxxxxxxxx`

### 3. Free-Tier Limits prüfen
- Eingeloggt → **Billing** oder **Plans**
- Schau wieviel Credits du im Free Plan hast (typisch: 400/Monat)
- Ein 30-Sekunden-Video kostet ~50-100 Credits
- → ca. 5-8 Videos im Free Plan, dann ~10€/Monat für Pro

### 4. Key in Projekt eintragen

Erstelle eine Datei `.env` im Ordner `instagram-bot/`:

```
HEDRA_API_KEY=sk-hedra-deinkeyhier
```

(Die Datei nicht in Git committen — `.gitignore` ist schon eingerichtet.)

## Was ich danach baue

Sobald du den API-Key hast und mir das sagst, baue ich:

1. **`hedra.mjs`** — Helper-Modul für die API (Audio + Bild → animiertes Sprech-Video)
2. **`generate-hedra-video.mjs`** — Alternative Pipeline:
   - Pixar-Bilder generieren (wie bisher mit Pollinations)
   - TTS pro Segment (wie bisher mit Seraphina)
   - Pro Segment: Bild + Audio → Hedra → Sprech-Video
   - 4 Sprech-Videos + Outro → MP4 mit Crossfades
3. **Erweiterte Setup-Anleitung** wenn API-Calls echt funktionieren

## Geschätzte Render-Zeit pro Video

- Bilder via Pollinations: ~1-2 Min (4 Bilder)
- TTS via Edge-TTS: ~10s
- Hedra-Render pro Segment: ~30-90s (je nach Server-Last)
- 4 Segmente parallel: ~2-3 Min insgesamt
- ffmpeg-Concat + Outro: ~30s
- **Gesamt: ~5-7 Min pro Video**

## Wichtige Hinweise

- Hedra Character-3 wurde 2025 released, ihre API kann sich noch ändern
- Falls API-Aufrufe scheitern: ich passe den Code basierend auf echten Antworten an
- Falls Free-Tier aufgebraucht: Pro-Plan ist ~10-30€/Monat
- Hedra hat Wasserzeichen im Free-Tier (kleiner Schriftzug unten rechts) — Pro-Plan ohne

## Nächster Schritt

Schicke mir deinen Hedra-API-Key per Chat (NICHT im Git-Commit!), und ich baue die Integration.
