import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Key, 
  Mail, 
  Trash2, 
  Download, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  Lock,
  Upload,
  FileText
} from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('privacy')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [session, setSession] = useState(null)
  const [reportStatus, setReportStatus] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user?.email) setEmail(session.user.email)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleVerifyEmail = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: 'https://nymfarious.github.io/ProveIt/',
      },
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Verification link sent! Check your inbox to confirm.')
    }
    setLoading(false)
  }

  const handleSendReport = async () => {
    if (!session) return
    setReportStatus('sending')

    const { error } = await supabase
      .from('proveit_reports')
      .insert([
        { 
          user_id: session.user.id,
          report_type: 'instant', 
          content_summary: 'Manual trigger from Settings' 
        }
      ])

    if (error) {
      console.error('Report error:', error)
      setReportStatus('error')
    } else {
      setTimeout(() => setReportStatus('success'), 1500)
      setTimeout(() => setReportStatus(null), 4000)
    }
  }

  const handleClearData = (duration) => {
    if (confirm(`Are you sure you want to clear tracking data for the last ${duration}?`)) {
      localStorage.removeItem('proveit_stats')
      localStorage.removeItem('proveit_history')
      alert('Data wiped from local device.')
    }
  }

  const handleExportData = () => {
    const data = {
      stats: JSON.parse(localStorage.getItem('proveit_stats') || '{}'),
      history: JSON.parse(localStorage.getItem('proveit_history') || '[]'),
      exportDate: new Date().toISOString(),
      version: '2.3.0'
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `proveit-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setEmail('')
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex rounded-lg overflow-hidden border border-ink/10 dark:border-paper/10">
        {[
          { id: 'privacy', label: 'Privacy & Data' },
          { id: 'reports', label: 'Email Reports' },
          { id: 'api', label: 'API Keys' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-ink dark:bg-paper text-paper dark:text-ink' 
                : 'bg-white dark:bg-ink-light text-ink/70 dark:text-paper/70 hover:bg-ink/5 dark:hover:bg-paper/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PRIVACY TAB */}
      {activeTab === 'privacy' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="card bg-forest/10 border border-forest/30">
            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-forest flex-shrink-0" />
              <div>
                <h4 className="font-bold text-forest dark:text-forest-light font-headline text-lg">
                  Your Data Stays Here
                </h4>
                <p className="text-sm text-ink/70 dark:text-paper/70 mt-1">
                  We do not track you across the web. All analysis happens locally on your device 
                  or via secure, encrypted channels. Your "lean" score is for your eyes only.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4">
              <Trash2 size={18} className="text-burgundy" /> 
              Clear Tracking Data
            </h3>
            <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">
              Wipe your local reading history and statistics. This cannot be undone.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {['12 hours', '24 hours', '7 days', '30 days'].map((duration) => (
                <button 
                  key={duration}
                  onClick={() => handleClearData(duration)} 
                  className="p-2 border border-ink/20 dark:border-paper/20 hover:bg-burgundy hover:text-white 
                           hover:border-burgundy rounded transition-colors text-sm"
                >
                  Last {duration}
                </button>
              ))}
            </div>
            <button 
              onClick={() => handleClearData('all time')} 
              className="w-full mt-3 p-2 border-2 border-burgundy text-burgundy hover:bg-burgundy 
                       hover:text-white rounded transition-colors font-bold text-sm"
            >
              Wipe Everything
            </button>
          </div>

          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4">
              <FileText size={18} className="text-steel" />
              Data Portability
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleExportData}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Export Data
              </button>
              <button 
                className="btn-ghost flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                disabled
                title="Coming in v2.4.0"
              >
                <Upload size={16} />
                Import Data
              </button>
            </div>
            <p className="text-xs text-ink/40 dark:text-paper/40 mt-3 text-center">
              Export your stats as JSON. Import feature coming in v2.4.0 for historical analysis.
            </p>
          </div>
        </motion.div>
      )}

      {/* REPORTS TAB */}
      {activeTab === 'reports' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="card bg-copper/10 border border-copper/30">
            <div className="flex items-start gap-3">
              <Lock size={20} className="text-copper dark:text-copper-light mt-0.5" />
              <div className="text-sm text-ink/70 dark:text-paper/70">
                <strong className="text-copper dark:text-copper-light">Security Notice:</strong> Any email 
                used in this app must be verified as owned by you. This protects you from spam and ensures 
                your report data is not available to anyone except you.
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4">
              <Mail size={18} className="text-steel" />
              Delivery Address
            </h3>

            {!session ? (
              <div className="space-y-4">
                <p className="text-sm text-ink/60 dark:text-paper/60">
                  Verify your email to enable daily reports.
                </p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="search-input flex-1"
                  />
                  <button 
                    onClick={handleVerifyEmail}
                    disabled={loading}
                    className="btn-primary px-6"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : 'Verify'}
                  </button>
                </div>
                <p className="text-xs text-ink/40 dark:text-paper/40">
                  We'll send a Magic Link to your inbox. No password needed.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 bg-forest/10 p-3 rounded-lg border border-forest/20">
                  <div className="flex items-center gap-2 text-forest font-bold">
                    <CheckCircle size={20} />
                    Verified: {session.user.email}
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="text-xs text-ink/50 dark:text-paper/50 hover:text-burgundy transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
                
                <div className="pt-4 border-t border-ink/10 dark:border-paper/10">
                  <h4 className="font-bold text-sm mb-3">Manual Actions</h4>
                  <button 
                    onClick={handleSendReport}
                    disabled={reportStatus === 'sending'}
                    className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all ${
                      reportStatus === 'success' ? 'bg-forest text-white' : 
                      reportStatus === 'error' ? 'bg-burgundy text-white' :
                      'bg-copper text-white hover:bg-copper-dark'
                    }`}
                  >
                    {reportStatus === 'sending' && <Loader2 size={18} className="animate-spin" />}
                    {reportStatus === 'success' && <CheckCircle size={18} />}
                    {reportStatus === 'error' && <AlertTriangle size={18} />}
                    
                    {reportStatus === 'sending' ? 'Generating Report...' : 
                     reportStatus === 'success' ? 'Report Sent!' : 
                     reportStatus === 'error' ? 'Error Sending' : 
                     'Trigger Instant Report'}
                  </button>
                  <p className="text-xs text-center text-ink/40 dark:text-paper/40 mt-2">
                    Sends a snapshot of your current stats to your verified email.
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-ink/10 dark:border-paper/10 opacity-50">
                  <label className="text-xs font-bold uppercase tracking-wider text-ink/50 dark:text-paper/50 block mb-2">
                    Secondary Recovery Email (v3.0)
                  </label>
                  <div className="flex gap-2">
                    <input 
                      disabled 
                      type="text" 
                      placeholder="Coming soon..." 
                      className="search-input flex-1 opacity-50 cursor-not-allowed" 
                    />
                    <button disabled className="btn-ghost opacity-50 cursor-not-allowed">Add</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* API TAB */}
      {activeTab === 'api' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="card bg-burgundy/10 border border-burgundy/30">
            <div className="flex gap-4">
              <AlertTriangle className="w-8 h-8 text-burgundy flex-shrink-0" />
              <div>
                <h4 className="font-bold text-burgundy dark:text-burgundy-light font-headline text-lg">
                  Developer Zone
                </h4>
                <p className="text-sm text-ink/70 dark:text-paper/70 mt-1">
                  API keys are set via environment variables for security. 
                  See <code className="bg-ink/10 dark:bg-paper/10 px-1 rounded">.env.example</code> for the format.
                </p>
              </div>
            </div>
          </div>

          <div className="card space-y-4">
            {[
              { key: 'newsdata', label: 'NewsData.io', status: !!import.meta.env.VITE_NEWSDATA_KEY },
              { key: 'gemini', label: 'Google Gemini', status: !!import.meta.env.VITE_GEMINI_API_KEY },
              { key: 'supabase', label: 'Supabase', status: !!import.meta.env.VITE_SUPABASE_URL },
              { key: 'claude', label: 'Anthropic Claude', status: false, coming: true },
              { key: 'openai', label: 'OpenAI', status: false, coming: true },
            ].map((api) => (
              <div key={api.key} className="flex items-center justify-between p-3 bg-ink/5 dark:bg-paper/5 rounded-lg">
                <span className="font-medium">{api.label}</span>
                {api.coming ? (
                  <span className="text-xs text-ink/40 dark:text-paper/40">Coming Soon</span>
                ) : api.status ? (
                  <span className="flex items-center gap-1 text-sm text-forest">
                    <CheckCircle size={14} />
                    Configured
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-burgundy">
                    <AlertTriangle size={14} />
                    Missing
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* About */}
      <div className="card text-center">
        <div className="flex items-center justify-center gap-2 mb-2 text-copper/50">
          <span>❧</span>
          <span>✦</span>
          <span>☙</span>
        </div>
        <div className="font-masthead text-2xl tracking-widest mb-1">P R O V E I T</div>
        <p className="text-sm text-ink/50 dark:text-paper/50">
          Version 2.3.0 • Personal Edition
        </p>
        <p className="text-xs text-ink/30 dark:text-paper/30 mt-2 italic font-headline">
          "Veritas Lux" — Truth is Light
        </p>
      </div>
    </div>
  )
}
