# Instagram Account & API Setup

Schritt-für-Schritt-Anleitung, um den FamilienApp-Account so einzurichten, dass dieser Bot Reels automatisch hochladen darf. Plane **ca. 1 Stunde** ein — die meisten Schritte sind einmalig.

---

## Teil 1 — Instagram-Account erstellen (5 Minuten)

1. Instagram-App öffnen oder [instagram.com](https://www.instagram.com) → **Registrieren**.
2. Username-Vorschläge:
   - `familienapp.de`
   - `dein.familien.alltag`
   - `familienapp_official`
3. Profilbild: dein App-Icon (aus `icons/` im Hauptordner).
4. Bio (Beispiel):
   > 👨‍👩‍👧‍👦 Alles für deine Familie — in einer App.
   > 💸 Zuschüsse, Anträge, Tipps, Rezepte.
   > 👇 Jetzt kostenlos
5. Link im Profil: deine aktuelle App-URL (aus `AKTUELLE-APP-URL.txt`).

## Teil 2 — Auf Business-Konto umstellen (2 Minuten)

Pflicht für automatisches Posten via API. Komplett kostenlos.

1. Instagram → Profil → **☰** → **Einstellungen und Datenschutz**.
2. **Kontotyp und Tools** → **Auf professionelles Konto umstellen**.
3. Kategorie wählen: **App-Seite** (oder **Familien-Service**).
4. **Business** (nicht Creator) auswählen.

## Teil 3 — Facebook-Seite erstellen und verknüpfen (10 Minuten)

Instagram-API braucht eine zugehörige Facebook-Seite — Meta-Vorgabe, kein Umgehen.

1. [facebook.com](https://www.facebook.com) → links **Seiten** → **Neue Seite erstellen**.
2. Name: **FamilienApp** (oder gleicher Name wie auf IG).
3. Kategorie: **App-Seite**.
4. Erstellen → Profilbild + Cover hochladen.
5. **Einstellungen** → **Verbundene Konten** → **Instagram** → **Konto verbinden**.
6. Mit deinem IG-Business-Account einloggen → Verbindung bestätigen.

## Teil 4 — Meta Developer App registrieren (15 Minuten)

Damit dein Bot die API nutzen darf.

1. [developers.facebook.com](https://developers.facebook.com) → mit Facebook-Konto einloggen.
2. **Meine Apps** → **App erstellen**.
3. App-Typ: **Business** wählen.
4. Anzeigename: `FamilienApp Bot` — App-Kontakt-Email: deine Email.
5. **Produkte hinzufügen** → **Instagram Graph API** → **Einrichten**.
6. Im linken Menü: **App-Überprüfung** → **Berechtigungen und Funktionen**.
7. Folgende Berechtigungen anfordern:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_show_list`
   - `pages_read_engagement`

> ⚠️ Erste Tests funktionieren auch **ohne App-Review**, solange dein eigener Account als „Testbenutzer" eingetragen ist. Bei „App-Rollen" → „Tester" deinen Facebook-Account hinzufügen. Für Live-Betrieb (mehr als ~25 Test-Posts) brauchst du App-Review — Meta dauert 1-7 Tage.

## Teil 5 — Access Token holen (10 Minuten)

1. [developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer/).
2. Oben rechts: deine App auswählen.
3. **User Access Token** anfragen mit Permissions: `instagram_basic`, `instagram_content_publish`, `pages_show_list`, `pages_read_engagement`.
4. **Generate Access Token** → Login bestätigen.
5. Du bekommst einen **Short-Lived Token** (gültig 1h).

### Token verlängern (auf 60 Tage)
Im Browser folgende URL aufrufen — `{APP_ID}`, `{APP_SECRET}` (aus App-Einstellungen → Grundlegend) und `{SHORT_TOKEN}` ersetzen:

```
https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id={APP_ID}&client_secret={APP_SECRET}&fb_exchange_token={SHORT_TOKEN}
```

Das gibt einen **Long-Lived Token** (60 Tage). Den verwendest du in `.env`.

> 💡 Token läuft nach 60 Tagen ab → musst du erneuern. Setze dir eine Erinnerung im Familien-Kalender.

## Teil 6 — IG Business Account ID finden

Im **Graph API Explorer** folgenden Call absetzen:

```
GET /me/accounts
```

Du siehst deine Facebook-Seiten. Notiere die `id` deiner FamilienApp-Seite.

Dann:

```
GET /{PAGE_ID}?fields=instagram_business_account
```

Antwort enthält `instagram_business_account.id` — **das** ist deine `IG_BUSINESS_ID`.

## Teil 7 — Video-Hosting einrichten

Instagram lädt das Video **per HTTPS-URL** — du kannst keine lokale Datei direkt hochladen. Optionen:

### Option A: Cloudflare R2 (empfohlen — kostenlos bis 10 GB/Monat)
1. [cloudflare.com](https://www.cloudflare.com) → R2 → Bucket erstellen.
2. Eigene Domain dranhängen (z.B. `cdn.familienapp.de`).
3. Pro Reel: Datei hochladen → URL ist `https://cdn.familienapp.de/<slug>/reel.mp4`.

### Option B: Cloudflare Tunnel (du nutzt das schon!)
Während das Tunnel läuft, ist alles unter `http://localhost:8000` öffentlich. Du kannst also dein `instagram-bot/output/` über den **gleichen Tunnel** ausliefern — Bot-Ordner einfach in den Web-Root verschieben oder symbolisch verlinken.

> ⚠️ Tunnel-URL wechselt bei jedem Start → `.env` jedes Mal aktualisieren. Für ernsthaften Betrieb: feste Domain.

### Option C: Imgur / File-Sharing
Funktioniert technisch, aber unzuverlässig — Instagram lehnt manchmal externe Hoster ab.

## Teil 8 — .env Datei anlegen

Im `instagram-bot/` Ordner: Kopiere `.env.example` zu `.env`:

```
copy .env.example .env
```

Werte eintragen:

```
IG_ACCESS_TOKEN=EAAB...   <- Long-Lived Token aus Teil 5
IG_BUSINESS_ID=17841...   <- aus Teil 6
VIDEO_PUBLIC_BASE=https://cdn.familienapp.de/reels   <- aus Teil 7
```

## Teil 9 — Erster Test

```
cd instagram-bot
node generate-video.mjs kindergeld-antrag
```

Wenn das Video in `output/<datum>_kindergeld-antrag/reel.mp4` liegt:
1. Datei zu deinem Hoster hochladen (Pfad muss exakt `<slug>/reel.mp4` sein).
2. `node post-to-instagram.mjs <datum>_kindergeld-antrag`
3. Bestätigen → fertig.

---

## Limits & Hinweise (wichtig!)

- Instagram erlaubt **25 API-Posts pro 24h** pro Account.
- Reels: 9:16 (1080×1920) ✓ — unser Template ist exakt das Format.
- Maximale Reel-Länge: 90s. Unsere sind ~18s — Sweet Spot für Engagement.
- Die `caption.txt` darf maximal 2200 Zeichen haben. Mit Hashtags zählen.
- Maximum 30 Hashtags pro Post. Wir nutzen ~8 — passt.

## Token-Probleme?

- **„Invalid OAuth access token"** → Token abgelaufen, neu generieren (Teil 5).
- **„The user is not an Instagram Business Account"** → Account ist noch privat oder Creator, nicht Business (Teil 2).
- **„The Instagram account is not connected to a Facebook Page"** → Teil 3 nicht abgeschlossen.

## Strategie-Tipps für Reichweite

Tech alleine bringt keine Reichweite. Plan:

1. **Erste 30 Tage**: nicht posten, sondern beobachten. Welche Konkurrenz-Accounts (mom-bloggers, familie-tipps) sind groß? Was funktioniert dort?
2. **Posting-Frequenz**: 1× pro Tag, 18-20 Uhr (Familien-Prime-Time).
3. **Hashtag-Mix**: 3 große (#mamaleben, 1M+), 3 mittlere (#familienapp, 50k), 2 nische (#alleinerziehend, 10k).
4. **Engagement**: jedes Reel hat einen Hook in der ersten Sekunde — wir machen das mit der Frage.
5. **Story-Wiederverwendung**: Reels nach Posting auch als Story re-teilen. Doppelt Reichweite.
6. **Comments**: Frage am Ende der Caption („Welcher Tipp fehlt dir? 👇") → Engagement-Booster.
7. **Verlinkung**: nach 10k Follower kannst du Link-Sticker in Stories nutzen — direkte App-Downloads.
