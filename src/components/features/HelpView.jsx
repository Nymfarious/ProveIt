import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HelpCircle, 
  Search, 
  Newspaper, 
  BarChart3, 
  EyeOff, 
  Shield, 
  Download,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react'

const FAQ_ITEMS = [
  {
    question: "How does the bias rating work?",
    answer: `ProveIt uses data from Media Bias/Fact Check (MBFC), an independent media watchdog. 
    Sources are rated on a spectrum from Far Left to Far Right based on their editorial positioning, 
    not the accuracy of individual articles. A "Lean Left" source isn't less accurate than a "Center" source—they 
    simply have different editorial perspectives.`
  },
  {
    question: "Is my reading history sent anywhere?",
    answer: `No. Your reading history, statistics, and "lean score" are calculated and stored entirely 
    on your device using your browser's localStorage. The only time data leaves your device is if you 
    explicitly choose to email yourself a report—and even then, only a summary is sent.`
  },
  {
    question: "What does my 'lean score' mean?",
    answer: `Your lean score (-10 to +10) reflects the aggregate political positioning of the sources 
    you read. A negative score means you read more left-leaning sources; positive means more right-leaning. 
    This doesn't reflect your personal beliefs—only your reading diet.`
  },
  {
    question: "Can I delete my tracking data?",
    answer: `Yes! Go to Settings → Privacy & Data → Clear Tracking Data. You can delete data from the 
    last 12 hours, 24 hours, 7 days, 30 days, or everything. This is permanent and cannot be undone.`
  },
  {
    question: "How do I export my data?",
    answer: `Go to Settings → Privacy & Data → Export My Data. This downloads a JSON file containing 
    your preferences, statistics, and reading history. You can use this for backup or to import later.`
  },
  {
    question: "What are 'Ignored Sources'?",
    answer: `The Ignored Sources section lists outlets flagged as having extreme bias, low factual 
    reporting, or conspiracy content. Articles from these sources can be auto-filtered from your feed, 
    or you can choose to include them with a warning.`
  },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-ink/10 dark:border-paper/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium pr-4">{item.question}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="pb-4"
        >
          <p className="text-sm text-ink/70 dark:text-paper/70 leading-relaxed">
            {item.answer}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default function HelpView() {
  const [openFAQ, setOpenFAQ] = useState(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card text-center">
        <HelpCircle size={48} className="mx-auto mb-4 text-copper" />
        <h1 className="font-headline text-2xl font-bold mb-2">How to Use ProveIt</h1>
        <p className="text-ink/60 dark:text-paper/60">
          Your personal fact-checker and media bias tracker
        </p>
      </div>

      {/* Quick Start */}
      <div className="card">
        <h2 className="card-headline mb-4">Quick Start Guide</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4 p-3 bg-ink/5 dark:bg-paper/5 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 text-copper" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">1. Fact Check</h3>
              <p className="text-sm text-ink/60 dark:text-paper/60">
                Paste a URL or type a claim to verify. AI analyzes the content and provides 
                a verdict with confidence score.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-ink/5 dark:bg-paper/5 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
              <Newspaper className="w-5 h-5 text-copper" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">2. Read News</h3>
              <p className="text-sm text-ink/60 dark:text-paper/60">
                Browse headlines with bias ratings. Click any article to read it—your selection 
                is automatically tracked to calculate your lean score.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-ink/5 dark:bg-paper/5 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-copper" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">3. Track Your Stats</h3>
              <p className="text-sm text-ink/60 dark:text-paper/60">
                View your reading distribution, weekly trends, and top sources. See where 
                you fall on the political spectrum based on your media diet.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-ink/5 dark:bg-paper/5 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
              <EyeOff className="w-5 h-5 text-copper" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">4. Filter Fringe</h3>
              <p className="text-sm text-ink/60 dark:text-paper/60">
                Review sources flagged as extreme or low-credibility. Choose to auto-filter 
                them or include with warnings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Commitment */}
      <div className="card bg-forest/10 border border-forest/30">
        <div className="flex gap-4">
          <Shield className="w-8 h-8 text-forest flex-shrink-0" />
          <div>
            <h2 className="font-headline text-lg font-bold text-forest-dark dark:text-forest-light mb-2">
              Our Privacy Commitment
            </h2>
            <ul className="text-sm text-ink/70 dark:text-paper/70 space-y-2">
              <li>✓ <strong>Local-first:</strong> All data stored in your browser</li>
              <li>✓ <strong>No tracking:</strong> We don't follow you across the web</li>
              <li>✓ <strong>No selling:</strong> Your data is never shared or monetized</li>
              <li>✓ <strong>You control:</strong> Export or delete your data anytime</li>
              <li>✓ <strong>Transparent:</strong> Open about our methods and sources</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Portability */}
      <div className="card">
        <h2 className="card-headline flex items-center gap-2 mb-4">
          <Download size={18} className="text-copper" />
          Data Portability
        </h2>
        <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">
          ProveIt lets you export and import your data. Your export file includes:
        </p>
        <ul className="text-sm space-y-2 mb-4">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            Your preferences (theme, tracking settings)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            Aggregated statistics (lean score, distribution)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            Reading history (up to 1,000 entries)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            Summary report for quick reference
          </li>
        </ul>
        <p className="text-xs text-ink/40 dark:text-paper/40">
          Go to Settings → Privacy & Data to export or import.
        </p>
      </div>

      {/* FAQ */}
      <div className="card">
        <h2 className="card-headline mb-4">Frequently Asked Questions</h2>
        
        <div>
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openFAQ === index}
              onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
            />
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="card">
        <h2 className="card-headline mb-4">Resources & References</h2>
        
        <div className="space-y-3">
          <a 
            href="https://mediabiasfactcheck.com/methodology/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-ink/5 dark:bg-paper/5 rounded-lg hover:bg-copper/10 transition-colors"
          >
            <span className="font-medium">Media Bias/Fact Check Methodology</span>
            <ExternalLink size={16} className="text-copper" />
          </a>
          
          <a 
            href="https://constitution.congress.gov/constitution/amendment-1/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-ink/5 dark:bg-paper/5 rounded-lg hover:bg-copper/10 transition-colors"
          >
            <span className="font-medium">First Amendment (Full Text)</span>
            <ExternalLink size={16} className="text-copper" />
          </a>
          
          <a 
            href="https://www.supremecourt.gov/about/biographies.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-ink/5 dark:bg-paper/5 rounded-lg hover:bg-copper/10 transition-colors"
          >
            <span className="font-medium">U.S. Supreme Court Justices</span>
            <ExternalLink size={16} className="text-copper" />
          </a>
        </div>
      </div>

      {/* Version */}
      <div className="text-center text-xs text-ink/30 dark:text-paper/30">
        <p>ProveIt v2.3.0 • Personal Edition</p>
        <p className="italic font-headline mt-1">"Veritas Lux" — Truth is Light</p>
      </div>
    </div>
  )
}
