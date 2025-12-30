import { useState } from 'react'
import { Scale, Users, ChevronDown, ChevronUp, ExternalLink, Newspaper, TrendingUp, TrendingDown, Minus, AlertCircle, Info, X } from 'lucide-react'

// Current Supreme Court Justices (as of 2024)
const JUSTICES = [
  { name: 'John Roberts', role: 'Chief Justice', appointed: 2005, appointedBy: 'G.W. Bush', ideology: 0.8, img: '👨‍⚖️' },
  { name: 'Clarence Thomas', role: 'Associate Justice', appointed: 1991, appointedBy: 'G.H.W. Bush', ideology: 2.5, img: '👨‍⚖️' },
  { name: 'Samuel Alito', role: 'Associate Justice', appointed: 2006, appointedBy: 'G.W. Bush', ideology: 2.2, img: '👨‍⚖️' },
  { name: 'Sonia Sotomayor', role: 'Associate Justice', appointed: 2009, appointedBy: 'Obama', ideology: -2.3, img: '👩‍⚖️' },
  { name: 'Elena Kagan', role: 'Associate Justice', appointed: 2010, appointedBy: 'Obama', ideology: -1.8, img: '👩‍⚖️' },
  { name: 'Neil Gorsuch', role: 'Associate Justice', appointed: 2017, appointedBy: 'Trump', ideology: 1.8, img: '👨‍⚖️' },
  { name: 'Brett Kavanaugh', role: 'Associate Justice', appointed: 2018, appointedBy: 'Trump', ideology: 1.5, img: '👨‍⚖️' },
  { name: 'Amy Coney Barrett', role: 'Associate Justice', appointed: 2020, appointedBy: 'Trump', ideology: 2.0, img: '👩‍⚖️' },
  { name: 'Ketanji Brown Jackson', role: 'Associate Justice', appointed: 2022, appointedBy: 'Biden', ideology: -2.0, img: '👩‍⚖️' },
]

const RECENT_CASES = [
  { 
    name: 'Trump v. United States (2024)', 
    topic: 'Presidential Immunity',
    decision: '6-3 Conservative',
    summary: 'Presidents have absolute immunity for core constitutional powers and presumptive immunity for official acts.',
    povLeft: 'Dangerous expansion of executive power that places presidents above the law.',
    povRight: 'Necessary protection for presidential decision-making from politically motivated prosecutions.',
    povCenter: 'Establishes new framework for presidential immunity that will be tested in future cases.',
  },
  { 
    name: 'Dobbs v. Jackson (2022)', 
    topic: 'Abortion Rights',
    decision: '6-3 Conservative',
    summary: 'Overturned Roe v. Wade, returning abortion regulation to the states.',
    povLeft: 'Devastating rollback of reproductive rights and bodily autonomy for women.',
    povRight: 'Corrects a constitutional error, returning this issue to democratic processes.',
    povCenter: 'Major shift in constitutional interpretation with significant policy implications.',
  },
  {
    name: 'Students for Fair Admissions v. Harvard (2023)',
    topic: 'Affirmative Action',
    decision: '6-3 Conservative',
    summary: 'Race-conscious admissions programs at universities are unconstitutional.',
    povLeft: 'Setback for diversity and equal opportunity in higher education.',
    povRight: 'Victory for colorblind policies and equal treatment under the law.',
    povCenter: 'Universities must find new approaches to achieve diverse student bodies.',
  },
]

const MOCK_NEWS = [
  { title: 'Supreme Court to Hear Major Case on Executive Power', source: 'SCOTUSblog', time: '2 hours ago' },
  { title: 'Analysis: What the Latest Ruling Means for Regulatory Agencies', source: 'Oyez', time: '5 hours ago' },
  { title: 'Justices Grant Cert in Landmark Environmental Case', source: 'Cornell Law', time: '1 day ago' },
]

