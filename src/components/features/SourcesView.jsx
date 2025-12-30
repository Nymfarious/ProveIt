import { useState, useEffect } from 'react'
import { Shield, Scale, Stethoscope, Newspaper, ExternalLink, AlertTriangle, CheckCircle, Info, X, Search, Power, Eye, EyeOff } from 'lucide-react'
import { TRUSTED_SOURCES, getBiasLabel, getCredibilityBadge, MEDICAL_DISCLAIMER } from '../../lib/trustedSources'

// Softer medical disclaimer
const SOFT_MEDICAL_DISCLAIMER = `⚕️ MEDICAL INFORMATION NOTICE

The medical sources listed here are provided for informational purposes only. Please keep in mind:

• Information found or linked through this app should not be used to self-diagnose conditions
• Medical test results should be interpreted by qualified healthcare professionals, not through online resources
• Always consult with a licensed healthcare provider for medical decisions
• When in doubt, seek professional medical advice

You have the option to hide any source you do not trust by clicking the eye icon. Your preferences are saved locally.

ProveIt aims to help you find reliable information, but medical decisions should always involve qualified professionals.`

export default function SourcesView() {
  const [activeTab, setActiveTab] = useState('political')
  const [showMedicalDisclaimer, setShowMedicalDisclaimer] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Category enable/disable
  const [enabledCategories, setEnabledCategories] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('proveit-enabled-sources')
      if (saved) return JSON.parse(saved)
    }
    return { political: true, legal: true, medical: true }
  })

  // Individual source hiding (user can hide CDC, NIH, etc.)
  const [hiddenSources, setHiddenSources] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('proveit-hidden-sources')
      if (saved) return JSON.parse(saved)
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('proveit-enabled-sources', JSON.stringify(enabledCategories))
  }, [enabledCategories])

  useEffect(() => {
    localStorage.setItem('proveit-hidden-sources', JSON.stringify(hiddenSources))
  }, [hiddenSources])

  const toggleCategory = (category) => {
    setEnabledCategories(prev => ({ ...prev, [category]: !prev[category] }))
  }

  const toggleSourceVisibility = (sourceName) => {
    setHiddenSources(prev => 
      prev.includes(sourceName) 
        ? prev.filter(s => s !== sourceName)
        : [...prev, sourceName]
    )
  }

  const isSourceHidden = (sourceName) => hiddenSources.includes(sourceName)

  const tabs = [
    { id: 'political', label: 'Political', icon: Newspaper, color: 'text-copper' },
    { id: 'legal', label: 'Legal', icon: Scale, color: 'text-steel' },
    { id: 'medical', label: 'Medical', icon: Stethoscope, color: 'text-forest' },
  ]

  const filterSources = (sources) => {
    if (!searchTerm) return sources
    return sources.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }

  const renderBiasBar = (bias) => {
    const position = ((bias + 3) / 6) * 100
    return (
      <div className="relative h-2 w-20 rounded-full bg-gradient-to-r from-blue-600 via-slate-400 to-red-600 overflow-hidden">
        <div 
          className="absolute top-0 w-2 h-2 bg-white border-2 border-ink rounded-full transform -translate-x-1/2"
          style={{ left: `${position}%` }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-copper/10">
            <Shield size={24} className="text-copper" />
          </div>
          <div>
            <h2 className="font-headline text-xl font-semibold text-ink dark:text-paper">Pre-Approved Sources</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              Trusted sources for politics, law, and medical information with bias ratings
            </p>
          </div>
        </div>
      </div>

      {/* Category Enable/Disable Controls */}
      <div className="card border-copper/30">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <Power size={18} className="text-copper" />
          Active Source Categories
        </h3>
        <p className="text-xs text-ink/50 dark:text-paper/50 mb-4">
          Turn off categories you do not want included in fact-check analysis and feed filtering.
        </p>
        
        <div className="grid sm:grid-cols-3 gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isEnabled = enabledCategories[tab.id]
            return (
              <button
                key={tab.id}
                onClick={() => toggleCategory(tab.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isEnabled 
                    ? 'border-forest/50 bg-forest/10' 
                    : 'border-ink/20 dark:border-paper/20 bg-ink/5 dark:bg-paper/5 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={20} className={isEnabled ? tab.color : 'text-ink/40 dark:text-paper/40'} />
                  <div className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-forest' : 'bg-ink/30 dark:bg-paper/30'}`} />
                </div>
                <p className={`font-medium text-left ${isEnabled ? 'text-ink dark:text-paper' : 'text-ink/50 dark:text-paper/50'}`}>
                  {tab.label}
                </p>
                <p className="text-xs text-left text-ink/40 dark:text-paper/40 mt-1">
                  {isEnabled ? 'Active in analysis' : 'Disabled'}
                </p>
              </button>
            )
          })}
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-steel/10 border border-steel/20 text-xs text-ink/60 dark:text-paper/60">
          <Info size={12} className="inline mr-1" />
          Disabled categories will not be used when checking sources in fact-checks or news feeds.
        </div>
      </div>

      {/* Hidden Sources Notice */}
      {hiddenSources.length > 0 && (
        <div className="p-3 rounded-lg bg-copper/10 border border-copper/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <EyeOff size={16} className="text-copper" />
            <span className="text-xs text-ink/70 dark:text-paper/70">
              {hiddenSources.length} source{hiddenSources.length > 1 ? 's' : ''} hidden by your preference
            </span>
          </div>
          <button 
            onClick={() => setHiddenSources([])}
            className="text-xs text-copper hover:underline"
          >
            Show all
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-ink/5 dark:bg-paper/5 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isEnabled = enabledCategories[tab.id]
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-paper dark:bg-ink shadow-sm text-ink dark:text-paper'
                  : 'text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper'
              } ${!isEnabled ? 'opacity-50' : ''}`}
            >
              <Icon size={16} className={activeTab === tab.id ? tab.color : ''} />
              <span className="hidden sm:inline">{tab.label}</span>
              {!isEnabled && <span className="text-[10px] text-burgundy">(off)</span>}
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-paper/40" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search sources..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink/20 dark:border-paper/20 
                   bg-paper dark:bg-ink text-ink dark:text-paper
                   focus:outline-none focus:ring-2 focus:ring-copper/50"
        />
      </div>

      {/* Disabled Warning */}
      {!enabledCategories[activeTab] && (
        <div className="p-4 rounded-lg bg-burgundy/10 border border-burgundy/30 flex items-center gap-3">
          <AlertTriangle size={20} className="text-burgundy flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-burgundy">This category is disabled</p>
            <p className="text-xs text-burgundy/70">Sources below will not be used in analysis. Toggle above to re-enable.</p>
          </div>
        </div>
      )}

      {/* Medical Disclaimer Modal */}
      {showMedicalDisclaimer && (
        <div className="fixed inset-0 bg-ink/50 dark:bg-ink/70 flex items-center justify-center z-50 p-4">
          <div className="bg-paper dark:bg-ink rounded-xl max-w-lg w-full p-6 shadow-xl border border-ink/20 dark:border-paper/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-copper" size={24} />
                <h3 className="font-headline text-xl font-semibold text-ink dark:text-paper">Medical Information Notice</h3>
              </div>
              <button onClick={() => setShowMedicalDisclaimer(false)} className="p-1 hover:bg-ink/10 dark:hover:bg-paper/10 rounded text-ink/60 dark:text-paper/60">
                <X size={20} />
              </button>
            </div>
            <div className="text-sm text-ink/70 dark:text-paper/70 space-y-3 whitespace-pre-line">
              {SOFT_MEDICAL_DISCLAIMER}
            </div>
            <button onClick={() => setShowMedicalDisclaimer(false)} className="btn-primary w-full mt-6">
              I Understand
            </button>
          </div>
        </div>
      )}

      {/* POLITICAL SOURCES */}
      {activeTab === 'political' && (
        <div className="card">
          <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
            <Newspaper size={18} className="text-copper" />
            Political News Sources
          </h3>
          
          <div className="mb-4 p-3 rounded-lg bg-steel/10 border border-steel/20 text-xs text-ink/60 dark:text-paper/60">
            <p>Bias ratings from -3 (Far Left) to +3 (Far Right) based on editorial positioning.</p>
          </div>

          <div className="space-y-2">
            {filterSources(TRUSTED_SOURCES.political).map((source) => {
              const bias = getBiasLabel(source.bias)
              const cred = getCredibilityBadge(source.credibility)
              const hidden = isSourceHidden(source.name)
              return (
                <div key={source.name} className={`flex items-center justify-between p-3 rounded-lg ${hidden ? 'bg-ink/10 dark:bg-paper/10 opacity-50' : 'bg-ink/5 dark:bg-paper/5'}`}>
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleSourceVisibility(source.name)} className="text-ink/40 dark:text-paper/40 hover:text-copper">
                      {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <span className={`font-medium text-sm ${hidden ? 'line-through text-ink/40 dark:text-paper/40' : 'text-ink dark:text-paper'}`}>{source.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${cred.color}`}>{cred.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium ${bias.color}`}>{bias.label}</span>
                    {renderBiasBar(source.bias)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* LEGAL SOURCES */}
      {activeTab === 'legal' && (
        <div className="card">
          <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
            <Scale size={18} className="text-steel" />
            Legal & Court Sources
          </h3>
          
          <div className="mb-4 p-3 rounded-lg bg-forest/10 border border-forest/20 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle size={14} className="text-forest mt-0.5 flex-shrink-0" />
              <p className="text-forest">Nonpartisan sources for legal research and court information.</p>
            </div>
          </div>

          <div className="space-y-3">
            {filterSources(TRUSTED_SOURCES.legal).map((source) => {
              const hidden = isSourceHidden(source.name)
              return (
                <div key={source.name} className={`p-4 rounded-lg border ${hidden ? 'bg-ink/10 dark:bg-paper/10 opacity-50 border-ink/10' : 'bg-ink/5 dark:bg-paper/5 border-ink/10 dark:border-paper/10'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <button onClick={() => toggleSourceVisibility(source.name)} className="text-ink/40 dark:text-paper/40 hover:text-copper">
                          {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <span className={`font-medium ${hidden ? 'line-through text-ink/40 dark:text-paper/40' : 'text-ink dark:text-paper'}`}>{source.name}</span>
                        {!hidden && <span className="text-xs px-2 py-0.5 rounded-full bg-forest/10 text-forest">✓✓ Trusted</span>}
                      </div>
                      <p className="text-xs text-ink/50 dark:text-paper/50 ml-6">{source.description}</p>
                    </div>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-steel hover:text-copper flex-shrink-0">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* MEDICAL SOURCES */}
      {activeTab === 'medical' && (
        <div className="space-y-4">
          {/* Disclaimer Banner - Softer tone */}
          <div className="card border-copper/30 bg-copper/5">
            <div className="flex items-start gap-3">
              <Info size={24} className="text-copper flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-copper mb-1">Medical Information Notice</h4>
                <p className="text-sm text-copper/80 mb-2">
                  Information here is for reference only—please consult healthcare professionals for medical decisions.
                </p>
                <button onClick={() => setShowMedicalDisclaimer(true)} className="text-xs text-copper underline">
                  Read Full Notice
                </button>
              </div>
            </div>
          </div>

          {/* User Control Notice */}
          <div className="p-3 rounded-lg bg-steel/10 border border-steel/20 flex items-center gap-2">
            <EyeOff size={14} className="text-steel" />
            <span className="text-xs text-ink/60 dark:text-paper/60">
              Click the eye icon on any source to hide it. Your trust preferences are saved locally.
            </span>
          </div>

          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
              <Stethoscope size={18} className="text-forest" />
              Medical Sources by Tier
            </h3>

            <div className="mb-4 p-3 rounded-lg bg-steel/10 border border-steel/20 text-xs text-ink/60 dark:text-paper/60">
              <p><strong className="text-ink dark:text-paper">Tier 1:</strong> Government & academic (highest credibility)</p>
              <p><strong className="text-ink dark:text-paper">Tier 2:</strong> Reputable medical news (verify claims)</p>
              <p><strong className="text-ink dark:text-paper">Tier 3:</strong> Mixed quality (cross-reference with Tier 1)</p>
            </div>

            {/* Tier 1 */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-forest flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-forest text-white flex items-center justify-center text-xs">1</span>
                Tier 1 - Government & Academic
              </h4>
              <div className="space-y-2">
                {filterSources(TRUSTED_SOURCES.medical.filter(s => s.tier === 1)).map((source) => {
                  const hidden = isSourceHidden(source.name)
                  return (
                    <div key={source.name} className={`flex items-center justify-between p-3 rounded-lg ${hidden ? 'bg-ink/10 dark:bg-paper/10 opacity-50' : 'bg-forest/10'} border border-forest/20`}>
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleSourceVisibility(source.name)} className="text-ink/40 dark:text-paper/40 hover:text-copper">
                          {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        {!hidden && <CheckCircle size={16} className="text-forest" />}
                        <div>
                          <span className={`font-medium text-sm ${hidden ? 'line-through text-ink/40 dark:text-paper/40' : 'text-ink dark:text-paper'}`}>{source.name}</span>
                          <p className="text-xs text-ink/50 dark:text-paper/50">{source.note}</p>
                        </div>
                      </div>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-forest hover:text-copper">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tier 2 */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-steel flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-steel text-white flex items-center justify-center text-xs">2</span>
                Tier 2 - Reputable Medical News
              </h4>
              <div className="space-y-2">
                {filterSources(TRUSTED_SOURCES.medical.filter(s => s.tier === 2)).map((source) => {
                  const hidden = isSourceHidden(source.name)
                  return (
                    <div key={source.name} className={`flex items-center justify-between p-3 rounded-lg ${hidden ? 'bg-ink/10 dark:bg-paper/10 opacity-50' : 'bg-steel/10'} border border-steel/20`}>
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleSourceVisibility(source.name)} className="text-ink/40 dark:text-paper/40 hover:text-copper">
                          {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        {!hidden && <Info size={16} className="text-steel" />}
                        <div>
                          <span className={`font-medium text-sm ${hidden ? 'line-through text-ink/40 dark:text-paper/40' : 'text-ink dark:text-paper'}`}>{source.name}</span>
                          <p className="text-xs text-ink/50 dark:text-paper/50">{source.note}</p>
                        </div>
                      </div>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-steel hover:text-copper">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tier 3 */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-copper flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-copper text-white flex items-center justify-center text-xs">3</span>
                Tier 3 - Mixed Quality
              </h4>
              <div className="space-y-2">
                {filterSources(TRUSTED_SOURCES.medical.filter(s => s.tier === 3)).map((source) => {
                  const hidden = isSourceHidden(source.name)
                  return (
                    <div key={source.name} className={`flex items-center justify-between p-3 rounded-lg ${hidden ? 'bg-ink/10 dark:bg-paper/10 opacity-50' : 'bg-copper/10'} border border-copper/20`}>
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleSourceVisibility(source.name)} className="text-ink/40 dark:text-paper/40 hover:text-copper">
                          {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        {!hidden && <AlertTriangle size={16} className="text-copper" />}
                        <div>
                          <span className={`font-medium text-sm ${hidden ? 'line-through text-ink/40 dark:text-paper/40' : 'text-ink dark:text-paper'}`}>{source.name}</span>
                          <p className="text-xs text-ink/50 dark:text-paper/50">{source.note}</p>
                        </div>
                      </div>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-copper hover:text-copper">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Blocked */}
            <div>
              <h4 className="text-sm font-semibold text-burgundy flex items-center gap-2 mb-2">
                <AlertTriangle size={16} />
                Blocked - Known Misinformation
              </h4>
              <div className="space-y-2">
                {TRUSTED_SOURCES.medicalBlocked.map((source) => (
                  <div key={source.name} className="flex items-center justify-between p-3 rounded-lg bg-burgundy/10 border border-burgundy/20">
                    <div className="flex items-center gap-3">
                      <X size={16} className="text-burgundy" />
                      <div>
                        <span className="font-medium text-sm text-burgundy">{source.name}</span>
                        <p className="text-xs text-burgundy/70">{source.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-ink/40 dark:text-paper/40">
        <p>Source ratings based on Media Bias/Fact Check, AllSides, and Ad Fontes Media.</p>
      </div>
    </div>
  )
}
