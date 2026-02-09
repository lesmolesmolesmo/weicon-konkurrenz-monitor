// Konkurrenz-Datenbank für WEICON
export const competitors = [
  {
    id: 'henkel',
    name: 'Henkel (Loctite)',
    logo: '🔴',
    color: '#e3000b',
    country: 'Deutschland',
    founded: 1876,
    employees: 52000,
    revenue: '22.4 Mrd €',
    marketShare: 28,
    strengths: ['Globale Marktführerschaft', 'Breites Portfolio', 'Starke F&E'],
    weaknesses: ['Hohe Preise', 'Komplexe Struktur']
  },
  {
    id: '3m',
    name: '3M',
    logo: '🟡',
    color: '#ff0000',
    country: 'USA',
    founded: 1902,
    employees: 95000,
    revenue: '34.2 Mrd $',
    marketShare: 22,
    strengths: ['Innovation', 'Diversifiziert', 'Starke Marke'],
    weaknesses: ['Bürokratie', 'Langsame Entscheidungen']
  },
  {
    id: 'wuerth',
    name: 'Würth',
    logo: '🔶',
    color: '#cc0000',
    country: 'Deutschland',
    founded: 1945,
    employees: 87000,
    revenue: '20.4 Mrd €',
    marketShare: 15,
    strengths: ['Direktvertrieb', 'Kundennähe', 'Breites Sortiment'],
    weaknesses: ['Weniger spezialisiert', 'Hohe Vertriebskosten']
  },
  {
    id: 'sika',
    name: 'Sika',
    logo: '🟠',
    color: '#f7a800',
    country: 'Schweiz',
    founded: 1910,
    employees: 33000,
    revenue: '11.2 Mrd CHF',
    marketShare: 12,
    strengths: ['Bauchemie-Experte', 'Nachhaltigkeit', 'Akquisitionen'],
    weaknesses: ['Fokus auf Bau', 'Weniger Industrie']
  },
  {
    id: 'bostik',
    name: 'Bostik (Arkema)',
    logo: '🔵',
    color: '#00529b',
    country: 'Frankreich',
    founded: 1889,
    employees: 6000,
    revenue: '2.5 Mrd €',
    marketShare: 8,
    strengths: ['Spezialisiert', 'Innovativ', 'Flexibel'],
    weaknesses: ['Kleinerer Marktanteil', 'Weniger bekannt']
  },
  {
    id: 'delo',
    name: 'DELO',
    logo: '💠',
    color: '#0066b3',
    country: 'Deutschland',
    founded: 1961,
    employees: 1000,
    revenue: '200 Mio €',
    marketShare: 3,
    strengths: ['High-Tech Klebstoffe', 'Elektronik-Fokus', 'Qualität'],
    weaknesses: ['Nischenmarkt', 'Kleineres Sortiment']
  },
  {
    id: 'permabond',
    name: 'Permabond',
    logo: '🔷',
    color: '#00467f',
    country: 'UK',
    founded: 1956,
    employees: 500,
    revenue: '80 Mio €',
    marketShare: 2,
    strengths: ['Anaerobe Klebstoffe', 'Technischer Support'],
    weaknesses: ['Begrenzte Produktpalette', 'Regional begrenzt']
  },
  {
    id: 'panacol',
    name: 'Panacol',
    logo: '⬛',
    color: '#003366',
    country: 'Deutschland',
    founded: 1978,
    employees: 200,
    revenue: '50 Mio €',
    marketShare: 1,
    strengths: ['UV-Klebstoffe', 'Medizintechnik'],
    weaknesses: ['Sehr spezialisiert', 'Klein']
  },
  {
    id: 'uhu',
    name: 'UHU',
    logo: '🟨',
    color: '#ffcc00',
    country: 'Deutschland',
    founded: 1884,
    employees: 700,
    revenue: '150 Mio €',
    marketShare: 4,
    strengths: ['Bekannte Marke', 'Consumer & Industrie'],
    weaknesses: ['Consumer-Fokus', 'Weniger B2B']
  },
  {
    id: 'itw',
    name: 'ITW (Plexus/Devcon)',
    logo: '🟦',
    color: '#0033a0',
    country: 'USA',
    founded: 1912,
    employees: 45000,
    revenue: '16 Mrd $',
    marketShare: 5,
    strengths: ['Strukturklebstoffe', 'Industriefokus'],
    weaknesses: ['Komplex', 'Weniger Kundennähe']
  }
];

