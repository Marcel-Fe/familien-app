// Alle 16 Bundesländer mit länderspezifischen Links
const BUNDESLAENDER = [
  {
    id: 'bw', name: 'Baden-Württemberg', kurz: 'BW',
    links: {
      wohngeld:      { url: 'https://www.service-bw.de/zufi/leistungen/5000451', text: 'Wohngeld beantragen' },
      kita:          { url: 'https://www.service-bw.de/zufi/leistungen/5000050', text: 'Kita-Beitrag & Förderung' },
      jugendamt:     { url: 'https://www.service-bw.de/zufi/leistungen/5000272', text: 'Unterhaltsvorschuss BW' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-bw/startseite', text: 'Jobcenter BW' },
      familienportal:{ url: 'https://www.familienportal.de', text: 'Bundesfamilienportal' },
      wohnungsbau:   [{ url: 'https://www.bwwohnbau.de', text: 'BW-Wohnbau' }, { url: 'https://www.swsg.de', text: 'SWSG Stuttgart' }]
    },
    besonderheiten: ['Landeserziehungsgeld bis 24 Monate', 'Kita-Zuschuss über Jugendamt', 'Familienticket ÖPNV möglich']
  },
  {
    id: 'by', name: 'Bayern', kurz: 'BY',
    links: {
      wohngeld:      { url: 'https://www.freistaat.bayern/dokumente/aufgabe/wohngeld-antrag-stellen', text: 'Wohngeld Bayern' },
      kita:          { url: 'https://www.stmas.bayern.de/kinderbetreuung/foerderung/', text: 'Kita-Förderung Bayern' },
      jugendamt:     { url: 'https://www.stmas.bayern.de/jugendhilfe/unterhaltsvorschuss/', text: 'Unterhaltsvorschuss Bayern' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-by/startseite', text: 'Jobcenter Bayern' },
      familienportal:{ url: 'https://www.stmas.bayern.de/familie/', text: 'Familienportal Bayern' },
      wohnungsbau:   [{ url: 'https://www.stadtbau.de', text: 'Stadtbau GmbH München' }, { url: 'https://www.gfz.de', text: 'GWG München' }]
    },
    besonderheiten: ['Bayerisches Familiengeld (250 €/Kind ab 3. Lebensjahr)', 'Landeserziehungsgeld Bayern', 'BayernKindergeldPlus möglich']
  },
  {
    id: 'be', name: 'Berlin', kurz: 'BE',
    links: {
      wohngeld:      { url: 'https://service.berlin.de/dienstleistung/120486/', text: 'Wohngeld Berlin' },
      kita:          { url: 'https://www.berlin.de/sen/jugend/familie-und-kinder/kindertagesbetreuung/', text: 'Kita Berlin (beitragsfrei)' },
      jugendamt:     { url: 'https://service.berlin.de/dienstleistung/324614/', text: 'Unterhaltsvorschuss Berlin' },
      jobcenter:     { url: 'https://www.jobcenter.berlin.de', text: 'Jobcenter Berlin' },
      familienportal:{ url: 'https://www.berlin.de/sen/jugend/familie-und-kinder/', text: 'Familienportal Berlin' },
      wohnungsbau:   [{ url: 'https://www.stadtentwicklung.berlin.de/wohnen/', text: 'Wohnraumversorgung Berlin' }, { url: 'https://www.degewo.de', text: 'DEGEWO' }]
    },
    besonderheiten: ['Kita ab 1. Lebensjahr beitragsfrei', 'Wohnberechtigungsschein (WBS) beantragen', 'Berliner Bildungspaket']
  },
  {
    id: 'bb', name: 'Brandenburg', kurz: 'BB',
    links: {
      wohngeld:      { url: 'https://mwae.brandenburg.de/de/wohngeld/bb1.c.597878.de', text: 'Wohngeld Brandenburg' },
      kita:          { url: 'https://mbjs.brandenburg.de/kinder-und-jugend/kindertagesbetreuung.html', text: 'Kita Brandenburg' },
      jugendamt:     { url: 'https://mbjs.brandenburg.de/kinder-und-jugend/unterhaltsvorschuss.html', text: 'Unterhaltsvorschuss BB' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-bb/startseite', text: 'Jobcenter Brandenburg' },
      familienportal:{ url: 'https://mbjs.brandenburg.de/familie.html', text: 'Familienportal Brandenburg' },
      wohnungsbau:   [{ url: 'https://www.potsdamer-wohnungsgenossenschaft.de', text: 'Wohnungsgen. Potsdam' }]
    },
    besonderheiten: ['Kita ab 3 Jahren beitragsfrei', 'Landesprogramm Eltern stärken', 'Brandenburger Beratungsnetz']
  },
  {
    id: 'hb', name: 'Bremen', kurz: 'HB',
    links: {
      wohngeld:      { url: 'https://www.bauumwelt.bremen.de/wohnen/wohngeld', text: 'Wohngeld Bremen' },
      kita:          { url: 'https://www.soziales.bremen.de/kinder-jugend-und-familie/kindertagesbetreuung', text: 'Kita Bremen' },
      jugendamt:     { url: 'https://www.soziales.bremen.de/kinder-jugend-und-familie/unterhaltsvorschuss', text: 'Unterhaltsvorschuss HB' },
      jobcenter:     { url: 'https://www.jobcenter.bremen.de', text: 'Jobcenter Bremen' },
      familienportal:{ url: 'https://www.soziales.bremen.de/familie', text: 'Familienportal Bremen' },
      wohnungsbau:   [{ url: 'https://www.gewoba.de', text: 'GEWOBA Bremen' }]
    },
    besonderheiten: ['Bremer Familienkarte', 'Krippe ab 1 Jahr gefördert', 'Bremer Bildungsprogramm']
  },
  {
    id: 'hh', name: 'Hamburg', kurz: 'HH',
    links: {
      wohngeld:      { url: 'https://www.hamburg.de/bsw/wohngeld/', text: 'Wohngeld Hamburg' },
      kita:          { url: 'https://www.hamburg.de/kita/', text: 'Kita Hamburg (KiTa-Gutschein)' },
      jugendamt:     { url: 'https://www.hamburg.de/unterhaltsvorschuss/', text: 'Unterhaltsvorschuss HH' },
      jobcenter:     { url: 'https://www.jobcenter.hamburg.de', text: 'Jobcenter Hamburg' },
      familienportal:{ url: 'https://www.hamburg.de/familie', text: 'Familienportal Hamburg' },
      wohnungsbau:   [{ url: 'https://www.saga.hamburg', text: 'SAGA Hamburg' }, { url: 'https://www.wohnungsbaugenossenschaft-hh.de', text: 'Wohnungsbaugen. HH' }]
    },
    besonderheiten: ['KiTa-Gutschein (einkommensabhängig)', '5 Std. täglich beitragsfrei ab 2,5 Jahren', 'HamburgPass für Vergünstigungen']
  },
  {
    id: 'he', name: 'Hessen', kurz: 'HE',
    links: {
      wohngeld:      { url: 'https://wirtschaft.hessen.de/bauen-wohnen/wohnen/wohngeld', text: 'Wohngeld Hessen' },
      kita:          { url: 'https://kultusministerium.hessen.de/schule/vor-der-schule/kindertagesbetreuung', text: 'Kita Hessen' },
      jugendamt:     { url: 'https://soziales.hessen.de/Familie/Unterhaltsvorschuss', text: 'Unterhaltsvorschuss HE' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-he/startseite', text: 'Jobcenter Hessen' },
      familienportal:{ url: 'https://soziales.hessen.de/familie', text: 'Familienportal Hessen' },
      wohnungsbau:   [{ url: 'https://www.nassauische-heimstaette.de', text: 'Nassauische Heimstätte' }, { url: 'https://www.wohnstadt.de', text: 'Wohnstadt Kassel' }]
    },
    besonderheiten: ['Hessisches Kita-Sozialstaffel', 'Kinderbetreuungskosten steuerlich absetzbar', 'Familienhilfe Hessen']
  },
  {
    id: 'mv', name: 'Mecklenburg-Vorpommern', kurz: 'MV',
    links: {
      wohngeld:      { url: 'https://www.regierung-mv.de/Landesregierung/em/Wohnraumfoerderung/Wohngeld/', text: 'Wohngeld MV' },
      kita:          { url: 'https://www.regierung-mv.de/Landesregierung/sm/Familie/Kindertagesbetreuung/', text: 'Kita MV' },
      jugendamt:     { url: 'https://www.regierung-mv.de/Landesregierung/sm/Familie/Unterhaltsvorschuss/', text: 'Unterhaltsvorschuss MV' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-no/startseite', text: 'Jobcenter MV' },
      familienportal:{ url: 'https://www.regierung-mv.de/Landesregierung/sm/Familie/', text: 'Familienportal MV' },
      wohnungsbau:   [{ url: 'https://www.wiro.de', text: 'WIRO Rostock' }]
    },
    besonderheiten: ['Kita beitragsfrei (einkommensunabhängig)', 'Landeserziehungsgeld MV', 'Familienpass MV']
  },
  {
    id: 'ni', name: 'Niedersachsen', kurz: 'NI',
    links: {
      wohngeld:      { url: 'https://www.ms.niedersachsen.de/startseite/themen/soziales/wohnraumfoerderung/wohngeld/', text: 'Wohngeld Niedersachsen' },
      kita:          { url: 'https://www.ms.niedersachsen.de/startseite/themen/familie/kindertagesbetreuung/', text: 'Kita Niedersachsen' },
      jugendamt:     { url: 'https://www.ms.niedersachsen.de/startseite/themen/familie/unterhaltsvorschuss/', text: 'Unterhaltsvorschuss NI' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-no/startseite', text: 'Jobcenter Niedersachsen' },
      familienportal:{ url: 'https://www.ms.niedersachsen.de/startseite/themen/familie/', text: 'Familienportal Niedersachsen' },
      wohnungsbau:   [{ url: 'https://www.nileg.de', text: 'NiLeG (Landeswohnbau NI)' }]
    },
    besonderheiten: ['Niedersächsisches Kita-Gesetz (NKiTaG)', 'Beitragsfreiheit letztes Kitajahr', 'Hannover: Sozialer Wohnungsbau']
  },
  {
    id: 'nw', name: 'Nordrhein-Westfalen', kurz: 'NW',
    links: {
      wohngeld:      { url: 'https://www.mhkbg.nrw/themen/wohnen/wohnraumfoerderung-und-wohngeld/wohngeld', text: 'Wohngeld NRW' },
      kita:          { url: 'https://www.mkjfgfi.nrw/kindertagesbetreuung', text: 'Kita NRW (KiBiz)' },
      jugendamt:     { url: 'https://www.mkjfgfi.nrw/unterhaltsvorschuss', text: 'Unterhaltsvorschuss NRW' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-nrw/startseite', text: 'Jobcenter NRW' },
      familienportal:{ url: 'https://www.mkjfgfi.nrw/familie-und-kinder', text: 'Familienportal NRW' },
      wohnungsbau:   [{ url: 'https://www.nrwbank.de/de/foerderung/wohnraumfoerderung/', text: 'NRW.BANK Wohnraumförderung' }, { url: 'https://www.vbw-wohnen.de', text: 'VBW Wohnen NRW' }]
    },
    besonderheiten: ['Beitragsfreies Kitajahr (letztes Jahr)', 'NRW-Familienförderung', 'Düsseldorf/Köln: Sozialer Wohnungsbau']
  },
  {
    id: 'rp', name: 'Rheinland-Pfalz', kurz: 'RP',
    links: {
      wohngeld:      { url: 'https://mdi.rlp.de/themen/planen-und-bauen/wohnungsbau-und-foerderung/wohngeld/', text: 'Wohngeld RLP' },
      kita:          { url: 'https://kita.rlp.de', text: 'Kita RLP (beitragsfrei!)' },
      jugendamt:     { url: 'https://mffjiv.rlp.de/de/themen/familie/unterhaltsvorschuss/', text: 'Unterhaltsvorschuss RLP' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-rp/startseite', text: 'Jobcenter RLP' },
      familienportal:{ url: 'https://mffjiv.rlp.de/de/themen/familie/', text: 'Familienportal RLP' },
      wohnungsbau:   [{ url: 'https://www.isb.rlp.de', text: 'ISB Wohnraumförderung RLP' }]
    },
    besonderheiten: ['Kita in RLP komplett beitragsfrei!', 'Landeserziehungsgeld RLP', 'Familienzentren kostenlos']
  },
  {
    id: 'sl', name: 'Saarland', kurz: 'SL',
    links: {
      wohngeld:      { url: 'https://www.saarland.de/mwide/DE/service/buerger_serviceportal/wohnen/wohngeld/', text: 'Wohngeld Saarland' },
      kita:          { url: 'https://www.saarland.de/msagd/DE/portale/familie/', text: 'Kita Saarland' },
      jugendamt:     { url: 'https://www.saarland.de/msagd/DE/portale/familie/leistungen/unterhaltsvorschuss/', text: 'Unterhaltsvorschuss SL' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-rp/startseite', text: 'Jobcenter Saarland' },
      familienportal:{ url: 'https://www.saarland.de/msagd/DE/portale/familie/', text: 'Familienportal Saarland' },
      wohnungsbau:   [{ url: 'https://www.saarlaendische-heimstaetten.de', text: 'Saarländ. Heimstätten' }]
    },
    besonderheiten: ['Saarland-Karte für Familien', 'Landeswohngeld ergänzend möglich', 'Kinderbetreuungsgeld SL']
  },
  {
    id: 'sn', name: 'Sachsen', kurz: 'SN',
    links: {
      wohngeld:      { url: 'https://www.sab.de/foerderung/menschen-in-sachsen/wohnen/wohngeld.html', text: 'Wohngeld Sachsen (SAB)' },
      kita:          { url: 'https://www.familie.sachsen.de/kindertagesbetreuung.html', text: 'Kita Sachsen' },
      jugendamt:     { url: 'https://www.familie.sachsen.de/unterhaltsvorschuss.html', text: 'Unterhaltsvorschuss SN' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-sn/startseite', text: 'Jobcenter Sachsen' },
      familienportal:{ url: 'https://www.familie.sachsen.de', text: 'Familienportal Sachsen' },
      wohnungsbau:   [{ url: 'https://www.sab.de/foerderung/menschen-in-sachsen/wohnen/', text: 'SAB Wohnraumförderung' }]
    },
    besonderheiten: ['Sächsisches Landeserziehungsgeld', 'Familienwegweiser Sachsen', 'Kita-Beitrag einkommensabhängig']
  },
  {
    id: 'st', name: 'Sachsen-Anhalt', kurz: 'ST',
    links: {
      wohngeld:      { url: 'https://www.landesverwaltungsamt.sachsen-anhalt.de/aufgaben/wohngeld/', text: 'Wohngeld Sachsen-Anhalt' },
      kita:          { url: 'https://ms.sachsen-anhalt.de/themen/kinder-und-jugend/kindertagesbetreuung/', text: 'Kita Sachsen-Anhalt' },
      jugendamt:     { url: 'https://ms.sachsen-anhalt.de/themen/familie/unterhaltsvorschuss/', text: 'Unterhaltsvorschuss ST' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-sn/startseite', text: 'Jobcenter ST' },
      familienportal:{ url: 'https://ms.sachsen-anhalt.de/themen/familie/', text: 'Familienportal ST' },
      wohnungsbau:   [{ url: 'https://www.wobau-magdeburg.de', text: 'WoBau Magdeburg' }]
    },
    besonderheiten: ['Kita letztes Jahr beitragsfrei', 'Landeserziehungsgeld ST möglich', 'Familienservicebüros ST']
  },
  {
    id: 'sh', name: 'Schleswig-Holstein', kurz: 'SH',
    links: {
      wohngeld:      { url: 'https://www.schleswig-holstein.de/DE/fachinhalte/W/wohngeld/wohngeld.html', text: 'Wohngeld SH' },
      kita:          { url: 'https://www.schleswig-holstein.de/DE/fachinhalte/K/kindertagesbetreuung/', text: 'Kita Schleswig-Holstein' },
      jugendamt:     { url: 'https://www.schleswig-holstein.de/DE/fachinhalte/U/unterhaltsvorschuss/', text: 'Unterhaltsvorschuss SH' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-no/startseite', text: 'Jobcenter SH' },
      familienportal:{ url: 'https://www.schleswig-holstein.de/DE/fachinhalte/F/familie/', text: 'Familienportal SH' },
      wohnungsbau:   [{ url: 'https://www.ib-sh.de/produkte/wohnraumfoerderung/', text: 'IB.SH Wohnraumförderung' }]
    },
    besonderheiten: ['Kita-Zuschuss einkommensabhängig', 'SH-Familienpass', 'Landeserziehungsgeld SH']
  },
  {
    id: 'th', name: 'Thüringen', kurz: 'TH',
    links: {
      wohngeld:      { url: 'https://www.thueringen.de/th9/tlvwa/wohngeld/', text: 'Wohngeld Thüringen' },
      kita:          { url: 'https://www.thueringen.de/th2/tmbjs/kinder/kita/', text: 'Kita Thüringen (beitragsfrei!)' },
      jugendamt:     { url: 'https://www.thueringen.de/th2/tmbjs/kinder/unterhaltsvorschuss/', text: 'Unterhaltsvorschuss TH' },
      jobcenter:     { url: 'https://www.arbeitsagentur.de/vor-ort/regionaldirektion-sn/startseite', text: 'Jobcenter TH' },
      familienportal:{ url: 'https://www.thueringen.de/th2/tmbjs/familie/', text: 'Familienportal Thüringen' },
      wohnungsbau:   [{ url: 'https://www.erfurter-wohnungsbaugesellschaft.de', text: 'Erfurter Wohnungsbau' }]
    },
    besonderheiten: ['Kita in TH komplett beitragsfrei!', 'Thüringer Erziehungsgeld', 'Familienzentren TH']
  }
];

// Bundesweite Leistungen (gelten in allen Bundesländern gleich)
const BUNDESWEITE_LEISTUNGEN = [
  {
    id: 'kindergeld',
    name: 'Kindergeld',
    emoji: '👶',
    betrag: '255 € / Kind / Monat',
    behoerde: 'Familienkasse',
    beschreibung: 'Monatliche Zahlung für jedes Kind bis 18 Jahre (bis 25 Jahre in Ausbildung). Wird automatisch ausgezahlt, solange kein höherer Steuervorteil greift.',
    link: 'https://www.arbeitsagentur.de/familie-und-kinder/kindergeld',
    onlineAntrag: 'https://www.arbeitsagentur.de/familie-und-kinder/kindergeld-beantragen',
    kategorie: 'kinder'
  },
  {
    id: 'unterhaltsvorschuss',
    name: 'Unterhaltsvorschuss',
    emoji: '🤝',
    betrag: '230 – 395 € / Kind / Monat',
    behoerde: 'Jugendamt',
    beschreibung: 'Wenn der andere Elternteil keinen oder zu wenig Unterhalt zahlt, springt der Staat ein. Kein Zeitlimit mehr seit 2017. Gilt bis zum 18. Geburtstag des Kindes.',
    link: 'https://www.bmj.de/SharedDocs/Publikationen/DE/Unterhaltsvorschuss.html',
    onlineAntrag: null,
    kategorie: 'kinder'
  },
  {
    id: 'kinderzuschlag',
    name: 'Kinderzuschlag (KiZ)',
    emoji: '💰',
    betrag: 'bis 292 € / Kind / Monat',
    behoerde: 'Familienkasse',
    beschreibung: 'Zusatz zum Kindergeld für Eltern mit kleinem Einkommen. Verhindert, dass Familien ins Bürgergeld rutschen. Kann zusammen mit Wohngeld beantragt werden.',
    link: 'https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag',
    onlineAntrag: 'https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag-beantragen',
    kategorie: 'kinder'
  },
  {
    id: 'elterngeld',
    name: 'Elterngeld / ElterngeldPlus',
    emoji: '🍼',
    betrag: '300 – 1.800 € / Monat',
    behoerde: 'Elterngeldstelle',
    beschreibung: 'Einkommensersatz nach der Geburt (65–67 % vom Nettoeinkommen). Als Alleinerziehende können Sie alle Monate selbst nutzen — bis zu 14 Monate Basis- oder 28 Monate ElterngeldPlus.',
    link: 'https://www.elterngeld-digital.de',
    onlineAntrag: 'https://www.elterngeld-digital.de',
    kategorie: 'kinder'
  },
  {
    id: 'wohngeld',
    name: 'Wohngeld',
    emoji: '🏠',
    betrag: 'Ø 370 € / Monat',
    behoerde: 'Wohngeldstelle (Wohnungsamt)',
    beschreibung: 'Zuschuss zur Miete oder zu den Kosten des selbstgenutzten Wohneigentums. Wird nach Haushaltsgröße, Einkommen und Miethöhe berechnet. Seit 2023 deutlich erhöht.',
    link: 'https://www.bundesregierung.de/breg-de/themen/entlastungen-fuer-deutschland/wohngeld-2044002',
    onlineAntrag: null,
    kategorie: 'wohnen'
  },
  {
    id: 'buergergeld',
    name: 'Bürgergeld (ALG II)',
    emoji: '🛡️',
    betrag: 'ab 563 € / Monat + Miete',
    behoerde: 'Jobcenter',
    beschreibung: 'Grundsicherung für Menschen, die ihren Lebensunterhalt nicht selbst bestreiten können. Alleinerziehende erhalten Mehrbedarfszuschlag (36 % des Regelbedarfs). Miete und Heizung werden übernommen.',
    link: 'https://www.arbeitsagentur.de/arbeitslos-und-arbeit-finden/buergergeld',
    onlineAntrag: 'https://www.arbeitsagentur.de/arbeitslos-und-arbeit-finden/buergergeld-beantragen',
    kategorie: 'grundsicherung'
  },
  {
    id: 'bildung-teilhabe',
    name: 'Bildung und Teilhabe',
    emoji: '🎒',
    betrag: 'bis 174 € / Jahr + Einzelleistungen',
    behoerde: 'Jobcenter / Sozialamt',
    beschreibung: 'Für Kinder die Bürgergeld, Sozialhilfe oder Wohngeld bekommen: Schulbedarf, Klassenfahrten, Mittagessen, Sport- und Vereinsbeiträge, Lernförderung werden bezahlt.',
    link: 'https://www.bmas.de/DE/Arbeit/Aus-und-Weiterbildung/Bildung-und-Teilhabe/bildung-und-teilhabe.html',
    onlineAntrag: null,
    kategorie: 'kinder'
  },
  {
    id: 'alleinerziehend-mehrbedarf',
    name: 'Mehrbedarf Alleinerziehende',
    emoji: '⭐',
    betrag: '36 % des Regelbedarfs',
    behoerde: 'Jobcenter',
    beschreibung: 'Wer Bürgergeld bezieht und alleinerziehend ist, bekommt automatisch 36 % mehr. Kein extra Antrag nötig — muss aber beim Jobcenter als alleinerziehend gemeldet sein.',
    link: 'https://www.arbeitsagentur.de/arbeitslos-und-arbeit-finden/buergergeld',
    onlineAntrag: null,
    kategorie: 'grundsicherung'
  }
];

// Detaillierte Anträge für den Formular-Assistenten
const ANTRAEGE = [
  {
    id: 'kindergeld',
    name: 'Kindergeld',
    emoji: '👶',
    beschreibung: 'Monatliche Zahlung für jedes Kind bis 18 Jahre (bis 25 Jahre in Ausbildung/Studium). Sofort nach der Geburt beantragen — wird rückwirkend nur 6 Monate gezahlt.',
    betrag: '255 € / Kind / Monat (Stand 2025)',
    behoerde: 'Familienkasse (Bundesagentur für Arbeit)',
    dauer: '4–6 Wochen bis zum ersten Bescheid',
    voraussetzungen: [
      'Sie wohnen in Deutschland (Hauptwohnsitz)',
      'Kind lebt in Ihrem Haushalt',
      'Kind unter 18 — oder unter 25 in Ausbildung/Studium',
      'Deutsche Staatsangehörigkeit oder EU-Bürger mit Aufenthaltsrecht',
      'Bei Drittstaatlern: Niederlassungserlaubnis oder erlaubnisfreier Aufenthalt'
    ],
    dokumente: [
      'Geburtsurkunde des Kindes (Original oder beglaubigte Kopie)',
      'Ihr Personalausweis oder Reisepass',
      'Steuer-Identifikationsnummer (Steuer-ID) von Ihnen UND vom Kind',
      'Bei Schulkindern ab 18: Schul-/Studienbescheinigung',
      'Bei Drittstaatlern: Aufenthaltstitel',
      'Bei getrennten Eltern: Nachweis wer die Kinder im Haushalt hat'
    ],
    schritte: [
      {
        nr: 1,
        titel: 'Steuer-ID bereitlegen',
        text: 'Sie brauchen die Steuer-Identifikationsnummer von SICH und vom KIND. Die Ihre steht auf der Lohnabrechnung oder im letzten Steuerbescheid. Die des Kindes kommt automatisch nach der Geburt per Post — sonst beim Bundeszentralamt für Steuern anfordern (online unter bzst.de).',
        tipp: 'Ohne Steuer-ID kein Kindergeld — bei vermisster Steuer-ID des Kindes sofort online neu anfordern (kommt in 2–4 Wochen).'
      },
      {
        nr: 2,
        titel: 'Antrag online stellen (empfohlen)',
        text: 'Auf arbeitsagentur.de → „Familie und Kinder" → „Kindergeld beantragen" gehen. Online-Antrag ausfüllen, mit BundID oder ELSTER signieren. Geht in 15 Minuten — schnellste und sicherste Methode.',
        tipp: 'Direktlink: arbeitsagentur.de/familie-und-kinder/kindergeld-beantragen — Antrag KG 1 ausfüllen.'
      },
      {
        nr: 3,
        titel: 'Alternative: Papier-Antrag',
        text: 'Falls kein Online-Zugang: Antragsformular KG 1 + KG 1 Anlage Kind auf arbeitsagentur.de herunterladen, ausdrucken, ausfüllen, unterschreiben. Per Post an die zuständige Familienkasse schicken (steht auf der Webseite je nach PLZ).',
        tipp: 'Per Einschreiben verschicken — Quittung als Beleg. Kopien für sich behalten.'
      },
      {
        nr: 4,
        titel: 'Anlage Kind separat ausfüllen',
        text: 'Für jedes Kind wird eine eigene „Anlage Kind" ausgefüllt. Mit Geburtsdatum, Steuer-ID des Kindes, Wohnsitz. Bei Kindern über 18: zusätzlich Ausbildungs-/Studien-Anlage.',
        tipp: 'Bei 2 Kindern: 1 Hauptantrag KG 1 + 2 Anlagen Kind. Nicht vergessen!'
      },
      {
        nr: 5,
        titel: 'Eltern-Konstellation klären',
        text: 'Wer das Kind im Haushalt hat, bekommt das Kindergeld. Bei getrennten Eltern: Der Elternteil mit Hauptwohnsitz des Kindes ist berechtigt. Bei Patchwork: Eltern können bestimmen, wer es bekommt (Vorrang-Erklärung beifügen).',
        tipp: 'Streit um Kindergeld? Vorrang-Erklärung KG 3a wechselseitig ausfüllen — sonst entscheidet die Familienkasse.'
      },
      {
        nr: 6,
        titel: 'Auf Bescheid warten',
        text: 'Nach 4–6 Wochen kommt der Bescheid. Auszahlung erfolgt monatlich auf Ihr Konto. Bei Verzögerung: Sachstands-Anfrage telefonisch unter 0800 4555530 (kostenlos).',
        tipp: 'Kindergeld wird rückwirkend für max. 6 Monate ausgezahlt — sofort nach Geburt beantragen!'
      },
      {
        nr: 7,
        titel: 'Bei Veränderungen melden',
        text: 'Schulwechsel, Auszug, Heirat des Kindes, Ausbildungsende — alle Änderungen sofort der Familienkasse melden. Sonst Rückforderung + Strafanzeige möglich.',
        tipp: 'Online-Konto bei der Familienkasse: kindergeld.familienkasse.de — Änderungen direkt eingeben.'
      }
    ],
    formularhilfe: [
      { feld: 'Antragsteller-Daten (KG 1, Abschnitt 1)', erklaerung: 'Vollständiger Name, Geburtsdatum, Anschrift, Staatsangehörigkeit. Bei verheirateten/eingetragenen Lebenspartnern: auch Daten des Partners angeben.' },
      { feld: 'Steuer-Identifikationsnummer (KG 1, Abschnitt 2)', erklaerung: '11-stellige Nummer ohne Leerzeichen, z.B. 12345678901. Steht auf der Lohnabrechnung, im Steuerbescheid oder im Schreiben vom Bundeszentralamt für Steuern.' },
      { feld: 'Bankverbindung (KG 1, Abschnitt 5)', erklaerung: 'IBAN und BIC für Auszahlung. Konto muss auf den Antragsteller lauten. Gemeinsame Konten gehen auch, wenn der Antragsteller mitverfügt.' },
      { feld: 'Anlage Kind — Angaben zum Kind', erklaerung: 'Geburtsname, Vorname, Geburtsdatum, Geburtsort, Steuer-ID des Kindes (11-stellig). Bei nicht-deutschen Kindern zusätzlich Staatsangehörigkeit und Aufenthaltsstatus.' },
      { feld: 'Anlage Kind — Wohnsitz', erklaerung: 'Adresse, an der das Kind wohnt. „Bei welchem Elternteil lebt das Kind?" → Hier nur ankreuzen wenn die Eltern getrennt leben.' },
      { feld: 'Anlage Kind — Ausbildung (ab 18)', erklaerung: 'Bei Kindern ab 18: Art der Ausbildung (Schule/Berufsausbildung/Studium/Praktikum), Beginn, voraussichtliches Ende. Bescheinigung der Einrichtung beilegen.' },
      { feld: 'Vorrang-Erklärung (KG 3a)', erklaerung: 'Nur bei getrennten Eltern oder Patchwork-Familien: Welcher Elternteil bekommt das Kindergeld? Wird von beiden Elternteilen unterschrieben.' },
      { feld: 'Schul-/Studienbescheinigung', erklaerung: 'Bei Kindern ab 18: Aktuelle Bescheinigung der Schule, Berufsschule, Hochschule. Muss Studiengang, Beginn und voraussichtliches Ende enthalten. Nicht älter als 3 Monate.' }
    ]
  },
  {
    id: 'wohngeld',
    name: 'Wohngeld',
    emoji: '🏠',
    beschreibung: 'Staatlicher Zuschuss zur Miete — mindert Ihre monatliche Belastung direkt.',
    betrag: 'Ø 370 € / Monat',
    behoerde: 'Wohngeldstelle / Wohnungsamt Ihrer Gemeinde',
    dauer: '4–8 Wochen bis zum ersten Bescheid',
    voraussetzungen: [
      'Mietwohnung oder Eigenheim (kein Bürgergeld-Bezug gleichzeitig)',
      'Einkommen unterhalb der Einkommensgrenze (je nach Haushaltsgröße)',
      'Mind. eine Person im Haushalt wohngeldberechtigt',
      'Deutsche Staatsangehörigkeit oder anerkannter Aufenthaltsstatus'
    ],
    dokumente: [
      'Personalausweis / Reisepass (aller Haushaltsmitglieder)',
      'Aktueller Mietvertrag',
      'Letzten 3 Monate Kontoauszüge',
      'Einkommensnachweise (Gehaltsabrechnungen, Rentenbescheid, etc.)',
      'Ggf. Unterhaltsbescheid oder Unterhaltsvorschuss-Bescheid',
      'Ggf. Kindergeld-Bescheid',
      'Ggf. Bescheid über andere Sozialleistungen'
    ],
    schritte: [
      {
        nr: 1,
        titel: 'Wohngeldstelle finden',
        text: 'Das Wohngeld wird bei der Wohngeldstelle Ihrer Gemeinde oder Stadt beantragt. In kleineren Gemeinden oft beim Bürgeramt oder Rathaus. Rufen Sie vorher an und fragen Sie nach einem Termin — viele Stellen beraten kostenlos.',
        tipp: 'Google-Suche: "[Ihre Stadt] Wohngeldstelle" oder Bürgertelefon 115 anrufen.'
      },
      {
        nr: 2,
        titel: 'Antrag herunterladen oder anfordern',
        text: 'Den Vordruck "Antrag auf Wohngeld" (WoGG) können Sie bei der Wohngeldstelle abholen, oft auch als PDF herunterladen. Manche Bundesländer haben Online-Antragsportale.',
        tipp: 'Suchen Sie nach "Wohngeldantrag [Bundesland] PDF" oder nutzen Sie den Link Ihres Bundeslands oben.'
      },
      {
        nr: 3,
        titel: 'Antrag ausfüllen',
        text: 'Füllen Sie alle Felder aus. Haushaltsmitglieder = alle Personen, die bei Ihnen wohnen (also Sie + Ihre Kinder). Miete = nur Kaltmiete eintragen, Nebenkosten separat. Einkommen = Nettoeinkommen aus allen Quellen.',
        tipp: 'Lassen Sie kein Feld frei — schreiben Sie "0" oder "keine" wenn etwas nicht zutrifft.'
      },
      {
        nr: 4,
        titel: 'Dokumente zusammenstellen',
        text: 'Sammeln Sie alle Belege aus der Liste oben. Machen Sie Kopien — die Originale behalten Sie. Heften Sie alles geordnet zusammen.',
        tipp: 'Checkliste: Alle Dokumente vorhanden? Dann weiter zu Schritt 5.'
      },
      {
        nr: 5,
        titel: 'Antrag einreichen',
        text: 'Geben Sie Antrag + Dokumente persönlich bei der Wohngeldstelle ab oder schicken Sie alles per Einschreiben. Lassen Sie sich den Eingang quittieren oder nutzen Sie Einschreiben mit Rückschein.',
        tipp: 'Der Wohngeld-Anspruch beginnt ab dem Monat der Antragstellung — nicht warten!'
      },
      {
        nr: 6,
        titel: 'Bescheid abwarten und prüfen',
        text: 'Nach 4–8 Wochen kommt der Bescheid. Prüfen Sie: Stimmt die Haushaltsgröße? Wurde das richtige Einkommen eingetragen? Ist der Betrag plausibel? Bei Fehlern: Widerspruch innerhalb von 1 Monat einlegen.',
        tipp: 'Wohngeld gilt meist für 12 Monate — rechtzeitig verlängern (1–2 Monate vorher)!'
      }
    ],
    formularhilfe: [
      { feld: 'Anzahl der Haushaltsmitglieder', erklaerung: 'Zählen Sie sich selbst und alle Kinder die bei Ihnen wohnen. Beispiel: Sie + 2 Kinder = 3 Haushaltsmitglieder.' },
      { feld: 'Monatliche Miete (Kaltmiete)', erklaerung: 'Nur die reine Miete ohne Heizung und Nebenkosten. Steht im Mietvertrag unter "Grundmiete" oder "Kaltmiete".' },
      { feld: 'Monatliches Gesamteinkommen', erklaerung: 'Ihr Nettoeinkommen + Kindergeld + Unterhaltsvorschuss + alle anderen Einnahmen. Rechnen Sie alles zusammen.' },
      { feld: 'Art der Wohnung', erklaerung: 'Miete = Sie wohnen zur Miete. Eigentum = Ihnen gehört die Wohnung/das Haus.' },
      { feld: 'Datum des Einzugs', erklaerung: 'Der erste Tag, an dem Sie in dieser Wohnung gemeldet waren (steht im Mietvertrag).' }
    ]
  },
  {
    id: 'unterhaltsvorschuss',
    name: 'Unterhaltsvorschuss',
    emoji: '🤝',
    beschreibung: 'Der Staat zahlt Unterhalt, wenn der andere Elternteil nicht zahlt oder zahlen kann.',
    betrag: '230 € (0–5 J.) / 301 € (6–11 J.) / 395 € (12–17 J.) / Monat',
    behoerde: 'Jugendamt Ihrer Gemeinde',
    dauer: '2–6 Wochen bis Bewilligung',
    voraussetzungen: [
      'Kind lebt bei Ihnen (nicht beim anderen Elternteil)',
      'Kind ist unter 18 Jahre alt',
      'Sie sind alleinerziehend (nicht verheiratet mit dem anderen Elternteil)',
      'Der andere Elternteil zahlt keinen oder zu wenig Unterhalt',
      'Kind ist nicht selbst erwerbstätig'
    ],
    dokumente: [
      'Geburtsurkunde des Kindes',
      'Ihren Personalausweis',
      'Aktuell gültige Meldebestätigung (Einwohnermeldeamt)',
      'Scheidungsurteil oder Beschluss über Trennung (falls vorhanden)',
      'Ggf. Unterhaltstitel (Gerichtsbeschluss oder Jugendamtsurkunde)',
      'Ggf. Geburtsurkunde mit Vaterschaftsanerkennung',
      'Ggf. letzter Einkommensbescheid des anderen Elternteils'
    ],
    schritte: [
      { nr: 1, titel: 'Jugendamt kontaktieren', text: 'Rufen Sie das Jugendamt Ihrer Stadt/Gemeinde an und bitten Sie um einen Termin für "Unterhaltsvorschuss". Das Gespräch ist kostenlos und vertraulich.', tipp: 'Jugendamt-Suche: "Jugendamt [Ihre Stadt]" oder Bürgertelefon 115.' },
      { nr: 2, titel: 'Termin wahrnehmen', text: 'Beim Termin erklären Sie Ihre Situation. Der Sachbearbeiter erklärt alle nötigen Dokumente. Sie bekommen einen Antragsvordruck.', tipp: 'Nehmen Sie alle Dokumente die Sie haben mit — auch wenn Sie nicht sicher sind ob sie nötig sind.' },
      { nr: 3, titel: 'Antrag ausfüllen & Dokumente einreichen', text: 'Füllen Sie den Antrag vollständig aus. Geben Sie die Adresse und alle Informationen zum anderen Elternteil an — auch wenn der Kontakt schwierig ist.', tipp: 'Falls Sie die Adresse des anderen Elternteils nicht kennen: trotzdem beantragen, das Jugendamt hilft bei der Suche.' },
      { nr: 4, titel: 'Bescheid erhalten', text: 'Das Jugendamt prüft den Antrag und zahlt rückwirkend ab Antragstellung. Der Staat holt sich das Geld danach vom anderen Elternteil zurück — das ist Ihre Angelegenheit.', tipp: 'Falls abgelehnt: innerhalb von 1 Monat Widerspruch einlegen!' }
    ],
    formularhilfe: [
      { feld: 'Angaben zum anderen Elternteil', erklaerung: 'Name, letzte bekannte Adresse, Arbeitgeber (falls bekannt). Je mehr Infos, desto besser — aber auch ohne vollständige Infos beantragen!' },
      { feld: 'Höhe des gezahlten Unterhalts', erklaerung: 'Was zahlt der andere Elternteil monatlich? Falls nichts: "0 €" eintragen. Falls unregelmäßig: Durchschnitt der letzten 3 Monate.' },
      { feld: 'Sorgerecht', erklaerung: 'Alleiniges oder gemeinsames Sorgerecht — beides ist möglich für Unterhaltsvorschuss. Wichtig ist nur: Das Kind lebt bei Ihnen.' }
    ]
  },
  {
    id: 'kinderzuschlag',
    name: 'Kinderzuschlag (KiZ)',
    emoji: '💰',
    beschreibung: 'Ergänzung zum Kindergeld für Eltern mit kleinem Einkommen — verhindert Bürgergeld-Bezug.',
    betrag: 'bis 292 € / Kind / Monat',
    behoerde: 'Familienkasse (Bundesagentur für Arbeit)',
    dauer: '4–6 Wochen',
    voraussetzungen: [
      'Kindergeld-Anspruch besteht',
      'Einkommen zu niedrig für die Familie, aber nicht zu niedrig (Mindesteinkommensgrenze: 600 €)',
      'Kind ist unter 25 Jahre und lebt im Haushalt',
      'Kein Bürgergeld-Bezug (oder nur ergänzend)'
    ],
    dokumente: [
      'Einkommensnachweise der letzten 6 Monate',
      'Kindergeld-Bescheid',
      'Aktueller Mietvertrag + letzte Nebenkostenabrechnung',
      'Kontoauszüge der letzten 3 Monate',
      'Ggf. Unterhaltsbescheid'
    ],
    schritte: [
      { nr: 1, titel: 'Online prüfen ob Sie Anspruch haben', text: 'Nutzen Sie den KiZ-Rechner auf der Website der Familienkasse — dort sehen Sie sofort ob und wie viel Sie bekommen würden.', tipp: 'KiZ-Rechner: www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag' },
      { nr: 2, titel: 'Online-Antrag stellen', text: 'Der Kinderzuschlag kann vollständig online beantragt werden. Konto bei "Meine BA" erstellen und Antrag ausfüllen.', tipp: 'Online-Antrag: www.arbeitsagentur.de → "Meine BA" → Kindergeld & Kinderzuschlag' },
      { nr: 3, titel: 'Dokumente hochladen', text: 'Alle Nachweise als PDF oder Foto hochladen. Alternativ per Post an die Familienkasse schicken.', tipp: 'Die Familienkasse ist unter 0800 4 555530 (kostenlos) erreichbar.' },
      { nr: 4, titel: 'Bescheid abwarten', text: 'Der Kinderzuschlag wird für 6 Monate bewilligt, danach muss neu beantragt werden. Rechtzeitig verlängern!', tipp: 'KiZ und Wohngeld gleichzeitig beantragen — beide ergänzen sich optimal!' }
    ],
    formularhilfe: [
      { feld: 'Nettoeinkommen', erklaerung: 'Ihr monatliches Nettoeinkommen aus Arbeit. Kindergeld und Unterhaltsvorschuss werden getrennt abgefragt.' },
      { feld: 'Monatliche Wohnkosten', erklaerung: 'Kaltmiete + Heizkosten + Nebenkosten — alles zusammen.' },
      { feld: 'Anzahl der Kinder unter 25', erklaerung: 'Alle Kinder die bei Ihnen wohnen und für die Sie Kindergeld bekommen.' }
    ]
  },
  {
    id: 'buergergeld',
    name: 'Bürgergeld (ALG II)',
    emoji: '🛡️',
    beschreibung: 'Grundsicherung wenn das Einkommen nicht reicht — mit Mehrbedarf für Alleinerziehende.',
    betrag: 'ab 563 € / Monat (Regelsatz) + Miete + Mehrbedarf',
    behoerde: 'Jobcenter',
    dauer: '2–4 Wochen bis erste Zahlung',
    voraussetzungen: [
      'Einkommen reicht nicht für Lebensunterhalt',
      'Erwerbsfähig (mind. 3 Std./Tag arbeitsfähig)',
      'Wohnsitz in Deutschland',
      'Ersparnisse unter Freibetrag (5.000 € je Person im Haushalt)'
    ],
    dokumente: [
      'Personalausweis aller Haushaltsmitglieder',
      'Geburtsurkunden der Kinder',
      'Mietvertrag + aktuelle Betriebskostenabrechnung',
      'Kontoauszüge der letzten 3 Monate (alle Konten!)',
      'Einkommensnachweise (Gehaltsabrechnungen, etc.)',
      'Ggf. Kfz-Zulassung, Lebensversicherungen, Sparbücher',
      'Ggf. Aufenthaltsgenehmigung',
      'Krankenversicherungsnachweis'
    ],
    schritte: [
      { nr: 1, titel: 'Sofort beim Jobcenter anrufen', text: 'Bürgergeld gilt ab dem Anruf-/Antrags-Datum. Rufen Sie so früh wie möglich an und lassen Sie sich den Anruf bestätigen.', tipp: 'Nicht warten bis alle Dokumente beisammen sind — Antrag stellen, Dokumente nachreichen!' },
      { nr: 2, titel: 'Antrag stellen (online oder persönlich)', text: 'Online: www.arbeitsagentur.de → Bürgergeld beantragen. Oder direkt beim Jobcenter persönlich.', tipp: 'Als Alleinerziehende haben Sie Anspruch auf Sondertermine / bevorzugte Bearbeitung in vielen Jobcentern.' },
      { nr: 3, titel: 'Erstgespräch wahrnehmen', text: 'Beim ersten Termin werden alle Dokumente geprüft. Bringen Sie alles mit was Sie haben. Teilen Sie mit dass Sie alleinerziehend sind — das erhöht den Regelsatz um 36 %.', tipp: 'Mehrbedarf Alleinerziehende: 36 % extra auf den Regelsatz — immer angeben!' },
      { nr: 4, titel: 'Eingliederungsvereinbarung / Kooperationsplan unterschreiben', text: 'Das Jobcenter erstellt einen Kooperationsplan mit Zielen für Ihre Arbeitsuche. Kinder und Kinderbetreuung müssen berücksichtigt werden.', tipp: 'Kita-Zeiten, Schulzeiten, Ferienzeiten — geben Sie Ihre tatsächliche Verfügbarkeit an.' }
    ],
    formularhilfe: [
      { feld: 'Bedarfsgemeinschaft', erklaerung: 'Alle Personen die mit Ihnen in einer Wohnung leben und gemeinsam wirtschaften — Sie + Ihre Kinder unter 25.' },
      { feld: 'Kosten der Unterkunft', erklaerung: 'Kaltmiete + Heizkosten + Nebenkosten. Das Jobcenter übernimmt angemessene Kosten (je nach Größe und Ort).' },
      { feld: 'Einkommen und Vermögen', erklaerung: 'Alle Einnahmen: Lohn, Kindergeld, Unterhalt, Renten. Und Vermögen: Sparguthaben, Aktien, Lebensversicherungen.' },
      { feld: 'Mehrbedarf Alleinerziehende', erklaerung: 'Kreuzen Sie an dass Sie alleinerziehend sind. Sie bekommen dann automatisch 36 % mehr Regelsatz.' }
    ]
  },
  {
    id: 'wohnberechtigungsschein',
    name: 'Wohnberechtigungsschein (WBS)',
    emoji: '🔑',
    beschreibung: 'Berechtigt zur Anmietung von Sozialwohnungen — günstiger und stabiler Wohnraum.',
    betrag: 'Günstiger Wohnraum (keine Direktzahlung)',
    behoerde: 'Wohnungsamt / Bürgeramt Ihrer Gemeinde',
    dauer: '2–4 Wochen bis Ausstellung',
    voraussetzungen: [
      'Einkommen unterhalb der Einkommensgrenze (je nach Bundesland und Haushaltsgröße)',
      'Wohnsitz oder dringender Wohnbedarf in der Gemeinde',
      'Deutsche Staatsangehörigkeit oder anerkannter Aufenthalt'
    ],
    dokumente: [
      'Personalausweis aller Haushaltsmitglieder',
      'Einkommensnachweise der letzten 12 Monate',
      'Ggf. Kindergeld-Bescheid',
      'Ggf. Unterhaltsvorschuss-Bescheid',
      'Ggf. Rentenbescheid',
      'Aktuelle Meldebescheinigung'
    ],
    schritte: [
      { nr: 1, titel: 'Wohnungsamt aufsuchen', text: 'Gehen Sie zum Wohnungsamt oder Bürgeramt Ihrer Stadt. Fragen Sie explizit nach dem "Wohnberechtigungsschein" (WBS).', tipp: 'In vielen Städten gibt es Wartelisten — je früher der WBS, desto besser!' },
      { nr: 2, titel: 'Antrag stellen', text: 'Füllen Sie den Antrag aus und reichen Sie alle Dokumente ein. Der WBS wird i.d.R. für 1 Jahr ausgestellt.', tipp: 'Den WBS jedes Jahr verlängern — er wird nur auf Antrag ausgestellt.' },
      { nr: 3, titel: 'WBS nutzen', text: 'Mit dem WBS können Sie sich bei kommunalen Wohnungsgesellschaften und auf Wohnungsbörsen mit Sozialwohnungen bewerben.', tipp: 'Direkt bei DEGEWO (Berlin), SAGA (Hamburg), GWG (Bayern) etc. bewerben.' }
    ],
    formularhilfe: [
      { feld: 'Jahreseinkommen', erklaerung: 'Ihr Bruttoeinkommen der letzten 12 Monate — plus alle anderen Einnahmen. Kindergeld zählt nicht in allen Bundesländern dazu.' },
      { feld: 'Wohnbedarf', erklaerung: 'Warum brauchen Sie eine neue Wohnung? Begründen Sie: zu klein, zu teuer, Kündigung, etc.' },
      { feld: 'Personenanzahl', erklaerung: 'Sie + alle Kinder die einziehen werden. Je mehr Personen, desto mehr Zimmer berechtigt der WBS.' }
    ]
  },
  {
    id: 'elterngeld',
    name: 'Elterngeld / ElterngeldPlus',
    emoji: '🍼',
    beschreibung: 'Einkommensersatz nach der Geburt — als Alleinerziehende alle 14 Monate selbst nutzen.',
    betrag: '300 – 1.800 € / Monat (65–67 % vom Netto)',
    behoerde: 'Elterngeldstelle des Bundeslandes',
    dauer: '4–8 Wochen bis Bescheid',
    voraussetzungen: [
      'Kind ist unter 14 Monate alt (bei Basiselterngeld)',
      'Sie betreuen und erziehen das Kind selbst',
      'Kein Vollzeit-Einkommen über 250.000 € / Jahr',
      'Wohnsitz in Deutschland'
    ],
    dokumente: [
      'Geburtsurkunde des Kindes',
      'Letzten 12 Monate Gehaltsabrechnungen (vor Geburt)',
      'Mutterschaftsgeld-Bescheid (falls erhalten)',
      'Personalausweis',
      'Ggf. Steuerbescheide bei selbständiger Tätigkeit'
    ],
    schritte: [
      { nr: 1, titel: 'Online-Antrag stellen (ElterngeldDigital)', text: 'Nutzen Sie das Portal www.elterngeld-digital.de — komplett online, einfach und schnell. Antrag direkt nach der Geburt stellen.', tipp: 'Rückwirkend nur für die letzten 3 Monate möglich — nicht warten!' },
      { nr: 2, titel: 'Monate wählen', text: 'Als Alleinerziehende stehen Ihnen alle 14 Monate zu (normal 12+2 Partnermonate). Wählen Sie wann und wie lange Sie Elterngeld beziehen möchten.', tipp: 'ElterngeldPlus = halber Betrag, doppelt so lang — ideal wenn Sie früh wieder arbeiten.' },
      { nr: 3, titel: 'Dokumente einreichen', text: 'Alle Dokumente digital hochladen oder per Post an die Elterngeldstelle Ihres Bundeslandes schicken.', tipp: 'Die Elterngeldstelle ist oft beim Versorgungsamt oder Landesamt für Soziales.' }
    ],
    formularhilfe: [
      { feld: 'Bemessungszeitraum', erklaerung: 'Die letzten 12 Monate Gehalt vor der Geburt (oder vor Mutterschutzfrist). Selbständige: letzter Steuerbescheid.' },
      { feld: 'Lebensmonate', erklaerung: 'Wählen Sie die Monate in denen Sie Elterngeld möchten (z.B. Monat 1–14 für vollen Bezug). Flexible Aufteilung möglich.' },
      { feld: 'Gleichzeitig Teilzeit', erklaerung: 'Sie können bis zu 32 Std./Woche arbeiten und trotzdem Elterngeld beziehen (ElterngeldPlus).' }
    ]
  },
  {
    id: 'kita-zuschuss',
    name: 'Kita-Zuschuss / Beitragsbefreiung',
    emoji: '🏫',
    beschreibung: 'Viele Bundesländer übernehmen Kita-Gebühren ganz oder teilweise — je nach Land sehr unterschiedlich.',
    betrag: 'Komplett bis zur Hälfte der Gebühren (je nach Bundesland)',
    behoerde: 'Jugendamt / Kita-Träger / Sozialamt',
    dauer: '2–4 Wochen',
    voraussetzungen: [
      'Kind besucht eine Kita / Kindertagespflege',
      'Je nach Bundesland: Einkommensabhängig oder für alle',
      'Alleinerziehende oft bevorzugt behandelt'
    ],
    dokumente: [
      'Anmeldung in der Kita (Betreuungsvertrag)',
      'Einkommensnachweise',
      'Personalausweis',
      'Ggf. Bescheinigung über Alleinerziehend-Status',
      'Ggf. Nachweis Erwerbstätigkeit oder Ausbildung'
    ],
    schritte: [
      { nr: 1, titel: 'Bundesland-Regelung prüfen', text: 'Wählen Sie oben Ihr Bundesland um zu sehen welche Förderung bei Ihnen gilt. Rheinland-Pfalz und Thüringen z.B. sind komplett beitragsfrei!', tipp: 'Ihr Bundesland oben auswählen → Kita-Zuschuss Link klicken.' },
      { nr: 2, titel: 'Beim Jugendamt oder Kita anfragen', text: 'Fragen Sie direkt bei Ihrer Kita oder beim Jugendamt nach dem "Antrag auf Ermäßigung der Elternbeiträge" oder "Gebührenbefreiung".', tipp: 'Viele Kitas wissen selbst am besten welche Förderung vor Ort gilt.' },
      { nr: 3, titel: 'Antrag stellen', text: 'Füllen Sie den Antrag aus, reichen Sie die Dokumente ein. Bei Bürgergeld-Bezug ist die Kita oft automatisch kostenlos.', tipp: 'Bildung und Teilhabe (BuT) übernimmt das Mittagessen in der Kita!' }
    ],
    formularhilfe: [
      { feld: 'Betreuungsumfang', erklaerung: 'Stunden pro Woche die Ihr Kind in der Kita ist. Mehr Stunden = mehr Förderanspruch in vielen Ländern.' },
      { feld: 'Grund der Betreuung', erklaerung: 'Erwerbstätigkeit, Ausbildung, Arbeitsuche — Alleinerziehende mit Erwerbstätigkeit haben oft Priorität.' }
    ]
  },
  {
    id: 'bildungsgutschein',
    name: 'Bildungsgutschein / Weiterbildung',
    emoji: '🎓',
    beschreibung: 'Kostenlose Weiterbildung auf Kosten des Jobcenters — Sprachen, IT, Pflege, Kaufmann und mehr.',
    betrag: 'Kurskosten 100 % übernommen + ggf. Fahrtkostenerstattung',
    behoerde: 'Jobcenter oder Arbeitsagentur',
    dauer: '2–4 Wochen bis zur Ausgabe des Gutscheins',
    voraussetzungen: [
      'Bürgergeld-Bezug oder drohende Arbeitslosigkeit',
      'Weiterbildung verbessert Ihre Chancen auf dem Arbeitsmarkt',
      'Kurs bei einer zugelassenen Bildungseinrichtung (AZAV-zertifiziert)',
      'Auch für Erwerbstätige möglich (über Arbeitsagentur)'
    ],
    dokumente: [
      'Personalausweis',
      'Ggf. letzter Einkommenssteuerbescheid',
      'Bescheinigung Bildungseinrichtung (AZAV-Zulassung)',
      'Kursinformationen (Inhalt, Dauer, Kosten)',
      'Ggf. Schul- oder Berufsabschlusszeugnis'
    ],
    schritte: [
      { nr: 1, titel: 'Kurs auswählen', text: 'Schauen Sie sich auf kursnet.arbeitsagentur.de oder bei lokalen VHS, IHK, Bildungszentren um. Wichtig: Der Kurs muss bei einer AZAV-zertifizierten Einrichtung stattfinden.', tipp: 'kursnet.arbeitsagentur.de → Suchbegriff eingeben → "AZAV-zertifiziert" filtern' },
      { nr: 2, titel: 'Beratungsgespräch beim Jobcenter / Arbeitsagentur', text: 'Vereinbaren Sie einen Termin und sagen Sie explizit: "Ich möchte einen Bildungsgutschein beantragen." Bringen Sie Informationen zu dem Kurs mit den Sie machen möchten.', tipp: 'Als Alleinerziehende haben Sie oft bevorzugten Anspruch — betonen Sie das in der Beratung!' },
      { nr: 3, titel: 'Bildungsgutschein erhalten', text: 'Der Berater stellt den Bildungsgutschein aus. Dieser gilt für einen bestimmten Zeitraum und Kursinhalt. Mit dem Gutschein melden Sie sich direkt bei der Bildungseinrichtung an.', tipp: 'Fragen Sie nach Fahrtkostenzuschuss, Kinderbetreuungskosten und ggf. Unterhaltsgeld während der Weiterbildung!' },
      { nr: 4, titel: 'Kurs belegen und abschließen', text: 'Nehmen Sie regelmäßig am Kurs teil — das Jobcenter kann bei unentschuldigtem Fernbleiben den Gutschein widerrufen. Nach erfolgreichem Abschluss: Zertifikat fürs Profil!', tipp: 'Viele Kurse enden mit einer IHK- oder HWK-Prüfung — das steigert den Marktwert erheblich!' }
    ],
    formularhilfe: [
      { feld: 'Kursziel / Bildungsziel', erklaerung: 'Was möchten Sie lernen und warum? Begründen Sie den Nutzen für Ihre Arbeitsuche — konkret: "Ich möchte als Bürokraft arbeiten und brauche Excel-Kenntnisse."' },
      { feld: 'Berufliches Ziel', erklaerung: 'Welche Stelle streben Sie danach an? Je klarer das Ziel, desto höher die Chance auf Genehmigung.' },
      { feld: 'Kostenplan des Kurses', erklaerung: 'Der Bildungsträger stellt ein Angebot aus. Die Gesamtkosten müssen im Gutschein stehen.' }
    ]
  },
  {
    id: 'rentenauskunft',
    name: 'Rentenauskunft & Kontenklärung',
    emoji: '🏦',
    beschreibung: 'Kostenlose Übersicht Ihrer Rentenansprüche — und Lücken schließen bevor es zu spät ist.',
    betrag: 'Keine Auszahlung — aber rechtzeitig geplant = mehr Rente später',
    behoerde: 'Deutsche Rentenversicherung (DRV)',
    dauer: 'Auskunft online sofort, schriftlich 4–8 Wochen',
    voraussetzungen: [
      'Alle Personen mit gesetzlicher Rentenversicherung',
      'Auch für Minijobber, Selbständige und Kindererziehungszeiten',
      'Kostenlosen Beratungstermin kann jeder buchen'
    ],
    dokumente: [
      'Versicherungsausweis / Rentenversicherungsnummer (steht auf Krankenkassenkarte)',
      'Ggf. alte Sozialversicherungsnachweise (frühere Arbeitgeber)',
      'Ggf. Schulzeugnis / Studiennachweis für Anrechnungszeiten',
      'Ggf. Nachweise über Kindererziehungszeiten'
    ],
    schritte: [
      { nr: 1, titel: 'Online-Rentenkonto einrichten', text: 'Auf rvRecht.de oder deutscherentenversicherung.de ein Online-Konto anlegen. Dort sehen Sie sofort Ihre bisherigen Beitragszeiten und den voraussichtlichen Rentenbetrag.', tipp: 'App "MeineDRV" installieren — schnellster Weg zur Rentenübersicht und für Anträge.' },
      { nr: 2, titel: 'Kindererziehungszeiten prüfen', text: 'Für jedes Kind unter 3 Jahren werden automatisch Rentenpunkte gutgeschrieben — aber nur wenn die Zeiten auch gemeldet sind! Diese Prüfung ist besonders für Alleinerziehende wichtig.', tipp: 'Kindererziehungszeiten = 3 Jahre pro Kind mit Rentenpunkten. Unbedingt prüfen ob alle eingetragen sind!' },
      { nr: 3, titel: 'Kontenklärung beantragen', text: 'Falls Lücken im Rentenkonto sind (Ausbildung, Jobs die nicht gemeldet wurden): Formular V0100 für Kontenklärung einreichen. Die DRV prüft dann alle Zeiten.', tipp: 'Alte Zeugnisse, Arbeitsverträge oder Sozialbeitragsauszüge können fehlende Zeiten belegen.' },
      { nr: 4, titel: 'Beratungstermin buchen', text: 'Kostenlose Beratung in über 200 DRV-Beratungsstellen deutschlandweit. Onlinetermile über deutscherentenversicherung.de buchbar.', tipp: 'Fragen Sie nach: Wann lohnt sich freiwillige Einzahlung? Wie hoch ist die Rente bei Erwerbsminderung?' }
    ],
    formularhilfe: [
      { feld: 'Versicherungsnummer', erklaerung: 'Beginnt mit einem zweistelligen Geburtsjahr gefolgt von Buchstaben und Ziffern. Steht auf dem Sozialversicherungsausweis oder der Krankenkassenkarte.' },
      { feld: 'Kindererziehungszeiten', erklaerung: 'Für jedes Kind bekommen Sie 3 Jahre Rentenbeitragsgutschrift — muss bei der DRV beantragt/gemeldet werden.' },
      { feld: 'Lücken im Versicherungsverlauf', erklaerung: 'Zeiten ohne Eintrag (Ausbildung, Urlaub, Ausland) können manchmal noch angerechnet werden — DRV prüft das.' }
    ]
  },
  {
    id: 'beratungshilfe',
    name: 'Beratungshilfe (kostenlose Rechtsberatung)',
    emoji: '⚖️',
    beschreibung: 'Kostenlose oder sehr günstige Rechtsberatung beim Anwalt — für alle mit geringem Einkommen.',
    betrag: 'Anwaltsberatung für 15 € statt mehrerer hundert Euro',
    behoerde: 'Amtsgericht Ihrer Gemeinde (Abteilung Beratungshilfe)',
    dauer: 'Berechtigungsschein sofort / Beratung innerhalb 1–2 Wochen',
    voraussetzungen: [
      'Einkommen unter der Bedürftigkeitsgrenze (ca. 700–1.000 € Netto nach Abzügen)',
      'Bürgergeld-Bezug = automatisch anspruchsberechtigt',
      'Das Rechtsproblem muss in Deutschland lösbar sein',
      'Kein anderer zumutbarer Weg zur Hilfe (z.B. kein Verein kostenlos zuständig)'
    ],
    dokumente: [
      'Personalausweis',
      'Nachweis über Einkommen (letzter Lohnzettel oder Bürgergeld-Bescheid)',
      'Kurze schriftliche Beschreibung Ihres Rechtsproblems',
      'Ggf. vorhandene Unterlagen zum Fall (Briefe, Bescheide, Verträge)'
    ],
    schritte: [
      { nr: 1, titel: 'Amtsgericht aufsuchen', text: 'Gehen Sie zum Amtsgericht in Ihrer Stadt — Abteilung Beratungshilfe (auch "Rechtspfleger"). Bringen Sie Einkommensnachweis und kurze Beschreibung Ihres Problems mit.', tipp: 'Termin meist nicht nötig — viele Amtsgerichte haben offene Sprechstunden am Vormittag.' },
      { nr: 2, titel: 'Berechtigungsschein erhalten', text: 'Der Rechtspfleger prüft Ihr Einkommen und stellt einen "Berechtigungsschein für Beratungshilfe" (Beratungsschein) aus.', tipp: 'Der Schein gilt für ein konkretes Rechtsproblem (z.B. "Unterhaltssachen").' },
      { nr: 3, titel: 'Anwalt aufsuchen', text: 'Nehmen Sie den Berechtigungsschein zu einem Anwalt Ihrer Wahl. Der Anwalt berät Sie zum Preis von 15 € statt der normalen Gebühren.', tipp: 'Anwalt-Suche: rechtsanwaltskammer.de → Fachanwalt für Familienrecht / Sozialrecht' },
      { nr: 4, titel: 'Bei Gericht: Prozesskostenhilfe beantragen', text: 'Falls es zum Gerichtsverfahren kommt (z.B. Unterhaltsklage): Prozesskostenhilfe (PKH) separat beim Gericht beantragen — übernimmt alle Anwalts- und Gerichtskosten.', tipp: 'PKH-Formular vom Gericht holen oder online: "Formular Prozesskostenhilfe [Bundesland]"' }
    ],
    formularhilfe: [
      { feld: 'Art des Rechtsproblems', erklaerung: 'Kurz beschreiben: "Unterhaltsproblem", "Mietstreit", "Ärger mit Jobcenter", "Sorgerechtsstreit" — je konkreter, desto besser.' },
      { feld: 'Einkommensnachweis', erklaerung: 'Letzter Lohnzettel, Bürgergeld-Bescheid oder Einkommenssteuerbescheid. Bei keinem Einkommen: Kontoauszug zeigen.' },
      { feld: 'Vermögen', erklaerung: 'Sparguthaben über 5.000 € kann ausschließen. Normales Konto für Lebenshaltung wird nicht angerechnet.' }
    ]
  },
  {
    id: 'haushaltshilfe',
    name: 'Haushaltshilfe bei Krankheit',
    emoji: '🏠',
    beschreibung: 'Krankenkasse schickt kostenlose Hilfe zum Haushalt wenn Sie als Alleinerziehende krank sind und Kinder zu versorgen sind.',
    betrag: 'Meist kostenlos (Eigenanteil je nach Kasse 0–10 € / Tag)',
    behoerde: 'Ihre Krankenkasse',
    dauer: 'Antrag meist gleich genehmigt — Hilfe oft ab nächstem Tag',
    voraussetzungen: [
      'Sie sind krank (ärztliches Attest nötig)',
      'Kind unter 12 Jahren im Haushalt',
      'Sie können wegen der Krankheit den Haushalt nicht führen',
      'Als Alleinerziehende haben Sie besonders guten Anspruch'
    ],
    dokumente: [
      'Ärztliches Attest (Arbeitsunfähigkeitsbescheinigung)',
      'Ggf. Krankenhauseinweisungsbescheinigung',
      'Geburtsurkunden der Kinder',
      'Personalausweis'
    ],
    schritte: [
      { nr: 1, titel: 'Arzt aufsuchen und Attest holen', text: 'Der Arzt stellt eine Arbeitsunfähigkeitsbescheinigung aus. Bitten Sie explizit um ein Attest für die Haushaltshilfe — "Ich bin alleinerziehend und brauche Haushaltshilfe."', tipp: 'Viele Ärzte stellen dieses Attest gerne aus wenn Sie auf Ihre Situation als Alleinerziehende hinweisen.' },
      { nr: 2, titel: 'Krankenkasse sofort anrufen', text: 'Rufen Sie noch am selben Tag Ihre Krankenkasse an und beantragen Sie Haushaltshilfe. Geben Sie an: krank, Kind unter 12, alleinerziehend.', tipp: 'Die meisten großen Krankenkassen (TK, AOK, Barmer) haben 24/7-Hotlines und genehmigen sehr schnell.' },
      { nr: 3, titel: 'Hilfsperson wird vermittelt', text: 'Die Krankenkasse vermittelt eine Haushaltshelferin oder übernimmt die Kosten für eine selbst gefundene Person (z.B. Nachbarin). Alle Aufgaben: Kochen, Einkaufen, Wäsche, Kinder betreuen.', tipp: 'Eigene Vertrauensperson (Oma, Nachbarin) kann als Haushaltshilfe gemeldet werden — Kasse zahlt dann an diese Person.' }
    ],
    formularhilfe: [
      { feld: 'Art und Dauer der Erkrankung', erklaerung: 'Was haben Sie? Wie lange? Operation, Grippe, psychische Erkrankung — alles kann berechtigen solange das Attest vorliegt.' },
      { feld: 'Kinder im Haushalt', erklaerung: 'Name und Alter aller Kinder unter 12. Je jünger die Kinder, desto dringlicher der Anspruch.' },
      { feld: 'Haushaltshilfe-Person', erklaerung: 'Krankenkasse vermittelt jemanden oder Sie schlagen jemanden vor. Falls eigene Person: Name, Adresse, Bankverbindung angeben.' }
    ]
  },
  {
    id: 'unterhalt-titel',
    name: 'Unterhaltstitel beim Jugendamt',
    emoji: '📜',
    beschreibung: 'Kostenlose rechtssichere Festlegung des Kindesunterhalts — damit der Unterhalt einklagbar ist.',
    betrag: 'Kein Kostenpunkt — Unterhalt nach Düsseldorfer Tabelle',
    behoerde: 'Jugendamt (Beistandschaft)',
    dauer: '2–4 Wochen bis zur Beurkundung',
    voraussetzungen: [
      'Kind lebt bei Ihnen',
      'Anderer Elternteil zahlt Unterhalt oder soll dazu verpflichtet werden',
      'Auch ohne Gerichtsverfahren möglich!'
    ],
    dokumente: [
      'Geburtsurkunde des Kindes',
      'Personalausweise beider Elternteile',
      'Ggf. Nachweis über Einkommen des unterhaltspflichtigen Elternteils',
      'Ggf. Scheidungsurteil oder Trennungsvereinbarung'
    ],
    schritte: [
      { nr: 1, titel: 'Jugendamt kontaktieren', text: 'Rufen Sie das Jugendamt an und bitten Sie um einen Termin bei der "Beistandschaft". Der Beistand unterstützt Sie kostenlos bei der Geltendmachung von Unterhaltsansprüchen.', tipp: 'Der Beistand übernimmt dann für Sie die gesamte Kommunikation mit dem anderen Elternteil.' },
      { nr: 2, titel: 'Beurkundung vornehmen', text: 'Beim Jugendamt wird eine "Jugendamtsurkunde" erstellt. Das ist ein vollstreckbarer Titel — wie ein Gerichtsurteil. Wenn der andere Elternteil nicht zahlt, können Sie direkt vollstrecken lassen.', tipp: 'Der andere Elternteil muss zustimmen. Falls er/sie das ablehnt: Klage beim Familiengericht — auch dort mit Kostenbefreiung möglich.' },
      { nr: 3, titel: 'Vollstreckung bei Nichtzahlung', text: 'Falls der Unterhalt trotz Titel nicht kommt: Antrag auf Zwangsvollstreckung beim Amtsgericht stellen (Lohnpfändung, Kontopfändung). Oder erst Unterhaltsvorschuss beim Jugendamt beantragen.', tipp: 'Jugendamt hilft auch bei der Vollstreckung — als Beistand vertreten sie Ihr Kind kostenlos.' }
    ],
    formularhilfe: [
      { feld: 'Unterhaltsberechnung', erklaerung: 'Unterhalt richtet sich nach der "Düsseldorfer Tabelle" — Einkommen des zahlenden Elternteils bestimmt den Betrag. Jugendamt berechnet das für Sie.' },
      { feld: 'Beistandschaft beantragen', erklaerung: 'Wenn Sie möchten dass das Jugendamt dauerhaft für Sie aktiv ist: Beistandschaft beantragen. Kostenfrei und jederzeit widerrufbar.' }
    ]
  },
  {
    id: 'bafoeg',
    name: 'BAföG / Ausbildungsförderung',
    emoji: '📖',
    beschreibung: 'Staatliche Förderung für Studium und Ausbildung — als Alleinerziehende erhöhte Zuschläge.',
    betrag: 'bis 1.134 € / Monat (je nach Einkommen und Wohnsituation)',
    behoerde: 'Studenten-/Schülerwerk oder BAföG-Amt',
    dauer: '4–8 Wochen bis zur Bewilligung',
    voraussetzungen: [
      'Ausbildung oder Studium an staatlich anerkannter Einrichtung',
      'Unter 30 (Studium) oder unter 45 (Meister/Aufstiegs-BAföG)',
      'Einkommen der Eltern oder eigenes Einkommen unter Freibetrag',
      'Kinder unter 10 Jahren: Kinderzuschlag auf BAföG!'
    ],
    dokumente: [
      'Immatrikulationsbescheinigung oder Ausbildungsnachweis',
      'Einkommenssteuerbescheide der Eltern (letztes Jahr)',
      'Eigene Einkommensnachweise',
      'Ggf. Geburtsurkunden der Kinder',
      'Mietvertrag / Wohnkostennachweis',
      'Personalausweis'
    ],
    schritte: [
      { nr: 1, titel: 'Online-Antrag über BAföG-Digital', text: 'Der BAföG-Antrag kann vollständig über bafoeg-digital.de eingereicht werden. Dokumente hochladen, fertig. Kein Gang zur Behörde nötig.', tipp: 'bafoeg-digital.de → Bundesland wählen → Online-Antrag → Schritt für Schritt ausfüllen' },
      { nr: 2, titel: 'Kinderzuschlag beantragen', text: 'Als Alleinerziehende bekommen Sie einen Kinderzuschlag von 178 € / Kind / Monat auf das BAföG. Unbedingt im Antrag angeben!', tipp: 'Kinderzuschlag im BAföG gilt bis das Kind 10 Jahre alt ist — dann anderweitige Kinderbetreuungskosten absetzbar.' },
      { nr: 3, titel: 'Bescheid prüfen', text: 'Nach der Bewilligung: Wird der Betrag als Vollzuschuss oder als Darlehen gewährt? BAföG wird zur Hälfte als zinsloses Darlehen gewährt — max. Rückzahlung 10.010 €.', tipp: 'Bei schlechter Benotung kann BAföG entzogen werden. Leistungsnachweis (Formblatt 5) rechtzeitig einreichen!' }
    ],
    formularhilfe: [
      { feld: 'Kinderzuschlag', erklaerung: 'Formular "Anlage Kind" ausfüllen. Pro Kind unter 10 Jahren: 178 € / Monat Zuschlag auf den BAföG-Satz.' },
      { feld: 'Eigenes Einkommen', erklaerung: 'Freibetrag für Verdienst neben dem Studium: 520 € / Monat. Darüber: BAföG wird anteilig gekürzt.' },
      { feld: 'Elterneinkommen', erklaerung: 'Eltern-Einkommen des vorletzten Jahres entscheidet. Falls Eltern nicht zahlen wollen: "elternunabhängiges BAföG" möglich ab 25 oder nach 5 Jahren Erwerbstätigkeit.' }
    ]
  },
  // ===== KITA-ANTRÄGE =====
  {
    id: 'kita-anmeldung',
    name: 'Kita-Anmeldung',
    emoji: '🏫',
    behoerde: 'Kindertagesstätte / Stadt',
    betrag: 'Einkommensabhängig (oft kostenlos)',
    beschreibung: 'Anmeldung für Kindertagesbetreuung — Krippe (0-3 J.) oder Kindergarten (3-6 J.). Anspruch ab dem 1. Geburtstag (Bundesgesetz).',
    dauer: '8-52 Wochen Wartezeit',
    kategorie: 'kinder',
    schritte: [
      { nr:1, titel:'Frühzeitig planen', text:'In Großstädten (München, Berlin, Hamburg, Frankfurt) IDEALERWEISE 12 Monate vor gewünschtem Start anmelden. Auf dem Land oft kürzere Wartezeit.', tipp:'Tipp: schon in der Schwangerschaft anmelden — Plätze sind knapp!' },
      { nr:2, titel:'Wunsch-Kita finden', text:'Online suchen: Stadt-Webseite oder kita.de. Kriterien prüfen: Öffnungszeiten, pädagogisches Konzept, Verkehrsanbindung, Kosten. Mehrere Kitas auf Liste setzen!' },
      { nr:3, titel:'Besichtigungstermine', text:'Mehrere Kitas besuchen — Atmosphäre prüfen, Personal kennenlernen, andere Eltern fragen. Bauchgefühl ist wichtig.' },
      { nr:4, titel:'Anmeldung einreichen', text:'Auf Wartelisten setzen lassen — meist gleichzeitig auf 3-5 Listen. In manchen Städten zentrales Anmeldesystem (z.B. Berlin: kita-navigator.de).', tipp:'Bestätigung der Anmeldung schriftlich einfordern.' },
      { nr:5, titel:'Zusage abwarten', text:'Meist 3-6 Monate vor Beginn kommt die Zusage. Bei Absage: Widerspruch (Klage auf Kita-Platz möglich!) oder Tagesmutter als Alternative.' },
      { nr:6, titel:'Eingewöhnung planen', text:'2-4 Wochen Eingewöhnung mit Begleitung — meist nach Berliner oder Münchner Modell. Urlaub einplanen!' }
    ],
    dokumente: [
      'Geburtsurkunde des Kindes',
      'Personalausweis der Eltern',
      'Meldebescheinigung',
      'Impfpass (Masern-Impfpflicht!)',
      'U-Untersuchungsheft',
      'Einkommensnachweis (für Beitragsstaffelung)',
      'Bei Alleinerziehenden: Negativbescheinigung Vater/Mutter'
    ],
    voraussetzungen: [
      'Kind hat Wohnsitz in der Stadt/Gemeinde',
      'Mindestalter (meist 1 Jahr für Krippe, 3 Jahre für KiGa)',
      'Masern-Impfung nachgewiesen (Pflicht seit 2020!)',
      'Bei Vollzeitplatz: oft Berufstätigkeit beider Eltern erforderlich'
    ],
    formularhilfe: [
      { feld:'Bedarfsstunden', erklaerung:'Halbtags (4-5h), 3/4-Tag (6-7h), Ganztag (8-10h). Berufstätigkeit angeben für Anspruch auf Ganztag.' },
      { feld:'Mehrere Kitas anmelden', erklaerung:'Sehr empfohlen! Sie können auf vielen Listen sein. Erst zusagen wenn Sie sicher sind. Andere Listen dann absagen.' },
      { feld:'Geschwisterkind', erklaerung:'Geschwisterregelung: Bei vorhandenem Kita-Kind oft Vorrang für Geschwister. Bei Anmeldung erwähnen!' },
      { feld:'Berufstätigkeit Eltern', erklaerung:'Arbeitgeber-Bestätigung (Stunden, Arbeitszeit) erhöht Chance auf Ganztagsplatz.' }
    ]
  },
  {
    id: 'kita-gebuehrenermaessigung',
    name: 'Kita-Gebühren-Befreiung',
    emoji: '💶',
    behoerde: 'Jugendamt / Stadt',
    betrag: 'Bis 100% Erlass',
    beschreibung: 'Befreiung oder Reduzierung der Kita-Gebühren bei niedrigem Einkommen. Bei Bürgergeld/Wohngeld meist 100% kostenlos.',
    dauer: '4-8 Wochen',
    kategorie: 'kinder',
    schritte: [
      { nr:1, titel:'Anspruch prüfen', text:'In allen Bundesländern unterschiedlich. Bei Bürgergeld/Wohngeld: meist automatisch kostenlos. Bei niedrigem Einkommen: gestaffelte Beiträge.', tipp:'Berlin: Kita kostenlos für alle (kein Antrag nötig). NRW: letztes Kita-Jahr kostenlos.' },
      { nr:2, titel:'Antrag holen', text:'Beim Jugendamt oder direkt bei der Kita. Auch online auf der Webseite der Stadt verfügbar.' },
      { nr:3, titel:'Einkommen nachweisen', text:'Letzte 3 Monate Lohnabrechnungen oder aktueller Steuerbescheid. Bei Bürgergeld: Bewilligungsbescheid.' },
      { nr:4, titel:'Antrag einreichen', text:'An Jugendamt der Wohngemeinde — schriftlich oder per Mail mit allen Nachweisen.' },
      { nr:5, titel:'Bescheid erhalten', text:'Innerhalb 4-8 Wochen. Befreiung gilt meist für 12 Monate, dann Folgeantrag.' }
    ],
    dokumente: [
      'Kita-Vertrag',
      'Lohnabrechnungen (letzte 3 Monate)',
      'Mietvertrag + Mietnachweis',
      'Bei Bürgergeld: Bewilligungsbescheid',
      'Wohngeldbescheid (falls vorhanden)',
      'Personalausweis',
      'Bankverbindung'
    ],
    voraussetzungen: [
      'Kita-Platz vorhanden',
      'Einkommen unter Grenze (variiert nach Stadt)',
      'Wohnsitz in der Gemeinde',
      'Bei Alleinerziehenden: Höhere Einkommensgrenzen'
    ],
    formularhilfe: [
      { feld:'Einkommensnachweis', erklaerung:'Brutto + Netto, alle Einkünfte! Auch Unterhalt, Kindergeld zählt mit zur Berechnung.' },
      { feld:'Geschwister im Haushalt', erklaerung:'Pro Geschwisterkind erhöht sich Freibetrag. Mehrkindstaffel beachten — oft erstes Kind teuer, zweites halber Preis.' },
      { feld:'Bürgergeld-Empfänger', erklaerung:'Mit Bürgergeld-Bescheid sofortige 100%-Befreiung. Auch Ferien-Betreuung kostenlos!' }
    ]
  },
  // ===== SCHULFORMULARE =====
  {
    id: 'einschulung',
    name: 'Schulanmeldung (Einschulung)',
    emoji: '🎒',
    behoerde: 'Grundschule im Schulbezirk',
    betrag: 'Kostenlos',
    beschreibung: 'Anmeldung an der Grundschule — Pflicht im Jahr vor der Einschulung (Kind wird bis 30.09. 6 Jahre alt).',
    dauer: '1 Tag (Anmeldung) + Schuleignungstest',
    kategorie: 'kinder',
    schritte: [
      { nr:1, titel:'Schulbezirk klären', text:'Sie sind dem Schulbezirk Ihrer Wohnadresse zugeordnet. Liste auf Stadt-Webseite oder Anruf beim Schulamt.', tipp:'Wechsel an andere Schule möglich? Antrag auf Gastschulgenehmigung.' },
      { nr:2, titel:'Anmeldetermin wahrnehmen', text:'Im Herbst (Oktober/November) vor dem Einschulungs-Sommer. Schule schickt Einladung an Eltern (über Einwohnermeldeamt).', tipp:'Termin nicht verpassen — sonst zusätzlicher Aufwand.' },
      { nr:3, titel:'Schuleignungstest', text:'Kinder werden auf Sprache, Motorik, Konzentration getestet. KEIN Leistungstest — nur Reife-Check.' },
      { nr:4, titel:'Schulärztliche Untersuchung', text:'Termin beim Gesundheitsamt — Hör-, Seh-, Sprachtest, Impfschutz. Pflicht!' },
      { nr:5, titel:'Schulranzen + Material', text:'Erst NACH Anmeldung — Schule gibt Liste mit benötigten Materialien.' },
      { nr:6, titel:'Einschulung im August/September', text:'Erste Schulwoche meist halbtags zur Eingewöhnung. Schultüte, Foto, Familienfeier!' }
    ],
    dokumente: [
      'Geburtsurkunde des Kindes',
      'Stammbuch der Familie',
      'Personalausweis Eltern',
      'Meldebescheinigung',
      'Impfpass (Masern-Impfpflicht!)',
      'U-Untersuchungsheft (U9 muss aktuell sein)',
      'Bei Trennung/Scheidung: Sorgerechtsbescheinigung'
    ],
    voraussetzungen: [
      'Kind wohnt im Schulbezirk',
      'Kind wird bis 30.09. 6 Jahre alt (Stichtag variiert leicht je Bundesland)',
      'Schulreife (wird im Test geprüft)',
      'Masern-Impfung'
    ],
    formularhilfe: [
      { feld:'Wahl des Schultyps', erklaerung:'Grundschule ist Pflicht. Religionsunterricht: bei Anmeldung wählen (evangelisch, katholisch, Ethik, ggf. islamisch). Kann später geändert werden.' },
      { feld:'Schulwechsel', erklaerung:'Gastschulgenehmigung — Antrag mit Begründung (Geschwisterkind, Arbeitsweg). Schule entscheidet, nicht garantiert.' },
      { feld:'Zurückstellung', erklaerung:'Wenn Kind noch nicht reif scheint: Antrag auf Zurückstellung um 1 Jahr — meist mit Gutachten.' },
      { feld:'Vorzeitige Einschulung', erklaerung:'Bei sehr begabten Kindern unter 6 — Eignungstest + Antrag.' }
    ]
  },
  {
    id: 'klassenfahrt-zuschuss',
    name: 'Klassenfahrt-Zuschuss (BuT)',
    emoji: '🚌',
    behoerde: 'Jobcenter / Sozialamt',
    betrag: 'Volle Übernahme der Kosten',
    beschreibung: 'Bildungs- und Teilhabepaket: Übernahme von Klassenfahrten, Schulausflügen, Schulmaterial bei Bürgergeld/Wohngeld/Kinderzuschlag.',
    dauer: '2-4 Wochen',
    kategorie: 'kinder',
    schritte: [
      { nr:1, titel:'Anspruchsberechtigung prüfen', text:'BuT für Empfänger von: Bürgergeld, Sozialhilfe, Wohngeld, Kinderzuschlag, Asylbewerberleistungen. Auch bei niedrigem Einkommen ohne Leistungsbezug möglich.' },
      { nr:2, titel:'Kostenvoranschlag holen', text:'Schule gibt schriftlichen Kostenvoranschlag — Klassenfahrt, Lernmaterial, Schulausflug, Schulranzen. Datum + Betrag wichtig.' },
      { nr:3, titel:'Antrag stellen', text:'Beim Jobcenter (Bürgergeld) oder Wohngeldstelle. Online-Antrag oder Formular. Meist gleicher Antrag wie Bürgergeld-Antrag.', tipp:'Antrag VOR der Klassenfahrt — nachträglich oft Probleme!' },
      { nr:4, titel:'Genehmigung abwarten', text:'2-4 Wochen Bearbeitungszeit. Bei dringenden Fällen: Eilantrag möglich.' },
      { nr:5, titel:'Auszahlung', text:'Direkt an Schule oder Erstattung an Eltern (vorher klären, was Schule bevorzugt).' }
    ],
    dokumente: [
      'Bürgergeld-/Wohngeld-Bescheid',
      'Schulbescheinigung',
      'Kostenvoranschlag der Schule',
      'Klassenfahrt-Programm',
      'Bankverbindung'
    ],
    voraussetzungen: [
      'Empfänger von Bürgergeld, Wohngeld, Sozialhilfe oder Kinderzuschlag',
      'Schulpflichtiges Kind',
      'Klassenfahrt/Schulausflug ist von Schule organisiert'
    ],
    formularhilfe: [
      { feld:'Was wird übernommen?', erklaerung:'150 €/Schuljahr für Lernmaterial (Schulranzen, Hefte). KOMPLETTE Klassenfahrt-Kosten. 15 €/Monat für Vereinsbeiträge. Mittagessen Schule. Nachhilfe bis 250 €/Monat.' },
      { feld:'Bildungs-Karte', erklaerung:'Manche Städte: Karte für Kinder mit Guthaben für Sport, Musikschule, Kino. Beim Jobcenter erfragen.' }
    ]
  },
  // ===== PFLEGEGRAD =====
  {
    id: 'pflegegrad',
    name: 'Pflegegrad beantragen',
    emoji: '🩺',
    behoerde: 'Pflegekasse (bei Krankenkasse)',
    betrag: '316–2.005 € / Monat (je nach Grad)',
    beschreibung: 'Anerkennung von Pflegebedürftigkeit (Pflegegrad 1-5) für ältere Menschen, Behinderte oder schwer kranke Kinder. Rechtsanspruch auf Geld + Sachleistungen.',
    dauer: '5 Wochen Bearbeitung + MD-Begutachtung',
    kategorie: 'gesundheit',
    schritte: [
      { nr:1, titel:'Antrag bei Pflegekasse', text:'Formloser Antrag — telefonisch, schriftlich oder online. Wichtig: Antragsdatum zählt für Rückwirkung!', tipp:'Frühestmöglich beantragen — auch im Krankenhaus möglich!' },
      { nr:2, titel:'Pflegetagebuch führen', text:'2-4 Wochen vor Begutachtung dokumentieren: Wann braucht die Person Hilfe? Wie lange? Wobei? Vorlage gibts bei Pflegekasse.', tipp:'Sehr wichtig — beweist Pflegebedarf objektiv!' },
      { nr:3, titel:'Begutachtung MD', text:'Medizinischer Dienst (MD) kommt nach Hause oder ins Krankenhaus. Dauer 30-60 Min. Alle Helfer (Familie) sollten dabei sein.', tipp:'Nicht beschönigen! Schlechtester Tag schildern. Beratung beim Sozialverband VdK kostenlos!' },
      { nr:4, titel:'Bescheid abwarten', text:'Pflegekasse entscheidet auf Basis des MD-Gutachtens. 5 Wochen Frist (außer Krankenhaus = 1 Woche).' },
      { nr:5, titel:'Bei Ablehnung: Widerspruch', text:'Innerhalb 1 Monat Widerspruch einlegen. ÜBER 50% der Widersprüche erfolgreich! Sozialverbände helfen kostenlos.', tipp:'Niemals einfach hinnehmen — Widerspruch lohnt sich fast immer.' },
      { nr:6, titel:'Leistungen beantragen', text:'Nach Anerkennung: Pflegegeld (Pflege durch Angehörige) oder Pflegesachleistung (Pflegedienst) wählen. Auch Pflegehilfsmittel (40 €/Monat), Hausnotruf, Kurzzeitpflege.' }
    ],
    dokumente: [
      'Personalausweis',
      'Krankenkassen-Karte',
      'Bisherige Arzt-Atteste',
      'Krankenhausberichte',
      'Pflegetagebuch (selbst geführt)',
      'Liste aller Medikamente',
      'Bei Kindern: U-Heft + Schulbescheinigung'
    ],
    voraussetzungen: [
      'Pflegeversichert (jeder gesetzlich/privat Versicherte)',
      'Pflegebedürftigkeit voraussichtlich länger als 6 Monate',
      'Erhebliche Beeinträchtigung der Selbständigkeit'
    ],
    formularhilfe: [
      { feld:'Pflegegrade Übersicht', erklaerung:'Grad 1: Pflegegeld 316 € (geringe Beeinträchtigung). Grad 2: 545 €. Grad 3: 728 €. Grad 4: 1.000 €. Grad 5: 947 € (Pflegegeld) + bis 2.005 € (Pflegesachleistungen). Bei Demenz: gesonderte Bewertung.' },
      { feld:'Pflegegeld vs. Sachleistung', erklaerung:'Pflegegeld: Sie pflegen selbst (oder Angehörige). Sachleistung: Pflegedienst kommt. Kombination möglich (beste Lösung oft).' },
      { feld:'Verhinderungspflege', erklaerung:'Bis 1.612 €/Jahr extra für Vertretung wenn Hauptpfleger Urlaub braucht. + Kurzzeitpflege 1.774 €/Jahr (Heim für 8 Wochen).' },
      { feld:'Kinder mit Behinderung', erklaerung:'Auch Kinder können Pflegegrad bekommen. Begutachtung berücksichtigt altersuntypische Hilfsbedürftigkeit.' },
      { feld:'Wohnumfeldverbesserung', erklaerung:'Bis 4.000 € Zuschuss für Umbau (Treppenlift, ebenerdige Dusche, Türverbreiterung). VOR Umbau beantragen!' }
    ]
  },
  {
    id: 'schwerbehinderung',
    name: 'Schwerbehindertenausweis',
    emoji: '♿',
    behoerde: 'Versorgungsamt',
    betrag: 'Steuer- und Vergünstigungen',
    beschreibung: 'Grad der Behinderung (GdB) ab 50 = Schwerbehindertenausweis. Vorteile: Steuerfreibetrag, Kündigungsschutz, Zusatzurlaub, ÖPNV vergünstigt, Parkausweis.',
    dauer: '3-6 Monate',
    kategorie: 'gesundheit',
    schritte: [
      { nr:1, titel:'Antrag holen', text:'Beim Versorgungsamt (Online oder schriftlich). In manchen Bundesländern: Landesamt für Soziales/Inklusion.' },
      { nr:2, titel:'Ärztliche Befunde sammeln', text:'Alle relevanten Diagnosen, Befunde, Operationsberichte der letzten Jahre. Je vollständiger, desto besser!' },
      { nr:3, titel:'Antrag ausfüllen', text:'Alle Erkrankungen + behandelnde Ärzte angeben. Nichts weglassen! Auch psychische Erkrankungen zählen.' },
      { nr:4, titel:'Begutachtung', text:'Versorgungsamt holt Befunde ein, lässt prüfen. Manchmal eigener Untersuchungstermin.' },
      { nr:5, titel:'Bescheid', text:'GdB von 0-100 in 10er-Schritten. Ab GdB 50 = Schwerbehindertenausweis.' },
      { nr:6, titel:'Bei Ablehnung: Widerspruch', text:'Über 60% Widersprüche erfolgreich! Sozialverband VdK oder Anwalt für Sozialrecht helfen.' }
    ],
    dokumente: [
      'Personalausweis',
      'Krankenkassenkarte',
      'Aktuelle Befunde aller Ärzte',
      'Krankenhaus-Entlassungsberichte',
      'Liste aller Medikamente',
      'Bei Kindern: U-Heft, Förderbescheide'
    ],
    voraussetzungen: [
      'Gesundheitsstörung von Dauer (> 6 Monate)',
      'Auswirkung auf Teilhabe am gesellschaftlichen Leben',
      'Wohnsitz in Deutschland'
    ],
    formularhilfe: [
      { feld:'Merkzeichen', erklaerung:'aG: außergewöhnlich gehbehindert (Behindertenparkplatz). G: gehbehindert (ÖPNV vergünstigt). H: hilflos. B: Begleitperson kostenlos. Bl: blind. Gl: gehörlos. Bei Antrag mitbeantragen!' },
      { feld:'Steuerfreibetrag', erklaerung:'GdB 50: 1.140 € steuerfrei. GdB 80: 2.120 €. GdB 100: 2.840 €. Bei Hilflosigkeit (Merkzeichen H): 7.400 €.' },
      { feld:'Kündigungsschutz', erklaerung:'Mit Schwerbehinderten-Ausweis: besonderer Kündigungsschutz im Job. 5 Tage Zusatzurlaub.' }
    ]
  },
  {
    id: 'foerderbedarf-schule',
    name: 'Sonderpädagogischer Förderbedarf',
    emoji: '🎓',
    behoerde: 'Schule + Schulamt',
    betrag: 'Förderung kostenlos',
    beschreibung: 'Feststellung von Förderbedarf für Kinder mit Lernschwierigkeiten, Behinderung oder Verhaltensauffälligkeiten — ermöglicht Sonderpädagogen, Schulbegleitung, Förderschule.',
    dauer: '3-6 Monate',
    kategorie: 'kinder',
    schritte: [
      { nr:1, titel:'Gespräch mit Lehrer', text:'Bei Auffälligkeiten zuerst mit Klassenlehrer sprechen. Beobachtungen sammeln, Bericht schreiben lassen.' },
      { nr:2, titel:'Antrag stellen', text:'Eltern oder Schule können Antrag auf Feststellung des Förderbedarfs stellen. Beim Schulamt einreichen.', tipp:'Sozialverband oder Verein für Kinder mit Lernschwierigkeiten zur Beratung kontaktieren!' },
      { nr:3, titel:'Diagnostik', text:'Sonderpädagoge testet das Kind: Intelligenztests, Sprachtest, Verhaltensbeobachtung. 2-4 Termine.' },
      { nr:4, titel:'Förderkonferenz', text:'Schule + Schulamt + Eltern besprechen Ergebnisse. Festlegung: welcher Förderbedarf? Welche Schule?' },
      { nr:5, titel:'Bescheid + Förderplan', text:'Schulamt bescheidet. Förderplan wird für Schuljahr erstellt. Wird jährlich überprüft.' }
    ],
    dokumente: [
      'Schulzeugnisse',
      'Beobachtungsbogen Lehrer',
      'Vorhandene Diagnosen (z.B. ADHS, Autismus, LRS)',
      'Schulgesundheitsamt-Berichte',
      'Bei Bedarf: Entwicklungsbericht Kindergarten'
    ],
    voraussetzungen: [
      'Schulpflichtiges Kind',
      'Anhaltende Lernschwierigkeiten oder Verhaltensauffälligkeiten',
      'Standard-Förderung in Klasse reicht nicht aus'
    ],
    formularhilfe: [
      { feld:'Förderbedarfsarten', erklaerung:'Lernen, Sprache, emotional-soziale Entwicklung, geistige Entwicklung, körperliche Entwicklung, Hören, Sehen, kranke Kinder. Mehrfacher Förderbedarf möglich.' },
      { feld:'Inklusion vs. Förderschule', erklaerung:'Inklusion: in Regelschule mit Sonderpädagoge. Förderschule: spezialisierte Schule. Eltern können wählen — aber Schulamt entscheidet bei Streit.' },
      { feld:'Schulbegleitung', erklaerung:'Eigene Person für Ihr Kind in der Schule (Eingliederungshilfe). Über Sozialamt beantragen.' },
      { feld:'Nachteilsausgleich', erklaerung:'Auch ohne Sonderbedarf: bei LRS, ADHS, Diabetes etc. — mehr Zeit, größerer Druck, Hilfsmittel. Antrag bei Schulleitung.' }
    ]
  }
];

// Wohnungsportale für die Wohnungssuche
const WOHNUNGSPORTALE = [
  {
    name: 'ImmoScout24',
    url: 'https://www.immobilienscout24.de',
    beschreibung: 'Größtes deutsches Immobilienportal — Miet- und Kaufwohnungen, auch WGs',
    emoji: '🏢',
    tipp: 'Filter "Sofort frei" nutzen, Suchagent anlegen für sofortige Benachrichtigung'
  },
  {
    name: 'Immowelt',
    url: 'https://www.immowelt.de',
    beschreibung: 'Zweitgrößtes Portal, viele regionale Angebote von Privatvermietern',
    emoji: '🏘️',
    tipp: 'Oft günstigere Angebote als ImmoScout, weniger Provision'
  },
  {
    name: 'eBay Kleinanzeigen (Kleinanzeigen)',
    url: 'https://www.kleinanzeigen.de/s-wohnung-mieten/',
    beschreibung: 'Viele Privatvermieter ohne Makler — günstigere Angebote möglich',
    emoji: '📋',
    tipp: 'Täglich schauen, schnell reagieren — Privatvermieter entscheiden oft schnell'
  },
  {
    name: 'WG-Gesucht',
    url: 'https://www.wg-gesucht.de',
    beschreibung: 'WG-Zimmer und Wohnungen — auch für Alleinerziehende mit Kindern geeignet',
    emoji: '🛋️',
    tipp: 'Filter "Familienfreundlich" oder "Mit Kind" nutzen wenn vorhanden'
  },
  {
    name: 'Wohnungsbörse',
    url: 'https://www.wohnungsboerse.net',
    beschreibung: 'Spezialisiert auf Wohnungen, auch viele Angebote mit Sozialwohnungen',
    emoji: '🏠',
    tipp: 'Filter "Sozialwohnung" oder "WBS akzeptiert" nutzen'
  },
  {
    name: 'Gemeinde-Wohnungsportale',
    url: 'https://www.staedtetag.de',
    beschreibung: 'Viele Städte haben eigene Wohnungsbörsen oder Wartelisten für Sozialwohnungen',
    emoji: '🏛️',
    tipp: 'Google: "[Ihre Stadt] Sozialwohnung beantragen" oder direkt beim Wohnungsamt fragen'
  },
  {
    name: 'Soziale Träger (AWO, Caritas, Diakonie)',
    url: 'https://www.awo.org',
    beschreibung: 'Viele soziale Träger haben eigene Wohnprojekte speziell für Alleinerziehende',
    emoji: '❤️',
    tipp: 'Direkt bei AWO, Caritas oder Diakonie in Ihrer Stadt anfragen — oft schnellere Hilfe'
  },
  {
    name: 'Studenten-Wohnheime (manchmal möglich)',
    url: 'https://www.studierendenwerk.de',
    beschreibung: 'Manche Studierendenwerke bieten Wohnplätze für Studierende mit Kind',
    emoji: '🎓',
    tipp: 'Nur relevant wenn Sie studieren — aber sehr günstig!'
  }
];

// Beratung und Nützliche Links
const BERATUNGSSTELLEN = [
  {
    kategorie: 'Notruf & Krise',
    emoji: '🆘',
    stellen: [
      { name: 'Notruf (Polizei, Feuerwehr, Rettung)', tel: '112', url: null, beschreibung: 'Lebensgefahr, schwere Unfälle, akute Notfälle — 24/7 kostenfrei', kostenlos: true },
      { name: 'Ärztlicher Bereitschaftsdienst', tel: '116117', url: 'https://www.116117.de', beschreibung: 'Außerhalb der Sprechzeiten: Wegweiser zur richtigen ärztlichen Hilfe — 24/7', kostenlos: true },
      { name: 'Telefonseelsorge', tel: '0800 111 0 111', url: 'https://www.telefonseelsorge.de', beschreibung: 'Bei seelischen Krisen, Suizidgedanken — 24/7 kostenlos & anonym', kostenlos: true },
      { name: 'Hilfetelefon Gewalt gegen Frauen', tel: '116 016', url: 'https://www.hilfetelefon.de', beschreibung: '24/7 anonym, 18 Sprachen — bei häuslicher Gewalt, Bedrohung, Stalking', kostenlos: true },
      { name: 'Hilfetelefon Gewalt an Männern', tel: '0800 123 99 00', url: 'https://www.maennerhilfetelefon.de', beschreibung: 'Männer als Opfer von Gewalt — anonym, vertraulich', kostenlos: true },
      { name: 'Nummer gegen Kummer Kinder', tel: '116 111', url: 'https://www.nummergegenkummer.de', beschreibung: 'Kinder- & Jugend-Telefon: Mo-Sa 14–20 Uhr, anonym', kostenlos: true },
      { name: 'Elterntelefon', tel: '0800 111 0 550', url: 'https://www.nummergegenkummer.de', beschreibung: 'Für Eltern in schwierigen Erziehungssituationen — Mo–Fr 9–17 Uhr', kostenlos: true },
      { name: 'Giftnotruf Berlin', tel: '030 19240', url: 'https://www.giftnotruf.de', beschreibung: 'Vergiftungen, Medikamente, Pflanzen — 24/7 deutschlandweit', kostenlos: true }
    ]
  },
  {
    kategorie: 'Familie & Erziehung',
    emoji: '👨‍👩‍👧',
    stellen: [
      { name: 'Bundesfamilienportal', tel: null, url: 'https://www.familienportal.de', beschreibung: 'Alle Familienleistungen des Bundes — Wegweiser zu Anträgen und Hilfen', kostenlos: true },
      { name: 'pro familia', tel: '030 398 974 80', url: 'https://www.profamilia.de', beschreibung: 'Familienplanung, Sexualberatung, Schwangerschaftsberatung — bundesweit', kostenlos: true },
      { name: 'Erziehungsberatungsstellen (bke)', tel: null, url: 'https://www.bke-beratung.de', beschreibung: 'Online und vor Ort: bei Erziehungsfragen, Konflikten, Trennung', kostenlos: true },
      { name: 'Caritas Familienberatung', tel: null, url: 'https://www.caritas.de/hilfeundberatung', beschreibung: 'Beratung in über 1000 Standorten — kostenfrei und konfessionsunabhängig', kostenlos: true },
      { name: 'Diakonie Familienberatung', tel: null, url: 'https://www.diakonie.de/hilfe', beschreibung: 'Evangelische Sozial- und Familienberatung — für alle offen', kostenlos: true },
      { name: 'VAMV — Alleinerziehende', tel: null, url: 'https://www.vamv.de', beschreibung: 'Verband alleinerziehender Mütter und Väter — Beratung, Vernetzung, Rechtshilfe', kostenlos: true },
      { name: 'Mütterzentren bundesweit', tel: null, url: 'https://www.muetterzentren-bv.de', beschreibung: 'Treffpunkte, Beratung, Kinderbetreuung, Gemeinschaft vor Ort', kostenlos: true }
    ]
  },
  {
    kategorie: 'Schwangerschaft & Geburt',
    emoji: '🤰',
    stellen: [
      { name: 'pro familia Schwangerschaft', tel: null, url: 'https://www.profamilia.de/themen/schwangerschaft', beschreibung: 'Schwangerschaftsberatung, Konfliktberatung, Sozialleistungen', kostenlos: true },
      { name: 'Donum Vitae', tel: null, url: 'https://www.donumvitae.org', beschreibung: 'Schwangerschaftskonfliktberatung, anerkannt nach §219 StGB', kostenlos: true },
      { name: 'Caritas Schwangerschaftsberatung', tel: null, url: 'https://www.caritas.de/hilfeundberatung/onlineberatung/schwangerschaftsberatung', beschreibung: 'Online und vor Ort — auch zu Bundesstiftung Mutter und Kind', kostenlos: true },
      { name: 'Bundesstiftung Mutter und Kind', tel: '030 20655-555', url: 'https://www.bundesstiftung-mutter-und-kind.de', beschreibung: 'Finanzielle Hilfen für werdende Mütter in Not (Erstausstattung etc.)', kostenlos: true },
      { name: 'Hebammen-Suchportal', tel: null, url: 'https://www.hebammenverband.de', beschreibung: 'Hebamme in der Nähe finden — kostenfrei über die Krankenkasse', kostenlos: true },
      { name: 'Frühe Hilfen (NZFH)', tel: null, url: 'https://www.fruehehilfen.de', beschreibung: 'Familien-Hebammen und Sozialarbeit für Familien mit Babys/Kleinkindern', kostenlos: true }
    ]
  },
  {
    kategorie: 'Geld, Sozial & Schulden',
    emoji: '💰',
    stellen: [
      { name: 'Bürgertelefon Bundesregierung', tel: '115', url: 'https://www.115.de', beschreibung: 'Fragen zu allen Behörden, Formularen, Leistungen — Mo–Fr 8–18 Uhr', kostenlos: true },
      { name: 'Schuldnerberatung (Forum SBO)', tel: null, url: 'https://www.forum-schuldnerberatung.de', beschreibung: 'Suche nach kostenloser Schuldnerberatung in Ihrer Nähe', kostenlos: true },
      { name: 'Verbraucherzentrale', tel: null, url: 'https://www.verbraucherzentrale.de', beschreibung: 'Beratung zu Verträgen, Versicherungen, Geldanlagen — kleine Gebühr', kostenlos: false },
      { name: 'Beratungshilfe (Rechtsberatung)', tel: null, url: 'https://www.bmj.de/beratungshilfe', beschreibung: 'Kostenlose Rechtsberatung beim Anwalt — bei geringem Einkommen', kostenlos: true },
      { name: 'VdK Sozialrechtsberatung', tel: null, url: 'https://www.vdk.de/beratung', beschreibung: 'Sozialrecht, Widersprüche, Klagen — Mitgliedschaft (~70 €/Jahr)', kostenlos: false },
      { name: 'SoVD Sozialberatung', tel: null, url: 'https://www.sovd.de', beschreibung: 'Sozialverband — Renten-, Schwerbehinderten-, Sozialrecht', kostenlos: false },
      { name: 'Zuschuss.de', tel: null, url: 'https://www.zuschuss.de', beschreibung: 'Förderdatenbank für Familien — alle Zuschüsse auf einen Blick', kostenlos: true }
    ]
  },
  {
    kategorie: 'Trennung, Scheidung, Sorgerecht',
    emoji: '⚖️',
    stellen: [
      { name: 'Jugendamt (Beistandschaft)', tel: null, url: 'https://www.bmfsfj.de', beschreibung: 'Hilfe bei Unterhalt, Sorgerecht, Beistandschaft — beim örtlichen Jugendamt', kostenlos: true },
      { name: 'ISUV (Interessenverband Unterhalt)', tel: '0911 55 53 96 6', url: 'https://www.isuv.de', beschreibung: 'Beratung zu Trennung, Scheidung, Unterhalt — gerade auch für Väter', kostenlos: false },
      { name: 'Väter ohne Rechte', tel: null, url: 'https://www.vaeter-ohne-rechte.de', beschreibung: 'Selbsthilfe und Beratung — Väter im Sorgerechtsstreit', kostenlos: true },
      { name: 'Anwaltauskunft DAV', tel: null, url: 'https://anwaltauskunft.de', beschreibung: 'Fachanwalt für Familienrecht in der Nähe finden', kostenlos: true },
      { name: 'Mediation (BM)', tel: null, url: 'https://www.bmev.de', beschreibung: 'Bundesverband Mediation — Konfliktlösung ohne Gerichtsverfahren', kostenlos: false }
    ]
  },
  {
    kategorie: 'Sucht, Mental, Gewalt',
    emoji: '🧠',
    stellen: [
      { name: 'Sucht-Hilfe (Deutsche Hauptstelle)', tel: null, url: 'https://www.dhs.de', beschreibung: 'Beratungsstellen für Alkohol, Drogen, Medikamente, Glücksspiel', kostenlos: true },
      { name: 'Suchthotline', tel: '01806 313031', url: null, beschreibung: '24/7 — anonym und vertraulich (14 ct/Min aus Festnetz)', kostenlos: false },
      { name: 'Krisenchat (Jugendliche)', tel: null, url: 'https://krisenchat.de', beschreibung: 'Per WhatsApp/Web 24/7 — für Jugendliche in Krisen', kostenlos: true },
      { name: 'Weißer Ring (Opferhilfe)', tel: '116 006', url: 'https://www.weisser-ring.de', beschreibung: 'Opferhilfe bei Gewalttaten — 7 Tage/Woche, 7–22 Uhr kostenlos', kostenlos: true },
      { name: 'Frauenhauskoordinierung', tel: null, url: 'https://www.frauenhauskoordinierung.de', beschreibung: 'Frauenhäuser bundesweit — Schutz und Beratung bei Gewalt', kostenlos: true },
      { name: 'Männerberatungsstellen', tel: null, url: 'https://www.bundesforum-maenner.de', beschreibung: 'Lokale Männerberatung — bei Gewalt, Krise, Trennung', kostenlos: true },
      { name: 'BzgA Mental Health', tel: null, url: 'https://www.bzga.de', beschreibung: 'Bundeszentrale für gesundheitliche Aufklärung — Hilfen zu Sucht und Psyche', kostenlos: true }
    ]
  },
  {
    kategorie: 'Pflege, Behinderung, Senioren',
    emoji: '♿',
    stellen: [
      { name: 'Pflegestützpunkte', tel: null, url: 'https://www.zqp.de/beratung-pflege', beschreibung: 'Wohnortnahe Pflegeberatung — Anträge, Leistungen, Entlastung', kostenlos: true },
      { name: 'wir pflegen', tel: null, url: 'https://www.wir-pflegen.net', beschreibung: 'Verband pflegender Angehöriger — Selbsthilfe und Beratung', kostenlos: true },
      { name: 'EUTB (Behinderung)', tel: null, url: 'https://www.teilhabeberatung.de', beschreibung: 'Ergänzende unabhängige Teilhabeberatung — bei Behinderung jeder Art', kostenlos: true },
      { name: 'Demenz-Hilfe', tel: '030 25937 95 14', url: 'https://www.deutsche-alzheimer.de', beschreibung: 'Beratungstelefon für Demenz: Mo–Do 9–18 Uhr', kostenlos: true }
    ]
  },
  {
    kategorie: 'Arbeit, Wohnen, Bildung',
    emoji: '💼',
    stellen: [
      { name: 'Arbeitsagentur Hotline', tel: '0800 4 555500', url: 'https://www.arbeitsagentur.de', beschreibung: 'Arbeitslosengeld, Vermittlung, Weiterbildung — Mo–Fr 8–18 Uhr', kostenlos: true },
      { name: 'Familienkasse Hotline', tel: '0800 4 555530', url: 'https://www.familienkasse.de', beschreibung: 'Kindergeld, Kinderzuschlag — Mo–Fr 8–18 Uhr', kostenlos: true },
      { name: 'Wohnungsnotfallhilfe', tel: null, url: 'https://www.bagw.de', beschreibung: 'Bundesarbeitsgemeinschaft Wohnungslosenhilfe — bei Obdachlosigkeit', kostenlos: true },
      { name: 'Bildungsberatung Garantiefonds', tel: null, url: 'https://www.bildungsberatung-gfh.de', beschreibung: 'Beratung für junge Geflüchtete (12–27 Jahre) zu Schule, Beruf', kostenlos: true },
      { name: 'KfW Studienkredit-Beratung', tel: '0800 539 9001', url: 'https://www.kfw.de', beschreibung: 'Kostenfreie Beratung zum KfW-Studienkredit', kostenlos: true }
    ]
  },
  {
    kategorie: 'Online-Chats & spezielle Hotlines',
    emoji: '💬',
    stellen: [
      { name: 'Jugendnotmail (Online-Beratung)', tel: null, url: 'https://www.jugendnotmail.de', beschreibung: 'Online-Beratung für Jugendliche bei Sorgen, Mobbing, Krisen', kostenlos: true },
      { name: 'bke Online-Eltern-Beratung', tel: null, url: 'https://eltern.bke-beratung.de', beschreibung: 'Anonymer Online-Chat und Mail-Beratung für Eltern', kostenlos: true },
      { name: 'AWO Lebenslagen', tel: null, url: 'https://www.awo.org', beschreibung: 'Familien-, Sucht-, Schwangerschafts- und Senioren-Beratung deutschlandweit', kostenlos: true },
      { name: 'Stiftung Lesen — Sprachförderung', tel: null, url: 'https://www.stiftunglesen.de', beschreibung: 'Sprachförderung Kinder, Vorlese-Tipps, Kita-Materialien', kostenlos: true },
      { name: 'Aktion Mensch — Inklusion', tel: '0228 2092-368', url: 'https://www.aktion-mensch.de', beschreibung: 'Beratung zu Inklusion, Förderprogrammen, Behindertenrecht', kostenlos: true }
    ]
  }
];

// ===== SPAREN IM ALLTAG =====

// Supermarkt-Angebote & Preisvergleich-Portale
const SUPERMARKT_PORTALE = [
  {
    name: 'Kaufda',
    url: 'https://www.kaufda.de',
    emoji: '📰',
    typ: 'prospekte',
    beschreibung: 'Aktuelle Prospekte aller Supermärkte digital — Lidl, Aldi, Rewe, Edeka, Penny, Netto, Kaufland auf einen Blick.',
    tipp: 'Prospekte für die nächste Woche schon Donnerstags verfügbar — so können Sie gezielt einkaufen'
  },
  {
    name: 'Marktguru',
    url: 'https://www.marktguru.de',
    emoji: '🎯',
    typ: 'prospekte',
    beschreibung: 'Angebote und Prospekte aller Märkte in Ihrer Nähe, mit Benachrichtigung für Lieblingsprodukte.',
    tipp: 'Lieblingsprodukte als Favorit speichern — App benachrichtigt wenn es im Angebot ist'
  },
  {
    name: 'Smhaggle (Preisvergleich)',
    url: 'https://www.smhaggle.de',
    emoji: '💹',
    typ: 'preisvergleich',
    beschreibung: 'Preisvergleich für Lebensmittel zwischen Aldi, Lidl, Rewe, Edeka — findet das günstigste Angebot.',
    tipp: 'Wöchentlicher Check: Welcher Markt ist diese Woche für Ihren Warenkorb günstiger?'
  },
  {
    name: 'ALDI Angebote',
    url: 'https://www.aldi-sued.de/de/angebote.html',
    emoji: '🟦',
    typ: 'supermarkt',
    beschreibung: 'Aktuelle Aktionsartikel bei Aldi Süd — sehr günstige Eigenmarken.',
    tipp: 'ALDI-Eigenmarken sind oft 30–50 % günstiger als Markenprodukte bei gleicher Qualität'
  },
  {
    name: 'LIDL Angebote',
    url: 'https://www.lidl.de/de/angebote',
    emoji: '🟡',
    typ: 'supermarkt',
    beschreibung: 'Wöchentliche Aktionen bei Lidl — Lebensmittel, Haushalt und Aktionsware.',
    tipp: 'Lidl Plus App: extra Coupons und Rabatte direkt aufs Handy'
  },
  {
    name: 'Penny Angebote',
    url: 'https://www.penny.de/angebote',
    emoji: '🔴',
    typ: 'supermarkt',
    beschreibung: 'Günstige Wochenangebote bei Penny — oft sehr gute Preise für Grundnahrungsmittel.',
    tipp: 'Penny App mit Coupon-Funktion — bis zu 20 % auf ausgewählte Produkte'
  },
  {
    name: 'Netto Angebote',
    url: 'https://www.netto-online.de/angebote',
    emoji: '🟠',
    typ: 'supermarkt',
    beschreibung: 'Aktuelle Netto-Aktionen — oft günstige Tiefkühlprodukte und Grundnahrungsmittel.',
    tipp: 'Netto-App: digitale Coupons zusätzlich zu den Wochenangeboten'
  },
  {
    name: 'REWE Angebote',
    url: 'https://www.rewe.de/angebote',
    emoji: '🟢',
    typ: 'supermarkt',
    beschreibung: 'Wöchentliche REWE-Angebote online abrufen, auch Online-Lieferung möglich.',
    tipp: 'REWE App: Coupon-Funktion und Payback-Punkte sammeln für Rabatte'
  }
];

// Günstige Lebensmittel-Quellen
const LEBENSMITTEL_QUELLEN = [
  {
    name: 'Die Tafel',
    url: 'https://www.tafel.de/fuer-klienten/tafeln-finden/',
    emoji: '❤️',
    beschreibung: 'Kostenlose oder sehr günstige Lebensmittel für Menschen mit geringem Einkommen. Über 960 Tafeln deutschlandweit.',
    tipp: 'Tafel in Ihrer Nähe: tafel.de → "Tafeln finden" → PLZ eingeben',
    kostenlos: true
  },
  {
    name: 'Too Good To Go',
    url: 'https://www.toogoodtogo.com/de',
    emoji: '🛍️',
    beschreibung: 'Überraschungstüten von Restaurants, Bäckern und Supermärkten kurz vor Ladenschluss — für 2–6 € statt 10–20 €.',
    tipp: 'App herunterladen, Favoriten in der Nähe speichern — Tüten sind oft schon morgens weg!',
    kostenlos: false
  },
  {
    name: 'Foodsharing',
    url: 'https://foodsharing.de',
    emoji: '🥦',
    beschreibung: 'Lebensmittel kostenlos von Privatpersonen und Betrieben abholen, die sonst weggeworfen würden.',
    tipp: 'Fairteiler in Ihrer Stadt suchen — dort liegen oft regelmäßig kostenlose Lebensmittel',
    kostenlos: true
  },
  {
    name: 'Mundraub',
    url: 'https://mundraub.org',
    emoji: '🍎',
    beschreibung: 'Karte mit öffentlich zugänglichen Obstbäumen, Beerensträuchern und Wildpflanzen — kostenlos ernten!',
    tipp: 'Im Sommer und Herbst: Äpfel, Birnen, Brombeeren, Nüsse kostenlos sammeln',
    kostenlos: true
  },
  {
    name: 'Gelbe Rabatt-Aufkleber',
    url: 'https://www.kaufda.de',
    emoji: '⏰',
    beschreibung: 'Kurz vor Ladenschluss (30–60 Min.) werden Frischprodukte stark reduziert — bis zu 70 % Rabatt.',
    tipp: 'Täglich 30–60 Min. vor Ladenschluss: gelbe Aufkleber auf Fleisch, Brot, Obst und Gemüse suchen',
    kostenlos: false
  },
  {
    name: 'Sozialkaufhaus (Lebensmittel)',
    url: 'https://www.google.de/search?q=Sozialkaufhaus+Lebensmittel+meiner+N%C3%A4he',
    emoji: '🏪',
    beschreibung: 'Viele Sozialkaufhäuser verkaufen Lebensmittel zu stark reduzierten Preisen für Bedürftige.',
    tipp: 'Google: "Sozialkaufhaus [Ihre Stadt]" — oft auch Kleidung und Haushaltswaren sehr günstig',
    kostenlos: false
  }
];

// Strom, Gas, Handy & Internet sparen
const ENERGIE_PORTALE = [
  {
    name: 'Verivox Strom',
    url: 'https://www.verivox.de/strom/',
    emoji: '⚡',
    kategorie: 'strom',
    beschreibung: 'Günstigster Stromanbieter für Ihre Region — Wechsel spart oft 200–400 € im Jahr.',
    tipp: 'Jährlich wechseln — Neukunden-Boni nutzen. Soziale Anbieter wie Grundversorger oft teurer!'
  },
  {
    name: 'Check24 Strom & Gas',
    url: 'https://www.check24.de/strom/',
    emoji: '💡',
    kategorie: 'strom',
    beschreibung: 'Strom- und Gasanbieter vergleichen — schneller Wechsel in wenigen Minuten.',
    tipp: 'Verbrauch von letzter Abrechnung eingeben für genauen Vergleich'
  },
  {
    name: 'Sozialtarife Strom',
    url: 'https://www.verbraucherzentrale.de/wissen/energie/preise-tarife-und-abrechnungen/sozialtarife-fuer-strom-und-gas-gibt-es-sie-noch-7764',
    emoji: '🤝',
    kategorie: 'strom',
    beschreibung: 'Manche Stadtwerke bieten Sozialtarife für Bürgergeld-/Sozialhilfe-Bezieher an — bis zu 50 € Rabatt.',
    tipp: 'Beim lokalen Stadtwerk fragen ob es Sozialtarife gibt — nicht alle bewerben sie aktiv!'
  },
  {
    name: 'Check24 Internet',
    url: 'https://www.check24.de/dsl/',
    emoji: '📶',
    kategorie: 'internet',
    beschreibung: 'Günstigsten DSL/Glasfaser-Tarif für Ihre Adresse — Preise ab 15 €/Monat möglich.',
    tipp: 'Sozialpass-Inhaber: bei manchen Anbietern 50 % Rabatt auf Internet — beim Anbieter nachfragen!'
  },
  {
    name: 'Check24 Handytarife',
    url: 'https://www.check24.de/handytarife/',
    emoji: '📱',
    kategorie: 'handy',
    beschreibung: 'Günstigste Handytarife vergleichen — Discounter-Tarife ab 5 €/Monat.',
    tipp: 'Aldi Talk, Lidl Connect, Penny Mobil: oft 70 % günstiger als Telekom/Vodafone'
  }
];

// Secondhand & Günstige Kleidung
const SECONDHAND_PORTALE = [
  {
    name: 'Vinted (Kinderkleidung)',
    url: 'https://www.vinted.de',
    emoji: '👕',
    beschreibung: 'Größte Secondhand-Plattform — Kinderkleidung besonders günstig, oft wie neu.',
    tipp: 'Filter: Kategorie "Kinder" + Größe + Zustand "sehr gut" — Markenkleidung für 2–8 €'
  },
  {
    name: 'eBay Kleinanzeigen — Kleidung',
    url: 'https://www.kleinanzeigen.de/s-kleidung-accessoires/c68',
    emoji: '🛍️',
    beschreibung: 'Kostenlose oder günstige Kinderkleidung von Privatpersonen — oft ganze Pakete.',
    tipp: 'Suche: "Kleidungspaket Gr. 86" — viele Eltern verkaufen ganze Sätze für 10–20 €'
  },
  {
    name: 'Kleiderkammer (kostenlos!)',
    url: 'https://www.google.de/search?q=Kleiderkammer+meiner+N%C3%A4he',
    emoji: '❤️',
    beschreibung: 'Kostenlose Kleidung für Menschen mit geringem Einkommen — von Kirchen und sozialen Trägern.',
    tipp: 'Google: "Kleiderkammer [Ihre Stadt]" oder beim Sozialamt fragen — komplett kostenlos!'
  },
  {
    name: 'Sozialkaufhaus',
    url: 'https://www.google.de/search?q=Sozialkaufhaus+meiner+N%C3%A4he',
    emoji: '🏪',
    beschreibung: 'AWO/Caritas/Diakonie-Secondhand-Läden mit Kleidung, Spielzeug und Haushaltsware für 1–5 €.',
    tipp: 'Google: "Sozialkaufhaus [Ihre Stadt]" — auch Möbel, Bücher und Elektro sehr günstig'
  },
  {
    name: 'Spielzeug: eBay Kleinanzeigen',
    url: 'https://www.kleinanzeigen.de/s-spielzeug/c17',
    emoji: '🧸',
    beschreibung: 'Spielzeug von Privatpersonen — fast neu und sehr günstig, da Kinder schnell entwachsen.',
    tipp: 'Gesuchtes Spielzeug + "gebraucht" suchen — oft 70–90 % günstiger als neu'
  },
  {
    name: 'Bibliothek: Medien kostenlos',
    url: 'https://www.bibliotheksportal.de/bibliotheken/bibliotheken-in-deutschland/bibliothekslandschaft.html',
    emoji: '📚',
    beschreibung: 'Bücher, Hörspiele, DVDs und digitale Medien (Onleihe) — alles kostenlos mit Bibliotheksausweis.',
    tipp: 'Viele Bibliotheken sind für Kinder unter 18 kostenlos! Auch digitale Ausleihe per App möglich'
  }
];

// Spar-Tipps nach Kategorien
const SPAR_TIPPS = [
  {
    id: 'einkaufen', kategorie: 'Einkaufen & Lebensmittel', emoji: '🛒',
    tipps: [
      { titel: 'Immer mit Einkaufsliste', text: 'Mit Liste einkaufen spart 20–30 % — keine Impulskäufe. Vorher kurz in Kühlschrank und Vorrat schauen.' },
      { titel: 'Eigenmarken statt Marken', text: 'Eigenmarken von Aldi, Lidl und Rewe sind bis zu 50 % günstiger — oft aus denselben Fabriken wie die Markenware.' },
      { titel: 'Wochenplan fürs Essen', text: 'Mahlzeiten für die Woche planen und gezielt einkaufen. Weniger wegwerfen spart bis zu 40 € im Monat.' },
      { titel: 'Nicht hungrig einkaufen', text: 'Wer hungrig in den Laden geht, kauft deutlich mehr. Lieber nach dem Essen losgehen.' },
      { titel: 'Reduziertes am Abend', text: '30–60 Minuten vor Ladenschluss: Frischware mit rotem oder gelbem Aufkleber — oft bis 70 % günstiger.' },
      { titel: 'Grundpreis vergleichen', text: 'Nicht den Packungspreis, sondern den Preis pro Kilo oder Liter auf dem Regaletikett vergleichen.' },
      { titel: 'Augenhöhe ist teuer', text: 'Teure Marken stehen auf Augenhöhe, günstige oben oder unten im Regal. Bewusst auch dorthin schauen.' },
      { titel: 'Reste-Apps nutzen', text: 'Apps wie Too Good To Go verkaufen Reste-Tüten von Bäckern und Supermärkten für 2–5 € statt Wegwerfen.' },
      { titel: 'Saisonal und regional', text: 'Obst und Gemüse der Saison ist günstiger und besser. Wochenmarkt kurz vor Schluss bringt Schnäppchen.' },
      { titel: 'Tafel nutzen', text: 'Bei kleinem Einkommen gibt die Tafel Lebensmittel für einen symbolischen Betrag. Standorte auf tafel.de.' }
    ]
  },
  {
    id: 'energie', kategorie: 'Strom, Wasser & Heizen', emoji: '⚡',
    tipps: [
      { titel: 'Stromanbieter jährlich wechseln', text: 'Mit Verivox oder Check24 vergleichen — der Wechsel spart oft 200–400 € im Jahr und dauert 10 Minuten.' },
      { titel: 'Standby abschalten', text: 'Geräte im Standby kosten bis zu 100 € im Jahr. Steckerleiste mit Schalter abends einfach ausknipsen.' },
      { titel: 'Bei 30 Grad waschen', text: 'Kalt oder 30 Grad statt 60 Grad spart bis zu 60 % Strom pro Waschgang — sauber wird die Wäsche trotzdem.' },
      { titel: 'Waschmaschine voll beladen', text: 'Nie halbvoll waschen. Eine volle Trommel spart Strom, Wasser und Waschmittel.' },
      { titel: 'Lufttrocknen statt Trockner', text: 'Der Wäschetrockner ist ein echter Stromfresser. Der Wäscheständer spart rund 100 € im Jahr.' },
      { titel: 'LED statt alte Lampen', text: 'LED-Lampen brauchen 80 % weniger Strom und halten viel länger. Nach und nach austauschen.' },
      { titel: 'Heizung runter, Pulli an', text: 'Jedes Grad weniger spart rund 6 % Heizkosten. 20 Grad im Wohnraum und 17 im Schlafzimmer reichen.' },
      { titel: 'Stoßlüften statt Kippfenster', text: 'Fenster 5 Minuten ganz öffnen statt stundenlang kippen — spart Heizenergie und schützt vor Schimmel.' },
      { titel: 'Duschen statt baden', text: 'Ein Vollbad braucht dreimal so viel Warmwasser wie eine Dusche. Ein Sparduschkopf hilft zusätzlich.' },
      { titel: 'Kühlschrank richtig einstellen', text: 'Kühlschrank auf 7 Grad, Gefrierfach auf -18 Grad reicht. Regelmäßiges Abtauen spart zusätzlich Strom.' }
    ]
  },
  {
    id: 'haushalt', kategorie: 'Haushalt & Wohnen', emoji: '🏠',
    tipps: [
      { titel: 'Reiniger selbst machen', text: 'Essig, Natron und Zitronensäure ersetzen die meisten Spezialreiniger — für wenige Cent statt mehrere Euro.' },
      { titel: 'Reparieren statt wegwerfen', text: 'Repair-Cafés reparieren kostenlos Elektrogeräte, Kleidung und Fahrräder. Standorte über reparatur-initiativen.de.' },
      { titel: 'Nebenkostenabrechnung prüfen', text: 'Jede zweite Abrechnung ist fehlerhaft. Im Zweifel prüft der Mieterverein sie für einen kleinen Beitrag.' },
      { titel: 'Gebraucht kaufen', text: 'Möbel, Geräte und Werkzeug gibt es auf Kleinanzeigen oder im Sozialkaufhaus oft fast neu zum halben Preis.' },
      { titel: 'Leitungswasser trinken', text: 'Leitungswasser ist streng kontrolliert und kostet fast nichts — spart gegenüber Flaschenwasser über 200 € im Jahr.' },
      { titel: 'Verleihen statt kaufen', text: 'Bohrmaschine, Tapeziertisch oder Raclette: selten Gebrauchtes bei Nachbarn leihen oder im Leihladen ausleihen.' },
      { titel: 'Wohngeld prüfen', text: 'Auch mit Job kann Wohngeld zustehen — viele Familien verschenken hier Geld. Im Bereich Zuschüsse durchrechnen.' }
    ]
  },
  {
    id: 'mobilitaet', kategorie: 'Auto & Unterwegs', emoji: '🚗',
    tipps: [
      { titel: 'Spritpreise vergleichen', text: 'Tanken ist abends meist günstiger als morgens. Tank-Apps zeigen die billigste Station in der Nähe.' },
      { titel: 'Deutschlandticket prüfen', text: 'Für 58 € im Monat bundesweit Bus und Bahn. Wer öfter pendelt, spart damit oft viel gegenüber dem Auto.' },
      { titel: 'Reifendruck und Fahrweise', text: 'Richtiger Reifendruck und vorausschauendes Fahren senken den Spritverbrauch um bis zu 15 %.' },
      { titel: 'Fahrgemeinschaften bilden', text: 'Mit Nachbarn oder Kollegen Fahrten teilen — Sprit- und Parkkosten halbieren sich dabei.' },
      { titel: 'Kfz-Versicherung wechseln', text: 'Bis 30. November kündigen und neu vergleichen — oft 200–400 € Unterschied bei gleichem Schutz.' },
      { titel: 'Kurze Wege mit dem Rad', text: 'Strecken unter 5 km mit dem Fahrrad fahren — spart Sprit und Parkgebühren und ist gesünder.' },
      { titel: 'Werkstattpreise vergleichen', text: 'Freie Werkstätten sind oft 30–50 % günstiger als Vertragswerkstätten. Vergleichsportale holen Angebote ein.' }
    ]
  },
  {
    id: 'vertraege', kategorie: 'Verträge & Versicherungen', emoji: '📑',
    tipps: [
      { titel: 'Abos jährlich durchgehen', text: 'Kontoauszüge der letzten 3 Monate prüfen. Jedes Abo, das du kaum nutzt, sofort kündigen.' },
      { titel: 'Handytarif beim Discounter', text: 'Aldi Talk, Lidl Connect und Co. nutzen dieselben Netze und kosten 5–12 € statt 30–50 € im Monat.' },
      { titel: 'Nur nötige Versicherungen', text: 'Wirklich wichtig sind Privathaftpflicht, Berufsunfähigkeit und Krankenversicherung. Vieles andere ist verzichtbar.' },
      { titel: 'Versicherungen bündeln', text: 'Haftpflicht und Hausrat beim selben Anbieter geben oft 15–20 % Rabatt. Kinder sind meist gratis mitversichert.' },
      { titel: 'Rundfunkbeitrag-Befreiung', text: 'Bei Bürgergeld, BAföG oder bestimmten Leistungen entfällt der Beitrag — Antrag auf rundfunkbeitrag.de stellen.' },
      { titel: 'Streaming im Wechsel', text: 'Nicht alle Dienste gleichzeitig: einen Monat Netflix, dann kündigen, dann Disney+ — das spart die Hälfte.' },
      { titel: 'Sozialtarife erfragen', text: 'Manche Internet- und Stromanbieter geben mit Bürgergeld-Bescheid Rabatt. Einfach direkt nachfragen.' }
    ]
  },
  {
    id: 'kinder', kategorie: 'Kinder & Schule', emoji: '👶',
    tipps: [
      { titel: 'Secondhand für Kinderkleidung', text: 'Kinder wachsen schnell. Flohmärkte, Kleiderbasare und Kleinanzeigen sparen 50–80 % der Kosten.' },
      { titel: 'Bildung und Teilhabe nutzen', text: 'Das BuT-Paket zahlt Schulausflüge, 15 €/Monat für Vereine und Schulbedarf — bei Bürgergeld, Wohngeld oder Kinderzuschlag.' },
      { titel: 'Kinderzuschlag beantragen', text: 'Bis zu 297 € pro Kind im Monat für Familien mit kleinem Einkommen. Antrag bei der Familienkasse stellen.' },
      { titel: 'Schulbücher gebraucht kaufen', text: 'Gebrauchte Schulbücher gibt es bei booklooker oder auf dem Schul-Basar oft für ein Drittel des Preises.' },
      { titel: 'Spielzeug tauschen', text: 'Spielzeugbörsen und Tausch mit anderen Familien — Kinder lieben Abwechslung, der Geldbeutel freut sich.' },
      { titel: 'Bibliothek statt kaufen', text: 'Büchereien haben Bücher, Hörspiele und Spiele, oft mit kostenlosem Kinderprogramm. Ausweis für Kinder meist gratis.' },
      { titel: 'Förderverein fragen', text: 'Bei knappem Geld: Schulen und Fördervereine haben oft stille Töpfe für Ausflüge oder Material.' }
    ]
  },
  {
    id: 'freizeit', kategorie: 'Freizeit & Urlaub', emoji: '🎠',
    tipps: [
      { titel: 'Bibliothek als Freizeitort', text: 'Kostenlos Bücher, Spiele und Filme leihen — viele Büchereien bieten gratis Veranstaltungen für Kinder.' },
      { titel: 'Museen am freien Tag', text: 'Viele Museen haben einen kostenlosen Tag im Monat. Häufig ist es der erste Sonntag.' },
      { titel: 'Familienpass der Stadt', text: 'Viele Städte geben einen Familienpass mit Rabatt für Bäder, Zoo und Museen — beim Bürgeramt nachfragen.' },
      { titel: 'Natur kostet nichts', text: 'Wald, Parks, Spielplätze und Seen: Picknick, Schatzsuche und Geocaching machen Familienzeit ganz ohne Eintritt.' },
      { titel: 'Ferien zu Hause planen', text: 'Tagesausflüge in der Region statt teurer Reise — Schwimmbad, Wandern, Zoo. Günstig und ohne Reisestress.' },
      { titel: 'Nebensaison buchen', text: 'Urlaub direkt vor oder nach den Schulferien ist oft deutlich billiger. Auch Camping spart viel Geld.' },
      { titel: 'BuT für Vereinsbeitrag', text: 'Sportverein oder Musikschule: 15 € im Monat übernimmt das Bildungspaket bei Leistungsbezug.' },
      { titel: 'Stadtfeste besuchen', text: 'Stadtfeste, Open-Air-Konzerte und Bibliotheks-Aktionen sind meist kostenlos — die Stadt-Website verrät die Termine.' }
    ]
  },
  {
    id: 'geld', kategorie: 'Konto & Geld im Griff', emoji: '💳',
    tipps: [
      { titel: 'Haushaltsbuch führen', text: 'Einen Monat lang alle Ausgaben aufschreiben — per App oder Heft. So siehst du sofort, wo das Geld verschwindet.' },
      { titel: 'Umschlag-Methode', text: 'Bargeld für Lebensmittel, Freizeit und Kleidung in getrennte Umschläge. Ist der Umschlag leer, ist Schluss.' },
      { titel: 'Kostenloses Girokonto', text: 'Viele Banken verlangen Kontoführungsgebühren. Ein kostenloses Konto spart 60–120 € im Jahr.' },
      { titel: 'Dauerauftrag aufs Sparkonto', text: 'Direkt nach dem Geldeingang einen festen Betrag sparen — sich selbst zuerst bezahlen.' },
      { titel: 'Dispo vermeiden', text: 'Der Dispokredit kostet oft 10–14 % Zinsen. Bei dauerhaftem Minus ist ein Ratenkredit viel günstiger.' },
      { titel: 'Die 24-Stunden-Regel', text: 'Vor größeren Anschaffungen einen Tag warten. Die Hälfte der spontanen Wünsche verschwindet von allein.' },
      { titel: 'Alle Zuschüsse prüfen', text: 'Wohngeld, Kinderzuschlag, Bildungspaket — viele Familien lassen Hunderte Euro liegen. Im Bereich Zuschüsse prüfen.' }
    ]
  },
  {
    id: 'gesundheit', kategorie: 'Gesundheit & Apotheke', emoji: '💊',
    tipps: [
      { titel: 'Generika statt Markenmedikament', text: 'Wirkstoffgleiche Generika sind deutlich günstiger. In der Apotheke gezielt danach fragen.' },
      { titel: 'Apothekenpreise vergleichen', text: 'Bei rezeptfreien Mitteln lohnt der Preisvergleich mit Versandapotheken — die Preise schwanken stark.' },
      { titel: 'Zuzahlungsbefreiung', text: 'Wer die Belastungsgrenze erreicht, zahlt den Rest des Jahres nichts mehr dazu — bei der Krankenkasse beantragen.' },
      { titel: 'Bonusprogramm der Kasse', text: 'Viele Krankenkassen zahlen Boni für Vorsorge und Sport — so sind 50–150 € im Jahr drin.' },
      { titel: 'Hausmittel kennen', text: 'Bei leichten Beschwerden helfen oft einfache Hausmittel. Im Bereich Gesundheit gibt es Hunderte erprobte Tipps.' }
    ]
  }
];

// ===== GELDANLAGEN — anfängerfreundliche Anlageformen mit Schritt-für-Schritt-Anleitung =====
const GELDANLAGEN = [
  {
    id: 'notgroschen', emoji: '🛟', name: 'Notgroschen aufbauen', farbe: '#0EA5E9', bg: '#E0F2FE',
    risiko: 'Kein Risiko', rendite: 'Sicherheit', verfuegbar: 'Jederzeit',
    fuer: 'Der allererste Schritt — vor jeder anderen Geldanlage.',
    beschreibung: 'Der Notgroschen ist ein Sicherheitspolster für kaputte Waschmaschine, Autoreparatur oder eine Nachzahlung. Ziel sind 2–3 Monatsausgaben. So musst du bei Überraschungen keinen teuren Kredit aufnehmen.',
    schritte: [
      { nr:1, titel:'Zielbetrag ausrechnen', text:'Monatliche Ausgaben mal 3. Beispiel: 2.000 € Ausgaben ergeben 6.000 € als Ziel. Auch 1.000 € sind ein guter Anfang.' },
      { nr:2, titel:'Eigenes Tagesgeldkonto nutzen', text:'Den Notgroschen getrennt vom Girokonto auf einem Tagesgeldkonto parken — verfügbar, aber nicht in Griffweite für Spontankäufe.' },
      { nr:3, titel:'Kleinen Dauerauftrag einrichten', text:'Nach jedem Geldeingang automatisch 25–100 € auf das Notgroschen-Konto. Lieber klein und regelmäßig als gar nicht.' },
      { nr:4, titel:'Nach Nutzung wieder auffüllen', text:'Wenn du den Notgroschen brauchst, ist das genau richtig so. Danach Schritt für Schritt wieder aufstocken.' }
    ],
    tipp: 'Den Notgroschen niemals in Aktien oder ETF anlegen — er muss sicher und sofort verfügbar bleiben.'
  },
  {
    id: 'tagesgeld', emoji: '💶', name: 'Tagesgeldkonto', farbe: '#059669', bg: '#D1FAE5',
    risiko: 'Sehr sicher', rendite: 'rund 2–3 % pro Jahr', verfuegbar: 'Täglich',
    fuer: 'Geld, das sicher liegen und trotzdem Zinsen bringen soll.',
    beschreibung: 'Ein Tagesgeldkonto ist wie ein Sparkonto: Du kommst jederzeit ans Geld und bekommst Zinsen. Bis 100.000 € pro Bank ist dein Geld durch die gesetzliche Einlagensicherung geschützt.',
    schritte: [
      { nr:1, titel:'Zinsen vergleichen', text:'Auf einem unabhängigen Portal wie Finanztip oder Verivox die aktuellen Zinsen vergleichen. Hausbank-Angebote sind oft die schlechtesten.' },
      { nr:2, titel:'Auf Einlagensicherung achten', text:'Eine Bank mit Sitz in der EU wählen — dann sind bis 100.000 € gesetzlich abgesichert.' },
      { nr:3, titel:'Konto online eröffnen', text:'Die Eröffnung dauert 10–15 Minuten. Den Ausweis per Video oder in der Postfiliale bestätigen.' },
      { nr:4, titel:'Geld überweisen', text:'Vom Girokonto auf das Tagesgeldkonto überweisen. Die Zinsen werden meist monatlich oder jährlich gutgeschrieben.' }
    ],
    tipp: 'Lockzinsen gelten oft nur ein paar Monate. Danach ruhig wieder vergleichen und notfalls wechseln.'
  },
  {
    id: 'festgeld', emoji: '🔒', name: 'Festgeld', farbe: '#7C3AED', bg: '#EDE9FE',
    risiko: 'Sehr sicher', rendite: 'meist etwas höher als Tagesgeld', verfuegbar: 'Erst nach der Laufzeit',
    fuer: 'Geld, das du sicher 1–3 Jahre nicht brauchst.',
    beschreibung: 'Beim Festgeld legst du einen Betrag für eine feste Laufzeit an, zum Beispiel 1, 2 oder 3 Jahre, und bekommst dafür einen garantierten Zins. Vorher kommst du normalerweise nicht ans Geld.',
    schritte: [
      { nr:1, titel:'Nur planbares Geld anlegen', text:'Festgeld eignet sich für Geld, das du sicher eine Weile nicht brauchst — nicht für den Notgroschen.' },
      { nr:2, titel:'Laufzeit und Zins vergleichen', text:'Auf Vergleichsportalen die Laufzeiten gegenüberstellen. Eine längere Laufzeit bringt meist mehr Zins, bindet das Geld aber länger.' },
      { nr:3, titel:'Konto eröffnen und einzahlen', text:'Ähnlich wie beim Tagesgeld online eröffnen. Der Betrag wird dann für die ganze Laufzeit fest angelegt.' },
      { nr:4, titel:'An das Laufzeitende denken', text:'Am Ende wird das Geld oft automatisch neu angelegt, wenn du nicht widersprichst. Den Termin notieren und neu entscheiden.' }
    ],
    tipp: 'Treppen-Strategie: das Geld auf mehrere Laufzeiten verteilen — so wird regelmäßig ein Teil wieder frei.'
  },
  {
    id: 'etf', emoji: '📈', name: 'ETF-Sparplan', farbe: '#D97706', bg: '#FEF3C7',
    risiko: 'Schwankungen, langfristig bewährt', rendite: 'langfristig rund 6–7 % pro Jahr im Durchschnitt (nicht garantiert)', verfuegbar: 'Verkauf jederzeit möglich',
    fuer: 'Vermögensaufbau über viele Jahre — mindestens 10 bis 15.',
    beschreibung: 'Ein ETF ist ein Korb aus vielen hundert Aktien weltweit — du investierst breit gestreut in einem Schritt. Mit einem Sparplan legst du automatisch jeden Monat einen kleinen Betrag an, schon ab 25 €. Der Wert schwankt, über lange Zeit ist die Anlage aber bewährt.',
    schritte: [
      { nr:1, titel:'Erst Notgroschen, dann ETF', text:'Investiere nur Geld, das du viele Jahre nicht brauchst. Schulden tilgen und Notgroschen anlegen kommen zuerst.' },
      { nr:2, titel:'Depot bei einem günstigen Anbieter', text:'Ein Wertpapierdepot bei einem Neobroker oder einer Direktbank eröffnen. Auf niedrige oder keine Depotgebühren achten.' },
      { nr:3, titel:'Breit gestreuten ETF wählen', text:'Ein weltweiter ETF, etwa auf den Index MSCI World oder FTSE All-World, streut über viele Länder und Branchen.' },
      { nr:4, titel:'Sparplan einrichten', text:'Einen festen monatlichen Betrag einstellen, zum Beispiel 25–100 €. Der Kauf läuft dann automatisch — du musst nichts weiter tun.' },
      { nr:5, titel:'Ruhe bewahren und dranbleiben', text:'Kurse fallen auch mal. Genau dann nicht verkaufen — wer den Sparplan einfach weiterlaufen lässt, kauft günstig nach.' }
    ],
    tipp: 'Einen Freistellungsauftrag bei der Bank stellen: Gewinne bleiben bis 1.000 € pro Jahr steuerfrei.'
  },
  {
    id: 'kinder', emoji: '🧸', name: 'Für die Kinder sparen', farbe: '#EC4899', bg: '#FCE7F3',
    risiko: 'je nach gewählter Anlageform', rendite: 'je nach gewählter Anlageform', verfuegbar: 'je nach gewählter Anlageform',
    fuer: 'Ein Startkapital für Führerschein, Ausbildung oder die erste eigene Wohnung.',
    beschreibung: 'Schon kleine Beträge wachsen über 18 Jahre kräftig. Geld, das erst in vielen Jahren gebraucht wird, darf ruhig in einen ETF-Sparplan. Was bald gebraucht wird, gehört aufs Tagesgeld.',
    schritte: [
      { nr:1, titel:'Sparziel und Zeitraum klären', text:'Wie viele Jahre bleiben bis zum 18. Geburtstag? Je länger der Zeitraum, desto eher passt ein ETF-Sparplan.' },
      { nr:2, titel:'Kleinen Betrag festlegen', text:'Schon 25 € im Monat ergeben über 18 Jahre eine spürbare Summe. Einen Teil des Kindergeldes zu sparen ist ein guter Trick.' },
      { nr:3, titel:'Konto oder Depot auf das Kind', text:'Ein Sparplan kann auf den Namen des Kindes laufen. Das hat Steuervorteile, das Geld gehört dann aber rechtlich dem Kind.' },
      { nr:4, titel:'Verwandte einbinden', text:'Großeltern schenken zu Geburtstagen oft Geld — ein Hinweis auf den Sparplan lenkt es in sinnvolle Bahnen.' }
    ],
    tipp: 'Wird das Geld zu einem festen Zeitpunkt gebraucht, ein paar Jahre vorher schrittweise vom ETF aufs Tagesgeld umschichten.'
  },
  {
    id: 'altersvorsorge', emoji: '🏦', name: 'Fürs Alter vorsorgen', farbe: '#0891B2', bg: '#CFFAFE',
    risiko: 'je nach Form', rendite: 'je nach Form, oft mit staatlicher Förderung', verfuegbar: 'meist erst ab dem Rentenalter',
    fuer: 'Zusätzliche Sicherheit, weil die gesetzliche Rente oft nicht reicht.',
    beschreibung: 'Neben der gesetzlichen Rente gibt es geförderte Wege: die betriebliche Altersvorsorge über den Arbeitgeber und private Vorsorge. Gerade für Familien lohnt sich ein früher, kleiner Start.',
    schritte: [
      { nr:1, titel:'Renteninformation anschauen', text:'Einmal im Jahr kommt die Renteninformation per Post. Sie zeigt die voraussichtliche Rente — meist deutlich weniger als das heutige Einkommen.' },
      { nr:2, titel:'Betriebsrente erfragen', text:'Viele Arbeitgeber zahlen zur betrieblichen Altersvorsorge dazu. Nach dem Angebot fragen — geschenktes Geld nicht liegen lassen.' },
      { nr:3, titel:'Förderungen prüfen', text:'Je nach Lebenssituation gibt es Zulagen, etwa für Kinder. Welche Form am besten passt, ist sehr individuell.' },
      { nr:4, titel:'Unabhängig beraten lassen', text:'Die Verbraucherzentrale bietet günstige, unabhängige Beratung zur Altersvorsorge — ganz ohne Verkaufsinteresse.' }
    ],
    tipp: 'Finger weg von teuren Verträgen mit hohen Abschlusskosten. Im Zweifel zuerst zur Verbraucherzentrale.'
  }
];

// ===== SENIOREN — alles für ein gutes Leben im Alter =====
const SENIOREN_DATEN = {
  rente: {
    icon:'💶', label:'Rente & Geld', farbe:'#059669', bg:'#D1FAE5',
    intro:'Im Alter steht oft mehr Geld zu, als viele denken. Diese Hilfen lohnen sich zu prüfen.',
    tipps:[
      { titel:'Grundsicherung im Alter', text:'Wenn die Rente nicht zum Leben reicht, gibt es Grundsicherung beim Sozialamt — sie deckt Lebensunterhalt, Miete und Heizung.', tipp:'Anders als beim Bürgergeld wird das Vermögen der Kinder nicht herangezogen.' },
      { titel:'Wohngeld auch für Rentner', text:'Viele Rentner haben Anspruch auf Wohngeld als Mietzuschuss und wissen es nicht. Antrag beim Wohngeldamt der Stadt.', tipp:'Im Bereich Zuschüsse kannst du den Anspruch grob durchrechnen.' },
      { titel:'Rundfunkbeitrag-Befreiung', text:'Bei Grundsicherung oder dem Merkzeichen RF im Schwerbehindertenausweis entfällt der Rundfunkbeitrag.', tipp:'Antrag online auf rundfunkbeitrag.de.' },
      { titel:'Kostenlose Renten-Beratung', text:'Die Deutsche Rentenversicherung berät kostenlos zu Rentenhöhe, Anträgen und Zuschlägen — Termin vereinbaren.', tipp:'Auch ungenutzte Kindererziehungszeiten lassen sich hier noch klären.' },
      { titel:'Steuererklärung lohnt oft', text:'Auch Rentner bekommen häufig Geld zurück. Ein Lohnsteuerhilfeverein hilft günstig beim Ausfüllen.', tipp:'Krankheitskosten und Handwerkerleistungen lassen sich absetzen.' },
      { titel:'Hilfe bei Energiekosten', text:'Der Stromspar-Check unterstützt Haushalte mit kleinem Einkommen kostenlos beim Energiesparen — mit kostenlosen Soforthilfen.', tipp:'Anmeldung über die Caritas oder den lokalen Anbieter.' },
      { titel:'Vergünstigter Nahverkehr', text:'Viele Städte bieten Senioren ein vergünstigtes Ticket für Bus und Bahn. Beim Verkehrsverbund nachfragen.', tipp:'Mit dem Deutschlandticket gilt 58 € im Monat bundesweit.' }
    ]
  },
  pflege: {
    icon:'🤝', label:'Pflege & Hilfe', farbe:'#0891B2', bg:'#CFFAFE',
    intro:'Pflege beginnt nicht erst im Pflegeheim. Schon bei kleinem Hilfebedarf gibt es Unterstützung.',
    tipps:[
      { titel:'Pflegegrad beantragen', text:'Schon bei leichtem Hilfebedarf lohnt der Antrag bei der Pflegekasse. Der Gutachter kommt nach Hause und schätzt den Bedarf ein.', tipp:'Vorher eine Woche ein Pflege-Tagebuch führen — das hilft im Gutachten.' },
      { titel:'Entlastungsbetrag nutzen', text:'Jeder mit Pflegegrad bekommt rund 130 € im Monat für Alltagshilfen wie Putzen oder Begleitung — er verfällt sonst.', tipp:'Nicht genutzte Beträge lassen sich noch ein halbes Jahr nachholen.' },
      { titel:'Pflegehilfsmittel gratis', text:'Zum Verbrauch bestimmte Hilfsmittel wie Handschuhe oder Betteinlagen zahlt die Pflegekasse mit rund 40 € im Monat.', tipp:'Einfach eine Box bei einem Anbieter bestellen — die rechnen direkt mit der Kasse ab.' },
      { titel:'Verhinderungspflege', text:'Wenn pflegende Angehörige Urlaub oder eine Pause brauchen, zahlt die Kasse eine Ersatzpflege.', tipp:'Pflegestützpunkt fragen, wie sich das mit Kurzzeitpflege kombinieren lässt.' },
      { titel:'Kostenlose Pflegeberatung', text:'Pflegestützpunkte beraten kostenlos und neutral — sie helfen durch den Antrags-Dschungel und kennen alle Angebote vor Ort.', tipp:'Die Beratung steht jedem zu, auch ohne Pflegegrad.' },
      { titel:'Hausnotruf einrichten', text:'Ein Knopfdruck holt im Notfall Hilfe. Ab Pflegegrad 1 zahlt die Pflegekasse einen Zuschuss zum Hausnotruf.', tipp:'Sinnvoll besonders für Alleinlebende.' },
      { titel:'Wohnung anpassen', text:'Für barrierefreie Umbauten — etwa bodengleiche Dusche oder Treppenlift — gibt es bis 4.000 € Zuschuss je Maßnahme.', tipp:'Antrag bei der Pflegekasse stellen, bevor der Umbau beginnt.' }
    ]
  },
  gesundheit: {
    icon:'🩺', label:'Gesund & sicher', farbe:'#DC2626', bg:'#FEE2E2',
    intro:'Mit ein paar einfachen Gewohnheiten bleibt man länger fit und sicher zu Hause.',
    tipps:[
      { titel:'Vorsorge wahrnehmen', text:'Gesundheits-Check, Krebsfrüherkennung und Impfungen gegen Grippe, Gürtelrose und Pneumokokken schützen gezielt im Alter.', tipp:'Die Krankenkasse erinnert auf Wunsch an Vorsorgetermine.' },
      { titel:'Stürze vermeiden', text:'Lose Teppiche entfernen, Haltegriffe im Bad anbringen, für gute Beleuchtung sorgen und festes Schuhwerk tragen.', tipp:'Ein Sturz ist im Alter ein häufiger Grund für Pflegebedürftigkeit — Vorbeugen lohnt sich.' },
      { titel:'Medikamentenplan führen', text:'Alle Medikamente auf einer Liste sammeln. Arzt und Apotheke prüfen sie auf Wechselwirkungen.', tipp:'Ab drei Dauer-Medikamenten gibt es Anspruch auf einen amtlichen Medikationsplan.' },
      { titel:'Genug trinken', text:'Im Alter lässt das Durstgefühl nach. Rund 1,5 Liter am Tag sind wichtig für Kreislauf und Konzentration.', tipp:'Eine Trink-Erinnerung oder eine sichtbare Wasserflasche helfen.' },
      { titel:'In Bewegung bleiben', text:'Tägliche Spaziergänge, leichte Gymnastik und Gleichgewichtsübungen halten Muskeln und Kreislauf fit.', tipp:'Schon 30 Minuten gehen am Tag macht einen großen Unterschied.' },
      { titel:'Augen und Ohren prüfen', text:'Gutes Sehen und Hören beugt Stürzen und Vereinsamung vor. Regelmäßig kontrollieren lassen.', tipp:'Ein Hörgerät früh zu nutzen fällt leichter als spät.' },
      { titel:'Auf den Notfall vorbereitet', text:'Notfallnummern gut sichtbar notieren und eine Notfalldose im Kühlschrank mit den wichtigsten Gesundheitsdaten bereithalten.', tipp:'Rettungsdienste suchen gezielt im Kühlschrank nach der Notfalldose.' }
    ]
  },
  aktiv: {
    icon:'🚶', label:'Aktiv & unterwegs', farbe:'#16A34A', bg:'#DCFCE7',
    intro:'Das Alter ist eine aktive Zeit. Unternehmungen und Kontakte halten Körper und Geist jung.',
    tipps:[
      { titel:'Umgebung entdecken', text:'Unter Umgebung zeigt die App Parks, Cafés, Museen und Spazierwege in deiner Nähe auf einer Karte.', tipp:'Mit dem Routenplaner siehst du gleich den Weg zu Fuß.' },
      { titel:'Günstig Bahn fahren', text:'Mit der BahnCard 65 fahren Senioren günstiger. Dazu kommen Sparpreise und das bundesweite Deutschlandticket.', tipp:'Viele Ausflugsziele sind ohne Auto gut erreichbar.' },
      { titel:'Seniorentreff besuchen', text:'Mehrgenerationenhäuser und Seniorentreffs bieten Kaffeenachmittage, Spielegruppen und Ausflüge — meist kostenlos.', tipp:'Das Seniorenbüro der Stadt kennt die Angebote in der Nähe.' },
      { titel:'Sport für Senioren', text:'Vereine bieten Senioren-Gymnastik, Wassergymnastik, Wandergruppen und Tanzkreise — gut für Körper und Kontakte.', tipp:'Die Krankenkasse bezuschusst oft Gesundheitskurse.' },
      { titel:'Neues lernen', text:'Die Volkshochschule hat Kurse von Sprachen bis Computer, oft mit Rabatt für Rentner.', tipp:'Lernen hält das Gehirn nachweislich fit.' },
      { titel:'Ehrenamt und Engagement', text:'Erfahrung weitergeben als Lesepate, bei der Tafel oder im Besuchsdienst — das hält aktiv und verbindet mit anderen.', tipp:'Freiwilligenagenturen vermitteln passende Aufgaben.' },
      { titel:'Reisen in der Gruppe', text:'Seniorenreisen und begleitete Busreisen sind stressfrei organisiert — über Wohlfahrtsverbände, Kirchen und Vereine.', tipp:'In der Gruppe reist es sich auch allein nicht einsam.' },
      { titel:'Ausflüge festhalten', text:'Der Kalender der App hilft, Termine und Ausflüge mit Familie und Freunden zu planen und nichts zu vergessen.', tipp:'Erinnerungen lassen sich pro Termin einstellen.' }
    ]
  },
  alltag: {
    icon:'🏠', label:'Hilfe im Alltag', farbe:'#D97706', bg:'#FEF3C7',
    intro:'Niemand muss alles allein schaffen. Für fast jede Alltagsaufgabe gibt es Unterstützung.',
    tipps:[
      { titel:'Essen auf Rädern', text:'Warme Mahlzeiten werden nach Hause geliefert. Wohlfahrtsverbände und private Dienste bieten das an.', tipp:'Oft gibt es Probeessen, um den Geschmack zu testen.' },
      { titel:'Haushaltshilfe', text:'Caritas, AWO und Diakonie vermitteln Hilfe beim Putzen, Wäsche und Einkaufen.', tipp:'Mit Pflegegrad lässt sich das über den Entlastungsbetrag bezahlen.' },
      { titel:'Einkaufshilfe und Lieferung', text:'Viele Supermärkte liefern nach Hause. Auch die Nachbarschaftshilfe organisiert Einkäufe.', tipp:'Ein fester Liefertag pro Woche bringt Routine.' },
      { titel:'Fahrdienste nutzen', text:'Behindertenfahrdienste und ehrenamtliche Fahrdienste bringen zum Arzt, zum Einkauf oder zu Terminen.', tipp:'Beim Seniorenbüro oder der Gemeinde nach Angeboten fragen.' },
      { titel:'Nachbarschaftshilfe', text:'Nicht zögern zu fragen — viele Nachbarn helfen gern, man muss es nur ansprechen.', tipp:'Auch kleine Gegenleistungen wie Kuchen halten die Hilfe lebendig.' },
      { titel:'Begleitdienste', text:'Ehrenamtliche begleiten zu Behörden, zum Arzt oder einfach zum Spaziergang.', tipp:'Gerade für Wege, die allein unsicher wären, eine große Hilfe.' },
      { titel:'Seniorenbüro der Stadt', text:'Das Seniorenbüro ist die zentrale Anlaufstelle — es kennt alle Hilfen vor Ort und vermittelt weiter.', tipp:'Ein Anruf dort spart viel eigenes Suchen.' }
    ]
  },
  digital: {
    icon:'📱', label:'Handy & Betrugsschutz', farbe:'#4F46E5', bg:'#E0E7FF',
    intro:'Das Smartphone hilft im Alltag — und mit Wissen schützt man sich gut vor Betrügern.',
    tipps:[
      { titel:'Smartphone in Ruhe lernen', text:'Volkshochschulen und Vereine bieten Handy-Kurse speziell für Senioren — in kleinem Tempo und mit Geduld.', tipp:'Auch Enkelkinder zeigen gern, wie es geht.' },
      { titel:'Enkeltrick erkennen', text:'Wenn am Telefon angeblich ein Verwandter dringend Geld braucht: auflegen und die echte, bekannte Nummer selbst anrufen.', tipp:'Echte Verwandte verstehen diese Vorsicht.' },
      { titel:'Falsche Polizei am Telefon', text:'Die echte Polizei fragt niemals nach Geld oder Wertsachen am Telefon. Im Zweifel auflegen und selbst 110 wählen.', tipp:'Die 110 nie zurückrufen lassen — immer selbst neu wählen.' },
      { titel:'Keine Daten herausgeben', text:'Bankdaten, PIN und Passwörter niemals am Telefon, per SMS oder E-Mail nennen — egal wie echt es wirkt.', tipp:'Banken fragen so etwas grundsätzlich nicht ab.' },
      { titel:'Vorsicht an der Haustür', text:'Keine fremden Handwerker oder Verkäufer hereinlassen. Die Türkette nutzen und im Zweifel die Tür geschlossen halten.', tipp:'Echte Stadtwerke kündigen Besuche vorher schriftlich an.' },
      { titel:'Sichere Passwörter', text:'Für jedes wichtige Konto ein eigenes Passwort. Eine Vertrauensperson kann beim Einrichten helfen.', tipp:'Passwörter an einem sicheren Ort notieren, nicht am Bildschirm.' },
      { titel:'Im Zweifel nachfragen', text:'Lieber einmal zu viel bei Familie oder der Verbraucherzentrale nachfragen als auf einen Betrug hereinzufallen.', tipp:'Sich Zeit nehmen — Betrüger setzen immer unter Druck.' }
    ]
  },
  recht: {
    icon:'📜', label:'Vorsorge & Recht', farbe:'#7C3AED', bg:'#EDE9FE',
    intro:'Wer rechtzeitig vorsorgt, behält die Entscheidung in der eigenen Hand und entlastet die Familie.',
    tipps:[
      { titel:'Vorsorgevollmacht', text:'Sie legt fest, wer entscheiden darf, wenn man es selbst nicht mehr kann. Ohne sie bestimmt ein Gericht einen Betreuer.', tipp:'Am besten gemeinsam mit einer Vertrauensperson aufsetzen.' },
      { titel:'Patientenverfügung', text:'Sie hält fest, welche medizinische Behandlung man im Ernstfall möchte und welche nicht. Vordrucke gibt es kostenlos.', tipp:'Mit dem Hausarzt besprechen, damit alles eindeutig formuliert ist.' },
      { titel:'Betreuungsverfügung', text:'Falls doch eine gesetzliche Betreuung nötig wird, bestimmt sie, welche Person das Gericht einsetzen soll.', tipp:'Sinnvoll als Ergänzung zur Vorsorgevollmacht.' },
      { titel:'Testament', text:'Ein handschriftlich verfasstes und unterschriebenes Testament ist gültig. Beim Notar wird es sicher verwahrt.', tipp:'Ohne Testament gilt die gesetzliche Erbfolge — die passt nicht für jeden.' },
      { titel:'Beratung nutzen', text:'Betreuungsvereine und die Verbraucherzentrale beraten kostenlos oder günstig zu allen Vorsorge-Dokumenten.', tipp:'Fertige, geprüfte Formulare ersparen teure Fehler.' },
      { titel:'Dokumente griffbereit', text:'Wichtige Unterlagen an einem festen Ort sammeln und einer Vertrauensperson sagen, wo sie liegen.', tipp:'Eine einfache Übersichtsliste hilft den Angehörigen sehr.' },
      { titel:'Bestattungsvorsorge', text:'Wer möchte, kann eigene Wünsche und Kosten für die Bestattung vorab regeln — das entlastet die Angehörigen.', tipp:'Es besteht kein Zwang dazu — nur ein Angebot für mehr Ruhe.' }
    ]
  }
};

// ===== SAISON-VERANSTALTUNGEN — echte wiederkehrende Feste, Märkte & Programme =====
const SAISON_EVENTS = [
  { icon:'🎄', name:'Weihnachtsmärkte', monate:[11,12], text:'Glühwein, Buden, Karussell und Lichter — in fast jeder Stadt und vielen Dörfern von Ende November bis Weihnachten.', suche:'Weihnachtsmarkt' },
  { icon:'🕯️', name:'Adventssingen & Lichterfeste', monate:[11,12], text:'Konzerte, Krippenspiele und Lichterfeste in Kirchen und Gemeinden während der Adventszeit.', suche:'Adventssingen Lichterfest' },
  { icon:'🏮', name:'Martinsumzüge', monate:[11], text:'Laternenumzüge zum Sankt-Martins-Tag am 11. November — ein Höhepunkt für Kita- und Grundschulkinder.', suche:'Martinsumzug Laternenumzug' },
  { icon:'🎆', name:'Silvester & Neujahr', monate:[12,1], text:'Öffentliche Silvesterfeiern, Feuerwerke und Neujahrsempfänge der Städte.', suche:'Silvester Veranstaltung' },
  { icon:'🤡', name:'Fasching & Karneval', monate:[1,2], text:'Faschingsumzüge, Kinderfasching und Karnevalspartys — vor allem im Februar rund um Rosenmontag.', suche:'Faschingsumzug Kinderfasching' },
  { icon:'🐣', name:'Ostermärkte & Osterfeuer', monate:[3,4], text:'Ostermärkte, Osterfeuer und Eiersuchen für Familien rund um die Osterfeiertage.', suche:'Ostermarkt Osterfeuer' },
  { icon:'🌷', name:'Frühlings- & Maifeste', monate:[4,5], text:'Maibaumfeste, Frühlingsfeste und Tag-der-offenen-Tür-Aktionen, sobald es wärmer wird.', suche:'Frühlingsfest Maifest' },
  { icon:'🎡', name:'Volksfeste & Kirmes', monate:[4,5,6,7,8,9], text:'Rummel mit Fahrgeschäften, Buden und Festzelt — von der kleinen Kirmes bis zum großen Volksfest.', suche:'Volksfest Kirmes' },
  { icon:'🛍️', name:'Flohmärkte & Trödelmärkte', monate:[3,4,5,6,7,8,9,10], text:'Floh- und Trödelmärkte am Wochenende — günstig stöbern und selbst verkaufen. Oft auch reine Kinder-Flohmärkte.', suche:'Flohmarkt' },
  { icon:'🏙️', name:'Stadtfeste', monate:[5,6,7,8,9], text:'Großes Stadtfest mit Bühnen, Musik, Essen und Kinderprogramm — meist an einem Wochenende im Sommer.', suche:'Stadtfest' },
  { icon:'🎬', name:'Open-Air-Kino', monate:[6,7,8], text:'Filme unter freiem Himmel in lauen Sommernächten — viele Städte zeigen auch Familienfilme.', suche:'Open-Air-Kino Freiluftkino' },
  { icon:'🧒', name:'Ferienprogramm der Stadt', monate:[7,8], text:'In den Sommerferien bieten Städte und Vereine ein buntes Ferienprogramm — Ausflüge, Workshops und Sport, oft günstig oder kostenlos.', suche:'Ferienprogramm Sommerferien Kinder' },
  { icon:'🍂', name:'Erntedank- & Herbstfeste', monate:[9,10], text:'Erntedankfeste, Herbstmärkte und Kürbisfeste mit Bauernmarkt und Mitmachaktionen für Kinder.', suche:'Herbstfest Erntedankfest' },
  { icon:'🎃', name:'Halloween-Aktionen', monate:[10], text:'Kürbisschnitzen, Gruselführungen und Halloween-Partys für Kinder Ende Oktober.', suche:'Halloween Kinder Aktion' },
  { icon:'🛒', name:'Verkaufsoffene Sonntage', monate:[1,2,3,4,5,6,7,8,9,10,11,12], text:'An verkaufsoffenen Sonntagen ist die Innenstadt geöffnet — oft mit Musik, Aktionen und Programm für die ganze Familie.', suche:'verkaufsoffener Sonntag' },
  { icon:'📚', name:'Bibliotheks- & Vorleseprogramme', monate:[1,2,3,4,5,6,7,8,9,10,11,12], text:'Stadtbüchereien bieten das ganze Jahr Vorlesestunden, Bastelnachmittage und Kinderprogramme — meist kostenlos.', suche:'Stadtbibliothek Kinderprogramm' }
];

// ===== WISSEN — echte, faktenbasierte Wissens-Fakten (täglich wechselnd) =====
const WISSEN_FAKTEN = [
  { kategorie:'Körper und Gesundheit', text:'Das menschliche Herz schlägt etwa 100.000 Mal an einem einzigen Tag.' },
  { kategorie:'Körper und Gesundheit', text:'Erwachsene haben 206 Knochen — Babys werden mit rund 300 geboren, viele wachsen später zusammen.' },
  { kategorie:'Körper und Gesundheit', text:'Beim Niesen schießt die Luft mit über 100 km/h aus der Nase.' },
  { kategorie:'Körper und Gesundheit', text:'Der menschliche Körper besteht zu etwa 60 Prozent aus Wasser.' },
  { kategorie:'Körper und Gesundheit', text:'Kinder haben 20 Milchzähne, Erwachsene bis zu 32 bleibende Zähne.' },
  { kategorie:'Körper und Gesundheit', text:'Im Schlaf sortiert und festigt das Gehirn das, was tagsüber gelernt wurde.' },
  { kategorie:'Körper und Gesundheit', text:'Das Auge kann mehrere Millionen verschiedene Farbtöne unterscheiden.' },
  { kategorie:'Körper und Gesundheit', text:'Lachen senkt Stresshormone und ist nachweislich gut für das Immunsystem.' },
  { kategorie:'Natur und Tiere', text:'Honigbienen verständigen sich über einen Tanz, der anderen Bienen den Weg zu Blüten zeigt.' },
  { kategorie:'Natur und Tiere', text:'Oktopusse haben drei Herzen und blaues Blut.' },
  { kategorie:'Natur und Tiere', text:'Bäume tauschen über Wurzeln und feine Pilzfäden im Boden Nährstoffe und Signale aus.' },
  { kategorie:'Natur und Tiere', text:'Ein Marienkäfer frisst pro Tag bis zu 50 Blattläuse und schützt so Pflanzen.' },
  { kategorie:'Natur und Tiere', text:'Kolibris sind die einzigen Vögel, die auch rückwärts fliegen können.' },
  { kategorie:'Natur und Tiere', text:'Eichhörnchen vergessen viele ihrer vergrabenen Nüsse — daraus wachsen neue Bäume.' },
  { kategorie:'Natur und Tiere', text:'Ein Gewitter entsteht, wenn warme, feuchte Luft schnell nach oben steigt.' },
  { kategorie:'Natur und Tiere', text:'Schnecken tragen ihr Haus ein Leben lang — es wächst mit ihnen mit.' },
  { kategorie:'Alltag und Haushalt', text:'Honig wird praktisch nie schlecht — in alten Gräbern fand man noch essbaren Honig.' },
  { kategorie:'Alltag und Haushalt', text:'Brot bleibt bei Zimmertemperatur länger frisch als im Kühlschrank.' },
  { kategorie:'Alltag und Haushalt', text:'Eine LED-Lampe verbraucht bis zu 80 Prozent weniger Strom als eine alte Glühbirne.' },
  { kategorie:'Alltag und Haushalt', text:'Stoßlüften — Fenster kurz ganz öffnen — ist sparsamer und wirksamer als ein gekipptes Fenster.' },
  { kategorie:'Alltag und Haushalt', text:'Bananen geben ein Reifegas ab — daneben reift anderes Obst schneller.' },
  { kategorie:'Alltag und Haushalt', text:'Nach dem Zähneputzen nur ausspucken statt nachzuspülen — so wirkt das Fluorid länger.' },
  { kategorie:'Alltag und Haushalt', text:'Geräte im Standby verbrauchen weiter Strom — eine Steckerleiste mit Schalter spart Geld.' },
  { kategorie:'Alltag und Haushalt', text:'Kaltes oder lauwarmes Waschen reinigt die meiste Wäsche genauso gut und spart viel Energie.' },
  { kategorie:'Welt und Geschichte', text:'Das Licht der Sonne braucht etwa 8 Minuten, bis es die Erde erreicht.' },
  { kategorie:'Welt und Geschichte', text:'Deutschland hat 16 Bundesländer — das kleinste ist Bremen, das größte Bayern.' },
  { kategorie:'Welt und Geschichte', text:'Der höchste Berg Deutschlands ist die Zugspitze mit 2.962 Metern.' },
  { kategorie:'Welt und Geschichte', text:'Der Bodensee ist der größte See Deutschlands.' },
  { kategorie:'Welt und Geschichte', text:'Die Erde dreht sich am Äquator mit rund 1.600 km/h — wir merken es nicht, weil sich alles mitbewegt.' },
  { kategorie:'Welt und Geschichte', text:'Ein Jahr hat 365 Tage, weil die Erde so lange für eine Runde um die Sonne braucht.' },
  { kategorie:'Welt und Geschichte', text:'Manche Bäume auf der Erde sind über 4.000 Jahre alt.' },
  { kategorie:'Welt und Geschichte', text:'Am Meer gibt es Ebbe und Flut, weil der Mond das Wasser der Erde anzieht.' },
  { kategorie:'Kinder und Lernen', text:'Vorlesen fördert Wortschatz und Fantasie von Kindern mehr als die meisten Lern-Apps.' },
  { kategorie:'Kinder und Lernen', text:'Das Gehirn wächst in den ersten drei Lebensjahren am schnellsten.' },
  { kategorie:'Kinder und Lernen', text:'Kinder lernen Sprachen besonders leicht — in den ersten Jahren ist das Gehirn extrem aufnahmefähig.' },
  { kategorie:'Kinder und Lernen', text:'Nach einer kurzen Bewegungspause merkt man sich Gelerntes besser.' },
  { kategorie:'Kinder und Lernen', text:'Fehler sind wichtig — das Gehirn lernt gerade aus dem, was zuerst nicht klappt.' },
  { kategorie:'Kinder und Lernen', text:'Singen und Reime helfen Kindern, sich Dinge viel leichter zu merken.' },
  { kategorie:'Kinder und Lernen', text:'Lob für die Anstrengung — nicht nur fürs Ergebnis — macht Kinder ausdauernder.' },
  { kategorie:'Kinder und Lernen', text:'Schulkinder brauchen je nach Alter etwa 9 bis 12 Stunden Schlaf pro Nacht.' },
  { kategorie:'Technik und Zahlen', text:'Computer rechnen im Hintergrund nur mit zwei Zeichen: 0 und 1.' },
  { kategorie:'Technik und Zahlen', text:'Ein Passwort ist umso sicherer, je länger es ist — Länge ist wichtiger als Sonderzeichen.' },
  { kategorie:'Technik und Zahlen', text:'Der QR-Code wurde ursprünglich erfunden, um Autoteile in der Fabrik zu verfolgen.' },
  { kategorie:'Technik und Zahlen', text:'Akkus halten länger, wenn man sie nicht ständig ganz leer und wieder ganz voll lädt.' },
  { kategorie:'Technik und Zahlen', text:'Im Flugmodus lädt das Handy etwas schneller, weil es weniger funkt.' },
  { kategorie:'Technik und Zahlen', text:'Eine E-Mail braucht meist nur Sekundenbruchteile einmal um die halbe Welt.' },
  { kategorie:'Technik und Zahlen', text:'WLAN überträgt Daten über Funkwellen — ähnlich harmlos wie die eines Radios.' },
  { kategorie:'Technik und Zahlen', text:'Das erste smartphone-ähnliche Gerät kam bereits 1994 auf den Markt.' }
];

// ===== ALLE FAMILIEN-TIPPS (80+) =====
const FAMILIEN_TIPPS_ALLE = [
  {
    id: 'familie', kategorie: 'Familie & Kinder', emoji: '👨‍👧',
    tipps: [
      { titel: 'Tagesroutinen einführen', text: 'Feste Abläufe (Aufstehen, Essen, Schlafen) geben Kindern Sicherheit und reduzieren Konflikte enorm.' },
      { titel: 'Qualitätszeit vor Quantität', text: '30 Min. vollständige Aufmerksamkeit (kein Handy!) ist wertvoller als 3 Stunden nebenbei. Kleine Rituale prägen.' },
      { titel: 'Kinder in Haushalt einbinden', text: 'Ab 4 Jahren können Kinder helfen: Tisch decken, sortieren, Wäsche zusammenlegen. Fördert Selbstständigkeit.' },
      { titel: 'Gefühle benennen lernen', text: '"Ich sehe, dass du wütend bist" — Kinder beruhigen sich schneller wenn Gefühle anerkannt werden.' },
      { titel: 'Wochenend-Ritual schaffen', text: 'Ein festes Wochenend-Ritual (z.B. Samstag-Frühstück mit Lieblingsessen) stärkt die Bindung langfristig.' },
      { titel: 'Netzwerk aufbauen', text: 'Andere Alleinerziehende über VAMV, Kita oder Nachbarschaft kennenlernen — gegenseitige Unterstützung spart Zeit und Kosten.' },
      { titel: 'Notfallplan bereithalten', text: 'Für Krankheit oder Spätdienst: Liste mit 3 Personen die kurzfristig einspringen können (Nachbarn, Freunde, Familie).' },
      { titel: 'Grenzen klar kommunizieren', text: 'Klare, konsequente Regeln — nicht zu viele — schaffen Sicherheit. Kinder brauchen Grenzen, keine Verhandlungen.' },
      { titel: 'Eigene Zeit schützen', text: 'Mindestens 1 Stunde pro Woche nur für sich selbst einplanen und als unverrückbar behandeln.' },
      { titel: 'Lob konkret machen', text: 'Nicht "Du bist toll" sondern "Du hast heute so geduldig gewartet — das war toll!" — konkretes Lob wirkt stärker.' },
      { titel: 'Kinderbetreuung clever nutzen', text: 'Tagespflegepersonen (Tagesmütter) sind oft günstiger als Kitas und flexibler. Jugendamt fragt ansprechen.' },
      { titel: 'Familienrat einführen', text: 'Wöchentlich 10 Min. gemeinsam reden: Was war schön? Was war schwierig? Was wollen wir nächste Woche machen?' },
      { titel: 'Bildschirmzeit klar regeln', text: 'WHO-Empfehlung: U2 kein TV, 2-5 J max. 1h, 6-12 J max. 2h pro Tag. Kein Bildschirm 1h vor Schlaf. Klare Regel statt täglich Diskussion.' },
      { titel: 'Geschwisterstreit moderieren', text: 'Nicht Schiedsrichter spielen — Kinder beide Seiten erzählen lassen, dann gemeinsam Lösung finden. Trainiert Empathie und Konfliktlösung.' },
      { titel: 'Vorbild sein bei Emotionen', text: 'Kinder kopieren Reaktionen. Wer selbst tief atmet bei Stress, lernt Kindern die wertvollste Lebenskompetenz.' },
      { titel: 'Tagesabschluss-Ritual', text: 'Jeden Abend 5 Min: "Was war heute schön? Worauf bin ich stolz?" Stärkt Selbstwert und positives Denken bei Kindern.' },
      { titel: 'Wutanfälle akzeptieren', text: 'Bei kleinen Kindern: Wut ist normal, kein Trotz. Nicht bekämpfen, sondern begleiten. Wenn ruhig: gemeinsam reden.' },
      { titel: 'Kein TV beim Essen', text: 'Mahlzeiten ohne Bildschirm fördern Gespräche, langsamere Esstempo und stärken Familienbindung — schon kleine Kinder profitieren.' },
      { titel: 'Hausaufgaben-Zeit fix', text: 'Immer zur gleichen Zeit (z.B. 15-16 Uhr) Hausaufgaben — wird zur Routine, keine Diskussion mehr. Vorher kurze Bewegungspause.' },
      { titel: 'Bilderbuch statt Handy', text: 'Bei Wartezeiten (Arzt, ÖPNV): kleines Buch in der Tasche statt Handy. Kinder lernen Konzentration und Geduld.' },
      { titel: 'Kuschelzeit täglich', text: 'Körperkontakt schüttet Oxytocin aus — bei Babys und großen Kindern gleich wichtig. 10 Min am Tag bewusst kuscheln stärkt Bindung.' },
      { titel: 'Eigene Geheimsprache', text: 'Eigene Wörter oder Geste-Code für die Familie (z.B. drei Hand-Drücke für "Ich hab dich lieb") — schafft Verbundenheit.' },
      { titel: 'Foto-Album mit Kindern', text: 'Gemeinsam ein Erinnerungsbuch machen: Fotos einkleben, Sätze daneben. Stärkt Identität und Familiengeschichte.' },
      { titel: 'Kind-mit-Eltern-Date', text: 'Bei mehreren Kindern: jedem einzelnen 1× im Monat 1h exklusive Zeit nur mit dir. Stärkt Bindung enorm.' },
      { titel: 'Mediennutzung gemeinsam', text: 'Wenn TV/Tablet: zusammen schauen und nachher drüber reden. Macht den Konsum sozial statt isolierend.' },
      { titel: 'Großeltern-Kontakt pflegen', text: 'Bei räumlicher Entfernung: wöchentliches Video-Telefonat fest einplanen. Verbindung zu Generation hilft Kindern.' },
      { titel: 'Patenkind-Konzept', text: 'Vertraute Bezugsperson außerhalb der Familie (Pate, Tante, Freund) — Kinder profitieren von zusätzlicher Bezugsperson, gerade bei Single-Eltern.' },
      { titel: 'Eigenes Zimmer respektieren', text: 'Ab 8 Jahren: Anklopfen vor dem Eintreten. Lehrt Privatsphäre und gegenseitigen Respekt.' },
      { titel: 'Geschenke selbst basteln', text: 'Für Großeltern/Verwandte: Selbstgemachtes ist wertvoller und kostet nichts. Kinder lernen: Schenken ≠ Geld.' },
      { titel: 'Familien-Hobby pflegen', text: 'Ein gemeinsames Hobby (Wandern, Brettspiele, Backen) prägt Kindheit nachhaltig — wichtiger als teure Aktivitäten.' }
    ]
  },
  {
    id: 'finanzen', kategorie: 'Finanzen & Sparen', emoji: '💰',
    tipps: [
      { titel: 'Haushaltsbuch führen', text: 'Nur wer weiß wohin das Geld geht, kann sparen. App (z.B. Outbank, Monefy) oder Notizbuch reicht.' },
      { titel: 'Daueraufträge prüfen', text: 'Einmal im Jahr alle Daueraufträge und Abos durchgehen — viele zahlen 50–100 € im Monat für Dinge die sie nicht nutzen.' },
      { titel: 'Notgroschen aufbauen', text: 'Ziel: 3 Monatsausgaben als Rücklage. Auch 20 € / Monat beiseite legen hilft — "Rücklage" als fixer Posten im Haushaltsbuch.' },
      { titel: 'Alle Leistungen beantragen', text: 'Kindergeld, Unterhaltsvorschuss, Wohngeld, KiZ, BuT — viele beantragen nicht alles. Jede Leistung prüfen und beantragen!' },
      { titel: 'Steuerklasse 2 sichern', text: 'Als Alleinerziehende spart Steuerklasse 2 bis zu 350 € im Jahr — beim Finanzamt oder über ELSTER beantragen.' },
      { titel: 'Versicherungen vergleichen', text: 'Kfz-, Haftpflicht- und Hausratversicherung jährlich auf Check24/Verivox vergleichen. Oft 100–300 € Einsparung möglich.' },
      { titel: 'Bildungs- und Teilhabepaket', text: 'Bei Bürgergeld oder KiZ: bis 15 € / Monat für Sport, Vereinsbeitrag, Schulausflüge — direkt beim Jobcenter beantragen.' },
      { titel: 'Energiekosten senken', text: 'Strom-Anbieter wechseln (Verivox) spart 200–400 € / Jahr. Standby-Geräte aus: spart bis 100 € / Jahr extra.' },
      { titel: 'Kostenlose Angebote nutzen', text: 'Bibliothek, Spielplatz, Stadtpark, Familien-Events, Museen am freien Tag — Freizeit muss nichts kosten.' },
      { titel: 'Kreditkarte vermeiden', text: 'Revolving-Credit (Ratenzahlung der Kreditkarte) kostet oft 15–20 % Zinsen — immer sofort ausgleichen oder Debitkarte nutzen.' },
      { titel: 'Sozialtarife anfragen', text: 'Internet, Strom, ÖPNV — viele Anbieter haben Sozialtarife für Bürgergeld-Bezieher. Direkt beim Anbieter nachfragen!' },
      { titel: 'Elterngeld rechtzeitig beantragen', text: 'Elterngeld muss innerhalb von 3 Monaten nach Geburt beantragt werden — max. 14 Monate, auch für Alleinerziehende möglich.' },
      { titel: '50-30-20-Regel anwenden', text: '50% Fixkosten (Miete, Strom), 30% variable Ausgaben (Essen, Freizeit), 20% Sparen/Schulden. Einfache Faustregel für Haushalt.' },
      { titel: 'Bargeld-Umschlag-System', text: 'Für variable Ausgaben (Lebensmittel, Freizeit): am Monatsanfang Bargeld in Umschläge — wenn leer, ist leer. Verhindert Überziehung.' },
      { titel: 'Steuererklärung lohnt sich', text: 'Auch bei Bürgergeld/wenig Einkommen: Steuererklärung kann 200-1000€ zurückbringen (Werbungskosten, Kinderbetreuung). ELSTER ist kostenlos.' },
      { titel: 'Riester-Rente Familienbonus', text: 'Pro Kind 300€/Jahr Zulage vom Staat — auch bei niedrigem Einkommen. Mindesteinzahlung: 60€/Jahr (5€/Monat).' },
      { titel: 'Kontowechsel für Bonus', text: 'Viele Banken zahlen 50-150€ Bonus für Kontowechsel. Service: financefly.de, finanzfluss.de — Vergleichsportale.' },
      { titel: 'Cashback-Apps nutzen', text: 'PAYBACK, DeutschlandCard, Marktguru: bei jedem Einkauf 1-3% zurück. Klingt wenig, summiert sich auf 100-300€ im Jahr.' },
      { titel: 'Vergleichsportal vor jedem Kauf', text: 'Idealo, Geizhals: vor jedem größeren Kauf (>50€) 2 Min vergleichen. Spart oft 10-30% am gleichen Produkt.' },
      { titel: 'Schul-/Vereinsausstattung gebraucht', text: 'Schulranzen, Sportbekleidung, Musikinstrumente: Kleinanzeigen, Mamikreisel, Vinted. 50-80% günstiger, Kinder wachsen eh raus.' },
      { titel: 'Birthday-Boxen vermeiden', text: 'Kinder-Geburtstag muss nicht teuer sein: Schatzsuche im Park, selbstgemachte Snacks, ein Spiel. Klassiker > teure Locations.' },
      { titel: 'Schufa-Auskunft kostenlos', text: '1× pro Jahr kostenlose Schufa-Selbstauskunft anfordern (meineschufa.de) — Fehler korrigieren spart bei Mietverträgen/Krediten.' },
      { titel: 'Pflegekind-Vergütung prüfen', text: 'Wer ein Kind aufnimmt: Pflegegeld bis 1.200€/Monat möglich. Auch bei Verwandten-Pflege (Großeltern, Onkel) möglich.' },
      { titel: 'Krankenkassen-Boni nutzen', text: 'TK, AOK, Barmer: Bonusprogramme bringen 100-500€/Jahr. Sport, Vorsorge, Bewegungs-App. Anrufen und nachfragen.' },
      { titel: 'GEZ befreien lassen', text: 'Bei Bürgergeld, BAföG, Wohngeld: Rundfunkbeitrag wegfallen (220€/Jahr). Antrag online auf rundfunkbeitrag.de.' },
      { titel: 'Klassische Sparbücher meiden', text: 'Sparbuch zahlt 0,01% — Geldmarktkonto (Trade Republic) 3-4%. Bei 5.000€ Notgroschen: 150€/Jahr mehr.' },
      { titel: 'Abos im Halbjahres-Check', text: 'Alle Abos (Streaming, Apps, Fitness) alle 6 Monate prüfen. Was nicht genutzt → sofort kündigen. Schnitt: 30-80€/Monat Einsparung.' },
      { titel: 'Stromkosten halbieren', text: 'LED-Lampen, Standby aus, Wäsche bei 30°C, Kühlschrank auf 7°C, Türen kurz öffnen. -30% sind realistisch ohne Komfortverlust.' },
      { titel: 'Selbst-Reparatur lernen', text: 'YouTube hat Anleitung für fast alles (Waschmaschine, Fahrrad, Möbel). Selbst-Reparatur spart 100-500€ pro Reparatur.' },
      { titel: 'Geld für Kinder lernen', text: 'Ab 6 Jahren Taschengeld einführen: alters * 0,50€/Woche. Kinder lernen Wert kennen — die wichtigste Geld-Lektion.' },
      { titel: 'Bedingungsloses Sparen', text: 'Sparen muss VOR den Ausgaben passieren — Dauerauftrag am 1. des Monats. "Was übrig bleibt sparen" funktioniert nie.' }
    ]
  },
  {
    id: 'wohnen', kategorie: 'Wohnen', emoji: '🏠',
    tipps: [
      { titel: 'Wohnberechtigungsschein beantragen', text: 'WBS beim Wohnungsamt beantragen — ermöglicht günstigere Sozialwohnungen. Einkommensgrenzen prüfen.' },
      { titel: 'Mehrere Portale gleichzeitig nutzen', text: 'ImmoScout24, Kleinanzeigen, Immowelt, Wohnungsbörse täglich morgens checken — gute Angebote sind in Stunden weg.' },
      { titel: 'Privatvermieter bevorzugen', text: 'Kleinanzeigen und lokale Aushänge — kein Makler, keine Provision, oft günstigere Mieten und persönlicherer Kontakt.' },
      { titel: 'Suchagent einrichten', text: 'Auf ImmoScout24 und Immowelt einen Suchagenten anlegen — Sie erhalten sofort per E-Mail Benachrichtigung bei neuen Angeboten.' },
      { titel: 'Wohnungsgesellschaften direkt kontaktieren', text: 'Städtische Wohnungsgesellschaften haben oft eigene Wartelisten. Direkt dort bewerben — ohne Portal-Konkurrenz.' },
      { titel: 'Bewerbungsmappe vorbereiten', text: 'SCHUFA, Gehaltsnachweis oder Bescheid, Mietschuldenfreiheitsbescheinigung fertig haben — schnelle Reaktion ist entscheidend.' },
      { titel: 'Soziale Träger anfragen', text: 'AWO, Caritas, Diakonie haben oft eigene günstige Wohnprojekte speziell für Alleinerziehende — direkt vor Ort anfragen.' },
      { titel: 'Umzugskosten als Hilfe beantragen', text: 'Beim Jobcenter / Sozialamt können Umzugskosten übernommen werden — vorher unbedingt genehmigen lassen!' },
      { titel: 'Nebenkostenabrechnung prüfen', text: 'Jährlich die Nebenkostenabrechnung kontrollieren — Fehler sind häufig. Mieterverein bietet günstige Prüfung an (ca. 10 €).' },
      { titel: 'Kleine Wohnung clever einrichten', text: 'Hochbetten, Multifunktionsmöbel und helle Farben lassen kleine Wohnungen größer wirken und sparen Platz für Kinder.' },
      { titel: 'Mietkaution-Versicherung statt Bar', text: 'Statt 3 Monatsmieten Kaution: Kautionsversicherung (1-5% jährlich). Kostet ein bisschen, schont Liquidität.' },
      { titel: 'Energieausweis prüfen', text: 'Bei neuer Wohnung Energieausweis prüfen — schlechte Werte = hohe Heizkosten. C oder besser ideal.' },
      { titel: 'Erstausstattung bei Bürgergeld', text: 'Jobcenter zahlt bei Wohnungserstausstattung Möbel/Haushaltsgeräte. Beim Einzug + bei Geburt eines Kindes beantragen.' },
      { titel: 'Zwei-Zimmer-Trick', text: 'Wohnzimmer als zweites Schlafzimmer für Kind nutzen: Schlafsofa + Vorhang/Raumteiler. Spart 200-400€ Miete.' },
      { titel: 'Heizen unter 20°C kostet 6%', text: 'Pro Grad weniger Raumtemperatur: 6% Heizkosten gespart. 19°C Wohnzimmer, 17°C Schlafzimmer = optimal + gesund.' },
      { titel: 'Stoßlüften statt Kipp', text: 'Fenster gekippt = Wärme weg, Schimmel rein. 3× täglich 5 Min Stoßlüften = optimal. Spart 200€/Jahr Heizkosten.' },
      { titel: 'Schimmel früh erkennen', text: 'Kleine schwarze Punkte hinter Möbeln, an Außenwänden. Sofort handeln: Möbel 10 cm Abstand zur Wand, mehr lüften, Hygrometer (5€).' },
      { titel: 'Mietminderung bei Mängeln', text: 'Heizung defekt, Schimmel, Lärm: Mietminderung möglich (1-50%). Schriftlich melden, Beweise sichern. Mieterverein hilft.' },
      { titel: 'IKEA-Hacks für günstige Möbel', text: 'IKEA-Kallax-Regal, Lack-Tisch, Malm-Kommode — Klassiker zu kleinem Preis. Kombinieren mit gebrauchten Stücken = persönlich.' },
      { titel: 'Wohnberechtigungsschein zeitig', text: 'WBS 3-6 Monate vor geplanter Wohnungssuche beantragen — Vorlaufzeit für Bearbeitung. Beim Wohnungsamt.' },
      { titel: 'Wohnbau-Genossenschaften', text: 'Genossenschaftswohnungen sind sicherer und oft günstiger. Anteil ab 500-3.000€. Recherche: wohnungsboerse.de oder lokale Genossenschaften.' },
      { titel: 'Pflanzen für Raumklima', text: 'Birkenfeige, Bogenhanf, Efeu: filtern Schadstoffe, befeuchten Luft. 3-5 Pflanzen reichen für 20 m² Zimmer.' },
      { titel: 'Smart-Meter-Anfrage', text: 'Bei Neueinzug Smart-Meter beantragen — zeigt Stromverbrauch live. Bewusster Konsum = -10-20% Stromrechnung.' },
      { titel: 'Wohnungsbörsen Geheimtipps', text: 'wg-gesucht.de, friendsmove.de, eBay-Kleinanzeigen — neben Hauptportalen oft günstigere Angebote für Familien.' },
      { titel: 'Schlüssel-Service vermeiden', text: 'Notdienst-Schlüssel-Service kostet 100-300€. Zweitschlüssel bei Nachbar/Familie lassen = 0€ und sicherer.' },
      { titel: 'Hausrat-Inventarliste', text: 'Liste aller Wertsachen mit Fotos auf Cloud speichern. Bei Schaden/Diebstahl: lückenlose Versicherungsabwicklung.' },
      { titel: 'Wäsche-Trockner ohne Strom', text: 'Statt Tumbler: Wäscheständer im Bad mit Lüftungsventilator. Spart 200-400€/Jahr Strom.' },
      { titel: 'Türrahmen-Klettergerüst', text: 'Kletterstange im Türrahmen für Kinder (10-20€). Bewegung in der Wohnung, gerade bei Regenwetter Gold wert.' },
      { titel: 'Räume zonen statt trennen', text: 'In kleiner Wohnung: Bereiche durch Teppich/Licht/Vorhang abgrenzen statt durch Wände. Schafft Privatsphäre bei Platzmangel.' }
    ]
  },
  {
    id: 'gesundheit', kategorie: 'Gesundheit', emoji: '🏥',
    tipps: [
      { titel: 'Vorsorgeuntersuchungen wahrnehmen', text: 'U1–U9 für Kinder sind kostenlos und wichtig. Eltern: Jährliche Check-ups beim Hausarzt — kostenlos mit Krankenversicherung.' },
      { titel: 'Zuzahlungsbefreiung beantragen', text: 'Bei geringem Einkommen: Befreiung von Zuzahlungen (Medikamente, Krankenhaus) bei der Krankenkasse beantragen. Bis zu 200 € / Jahr sparen.' },
      { titel: 'Gesundheits-Apps nutzen', text: 'Viele Krankenkassen bieten kostenlose Apps für Yoga, Schlaf, Ernährung an — in der Krankenkassen-App nachschauen.' },
      { titel: 'Mentale Gesundheit priorisieren', text: 'Burnout bei Alleinerziehenden ist häufig. Frühzeitig Hilfe suchen: Telefonseelsorge (0800 111 0 111) ist kostenlos und anonym.' },
      { titel: 'Krankenkasse wechseln', text: 'Krankenkassen bieten unterschiedliche Zusatzleistungen (Zahnersatz, Brillen, Heilpraktiker) — Check24 Krankenkasse vergleichen.' },
      { titel: 'Hausapotheke pflegen', text: 'Basis-Hausapotheke spart Arztbesuche: Fieberthermometer, Wundpflaster, Schmerzmittel, Fieberzäpfchen für Kinder.' },
      { titel: 'Zahnprophylaxe nutzen', text: 'Zweimal jährlich kostenlose professionelle Zahnreinigung bei vielen Krankenkassen inklusive — Termin rechtzeitig vereinbaren.' },
      { titel: 'Bewegung in den Alltag integrieren', text: 'Mit Kindern zu Fuß oder Fahrrad fahren statt Auto — spart Sprit und hält fit. Spielplatz statt Sofa ist die beste Prävention.' },
      { titel: 'Schlaf schützen', text: 'Ausreichend Schlaf ist die wichtigste Gesundheitsressource. Kinder-Schlafrhythmus früh einführen damit auch Eltern ausreichend schlafen.' },
      { titel: 'Ernährungsberatung kostenlos', text: 'Viele Krankenkassen übernehmen Kosten für Ernährungsberatung (bis 200 €). Bei Kasse nachfragen — lohnt sich für die ganze Familie.' },
      { titel: 'Impfungen aktuell halten', text: 'Impfpass jährlich prüfen. Tetanus alle 10 Jahre, Grippe ab 60 oder bei Risikogruppen. Bei Kindern STIKO-Plan beim Kinderarzt prüfen.' },
      { titel: 'Vitamin-D im Winter', text: 'Oktober-April: 80% der Deutschen haben Mangel. 1.000-2.000 IE täglich für Erwachsene. Bei Kindern Arzt fragen.' },
      { titel: 'Augenuntersuchung Kinder', text: 'U7a und U9: Kostenlose Sehtests. Bei Schielen, Augenreiben, Stolpern: zum Augenarzt — frühe Behandlung verhindert lebenslange Sehprobleme.' },
      { titel: '116117 statt 112', text: 'Nicht-akut, aber außerhalb Sprechzeit: 116117 anrufen — kostenfrei, Wegweiser zur richtigen Hilfe. Entlastet Notaufnahme.' },
      { titel: 'Erste-Hilfe-Kurs auffrischen', text: 'Alle 3-5 Jahre Auffrischung — vor allem Kinder-Erste-Hilfe. DRK, Maltester, ASB: 30-50€ und ein Tag.' },
      { titel: 'Hörscreening Säuglinge', text: 'Direkt nach Geburt + bei U3 (4-5 Wochen). Hörverlust früh erkannt = optimale Sprachentwicklung.' },
      { titel: 'Telefon-Sprechstunde nutzen', text: 'Viele Hausärzte und Kinderärzte bieten Tel-Sprechstunde an — schnelle Klärung ohne Wartezimmer-Zeit.' },
      { titel: 'Online-Termine buchen', text: 'doctolib.de, jameda.de: viele Ärzte verfügbar. Spart Telefon-Wartezeiten und zeigt freie Termine.' },
      { titel: 'eRezept aktivieren', text: 'Über Krankenkassen-App eRezept aktivieren — Apotheke direkt mit Code beliefern, ohne Wartezeit beim Arzt.' },
      { titel: 'Sport-Verein günstig', text: 'Vereinsbeiträge 5-15€/Monat — Krankenkassen-Bonus 50-150€/Jahr für Aktivität. Netto kostet es quasi nichts.' },
      { titel: 'Schwitzen bei Babys vermeiden', text: 'Faustregel: gleiche Kleidung wie Eltern, 1 Schicht mehr in Schlafzimmer. Überhitzung erhöht SIDS-Risiko.' },
      { titel: 'Sonnenschutz LSF 50+', text: 'Kinderhaut 30-mal empfindlicher. LSF 50, alle 2h erneuern, 11-15 Uhr Schatten. Mehr UV-Schäden in Kindheit → Hautkrebs später.' },
      { titel: 'Zähne ab 1. Zahn putzen', text: 'Ab erstem Zahn: 2× täglich mit fluoridhaltiger Kinderzahnpasta. Eltern bis 8 Jahre nachputzen. Beugt Karies effektiv vor.' },
      { titel: 'Mund-Nasen-Schutz Reisen', text: 'In Flugzeugen, Bahnen mit Kindern: leichte FFP2-Maske für Eltern reduziert Krankheitsmitnahme von Reisen.' },
      { titel: 'Medikamenten-Box sortieren', text: 'Tagesbox (7-Tage-Pillenbox 5€): verhindert Doppelte oder vergessene Einnahmen — wichtig bei chronischen Krankheiten.' },
      { titel: 'Medizin-Hotline App', text: 'Apps wie ADA, Babylon: Symptome eingeben → strukturierte Hinweise. Kostenlos und 24/7 — Wegweiser, kein Ersatz für Arzt.' },
      { titel: 'Wadenschmerzen ernst nehmen', text: 'Plötzliche, einseitige Wadenschmerzen + Schwellung: Thrombose-Verdacht! Sofort zum Arzt — gefährlich aber gut behandelbar.' },
      { titel: 'Frauenarzt jährlich', text: 'PAP-Test alle 1-3 Jahre, ab 35 zusätzlich HPV-Test. Krebsfrüherkennung 100% Kassenleistung — wichtige 15 Minuten pro Jahr.' },
      { titel: 'Männer-Check ab 45', text: 'Männer ab 45: jährlich Prostata-Vorsorge. Kassenleistung. Männer sterben oft an behandelbaren Krankheiten weil sie nicht zum Arzt gehen.' },
      { titel: 'Blutdruck monatlich messen', text: 'Ab 30 Jahren: Blutdruckmessgerät (15-30€) im Haushalt. Werte über 140/90 = Arzt. Stiller Killer wenn nicht erkannt.' }
    ]
  },
  {
    id: 'ernaehrung', kategorie: 'Ernährung', emoji: '🥗',
    tipps: [
      { titel: 'Wochenplan aufstellen', text: 'Einmal pro Woche 7 Mahlzeiten planen und gezielt einkaufen — verhindert Wegwerfen und spart 30–50 € im Monat.' },
      { titel: 'Doppelt kochen und einfrieren', text: 'Soßen, Suppen, Aufläufe in großen Mengen kochen und einfrieren — spart Zeit an stressigen Tagen.' },
      { titel: 'Saisonales und regionales Gemüse', text: 'Saisonales Gemüse (z.B. Wochenmärkte) ist bis zu 60 % günstiger als importiertes Gemüse im Supermarkt.' },
      { titel: 'Hülsenfrüchte als Fleischersatz', text: 'Linsen, Bohnen, Kichererbsen sind günstiger als Fleisch, sehr nahrhaft und Kinder mögen sie in Suppen und Aufläufen.' },
      { titel: 'Eigenmarken nutzen', text: 'Aldi/Lidl Eigenmarken oft aus denselben Fabriken wie Markenprodukte — bis 50 % günstiger. Blind-Test: Kinder merken keinen Unterschied.' },
      { titel: 'Tafel nutzen wenn möglich', text: 'Die Tafel bietet kostenlose oder sehr günstige Lebensmittel für Familien mit geringem Einkommen — tafel.de → Tafel finden.' },
      { titel: 'Reste kreativ verwenden', text: '"Reste-Tag" einführen: alles vom Kühlschrank zu einer Mahlzeit kombinieren. Verhindert Lebensmittelverschwendung und fördert Kreativität.' },
      { titel: 'Wasser statt Saft', text: 'Wasser ist gratis, Leitungswasser in Deutschland sicher. Säfte und Limonaden kosten bis zu 50 € extra im Monat und schaden den Zähnen.' },
      { titel: 'Too Good to Go App', text: 'Kurz vor Ladenschluss: Überraschungstüten von Bäckern und Restaurants für 2–5 €. Spart Geld und schont die Umwelt.' },
      { titel: 'Küche gemeinsam nutzen', text: 'Mit Kindern kochen fördert Selbstständigkeit, ist lehrreich und macht Essen zum Erlebnis. Ab 4 Jahren können Kinder einfache Aufgaben übernehmen.' },
      { titel: 'Frühstück ist Trumpf', text: 'Ein gutes Frühstück (Haferflocken, Obst, Brot) kostet < 0,50 € pro Person und gibt Energie für den ganzen Tag.' },
      { titel: 'Tiefkühlgemüse gleich gut', text: 'Tiefkühlerbsen, Spinat, Bohnen sind ebenso vitaminreich wie frisches Gemüse und bis zu 80 % günstiger.' },
      { titel: 'Mehrwegflasche statt Pet', text: 'Edelstahlflasche (10-15€) statt Plastik: Leitungswasser kostet 0,2 ct/Liter, in Flaschen 20-50 ct. Spart 200-400€/Jahr.' },
      { titel: 'Hafermilch selber machen', text: '50g Haferflocken + 500ml Wasser + Prise Salz: pürieren, abseihen. 80 ct statt 2,50€ pro Liter Hafermilch.' },
      { titel: 'Kinder dürfen mit-einkaufen', text: 'Lass Kinder beim Wochenmarkt aussuchen — sie essen, was sie selbst gewählt haben. Reduziert Mäkelei drastisch.' },
      { titel: 'Eintopf-Sonntag', text: '1× pro Woche großer Eintopf: 8-12 Portionen, kostet 5-10€ total. 3 Tage Mittagessen, 2 Portionen einfrieren.' },
      { titel: 'Zucker für Kinder reduzieren', text: 'WHO: Max 25g Zucker pro Tag für Kinder = 1 Schokoriegel. Ein Glas Saft hat schon 25g. Wasser-Apfelschorle als Alternative.' },
      { titel: 'Bio kaufen wo wichtig', text: 'Bio-Schmutzige-Liste: Erdbeeren, Spinat, Trauben, Apfel — am höchsten belastet. Bei diesen Bio lohnt sich.' },
      { titel: 'Reste-Kreativität', text: 'Aus Resten Pizza, Frittata, Curry: Bratreste + 2 Eier + Käse + Gemüse = neue Mahlzeit. App "Foodist" gibt Ideen.' },
      { titel: 'Mealprep am Sonntag', text: '2-3h Sonntags vorkochen: 5 Lunch-Boxen, Snacks portioniert. Spart pro Woche 1-2h Hektik und 30-50€ Auswärts-Essen.' },
      { titel: 'Wasserglas vor jeder Mahlzeit', text: 'Hilft beim Sättigen und reduziert ungewollte Snacks. Familienritual: bevor man isst, alle trinken.' },
      { titel: 'Linsen statt Hackfleisch', text: 'Rote Linsen ersetzen Hackfleisch in Bolognese: 1€/kg statt 8€/kg, mehr Protein, mehr Sättigung — Kinder merken es nicht.' },
      { titel: 'Saft aus Pulpa pressen', text: 'Pressen-statt-Kaufen: 1kg Orangen = 500ml Saft = 60 ct. Multivitaminsaft-Packung kostet 2€. Spart 10× mehr.' },
      { titel: 'Brot selber backen', text: 'No-Knead-Brot: 12h gehen lassen, in Topf backen — 60 Min Arbeit, 50 ct Brot. Schmeckt 10× besser als Discounter.' },
      { titel: 'Backofen mit Restwärme', text: '10 Min vor Ende ausschalten — Hitze reicht aus. Bei 3× Backen/Woche spart 15-25€/Jahr.' },
      { titel: 'Smoothies aus Tiefkühl-Obst', text: 'Tiefkühl-Beeren + Banane + Milch = 1€ Smoothie. Frische Beeren kosten 4-6€/kg, Tiefkühl 2-3€.' },
      { titel: 'Eier-Vielseitigkeit', text: '1 Ei = 30 ct, 7g Protein, sättigt 3h. Rührei, Omelette, Pfannkuchen — günstige Komplettmahlzeit für Kinder.' },
      { titel: 'Salat länger frisch', text: 'In Tupperdose mit Küchenpapier (saugt Feuchtigkeit) — bleibt 1 Woche frisch statt 3 Tagen.' },
      { titel: 'Kräuter selbst ziehen', text: 'Basilikum, Petersilie, Schnittlauch auf Fensterbank — 2€ pro Pflanze, geben monatelang Kräuter (statt 1,50€ pro Bund).' },
      { titel: 'Lebensmittel richtig lagern', text: 'Brot in Papiertüte (nicht Plastik), Tomaten außerhalb Kühlschrank, Bananen separat. Halbe Haltbarkeit ist Fehlhandhabung.' },
      { titel: 'Mahlzeiten-Apps für Kids', text: 'Yazio, MyFitnessPal: spielerisch sehen wie viel sie essen. Bei Mäkler-Kindern hilft visuelle Darstellung.' }
    ]
  },
  {
    id: 'bildung', kategorie: 'Bildung & Karriere', emoji: '📚',
    tipps: [
      { titel: 'Lese-Ritual täglich 15 Min.', text: 'Täglich 15 Min. vorlesen fördert Sprachentwicklung, Fantasie und Bindung. Bibliothek: Bücher kostenlos leihen.' },
      { titel: 'Förderangebote der Schule nutzen', text: 'Schulen bieten Förderunterricht, AGs und kostenlose Nachhilfeangebote an. Lehrer direkt ansprechen.' },
      { titel: 'Bücherei-Ausweis beantragen', text: 'Für Kinder unter 18 in vielen Städten kostenlos — Bücher, DVDs, Hörspiele, digitale Medien (Onleihe-App).' },
      { titel: 'Weiterbildung für Eltern', text: 'VHS (Volkshochschule) bietet günstige Kurse — Sprachen, IT, Rechnungswesen. Mit Bildungsgutschein oft kostenlos.' },
      { titel: 'Bildungsgutschein beantragen', text: 'Jobcenter kann Bildungsgutschein ausstellen — kostenlose Weiterbildung möglich. Beratungstermin vereinbaren.' },
      { titel: 'Online-Kurse kostenlos', text: 'Coursera, Khan Academy, YouTube bieten tausende Kurse kostenlos auf Deutsch und Englisch an — auch für Kinder.' },
      { titel: 'BuT Schulausstattung', text: 'Bildungs- und Teilhabepaket: 195 € einmalig für Schulranzen, Stifte, Bücher bei Bürgergeld-Bezug — beim Jobcenter beantragen.' },
      { titel: 'Hausaufgaben-Lernumgebung', text: 'Fester Platz zum Lernen (ruhig, gute Beleuchtung, ohne Handy) hilft Kindern sich zu konzentrieren. Wichtiger als teures Material.' },
      { titel: 'Verein und Ehrenamt', text: 'Sportverein, Pfadfinder oder Musikschule fördert soziale Kompetenz. BuT übernimmt Beiträge bis 15 €/Monat.' },
      { titel: 'Stipendien für Alleinerziehende', text: 'Bildungsfonds und Stipendien (z.B. Avicenna-Studienwerk, Rosa-Luxemburg-Stiftung) sind auch für Alleinerziehende zugänglich.' },
      { titel: 'Anton-App ab Klasse 1', text: 'Komplett kostenlos, Mathe + Deutsch + Sachunterricht für Klasse 1-10. Spielerisch, ohne Werbung. Top-Bewertung in Tests.' },
      { titel: 'Bildschirm-Konsum vs. lernen', text: 'YouTube für Hausaufgaben OK — aber: "Lehrer Schmidt", "Daniel Jung Mathe", "Mr. Wissen2Go". Nicht zufälliges Scrollen.' },
      { titel: 'Sprachreise alternative Wege', text: 'Erasmus+ ab 13 Jahre, Au-Pair ab 18, Wwoof (kostenloses Reisen für Mitarbeit) — Sprache lernen ohne 3.000€ Kursgebühr.' },
      { titel: 'BAföG auch für Schüler', text: 'Schüler-BAföG für Berufsschule, Fachoberschule. Bis 400€/Monat zuschussfrei. Online: bafoeg-online.de prüfen.' },
      { titel: 'Aufstiegs-BAföG für Eltern', text: 'Erwachsene mit Berufsabschluss: bis 893€/Monat + Studiengebühren für Meister/Techniker. 100% Zuschuss, 50% Darlehen.' },
      { titel: 'Pomodoro-Technik üben', text: '25 Min lernen, 5 Min Pause — Kindern ab 8 Jahren beibringen. Timer kostenlos online. Verdoppelt Konzentration.' },
      { titel: 'Karteikarten-App Anki', text: 'Kostenlos, wiederholt Vokabeln zu optimalem Zeitpunkt. Wer 10 Min/Tag macht, lernt 1.500 Vokabeln/Jahr.' },
      { titel: 'Lern-Buddy organisieren', text: 'Mit Klassenkamerad zusammen lernen — gegenseitig erklären verdoppelt Lerneffekt. Auch online über Discord/Zoom möglich.' },
      { titel: 'Hausaufgaben digitalisieren', text: 'Notizen abfotografieren, in Cloud speichern. Bei Verlust gerettet. iCloud, Google Drive — kostenfrei bis 5GB.' },
      { titel: 'Stipendien-Datenbank', text: 'stipendiumplus.de zeigt 13 große Stipendien — auch leistungs-unabhängige für Engagement oder spezifische Bevölkerungsgruppen.' },
      { titel: 'Berufsorientierungs-Tests', text: 'Arbeitsagentur "BERUFE.tv" und "Check-U": kostenlose Tests was passt. Spart später teure Umwege.' },
      { titel: 'Praktikum ab Klasse 8 nutzen', text: 'Schul-Praktikum 1-2 Wochen — der einfachste Weg, Beruf von innen zu sehen. Kontakt für späteren Ausbildungsplatz.' },
      { titel: 'Hochschulkompass-Test', text: 'hochschulkompass.de zeigt alle Studiengänge in Deutschland. Filter nach NC, Sprache, Ort. Für Eltern UND Kinder hilfreich.' },
      { titel: 'Lernplan visuell aufhängen', text: 'Wochen-Lernplan an Wand: Was wann lernen. Verhindert Last-Minute-Stress vor Klassenarbeiten.' },
      { titel: 'Konzentrations-Übungen Kids', text: 'Yoga für Kinder (YouTube: "Yoga Kids"), Achtsamkeit, 5-Minuten-Tagebuch. 10 Min/Tag, messbarer Effekt nach 8 Wochen.' },
      { titel: 'Schlaf vor wichtigen Tests', text: '8h Schlaf vor Klassenarbeit > 1h zusätzliches Lernen. Studien sehr klar dazu — kommunizieren bei Kindern wichtig.' },
      { titel: 'Schulpsychologe nutzen', text: 'Jede Schule hat einen Schulpsychologen — kostenlos, anonym. Bei Mobbing, Prüfungsangst, Schulverweigerung sofort hingehen.' },
      { titel: 'Lese-Apps für Anfänger', text: '"Tibi lernt lesen", "Lese-Coach" — gamifizierte Apps für Erstklässler. Auf Tablet erlaubt → Bildschirmzeit sinnvoll genutzt.' },
      { titel: 'Familien-Bildungsausweis', text: 'Bibliothek, Naturkundemuseum, Wissenschaftsmuseum — viele kostenlos für Familien. Lebensumstände: Volkshochschule fragt nach Tarifen.' },
      { titel: 'Tag der offenen Tür planen', text: 'Bei Schulwechsel: 6-12 Monate vorher Tag der offenen Tür mehrerer Schulen besuchen. Vergleich zahlt sich aus.' }
    ]
  },
  {
    id: 'freizeit', kategorie: 'Freizeit & Erholung', emoji: '🎠',
    tipps: [
      { titel: 'Bibliothek als Freizeitzentrum', text: 'Neben Büchern: Kinderprogramme, Bilderbuchkino, Kreativ-AGs, Computer — alles kostenlos mit Bibliotheksausweis.' },
      { titel: 'Stadtparks und Grünflächen', text: 'Picknick, Frisbee, Spaziergang — kostenlos und gesund. Google Maps: "Parks in der Nähe" für versteckte Oasen.' },
      { titel: 'Tauschkreise beitreten', text: 'Spielzeug, Bücher, Kleidung tauschen statt kaufen — in Kitas, Schulen und auf Kleinanzeigen Tauschgruppen finden.' },
      { titel: 'Museumstage nutzen', text: 'Viele Museen sind am 1. Sonntag im Monat kostenlos oder sehr günstig. Kalender auf der Museumswebsite prüfen.' },
      { titel: 'Freibad statt Hallenbad', text: 'Im Sommer: städtische Freibäder kosten 2–4 € für Kinder. Familien-Saisonkarte oft ab 5 Besuchen günstiger.' },
      { titel: 'Fahrrad als Freizeitmittel', text: 'Komoot-App: kostenlose Familienrouten in der Nähe finden. Fahrradanhänger günstig auf Kleinanzeigen leihen oder kaufen.' },
      { titel: 'Stadtfeste und Events', text: 'Stadtfeste, Wochenmärkte und Open-Air-Konzerte sind meist kostenlos. Stadtkalender und lokale Facebook-Gruppen abonnieren.' },
      { titel: 'Spielplatz-Rallye', text: 'Alle Spielplätze im Stadtgebiet erkunden — macht aus einem normalen Nachmittag ein Abenteuer und kostet nichts.' },
      { titel: 'Kino-Kindertag nutzen', text: 'Viele Kinos haben Kinder-Vorstellungen ab 4,50 € (montags/dienstags). UCI, CineStar: Family-Kombi-Tickets recherchieren.' },
      { titel: 'Natur als kostenlose Bühne', text: 'Waldspaziergang mit Naturschatzsuche, Stöcke sammeln, Steine bemalen — Kinder brauchen keine teuren Unterhaltungsangebote.' },
      { titel: 'Sport mit App', text: 'Nike Training Club, YouTube-Fitness: 30 Min. Sport zu Hause wenn Kinder schlafen — kostenlos und stressabbauend.' },
      { titel: 'Kindertheater und Puppenspiel', text: 'Stadttheater bieten Kindervorstellungen ab 4 € an. Viele Parks haben kostenlose Open-Air-Veranstaltungen im Sommer.' },
      { titel: 'Schatzsuche im Park', text: 'Vorab kleine Päckchen verstecken, Karte zeichnen. 30 Min Vorbereitung = 2h fasziniertes Spielen.' },
      { titel: 'Geocaching-App', text: 'Kostenlose App, weltweite Schatzsuche. Schon 1.000.000+ Caches in Deutschland. Erkundung der Umgebung wird zum Abenteuer.' },
      { titel: 'Wandertag selbst gemacht', text: 'Komoot, Outdooractive: kostenlose Wander-Apps. Picknick mitnehmen, mit Kindern Pflanzen bestimmen → Bildung im Vorbeigehen.' },
      { titel: 'Family-Card der Stadt', text: 'Viele Großstädte bieten Family-Cards: 50% Rabatt in Bädern, Museen, Zoo. Stadt-Webseite: "Familienpass [Stadt]".' },
      { titel: 'Zoo-Jahreskarte rechnen', text: 'Bei 4+ Besuchen/Jahr lohnt Jahreskarte. Pro Person 40-80€ statt 3× Einzeleintritt. Wetterunabhängiges Schlechtwetter-Programm.' },
      { titel: 'Stadtbibliothek-Kinderprogramm', text: 'Bilderbuchkino, Lese-Pate, Bastel-Workshops — viele Bibliotheken haben wöchentliche Familien-Events kostenlos.' },
      { titel: 'Familien-Schwimmkurs', text: 'Krankenkasse zahlt oft 50-100€ pro Person/Jahr für Sport. Schwimmkurs Kinder + Eltern: Eltern hier zusätzlich pas auf.' },
      { titel: 'Brettspiele aus 70er-Jahre', text: 'Klassiker: Mensch ärgere dich, Halma, Memory — gebraucht 2-5€. Kein Bildschirm, fördert Geduld und Logik.' },
      { titel: 'Stadtteil-Erkundung Bus', text: 'Mit ÖPNV-Tagesticket fremde Stadtteile erkunden. Spielplätze, Parks — neue Welt mit 0 Stress. 6-10€ statt 50€ Ausflug.' },
      { titel: 'Wasser-Karaoke unter Dusche', text: 'Schlechtwetter-Tag: alle in Badehose, Wasser-Bombs aus Luftballons, Karaoke im Bad. Kein Geld, viel Freude.' },
      { titel: 'Hörspiele für Autofahrten', text: 'Ohrka.de — Kinderbuchverlag mit kostenlosen Hörspielen (3+ Stunden, ohne Werbung). Bessere Fahrt, mehr Bildung.' },
      { titel: 'Forest-App für Konzentration', text: 'Eltern: 25 Min nicht aufs Handy = digitaler Baum wächst. Spielerisch Selbstkontrolle trainieren.' },
      { titel: 'Bowling/Minigolf in Nebensaison', text: 'Sommer: Bowling halb leer. Winter: Minigolf-Indoor günstig. Antizyklische Aktivitäten sparen 30-50%.' },
      { titel: 'Familien-Sauna-Tag', text: 'Therme/Sauna 1×/Monat: Eltern entspannen, Kinder im Familien-Bereich. Sehr stressabbauend für Single-Parent.' },
      { titel: 'Eltern-Selbsthilfegruppe', text: 'Über vamv.de oder Caritas: regionale Treffen alleinerziehender Eltern. Babysitting im Tausch, Erfahrungsaustausch.' },
      { titel: 'Familien-Yoga zuhause', text: 'YouTube "Cosmic Kids Yoga" auf Deutsch: 15 Min Geschichten mit Yoga-Bewegungen. Beruhigt Kinder vor dem Schlaf.' },
      { titel: 'Kreativ-AGs in Schule fragen', text: 'Schul-AGs (Theater, Musik, Sport) meist kostenlos. Ganztag mit AG = günstige Nachmittagsbetreuung + Hobby.' },
      { titel: 'Großeltern-Spielenachmittag', text: '1× pro Monat Großeltern für Spiele-Nachmittag einladen. Generationen-Brücke + Eltern bekommen 3h Pause.' },
      { titel: 'Stadt-Rallye selbst basteln', text: 'Vorab 5-7 Aufgaben in der Stadt verstecken (Foto, Suchaufgabe). Macht aus Spaziergang Abenteuer.' },
      { titel: 'Tausch-Wochenende', text: 'Mit befreundeter Familie: ein Wochenende tauschen wir Kinder. Beide Familien haben Pause + Kinder neue Erlebnisse.' }
    ]
  },
  {
    id: 'recht', kategorie: 'Rechtliches', emoji: '⚖️',
    tipps: [
      { titel: 'Unterhaltsvorschuss sichern', text: 'Wenn der andere Elternteil nicht zahlt: Unterhaltsvorschuss beim Jugendamt beantragen — bis 395 €/Monat (12–17 J.).' },
      { titel: 'Sorgerecht klären', text: 'Gemeinsames Sorgerecht auch ohne Heirat möglich — Jugendamt bietet kostenlose Beratung und Beurkundung an.' },
      { titel: 'Beratungshilfe nutzen', text: 'Bei geringem Einkommen: kostenlose Rechtsberatung beim Anwalt durch Beratungshilfe-Schein vom Amtsgericht.' },
      { titel: 'Widersprüche einlegen', text: 'Behördenbescheide (Jobcenter, Kindergeld) immer prüfen — bei Fehlern sofort Widerspruch einlegen. Frist: 1 Monat nach Zugang.' },
      { titel: 'Testament aufsetzen', text: 'Als Alleinerziehende ist ein Testament sehr wichtig — wer versorgt das Kind wenn etwas passiert? Notar oder kostengünstig beim Amtsgericht.' },
      { titel: 'Vorsorgevollmacht ausstellen', text: 'Wer entscheidet für das Kind wenn Sie als Elternteil handlungsunfähig sind? Vorsorgedokumente beim Jugendamt klären.' },
      { titel: 'Mietrecht kennen', text: 'Kündigung durch Vermieter: strenge Voraussetzungen. Mieterverein-Mitgliedschaft (ca. 10 €/Monat) lohnt sich für Schutz und Beratung.' },
      { titel: 'Unterhalt gerichtlich festlegen', text: 'Unterhaltstitel beim Jugendamt (kostenlos) oder Gericht festlegen lassen — dann kann bei Nichtzahlung vollstreckt werden.' },
      { titel: 'Prozesskostenhilfe beantragen', text: 'Bei Gerichtsverfahren: Prozesskostenhilfe kann alle Kosten übernehmen. Beim Gericht oder Sozialberatung beantragen.' },
      { titel: 'VAMV-Rechtsberatung', text: 'Verband alleinerziehender Mütter und Väter (vamv.de) bietet rechtliche Beratung und Interessenvertretung an.' },
      { titel: 'Düsseldorfer Tabelle kennen', text: 'Tabelle zeigt Unterhalt nach Alter + Einkommen. Aktuelle Werte: olg-duesseldorf.nrw.de. Bei Streit: belastbarer Verhandlungsgrund.' },
      { titel: 'Umgangsrecht durchsetzen', text: 'Bei verweigertem Umgang: erst Jugendamt einschalten (Mediator), dann Familiengericht. Recht beider Eltern: Kind hat Recht auf beide Eltern.' },
      { titel: 'Versorgungsausgleich bei Scheidung', text: 'Rentenpunkte werden hälftig geteilt — auch Mütter ohne Berufstätigkeit haben Anspruch. Anwalt prüfen lassen.' },
      { titel: 'Kindesentführung Hotline', text: 'Bei Sorge ein Elternteil entführt Kind: ZAB (Bonn) 0228 99 11020. Internationales Sorgerecht — schnelle Hilfe nötig.' },
      { titel: 'Patientenverfügung erstellen', text: 'Wer entscheidet, wenn Sie krank sind und nicht ansprechbar? Vorlage kostenlos beim Bundesjustizministerium.' },
      { titel: 'Vaterschaft anerkennen', text: 'Unverheiratet: Vaterschafts-Anerkennung beim Jugendamt (kostenlos, einfach). Sichert Unterhalt + Erbrecht des Kindes.' },
      { titel: 'Adoption für Stiefkind', text: 'Wenn neuer Partner Kind adoptieren will: 6 Monate Zusammenleben + Zustimmung leiblicher Elternteil. Vereinfacht Sorgerecht.' },
      { titel: 'Vormundschaft regeln', text: 'Im Testament Vormund für Kinder bestimmen — sonst entscheidet das Jugendamt. Wichtig bei plötzlichem Todesfall.' },
      { titel: 'Schulische Sorgerecht', text: 'Bei gemeinsamem Sorgerecht: beide Eltern müssen Schulwahl, Klassenfahrten zustimmen. Bei Konflikt: Familiengericht.' },
      { titel: 'Hartz-IV-Bescheid prüfen', text: 'Bescheide oft fehlerhaft. 1 Monat Widerspruchsfrist. Sozialberatung (Tafel, Caritas) prüft kostenlos.' },
      { titel: 'Sozialgerichtsverfahren kostenlos', text: 'Klagen vor Sozialgericht (Jobcenter, Krankenkasse, Pflege): keine Anwaltspflicht, keine Gerichtskosten. Selbst klagen möglich.' },
      { titel: 'Wohnungs-Vermieter-Tricks', text: 'Schimmel meist Mieter-Sache laut Vermieter: aber meist Bausubstanz schuld. Mieterverein-Gutachten als Beweis.' },
      { titel: 'Kontopfändung verhindern', text: 'P-Konto einrichten (kostenlos) — schützt 1.410€/Monat vor Pfändung. Pro Kind +475€ Schutzbetrag. Wichtig bei Schulden.' },
      { titel: 'Restschuldbefreiung 3 Jahre', text: 'Privatinsolvenz dauert nur noch 3 Jahre (seit 2020). Schulden weg nach Verfahren. Caritas und AWO begleiten kostenlos.' },
      { titel: 'Datenschutz-Anfrage stellen', text: 'Auskunft was Firma über Sie speichert (Schufa, Banken, Versicherer): kostenlos einmal pro Jahr. Vorlage: musterbrief-datenschutz.de.' },
      { titel: 'Mahnbescheid nicht ignorieren', text: 'Bei falschem Mahnbescheid: 2 Wochen Widerspruch! Sonst rechtskräftig — auch wenn Forderung Unsinn ist.' },
      { titel: 'Bürgschaft vermeiden', text: 'Niemals für Verwandte/Freunde Bürgschaft unterschreiben — Haftung bis zur eigenen Existenzgrundlage. Sehr riskant.' },
      { titel: 'Erbe ausschlagen wenn nötig', text: 'Bei verschuldetem Erbe: 6 Wochen Frist Erbe auszuschlagen (beim Nachlassgericht). Sonst Übernahme aller Schulden.' },
      { titel: 'Vorsorgevollmacht Notfall', text: 'Wer entscheidet medizinisch wenn Sie nicht können? Vorlage beim Bundesjustizamt — eine Unterschrift kann Leben verändern.' },
      { titel: 'Anti-Diskriminierung-Stelle', text: 'Bei Diskriminierung wegen Familie, Alleinerziehung: ADS Bund (antidiskriminierungsstelle.de) — kostenfreie Beratung und Klage-Hilfe.' }
    ]
  }
];

// ===== NEUE FEATURES =====

const FAMILIEN_AUSFLUG_TIPPS = [
  { emoji:'🎭', titel:'Museumstag nutzen', text:'Viele Museen sind am 1. Sonntag im Monat kostenlos oder haben einen freien Tag. Website prüfen!', farbe:'#9333EA', url:'https://www.museum.de' },
  { emoji:'🌲', titel:'Stadtwald & Naturlehrpfade', text:'Kostenlos, gesund und Kinder lieben es! Viele Städte haben ausgeschilderte Naturlehrpfade für Familien.', farbe:'#16A34A', url:null },
  { emoji:'🚂', titel:'Bahn: Kinder fahren kostenlos', text:'Kinder bis 14 Jahre fahren kostenlos mit einem Elternteil in Zügen der DB. Sparpreise frühzeitig buchen spart bis 70%.', farbe:'#DC2626', url:'https://www.bahn.de/info/kinder' },
  { emoji:'🎡', titel:'Freizeitparks: Günstig rein', text:'Family-Cards, Kombinations-Tickets und Online-Rabatte nutzen. Oft 30–40% günstiger als an der Kasse.', farbe:'#D97706', url:'https://www.freizeitpark-welt.de' },
  { emoji:'🏕️', titel:'Camping: Günstig Urlaub machen', text:'Campingplätze ab 15 €/Nacht für die ganze Familie. Kinder unter 6 oft kostenlos. Buchung auf camping.info.', farbe:'#2563EB', url:'https://www.camping.info' },
  { emoji:'🎨', titel:'Kostenlose Kreativnachmittage', text:'Malen, Basteln, Backen — kostenlose Ideen auf Pinterest und YouTube. Manchmal besser als teurer Ausflug!', farbe:'#EC4899', url:'https://www.pinterest.de/search/pins/?q=basteln+kinder+kostenlos' },
  { emoji:'🧺', titel:'Picknick im Park', text:'Selbst gemachte Sandwiches, Obst und Saft — Picknick im Park kostet unter 5 € und Kinder lieben es! Frisbee und Ball nicht vergessen.', farbe:'#16A34A', url:null },
  { emoji:'📚', titel:'Bibliothek: Kostenlos & vielfältig', text:'Stadtbibliotheken bieten kostenlose Kinderführungen, Bilderbuchkinos und Kreativ-AGs an. Alles kostenlos mit Bibliotheksausweis!', farbe:'#2563EB', url:'https://www.onleihe.de' },
  { emoji:'🎳', titel:'Bowling mit Kinderrampe', text:'Viele Bowling-Center bieten spezielle Kinder-Pakete mit Rampen an. Mittwochs und unter der Woche oft 30% günstiger!', farbe:'#7C3AED', url:null },
  { emoji:'⛳', titel:'Minigolf — Spaß für alle', text:'Minigolf kostet meist 3–5 € pro Person und macht Kindern und Erwachsenen gleichermaßen Spaß. Viele Anlagen im Stadtpark integriert.', farbe:'#EA580C', url:null },
  { emoji:'🎬', titel:'Kino: Günstiger Kindertag', text:'Viele Kinos haben montags oder dienstags günstigere Vorstellungen. CineStar & UCI haben Kinder-Preise ab 4,50 €. Familien-Kombi nutzen!', farbe:'#BE185D', url:'https://www.kinofinder.de' },
  { emoji:'🧗', titel:'Kletterpark & Hochseilgarten', text:'Outdoor-Kletterparks ab 12 € für Kinder. Indoor-Kletterhallen bieten oft günstige Familien-Tickets. Abenteuer und Sport in einem!', farbe:'#B45309', url:null },
  { emoji:'🏊', titel:'Freibad: Günstig & gesund', text:'Städtische Freibäder kosten meist 2–4 € für Kinder, 4–7 € für Erwachsene. Jahres-Familienkarte lohnt sich ab 5 Besuchen!', farbe:'#0EA5E9', url:null },
  { emoji:'🌾', titel:'Bauernhof-Besuch', text:'Viele Bauernhöfe bieten kostenlose oder günstige Besichtigungen an. Kinder können Tiere streicheln und echte Natur erleben!', farbe:'#A16207', url:'https://www.bauernhofurlaub.de' },
  { emoji:'🎪', titel:'Stadtfeste & Wochenmärkte', text:'Kostenloser Eintritt bei den meisten Stadtfesten! Wochenmärkte bieten Kinderprogramm und frische Produkte. Lokal-Kalender prüfen.', farbe:'#D97706', url:null },
  { emoji:'🚴', titel:'Fahrradtour mit Kinderanhänger', text:'Radwege, Seen, Wälder — Familienradtouren kostenlos und gesund. Kinder-Fahrradanhänger günstig bei Kleinanzeigen leihen oder kaufen.', farbe:'#059669', url:'https://www.komoot.de' },
  { emoji:'🎭', titel:'Kindertheater & Puppenspiel', text:'Stadttheater bieten günstige Kindervorstellungen ab 4 € an. Viele Stadtparks haben kostenlose Open-Air-Aufführungen im Sommer!', farbe:'#9333EA', url:null }
];

const REZEPTE = [
  {
    id: 'nudeln-tomate',
    name: 'Nudeln mit Tomatensoße',
    emoji: '🍝',
    bild: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=600&q=75',
    kategorie: 'schnell',
    kategorieLabel: 'Schnell & Einfach',
    dauer: '20 Min.',
    kosten: '≈ 1,50 €',
    portionen: 4,
    zutaten: ['500 g Nudeln (Spaghetti oder Penne)', '2 Dosen gehackte Tomaten (á 400 g)', '1 Zwiebel', '2 Knoblauchzehen', '2 EL Olivenöl', 'Salz, Pfeffer, Oregano', 'Optional: Parmesan'],
    zubereitung: 'Zwiebel und Knoblauch klein hacken, in Öl 3 Min. dünsten. Tomaten dazu, würzen, 15 Min. köcheln. Nudeln nach Packung kochen, abgießen, mit Soße servieren.',
    tipp: 'Soße verdoppeln und einfrieren — spart Zeit für 3 weitere Mahlzeiten!'
  },
  {
    id: 'pfannkuchen',
    name: 'Pfannkuchen (süß & herzhaft)',
    emoji: '🥞',
    bild: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=75',
    kategorie: 'schnell',
    kategorieLabel: 'Schnell & Einfach',
    dauer: '25 Min.',
    kosten: '≈ 0,80 €',
    portionen: 4,
    zutaten: ['250 g Mehl', '2 Eier', '500 ml Milch', '1 Prise Salz', '1 EL Zucker (süße Variante)', 'Butter zum Braten'],
    zubereitung: 'Alle Zutaten zu einem glatten Teig verrühren, 10 Min. quellen lassen. In der Pfanne mit wenig Butter von beiden Seiten goldbraun braten. Mit Apfelmus, Marmelade oder Käse servieren.',
    tipp: 'Herzhaft: ohne Zucker, mit Käse und Schinken füllen. Reste kalt als Snack!'
  },
  {
    id: 'omelett',
    name: 'Gemüse-Omelett',
    emoji: '🍳',
    bild: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&q=75',
    kategorie: 'schnell',
    kategorieLabel: 'Schnell & Einfach',
    dauer: '15 Min.',
    kosten: '≈ 1,20 €',
    portionen: 2,
    zutaten: ['4 Eier', '1 Paprika', '1/2 Zwiebel', '50 g geriebener Käse', 'Salz, Pfeffer', '1 EL Öl'],
    zubereitung: 'Gemüse klein schneiden, in der Pfanne 5 Min. andünsten. Eier verquirlen, würzen, über das Gemüse gießen. Bei mittlerer Hitze stocken lassen, mit Käse bestreuen und falten.',
    tipp: 'Reste vom Vortag ins Omelett — fast alles passt: Kartoffeln, Champignons, Spinat.'
  },
  {
    id: 'linsensuppe',
    name: 'Linsensuppe',
    emoji: '🥣',
    bild: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=75',
    kategorie: 'guenstig',
    kategorieLabel: 'Besonders Günstig',
    dauer: '30 Min.',
    kosten: '≈ 0,60 €',
    portionen: 6,
    zutaten: ['400 g rote Linsen', '2 Karotten', '2 Kartoffeln', '1 Zwiebel', '1 l Gemüsebrühe', '1 TL Kreuzkümmel', 'Salz, Pfeffer, Zitronensaft'],
    zubereitung: 'Zwiebel anschwitzen, Gemüse und Linsen dazu, mit Brühe bedecken. 20 Min. köcheln bis alles weich ist. Mit Stabmixer pürieren oder stückig lassen. Würzen und servieren.',
    tipp: 'Ergibt 6 Portionen — ideal zum Vorkochen! Hält 4 Tage im Kühlschrank.'
  },
  {
    id: 'gebratener-reis',
    name: 'Gebratener Reis mit Gemüse',
    emoji: '🍚',
    bild: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=75',
    kategorie: 'resteessen',
    kategorieLabel: 'Resteessen',
    dauer: '20 Min.',
    kosten: '≈ 0,90 €',
    portionen: 4,
    zutaten: ['400 g gekochter Reis (vom Vortag)', '2 Eier', '1 Tasse TK-Erbsen', '2 Frühlingszwiebeln', '2 EL Sojasoße', '1 EL Öl', 'Optional: Reste-Gemüse'],
    zubereitung: 'Öl erhitzen, Gemüse und Erbsen 3 Min. braten. Reis dazu, gut anbraten. Eier drüber schlagen und unterrühren. Mit Sojasoße abschmecken.',
    tipp: 'Perfekt für Reis-Reste! Funktioniert auch mit Nudel-Resten als gebratene Nudeln.'
  },
  {
    id: 'kartoffelsuppe',
    name: 'Kartoffelsuppe',
    emoji: '🥔',
    bild: 'https://images.unsplash.com/photo-1547308283-b941de5747bf?w=600&q=75',
    kategorie: 'guenstig',
    kategorieLabel: 'Besonders Günstig',
    dauer: '35 Min.',
    kosten: '≈ 0,70 €',
    portionen: 6,
    zutaten: ['1 kg Kartoffeln', '2 Karotten', '2 Stangen Sellerie', '1 Zwiebel', '1 l Gemüsebrühe', 'Salz, Pfeffer, Majoran', 'Optional: Würstchen'],
    zubereitung: 'Alle Zutaten schälen und würfeln. Zwiebel anschwitzen, restliches Gemüse und Brühe dazu. 20 Min. köcheln. Die Hälfte pürieren für cremige Konsistenz.',
    tipp: 'Ergibt 6 Portionen. Mit altem Brot und Schnittlauch servieren — sehr sättigend!'
  },
  {
    id: 'tortilla-pizza',
    name: 'Tortilla-Pizza',
    emoji: '🍕',
    bild: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=75',
    kategorie: 'kinder',
    kategorieLabel: 'Kinder-Liebling',
    dauer: '15 Min.',
    kosten: '≈ 1,00 €',
    portionen: 2,
    zutaten: ['4 Weizen-Tortillas', '4 EL Tomatenmark', '100 g geriebener Käse', 'Belag nach Wahl: Paprika, Mais, Schinken', 'Oregano, Salz'],
    zubereitung: 'Tortillas auf Backblech legen. Tomatenmark dünn streichen. Mit Belag und Käse belegen. Bei 200°C (Umluft) 8–10 Min. bis der Käse läuft.',
    tipp: 'Kinder können ihre Pizza selbst belegen — macht Spaß und sie essen besser!'
  },
  {
    id: 'gemuese-curry',
    name: 'Gemüse-Curry mit Reis',
    emoji: '🍛',
    bild: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=75',
    kategorie: 'guenstig',
    kategorieLabel: 'Besonders Günstig',
    dauer: '35 Min.',
    kosten: '≈ 1,30 €',
    portionen: 4,
    zutaten: ['400 ml Kokosmilch (Dose)', '1 Dose Kichererbsen', '1 Paprika, 1 Zucchini', '2 EL Curry-Pulver', '1 Zwiebel, 2 Knoblauchzehen', '300 g Reis', 'Salz, Pfeffer'],
    zubereitung: 'Zwiebel und Knoblauch anschwitzen, Curry-Pulver 1 Min. mitbraten. Gemüse und Kichererbsen dazu. Kokosmilch eingießen, 20 Min. köcheln. Mit gekochtem Reis servieren.',
    tipp: 'Sehr gut einfrierbar! Doppelte Menge kochen und portionsweise einfrieren.'
  },
  {
    id: 'kaiserschmarrn',
    name: 'Kaiserschmarrn',
    emoji: '🥞',
    bild: 'https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?w=600&q=75',
    kategorie: 'kinder',
    kategorieLabel: 'Kinder-Liebling',
    dauer: '25 Min.',
    kosten: '≈ 1,20 €',
    portionen: 4,
    zutaten: ['250 g Mehl', '4 Eier', '500 ml Milch', '50 g Zucker', '1 Prise Salz', '50 g Rosinen', '50 g Butter', 'Puderzucker'],
    zubereitung: 'Eigelb mit Zucker, Milch, Mehl und Salz verrühren. Eiweiß steif schlagen, unterheben. In Pfanne mit Butter ausbacken. Mit Gabel zerreißen, mit Puderzucker bestreuen. Mit Apfelmus servieren.',
    tipp: 'Klassiker aus Österreich/Bayern — Kinder lieben es! Mit Kompott noch besser.'
  },
  {
    id: 'milchreis',
    name: 'Milchreis',
    emoji: '🍚',
    bild: 'https://images.unsplash.com/photo-1517093602195-b40af9688b78?w=600&q=75',
    kategorie: 'kinder',
    kategorieLabel: 'Kinder-Liebling',
    dauer: '40 Min.',
    kosten: '≈ 0,80 €',
    portionen: 4,
    zutaten: ['250 g Milchreis', '1 l Milch', '60 g Zucker', '1 Prise Salz', '1 Vanilleschote oder Zimt', 'Optional: Apfelmus, Zimt-Zucker'],
    zubereitung: 'Milch mit Zucker und Salz aufkochen. Reis einrühren, bei niedriger Hitze 30 Min. unter gelegentlichem Rühren köcheln. Mit Vanille oder Zimt würzen. Heiß oder kalt servieren.',
    tipp: 'Im Reiskocher noch einfacher! Reste am nächsten Tag mit Beeren oder Schoko-Soße.'
  },
  {
    id: 'kaesespaetzle',
    name: 'Käsespätzle',
    emoji: '🧀',
    bild: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=75',
    kategorie: 'kinder',
    kategorieLabel: 'Kinder-Liebling',
    dauer: '30 Min.',
    kosten: '≈ 1,80 €',
    portionen: 4,
    zutaten: ['500 g Spätzle (oder selbst gemacht)', '200 g geriebener Bergkäse', '2 große Zwiebeln', '50 g Butter', 'Salz, Pfeffer, Muskatnuss', 'Schnittlauch'],
    zubereitung: 'Zwiebeln in Butter goldbraun rösten (15 Min.). Spätzle nach Packung kochen. Spätzle und Käse abwechselnd in Auflaufform schichten, mit Zwiebeln und Schnittlauch garnieren.',
    tipp: 'Schwäbischer Klassiker — auch lecker als Auflauf 5 Min. überbacken bei 200 °C.'
  },
  {
    id: 'flammkuchen',
    name: 'Flammkuchen',
    emoji: '🥧',
    bild: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=600&q=75',
    kategorie: 'schnell',
    kategorieLabel: 'Schnell & Einfach',
    dauer: '25 Min.',
    kosten: '≈ 1,40 €',
    portionen: 4,
    zutaten: ['1 Packung Flammkuchenteig', '200 g Crème fraîche', '200 g Speckwürfel', '2 große Zwiebeln', 'Salz, Pfeffer, Muskatnuss', 'Optional: Schnittlauch'],
    zubereitung: 'Teig auf Blech ausrollen. Crème fraîche bestreichen, mit Salz, Pfeffer und Muskat würzen. Speck und Zwiebelringe drauf. Bei 220°C (Umluft) 12 Min. backen.',
    tipp: 'Vegetarisch: Speck weglassen, dafür Kürbis oder Birne mit Walnüssen drauf.'
  },
  {
    id: 'ofenkartoffeln',
    name: 'Ofenkartoffeln mit Quark',
    emoji: '🥔',
    bild: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=75',
    kategorie: 'guenstig',
    kategorieLabel: 'Besonders Günstig',
    dauer: '50 Min.',
    kosten: '≈ 1,00 €',
    portionen: 4,
    zutaten: ['8 große Kartoffeln', '500 g Magerquark', '1 Bund Schnittlauch', '1 Zwiebel', 'Salz, Pfeffer', 'Olivenöl', 'Optional: Kümmel'],
    zubereitung: 'Kartoffeln waschen, mit Gabel einstechen, mit Öl und Salz einreiben. Im Ofen bei 200°C 45 Min. backen. Quark mit Schnittlauch, gehackter Zwiebel, Salz und Pfeffer mischen. Servieren.',
    tipp: 'Ein Berliner Klassiker — sättigend und fast geschenkt. Auch mit Sour Cream oder Joghurt.'
  },
  {
    id: 'maultaschen',
    name: 'Maultaschen in Brühe',
    emoji: '🥟',
    bild: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=75',
    kategorie: 'schnell',
    kategorieLabel: 'Schnell & Einfach',
    dauer: '15 Min.',
    kosten: '≈ 2,00 €',
    portionen: 4,
    zutaten: ['1 Packung Maultaschen (vorgefertigt)', '1 l Gemüsebrühe', '2 Karotten', '1 Lauchstange', '1 Bund Petersilie', 'Salz, Pfeffer'],
    zubereitung: 'Brühe aufkochen, Karotten und Lauch in Scheiben schneiden, 5 Min. mitkochen. Maultaschen dazu, weitere 5 Min. köcheln. Mit Petersilie bestreut servieren.',
    tipp: 'Schwäbischer Klassiker. Reste am nächsten Tag in der Pfanne mit Ei goldbraun anbraten.'
  },
  {
    id: 'apfelpfannkuchen',
    name: 'Apfelpfannkuchen',
    emoji: '🍏',
    bild: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&q=75',
    kategorie: 'kinder',
    kategorieLabel: 'Kinder-Liebling',
    dauer: '20 Min.',
    kosten: '≈ 1,00 €',
    portionen: 4,
    zutaten: ['250 g Mehl', '2 Eier', '500 ml Milch', '50 g Zucker', '1 Prise Salz', '4 Äpfel', '50 g Butter', 'Zimt-Zucker'],
    zubereitung: 'Mehl, Eier, Milch, Zucker, Salz zu glattem Teig verrühren. Äpfel schälen, in Scheiben schneiden. In Pfanne mit Butter Apfelscheiben kurz andünsten, Teig drüber. Goldbraun backen, mit Zimt-Zucker servieren.',
    tipp: 'Beliebter Familien-Klassiker — perfekt für Sonntag-Brunch. Hält warm im Backofen.'
  },
  {
    id: 'auflauf-nudel',
    name: 'Nudelauflauf mit Hackfleisch',
    emoji: '🍲',
    bild: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=75',
    kategorie: 'guenstig',
    kategorieLabel: 'Besonders Günstig',
    dauer: '50 Min.',
    kosten: '≈ 2,50 €',
    portionen: 6,
    zutaten: ['500 g Nudeln (Penne, Hörnchen)', '500 g Rinderhack', '2 Dosen Tomaten (á 400 g)', '1 Zwiebel, 2 Knoblauchzehen', '200 g geriebener Käse', 'Salz, Pfeffer, Oregano, Basilikum'],
    zubereitung: 'Nudeln al dente kochen. Zwiebel und Hack anbraten, Tomaten dazu, 10 Min. köcheln. Nudeln untermischen, in Auflaufform geben, mit Käse bestreuen. Bei 200°C 20 Min. überbacken.',
    tipp: 'Reicht für 6 Portionen — perfekt zum Einfrieren in Einzelportionen.'
  },
  {
    id: 'gulasch',
    name: 'Gulaschsuppe',
    emoji: '🍲',
    bild: 'https://images.unsplash.com/photo-1547308283-b941de5747bf?w=600&q=75',
    kategorie: 'guenstig',
    kategorieLabel: 'Besonders Günstig',
    dauer: '90 Min.',
    kosten: '≈ 2,00 €',
    portionen: 6,
    zutaten: ['500 g Gulaschfleisch (Rind)', '4 große Zwiebeln', '2 Paprika', '500 g Kartoffeln', '2 EL Paprikapulver edelsüß', '1 l Rinderbrühe', '1 EL Tomatenmark', 'Salz, Pfeffer, Kümmel, Majoran'],
    zubereitung: 'Zwiebeln in Schmalz goldbraun rösten (15 Min.). Fleisch anbraten, Tomatenmark und Paprikapulver dazu. Mit Brühe ablöschen, 60 Min. köcheln. Kartoffeln und Paprika dazu, weitere 20 Min. kochen.',
    tipp: 'Schmeckt am nächsten Tag aufgewärmt noch besser! Mit dunklem Brot servieren.'
  },
  {
    id: 'haehnchengyros',
    name: 'Hähnchen-Gyros mit Reis',
    emoji: '🍗',
    bild: 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=600&q=75',
    kategorie: 'schnell',
    kategorieLabel: 'Schnell & Einfach',
    dauer: '25 Min.',
    kosten: '≈ 2,20 €',
    portionen: 4,
    zutaten: ['600 g Hähnchenbrust', '3 EL Gyrosgewürz', '2 EL Olivenöl', '300 g Reis', '500 g Tzatziki (oder selbst: Joghurt + Gurke + Knoblauch)', '2 Tomaten, 1 Zwiebel'],
    zubereitung: 'Hähnchen in Streifen schneiden, mit Gewürz und Öl marinieren (10 Min.). Reis kochen. Hähnchen in heißer Pfanne 8 Min. braten. Mit Reis, Tzatziki, Tomatenscheiben und Zwiebelringen servieren.',
    tipp: 'Schnelles Gyros für Familien — Kinder lieben es! Mit Pita-Brot statt Reis als Wrap.'
  },
  {
    id: 'pasta-aglio',
    name: 'Spaghetti Aglio e Olio',
    emoji: '🍝',
    bild: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&q=75',
    kategorie: 'schnell',
    kategorieLabel: 'Schnell & Einfach',
    dauer: '15 Min.',
    kosten: '≈ 1,00 €',
    portionen: 4,
    zutaten: ['500 g Spaghetti', '6 Knoblauchzehen', '6 EL Olivenöl', '1 Chili (oder TL Chiliflocken)', '1 Bund Petersilie', 'Salz, Pfeffer', 'Optional: Parmesan'],
    zubereitung: 'Spaghetti in Salzwasser kochen. Knoblauch in Scheiben schneiden, in Öl mit Chili 2 Min. anbraten (nicht braun!). Spaghetti abgießen, mit Knoblauchöl und Petersilie mischen. Pfeffern.',
    tipp: 'Italienisches Studentenrezept — billig, schnell und himmlisch! Knoblauch nicht verbrennen.'
  },
  {
    id: 'gemuesepfanne',
    name: 'Bunte Gemüsepfanne mit Ei',
    emoji: '🍳',
    bild: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=75',
    kategorie: 'resteessen',
    kategorieLabel: 'Resteessen',
    dauer: '20 Min.',
    kosten: '≈ 1,20 €',
    portionen: 4,
    zutaten: ['Verschiedene Gemüsereste (1 kg)', '4 Eier', '2 Knoblauchzehen', '2 EL Olivenöl', 'Salz, Pfeffer, Kräuter der Provence', 'Optional: Feta'],
    zubereitung: 'Gemüse in mundgerechte Stücke schneiden (Hartes zuerst). Knoblauch in Öl anbraten, Gemüse 10 Min. unter Rühren braten. Mulden in das Gemüse drücken, Eier einschlagen, 5 Min. stocken lassen.',
    tipp: 'Resteverwertung pur! Funktioniert mit fast jedem Gemüse. Mit Feta wird es noch leckerer.'
  },
  {
    id: 'reisauflauf',
    name: 'Süßer Reisauflauf mit Beeren',
    emoji: '🥧',
    bild: 'https://images.unsplash.com/photo-1517093602195-b40af9688b78?w=600&q=75',
    kategorie: 'kinder',
    kategorieLabel: 'Kinder-Liebling',
    dauer: '60 Min.',
    kosten: '≈ 1,30 €',
    portionen: 6,
    zutaten: ['200 g Milchreis', '750 ml Milch', '60 g Zucker', '3 Eier', '50 g Butter', '500 g Beeren (TK ok)', 'Vanillezucker, Zimt'],
    zubereitung: 'Milchreis in Milch mit Zucker 25 Min. quellen lassen. Eier trennen, Eigelb mit Reis verrühren. Eiweiß steif schlagen, unterheben. Mit Beeren in Auflaufform geben. Bei 180°C 25 Min. backen.',
    tipp: 'Kinderhit! Reste schmecken auch kalt. Mit Vanillesoße noch besser.'
  },
  {
    id: 'brotsuppe',
    name: 'Knödel-Brotsuppe',
    emoji: '🍞',
    bild: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=75',
    kategorie: 'resteessen',
    kategorieLabel: 'Resteessen',
    dauer: '25 Min.',
    kosten: '≈ 0,50 €',
    portionen: 4,
    zutaten: ['400 g altes Brot/Brötchen', '1 l Gemüsebrühe', '2 Eier', '1 Zwiebel', '1 Bund Petersilie', '50 g Butter', 'Salz, Pfeffer, Muskatnuss'],
    zubereitung: 'Brot in Würfel schneiden, mit warmer Milch (200ml) übergießen, 10 Min. ziehen. Eier, Zwiebel, Petersilie unterrühren. Mit Esslöffel Klößchen formen. In köchelnder Brühe 10 Min. ziehen lassen.',
    tipp: 'Klassische Resteküche — aus altem Brot wird ein Festmahl! Auch mit Schinken-Würfeln.'
  },
  // ===== FRÜHSTÜCK =====
  { id:'bircher', name:'Bircher Müsli', emoji:'🥣', bild:'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600&q=75', kategorie:'fruehstueck', kategorieLabel:'Frühstück', dauer:'10 Min. + Nacht', kosten:'≈ 0,80 €', portionen:4, zutaten:['200 g Haferflocken','400 ml Milch','2 Äpfel','100 g Joghurt','2 EL Honig','50 g Walnüsse','1 TL Zimt','Frische Beeren'], zubereitung:'Haferflocken mit Milch über Nacht einweichen. Morgens Apfel raspeln, Joghurt, Honig und Zimt unterrühren. Mit Walnüssen und Beeren servieren.', tipp:'Vorbereitung am Sonntag für die ganze Woche - 5 Portionen einfrieren' },
  { id:'brot-aufstrich', name:'Frühstücksbrettchen', emoji:'🥖', bild:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=75', kategorie:'fruehstueck', kategorieLabel:'Frühstück', dauer:'10 Min.', kosten:'≈ 1,50 €', portionen:4, zutaten:['8 Scheiben Vollkornbrot','100 g Butter','100 g Käse','100 g Wurst','1 Tomate','1 Gurke','Frische Kresse'], zubereitung:'Brot mit Butter bestreichen. Belegen mit Käse, Wurst, Tomatenscheiben, Gurke. Mit Kresse garnieren.', tipp:'Mit Kindern gemeinsam belegen lassen - Spaß und sie essen mehr' },
  { id:'rührei', name:'Rührei mit Schnittlauch', emoji:'🍳', bild:'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=75', kategorie:'fruehstueck', kategorieLabel:'Frühstück', dauer:'10 Min.', kosten:'≈ 1,00 €', portionen:2, zutaten:['4 Eier','3 EL Milch','1 EL Butter','1 Bund Schnittlauch','Salz, Pfeffer'], zubereitung:'Eier mit Milch, Salz und Pfeffer verquirlen. In Butter bei niedriger Hitze unter Rühren stocken lassen. Mit Schnittlauch bestreuen.', tipp:'Niedrige Hitze ist Geheimnis für cremige Konsistenz - nie heiß braten' },
  { id:'spiegelei-speck', name:'Spiegelei mit Speck', emoji:'🍳', bild:'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=75', kategorie:'fruehstueck', kategorieLabel:'Frühstück', dauer:'10 Min.', kosten:'≈ 1,20 €', portionen:2, zutaten:['4 Eier','100 g Speckwürfel','Salz, Pfeffer','Schnittlauch'], zubereitung:'Speck in Pfanne knusprig braten, Fett ablassen. Eier auf Speck schlagen, salzen, pfeffern. Bei mittlerer Hitze stocken lassen.', tipp:'Brot frisch vom Bäcker dazu - perfektes Sonntagsfrühstück' },
  { id:'haferbrei', name:'Cremiger Haferbrei', emoji:'🥄', bild:'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=600&q=75', kategorie:'fruehstueck', kategorieLabel:'Frühstück', dauer:'15 Min.', kosten:'≈ 0,50 €', portionen:4, zutaten:['200 g Haferflocken','750 ml Milch','3 EL Honig','1 TL Vanille','1 Banane','100 g Beeren','50 g Mandeln'], zubereitung:'Haferflocken in Milch unter Rühren 10 Min. köcheln. Mit Honig und Vanille süßen. Mit Banane, Beeren und Mandeln servieren.', tipp:'Auch lecker mit Apfel und Zimt - oder Schokolade für Kinder' },

  // ===== SUPPEN =====
  { id:'tomatencreme', name:'Tomatencremesuppe', emoji:'🍅', bild:'https://images.unsplash.com/photo-1547308283-b941de5747bf?w=600&q=75', kategorie:'suppe', kategorieLabel:'Suppen', dauer:'25 Min.', kosten:'≈ 1,50 €', portionen:4, zutaten:['1 kg Tomaten','1 Zwiebel','2 Knoblauchzehen','500 ml Brühe','100 ml Sahne','2 EL Olivenöl','Basilikum, Salz, Pfeffer','1 TL Zucker'], zubereitung:'Zwiebel und Knoblauch anschwitzen. Tomaten dazu, Brühe angießen. 15 Min. köcheln. Pürieren, Sahne unterrühren, abschmecken. Mit Basilikum servieren.', tipp:'Mit altem Baguette und Käse als Crouton - perfekt' },
  { id:'erbsensuppe', name:'Deftige Erbsensuppe', emoji:'🥬', bild:'https://images.unsplash.com/photo-1605478854296-bea3f6f8d6e0?w=600&q=75', kategorie:'suppe', kategorieLabel:'Suppen', dauer:'90 Min.', kosten:'≈ 1,00 €', portionen:6, zutaten:['500 g getrocknete Erbsen','2 Karotten','2 Kartoffeln','1 Zwiebel','200 g Speckwürfel','4 Wiener Würstchen','1 TL Majoran','Salz, Pfeffer'], zubereitung:'Erbsen über Nacht einweichen. Mit Speck, Zwiebel, Gemüse 90 Min. köcheln. Würstchen 10 Min. vor Ende dazu. Würzen mit Majoran.', tipp:'Schmeckt am 2. Tag noch besser - großer Topf macht Sinn' },
  { id:'kuerbissuppe', name:'Kürbissuppe Hokkaido', emoji:'🎃', bild:'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&q=75', kategorie:'suppe', kategorieLabel:'Suppen', dauer:'30 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['1 Hokkaido (1 kg)','1 Zwiebel','3 cm Ingwer','500 ml Brühe','200 ml Kokosmilch','Curry, Salz, Pfeffer','Kürbiskerne'], zubereitung:'Kürbis (mit Schale!) würfeln. Mit Zwiebel und Ingwer anbraten. Brühe und Kokosmilch dazu. 20 Min. köcheln, pürieren. Mit Kürbiskernen servieren.', tipp:'Hokkaido-Schale kann mitgegessen werden - spart Schälarbeit' },
  { id:'huehnerbruehe', name:'Hühnerbrühe (Klassiker)', emoji:'🍲', bild:'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=75', kategorie:'suppe', kategorieLabel:'Suppen', dauer:'2 Std.', kosten:'≈ 4,00 €', portionen:6, zutaten:['1 Suppenhuhn','3 Karotten','1 Lauch','1/4 Sellerie','1 Zwiebel','Petersilie','Salz, Pfeffer, Lorbeer'], zubereitung:'Huhn mit kaltem Wasser bedecken, aufkochen, Schaum abnehmen. Gemüse dazu, 2h leise köcheln. Huhn rausnehmen, Brühe abseihen. Suppennudeln in Brühe kochen.', tipp:'Heilmittel bei Erkältung - Großmutters Geheimnis' },
  { id:'soljanka', name:'Soljanka (DDR-Klassiker)', emoji:'🥘', bild:'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=75', kategorie:'suppe', kategorieLabel:'Suppen', dauer:'45 Min.', kosten:'≈ 3,00 €', portionen:6, zutaten:['200 g Salami','200 g Schinken','200 g Jagdwurst','1 Zwiebel','3 Gewürzgurken','100 g Tomatenmark','1 l Brühe','1 Zitrone','Saure Sahne'], zubereitung:'Wurst und Zwiebel würfeln, anbraten. Tomatenmark dazu. Mit Brühe ablöschen, Gurken klein schneiden, dazugeben. 30 Min. köcheln. Mit Zitrone und Sahne servieren.', tipp:'DDR-Original - mit Wurstresten perfekte Resteverwertung' },
  { id:'champignonsuppe', name:'Champignoncremesuppe', emoji:'🍄', bild:'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=75', kategorie:'suppe', kategorieLabel:'Suppen', dauer:'25 Min.', kosten:'≈ 2,50 €', portionen:4, zutaten:['500 g Champignons','1 Zwiebel','1 Knoblauchzehe','500 ml Brühe','200 ml Sahne','2 EL Mehl','Petersilie','Salz, Pfeffer'], zubereitung:'Champignons, Zwiebel, Knoblauch in Butter anbraten. Mehl dazu, Brühe angießen. 15 Min. köcheln. Pürieren oder stückig lassen. Sahne dazu, abschmecken.', tipp:'Mit Trüffelöl edler - oder Speckwürfel für deftig' },
  { id:'spargelsuppe', name:'Spargelcremesuppe', emoji:'🥬', bild:'https://images.unsplash.com/photo-1605478854296-bea3f6f8d6e0?w=600&q=75', kategorie:'suppe', kategorieLabel:'Suppen', dauer:'30 Min.', kosten:'≈ 4,00 €', portionen:4, zutaten:['500 g weißer Spargel','1 l Spargelfond','100 ml Sahne','2 EL Butter','2 EL Mehl','Muskat, Salz, Zucker'], zubereitung:'Spargel schälen, Schalen 30 Min. zu Fond kochen. Spargel klein schneiden, kurz mitkochen. Mehlschwitze ansetzen, mit Fond ablöschen. Sahne, Spargelstücke, Würzen.', tipp:'Saison: April-Juni. Mit Pfannkuchen-Streifen im Suppenteller' },
  { id:'gulaschsuppe-rind', name:'Gulaschsuppe Wiener Art', emoji:'🍲', bild:'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=600&q=75', kategorie:'suppe', kategorieLabel:'Suppen', dauer:'2 Std.', kosten:'≈ 3,50 €', portionen:6, zutaten:['600 g Gulaschfleisch','3 große Zwiebeln','3 Paprika','3 Kartoffeln','3 EL Paprika edelsüß','1.5 l Brühe','1 EL Tomatenmark','Kümmel, Majoran, Salz'], zubereitung:'Zwiebeln in Schmalz goldbraun braten (15 Min!). Fleisch anbraten, Paprika und Tomatenmark dazu. Mit Brühe ablöschen, 90 Min. köcheln. Kartoffeln und Paprika 30 Min. vor Ende.', tipp:'Süßes Paprikapulver darf nicht angebrannt werden - wird sonst bitter' },

  // ===== FLEISCHGERICHTE =====
  { id:'wiener-schnitzel', name:'Wiener Schnitzel (Klassiker)', emoji:'🥩', bild:'https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'30 Min.', kosten:'≈ 4,50 €', portionen:4, zutaten:['4 Kalbsschnitzel á 150g','100 g Mehl','2 Eier','150 g Semmelbrösel','Butterschmalz','Salz, Pfeffer','1 Zitrone','Petersilienkartoffeln'], zubereitung:'Schnitzel klopfen, salzen, pfeffern. Erst Mehl, dann Ei, dann Brösel - locker panieren! In viel Butterschmalz schwimmend goldbraun braten. Mit Zitrone servieren.', tipp:'Originale haben gewellte Panierung - Pfanne öfter schwenken' },
  { id:'rouladen', name:'Rinder-Rouladen', emoji:'🥩', bild:'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'2 Std.', kosten:'≈ 5,00 €', portionen:4, zutaten:['4 Rinder-Rouladen','4 Scheiben Speck','2 saure Gurken','1 Zwiebel','Senf','Salz, Pfeffer','500 ml Rinderbrühe','100 ml Rotwein','2 EL Tomatenmark'], zubereitung:'Rouladen mit Senf bestreichen, salzen, pfeffern. Mit Speck, Gurke, Zwiebel füllen. Aufrollen, mit Garn fixieren. Anbraten, mit Brühe und Rotwein 90 Min. schmoren. Soße binden.', tipp:'Sonntagsbraten der deutschen Küche - mit Klößen und Rotkohl' },
  { id:'sauerbraten', name:'Rheinischer Sauerbraten', emoji:'🥩', bild:'https://images.unsplash.com/photo-1559847844-d7c1c0e1eaef?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'3 Tage + 3 Std.', kosten:'≈ 6,00 €', portionen:6, zutaten:['1.5 kg Rinderbraten','500 ml Rotwein','500 ml Essig','Lorbeer, Wacholder, Nelken','3 Zwiebeln','100 g Rosinen','Pumpernickel','Salz, Pfeffer'], zubereitung:'3 Tage in Beize einlegen. Anbraten, mit Beize aufgießen, 3h schmoren. Rosinen und zerbröselten Pumpernickel dazu - bindet die Soße rheinisch.', tipp:'Original mit Apfelmus und Klößen - sonntäglicher Klassiker' },
  { id:'frikadelle', name:'Frikadellen mit Kartoffeln', emoji:'🥩', bild:'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'40 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['500 g gemischtes Hack','1 altbackenes Brötchen','1 Ei','1 Zwiebel','1 EL Senf','Petersilie','Salz, Pfeffer, Paprika','1 kg Kartoffeln'], zubereitung:'Brötchen in Wasser einweichen, ausdrücken. Mit Hack, Ei, Zwiebeln, Senf und Gewürzen vermengen. Frikadellen formen, in Pfanne braten. Kartoffeln dazu kochen.', tipp:'Schmecken auch kalt am nächsten Tag - perfekte Reste' },
  { id:'currywurst', name:'Currywurst Berliner Art', emoji:'🌭', bild:'https://images.unsplash.com/photo-1597503115161-c8be4c7a7c14?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'15 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['4 Bratwürste','200 ml Ketchup','100 ml Wasser','1 EL Currypulver','1 TL Paprika','1 Prise Cayenne','1 EL Worcestersauce','Pommes Frites'], zubereitung:'Würste anbraten oder grillen. Ketchup mit Wasser, Curry und Gewürzen erhitzen. Würste in Stücke schneiden, mit Sauce und Currypulver bestreuen.', tipp:'Berliner Klassiker - dazu Pommes Schranke (Mayo + Ketchup)' },
  { id:'koenigsberger', name:'Königsberger Klopse', emoji:'🥩', bild:'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'45 Min.', kosten:'≈ 3,00 €', portionen:4, zutaten:['500 g Hackfleisch','1 Brötchen','1 Ei','1 Zwiebel','3 EL Kapern','500 ml Brühe','200 ml Sahne','2 EL Mehl','Zitrone, Salz, Pfeffer'], zubereitung:'Hackmasse wie für Frikadellen, Klopse formen. In Brühe ziehen lassen 15 Min. (nicht kochen!). Mehlschwitze, mit Brühe ablöschen, Sahne, Kapern, Zitrone dazu.', tipp:'Mit Kartoffeln und roter Bete - traditioneller Sonntagsklassiker' },
  { id:'schwein-knoedel', name:'Schweinebraten mit Knödel', emoji:'🥩', bild:'https://images.unsplash.com/photo-1586672806791-3a67d24186c0?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'2.5 Std.', kosten:'≈ 4,00 €', portionen:6, zutaten:['1.5 kg Schweinekrustenbraten','3 Zwiebeln','3 Karotten','500 ml dunkles Bier','500 ml Brühe','1 EL Kümmel','Salz, Pfeffer','6 Semmelknödel'], zubereitung:'Schwarte rautenförmig einschneiden, salzen. 2h bei 180°C im Ofen, mit Bier und Brühe begießen. Letzte 20 Min. Schwarte knusprig braten. Semmelknödel separat.', tipp:'Bayerischer Klassiker - dazu Sauerkraut für die Verdauung' },
  { id:'leberkaese', name:'Bayerischer Leberkäse', emoji:'🥩', bild:'https://images.unsplash.com/photo-1586672806791-3a67d24186c0?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'15 Min.', kosten:'≈ 1,50 €', portionen:4, zutaten:['500 g Leberkäse-Scheiben','4 Spiegeleier','4 Brötchen','Senf','Süßer Senf','Saure Gurken','Brezenstangen'], zubereitung:'Leberkäse in Pfanne braten, mit Spiegelei belegen. Mit frischem Brötchen, Senf und Gurke servieren. Brezenstange dazu.', tipp:'Münchner Frühstücksklassiker - schnell und sättigend' },

  // ===== FISCH =====
  { id:'lachs-spinat', name:'Lachs mit Spinat', emoji:'🐟', bild:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=75', kategorie:'fisch', kategorieLabel:'Fischgerichte', dauer:'25 Min.', kosten:'≈ 4,00 €', portionen:4, zutaten:['4 Lachsfilets','500 g Blattspinat','100 ml Sahne','2 Knoblauchzehen','30 g Butter','Zitrone, Salz, Pfeffer'], zubereitung:'Lachs salzen, pfeffern, in Butter braten. Spinat mit Knoblauch und Sahne 5 Min. dünsten. Mit Lachs und Zitronensaft servieren.', tipp:'Mit Reis oder Kartoffeln - Omega-3 Power-Mahlzeit' },
  { id:'forelle-blau', name:'Forelle Blau', emoji:'🐟', bild:'https://images.unsplash.com/photo-1535140728325-a4d3707eee94?w=600&q=75', kategorie:'fisch', kategorieLabel:'Fischgerichte', dauer:'30 Min.', kosten:'≈ 3,50 €', portionen:4, zutaten:['4 Forellen','100 ml Essig','1 Bund Petersilie','1 Zitrone','100 g Butter','Salzkartoffeln'], zubereitung:'Forellen in heißem Salz-Essig-Sud 15 Min. ziehen lassen (NICHT kochen!). Mit zerlassener Butter und Petersilie servieren. Salzkartoffeln dazu.', tipp:'Frische ist alles! Augen müssen klar und Kiemen rot sein' },
  { id:'matjes', name:'Matjes Hausfrauenart', emoji:'🐟', bild:'https://images.unsplash.com/photo-1535140728325-a4d3707eee94?w=600&q=75', kategorie:'fisch', kategorieLabel:'Fischgerichte', dauer:'15 Min.', kosten:'≈ 2,50 €', portionen:4, zutaten:['8 Matjesfilets','200 g saure Sahne','100 g Joghurt','2 Äpfel','2 Gewürzgurken','1 rote Zwiebel','Pellkartoffeln'], zubereitung:'Matjes wässern. Apfel, Gurken, Zwiebel klein schneiden, mit Sahne und Joghurt mischen. Matjes mit Sauce übergießen, mit Pellkartoffeln servieren.', tipp:'Norddeutscher Klassiker - perfekt im Sommer kalt' },
  { id:'fischstaebchen', name:'Selbst gemachte Fischstäbchen', emoji:'🐟', bild:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=75', kategorie:'fisch', kategorieLabel:'Fischgerichte', dauer:'25 Min.', kosten:'≈ 2,50 €', portionen:4, zutaten:['600 g Seelachsfilet','100 g Mehl','2 Eier','200 g Semmelbrösel','Öl zum Braten','Salz, Pfeffer','Pommes oder Kartoffelpüree'], zubereitung:'Fisch in Stäbchen schneiden, salzen, pfeffern. In Mehl, Ei, Brösel panieren. In Öl goldbraun braten. Mit Pommes oder Püree servieren.', tipp:'Kinderhit ohne Fertigprodukt-Zusätze - 100x besser als gekauft' },

  // ===== VEGETARISCH =====
  { id:'kuerbiscurry', name:'Kürbis-Curry mit Kichererbsen', emoji:'🥘', bild:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=75', kategorie:'vegetarisch', kategorieLabel:'Vegetarisch', dauer:'40 Min.', kosten:'≈ 1,80 €', portionen:4, zutaten:['1 Hokkaido','1 Dose Kichererbsen','400 ml Kokosmilch','2 Zwiebeln','3 Knoblauchzehen','3 EL Curry','1 EL Ingwer','Reis','Koriander'], zubereitung:'Kürbis würfeln. Zwiebel und Knoblauch anbraten. Curry und Ingwer dazu. Kürbis und Kichererbsen, mit Kokosmilch ablöschen. 25 Min. köcheln. Mit Reis servieren.', tipp:'Kürbisschale dranlassen - voll Vitamine' },
  { id:'gemueselasagne', name:'Vegetarische Lasagne', emoji:'🍝', bild:'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=75', kategorie:'vegetarisch', kategorieLabel:'Vegetarisch', dauer:'1 Std.', kosten:'≈ 3,00 €', portionen:6, zutaten:['10 Lasagne-Platten','2 Zucchini','1 Aubergine','500 g Tomatenpassata','2 Zwiebeln','3 Knoblauchzehen','500 ml Béchamel','200 g Mozzarella','Basilikum'], zubereitung:'Gemüse würfeln, mit Zwiebeln anbraten. Tomatenpassata dazu, würzen. Auflaufform: Sauce, Platten, Gemüse, Béchamel im Wechsel. Oben Mozzarella. 35 Min. bei 180°C.', tipp:'Vorabends zubereiten, am nächsten Tag noch besser' },
  { id:'spinat-knoedel', name:'Spinatknödel', emoji:'🥬', bild:'https://images.unsplash.com/photo-1611330099022-3c4cb59ea29c?w=600&q=75', kategorie:'vegetarisch', kategorieLabel:'Vegetarisch', dauer:'30 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['400 g Spinat','300 g altes Brot','3 Eier','200 ml Milch','100 g Parmesan','1 Zwiebel','Muskat, Salz, Pfeffer','Butter, Salbei'], zubereitung:'Spinat blanchieren, klein hacken. Brot mit Milch einweichen. Mit Eiern, Spinat, Parmesan, Zwiebeln vermengen. Knödel formen, 15 Min. ziehen lassen. Mit Salbeibutter servieren.', tipp:'Südtiroler Spezialität - mit Tomatensoße auch perfekt' },
  { id:'gemueseauflauf', name:'Gemüse-Auflauf', emoji:'🥘', bild:'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=75', kategorie:'vegetarisch', kategorieLabel:'Vegetarisch', dauer:'45 Min.', kosten:'≈ 2,50 €', portionen:6, zutaten:['1 kg gemischtes Gemüse','500 g Kartoffeln','200 g geriebener Käse','200 ml Sahne','3 Eier','2 Knoblauchzehen','Kräuter, Salz, Pfeffer'], zubereitung:'Gemüse und Kartoffeln in Scheiben. In Auflaufform schichten. Sahne mit Eiern und Gewürzen verquirlen, drüber. Mit Käse bedecken. 35 Min. bei 200°C.', tipp:'Resteverwertung perfekt - jedes Gemüse passt' },
  { id:'champignon-pasta', name:'Champignon-Sahne-Pasta', emoji:'🍝', bild:'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&q=75', kategorie:'vegetarisch', kategorieLabel:'Vegetarisch', dauer:'20 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['500 g Pasta','500 g Champignons','200 ml Sahne','2 Knoblauchzehen','1 Zwiebel','100 g Parmesan','Petersilie','Salz, Pfeffer'], zubereitung:'Pasta kochen. Pilze, Zwiebel, Knoblauch in Butter anbraten. Sahne dazu, einkochen. Mit Pasta vermengen, Parmesan und Petersilie drüber.', tipp:'Mit gehackter Petersilie und Zitronenabrieb - frischer Touch' },
  { id:'gemuesepfanne-mediterran', name:'Mediterrane Gemüsepfanne', emoji:'🥘', bild:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=75', kategorie:'vegetarisch', kategorieLabel:'Vegetarisch', dauer:'25 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['2 Zucchini','1 Aubergine','2 Paprika','2 Tomaten','1 Zwiebel','3 Knoblauchzehen','100 g Feta','Olivenöl, Kräuter der Provence'], zubereitung:'Gemüse würfeln. In Olivenöl mit Knoblauch 15 Min. braten. Mit Kräutern würzen. Feta zerkrümeln, drüber servieren.', tipp:'Mit Couscous oder Brot - sommerliche Mittelmeer-Küche' },

  // ===== KUCHEN & DESSERTS =====
  { id:'apfelkuchen', name:'Versunkener Apfelkuchen', emoji:'🍎', bild:'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600&q=75', kategorie:'kuchen', kategorieLabel:'Kuchen', dauer:'1 Std.', kosten:'≈ 2,00 €', portionen:8, zutaten:['200 g Butter','200 g Zucker','4 Eier','300 g Mehl','1 Pck. Backpulver','4 Äpfel','1 Zitrone','Zimt-Zucker'], zubereitung:'Butter mit Zucker schaumig, Eier nach und nach. Mehl mit Backpulver unterrühren. In Springform. Äpfel achteln, leicht eindrücken. 50 Min. bei 180°C. Mit Zimt-Zucker bestreuen.', tipp:'Klassiker für Sonntag - frisch gebacken einfach unwiderstehlich' },
  { id:'kaesekuchen', name:'Käsekuchen mit Quark', emoji:'🍰', bild:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=75', kategorie:'kuchen', kategorieLabel:'Kuchen', dauer:'1.5 Std.', kosten:'≈ 4,00 €', portionen:12, zutaten:['250 g Butterkekse','100 g Butter','1 kg Magerquark','200 g Zucker','5 Eier','1 Pck. Vanillepudding-Pulver','200 ml Sahne','Zitrone'], zubereitung:'Kekse zerbröseln, mit Butter mischen, in Springform pressen. Quark mit Zucker, Eiern, Pudding, Sahne, Zitrone verrühren. Auf Boden geben. 60 Min. bei 175°C.', tipp:'Auskühlen lassen vor Anschneiden - sonst zerfällt' },
  { id:'schwarzwaelder', name:'Schwarzwälder Kirschtorte', emoji:'🍒', bild:'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=75', kategorie:'kuchen', kategorieLabel:'Kuchen', dauer:'2 Std.', kosten:'≈ 8,00 €', portionen:12, zutaten:['Schoko-Biskuitboden','500 ml Sahne','1 Glas Sauerkirschen','100 ml Kirschwasser','100 g Schokoraspeln','50 g Zucker','Vanille'], zubereitung:'Biskuit in 3 Böden teilen. Mit Kirschwasser tränken. Sahne steif schlagen. Böden mit Sahne und Kirschen schichten. Außen mit Sahne und Schokoraspeln verzieren.', tipp:'Klassiker aus dem Schwarzwald - mit echtem Kirschwasser' },
  { id:'donauwelle', name:'Donauwelle', emoji:'🍰', bild:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=75', kategorie:'kuchen', kategorieLabel:'Kuchen', dauer:'1.5 Std.', kosten:'≈ 5,00 €', portionen:12, zutaten:['250 g Butter','250 g Zucker','5 Eier','300 g Mehl','1 Pck. Backpulver','3 EL Kakao','1 Glas Sauerkirschen','Buttercreme','200 g Schokokuvertüre'], zubereitung:'Teig teilen: 1/3 dunkel mit Kakao. Hellen Teig auf Blech, dunklen drüber, Kirschen einlegen. 30 Min. bei 175°C. Buttercreme drauf, Schokokuvertüre überziehen, Wellen ziehen.', tipp:'Auch Marmorkuchen vom Blech genannt - immer ein Hit' },
  { id:'apfelstrudel', name:'Wiener Apfelstrudel', emoji:'🍏', bild:'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&q=75', kategorie:'kuchen', kategorieLabel:'Kuchen', dauer:'1.5 Std.', kosten:'≈ 3,00 €', portionen:8, zutaten:['1 Pck. Strudelteig','1 kg Äpfel','100 g Rosinen','100 g Mandeln','100 g Butter','100 g Brösel','1 TL Zimt','Zucker','Vanillesoße'], zubereitung:'Äpfel würfeln, mit Rosinen, Mandeln, Zimt, Zucker mischen. Teig ausrollen, mit Bröseln und Butter bestreichen. Füllung darauf, einrollen. Mit Butter bestreichen. 30 Min. bei 180°C.', tipp:'Mit Vanillesoße oder Vanilleeis - Wiener Klassiker' },
  { id:'marmorkuchen', name:'Klassischer Marmorkuchen', emoji:'🍰', bild:'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=75', kategorie:'kuchen', kategorieLabel:'Kuchen', dauer:'1 Std.', kosten:'≈ 2,00 €', portionen:12, zutaten:['250 g Butter','250 g Zucker','4 Eier','500 g Mehl','1 Pck. Backpulver','100 ml Milch','3 EL Kakao','100 g Zartbitterschokolade'], zubereitung:'Butter mit Zucker schaumig schlagen, Eier nach und nach. Mehl, Backpulver, Milch unter heben. 1/3 mit Kakao mischen. In Kastenform abwechselnd schichten, mit Gabel marmorieren. 60 Min. bei 175°C.', tipp:'Schokolade noch warm darüber gießen - kommt immer gut an' },
  { id:'rote-gruetze', name:'Rote Grütze', emoji:'🍓', bild:'https://images.unsplash.com/photo-1601001435957-4b8b09e3a1f0?w=600&q=75', kategorie:'dessert', kategorieLabel:'Desserts', dauer:'15 Min.', kosten:'≈ 2,50 €', portionen:4, zutaten:['500 g rote Beeren (TK ok)','100 g Zucker','2 EL Speisestärke','100 ml Saft','Vanillesoße'], zubereitung:'Beeren mit Zucker und etwas Saft erhitzen. Stärke in kaltem Saft auflösen, einrühren, kurz aufkochen. Abkühlen lassen. Mit Vanillesoße servieren.', tipp:'Norddeutscher Sommer-Klassiker - auch mit Sahne perfekt' },
  { id:'milchreis-zimt', name:'Milchreis mit Zimt-Zucker', emoji:'🥄', bild:'https://images.unsplash.com/photo-1517093602195-b40af9688b78?w=600&q=75', kategorie:'dessert', kategorieLabel:'Desserts', dauer:'45 Min.', kosten:'≈ 1,00 €', portionen:4, zutaten:['250 g Milchreis','1 l Milch','60 g Zucker','1 Vanilleschote','Salz','Zimt-Zucker','Apfelmus'], zubereitung:'Milch mit Zucker, Vanille, Salz aufkochen. Reis dazu, 30 Min. unter Rühren bei niedriger Hitze köcheln. Mit Zimt-Zucker und Apfelmus servieren.', tipp:'Auch kalt am nächsten Tag perfekt - Hauptmahlzeit für Kinder' },
  { id:'pflaumenkuchen', name:'Zwetschgenkuchen', emoji:'🍑', bild:'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=75', kategorie:'kuchen', kategorieLabel:'Kuchen', dauer:'1 Std.', kosten:'≈ 3,00 €', portionen:12, zutaten:['Hefeteig (500 g Mehl)','1 kg Zwetschgen','100 g Streusel (Butter, Zucker, Mehl)','Zimt-Zucker','Sahne'], zubereitung:'Hefeteig auf Blech ausrollen. Zwetschgen entkernen, halbieren, eng dachziegelartig auflegen. Streusel verteilen. 35 Min. bei 200°C. Mit Sahne servieren.', tipp:'Spätsommer-Klassiker - alle 4 Wochen sammeln' },

  // ===== SALATE =====
  { id:'kartoffelsalat-bayer', name:'Bayerischer Kartoffelsalat', emoji:'🥗', bild:'https://images.unsplash.com/photo-1519183071298-a2962be96f83?w=600&q=75', kategorie:'salat', kategorieLabel:'Salate', dauer:'30 Min.', kosten:'≈ 1,50 €', portionen:6, zutaten:['1 kg festkochende Kartoffeln','500 ml Brühe','1 Zwiebel','5 EL Essig','3 EL Öl','Senf','Salz, Pfeffer','Schnittlauch'], zubereitung:'Kartoffeln pellen, in Scheiben schneiden. Heiße Brühe mit Essig, Senf, Zwiebel über Kartoffeln. 1h ziehen lassen. Mit Öl und Schnittlauch abschmecken.', tipp:'Original ohne Mayo - mit Wiener Würstchen perfekter Sommerklassiker' },
  { id:'kartoffelsalat-mayo', name:'Norddeutscher Kartoffelsalat', emoji:'🥗', bild:'https://images.unsplash.com/photo-1519183071298-a2962be96f83?w=600&q=75', kategorie:'salat', kategorieLabel:'Salate', dauer:'30 Min.', kosten:'≈ 2,00 €', portionen:6, zutaten:['1 kg Kartoffeln','200 g Mayonnaise','100 g Joghurt','3 Gewürzgurken','100 g Schinkenwürfel','3 Eier','1 Zwiebel','Senf, Salz, Pfeffer'], zubereitung:'Kartoffeln kochen, würfeln. Eier hart kochen, würfeln. Mit Gurken, Schinken, Zwiebel mischen. Mayo, Joghurt, Senf einrühren. 1h kalt stellen.', tipp:'Mit Frikadellen und Brötchen - Picknick-Klassiker' },
  { id:'gurkensalat', name:'Klassischer Gurkensalat', emoji:'🥗', bild:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=75', kategorie:'salat', kategorieLabel:'Salate', dauer:'15 Min.', kosten:'≈ 1,00 €', portionen:4, zutaten:['1 Salatgurke','1 Zwiebel','100 ml saure Sahne','3 EL Essig','1 EL Zucker','Salz, Pfeffer','Dill'], zubereitung:'Gurke hobeln, salzen, 15 Min. Wasser ziehen lassen, ausdrücken. Mit Zwiebel, saurer Sahne, Essig, Zucker und Dill mischen.', tipp:'Schmeckt am besten kühl - perfekte Sommerbeilage' },
  { id:'krautsalat', name:'Bayerischer Krautsalat', emoji:'🥗', bild:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=75', kategorie:'salat', kategorieLabel:'Salate', dauer:'20 Min. + 30 Min. ziehen', kosten:'≈ 1,50 €', portionen:6, zutaten:['1 kg Weißkohl','3 EL Essig','3 EL Öl','1 EL Kümmel','100 g Speckwürfel','Salz, Pfeffer, Zucker'], zubereitung:'Kohl fein hobeln, salzen, mit Händen kneten 5 Min. Mit Essig, Öl, Kümmel, Pfeffer mischen. 30 Min. ziehen. Speck knusprig braten, drüber.', tipp:'In Bayern unverzichtbar zu Schweinebraten' },

  // ===== BEILAGEN =====
  { id:'kartoffelpueree', name:'Cremiges Kartoffelpüree', emoji:'🥔', bild:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=75', kategorie:'beilage', kategorieLabel:'Beilagen', dauer:'30 Min.', kosten:'≈ 1,50 €', portionen:4, zutaten:['1 kg mehlige Kartoffeln','200 ml Milch','100 g Butter','Muskat, Salz, Pfeffer'], zubereitung:'Kartoffeln schälen, kochen. Milch und Butter erhitzen. Kartoffeln stampfen, heiße Milch-Butter-Mischung dazu. Mit Muskat, Salz, Pfeffer würzen.', tipp:'Niemals mit Mixer - sonst wird Püree gummig' },
  { id:'rotkohl', name:'Rotkohl wie bei Oma', emoji:'🥬', bild:'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=75', kategorie:'beilage', kategorieLabel:'Beilagen', dauer:'1.5 Std.', kosten:'≈ 1,50 €', portionen:6, zutaten:['1 Rotkohl (1 kg)','2 Äpfel','1 Zwiebel','100 ml Rotwein','3 EL Apfelessig','3 EL Zucker','2 Lorbeer','5 Nelken','Salz, Pfeffer'], zubereitung:'Rotkohl hobeln, mit Äpfeln und Zwiebel würzen. In Topf mit Wein, Essig, Zucker, Gewürzen. 90 Min. unter Rühren köcheln.', tipp:'Schmeckt am 2. Tag noch besser - Vorratsklassiker' },
  { id:'sauerkraut', name:'Sauerkraut Frankfurter Art', emoji:'🥬', bild:'https://images.unsplash.com/photo-1601001435957-4b8b09e3a1f0?w=600&q=75', kategorie:'beilage', kategorieLabel:'Beilagen', dauer:'45 Min.', kosten:'≈ 1,00 €', portionen:6, zutaten:['1 kg Sauerkraut','200 g Speckwürfel','1 Zwiebel','200 ml Apfelsaft','100 ml Weißwein','1 EL Zucker','Wacholder, Lorbeer'], zubereitung:'Speck und Zwiebel in Topf anbraten. Sauerkraut dazu, mit Apfelsaft und Wein ablöschen. Gewürze und Zucker. 30 Min. köcheln.', tipp:'Apfelsaft macht es kindgerechter - schmeckt Erwachsenen auch' },
  { id:'spaetzle', name:'Schwäbische Spätzle', emoji:'🍝', bild:'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=75', kategorie:'beilage', kategorieLabel:'Beilagen', dauer:'30 Min.', kosten:'≈ 1,00 €', portionen:4, zutaten:['400 g Mehl','4 Eier','100 ml Wasser','1 TL Salz','Muskat'], zubereitung:'Mehl, Eier, Wasser, Salz, Muskat zu glattem Teig schlagen (mit Kochlöffel) bis Blasen wirft. Durch Spätzlepresse oder Brett in kochendes Salzwasser. Mit Sieb abfischen.', tipp:'Mit Soße, Linsen oder als Käsespätzle - vielseitiger Klassiker' },
  { id:'bratkartoffeln', name:'Bratkartoffeln', emoji:'🥔', bild:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=75', kategorie:'beilage', kategorieLabel:'Beilagen', dauer:'30 Min.', kosten:'≈ 1,50 €', portionen:4, zutaten:['1 kg festkochende Kartoffeln','200 g Speckwürfel','1 Zwiebel','3 EL Butterschmalz','Salz, Pfeffer, Kümmel','Petersilie'], zubereitung:'Kartoffeln am Vortag kochen, pellen, in Scheiben. In Schmalz braten bis goldbraun. Speck und Zwiebel dazu. Würzen, mit Petersilie servieren.', tipp:'Vom Vortag kochen - werden so noch knuspriger' },
  { id:'reibekuchen', name:'Reibekuchen Rheinisch', emoji:'🥔', bild:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=75', kategorie:'beilage', kategorieLabel:'Beilagen', dauer:'30 Min.', kosten:'≈ 1,50 €', portionen:4, zutaten:['1 kg Kartoffeln','1 Zwiebel','2 Eier','3 EL Mehl','Salz, Pfeffer, Muskat','Öl zum Braten','Apfelmus'], zubereitung:'Kartoffeln und Zwiebel reiben. Mit Eiern, Mehl, Gewürzen vermengen. Wasser ausdrücken. In heißem Öl flach braten. Mit Apfelmus servieren.', tipp:'Im Karneval mit Lachs oder Apfelmus - Kölner Tradition' },

  // ===== BACKWAREN =====
  { id:'broetchen', name:'Sonntags-Brötchen', emoji:'🥐', bild:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=75', kategorie:'backwaren', kategorieLabel:'Brot & Brötchen', dauer:'2 Std.', kosten:'≈ 1,00 €', portionen:10, zutaten:['500 g Mehl','1 Pck. Trockenhefe','300 ml warmes Wasser','1 TL Salz','1 EL Zucker','1 EL Olivenöl','Sesam/Mohn'], zubereitung:'Hefe in warmem Wasser auflösen. Mit Mehl, Salz, Zucker, Öl zu Teig kneten 10 Min. 1h gehen lassen. Brötchen formen, mit Sesam bestreuen. 20 Min. bei 220°C.', tipp:'Sonntag früh aufstehen, frische Brötchen ohne zum Bäcker laufen' },
  { id:'brezel', name:'Schwäbische Brezeln', emoji:'🥨', bild:'https://images.unsplash.com/photo-1620404789543-0e0fd6d52089?w=600&q=75', kategorie:'backwaren', kategorieLabel:'Brot & Brötchen', dauer:'1.5 Std.', kosten:'≈ 1,50 €', portionen:8, zutaten:['500 g Mehl','1 Pck. Hefe','250 ml Wasser','1 TL Salz','25 g Butter','3 EL Natron','grobes Salz'], zubereitung:'Hefeteig zubereiten, gehen lassen. Brezeln formen. Natron in Wasser auflösen, Brezeln kurz eintauchen. Mit grobem Salz bestreuen. 15 Min. bei 220°C.', tipp:'Mit Butter und Senf - bayerisches Frühstück' },
  { id:'vollkornbrot', name:'Vollkornbrot', emoji:'🍞', bild:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=75', kategorie:'backwaren', kategorieLabel:'Brot & Brötchen', dauer:'2 Std.', kosten:'≈ 2,00 €', portionen:10, zutaten:['400 g Vollkornmehl','100 g Roggenmehl','1 Pck. Trockenhefe','350 ml Wasser','2 TL Salz','100 g Sonnenblumenkerne','Kümmel'], zubereitung:'Mehle, Hefe, Salz, Wasser zu festem Teig. Kerne unterkneten. 1.5h gehen. In Kastenform. 1h bei 200°C.', tipp:'Mit eigener Sauerteig-Kultur noch aromatischer' },

  // ===== WEITERE HAUPTGERICHTE & VARIATIONEN =====
  { id:'wrisp-knoedel', name:'Bayerische Semmelknödel', emoji:'🥟', bild:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=75', kategorie:'beilage', kategorieLabel:'Beilagen', dauer:'45 Min.', kosten:'≈ 1,50 €', portionen:6, zutaten:['500 g altbackene Brötchen','3 Eier','300 ml Milch','1 Zwiebel','Petersilie','Salz, Pfeffer, Muskat','Butter'], zubereitung:'Brötchen würfeln, mit warmer Milch und Eiern vermengen. Zwiebel anschwitzen, dazu. 15 Min. ziehen. Knödel formen. In Salzwasser ziehen lassen 20 Min. (nicht kochen!).', tipp:'Reste am nächsten Tag in Pfanne mit Ei goldbraun braten' },
  { id:'gruene-bohnen', name:'Grüne Bohnen mit Speck', emoji:'🥬', bild:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=75', kategorie:'beilage', kategorieLabel:'Beilagen', dauer:'25 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['500 g grüne Bohnen','200 g Speckwürfel','1 Zwiebel','Bohnenkraut','Salz, Pfeffer','Butter'], zubereitung:'Bohnen putzen, in Salzwasser 8 Min. blanchieren. Speck und Zwiebel anbraten. Bohnen dazu, mit Bohnenkraut würzen. 5 Min. mitschmoren.', tipp:'Bohnenkraut ist DAS Gewürz - macht den Unterschied' },
  { id:'hackbraten', name:'Hackbraten mit Ei', emoji:'🥩', bild:'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'1.5 Std.', kosten:'≈ 4,00 €', portionen:6, zutaten:['1 kg gemischtes Hack','2 Brötchen','3 Eier (1 fürs Brötchen)','1 Zwiebel','Senf, Paprika, Salz','Speck','Sauce: Brühe + Sahne'], zubereitung:'Hackmasse zubereiten. In Form streichen, 2 Eier in der Mitte. Mit Speck umwickeln. 60 Min. bei 180°C. Soße aus Bratensud zubereiten.', tipp:'Falscher Hase genannt - Sonntag-Klassiker mit Klößen' },
  { id:'fleisch-eintopf', name:'Pichelsteiner Eintopf', emoji:'🥘', bild:'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'1.5 Std.', kosten:'≈ 3,00 €', portionen:6, zutaten:['500 g gemischtes Fleisch (Rind, Lamm, Schwein)','3 Karotten','3 Kartoffeln','1 Lauch','1 Sellerie','1 Zwiebel','1 l Brühe','Petersilie, Lorbeer, Salz'], zubereitung:'Fleisch anbraten. Gemüse würfeln, dazu. Mit Brühe bedeckt, 90 Min. köcheln. Würzen mit Petersilie.', tipp:'Bayerischer Klassiker - alle Reste im einem Topf' },
  { id:'leberwurst-brot', name:'Leberwurstbrot mit Apfel', emoji:'🍞', bild:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=75', kategorie:'schnell', kategorieLabel:'Schnell & Einfach', dauer:'5 Min.', kosten:'≈ 1,00 €', portionen:2, zutaten:['4 Scheiben Roggenbrot','100 g Leberwurst','1 Apfel','1 Zwiebel (rot)','Senf','Schnittlauch'], zubereitung:'Brot mit Leberwurst bestreichen. Mit dünnen Apfelscheiben und Zwiebelringen belegen. Mit Schnittlauch und etwas Senf garnieren.', tipp:'Klassiker zum Abendessen - rote Zwiebel ist Geheimnis' },
  { id:'eier-senfsoße', name:'Eier in Senfsoße', emoji:'🥚', bild:'https://images.unsplash.com/photo-1517093602195-b40af9688b78?w=600&q=75', kategorie:'schnell', kategorieLabel:'Schnell & Einfach', dauer:'25 Min.', kosten:'≈ 1,50 €', portionen:4, zutaten:['8 Eier','500 ml Milch','30 g Butter','30 g Mehl','3 EL mittelscharfer Senf','1 EL Honig','Petersilie','Salz, Pfeffer','Salzkartoffeln'], zubereitung:'Eier hart kochen. Mehlschwitze: Butter schmelzen, Mehl, mit Milch ablöschen. Senf, Honig, Gewürze einrühren. Eier halbieren, mit Sauce übergießen.', tipp:'DDR-Klassiker - mit Salzkartoffeln und grünem Salat' },
  { id:'kassler-sauerkraut', name:'Kassler mit Sauerkraut', emoji:'🥩', bild:'https://images.unsplash.com/photo-1559847844-d7c1c0e1eaef?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'1.5 Std.', kosten:'≈ 4,00 €', portionen:4, zutaten:['1 kg Kasslerbraten','1 kg Sauerkraut','2 Zwiebeln','100 g Speckwürfel','3 Kartoffeln','Apfelsaft, Wacholder','Salzkartoffeln'], zubereitung:'Kassler in Brühe 60 Min. ziehen lassen. Sauerkraut wie oben zubereiten. Kassler aufschneiden, mit Sauerkraut und Salzkartoffeln servieren.', tipp:'Bayerischer Klassiker - mit dunklem Bier perfekt' },
  { id:'haehnchen-schnitzel', name:'Hähnchenschnitzel', emoji:'🍗', bild:'https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'25 Min.', kosten:'≈ 2,50 €', portionen:4, zutaten:['4 Hähnchenbrustfilets','100 g Mehl','2 Eier','150 g Semmelbrösel','Salz, Pfeffer','Öl','Pommes oder Salat'], zubereitung:'Filets klopfen, salzen, pfeffern. Panieren in Mehl, Ei, Bröseln. In Öl goldbraun braten. Mit Pommes oder Salat servieren.', tipp:'Mit Cornflakes-Brösel statt Semmelbrösel - extra knusprig' },
  { id:'flammkuchen-classic', name:'Elsässer Flammkuchen', emoji:'🥧', bild:'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=600&q=75', kategorie:'vegetarisch', kategorieLabel:'Vegetarisch', dauer:'30 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['1 Flammkuchenteig','200 g Crème fraîche','200 g Speckwürfel','2 Zwiebeln','Salz, Pfeffer, Muskat','Schnittlauch'], zubereitung:'Teig dünn ausrollen. Crème fraîche bestreichen, Speck und Zwiebel drauf. 12 Min. bei 220°C. Mit Schnittlauch servieren.', tipp:'Vegetarisch: mit Lachs oder Birne+Walnuss kreieren' },
  { id:'haehnchen-curry', name:'Asia-Hähnchen-Curry', emoji:'🍗', bild:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'30 Min.', kosten:'≈ 3,50 €', portionen:4, zutaten:['600 g Hähnchenbrust','400 ml Kokosmilch','2 EL Currypaste','1 Paprika','1 Zucchini','1 Zwiebel','Reis','Koriander'], zubereitung:'Hähnchen würfeln, anbraten. Currypaste dazu, kurz mitbraten. Gemüse und Kokosmilch dazu. 15 Min. köcheln. Mit Reis und Koriander servieren.', tipp:'Auch mit Tofu vegetarisch perfekt' },
  { id:'pasta-bolo', name:'Spaghetti Bolognese', emoji:'🍝', bild:'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=600&q=75', kategorie:'fleisch', kategorieLabel:'Fleischgerichte', dauer:'1.5 Std.', kosten:'≈ 2,50 €', portionen:6, zutaten:['500 g Spaghetti','500 g Hackfleisch','2 Dosen Tomaten','2 Zwiebeln','3 Knoblauchzehen','100 g Speck','100 ml Rotwein','Oregano, Basilikum, Salz','Parmesan'], zubereitung:'Speck, Zwiebel, Knoblauch anbraten. Hack dazu. Mit Wein ablöschen, Tomaten und Gewürze. 60 Min. köcheln. Mit Spaghetti und Parmesan servieren.', tipp:'Lange köcheln macht den Unterschied - 1h ist Minimum' },
  { id:'tortellini-sahne', name:'Tortellini in Sahnesauce', emoji:'🍝', bild:'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&q=75', kategorie:'schnell', kategorieLabel:'Schnell & Einfach', dauer:'15 Min.', kosten:'≈ 2,50 €', portionen:4, zutaten:['500 g Tortellini','200 ml Sahne','100 g Schinkenwürfel','100 g Erbsen (TK)','100 g Parmesan','Petersilie','Salz, Pfeffer'], zubereitung:'Tortellini kochen. Schinken und Erbsen anbraten. Sahne dazu, einkochen. Mit Tortellini, Parmesan und Petersilie servieren.', tipp:'Schnellgericht in 15 Minuten - immer im Vorrat haben' },
  { id:'spinat-lasagne', name:'Spinat-Lasagne', emoji:'🍝', bild:'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=75', kategorie:'vegetarisch', kategorieLabel:'Vegetarisch', dauer:'1 Std.', kosten:'≈ 3,50 €', portionen:6, zutaten:['10 Lasagne-Platten','1 kg Blattspinat','500 ml Béchamel','200 g Mozzarella','100 g Parmesan','Knoblauch','Muskat'], zubereitung:'Spinat dünsten. Béchamel ansetzen. Schichten: Béchamel, Platten, Spinat im Wechsel. Oben Mozzarella und Parmesan. 30 Min. bei 200°C.', tipp:'Mit Pinienkernen und Rosinen nordafrikanisch raffiniert' },
  { id:'gemueseschnitzel', name:'Sellerieschnitzel paniert', emoji:'🥬', bild:'https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=600&q=75', kategorie:'vegetarisch', kategorieLabel:'Vegetarisch', dauer:'30 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['1 großer Knollensellerie','100 g Mehl','3 Eier','150 g Semmelbrösel','Öl','Salz, Pfeffer','Zitrone'], zubereitung:'Sellerie schälen, in Scheiben schneiden, vorkochen 5 Min. Panieren wie Schnitzel. In Öl goldbraun braten. Mit Zitrone servieren.', tipp:'Vegetarische Schnitzel-Alternative - überrascht alle' },

  // ===== KINDERGERICHTE EXTRA =====
  { id:'pommes-selbst', name:'Selbstgemachte Pommes', emoji:'🍟', bild:'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=75', kategorie:'kinder', kategorieLabel:'Kinder-Liebling', dauer:'40 Min.', kosten:'≈ 1,50 €', portionen:4, zutaten:['1 kg Kartoffeln','3 EL Olivenöl','Salz, Paprika','Rosmarin','Ketchup, Mayo'], zubereitung:'Kartoffeln in Stäbchen schneiden, 30 Min. wässern. Trocknen, mit Öl und Gewürzen mischen. Bei 220°C 25 Min. backen, einmal wenden.', tipp:'Mit Kartoffel-Sorte Bintje oder Annabelle - werden besonders knusprig' },
  { id:'kinder-pizza', name:'Mini-Pizza für Kinder', emoji:'🍕', bild:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=75', kategorie:'kinder', kategorieLabel:'Kinder-Liebling', dauer:'25 Min.', kosten:'≈ 1,50 €', portionen:4, zutaten:['1 Pizzateig','200 g Tomatenmark','200 g geriebener Käse','Salami','Schinken','Gemüse zum Belegen','Oregano'], zubereitung:'Teig in 8 Mini-Pizzen ausrollen. Tomatenmark, Belag, Käse. Kinder lieben es selber zu belegen! 12 Min. bei 220°C.', tipp:'Belegen lassen ist Programm und Spaß zugleich' },
  { id:'gemuese-nuggets', name:'Gemüse-Nuggets', emoji:'🥦', bild:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=75', kategorie:'kinder', kategorieLabel:'Kinder-Liebling', dauer:'30 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['1 Brokkoli','2 Karotten','1 Zucchini','100 g Cheddar','2 Eier','100 g Semmelbrösel','Salz, Pfeffer','Öl'], zubereitung:'Gemüse fein hacken, kurz kochen, ausdrücken. Mit Käse, Eiern, Bröseln vermengen. Nuggets formen, in Öl goldbraun braten.', tipp:'Sneak Vegetables in Kinder-Bauch - Pommes-Form macht es leichter' },
  { id:'pancakes-amerikanisch', name:'Amerikanische Pancakes', emoji:'🥞', bild:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=75', kategorie:'kinder', kategorieLabel:'Kinder-Liebling', dauer:'25 Min.', kosten:'≈ 1,00 €', portionen:4, zutaten:['250 g Mehl','3 Eier','300 ml Milch','1 EL Backpulver','3 EL Zucker','1 Prise Salz','Butter','Ahornsirup, Beeren'], zubereitung:'Trockene und feuchte Zutaten getrennt mischen, dann zusammen. Pfanne einfetten, kleine Pancakes braten. Mit Sirup und Beeren servieren.', tipp:'Sonntagmorgen-Hit - Kinder helfen beim Wenden' },
  { id:'haehnchen-nuggets', name:'Hähnchen-Nuggets selbstgemacht', emoji:'🍗', bild:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=75', kategorie:'kinder', kategorieLabel:'Kinder-Liebling', dauer:'25 Min.', kosten:'≈ 2,50 €', portionen:4, zutaten:['600 g Hähnchenbrust','100 g Mehl','3 Eier','150 g Cornflakes','Salz, Pfeffer, Paprika','Öl','Pommes, Ketchup'], zubereitung:'Hähnchen in Würfel. Cornflakes zerbröseln. Hähnchen würzen, panieren in Mehl, Ei, Cornflakes. In heißem Öl braten.', tipp:'Cornflakes sind Geheimtrick für extra Knusprig - viel besser als gekauft' },
  // ===== 30 NEUE REZEPTE =====
  { id:'kaesespaetzle', name:'Käsespätzle', emoji:'🧀', bild:'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutscher Klassiker', dauer:'30 Min.', kosten:'≈ 1,80 €', portionen:4, zutaten:['400 g Spätzle','250 g geriebener Bergkäse','3 Zwiebeln','2 EL Butter','Salz, Pfeffer','Schnittlauch'], zubereitung:'Spätzle nach Packung kochen, abgießen. Zwiebeln in Ringe schneiden und in Butter goldbraun braten. Spätzle und Käse abwechselnd schichten, etwas in der Pfanne erhitzen bis der Käse schmilzt. Mit Röstzwiebeln und Schnittlauch servieren.', tipp:'Mit etwas Schmand wird es noch cremiger' },
  { id:'rouladen', name:'Rinderrouladen klassisch', emoji:'🥩', bild:'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutscher Klassiker', dauer:'2 Std.', kosten:'≈ 4,50 €', portionen:4, zutaten:['4 Rouladen vom Rind','4 EL Senf','8 Scheiben Speck','2 Gewürzgurken','2 Zwiebeln','500 ml Brühe','2 EL Tomatenmark','Salz, Pfeffer','Öl, Mehl zum Andicken'], zubereitung:'Rouladen mit Senf bestreichen, Speck, Gurken- und Zwiebelstreifen drauf, einrollen, mit Garn fixieren. In Öl rundum scharf anbraten. Mit Tomatenmark, Brühe ablöschen, 90 Min. bei niedriger Hitze schmoren. Sauce mit Mehl andicken.', tipp:'Mit Klößen und Rotkohl der ultimative Sonntags-Klassiker' },
  { id:'kartoffelsalat-bayrisch', name:'Bayrischer Kartoffelsalat', emoji:'🥔', bild:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutscher Klassiker', dauer:'40 Min.', kosten:'≈ 1,20 €', portionen:6, zutaten:['1 kg festkochende Kartoffeln','1 Zwiebel','300 ml warme Brühe','5 EL Essig','3 EL Öl','1 TL Senf','Salz, Pfeffer','Schnittlauch'], zubereitung:'Kartoffeln in Schale 20 Min. kochen, pellen, in Scheiben schneiden. Zwiebel fein hacken. Heiße Brühe mit Essig, Öl, Senf, Gewürzen verquirlen, über die noch warmen Kartoffeln gießen. 30 Min. ziehen lassen.', tipp:'Warm serviert mit Bratwürsten — pures Glück' },
  { id:'maultaschen', name:'Maultaschen in Brühe', emoji:'🥟', bild:'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutscher Klassiker', dauer:'15 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['16 Maultaschen','1,5 L Gemüsebrühe','1 Lauchstange','2 Karotten','Schnittlauch','Salz, Pfeffer'], zubereitung:'Brühe aufkochen. Lauch und Karotten in feine Ringe schneiden, 5 Min. mitkochen. Maultaschen einlegen, 8-10 Min. ziehen lassen (nicht kochen!). Mit Schnittlauch servieren.', tipp:'Schwäbische Tradition: dazu Schmelzzwiebeln auf der Seite' },
  { id:'goulasch', name:'Ungarisches Gulasch', emoji:'🍲', bild:'https://images.unsplash.com/photo-1547928576-b822bc410bdf?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutscher Klassiker', dauer:'2 Std.', kosten:'≈ 3,00 €', portionen:6, zutaten:['1 kg Rindergulasch','3 Zwiebeln','3 EL Paprikapulver edelsüß','2 Paprikaschoten','500 ml Brühe','200 ml Tomatensoße','Salz, Pfeffer, Kümmel','Öl'], zubereitung:'Zwiebeln glasig dünsten, Fleisch zugeben und scharf anbraten. Paprikapulver einrühren (nicht verbrennen!). Brühe und Tomatensoße zugießen, Paprikastreifen dazu. 90 Min. bei niedriger Hitze schmoren.', tipp:'Mit Knödeln, Spätzle oder Nudeln — ein Gulasch wärmt die Familie' },
  { id:'risotto-pilze', name:'Pilzrisotto', emoji:'🍄', bild:'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=75', kategorie:'gesund', kategorieLabel:'International', dauer:'35 Min.', kosten:'≈ 2,80 €', portionen:4, zutaten:['300 g Risottoreis','500 g gemischte Pilze','1 Zwiebel','2 Knoblauchzehen','1,2 L heiße Brühe','100 ml Weißwein','80 g Parmesan','2 EL Butter','Petersilie'], zubereitung:'Zwiebel + Knoblauch glasig dünsten. Reis kurz mitrösten, mit Wein ablöschen. Pilze separat anbraten. Heiße Brühe schöpflöffelweise zugeben, ständig rühren. Nach 18 Min. Pilze, Butter, Parmesan unterrühren.', tipp:'Geduld zahlt sich aus - cremig wird es nur mit langsamem Rühren' },
  { id:'lasagne', name:'Klassische Lasagne', emoji:'🍝', bild:'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=75', kategorie:'klassiker', kategorieLabel:'International', dauer:'1 Std.', kosten:'≈ 3,50 €', portionen:6, zutaten:['12 Lasagne-Platten','500 g Rinderhack','2 Dosen Tomaten','1 Zwiebel','2 Knoblauchzehen','500 ml Béchamelsauce','200 g Mozzarella','100 g Parmesan','Italienische Kräuter','Salz, Pfeffer'], zubereitung:'Hack mit Zwiebel und Knoblauch anbraten, Tomaten zugeben, 20 Min. köcheln. In Auflaufform schichten: Sauce, Lasagne, Bolognese, Béchamel — 3-4 Schichten. Oben Käse drüber, 35 Min. bei 180°C backen.', tipp:'Vorabends zubereiten, am nächsten Tag noch besser' },
  { id:'paella', name:'Paella Valenciana', emoji:'🥘', bild:'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=600&q=75', kategorie:'gesund', kategorieLabel:'International', dauer:'1 Std.', kosten:'≈ 5,00 €', portionen:4, zutaten:['300 g Paellareis','400 g Hähnchen','200 g Garnelen','200 g Tintenfischringe','1 Paprika','200 g Erbsen','1 Zwiebel','3 Knoblauchzehen','1 L Brühe','1 Prise Safran','Salz, Olivenöl'], zubereitung:'In großer Pfanne Hähnchen anbraten, dann Meeresfrüchte. Zwiebel + Knoblauch dünsten, Reis dazu, kurz rösten. Brühe mit Safran zugießen. 20 Min. ohne Rühren köcheln, Erbsen + Paprika oben drauf, 5 Min. ruhen lassen.', tipp:'Die Knusperschicht am Boden (Socarrat) ist das Beste' },
  { id:'sushi-bowl', name:'Sushi-Bowl', emoji:'🍣', bild:'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=600&q=75', kategorie:'gesund', kategorieLabel:'Gesund & Leicht', dauer:'25 Min.', kosten:'≈ 4,00 €', portionen:2, zutaten:['200 g Sushi-Reis','200 g Lachs (Sashimi-Qualität)','1 Avocado','1 Karotte','100 g Edamame','1 EL Sesam','4 EL Sojasauce','1 EL Reisessig','Wasabi nach Geschmack'], zubereitung:'Reis nach Packung kochen, mit Reisessig würzen. Lachs in Würfel schneiden, mit Sojasauce marinieren. Avocado und Karotte schneiden. Alles in Schüssel anrichten, mit Sesam bestreuen.', tipp:'Statt Lachs auch geräucherter Tofu — vegan und genauso lecker' },
  { id:'falafel', name:'Falafel mit Hummus', emoji:'🧆', bild:'https://images.unsplash.com/photo-1593504049359-74330189a345?w=600&q=75', kategorie:'gesund', kategorieLabel:'International', dauer:'30 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['400 g Kichererbsen (Dose)','1 Zwiebel','3 Knoblauchzehen','1 Bund Petersilie','2 TL Kreuzkümmel','2 EL Mehl','Salz, Pfeffer','Öl zum Frittieren','200 g Hummus','Pitabrot, Salat, Joghurt'], zubereitung:'Kichererbsen abtropfen, mit Zwiebel, Knoblauch, Petersilie und Gewürzen pürieren. Mehl unterrühren. Bällchen formen, in heißem Öl 4 Min. goldbraun braten. Mit Pitabrot, Hummus, Salat und Joghurt servieren.', tipp:'Statt Frittieren auch im Ofen bei 200°C — gesünder und genauso lecker' },
  { id:'thai-curry', name:'Grünes Thai-Curry', emoji:'🍛', bild:'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=75', kategorie:'gesund', kategorieLabel:'International', dauer:'30 Min.', kosten:'≈ 3,50 €', portionen:4, zutaten:['400 g Hähnchen','2 EL grüne Currypaste','1 Dose Kokosmilch','1 Aubergine','1 Paprika','1 Zucchini','200 g grüne Bohnen','1 EL Fischsauce','1 TL Palmzucker','Thai-Basilikum','250 g Basmatireis'], zubereitung:'Currypaste in Öl anrösten, Hähnchen dazu, kurz braten. Kokosmilch zugießen, Gemüse einlegen. 15 Min. köcheln. Mit Fischsauce + Zucker abschmecken. Mit Basilikum und Reis servieren.', tipp:'Limettenblätter mitkochen — gibt das authentische Aroma' },
  { id:'wraps-haehnchen', name:'Hähnchen-Wraps', emoji:'🌯', bild:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=75', kategorie:'schnell', kategorieLabel:'Schnell & Einfach', dauer:'20 Min.', kosten:'≈ 2,50 €', portionen:4, zutaten:['8 Tortilla-Wraps','400 g Hähnchenbrust','1 Eisbergsalat','2 Tomaten','1 Avocado','100 g Käse','4 EL Joghurt-Dressing','Gewürze (Paprika, Knoblauch)'], zubereitung:'Hähnchen würzen und in Pfanne braten, in Streifen schneiden. Wraps kurz erwärmen. Mit Salat, Tomaten, Avocado, Hähnchen, Käse, Dressing belegen. Einrollen und genießen.', tipp:'Mittwochs lieber Mittwochs-Wraps — Kinder lieben es selbst zu rollen' },
  { id:'gnocchi-spinat', name:'Gnocchi mit Spinat-Sahne', emoji:'🥟', bild:'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=600&q=75', kategorie:'schnell', kategorieLabel:'Schnell & Einfach', dauer:'20 Min.', kosten:'≈ 1,80 €', portionen:4, zutaten:['500 g Gnocchi','400 g Blattspinat','200 ml Sahne','1 Knoblauchzehe','100 g Parmesan','1 Prise Muskat','Salz, Pfeffer','Butter'], zubereitung:'Gnocchi nach Packung kochen. Spinat in Butter mit Knoblauch andünsten. Sahne dazu, einkochen lassen. Mit Muskat, Salz, Pfeffer abschmecken. Gnocchi unterheben, Parmesan drüber.', tipp:'In 20 Min auf dem Tisch — perfekt für stressige Wochenabende' },
  { id:'flammkuchen', name:'Flammkuchen Klassiker', emoji:'🥧', bild:'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutscher Klassiker', dauer:'25 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['2 Rollen Flammkuchen-Teig','200 g Schmand','1 Zwiebel','150 g Speckwürfel','Salz, Pfeffer, Muskat','Schnittlauch'], zubereitung:'Teig auf Backpapier ausrollen. Schmand mit Salz, Pfeffer und Muskat würzen, dünn aufstreichen. Zwiebelringe und Speck verteilen. 12 Min. bei 220°C backen bis Ränder knusprig. Mit Schnittlauch bestreuen.', tipp:'Süße Variante: Apfel + Zimt + Sahne — auch lecker als Dessert' },
  { id:'wok-gemuese', name:'Bunter Gemüse-Wok', emoji:'🥢', bild:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=75', kategorie:'gesund', kategorieLabel:'Gesund & Leicht', dauer:'20 Min.', kosten:'≈ 2,50 €', portionen:4, zutaten:['1 Brokkoli','1 Paprika rot','2 Karotten','100 g Champignons','1 Zwiebel','200 g Reis oder Nudeln','3 EL Sojasauce','2 EL Sesamöl','1 EL Ingwer','2 Knoblauchzehen','Sesam'], zubereitung:'Reis oder Nudeln vorkochen. Gemüse in Streifen schneiden. Im Wok mit Sesamöl, Ingwer, Knoblauch scharf anbraten — von hart nach weich. Sojasauce dazu, kurz schmurgeln. Mit Reis und Sesam servieren.', tipp:'Im Wok bleibt Gemüse knackig — niemals lange kochen' },
  { id:'kartoffelpuffer', name:'Kartoffelpuffer mit Apfelmus', emoji:'🥔', bild:'https://images.unsplash.com/photo-1607103058027-4c5d8e8a7e1f?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutscher Klassiker', dauer:'25 Min.', kosten:'≈ 1,20 €', portionen:4, zutaten:['1 kg Kartoffeln','1 Zwiebel','2 Eier','3 EL Mehl','Salz, Pfeffer, Muskat','Öl zum Braten','Apfelmus'], zubereitung:'Kartoffeln und Zwiebel reiben, in Sieb gut ausdrücken. Mit Eiern, Mehl und Gewürzen vermengen. In heißem Öl portionsweise flache Puffer braten. Mit Apfelmus servieren.', tipp:'Auch süß mit Zucker und Zimt — Kinder lieben beides' },
  { id:'shakshuka', name:'Shakshuka', emoji:'🍳', bild:'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=600&q=75', kategorie:'gesund', kategorieLabel:'International', dauer:'25 Min.', kosten:'≈ 2,00 €', portionen:2, zutaten:['1 Zwiebel','2 Knoblauchzehen','1 Paprika','1 Dose gehackte Tomaten','1 TL Kreuzkümmel','1 TL Paprikapulver','4 Eier','100 g Feta','Petersilie','Brot zum Dippen'], zubereitung:'Zwiebel, Knoblauch und Paprika in Pfanne anbraten. Tomaten und Gewürze zugeben, 10 Min. köcheln. 4 Mulden eindrücken, Eier hineinschlagen. Mit Deckel 5 Min. stocken lassen. Feta drüber, Petersilie.', tipp:'Direkt aus der Pfanne servieren mit frischem Brot' },
  { id:'gemueselasagne', name:'Gemüselasagne vegetarisch', emoji:'🍅', bild:'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&q=75', kategorie:'gesund', kategorieLabel:'Vegetarisch', dauer:'1 Std.', kosten:'≈ 3,00 €', portionen:6, zutaten:['12 Lasagne-Platten','2 Zucchini','1 Aubergine','2 Paprika','500 g Tomatensoße','500 ml Béchamelsauce','200 g Mozzarella','100 g Parmesan','Basilikum','Olivenöl, Knoblauch'], zubereitung:'Gemüse in Scheiben schneiden und kurz anbraten. In Auflaufform schichten: Tomatensoße, Lasagne, Gemüse, Béchamel — 3-4 Schichten. Käse drüber, 35 Min. bei 180°C backen.', tipp:'Spinat dazwischen macht es noch hochwertiger' },
  { id:'ofengemuese', name:'Ofengemüse mit Halloumi', emoji:'🧆', bild:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=75', kategorie:'gesund', kategorieLabel:'Vegetarisch', dauer:'40 Min.', kosten:'≈ 3,00 €', portionen:4, zutaten:['2 Süßkartoffeln','1 Zucchini','1 Paprika','1 rote Zwiebel','250 g Halloumi','3 EL Olivenöl','Rosmarin','Salz, Pfeffer','1 Zitrone'], zubereitung:'Gemüse in mundgerechte Stücke schneiden, mit Öl, Rosmarin, Salz, Pfeffer auf Blech verteilen. 25 Min. bei 200°C. Halloumi würfeln, die letzten 8 Min. mitbacken. Mit Zitronensaft beträufeln.', tipp:'Mit Couscous oder Quinoa als Hauptmahlzeit' },
  { id:'tortellini-sahne', name:'Tortellini in Sahne-Sauce', emoji:'🍝', bild:'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=600&q=75', kategorie:'schnell', kategorieLabel:'Schnell & Einfach', dauer:'15 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['500 g Tortellini','200 ml Sahne','100 g geriebener Parmesan','100 g Spinat','1 Knoblauchzehe','Salz, Pfeffer, Muskat','Butter'], zubereitung:'Tortellini nach Packung kochen. Parallel: Knoblauch in Butter dünsten, Sahne zugeben, Spinat einrühren bis er zusammenfällt. Parmesan dazu. Tortellini unterheben, mit Muskat würzen.', tipp:'Mit gerösteten Pinienkernen — extra Crunch' },
  { id:'haehnchen-curry', name:'Hähnchen-Kokos-Curry', emoji:'🍛', bild:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=75', kategorie:'gesund', kategorieLabel:'International', dauer:'30 Min.', kosten:'≈ 3,50 €', portionen:4, zutaten:['600 g Hähnchen','1 Dose Kokosmilch','2 EL Currypulver mild','1 Zwiebel','2 Knoblauchzehen','1 EL Ingwer','1 Apfel','250 g Reis','Koriander','Salz'], zubereitung:'Zwiebel, Knoblauch, Ingwer anbraten. Curry dazu, kurz rösten. Hähnchen anbraten, Kokosmilch und geriebenen Apfel dazu. 15 Min. köcheln. Mit Reis servieren, Koriander drüber.', tipp:'Mit Mango oder Rosinen wird es süßer und kinderfreundlicher' },
  { id:'caesar-salad', name:'Caesar Salad', emoji:'🥗', bild:'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=75', kategorie:'gesund', kategorieLabel:'Gesund & Leicht', dauer:'20 Min.', kosten:'≈ 3,00 €', portionen:2, zutaten:['1 Romanasalat','2 Hähnchenbrüste','100 g Croutons','50 g Parmesan','3 EL Caesar-Dressing','1 EL Olivenöl','Salz, Pfeffer','Zitrone'], zubereitung:'Hähnchen würzen und braten, in Streifen schneiden. Salat in mundgerechte Stücke. Mit Dressing, Croutons, Hähnchen, Parmesan und Zitrone anrichten.', tipp:'Selbstgemachte Croutons aus altem Brot — schmecken doppelt so gut' },
  { id:'spaghetti-carbonara', name:'Spaghetti Carbonara', emoji:'🍝', bild:'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=75', kategorie:'klassiker', kategorieLabel:'International', dauer:'20 Min.', kosten:'≈ 2,50 €', portionen:4, zutaten:['500 g Spaghetti','200 g Pancetta oder Speck','4 Eigelb','100 g Pecorino oder Parmesan','Schwarzer Pfeffer','Salz'], zubereitung:'Spaghetti kochen. Speck knusprig braten. Eigelb mit Käse und viel Pfeffer verquirlen. Heiße Spaghetti vom Herd nehmen, Speck und Ei-Käse-Mischung schnell unterheben. Restwärme bindet die Sauce.', tipp:'KEINE Sahne in echter Carbonara — die Italiener weinen sonst' },
  { id:'kuerbissuppe', name:'Kürbissuppe', emoji:'🎃', bild:'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&q=75', kategorie:'gesund', kategorieLabel:'Gesund & Leicht', dauer:'40 Min.', kosten:'≈ 2,50 €', portionen:6, zutaten:['1 Hokkaido-Kürbis (ca. 1 kg)','1 Zwiebel','2 Karotten','1 Ingwer-Stück','200 ml Kokosmilch','1 L Brühe','Salz, Pfeffer','Kürbiskerne','Kürbiskernöl'], zubereitung:'Kürbis (Hokkaido mit Schale!) würfeln. Mit Zwiebel, Karotten und Ingwer in Brühe 25 Min. köcheln. Pürieren, Kokosmilch zugeben. Mit Kürbiskernen + Öl servieren.', tipp:'Mit etwas Curry oder Chili wird es würziger' },
  { id:'gefuellte-paprika', name:'Gefüllte Paprika', emoji:'🫑', bild:'https://images.unsplash.com/photo-1604908554049-1e75dad9a83c?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutscher Klassiker', dauer:'1 Std.', kosten:'≈ 2,50 €', portionen:4, zutaten:['4 große Paprika','500 g Hackfleisch','150 g Reis','1 Zwiebel','1 Ei','500 ml Tomatensoße','Salz, Pfeffer, Paprikapulver'], zubereitung:'Reis halb gar kochen. Hack mit Zwiebel, Ei, Reis und Gewürzen mischen. Paprika oben aufschneiden, entkernen, mit Masse füllen. In Auflaufform stellen, Tomatensoße angießen, 50 Min. bei 180°C backen.', tipp:'Mit Mozzarella obendrauf die letzten 10 Min. — gratiniert perfekt' },
  { id:'fischstaebchen-selbst', name:'Fischstäbchen selbstgemacht', emoji:'🐟', bild:'https://images.unsplash.com/photo-1604908550665-65b8fdc70ee2?w=600&q=75', kategorie:'kinder', kategorieLabel:'Kinder-Liebling', dauer:'25 Min.', kosten:'≈ 3,00 €', portionen:4, zutaten:['600 g Kabeljau- oder Seelachsfilet','3 Eier','150 g Semmelbrösel','100 g Mehl','Salz, Pfeffer, Zitrone','Öl zum Braten','Kartoffeln, Erbsen'], zubereitung:'Fisch in fingerdicke Streifen schneiden, würzen, mit Zitronensaft beträufeln. In Mehl, Ei, Bröseln panieren. In Pfanne in Öl von beiden Seiten 3 Min. braten. Mit Kartoffeln und Erbsen servieren.', tipp:'Frischer Fisch + selbstgemacht = doppelter Geschmack vs. Tiefkühl' },
  { id:'milchreis', name:'Klassischer Milchreis', emoji:'🍚', bild:'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=600&q=75', kategorie:'kinder', kategorieLabel:'Kinder-Liebling', dauer:'40 Min.', kosten:'≈ 1,00 €', portionen:4, zutaten:['200 g Milchreis','1 L Milch','50 g Zucker','1 Vanilleschote','1 Prise Salz','Zimt und Zucker','Kirschen oder Apfelmus'], zubereitung:'Milch mit Vanille aufkochen. Milchreis und Zucker zugeben. Unter gelegentlichem Rühren 30 Min. quellen lassen. Mit Zimt und Zucker oder Kompott servieren.', tipp:'Kindheits-Erinnerung pur — Restmilch wird am nächsten Tag noch besser' },
  { id:'apfelkuchen', name:'Versunkener Apfelkuchen', emoji:'🍎', bild:'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600&q=75', kategorie:'kinder', kategorieLabel:'Backen', dauer:'1 Std.', kosten:'≈ 2,00 €', portionen:12, zutaten:['250 g Butter','200 g Zucker','4 Eier','250 g Mehl','1 Päckchen Backpulver','1 kg Äpfel','Zimt, Zucker','Puderzucker'], zubereitung:'Butter und Zucker schaumig rühren. Eier einzeln einrühren. Mehl mit Backpulver dazu. In gefettete Springform geben. Äpfel schälen, achteln, in Teig drücken. Mit Zimtzucker bestreuen. 50 Min. bei 175°C backen.', tipp:'Mit Sahne oder Vanilleeis — sonntags ein Familien-Highlight' },
  { id:'reis-pfanne', name:'Reis-Pfanne mit Gemüse', emoji:'🍚', bild:'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=75', kategorie:'schnell', kategorieLabel:'Schnell & Einfach', dauer:'20 Min.', kosten:'≈ 1,80 €', portionen:4, zutaten:['250 g Reis','400 g Hähnchen','1 Paprika','1 Zucchini','100 g Erbsen','1 Zwiebel','2 Knoblauchzehen','Sojasauce','Curry, Salz, Öl'], zubereitung:'Reis kochen. Hähnchen würfeln und in Pfanne braten. Zwiebel, Knoblauch dazu, dann Gemüse. Mit Curry würzen. Reis untermischen, Sojasauce drüber, kurz mitbraten.', tipp:'Reste vom Vortag perfekt verwerten — auch mit Erbsen aus Konserve' },
  { id:'salat-bowl', name:'Bunte Salat-Bowl', emoji:'🥗', bild:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=75', kategorie:'gesund', kategorieLabel:'Gesund & Leicht', dauer:'15 Min.', kosten:'≈ 2,50 €', portionen:2, zutaten:['100 g Salat (Rucola, Spinat)','100 g Quinoa','1 Avocado','1 Karotte','100 g Cherry-Tomaten','100 g Feta','30 g Walnüsse','3 EL Olivenöl','1 EL Balsamico','Salz, Pfeffer'], zubereitung:'Quinoa nach Packung kochen, abkühlen. Salat in Schüssel, alle Zutaten anrichten. Mit Dressing aus Öl, Essig, Salz, Pfeffer übergießen.', tipp:'Perfekt vorzubereiten — hält in Tupperdose 1 Tag im Kühlschrank' },
  { id:'frikadellen-pueree', name:'Frikadellen mit Kartoffelpüree', emoji:'🍴', bild:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutsche Küche', dauer:'40 Min.', kosten:'≈ 2,20 €', portionen:4, zutaten:['500 g Hackfleisch gemischt','1 altes Brötchen','1 Zwiebel','1 Ei','1 kg Kartoffeln','200 ml Milch','30 g Butter','Salz, Pfeffer, Senf, Muskat','Öl zum Braten'], zubereitung:'Brötchen in Wasser einweichen und ausdrücken. Mit Hack, geriebener Zwiebel, Ei, Salz, Pfeffer und Senf verkneten. Flache Frikadellen formen und in Öl 4–5 Min. pro Seite braten. Kartoffeln kochen, mit Milch, Butter und Muskat zu Püree stampfen.', tipp:'Doppelte Menge Frikadellen machen — kalt aufs Brot sind sie ein Hit fürs Pausenbrot.' },
  { id:'kartoffelpuffer', name:'Kartoffelpuffer mit Apfelmus', emoji:'🥔', bild:'https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutsche Küche', dauer:'35 Min.', kosten:'≈ 1,20 €', portionen:4, zutaten:['1 kg Kartoffeln','1 Zwiebel','2 Eier','3 EL Mehl','Salz, Muskat','Öl zum Braten','Apfelmus zum Servieren'], zubereitung:'Kartoffeln und Zwiebel fein reiben, die Flüssigkeit gut ausdrücken. Mit Eiern, Mehl, Salz und Muskat mischen. Portionsweise als flache Puffer in heißem Öl goldbraun braten. Mit Apfelmus servieren.', tipp:'Geriebene Kartoffeln sofort verarbeiten, sonst werden sie braun.' },
  { id:'bratkartoffeln-ei', name:'Bratkartoffeln mit Spiegelei', emoji:'🍳', bild:'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutsche Küche', dauer:'30 Min.', kosten:'≈ 1,00 €', portionen:2, zutaten:['600 g festkochende Kartoffeln','1 Zwiebel','100 g Speckwürfel','4 Eier','Salz, Pfeffer','Öl und Butter'], zubereitung:'Kartoffeln am Vortag kochen, pellen und in Scheiben schneiden. In Öl knusprig braten, Zwiebel und Speck zugeben und würzen. In einer zweiten Pfanne Spiegeleier braten und auf die Bratkartoffeln legen.', tipp:'Am besten gelingen Bratkartoffeln aus Kartoffeln vom Vortag — sie zerfallen dann nicht.' },
  { id:'linseneintopf', name:'Linseneintopf mit Würstchen', emoji:'🍲', bild:'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutsche Küche', dauer:'50 Min.', kosten:'≈ 1,10 €', portionen:6, zutaten:['400 g Tellerlinsen','2 Karotten','2 Kartoffeln','1 Stange Lauch','1 Zwiebel','1,5 l Gemüsebrühe','2 EL Essig','4 Wiener Würstchen','Salz, Pfeffer, Lorbeerblatt'], zubereitung:'Zwiebel anschwitzen, das gewürfelte Gemüse zugeben. Linsen und Brühe dazugeben und mit Lorbeer 35–40 Min. weich köcheln. Mit Salz, Pfeffer und einem Schuss Essig abschmecken. Würstchen in Scheiben kurz miterwärmen.', tipp:'Der Schuss Essig am Ende macht den typischen Geschmack — nicht weglassen.' },
  { id:'kaesespaetzle', name:'Käsespätzle mit Röstzwiebeln', emoji:'🧀', bild:'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutsche Küche', dauer:'30 Min.', kosten:'≈ 2,00 €', portionen:4, zutaten:['500 g Spätzle','250 g geriebener Bergkäse','2 Zwiebeln','40 g Butter','Salz, Pfeffer, Muskat','Schnittlauch'], zubereitung:'Spätzle in Salzwasser kochen oder fertige nehmen. Zwiebeln in Butter langsam goldbraun rösten. Spätzle abwechselnd mit Käse in eine Schüssel schichten, sodass der Käse schmilzt. Mit Röstzwiebeln und Schnittlauch bestreuen.', tipp:'Schichtweise heiß arbeiten — so zieht der Käse schöne Fäden.' },
  { id:'erbseneintopf', name:'Deftiger Erbseneintopf', emoji:'🥣', bild:'https://images.unsplash.com/photo-1547308283-b941de5747bf?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutsche Küche', dauer:'1 Std.', kosten:'≈ 1,00 €', portionen:6, zutaten:['400 g getrocknete Schälerbsen','3 Kartoffeln','2 Karotten','1 Zwiebel','1,5 l Brühe','4 Würstchen','Salz, Pfeffer, Majoran'], zubereitung:'Erbsen nach Packungsangabe gegebenenfalls einweichen. Zwiebel anschwitzen, das gewürfelte Gemüse und die Erbsen zugeben und mit Brühe 45–60 Min. weich kochen. Würzen und die Würstchen-Scheiben unterheben.', tipp:'Am zweiten Tag schmeckt der Eintopf noch kräftiger — gut zum Vorkochen.' },
  { id:'haehnchengeschnetzeltes', name:'Hähnchengeschnetzeltes mit Reis', emoji:'🍛', bild:'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutsche Küche', dauer:'25 Min.', kosten:'≈ 2,60 €', portionen:4, zutaten:['600 g Hähnchenbrust','250 g Champignons','1 Zwiebel','200 ml Sahne','100 ml Brühe','250 g Reis','Salz, Pfeffer, Paprikapulver','Öl'], zubereitung:'Reis kochen. Hähnchen in Streifen scharf anbraten und herausnehmen. Zwiebel und Pilze anbraten, Sahne und Brühe angießen und kurz einkochen. Das Hähnchen zurück in die Sauce geben und würzen. Mit Reis servieren.', tipp:'Statt Sahne geht auch Schmand — die Sauce wird dann feiner säuerlich.' },
  { id:'griessbrei', name:'Grießbrei mit Beeren', emoji:'🥣', bild:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=75', kategorie:'klassiker', kategorieLabel:'Deutsche Küche', dauer:'15 Min.', kosten:'≈ 0,90 €', portionen:4, zutaten:['1 l Milch','120 g Weichweizengrieß','40 g Zucker','1 Prise Salz','1 Päckchen Vanillezucker','200 g Beeren','Zimt und Zucker'], zubereitung:'Milch mit Zucker, Vanillezucker und Salz aufkochen. Den Grieß unter Rühren einrieseln lassen, kurz aufkochen und dann bei kleiner Hitze 5 Min. quellen lassen. Mit Beeren und Zimtzucker servieren.', tipp:'Ständig rühren, sonst klumpt der Grieß — Kinder lieben ihn warm.' }
];

const CATERING_PORTALE = [
  { name:'Caterwings', url:'https://www.caterwings.de', emoji:'🎉', beschreibung:'Deutschlands größtes Catering-Portal — lokale Caterer vergleichen und direkt buchen. Transparent und einfach.', tipp:'3–4 Angebote einholen und vergleichen. Mind. 2 Wochen vorher buchen!' },
  { name:'REWE Partyservice', url:'https://www.rewe.de/service/partyservice/', emoji:'🛒', beschreibung:'Fertige Partyplatten, Fingerfood und Buffets direkt vom REWE — günstig, zuverlässig und ohne Stress.', tipp:'Partyplatten ab ~8 € / Person. 3 Tage vorher im Markt bestellen!' },
  { name:'EDEKA Catering', url:'https://www.edeka.de/service/catering/', emoji:'🟡', beschreibung:'EDEKA-Partyservice mit Platten, Fingerfood und Getränkepaketen für Feiern aller Größen.', tipp:'Preise direkt beim regionalen EDEKA-Markt anfragen — oft günstiger!' },
  { name:'Yelp — Lokale Caterer', url:'https://www.yelp.de/search?find_desc=Catering', emoji:'⭐', beschreibung:'Bewertungen und Kontakte lokaler Caterer finden — ideal für persönliche Empfehlungen.', tipp:'Filter: Ihre Stadt + Bewertung min. 4 Sterne — so finden Sie gute Caterer!' },
  { name:'Kleinanzeigen — Günstige Caterer', url:'https://www.kleinanzeigen.de/s-catering/', emoji:'📋', beschreibung:'Private und kleine Caterer auf Kleinanzeigen — oft sehr günstig und flexibel für kleine Feiern.', tipp:'Ideal für 10–25 Personen und kleines Budget — persönlich nachfragen!' },
  { name:'Foodora / lieferando Catering', url:'https://www.lieferando.de', emoji:'📦', beschreibung:'Viele Restaurants bieten auch Catering für Gruppen an — Kontakt direkt über das Portal.', tipp:'Lieblingsrestaurant anschreiben: viele bieten Gruppen-Rabatte an!' }
];

const KRANKENKASSE_LEISTUNGEN = [
  {
    name: 'Kinderkrankentage (§45 SGB V)',
    emoji: '🤒',
    anspruch: '30 Tage / Kind / Jahr',
    farbe: '#DC2626',
    beschreibung: 'Als Alleinerziehende haben Sie 30 Kinderkrankentage pro Kind und Jahr Anspruch (Paare nur 10). Wenn Ihr Kind krank ist, zahlt die Kasse ~90 % des Nettogehalts.',
    wie: '1. Kinderarzt aufsuchen → Attest für Kinderkrankengeld ausstellen lassen. 2. Beim Arbeitgeber einreichen. 3. Krankenasse zahlt automatisch.',
    wichtig: true
  },
  {
    name: 'Mutter-Kind-Kur / Väterkur',
    emoji: '🌿',
    anspruch: '3–5 Wochen, alle 4 Jahre',
    farbe: '#059669',
    beschreibung: 'Stationäre Vorsorge-/Reha-Maßnahme für erschöpfte Eltern. Die Krankenkasse übernimmt fast alle Kosten. Kinder können mitgenommen werden!',
    wie: '1. Hausarzt um Antrag bitten. 2. Oder direkt bei der Krankenkasse beantragen. 3. Anerkannte Kliniken: muettergenesung.de.',
    wichtig: true
  },
  {
    name: 'Haushaltshilfe (§38 SGB V)',
    emoji: '🏠',
    anspruch: 'Bei Krankenhausaufenthalt / schwerer Erkrankung',
    farbe: '#7C3AED',
    beschreibung: 'Wenn Sie ins Krankenhaus müssen oder schwer erkrankt sind, übernimmt die Kasse eine Haushaltshilfe — damit Ihre Kinder weiter versorgt werden.',
    wie: '1. Ärztliche Bescheinigung ausstellen lassen. 2. Antrag bei Ihrer Krankenkasse stellen. 3. Bewilligung kommt meist schnell.',
    wichtig: true
  },
  {
    name: 'Sehhilfe für Kinder (bis 18 Jahre)',
    emoji: '👓',
    anspruch: 'Bis 18. Lebensjahr kostenlos',
    farbe: '#2563EB',
    beschreibung: 'Brillen und Kontaktlinsen für Kinder bis 18 Jahre werden von der gesetzlichen Krankenkasse bezahlt. Die Festbeträge decken einfache Gläser vollständig.',
    wie: '1. Augenärztliches Rezept holen. 2. Brillenladen aufsuchen. 3. Direkt mit Krankenversicherungskarte abrechnen.',
    wichtig: false
  },
  {
    name: 'Zahnspange für Kinder (bis 18 J.)',
    emoji: '🦷',
    anspruch: 'Bei med. Notwendigkeit (KIG 3–5)',
    farbe: '#D97706',
    beschreibung: 'Kieferorthopädische Behandlung wird für Kinder bis 18 Jahre vollständig übernommen, wenn eine ärztliche Indikation vorliegt.',
    wie: '1. Kieferorthopäden aufsuchen → KIG-Einstufung. 2. Krankenkasse genehmigt. 3. Behandlung vollständig übernommen.',
    wichtig: false
  },
  {
    name: 'Mutterschaftsgeld',
    emoji: '🍼',
    anspruch: '6 Wochen vor + 8 Wochen nach Geburt',
    farbe: '#EC4899',
    beschreibung: 'Während des Mutterschutzes zahlt die Krankenkasse Mutterschaftsgeld. Der Arbeitgeber stockt auf das reguläre Nettogehalt auf.',
    wie: '1. Ärztliches Attest über errechneten Geburtstermin einholen. 2. Bei der Krankenkasse Antrag stellen. 3. Auszahlung beginnt 6 Wochen vor dem Termin.',
    wichtig: false
  }
];

const CHECKLISTEN_DATEN = {
  reise: {
    titel: '✈️ Reise-Checkliste',
    farbe: '#2563EB',
    bg: '#DBEAFE',
    items: [
      'Personalausweis / Reisepass (für alle)',
      'Krankenversicherungskarte (EHIC für EU-Reisen)',
      'Reiseapotheke (Pflaster, Fieberthermometer, Schmerzmittel)',
      'Kindermedikamente (Fiebersaft, Nasenspray etc.)',
      'Sonnencreme SPF 30+',
      'Mückenschutz / Insektenspray',
      'Lieblingsschmusetier / Kuscheldecke',
      'Tablet / Handy mit geladenen Spielen & Filmen',
      'Kinderkopfhörer',
      'Snacks und Getränke für unterwegs',
      'Wechselkleidung (mind. 2 Sets extra)',
      'Badesachen & Handtücher',
      'Schlafzeug (Pyjama, ggf. Wärmedecke)',
      'Ladekabel & Powerbank',
      'Hotel-/Unterkunft-Buchungsbestätigung',
      'Fahrkarten / Flugtickets ausgedruckt',
      'Notfallnummern notiert (auch ausgedruckt)',
      'Bargeld (Kleingeld für Automaten, Trinkgeld)'
    ]
  },
  einschulung: {
    titel: '🎒 Einschulung — Checkliste',
    farbe: '#D97706',
    bg: '#FEF3C7',
    items: [
      'Schultüte / Zuckertüte befüllt',
      'Schulranzen / Rucksack (DIN-geprüft)',
      'Sportbeutel (für Schulsport)',
      'Federmappe mit Buntstiften',
      'Bleistifte (HB und 2B)',
      'Radiergummi',
      'Anspitzer',
      'Lineal (30 cm)',
      'Schere (kindersicher)',
      'Klebestift',
      'Hefte (liniert + kariert + blanko)',
      'Schreibblock DIN A4',
      'Brotdose (auslaufsicher, beschriftet)',
      'Trinkflasche (beschriftet)',
      'Turnschuhe für Sporthalle (helle Sohle)',
      'Regenjacke und Gummistiefel',
      'Hausschuhe für die Schule',
      'Schulbücher abgeholt und beschriftet',
      'Schülerausweis-Fotos (3 Stück)',
      'Schulanmeldebestätigung sicher aufbewahrt',
      'Lernmittelfreiheit / Erstattung beim Schulamt prüfen'
    ]
  },
  kita: {
    titel: '🏫 Kita-Start — Checkliste',
    farbe: '#059669',
    bg: '#D1FAE5',
    items: [
      'Wechselkleidung (mind. 3 Sets, alle beschriftet)',
      'Matschkleidung / Regenanzug (beschriftet)',
      'Gummistiefel (beschriftet)',
      'Hausschuhe / Schläppchen (beschriftet)',
      'Lieblingsschmusetier / Kuscheldecke',
      'Windeln & Feuchttücher (für Krippenkinder)',
      'Wund- und Sonnenschutzcreme (nach Absprache)',
      'Trinkflasche (beschriftet)',
      'Brotdose oder Frühstück verpackt',
      'Schlafsack / Bettwäsche (je nach Kita)',
      'Impfausweis-Kopie eingereicht',
      'Betreuungsvertrag unterschrieben',
      'SEPA-Mandat für Kita-Gebühren eingereicht',
      'Eingewöhnungsplan mit Erzieherin besprochen',
      'Notfallkontakte bei der Kita hinterlegt',
      'Allergien / Unverträglichkeiten schriftlich mitgeteilt',
      'Erste-Hilfe-Einwilligung unterschrieben',
      'Abholberechtigte Personen schriftlich gemeldet',
      'Antrag auf Kita-Beitragsbefreiung gestellt (falls möglich)',
      'Bildungs- und Teilhabe-Leistungen für Mittagessen beantragt'
    ]
  }
};

// ===== FIT / GESUNDE REZEPTE (mit Portionen-Umrechner) =====
const FIT_REZEPTE = [
  { id:'fit-bowl', name:'Power-Bowl mit Quinoa', bild:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=75', kategorie:'fit', kategorieLabel:'💪 Fitness', dauer:'20 Min.', kosten:'≈ 2,50 €', portionen:2, zutaten:['100 g Quinoa','1 Süßkartoffel','100 g Spinat','1 Hähnchenbrust','1/2 Avocado','30 g Granatapfel','2 EL Tahin','1 EL Zitronensaft','Salz, Pfeffer'], zubereitung:'Quinoa nach Packung kochen. Süßkartoffel würfeln, in Olivenöl 20 Min braten. Hähnchen in Streifen, ebenfalls braten. Spinat in Schüssel, alles drauf, mit Tahin-Zitrone übergießen.', tipp:'Am Wochenende vorbereiten, 3 Tage haltbar' },
  { id:'fit-haehnchen', name:'Mageres Hähnchen mit Brokkoli', bild:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=75', kategorie:'fit', kategorieLabel:'💪 Fitness', dauer:'25 Min.', kosten:'≈ 2,80 €', portionen:2, zutaten:['2 Hähnchenbrüste','1 Brokkoli','100 g brauner Reis','2 EL Olivenöl','1 Zitrone','2 Knoblauchzehen','Salz, Pfeffer'], zubereitung:'Reis nach Packung kochen. Hähnchen mit Knoblauch in Pfanne braten. Brokkoli 5 Min dämpfen. Alles anrichten, mit Zitrone beträufeln.', tipp:'Wenig Fett, viel Protein — perfekt nach Training' },
  { id:'fit-overnight', name:'Overnight Oats mit Beeren', bild:'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600&q=75', kategorie:'fit', kategorieLabel:'💪 Fitness', dauer:'5 Min. + Nacht', kosten:'≈ 1,20 €', portionen:1, zutaten:['50 g Haferflocken','200 ml Magermilch oder Mandelmilch','1 EL Chiasamen','100 g Beeren','1 EL Honig','10 g Nüsse'], zubereitung:'Hafer, Milch, Chia in Glas mischen. Über Nacht in Kühlschrank. Morgens Beeren, Honig und Nüsse oben drauf.', tipp:'Perfekt zum Abnehmen — sättigt lange' },
  { id:'fit-lachs', name:'Lachs mit Spargel', bild:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=75', kategorie:'fit', kategorieLabel:'💪 Fitness', dauer:'25 Min.', kosten:'≈ 4,50 €', portionen:2, zutaten:['2 Lachsfilets','500 g grüner Spargel','2 EL Olivenöl','1 Zitrone','Salz, Pfeffer','frischer Dill'], zubereitung:'Spargel waschen, Holzige Enden ab. In Pfanne 8 Min braten. Lachs würzen, in zweiter Pfanne 4 Min pro Seite. Mit Zitrone und Dill servieren.', tipp:'Omega-3, Low-Carb, sättigend' },
  { id:'fit-suppe', name:'Detox-Gemüsesuppe', bild:'https://images.unsplash.com/photo-1547308283-b941de5747bf?w=600&q=75', kategorie:'gesund', kategorieLabel:'🥦 Gesund', dauer:'30 Min.', kosten:'≈ 1,50 €', portionen:6, zutaten:['4 Karotten','3 Selleriestangen','2 Lauchstangen','1 Bund Petersilie','30 g Ingwer','1 TL Kurkuma','1,5 L Gemüsebrühe','Salz, Pfeffer'], zubereitung:'Gemüse waschen, klein schneiden. In Topf mit Brühe + Ingwer + Kurkuma 25 Min köcheln. Mit Petersilie bestreuen.', tipp:'Entgiftend, kalorienarm — 6 Portionen für die Woche' },
  { id:'fit-salat', name:'Eiweiß-Salat mit Ei und Avocado', bild:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=75', kategorie:'fit', kategorieLabel:'💪 Fitness', dauer:'15 Min.', kosten:'≈ 2,80 €', portionen:2, zutaten:['200 g Spinat','4 Eier','1 Avocado','200 g Cherry-Tomaten','1 Hähnchenbrust','30 g Walnüsse','3 EL Olivenöl','1 EL Balsamico'], zubereitung:'Eier 8 Min kochen. Hähnchen in Streifen braten. Spinat in Schüssel, alles drauf, mit Öl + Essig anmachen.', tipp:'Low Carb, High Protein — sättigt bis abends' },
  { id:'fit-zoodles', name:'Zoodles mit Garnelen', bild:'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&q=75', kategorie:'fit', kategorieLabel:'💪 Fitness', dauer:'15 Min.', kosten:'≈ 4,00 €', portionen:2, zutaten:['3 Zucchini','200 g Garnelen','3 Knoblauchzehen','200 g Cherry-Tomaten','2 EL Olivenöl','Petersilie','Salz, Pfeffer'], zubereitung:'Zucchini mit Spiralschneider zu Spaghetti machen. Garnelen mit Knoblauch in Öl 4 Min braten. Tomaten dazu. Zoodles 2 Min unterheben.', tipp:'Kohlenhydratarm, schmeckt wie Pasta' },
  { id:'fit-smoothie', name:'Grüner Power-Smoothie', bild:'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&q=75', kategorie:'gesund', kategorieLabel:'🥦 Gesund', dauer:'5 Min.', kosten:'≈ 1,80 €', portionen:1, zutaten:['100 g Spinat','1 Banane','1 Apfel','1 Selleriestange','20 g Ingwer','1 Zitrone','1 EL Chiasamen','200 ml Wasser'], zubereitung:'Alles in den Mixer geben, 1 Min mixen. Direkt trinken.', tipp:'Vitamin-Bombe — perfekt am Morgen' },
  { id:'fit-buddha', name:'Buddha-Bowl Vegan', bild:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=75', kategorie:'gesund', kategorieLabel:'🥦 Gesund', dauer:'30 Min.', kosten:'≈ 2,20 €', portionen:2, zutaten:['100 g Hirse','200 g Kichererbsen','1 Karotte','1 Avocado','100 g Rotkohl','1 Süßkartoffel','3 EL Hummus','2 EL Tahin-Sauce'], zubereitung:'Hirse kochen. Süßkartoffel würfeln, im Ofen 20 Min bei 200°C. Kichererbsen kurz braten. Alles in Schüssel anrichten, mit Hummus und Sauce.', tipp:'Vegan, glutenfrei, gut für die Darmflora' },
  { id:'fit-omelett', name:'Spinat-Feta-Omelett', bild:'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=75', kategorie:'fit', kategorieLabel:'💪 Fitness', dauer:'10 Min.', kosten:'≈ 1,80 €', portionen:1, zutaten:['3 Eier','50 g Spinat','30 g Feta','1 EL Olivenöl','Salz, Pfeffer'], zubereitung:'Eier verquirlen, Spinat unterheben. In Pfanne mit Öl gießen, Feta drüber. 5 Min auf mittlerer Stufe braten.', tipp:'Perfektes Eiweiß-Frühstück, sehr sättigend' },
  { id:'fit-linsen', name:'Rote-Linsen-Curry', bild:'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=75', kategorie:'gesund', kategorieLabel:'🥦 Gesund', dauer:'25 Min.', kosten:'≈ 1,80 €', portionen:4, zutaten:['250 g rote Linsen','1 Dose Kokosmilch','1 Zwiebel','2 Knoblauchzehen','1 EL Currypaste','1 Dose gehackte Tomaten','Salz','200 g Reis'], zubereitung:'Zwiebel und Knoblauch dünsten. Currypaste anrösten. Linsen, Tomaten, Kokosmilch dazu. 20 Min köcheln. Mit Reis servieren.', tipp:'Vegan, gut für die Familie, sehr günstig' },
  { id:'fit-quark', name:'Quark mit Beeren und Nüssen', bild:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=75', kategorie:'fit', kategorieLabel:'💪 Fitness', dauer:'5 Min.', kosten:'≈ 1,50 €', portionen:1, zutaten:['250 g Magerquark','100 g Beeren','20 g Nüsse','1 EL Honig','1 TL Chia'], zubereitung:'Quark in Schüssel. Beeren, Nüsse, Honig und Chia oben drauf. Fertig.', tipp:'25 g Protein, perfekt nach Sport' }
];
