import { useState, useEffect } from 'react'
import { Search, BookOpen, ExternalLink, Plus, X, AlertTriangle, Scale, ArrowLeftRight, Loader2, Info, Lightbulb, SlidersHorizontal, RefreshCw, CheckSquare, Square } from 'lucide-react'

// Sources with bias ratings (excluding fringe sources)
const ALL_SOURCES = [
  // Left-leaning (but not fringe)
  { name: 'MSNBC', bias: -2.0, credibility: 'mixed' },
  { name: 'CNN', bias: -1.5, credibility: 'mixed' },
  { name: 'New York Times', bias: -1.0, credibility: 'high' },
  { name: 'NPR', bias: -1.0, credibility: 'high' },
  { name: 'Washington Post', bias: -1.0, credibility: 'high' },
  { name: 'Politico', bias: -0.5, credibility: 'high' },
  // Center
  { name: 'Reuters', bias: 0, credibility: 'very-high' },
  { name: 'AP News', bias: 0, credibility: 'very-high' },
  { name: 'BBC', bias: 0, credibility: 'high' },
  { name: 'The Hill', bias: -0.3, credibility: 'high' },
  { name: 'Wall Street Journal', bias: 0.5, credibility: 'high' },
  // Right-leaning (but not fringe)
  { name: 'The Economist', bias: 0.5, credibility: 'high' },
  { name: 'National Review', bias: 1.5, credibility: 'mixed' },
  { name: 'Fox News', bias: 2.0, credibility: 'mixed' },
  { name: 'Daily Wire', bias: 2.0, credibility: 'mixed' },
]

// Fringe sources excluded from default results
const FRINGE_SOURCES = ['Breitbart', 'InfoWars', 'OAN', 'Newsmax', 'Jacobin', 'The Intercept']

const SAMPLE_TOPICS = [
  { topic: 'Climate Change Policy', keywords: ['climate', 'environment', 'green'] },
  { topic: 'Immigration Policy', keywords: ['immigration', 'border', 'migrant'] },
  { topic: 'Healthcare Reform', keywords: ['healthcare', 'medical', 'insurance'] },
  { topic: 'Economic Policy', keywords: ['economy', 'inflation', 'jobs'] },
]

