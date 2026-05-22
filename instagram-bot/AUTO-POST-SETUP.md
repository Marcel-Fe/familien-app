# Auto-Posting einrichten

Der Bot kann fertige Reels **vollautomatisch** auf Instagram posten — ein Reel pro
Tag, abends, zu einer leicht zufälligen Uhrzeit (wirkt natürlich, nicht wie eine
Maschine). Diese Anleitung schaltet das ein.

> **Reihenfolge:** Erst die einmalige Instagram-/API-Einrichtung aus
> [INSTAGRAM-SETUP.md](INSTAGRAM-SETUP.md) komplett abschließen. Ohne `.env`
> kann nichts posten.

---

## Wie es funktioniert

- `auto-post.mjs` sucht in `output/` das **älteste fertige, noch nicht gepostete**
  Reel und lädt es über `post-to-instagram.mjs` (offizielle Instagram-API) hoch.
- Es postet **genau ein Reel pro Aufruf** und merkt sich in `post-state.json`,
  was schon online ist — kein Doppel-Posten.
- Vor dem Posten wartet es einen **zufälligen Versatz von 0–25 Minuten**. Die
  Aufgabenplanung startet also z. B. 18:00 Uhr, das Reel erscheint 18:00–18:25 Uhr.
- Alles wird in `auto-post.log` protokolliert. Läuft der Token bald ab, steht
  eine Warnung im Log.

## Befehle zum Testen (von Hand)

```
cd instagram-bot
node auto-post.mjs --status     Warteschlange + Verlauf ansehen
node auto-post.mjs --dry-run    zeigt, welches Reel als Nächstes käme
node auto-post.mjs --now        sofort posten, ohne Wartezeit
node auto-post.mjs              normaler Lauf (mit 0–25 Min Versatz)
```

**Empfehlung:** Den allerersten Post mit `--now` von Hand auslösen und auf
Instagram kontrollieren, ob alles stimmt (Video, Caption, Hashtags). Erst danach
die tägliche Automatik einschalten.

## Tägliche Automatik einschalten (Windows-Aufgabenplanung)

Diesen Befehl **einmal** in PowerShell ausführen (passt die Uhrzeit per `/ST` an):

```
schtasks /Create /TN "FamilienApp Reel Auto-Post" /TR "C:\Users\admin\Desktop\Familien app\instagram-bot\auto-post-taeglich.bat" /SC DAILY /ST 18:00
```

Damit läuft `auto-post-taeglich.bat` jeden Tag um 18:00 Uhr (+ Zufallsversatz).

Verwalten:

```
schtasks /Run    /TN "FamilienApp Reel Auto-Post"    sofort testen
schtasks /Delete /TN "FamilienApp Reel Auto-Post"    Automatik wieder ausschalten
```

## Wichtige Grenzen — bitte beachten

- **Der PC muss laufen.** Es gibt keinen Server. Ist der Rechner um 18:00 Uhr aus,
  wird an dem Tag nichts gepostet (die Aufgabenplanung holt es standardmäßig nicht
  nach).
- **Video-Hosting muss stehen.** Instagram lädt das Video per HTTPS-Link. Das Reel
  muss vorher unter `VIDEO_PUBLIC_BASE/<slug>/reel.mp4` öffentlich erreichbar sein
  (siehe [INSTAGRAM-SETUP.md](INSTAGRAM-SETUP.md) Teil 7, empfohlen: Cloudflare R2).
  `auto-post.mjs` lädt das Video **nicht** selbst hoch.
- **Token läuft alle 60 Tage ab.** Dann neu erzeugen (INSTAGRAM-SETUP.md Teil 5).
  Das Skript warnt 7 Tage vorher im Log.
- **Neuer Account = vorsichtig starten.** Einen brandneuen Account nicht ab Tag 1
  vollautomatisch bespielen. Die ersten 1–2 Wochen von Hand posten, dann erst die
  Aufgabenplanung einschalten.
- **Warteschlange befüllen:** Die Automatik postet nur, was schon gerendert ist.
  Regelmäßig `node render-batch.mjs <topics...>` laufen lassen, damit immer
  Nachschub da ist.
