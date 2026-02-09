import React, { useState, useMemo } from 'react';
import { competitors, products, categories, weiconProducts } from './data/competitors';

// Icons als SVG-Komponenten
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

// Statistik-Karte
const StatCard = ({ title, value, subtitle, icon, color }) => (
  <div className="stat-card rounded-2xl p-6 border border-white/10">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className={`text-3xl font-bold mt-2 ${color || 'text-white'}`}>{value}</p>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
        {icon}
      </div>
    </div>
  </div>
);

// Konkurrenz-Karte
const CompetitorCard = ({ competitor, productCount }) => (
  <div className={`glass-card rounded-xl p-5 border-l-4 cursor-pointer transition-all hover:scale-[1.02]`} style={{ borderLeftColor: competitor.color }}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-2xl">{competitor.logo}</span>
      <div>
        <h3 className="text-white font-semibold">{competitor.name}</h3>
        <p className="text-gray-400 text-sm">{competitor.country}</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div>
        <p className="text-gray-500">Umsatz</p>
        <p className="text-white font-medium">{competitor.revenue}</p>
      </div>
      <div>
        <p className="text-gray-500">Marktanteil</p>
        <p className="text-white font-medium">{competitor.marketShare}%</p>
      </div>
      <div>
        <p className="text-gray-500">Mitarbeiter</p>
        <p className="text-white font-medium">{competitor.employees.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-gray-500">Produkte</p>
        <p className="text-white font-medium">{productCount}</p>
      </div>
    </div>
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-green-400 text-xs">✓</span>
        <span className="text-gray-300 text-xs">{competitor.strengths[0]}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-red-400 text-xs">✗</span>
        <span className="text-gray-300 text-xs">{competitor.weaknesses[0]}</span>
      </div>
    </div>
  </div>
);

// Produkt-Karte
const ProductCard = ({ product, competitor }) => (
  <div className={`glass-card rounded-xl p-5 transition-all hover:scale-[1.02]`}>
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-lg">{competitor?.logo}</span>
        <span className="text-xs text-gray-400 px-2 py-1 bg-white/5 rounded-full">{competitor?.name}</span>
      </div>
      <div className="price-badge px-3 py-1 rounded-full">
        <span className="text-white font-bold text-sm">€{product.price.toFixed(2)}</span>
      </div>
    </div>
    <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
    <p className="text-blue-400 text-sm mb-3">{product.category}</p>
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div className="bg-white/5 rounded-lg p-2">
        <p className="text-gray-500">Typ</p>
        <p className="text-white">{product.type}</p>
      </div>
      <div className="bg-white/5 rounded-lg p-2">
        <p className="text-gray-500">Festigkeit</p>
        <p className="text-white">{product.strength}</p>
      </div>
      <div className="bg-white/5 rounded-lg p-2">
        <p className="text-gray-500">Aushärtung</p>
        <p className="text-white">{product.curing}</p>
      </div>
      <div className="bg-white/5 rounded-lg p-2">
        <p className="text-gray-500">Menge</p>
        <p className="text-white">{product.unit}</p>
      </div>
    </div>
    <div className="mt-3 pt-3 border-t border-white/10">
      <p className="text-gray-500 text-xs">Temperaturbereich</p>
      <p className="text-white text-sm">{product.temp_range}</p>
    </div>
  </div>
);

// Marktanteil-Chart (einfach, ohne externe Lib)
const MarketShareChart = () => {
  const sortedCompetitors = [...competitors].sort((a, b) => b.marketShare - a.marketShare);
  const maxShare = Math.max(...sortedCompetitors.map(c => c.marketShare));
  
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
        <ChartIcon /> Marktanteile im Überblick
      </h3>
      <div className="space-y-4">
        {sortedCompetitors.map(comp => (
          <div key={comp.id} className="flex items-center gap-3">
            <span className="text-lg w-8">{comp.logo}</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-gray-300 text-sm">{comp.name}</span>
                <span className="text-white font-medium text-sm">{comp.marketShare}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(comp.marketShare / maxShare) * 100}%`,
                    backgroundColor: comp.color 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Preisvergleich-Tabelle
const PriceComparison = ({ selectedCategory }) => {
  const categoryProducts = selectedCategory === 'Alle' 
    ? products 
    : products.filter(p => p.category === selectedCategory);
  
  const sortedByPrice = [...categoryProducts].sort((a, b) => a.price - b.price);
  const avgPrice = categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length;
  
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-white font-semibold text-lg mb-4">
        💰 Preisanalyse: {selectedCategory}
      </h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-500/10 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs">Günstigster</p>
          <p className="text-green-400 font-bold text-xl">€{sortedByPrice[0]?.price.toFixed(2) || '-'}</p>
          <p className="text-gray-300 text-xs mt-1">{sortedByPrice[0]?.name || '-'}</p>
        </div>
        <div className="bg-blue-500/10 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs">Durchschnitt</p>
          <p className="text-blue-400 font-bold text-xl">€{avgPrice.toFixed(2)}</p>
          <p className="text-gray-300 text-xs mt-1">{categoryProducts.length} Produkte</p>
        </div>
        <div className="bg-red-500/10 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs">Teuerster</p>
          <p className="text-red-400 font-bold text-xl">€{sortedByPrice[sortedByPrice.length - 1]?.price.toFixed(2) || '-'}</p>
          <p className="text-gray-300 text-xs mt-1">{sortedByPrice[sortedByPrice.length - 1]?.name || '-'}</p>
        </div>
      </div>
    </div>
  );
};

// WEICON Vergleichs-Tabelle
const WeiconComparison = () => (
  <div className="glass-card rounded-2xl p-6">
    <h3 className="text-white font-semibold text-lg mb-4">
      🎯 WEICON Produkt-Alternativen
    </h3>
    <div className="space-y-4">
      {weiconProducts.map((wp, idx) => (
        <div key={idx} className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-blue-400 font-medium">{wp.name}</h4>
            <span className="text-xs text-gray-400 px-2 py-1 bg-white/5 rounded-full">{wp.category}</span>
          </div>
          <p className="text-gray-400 text-sm mb-2">Vergleichbare Konkurrenzprodukte:</p>
          <div className="flex flex-wrap gap-2">
            {wp.comparable.map((comp, cidx) => {
              const product = products.find(p => p.name === comp);
              return (
                <span key={cidx} className="text-xs px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white rounded-full border border-white/10">
                  {comp} {product && <span className="text-green-400 ml-1">€{product.price}</span>}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Haupt-App
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedCompetitor, setSelectedCompetitor] = useState('Alle');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('products');
  const [priceRange, setPriceRange] = useState([0, 200]);
  
  // Gefilterte Produkte
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Alle' || product.category === selectedCategory;
      const matchesCompetitor = selectedCompetitor === 'Alle' || product.competitor === selectedCompetitor;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesCompetitor && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedCompetitor, priceRange]);
  
  // Statistiken
  const stats = useMemo(() => ({
    totalProducts: products.length,
    totalCompetitors: competitors.length,
    avgPrice: (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2),
    categories: [...new Set(products.map(p => p.category))].length
  }), []);
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                WEICON Konkurrenz Monitor
              </h1>
              <p className="text-gray-400 mt-2">
                Intelligente Marktanalyse für Industrieklebstoffe
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                ● Live
              </span>
              <span className="text-gray-400 text-sm">
                {new Date().toLocaleDateString('de-DE')}
              </span>
            </div>
          </div>
        </header>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Produkte" value={stats.totalProducts} icon="📦" color="text-blue-400" />
          <StatCard title="Konkurrenten" value={stats.totalCompetitors} icon="🏢" color="text-purple-400" />
          <StatCard title="Ø Preis" value={`€${stats.avgPrice}`} icon="💰" color="text-green-400" />
          <StatCard title="Kategorien" value={stats.categories} icon="📁" color="text-orange-400" />
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['products', 'competitors', 'analysis', 'weicon'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {tab === 'products' && '📦 Produkte'}
              {tab === 'competitors' && '🏢 Konkurrenten'}
              {tab === 'analysis' && '📊 Analyse'}
              {tab === 'weicon' && '🎯 WEICON Vergleich'}
            </button>
          ))}
        </div>
        
        {/* Search & Filters */}
        {(activeTab === 'products' || activeTab === 'analysis') && (
          <div className="glass-card rounded-2xl p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Produkte suchen... (Name, Typ, Kategorie)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 search-glow transition-all"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <FilterIcon />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                  ))}
                </select>
              </div>
              
              {/* Competitor Filter */}
              <select
                value={selectedCompetitor}
                onChange={(e) => setSelectedCompetitor(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Alle" className="bg-slate-800">Alle Hersteller</option>
                {competitors.map(comp => (
                  <option key={comp.id} value={comp.id} className="bg-slate-800">{comp.name}</option>
                ))}
              </select>
              
              {/* View Toggle */}
              <div className="flex bg-white/5 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                >
                  <GridIcon />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                >
                  <ListIcon />
                </button>
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mt-4 flex items-center gap-4">
              <span className="text-gray-400 text-sm">Preis:</span>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="flex-1 accent-blue-500"
              />
              <span className="text-white text-sm font-medium">bis €{priceRange[1]}</span>
            </div>
            
            {/* Results count */}
            <div className="mt-4 text-gray-400 text-sm">
              {filteredProducts.length} von {products.length} Produkten
            </div>
          </div>
        )}
        
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'space-y-3'
          }>
            {filteredProducts.map(product => {
              const competitor = competitors.find(c => c.id === product.competitor);
              return viewMode === 'grid' ? (
                <ProductCard key={product.id} product={product} competitor={competitor} />
              ) : (
                <div key={product.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xl">{competitor?.logo}</span>
                    <div>
                      <h3 className="text-white font-medium">{product.name}</h3>
                      <p className="text-gray-400 text-sm">{product.category} • {product.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">€{product.price.toFixed(2)}</p>
                    <p className="text-gray-500 text-xs">{product.unit}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Competitors Tab */}
        {activeTab === 'competitors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitors.map(comp => {
              const productCount = products.filter(p => p.competitor === comp.id).length;
              return <CompetitorCard key={comp.id} competitor={comp} productCount={productCount} />;
            })}
          </div>
        )}
        
        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MarketShareChart />
            <PriceComparison selectedCategory={selectedCategory} />
          </div>
        )}
        
        {/* WEICON Comparison Tab */}
        {activeTab === 'weicon' && (
          <WeiconComparison />
        )}
        
        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>WEICON Konkurrenz Monitor • Für interne Marktanalyse</p>
          <p className="mt-1">Daten: Stand Februar 2024 • Alle Preise in EUR inkl. MwSt.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
