import { useState } from 'react'
import { BookOpen, ExternalLink, ChevronDown, ChevronUp, FileText, Scale, Users, Info, Scroll } from 'lucide-react'

// Founding documents data with layman's English explainers
const FOUNDING_DOCS = {
  declaration: {
    title: 'Declaration of Independence',
    year: '1776',
    icon: Scroll,
    thumbnail: '📜', // Would be image in production
    shortDesc: 'The document that announced America\'s independence from Britain.',
    sections: [
      {
        title: 'The Preamble (Introduction)',
        original: 'When in the Course of human events...',
        laymans: 'Sometimes a country needs to break away from another country. When that happens, they should explain why to the rest of the world.',
      },
      {
        title: 'Statement of Rights',
        original: 'We hold these truths to be self-evident...',
        laymans: 'These ideas should be obvious to everyone: All people are created equal. Everyone has rights that nobody can take away, like life, freedom, and the chance to be happy. Governments exist to protect these rights. If a government stops protecting them, the people can replace it.',
      },
      {
        title: 'List of Complaints',
        original: 'The history of the present King of Great Britain is a history of repeated injuries...',
        laymans: 'Here\'s everything King George III did wrong: He blocked fair laws. He taxed us without letting us vote. He sent soldiers to our homes. He cut off our trade. He took away our rights to trial by jury. (And about 20 more complaints!)',
      },
      {
        title: 'The Declaration Itself',
        original: 'We, therefore, the Representatives of the united States of America...',
        laymans: 'So we\'re officially done with Britain. We are now free and independent states. We can make alliances, trade, and do everything else free countries do. We pledge our lives, our fortunes, and our honor to this cause.',
      },
    ],
    resources: [
      { name: 'National Archives', url: 'https://www.archives.gov/founding-docs/declaration' },
      { name: 'Library of Congress', url: 'https://www.loc.gov/item/mtjbib000159/' },
    ],
  },
  constitution: {
    title: 'U.S. Constitution',
    year: '1787',
    icon: BookOpen,
    thumbnail: '📖',
    shortDesc: 'The supreme law of the United States that establishes our government structure.',
    sections: [
      {
        title: 'The Preamble',
        original: 'We the People of the United States...',
        laymans: 'We the people are creating this government to: form a better union, establish justice, keep peace, defend ourselves, promote everyone\'s well-being, and secure freedom for ourselves and future generations.',
      },
      {
        title: 'Article I - Congress',
        original: 'All legislative Powers herein granted...',
        laymans: 'Congress (the Senate and House of Representatives) makes the laws. The House has members based on state population, elected every 2 years. The Senate has 2 senators per state, elected every 6 years. Only Congress can declare war, collect taxes, and control spending.',
      },
      {
        title: 'Article II - The President',
        original: 'The executive Power shall be vested...',
        laymans: 'The President runs the government, commands the military, makes treaties (with Senate approval), and appoints judges and officials. They\'re elected every 4 years through the Electoral College. They can be removed through impeachment for serious crimes.',
      },
      {
        title: 'Article III - The Courts',
        original: 'The judicial Power of the United States...',
        laymans: 'The Supreme Court and lower federal courts interpret laws and decide if they follow the Constitution. Federal judges serve for life (unless impeached) so they can make decisions without political pressure.',
      },
      {
        title: 'Articles IV-VII',
        original: 'Full Faith and Credit...',
        laymans: 'States must respect each other\'s laws. New states can join. The Constitution is the highest law. It needed 9 of 13 states to approve it to take effect.',
      },
    ],
    resources: [
      { name: 'National Archives', url: 'https://www.archives.gov/founding-docs/constitution' },
      { name: 'Constitution Center', url: 'https://constitutioncenter.org/the-constitution' },
    ],
  },
  amendments: {
    title: 'Bill of Rights & Amendments',
    year: '1791-Present',
    icon: Scale,
    thumbnail: '⚖️',
    shortDesc: 'The first 10 amendments (Bill of Rights) plus 17 more that have been added over time.',
    sections: [
      {
        title: '1st Amendment',
        original: 'Congress shall make no law respecting an establishment of religion...',
        laymans: 'Freedom of religion, speech, press, peaceful protest, and asking the government to fix problems. The government can\'t pick an official religion or stop you from practicing yours.',
      },
      {
        title: '2nd Amendment',
        original: 'A well regulated Militia, being necessary...',
        laymans: 'The right to keep and bear arms. This is one of the most debated amendments regarding what limits, if any, are constitutional.',
      },
      {
        title: '4th Amendment',
        original: 'The right of the people to be secure...',
        laymans: 'Police need a warrant (with probable cause) to search your home, car, or belongings. Protects your privacy from unreasonable government intrusion.',
      },
      {
        title: '5th Amendment',
        original: 'No person shall be held to answer for a capital...',
        laymans: 'You can\'t be tried twice for the same crime. You don\'t have to testify against yourself ("pleading the Fifth"). The government can\'t take your property without fair payment.',
      },
      {
        title: '13th Amendment (1865)',
        original: 'Neither slavery nor involuntary servitude...',
        laymans: 'Abolished slavery everywhere in the United States. The only exception is punishment for a crime (prison labor).',
      },
      {
        title: '14th Amendment (1868)',
        original: 'All persons born or naturalized in the United States...',
        laymans: 'If you\'re born here, you\'re a citizen. States must give everyone equal protection under the law and can\'t take away life, liberty, or property without due process.',
      },
      {
        title: '15th, 19th, 26th Amendments',
        original: 'The right of citizens to vote...',
        laymans: '15th (1870): Can\'t deny voting based on race. 19th (1920): Women can vote. 26th (1971): 18-year-olds can vote.',
      },
    ],
    resources: [
      { name: 'National Archives', url: 'https://www.archives.gov/founding-docs/bill-of-rights' },
      { name: 'Congress.gov', url: 'https://constitution.congress.gov/constitution/' },
    ],
  },
}

