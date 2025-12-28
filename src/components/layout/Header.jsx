import { Sun, Moon } from 'lucide-react'

export default function Header({ darkMode, setDarkMode }) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <header className="border-b border-ink/10 dark:border-paper/10">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-copper via-steel to-copper" />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between">
          {/* Masthead */}
          <div className="flex-1 text-center">
            {/* Ornaments */}
            <div className="flex items-center justify-center gap-2 mb-2 text-copper/50">
              <span className="text-sm">❧</span>
              <div className="w-12 h-px bg-current" />
              <span className="text-sm">✦</span>
              <div className="w-12 h-px bg-current" />
              <span className="text-sm">☙</span>
            </div>

            {/* Title */}
            <h1 className="font-masthead text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest">
              P R O V E I T
            </h1>
            
            {/* Tagline */}
            <div className="flex items-center justify-center gap-3 mt-1">
              <div className="w-8 h-px bg-ink/20 dark:bg-paper/20" />
              <p className="font-headline text-sm italic text-ink/50 dark:text-paper/50">
                Veritas Lux
              </p>
              <div className="w-8 h-px bg-ink/20 dark:bg-paper/20" />
            </div>

            {/* Edition */}
            <p className="font-mono text-[10px] text-ink/30 dark:text-paper/30 mt-2 tracking-wider uppercase">
              {today} Edition
            </p>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="nav-icon"
            data-tooltip={darkMode ? 'Light Mode' : 'Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}