export default function SupremeCourtView() {
  const [expandedJustice, setExpandedJustice] = useState(null)
  const [expandedCase, setExpandedCase] = useState(null)
  const [showNews, setShowNews] = useState(false)
  const [newsTimeframe, setNewsTimeframe] = useState('3days')

  const getIdeologyLabel = (score) => {
    if (score <= -2) return { label: 'Liberal', color: 'text-blue-600' }
    if (score <= -1) return { label: 'Lean Liberal', color: 'text-blue-400' }
    if (score <= 1) return { label: 'Moderate', color: 'text-slate-500' }
    if (score <= 2) return { label: 'Lean Conservative', color: 'text-red-400' }
    return { label: 'Conservative', color: 'text-red-600' }
  }

  const renderIdeologyBar = (score) => {
    const position = ((score + 3) / 6) * 100
    return (
      <div className="relative h-2 w-24 rounded-full bg-gradient-to-r from-blue-600 via-slate-400 to-red-600 overflow-hidden">
        <div 
          className="absolute top-0 w-2 h-2 bg-white border-2 border-ink rounded-full transform -translate-x-1/2"
          style={{ left: `${position}%` }}
        />
      </div>
    )
  }

  const liberalCount = JUSTICES.filter(j => j.ideology < -0.5).length
  const conservativeCount = JUSTICES.filter(j => j.ideology > 0.5).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-copper/10">
            <Scale size={24} className="text-copper" />
          </div>
          <div>
            <h2 className="font-headline text-xl font-semibold text-ink dark:text-paper">Supreme Court</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              Current justices, ideology ratings, and case analysis
            </p>
          </div>
        </div>
      </div>

      {/* Court Composition */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <Users size={18} className="text-copper" />
          Current Composition
        </h3>
        
        <div className="flex items-center justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{liberalCount}</div>
            <div className="text-xs text-ink/50 dark:text-paper/50">Liberal</div>
          </div>
          <div className="text-center">
            <Scale size={32} className="mx-auto text-copper mb-1" />
            <div className="text-xs text-ink/50 dark:text-paper/50">9 Justices</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{conservativeCount}</div>
            <div className="text-xs text-ink/50 dark:text-paper/50">Conservative</div>
          </div>
        </div>

        <div className="h-4 rounded-full bg-gradient-to-r from-blue-600 via-slate-300 to-red-600 relative mb-2">
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white" />
        </div>
        <div className="flex justify-between text-xs text-ink/50 dark:text-paper/50">
          <span>Liberal</span>
          <span>Center</span>
          <span>Conservative</span>
        </div>
      </div>

      {/* Justices */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <Scale size={18} className="text-steel" />
          The Nine Justices
        </h3>
        
        <div className="space-y-2">
          {JUSTICES.map((justice) => {
            const ideology = getIdeologyLabel(justice.ideology)
            const isExpanded = expandedJustice === justice.name
            
            return (
              <div key={justice.name} className="border border-ink/10 dark:border-paper/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedJustice(isExpanded ? null : justice.name)}
                  className="w-full p-3 text-left hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{justice.img}</span>
                      <div>
                        <p className="font-medium text-ink dark:text-paper">{justice.name}</p>
                        <p className="text-xs text-ink/50 dark:text-paper/50">{justice.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <span className={`text-xs font-medium ${ideology.color}`}>{ideology.label}</span>
                      </div>
                      {renderIdeologyBar(justice.ideology)}
                      {isExpanded ? <ChevronUp size={16} className="text-ink/50 dark:text-paper/50" /> : <ChevronDown size={16} className="text-ink/50 dark:text-paper/50" />}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-3 pb-3 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2 p-2 rounded bg-ink/5 dark:bg-paper/5">
                      <div>
                        <span className="text-ink/50 dark:text-paper/50">Appointed:</span>
                        <span className="ml-2 text-ink dark:text-paper">{justice.appointed}</span>
                      </div>
                      <div>
                        <span className="text-ink/50 dark:text-paper/50">By:</span>
                        <span className="ml-2 text-ink dark:text-paper">{justice.appointedBy}</span>
                      </div>
                    </div>
                    <a 
                      href={`https://www.oyez.org/justices/${justice.name.toLowerCase().replace(' ', '_')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-steel hover:text-copper"
                    >
                      <ExternalLink size={12} /> View on Oyez
                    </a>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Cases with POV Analysis */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <AlertCircle size={18} className="text-copper" />
          Notable Recent Decisions
        </h3>
        
        <div className="space-y-3">
          {RECENT_CASES.map((caseItem) => {
            const isExpanded = expandedCase === caseItem.name
            
            return (
              <div key={caseItem.name} className="border border-ink/10 dark:border-paper/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedCase(isExpanded ? null : caseItem.name)}
                  className="w-full p-3 text-left hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-ink dark:text-paper">{caseItem.name}</p>
                      <p className="text-xs text-ink/50 dark:text-paper/50">{caseItem.topic}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        caseItem.decision.includes('Conservative') ? 'bg-red-500/20 text-red-500' :
                        caseItem.decision.includes('Liberal') ? 'bg-blue-500/20 text-blue-500' :
                        'bg-slate-500/20 text-slate-500'
                      }`}>
                        {caseItem.decision}
                      </span>
                      {isExpanded ? <ChevronUp size={16} className="text-ink/50 dark:text-paper/50" /> : <ChevronDown size={16} className="text-ink/50 dark:text-paper/50" />}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-3 pb-3 space-y-3">
                    <p className="text-sm text-ink/70 dark:text-paper/70">{caseItem.summary}</p>
                    
                    <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
                      <p className="text-xs font-semibold text-copper mb-2">POV Analysis</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <TrendingDown size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-medium text-blue-500">Left:</span>
                            <p className="text-xs text-ink/70 dark:text-paper/70">{caseItem.povLeft}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Minus size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-medium text-slate-500">Center:</span>
                            <p className="text-xs text-ink/70 dark:text-paper/70">{caseItem.povCenter}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <TrendingUp size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-medium text-red-500">Right:</span>
                            <p className="text-xs text-ink/70 dark:text-paper/70">{caseItem.povRight}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* SCOTUS News */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-headline flex items-center gap-2 text-ink dark:text-paper">
            <Newspaper size={18} className="text-copper" />
            SCOTUS News
          </h3>
          <button
            onClick={() => setShowNews(!showNews)}
            className="text-xs text-copper hover:underline"
          >
            {showNews ? 'Hide' : 'Show'}
          </button>
        </div>

        {showNews && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <select
                value={newsTimeframe}
                onChange={(e) => setNewsTimeframe(e.target.value)}
                className="appearance-none text-xs px-3 py-1.5 pr-8 rounded-lg
                         border border-ink/20 dark:border-paper/20 
                         bg-paper dark:bg-ink 
                         text-ink dark:text-paper
                         focus:outline-none focus:ring-2 focus:ring-copper/50"
              >
                <option value="3days">Past 3 Days</option>
                <option value="7days">Past 7 Days</option>
              </select>
              <button
                onClick={() => setShowNews(false)}
                className="text-ink/40 dark:text-paper/40 hover:text-ink dark:hover:text-paper"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2">
              {MOCK_NEWS.map((news, i) => (
                <div key={i} className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 hover:bg-ink/10 dark:hover:bg-paper/10 transition-colors">
                  <p className="font-medium text-sm text-ink dark:text-paper">{news.title}</p>
                  <p className="text-xs text-ink/50 dark:text-paper/50">{news.source} • {news.time}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-ink/40 dark:text-paper/40 mt-3">
              News from: SCOTUSblog, Oyez, Cornell Law LII
            </p>
          </>
        )}
      </div>

      {/* Resources */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
          <Info size={18} className="text-steel" />
          Trusted Legal Resources
        </h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { name: 'Oyez', url: 'https://www.oyez.org', desc: 'Audio & transcripts' },
            { name: 'SCOTUSblog', url: 'https://www.scotusblog.com', desc: 'Analysis & news' },
            { name: 'Cornell Law LII', url: 'https://www.law.cornell.edu/supremecourt', desc: 'Case law' },
            { name: 'Supreme Court Official', url: 'https://www.supremecourt.gov', desc: 'Official site' },
          ].map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 hover:bg-copper/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-ink dark:text-paper">{resource.name}</span>
                <ExternalLink size={14} className="text-copper" />
              </div>
              <p className="text-xs text-ink/50 dark:text-paper/50">{resource.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* SINGLE Footer with Scales - removed duplicate */}
      <div className="flex items-center justify-center gap-2 text-copper/30 py-4">
        <span>❧</span>
        <div className="w-8 h-px bg-current" />
        <span>⚖</span>
        <div className="w-8 h-px bg-current" />
        <span>☙</span>
      </div>
    </div>
  )
}
