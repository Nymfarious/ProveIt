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
import SupremeCourtView from './components/features/SupremeCourtView'
import SourcesView from './components/features/SourcesView'

// Rate limiting: 5 fact-checks/day for free users
const DAILY_LIMIT = 5
const MAGIC_LINK_USERS = [] // Add email hashes of invited users for unlimited access

function App() {
  const [activeView, setActiveView] = useState('search')
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('proveit-dark')
      return saved === null ? true : saved === 'true'
    }
    return true
  })

  // Rate limiting state
  const [dailyUsage, setDailyUsage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('proveit-daily-usage')
      if (saved) {
        const data = JSON.parse(saved)
        // Reset if it's a new day
        const today = new Date().toDateString()
        if (data.date === today) {
          return data.count
        }
      }
    }
    return 0
  })

  const [isUnlimitedUser, setIsUnlimitedUser] = useState(() => {
    // Check if user has magic link or is developer
    if (typeof window !== 'undefined') {
      const userHash = localStorage.getItem('proveit-user-hash')
      return MAGIC_LINK_USERS.includes(userHash) || 
             localStorage.getItem('proveit-dev-mode') === 'true'
    }
    return false
  })

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('proveit-dark', darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Save daily usage
  useEffect(() => {
    const today = new Date().toDateString()
    localStorage.setItem('proveit-daily-usage', JSON.stringify({
      date: today,
      count: dailyUsage
    }))
  }, [dailyUsage])

  // Keyboard shortcut: CTRL+ALT+V for DevTools
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'v') {
        e.preventDefault()
        setActiveView(prev => prev === 'devtools' ? 'search' : 'devtools')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Increment usage (called from SearchView on each fact-check)
  const incrementUsage = () => {
    if (!isUnlimitedUser) {
      setDailyUsage(prev => prev + 1)
    }
  }

  // Check if user can perform fact-check
  const canFactCheck = isUnlimitedUser || dailyUsage < DAILY_LIMIT
  const remainingChecks = isUnlimitedUser ? '∞' : Math.max(0, DAILY_LIMIT - dailyUsage)

  const views = {
    search: SearchView,
    feed: FeedView,
    stats: StatsView,
    ignored: IgnoredView,
    settings: SettingsView,
    devtools: DevToolsView,
    help: HelpView,
    scotus: SupremeCourtView,
    sources: SourcesView,
  }

  const ActiveComponent = views[activeView] || SearchView

  return (
    <div className={`min-h-screen flex flex-col bg-paper dark:bg-ink text-ink dark:text-paper transition-colors duration-300`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <ActiveComponent 
              canFactCheck={canFactCheck}
              remainingChecks={remainingChecks}
              incrementUsage={incrementUsage}
              isUnlimitedUser={isUnlimitedUser}
              setIsUnlimitedUser={setIsUnlimitedUser}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default App