export default function ResearchView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState(null)
  const [showTips, setShowTips] = useState(true)
  
  // Bias slider controls
  const [useBiasFilter, setUseBiasFilter] = useState(false)
  const [biasRange, setBiasRange] = useState([-1.5, 1.5]) // Default: slight lean both ways
  const [includeFringe, setIncludeFringe] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    setIsSearching(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Filter sources based on bias settings
    let filteredSources = ALL_SOURCES
    if (useBiasFilter) {
      filteredSources = ALL_SOURCES.filter(s => 
        s.bias >= biasRange[0] && s.bias <= biasRange[1]
      )
    }
    
    // Generate mock results
    const mockResults = filteredSources.map(source => ({
      ...source,
      headline: `${source.name} coverage of ${searchTerm}`,
      snippet: `Analysis and reporting on ${searchTerm.toLowerCase()} from ${source.name}'s editorial perspective...`,
      url: '#',
    }))
    
    // Sort by bias for side-by-side comparison
    mockResults.sort((a, b) => a.bias - b.bias)
    
    setResults({
      topic: searchTerm,
      sources: mockResults,
      leftSources: mockResults.filter(s => s.bias < -0.5),
      centerSources: mockResults.filter(s => s.bias >= -0.5 && s.bias <= 0.5),
      rightSources: mockResults.filter(s => s.bias > 0.5),
      biasFilter: useBiasFilter ? biasRange : null,
    })
    
    setIsSearching(false)
  }

  const refreshWithNewBias = () => {
    if (results) {
      handleSearch()
    }
  }

  const getBiasColor = (bias) => {
    if (bias <= -1.5) return 'bg-blue-600'
    if (bias <= -0.5) return 'bg-blue-400'
    if (bias <= 0.5) return 'bg-slate-400'
    if (bias <= 1.5) return 'bg-red-400'
    return 'bg-red-600'
  }

  const getBiasLabel = (bias) => {
    if (bias <= -1.5) return 'Left'
    if (bias <= -0.5) return 'Lean Left'
    if (bias <= 0.5) return 'Center'
    if (bias <= 1.5) return 'Lean Right'
    return 'Right'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-copper/10">
            <ArrowLeftRight size={24} className="text-copper" />
          </div>
          <div>
            <h2 className="font-headline text-xl font-semibold text-ink dark:text-paper">Research Mode</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              Side-by-side comparison across the political spectrum
            </p>
          </div>
        </div>
      </div>

      {/* Goal Statement */}
      <div className="p-4 rounded-lg bg-forest/10 border border-forest/20">
        <h3 className="font-semibold text-forest flex items-center gap-2 mb-2">
          <Scale size={18} />
          Multiple Perspectives, Minus Fringe
        </h3>
        <p className="text-sm text-forest/80">
          Compare how credible sources from Left, Center, and Right cover the same topic. 
          Fringe and low-credibility sources are excluded by default to focus on quality journalism.
        </p>
      </div>

      {/* Research Tips */}
      {showTips && (
        <div className="card border-steel/30">
          <div className="flex items-start justify-between">
            <h3 className="card-headline flex items-center gap-2 text-ink dark:text-paper">
              <Lightbulb size={18} className="text-steel" />
              How to Use Research Mode
            </h3>
            <button onClick={() => setShowTips(false)} className="text-ink/40 dark:text-paper/40 hover:text-ink dark:hover:text-paper">
              <X size={18} />
            </button>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-ink/70 dark:text-paper/70">
            <li className="flex items-start gap-2">
              <span className="text-copper font-bold">1.</span>
              Search a topic to see coverage from multiple perspectives
            </li>
            <li className="flex items-start gap-2">
              <span className="text-copper font-bold">2.</span>
              Compare Left, Center, and Right columns side-by-side
            </li>
            <li className="flex items-start gap-2">
              <span className="text-copper font-bold">3.</span>
              Use the bias slider to focus on a specific range
            </li>
            <li className="flex items-start gap-2">
              <span className="text-copper font-bold">4.</span>
              Look for facts that all sides agree on—that's likely the truth
            </li>
          </ul>
        </div>
      )}

      {/* Search */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <Search size={18} className="text-copper" />
          Search Topic
        </h3>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter a topic (e.g., 'climate policy', 'immigration')..."
            className="flex-1 px-4 py-2 rounded-lg border border-ink/20 dark:border-paper/20 bg-paper dark:bg-ink text-ink dark:text-paper focus:outline-none focus:ring-2 focus:ring-copper/50"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} disabled={isSearching} className="btn-primary">
            {isSearching ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            Compare
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-ink/40 dark:text-paper/40">Suggestions:</span>
          {SAMPLE_TOPICS.map((item) => (
            <button
              key={item.topic}
              onClick={() => setSearchTerm(item.topic)}
              className="text-xs px-2 py-1 rounded-full bg-ink/5 dark:bg-paper/5 text-ink/60 dark:text-paper/60 hover:bg-copper/20 hover:text-copper"
            >
              {item.topic}
            </button>
          ))}
        </div>
      </div>

      {/* BIAS SLIDER CONTROLS */}
      <div className="card border-copper/30">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <SlidersHorizontal size={18} className="text-copper" />
          Bias Filter
        </h3>

        {/* Enable/Disable Checkbox */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setUseBiasFilter(!useBiasFilter)}
            className="flex items-center gap-2 text-sm"
          >
            {useBiasFilter ? (
              <CheckSquare size={20} className="text-copper" />
            ) : (
              <Square size={20} className="text-ink/40 dark:text-paper/40" />
            )}
            <span className={useBiasFilter ? 'text-copper font-medium' : 'text-ink/60 dark:text-paper/60'}>
              Enable bias range filter
            </span>
          </button>
        </div>

        {useBiasFilter && (
          <div className="space-y-4">
            {/* Visual Range Display */}
            <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-blue-500">Far Left (-3)</span>
                <span className="text-slate-500">Center (0)</span>
                <span className="text-red-500">Far Right (+3)</span>
              </div>
              
              {/* Gradient bar with range indicator */}
              <div className="relative h-4 rounded-full bg-gradient-to-r from-blue-600 via-slate-400 to-red-600 mb-2">
                {/* Selected range highlight */}
                <div 
                  className="absolute top-0 h-full bg-white/30 rounded-full border-2 border-white"
                  style={{
                    left: `${((biasRange[0] + 3) / 6) * 100}%`,
                    width: `${((biasRange[1] - biasRange[0]) / 6) * 100}%`,
                  }}
                />
              </div>

              {/* Range Sliders */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-ink/60 dark:text-paper/60 block mb-1">From (Left bound):</label>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.5"
                    value={biasRange[0]}
                    onChange={(e) => setBiasRange([parseFloat(e.target.value), Math.max(parseFloat(e.target.value), biasRange[1])])}
                    className="w-full"
                  />
                  <div className="text-center text-xs font-mono text-copper">{biasRange[0]}</div>
                </div>
                <div>
                  <label className="text-xs text-ink/60 dark:text-paper/60 block mb-1">To (Right bound):</label>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.5"
                    value={biasRange[1]}
                    onChange={(e) => setBiasRange([Math.min(biasRange[0], parseFloat(e.target.value)), parseFloat(e.target.value)])}
                    className="w-full"
                  />
                  <div className="text-center text-xs font-mono text-copper">{biasRange[1]}</div>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-ink/40 dark:text-paper/40">Presets:</span>
              <button onClick={() => setBiasRange([-3, 0])} className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">
                Left Only
              </button>
              <button onClick={() => setBiasRange([-1, 1])} className="text-xs px-2 py-1 rounded bg-slate-500/20 text-slate-500 hover:bg-slate-500/30">
                Center Only
              </button>
              <button onClick={() => setBiasRange([0, 3])} className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-500 hover:bg-red-500/30">
                Right Only
              </button>
              <button onClick={() => setBiasRange([-3, 3])} className="text-xs px-2 py-1 rounded bg-copper/20 text-copper hover:bg-copper/30">
                All Sources
              </button>
            </div>

            {/* Refresh Button */}
            {results && (
              <button onClick={refreshWithNewBias} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-copper/20 text-copper hover:bg-copper/30 text-sm">
                <RefreshCw size={16} />
                Refresh Results with New Range
              </button>
            )}
          </div>
        )}
      </div>

      {/* RESULTS - Side by Side */}
      {results && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
              <Scale size={18} className="text-copper" />
              Comparing: "{results.topic}"
            </h3>

            {results.biasFilter && (
              <div className="mb-4 p-2 rounded-lg bg-copper/10 text-xs text-copper">
                Filtered to bias range: {results.biasFilter[0]} to {results.biasFilter[1]}
              </div>
            )}

            {/* Side-by-Side Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* LEFT Column */}
              <div className="rounded-lg border-2 border-blue-500/30 bg-blue-500/5 p-3">
                <h4 className="font-semibold text-blue-500 text-center mb-3 flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  Left ({results.leftSources.length})
                </h4>
                <div className="space-y-2">
                  {results.leftSources.map((source, i) => (
                    <div key={i} className="p-2 rounded bg-white/50 dark:bg-ink/50 text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-ink dark:text-paper">{source.name}</span>
                        <span className="text-[10px] text-blue-500">{getBiasLabel(source.bias)}</span>
                      </div>
                      <p className="text-xs text-ink/60 dark:text-paper/60 line-clamp-2">{source.snippet}</p>
                    </div>
                  ))}
                  {results.leftSources.length === 0 && (
                    <p className="text-xs text-center text-ink/40 dark:text-paper/40 py-4">No sources in this range</p>
                  )}
                </div>
              </div>

              {/* CENTER Column */}
              <div className="rounded-lg border-2 border-slate-500/30 bg-slate-500/5 p-3">
                <h4 className="font-semibold text-slate-500 text-center mb-3 flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500" />
                  Center ({results.centerSources.length})
                </h4>
                <div className="space-y-2">
                  {results.centerSources.map((source, i) => (
                    <div key={i} className="p-2 rounded bg-white/50 dark:bg-ink/50 text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-ink dark:text-paper">{source.name}</span>
                        <span className="text-[10px] text-slate-500">{getBiasLabel(source.bias)}</span>
                      </div>
                      <p className="text-xs text-ink/60 dark:text-paper/60 line-clamp-2">{source.snippet}</p>
                    </div>
                  ))}
                  {results.centerSources.length === 0 && (
                    <p className="text-xs text-center text-ink/40 dark:text-paper/40 py-4">No sources in this range</p>
                  )}
                </div>
              </div>

              {/* RIGHT Column */}
              <div className="rounded-lg border-2 border-red-500/30 bg-red-500/5 p-3">
                <h4 className="font-semibold text-red-500 text-center mb-3 flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  Right ({results.rightSources.length})
                </h4>
                <div className="space-y-2">
                  {results.rightSources.map((source, i) => (
                    <div key={i} className="p-2 rounded bg-white/50 dark:bg-ink/50 text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-ink dark:text-paper">{source.name}</span>
                        <span className="text-[10px] text-red-500">{getBiasLabel(source.bias)}</span>
                      </div>
                      <p className="text-xs text-ink/60 dark:text-paper/60 line-clamp-2">{source.snippet}</p>
                    </div>
                  ))}
                  {results.rightSources.length === 0 && (
                    <p className="text-xs text-center text-ink/40 dark:text-paper/40 py-4">No sources in this range</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Guidance */}
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-3 text-ink dark:text-paper">
              <Info size={18} className="text-steel" />
              What to Compare
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs text-ink/60 dark:text-paper/60">
              <div className="p-2 rounded bg-ink/5 dark:bg-paper/5">
                <strong className="text-ink dark:text-paper">Language:</strong> How do they frame the same facts?
              </div>
              <div className="p-2 rounded bg-ink/5 dark:bg-paper/5">
                <strong className="text-ink dark:text-paper">Emphasis:</strong> What gets highlighted vs. buried?
              </div>
              <div className="p-2 rounded bg-ink/5 dark:bg-paper/5">
                <strong className="text-ink dark:text-paper">Sources:</strong> Who do they quote as experts?
              </div>
              <div className="p-2 rounded bg-ink/5 dark:bg-paper/5">
                <strong className="text-ink dark:text-paper">Consensus:</strong> What do ALL sides agree on?
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note about excluded sources */}
      <div className="p-3 rounded-lg bg-steel/10 border border-steel/20 text-xs text-ink/60 dark:text-paper/60">
        <strong className="text-ink dark:text-paper">Note:</strong> Fringe and low-credibility sources ({FRINGE_SOURCES.join(', ')}) are excluded to maintain quality. Focus is on credible journalism across the spectrum.
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 text-copper/30 py-4">
        <span>❧</span>
        <div className="w-8 h-px bg-current" />
        <span>⚖</span>
        <div className="w-8 h-px bg-current" />
        <span>☙</span>
      </div>
    </div>
  )
}
