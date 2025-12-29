import { useState } from 'react'
import { Wrench, Key, Activity, CheckCircle, XCircle, Loader2, AlertCircle, Info, Zap, Unlock } from 'lucide-react'

export default function DevToolsView({ isUnlimitedUser, setIsUnlimitedUser }) {
  const [apiKeys, setApiKeys] = useState({ newsdata: '', gemini: '', claude: '', openai: '' })
  const [testResults, setTestResults] = useState({})
  const [testing, setTesting] = useState({})
  const [devModeEnabled, setDevModeEnabled] = useState(() => {
    return localStorage.getItem('proveit-dev-mode') === 'true'
  })

  const apis = [
    { key: 'newsdata', label: 'NewsData.io', envVar: 'VITE_NEWSDATA_KEY', powers: 'Live news feed and headlines', status: 'active' },
    { key: 'gemini', label: 'Google Gemini', envVar: 'VITE_GEMINI_API_KEY', powers: 'Fact-checking AI analysis', status: 'active' },
    { key: 'claude', label: 'Anthropic Claude', envVar: 'VITE_CLAUDE_API_KEY', powers: 'Alternative AI (planned)', status: 'planned' },
    { key: 'openai', label: 'OpenAI', envVar: 'VITE_OPENAI_API_KEY', powers: 'Alternative AI (planned)', status: 'planned' },
  ]

  const testApi = async (apiKey) => {
    setTesting(prev => ({ ...prev, [apiKey]: true }))
    await new Promise(resolve => setTimeout(resolve, 1500))
    const hasKey = apiKeys[apiKey] || import.meta.env[`VITE_${apiKey.toUpperCase()}_KEY`] || 
                   import.meta.env[`VITE_${apiKey.toUpperCase()}_API_KEY`]
    setTestResults(prev => ({ ...prev, [apiKey]: hasKey ? 'success' : 'missing' }))
    setTesting(prev => ({ ...prev, [apiKey]: false }))
  }

  const getStatusIcon = (apiKey) => {
    if (testing[apiKey]) return <Loader2 size={14} className="animate-spin text-copper" />
    if (testResults[apiKey] === 'success') return <CheckCircle size={14} className="text-forest" />
    if (testResults[apiKey] === 'missing') return <XCircle size={14} className="text-burgundy" />
    return null
  }

  const toggleDevMode = () => {
    const newValue = !devModeEnabled
    setDevModeEnabled(newValue)
    localStorage.setItem('proveit-dev-mode', newValue.toString())
    if (setIsUnlimitedUser) setIsUnlimitedUser(newValue)
  }

  const saveUserApiKey = (apiKey, value) => {
    setApiKeys(prev => ({ ...prev, [apiKey]: value }))
    // Save to localStorage for persistence
    localStorage.setItem(`proveit-user-${apiKey}-key`, value)
    // If user adds their own Gemini key, unlock unlimited access
    if (apiKey === 'gemini' && value.trim()) {
      localStorage.setItem('proveit-dev-mode', 'true')
      setDevModeEnabled(true)
      if (setIsUnlimitedUser) setIsUnlimitedUser(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-copper/10">
            <Wrench size={24} className="text-copper" />
          </div>
          <div>
            <h2 className="font-headline text-xl font-semibold">Developer Tools</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              API configuration and advanced settings
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-ink/40 dark:text-paper/40">
          Shortcut: <code className="bg-ink/10 dark:bg-paper/10 px-1.5 py-0.5 rounded">CTRL+ALT+V</code>
        </p>
      </div>

      {/* Unlock Unlimited */}
      <div className="card border-copper/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Unlock size={20} className={devModeEnabled ? 'text-forest' : 'text-copper'} />
            <div>
              <h3 className="font-semibold">Unlimited Access</h3>
              <p className="text-xs text-ink/50 dark:text-paper/50">
                {devModeEnabled 
                  ? 'Unlimited fact-checks enabled' 
                  : 'Add your own API key or enable Dev Mode for unlimited fact-checks'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleDevMode}
            className={`toggle ${devModeEnabled ? 'active' : ''}`}
          >
            <span className="toggle-knob" />
          </button>
        </div>
        
        {devModeEnabled && (
          <div className="mt-3 p-2 rounded bg-forest/10 text-xs text-forest">
            ✓ Developer mode active - no daily limits
          </div>
        )}
      </div>

      {/* API Configuration */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <Key size={18} className="text-copper" />
          API Configuration
        </h3>
        
        <div className="p-3 rounded-lg bg-steel/10 border border-steel/20 mb-4">
          <div className="flex items-start gap-2">
            <Info size={14} className="text-steel mt-0.5 flex-shrink-0" />
            <div className="text-xs text-ink/60 dark:text-paper/60">
              <p className="mb-1"><strong>For developers:</strong> Set keys in your <code className="bg-steel/20 px-1 rounded">.env</code> file.</p>
              <p><strong>For users:</strong> Add your own Gemini API key below for unlimited fact-checks.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {apis.map((api) => (
            <div key={api.key} className={`p-4 rounded-lg border ${
              api.status === 'planned' ? 'bg-ink/5 dark:bg-paper/5 border-ink/10 opacity-60' 
              : 'bg-paper dark:bg-ink border-ink/20 dark:border-paper/20'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{api.label}</span>
                    {api.status === 'planned' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-steel/20 text-steel">PLANNED</span>
                    )}
                    {getStatusIcon(api.key)}
                  </div>
                  <p className="text-xs text-ink/50 dark:text-paper/50 mt-1">
                    <Zap size={10} className="inline mr-1" />
                    {api.powers}
                  </p>
                </div>
                
                {api.status === 'active' && (
                  <button onClick={() => testApi(api.key)} disabled={testing[api.key]}
                    className="text-xs px-2 py-1 rounded border border-ink/20 dark:border-paper/20 
                             hover:bg-ink/5 dark:hover:bg-paper/5 disabled:opacity-50">
                    {testing[api.key] ? 'Testing...' : 'Test'}
                  </button>
                )}
              </div>
              
              {api.status === 'active' && (
                <input
                  type="password"
                  value={apiKeys[api.key]}
                  onChange={(e) => saveUserApiKey(api.key, e.target.value)}
                  placeholder={`Your ${api.label} API key (optional)`}
                  className="w-full px-3 py-2 text-sm rounded border border-ink/20 dark:border-paper/20 
                           bg-paper dark:bg-ink text-ink dark:text-paper
                           placeholder:text-ink/30 dark:placeholder:text-paper/30
                           focus:outline-none focus:ring-1 focus:ring-copper/50"
                />
              )}
              
              {testResults[api.key] === 'missing' && (
                <p className="text-xs text-burgundy mt-2">⚠ No API key found.</p>
              )}
              {testResults[api.key] === 'success' && (
                <p className="text-xs text-forest mt-2">✓ API key detected.</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <Activity size={18} className="text-copper" />
          System Status
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-forest/10 border border-forest/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-forest animate-pulse" />
              <span className="text-sm text-forest font-medium">App Online</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 border border-ink/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-steel" />
              <span className="text-sm text-ink/60 dark:text-paper/60">LocalStorage OK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Actions */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <AlertCircle size={18} className="text-burgundy" />
          Debug Actions
        </h3>
        
        <div className="space-y-2">
          <button onClick={() => { localStorage.clear(); location.reload() }}
            className="w-full p-3 text-left rounded-lg border border-burgundy/30 text-burgundy hover:bg-burgundy/5">
            <span className="font-medium">Clear All Local Data</span>
            <p className="text-xs opacity-70 mt-1">Removes all stored preferences. App will reload.</p>
          </button>
          
          <button onClick={() => console.log('Debug:', { apis: apiKeys, storage: localStorage })}
            className="w-full p-3 text-left rounded-lg border border-ink/20 dark:border-paper/20 hover:bg-ink/5 dark:hover:bg-paper/5">
            <span className="font-medium">Log Debug Info</span>
            <p className="text-xs text-ink/50 mt-1">Outputs debug info to browser console.</p>
          </button>
        </div>
      </div>

      {/* Version */}
      <div className="text-center text-xs text-ink/40 dark:text-paper/40 space-y-1">
        <p>ProveIt v3.0.0 • Development Build</p>
      </div>
    </div>
  )
}
