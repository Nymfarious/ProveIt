import { useState, useEffect } from 'react'
import { Wrench, Key, Unlock, Lock, AlertTriangle, CheckCircle, Trash2, RefreshCw, Eye, EyeOff, MessageSquare, ChevronDown, ChevronUp, TrendingUp, Calendar, Zap, Database, TestTube, Info } from 'lucide-react'

// 7-DAY TEST DATA GENERATOR
const generateTestData = () => {
  const data = []
  const now = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    // Simulate realistic usage patterns
    // More activity on weekdays, less on weekends
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const activityMultiplier = isWeekend ? 0.5 : 1
    
    // Slight left-leaning tendency with some variation
    const leftBase = Math.floor((3 + Math.random() * 5) * activityMultiplier)
    const centerBase = Math.floor((5 + Math.random() * 8) * activityMultiplier)
    const rightBase = Math.floor((2 + Math.random() * 4) * activityMultiplier)
    
    data.push({
      id: Date.now() - (i * 86400000) + Math.random() * 1000,
      date: date.toISOString(),
      leftReads: leftBase,
      centerReads: centerBase,
      rightReads: rightBase,
      factChecks: Math.floor((1 + Math.random() * 3) * activityMultiplier),
      mediaChecks: Math.floor(Math.random() * 2 * activityMultiplier),
      researchSessions: Math.floor(Math.random() * 2 * activityMultiplier),
    })
  }
  
  return data
}

