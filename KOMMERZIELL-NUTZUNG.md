# 💼 FamilienApp kommerziell nutzen / verkaufen

## 1. Rechtliche Pflichten erfüllen ✓

Vor dem Verkauf MÜSSEN folgende Daten in der App eingetragen werden:

### Impressum (Pflicht nach §5 TMG)
Datei: `js/app.js` → Funktion `renderImpressum()` → Platzhalter ersetzen:
- `[Vor- und Nachname / Firma einfügen]`
- `[Straße und Hausnummer]`
- `[PLZ Ort]`
- `[Telefonnummer]`
- `[E-Mail-Adresse]`
- `[USt-IdNr.]` (falls vorhanden)

### Datenschutzerklärung (Pflicht nach DSGVO Art. 13)
Datei: `js/app.js` → Funktion `renderDatenschutz()` → Platzhalter im Abschnitt 1 + 7 ausfüllen.

**✓ Vorteil:** Diese App speichert ALLE Daten lokal — DSGVO-Compliance ist deutlich einfacher als bei Server-Apps.

### Haftungsausschluss
Bereits enthalten — kritisch für Gesundheits- und Rechtstipps. Sollte vor Verkauf von einem Anwalt geprüft werden!

---

## 2. Verkaufsmodell auswählen

Die App enthält bereits ein **Lizenz-Aktivierungs-System** (Premium-Modus):
- Kostenlose Basis-Version → einfache Nutzung
- Premium-Version mit Lizenz-Code → erweiterte Features

### Lizenz-Code-Format
`FAMILIE-XXXX-XXXX-YYYY` (YYYY = Jahr)
Validierung: Prüfsumme aus Code + Jahr (siehe `lizenzPruefen()` in `app.js`)

### Eigene Lizenz-Codes generieren
JavaScript-Funktion zum Generieren gültiger Codes:
```javascript
function lizenzCodeGenerieren(jahr = 2026) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let teile = ['', ''];
  do {
    teile = ['',''];
    for (let i=0; i<4; i++) teile[0] += chars[Math.floor(Math.random()*36)];
    for (let i=0; i<4; i++) teile[1] += chars[Math.floor(Math.random()*36)];
    const summe = (teile[0]+teile[1]).split('').reduce((s, c) => s + c.charCodeAt(0), 0);
    if (summe % 7 === jahr % 7) break;
  } while (true);
  return `FAMILIE-${teile[0]}-${teile[1]}-${jahr}`;
}
```

Speichern Sie verkaufte Codes + Käufer-E-Mail in einer einfachen Tabelle (Excel, Airtable).

---

## 3. App-Stores: Distribution

### Option A: Direkt-Verkauf via PWA (am einfachsten)
1. **App auf Netlify deployen** → permanente URL (z.B. `meine-familienapp.netlify.app`)
2. **Eigene Domain** kaufen (z.B. `familienapp.de` für 1-15 €/Jahr bei Strato/IONOS)
3. **Domain auf Netlify-URL umleiten** (DNS-Eintrag)
4. **Bezahlsystem** integrieren:
   - **Stripe Checkout** (am einfachsten, 1.4 % + 0.25 € pro Transaktion)
   - **PayPal Smart Buttons** (2.49 % + 0.35 € für EU)
   - **Gumroad** (10 % Provision, aber Komplettlösung inkl. Lizenz-Verteilung)
5. **Marketing**: Social Media, Google Ads, Vereine für Alleinerziehende

### Option B: Google Play Store (Android)
1. App auf Netlify deployen
2. Auf **PWABuilder.com** Ihre URL eingeben → Android-Paket bauen
3. Google Play Developer Account erstellen (einmalig 25 USD)
4. APK/AAB hochladen, Beschreibung, Screenshots
5. Review-Prozess: 2-3 Tage
6. Eigene Bezahlung über Google In-App Billing oder externe Lizenzcodes

### Option C: Apple App Store (iOS)
- Komplexer als Android
- Apple Developer Programm: 99 USD/Jahr
- PWABuilder kann auch iOS-Pakete erstellen
- Bezahlung: Apple In-App Purchases (15-30 % Provision)

### Option D: Microsoft Store (Windows)
- PWABuilder unterstützt Microsoft Store nativ
- Kostenlos für Einzelentwickler

