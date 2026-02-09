import React, { useState, useMemo, useEffect } from 'react';
import { competitors, products, categories, weiconProducts } from './data/competitors';

// ==================== LOGIN COMPONENT ====================
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Vordefinierte Benutzer (kann später durch Backend ersetzt werden)
  const users = [
    { email: 'admin@weicon.de', password: 'weicon2024', name: 'Administrator', role: 'admin' },
    { email: 'vertrieb@weicon.de', password: 'sales2024', name: 'Vertrieb', role: 'sales' },
    { email: 'demo@weicon.de', password: 'demo', name: 'Demo User', role: 'viewer' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulierte Verzögerung für realistisches Gefühl
    await new Promise(r => setTimeout(r, 800));
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('weicon-user', JSON.stringify(user));
      onLogin(user);
    } else {
      setError('Ungültige E-Mail oder Passwort');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/20">
            <span className="text-4xl">🔬</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">WEICON Monitor</h1>
          <p className="text-gray-400">Konkurrenz-Analyse Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-3xl p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@weicon.de"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/25"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Anmelden...
                </span>
              ) : 'Anmelden'}
            </button>
          </form>

          {/* Demo Hint */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-500 text-xs text-center mb-3">Demo-Zugang:</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => { setEmail('demo@weicon.de'); setPassword('demo'); }}
                className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg transition-all"
              >
                Demo User
              </button>
              <button
                onClick={() => { setEmail('admin@weicon.de'); setPassword('weicon2024'); }}
                className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg transition-all"
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-8">
          © 2024 WEICON GmbH & Co. KG • Nur für interne Nutzung
        </p>
      </div>
    </div>
  );
};

// ==================== ICONS ====================
const Icons = {
  Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Grid: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  List: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
  Logout: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
  User: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
};

