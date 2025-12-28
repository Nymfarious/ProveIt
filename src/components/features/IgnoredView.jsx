import { useState } from 'react'
import { FolderX, AlertTriangle, ChevronDown, Eye, EyeOff } from 'lucide-react'

const ignoredCategories = [
  {
    id: 'extremeRight',
    label: 'Extreme Right',
    color: 'text-red-800 dark:text-red-400',
    borderColor: 'border-red-800',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    sources: ['InfoWars', 'Gateway Pundit', 'Breitbart'],
    articleCount: 12,
    summary: 'This week: Immigration policy attacks, election fraud claims, anti-establishment rhetoric'
  },
  {
    id: 'extremeLeft',
    label: 'Extreme Left',
    color: 'text-blue-800 dark:text-blue-400',
    borderColor: 'border-blue-800',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    sources: ['Occupy Democrats', 'Palmer Report'],
    articleCount: 8,
    summary: 'This week: Corporate corruption narratives, systemic criticism, wealth inequality focus'
  },
  {
    id: 'conspiracy',
    label: 'Conspiracy / Disinfo',
    color: 'text-ink/70 dark:text-paper/70',
    borderColor: 'border-ink/30 dark:border-paper/30',
    bgColor: 'bg-ink/5 dark:bg-paper/5',
    sources: ['Natural News', 'ZeroHedge', 'Epoch Times', 'RT'],
    articleCount: 24,
    summary: 'This week: Health misinformation, geopolitical conspiracy theories, anti-mainstream narratives'
  },
]

export default function IgnoredView() {
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [settings, setSettings] = useState({
    hideExtremeRight: true,
    hideExtremeLeft: true,
    hideConspiracy: true,
    hideStateMedia: false,
    hideLowFactuality: false,
  })

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-copper/10">
            <FolderX className="text-copper" size={24} />
          </div>
          <div>
            <h2 className="font-headline text-xl font-semibold mb-1">Ignored Sources</h2>
            <p className="text-ink/60 dark:text-paper/60 text-sm">
              These sources are hidden from your main feed but still tracked for awareness. 
              Review what they're saying without polluting your daily news.
            </p>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 rounded-lg border border-copper/20 bg-copper/5">
        <AlertTriangle className="text-copper flex-shrink-0 mt-0.5" size={18} />
        <div className="text-sm">
          <p className="font-medium text-copper">Viewing Quarantined Content</p>
          <p className="text-ink/60 dark:text-paper/60">
            Content filtered due to low factuality, extreme bias, or known disinformation.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {ignoredCategories.map((category) => (
          <div 
            key={category.id}
            className={`card border-l-4 ${category.borderColor} overflow-hidden`}
          >
            <button
              onClick={() => setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )}
              className="w-full flex items-center justify-between text-left"
            >
              <div>
                <h3 className={`font-headline font-semibold ${category.color}`}>
                  {category.label}
                </h3>
                <p className="text-sm text-ink/50 dark:text-paper/50">
                  {category.sources.length} sources • {category.articleCount} articles this week
                </p>
              </div>
              <ChevronDown 
                className={`text-ink/30 dark:text-paper/30 transition-transform ${
                  expandedCategory === category.id ? 'rotate-180' : ''
                }`}
                size={20}
              />
            </button>

            {expandedCategory === category.id && (
              <div className="mt-4 pt-4 border-t border-ink/10 dark:border-paper/10">
                <div className={`${category.bgColor} rounded-lg p-3 mb-4`}>
                  <p className="text-xs font-medium mb-1 uppercase tracking-wide opacity-60">AI Summary</p>
                  <p className="text-sm">
                    {category.summary}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-mono text-ink/40 dark:text-paper/40 uppercase tracking-wider mb-2">
                    Filtered Sources:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.sources.map((source) => (
                      <span 
                        key={source}
                        className="px-2 py-1 text-xs rounded bg-ink/5 dark:bg-paper/5"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="btn-ghost text-sm flex-1">
                    <Eye size={14} />
                    View Articles
                  </button>
                  <button className="btn-ghost text-sm flex-1">
                    Full Summary
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Filter Settings */}
      <div className="card">
        <h3 className="card-headline flex items-center gap-2 mb-4">
          <EyeOff size={18} className="text-copper" />
          Auto-Filter Settings
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'hideExtremeRight', label: 'Auto-hide Extreme Right' },
            { key: 'hideExtremeLeft', label: 'Auto-hide Extreme Left' },
            { key: 'hideConspiracy', label: 'Auto-hide Conspiracy / Propaganda' },
            { key: 'hideStateMedia', label: 'Auto-hide State Media (RT, Xinhua, etc.)' },
            { key: 'hideLowFactuality', label: 'Auto-hide Low Factuality sources' },
          ].map((setting) => (
            <label 
              key={setting.key}
              className="flex items-center justify-between cursor-pointer group"
            >
              <span className="text-sm group-hover:text-copper transition-colors">
                {setting.label}
              </span>
              <button
                onClick={() => toggleSetting(setting.key)}
                className={`toggle ${settings[setting.key] ? 'active' : ''}`}
              >
                <span className="toggle-knob" />
              </button>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
