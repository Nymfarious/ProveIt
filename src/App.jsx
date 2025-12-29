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
import MediaCheckerView from './components/features/MediaCheckerView'
import FoundingDocsView from './components/features/FoundingDocsView'

const DAILY_LIMIT = 5

function App() {
  const [activeView, setActiveView] = useState('search')
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('proveit-dark')
      return saved === null ? true : saved === 'true'
    }
    return true
  })

  const [dailyUsage, setDailyUsage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('proveit-daily-usage')
      if (saved) {
        const data = JSON.parse(saved)
        const today = new Date().toDateString()
        if (data.date === today) return data.count
      }
    }
    return 0
  })

  const [isUnlimitedUser, setIsUnlimitedUser] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('proveit-dev-mode') === 'true'
    }
    return false
  })

  useEffect(() => {
    localStorage.setItem('proveit-dark', darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const today = new Date().toDateString()
    localStorage.setItem('proveit-daily-usage', JSON.stringify({ date: today, count: dailyUsage }))
  }, [dailyUsage])

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

  const incrementUsage = () => {
    if (!isUnlimitedUser) setDailyUsage(prev => prev + 1)
  }

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
    mediachecker: MediaCheckerView,
    founding: FoundingDocsView,
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
