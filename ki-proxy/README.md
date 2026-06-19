# FamilienApp — KI-Server (Proxy)

Damit du die App **verkaufen** kannst, darf der Gemini-Schlüssel **nicht** in der App liegen
(sonst könnte ihn jeder Nutzer auslesen). Dieser kleine Server hält den Schlüssel geheim:
die App ruft nur den Server, der Server ruft Google.

**Kosten:** Vercel-Hosting ist kostenlos. Du zahlst nur die Gemini-Nutzung deiner Nutzer
(Gemini Flash ist sehr günstig; für den Anfang reicht oft das Gratis-Kontingent).

## Einrichtung (einmalig, ~5 Minuten)

1. **Gemini-Schlüssel holen:** https://aistudio.google.com/apikey
2. **Vercel-Konto** anlegen (kostenlos, mit GitHub-Login): https://vercel.com
3. **Diesen Ordner deployen:**
   - Einfachster Weg: `npm i -g vercel` → im Ordner `ki-proxy/` den Befehl `vercel` ausführen und den Schritten folgen.
   - Oder: in Vercel „New Project" → dieses Repo importieren → **Root Directory** auf `ki-proxy` setzen.
4. **Schlüssel als ENV-Variable hinterlegen:**
   Vercel → Project → Settings → Environment Variables →
   `GEMINI_API_KEY = dein_schlüssel` → speichern → **neu deployen**.
5. **Deine Proxy-URL** lautet dann z. B. `https://dein-projekt.vercel.app/api/gemini`.

## In der App aktivieren

Zwei Wege:

- **Dauerhaft für alle Nutzer (Verkauf):** in `js/app.js` die Konstante
  `KI_PROXY_DEFAULT` auf deine Proxy-URL setzen, App neu ausliefern (Cache-Version hochzählen).
- **Schnell zum Testen:** in der App unter Einstellungen → KI-Assistent → „Erweitert" die
  Proxy-URL eintragen (wird nur auf diesem Gerät gespeichert).

## Sicherheit

- Sobald die App live ist: in `api/gemini.js` `ERLAUBTE_ORIGINS` von `['*']` auf deine
  Domain einschränken, z. B. `['https://marcel-fe.github.io']`.
- Für den Produktivbetrieb empfiehlt sich später ein einfacher Rate-Limit / Missbrauchsschutz.

> Dieser Ordner ist **kein** Teil der ausgelieferten App (GitHub Pages). Er wird separat zu Vercel deployt.
