import { useState } from 'react'
import { Scale, Calendar, AlertTriangle, Clock, ExternalLink, FileText, Gavel, Users, ChevronDown, ChevronUp, Info } from 'lucide-react'

// Mock data - would be fetched from SCOTUS API / Oyez in production
const currentDocket = [
  {
    id: '23-726',
    name: 'Trump v. United States',
    issue: 'Presidential immunity from criminal prosecution',
    argued: '2024-04-25',
    status: 'Decided',
    decision: '6-3',
    summary: 'Presidents have absolute immunity for core constitutional powers, presumptive immunity for official acts.',
  },
  {
    id: '22-842',
    name: 'Loper Bright Enterprises v. Raimondo',
    issue: 'Chevron deference to agency interpretations',
    argued: '2024-01-17',
    status: 'Decided',
    decision: '6-3',
    summary: 'Overruled Chevron, courts must exercise independent judgment on agency interpretations.',
  },
  {
    id: '23-719',
    name: 'Moyle v. United States',
    issue: 'EMTALA and state abortion restrictions',
    argued: '2024-04-24',
    status: 'Decided',
    decision: 'DIG',
    summary: 'Dismissed as improvidently granted; case returns to lower courts.',
  },
  {
    id: '24-123',
    name: 'Example v. State',
    issue: 'Second Amendment and assault weapons',
    argued: null,
    status: 'Pending',
    decision: null,
    summary: 'Challenges state assault weapons ban under Bruen framework.',
  },
]

const shadowDocket = [
  {
    id: 'A-234',
    date: '2024-12-15',
    type: 'Emergency Stay',
    issue: 'Immigration enforcement',
    outcome: 'Granted',
    vote: '5-4',
    note: 'Stays lower court injunction pending appeal',
  },
  {
    id: 'A-198',
    date: '2024-11-28',
    type: 'Application',
    issue: 'Execution stay request',
    outcome: 'Denied',
    vote: '6-3',
    note: 'Three justices would have granted stay',
  },
  {
    id: 'A-156',
    date: '2024-11-10',
    type: 'Emergency Stay',
    issue: 'Environmental regulation',
    outcome: 'Granted',
    vote: 'Unsigned',
    note: 'EPA rule stayed pending resolution',
  },
]

const justices = [
  { name: 'John Roberts', position: 'Chief Justice', appointed: '2005', appointedBy: 'G.W. Bush' },
  { name: 'Clarence Thomas', position: 'Associate Justice', appointed: '1991', appointedBy: 'G.H.W. Bush' },
  { name: 'Samuel Alito', position: 'Associate Justice', appointed: '2006', appointedBy: 'G.W. Bush' },
  { name: 'Sonia Sotomayor', position: 'Associate Justice', appointed: '2009', appointedBy: 'Obama' },
  { name: 'Elena Kagan', position: 'Associate Justice', appointed: '2010', appointedBy: 'Obama' },
  { name: 'Neil Gorsuch', position: 'Associate Justice', appointed: '2017', appointedBy: 'Trump' },
  { name: 'Brett Kavanaugh', position: 'Associate Justice', appointed: '2018', appointedBy: 'Trump' },
  { name: 'Amy Coney Barrett', position: 'Associate Justice', appointed: '2020', appointedBy: 'Trump' },
  { name: 'Ketanji Brown Jackson', position: 'Associate Justice', appointed: '2022', appointedBy: 'Biden' },
]