export const products = [
  // Henkel/Loctite Produkte
  { id: 1, name: 'Loctite 243', competitor: 'henkel', category: 'Schraubensicherung', type: 'Anaerob', strength: 'Mittel', price: 28.50, unit: '50ml', application: 'Schrauben M6-M20', curing: '24h', temp_range: '-55°C bis +150°C', color: 'Blau' },
  { id: 2, name: 'Loctite 270', competitor: 'henkel', category: 'Schraubensicherung', type: 'Anaerob', strength: 'Hoch', price: 32.90, unit: '50ml', application: 'Dauerhafte Sicherung', curing: '24h', temp_range: '-55°C bis +150°C', color: 'Grün' },
  { id: 3, name: 'Loctite 222', competitor: 'henkel', category: 'Schraubensicherung', type: 'Anaerob', strength: 'Niedrig', price: 26.50, unit: '50ml', application: 'Justierschrauben', curing: '24h', temp_range: '-55°C bis +150°C', color: 'Violett' },
  { id: 4, name: 'Loctite 401', competitor: 'henkel', category: 'Sekundenkleber', type: 'Cyanacrylat', strength: 'Hoch', price: 18.90, unit: '20g', application: 'Universal', curing: 'Sekunden', temp_range: '-40°C bis +120°C', color: 'Transparent' },
  { id: 5, name: 'Loctite 406', competitor: 'henkel', category: 'Sekundenkleber', type: 'Cyanacrylat', strength: 'Hoch', price: 24.50, unit: '20g', application: 'Kunststoff/Gummi', curing: 'Sekunden', temp_range: '-40°C bis +120°C', color: 'Transparent' },
  { id: 6, name: 'Loctite 480', competitor: 'henkel', category: 'Sekundenkleber', type: 'Cyanacrylat', strength: 'Sehr hoch', price: 38.90, unit: '20g', application: 'Metall', curing: 'Sekunden', temp_range: '-40°C bis +120°C', color: 'Schwarz' },
  { id: 7, name: 'Loctite 638', competitor: 'henkel', category: 'Fügen', type: 'Anaerob', strength: 'Hoch', price: 42.00, unit: '50ml', application: 'Welle-Nabe', curing: '24h', temp_range: '-55°C bis +175°C', color: 'Grün' },
  { id: 8, name: 'Loctite 648', competitor: 'henkel', category: 'Fügen', type: 'Anaerob', strength: 'Sehr hoch', price: 48.50, unit: '50ml', application: 'Hochfest', curing: '24h', temp_range: '-55°C bis +175°C', color: 'Grün' },
  { id: 9, name: 'Loctite EA 3430', competitor: 'henkel', category: '2K-Epoxy', type: 'Epoxidharz', strength: 'Sehr hoch', price: 65.00, unit: '50ml', application: 'Strukturkleben', curing: '10min', temp_range: '-40°C bis +120°C', color: 'Transparent' },
  { id: 10, name: 'Loctite SI 5910', competitor: 'henkel', category: 'Silikon', type: 'RTV-Silikon', strength: 'Mittel', price: 22.50, unit: '100ml', application: 'Dichtung', curing: '24h', temp_range: '-60°C bis +250°C', color: 'Schwarz' },
  
  // 3M Produkte
  { id: 11, name: '3M Scotch-Weld DP100', competitor: '3m', category: '2K-Epoxy', type: 'Epoxidharz', strength: 'Hoch', price: 52.00, unit: '50ml', application: 'Universal', curing: '5min', temp_range: '-40°C bis +93°C', color: 'Transparent' },
  { id: 12, name: '3M Scotch-Weld DP460', competitor: '3m', category: '2K-Epoxy', type: 'Epoxidharz', strength: 'Sehr hoch', price: 78.00, unit: '50ml', application: 'Strukturkleben', curing: '60min', temp_range: '-55°C bis +177°C', color: 'Weiß' },
  { id: 13, name: '3M Scotch-Weld DP8005', competitor: '3m', category: 'Acrylat', type: 'MMA', strength: 'Hoch', price: 68.00, unit: '45ml', application: 'Kunststoff', curing: '4min', temp_range: '-40°C bis +121°C', color: 'Grün' },
  { id: 14, name: '3M VHB 4991', competitor: '3m', category: 'Klebeband', type: 'Acrylat', strength: 'Sehr hoch', price: 125.00, unit: '33m', application: 'Structural Bonding', curing: '72h', temp_range: '-40°C bis +90°C', color: 'Grau' },
  { id: 15, name: '3M CA40H', competitor: '3m', category: 'Sekundenkleber', type: 'Cyanacrylat', strength: 'Hoch', price: 19.90, unit: '28g', application: 'Universal', curing: 'Sekunden', temp_range: '-54°C bis +82°C', color: 'Transparent' },
  { id: 16, name: '3M Scotch-Weld 7240', competitor: '3m', category: 'Primer', type: 'Primer', strength: '-', price: 42.00, unit: '250ml', application: 'Kunststoff-Vorbehandlung', curing: '5min', temp_range: '-', color: 'Farblos' },
  
  // Würth Produkte
  { id: 17, name: 'Würth Schraubensicherung mittelfest', competitor: 'wuerth', category: 'Schraubensicherung', type: 'Anaerob', strength: 'Mittel', price: 22.90, unit: '50ml', application: 'Schrauben M6-M20', curing: '24h', temp_range: '-55°C bis +150°C', color: 'Blau' },
  { id: 18, name: 'Würth Schraubensicherung hochfest', competitor: 'wuerth', category: 'Schraubensicherung', type: 'Anaerob', strength: 'Hoch', price: 25.90, unit: '50ml', application: 'Dauerhafte Sicherung', curing: '24h', temp_range: '-55°C bis +150°C', color: 'Rot' },
  { id: 19, name: 'Würth Cyanacrylat Standard', competitor: 'wuerth', category: 'Sekundenkleber', type: 'Cyanacrylat', strength: 'Hoch', price: 14.90, unit: '20g', application: 'Universal', curing: 'Sekunden', temp_range: '-40°C bis +80°C', color: 'Transparent' },
  { id: 20, name: 'Würth 2K Epoxy 5min', competitor: 'wuerth', category: '2K-Epoxy', type: 'Epoxidharz', strength: 'Hoch', price: 38.00, unit: '50ml', application: 'Schnellreparatur', curing: '5min', temp_range: '-30°C bis +80°C', color: 'Transparent' },
  { id: 21, name: 'Würth Konstruktionskleber PUR', competitor: 'wuerth', category: 'PU-Kleber', type: 'Polyurethan', strength: 'Sehr hoch', price: 28.50, unit: '310ml', application: 'Bau/Konstruktion', curing: '24h', temp_range: '-40°C bis +90°C', color: 'Beige' },
  
  // Sika Produkte
  { id: 22, name: 'Sikaflex-252', competitor: 'sika', category: 'PU-Kleber', type: 'Polyurethan', strength: 'Hoch', price: 18.50, unit: '300ml', application: 'Fahrzeugbau', curing: '24-48h', temp_range: '-40°C bis +90°C', color: 'Schwarz' },
  { id: 23, name: 'Sikaflex-221', competitor: 'sika', category: 'PU-Kleber', type: 'Polyurethan', strength: 'Mittel', price: 15.90, unit: '300ml', application: 'Universal Dichtkleber', curing: '24h', temp_range: '-40°C bis +90°C', color: 'Grau' },
  { id: 24, name: 'SikaForce-7752', competitor: 'sika', category: '2K-PU', type: 'Polyurethan', strength: 'Sehr hoch', price: 85.00, unit: '250ml', application: 'Strukturkleben', curing: '60min', temp_range: '-40°C bis +80°C', color: 'Schwarz' },
  { id: 25, name: 'Sikadur-31', competitor: 'sika', category: '2K-Epoxy', type: 'Epoxidharz', strength: 'Sehr hoch', price: 62.00, unit: '1.2kg', application: 'Beton/Stein', curing: '7 Tage', temp_range: '-40°C bis +60°C', color: 'Grau' },
  { id: 26, name: 'SikaPower-4720', competitor: 'sika', category: '2K-Epoxy', type: 'Epoxidharz', strength: 'Sehr hoch', price: 72.00, unit: '50ml', application: 'Automotive', curing: '30min', temp_range: '-40°C bis +100°C', color: 'Schwarz' },
  
  // Bostik Produkte
  { id: 27, name: 'Bostik Born2Bond Ultra', competitor: 'bostik', category: 'Sekundenkleber', type: 'Cyanacrylat', strength: 'Sehr hoch', price: 32.00, unit: '20g', application: 'High Performance', curing: 'Sekunden', temp_range: '-55°C bis +120°C', color: 'Transparent' },
  { id: 28, name: 'Bostik MSP 107', competitor: 'bostik', category: 'MS-Polymer', type: 'MS-Polymer', strength: 'Hoch', price: 16.90, unit: '290ml', application: 'Hybrid Dichtkleber', curing: '24h', temp_range: '-40°C bis +100°C', color: 'Weiß' },
  { id: 29, name: 'Bostik Terostat MS 930', competitor: 'bostik', category: 'MS-Polymer', type: 'MS-Polymer', strength: 'Hoch', price: 24.50, unit: '310ml', application: 'Automotive OEM', curing: '24h', temp_range: '-40°C bis +100°C', color: 'Schwarz' },
  
  // DELO Produkte
  { id: 30, name: 'DELO-DUOPOX AD840', competitor: 'delo', category: '2K-Epoxy', type: 'Epoxidharz', strength: 'Sehr hoch', price: 95.00, unit: '50ml', application: 'Elektronik', curing: '24h', temp_range: '-40°C bis +150°C', color: 'Schwarz' },
  { id: 31, name: 'DELO-PHOTOBOND GB368', competitor: 'delo', category: 'UV-Klebstoff', type: 'Acrylat', strength: 'Hoch', price: 145.00, unit: '25ml', application: 'Glas', curing: 'UV', temp_range: '-40°C bis +120°C', color: 'Transparent' },
  { id: 32, name: 'DELO-CA 2450', competitor: 'delo', category: 'Sekundenkleber', type: 'Cyanacrylat', strength: 'Sehr hoch', price: 48.00, unit: '20g', application: 'Industrie', curing: 'Sekunden', temp_range: '-55°C bis +120°C', color: 'Transparent' },
  
  // Permabond Produkte
  { id: 33, name: 'Permabond A1046', competitor: 'permabond', category: 'Schraubensicherung', type: 'Anaerob', strength: 'Mittel', price: 24.00, unit: '50ml', application: 'Schraubensicherung', curing: '24h', temp_range: '-55°C bis +150°C', color: 'Blau' },
  { id: 34, name: 'Permabond ET500', competitor: 'permabond', category: '2K-Epoxy', type: 'Epoxidharz', strength: 'Sehr hoch', price: 58.00, unit: '50ml', application: 'Strukturkleben', curing: '5min', temp_range: '-55°C bis +120°C', color: 'Transparent' },
  { id: 35, name: 'Permabond 910', competitor: 'permabond', category: 'Sekundenkleber', type: 'Cyanacrylat', strength: 'Hoch', price: 16.50, unit: '20g', application: 'Universal', curing: 'Sekunden', temp_range: '-54°C bis +82°C', color: 'Transparent' },
  
  // UHU Produkte
  { id: 36, name: 'UHU Plus Endfest 300', competitor: 'uhu', category: '2K-Epoxy', type: 'Epoxidharz', strength: 'Sehr hoch', price: 12.90, unit: '33g', application: 'Universal', curing: '12h', temp_range: '-40°C bis +80°C', color: 'Transparent' },
  { id: 37, name: 'UHU Plus Schnellfest', competitor: 'uhu', category: '2K-Epoxy', type: 'Epoxidharz', strength: 'Hoch', price: 11.90, unit: '35g', application: 'Schnellreparatur', curing: '5min', temp_range: '-30°C bis +80°C', color: 'Transparent' },
  { id: 38, name: 'UHU Sekunden Alleskleber', competitor: 'uhu', category: 'Sekundenkleber', type: 'Cyanacrylat', strength: 'Mittel', price: 6.90, unit: '3g', application: 'Haushalt', curing: 'Sekunden', temp_range: '-20°C bis +80°C', color: 'Transparent' },
  
  // Panacol Produkte
  { id: 39, name: 'Vitralit 1655', competitor: 'panacol', category: 'UV-Klebstoff', type: 'Acrylat', strength: 'Hoch', price: 165.00, unit: '25ml', application: 'Medizintechnik', curing: 'UV', temp_range: '-40°C bis +125°C', color: 'Transparent' },
  { id: 40, name: 'Structalit 5893', competitor: 'panacol', category: '1K-Epoxy', type: 'Epoxidharz', strength: 'Sehr hoch', price: 125.00, unit: '30ml', application: 'Elektronik', curing: '150°C', temp_range: '-55°C bis +200°C', color: 'Schwarz' },
  
  // ITW Produkte
  { id: 41, name: 'Plexus MA300', competitor: 'itw', category: 'MMA', type: 'Methylmethacrylat', strength: 'Sehr hoch', price: 85.00, unit: '50ml', application: 'Strukturkleben', curing: '30min', temp_range: '-40°C bis +120°C', color: 'Beige' },
  { id: 42, name: 'Plexus MA310', competitor: 'itw', category: 'MMA', type: 'Methylmethacrylat', strength: 'Sehr hoch', price: 92.00, unit: '50ml', application: 'Composite', curing: '20min', temp_range: '-40°C bis +120°C', color: 'Weiß' },
  { id: 43, name: 'Devcon Plastic Steel Putty', competitor: 'itw', category: 'Reparatur', type: 'Epoxidharz', strength: 'Hoch', price: 45.00, unit: '500g', application: 'Metallreparatur', curing: '2h', temp_range: '-40°C bis +120°C', color: 'Grau' },
];

