# 👨‍👩‍👧 Familien-Kalender-Sync einrichten — 10 Minuten

Damit Mama, Papa und alle weiteren Familienmitglieder denselben Kalender auf ihren Handys sehen, brauchst du einen kleinen kostenlosen Server bei Cloudflare. **Einmaliger Setup pro Familie** — danach läuft alles automatisch.

## Was du brauchst

- E-Mail-Adresse
- 10 Minuten Zeit
- **Keine Kreditkarte!** Cloudflare-Free-Tier braucht nichts.

## Was du bekommst

- Kalender-Termine synchronisieren sich automatisch zwischen allen Familien-Handys
- 1.000 Termin-Änderungen pro Tag (mehr als genug)
- 100 % kostenlos auf Dauer (kein Trial, keine versteckten Kosten)

> **Wenn du den Wohnungs-Worker schon hast:** derselbe Cloudflare-Account reicht — du legst nur einen *zweiten* Worker an. Springe direkt zu Schritt 2.

---

## Schritt 1 — Cloudflare-Account erstellen

1. Gehe zu **https://dash.cloudflare.com/sign-up**
2. E-Mail + Passwort eingeben
3. E-Mail bestätigen (Link in der Mail klicken)

Fertig — du bist eingeloggt.

## Schritt 2 — KV-Namespace anlegen (Speicher für die Termine)

> Das ist der wichtige neue Schritt vs. Wohnungs-Worker. Termine müssen ja irgendwo gespeichert werden — KV ist Cloudflares kostenloser Mini-Datenspeicher.

1. Im Dashboard links auf **„Workers & Pages"** klicken
2. Im Untermenü auf **„KV"** klicken
3. Großer Button **„Create namespace"** (oder „Create a namespace")
4. Name eingeben: **`FAMILIEN_KV`** (genau so geschrieben, GROSSBUCHSTABEN)
5. **„Add"** klicken
6. Fertig — du siehst den Namespace in der Liste.

## Schritt 3 — Worker erstellen

1. Im Dashboard links auf **„Workers & Pages"** klicken
2. Falls noch nie genutzt: **Subdomain-Namen** wählen (z. B. `dein-name`)
   → das wird Teil deiner Worker-URL (z. B. `kalender.dein-name.workers.dev`)
3. Großer Button **„Create Worker"** (oder „Create application" → „Create Worker")
4. **Name vergeben**: z. B. `kalender` — der erscheint in der URL
5. **„Deploy"** klicken (default „Hello World" reicht erstmal)

## Schritt 4 — Code einfügen

1. Auf der Worker-Übersichtsseite **„Edit code"** klicken (Stift-Symbol oder Knopf rechts)
2. Den ganzen Inhalt aus **`kalender-worker.js`** (liegt im Projekt-Ordner) kopieren
3. Im Cloudflare-Code-Editor **alles markieren** (Strg + A) und **einfügen** (Strg + V)
4. Oben rechts **„Deploy"** klicken
5. Deine Worker-URL erscheint — sie sieht etwa so aus:
   ```
   https://kalender.dein-name.workers.dev
   ```
   → **Diese URL kopieren!**

## Schritt 5 — KV-Namespace an den Worker binden

> Das verbindet den Worker mit dem Speicher aus Schritt 2.

1. Beim Worker oben auf **„Settings"** klicken (Tab oben)
2. Linke Spalte: **„Variables & Secrets"** oder **„Bindings"**
3. Bei **„KV Namespace Bindings"** auf **„Add binding"** klicken
4. **Variable name** (linkes Feld): **`FAMILIEN_KV`** (genau so, GROSSBUCHSTABEN)
5. **KV namespace** (rechtes Feld): aus der Liste **`FAMILIEN_KV`** auswählen
6. **„Deploy"** klicken
7. Warten bis „Deployment successful" erscheint

## Schritt 6 — Test im Browser

Öffne im Browser:
```
https://kalender.dein-name.workers.dev/ping
```

Du solltest sehen: `{"ok":true,"ts":17...}` — wenn ja, läuft der Worker.

## Schritt 7 — In die App eintragen (Familien-Erst-Einrichtung)

> **Wichtig:** Dieser Schritt einmal auf einem Handy machen. Auf den anderen Handys genau denselben Code eintragen.

1. FamilienApp öffnen
2. Menü ☰ → ⚙️ **Einstellungen**
3. Bereich **„👨‍👩‍👧 Familien-Sync"** suchen
4. **Worker-URL einfügen** (die URL aus Schritt 4)
5. Auf **„Neuen Familien-Code erzeugen"** klicken
   → die App zeigt einen 6-stelligen Code, z. B. `H7K2M9`
6. **Diesen Code aufschreiben** oder per WhatsApp an alle Familienmitglieder schicken
7. **„Sync starten"** klicken — fertig.

Auf jedem anderen Familien-Handy:
- Schritte 1-4 wie oben
- Bei **„Familien-Code"** den **gleichen Code** eingeben, **NICHT** einen neuen erzeugen
- **„Sync starten"** — sofort sind alle Termine da.

---

## Wie es funktioniert (kurz)

- Jeder neue/geänderte/gelöschte Termin wird automatisch hochgeladen (verzögert ~2 Sekunden)
- Alle Familienmitglieder bekommen Updates beim Öffnen des Kalenders + automatisch alle 60 Sekunden
- Wenn 2 Personen gleichzeitig denselben Termin ändern, gewinnt die spätere Änderung
- Gelöschte Termine bleiben 30 Tage als „Tombstone" im System (damit Löschen auch ankommt, wenn ein Handy offline war)

## Datenschutz — was du wissen musst

- **Termine landen jetzt auch bei Cloudflare** — nicht mehr nur auf deinen Handys.
- Cloudflare-Server in Europa, DSGVO-konform.
- **Kein Login, nur dein 6-stelliger Familien-Code** — wer den Code kennt, sieht die Termine. **Daher: Code nur in der Familie weitergeben, nicht öffentlich teilen.**
- Wenn du das nicht willst: Sync in den Einstellungen deaktivieren — dann läuft alles wieder rein lokal.
- Möglichkeiten zum „Reset": Sync deaktivieren + neuen Code erzeugen → alte Termine in der Cloud bleiben unter dem alten Code; auf dein Wunsch löschbar (siehe „Worker pausieren / löschen" unten).

## Worker pausieren / löschen

Im Cloudflare-Dashboard → Workers → deinen Worker auswählen → „Delete" rechts oben.
Im Dashboard → KV → `FAMILIEN_KV` → „Delete" — entfernt auch alle Termine aus der Cloud.

## Kosten-Garantie

- **Free Tier hart begrenzt** — Cloudflare upgradet nicht automatisch.
- Bei Überschreitung von 1.000 Termin-Änderungen / Tag → Sync pausiert 24 h, **keine Kosten**.
- Für eine Familie reicht das Limit für **viele Jahre**.

## Wenn was nicht klappt

- **`/ping` antwortet mit Fehler** → Schritt 4 nicht abgeschlossen (Code nicht deployed)
- **`Sync` zeigt „⚠️ Offline"** → Worker-URL falsch oder KV nicht gebunden (Schritt 5 prüfen)
- **`{ok:false,fehler:"KV-Namespace FAMILIEN_KV nicht gebunden"}`** → Schritt 5 noch nicht gemacht
- **Termine kommen nicht an** → auf allen Geräten *exakt* denselben Code prüfen (Groß-/Kleinschreibung egal, aber Tippfehler nicht)
