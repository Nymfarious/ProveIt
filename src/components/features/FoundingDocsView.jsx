import { useState } from 'react'
import { BookOpen, ExternalLink, ChevronDown, ChevronUp, FileText, Scale, Users, Info, Scroll, AlertTriangle, Search, History, Globe, Feather, Shield, Flag, Vote } from 'lucide-react'

// POLITICAL PARTIES - Mission Statements/Platforms
const POLITICAL_PARTIES = {
  title: 'Major Political Parties',
  description: 'Official platforms and "what we believe" statements from major U.S. political parties.',
  parties: [
    {
      name: 'Democratic Party',
      color: 'blue',
      beliefs: [
        'Healthcare should be accessible and affordable for all Americans',
        'Strong support for workers\' rights and unions',
        'Climate change is an urgent threat requiring government action',
        'Support for civil rights, voting rights, and social equality',
        'Government programs can help reduce poverty and inequality',
      ],
      platformUrl: 'https://democrats.org/where-we-stand/',
      officialUrl: 'https://democrats.org',
    },
    {
      name: 'Republican Party',
      color: 'red',
      beliefs: [
        'Lower taxes and limited government promote economic growth',
        'Strong national defense and border security',
        'Second Amendment rights should be protected',
        'Free market solutions over government programs',
        'Traditional values and religious liberty',
      ],
      platformUrl: 'https://www.gop.com/platform/',
      officialUrl: 'https://www.gop.com',
    },
    {
      name: 'Libertarian Party',
      color: 'gold',
      beliefs: [
        'Maximum individual liberty in both personal and economic matters',
        'Minimal government intervention in daily life',
        'Free markets without subsidies or bailouts',
        'Non-interventionist foreign policy',
        'Civil liberties protection across the board',
      ],
      platformUrl: 'https://www.lp.org/platform/',
      officialUrl: 'https://www.lp.org',
    },
    {
      name: 'Green Party',
      color: 'green',
      beliefs: [
        'Ecological wisdom and environmental sustainability',
        'Social justice and equal opportunity',
        'Grassroots democracy and decentralization',
        'Non-violence and peace',
        'Community-based economics',
      ],
      platformUrl: 'https://www.gp.org/platform',
      officialUrl: 'https://www.gp.org',
    },
    {
      name: 'Constitution Party',
      color: 'purple',
      beliefs: [
        'Strict interpretation of the Constitution',
        'States\' rights and limited federal power',
        'Pro-life policies',
        'Abolition of the Federal Reserve',
        'Non-interventionist foreign policy',
      ],
      platformUrl: 'https://www.constitutionparty.com/our-principles/',
      officialUrl: 'https://www.constitutionparty.com',
    },
  ],
  project2025: {
    title: 'About Project 2025',
    description: 'A policy blueprint published by the Heritage Foundation for a potential conservative administration.',
    credibleSources: [
      { name: 'Project 2025 Official Site (Heritage Foundation)', url: 'https://www.project2025.org' },
      { name: 'Read the Full Document (PDF)', url: 'https://www.project2025.org/playbook/' },
      { name: 'AP News Explainer', url: 'https://apnews.com/article/project-2025-trump-heritage-foundation' },
      { name: 'Reuters Fact Check', url: 'https://www.reuters.com/world/us/what-is-project-2025/' },
      { name: 'Ballotpedia Overview', url: 'https://ballotpedia.org/Project_2025' },
    ],
    note: 'ProveIt recommends reading primary sources and cross-referencing with nonpartisan fact-checkers.',
  },
}

