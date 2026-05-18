# Lessons

## Externe Links: iframe-Einbettung scheitert bei großen Seiten (v51)
**Problem**: Die Speisekarte (und „Route planen") wurde nicht angezeigt — leeres weißes Fenster.
**Ursache**: Der globale Klick-Handler leitet *jeden* `target="_blank"`-Link in ein In-App-iframe-Modal um.
Große Seiten (Google, Facebook, Instagram, Maps, Lieferando …) verbieten das Einbetten per
`X-Frame-Options` / CSP. Der Browser feuert für die blockierte Seite trotzdem ein `load`-Event —
dadurch wurde die Fehlererkennung (Timeout) ausgehebelt und das Modal blieb leer.
**Fix**: Host-Denylist `IFRAME_BLOCKLIST` + `hostBlocktIframe()`. Solche Hosts werden direkt
im echten Browser (`linkOeffnen`) geöffnet statt im iframe. Zusätzlich tragen die
Speisekarte-/Routen-Links `data-extern="1"`, damit sie das iframe garantiert umgehen.
**Lehre**: Ein iframe-Modal ist nur für kleine/eigene Seiten zuverlässig. Externe Dienste
immer im System-Browser öffnen — ein `load`-Event ist KEIN Beweis, dass die Seite sichtbar ist.
