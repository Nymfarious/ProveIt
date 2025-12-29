import { useState } from 'react'
import { BarChart3, TrendingUp, Eye, Target, AlertTriangle, Info, HelpCircle } from 'lucide-react'
import BiasBar from '../ui/BiasBar'

export default function StatsView() {
  const [includeIgnored, setIncludeIgnored] = useState(false)
  const [showVarianceInfo, setShowVarianceInfo] = useState(false)
  
  const userStats = {
    totalArticles: 156,
    averageBias: -1.2,
    sourceVariance: 68,
    distribution: { left: 12, leanLeft: 28, center: 35, leanRight: 18, right: 7 },
    distributionWithIgnored: { farLeft: 3, left: 14, leanLeft: 30, center: 35, leanRight: 20, right: 9, farRight: 5 },
    topSources: [
      { name: 'Reuters', count: 24, bias: 'center' },
      { name: 'NPR', count: 18, bias: 'leanLeft' },
      { name: 'AP News', count: 15, bias: 'center' },
      { name: 'WSJ', count: 12, bias: 'leanRight' },
      { name: 'BBC', count: 10, bias: 'center' },
      { name: 'The Guardian', count: 8, bias: 'leanLeft' },
      { name: 'Fox News', count: 6, bias: 'right' },
      { name: 'CNN', count: 5, bias: 'leanLeft' },
      { name: 'Al Jazeera', count: 4, bias: 'center' },
      { name: 'The Economist', count: 3, bias: 'leanRight' },
    ],
    weeklyTrend: [-1.5, -1.2, -0.8, -1.0, -1.2],
    ignoredArticlesCount: 8,
  }

  const currentDistribution = includeIgnored ? userStats.distributionWithIgnored : userStats.distribution
  const totalWithIgnored = userStats.totalArticles + userStats.ignoredArticlesCount

  const getBiasLabel = (score) => {
    if (score <= -3) return 'Far Left'
    if (score <= -1.5) return 'Left'
    if (score <= -0.5) return 'Lean Left'
    if (score <= 0.5) return 'Center'
    if (score <= 1.5) return 'Lean Right'
    if (score <= 3) return 'Right'
    return 'Far Right'
  }

  const getBiasPosition = (score) => ((score + 5) / 10) * 100

  const getVarianceLabel = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Moderate'
    if (score >= 20) return 'Limited'
    return 'Very Limited'
  }

  const getVarianceColor = (score) => {
    if (score >= 80) return 'text-forest'
    if (score >= 60) return 'text-emerald-500'
    if (score >= 40) return 'text-steel'
    if (score >= 20) return 'text-copper'
    return 'text-burgundy'
  }

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="p-4 rounded-lg border border-steel/20 bg-steel/5">
        <div className="flex items-start gap-3">
          <Info size={18} className="text-steel mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-steel mb-1">About Your Statistics</p>
            <p className="text-ink/60 dark:text-paper/60">
              These analytics are based solely on your reading activity within ProveIt. 
              Bias ratings come from independent media watchdog databases and reflect 
              general editorial positioning—not the accuracy of individual articles.
            </p>
          </div>
        </div>
      </div>

      {/* Include Ignored Toggle */}
      <div className={`p-3 rounded-lg border transition-colors ${includeIgnored ? 'border-copper/40 bg-copper/5' : 'border-ink/10 dark:border-paper/10'}`}>
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            {includeIgnored && <AlertTriangle size={16} className="text-copper" />}
            <span className={`text-sm ${includeIgnored ? 'text-copper font-medium' : 'text-ink/60 dark:text-paper/60'}`}>
              {includeIgnored ? `Including ${userStats.ignoredArticlesCount} articles from Ignored Sources` : 'Include articles from Ignored Sources in stats'}
            </span>
          </div>
          <button onClick={() => setIncludeIgnored(!includeIgnored)} className={`toggle ${includeIgnored ? 'active' : ''}`}>
            <span className="toggle-knob" />
          </button>
        </label>
      </div>

      {/* Source Variance Score */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <BarChart3 size={18} className="text-copper" />
          Source Variance Score
          <button onClick={() => setShowVarianceInfo(!showVarianceInfo)} className="ml-auto text-ink/40 dark:text-paper/40 hover:text-copper">
            <HelpCircle size={16} />
          </button>
        </h3>

        {showVarianceInfo && (
          <div className="mb-4 p-3 rounded-lg bg-steel/10 border border-steel/20 text-sm text-ink/70 dark:text-paper/70">
            <p className="mb-2"><strong>Source Variance</strong> measures how many different perspectives you're exposed to across the political spectrum.</p>
            <p>A higher score means you're reading from a wider range of sources.</p>
          </div>
        )}
        
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl font-bold font-mono">
            <span className={getVarianceColor(userStats.sourceVariance)}>{userStats.sourceVariance}</span>
            <span className="text-lg text-ink/30 dark:text-paper/30">/100</span>
          </div>
          <div>
            <p className={`font-semibold ${getVarianceColor(userStats.sourceVariance)}`}>{getVarianceLabel(userStats.sourceVariance)}</p>
            <p className="text-sm text-ink/50 dark:text-paper/50">Perspective range</p>
          </div>
        </div>

        <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-burgundy via-steel to-forest">
          <div className="absolute top-0 right-0 h-full bg-ink/20 dark:bg-paper/20 transition-all" style={{ width: `${100 - userStats.sourceVariance}%` }} />
        </div>
        <div className="flex justify-between mt-1 text-xs text-ink/40 dark:text-paper/40">
          <span>Limited</span>
          <span>Broad spectrum</span>
        </div>
      </div>

      {/* Where You Lean */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-6">
          <Target size={18} className="text-copper" />
          Where You Lean
        </h3>
        
        <div className="relative pt-10 pb-4">
          <div className="absolute top-0 transition-all duration-500" style={{ left: `${getBiasPosition(userStats.averageBias)}%`, transform: 'translateX(-50%)' }}>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-copper mb-1">YOU</span>
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-copper" />
            </div>
          </div>
          
          <div className="h-5 rounded-full overflow-hidden flex shadow-inner">
            <div className="flex-1 bg-gradient-to-r from-blue-900 to-blue-700" />
            <div className="flex-1 bg-gradient-to-r from-blue-700 to-blue-500" />
            <div className="flex-1 bg-gradient-to-r from-blue-500 to-slate-400" />
            <div className="flex-1 bg-gradient-to-r from-slate-400 to-slate-500" />
            <div className="flex-1 bg-gradient-to-r from-slate-500 to-red-500" />
            <div className="flex-1 bg-gradient-to-r from-red-500 to-red-700" />
            <div className="flex-1 bg-gradient-to-r from-red-700 to-red-900" />
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-ink/50 dark:text-paper/50 font-medium">
            <span>LEFT</span><span>CENTER</span><span>RIGHT</span>
          </div>
        </div>

        <p className="text-center text-sm text-ink/60 dark:text-paper/60 mt-4">
          Based on {includeIgnored ? totalWithIgnored : userStats.totalArticles} articles, you currently{' '}
          <span className="font-semibold text-ink dark:text-paper">{getBiasLabel(userStats.averageBias)}</span>
        </p>
      </div>

      {/* Distribution */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <BarChart3 size={18} className="text-copper" />
          Reading Distribution
          {includeIgnored && <span className="text-xs font-normal text-copper bg-copper/10 px-2 py-0.5 rounded-full">+Ignored</span>}
        </h3>
        <BiasBar sources={currentDistribution} />
        <p className="text-sm text-ink/40 dark:text-paper/40 text-center mt-4">
          {includeIgnored ? totalWithIgnored : userStats.totalArticles} articles • Last 30 days
        </p>
      </div>

      {/* Weekly Trend */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-copper" />
          Weekly Trend
        </h3>
        
        <div className="relative h-32 flex items-end justify-between gap-3 px-4">
          {userStats.weeklyTrend.map((value, index) => {
            const normalizedHeight = ((value + 5) / 10) * 100
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gradient-to-t from-steel to-copper rounded-t hover:from-copper hover:to-copper transition-colors" style={{ height: `${normalizedHeight}%` }} />
                <span className="text-xs text-ink/40 dark:text-paper/40 mt-2">W{index + 1}</span>
              </div>
            )
          })}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-ink/20 dark:bg-paper/20 pointer-events-none" />
        </div>
        
        <div className="flex justify-between mt-4 text-xs text-ink/40 dark:text-paper/40">
          <span>← Left leaning</span>
          <span>Right leaning →</span>
        </div>
      </div>

      {/* Top 10 Sources */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <Eye size={18} className="text-copper" />
          Top 10 Sources
        </h3>
        
        <div className="space-y-4">
          {userStats.topSources.slice(0, 10).map((source, index) => (
            <div key={source.name} className="flex items-center gap-3">
              <span className="w-6 text-sm text-ink/40 dark:text-paper/40 font-mono">{index + 1}.</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{source.name}</span>
                  <span className="text-sm text-ink/50 dark:text-paper/50">{source.count} articles</span>
                </div>
                <div className="h-2 bg-ink/10 dark:bg-paper/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-copper to-steel rounded-full" style={{ width: `${(source.count / userStats.topSources[0].count) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-ink/40 dark:text-paper/40">📊 Demo data shown. Real analytics will track your actual reading patterns.</p>
    </div>
  )
}
