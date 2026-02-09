import { useState, useEffect } from 'react'
import { competitors, products, categories, marketData } from './data/competitors'

// Login credentials
const VALID_USER = {
  email: 'bianca@lesmodog.de',
  password: 'WEICON2024!'
}

// Login Page
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    setTimeout(() => {
      if (email.toLowerCase() === VALID_USER.email.toLowerCase() && password === VALID_USER.password) {
        localStorage.setItem('weicon_auth', JSON.stringify({ email, timestamp: Date.now() }))
        onLogin({ email })
      } else {
        setError('Ungültige Anmeldedaten')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">Konkurrenz-Monitor</h1>
          <p className="text-slate-500 mt-1">WEICON Marktanalyse</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900"
                placeholder="ihre@email.de"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900"
                placeholder="••••••••"
                required
              />
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? 'Wird geprüft...' : 'Anmelden'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          © 2024 WEICON GmbH & Co. KG · Vertraulich
        </p>
      </div>
    </div>
  )
}

// Main Dashboard
function Dashboard({ user, onLogout }) {
  const [activeView, setActiveView] = useState('overview')
  const [selectedCompetitor, setSelectedCompetitor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('weicon_notes')
    return saved ? JSON.parse(saved) : {}
  })
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('weicon_watchlist')
    return saved ? JSON.parse(saved) : []
  })
  const [priceAlerts, setPriceAlerts] = useState(() => {
    const saved = localStorage.getItem('weicon_alerts')
    return saved ? JSON.parse(saved) : []
  })
  const [compareProducts, setCompareProducts] = useState([])
  const [showCompareModal, setShowCompareModal] = useState(false)

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('weicon_notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem('weicon_watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  useEffect(() => {
    localStorage.setItem('weicon_alerts', JSON.stringify(priceAlerts))
  }, [priceAlerts])

  // Filter products based on search
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    competitors.find(c => c.id === p.competitorId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCompetitors = competitors.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Stats
  const avgPriceDiff = products.filter(p => p.priceDiff !== null).reduce((acc, p) => acc + p.priceDiff, 0) / products.filter(p => p.priceDiff !== null).length
  const cheaperCount = products.filter(p => p.priceDiff !== null && p.priceDiff < 0).length
  const moreExpensiveCount = products.filter(p => p.priceDiff !== null && p.priceDiff > 0).length

  const toggleWatchlist = (productId) => {
    setWatchlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const addNote = (entityId, entityType, noteText) => {
    const key = `${entityType}-${entityId}`
    setNotes(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), { text: noteText, date: new Date().toISOString() }]
    }))
  }

  const toggleCompare = (productId) => {
    setCompareProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      }
      if (prev.length >= 4) {
        return prev
      }
      return [...prev, productId]
    })
  }

  // Navigation Items
  const navItems = [
    { id: 'overview', label: 'Übersicht', icon: '📊' },
    { id: 'competitors', label: 'Wettbewerber', icon: '🏢' },
    { id: 'products', label: 'Produkte', icon: '📦' },
    { id: 'priceradar', label: 'Preis-Radar', icon: '💰' },
    { id: 'watchlist', label: 'Merkliste', icon: '⭐', count: watchlist.length },
    { id: 'insights', label: 'Insights', icon: '💡' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Konkurrenz-Monitor</h1>
                <p className="text-xs text-slate-500">Klebstoff-Marktanalyse</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Compare Button */}
              {compareProducts.length > 0 && (
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
                >
                  Vergleichen ({compareProducts.length})
                </button>
              )}

              {/* User Menu */}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-slate-900">Bianca</p>
                  <p className="text-xs text-slate-500">WEICON</p>
                </div>
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-slate-600 p-2"
                  title="Abmelden"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <nav className="w-56 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeView === item.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {item.count > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40">
            <div className="flex justify-around py-2">
              {navItems.slice(0, 5).map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 ${
                    activeView === item.id ? 'text-blue-600' : 'text-slate-400'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0 pb-20 lg:pb-0">
            {activeView === 'overview' && (
              <OverviewView 
                competitors={competitors}
                products={products}
                avgPriceDiff={avgPriceDiff}
                cheaperCount={cheaperCount}
                moreExpensiveCount={moreExpensiveCount}
                onSelectCompetitor={(c) => { setSelectedCompetitor(c); setActiveView('competitors'); }}
              />
            )}
            {activeView === 'competitors' && (
              <CompetitorsView 
                competitors={searchQuery ? filteredCompetitors : competitors}
                products={products}
                notes={notes}
                onAddNote={addNote}
                selectedCompetitor={selectedCompetitor}
                onSelectCompetitor={setSelectedCompetitor}
              />
            )}
            {activeView === 'products' && (
              <ProductsView 
                products={searchQuery ? filteredProducts : products}
                competitors={competitors}
                watchlist={watchlist}
                onToggleWatchlist={toggleWatchlist}
                compareProducts={compareProducts}
                onToggleCompare={toggleCompare}
              />
            )}
            {activeView === 'priceradar' && (
              <PriceRadarView products={products} competitors={competitors} />
            )}
            {activeView === 'watchlist' && (
              <WatchlistView 
                products={products.filter(p => watchlist.includes(p.id))}
                competitors={competitors}
                onRemove={toggleWatchlist}
              />
            )}
            {activeView === 'insights' && (
              <InsightsView 
                competitors={competitors}
                products={products}
                marketData={marketData}
              />
            )}
          </main>
        </div>
      </div>

      {/* Compare Modal */}
      {showCompareModal && (
        <CompareModal
          products={products.filter(p => compareProducts.includes(p.id))}
          competitors={competitors}
          onClose={() => setShowCompareModal(false)}
          onRemove={(id) => setCompareProducts(prev => prev.filter(p => p !== id))}
        />
      )}
    </div>
  )
}

// Overview View
function OverviewView({ competitors, products, avgPriceDiff, cheaperCount, moreExpensiveCount, onSelectCompetitor }) {
  const germanCompetitors = competitors.filter(c => c.country === 'Deutschland')
  const similarSizeCompetitors = competitors.filter(c => c.marketPosition.includes('Ähnliche'))

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Willkommen zurück, Bianca</h2>
        <p className="text-blue-100">Hier ist Ihre aktuelle Marktübersicht für den deutschen Klebstoff-Markt.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          label="Wettbewerber"
          value={competitors.length}
          sublabel="im Monitoring"
          icon="🏢"
        />
        <MetricCard 
          label="Produkte"
          value={products.length}
          sublabel="erfasst"
          icon="📦"
        />
        <MetricCard 
          label="Ø Preisdifferenz"
          value={`${avgPriceDiff > 0 ? '+' : ''}${avgPriceDiff.toFixed(0)}%`}
          sublabel="vs. WEICON"
          icon="💰"
          trend={avgPriceDiff > 0 ? 'positive' : 'negative'}
        />
        <MetricCard 
          label="Marktgröße"
          value={marketData.totalMarketSize}
          sublabel={`${marketData.growth} Wachstum`}
          icon="📈"
        />
      </div>

      {/* Price Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Preisniveau der Konkurrenz</h3>
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="flex items-end gap-4 mb-4">
              <div className="flex-1">
                <div className="h-32 bg-green-100 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-green-600">{cheaperCount}</span>
                  <span className="text-sm text-green-700">günstiger</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="h-32 bg-red-100 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-red-600">{moreExpensiveCount}</span>
                  <span className="text-sm text-red-700">teurer</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              Von {products.filter(p => p.priceDiff !== null).length} vergleichbaren Produkten sind {cheaperCount} günstiger und {moreExpensiveCount} teurer als WEICON-Alternativen.
            </p>
          </div>
        </div>
      </div>

      {/* Top Competitors */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Direkte Wettbewerber</h3>
          <span className="text-sm text-slate-500">{similarSizeCompetitors.length} in ähnlicher Größe</span>
        </div>
        <div className="grid gap-3">
          {similarSizeCompetitors.slice(0, 5).map(comp => (
            <button
              key={comp.id}
              onClick={() => onSelectCompetitor(comp)}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-lg font-semibold text-slate-600">
                  {comp.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">{comp.name}</h4>
                  <p className="text-sm text-slate-500">{comp.city}, {comp.country}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{comp.revenueEstimate}</p>
                <p className="text-xs text-slate-500">{comp.employees} Mitarbeiter</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Metric Card Component
function MetricCard({ label, value, sublabel, icon, trend }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            trend === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend === 'positive' ? '↑' : '↓'}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
      {sublabel && <p className="text-xs text-slate-400">{sublabel}</p>}
    </div>
  )
}

// Competitors View
function CompetitorsView({ competitors, products, notes, onAddNote, selectedCompetitor, onSelectCompetitor }) {
  const [noteInput, setNoteInput] = useState('')

  const getCompetitorProducts = (compId) => products.filter(p => p.competitorId === compId)
  
  if (selectedCompetitor) {
    const comp = selectedCompetitor
    const compProducts = getCompetitorProducts(comp.id)
    const compNotes = notes[`competitor-${comp.id}`] || []

    return (
      <div className="space-y-6">
        <button
          onClick={() => onSelectCompetitor(null)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zurück zur Übersicht
        </button>

        {/* Competitor Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl font-bold text-blue-600">
              {comp.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">{comp.name}</h2>
              <p className="text-slate-500 mt-1">{comp.city}, {comp.country} · Gegründet {comp.founded}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-600">{comp.employees} Mitarbeiter</span>
                <span className="px-3 py-1 bg-blue-100 rounded-full text-sm text-blue-600">{comp.revenueEstimate}</span>
                <span className="px-3 py-1 bg-green-100 rounded-full text-sm text-green-600">{comp.marketPosition}</span>
              </div>
            </div>
            <a 
              href={`https://${comp.website}`} 
              target="_blank" 
              rel="noopener"
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50"
            >
              Website →
            </a>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Unternehmensprofil</h3>
            <dl className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <dt className="text-slate-500">Spezialisierung</dt>
                <dd className="text-slate-900 font-medium text-right">{comp.specialty}</dd>
              </div>
              <div>
                <dt className="text-slate-500 mb-2">Stärken</dt>
                <dd className="flex flex-wrap gap-2">
                  {comp.strengths.map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm">{s}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500 mb-2">Schwächen</dt>
                <dd className="flex flex-wrap gap-2">
                  {comp.weaknesses.map((w, i) => (
                    <span key={i} className="px-2 py-1 bg-red-50 text-red-700 rounded text-sm">{w}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Eigene Notizen</h3>
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {compNotes.length === 0 ? (
                <p className="text-slate-400 text-sm">Noch keine Notizen vorhanden.</p>
              ) : (
                compNotes.map((note, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-700">{note.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{new Date(note.date).toLocaleDateString('de-DE')}</p>
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Notiz hinzufügen..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && noteInput.trim()) {
                    onAddNote(comp.id, 'competitor', noteInput.trim())
                    setNoteInput('')
                  }
                }}
              />
              <button
                onClick={() => {
                  if (noteInput.trim()) {
                    onAddNote(comp.id, 'competitor', noteInput.trim())
                    setNoteInput('')
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Produkte ({compProducts.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Produkt</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Kategorie</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Preisspanne</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">WEICON Alternative</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Differenz</th>
                </tr>
              </thead>
              <tbody>
                {compProducts.map(product => (
                  <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-slate-900">{product.name}</td>
                    <td className="py-3 px-4 text-slate-600">{product.category}</td>
                    <td className="py-3 px-4 text-right text-slate-900">
                      {product.priceMin.toFixed(2)}€ - {product.priceMax.toFixed(2)}€
                      <span className="text-slate-400 text-sm ml-1">/{product.unit}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{product.weiconAlternative || '—'}</td>
                    <td className="py-3 px-4 text-right">
                      {product.priceDiff !== null ? (
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          product.priceDiff < 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {product.priceDiff > 0 ? '+' : ''}{product.priceDiff}%
                        </span>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Wettbewerber</h2>
        <span className="text-sm text-slate-500">{competitors.length} Unternehmen</span>
      </div>

      <div className="grid gap-4">
        {competitors.map(comp => (
          <button
            key={comp.id}
            onClick={() => onSelectCompetitor(comp)}
            className="bg-white rounded-2xl border border-slate-200 p-5 text-left hover:border-blue-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-xl font-bold text-slate-600">
                {comp.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-slate-900">{comp.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    comp.country === 'Deutschland' ? 'bg-yellow-100 text-yellow-800' :
                    comp.country === 'Schweiz' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {comp.country === 'Deutschland' ? '🇩🇪' : comp.country === 'Schweiz' ? '🇨🇭' : '🇦🇹'} {comp.country}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1 truncate">{comp.specialty}</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="font-medium text-slate-900">{comp.revenueEstimate}</p>
                <p className="text-sm text-slate-500">{comp.employees} MA</p>
              </div>
              <div className="hidden md:block">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  comp.marketPosition.includes('Größer') ? 'bg-orange-100 text-orange-700' :
                  comp.marketPosition.includes('Kleiner') ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {comp.marketPosition.includes('Größer') ? '↑ Größer' :
                   comp.marketPosition.includes('Kleiner') ? '↓ Kleiner' :
                   '≈ Ähnlich'}
                </span>
              </div>
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Products View
function ProductsView({ products, competitors, watchlist, onToggleWatchlist, compareProducts, onToggleCompare }) {
  const [sortBy, setSortBy] = useState('name')
  const [filterCategory, setFilterCategory] = useState('')
  
  const getCompetitorName = (id) => competitors.find(c => c.id === id)?.name || ''
  
  const uniqueCategories = [...new Set(products.map(p => p.category))]
  
  const sortedProducts = [...products]
    .filter(p => !filterCategory || p.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'price') return a.priceMin - b.priceMin
      if (sortBy === 'diff') return (a.priceDiff || 0) - (b.priceDiff || 0)
      if (sortBy === 'competitor') return getCompetitorName(a.competitorId).localeCompare(getCompetitorName(b.competitorId))
      return 0
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900">Produktdatenbank</h2>
        <div className="flex gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white"
          >
            <option value="">Alle Kategorien</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white"
          >
            <option value="name">Name</option>
            <option value="competitor">Wettbewerber</option>
            <option value="price">Preis</option>
            <option value="diff">Differenz</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-4 px-5 text-sm font-medium text-slate-500">Produkt</th>
                <th className="text-left py-4 px-5 text-sm font-medium text-slate-500">Wettbewerber</th>
                <th className="text-left py-4 px-5 text-sm font-medium text-slate-500">Kategorie</th>
                <th className="text-right py-4 px-5 text-sm font-medium text-slate-500">Preis</th>
                <th className="text-left py-4 px-5 text-sm font-medium text-slate-500">WEICON</th>
                <th className="text-right py-4 px-5 text-sm font-medium text-slate-500">Diff.</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map(product => (
                <tr key={product.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-5">
                    <p className="font-medium text-slate-900">{product.name}</p>
                  </td>
                  <td className="py-4 px-5 text-slate-600">{getCompetitorName(product.competitorId)}</td>
                  <td className="py-4 px-5">
                    <span className="px-2 py-1 bg-slate-100 rounded text-sm text-slate-600">{product.category}</span>
                  </td>
                  <td className="py-4 px-5 text-right text-slate-900">
                    {product.priceMin.toFixed(2)}€ - {product.priceMax.toFixed(2)}€
                    <span className="text-slate-400 text-xs block">pro {product.unit}</span>
                  </td>
                  <td className="py-4 px-5 text-sm text-slate-600">{product.weiconAlternative || '—'}</td>
                  <td className="py-4 px-5 text-right">
                    {product.priceDiff !== null ? (
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        product.priceDiff < 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.priceDiff > 0 ? '+' : ''}{product.priceDiff}%
                      </span>
                    ) : '—'}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => onToggleCompare(product.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          compareProducts.includes(product.id) 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'hover:bg-slate-100 text-slate-400'
                        }`}
                        title={compareProducts.includes(product.id) ? 'Aus Vergleich entfernen' : 'Zum Vergleich hinzufügen'}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onToggleWatchlist(product.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          watchlist.includes(product.id) 
                            ? 'bg-yellow-100 text-yellow-600' 
                            : 'hover:bg-slate-100 text-slate-400'
                        }`}
                        title={watchlist.includes(product.id) ? 'Von Merkliste entfernen' : 'Zur Merkliste'}
                      >
                        <svg className="w-4 h-4" fill={watchlist.includes(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Price Radar View
function PriceRadarView({ products, competitors }) {
  const productsByCompetitor = competitors.map(comp => {
    const compProducts = products.filter(p => p.competitorId === comp.id && p.priceDiff !== null)
    const avgDiff = compProducts.length > 0 
      ? compProducts.reduce((acc, p) => acc + p.priceDiff, 0) / compProducts.length 
      : 0
    return { ...comp, avgDiff, productCount: compProducts.length }
  }).sort((a, b) => a.avgDiff - b.avgDiff)

  const maxDiff = Math.max(...productsByCompetitor.map(c => Math.abs(c.avgDiff)), 30)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Preis-Radar</h2>
        <p className="text-slate-500 mt-1">Durchschnittliche Preisabweichung zu WEICON-Produkten</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="space-y-4">
          {productsByCompetitor.map(comp => (
            <div key={comp.id} className="flex items-center gap-4">
              <div className="w-32 flex-shrink-0">
                <p className="font-medium text-slate-900 text-sm truncate">{comp.name}</p>
                <p className="text-xs text-slate-400">{comp.productCount} Produkte</p>
              </div>
              <div className="flex-1 flex items-center gap-2">
                {/* Negative bar (cheaper) */}
                <div className="flex-1 flex justify-end">
                  {comp.avgDiff < 0 && (
                    <div 
                      className="h-8 bg-green-500 rounded-l"
                      style={{ width: `${(Math.abs(comp.avgDiff) / maxDiff) * 100}%` }}
                    />
                  )}
                </div>
                {/* Center line */}
                <div className="w-px h-10 bg-slate-300" />
                {/* Positive bar (more expensive) */}
                <div className="flex-1">
                  {comp.avgDiff > 0 && (
                    <div 
                      className="h-8 bg-red-500 rounded-r"
                      style={{ width: `${(comp.avgDiff / maxDiff) * 100}%` }}
                    />
                  )}
                </div>
              </div>
              <div className="w-20 text-right">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  comp.avgDiff < 0 ? 'bg-green-100 text-green-700' : 
                  comp.avgDiff > 0 ? 'bg-red-100 text-red-700' : 
                  'bg-slate-100 text-slate-700'
                }`}>
                  {comp.avgDiff > 0 ? '+' : ''}{comp.avgDiff.toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-8 mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span className="text-sm text-slate-600">Günstiger als WEICON</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded" />
            <span className="text-sm text-slate-600">Teurer als WEICON</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Preisvergleich nach Kategorie</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...new Set(products.map(p => p.category))].map(category => {
            const catProducts = products.filter(p => p.category === category && p.priceDiff !== null)
            if (catProducts.length === 0) return null
            const avgDiff = catProducts.reduce((acc, p) => acc + p.priceDiff, 0) / catProducts.length
            
            return (
              <div key={category} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900">{category}</p>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    avgDiff < 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {avgDiff > 0 ? '+' : ''}{avgDiff.toFixed(0)}%
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{catProducts.length} Produkte verglichen</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Watchlist View
function WatchlistView({ products, competitors, onRemove }) {
  const getCompetitorName = (id) => competitors.find(c => c.id === id)?.name || ''

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">⭐</span>
        </div>
        <h2 className="text-xl font-semibold text-slate-900">Merkliste ist leer</h2>
        <p className="text-slate-500 mt-2">Markieren Sie interessante Produkte mit dem Stern-Symbol.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Merkliste</h2>
        <span className="text-sm text-slate-500">{products.length} Produkte</span>
      </div>

      <div className="grid gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{product.name}</h3>
                <p className="text-sm text-slate-500">{getCompetitorName(product.competitorId)} · {product.category}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium text-slate-900">{product.priceMin.toFixed(2)}€ - {product.priceMax.toFixed(2)}€</p>
                  {product.priceDiff !== null && (
                    <span className={`text-sm ${product.priceDiff < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.priceDiff > 0 ? '+' : ''}{product.priceDiff}% vs. WEICON
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onRemove(product.id)}
                  className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Insights View
function InsightsView({ competitors, products, marketData }) {
  const germanComp = competitors.filter(c => c.country === 'Deutschland')
  const productWithAlt = products.filter(p => p.weiconAlternative)
  const noAltProducts = products.filter(p => !p.weiconAlternative)
  
  const categoryStats = [...new Set(products.map(p => p.category))].map(cat => {
    const catProducts = products.filter(p => p.category === cat)
    return {
      name: cat,
      count: catProducts.length,
      withAlt: catProducts.filter(p => p.weiconAlternative).length
    }
  }).sort((a, b) => b.count - a.count)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Markt-Insights</h2>
        <p className="text-slate-500 mt-1">Strategische Erkenntnisse aus der Wettbewerbsanalyse</p>
      </div>

      {/* Key Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Produktlücken identifiziert</h3>
              <p className="text-slate-500 text-sm mt-1">
                {noAltProducts.length} Konkurrenzprodukte ohne direkte WEICON-Alternative
              </p>
              <div className="mt-3 space-y-1">
                {noAltProducts.slice(0, 3).map(p => (
                  <p key={p.id} className="text-sm text-slate-600">• {p.name} ({p.category})</p>
                ))}
                {noAltProducts.length > 3 && (
                  <p className="text-sm text-blue-600">+ {noAltProducts.length - 3} weitere</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Preisvorteile nutzen</h3>
              <p className="text-slate-500 text-sm mt-1">
                Bei {products.filter(p => p.priceDiff !== null && p.priceDiff > 10).length} Produkten liegt die Konkurrenz &gt;10% über WEICON
              </p>
              <p className="text-sm text-slate-600 mt-3">
                Besonders bei Premium-Anbietern wie Drei Bond, Kisling und Panacol gibt es Potenzial für Kundengewinnung.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">⚠️</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Preisdruck beachten</h3>
              <p className="text-slate-500 text-sm mt-1">
                {products.filter(p => p.priceDiff !== null && p.priceDiff < -10).length} Konkurrenzprodukte sind &gt;10% günstiger
              </p>
              <p className="text-sm text-slate-600 mt-3">
                Besonders Cyberbond und Marston-Domsel bieten günstige Alternativen im CA-Bereich.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Marktposition</h3>
              <p className="text-slate-500 text-sm mt-1">
                WEICON: ca. {marketData.weiconShare} Marktanteil im Segment
              </p>
              <p className="text-sm text-slate-600 mt-3">
                {competitors.filter(c => c.marketPosition.includes('Ähnliche')).length} Wettbewerber in ähnlicher Größenordnung, 
                {competitors.filter(c => c.marketPosition.includes('Größer')).length} größere und 
                {competitors.filter(c => c.marketPosition.includes('Kleiner')).length} kleinere Anbieter.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Segments */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Marktsegmente</h3>
        <div className="space-y-3">
          {marketData.topSegments.map((segment, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-40 text-sm text-slate-600">{segment.name}</div>
              <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${segment.share}%` }}
                />
              </div>
              <div className="w-12 text-right text-sm font-medium text-slate-900">{segment.share}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Produktabdeckung nach Kategorie</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categoryStats.map(cat => (
            <div key={cat.name} className="p-4 bg-slate-50 rounded-xl">
              <p className="font-medium text-slate-900">{cat.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(cat.withAlt / cat.count) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500">{cat.withAlt}/{cat.count}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">WEICON-Abdeckung</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Compare Modal
function CompareModal({ products, competitors, onClose, onRemove }) {
  const getCompetitorName = (id) => competitors.find(c => c.id === id)?.name || ''

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Produktvergleich</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Eigenschaft</th>
                {products.map(p => (
                  <th key={p.id} className="text-left py-3 px-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-900">{p.name}</span>
                      <button 
                        onClick={() => onRemove(p.id)}
                        className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-500"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50">
                <td className="py-3 px-4 text-sm text-slate-500">Hersteller</td>
                {products.map(p => (
                  <td key={p.id} className="py-3 px-4 text-slate-900">{getCompetitorName(p.competitorId)}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-50">
                <td className="py-3 px-4 text-sm text-slate-500">Kategorie</td>
                {products.map(p => (
                  <td key={p.id} className="py-3 px-4 text-slate-900">{p.category}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-50">
                <td className="py-3 px-4 text-sm text-slate-500">Preisspanne</td>
                {products.map(p => (
                  <td key={p.id} className="py-3 px-4 text-slate-900">
                    {p.priceMin.toFixed(2)}€ - {p.priceMax.toFixed(2)}€
                    <span className="text-slate-400 text-xs block">/{p.unit}</span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-slate-50">
                <td className="py-3 px-4 text-sm text-slate-500">WEICON Alternative</td>
                {products.map(p => (
                  <td key={p.id} className="py-3 px-4 text-slate-900">{p.weiconAlternative || '—'}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-slate-500">Preisdifferenz</td>
                {products.map(p => (
                  <td key={p.id} className="py-3 px-4">
                    {p.priceDiff !== null ? (
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        p.priceDiff < 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {p.priceDiff > 0 ? '+' : ''}{p.priceDiff}%
                      </span>
                    ) : '—'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Main App
function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('weicon_auth')
    if (saved) {
      const data = JSON.parse(saved)
      // Check if session is still valid (24h)
      if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
        return data
      }
      localStorage.removeItem('weicon_auth')
    }
    return null
  })

  const handleLogout = () => {
    localStorage.removeItem('weicon_auth')
    setUser(null)
  }

  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

  return <Dashboard user={user} onLogout={handleLogout} />
}

export default App