// FEDERALIST PAPERS - Expanded to 8 with 9th grade explanations
const FEDERALIST_PAPERS = {
  title: 'The Federalist Papers',
  years: '1787-1788',
  count: 85,
  authors: [
    { name: 'Alexander Hamilton', essays: '51 essays', focus: 'Executive power, judiciary, taxation, military' },
    { name: 'James Madison', essays: '29 essays', focus: 'Republican government, separation of powers, federalism' },
    { name: 'John Jay', essays: '5 essays', focus: 'Foreign affairs, treaties' },
  ],
  summary: 'A series of 85 essays written to persuade New York to ratify the Constitution. Published under the pseudonym "Publius," they remain the most authoritative explanation of the Constitution\'s meaning and intent.',
  keyEssays: [
    {
      number: 1,
      author: 'Hamilton',
      title: 'Introduction',
      tldr: 'The stakes couldn\'t be higher—we\'re deciding whether good government can come from choice, not accident or force.',
      ninthGrade: 'Hamilton says this is a huge moment in history. Can people actually choose their own government that works well? Or do governments only happen by luck or by someone forcing them on people? America is the experiment to find out. If we mess this up, it might prove that humans can\'t govern themselves.',
      famousQuote: '"It has been frequently remarked that it seems to have been reserved to the people of this country... to decide the important question, whether societies of men are really capable or not of establishing good government from reflection and choice."',
    },
    {
      number: 2,
      author: 'Jay',
      title: 'Dangers from Foreign Force',
      tldr: 'We\'re safer together. Thirteen separate countries would invite foreign powers to pick us apart.',
      ninthGrade: 'John Jay says imagine if we broke into 13 separate little countries. Britain, France, and Spain would love that—they could play us against each other. But united, we\'re too big and strong. It\'s like how a family is safer together than if each kid lived alone.',
      famousQuote: '"Providence has been pleased to give this one connected country to one united people."',
    },
    {
      number: 10,
      author: 'Madison',
      title: 'Factions',
      tldr: 'A big republic is actually better at controlling selfish groups than a small one.',
      ninthGrade: 'Madison knows people form groups (factions) to push their own interests, sometimes unfairly. You can\'t stop people from having different opinions—that would be like removing air to prevent fire. But in a BIG country with MANY groups, no single group can bully everyone else. They have to compromise. It\'s safer than a small town where one clique can take over.',
      famousQuote: '"The latent causes of faction are thus sown in the nature of man."',
    },
    {
      number: 39,
      author: 'Madison',
      title: 'Republican Government',
      tldr: 'Yes, the new Constitution is actually republican (power from the people), not some sneaky monarchy.',
      ninthGrade: 'Some people worried the Constitution would create a king in disguise. Madison explains: everything in this government comes from the people. Representatives are elected, not born into power. Power is limited and checked. This is definitely a republic—government by elected representatives, not a dictatorship.',
      famousQuote: '"We may define a republic to be... a government which derives all its powers directly or indirectly from the great body of the people."',
    },
    {
      number: 51,
      author: 'Madison',
      title: 'Separation of Powers',
      tldr: 'Don\'t trust anyone with too much power. Make the branches check each other.',
      ninthGrade: 'This is maybe the most famous Federalist paper. Madison says: if people were perfect angels, we wouldn\'t need government. But we\'re not. So we set up government where each part (Congress, President, Courts) can stop the others from going too far. It\'s like rock-paper-scissors—nobody always wins. "Ambition must be made to counteract ambition."',
      famousQuote: '"If men were angels, no government would be necessary."',
    },
    {
      number: 70,
      author: 'Hamilton',
      title: 'Executive Energy',
      tldr: 'One President, not a committee. Decisive leadership requires a single person in charge.',
      ninthGrade: 'Some wanted multiple presidents or a council. Hamilton says no way—that leads to endless arguing while nothing gets done. In emergencies, you need ONE person who can act fast and be held responsible. If things go wrong, we know exactly who to blame. With a committee, they\'d just point fingers at each other.',
      famousQuote: '"Energy in the Executive is a leading character in the definition of good government."',
    },
    {
      number: 78,
      author: 'Hamilton',
      title: 'Judicial Review',
      tldr: 'Courts are the weakest branch, but they MUST be able to strike down unconstitutional laws.',
      ninthGrade: 'Hamilton calls the judiciary the "least dangerous branch" because it has no army (like the President) or money control (like Congress). But it has one superpower: it can say "this law violates the Constitution, so it\'s invalid." This protects your rights even if Congress passes a bad law. This idea became the basis for Marbury v. Madison (1803).',
      famousQuote: '"The judiciary... has no influence over either the sword or the purse... it may truly be said to have neither FORCE nor WILL, but merely judgment."',
    },
    {
      number: 84,
      author: 'Hamilton',
      title: 'Against a Bill of Rights',
      tldr: 'A bill of rights might actually be dangerous—what if we forget to list a right?',
      ninthGrade: 'This one\'s controversial! Hamilton argued AGAINST adding a Bill of Rights. His logic: if we list specific rights, it might imply those are the ONLY rights we have. What if we forget one? Also, why list things the government can\'t do when we never gave it that power anyway? The 9th Amendment later addressed this concern: "just because we didn\'t list a right doesn\'t mean you don\'t have it."',
      famousQuote: '"Why declare that things shall not be done which there is no power to do?"',
    },
  ],
  antifederalistResponse: {
    title: 'Anti-Federalist Papers',
    description: 'Responses by "Brutus," "Cato," "Federal Farmer" and others arguing for states\' rights and a bill of rights.',
    keyArguments: [
      'Federal government too powerful',
      'No bill of rights to protect individuals',
      'President could become a king',
      'Federal courts would overpower state courts',
    ],
  },
  resources: [
    { name: 'Library of Congress - Federalist Papers', url: 'https://guides.loc.gov/federalist-papers' },
    { name: 'Yale Law - Avalon Project (Full Text)', url: 'https://avalon.law.yale.edu/subject_menus/fed.asp' },
    { name: 'Constitution Center', url: 'https://constitutioncenter.org/the-constitution/historic-document-library/detail/the-federalist-papers' },
  ],
}

