import { useState } from 'react'
import { Shield, Scale, Stethoscope, Newspaper, ExternalLink, AlertTriangle, CheckCircle, Info, X, Search } from 'lucide-react'
import { TRUSTED_SOURCES, getBiasLabel, getCredibilityBadge, MEDICAL_DISCLAIMER } from '../../lib/trustedSources'

export default function SourcesView() {
  const [activeTab, setActiveTab] = useState('political')
  const [showMedicalDisclaimer, setShowMedicalDisclaimer] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

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
    // Position from 0 (far left, -3) to 100 (far right, +3)
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

  const renderCredibilityTier = (tier) => {
    const colors = {
      1: 'bg-forest text-white',
      2: 'bg-steel text-white',
      3: 'bg-copper text-white',
    }
    return (
      <span className={`text-[10px] px-1.5 py-0.5 rounded ${colors[tier] || 'bg-ink/20'}`}>
        Tier {tier}
      </span>
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
            <h2 className="font-headline text-xl font-semibold">Pre-Approved Sources</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              Trusted sources for politics, law, and medical information with bias ratings
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-ink/5 dark:bg-paper/5 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-paper dark:bg-ink shadow-sm text-ink dark:text-paper'
                  : 'text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper'
              }`}
            >
              <Icon size={16} className={activeTab === tab.id ? tab.color : ''} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
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

      {/* Medical Disclaimer Modal */}
      {showMedicalDisclaimer && (
        <div className="fixed inset-0 bg-ink/50 dark:bg-ink/70 flex items-center justify-center z-50 p-4">
          <div className="bg-paper dark:bg-ink-light rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-burgundy" size={24} />
                <h3 className="font-headline text-xl font-semibold">Medical Disclaimer</h3>
              </div>
              <button onClick={() => setShowMedicalDisclaimer(false)} className="p-1 hover:bg-ink/10 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="text-sm text-ink/70 dark:text-paper/70 space-y-3 whitespace-pre-line">
              {MEDICAL_DISCLAIMER}
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
          <h3 className="card-headline flex items-center gap-2 mb-4">
            <Newspaper size={18} className="text-copper" />
            Political News Sources
          </h3>
          
          <div className="mb-4 p-3 rounded-lg bg-steel/10 border border-steel/20 text-xs text-ink/60 dark:text-paper/60">
            <p>Bias ratings from -3 (Far Left) to +3 (Far Right) based on editorial positioning, not factual accuracy.</p>
          </div>

          <div className="space-y-2">
            {filterSources(TRUSTED_SOURCES.political).map((source) => {
              const bias = getBiasLabel(source.bias)
              const cred = getCredibilityBadge(source.credibility)
              return (
                <div key={source.name} className="flex items-center justify-between p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{source.name}</span>
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
          <h3 className="card-headline flex items-center gap-2 mb-4">
            <Scale size={18} className="text-steel" />
            Legal & Court Sources
          </h3>
          
          <div className="mb-4 p-3 rounded-lg bg-forest/10 border border-forest/20 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle size={14} className="text-forest mt-0.5 flex-shrink-0" />
              <p className="text-forest">These sources are nonpartisan and trusted for legal research and court information.</p>
            </div>
          </div>

          <div className="space-y-3">
            {filterSources(TRUSTED_SOURCES.legal).map((source) => (
              <div key={source.name} className="p-4 rounded-lg bg-ink/5 dark:bg-paper/5 border border-ink/10 dark:border-paper/10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{source.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-forest/10 text-forest">✓✓ Trusted</span>
                    </div>
                    <p className="text-xs text-ink/50 dark:text-paper/50">{source.description}</p>
                  </div>
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-steel hover:text-copper flex-shrink-0"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MEDICAL SOURCES */}
      {activeTab === 'medical' && (
        <div className="space-y-4">
          {/* Disclaimer Banner */}
          <div className="card border-burgundy/30 bg-burgundy/5">
            <div className="flex items-start gap-3">
              <AlertTriangle size={24} className="text-burgundy flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-burgundy mb-1">Important Medical Disclaimer</h4>
                <p className="text-sm text-burgundy/80 mb-2">
                  This is NOT medical advice. Do not self-diagnose or interpret test results.
                </p>
                <button 
                  onClick={() => setShowMedicalDisclaimer(true)}
                  className="text-xs text-burgundy underline hover:no-underline"
                >
                  Read Full Disclaimer
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4">
              <Stethoscope size={18} className="text-forest" />
              Medical Sources by Tier
            </h3>

            <div className="mb-4 p-3 rounded-lg bg-steel/10 border border-steel/20 text-xs text-ink/60 dark:text-paper/60">
              <p><strong>Tier 1:</strong> Government & academic institutions (highest credibility)</p>
              <p><strong>Tier 2:</strong> Reputable medical news (high credibility, verify claims)</p>
              <p><strong>Tier 3:</strong> Mixed quality (always cross-reference with Tier 1)</p>
            </div>

            {/* Tier 1 */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-forest flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-forest text-white flex items-center justify-center text-xs">1</span>
                Tier 1 - Government & Academic
              </h4>
              <div className="space-y-2">
                {filterSources(TRUSTED_SOURCES.medical.filter(s => s.tier === 1)).map((source) => (
                  <div key={source.name} className="flex items-center justify-between p-3 rounded-lg bg-forest/10 border border-forest/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-forest" />
                      <div>
                        <span className="font-medium text-sm">{source.name}</span>
                        <p className="text-xs text-ink/50 dark:text-paper/50">{source.note}</p>
                      </div>
                    </div>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-forest hover:text-copper">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Tier 2 */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-steel flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-steel text-white flex items-center justify-center text-xs">2</span>
                Tier 2 - Reputable Medical News
              </h4>
              <div className="space-y-2">
                {filterSources(TRUSTED_SOURCES.medical.filter(s => s.tier === 2)).map((source) => (
                  <div key={source.name} className="flex items-center justify-between p-3 rounded-lg bg-steel/10 border border-steel/20">
                    <div className="flex items-center gap-3">
                      <Info size={16} className="text-steel" />
                      <div>
                        <span className="font-medium text-sm">{source.name}</span>
                        <p className="text-xs text-ink/50 dark:text-paper/50">{source.note}</p>
                      </div>
                    </div>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-steel hover:text-copper">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Tier 3 */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-copper flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-copper text-white flex items-center justify-center text-xs">3</span>
                Tier 3 - Mixed Quality (Verify Claims)
              </h4>
              <div className="space-y-2">
                {filterSources(TRUSTED_SOURCES.medical.filter(s => s.tier === 3)).map((source) => (
                  <div key={source.name} className="flex items-center justify-between p-3 rounded-lg bg-copper/10 border border-copper/20">
                    <div className="flex items-center gap-3">
                      <AlertTriangle size={16} className="text-copper" />
                      <div>
                        <span className="font-medium text-sm">{source.name}</span>
                        <p className="text-xs text-ink/50 dark:text-paper/50">{source.note}</p>
                      </div>
                    </div>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-copper hover:text-copper">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Blocked Medical Sources */}
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
