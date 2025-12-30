import { useState, useEffect } from 'react'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import SearchView from './components/features/SearchView'
import FeedView from './components/features/FeedView'
import ResearchView from './components/features/ResearchView'
import SupremeCourtView from './components/features/SupremeCourtView'
import SourcesView from './components/features/SourcesView'
import MediaCheckerView from './components/features/MediaCheckerView'
import FoundingDocsView from './components/features/FoundingDocsView'
import StatsView from './components/features/StatsView'
import IgnoredView from './components/features/IgnoredView'
import HelpView from './components/features/HelpView'
import SettingsView from './components/features/SettingsView'
import DevToolsView from './components/features/DevToolsView'

const views = {
  search: SearchView,
  feed: FeedView,
  research: ResearchView,
  scotus: SupremeCourtView,
  sources: SourcesView,
  ignored: IgnoredView,
  mediachecker: MediaCheckerView,
  founding: FoundingDocsView,
  stats: StatsView,
  help: HelpView,
  settings: SettingsView,
  devtools: DevToolsView,
}

export default function App() {
  const [activeView, setActiveView] = useState('search')

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('proveit-theme')
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    }

    // Keyboard shortcut for DevTools
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'v') {
        setActiveView('devtools')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const ActiveComponent = views[activeView] || SearchView

  return (
    <div className="min-h-screen bg-paper dark:bg-ink text-ink dark:text-paper transition-colors">
      {/* Header */}
      <header className="text-center py-6 border-b border-ink/10 dark:border-paper/10">
        <h1 className="font-headline text-3xl font-bold text-ink dark:text-paper tracking-wide">
          PROVE<span className="text-copper">IT</span>
        </h1>
        <p className="text-xs text-ink/50 dark:text-paper/50 tracking-[0.3em] mt-1 uppercase">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} Edition
        </p>
      </header>

      {/* Navigation */}
      <Navigation activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <ActiveComponent />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
