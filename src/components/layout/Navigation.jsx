import { Search, Newspaper, BarChart3, EyeOff, Settings, Wrench, HelpCircle } from 'lucide-react'

export default function Navigation({ activeView, setActiveView, devToolsEnabled }) {
  const navItems = [
    { id: 'search', icon: Search, label: 'Fact Check' },
    { id: 'feed', icon: Newspaper, label: 'News Feed' },
    { id: 'stats', icon: BarChart3, label: 'My Stats' },
    { id: 'ignored', icon: EyeOff, label: 'Ignored Sources' },
    { id: 'help', icon: HelpCircle, label: 'How To Use' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  // Only show DevTools if enabled via hotkey
  if (devToolsEnabled) {
    navItems.push({ id: 'devtools', icon: Wrench, label: 'DevTools (Alt+Shift+D)' })
  }

  return (
    <nav className="border-b border-ink/10 dark:border-paper/10 bg-white/50 dark:bg-ink-light/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-center gap-1 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`nav-icon group relative ${isActive ? 'active' : ''}`}
                title={item.label}
              >
                <Icon size={20} />
                
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 
                               bg-ink dark:bg-paper text-paper dark:text-ink text-xs rounded
                               opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap
                               pointer-events-none z-50">
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
