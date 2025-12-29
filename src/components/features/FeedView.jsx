import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, ExternalLink, AlertTriangle, Clock, X, ShieldCheck, ShieldAlert, ShieldQuestion, BookOpen } from 'lucide-react'
import { fetchHeadlines } from '../../lib/news'
import { useAnalyticsContext } from '../../App'
import BiasBar from '../ui/BiasBar'

// Mock bias + factuality ratings - in production, from MBFC database
const SOURCE_DATA = {
  'reuters.com': { bias: 'center', biasScore: 0, factuality: 'high', verified: true },
  'apnews.com': { bias: 'center', biasScore: 0, factuality: 'high', verified: true },
  'bbc.com': { bias: 'center', biasScore: -0.3, factuality: 'high', verified: true },
  'npr.org': { bias: 'lean-left', biasScore: -1.2, factuality: 'high', verified: true },
  'nytimes.com': { bias: 'lean-left', biasScore: -1.5, factuality: 'high', verified: true },
  'washingtonpost.com': { bias: 'lean-left', biasScore: -1.3, factuality: 'high', verified: true },
  'cnn.com': { bias: 'left', biasScore: -2.2, factuality: 'mixed', verified: true },
  'msnbc.com': { bias: 'left', biasScore: -2.5, factuality: 'mixed', verified: true },
  'foxnews.com': { bias: 'right', biasScore: 2.3, factuality: 'mixed', verified: true },
  'wsj.com': { bias: 'lean-right', biasScore: 1.2, factuality: 'high', verified: true },
  'nypost.com': { bias: 'right', biasScore: 2.1, factuality: 'mixed', verified: true },
  'breitbart.com': { bias: 'far-right', biasScore: 3, factuality: 'low', verified: true },
  'dailywire.com': { bias: 'right', biasScore: 2.4, factuality: 'mixed', verified: true },
  'huffpost.com': { bias: 'left', biasScore: -2.1, factuality: 'mixed', verified: true },
  'theguardian.com': { bias: 'lean-left', biasScore: -1.4, factuality: 'high', verified: true },
  'default': { bias: 'center', biasScore: 0, factuality: 'unknown', verified: false }
}

const getSourceData = (sourceUrl) => {
  if (!sourceUrl) return SOURCE_DATA.default
  const domain = sourceUrl.toLowerCase()
  for (const [key, value] of Object.entries(SOURCE_DATA)) {
    if (domain.includes(key)) return value
  }
  return SOURCE_DATA.default
}

// Bias badge with gradient based on lean direction
const BiasBadge = ({ bias, biasScore, onClick }) => {
  const getGradientStyle = () => {
    if (bias === 'center') {
      if (biasScore < -0.2) {
        return 'linear-gradient(90deg, #60a5fa 0%, #6b7280 50%, #6b7280 100%)'
      } else if (biasScore > 0.2) {
        return 'linear-gradient(90deg, #6b7280 0%, #6b7280 50%, #f87171 100%)'
      }
      return '#6b7280'
    }
    
    const colors = {
      'far-left': 'linear-gradient(90deg, #1e3a8a, #2563eb)',
      'left': 'linear-gradient(90deg, #2563eb, #3b82f6)',
      'lean-left': 'linear-gradient(90deg, #3b82f6, #60a5fa)',
      'lean-right': 'linear-gradient(90deg, #f87171, #ef4444)',
      'right': 'linear-gradient(90deg, #ef4444, #dc2626)',
      'far-right': 'linear-gradient(90deg, #dc2626, #991b1b)',
    }
    return colors[bias] || '#6b7280'
  }

  const getLabel = () => {
    if (bias === 'center' && biasScore !== 0) {
      if (biasScore < -0.2) return 'CENTER-L'
      if (biasScore > 0.2) return 'CENTER-R'
    }
    return bias?.replace('-', ' ').toUpperCase()
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      className="px-2 py-0.5 rounded-full text-white text-[10px] uppercase font-bold 
                 hover:ring-2 hover:ring-copper hover:ring-offset-1 transition-all cursor-help"
      style={{ background: getGradientStyle() }}
      title="Click for bias info"
    >
      {getLabel()}
    </button>
  )
}

