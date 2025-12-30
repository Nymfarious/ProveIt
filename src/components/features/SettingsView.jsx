import { useState, useEffect } from 'react'
import { Settings, Moon, Sun, Palette, Shield, Bell, Database, Trash2, Download, MessageSquare, Send, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'

export default function SettingsView() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  })
  
  const [notifications, setNotifications] = useState(true)
  const [showDataSection, setShowDataSection] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackType, setFeedbackType] = useState('suggestion')
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('proveit-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('proveit-theme', 'light')
    }
  }, [darkMode])

  const handleClearData = () => {
    if (confirm('This will clear all your ProveIt data including saved preferences, history, and feedback. Continue?')) {
      localStorage.removeItem('proveit-rate-limit')
      localStorage.removeItem('proveit-enabled-sources')
      localStorage.removeItem('proveit-hidden-sources')
      localStorage.removeItem('proveit-dev-unlocked')
      localStorage.removeItem('proveit-gemini-key')
      localStorage.removeItem('proveit-score-history')
      // Keep feedback for developer review
      alert('Data cleared! Refresh the page to reset.')
    }
  }

  const handleExportData = () => {
    const data = {
      theme: localStorage.getItem('proveit-theme'),
      rateLimit: localStorage.getItem('proveit-rate-limit'),
      enabledSources: localStorage.getItem('proveit-enabled-sources'),
      hiddenSources: localStorage.getItem('proveit-hidden-sources'),
      scoreHistory: localStorage.getItem('proveit-score-history'),
      feedback: localStorage.getItem('proveit-feedback'),
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `proveit-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  const submitFeedback = () => {
    if (!feedbackText.trim()) return
    
    const existingFeedback = JSON.parse(localStorage.getItem('proveit-feedback') || '[]')
    const newFeedback = {
      id: Date.now(),
      type: feedbackType,
      text: feedbackText.trim(),
      timestamp: new Date().toISOString(),
      version: '3.4.1',
      userAgent: navigator.userAgent,
    }
    existingFeedback.push(newFeedback)
    localStorage.setItem('proveit-feedback', JSON.stringify(existingFeedback))
    
    setFeedbackText('')
    setFeedbackSubmitted(true)
    setTimeout(() => {
      setFeedbackSubmitted(false)
      setShowFeedbackForm(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-copper/10">
            <Settings size={24} className="text-copper" />
          </div>
          <div>
            <h2 className="font-headline text-xl font-semibold text-ink dark:text-paper">Settings</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              Customize your ProveIt experience
            </p>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <Palette size={18} className="text-copper" />
          Appearance
        </h3>
        
        <div className="flex items-center justify-between p-4 rounded-lg bg-ink/5 dark:bg-paper/5">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={20} className="text-copper" /> : <Sun size={20} className="text-copper" />}
            <div>
              <p className="font-medium text-ink dark:text-paper">Dark Mode</p>
              <p className="text-xs text-ink/50 dark:text-paper/50">Easier on the eyes in low light</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition-colors ${
              darkMode ? 'bg-copper' : 'bg-ink/20 dark:bg-paper/20'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
              darkMode ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>

      {/* Privacy */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <Shield size={18} className="text-copper" />
          Privacy & Notifications
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg bg-ink/5 dark:bg-paper/5">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-steel" />
              <div>
                <p className="font-medium text-ink dark:text-paper">Bias Alerts</p>
                <p className="text-xs text-ink/50 dark:text-paper/50">Notify when reading becomes unbalanced</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-forest' : 'bg-ink/20 dark:bg-paper/20'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="p-4 rounded-lg bg-forest/10 border border-forest/20">
            <div className="flex items-start gap-2">
              <Shield size={16} className="text-forest mt-0.5" />
              <div>
                <p className="font-medium text-sm text-forest">Your data stays on your device</p>
                <p className="text-xs text-forest/80">ProveIt doesn't send your reading history or preferences to any server. Everything is stored locally in your browser.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEEDBACK SECTION */}
      <div className="card border-copper/30">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <MessageSquare size={18} className="text-copper" />
          Feedback
        </h3>
        
        <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">
          Help improve ProveIt! Your feedback is stored locally and reviewed by the developer in DevTools.
        </p>

        {!showFeedbackForm ? (
          <button
            onClick={() => setShowFeedbackForm(true)}
            className="w-full p-4 rounded-lg bg-copper/10 border border-copper/30 hover:bg-copper/20 transition-colors flex items-center justify-center gap-2 text-copper font-medium"
          >
            <MessageSquare size={18} />
            Send Feedback
          </button>
        ) : feedbackSubmitted ? (
          <div className="p-4 rounded-lg bg-forest/10 border border-forest/20 flex items-center justify-center gap-2">
            <CheckCircle size={20} className="text-forest" />
            <span className="text-forest font-medium">Feedback saved! Thank you.</span>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-ink/60 dark:text-paper/60 mb-1 block">Feedback Type</label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="w-full p-2 rounded-lg border border-ink/20 dark:border-paper/20 bg-paper dark:bg-ink text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-copper/50"
              >
                <option value="suggestion">💡 Suggestion</option>
                <option value="bug">🐛 Bug Report</option>
                <option value="content">📝 Content Issue</option>
                <option value="ux">🎨 UX/Design</option>
                <option value="other">💬 Other</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs text-ink/60 dark:text-paper/60 mb-1 block">Your Feedback</label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="What would you like to share?"
                rows={4}
                className="w-full p-3 rounded-lg border border-ink/20 dark:border-paper/20 bg-paper dark:bg-ink text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-copper/50 resize-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="flex-1 px-4 py-2 text-sm text-ink/60 dark:text-paper/60 border border-ink/20 dark:border-paper/20 rounded-lg hover:bg-ink/5 dark:hover:bg-paper/5"
              >
                Cancel
              </button>
              <button
                onClick={submitFeedback}
                disabled={!feedbackText.trim()}
                className="flex-1 px-4 py-2 text-sm bg-copper text-white rounded-lg hover:bg-copper/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send size={14} />
                Submit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data Management */}
      <div className="card">
        <button
          onClick={() => setShowDataSection(!showDataSection)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="card-headline flex items-center gap-2 text-ink dark:text-paper">
            <Database size={18} className="text-copper" />
            Data Management
          </h3>
          {showDataSection ? <ChevronUp size={18} className="text-ink/50 dark:text-paper/50" /> : <ChevronDown size={18} className="text-ink/50 dark:text-paper/50" />}
        </button>
        
        {showDataSection && (
          <div className="mt-4 space-y-3">
            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-ink/5 dark:bg-paper/5 hover:bg-ink/10 dark:hover:bg-paper/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Download size={20} className="text-steel" />
                <div className="text-left">
                  <p className="font-medium text-ink dark:text-paper">Export Data</p>
                  <p className="text-xs text-ink/50 dark:text-paper/50">Download your settings and history</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleClearData}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-burgundy/10 hover:bg-burgundy/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Trash2 size={20} className="text-burgundy" />
                <div className="text-left">
                  <p className="font-medium text-burgundy">Clear All Data</p>
                  <p className="text-xs text-burgundy/70">Remove all saved preferences and history</p>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Version */}
      <div className="text-center text-xs text-ink/40 dark:text-paper/40 py-4">
        <p>ProveIt v3.4.1 • "Veritas Lux"</p>
        <p className="mt-1">Truth is Light</p>
      </div>
    </div>
  )
}
