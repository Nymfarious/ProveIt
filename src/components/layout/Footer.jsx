export default function Footer() {
  return (
    <footer className="border-t border-ink/10 dark:border-paper/10 mt-auto">
      <div className="bg-ink/[0.02] dark:bg-paper/[0.02] py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Printing press ornament */}
          <div className="flex items-center justify-center gap-3 text-ink/20 dark:text-paper/20 mb-4">
            <div className="flex-1 h-px bg-current" />
            <svg viewBox="0 0 100 30" className="w-20 h-6" fill="currentColor">
              <rect x="10" y="20" width="80" height="8" rx="1" />
              <rect x="20" y="12" width="60" height="10" rx="1" />
              <rect x="35" y="2" width="30" height="12" rx="1" />
              <circle cx="25" cy="25" r="4" />
              <circle cx="75" cy="25" r="4" />
            </svg>
            <div className="flex-1 h-px bg-current" />
          </div>

          {/* Quote */}
          <div className="text-center mb-4">
            <p className="font-headline text-sm italic text-ink/40 dark:text-paper/40">
              "The press is the best instrument for enlightening the mind of man"
            </p>
            <p className="font-mono text-[10px] text-ink/25 dark:text-paper/25 mt-1">
              — Thomas Jefferson, 1786
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-4 mb-4 text-xs">
            <a 
              href="https://constitution.congress.gov/constitution/amendment-1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/70 hover:text-copper transition-colors"
            >
              First Amendment
            </a>
            <span className="text-ink/20 dark:text-paper/20">✦</span>
            <a 
              href="https://www.supremecourt.gov/about/biographies.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/70 hover:text-copper transition-colors"
            >
              U.S. Supreme Court
            </a>
          </div>

          {/* Version */}
          <div className="flex items-center justify-center gap-4 text-ink/20 dark:text-paper/20">
            <span className="font-mono text-[10px] uppercase tracking-wider">
              ProveIt v2.2.0
            </span>
            <span>✦</span>
            <span className="font-mono text-[10px] uppercase tracking-wider">
              Personal Edition
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
