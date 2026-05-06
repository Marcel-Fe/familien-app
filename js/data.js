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
    kategorie: 'Telefonberatung',
    emoji: '📞',
    stellen: [
      { name: 'Familientelefon', tel: '0800 111 0 550', url: 'https://www.nummergegenkummer.de', beschreibung: 'Kostenlos, 24/7, anonym — für alle Familienfragen', kostenlos: true },
      { name: 'Telefonseelsorge', tel: '0800 111 0 111', url: 'https://www.telefonseelsorge.de', beschreibung: 'Seelische Unterstützung in schwierigen Situationen', kostenlos: true },
      { name: 'Bürgertelefon Bundesregierung', tel: '115', url: 'https://www.115.de', beschreibung: 'Fragen zu Behörden, Formularen und Leistungen', kostenlos: true }
    ]
  },
  {
    kategorie: 'Online-Beratung',
    emoji: '💻',
    stellen: [
      { name: 'Bundesfamilienportal', tel: null, url: 'https://www.familienportal.de', beschreibung: 'Alle Familienleistungen des Bundes im Überblick', kostenlos: true },
      { name: 'Alleinerziehende Hilfe', tel: null, url: 'https://www.vamv.de', beschreibung: 'Verband alleinerziehender Mütter und Väter — Beratung & Vernetzung', kostenlos: true },
      { name: 'Zuschuss.de', tel: null, url: 'https://www.zuschuss.de', beschreibung: 'Förderdatenbank für Familien und Alleinerziehende', kostenlos: true }
    ]
  },
  {
    kategorie: 'Rechtliche Beratung',
    emoji: '⚖️',
    stellen: [
      { name: 'Beratungshilfe (kostenlose Rechtsberatung)', tel: null, url: 'https://www.bmj.de/beratungshilfe', beschreibung: 'Bei geringem Einkommen: kostenlose Rechtsberatung beim Anwalt', kostenlos: true },
      { name: 'VdK Sozialrechtsberatung', tel: null, url: 'https://www.vdk.de/beratung', beschreibung: 'Beratung zu Sozialrecht, Widersprüchen und Klagen', kostenlos: false },
      { name: 'Caritas Rechts- & Sozialberatung', tel: null, url: 'https://www.caritas.de/beratungsangebote', beschreibung: 'Kostenlose Sozialberatung in vielen Städten', kostenlos: true }
    ]
  },
  {
    kategorie: 'Lokale Beratung',
    emoji: '🏘️',
    stellen: [
      { name: 'AWO (Arbeiterwohlfahrt)', tel: null, url: 'https://www.awo.org', beschreibung: 'Familien- und Sozialberatung vor Ort, deutschlandweit', kostenlos: true },
      { name: 'Caritas', tel: null, url: 'https://www.caritas.de', beschreibung: 'Beratung und praktische Hilfe für Familien in Not', kostenlos: true },
      { name: 'Diakonie', tel: null, url: 'https://www.diakonie.de', beschreibung: 'Evangelische Sozialberatung — auch für Nicht-Mitglieder', kostenlos: true },
      { name: 'Mütterzentren', tel: null, url: 'https://www.muetterzentren-bv.de', beschreibung: 'Treffpunkte für Mütter und Familien, Beratung, Gemeinschaft', kostenlos: true }
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

// Spritpreise-Portale
const SPRIT_PORTALE = [
  {
    name: 'clever-tanken.de',
    url: 'https://www.clever-tanken.de',
    emoji: '⛽',
    beschreibung: 'Günstigste Tankstellen in Ihrer Nähe — PLZ eingeben und sofort Preise vergleichen. Sehr einfach zu bedienen.',
    tipp: 'Dienstags und Mittwochs tanken ist in Deutschland meist am günstigsten (lt. ADAC-Statistik)'
  },
  {
    name: 'Tankerkönig',
    url: 'https://www.tankerkoenig.de',
    emoji: '👑',
    beschreibung: 'Echtzeit-Spritpreise auf interaktiver Karte — alle Tankstellen in Deutschland mit aktuellen Preisen.',
    tipp: 'Morgens 6–9 Uhr und abends ab 18 Uhr sind Spritpreise meist am niedrigsten'
  },
  {
    name: 'ADAC Spritpreise',
    url: 'https://www.adac.de/tanken-reise-urlaub/tanken/kraftstoff-preise/',
    emoji: '🚗',
    beschreibung: 'ADAC-Übersicht über aktuelle Spritpreise und Tipps wann und wo Sie am günstigsten tanken.',
    tipp: 'Laut ADAC: 5–10 km Umweg lohnt sich ab 3 Cent/Liter Unterschied bei 50-Liter-Tank'
  },
  {
    name: 'mehr-tanken.de',
    url: 'https://www.mehr-tanken.de',
    emoji: '📊',
    beschreibung: 'Preisverlauf und Tankzeitpunkt-Empfehlung — zeigt wann Sie am günstigsten tanken sollten.',
    tipp: 'Preisvorhersage nutzen: "Soll ich jetzt tanken oder warten?" — beantwortet die App.'
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
    kategorie: 'Einkaufen',
    emoji: '🛒',
    tipps: [
      { titel: 'Einkaufsliste schreiben', text: 'Immer mit Liste einkaufen — spart im Schnitt 20–30 % weil keine Impulskäufe passieren.' },
      { titel: 'Eigenmarken wählen', text: 'Aldi/Lidl-Eigenmarken sind bis zu 50 % günstiger als Marken — oft aus denselben Fabriken.' },
      { titel: 'Wochenplan machen', text: 'Mahlzeiten für die Woche planen, dann gezielt einkaufen — kein Wegwerfen, spart bis zu 40 € im Monat.' },
      { titel: 'Prospekte vor dem Einkauf', text: 'Kaufda oder Marktguru öffnen, günstigste Angebote notieren und danach gezielt einkaufen.' },
      { titel: 'Abends einkaufen', text: '30–60 Min. vor Ladenschluss: Frischprodukte mit gelbem Aufkleber — bis 70 % reduziert.' }
    ]
  },
  {
    kategorie: 'Energie & Kosten',
    emoji: '⚡',
    tipps: [
      { titel: 'Strom-Anbieter wechseln', text: 'Verivox oder Check24 nutzen — einmal im Jahr wechseln spart oft 200–400 € pro Jahr.' },
      { titel: 'Standby abschalten', text: 'Geräte im Standby kosten bis zu 100 € im Jahr extra. Steckerleiste mit Schalter nutzen.' },
      { titel: 'Waschmaschine voll beladen', text: 'Nie halbvolle Waschmaschine starten — spart Wasser, Strom und Waschmittel.' },
      { titel: 'Kalt oder 30°C waschen', text: 'Kalt oder 30°C statt 60°C waschen spart bis zu 60 % Energie pro Waschgang.' }
    ]
  },
  {
    kategorie: 'Freizeit mit Kindern',
    emoji: '🎠',
    tipps: [
      { titel: 'Bibliothek nutzen', text: 'Kostenlos Bücher, DVDs, Hörspiele leihen. Viele Bibliotheken bieten auch kostenlose Veranstaltungen für Kinder an.' },
      { titel: 'Museen am freien Tag', text: 'Viele Museen haben einen kostenlosen Tag pro Woche — Website des Museums prüfen.' },
      { titel: 'Stadtpark & Spielplätze', text: 'Kostenlose Freizeitgestaltung — viele Parks haben auch Grillplätze die man kostenlos nutzen kann.' },
      { titel: 'BuT: Sport & Verein', text: 'Bildung & Teilhabe übernimmt Sport- und Vereinsbeiträge bis 15 €/Monat bei Bürgergeld-Bezug.' },
      { titel: 'BundesKulturPass', text: 'Jugendliche ab 18 Jahren bekommen 200 € Kulturbudget vom Staat für Konzerte, Kino, Bücher.' }
    ]
  },
  {
    kategorie: 'Tanken günstig',
    emoji: '⛽',
    tipps: [
      { titel: 'Dienstags & Mittwochs tanken', text: 'Laut ADAC sind die Spritpreise dienstags und mittwochs deutschlandweit am günstigsten.' },
      { titel: 'Abends zwischen 18–22 Uhr', text: 'Spritpreise sind abends fast immer günstiger als morgens — clever-tanken.de gibt die beste Zeit an.' },
      { titel: 'Autobahnstationen meiden', text: 'Autobahn-Tankstellen kosten oft 20–30 Cent mehr pro Liter als Tankstellen in der Stadt.' },
      { titel: 'App-Vergleich vor dem Tanken', text: 'Clever-tanken oder Tankerkönig öffnen: in 2 Minuten den günstigsten Preis in der Nähe finden.' }
    ]
  }
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
      { titel: 'Familienrat einführen', text: 'Wöchentlich 10 Min. gemeinsam reden: Was war schön? Was war schwierig? Was wollen wir nächste Woche machen?' }
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
      { titel: 'Elterngeld rechtzeitig beantragen', text: 'Elterngeld muss innerhalb von 3 Monaten nach Geburt beantragt werden — max. 14 Monate, auch für Alleinerziehende möglich.' }
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
      { titel: 'Kleine Wohnung clever einrichten', text: 'Hochbetten, Multifunktionsmöbel und helle Farben lassen kleine Wohnungen größer wirken und sparen Platz für Kinder.' }
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
      { titel: 'Ernährungsberatung kostenlos', text: 'Viele Krankenkassen übernehmen Kosten für Ernährungsberatung (bis 200 €). Bei Kasse nachfragen — lohnt sich für die ganze Familie.' }
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
      { titel: 'Tiefkühlgemüse gleich gut', text: 'Tiefkühlerbsen, Spinat, Bohnen sind ebenso vitaminreich wie frisches Gemüse und bis zu 80 % günstiger.' }
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
      { titel: 'Stipendien für Alleinerziehende', text: 'Bildungsfonds und Stipendien (z.B. Avicenna-Studienwerk, Rosa-Luxemburg-Stiftung) sind auch für Alleinerziehende zugänglich.' }
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
      { titel: 'Kindertheater und Puppenspiel', text: 'Stadttheater bieten Kindervorstellungen ab 4 € an. Viele Parks haben kostenlose Open-Air-Veranstaltungen im Sommer.' }
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
      { titel: 'VAMV-Rechtsberatung', text: 'Verband alleinerziehender Mütter und Väter (vamv.de) bietet rechtliche Beratung und Interessenvertretung an.' }
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
    kategorie: 'guenstig',
    kategorieLabel: 'Besonders Günstig',
    dauer: '35 Min.',
    kosten: '≈ 1,30 €',
    portionen: 4,
    zutaten: ['400 ml Kokosmilch (Dose)', '1 Dose Kichererbsen', '1 Paprika, 1 Zucchini', '2 EL Curry-Pulver', '1 Zwiebel, 2 Knoblauchzehen', '300 g Reis', 'Salz, Pfeffer'],
    zubereitung: 'Zwiebel und Knoblauch anschwitzen, Curry-Pulver 1 Min. mitbraten. Gemüse und Kichererbsen dazu. Kokosmilch eingießen, 20 Min. köcheln. Mit gekochtem Reis servieren.',
    tipp: 'Sehr gut einfrierbar! Doppelte Menge kochen und portionsweise einfrieren.'
  }
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
