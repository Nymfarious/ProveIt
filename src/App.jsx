import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import SearchView from './components/features/SearchView'
import FeedView from './components/features/FeedView'
import StatsView from './components/features/StatsView'
import IgnoredView from './components/features/IgnoredView'
import SettingsView from './components/features/SettingsView'
import DevToolsView from './components/features/DevToolsView'
import HelpView from './components/features/HelpView'
import { useAnalytics } from './hooks/useAnalytics'

// Create context for analytics
import { createContext, useContext } from 'react'
export const AnalyticsContext = createContext(null)
export const useAnalyticsContext = () => useContext(AnalyticsContext)

function App() {
  const [activeView, setActiveView] = useState('search')
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('proveit-dark')
      return saved === null ? true : saved === 'true'
    }
    return true
  })
  const [devToolsEnabled, setDevToolsEnabled] = useState(false)

  // Initialize analytics
  const analytics = useAnalytics()

  // Dark mode effect
  useEffect(() => {
    localStorage.setItem('proveit-dark', darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // DevTools hotkey: Alt + Shift + D
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        setDevToolsEnabled(prev => {
          const newState = !prev
          if (newState) {
            console.log('%c🔧 DevTools Enabled', 'color: #c45d2c; font-size: 14px; font-weight: bold;')
          } else {
            console.log('%c🔧 DevTools Disabled', 'color: #666; font-size: 14px;')
            // If currently on devtools view, switch away
            if (activeView === 'devtools') {
              setActiveView('settings')
            }
          }
          return newState
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeView])

  const views = {
    search: SearchView,
    feed: FeedView,
    stats: StatsView,
    ignored: IgnoredView,
    settings: SettingsView,
    devtools: DevToolsView,
    help: HelpView,
  }

  const ActiveComponent = views[activeView] || SearchView

  return (
    <AnalyticsContext.Provider value={analytics}>
      <div className="min-h-screen flex flex-col bg-paper dark:bg-ink text-ink dark:text-paper transition-colors duration-300">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Navigation 
          activeView={activeView} 
          setActiveView={setActiveView} 
          devToolsEnabled={devToolsEnabled}
        />
        
        <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer lastLogin={analytics.lastLogin} />
      </div>
    </AnalyticsContext.Provider>
  )
}

export default App