// ==================== COMPONENTS ====================
const StatCard = ({ title, value, subtitle, icon, trend }) => (
  <div className="glass-card rounded-2xl p-6 hover:border-white/20 transition-all group">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">{title}</p>
        <p className="text-4xl font-bold text-white mt-2 tracking-tight">{value}</p>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
    {trend && (
      <div className="mt-4 pt-4 border-t border-white/5">
        <span className={`text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs. Vormonat
        </span>
      </div>
    )}
  </div>
);

const CompetitorCard = ({ competitor, productCount }) => (
  <div className="glass-card rounded-2xl p-6 hover:border-white/20 transition-all cursor-pointer group">
    <div className="flex items-center gap-4 mb-4">
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{ backgroundColor: competitor.color + '20' }}
      >
        {competitor.logo}
      </div>
      <div className="flex-1">
        <h3 className="text-white font-semibold text-lg">{competitor.name}</h3>
        <p className="text-gray-400 text-sm">{competitor.country}</p>
      </div>
      <div 
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: competitor.color }}
      />
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p className="text-gray-500 text-xs uppercase tracking-wider">Umsatz</p>
        <p className="text-white font-semibold">{competitor.revenue}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase tracking-wider">Marktanteil</p>
        <p className="text-white font-semibold">{competitor.marketShare}%</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase tracking-wider">Mitarbeiter</p>
        <p className="text-white font-semibold">{competitor.employees.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase tracking-wider">Produkte</p>
        <p className="text-white font-semibold">{productCount}</p>
      </div>
    </div>
    
    <div className="space-y-2 pt-4 border-t border-white/5">
      <div className="flex items-start gap-2">
        <span className="text-green-400 text-sm">+</span>
        <span className="text-gray-400 text-sm">{competitor.strengths[0]}</span>
      </div>
      <div className="flex items-start gap-2">
        <span className="text-red-400 text-sm">−</span>
        <span className="text-gray-400 text-sm">{competitor.weaknesses[0]}</span>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product, competitor }) => (
  <div className="glass-card rounded-2xl p-6 hover:border-white/20 transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <span className="text-xl">{competitor?.logo}</span>
        <span className="text-xs text-gray-400 px-2 py-1 bg-white/5 rounded-lg">{competitor?.name}</span>
      </div>
      <div className="px-3 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/20">
        <span className="text-green-400 font-bold">€{product.price.toFixed(2)}</span>
      </div>
    </div>
    
    <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-blue-400 transition-colors">{product.name}</h3>
    <p className="text-blue-400/70 text-sm mb-4">{product.category}</p>
    
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: 'Typ', value: product.type },
        { label: 'Festigkeit', value: product.strength },
        { label: 'Aushärtung', value: product.curing },
        { label: 'Menge', value: product.unit },
      ].map(({ label, value }) => (
        <div key={label} className="bg-white/5 rounded-xl p-3">
          <p className="text-gray-500 text-xs uppercase tracking-wider">{label}</p>
          <p className="text-white text-sm font-medium truncate">{value}</p>
        </div>
      ))}
    </div>
    
    <div className="mt-4 pt-4 border-t border-white/5">
      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Temperaturbereich</p>
      <p className="text-white text-sm">{product.temp_range}</p>
    </div>
  </div>
);

const MarketShareChart = () => {
  const sortedCompetitors = [...competitors].sort((a, b) => b.marketShare - a.marketShare);
  const maxShare = Math.max(...sortedCompetitors.map(c => c.marketShare));
  
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-white font-semibold text-xl mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
          <Icons.Chart />
        </div>
        Marktanteile
      </h3>
      <div className="space-y-4">
        {sortedCompetitors.map((comp, idx) => (
          <div key={comp.id} className="group">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm w-4">{idx + 1}</span>
              <span className="text-xl w-8">{comp.logo}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-medium">{comp.name}</span>
                  <span className="text-white font-bold">{comp.marketShare}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700 group-hover:opacity-80"
                    style={{ 
                      width: `${(comp.marketShare / maxShare) * 100}%`,
                      backgroundColor: comp.color 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PriceComparison = ({ selectedCategory }) => {
  const categoryProducts = selectedCategory === 'Alle' 
    ? products 
    : products.filter(p => p.category === selectedCategory);
  
  const sortedByPrice = [...categoryProducts].sort((a, b) => a.price - b.price);
  const avgPrice = categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length || 0;
  
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-white font-semibold text-xl mb-6">
        💰 Preisanalyse: {selectedCategory}
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-2xl p-5 border border-green-500/10">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Günstigster</p>
          <p className="text-green-400 font-bold text-2xl">€{sortedByPrice[0]?.price.toFixed(2) || '-'}</p>
          <p className="text-gray-400 text-xs mt-2 truncate">{sortedByPrice[0]?.name || '-'}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/5 rounded-2xl p-5 border border-blue-500/10">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Durchschnitt</p>
          <p className="text-blue-400 font-bold text-2xl">€{avgPrice.toFixed(2)}</p>
          <p className="text-gray-400 text-xs mt-2">{categoryProducts.length} Produkte</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/5 rounded-2xl p-5 border border-red-500/10">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Teuerster</p>
          <p className="text-red-400 font-bold text-2xl">€{sortedByPrice[sortedByPrice.length - 1]?.price.toFixed(2) || '-'}</p>
          <p className="text-gray-400 text-xs mt-2 truncate">{sortedByPrice[sortedByPrice.length - 1]?.name || '-'}</p>
        </div>
      </div>
    </div>
  );
};

const WeiconComparison = () => (
  <div className="glass-card rounded-2xl p-6">
    <h3 className="text-white font-semibold text-xl mb-6">
      🎯 WEICON Produkt-Alternativen
    </h3>
    <div className="space-y-4">
      {weiconProducts.map((wp, idx) => (
        <div key={idx} className="bg-white/5 rounded-2xl p-5 hover:bg-white/[0.07] transition-all">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-blue-400 font-semibold text-lg">{wp.name}</h4>
            <span className="text-xs text-gray-400 px-3 py-1 bg-white/5 rounded-full">{wp.category}</span>
          </div>
          <p className="text-gray-500 text-sm mb-3">Vergleichbare Konkurrenzprodukte:</p>
          <div className="flex flex-wrap gap-2">
            {wp.comparable.map((comp, cidx) => {
              const product = products.find(p => p.name === comp);
              return (
                <span key={cidx} className="text-sm px-3 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-white rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer">
                  {comp} {product && <span className="text-green-400 ml-2 font-medium">€{product.price}</span>}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ==================== MAIN DASHBOARD ====================
const Dashboard = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedCompetitor, setSelectedCompetitor] = useState('Alle');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('products');
  const [priceRange, setPriceRange] = useState([0, 200]);
  
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
  
  const stats = useMemo(() => ({
    totalProducts: products.length,
    totalCompetitors: competitors.length,
    avgPrice: (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2),
    categories: [...new Set(products.map(p => p.category))].length
  }), []);
  
  const tabs = [
    { id: 'products', label: 'Produkte', icon: '📦' },
    { id: 'competitors', label: 'Konkurrenten', icon: '🏢' },
    { id: 'analysis', label: 'Analyse', icon: '📊' },
    { id: 'weicon', label: 'WEICON', icon: '🎯' },
  ];
  
  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-xl">🔬</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">WEICON Monitor</h1>
                <p className="text-xs text-gray-400">Konkurrenz-Analyse</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl">
                <Icons.User />
                <span className="text-gray-300 text-sm">{user.name}</span>
                <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">{user.role}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                title="Abmelden"
              >
                <Icons.Logout />
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Produkte" value={stats.totalProducts} icon="📦" trend={5.2} />
          <StatCard title="Konkurrenten" value={stats.totalCompetitors} icon="🏢" />
          <StatCard title="Ø Preis" value={`€${stats.avgPrice}`} icon="💰" trend={-2.1} />
          <StatCard title="Kategorien" value={stats.categories} icon="📁" />
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        {/* Search & Filters */}
        {(activeTab === 'products' || activeTab === 'analysis') && (
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                  <Icons.Search />
                </div>
                <input
                  type="text"
                  placeholder="Produkte suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                  ))}
                </select>
                
                <select
                  value={selectedCompetitor}
                  onChange={(e) => setSelectedCompetitor(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="Alle" className="bg-slate-800">Alle Hersteller</option>
                  {competitors.map(comp => (
                    <option key={comp.id} value={comp.id} className="bg-slate-800">{comp.name}</option>
                  ))}
                </select>
                
                {/* View Toggle */}
                <div className="flex bg-white/5 rounded-xl p-1.5 border border-white/10">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Icons.Grid />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Icons.List />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mt-5 flex items-center gap-4">
              <span className="text-gray-400 text-sm">Preis:</span>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="flex-1 accent-blue-500 h-2 bg-white/10 rounded-full cursor-pointer"
              />
              <span className="text-white font-medium min-w-[80px] text-right">bis €{priceRange[1]}</span>
            </div>
            
            <div className="mt-4 text-gray-500 text-sm">
              {filteredProducts.length} von {products.length} Produkten
            </div>
          </div>
        )}
        
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
            : 'space-y-3'
          }>
            {filteredProducts.map(product => {
              const competitor = competitors.find(c => c.id === product.competitor);
              return viewMode === 'grid' ? (
                <ProductCard key={product.id} product={product} competitor={competitor} />
              ) : (
                <div key={product.id} className="glass-card rounded-xl p-4 flex items-center justify-between hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{competitor?.logo}</span>
                    <div>
                      <h3 className="text-white font-medium">{product.name}</h3>
                      <p className="text-gray-400 text-sm">{product.category} • {product.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-lg">€{product.price.toFixed(2)}</p>
                    <p className="text-gray-500 text-xs">{product.unit}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Competitors Tab */}
        {activeTab === 'competitors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
        
        {/* WEICON Tab */}
        {activeTab === 'weicon' && (
          <WeiconComparison />
        )}
        
        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">WEICON Konkurrenz Monitor</p>
          <p className="text-gray-600 text-xs mt-1">Für interne Marktanalyse • Daten: Stand 2024</p>
        </footer>
      </div>
    </div>
  );
};

// ==================== APP WRAPPER ====================
function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const savedUser = localStorage.getItem('weicon-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('weicon-user');
    setUser(null);
  };
  
  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }
  
  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;
