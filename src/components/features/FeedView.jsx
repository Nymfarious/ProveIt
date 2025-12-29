import { useState, useEffect } from 'react'
import { RefreshCw, ExternalLink, AlertTriangle, Clock } from 'lucide-react'
import { fetchHeadlines } from '../../lib/news'
import { useAnalyticsContext } from '../../App'
import BiasBar from '../ui/BiasBar'

// Mock bias ratings for demo - in production, this would come from MBFC database
const SOURCE_BIAS = {
  'reuters.com': 'center',
  'apnews.com': 'center',
  'bbc.com': 'center',
  'npr.org': 'lean-left',
  'nytimes.com': 'lean-left',
  'washingtonpost.com': 'lean-left',
  'cnn.com': 'left',
  'msnbc.com': 'left',
  'foxnews.com': 'right',
  'wsj.com': 'lean-right',
  'nypost.com': 'right',
  'breitbart.com': 'far-right',
  'dailywire.com': 'right',
  'huffpost.com': 'left',
  'theguardian.com': 'lean-left',
  'default': 'center'
}

const getBiasForSource = (sourceUrl) => {
  if (!sourceUrl) return 'center'
  const domain = sourceUrl.toLowerCase()
  for (const [key, value] of Object.entries(SOURCE_BIAS)) {
    if (domain.includes(key)) return value
  }
  return 'center'
}

const BIAS_COLORS = {
  'far-left': 'bg-blue-900',
  'left': 'bg-blue-600',
  'lean-left': 'bg-blue-400',
  'center': 'bg-gray-400',
  'lean-right': 'bg-red-400',
  'right': 'bg-red-600',
  'far-right': 'bg-red-900',
}

export default function FeedView() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('top')
  
  const analytics = useAnalyticsContext()

  const categories = [
    { id: 'top', label: 'Top' },
    { id: 'politics', label: 'Politics' },
    { id: 'business', label: 'Business' },
    { id: 'technology', label: 'Tech' },
    { id: 'science', label: 'Science' },
    { id: 'health', label: 'Health' },
  ]

  const loadNews = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchHeadlines(category)
      // Add bias ratings to articles
      const articlesWithBias = data.map(article => ({
        ...article,
        biasRating: getBiasForSource(article.source_url || article.link),
      }))
      setArticles(articlesWithBias)
    } catch (err) {
      console.error('News fetch error:', err)
      setError('Failed to load news. Check your API key in Settings.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNews()
  }, [category])

  // Handle article click - TRACK IT!
  const handleArticleClick = (article) => {
    if (analytics?.trackView) {
      analytics.trackView({
        title: article.title,
        source: article.source_id || article.source_name || 'Unknown',
        url: article.link,
        biasRating: article.biasRating,
        timestamp: new Date().toISOString(),
      })
    }
    // Open in new tab
    window.open(article.link, '_blank', 'noopener,noreferrer')
  }

  // Calculate today's reading distribution from tracked articles
  const getTodaysBias = () => {
    if (!analytics?.stats?.biasDistribution) {
      return { left: 0, 'lean-left': 0, center: 0, 'lean-right': 0, right: 0 }
    }
    return analytics.stats.biasDistribution
  }

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
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
        
        <button
          onClick={loadNews}
          disabled={loading}
          className="ml-auto p-2 rounded-lg bg-ink/5 dark:bg-paper/5 hover:bg-ink/10 dark:hover:bg-paper/10 transition-colors"
          title="Refresh"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Today's Balance */}
      <div className="card">
        <h3 className="card-headline mb-3">Today's Reading Balance</h3>
        <BiasBar sources={getTodaysBias()} />
        <p className="text-xs text-ink/40 dark:text-paper/40 text-center mt-2">
          {analytics?.stats?.totalReads || 0} articles tracked
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="card border-burgundy/30 bg-burgundy/5">
          <div className="flex items-center gap-3 text-burgundy">
            <AlertTriangle size={20} />
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw size={32} className="mx-auto animate-spin text-copper mb-3" />
            <p className="text-ink/50 dark:text-paper/50">Loading headlines...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-ink/50 dark:text-paper/50">No articles found</p>
          </div>
        ) : (
          articles.map((article, index) => (
            <article 
              key={index}
              onClick={() => handleArticleClick(article)}
              className="card hover:border-copper/30 cursor-pointer transition-all group"
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                {article.image_url && (
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-ink/10 dark:bg-paper/10">
                    <img 
                      src={article.image_url} 
                      alt="" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-headline text-lg font-semibold leading-tight group-hover:text-copper transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <ExternalLink size={16} className="flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                  
                  {article.description && (
                    <p className="text-sm text-ink/60 dark:text-paper/60 line-clamp-2 mb-2">
                      {article.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-3 text-xs text-ink/40 dark:text-paper/40">
                    {/* Bias indicator */}
                    <span className={`px-2 py-0.5 rounded-full text-white text-[10px] uppercase font-bold ${BIAS_COLORS[article.biasRating]}`}>
                      {article.biasRating?.replace('-', ' ')}
                    </span>
                    
                    <span>{article.source_id || article.source_name}</span>
                    
                    {article.pubDate && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(article.pubDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Tracking Notice */}
      <p className="text-center text-xs text-ink/30 dark:text-paper/30">
        📊 Click tracking {analytics?.preferences?.trackingEnabled ? 'enabled' : 'disabled'}. 
        Your reading history stays on your device.
      </p>
    </div>
  )
}
