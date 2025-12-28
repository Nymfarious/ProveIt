import { useState } from 'react'
import { Key, Database, Bell, Trash2, Download, Pause, AlertCircle, CheckCircle, Shield, Info, X } from 'lucide-react'

export default function SettingsView() {
  const [apiKeys, setApiKeys] = useState({
    newsdata: '',
    gemini: '',
    claude: '',
    openai: '',
  })
  const [saved, setSaved] = useState(false)
  const [privacy, setPrivacy] = useState({
    analyticsEnabled: true,
    dataRetentionDays: 30,
  })
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [clearPeriod, setClearPeriod] = useState(null)

  const handleSaveKeys = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClearData = (period) => {
    setClearPeriod(period)
    setShowClearConfirm(true)
  }

  const confirmClear = () => {
    // TODO: Actually clear localStorage data
    console.log(`Clearing data for: ${clearPeriod}`)
    setShowClearConfirm(false)
    setClearPeriod(null)
  }

  return (
    <div className="space-y-6">
      {/* Privacy Info Modal */}
      {showPrivacyInfo && (
        <div className="fixed inset-0 bg-ink/50 dark:bg-ink/70 flex items-center justify-center z-50 p-4">
          <div className="bg-paper dark:bg-ink-light rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="text-forest" size={24} />
                <h3 className="font-headline text-xl font-semibold">Your Privacy Matters</h3>
              </div>
              <button 
                onClick={() => setShowPrivacyInfo(false)}
                className="p-1 hover:bg-ink/10 dark:hover:bg-paper/10 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 text-sm text-ink/70 dark:text-paper/70">
              <p>
                <strong className="text-ink dark:text-paper">ProveIt does NOT track you.</strong> We don't collect, 
                store, or transmit any of your personal data to external servers.
              </p>
              
              <div className="p-3 bg-forest/10 rounded-lg border border-forest/20">
                <p className="text-forest font-medium mb-2">What stays on YOUR device:</p>
                <ul className="space-y-1 text-forest/80">
                  <li>• Reading history & statistics</li>
                  <li>• Personal preferences</li>
                  <li>• Ignored source settings</li>
                  <li>• All analytics data</li>
                </ul>
              </div>

              <p>
                The only external communication happens when you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Fetch news articles (NewsData.io)</li>
                <li>Request AI fact-checks (Gemini/Claude)</li>
                <li>Voluntarily email yourself a report</li>
              </ul>

              <p>
                <strong className="text-ink dark:text-paper">You own your data.</strong> Clear it anytime using the 
                options below. No questions asked. No hidden copies.
              </p>
            </div>

            <button 
              onClick={() => setShowPrivacyInfo(false)}
              className="btn-primary w-full mt-6"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Clear Data Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-ink/50 dark:bg-ink/70 flex items-center justify-center z-50 p-4">
          <div className="bg-paper dark:bg-ink-light rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-burgundy">
              <Trash2 size={24} />
              <h3 className="font-headline text-xl font-semibold">Clear Data?</h3>
            </div>
            
            <p className="text-ink/70 dark:text-paper/70 mb-6">
              This will permanently delete your reading history and statistics 
              {clearPeriod === 'all' ? '' : ` from the last ${clearPeriod}`}. 
              This cannot be undone.
            </p>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowClearConfirm(false)}
                className="btn-ghost flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={confirmClear}
                className="btn-primary flex-1 bg-burgundy hover:bg-burgundy-dark"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Keys */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <Key size={18} className="text-copper" />
          API Configuration
        </h3>
        
        <div className="p-3 rounded-lg bg-steel/10 border border-steel/20 mb-4">
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className="text-steel mt-0.5 flex-shrink-0" />
            <p className="text-sm text-steel">
              API keys should be set in your <code className="bg-steel/20 px-1 rounded">.env</code> file 
              for security. See <code className="bg-steel/20 px-1 rounded">.env.example</code> for the format.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          {[
            { key: 'newsdata', label: 'NewsData.io', placeholder: 'VITE_NEWSDATA_KEY', envVar: 'VITE_NEWSDATA_KEY' },
            { key: 'gemini', label: 'Google Gemini', placeholder: 'VITE_GEMINI_API_KEY', envVar: 'VITE_GEMINI_API_KEY' },
            { key: 'claude', label: 'Anthropic Claude', placeholder: 'Coming soon...', disabled: true },
            { key: 'openai', label: 'OpenAI', placeholder: 'Coming soon...', disabled: true },
          ].map((api) => (
            <div key={api.key}>
              <label className="block text-sm font-medium mb-1">{api.label}</label>
              <input
                type="password"
                value={apiKeys[api.key]}
                onChange={(e) => setApiKeys({ ...apiKeys, [api.key]: e.target.value })}
                placeholder={api.placeholder}
                disabled={api.disabled}
                className="search-input text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          ))}
        </div>

        <button 
          onClick={handleSaveKeys}
          className="btn-primary mt-4"
        >
          {saved ? (
            <>
              <CheckCircle size={16} />
              Saved!
            </>
          ) : (
            'Save API Keys'
          )}
        </button>
      </div>

      {/* Privacy & Analytics */}
      <div className="card" id="privacy-section">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-headline flex items-center gap-2">
            <Database size={18} className="text-copper" />
            Privacy & Analytics
          </h3>
          <button 
            onClick={() => setShowPrivacyInfo(true)}
            className="text-sm text-steel hover:text-steel-dark flex items-center gap-1"
          >
            <Shield size={14} />
            How we protect your data
          </button>
        </div>

        {/* Privacy Notice Banner */}
        <div className="p-3 rounded-lg bg-forest/10 border border-forest/20 mb-4">
          <div className="flex items-start gap-2">
            <Shield size={16} className="text-forest mt-0.5 flex-shrink-0" />
            <p className="text-sm text-forest">
              <strong>Your data stays on YOUR device.</strong> ProveIt doesn't track you or send 
              your information anywhere. {' '}
              <button 
                onClick={() => setShowPrivacyInfo(true)}
                className="underline hover:no-underline"
              >
                Learn more
              </button>
            </p>
          </div>
        </div>
        
        <div className="space-y-5">
          {/* Analytics toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Reading Analytics</p>
              <p className="text-sm text-ink/50 dark:text-paper/50">
                Track your reading patterns locally
              </p>
            </div>
            <button
              onClick={() => setPrivacy({ ...privacy, analyticsEnabled: !privacy.analyticsEnabled })}
              className={`toggle ${privacy.analyticsEnabled ? 'active' : ''}`}
            >
              <span className="toggle-knob" />
            </button>
          </div>

          {/* Data retention */}
          <div>
            <label className="block text-sm font-medium mb-2">Data Retention (Rolling Window)</label>
            <select 
              value={privacy.dataRetentionDays}
              onChange={(e) => setPrivacy({ ...privacy, dataRetentionDays: Number(e.target.value) })}
              className="search-input text-sm"
            >
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days (max)</option>
            </select>
            <p className="text-xs text-ink/40 dark:text-paper/40 mt-1">
              Data older than this is automatically deleted
            </p>
          </div>

          {/* Clear Data Options */}
          <div className="pt-4 border-t border-ink/10 dark:border-paper/10">
            <p className="text-sm font-medium mb-3 flex items-center gap-2">
              <Trash2 size={14} className="text-burgundy" />
              Clear Tracking Data
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: '12 hours', value: '12 hours' },
                { label: '1 day', value: '1 day' },
                { label: '1 week', value: '1 week' },
                { label: '1 month', value: '1 month' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleClearData(option.value)}
                  className="px-3 py-2 text-sm rounded-lg border border-burgundy/30 text-burgundy 
                           hover:bg-burgundy/10 transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => handleClearData('all')}
              className="w-full mt-2 px-3 py-2 text-sm rounded-lg bg-burgundy/10 border border-burgundy/30 
                       text-burgundy hover:bg-burgundy/20 transition-colors font-medium"
            >
              Clear All Data
            </button>
          </div>

          {/* Other actions */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-ink/10 dark:border-paper/10">
            <button className="btn-ghost text-sm">
              <Pause size={14} />
              Pause Tracking
            </button>
            <button className="btn-ghost text-sm">
              <Download size={14} />
              Export My Data
            </button>
          </div>
        </div>
      </div>

      {/* Email Reports */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <Bell size={18} className="text-copper" />
          Email Reports
        </h3>

        <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 border border-ink/10 dark:border-paper/10 mb-4">
          <p className="text-sm text-ink/60 dark:text-paper/60">
            <Info size={14} className="inline mr-1" />
            Email reports send a summary of your stats directly to you. 
            Your email is never shared or used for anything else.
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Primary Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="search-input text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Backup Email <span className="text-ink/40 dark:text-paper/40">(optional)</span>
            </label>
            <input
              type="email"
              placeholder="backup@email.com"
              className="search-input text-sm"
            />
            <p className="text-xs text-ink/40 dark:text-paper/40 mt-1">
              Can be used for account recovery
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Report Frequency</p>
            {['Never', 'Daily Summary', 'Weekly Digest'].map((option, i) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="frequency" 
                  defaultChecked={i === 0}
                  className="accent-copper" 
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>

          <button className="btn-secondary w-full">
            Verify Email & Save
          </button>
        </div>
      </div>

      {/* About */}
      <div className="card text-center">
        <div className="flex items-center justify-center gap-2 mb-2 text-copper/50">
          <span>❧</span>
          <span>✦</span>
          <span>☙</span>
        </div>
        <div className="font-masthead text-2xl tracking-widest mb-1">P R O V E I T</div>
        <p className="text-sm text-ink/50 dark:text-paper/50">
          Version 2.2.0 • Personal Edition
        </p>
        <p className="text-xs text-ink/30 dark:text-paper/30 mt-2 italic font-headline">
          "Veritas Lux" — Truth is Light
        </p>
      </div>
    </div>
  )
}
