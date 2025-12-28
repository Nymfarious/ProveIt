import { useState, useEffect } from 'react'
import { Wrench, Play, Copy, RefreshCw, Terminal, Activity, CheckCircle, AlertTriangle, Wifi, WifiOff } from 'lucide-react'

export default function DevToolsView() {
  const [testEndpoint, setTestEndpoint] = useState('/api/check?url=reuters.com')
  const [testResult, setTestResult] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [apiStatus, setApiStatus] = useState({
    gemini: 'checking',
    newsdata: 'checking',
  })

  // Check API connectivity on mount
  useEffect(() => {
    checkAPIs()
  }, [])

  const checkAPIs = async () => {
    // Check if env vars are set (basic check)
    const hasGemini = !!import.meta.env.VITE_GEMINI_API_KEY
    const hasNewsData = !!import.meta.env.VITE_NEWSDATA_KEY

    setApiStatus({
      gemini: hasGemini ? 'connected' : 'missing',
      newsdata: hasNewsData ? 'connected' : 'missing',
    })
  }

  // This is DEMO data - real tracking not implemented yet
  const usage = {
    newsdata: { used: 0, limit: 200, label: 'NewsData.io', real: apiStatus.newsdata === 'connected' },
    gemini: { used: 0, limit: null, label: 'Gemini API', unit: 'k tokens', real: apiStatus.gemini === 'connected' },
    claude: { used: 0, limit: null, label: 'Claude API', unit: 'k tokens', real: false },
    openai: { used: 0, limit: null, label: 'OpenAI API', unit: 'k tokens', real: false },
  }

  const recentCalls = [
    // Will be populated by real usage later
  ]

  const runTest = async () => {
    setIsRunning(true)
    setTestResult(null)
    
    // Actually test the Gemini API
    try {
      const { runAI } = await import('../../lib/gemini')
      const response = await runAI('Respond with exactly: "API connection successful"')
      setTestResult({
        status: 200,
        success: true,
        message: 'Gemini API is working!',
        response: response.substring(0, 100)
      })
    } catch (error) {
      setTestResult({
        status: 500,
        success: false,
        message: 'API test failed',
        error: error.message
      })
    }
    
    setIsRunning(false)
  }

  const copyKey = () => {
    navigator.clipboard.writeText('pk_live_demo_key_xxx')
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-forest'
      case 'missing': return 'text-burgundy'
      default: return 'text-ink/40 dark:text-paper/40'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <Wifi size={14} />
      case 'missing': return <WifiOff size={14} />
      default: return <RefreshCw size={14} className="animate-spin" />
    }
  }

  return (
    <div className="space-y-6">
      {/* API Status Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-headline flex items-center gap-2">
            <Wrench size={18} className="text-copper" />
            ProveIt DevTools
          </h3>
          <button 
            onClick={checkAPIs}
            className="text-sm text-steel hover:text-steel-dark flex items-center gap-1"
          >
            <RefreshCw size={14} />
            Refresh Status
          </button>
        </div>
        
        {/* API Connection Status */}
        <div className="space-y-2">
          <p className="text-xs font-mono text-ink/50 dark:text-paper/50 uppercase tracking-wider mb-2">
            API Connections
          </p>
          
          <div className="grid gap-2">
            {Object.entries(apiStatus).map(([key, status]) => (
              <div 
                key={key}
                className="flex items-center justify-between p-3 rounded-lg bg-ink/5 dark:bg-paper/5"
              >
                <span className="font-medium capitalize">{key}</span>
                <span className={`flex items-center gap-1 text-sm ${getStatusColor(status)}`}>
                  {getStatusIcon(status)}
                  {status === 'connected' ? 'Connected' : status === 'missing' ? 'API Key Missing' : 'Checking...'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Test - REAL */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <Terminal size={18} className="text-copper" />
          Test API Connection
        </h3>
        
        <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">
          Click "Test" to verify your Gemini API key is working correctly.
        </p>

        <button 
          onClick={runTest}
          disabled={isRunning || apiStatus.gemini !== 'connected'}
          className="btn-primary w-full"
        >
          {isRunning ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Play size={16} />
              Test Gemini API
            </>
          )}
        </button>

        {testResult && (
          <div className={`mt-4 p-4 rounded-lg ${
            testResult.success 
              ? 'bg-forest/10 border border-forest/20' 
              : 'bg-burgundy/10 border border-burgundy/20'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {testResult.success ? (
                <CheckCircle size={18} className="text-forest" />
              ) : (
                <AlertTriangle size={18} className="text-burgundy" />
              )}
              <span className={`font-medium ${testResult.success ? 'text-forest' : 'text-burgundy'}`}>
                {testResult.message}
              </span>
            </div>
            {testResult.response && (
              <p className="text-sm text-ink/60 dark:text-paper/60 font-mono">
                Response: "{testResult.response}"
              </p>
            )}
            {testResult.error && (
              <p className="text-sm text-burgundy font-mono">
                Error: {testResult.error}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Usage Stats - DEMO */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-headline flex items-center gap-2">
            <Activity size={18} className="text-copper" />
            API Usage
          </h3>
          <span className="text-xs bg-copper/20 text-copper px-2 py-1 rounded-full">
            Demo Data
          </span>
        </div>

        <div className="p-3 rounded-lg bg-steel/10 border border-steel/20 mb-4">
          <p className="text-sm text-steel">
            <AlertTriangle size={14} className="inline mr-1" />
            Usage tracking not yet implemented. These are placeholder values.
            Real tracking coming in a future update.
          </p>
        </div>
        
        <div className="space-y-4">
          {Object.entries(usage).map(([key, data]) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-2">
                  {data.label}
                  {data.real && (
                    <span className="text-xs text-forest">● API Ready</span>
                  )}
                </span>
                <span className="font-mono text-ink/60 dark:text-paper/60">
                  {data.used}{data.unit || ''} {data.limit ? `/ ${data.limit}` : ''}
                </span>
              </div>
              <div className="h-2 bg-ink/10 dark:bg-paper/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-copper rounded-full transition-all duration-500"
                  style={{ width: data.limit ? `${(data.used / data.limit) * 100}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Endpoints Reference */}
      <div className="card">
        <h3 className="card-headline mb-4">Personal API Endpoints (Planned)</h3>
        
        <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">
          These endpoints will be available when you run the ProveIt API server locally.
        </p>
        
        <div className="space-y-2 font-mono text-sm">
          {[
            { method: 'GET', path: '/api/check', desc: 'Check URL bias' },
            { method: 'GET', path: '/api/search', desc: 'Search news' },
            { method: 'POST', path: '/api/summarize', desc: 'AI summary' },
            { method: 'GET', path: '/api/fringe', desc: 'Fringe watch' },
            { method: 'GET', path: '/api/stats', desc: 'User stats' },
          ].map((endpoint) => (
            <div key={endpoint.path} className="flex items-center gap-3 opacity-60">
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                endpoint.method === 'GET' 
                  ? 'bg-steel/20 text-steel' 
                  : 'bg-copper/20 text-copper'
              }`}>
                {endpoint.method}
              </span>
              <span>{endpoint.path}</span>
              <span className="text-ink/40 dark:text-paper/40">— {endpoint.desc}</span>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-ink/40 dark:text-paper/40 mt-4 text-center">
          Personal API server coming in v3.0
        </p>
      </div>
    </div>
  )
}
