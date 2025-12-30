import { useState } from 'react'
import { Scale, Calendar, AlertTriangle, Clock, ExternalLink, FileText, Gavel, Users, ChevronDown, ChevronUp, Info, Newspaper, X, TrendingUp, MessageSquare } from 'lucide-react'

const currentDocket = [
  {
    id: '23-726',
    name: 'Trump v. United States',
    issue: 'Presidential immunity from criminal prosecution',
    argued: '2024-04-25',
    status: 'Decided',
    decision: '6-3',
    summary: 'Presidents have absolute immunity for core constitutional powers, presumptive immunity for official acts.',
    povs: {
      farLeft: 'Dangerous expansion of executive power that puts presidents above the law. Sets precedent for authoritarian abuse.',
      left: 'Overly broad immunity risks accountability. Narrow ruling would have been more appropriate.',
      center: 'Clarifies long-standing questions about presidential powers, though implementation remains unclear.',
      right: 'Necessary protection for executive function. Presidents must be able to act without fear of prosecution.',
      farRight: 'Victory against political persecution. Essential to protect the office from weaponized DOJ.',
    },
  },
  {
    id: '22-842',
    name: 'Loper Bright Enterprises v. Raimondo',
    issue: 'Chevron deference to agency interpretations',
    argued: '2024-01-17',
    status: 'Decided',
    decision: '6-3',
    summary: 'Overruled Chevron, courts must exercise independent judgment on agency interpretations.',
    povs: {
      farLeft: 'Corporate attack on regulatory state. Will gut environmental, labor, and consumer protections.',
      left: 'Undermines expert agencies. Courts lack technical expertise to interpret complex regulations.',
      center: 'Restores judicial role in statutory interpretation. Impact depends on how courts apply it.',
      right: 'Checks administrative overreach. Agencies shouldn\'t make major policy without Congressional authorization.',
      farRight: 'Historic victory against the deep state. Returns power to elected representatives.',
    },
  },
  {
    id: '23-719',
    name: 'Moyle v. United States',
    issue: 'EMTALA and state abortion restrictions',
    argued: '2024-04-24',
    status: 'Decided',
    decision: 'DIG',
    summary: 'Dismissed as improvidently granted; case returns to lower courts.',
    povs: {
      farLeft: 'Court avoiding responsibility. Women\'s lives are at stake and they punted.',
      left: 'Disappointing lack of clarity. Emergency rooms need clear guidance.',
      center: 'Procedurally appropriate given case complexity. Issue will return.',
      right: 'Correct decision to let lower courts develop the record further.',
      farRight: 'State sovereignty preserved. Federal overreach blocked.',
    },
  },
]

const shadowDocket = [
  { id: 'A-234', date: '2024-12-15', type: 'Emergency Stay', issue: 'Immigration enforcement', outcome: 'Granted', vote: '5-4' },
  { id: 'A-198', date: '2024-11-28', type: 'Application', issue: 'Execution stay request', outcome: 'Denied', vote: '6-3' },
  { id: 'A-156', date: '2024-11-10', type: 'Emergency Stay', issue: 'Environmental regulation', outcome: 'Granted', vote: 'Unsigned' },
]

