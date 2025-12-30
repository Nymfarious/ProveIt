import { useState, useRef, useEffect } from 'react'
import { Search, Newspaper, BarChart3, FolderX, Settings, Wrench, HelpCircle, Scale, Shield, Camera, BookOpen, MoreHorizontal, X } from 'lucide-react'

const allNavItems = [
  { id: 'search', icon: Search, tooltip: 'Fact Check' },
  { id: 'feed', icon: Newspaper, tooltip: 'My Feed' },
  { id: 'scotus', icon: Scale, tooltip: 'Supreme Court' },
  { id: 'sources', icon: Shield, tooltip: 'Trusted Sources' },
  { id: 'mediachecker', icon: Camera, tooltip: 'Media Checker' },
  { id: 'founding', icon: BookOpen, tooltip: 'Founding Docs' },
  { id: 'stats', icon: BarChart3, tooltip: 'My Stats' },
  { id: 'ignored', icon: FolderX, tooltip: 'Flagged Sources' },
  { id: 'help', icon: HelpCircle, tooltip: 'How to Use' },
  { id: 'settings', icon: Settings, tooltip: 'Settings' },
  { id: 'devtools', icon: Wrench, tooltip: 'DevTools', shortcut: 'CTRL+ALT+V' },
]

// How many icons fit before overflow (adjust based on design)
const MAX_VISIBLE_ICONS = 8

export default function Navigation({ activeView, setActiveView }) {
  const [showMore, setShowMore] = useState(false)
  const moreRef = useRef(null)

  // Split items into visible and overflow
  const visibleItems = allNavItems.slice(0, MAX_VISIBLE_ICONS)
  const overflowItems = allNavItems.slice(MAX_VISIBLE_ICONS)
  const hasOverflow = overflowItems.length > 0

  // Check if active view is in overflow
  const activeInOverflow = overflowItems.some(item => item.id === activeView)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setShowMore(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavClick = (id) => {
    setActiveView(id)
    setShowMore(false)
  }

  return (
    <nav className="sticky top-0 z-40 bg-paper/95 dark:bg-ink/95 backdrop-blur-sm border-b border-ink/10 dark:border-paper/10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Primary row - NO SCROLL, fixed icons */}
        <div className="flex items-center justify-center gap-1 py-2">
          {visibleItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-icon relative group ${isActive ? 'active' : ''}`}
                aria-label={item.tooltip}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                               bg-ink dark:bg-paper text-paper dark:text-ink 
                               text-[10px] px-2 py-1 rounded-lg
                               opacity-0 group-hover:opacity-100 transition-opacity 
                               whitespace-nowrap pointer-events-none z-50 shadow-lg">
                  {item.tooltip}
                  {item.shortcut && <span className="ml-1 opacity-70">({item.shortcut})</span>}
                </span>
              </button>
            )
          })}

          {/* More button - only shows if overflow exists */}
          {hasOverflow && (
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setShowMore(!showMore)}
                className={`nav-icon relative group ${showMore || activeInOverflow ? 'active' : ''}`}
                aria-label="More options"
              >
                {showMore ? <X size={20} /> : <MoreHorizontal size={20} />}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                               bg-ink dark:bg-paper text-paper dark:text-ink 
                               text-[10px] px-2 py-1 rounded-lg
                               opacity-0 group-hover:opacity-100 transition-opacity 
                               whitespace-nowrap pointer-events-none z-50 shadow-lg">
                  {showMore ? 'Close' : 'More'}
                </span>
              </button>

              {/* Dropdown - second row pinned below */}
              {showMore && (
                <div className="absolute top-full right-0 mt-2 
                              bg-paper dark:bg-ink border border-ink/20 dark:border-paper/20 
                              rounded-lg shadow-xl p-2 min-w-[200px] z-50">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {overflowItems.map((item) => {
                      const Icon = item.icon
                      const isActive = activeView === item.id
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`nav-icon relative group ${isActive ? 'active' : ''}`}
                          aria-label={item.tooltip}
                        >
                          <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                                         bg-ink dark:bg-paper text-paper dark:text-ink 
                                         text-[10px] px-2 py-1 rounded-lg
                                         opacity-0 group-hover:opacity-100 transition-opacity 
                                         whitespace-nowrap pointer-events-none z-50 shadow-lg">
                            {item.tooltip}
                            {item.shortcut && <span className="ml-1 opacity-70">({item.shortcut})</span>}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  
                  {/* Labels for overflow items */}
                  <div className="mt-2 pt-2 border-t border-ink/10 dark:border-paper/10">
                    {overflowItems.map((item) => {
                      const Icon = item.icon
                      const isActive = activeView === item.id
                      return (
                        <button
                          key={`label-${item.id}`}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                                    hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors
                                    ${isActive ? 'text-copper font-medium' : 'text-ink/70 dark:text-paper/70'}`}
                        >
                          <Icon size={16} />
                          <span>{item.tooltip}</span>
                          {item.shortcut && (
                            <span className="ml-auto text-xs text-ink/40 dark:text-paper/40 font-mono">
                              {item.shortcut}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