// Factuality badge - NOW CLICKABLE
const FactualityBadge = ({ factuality, verified, onClick }) => {
  const config = {
    high: { icon: ShieldCheck, color: 'text-forest', bg: 'bg-forest/10 hover:bg-forest/20', label: 'High Factuality' },
    mixed: { icon: ShieldAlert, color: 'text-copper', bg: 'bg-copper/10 hover:bg-copper/20', label: 'Mixed Factuality' },
    low: { icon: ShieldAlert, color: 'text-burgundy', bg: 'bg-burgundy/10 hover:bg-burgundy/20', label: 'Low Factuality' },
    unknown: { icon: ShieldQuestion, color: 'text-steel', bg: 'bg-steel/10 hover:bg-steel/20', label: 'Unverified Source' },
  }
  
  const { icon: Icon, color, bg, label } = config[factuality] || config.unknown
  
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${color} ${bg} 
                  cursor-help transition-colors hover:ring-1 hover:ring-copper`}
      title={`Click for info: ${verified ? label : 'Unverified source'}`}
    >
      <Icon size={10} />
      {verified ? factuality.toUpperCase() : 'UNVERIFIED'}
    </button>
  )
}

// Themed Hover Modal Component
const HoverModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-ink/50 dark:bg-ink/70 flex items-center justify-center z-50 p-4" 
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-paper dark:bg-ink-light rounded-xl max-w-lg w-full shadow-2xl border border-ink/10 dark:border-paper/10 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Gutenberg styling */}
          <div className="bg-ink/5 dark:bg-paper/5 px-6 py-4 border-b border-ink/10 dark:border-paper/10">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-xl font-semibold">{title}</h3>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-ink/10 dark:hover:bg-paper/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
            {children}
          </div>

          {/* Footer ornament */}
          <div className="px-6 py-3 border-t border-ink/10 dark:border-paper/10 bg-ink/[0.02] dark:bg-paper/[0.02]">
            <div className="flex items-center justify-center gap-2 text-ink/20 dark:text-paper/20 text-xs">
              <span>❧</span>
              <span className="font-headline italic">ProveIt</span>
              <span>☙</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

// Bias Info Modal Content
const BiasInfoContent = ({ bias, biasScore }) => {
  const descriptions = {
    'far-left': {
      title: 'Far Left',
      description: 'Sources with extreme left-wing editorial positions. May include advocacy journalism and strong progressive viewpoints.',
      examples: 'Often associated with socialist or far-progressive perspectives.',
    },
    'left': {
      title: 'Left',
      description: 'Sources with left-wing editorial positions. Typically favor liberal policies and Democratic perspectives.',
      examples: 'May emphasize social justice, environmental issues, and progressive economics.',
    },
    'lean-left': {
      title: 'Lean Left',
      description: 'Sources with a slight left-of-center bias. Generally factual with some editorial slant.',
      examples: 'Often mainstream outlets with mild progressive tendencies in story selection or framing.',
    },
    'center': {
      title: 'Center',
      description: 'Sources that attempt balanced coverage. May still have subtle leanings but generally present multiple perspectives.',
      examples: 'Wire services, fact-checkers, and outlets committed to objectivity.',
    },
    'lean-right': {
      title: 'Lean Right',
      description: 'Sources with a slight right-of-center bias. Generally factual with some editorial slant.',
      examples: 'Often mainstream outlets with mild conservative tendencies in story selection or framing.',
    },
    'right': {
      title: 'Right',
      description: 'Sources with right-wing editorial positions. Typically favor conservative policies and Republican perspectives.',
      examples: 'May emphasize free markets, traditional values, and limited government.',
    },
    'far-right': {
      title: 'Far Right',
      description: 'Sources with extreme right-wing editorial positions. May include advocacy journalism and strong nationalist viewpoints.',
      examples: 'Often associated with populist or far-conservative perspectives.',
    },
  }

  const info = descriptions[bias] || descriptions.center

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <BiasBadge bias={bias} biasScore={biasScore} />
        <span className="font-semibold">{info.title}</span>
      </div>
      
      <p className="text-ink/70 dark:text-paper/70">{info.description}</p>
      
      <p className="text-sm text-ink/50 dark:text-paper/50 italic">{info.examples}</p>
      
      {biasScore !== undefined && (
        <div className="p-3 bg-ink/5 dark:bg-paper/5 rounded-lg">
          <p className="text-xs text-ink/60 dark:text-paper/60">
            <span className="font-semibold">Bias Score:</span>{' '}
            <span className="font-mono">{biasScore > 0 ? '+' : ''}{biasScore}</span>
            <span className="ml-2 text-ink/40 dark:text-paper/40">
              (-3 = Far Left, 0 = Center, +3 = Far Right)
            </span>
          </p>
        </div>
      )}

      <div className="pt-2 border-t border-ink/10 dark:border-paper/10">
        <p className="text-xs text-ink/40 dark:text-paper/40">
          Source:{' '}
          <a 
            href="https://mediabiasfactcheck.com/methodology/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-copper hover:underline"
          >
            Media Bias/Fact Check
          </a>
        </p>
      </div>
    </div>
  )
}

// Factuality Info Modal Content
const FactualityInfoContent = ({ factuality, verified }) => {
  const factualityInfo = {
    high: {
      title: 'High Factuality',
      color: 'forest',
      description: 'This source has a strong track record of factual reporting.',
      details: [
        'Rarely publishes false information',
        'Corrects errors promptly',
        'Uses credible sources and citations',
        'Separates news from opinion clearly',
      ],
    },
    mixed: {
      title: 'Mixed Factuality',
      color: 'copper',
      description: 'This source has an inconsistent record with factual reporting.',
      details: [
        'Sometimes publishes misleading content',
        'May use sensational headlines',
        'Occasional factual errors',
        'May blur news and opinion',
      ],
    },
    low: {
      title: 'Low Factuality',
      color: 'burgundy',
      description: 'This source has a poor track record with factual reporting.',
      details: [
        'Frequently publishes false or misleading information',
        'May promote conspiracy theories',
        'Often fails to correct errors',
        'May have failed fact-checks',
      ],
    },
    unknown: {
      title: 'Unverified Source',
      color: 'steel',
      description: 'This source has not been rated by major media watchdogs.',
      details: [
        'No factuality rating available',
        'Exercise caution when reading',
        'Cross-reference with verified sources',
        'Consider the source\'s reputation',
      ],
    },
  }

  const info = factualityInfo[factuality] || factualityInfo.unknown

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg ${
        info.color === 'forest' ? 'bg-forest/10 border border-forest/20' :
        info.color === 'copper' ? 'bg-copper/10 border border-copper/20' :
        info.color === 'burgundy' ? 'bg-burgundy/10 border border-burgundy/20' :
        'bg-steel/10 border border-steel/20'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          {info.color === 'forest' && <ShieldCheck className="w-6 h-6 text-forest" />}
          {info.color === 'copper' && <ShieldAlert className="w-6 h-6 text-copper" />}
          {info.color === 'burgundy' && <ShieldAlert className="w-6 h-6 text-burgundy" />}
          {info.color === 'steel' && <ShieldQuestion className="w-6 h-6 text-steel" />}
          <span className={`font-semibold ${
            info.color === 'forest' ? 'text-forest' :
            info.color === 'copper' ? 'text-copper' :
            info.color === 'burgundy' ? 'text-burgundy' :
            'text-steel'
          }`}>{info.title}</span>
        </div>
        <p className="text-ink/70 dark:text-paper/70">{info.description}</p>
      </div>

      <div>
        <h4 className="font-semibold text-sm mb-2">What this means:</h4>
        <ul className="space-y-2">
          {info.details.map((detail, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink/60 dark:text-paper/60">
              <span className="w-1.5 h-1.5 rounded-full bg-copper mt-1.5 flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      </div>

      {!verified && (
        <div className="p-3 bg-steel/10 border border-steel/20 rounded-lg">
          <p className="text-sm text-steel">
            <strong>Note:</strong> This source is not in our verified database. 
            We recommend cross-referencing with established news outlets.
          </p>
        </div>
      )}

      <div className="pt-2 border-t border-ink/10 dark:border-paper/10">
        <p className="text-xs text-ink/40 dark:text-paper/40">
          Ratings from:{' '}
          <a 
            href="https://mediabiasfactcheck.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-copper hover:underline"
          >
            Media Bias/Fact Check
          </a>
        </p>
      </div>
    </div>
  )
}

// Article Preview Modal Content
const ArticlePreviewContent = ({ article, onReadArticle }) => {
  return (
    <div className="space-y-4">
      {/* Image */}
      {article.image_url && (
        <div className="w-full h-48 rounded-lg overflow-hidden bg-ink/10 dark:bg-paper/10">
          <img 
            src={article.image_url} 
            alt="" 
            className="w-full h-full object-cover"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      )}

      {/* Title */}
      <h4 className="font-headline text-lg font-semibold leading-tight">
        {article.title}
      </h4>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <BiasBadge bias={article.bias} biasScore={article.biasScore} />
        <FactualityBadge factuality={article.factuality} verified={article.verified} />
        <span className="text-xs text-ink/40 dark:text-paper/40">
          {article.source_id || article.source_name}
        </span>
        {article.pubDate && (
          <span className="flex items-center gap-1 text-xs text-ink/40 dark:text-paper/40">
            <Clock size={12} />
            {new Date(article.pubDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Description */}
      {article.description && (
        <p className="text-ink/70 dark:text-paper/70 text-sm leading-relaxed">
          {article.description}
        </p>
      )}

      {/* Action Button */}
      <button
        onClick={onReadArticle}
        className="w-full btn-primary flex items-center justify-center gap-2"
      >
        <ExternalLink size={16} />
        Read Full Article
      </button>

      <p className="text-xs text-center text-ink/40 dark:text-paper/40">
        Opens in a new tab. This click will be tracked in your reading stats.
      </p>
    </div>
  )
}

export default function FeedView() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('top')
  
  // Modal states
  const [biasModal, setBiasModal] = useState(null)
  const [factualityModal, setFactualityModal] = useState(null)
  const [previewModal, setPreviewModal] = useState(null)
  
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
      const articlesWithData = data.map(article => {
        const sourceData = getSourceData(article.source_url || article.link)
        return {
          ...article,
          ...sourceData,
        }
      })
      setArticles(articlesWithData)
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

  // Handle opening article (tracks + opens new tab)
  const handleReadArticle = (article) => {
    if (analytics?.trackView) {
      analytics.trackView({
        title: article.title,
        source: article.source_id || article.source_name || 'Unknown',
        url: article.link,
        biasRating: article.bias,
        timestamp: new Date().toISOString(),
      })
    }
    
    // Close preview modal
    setPreviewModal(null)
    
    // Open article
    if (article.link) {
      window.open(article.link, '_blank', 'noopener,noreferrer')
    }
  }

  // Handle title click - open preview modal
  const handleTitleClick = (e, article) => {
    e.preventDefault()
    e.stopPropagation()
    setPreviewModal(article)
  }

  // Handle external link button - also opens preview
  const handleExternalClick = (e, article) => {
    e.stopPropagation()
    setPreviewModal(article)
  }

  const getTodaysBias = () => {
    if (!analytics?.stats?.biasDistribution) {
      return { left: 0, 'lean-left': 0, center: 0, 'lean-right': 0, right: 0 }
    }
    return analytics.stats.biasDistribution
  }

  return (
    <div className="space-y-6">
      {/* Bias Info Modal */}
      <HoverModal 
        isOpen={!!biasModal}
        onClose={() => setBiasModal(null)}
        title="Political Bias Rating"
      >
        {biasModal && <BiasInfoContent bias={biasModal.bias} biasScore={biasModal.biasScore} />}
      </HoverModal>

      {/* Factuality Info Modal */}
      <HoverModal 
        isOpen={!!factualityModal}
        onClose={() => setFactualityModal(null)}
        title="Factuality Rating"
      >
        {factualityModal && (
          <FactualityInfoContent 
            factuality={factualityModal.factuality} 
            verified={factualityModal.verified} 
          />
        )}
      </HoverModal>

      {/* Article Preview Modal */}
      <HoverModal 
        isOpen={!!previewModal}
        onClose={() => setPreviewModal(null)}
        title="Article Preview"
      >
        {previewModal && (
          <ArticlePreviewContent 
            article={previewModal} 
            onReadArticle={() => handleReadArticle(previewModal)}
          />
        )}
      </HoverModal>

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

      {/* Articles */}
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
            <article key={index} className="card">
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
                  {/* Title - Opens Preview Modal */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <button
                      onClick={(e) => handleTitleClick(e, article)}
                      className="font-headline text-lg font-semibold leading-tight hover:text-copper 
                               transition-colors line-clamp-2 text-left"
                    >
                      {article.title}
                    </button>
                    <button
                      onClick={(e) => handleExternalClick(e, article)}
                      className="p-1 rounded hover:bg-ink/10 dark:hover:bg-paper/10 opacity-50 
                               hover:opacity-100 transition-opacity flex-shrink-0"
                      title="Preview article"
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                  
                  {/* Description */}
                  {article.description && (
                    <p className="text-sm text-ink/60 dark:text-paper/60 line-clamp-2 mb-3">
                      {article.description}
                    </p>
                  )}
                  
                  {/* Tags Row */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Bias Badge - Clickable */}
                    <BiasBadge 
                      bias={article.bias} 
                      biasScore={article.biasScore}
                      onClick={() => setBiasModal({ bias: article.bias, biasScore: article.biasScore })}
                    />
                    
                    {/* Factuality Badge - Clickable */}
                    <FactualityBadge 
                      factuality={article.factuality} 
                      verified={article.verified}
                      onClick={() => setFactualityModal({ factuality: article.factuality, verified: article.verified })}
                    />
                    
                    {/* Source */}
                    <span className="text-ink/40 dark:text-paper/40">
                      {article.source_id || article.source_name}
                    </span>
                    
                    {/* Date */}
                    {article.pubDate && (
                      <span className="flex items-center gap-1 text-ink/40 dark:text-paper/40">
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
        📊 Click titles to preview, then "Read Full Article" to track. Your history stays on your device.
      </p>
    </div>
  )
}
