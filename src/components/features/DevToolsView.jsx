import { useState, useEffect } from 'react'
import { Wrench, Key, Unlock, Lock, AlertTriangle, CheckCircle, Trash2, RefreshCw, Eye, EyeOff, MessageSquare, ChevronDown, ChevronUp, TrendingUp, Calendar, Zap, Database } from 'lucide-react'

export default function DevToolsView() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [unlockCode, setUnlockCode] = useState('')
  const [geminiKey, setGeminiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [rateLimit, setRateLimit] = useState(null)
  const [feedback, setFeedback] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [scoreHistory, setScoreHistory] = useState([])
  const [showScores, setShowScores] = useState(false)

  useEffect(() => {
    const unlocked = localStorage.getItem('proveit-dev-unlocked') === 'true'
    setIsUnlocked(unlocked)
    
    const savedKey = localStorage.getItem('proveit-gemini-key')
    if (savedKey) setGeminiKey(savedKey)
    
    const limit = localStorage.getItem('proveit-rate-limit')
    if (limit) setRateLimit(JSON.parse(limit))
    
    const savedFeedback = localStorage.getItem('proveit-feedback')
    if (savedFeedback) setFeedback(JSON.parse(savedFeedback))
    
    const savedScores = localStorage.getItem('proveit-score-history')
    if (savedScores) setScoreHistory(JSON.parse(savedScores))
  }, [])

  const handleUnlock = () => {
    if (unlockCode === 'VERITAS' || unlockCode === 'veritas') {
      setIsUnlocked(true)
      localStorage.setItem('proveit-dev-unlocked', 'true')
    } else {
      alert('Invalid code. Hint: Latin for "truth"')
    }
  }

  const handleLock = () => {
    setIsUnlocked(false)
    localStorage.setItem('proveit-dev-unlocked', 'false')
  }

  const handleSaveKey = () => {
    localStorage.setItem('proveit-gemini-key', geminiKey)
    alert('API key saved!')
  }

  const handleResetRateLimit = () => {
    localStorage.removeItem('proveit-rate-limit')
    setRateLimit(null)
    alert('Rate limit reset!')
  }

  const handleClearFeedback = () => {
    if (confirm('Clear all feedback? This cannot be undone.')) {
      localStorage.removeItem('proveit-feedback')
      setFeedback([])
    }
  }

  const handleDeleteFeedback = (id) => {
    const updated = feedback.filter(f => f.id !== id)
    localStorage.setItem('proveit-feedback', JSON.stringify(updated))
    setFeedback(updated)
  }

  const addMockScore = () => {
    const newScore = {
      id: Date.now(),
      date: new Date().toISOString(),
      leftReads: Math.floor(Math.random() * 10),
      centerReads: Math.floor(Math.random() * 15),
      rightReads: Math.floor(Math.random() * 10),
      factChecks: Math.floor(Math.random() * 5),
    }
    const updated = [...scoreHistory, newScore]
    localStorage.setItem('proveit-score-history', JSON.stringify(updated))
    setScoreHistory(updated)
  }

  const clearScoreHistory = () => {
    if (confirm('Clear score history?')) {
      localStorage.removeItem('proveit-score-history')
      setScoreHistory([])
    }
  }

  const getFeedbackIcon = (type) => {
    switch (type) {
      case 'bug': return '🐛'
      case 'suggestion': return '💡'
      case 'content': return '📝'
      case 'ux': return '🎨'
      default: return '💬'
    }
  }

  if (!isUnlocked) {
    return (
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-copper/10">
              <Lock size={24} className="text-copper" />
            </div>
            <div>
              <h2 className="font-headline text-xl font-semibold text-ink dark:text-paper">Developer Tools</h2>
              <p className="text-sm text-ink/60 dark:text-paper/60">Enter unlock code to access</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Key size={20} className="text-copper" />
            <h3 className="font-semibold text-ink dark:text-paper">Unlock DevTools</h3>
          </div>
          
          <div className="flex gap-2">
            <input
              type="password"
              value={unlockCode}
              onChange={(e) => setUnlockCode(e.target.value)}
              placeholder="Enter code..."
              className="flex-1 px-4 py-2 rounded-lg border border-ink/20 dark:border-paper/20 bg-paper dark:bg-ink text-ink dark:text-paper focus:outline-none focus:ring-2 focus:ring-copper/50"
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            />
            <button onClick={handleUnlock} className="btn-primary">
              <Unlock size={18} />
              Unlock
            </button>
          </div>
          
          <p className="text-xs text-ink/40 dark:text-paper/40 mt-3">
            Hint: Latin for "truth"
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-copper/10">
              <Wrench size={24} className="text-copper" />
            </div>
            <div>
              <h2 className="font-headline text-xl font-semibold text-ink dark:text-paper">Developer Tools</h2>
              <p className="text-sm text-forest flex items-center gap-1">
                <CheckCircle size={14} /> Unlocked
              </p>
            </div>
          </div>
          <button onClick={handleLock} className="text-xs text-burgundy hover:underline flex items-center gap-1">
            <Lock size={12} /> Lock
          </button>
        </div>
      </div>

      {/* API Configuration */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <Key size={18} className="text-copper" />
          API Configuration
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs text-ink/60 dark:text-paper/60 mb-1 block">Gemini API Key</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="Enter your Gemini API key..."
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-ink/20 dark:border-paper/20 bg-paper dark:bg-ink text-ink dark:text-paper focus:outline-none focus:ring-2 focus:ring-copper/50"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-paper/40 hover:text-ink dark:hover:text-paper"
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <button onClick={handleSaveKey} className="btn-primary">
                Save
              </button>
            </div>
            <p className="text-xs text-ink/40 dark:text-paper/40 mt-2">
              Get a key at <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-copper hover:underline">Google AI Studio</a>
            </p>
          </div>

          <div className="p-3 rounded-lg bg-steel/10 border border-steel/20">
            <p className="text-xs text-ink/60 dark:text-paper/60">
              <strong className="text-ink dark:text-paper">NewsData.io:</strong> Set VITE_NEWSDATA_KEY in your .env file for live news feeds.
            </p>
          </div>
        </div>
      </div>

      {/* Rate Limit */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <RefreshCw size={18} className="text-copper" />
          Rate Limiting
        </h3>
        
        {rateLimit ? (
          <div className="p-4 rounded-lg bg-ink/5 dark:bg-paper/5 mb-4">
            <p className="text-sm text-ink dark:text-paper">
              <strong>Date:</strong> {rateLimit.date}
            </p>
            <p className="text-sm text-ink dark:text-paper">
              <strong>Checks used:</strong> {rateLimit.count} / 5
            </p>
          </div>
        ) : (
          <p className="text-sm text-ink/50 dark:text-paper/50 mb-4">No rate limit data found.</p>
        )}
        
        <div className="flex gap-2">
          <button onClick={handleResetRateLimit} className="btn-primary">
            <RefreshCw size={16} />
            Reset Limit
          </button>
          <div className="text-xs text-forest bg-forest/10 px-3 py-2 rounded-lg flex items-center gap-1">
            <CheckCircle size={14} />
            DevMode = Unlimited
          </div>
        </div>
      </div>

      {/* SCORE TRACKING */}
      <div className="card">
        <button
          onClick={() => setShowScores(!showScores)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="card-headline flex items-center gap-2 text-ink dark:text-paper">
            <TrendingUp size={18} className="text-copper" />
            Score Tracking
            <span className="text-xs bg-copper/20 text-copper px-2 py-0.5 rounded-full">{scoreHistory.length} records</span>
          </h3>
          {showScores ? <ChevronUp size={18} className="text-ink/50 dark:text-paper/50" /> : <ChevronDown size={18} className="text-ink/50 dark:text-paper/50" />}
        </button>

        {showScores && (
          <div className="mt-4 space-y-3">
            <div className="flex gap-2">
              <button onClick={addMockScore} className="text-xs px-3 py-1 bg-copper/20 text-copper rounded-lg hover:bg-copper/30">
                <Zap size={12} className="inline mr-1" /> Add Mock Data
              </button>
              <button onClick={clearScoreHistory} className="text-xs px-3 py-1 bg-burgundy/20 text-burgundy rounded-lg hover:bg-burgundy/30">
                <Trash2 size={12} className="inline mr-1" /> Clear
              </button>
            </div>

            {scoreHistory.length === 0 ? (
              <p className="text-sm text-ink/50 dark:text-paper/50">No score history. Data will be collected as users read articles.</p>
            ) : (
              <div className="max-h-64 overflow-y-auto space-y-2">
                {scoreHistory.slice(-10).reverse().map((score) => (
                  <div key={score.id} className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="text-ink/60 dark:text-paper/60">{new Date(score.date).toLocaleDateString()}</span>
                      <span className="text-copper font-mono">{score.factChecks} checks</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-blue-500">L: {score.leftReads}</span>
                      <span className="text-slate-500">C: {score.centerReads}</span>
                      <span className="text-red-500">R: {score.rightReads}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="p-3 rounded-lg bg-steel/10 border border-steel/20 text-xs text-ink/60 dark:text-paper/60">
              <strong className="text-ink dark:text-paper">Score Tracking:</strong> Collects reading balance and fact-check usage over time. 
              Future: Week-over-week, month-over-month comparison reports.
            </div>
          </div>
        )}
      </div>

      {/* FEEDBACK VIEWER */}
      <div className="card border-copper/30">
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="card-headline flex items-center gap-2 text-ink dark:text-paper">
            <MessageSquare size={18} className="text-copper" />
            User Feedback
            <span className="text-xs bg-copper/20 text-copper px-2 py-0.5 rounded-full">{feedback.length}</span>
          </h3>
          {showFeedback ? <ChevronUp size={18} className="text-ink/50 dark:text-paper/50" /> : <ChevronDown size={18} className="text-ink/50 dark:text-paper/50" />}
        </button>

        {showFeedback && (
          <div className="mt-4 space-y-3">
            {feedback.length === 0 ? (
              <p className="text-sm text-ink/50 dark:text-paper/50">No feedback yet. Users can submit via Settings.</p>
            ) : (
              <>
                <div className="flex justify-end">
                  <button onClick={handleClearFeedback} className="text-xs text-burgundy hover:underline flex items-center gap-1">
                    <Trash2 size={12} /> Clear All
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto space-y-3">
                  {feedback.slice().reverse().map((item) => (
                    <div key={item.id} className="p-4 rounded-lg bg-ink/5 dark:bg-paper/5 border-l-4 border-copper">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getFeedbackIcon(item.type)}</span>
                          <span className="text-xs font-medium text-copper capitalize">{item.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-ink/40 dark:text-paper/40">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                          <button onClick={() => handleDeleteFeedback(item.id)} className="text-burgundy/50 hover:text-burgundy">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-ink/80 dark:text-paper/80 mb-2">{item.text}</p>
                      <div className="text-[10px] text-ink/40 dark:text-paper/40">
                        v{item.version} • {item.userAgent?.split(' ').slice(-1)[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* System Info */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <Database size={18} className="text-copper" />
          System Info
        </h3>
        <div className="space-y-2 text-xs font-mono text-ink/60 dark:text-paper/60">
          <p>Version: 3.4.1</p>
          <p>Build: {new Date().toISOString().split('T')[0]}</p>
          <p>Theme: {localStorage.getItem('proveit-theme') || 'system'}</p>
          <p>Storage: localStorage</p>
          <p>Gemini Key: {geminiKey ? '✓ Configured' : '✗ Not set'}</p>
        </div>
      </div>

      {/* Warning */}
      <div className="p-4 rounded-lg bg-burgundy/10 border border-burgundy/20">
        <div className="flex items-start gap-2">
          <AlertTriangle size={18} className="text-burgundy flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-burgundy">Developer Mode Active</p>
            <p className="text-xs text-burgundy/80">Rate limits disabled. API keys stored in localStorage (not secure for production).</p>
          </div>
        </div>
      </div>
    </div>
  )
}
