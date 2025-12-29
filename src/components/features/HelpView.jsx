import { Search, Newspaper, BarChart3, FolderX, Scale, Shield, Database, Zap, AlertTriangle, CheckCircle, HelpCircle, ExternalLink } from 'lucide-react'

export default function HelpView() {
  const features = [
    {
      icon: Search,
      title: 'Fact Check',
      description: 'Analyze claims, URLs, or quotes for accuracy using AI-powered verification.',
      tips: [
        'Paste any news article URL to check its source bias',
        'Type a claim like "The Earth is flat" to verify',
        'Ask "Did [person] really say this?" for quote verification',
      ],
    },
    {
      icon: Newspaper,
      title: 'My Feed',
      description: 'Browse news from multiple sources with bias indicators and filters.',
      tips: [
        'Use category tabs to filter by topic (Politics, Tech, Medical, etc.)',
        'Toggle region filter for US, UK, or International news',
        'Refresh to see new articles and track your reading balance',
      ],
    },
    {
      icon: Scale,
      title: 'Supreme Court',
      description: 'Track SCOTUS cases, rulings, and the controversial shadow docket.',
      tips: [
        'View current term docket with case summaries',
        'Browse shadow docket orders and emergency rulings',
        'See rolling year of major decisions with vote breakdowns',
      ],
    },
    {
      icon: BarChart3,
      title: 'My Stats',
      description: 'Visualize your reading habits across the political spectrum.',
      tips: [
        'Source Variance Score shows your perspective range (0-100)',
        'Distribution chart shows where your reading falls on the spectrum',
        'Toggle "Include Ignored" to see full picture including flagged sources',
      ],
    },
    {
      icon: FolderX,
      title: 'Ignored Sources',
      description: 'Manage which sources are flagged or blocked in your feed.',
      tips: [
        'Conspiracy/Disinfo list blocks known misinformation sources',
        'Add your own sources to a personal watchlist',
        'Rate sources with 1-3 stars for Caution/Suspect/Avoid',
      ],
    },
  ]

  const verdicts = [
    { label: 'TRUE', color: 'text-forest bg-forest/10', icon: CheckCircle, desc: 'Claim is accurate and well-supported' },
    { label: 'MOSTLY TRUE', color: 'text-forest bg-forest/10', icon: CheckCircle, desc: 'Accurate with minor omissions' },
    { label: 'MIXED', color: 'text-copper bg-copper/10', icon: HelpCircle, desc: 'Contains both accurate and inaccurate elements' },
    { label: 'MOSTLY FALSE', color: 'text-burgundy bg-burgundy/10', icon: AlertTriangle, desc: 'Contains significant inaccuracies' },
    { label: 'FALSE', color: 'text-burgundy bg-burgundy/10', icon: AlertTriangle, desc: 'Claim is inaccurate or misleading' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card text-center">
        <div className="flex items-center justify-center gap-2 mb-3 text-copper/50">
          <span>❧</span>
          <div className="w-8 h-px bg-current" />
          <span>✦</span>
          <div className="w-8 h-px bg-current" />
          <span>☙</span>
        </div>
        <h1 className="font-masthead text-2xl tracking-widest mb-2">HOW TO USE PROVEIT</h1>
        <p className="text-ink/60 dark:text-paper/60">
          Your personal fact-checking and media literacy companion
        </p>
      </div>

      {/* Quick Start */}
      <div className="card">
        <h2 className="card-headline flex items-center gap-2 mb-4">
          <Zap size={18} className="text-copper" />
          Quick Start
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-ink/5 dark:bg-paper/5 text-center">
            <div className="text-2xl mb-2">1️⃣</div>
            <p className="text-sm font-medium">Paste a URL</p>
            <p className="text-xs text-ink/50 dark:text-paper/50 mt-1">Or type any claim to check</p>
          </div>
          <div className="p-4 rounded-lg bg-ink/5 dark:bg-paper/5 text-center">
            <div className="text-2xl mb-2">2️⃣</div>
            <p className="text-sm font-medium">Get Analysis</p>
            <p className="text-xs text-ink/50 dark:text-paper/50 mt-1">AI evaluates accuracy & bias</p>
          </div>
          <div className="p-4 rounded-lg bg-ink/5 dark:bg-paper/5 text-center">
            <div className="text-2xl mb-2">3️⃣</div>
            <p className="text-sm font-medium">Track Progress</p>
            <p className="text-xs text-ink/50 dark:text-paper/50 mt-1">See your reading balance</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="card">
        <h2 className="card-headline flex items-center gap-2 mb-4">
          <HelpCircle size={18} className="text-copper" />
          Features Guide
        </h2>
        <div className="space-y-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="border-b border-ink/10 dark:border-paper/10 pb-6 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-copper/10">
                    <Icon size={20} className="text-copper" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-ink/60 dark:text-paper/60 mb-3">{feature.description}</p>
                    <ul className="space-y-1">
                      {feature.tips.map((tip, i) => (
                        <li key={i} className="text-xs text-ink/50 dark:text-paper/50 flex items-start gap-2">
                          <span className="text-copper">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Verdict Guide */}
      <div className="card">
        <h2 className="card-headline flex items-center gap-2 mb-4">
          <CheckCircle size={18} className="text-copper" />
          Understanding Verdicts
        </h2>
        <div className="space-y-3">
          {verdicts.map((v) => {
            const Icon = v.icon
            return (
              <div key={v.label} className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${v.color.split(' ')[1]}`}>
                  <Icon size={16} className={v.color.split(' ')[0]} />
                </div>
                <div className="flex-1">
                  <span className={`font-bold text-sm ${v.color.split(' ')[0]}`}>{v.label}</span>
                  <p className="text-xs text-ink/50 dark:text-paper/50">{v.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Privacy */}
      <div className="card">
        <h2 className="card-headline flex items-center gap-2 mb-4">
          <Shield size={18} className="text-forest" />
          Privacy First
        </h2>
        <div className="p-4 rounded-lg bg-forest/10 border border-forest/20">
          <p className="text-sm text-forest mb-3">
            <strong>Your data never leaves your device.</strong>
          </p>
          <ul className="space-y-2 text-xs text-forest/80">
            <li className="flex items-start gap-2">
              <Database size={14} className="mt-0.5 flex-shrink-0" />
              All reading history stored locally in your browser
            </li>
            <li className="flex items-start gap-2">
              <Shield size={14} className="mt-0.5 flex-shrink-0" />
              No accounts, no tracking, no data collection
            </li>
            <li className="flex items-start gap-2">
              <Zap size={14} className="mt-0.5 flex-shrink-0" />
              API calls go directly to providers (Gemini, NewsData)
            </li>
          </ul>
        </div>
      </div>

      {/* Resources */}
      <div className="card">
        <h2 className="card-headline mb-4">External Resources</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: 'Media Bias/Fact Check', url: 'https://mediabiasfactcheck.com/' },
            { name: 'AllSides Media Bias', url: 'https://www.allsides.com/media-bias' },
            { name: 'Ad Fontes Media', url: 'https://adfontesmedia.com/' },
            { name: 'First Amendment Center', url: 'https://www.freedomforuminstitute.org/first-amendment-center/' },
          ].map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg bg-ink/5 dark:bg-paper/5 hover:bg-copper/10 transition-colors text-sm"
            >
              <ExternalLink size={14} className="text-copper" />
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Footer flourish */}
      <div className="flex items-center justify-center gap-2 text-copper/30">
        <span>❧</span>
        <div className="w-8 h-px bg-current" />
        <span>✦</span>
        <div className="w-8 h-px bg-current" />
        <span>☙</span>
      </div>
    </div>
  )
}