// Generate test feedback data
const generateTestFeedback = () => {
  const types = ['bug', 'suggestion', 'content', 'ux']
  const samples = [
    { type: 'bug', text: 'Dark mode flickers briefly when switching pages' },
    { type: 'suggestion', text: 'Would love to see a comparison view for two articles side by side' },
    { type: 'content', text: 'The Federalist Paper summaries are excellent! Could you add Anti-Federalist papers too?' },
    { type: 'ux', text: 'The bias bar could use labels for colorblind users' },
    { type: 'suggestion', text: 'Export to PDF would be amazing for the founding documents' },
  ]
  
  return samples.slice(0, 3 + Math.floor(Math.random() * 3)).map((sample, i) => ({
    id: Date.now() - i * 100000,
    type: sample.type,
    text: sample.text,
    timestamp: new Date(Date.now() - i * 86400000).toISOString(),
    version: '3.4.2',
    userAgent: 'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36'
  }))
}

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
  const [showTestDataInfo, setShowTestDataInfo] = useState(false)

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
    alert('API key saved to browser localStorage!')
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

  // Single mock score (legacy)
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

  // NEW: Load 7 days of realistic test data
  const loadSevenDayTestData = () => {
    const testScores = generateTestData()
    const testFeedback = generateTestFeedback()
    
    localStorage.setItem('proveit-score-history', JSON.stringify(testScores))
    localStorage.setItem('proveit-feedback', JSON.stringify(testFeedback))
    
    setScoreHistory(testScores)
    setFeedback(testFeedback)
    
    alert('Loaded 7 days of test data! Check Score Tracking and Feedback sections.')
  }

  const clearScoreHistory = () => {
    if (confirm('Clear score history?')) {
      localStorage.removeItem('proveit-score-history')
      setScoreHistory([])
    }
  }

  // Clear ALL test data
  const clearAllTestData = () => {
    if (confirm('Clear ALL test data (scores, feedback, rate limits)?')) {
      localStorage.removeItem('proveit-score-history')
      localStorage.removeItem('proveit-feedback')
      localStorage.removeItem('proveit-rate-limit')
      setScoreHistory([])
      setFeedback([])
      setRateLimit(null)
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

      {/* TEST DATA GENERATOR - NEW */}
      <div className="card border-2 border-dashed border-copper/40 bg-copper/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-headline flex items-center gap-2 text-ink dark:text-paper">
            <TestTube size={18} className="text-copper" />
            Test Data Generator
          </h3>
          <button 
            onClick={() => setShowTestDataInfo(!showTestDataInfo)}
            className="text-ink/40 dark:text-paper/40 hover:text-copper"
          >
            <Info size={16} />
          </button>
        </div>

        {showTestDataInfo && (
          <div className="mb-4 p-3 rounded-lg bg-paper dark:bg-ink border border-steel/20 text-xs text-ink/70 dark:text-paper/70">
            <p className="mb-2"><strong>For testers:</strong> This generates realistic sample data to see how the app behaves with a week of usage.</p>
            <p>Includes: Reading history across bias spectrum, fact-checks, media checks, and sample feedback entries.</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button 
            onClick={loadSevenDayTestData} 
            className="btn-primary flex items-center gap-2"
          >
            <Calendar size={16} />
            Load 7 Days of Test Data
          </button>
          <button 
            onClick={clearAllTestData} 
            className="px-4 py-2 text-sm text-burgundy border border-burgundy/30 rounded-lg hover:bg-burgundy/10 flex items-center gap-2"
          >
            <Trash2 size={16} />
            Clear All Test Data
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
              Get a key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-copper hover:underline">Google AI Studio</a>
            </p>
          </div>

          {/* IMPORTANT: localStorage vs .env explanation */}
          <div className="p-3 rounded-lg bg-steel/10 border border-steel/20">
            <p className="text-xs text-ink/60 dark:text-paper/60 mb-2">
              <strong className="text-ink dark:text-paper">Where are keys stored?</strong>
            </p>
            <ul className="text-xs text-ink/60 dark:text-paper/60 space-y-1">
              <li>• <strong>DevTools key</strong> → Saved in your browser (localStorage)</li>
              <li>• <strong>.env file</strong> → Used at build time only (for deployment)</li>
              <li>• <strong>Supabase secrets</strong> → Backup for deployed app</li>
            </ul>
            <p className="text-xs text-ink/50 dark:text-paper/50 mt-2 italic">
              Keys entered here do NOT modify any files. They persist in this browser only.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-forest/10 border border-forest/20">
            <p className="text-xs text-ink/60 dark:text-paper/60">
              <strong className="text-forest">NewsData.io:</strong> Set <code className="bg-ink/10 px-1 rounded">VITE_NEWSDATA_KEY</code> in your .env file for live news feeds.
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
                <Zap size={12} className="inline mr-1" /> Add Single Entry
              </button>
              <button onClick={clearScoreHistory} className="text-xs px-3 py-1 bg-burgundy/20 text-burgundy rounded-lg hover:bg-burgundy/30">
                <Trash2 size={12} className="inline mr-1" /> Clear
              </button>
            </div>

            {scoreHistory.length === 0 ? (
              <p className="text-sm text-ink/50 dark:text-paper/50">No score history. Use "Load 7 Days of Test Data" above or collect data as users read articles.</p>
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
              <p className="text-sm text-ink/50 dark:text-paper/50">No feedback yet. Users can submit via Settings, or use "Load 7 Days of Test Data" above.</p>
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
          <p>Version: 3.4.2</p>
          <p>Build: {new Date().toISOString().split('T')[0]}</p>
          <p>Theme: {localStorage.getItem('proveit-theme') || 'system'}</p>
          <p>Storage: localStorage</p>
          <p>Gemini Key: {geminiKey ? '✓ Configured (localStorage)' : '✗ Not set'}</p>
          <p>Env Key: {import.meta.env.VITE_GEMINI_API_KEY ? '✓ Found (.env)' : '○ Not in .env'}</p>
        </div>
      </div>

      {/* Warning */}
      <div className="p-4 rounded-lg bg-burgundy/10 border border-burgundy/20">
        <div className="flex items-start gap-2">
          <AlertTriangle size={18} className="text-burgundy flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-burgundy">Developer Mode Active</p>
            <p className="text-xs text-burgundy/80">Rate limits disabled. API keys stored in localStorage (browser only, not synced).</p>
          </div>
        </div>
      </div>
    </div>
  )
}
