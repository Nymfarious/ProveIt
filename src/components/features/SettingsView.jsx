import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Mail, 
  Trash2, 
  Download, 
  Upload,
  CheckCircle, 
  AlertTriangle,
  Loader2,
  Lock,
  FileText,
  Palette,
  Eye,
  Info
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAnalyticsContext } from '../../App'

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('preferences')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [session, setSession] = useState(null)
  const [reportStatus, setReportStatus] = useState(null)
  const [importResult, setImportResult] = useState(null)
  const fileInputRef = useRef(null)

  const analytics = useAnalyticsContext()

  // Check Supabase session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user?.email) setEmail(session.user.email)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Handle email verification
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
      alert('Verification link sent! Check your inbox.')
    }
    setLoading(false)
  }

  // Handle report sending
  const handleSendReport = async () => {
    if (!session) return
    
    // Check for stale security (30+ days)
    if (analytics?.isStale) {
      alert('For your security, please re-verify your email. It has been 30+ days since your last report.')
      await supabase.auth.signOut()
      setSession(null)
      return
    }

    setReportStatus('sending')

    const { error } = await supabase
      .from('proveit_reports')
      .insert([{ 
        user_id: session.user.id,
        report_type: 'instant', 
        content_summary: JSON.stringify(analytics?.stats || {})
      }])

    if (error) {
      console.error('Report error:', error)
      setReportStatus('error')
    } else {
      analytics?.markReportSent?.()
      setReportStatus('success')
      setTimeout(() => setReportStatus(null), 4000)
    }
  }

  // Handle data clear
  const handleClearData = (duration) => {
    if (confirm(`Clear tracking data for the last ${duration}?`)) {
      analytics?.clearHistory?.(duration === 'all time' ? 'all' : duration)
    }
  }

  // Handle export
  const handleExport = () => {
    analytics?.exportData?.()
  }

  // Handle import
  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const result = analytics?.importData?.(event.target.result)
        setImportResult(result)
        setTimeout(() => setImportResult(null), 5000)
      } catch (err) {
        setImportResult({ success: false, error: err.message })
      }
    }
    reader.readAsText(file)
    e.target.value = '' // Reset input
  }

  // Handle sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setEmail('')
  }

  // Handle preference changes
  const handlePreferenceChange = (key, value) => {
    analytics?.updatePreferences?.({ [key]: value })
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex rounded-lg overflow-hidden border border-ink/10 dark:border-paper/10">
        {[
          { id: 'preferences', label: 'Preferences' },
          { id: 'data', label: 'My Data' },
          { id: 'reports', label: 'Email Reports' },
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

      {/* PREFERENCES TAB */}
      {activeTab === 'preferences' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Visual Preferences */}
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4">
              <Palette size={18} className="text-copper" />
              Display
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-ink/50 dark:text-paper/50">
                    Choose light or dark mode
                  </p>
                </div>
                <select 
                  value={analytics?.preferences?.theme || 'dark'}
                  onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                  className="px-3 py-2 rounded-lg bg-ink/5 dark:bg-paper/5 border border-ink/10 dark:border-paper/10"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Font Size</p>
                  <p className="text-sm text-ink/50 dark:text-paper/50">
                    Adjust text size
                  </p>
                </div>
                <select 
                  value={analytics?.preferences?.fontSize || 'medium'}
                  onChange={(e) => handlePreferenceChange('fontSize', e.target.value)}
                  className="px-3 py-2 rounded-lg bg-ink/5 dark:bg-paper/5 border border-ink/10 dark:border-paper/10"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Preferences */}
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4">
              <Eye size={18} className="text-copper" />
              Privacy
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reading Analytics</p>
                  <p className="text-sm text-ink/50 dark:text-paper/50">
                    Track your reading patterns locally
                  </p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('trackingEnabled', !analytics?.preferences?.trackingEnabled)}
                  className={`toggle ${analytics?.preferences?.trackingEnabled ? 'active' : ''}`}
                >
                  <span className="toggle-knob" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Retention</p>
                  <p className="text-sm text-ink/50 dark:text-paper/50">
                    How long to keep history
                  </p>
                </div>
                <select 
                  value={analytics?.preferences?.retentionDays || 30}
                  onChange={(e) => handlePreferenceChange('retentionDays', parseInt(e.target.value))}
                  className="px-3 py-2 rounded-lg bg-ink/5 dark:bg-paper/5 border border-ink/10 dark:border-paper/10"
                >
                  <option value={7}>7 days</option>
                  <option value={14}>14 days</option>
                  <option value={30}>30 days (max)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="card bg-forest/10 border border-forest/30">
            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-forest flex-shrink-0" />
              <div>
                <h4 className="font-bold text-forest dark:text-forest-light font-headline text-lg">
                  Your Data Stays Here
                </h4>
                <p className="text-sm text-ink/70 dark:text-paper/70 mt-1">
                  All analytics are calculated locally. We don't track you across the web 
                  or sell your data. Your lean score is for your eyes only.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* DATA TAB */}
      {activeTab === 'data' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Export/Import */}
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4">
              <FileText size={18} className="text-copper" />
              Data Portability
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleExport}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Export Data
              </button>
              <button 
                onClick={handleImportClick}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Upload size={16} />
                Import Data
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </div>

            {/* Import Result */}
            {importResult && (
              <div className={`mt-4 p-3 rounded-lg ${
                importResult.success 
                  ? 'bg-forest/10 border border-forest/20 text-forest' 
                  : 'bg-burgundy/10 border border-burgundy/20 text-burgundy'
              }`}>
                <div className="flex items-center gap-2">
                  {importResult.success ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                  <span className="font-medium">
                    {importResult.success ? 'Import successful!' : `Import failed: ${importResult.error}`}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-4 p-3 bg-ink/5 dark:bg-paper/5 rounded-lg">
              <div className="flex items-start gap-2 text-xs text-ink/60 dark:text-paper/60">
                <Info size={14} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">What's in the export?</p>
                  <ul className="space-y-0.5">
                    <li>• Your preferences (theme, tracking settings)</li>
                    <li>• Statistics (lean score, distribution)</li>
                    <li>• Reading history (up to 1,000 entries)</li>
                    <li>• Summary for quick reference</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Clear Data */}
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4">
              <Trash2 size={18} className="text-burgundy" /> 
              Clear Tracking Data
            </h3>
            <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">
              Permanently delete your reading history. This cannot be undone.
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

          {/* Current Stats Summary */}
          {analytics?.stats?.totalReads > 0 && (
            <div className="card bg-ink/5 dark:bg-paper/5">
              <h3 className="card-headline mb-3">Current Data Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-ink/50 dark:text-paper/50">Articles tracked:</span>
                  <span className="ml-2 font-bold">{analytics.stats.totalReads}</span>
                </div>
                <div>
                  <span className="text-ink/50 dark:text-paper/50">Lean score:</span>
                  <span className="ml-2 font-bold">{analytics.stats.leanScore}</span>
                </div>
                <div>
                  <span className="text-ink/50 dark:text-paper/50">Sources:</span>
                  <span className="ml-2 font-bold">{analytics.stats.topSources?.length || 0}</span>
                </div>
                <div>
                  <span className="text-ink/50 dark:text-paper/50">Diversity:</span>
                  <span className="ml-2 font-bold">{analytics.stats.sourceDiversity}%</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* REPORTS TAB */}
      {activeTab === 'reports' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Security Notice */}
          <div className="card bg-copper/10 border border-copper/30">
            <div className="flex items-start gap-3">
              <Lock size={20} className="text-copper mt-0.5" />
              <div className="text-sm text-ink/70 dark:text-paper/70">
                <strong className="text-copper">Security Notice:</strong> Email verification 
                ensures only you can receive reports. For added security, you'll need to 
                re-verify after 30 days of inactivity.
              </div>
            </div>
          </div>

          {/* Email Verification */}
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4">
              <Mail size={18} className="text-steel" />
              Report Delivery
            </h3>

            {!session ? (
              <div className="space-y-4">
                <p className="text-sm text-ink/60 dark:text-paper/60">
                  Verify your email to enable reports.
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
                  We'll send a Magic Link. No password needed.
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
                    className="text-xs text-ink/50 hover:text-burgundy transition-colors"
                  >
                    Sign Out
                  </button>
                </div>

                {/* Stale Warning */}
                {analytics?.isStale && (
                  <div className="p-3 bg-burgundy/10 border border-burgundy/20 rounded-lg">
                    <div className="flex items-center gap-2 text-burgundy text-sm">
                      <AlertTriangle size={16} />
                      <span>It's been 30+ days. Re-verify for security.</span>
                    </div>
                  </div>
                )}
                
                <div className="pt-4 border-t border-ink/10 dark:border-paper/10">
                  <h4 className="font-bold text-sm mb-3">Send Report</h4>
                  <button 
                    onClick={handleSendReport}
                    disabled={reportStatus === 'sending' || analytics?.isStale}
                    className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all ${
                      reportStatus === 'success' ? 'bg-forest text-white' : 
                      reportStatus === 'error' ? 'bg-burgundy text-white' :
                      analytics?.isStale ? 'bg-ink/20 text-ink/50 cursor-not-allowed' :
                      'bg-copper text-white hover:bg-copper-dark'
                    }`}
                  >
                    {reportStatus === 'sending' && <Loader2 size={18} className="animate-spin" />}
                    {reportStatus === 'success' && <CheckCircle size={18} />}
                    {reportStatus === 'error' && <AlertTriangle size={18} />}
                    
                    {reportStatus === 'sending' ? 'Generating...' : 
                     reportStatus === 'success' ? 'Report Sent!' : 
                     reportStatus === 'error' ? 'Error' : 
                     analytics?.isStale ? 'Re-verify First' :
                     'Send Instant Report'}
                  </button>
                  <p className="text-xs text-center text-ink/40 dark:text-paper/40 mt-2">
                    Sends a summary of your current stats to {session.user.email}
                  </p>
                </div>
              </div>
            )}
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
