import { Search, Newspaper, BarChart3, FolderX, Settings, Wrench, HelpCircle, Scale } from 'lucide-react'

// REMOVED: Mail icon - Email is now only in Settings > Email tab
const navItems = [
  { id: 'search', icon: Search, tooltip: 'Fact Check' },
  { id: 'feed', icon: Newspaper, tooltip: 'My Feed' },
  { id: 'scotus', icon: Scale, tooltip: 'Supreme Court' },
  { id: 'stats', icon: BarChart3, tooltip: 'My Stats' },
  { id: 'ignored', icon: FolderX, tooltip: 'Flagged Sources' },
  { id: 'help', icon: HelpCircle, tooltip: 'How to Use' },
  { id: 'settings', icon: Settings, tooltip: 'Settings' },
  { id: 'devtools', icon: Wrench, tooltip: 'DevTools' },
]

export default function Navigation({ activeView, setActiveView }) {
  return (
    <nav className="sticky top-0 z-40 bg-paper/95 dark:bg-ink/95 backdrop-blur-sm border-b border-ink/10 dark:border-paper/10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-center gap-1 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`nav-icon ${isActive ? 'active' : ''}`}
                data-tooltip={item.tooltip}
                aria-label={item.tooltip}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
