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

function App() {
  const [activeView, setActiveView] = useState('search')
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('proveit-dark')
      // Default to dark mode if no preference saved
      return saved === null ? true : saved === 'true'
    }
    return true // Default dark
  })

  useEffect(() => {
    localStorage.setItem('proveit-dark', darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const views = {
    search: SearchView,
    feed: FeedView,
    stats: StatsView,
    ignored: IgnoredView,
    settings: SettingsView,
    devtools: DevToolsView,
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
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default App
