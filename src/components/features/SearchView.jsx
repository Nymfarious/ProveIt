import { useState } from 'react'
import { Search, AlertCircle, CheckCircle, HelpCircle, Loader2 } from 'lucide-react'
import { runAI } from '../../lib/gemini'
import BiasBar from '../ui/BiasBar'

export default function SearchView() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const prompt = `You are a fact-checker. Analyze this claim or URL and provide a verdict.

Claim/URL: "${query}"

Respond in this exact JSON format only, no other text:
{
  "verdict": "true" | "mostly_true" | "mixed" | "mostly_false" | "false",
  "confidence": 0.0 to 1.0,
  "summary": "Brief explanation of your analysis",
  "keyPoints": ["point 1", "point 2", "point 3"]
}

Base your analysis on factual accuracy, context, and potential bias.`

      const response = await runAI(prompt)
      
      let parsed
      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0])
        } else {
          throw new Error('No JSON found')
        }
      } catch {
        parsed = {
          verdict: 'mixed',
          confidence: 0.5,
          summary: response,
          keyPoints: []
        }
      }

      setResult({
        query: query,
        verdict: parsed.verdict || 'mixed',
        confidence: parsed.confidence || 0.5,
        summary: parsed.summary || 'Analysis complete.',
        keyPoints: parsed.keyPoints || [],
        sources: {
          left: 2,
          leanLeft: 3,
          center: 4,
          leanRight: 2,
          right: 1
        },
        aiProvider: 'gemini'
      })
    } catch (err) {
      console.error('Search error:', err)
      setError('Failed to analyze. Please check your API key in Settings.')
    } finally {
      setIsLoading(false)
    }
  }

  const getVerdictDisplay = (verdict) => {
    const verdicts = {
      true: { icon: CheckCircle, color: 'text-forest', label: 'TRUE', bg: 'bg-forest/10' },
      mostly_true: { icon: CheckCircle, color: 'text-forest', label: 'MOSTLY TRUE', bg: 'bg-forest/10' },
      mixed: { icon: HelpCircle, color: 'text-copper', label: 'MIXED', bg: 'bg-copper/10' },
      mostly_false: { icon: AlertCircle, color: 'text-burgundy', label: 'MOSTLY FALSE', bg: 'bg-burgundy/10' },
      false: { icon: AlertCircle, color: 'text-burgundy', label: 'FALSE', bg: 'bg-burgundy/10' },
    }
    return verdicts[verdict] || verdicts.mixed
  }

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <div className="card">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-paper/40" 
              size={20} 
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Paste a news URL or type a claim to fact-check..."
              className="search-input pl-12 pr-4"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="btn-primary w-full mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search size={18} />
                Check It
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="card border-burgundy/30 bg-burgundy/5">
          <div className="flex items-center gap-3 text-burgundy">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Verdict Card */}
          <div className="card">
            <div className="flex items-start gap-4">
              {(() => {
                const v = getVerdictDisplay(result.verdict)
                const Icon = v.icon
                return (
                  <div className={`p-3 rounded-lg ${v.bg}`}>
                    <Icon className={v.color} size={28} />
                  </div>
                )
              })()}
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-headline text-xl font-bold ${getVerdictDisplay(result.verdict).color}`}>
                    {getVerdictDisplay(result.verdict).label}
                  </span>
                  <span className="text-sm text-ink/50 dark:text-paper/50">
                    ({Math.round(result.confidence * 100)}% confidence)
                  </span>
                </div>
                <p className="text-ink/70 dark:text-paper/70 leading-relaxed">
                  {result.summary}
                </p>
                
                {result.keyPoints?.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {result.keyPoints.map((point, i) => (
                      <li key={i} className="text-sm text-ink/60 dark:text-paper/60 flex items-start gap-2">
                        <span className="text-copper">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Source Distribution */}
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4">
              <span>Source Distribution</span>
              <span className="text-sm font-normal text-ink/50 dark:text-paper/50">(Demo data)</span>
            </h3>
            <BiasBar sources={result.sources} />
          </div>

          {/* AI Attribution */}
          <div className="text-center text-xs text-ink/40 dark:text-paper/40 font-mono">
            Analyzed by {result.aiProvider.toUpperCase()} • {new Date().toLocaleTimeString()}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !error && (
        <div className="card text-center py-12">
          <div className="flex items-center justify-center gap-2 mb-4 text-copper/30">
            <span>❧</span>
            <span>✦</span>
            <span>☙</span>
          </div>
          <Search size={40} className="mx-auto mb-3 text-ink/20 dark:text-paper/20" />
          <h3 className="font-headline text-lg mb-1">Ready to fact-check</h3>
          <p className="text-sm text-ink/50 dark:text-paper/50 mb-4">
            Enter a claim or paste a URL above to get started
          </p>
          <p className="text-xs text-ink/30 dark:text-paper/30">
            Need help? Click the <HelpCircle size={12} className="inline" /> icon in the navigation
          </p>
        </div>
      )}
    </div>
  )
}
