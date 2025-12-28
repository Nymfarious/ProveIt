import { useState } from 'react'
import { Wrench, Play, Copy, RefreshCw, Terminal, Activity, CheckCircle } from 'lucide-react'

export default function DevToolsView() {
  const [testEndpoint, setTestEndpoint] = useState('/api/check?url=reuters.com')
  const [testResult, setTestResult] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)

  const usage = {
    newsdata: { used: 84, limit: 200, label: 'NewsData.io' },
    gemini: { used: 2.1, limit: null, label: 'Gemini API', unit: 'k tokens' },
    claude: { used: 0, limit: null, label: 'Claude API', unit: 'k tokens' },
    openai: { used: 0, limit: null, label: 'OpenAI API', unit: 'k tokens' },
  }

  const recentCalls = [
    { time: '10:32:15', method: 'GET', path: '/api/search?q=fed+rates', status: 200, duration: '142ms' },
    { time: '10:31:02', method: 'GET', path: '/api/check?url=reuters.com', status: 200, duration: '48ms' },
    { time: '10:28:44', method: 'POST', path: '/api/summarize', status: 200, duration: '2.1s' },
    { time: '10:25:11', method: 'GET', path: '/api/fringe?side=right', status: 200, duration: '890ms' },
  ]

  const runTest = () => {
    setIsRunning(true)
    setTimeout(() => {
      setTestResult({
        status: 200,
        data: { source: 'reuters.com', bias: 'center', factuality: 'high', name: 'Reuters' }
      })
      setIsRunning(false)
    }, 500)
  }

  const copyKey = () => {
    navigator.clipboard.writeText('pk_live_demo_key_xxx')
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-headline flex items-center gap-2">
            <Wrench size={18} className="text-copper" />
            ProveIt DevTools
          </h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            <span className="text-sm text-forest font-mono">READY</span>
          </div>
        </div>
        
        <div className="bg-ink/5 dark:bg-paper/5 rounded-lg p-3 font-mono text-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-ink/60 dark:text-paper/60">API Status:</span>
            <span className="text-forest">● localhost:3001</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink/60 dark:text-paper/60">Your Key:</span>
            <div className="flex items-center gap-2">
              <span>pk_live_xxx...xxx</span>
              <button 
                onClick={copyKey}
                className="p-1 hover:bg-ink/10 dark:hover:bg-paper/10 rounded transition-colors"
              >
                {copied ? <CheckCircle size={14} className="text-forest" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <Activity size={18} className="text-copper" />
          Today's Usage
        </h3>
        
        <div className="space-y-4">
          {Object.entries(usage).map(([key, data]) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span>{data.label}</span>
                <span className="font-mono text-ink/60 dark:text-paper/60">
                  {data.used}{data.unit || ''} {data.limit ? `/ ${data.limit}` : ''}
                </span>
              </div>
              <div className="h-2 bg-ink/10 dark:bg-paper/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-copper rounded-full transition-all duration-500"
                  style={{ width: data.limit ? `${(data.used / data.limit) * 100}%` : `${Math.min(data.used * 10, 30)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Test */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <Terminal size={18} className="text-copper" />
          Quick Test
        </h3>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={testEndpoint}
              onChange={(e) => setTestEndpoint(e.target.value)}
              className="search-input text-sm font-mono flex-1"
              placeholder="/api/check?url=example.com"
            />
            <button 
              onClick={runTest}
              disabled={isRunning}
              className="btn-primary px-4"
            >
              {isRunning ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
            </button>
          </div>

          {testResult && (
            <pre className="bg-ink dark:bg-ink-light text-paper text-xs p-3 rounded-lg overflow-x-auto font-mono">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          )}
        </div>
      </div>

      {/* Recent Calls */}
      <div className="card">
        <h3 className="card-headline mb-4">Recent API Calls</h3>
        
        <div className="space-y-2 font-mono text-xs overflow-x-auto">
          {recentCalls.map((call, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-2 bg-ink/5 dark:bg-paper/5 rounded min-w-max"
            >
              <span className="text-ink/40 dark:text-paper/40 w-16">{call.time}</span>
              <span className={`font-semibold w-12 ${
                call.method === 'GET' ? 'text-steel' : 'text-copper'
              }`}>
                {call.method}
              </span>
              <span className="flex-1">{call.path}</span>
              <span className={call.status === 200 ? 'text-forest' : 'text-burgundy'}>
                {call.status}
              </span>
              <span className="text-ink/40 dark:text-paper/40 w-16 text-right">
                {call.duration}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Endpoints */}
      <div className="card">
        <h3 className="card-headline mb-4">API Endpoints</h3>
        
        <div className="space-y-2 font-mono text-sm">
          {[
            { method: 'GET', path: '/api/check', desc: 'Check URL bias' },
            { method: 'GET', path: '/api/search', desc: 'Search news' },
            { method: 'POST', path: '/api/summarize', desc: 'AI summary' },
            { method: 'GET', path: '/api/fringe', desc: 'Fringe watch' },
            { method: 'GET', path: '/api/stats', desc: 'User stats' },
          ].map((endpoint) => (
            <div key={endpoint.path} className="flex items-center gap-3">
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
      </div>
    </div>
  )
}
