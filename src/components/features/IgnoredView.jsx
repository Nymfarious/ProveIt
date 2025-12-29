import { useState } from 'react'
import { FolderX, AlertTriangle, ShieldAlert, Skull, ChevronDown, ChevronUp, Plus, Trash2, Star, Info, Clock, HelpCircle } from 'lucide-react'

const CONSPIRACY_DISINFO = [
  { name: 'RT (Russia Today)', reason: 'Russian state-controlled media', severity: 3 },
  { name: 'Sputnik', reason: 'Russian state media', severity: 3 },
  { name: 'InfoWars', reason: 'Conspiracy theories', severity: 3 },
  { name: 'Natural News', reason: 'Health misinformation', severity: 2 },
  { name: 'The Epoch Times', reason: 'Falun Gong-affiliated, misleading content', severity: 2 },
  { name: 'Gateway Pundit', reason: 'Frequent false claims', severity: 2 },
  { name: 'Zero Hedge', reason: 'Conspiracy promotion', severity: 2 },
  { name: 'WikiLeaks', reason: 'Controversial sourcing, legal concerns', severity: 3 },
]

const EXTREME_LEFT = [
  { name: 'World Socialist Web Site', reason: 'Extreme left bias' },
  { name: 'Liberation News', reason: 'Far-left propaganda' },
  { name: 'Workers World', reason: 'Marxist-Leninist perspective' },
]

const EXTREME_RIGHT = [
  { name: 'Breitbart', reason: 'Far-right bias' },
  { name: 'Daily Stormer', reason: 'Neo-Nazi content' },
  { name: 'OANN', reason: 'Extreme right, conspiracy promotion' },
  { name: 'Newsmax', reason: 'Far-right bias' },
]

