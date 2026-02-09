import { useState, useEffect } from 'react'
import { competitors, products, categories, marketData, weiconProducts } from './data/competitors'

// Login
const VALID_USER = { email: 'bianca@lesmodog.de', password: 'WEICON2024!' }

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.toLowerCase() === VALID_USER.email && password === VALID_USER.password) {
      localStorage.setItem('weicon_auth', JSON.stringify({ email, time: Date.now() }))
      onLogin({ email })
    } else {
      setError('Ungültige Anmeldedaten')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-block bg-red-600 text-white text-2xl font-black px-4 py-2 rounded-lg mb-4">
            WEICON
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Konkurrenz-Analyse</h1>
          <p className="text-gray-500 text-sm mt-1">Marktübersicht für das Vertriebsteam</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="name@weicon.de"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors">
            Anmelden
          </button>
        </form>
        
        <p className="text-center text-gray-400 text-xs mt-6">Nur für autorisierte WEICON-Mitarbeiter</p>
      </div>
    </div>
  )
}

// Main App
function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('weicon_auth')
    return saved ? JSON.parse(saved) : null
  })
  const [view, setView] = useState('start')
  const [selectedCompetitor, setSelectedCompetitor] = useState(null)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedForCompare, setSelectedForCompare] = useState([])
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weicon_favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    localStorage.setItem('weicon_favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  const toggleCompare = (id) => {
    setSelectedForCompare(prev => {
      if (prev.includes(id)) return prev.filter(p => p !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }

  if (!user) return <LoginPage onLogin={setUser} />

  // Navigation
  const navItems = [
    { id: 'start', label: 'Start', emoji: '🏠', desc: 'Übersicht & Schnellzugriff' },
    { id: 'competitors', label: 'Wettbewerber', emoji: '🏢', desc: '12 Firmen im Detail' },
    { id: 'products', label: 'Produkte', emoji: '📦', desc: 'Alle Konkurrenz-Produkte' },
    { id: 'compare', label: 'Vergleich', emoji: '⚖️', desc: 'WEICON vs. Konkurrenz' },
    { id: 'prices', label: 'Preisanalyse', emoji: '💰', desc: 'Wer ist teurer/günstiger?' },
    { id: 'favorites', label: 'Gemerkt', emoji: '⭐', desc: `${favorites.length} gespeichert` },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <span className="bg-red-600 text-white text-sm font-black px-2 py-1 rounded">WEICON</span>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <span className="text-gray-600 text-sm hidden sm:inline">Konkurrenz-Monitor</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowHelp(true)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                title="Hilfe"
              >
                <span className="text-lg">❓</span>
              </button>
              <button 
                onClick={() => { localStorage.removeItem('weicon_auth'); setUser(null) }}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                title="Abmelden"
              >
                <span className="text-lg">🚪</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav className="bg-white border-b border-gray-100 overflow-x-auto sticky top-14 z-40 md:hidden">
        <div className="flex px-2 py-2 gap-1 min-w-max">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap flex items-center gap-1.5 ${
                view === item.id 
                  ? 'bg-red-50 text-red-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="w-56 flex-shrink-0 hidden md:block">
            <nav className="sticky top-24 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    view === item.id 
                      ? 'bg-red-50 text-red-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>

            {/* Quick Stats */}
            <div className="mt-6 p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white">
              <h3 className="font-semibold text-sm opacity-90">Auf einen Blick</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-75">Wettbewerber</span>
                  <span className="font-bold">{competitors.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Produkte erfasst</span>
                  <span className="font-bold">{products.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Mit WEICON-Alt.</span>
                  <span className="font-bold">{products.filter(p => p.weiconAlternative).length}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {view === 'start' && <StartView 
              setView={setView} 
              competitors={competitors} 
              products={products}
              setSelectedCompetitor={setSelectedCompetitor}
            />}
            {view === 'competitors' && (
              selectedCompetitor 
                ? <CompetitorDetail 
                    competitor={selectedCompetitor} 
                    products={products.filter(p => p.competitorId === selectedCompetitor.id)}
                    onBack={() => setSelectedCompetitor(null)}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                : <CompetitorsList 
                    competitors={competitors}
                    products={products}
                    onSelect={setSelectedCompetitor}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
            )}
            {view === 'products' && <ProductsView 
              products={products}
              competitors={competitors}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              selectedForCompare={selectedForCompare}
              toggleCompare={toggleCompare}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />}
            {view === 'compare' && <CompareView 
              products={products}
              competitors={competitors}
              weiconProducts={weiconProducts}
              selectedForCompare={selectedForCompare}
              setSelectedForCompare={setSelectedForCompare}
            />}
            {view === 'prices' && <PricesView 
              products={products}
              competitors={competitors}
            />}
            {view === 'favorites' && <FavoritesView 
              products={products.filter(p => favorites.includes(p.id))}
              competitors={competitors}
              toggleFavorite={toggleFavorite}
            />}
          </main>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">So nutzen Sie das Tool</h2>
              <button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="space-y-4 text-sm text-gray-600">
              <div className="p-3 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-700 mb-1">🏠 Start</h3>
                <p>Ihre Übersicht: wichtigste Kennzahlen und Schnellzugriff auf alle Bereiche.</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-1">🏢 Wettbewerber</h3>
                <p>Alle 12 Konkurrenten im Detail: Firmenprofil, Stärken, Schwächen, Produkte.</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-1">📦 Produkte</h3>
                <p>Durchsuchen Sie alle erfassten Konkurrenz-Produkte. Filtern nach Kategorie oder Suche.</p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-700 mb-1">⚖️ Vergleich</h3>
                <p>Vergleichen Sie Konkurrenz-Produkte direkt mit WEICON-Alternativen. Preis, Eigenschaften, Vorteile.</p>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-700 mb-1">💰 Preisanalyse</h3>
                <p>Sehen Sie auf einen Blick, welche Konkurrenten teurer oder günstiger sind als WEICON.</p>
              </div>
              
              <div className="p-3 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-700 mb-1">⭐ Gemerkt</h3>
                <p>Speichern Sie interessante Produkte für später. Klicken Sie auf den Stern ⭐ bei jedem Produkt.</p>
              </div>
            </div>

            <button 
              onClick={() => setShowHelp(false)}
              className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl font-medium"
            >
              Verstanden
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar - Compare Button */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
          <button
            onClick={() => setView('compare')}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <span>⚖️</span>
            <span>{selectedForCompare.length} Produkte vergleichen</span>
          </button>
        </div>
      )}
    </div>
  )
}

// START VIEW
function StartView({ setView, competitors, products, setSelectedCompetitor }) {
  const cheaperProducts = products.filter(p => p.priceDiff !== null && p.priceDiff < 0)
  const moreExpensive = products.filter(p => p.priceDiff !== null && p.priceDiff > 0)
  const withAlternative = products.filter(p => p.weiconAlternative)
  const noAlternative = products.filter(p => !p.weiconAlternative)
  
  const topCompetitors = competitors.filter(c => c.marketPosition.includes('Ähnliche'))

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Willkommen, Bianca! 👋</h1>
        <p className="text-gray-500 mt-1">
          Hier ist Ihre aktuelle Marktübersicht für den deutschen Klebstoff-Markt.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => setView('compare')}
          className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-left hover:border-red-200 hover:shadow-md transition-all"
        >
          <span className="text-2xl">⚖️</span>
          <h3 className="font-semibold text-gray-900 mt-2">Produkt-Vergleich</h3>
          <p className="text-xs text-gray-500 mt-1">WEICON vs. Konkurrenz direkt vergleichen</p>
        </button>
        <button 
          onClick={() => setView('prices')}
          className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-left hover:border-red-200 hover:shadow-md transition-all"
        >
          <span className="text-2xl">💰</span>
          <h3 className="font-semibold text-gray-900 mt-2">Preis-Check</h3>
          <p className="text-xs text-gray-500 mt-1">Wer ist teurer, wer günstiger?</p>
        </button>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4">📊 Wichtige Erkenntnisse</h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {cheaperProducts.length}
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Günstiger als wir</h3>
                <p className="text-sm text-green-600">Produkte unter WEICON-Preis</p>
              </div>
            </div>
            <p className="text-xs text-green-700 mt-3 p-2 bg-green-100 rounded">
              💡 <strong>Tipp:</strong> Bei diesen Produkten auf WEICON-Mehrwert hinweisen (Qualität, Service, Made in Germany)
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {moreExpensive.length}
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Teurer als wir</h3>
                <p className="text-sm text-red-600">Produkte über WEICON-Preis</p>
              </div>
            </div>
            <p className="text-xs text-red-700 mt-3 p-2 bg-red-100 rounded">
              💡 <strong>Chance:</strong> Kunden gezielt ansprechen — gleichwertig, aber günstiger!
            </p>
          </div>
        </div>
      </div>

      {/* Product Coverage */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4">📦 Produkt-Abdeckung</h2>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${(withAlternative.length / products.length) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {Math.round((withAlternative.length / products.length) * 100)}%
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{withAlternative.length}</div>
            <div className="text-xs text-gray-500">Mit WEICON-Alternative</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-orange-500">{noAlternative.length}</div>
            <div className="text-xs text-gray-500">Ohne Alternative (Lücke)</div>
          </div>
        </div>

        {noAlternative.length > 0 && (
          <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-100">
            <p className="text-xs text-orange-700">
              <strong>Produktlücken gefunden:</strong> {noAlternative.slice(0, 3).map(p => p.name).join(', ')}
              {noAlternative.length > 3 && ` und ${noAlternative.length - 3} weitere`}
            </p>
          </div>
        )}
      </div>

      {/* Direct Competitors */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">🎯 Direkte Wettbewerber</h2>
          <span className="text-xs text-gray-400">Ähnliche Größe wie WEICON</span>
        </div>
        
        <div className="space-y-2">
          {topCompetitors.slice(0, 4).map(comp => (
            <button
              key={comp.id}
              onClick={() => { setSelectedCompetitor(comp); setView('competitors'); }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-bold text-gray-600 group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                  {comp.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">{comp.name}</div>
                  <div className="text-xs text-gray-500">{comp.city} · {comp.specialty.split(',')[0]}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{comp.revenueEstimate}</div>
                <div className="text-xs text-gray-400">{products.filter(p => p.competitorId === comp.id).length} Produkte</div>
              </div>
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => setView('competitors')}
          className="w-full mt-4 py-3 text-sm text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors"
        >
          Alle {competitors.length} Wettbewerber ansehen →
        </button>
      </div>
    </div>
  )
}

// COMPETITORS LIST
function CompetitorsList({ competitors, products, onSelect, searchTerm, setSearchTerm }) {
  const filtered = competitors.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Wettbewerber</h1>
          <p className="text-sm text-gray-500">{competitors.length} deutsche & europäische Klebstoff-Hersteller</p>
        </div>
        <input
          type="search"
          placeholder="Suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div className="grid gap-3">
        {filtered.map(comp => {
          const compProducts = products.filter(p => p.competitorId === comp.id)
          const avgPriceDiff = compProducts.filter(p => p.priceDiff !== null).length > 0
            ? compProducts.filter(p => p.priceDiff !== null).reduce((a, p) => a + p.priceDiff, 0) / compProducts.filter(p => p.priceDiff !== null).length
            : null

          return (
            <button
              key={comp.id}
              onClick={() => onSelect(comp)}
              className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-left hover:border-red-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">{comp.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{comp.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      comp.marketPosition.includes('Größer') ? 'bg-orange-100 text-orange-700' :
                      comp.marketPosition.includes('Kleiner') ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {comp.marketPosition.includes('Größer') ? '↑ Größer' :
                       comp.marketPosition.includes('Kleiner') ? '↓ Kleiner' : '≈ Ähnlich'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{comp.specialty}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>📍 {comp.city}</span>
                    <span>👥 {comp.employees}</span>
                    <span>💰 {comp.revenueEstimate}</span>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-lg font-bold text-gray-900">{compProducts.length}</div>
                  <div className="text-xs text-gray-400">Produkte</div>
                  {avgPriceDiff !== null && (
                    <div className={`text-xs mt-1 ${avgPriceDiff < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      Ø {avgPriceDiff > 0 ? '+' : ''}{avgPriceDiff.toFixed(0)}% vs. WEICON
                    </div>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// COMPETITOR DETAIL
function CompetitorDetail({ competitor, products, onBack, favorites, toggleFavorite }) {
  const comp = competitor
  const avgPriceDiff = products.filter(p => p.priceDiff !== null).length > 0
    ? products.filter(p => p.priceDiff !== null).reduce((a, p) => a + p.priceDiff, 0) / products.filter(p => p.priceDiff !== null).length
    : null

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
        ← Zurück zur Übersicht
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center text-3xl font-bold text-red-600">
            {comp.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{comp.name}</h1>
            <p className="text-gray-500">{comp.city}, {comp.country} · Gegründet {comp.founded}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{comp.employees} Mitarbeiter</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{comp.revenueEstimate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">{products.length}</div>
          <div className="text-xs text-gray-500">Produkte erfasst</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">{products.filter(p => p.weiconAlternative).length}</div>
          <div className="text-xs text-gray-500">Mit WEICON-Alt.</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          {avgPriceDiff !== null ? (
            <>
              <div className={`text-2xl font-bold ${avgPriceDiff < 0 ? 'text-green-600' : 'text-red-600'}`}>
                {avgPriceDiff > 0 ? '+' : ''}{avgPriceDiff.toFixed(0)}%
              </div>
              <div className="text-xs text-gray-500">Ø Preisdiff.</div>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold text-gray-400">—</div>
              <div className="text-xs text-gray-500">Keine Daten</div>
            </>
          )}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-green-500">💪</span> Stärken
          </h3>
          <ul className="space-y-2">
            {comp.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-red-500">⚠️</span> Schwächen
          </h3>
          <ul className="space-y-2">
            {comp.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-red-500 mt-0.5">✗</span>
                <span className="text-gray-700">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* WEICON Advantage */}
      <div className="bg-red-50 p-5 rounded-xl border border-red-100">
        <h3 className="font-semibold text-red-800 mb-2">💡 WEICON-Vorteil gegenüber {comp.name}</h3>
        <p className="text-sm text-red-700">
          {comp.weaknesses.length > 0 
            ? `Nutzen Sie die Schwächen: ${comp.weaknesses[0]}. WEICON punktet hier mit breiterem Sortiment, schnellem Service und Made in Germany Qualität.`
            : `Betonen Sie WEICON's Stärken: komplettes Sortiment, technische Beratung, schnelle Lieferung, deutscher Hersteller.`
          }
        </p>
      </div>

      {/* Products */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">📦 Produkte von {comp.name}</h3>
        <div className="space-y-3">
          {products.map(product => (
            <div key={product.id} className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <button 
                      onClick={() => toggleFavorite(product.id)}
                      className={`text-lg ${favorites.includes(product.id) ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
                    >
                      ⭐
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  {product.weiconAlternative && (
                    <p className="text-xs text-red-600 mt-1">
                      → WEICON: {product.weiconAlternative}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    {product.priceMin.toFixed(2)}€ - {product.priceMax.toFixed(2)}€
                  </div>
                  <div className="text-xs text-gray-400">pro {product.unit}</div>
                  {product.priceDiff !== null && (
                    <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
                      product.priceDiff < 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.priceDiff > 0 ? '+' : ''}{product.priceDiff}% vs. WEICON
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// PRODUCTS VIEW
function ProductsView({ products, competitors, favorites, toggleFavorite, selectedForCompare, toggleCompare, filterCategory, setFilterCategory, searchTerm, setSearchTerm }) {
  const categories = [...new Set(products.map(p => p.category))]
  
  const filtered = products
    .filter(p => !filterCategory || p.category === filterCategory)
    .filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      competitors.find(c => c.id === p.competitorId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Produkte</h1>
        <p className="text-sm text-gray-500">{products.length} Konkurrenz-Produkte in der Datenbank</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Produkt oder Hersteller suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-white"
        >
          <option value="">Alle Kategorien</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Selected for compare */}
      {selectedForCompare.length > 0 && (
        <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 flex items-center justify-between">
          <span className="text-sm text-purple-700">
            <strong>{selectedForCompare.length}</strong> Produkt(e) für Vergleich ausgewählt
          </span>
          <button 
            onClick={() => setSelectedForCompare([])}
            className="text-xs text-purple-600 hover:text-purple-800"
          >
            Auswahl leeren
          </button>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid gap-3">
        {filtered.map(product => {
          const comp = competitors.find(c => c.id === product.competitorId)
          const isSelected = selectedForCompare.includes(product.id)
          
          return (
            <div 
              key={product.id} 
              className={`bg-white p-4 rounded-xl border shadow-sm transition-all ${
                isSelected ? 'border-purple-300 bg-purple-50' : 'border-gray-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleCompare(product.id)}
                  className={`w-6 h-6 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    isSelected 
                      ? 'bg-purple-500 border-purple-500 text-white' 
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  {isSelected && '✓'}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                      {comp?.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                  
                  {product.weiconAlternative && (
                    <div className="mt-2 p-2 bg-red-50 rounded-lg">
                      <p className="text-xs text-red-600">
                        <strong>WEICON-Alternative:</strong> {product.weiconAlternative}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-right flex-shrink-0">
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className={`text-xl mb-2 ${favorites.includes(product.id) ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
                  >
                    ⭐
                  </button>
                  <div className="font-semibold text-gray-900 text-sm">
                    {product.priceMin.toFixed(2)}€ - {product.priceMax.toFixed(2)}€
                  </div>
                  <div className="text-xs text-gray-400">/{product.unit}</div>
                  {product.priceDiff !== null && (
                    <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
                      product.priceDiff < 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.priceDiff > 0 ? '+' : ''}{product.priceDiff}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <span className="text-4xl block mb-3">🔍</span>
          <p>Keine Produkte gefunden</p>
        </div>
      )}
    </div>
  )
}

// COMPARE VIEW
function CompareView({ products, competitors, weiconProducts, selectedForCompare, setSelectedForCompare }) {
  const [selectedWeicon, setSelectedWeicon] = useState('')
  const [selectedCompetitor, setSelectedCompetitor] = useState('')

  const selectedCompProducts = products.filter(p => selectedForCompare.includes(p.id))
  
  // Get competitor products that have WEICON alternatives
  const comparableProducts = products.filter(p => p.weiconAlternative)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Produkt-Vergleich</h1>
        <p className="text-sm text-gray-500">Vergleichen Sie WEICON-Produkte direkt mit der Konkurrenz</p>
      </div>

      {/* Quick Compare */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">⚡ Schnellvergleich</h2>
        <p className="text-sm text-gray-500 mb-4">
          Wählen Sie ein Konkurrenz-Produkt und sehen Sie die WEICON-Alternative
        </p>

        <select
          value={selectedCompetitor}
          onChange={(e) => setSelectedCompetitor(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white mb-4"
        >
          <option value="">Konkurrenz-Produkt auswählen...</option>
          {comparableProducts.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} ({competitors.find(c => c.id === p.competitorId)?.name})
            </option>
          ))}
        </select>

        {selectedCompetitor && (() => {
          const compProduct = products.find(p => p.id === selectedCompetitor)
          const comp = competitors.find(c => c.id === compProduct?.competitorId)
          const weiconProd = weiconProducts.find(w => w.name === compProduct?.weiconAlternative)
          
          if (!compProduct) return null

          return (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Competitor Product */}
              <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🏢</span>
                  <span className="font-semibold text-gray-700">{comp?.name}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{compProduct.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{compProduct.category}</p>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {compProduct.priceMin.toFixed(2)}€ - {compProduct.priceMax.toFixed(2)}€
                  </div>
                  <div className="text-sm text-gray-500">pro {compProduct.unit}</div>
                </div>
              </div>

              {/* WEICON Product */}
              <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">WEICON</span>
                  <span className="font-semibold text-red-700">Unsere Alternative</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{compProduct.weiconAlternative}</h3>
                <p className="text-sm text-gray-500 mt-1">{compProduct.category}</p>
                {weiconProd && (
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {weiconProd.price.toFixed(2)}€
                    </div>
                    <div className="text-sm text-gray-500">pro {weiconProd.unit}</div>
                  </div>
                )}
                
                {compProduct.priceDiff !== null && (
                  <div className={`mt-3 p-3 rounded-lg ${compProduct.priceDiff > 0 ? 'bg-green-100' : 'bg-orange-100'}`}>
                    <p className={`text-sm font-semibold ${compProduct.priceDiff > 0 ? 'text-green-700' : 'text-orange-700'}`}>
                      {compProduct.priceDiff > 0 
                        ? `✅ Konkurrenz ist ${compProduct.priceDiff}% teurer — Verkaufschance!`
                        : `⚠️ Konkurrenz ist ${Math.abs(compProduct.priceDiff)}% günstiger — auf Qualität hinweisen!`
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })()}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">📊 Vergleichstabelle</h2>
        <p className="text-sm text-gray-500 mb-4">
          Alle Produkte mit WEICON-Alternative im Überblick
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-500">Konkurrenz-Produkt</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">Hersteller</th>
                <th className="text-right py-3 px-2 font-medium text-gray-500">Preis</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">WEICON</th>
                <th className="text-right py-3 px-2 font-medium text-gray-500">Diff.</th>
              </tr>
            </thead>
            <tbody>
              {comparableProducts.map(p => {
                const comp = competitors.find(c => c.id === p.competitorId)
                return (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium text-gray-900">{p.name}</td>
                    <td className="py-3 px-2 text-gray-600">{comp?.name}</td>
                    <td className="py-3 px-2 text-right text-gray-900">{p.priceMin.toFixed(2)}€</td>
                    <td className="py-3 px-2 text-red-600 font-medium">{p.weiconAlternative}</td>
                    <td className="py-3 px-2 text-right">
                      {p.priceDiff !== null && (
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          p.priceDiff > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {p.priceDiff > 0 ? '+' : ''}{p.priceDiff}%
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
        <h3 className="font-semibold text-gray-700 mb-2">Legende</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">+X%</span>
            <span>Konkurrenz ist teurer → Verkaufschance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">-X%</span>
            <span>Konkurrenz ist günstiger → Qualität betonen</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// PRICES VIEW
function PricesView({ products, competitors }) {
  const competitorStats = competitors.map(comp => {
    const compProducts = products.filter(p => p.competitorId === comp.id && p.priceDiff !== null)
    const avgDiff = compProducts.length > 0
      ? compProducts.reduce((a, p) => a + p.priceDiff, 0) / compProducts.length
      : null
    return { ...comp, avgDiff, productCount: compProducts.length }
  })
    .filter(c => c.avgDiff !== null)
    .sort((a, b) => a.avgDiff - b.avgDiff)

  const cheaper = competitorStats.filter(c => c.avgDiff < 0)
  const moreExpensive = competitorStats.filter(c => c.avgDiff > 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Preisanalyse</h1>
        <p className="text-sm text-gray-500">Durchschnittliche Preisabweichung zu WEICON</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-5 rounded-xl border border-green-100">
          <div className="text-4xl font-bold text-green-600">{cheaper.length}</div>
          <div className="text-sm text-green-700 font-medium mt-1">Günstiger als WEICON</div>
          <p className="text-xs text-green-600 mt-2">
            → Bei diesen auf WEICON-Qualität und Service hinweisen
          </p>
        </div>
        <div className="bg-red-50 p-5 rounded-xl border border-red-100">
          <div className="text-4xl font-bold text-red-600">{moreExpensive.length}</div>
          <div className="text-sm text-red-700 font-medium mt-1">Teurer als WEICON</div>
          <p className="text-xs text-red-600 mt-2">
            → Aktiv Kunden ansprechen — gleichwertig, aber günstiger!
          </p>
        </div>
      </div>

      {/* Price Bar Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-6">Preisvergleich nach Wettbewerber</h2>
        
        <div className="space-y-4">
          {competitorStats.map(comp => {
            const maxAbs = Math.max(...competitorStats.map(c => Math.abs(c.avgDiff || 0)), 25)
            const barWidth = Math.abs(comp.avgDiff) / maxAbs * 100
            
            return (
              <div key={comp.id} className="flex items-center gap-3">
                <div className="w-28 flex-shrink-0">
                  <div className="font-medium text-gray-900 text-sm truncate">{comp.name}</div>
                  <div className="text-xs text-gray-400">{comp.productCount} Produkte</div>
                </div>
                
                <div className="flex-1 flex items-center">
                  {/* Left side (cheaper) */}
                  <div className="flex-1 flex justify-end pr-1">
                    {comp.avgDiff < 0 && (
                      <div 
                        className="h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-l-lg flex items-center justify-end px-2"
                        style={{ width: `${barWidth}%`, minWidth: '40px' }}
                      >
                        <span className="text-white text-xs font-bold">{comp.avgDiff.toFixed(0)}%</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Center line */}
                  <div className="w-0.5 h-10 bg-gray-300 flex-shrink-0" />
                  
                  {/* Right side (more expensive) */}
                  <div className="flex-1 pl-1">
                    {comp.avgDiff > 0 && (
                      <div 
                        className="h-8 bg-gradient-to-r from-red-500 to-red-400 rounded-r-lg flex items-center px-2"
                        style={{ width: `${barWidth}%`, minWidth: '40px' }}
                      >
                        <span className="text-white text-xs font-bold">+{comp.avgDiff.toFixed(0)}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Axis Labels */}
        <div className="flex justify-between mt-6 text-xs text-gray-400 px-28">
          <span>← Günstiger</span>
          <span className="font-semibold text-gray-600">WEICON</span>
          <span>Teurer →</span>
        </div>
      </div>

      {/* Actionable Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">💡 Handlungsempfehlungen</h2>
        
        <div className="space-y-4">
          {moreExpensive.slice(0, 3).map(comp => (
            <div key={comp.id} className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold text-green-800">
                    {comp.name} Kunden ansprechen
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    Durchschnittlich <strong>{comp.avgDiff.toFixed(0)}% teurer</strong> als WEICON. 
                    Bei {comp.productCount} vergleichbaren Produkten können Sie mit Preisargumenten punkten.
                  </p>
                </div>
              </div>
            </div>
          ))}

          {cheaper.length > 0 && (
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-orange-800">Preisdruck beachten</h3>
                  <p className="text-sm text-orange-700 mt-1">
                    {cheaper.map(c => c.name).join(', ')} sind im Schnitt günstiger. 
                    Hier WEICON-Mehrwerte betonen: Qualität, Service, Made in Germany, technische Beratung.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// FAVORITES VIEW
function FavoritesView({ products, competitors, toggleFavorite }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-6xl block mb-4">⭐</span>
        <h2 className="text-xl font-semibold text-gray-900">Keine Favoriten</h2>
        <p className="text-gray-500 mt-2">
          Klicken Sie auf das ⭐ bei Produkten,<br />um sie hier zu speichern.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Gemerkte Produkte</h1>
        <p className="text-sm text-gray-500">{products.length} Produkte gespeichert</p>
      </div>

      <div className="grid gap-3">
        {products.map(product => {
          const comp = competitors.find(c => c.id === product.competitorId)
          return (
            <div key={product.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{comp?.name} · {product.category}</p>
                  {product.weiconAlternative && (
                    <p className="text-xs text-red-600 mt-1">→ {product.weiconAlternative}</p>
                  )}
                </div>
                <div className="text-right">
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className="text-xl text-yellow-500 hover:text-yellow-400 mb-2"
                  >
                    ⭐
                  </button>
                  <div className="font-medium text-gray-900">{product.priceMin.toFixed(2)}€</div>
                  {product.priceDiff !== null && (
                    <div className={`text-xs ${product.priceDiff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.priceDiff > 0 ? '+' : ''}{product.priceDiff}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
