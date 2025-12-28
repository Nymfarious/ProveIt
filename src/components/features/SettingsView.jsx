import { useState } from 'react'
import { Key, Database, Bell, Trash2, Download, Pause, AlertCircle, CheckCircle } from 'lucide-react'

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

  const handleSaveKeys = () => {
    // In a real app, these would be encrypted and stored securely
    // For now, we're using Vite env vars
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
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
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <Database size={18} className="text-copper" />
          Privacy & Analytics
        </h3>
        
        <div className="space-y-5">
          {/* Analytics toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Reading Analytics</p>
              <p className="text-sm text-ink/50 dark:text-paper/50">
                Track your reading patterns and bias distribution
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
            <label className="block text-sm font-medium mb-2">Data Retention</label>
            <select 
              value={privacy.dataRetentionDays}
              onChange={(e) => setPrivacy({ ...privacy, dataRetentionDays: Number(e.target.value) })}
              className="search-input text-sm"
            >
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
              <option value={365}>1 year</option>
            </select>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-ink/10 dark:border-paper/10">
            <button className="btn-ghost text-sm">
              <Pause size={14} />
              Pause Tracking
            </button>
            <button className="btn-ghost text-sm">
              <Download size={14} />
              Export Data
            </button>
            <button className="btn-ghost text-sm text-burgundy hover:bg-burgundy/10">
              <Trash2 size={14} />
              Wipe All Data
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
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="search-input text-sm"
            />
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
          Version 0.1.0 • Personal Edition
        </p>
        <p className="text-xs text-ink/30 dark:text-paper/30 mt-2 italic font-headline">
          "Veritas Lux" — Truth is Light
        </p>
      </div>
    </div>
  )
}
