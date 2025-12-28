import { useState, useEffect } from 'react'
import { Newspaper, TrendingUp, Clock, ExternalLink, Loader2, RefreshCw } from 'lucide-react'
import { fetchHeadlines } from '../../lib/news'
import BiasBar from '../ui/BiasBar'

const categories = [
  { id: 'top', label: 'Top' },
  { id: 'politics', label: 'Politics' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Tech' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
]

export default function FeedView() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('top')

  const loadNews = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchHeadlines(category, 'us')
      setArticles(data)
    } catch (err) {
      console.error('Feed error:', err)
      setError('Failed to load news. Check your NewsData.io API key.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadNews()
  }, [category])

  // Mock balance for now
  const todayBalance = {
    left: 2,
    leanLeft: 4,
    center: 6,
    leanRight: 3,
    right: 1,
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Today's Balance */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2">
          <TrendingUp size={18} className="text-copper" />
          Today's Balance
        </h3>
        <p className="text-sm text-ink/50 dark:text-paper/50 mb-4">
          Reading distribution across the spectrum (demo)
        </p>
        <BiasBar sources={todayBalance} />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              category === cat.id
                ? 'bg-copper text-white'
                : 'bg-ink/5 dark:bg-paper/5 hover:bg-ink/10 dark:hover:bg-paper/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* News Feed */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-headline flex items-center gap-2">
            <Newspaper size={18} className="text-copper" />
            {categories.find(c => c.id === category)?.label} News
          </h3>
          <button 
            onClick={loadNews} 
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
            <button onClick={loadNews} className="btn-ghost mt-2">
              Try Again
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-8 text-center text-ink/50 dark:text-paper/50">
            <p>No articles found. Try a different category.</p>
          </div>
        ) : (
          <div className="divide-y divide-ink/10 dark:divide-paper/10">
            {articles.slice(0, 10).map((article) => (
              <article key={article.id} className="py-4 first:pt-0 last:pb-0">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    {article.image && (
                      <div className="hidden sm:block w-24 h-16 flex-shrink-0 rounded overflow-hidden bg-ink/5 dark:bg-paper/5">
                        <img 
                          src={article.image} 
                          alt="" 
                          className="w-full h-full object-cover"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-headline font-semibold leading-tight mb-1 group-hover:text-copper transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      
                      {article.description && (
                        <p className="text-sm text-ink/60 dark:text-paper/60 line-clamp-2 mb-2">
                          {article.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-3 text-xs">
                        <span className="bias-badge center">
                          {article.sourceName || article.source}
                        </span>
                        <span className="text-ink/40 dark:text-paper/40 flex items-center gap-1">
                          <Clock size={12} />
                          {formatDate(article.date)}
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

      {/* Fringe Watch Preview */}
      <div className="card">
        <h3 className="card-headline mb-4">Fringe Watch</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="fringe-panel right-fringe">
            <p className="font-mono text-xs text-red-800 dark:text-red-300 mb-1">FAR RIGHT</p>
            <p className="text-sm text-ink/70 dark:text-paper/70">
              Immigration, election integrity claims trending
            </p>
          </div>
          <div className="fringe-panel left-fringe">
            <p className="font-mono text-xs text-blue-800 dark:text-blue-300 mb-1">FAR LEFT</p>
            <p className="text-sm text-ink/70 dark:text-paper/70">
              Corporate accountability, climate urgency focus
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