export default function SupremeCourtView() {
  const [activeTab, setActiveTab] = useState('docket')
  const [expandedCase, setExpandedCase] = useState(null)
  const [showShadowInfo, setShowShadowInfo] = useState(false)

  const tabs = [
    { id: 'docket', label: 'Current Docket', icon: FileText },
    { id: 'shadow', label: 'Shadow Docket', icon: AlertTriangle },
    { id: 'justices', label: 'The Court', icon: Users },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Decided': return 'text-forest bg-forest/10'
      case 'Pending': return 'text-copper bg-copper/10'
      case 'Argued': return 'text-steel bg-steel/10'
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-copper/10">
            <Scale size={24} className="text-copper" />
          </div>
          <div>
            <h2 className="font-headline text-xl font-semibold">U.S. Supreme Court</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              October Term 2024 • Track cases, rulings, and the shadow docket
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-ink/5 dark:bg-paper/5 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-paper dark:bg-ink shadow-sm text-ink dark:text-paper'
                  : 'text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper'
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Current Docket */}
      {activeTab === 'docket' && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="card-headline flex items-center gap-2">
                <FileText size={18} className="text-copper" />
                Cases This Term
              </h3>
              <a
                href="https://www.supremecourt.gov/docket/docket.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-copper hover:underline flex items-center gap-1"
              >
                Full Docket <ExternalLink size={12} />
              </a>
            </div>

            <div className="space-y-3">
              {currentDocket.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="border border-ink/10 dark:border-paper/10 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedCase(expandedCase === caseItem.id ? null : caseItem.id)}
                    className="w-full p-4 text-left hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-ink/40 dark:text-paper/40">{caseItem.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(caseItem.status)}`}>
                            {caseItem.status}
                          </span>
                          {caseItem.decision && (
                            <span className="text-xs font-mono text-ink/50 dark:text-paper/50">
                              {caseItem.decision}
                            </span>
                          )}
                        </div>
                        <h4 className="font-headline font-semibold">{caseItem.name}</h4>
                        <p className="text-sm text-ink/60 dark:text-paper/60">{caseItem.issue}</p>
                      </div>
                      {expandedCase === caseItem.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {expandedCase === caseItem.id && (
                    <div className="px-4 pb-4 border-t border-ink/10 dark:border-paper/10 pt-3">
                      <p className="text-sm text-ink/70 dark:text-paper/70 mb-3">{caseItem.summary}</p>
                      {caseItem.argued && (
                        <p className="text-xs text-ink/40 dark:text-paper/40 flex items-center gap-1">
                          <Calendar size={12} />
                          Argued: {new Date(caseItem.argued).toLocaleDateString()}
                        </p>
                      )}
                      <a
                        href={`https://www.oyez.org/cases/2024/${caseItem.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs text-copper hover:underline"
                      >
                        View on Oyez <ExternalLink size={10} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shadow Docket */}
      {activeTab === 'shadow' && (
        <div className="space-y-4">
          {/* Shadow Docket Explainer */}
          <div className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-copper/10">
                  <AlertTriangle size={20} className="text-copper" />
                </div>
                <div>
                  <h3 className="font-headline font-semibold mb-1">What is the Shadow Docket?</h3>
                  <p className="text-sm text-ink/60 dark:text-paper/60">
                    Emergency orders and stays issued without full briefing, oral argument, or signed opinions.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowShadowInfo(!showShadowInfo)}
                className="text-ink/40 dark:text-paper/40 hover:text-copper"
              >
                <Info size={18} />
              </button>
            </div>

            {showShadowInfo && (
              <div className="mt-4 p-3 rounded-lg bg-steel/10 border border-steel/20 text-sm text-ink/70 dark:text-paper/70">
                <p className="mb-2">
                  <strong>Why it matters:</strong> Shadow docket rulings can have significant legal impact
                  without the transparency of merits decisions.
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• Often issued without explanation or recorded votes</li>
                  <li>• Can effectively decide cases without full consideration</li>
                  <li>• Has increased dramatically in recent years</li>
                  <li>• Critics argue it undermines judicial accountability</li>
                </ul>
              </div>
            )}
          </div>

          {/* Shadow Docket Orders */}
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4">
              <Clock size={18} className="text-copper" />
              Recent Emergency Orders
            </h3>

            <div className="space-y-3">
              {shadowDocket.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-lg bg-ink/5 dark:bg-paper/5 border-l-4 border-copper"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-mono text-xs text-ink/40 dark:text-paper/40">{order.id}</span>
                      <span className="mx-2 text-ink/20 dark:text-paper/20">•</span>
                      <span className="text-xs text-ink/50 dark:text-paper/50">{order.type}</span>
                    </div>
                    <span className="text-xs text-ink/40 dark:text-paper/40">{order.date}</span>
                  </div>
                  <p className="font-medium text-sm mb-1">{order.issue}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className={`font-semibold ${getOutcomeColor(order.outcome)}`}>
                      {order.outcome}
                    </span>
                    {order.vote && (
                      <span className="text-ink/50 dark:text-paper/50">Vote: {order.vote}</span>
                    )}
                  </div>
                  {order.note && (
                    <p className="text-xs text-ink/40 dark:text-paper/40 mt-2 italic">{order.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* The Court */}
      {activeTab === 'justices' && (
        <div className="card">
          <h3 className="card-headline flex items-center gap-2 mb-4">
            <Users size={18} className="text-copper" />
            Current Justices
          </h3>

          <div className="grid gap-3">
            {justices.map((justice) => (
              <div
                key={justice.name}
                className={`p-4 rounded-lg ${
                  justice.position === 'Chief Justice'
                    ? 'bg-copper/10 border border-copper/20'
                    : 'bg-ink/5 dark:bg-paper/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-headline font-semibold">
                      {justice.name}
                      {justice.position === 'Chief Justice' && (
                        <span className="ml-2 text-xs text-copper font-normal">Chief Justice</span>
                      )}
                    </h4>
                    <p className="text-xs text-ink/50 dark:text-paper/50">
                      Appointed {justice.appointed} by {justice.appointedBy}
                    </p>
                  </div>
                  <Gavel size={16} className="text-ink/20 dark:text-paper/20" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <a
              href="https://www.supremecourt.gov/about/biographies.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-copper hover:underline flex items-center justify-center gap-1"
            >
              Full Biographies <ExternalLink size={12} />
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