---

## 4. Wichtige rechtliche Punkte

### News-Funktion ⚠️
Die App lädt RSS-Feeds von Tagesschau, Kicker, Spiegel etc. Beim **Klick** öffnet sich die Original-Website. Das ist OK.

**ABER:** Eine **kommerzielle Wiedergabe** kompletter Artikel (mit Volltext) wäre URHEBERRECHTSVERLETZUNG. Die App zeigt nur Schlagzeilen + 200 Zeichen Beschreibung — das ist gerade noch zulässig (Zitatrecht). Bei kommerzieller Distribution lieber:
- Auf Schlagzeilen-Anzeige reduzieren
- "Quelle: [Anbieter]" prominent
- Klick öffnet IMMER Original-Website

### Bilder
- Unsplash-Lizenz: ✓ kostenlose kommerzielle Nutzung
- Pexels-Lizenz: ✓ kostenlose kommerzielle Nutzung
- Eigene Familien-Fotos vom User: ✓ Eigentum des Users, lokal gespeichert

### Karten / OSM
- ODbL-Lizenz: ✓ kommerzielle Nutzung erlaubt mit Attribution "© OpenStreetMap-Mitwirkende"
- Bereits in App enthalten ✓

### Tankerkönig
- CC BY 4.0: ✓ kommerziell mit Attribution erlaubt
- Bei eigenem API-Key (kostenlos registrieren!): zuverlässige Daten

---

## 5. Empfohlene nächste Schritte

### Phase 1: Soft-Launch (1 Woche)
- [ ] Impressum + Datenschutz mit echten Daten ausfüllen
- [ ] Anwalt prüfen lassen (max. 200 € für Erst-Check)
- [ ] Auf Netlify deployen + eigene Domain
- [ ] 5-10 Beta-Tester finden (in Facebook-Gruppen für Alleinerziehende)
- [ ] Feedback einarbeiten

### Phase 2: Launch (Monat 1)
- [ ] Stripe oder Gumroad einrichten
- [ ] Premium-Funktionen erweitern (Cloud-Sync, mehr Rezepte, Analytics)
- [ ] Marketing: Social Media (Instagram, TikTok), kostenlose Pressemitteilung
- [ ] Erste Verkäufe → Lizenz-Codes manuell verschicken

### Phase 3: Skalierung (Monat 2-6)
- [ ] Google Play Store
- [ ] Microsoft Store
- [ ] Affiliate-Programm (10 % für Empfehlungen)
- [ ] Mehrere Sprachen (Englisch, Türkisch — große Zielgruppe)
- [ ] B2B: Verkauf an Beratungsstellen, Vereine

---

## 6. Geschätzte Kosten Start

| Posten | Kosten |
|---|---|
| Domain (1 Jahr) | 1-15 € |
| Hosting (Netlify Free) | 0 € |
| Anwalt (Impressum/Datenschutz prüfen) | 100-300 € |
| Google Play Account (einmalig) | 25 € |
| Apple Developer (1 Jahr) | 99 € (optional) |
| Stripe-Account | 0 € (Gebühren pro Transaktion) |
| **Gesamt Start (Minimum)** | **ca. 30-50 €** |

---

## 7. Realistische Einnahmen-Schätzung

**Zielgruppe:** ca. 1,5 Mio Alleinerziehende in Deutschland

Bei 0,1 % Marktdurchdringung über 12 Monate = 1500 zahlende Kunden × 9,99 € = **15.000 € Brutto**

Abzüglich:
- Stripe-Gebühren ~ 300 €
- Marketing ~ 500-2000 €
- Steuern (19 % USt) wenn nicht Kleinunternehmer

= ca. **8.000-12.000 € Netto** im ersten Jahr (realistisch)

---

## 8. Support & Updates

Empfehlung: Eine **Support-E-Mail** einrichten (z.B. support@familienapp.de) mit folgenden Standard-Antworten:
- Neuer Lizenz-Code (falls Code verloren)
- Datenrücksicherung anleiten
- Feature-Wünsche notieren
- Bug-Reports

**Kontakt-Punkte in App** (in Einstellungen) → "Hilfe / Support" → E-Mail-Link.
