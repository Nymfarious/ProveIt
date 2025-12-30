import { useState, useRef, useEffect } from 'react'
import { Search, Newspaper, BarChart3, FolderX, Settings, Wrench, HelpCircle, Scale, Shield, Camera, BookOpen, MoreHorizontal, X } from 'lucide-react'

// Reordered: Shield (Trusted) and FolderX (Flagged) now together
const allNavItems = [
  { id: 'search', icon: Search, tooltip: 'Fact Check' },
  { id: 'feed', icon: Newspaper, tooltip: 'My Feed' },
  { id: 'scotus', icon: Scale, tooltip: 'Supreme Court' },
  { id: 'sources', icon: Shield, tooltip: 'Trusted Sources' },
  { id: 'ignored', icon: FolderX, tooltip: 'Flagged Sources' },
  { id: 'mediachecker', icon: Camera, tooltip: 'Media Checker' },
  { id: 'founding', icon: BookOpen, tooltip: 'Founding Docs' },
  { id: 'stats', icon: BarChart3, tooltip: 'My Stats' },
  { id: 'help', icon: HelpCircle, tooltip: 'How to Use' },
  { id: 'settings', icon: Settings, tooltip: 'Settings' },
  { id: 'devtools', icon: Wrench, tooltip: 'DevTools', shortcut: 'CTRL+ALT+V' },
]

const MAX_VISIBLE_ICONS = 8

export default function Navigation({ activeView, setActiveView }) {
  const [showMore, setShowMore] = useState(false)
  const moreRef = useRef(null)

  const visibleItems = allNavItems.slice(0, MAX_VISIBLE_ICONS)
  const overflowItems = allNavItems.slice(MAX_VISIBLE_ICONS)
  const hasOverflow = overflowItems.length > 0
  const activeInOverflow = overflowItems.some(item => item.id === activeView)

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

              {/* Simplified dropdown - icons only with hover tooltips, no redundant text */}
              {showMore && (
                <div className="absolute top-full right-0 mt-2 
                              bg-paper dark:bg-ink border border-ink/20 dark:border-paper/20 
                              rounded-lg shadow-xl p-2 z-50">
                  <div className="flex gap-1">
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
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
