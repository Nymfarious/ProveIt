export default function Footer() {
  return (
    <footer className="border-t border-ink/10 dark:border-paper/10 mt-auto">
      <div className="bg-ink/[0.02] dark:bg-paper/[0.02] py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Flourish ornament */}
          <div className="flex items-center justify-center gap-2 mb-4 text-copper/50">
            <span className="text-sm">❧</span>
            <div className="w-12 h-px bg-current" />
            <span className="text-sm">✦</span>
            <div className="w-12 h-px bg-current" />
            <span className="text-sm">☙</span>
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

          {/* Links with DARK curved hover tooltips only */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4 text-xs">
            <a 
              href="https://constitution.congress.gov/constitution/amendment-1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/70 hover:text-copper transition-colors group relative"
            >
              First Amendment
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                             bg-ink text-paper text-[10px] px-3 py-1.5 rounded-lg
                             opacity-0 group-hover:opacity-100 transition-opacity 
                             whitespace-nowrap pointer-events-none z-10
                             shadow-lg">
                Freedom of Speech & Press
              </span>
            </a>
            
            <span className="text-copper/30">•</span>
            
            <a 
              href="https://www.supremecourt.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/70 hover:text-copper transition-colors group relative"
            >
              U.S. Supreme Court
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                             bg-ink text-paper text-[10px] px-3 py-1.5 rounded-lg
                             opacity-0 group-hover:opacity-100 transition-opacity 
                             whitespace-nowrap pointer-events-none z-10
                             shadow-lg">
                Official Court Website
              </span>
            </a>
            
            <span className="text-copper/30">•</span>
            
            <a 
              href="https://www.oyez.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/70 hover:text-copper transition-colors group relative"
            >
              Oyez
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                             bg-ink text-paper text-[10px] px-3 py-1.5 rounded-lg
                             opacity-0 group-hover:opacity-100 transition-opacity 
                             whitespace-nowrap pointer-events-none z-10
                             shadow-lg">
                Nonpartisan SCOTUS Archive
              </span>
            </a>
            
            <span className="text-copper/30">•</span>
            
            <a 
              href="https://www.loc.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/70 hover:text-copper transition-colors group relative"
            >
              Library of Congress
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                             bg-ink text-paper text-[10px] px-3 py-1.5 rounded-lg
                             opacity-0 group-hover:opacity-100 transition-opacity 
                             whitespace-nowrap pointer-events-none z-10
                             shadow-lg">
                National Research Library
              </span>
            </a>
          </div>

          {/* REMOVED: Oyez gray text explainer - hover does the job */}

          {/* Version - changed diamond to bullet/dot */}
          <div className="flex items-center justify-center gap-3 text-ink/20 dark:text-paper/20">
            <span className="font-mono text-[10px] uppercase tracking-wider">
              ProveIt v3.3.0
            </span>
            <span className="text-copper/40">•</span>
            <span className="font-mono text-[10px] uppercase tracking-wider">
              Personal Edition
            </span>
          </div>

          {/* REMOVED: Bottom flourish (❧ ☙) - was redundant */}
        </div>
      </div>
    </footer>
  )
}