export default function FoundingDocsView() {
  const [activeDoc, setActiveDoc] = useState('declaration')
  const [expandedSection, setExpandedSection] = useState(null)
  const [showResources, setShowResources] = useState(false)

  const doc = FOUNDING_DOCS[activeDoc]
  const DocIcon = doc.icon

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-copper/10">
            <BookOpen size={24} className="text-copper" />
          </div>
          <div>
            <h2 className="font-headline text-xl font-semibold">Founding Documents</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              America's core documents explained in plain English
            </p>
          </div>
        </div>
      </div>

      {/* Document Selector */}
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(FOUNDING_DOCS).map(([key, docData]) => {
          const Icon = docData.icon
          const isActive = activeDoc === key
          return (
            <button
              key={key}
              onClick={() => { setActiveDoc(key); setExpandedSection(null) }}
              className={`p-4 rounded-lg border-2 transition-all text-center ${
                isActive 
                  ? 'border-copper bg-copper/10' 
                  : 'border-ink/10 dark:border-paper/10 hover:border-copper/50'
              }`}
            >
              <div className="text-4xl mb-2">{docData.thumbnail}</div>
              <p className={`font-medium text-sm ${isActive ? 'text-copper' : ''}`}>
                {key === 'declaration' ? 'Declaration' : key === 'constitution' ? 'Constitution' : 'Amendments'}
              </p>
              <p className="text-xs text-ink/40 dark:text-paper/40">{docData.year}</p>
            </button>
          )
        })}
      </div>

      {/* Selected Document */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <DocIcon size={24} className="text-copper" />
          <div>
            <h3 className="font-headline text-lg font-semibold">{doc.title}</h3>
            <p className="text-sm text-ink/60 dark:text-paper/60">{doc.shortDesc}</p>
          </div>
        </div>

        {/* Grade Level Note */}
        <div className="p-3 rounded-lg bg-forest/10 border border-forest/20 mb-4">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-forest" />
            <span className="text-sm text-forest font-medium">Freshman U.S. History Level</span>
          </div>
          <p className="text-xs text-forest/70 mt-1">
            Explanations written for a general audience, not legal professionals.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {doc.sections.map((section, index) => (
            <div key={index} className="border border-ink/10 dark:border-paper/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                className="w-full p-4 text-left hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{section.title}</span>
                  {expandedSection === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {expandedSection === index && (
                <div className="px-4 pb-4 space-y-4">
                  {/* Original Text */}
                  <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 border-l-4 border-copper">
                    <p className="text-xs text-copper font-medium mb-1">Original Text (excerpt):</p>
                    <p className="text-sm italic text-ink/70 dark:text-paper/70">
                      "{section.original}"
                    </p>
                  </div>

                  {/* Layman's Explanation */}
                  <div className="p-3 rounded-lg bg-forest/10 border border-forest/20">
                    <p className="text-xs text-forest font-medium mb-1">In Plain English:</p>
                    <p className="text-sm text-ink/80 dark:text-paper/80">
                      {section.laymans}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Resources */}
        <div className="mt-6">
          <button
            onClick={() => setShowResources(!showResources)}
            className="flex items-center gap-2 text-sm text-copper hover:text-copper-dark"
          >
            <ExternalLink size={16} />
            Trusted Resources
            {showResources ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showResources && (
            <div className="mt-3 p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
              <p className="text-xs text-ink/50 dark:text-paper/50 mb-2">
                Read the full original documents and scholarly analysis:
              </p>
              <div className="space-y-2">
                {doc.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-steel hover:text-copper"
                  >
                    <FileText size={14} />
                    {resource.name}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Facts */}
      <div className="card">
        <h3 className="card-headline mb-4">Quick Facts</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
            <p className="text-2xl font-bold text-copper">56</p>
            <p className="text-xs text-ink/50">Signers of Declaration</p>
          </div>
          <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
            <p className="text-2xl font-bold text-copper">7</p>
            <p className="text-xs text-ink/50">Articles in Constitution</p>
          </div>
          <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
            <p className="text-2xl font-bold text-copper">27</p>
            <p className="text-xs text-ink/50">Total Amendments</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-lg bg-steel/10 border border-steel/20">
        <div className="flex items-start gap-2">
          <Info size={16} className="text-steel mt-0.5 flex-shrink-0" />
          <div className="text-xs text-ink/60 dark:text-paper/60">
            <p>These summaries are educational overviews, not legal interpretations. For legal matters, consult the full documents and qualified legal professionals.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 text-copper/30">
        <span>❧</span>
        <div className="w-8 h-px bg-current" />
        <span>✦</span>
        <div className="w-8 h-px bg-current" />
        <span>☙</span>
      </div>
    </div>
  )
}