const justices = [
  { name: 'John Roberts', position: 'Chief Justice', appointed: '2005', appointedBy: 'G.W. Bush', wiki: 'https://en.wikipedia.org/wiki/John_Roberts', portrait: 'https://www.supremecourt.gov/about/images/JGRoberts.jpg', initials: 'JR', biasScore: 0.8, biasLabel: 'Conservative', agreementRate: 87 },
  { name: 'Clarence Thomas', position: 'Associate Justice', appointed: '1991', appointedBy: 'G.H.W. Bush', wiki: 'https://en.wikipedia.org/wiki/Clarence_Thomas', portrait: 'https://www.supremecourt.gov/about/images/CThomas.jpg', initials: 'CT', biasScore: 1.9, biasLabel: 'Very Conservative', agreementRate: 82 },
  { name: 'Samuel Alito', position: 'Associate Justice', appointed: '2006', appointedBy: 'G.W. Bush', wiki: 'https://en.wikipedia.org/wiki/Samuel_Alito', portrait: 'https://www.supremecourt.gov/about/images/SAlito.jpg', initials: 'SA', biasScore: 1.7, biasLabel: 'Very Conservative', agreementRate: 85 },
  { name: 'Sonia Sotomayor', position: 'Associate Justice', appointed: '2009', appointedBy: 'Obama', wiki: 'https://en.wikipedia.org/wiki/Sonia_Sotomayor', portrait: 'https://www.supremecourt.gov/about/images/SSotomayor.jpg', initials: 'SS', biasScore: -1.8, biasLabel: 'Very Liberal', agreementRate: 91 },
  { name: 'Elena Kagan', position: 'Associate Justice', appointed: '2010', appointedBy: 'Obama', wiki: 'https://en.wikipedia.org/wiki/Elena_Kagan', portrait: 'https://www.supremecourt.gov/about/images/EKagan.jpg', initials: 'EK', biasScore: -1.5, biasLabel: 'Liberal', agreementRate: 89 },
  { name: 'Neil Gorsuch', position: 'Associate Justice', appointed: '2017', appointedBy: 'Trump', wiki: 'https://en.wikipedia.org/wiki/Neil_Gorsuch', portrait: 'https://www.supremecourt.gov/about/images/NGorsuch.jpg', initials: 'NG', biasScore: 1.4, biasLabel: 'Conservative', agreementRate: 84 },
  { name: 'Brett Kavanaugh', position: 'Associate Justice', appointed: '2018', appointedBy: 'Trump', wiki: 'https://en.wikipedia.org/wiki/Brett_Kavanaugh', portrait: 'https://www.supremecourt.gov/about/images/BKavanaugh.jpg', initials: 'BK', biasScore: 1.1, biasLabel: 'Conservative', agreementRate: 88 },
  { name: 'Amy Coney Barrett', position: 'Associate Justice', appointed: '2020', appointedBy: 'Trump', wiki: 'https://en.wikipedia.org/wiki/Amy_Coney_Barrett', portrait: 'https://www.supremecourt.gov/about/images/ABarrett.jpg', initials: 'AB', biasScore: 1.5, biasLabel: 'Conservative', agreementRate: 86 },
  { name: 'Ketanji Brown Jackson', position: 'Associate Justice', appointed: '2022', appointedBy: 'Biden', wiki: 'https://en.wikipedia.org/wiki/Ketanji_Brown_Jackson', portrait: 'https://www.supremecourt.gov/about/images/KJackson.jpg', initials: 'KJ', biasScore: -1.6, biasLabel: 'Liberal', agreementRate: 90 },
]

const scotusNews = [
  { id: 1, title: 'Supreme Court to hear major immigration case in January', source: 'SCOTUSblog', sourceBias: 0, date: '2024-12-28', url: '#' },
  { id: 2, title: 'Analysis: What the immunity ruling means for future presidents', source: 'Reuters', sourceBias: 0, date: '2024-12-27', url: '#' },
  { id: 3, title: 'Court denies emergency stay in death penalty case', source: 'AP News', sourceBias: 0, date: '2024-12-26', url: '#' },
]