// ENGLISH BILL OF RIGHTS (1689)
const ENGLISH_BILL_OF_RIGHTS = {
  title: 'English Bill of Rights',
  year: '1689',
  fullTitle: 'An Act Declaring the Rights and Liberties of the Subject and Settling the Succession of the Crown',
  religiousContext: {
    background: 'Protestant document following the Glorious Revolution',
    explanation: 'When Catholic King James II tried to promote Catholicism and rule without Parliament, English nobles invited Protestant William of Orange (from the Netherlands) and his wife Mary (James\'s daughter) to take the throne. This "Glorious Revolution" was bloodless in England. Parliament then wrote this Bill of Rights to limit royal power forever.',
    keyCatholicProtestantIssue: 'The Bill specifically banned Catholics from the throne and required monarchs to be Protestant. This reflected centuries of religious conflict in England.',
  },
  summary: 'A foundational document that limited the power of the English monarchy and established Parliament\'s supremacy. Many of its principles were adopted almost word-for-word in the U.S. Bill of Rights.',
  keyProvisions: [
    { provision: 'No royal interference with law', americanInfluence: 'Separation of powers' },
    { provision: 'No taxation without Parliament\'s consent', americanInfluence: '"No taxation without representation"' },
    { provision: 'Freedom to petition the monarch', americanInfluence: '1st Amendment right to petition' },
    { provision: 'No standing army in peacetime without consent', americanInfluence: '3rd Amendment, distrust of standing armies' },
    { provision: 'Right to bear arms for Protestants', americanInfluence: '2nd Amendment (broadened to all citizens)' },
    { provision: 'Free elections and free speech in Parliament', americanInfluence: '1st Amendment, Congressional immunity' },
    { provision: 'No excessive bail or cruel punishment', americanInfluence: '8th Amendment (nearly identical wording)' },
    { provision: 'Right to jury trial', americanInfluence: '6th and 7th Amendments' },
  ],
  resources: [
    { name: 'UK Parliament - Bill of Rights 1689', url: 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/collections1/collections-glorious-revolution/billofrights/' },
    { name: 'Yale Avalon Project - Full Text', url: 'https://avalon.law.yale.edu/17th_century/england.asp' },
    { name: 'British Library', url: 'https://www.bl.uk/collection-items/the-bill-of-rights' },
  ],
}

// EMANCIPATION PROCLAMATION
const EMANCIPATION_PROCLAMATION = {
  title: 'Emancipation Proclamation',
  year: '1863',
  issuedBy: 'President Abraham Lincoln',
  summary: 'Executive order that declared slaves in Confederate states "forever free." A crucial step toward the 13th Amendment\'s total abolition of slavery.',
  whatItDid: [
    'Declared slaves in rebelling states to be free',
    'Allowed Black men to serve in the Union Army and Navy',
    'Changed the war\'s purpose from "preserve the Union" to "end slavery"',
    'Did NOT free slaves in border states loyal to the Union (strategic decision)',
  ],
  whatItDidNot: [
    'Did not immediately free any slaves (only applied to Confederate territory Lincoln didn\'t control)',
    'Did not abolish slavery everywhere (that required the 13th Amendment in 1865)',
    'Did not grant citizenship or voting rights (that came with 14th and 15th Amendments)',
  ],
  famousQuote: '"All persons held as slaves within any State or designated part of a State, the people whereof shall then be in rebellion against the United States, shall be then, thenceforward, and forever free."',
  historicalContext: 'Lincoln waited until the Union won a battle (Antietam) so it wouldn\'t look like a desperate move. It kept Britain and France from supporting the Confederacy—they couldn\'t back a slave nation after this.',
  resources: [
    { name: 'National Archives (Full Text + Image)', url: 'https://www.archives.gov/exhibits/featured-documents/emancipation-proclamation' },
    { name: 'Library of Congress', url: 'https://www.loc.gov/item/scsm000512/' },
  ],
}

// BILL OF RIGHTS HISTORY
const BILL_OF_RIGHTS_HISTORY = {
  title: 'The Bill of Rights: Three Attempts',
  summary: 'The Bill of Rights wasn\'t part of the original Constitution. It took three attempts and fierce debate.',
  attempts: [
    { attempt: 1, year: '1787', title: 'Constitutional Convention - Rejected', description: 'George Mason proposed adding a bill of rights. Defeated 10-0.', outcome: 'REJECTED', whyFailed: 'Delegates were tired; feared listing rights might imply unlisted rights don\'t exist.' },
    { attempt: 2, year: '1787-1788', title: 'Ratification Debates - Promised', description: 'Anti-Federalists demanded it. Federalists promised to add one if Constitution ratified.', outcome: 'CONDITIONAL', keyDifference: 'States submitted 200+ proposed amendments.' },
    { attempt: 3, year: '1789-1791', title: 'First Congress - RATIFIED', description: 'Madison introduced 19 amendments. House: 17. Senate: 12. States ratified: 10.', outcome: 'RATIFIED', whatChanged: 'Drew from Virginia Declaration of Rights, state proposals, Enlightenment philosophy.' },
  ],
  resources: [
    { name: 'National Archives', url: 'https://www.archives.gov/founding-docs/bill-of-rights' },
    { name: 'Library of Congress', url: 'https://www.loc.gov/exhibits/creating-the-united-states/creating-the-bill-of-rights.html' },
  ],
}

// MAGNA CARTA
const MAGNA_CARTA = {
  title: 'Magna Carta (1215)',
  summary: 'Peace treaty between King John and rebellious barons that became the foundation of constitutional law.',
  keyPrinciples: [
    { clause: 'Clause 39', original: 'No free man shall be seized or imprisoned... except by lawful judgment of his peers or by the law of the land.', influence: '5th Amendment (due process), 6th Amendment (jury trial)' },
    { clause: 'Clause 40', original: 'To no one will we sell, refuse, or delay right or justice.', influence: '6th Amendment (speedy trial)' },
    { clause: 'Clause 12', original: 'No taxation without common consent of the realm.', influence: 'No taxation without representation' },
  ],
  resources: [
    { name: 'British Library', url: 'https://www.bl.uk/magna-carta' },
    { name: 'National Archives (UK)', url: 'https://www.nationalarchives.gov.uk/education/resources/magna-carta/' },
  ],
}

// ALL 27 AMENDMENTS (abbreviated for space)
const ALL_AMENDMENTS = [
  { number: 1, year: 1791, title: 'Religion, Speech, Press, Assembly, Petition', status: 'active' },
  { number: 2, year: 1791, title: 'Right to Bear Arms', status: 'active' },
  { number: 3, year: 1791, title: 'Quartering of Soldiers', status: 'active' },
  { number: 4, year: 1791, title: 'Search and Seizure', status: 'active' },
  { number: 5, year: 1791, title: 'Grand Jury, Double Jeopardy, Self-Incrimination', status: 'active' },
  { number: 6, year: 1791, title: 'Speedy Trial, Witnesses, Counsel', status: 'active' },
  { number: 7, year: 1791, title: 'Civil Trial by Jury', status: 'active' },
  { number: 8, year: 1791, title: 'Excessive Bail, Cruel Punishment', status: 'active' },
  { number: 9, year: 1791, title: 'Rights Retained by People', status: 'active' },
  { number: 10, year: 1791, title: 'Powers Reserved to States', status: 'active' },
  { number: 11, year: 1795, title: 'Suits Against States', status: 'active' },
  { number: 12, year: 1804, title: 'Election of President/VP', status: 'active' },
  { number: 13, year: 1865, title: 'Abolition of Slavery', status: 'active' },
  { number: 14, year: 1868, title: 'Citizenship, Due Process, Equal Protection', status: 'active' },
  { number: 15, year: 1870, title: 'Voting Rights (Race)', status: 'active' },
  { number: 16, year: 1913, title: 'Income Tax', status: 'active' },
  { number: 17, year: 1913, title: 'Direct Election of Senators', status: 'active' },
  { number: 18, year: 1919, title: 'Prohibition', status: 'REPEALED' },
  { number: 19, year: 1920, title: 'Women\'s Suffrage', status: 'active' },
  { number: 20, year: 1933, title: 'Presidential Terms', status: 'active' },
  { number: 21, year: 1933, title: 'Repeal of Prohibition', status: 'active' },
  { number: 22, year: 1951, title: 'Presidential Term Limits', status: 'active' },
  { number: 23, year: 1961, title: 'D.C. Electoral Votes', status: 'active' },
  { number: 24, year: 1964, title: 'Abolition of Poll Tax', status: 'active' },
  { number: 25, year: 1967, title: 'Presidential Succession', status: 'active' },
  { number: 26, year: 1971, title: 'Voting Age (18)', status: 'active' },
  { number: 27, year: 1992, title: 'Congressional Compensation', status: 'active' },
]

export default function FoundingDocsView() {
  const [activeDoc, setActiveDoc] = useState('overview')
  const [expandedSection, setExpandedSection] = useState(null)

  const documents = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'parties', label: 'Political Parties', icon: Vote },
    { id: 'magnacarta', label: 'Magna Carta', icon: Globe },
    { id: 'english1689', label: 'English Bill 1689', icon: Shield },
    { id: 'federalist', label: 'Federalist Papers', icon: Feather },
    { id: 'billhistory', label: 'Bill of Rights', icon: History },
    { id: 'emancipation', label: 'Emancipation', icon: Flag },
    { id: 'amendments', label: 'Amendments', icon: Scale },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-copper/10">
            <BookOpen size={24} className="text-copper" />
          </div>
          <div>
            <h2 className="font-headline text-xl font-semibold text-ink dark:text-paper">Founding Documents & Civics</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              From Magna Carta to modern political parties
            </p>
          </div>
        </div>
      </div>

      {/* Research Mode Teaser */}
      <div className="p-3 rounded-lg bg-steel/10 border border-steel/20 flex items-center gap-2">
        <Search size={16} className="text-steel" />
        <span className="text-xs text-ink/60 dark:text-paper/60">
          Use <strong className="text-ink dark:text-paper">Research Mode</strong> (coming soon) for safe comparison of sources and interpretations.
        </span>
      </div>

      {/* Document Selector */}
      <div className="flex flex-wrap gap-2">
        {documents.map((doc) => {
          const Icon = doc.icon
          return (
            <button
              key={doc.id}
              onClick={() => { setActiveDoc(doc.id); setExpandedSection(null) }}
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                activeDoc === doc.id 
                  ? 'bg-copper text-white' 
                  : 'bg-ink/5 dark:bg-paper/5 text-ink dark:text-paper hover:bg-ink/10 dark:hover:bg-paper/10'
              }`}
            >
              <Icon size={16} />
              {doc.label}
            </button>
          )
        })}
      </div>

      {/* OVERVIEW */}
      {activeDoc === 'overview' && (
        <div className="card">
          <h3 className="card-headline mb-4 text-ink dark:text-paper">The Chain of Liberty</h3>
          <div className="space-y-3">
            {[
              { year: '1215', title: 'Magna Carta', desc: 'Rule of law over kings' },
              { year: '1689', title: 'English Bill of Rights', desc: 'Protestant limits on monarchy' },
              { year: '1776', title: 'Declaration of Independence', desc: 'Natural rights, revolution' },
              { year: '1787-88', title: 'Federalist Papers', desc: '85 essays defending Constitution' },
              { year: '1791', title: 'Bill of Rights', desc: 'First 10 amendments' },
              { year: '1863', title: 'Emancipation Proclamation', desc: 'Slaves in rebellion states freed' },
              { year: '1865', title: '13th Amendment', desc: 'Slavery abolished' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
                <span className="font-bold text-copper">{item.year}</span>
                <div>
                  <p className="font-semibold text-ink dark:text-paper">{item.title}</p>
                  <p className="text-sm text-ink/60 dark:text-paper/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* POLITICAL PARTIES */}
      {activeDoc === 'parties' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
              <Vote size={18} className="text-copper" />
              Major Political Parties
            </h3>
            <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">Official platforms from each party's own website.</p>

            <div className="space-y-4">
              {POLITICAL_PARTIES.parties.map((party) => (
                <div key={party.name} className={`p-4 rounded-lg border-l-4 ${
                  party.color === 'blue' ? 'border-blue-500 bg-blue-500/10' :
                  party.color === 'red' ? 'border-red-500 bg-red-500/10' :
                  party.color === 'gold' ? 'border-yellow-500 bg-yellow-500/10' :
                  party.color === 'green' ? 'border-green-500 bg-green-500/10' :
                  'border-purple-500 bg-purple-500/10'
                }`}>
                  <h4 className="font-semibold text-ink dark:text-paper mb-2">{party.name}</h4>
                  <p className="text-xs font-medium text-ink/60 dark:text-paper/60 mb-2">Key Beliefs:</p>
                  <ul className="space-y-1 mb-3">
                    {party.beliefs.map((belief, i) => (
                      <li key={i} className="text-sm text-ink/70 dark:text-paper/70 flex items-start gap-2">
                        <span className="text-copper">•</span> {belief}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3">
                    <a href={party.platformUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-copper hover:underline flex items-center gap-1">
                      <FileText size={12} /> Official Platform
                    </a>
                    <a href={party.officialUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-steel hover:underline flex items-center gap-1">
                      <ExternalLink size={12} /> Website
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project 2025 Section */}
          <div className="card border-copper/30">
            <h3 className="card-headline flex items-center gap-2 mb-3 text-ink dark:text-paper">
              <Info size={18} className="text-copper" />
              {POLITICAL_PARTIES.project2025.title}
            </h3>
            <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">{POLITICAL_PARTIES.project2025.description}</p>
            
            <div className="p-3 rounded-lg bg-forest/10 border border-forest/20 mb-4">
              <p className="text-xs text-forest">{POLITICAL_PARTIES.project2025.note}</p>
            </div>

            <h4 className="font-semibold text-sm text-ink dark:text-paper mb-2">Credible Sources:</h4>
            <div className="space-y-2">
              {POLITICAL_PARTIES.project2025.credibleSources.map((source, i) => (
                <a key={i} href={source.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-steel hover:text-copper">
                  <ExternalLink size={12} /> {source.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MAGNA CARTA */}
      {activeDoc === 'magnacarta' && (
        <div className="card">
          <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
            <Globe size={18} className="text-copper" />
            {MAGNA_CARTA.title}
          </h3>
          <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">{MAGNA_CARTA.summary}</p>

          <div className="space-y-3 mb-4">
            {MAGNA_CARTA.keyPrinciples.map((p, i) => (
              <div key={i} className="p-3 rounded-lg border border-ink/10 dark:border-paper/10">
                <p className="text-xs text-copper font-mono">{p.clause}</p>
                <p className="text-sm italic text-ink/70 dark:text-paper/70 my-1">"{p.original}"</p>
                <p className="text-sm text-forest">→ {p.influence}</p>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-sm text-ink dark:text-paper mb-2">Resources:</h4>
          {MAGNA_CARTA.resources.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-steel hover:text-copper mb-1">
              <ExternalLink size={12} /> {r.name}
            </a>
          ))}
        </div>
      )}

      {/* ENGLISH BILL OF RIGHTS 1689 */}
      {activeDoc === 'english1689' && (
        <div className="card">
          <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
            <Shield size={18} className="text-copper" />
            {ENGLISH_BILL_OF_RIGHTS.title} ({ENGLISH_BILL_OF_RIGHTS.year})
          </h3>

          <div className="p-3 rounded-lg bg-copper/10 border border-copper/20 mb-4">
            <h4 className="font-semibold text-copper mb-1">{ENGLISH_BILL_OF_RIGHTS.religiousContext.background}</h4>
            <p className="text-sm text-ink/70 dark:text-paper/70 mb-2">{ENGLISH_BILL_OF_RIGHTS.religiousContext.explanation}</p>
            <p className="text-xs text-copper/80"><strong>Key Issue:</strong> {ENGLISH_BILL_OF_RIGHTS.religiousContext.keyCatholicProtestantIssue}</p>
          </div>

          <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">{ENGLISH_BILL_OF_RIGHTS.summary}</p>

          <h4 className="font-semibold text-sm text-ink dark:text-paper mb-3">Provisions → American Influence</h4>
          <div className="space-y-2 mb-4">
            {ENGLISH_BILL_OF_RIGHTS.keyProvisions.map((p, i) => (
              <div key={i} className="flex justify-between p-2 rounded-lg bg-ink/5 dark:bg-paper/5 text-sm">
                <span className="text-ink dark:text-paper">{p.provision}</span>
                <span className="text-forest">→ {p.americanInfluence}</span>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-sm text-ink dark:text-paper mb-2">Resources:</h4>
          {ENGLISH_BILL_OF_RIGHTS.resources.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-steel hover:text-copper mb-1">
              <ExternalLink size={12} /> {r.name}
            </a>
          ))}
        </div>
      )}

      {/* FEDERALIST PAPERS - 8 Essays with 9th Grade Explanations */}
      {activeDoc === 'federalist' && (
        <div className="card">
          <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
            <Feather size={18} className="text-copper" />
            {FEDERALIST_PAPERS.title}
          </h3>
          <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">{FEDERALIST_PAPERS.summary}</p>

          <div className="grid sm:grid-cols-3 gap-2 mb-4">
            {FEDERALIST_PAPERS.authors.map((a, i) => (
              <div key={i} className="p-2 rounded-lg bg-ink/5 dark:bg-paper/5 text-center">
                <p className="font-semibold text-copper text-sm">{a.name}</p>
                <p className="text-xs text-ink/50 dark:text-paper/50">{a.essays}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-forest/10 border border-forest/20 mb-4 flex items-center gap-2">
            <Users size={16} className="text-forest" />
            <span className="text-sm text-forest font-medium">9th Grade Reading Level explanations included</span>
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-3">8 Key Essays</h4>
          <div className="space-y-3">
            {FEDERALIST_PAPERS.keyEssays.map((essay) => (
              <div key={essay.number} className="border border-ink/10 dark:border-paper/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === `fed${essay.number}` ? null : `fed${essay.number}`)}
                  className="w-full p-3 text-left hover:bg-ink/5 dark:hover:bg-paper/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-copper/20 text-copper px-2 py-0.5 rounded">#{essay.number}</span>
                      <span className="font-semibold text-ink dark:text-paper">{essay.title}</span>
                      <span className="text-xs text-ink/40 dark:text-paper/40">({essay.author})</span>
                    </div>
                    {expandedSection === `fed${essay.number}` ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  <p className="text-sm text-ink/60 dark:text-paper/60 mt-1">{essay.tldr}</p>
                </button>

                {expandedSection === `fed${essay.number}` && (
                  <div className="px-3 pb-3 space-y-3">
                    <div className="p-3 rounded-lg bg-forest/10 border border-forest/20">
                      <p className="text-xs text-forest font-semibold mb-1">📚 9th Grade Explanation:</p>
                      <p className="text-sm text-ink/80 dark:text-paper/80">{essay.ninthGrade}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 border-l-4 border-copper">
                      <p className="text-xs text-copper font-semibold mb-1">Famous Quote:</p>
                      <p className="text-sm italic text-ink/70 dark:text-paper/70">{essay.famousQuote}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mt-4 mb-2">Resources:</h4>
          {FEDERALIST_PAPERS.resources.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-steel hover:text-copper mb-1">
              <ExternalLink size={12} /> {r.name}
            </a>
          ))}
        </div>
      )}

      {/* BILL OF RIGHTS HISTORY */}
      {activeDoc === 'billhistory' && (
        <div className="card">
          <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
            <History size={18} className="text-copper" />
            {BILL_OF_RIGHTS_HISTORY.title}
          </h3>
          <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">{BILL_OF_RIGHTS_HISTORY.summary}</p>

          <div className="space-y-3 mb-4">
            {BILL_OF_RIGHTS_HISTORY.attempts.map((a) => (
              <div key={a.attempt} className={`p-3 rounded-lg border-2 ${
                a.outcome === 'RATIFIED' ? 'border-forest bg-forest/5' :
                a.outcome === 'REJECTED' ? 'border-burgundy bg-burgundy/5' :
                'border-copper bg-copper/5'
              }`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    a.outcome === 'RATIFIED' ? 'bg-forest text-white' :
                    a.outcome === 'REJECTED' ? 'bg-burgundy text-white' :
                    'bg-copper text-white'
                  }`}>Attempt {a.attempt}: {a.outcome}</span>
                  <span className="text-xs text-ink/50 dark:text-paper/50">{a.year}</span>
                </div>
                <p className="font-semibold text-ink dark:text-paper">{a.title}</p>
                <p className="text-sm text-ink/70 dark:text-paper/70">{a.description}</p>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-2">Resources:</h4>
          {BILL_OF_RIGHTS_HISTORY.resources.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-steel hover:text-copper mb-1">
              <ExternalLink size={12} /> {r.name}
            </a>
          ))}
        </div>
      )}

      {/* EMANCIPATION PROCLAMATION */}
      {activeDoc === 'emancipation' && (
        <div className="card">
          <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
            <Flag size={18} className="text-copper" />
            {EMANCIPATION_PROCLAMATION.title} ({EMANCIPATION_PROCLAMATION.year})
          </h3>
          <p className="text-sm text-ink/60 dark:text-paper/60 mb-2">Issued by {EMANCIPATION_PROCLAMATION.issuedBy}</p>
          <p className="text-sm text-ink/70 dark:text-paper/70 mb-4">{EMANCIPATION_PROCLAMATION.summary}</p>

          <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 border-l-4 border-copper mb-4">
            <p className="text-sm italic text-ink/70 dark:text-paper/70">{EMANCIPATION_PROCLAMATION.famousQuote}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-forest text-sm mb-2">What It Did:</h4>
              <ul className="space-y-1">
                {EMANCIPATION_PROCLAMATION.whatItDid.map((item, i) => (
                  <li key={i} className="text-sm text-ink/70 dark:text-paper/70 flex items-start gap-2">
                    <span className="text-forest">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-burgundy text-sm mb-2">What It Did NOT Do:</h4>
              <ul className="space-y-1">
                {EMANCIPATION_PROCLAMATION.whatItDidNot.map((item, i) => (
                  <li key={i} className="text-sm text-ink/70 dark:text-paper/70 flex items-start gap-2">
                    <span className="text-burgundy">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-steel/10 border border-steel/20 mb-4">
            <p className="text-xs text-ink/60 dark:text-paper/60"><strong className="text-ink dark:text-paper">Historical Context:</strong> {EMANCIPATION_PROCLAMATION.historicalContext}</p>
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-2">Resources:</h4>
          {EMANCIPATION_PROCLAMATION.resources.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-steel hover:text-copper mb-1">
              <ExternalLink size={12} /> {r.name}
            </a>
          ))}
        </div>
      )}

      {/* ALL 27 AMENDMENTS */}
      {activeDoc === 'amendments' && (
        <div className="card">
          <h3 className="card-headline flex items-center gap-2 mb-4 text-ink dark:text-paper">
            <Scale size={18} className="text-copper" />
            All 27 Amendments
          </h3>
          <div className="space-y-2 max-h-[50vh] overflow-y-auto">
            {ALL_AMENDMENTS.map((a) => (
              <div key={a.number} className={`flex items-center justify-between p-2 rounded-lg ${
                a.status === 'REPEALED' ? 'bg-burgundy/10 border border-burgundy/30' : 'bg-ink/5 dark:bg-paper/5'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-copper">{a.number}</span>
                  <span className="text-sm text-ink dark:text-paper">{a.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ink/40 dark:text-paper/40">{a.year}</span>
                  {a.status === 'REPEALED' && <span className="text-[10px] bg-burgundy text-white px-1.5 py-0.5 rounded">REPEALED</span>}
                </div>
              </div>
            ))}
          </div>
          <a href="https://constitution.congress.gov/constitution/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-copper hover:underline mt-4">
            <ExternalLink size={14} /> Full text on Congress.gov
          </a>
        </div>
      )}

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
