import { useState } from 'react'
import { Database, Bell, Trash2, Download, Shield, Info, X, FileText, Upload, Printer, HelpCircle, Calendar, Mail } from 'lucide-react'

// NOTE: API Keys section MOVED to DevTools

export default function SettingsView() {
  const [privacy, setPrivacy] = useState({ analyticsEnabled: true, dataRetentionDays: 30, autoSnapshot: false })
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showRetentionInfo, setShowRetentionInfo] = useState(false)
  const [clearPeriod, setClearPeriod] = useState(null)
  const [activeTab, setActiveTab] = useState('privacy')

  const handleClearData = (period) => { setClearPeriod(period); setShowClearConfirm(true) }
  const confirmClear = () => { console.log(`Clearing: ${clearPeriod}`); setShowClearConfirm(false); setClearPeriod(null) }

  const dataSummary = { articlesRead: 156, sourcesTracked: 24, oldestEntry: '2024-12-01', storageUsed: '2.4 MB' }
  
  // REMOVED API tab - now only 3 tabs
  const tabs = [
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'mydata', label: 'My Data', icon: Database },
    { id: 'email', label: 'Email', icon: Mail },
  ]

  return (
    <div className="space-y-6">
      {/* Privacy Info Modal */}
      {showPrivacyInfo && (
        <div className="fixed inset-0 bg-ink/50 dark:bg-ink/70 flex items-center justify-center z-50 p-4">
          <div className="bg-paper dark:bg-ink-light rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2"><Shield className="text-forest" size={24} /><h3 className="font-headline text-xl font-semibold">Your Privacy Matters</h3></div>
              <button onClick={() => setShowPrivacyInfo(false)} className="p-1 hover:bg-ink/10 dark:hover:bg-paper/10 rounded"><X size={20} /></button>
            </div>
            <div className="space-y-4 text-sm text-ink/70 dark:text-paper/70">
              <p><strong className="text-ink dark:text-paper">ProveIt does NOT track you.</strong> We don't collect or transmit any personal data.</p>
              <div className="p-3 bg-forest/10 rounded-lg border border-forest/20">
                <p className="text-forest font-medium mb-2">What stays on YOUR device:</p>
                <ul className="space-y-1 text-forest/80"><li>• Reading history & statistics</li><li>• Personal preferences</li><li>• Ignored source settings</li><li>• All analytics data</li></ul>
              </div>
              <p><strong className="text-ink dark:text-paper">You own your data.</strong> Clear it anytime. No questions asked.</p>
            </div>
            <button onClick={() => setShowPrivacyInfo(false)} className="btn-primary w-full mt-6">Got It</button>
          </div>
        </div>
      )}

      {/* Data Retention Info Modal */}
      {showRetentionInfo && (
        <div className="fixed inset-0 bg-ink/50 dark:bg-ink/70 flex items-center justify-center z-50 p-4">
          <div className="bg-paper dark:bg-ink-light rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2"><Calendar className="text-copper" size={24} /><h3 className="font-headline text-xl font-semibold">Rolling Data Window</h3></div>
              <button onClick={() => setShowRetentionInfo(false)} className="p-1 hover:bg-ink/10 dark:hover:bg-paper/10 rounded"><X size={20} /></button>
            </div>
            <div className="space-y-4 text-sm text-ink/70 dark:text-paper/70">
              <div className="p-3 bg-steel/10 rounded-lg border border-steel/20">
                <p className="mb-2">Data older than your retention period (default 30 days) is automatically deleted to save storage space.</p>
              </div>
              <p><strong className="text-ink dark:text-paper">Want to keep historical data?</strong></p>
              <p>Use <strong>Export</strong> to download your data before it expires for WoW, MoM, or QoQ analysis.</p>
            </div>
            <button onClick={() => setShowRetentionInfo(false)} className="btn-primary w-full mt-6">Got It</button>
          </div>
        </div>
      )}

      {/* Clear Data Confirmation */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-ink/50 dark:bg-ink/70 flex items-center justify-center z-50 p-4">
          <div className="bg-paper dark:bg-ink-light rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-burgundy"><Trash2 size={24} /><h3 className="font-headline text-xl font-semibold">Clear Data?</h3></div>
            <p className="text-ink/70 dark:text-paper/70 mb-6">This will permanently delete your reading history{clearPeriod === 'all' ? '' : ` from the last ${clearPeriod}`}. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowClearConfirm(false)} className="btn-ghost flex-1">Cancel</button>
              <button onClick={confirmClear} className="btn-primary flex-1 bg-burgundy hover:bg-burgundy-dark">Clear Data</button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-ink/5 dark:bg-paper/5 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-paper dark:bg-ink shadow-sm text-ink dark:text-paper' : 'text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper'}`}>
              <Icon size={16} /><span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Privacy Tab */}
      {activeTab === 'privacy' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-headline flex items-center gap-2"><Shield size={18} className="text-copper" />Privacy & Analytics</h3>
            <button onClick={() => setShowPrivacyInfo(true)} className="text-sm text-steel hover:text-steel-dark flex items-center gap-1"><Info size={14} />Learn more</button>
          </div>
          <div className="p-3 rounded-lg bg-forest/10 border border-forest/20 mb-6">
            <div className="flex items-start gap-2"><Shield size={16} className="text-forest mt-0.5 flex-shrink-0" /><p className="text-sm text-forest"><strong>Your data stays on YOUR device.</strong> ProveIt doesn't track you.</p></div>
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div><p className="font-medium">Reading Analytics</p><p className="text-sm text-ink/50 dark:text-paper/50">Track your reading patterns locally</p></div>
              <button onClick={() => setPrivacy({ ...privacy, analyticsEnabled: !privacy.analyticsEnabled })} className={`toggle ${privacy.analyticsEnabled ? 'active' : ''}`}><span className="toggle-knob" /></button>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium">Data Retention (Rolling Window)</label>
                <button onClick={() => setShowRetentionInfo(true)} className="text-ink/40 dark:text-paper/40 hover:text-copper"><HelpCircle size={14} /></button>
              </div>
              <select value={privacy.dataRetentionDays} onChange={(e) => setPrivacy({ ...privacy, dataRetentionDays: Number(e.target.value) })} className="search-input text-sm">
                <option value={7}>7 days</option><option value={14}>14 days</option><option value={30}>30 days (default)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium">Auto Weekly Snapshot</p><p className="text-sm text-ink/50 dark:text-paper/50">Save weekly reports for comparison</p></div>
              <button onClick={() => setPrivacy({ ...privacy, autoSnapshot: !privacy.autoSnapshot })} className={`toggle ${privacy.autoSnapshot ? 'active' : ''}`}><span className="toggle-knob" /></button>
            </div>
          </div>
        </div>
      )}

      {/* My Data Tab */}
      {activeTab === 'mydata' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4"><Database size={18} className="text-copper" />Current Data Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5"><p className="text-2xl font-bold text-copper">{dataSummary.articlesRead}</p><p className="text-xs text-ink/50 dark:text-paper/50">Articles Read</p></div>
              <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5"><p className="text-2xl font-bold text-steel">{dataSummary.sourcesTracked}</p><p className="text-xs text-ink/50 dark:text-paper/50">Sources Tracked</p></div>
              <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5"><p className="text-sm font-medium">{dataSummary.oldestEntry}</p><p className="text-xs text-ink/50 dark:text-paper/50">Oldest Entry</p></div>
              <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5"><p className="text-sm font-medium">{dataSummary.storageUsed}</p><p className="text-xs text-ink/50 dark:text-paper/50">Storage Used</p></div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4"><FileText size={18} className="text-copper" />Export Your Data</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-copper/10 hover:bg-copper/20 transition-colors text-left">
                <FileText size={18} className="text-copper" /><div className="flex-1"><span className="font-medium text-copper">View & Download Report</span><p className="text-xs text-ink/50 dark:text-paper/50">Opens styled report in browser</p></div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors text-left">
                <Printer size={18} className="text-ink/40 dark:text-paper/40" /><div className="flex-1"><span className="font-medium">Print to PDF / Printer</span></div>
              </button>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-ink/5 dark:hover:bg-paper/5"><Download size={16} className="text-ink/40 dark:text-paper/40" /><span className="text-sm">Export JSON</span></button>
                <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-ink/5 dark:hover:bg-paper/5"><Upload size={16} className="text-ink/40 dark:text-paper/40" /><span className="text-sm">Import Data</span></button>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4"><Trash2 size={18} className="text-burgundy" />Clear Tracking Data</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['12 hours', '1 day', '1 week', '1 month'].map((option) => (
                <button key={option} onClick={() => handleClearData(option)} className="px-3 py-2 text-sm rounded-lg border border-burgundy/30 text-burgundy hover:bg-burgundy/10">{option}</button>
              ))}
            </div>
            <button onClick={() => handleClearData('all')} className="w-full mt-2 px-3 py-2 text-sm rounded-lg bg-burgundy/10 border border-burgundy/30 text-burgundy hover:bg-burgundy/20 font-medium">Clear All Data</button>
          </div>
        </div>
      )}

      {/* Email Tab */}
      {activeTab === 'email' && (
        <div className="card">
          <h3 className="card-headline flex items-center gap-2 mb-4"><Mail size={18} className="text-copper" />Email Reports</h3>
          <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 border border-ink/10 dark:border-paper/10 mb-4"><p className="text-sm text-ink/60 dark:text-paper/60"><Info size={14} className="inline mr-1" />Email reports send a summary directly to you. Your email is never shared.</p></div>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium mb-1">Primary Email</label><input type="email" placeholder="your@email.com" className="search-input text-sm" /></div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Report Frequency</p>
              {['Never', 'Daily Summary', 'Weekly Digest'].map((option, i) => (<label key={option} className="flex items-center gap-2 cursor-pointer"><input type="radio" name="frequency" defaultChecked={i === 0} className="accent-copper" /><span className="text-sm">{option}</span></label>))}
            </div>
            <button className="btn-secondary w-full">Verify Email & Save</button>
          </div>
        </div>
      )}

      {/* About - WITH PROPER FLOURISH */}
      <div className="card text-center">
        <div className="flex items-center justify-center gap-2 mb-3 text-copper/50">
          <span className="text-sm">❧</span>
          <div className="w-12 h-px bg-current" />
          <span className="text-sm">✦</span>
          <div className="w-12 h-px bg-current" />
          <span className="text-sm">☙</span>
        </div>
        
        <div className="font-masthead text-2xl tracking-widest mb-1">P R O V E I T</div>
        <p className="text-sm text-ink/50 dark:text-paper/50">Version 2.4.1 • Personal Edition</p>
        
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="w-8 h-px bg-ink/20 dark:bg-paper/20" />
          <p className="text-xs text-ink/30 dark:text-paper/30 italic font-headline">"Veritas Lux" — Truth is Light</p>
          <div className="w-8 h-px bg-ink/20 dark:bg-paper/20" />
        </div>
        
        <div className="flex items-center justify-center gap-2 mt-3 text-ink/15 dark:text-paper/15">
          <span className="text-xs">❧</span>
          <span className="text-xs">☙</span>
        </div>
      </div>
    </div>
  )
}