export default function SupremeCourtView() {
  const [activeTab, setActiveTab] = useState('docket')
  const [expandedCase, setExpandedCase] = useState(null)
  const [showShadowInfo, setShowShadowInfo] = useState(false)
  const [showNewsPanel, setShowNewsPanel] = useState(false)
  const [newsFilter, setNewsFilter] = useState('3days')
  const [imgErrors, setImgErrors] = useState({})
  const [showPovFor, setShowPovFor] = useState(null)
  const [showBiasInfo, setShowBiasInfo] = useState(false)

  const tabs = [
    { id: 'docket', label: 'Current Docket', icon: FileText },
    { id: 'shadow', label: 'Shadow Docket', icon: AlertTriangle },
    { id: 'justices', label: 'The Court', icon: Users },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Decided': return 'text-forest bg-forest/10'
      case 'Pending': return 'text-copper bg-copper/10'
      default: return 'text-ink/50 bg-ink/10'
    }
  }

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'Granted': return 'text-forest'
      case 'Denied': return 'text-burgundy'
      default: return 'text-steel'
    }
  }

  const handleImageError = (name) => setImgErrors(prev => ({ ...prev, [name]: true }))

  const filterNewsByDays = (days) => {
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - days)
    return scotusNews.filter(n => new Date(n.date) >= cutoff)
  }

  const renderBiasMeter = (score) => {
    const position = ((score + 2) / 4) * 100
    return (
      <div className="relative h-2 w-24 rounded-full bg-gradient-to-r from-blue-600 via-slate-400 to-red-600">
        <div 
          className="absolute top-1/2 w-3 h-3 bg-white border-2 border-ink dark:border-paper rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow"
          style={{ left: `${position}%` }}
        />
      </div>
    )
  }

  const povColors = {
    farLeft: { bg: 'bg-blue-900/20', border: 'border-blue-900/30', text: 'text-blue-300', label: 'Far Left' },
    left: { bg: 'bg-blue-600/20', border: 'border-blue-600/30', text: 'text-blue-400', label: 'Left' },
    center: { bg: 'bg-slate-500/20', border: 'border-slate-500/30', text: 'text-slate-400', label: 'Center' },
    right: { bg: 'bg-red-600/20', border: 'border-red-600/30', text: 'text-red-400', label: 'Right' },
    farRight: { bg: 'bg-red-900/20', border: 'border-red-900/30', text: 'text-red-300', label: 'Far Right' },
  }

  return (
    <div className="space-y-6">
      {/* Header with News Button */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-copper/10">
              <Scale size={24} className="text-copper" />
            </div>
            <div>
              <h2 className="font-headline text-xl font-semibold">U.S. Supreme Court</h2>
              <p className="text-sm text-ink/60 dark:text-paper/60">
                October Term 2024 • Cases, rulings, and perspectives
              </p>
            </div>
          </div>
          
          <button onClick={() => setShowNewsPanel(!showNewsPanel)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              showNewsPanel ? 'bg-copper text-white' : 'bg-ink/5 dark:bg-paper/5 hover:bg-ink/10 dark:hover:bg-paper/10'
            }`}>
            <Newspaper size={18} />
            <span className="hidden sm:inline text-sm">News</span>
          </button>
        </div>
      </div>

      {/* News Panel - FIXED DROPDOWN STYLING */}
      {showNewsPanel && (
        <div className="card border-copper/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-headline flex items-center gap-2">
              <Newspaper size={18} className="text-copper" />
              SCOTUS News
            </h3>
            <div className="flex items-center gap-2">
              {/* FIXED: Custom dropdown with proper dark mode styling */}
              <div className="relative">
                <select 
                  value={newsFilter} 
                  onChange={(e) => setNewsFilter(e.target.value)}
                  className="appearance-none text-xs px-3 py-1.5 pr-8 rounded-lg
                           border border-ink/20 dark:border-paper/20 
                           bg-paper dark:bg-ink 
                           text-ink dark:text-paper
                           focus:outline-none focus:ring-2 focus:ring-copper/50
                           cursor-pointer"
                >
                  <option value="3days" className="bg-paper dark:bg-ink text-ink dark:text-paper">Past 3 Days</option>
                  <option value="7days" className="bg-paper dark:bg-ink text-ink dark:text-paper">Past 7 Days</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-ink/50 dark:text-paper/50" />
              </div>
              <button 
                onClick={() => setShowNewsPanel(false)} 
                className="p-1.5 rounded-lg hover:bg-ink/10 dark:hover:bg-paper/10 text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {filterNewsByDays(newsFilter === '3days' ? 3 : 7).map((article) => (
              <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer"
                className="block p-3 rounded-lg bg-ink/5 dark:bg-paper/5 hover:bg-copper/10 transition-colors">
                <h4 className="text-sm font-medium mb-1 text-ink dark:text-paper">{article.title}</h4>
                <div className="flex items-center gap-2 text-xs text-ink/50 dark:text-paper/50">
                  <span>{article.source}</span>
                  <span>{article.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-ink/5 dark:bg-paper/5 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-paper dark:bg-ink shadow-sm text-ink dark:text-paper' : 'text-ink/60 dark:text-paper/60'
              }`}>
              <Icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Current Docket with POV Analysis */}
      {activeTab === 'docket' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-headline flex items-center gap-2">
              <FileText size={18} className="text-copper" />
              Cases This Term
            </h3>
            <a href="https://www.supremecourt.gov/docket/docket.aspx" target="_blank" rel="noopener noreferrer"
               className="text-xs text-copper hover:underline flex items-center gap-1">
              Full Docket <ExternalLink size={12} />
            </a>
          </div>

          <div className="space-y-4">
            {currentDocket.map((caseItem) => (
              <div key={caseItem.id} className="border border-ink/10 dark:border-paper/10 rounded-lg overflow-hidden">
                <button onClick={() => setExpandedCase(expandedCase === caseItem.id ? null : caseItem.id)}
                  className="w-full p-4 text-left hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-ink/40 dark:text-paper/40">{caseItem.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(caseItem.status)}`}>
                          {caseItem.status}
                        </span>
                        {caseItem.decision && <span className="text-xs font-mono text-ink/50 dark:text-paper/50">{caseItem.decision}</span>}
                      </div>
                      <h4 className="font-headline font-semibold text-ink dark:text-paper">{caseItem.name}</h4>
                      <p className="text-sm text-ink/60 dark:text-paper/60">{caseItem.issue}</p>
                    </div>
                    {expandedCase === caseItem.id ? <ChevronUp size={20} className="text-ink/50 dark:text-paper/50" /> : <ChevronDown size={20} className="text-ink/50 dark:text-paper/50" />}
                  </div>
                </button>

                {expandedCase === caseItem.id && (
                  <div className="px-4 pb-4 border-t border-ink/10 dark:border-paper/10 pt-3 space-y-4">
                    <p className="text-sm text-ink/70 dark:text-paper/70">{caseItem.summary}</p>
                    
                    {caseItem.argued && (
                      <p className="text-xs text-ink/40 dark:text-paper/40 flex items-center gap-1">
                        <Calendar size={12} /> Argued: {new Date(caseItem.argued).toLocaleDateString()}
                      </p>
                    )}

                    {/* POV Analysis Section */}
                    {caseItem.povs && (
                      <div className="mt-4">
                        <button onClick={() => setShowPovFor(showPovFor === caseItem.id ? null : caseItem.id)}
                          className="flex items-center gap-2 text-sm font-medium text-copper hover:text-copper-dark">
                          <MessageSquare size={16} />
                          View Perspectives Analysis
                          {showPovFor === caseItem.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {showPovFor === caseItem.id && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs text-ink/50 dark:text-paper/50 mb-3">
                              How different political perspectives view this ruling:
                            </p>
                            {Object.entries(caseItem.povs).map(([key, text]) => {
                              const colors = povColors[key]
                              return (
                                <div key={key} className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                                  <p className={`text-xs font-semibold ${colors.text} mb-1`}>{colors.label}</p>
                                  <p className="text-sm text-ink/70 dark:text-paper/70">{text}</p>
                                </div>
                              )
                            })}
                            <p className="text-[10px] text-ink/40 dark:text-paper/40 italic mt-2">
                              These perspectives are synthesized from common arguments in political discourse.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <a href={`https://www.oyez.org/cases/2024/${caseItem.id}`} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-1 text-xs text-copper hover:underline">
                      View on Oyez <ExternalLink size={10} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shadow Docket */}
      {activeTab === 'shadow' && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-copper/10">
                  <AlertTriangle size={20} className="text-copper" />
                </div>
                <div>
                  <h3 className="font-headline font-semibold mb-1 text-ink dark:text-paper">What is the Shadow Docket?</h3>
                  <p className="text-sm text-ink/60 dark:text-paper/60">
                    Emergency orders issued without full briefing or signed opinions.
                  </p>
                </div>
              </div>
              <button onClick={() => setShowShadowInfo(!showShadowInfo)} className="text-ink/40 dark:text-paper/40 hover:text-copper">
                <Info size={18} />
              </button>
            </div>
            {showShadowInfo && (
              <div className="mt-4 p-3 rounded-lg bg-steel/10 border border-steel/20 text-sm text-ink/60 dark:text-paper/60">
                <ul className="space-y-1 text-xs">
                  <li>• Often issued without explanation or recorded votes</li>
                  <li>• Can effectively decide cases without full consideration</li>
                  <li>• Critics argue it undermines judicial accountability</li>
                </ul>
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4">
              <Clock size={18} className="text-copper" /> Recent Emergency Orders
            </h3>
            <div className="space-y-3">
              {shadowDocket.map((order) => (
                <div key={order.id} className="p-4 rounded-lg bg-ink/5 dark:bg-paper/5 border-l-4 border-copper">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-mono text-xs text-ink/40 dark:text-paper/40">{order.id}</span>
                      <span className="mx-2 text-ink/20 dark:text-paper/20">•</span>
                      <span className="text-xs text-ink/50 dark:text-paper/50">{order.type}</span>
                    </div>
                    <span className="text-xs text-ink/40 dark:text-paper/40">{order.date}</span>
                  </div>
                  <p className="font-medium text-sm mb-1 text-ink dark:text-paper">{order.issue}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className={`font-semibold ${getOutcomeColor(order.outcome)}`}>{order.outcome}</span>
                    {order.vote && <span className="text-ink/50 dark:text-paper/50">Vote: {order.vote}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* The Court with Bias Meters */}
      {activeTab === 'justices' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-headline flex items-center gap-2">
              <Users size={18} className="text-copper" />
              Current Justices
            </h3>
            <button onClick={() => setShowBiasInfo(!showBiasInfo)} className="text-xs text-steel hover:text-copper flex items-center gap-1">
              <Info size={14} /> About Bias Ratings
            </button>
          </div>

          {showBiasInfo && (
            <div className="mb-4 p-3 rounded-lg bg-steel/10 border border-steel/20 text-xs text-ink/60 dark:text-paper/60">
              <p className="mb-2"><strong>How Bias Ratings Work:</strong></p>
              <ul className="space-y-1">
                <li>• Ratings based on voting patterns in ideologically divided cases</li>
                <li>• Scale: -2 (Very Liberal) to +2 (Very Conservative)</li>
                <li>• Data from Martin-Quinn scores and SCOTUSblog statistics</li>
                <li>• Agreement rate = % alignment with majority in decided cases</li>
              </ul>
              <p className="mt-2 text-[10px] text-ink/40 dark:text-paper/40">Sources: Martin-Quinn Scores, SCOTUSblog Stat Pack</p>
            </div>
          )}

          <div className="grid gap-3">
            {justices.map((justice) => (
              <div key={justice.name}
                className={`p-4 rounded-lg flex items-center gap-4 ${
                  justice.position === 'Chief Justice' ? 'bg-copper/10 border border-copper/20' : 'bg-ink/5 dark:bg-paper/5'
                }`}>
                {/* Portrait */}
                <div className="w-14 h-14 rounded-full overflow-hidden bg-ink/20 dark:bg-paper/20 flex-shrink-0">
                  {!imgErrors[justice.name] ? (
                    <img src={justice.portrait} alt={justice.name} className="w-full h-full object-cover"
                      onError={() => handleImageError(justice.name)} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-bold text-ink/40 dark:text-paper/40">
                      {justice.initials}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-headline font-semibold text-ink dark:text-paper">{justice.name}</h4>
                    {justice.position === 'Chief Justice' && (
                      <span className="text-xs text-copper">Chief</span>
                    )}
                    <a href={justice.wiki} target="_blank" rel="noopener noreferrer" className="text-steel hover:text-copper">
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <p className="text-xs text-ink/50 dark:text-paper/50">
                    Appointed {justice.appointed} by {justice.appointedBy}
                  </p>
                  
                  {/* Bias Meter */}
                  <div className="flex items-center gap-3 mt-2">
                    {renderBiasMeter(justice.biasScore)}
                    <span className={`text-xs font-medium ${
                      justice.biasScore < -1 ? 'text-blue-500' :
                      justice.biasScore < 0 ? 'text-blue-400' :
                      justice.biasScore < 1 ? 'text-red-400' : 'text-red-500'
                    }`}>
                      {justice.biasLabel}
                    </span>
                  </div>
                </div>

                {/* Agreement Rate */}
                <div className="text-center flex-shrink-0">
                  <div className="text-lg font-bold text-copper">{justice.agreementRate}%</div>
                  <div className="text-[10px] text-ink/40 dark:text-paper/40">Agreement</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <a href="https://www.supremecourt.gov/about/biographies.aspx" target="_blank" rel="noopener noreferrer"
               className="text-xs text-copper hover:underline flex items-center justify-center gap-1">
              Official Biographies <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}

      {/* Footer flourish */}
      <div className="flex items-center justify-center gap-2 text-copper/30">
        <span>❧</span>
        <div className="w-8 h-px bg-current" />
        <span>⚖</span>
        <div className="w-8 h-px bg-current" />
        <span>☙</span>
      </div>
    </div>
  )
}
