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

          {/* Links with hover descriptions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4 text-xs">
            <a 
              href="https://constitution.congress.gov/constitution/amendment-1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/70 hover:text-copper transition-colors group relative"
              title="Read the First Amendment protecting freedom of speech and press"
            >
              First Amendment
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-ink dark:bg-paper text-paper dark:text-ink text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                Freedom of Speech & Press
              </span>
            </a>
            
            <span className="text-copper/30">✦</span>
            
            <a 
              href="https://www.supremecourt.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/70 hover:text-copper transition-colors group relative"
              title="Official U.S. Supreme Court website - cases, orders, and opinions"
            >
              U.S. Supreme Court
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-ink dark:bg-paper text-paper dark:text-ink text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                Official Court Website
              </span>
            </a>
            
            <span className="text-copper/30">✦</span>
            
            <a 
              href="https://www.oyez.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/70 hover:text-copper transition-colors group relative"
              title="Oyez - Free, nonpartisan SCOTUS multimedia archive from Cornell Law"
            >
              Oyez
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-ink dark:bg-paper text-paper dark:text-ink text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                Nonpartisan Court Archive
              </span>
            </a>
            
            <span className="text-copper/30">✦</span>
            
            <a 
              href="https://www.loc.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/70 hover:text-copper transition-colors group relative"
              title="Library of Congress - America's national library and research center"
            >
              Library of Congress
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-ink dark:bg-paper text-paper dark:text-ink text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                National Research Library
              </span>
            </a>
          </div>

          {/* Oyez Description */}
          <div className="text-center mb-4">
            <p className="text-[10px] text-ink/30 dark:text-paper/30 max-w-md mx-auto">
              <strong>Oyez</strong> is a free, nonpartisan multimedia archive of Supreme Court proceedings 
              maintained by Cornell Law School & IIT Chicago-Kent College of Law.
            </p>
          </div>

          {/* Flourish before version */}
          <div className="flex items-center justify-center gap-2 mb-2 text-ink/15 dark:text-paper/15">
            <div className="w-8 h-px bg-current" />
            <span className="text-xs">✦</span>
            <div className="w-8 h-px bg-current" />
          </div>

          {/* Version */}
          <div className="flex items-center justify-center gap-4 text-ink/20 dark:text-paper/20">
            <span className="font-mono text-[10px] uppercase tracking-wider">
              ProveIt v2.4.1
            </span>
            <span>✦</span>
            <span className="font-mono text-[10px] uppercase tracking-wider">
              Personal Edition
            </span>
          </div>

          {/* Bottom flourish */}
          <div className="flex items-center justify-center gap-2 mt-3 text-ink/10 dark:text-paper/10">
            <span className="text-xs">❧</span>
            <span className="text-xs">☙</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