export default function IgnoredView() {
  const [expanded, setExpanded] = useState({ conspiracy: true, extreme: false, custom: true })
  const [enabledLists, setEnabledLists] = useState({ conspiracy: true, extremeLeft: false, extremeRight: false })
  const [customSources, setCustomSources] = useState([{ name: 'example-fake-news.com', severity: 2, reviewed: true, viewTime: 185 }])
  const [newSource, setNewSource] = useState('')
  const [showTimerInfo, setShowTimerInfo] = useState(false)

  const toggleSection = (section) => setExpanded(prev => ({ ...prev, [section]: !prev[section] }))
  const toggleList = (list) => setEnabledLists(prev => ({ ...prev, [list]: !prev[list] }))
  const addCustomSource = () => {
    if (newSource.trim()) {
      setCustomSources(prev => [...prev, { name: newSource.trim(), severity: 1, reviewed: false, viewTime: 0 }])
      setNewSource('')
    }
  }
  const removeCustomSource = (index) => setCustomSources(prev => prev.filter((_, i) => i !== index))
  const setSeverity = (index, severity) => setCustomSources(prev => prev.map((s, i) => i === index ? { ...s, severity } : s))

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 1: return 'text-amber-500 bg-amber-500/20'
      case 2: return 'text-orange-500 bg-orange-500/20'
      case 3: return 'text-red-500 bg-red-500/20'
      default: return 'text-ink/50 bg-ink/10'
    }
  }

  const getSeverityLabel = (severity) => {
    switch (severity) { case 1: return 'Caution'; case 2: return 'Suspect'; case 3: return 'Avoid'; default: return 'Unrated' }
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-start gap-3">
          <FolderX size={24} className="text-copper flex-shrink-0" />
          <div>
            <h2 className="font-headline text-lg font-semibold mb-2">Flagged Sources</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              Sources on these lists are flagged in your feed with warnings. You can choose to auto-hide them or view them with context.
            </p>
          </div>
        </div>
      </div>

      {/* Conspiracy / Disinformation */}
      <div className="card">
        <button onClick={() => toggleSection('conspiracy')} className="w-full flex items-center justify-between">
          <h3 className="card-headline flex items-center gap-2">
            <Skull size={18} className="text-burgundy" />
            Conspiracy / Disinformation
            <span className="text-xs font-mono text-ink/40 dark:text-paper/40">({CONSPIRACY_DISINFO.length})</span>
          </h3>
          {expanded.conspiracy ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {expanded.conspiracy && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-burgundy/10 border border-burgundy/20">
              <div className="flex items-center gap-2">
                <ShieldAlert size={18} className="text-burgundy" />
                <span className="text-sm font-medium">Block known disinformation</span>
              </div>
              <button onClick={() => toggleList('conspiracy')} className={`toggle ${enabledLists.conspiracy ? 'active' : ''}`}>
                <span className="toggle-knob" />
              </button>
            </div>

            <div className="space-y-2">
              {CONSPIRACY_DISINFO.map((source) => (
                <div key={source.name} className="flex items-center justify-between p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
                  <div>
                    <span className="font-medium text-sm">{source.name}</span>
                    <p className="text-xs text-ink/50 dark:text-paper/50">{source.reason}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(source.severity)}`}>{getSeverityLabel(source.severity)}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-steel/10 border border-steel/20">
              <div className="flex items-start gap-2">
                <Info size={14} className="text-steel mt-0.5 flex-shrink-0" />
                <p className="text-xs text-ink/60 dark:text-paper/60">
                  <strong>About RT:</strong> Russia Today is a Russian state-controlled international news network. 
                  While blocked by default, researchers studying international perspectives may choose to enable it with warnings. 
                  Use Research Mode (coming soon) for safe comparison.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Extreme Sources */}
      <div className="card">
        <button onClick={() => toggleSection('extreme')} className="w-full flex items-center justify-between">
          <h3 className="card-headline flex items-center gap-2">
            <AlertTriangle size={18} className="text-copper" />
            Extreme Sources
            <span className="text-xs font-mono text-ink/40 dark:text-paper/40">({EXTREME_LEFT.length + EXTREME_RIGHT.length})</span>
          </h3>
          {expanded.extreme ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {expanded.extreme && (
          <div className="mt-4 space-y-4">
            <div className="flex gap-3">
              <button
                onClick={() => toggleList('extremeLeft')}
                className={`flex-1 p-3 rounded-lg border transition-colors flex items-center justify-center gap-2 ${
                  enabledLists.extremeLeft ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-ink/5 dark:bg-paper/5 border-ink/10 dark:border-paper/10 text-ink/60 dark:text-paper/60'
                }`}
              >
                <ShieldAlert size={16} /><span className="text-sm font-medium">Block Extreme Left</span>
              </button>
              <button
                onClick={() => toggleList('extremeRight')}
                className={`flex-1 p-3 rounded-lg border transition-colors flex items-center justify-center gap-2 ${
                  enabledLists.extremeRight ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-ink/5 dark:bg-paper/5 border-ink/10 dark:border-paper/10 text-ink/60 dark:text-paper/60'
                }`}
              >
                <ShieldAlert size={16} /><span className="text-sm font-medium">Block Extreme Right</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">Extreme Left ({EXTREME_LEFT.length})</p>
                <div className="space-y-2">
                  {EXTREME_LEFT.map((source) => (
                    <div key={source.name} className={`p-2 rounded-lg text-sm ${enabledLists.extremeLeft ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-ink/5 dark:bg-paper/5'}`}>
                      <span className="font-medium">{source.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-red-400 uppercase tracking-wider mb-2">Extreme Right ({EXTREME_RIGHT.length})</p>
                <div className="space-y-2">
                  {EXTREME_RIGHT.map((source) => (
                    <div key={source.name} className={`p-2 rounded-lg text-sm ${enabledLists.extremeRight ? 'bg-red-500/10 border border-red-500/20' : 'bg-ink/5 dark:bg-paper/5'}`}>
                      <span className="font-medium">{source.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Curated */}
      <div className="card">
        <button onClick={() => toggleSection('custom')} className="w-full flex items-center justify-between">
          <h3 className="card-headline flex items-center gap-2">
            <Star size={18} className="text-copper" />
            My Flagged Sources
            <span className="text-xs font-mono text-ink/40 dark:text-paper/40">({customSources.length})</span>
          </h3>
          {expanded.custom ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {expanded.custom && (
          <div className="mt-4 space-y-4">
            <div className="p-3 rounded-lg bg-steel/10 border border-steel/20">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <Info size={14} className="text-steel mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-ink/60 dark:text-paper/60">
                    <p className="mb-2"><strong>Your personal disinformation watchlist.</strong> Rate sources:</p>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500" /> Caution</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500" /> Suspect</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500" /> Avoid</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowTimerInfo(!showTimerInfo)} className="text-steel hover:text-copper"><HelpCircle size={16} /></button>
              </div>
              
              {showTimerInfo && (
                <div className="mt-3 pt-3 border-t border-steel/20 text-xs text-ink/60 dark:text-paper/60">
                  <div className="flex items-center gap-2 mb-1"><Clock size={12} /><strong>2-Minute Review Timer</strong></div>
                  <p>Ratings are only counted if you've viewed an article for at least 2 minutes.</p>
                </div>
              )}
            </div>

            {/* FIXED INPUT FIELD - proper text color and padding */}
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newSource} 
                onChange={(e) => setNewSource(e.target.value)} 
                placeholder="Add source URL or name..." 
                className="flex-1 px-4 py-3 rounded-lg border border-ink/20 dark:border-paper/20 
                         bg-paper dark:bg-ink 
                         text-ink dark:text-paper 
                         placeholder:text-ink/40 dark:placeholder:text-paper/40
                         focus:outline-none focus:ring-2 focus:ring-copper/50 focus:border-copper
                         transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && addCustomSource()} 
              />
              <button onClick={addCustomSource} className="btn-primary px-4"><Plus size={18} /></button>
            </div>

            {customSources.length === 0 ? (
              <p className="text-center text-sm text-ink/40 dark:text-paper/40 py-4">No custom sources added yet</p>
            ) : (
              <div className="space-y-2">
                {customSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
                    <div className="flex-1">
                      <span className="font-medium text-sm">{source.name}</span>
                      {source.reviewed && <span className="ml-2 text-xs text-forest">✓ Reviewed ({Math.floor(source.viewTime / 60)}m {source.viewTime % 60}s)</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((level) => (
                          <button key={level} onClick={() => setSeverity(index, level)} className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${source.severity >= level ? getSeverityColor(level) : 'bg-ink/10 dark:bg-paper/10 text-ink/30 dark:text-paper/30'}`}>
                            <Star size={12} fill={source.severity >= level ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                      </div>
                      <button onClick={() => removeCustomSource(index)} className="p-1.5 text-ink/40 dark:text-paper/40 hover:text-burgundy"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-center text-xs text-ink/40 dark:text-paper/40">Flagged sources still appear in your feed with warnings. Use Settings → Privacy to completely hide them.</p>
    </div>
  )
}
