import { useState, useEffect } from 'react'
import { Newspaper, TrendingUp, Clock, ExternalLink, Loader2, RefreshCw, Globe, Filter, History, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchHeadlines } from '../../lib/news'

const categories = [
  { id: 'top', label: 'Top 10' },
  { id: 'politics', label: 'Politics' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Tech' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Medical' },
  { id: 'entertainment', label: 'Movies/TV' },
  { id: 'world', label: 'International' },
]

const regions = [
  { id: 'us', label: 'US' },
  { id: 'gb', label: 'UK' },
  { id: 'world', label: 'World' },
]

export default function FeedView() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('top')
  const [region, setRegion] = useState('us')
  const [showFilters, setShowFilters] = useState(false)
  
  // Feed History State
  const [feedHistory, setFeedHistory] = useState([])
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(-1) // -1 = current/live
  const [showHistory, setShowHistory] = useState(false)

  const loadNews = async (addToHistory = true) => {
    setIsLoading(true)
    setError(null)
    try {
      const countryCode = category === 'world' ? 'world' : region
      const data = await fetchHeadlines(category === 'world' ? 'top' : category, countryCode)
      setArticles(data)
      
      // Add to history if this is a new fetch (not viewing history)
      if (addToHistory && data.length > 0) {
        const historyEntry = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          category,
          region,
          articles: data,
          articleCount: data.length,
        }
        
        setFeedHistory(prev => {
          // Keep last 30 days worth, max 50 entries
          const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
          const filtered = prev.filter(h => new Date(h.timestamp).getTime() > thirtyDaysAgo)
          return [historyEntry, ...filtered].slice(0, 50)
        })
        setActiveHistoryIndex(-1)
      }
    } catch (err) {
      console.error('Feed error:', err)
      setError('Failed to load news. Check your NewsData.io API key.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadNews()
  }, [category, region])

  // Load history entry
  const viewHistoryEntry = (index) => {
    const entry = feedHistory[index]
    if (entry) {
      setArticles(entry.articles)
      setActiveHistoryIndex(index)
    }
  }

  // Go back to live feed
  const goToLive = () => {
    setActiveHistoryIndex(-1)
    loadNews(false)
  }

  const todayBalance = {
    left: 2,
    leanLeft: 4,
    center: 6,
    leanRight: 3,
    right: 1,
  }
  const totalReads = Object.values(todayBalance).reduce((a, b) => a + b, 0)

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60))
    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }

  const formatHistoryTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMins = Math.floor((now - date) / (1000 * 60))
    
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-6">
      {/* Today's Balance */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-headline flex items-center gap-2">
            <TrendingUp size={18} className="text-copper" />
            Today's Reading Balance
          </h3>
          <span className="text-xs text-ink/40 dark:text-paper/40">{totalReads} articles</span>
        </div>
        
        <div className="relative h-4 rounded-full overflow-hidden mb-2">
          <div className="absolute inset-0 flex">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 h-full" style={{ width: `${(todayBalance.left / totalReads) * 100}%` }} />
            <div className="bg-gradient-to-r from-blue-500 to-blue-300 h-full" style={{ width: `${(todayBalance.leanLeft / totalReads) * 100}%` }} />
            <div className="bg-gradient-to-r from-slate-400 to-slate-500 h-full" style={{ width: `${(todayBalance.center / totalReads) * 100}%` }} />
            <div className="bg-gradient-to-r from-red-300 to-red-500 h-full" style={{ width: `${(todayBalance.leanRight / totalReads) * 100}%` }} />
            <div className="bg-gradient-to-r from-red-500 to-red-700 h-full" style={{ width: `${(todayBalance.right / totalReads) * 100}%` }} />
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-ink/40 dark:text-paper/40">
          <span>Left ({todayBalance.left + todayBalance.leanLeft})</span>
          <span>Center ({todayBalance.center})</span>
          <span>Right ({todayBalance.right + todayBalance.leanRight})</span>
        </div>
      </div>

      {/* Category & Filter Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setCategory(cat.id); setActiveHistoryIndex(-1); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  category === cat.id ? 'bg-copper text-white' : 'bg-ink/5 dark:bg-paper/5 hover:bg-ink/10 dark:hover:bg-paper/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          
          <div className="flex gap-1 ml-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-lg transition-colors ${showHistory ? 'bg-steel text-white' : 'bg-ink/5 dark:bg-paper/5'}`}
              title="Feed History"
            >
              <History size={18} />
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-copper text-white' : 'bg-ink/5 dark:bg-paper/5'}`}
            >
              <Filter size={18} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
            <Globe size={16} className="text-ink/40 dark:text-paper/40" />
            <span className="text-sm text-ink/60 dark:text-paper/60">Region:</span>
            {regions.map((r) => (
              <button
                key={r.id}
                onClick={() => setRegion(r.id)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  region === r.id ? 'bg-steel text-white' : 'bg-ink/10 dark:bg-paper/10'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Feed History Panel */}
      {showHistory && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="card-headline flex items-center gap-2">
              <History size={18} className="text-steel" />
              Feed History
              <span className="text-xs font-normal text-ink/40 dark:text-paper/40">
                (Last 30 days)
              </span>
            </h3>
            <button onClick={() => setShowHistory(false)} className="text-ink/40 hover:text-ink dark:hover:text-paper">
              <X size={18} />
            </button>
          </div>

          {feedHistory.length === 0 ? (
            <p className="text-sm text-ink/50 dark:text-paper/50 text-center py-4">
              No history yet. Refresh to start tracking.
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {/* Live Feed Button */}
              <button
                onClick={goToLive}
                className={`w-full p-3 rounded-lg text-left transition-colors flex items-center justify-between ${
                  activeHistoryIndex === -1 ? 'bg-forest/10 border border-forest/30' : 'bg-ink/5 dark:bg-paper/5 hover:bg-ink/10 dark:hover:bg-paper/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${activeHistoryIndex === -1 ? 'bg-forest animate-pulse' : 'bg-ink/30'}`} />
                  <span className="font-medium text-sm">Live Feed</span>
                </div>
                {activeHistoryIndex === -1 && (
                  <span className="text-xs text-forest">Current</span>
                )}
              </button>

              {feedHistory.map((entry, index) => (
                <button
                  key={entry.id}
                  onClick={() => viewHistoryEntry(index)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    activeHistoryIndex === index ? 'bg-copper/10 border border-copper/30' : 'bg-ink/5 dark:bg-paper/5 hover:bg-ink/10 dark:hover:bg-paper/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">{categories.find(c => c.id === entry.category)?.label}</span>
                      <span className="text-xs text-ink/40 dark:text-paper/40 ml-2">
                        {regions.find(r => r.id === entry.region)?.label}
                      </span>
                    </div>
                    <span className="text-xs text-ink/40 dark:text-paper/40">
                      {formatHistoryTime(entry.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-ink/50 dark:text-paper/50 mt-1">
                    {entry.articleCount} articles
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Viewing History Indicator */}
      {activeHistoryIndex >= 0 && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-copper/10 border border-copper/30">
          <div className="flex items-center gap-2">
            <History size={16} className="text-copper" />
            <span className="text-sm text-copper font-medium">
              Viewing history from {formatHistoryTime(feedHistory[activeHistoryIndex]?.timestamp)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => activeHistoryIndex < feedHistory.length - 1 && viewHistoryEntry(activeHistoryIndex + 1)}
              disabled={activeHistoryIndex >= feedHistory.length - 1}
              className="p-1 rounded hover:bg-copper/20 disabled:opacity-30"
            >
              <ChevronLeft size={18} className="text-copper" />
            </button>
            <button
              onClick={() => activeHistoryIndex > 0 ? viewHistoryEntry(activeHistoryIndex - 1) : goToLive()}
              className="p-1 rounded hover:bg-copper/20"
            >
              <ChevronRight size={18} className="text-copper" />
            </button>
            <button
              onClick={goToLive}
              className="text-xs text-copper hover:underline ml-2"
            >
              Go to Live
            </button>
          </div>
        </div>
      )}

      {/* News Feed */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-headline flex items-center gap-2">
            <Newspaper size={18} className="text-copper" />
            {categories.find(c => c.id === category)?.label} News
            {region !== 'us' && category !== 'world' && (
              <span className="text-xs bg-steel/20 text-steel px-2 py-0.5 rounded-full">
                {regions.find(r => r.id === region)?.label}
              </span>
            )}
          </h3>
          <button 
            onClick={() => loadNews()} 
            disabled={isLoading}
            className="nav-icon p-2" 
            data-tooltip="Refresh"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        {isLoading ? (
          <div className="py-12 text-center">
            <Loader2 size={32} className="mx-auto animate-spin text-copper" />
            <p className="mt-2 text-sm text-ink/50 dark:text-paper/50">Loading news...</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-burgundy">
            <p>{error}</p>
            <button onClick={() => loadNews()} className="btn-ghost mt-2">Try Again</button>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-8 text-center text-ink/50 dark:text-paper/50">
            <p>No articles found. Try a different category.</p>
          </div>
        ) : (
          <div className="divide-y divide-ink/10 dark:divide-paper/10">
            {articles.slice(0, 10).map((article) => (
              <article key={article.id} className="py-4 first:pt-0 last:pb-0">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="flex gap-4">
                    {article.image && (
                      <div className="hidden sm:block w-24 h-16 flex-shrink-0 rounded overflow-hidden bg-ink/5 dark:bg-paper/5">
                        <img src={article.image} alt="" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-headline font-semibold leading-tight mb-1 group-hover:text-copper transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      {article.description && (
                        <p className="text-sm text-ink/60 dark:text-paper/60 line-clamp-2 mb-2">{article.description}</p>
                      )}
                      <div className="flex items-center gap-3 text-xs">
                        <span className="bias-badge center">{article.sourceName || article.source}</span>
                        <span className="text-ink/40 dark:text-paper/40 flex items-center gap-1">
                          <Clock size={12} />{formatDate(article.date)}
                        </span>
                        <ExternalLink size={12} className="text-ink/30 dark:text-paper/30" />
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Fringe Watch */}
      <div className="card">
        <h3 className="card-headline mb-4">Fringe Watch</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="fringe-panel right-fringe">
            <p className="font-mono text-xs text-red-800 dark:text-red-300 mb-1">FAR RIGHT</p>
            <p className="text-sm text-ink/70 dark:text-paper/70">Immigration, election integrity claims trending</p>
          </div>
          <div className="fringe-panel left-fringe">
            <p className="font-mono text-xs text-blue-800 dark:text-blue-300 mb-1">FAR LEFT</p>
            <p className="text-sm text-ink/70 dark:text-paper/70">Corporate accountability, climate urgency focus</p>
          </div>
        </div>
      </div>

      {/* International Info */}
      <div className="p-3 rounded-lg bg-steel/10 border border-steel/20 text-xs text-ink/60 dark:text-paper/60">
        <p><strong>International sources</strong> include Al Jazeera, BBC, Reuters, AP, and other global news organizations.</p>
      </div>
    </div>
  )
}