export const categories = [
  'Alle',
  'Schraubensicherung',
  'Sekundenkleber',
  '2K-Epoxy',
  '1K-Epoxy',
  'Fügen',
  'PU-Kleber',
  '2K-PU',
  'Silikon',
  'MS-Polymer',
  'UV-Klebstoff',
  'MMA',
  'Acrylat',
  'Klebeband',
  'Primer',
  'Reparatur'
];

export const weiconProducts = [
  { name: 'WEICONLOCK AN 302-43', category: 'Schraubensicherung', comparable: ['Loctite 243', 'Würth Schraubensicherung mittelfest', 'Permabond A1046'] },
  { name: 'WEICONLOCK AN 302-70', category: 'Schraubensicherung', comparable: ['Loctite 270', 'Würth Schraubensicherung hochfest'] },
  { name: 'WEICON CA-Klebstoff 60-20', category: 'Sekundenkleber', comparable: ['Loctite 401', '3M CA40H', 'Würth Cyanacrylat Standard'] },
  { name: 'WEICON Epoxy Minutenkleber', category: '2K-Epoxy', comparable: ['3M Scotch-Weld DP100', 'Würth 2K Epoxy 5min', 'UHU Plus Schnellfest'] },
  { name: 'WEICON Flex 310 M', category: 'MS-Polymer', comparable: ['Bostik MSP 107', 'Sikaflex-221'] },
];
