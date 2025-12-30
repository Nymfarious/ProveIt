import { useState } from 'react'
import { BookOpen, ExternalLink, ChevronDown, ChevronUp, FileText, Scale, Users, Info, Scroll, AlertTriangle, Search, History, Globe, Feather, Shield, Link } from 'lucide-react'

// BILL OF RIGHTS - THE THREE ATTEMPTS HISTORY
const BILL_OF_RIGHTS_HISTORY = {
  title: 'The Bill of Rights: Three Attempts',
  summary: 'The Bill of Rights wasn\'t part of the original Constitution. It took three attempts and fierce debate between Federalists and Anti-Federalists before the first 10 amendments were ratified.',
  attempts: [
    {
      attempt: 1,
      year: '1787',
      title: 'Constitutional Convention - Rejected',
      description: 'George Mason of Virginia proposed adding a bill of rights to the Constitution at the end of the Convention. The motion was defeated 10-0 by state delegations who felt it was unnecessary since the federal government only had enumerated (listed) powers.',
      outcome: 'REJECTED',
      keyFigures: ['George Mason (proposed)', 'Roger Sherman (opposed)'],
      whyFailed: 'Delegates were tired after months of debate, and many believed listing rights was dangerous—what if they forgot one?',
    },
    {
      attempt: 2,
      year: '1787-1788',
      title: 'Ratification Debates - Promised',
      description: 'During state ratification, Anti-Federalists (Patrick Henry, George Mason) demanded a bill of rights. Federalists (Madison, Hamilton) argued it was unnecessary but eventually promised to add one if states ratified the Constitution.',
      outcome: 'CONDITIONAL ACCEPTANCE',
      keyFigures: ['Patrick Henry (demanded)', 'James Madison (promised)', 'Alexander Hamilton'],
      keyDifference: 'Several states ratified only after receiving assurances that a bill of rights would be added. Massachusetts, Virginia, and New York submitted over 200 proposed amendments.',
    },
    {
      attempt: 3,
      year: '1789-1791',
      title: 'First Congress - RATIFIED',
      description: 'James Madison, honoring his promise, introduced 19 amendments to Congress. The House approved 17, the Senate reduced them to 12, and the states ratified 10 of those—becoming the Bill of Rights on December 15, 1791.',
      outcome: 'RATIFIED',
      keyFigures: ['James Madison (primary author)', 'Roger Sherman', 'Fisher Ames'],
      whatChanged: 'Madison drew from Virginia\'s Declaration of Rights (written by George Mason), state ratification proposals, and Enlightenment philosophy. The final version focused on individual liberties rather than structural changes.',
    },
  ],
  twoNotRatified: [
    { 
      title: 'Congressional Apportionment', 
      text: 'Would have required one representative per 50,000 people (never ratified)',
      note: 'Would make the House impossibly large today (~6,600 members)'
    },
    { 
      title: 'Congressional Compensation', 
      text: 'Pay changes can\'t take effect until after an election',
      note: 'Finally ratified in 1992 as the 27th Amendment—203 years later!'
    },
  ],
  resources: [
    { name: 'National Archives - Bill of Rights', url: 'https://www.archives.gov/founding-docs/bill-of-rights' },
    { name: 'Library of Congress - Creating the Bill of Rights', url: 'https://www.loc.gov/exhibits/creating-the-united-states/creating-the-bill-of-rights.html' },
    { name: 'Constitution Center - Bill of Rights', url: 'https://constitutioncenter.org/the-constitution/amendments' },
  ],
}

// MAGNA CARTA
const MAGNA_CARTA = {
  title: 'Magna Carta (1215)',
  year: '1215',
  origin: 'England',
  fullTitle: 'Magna Carta Libertatum (Great Charter of Freedoms)',
  summary: 'A peace treaty between King John and rebellious English barons that became the foundation of constitutional law. Many of its principles directly influenced the U.S. Constitution and Bill of Rights.',
  historicalContext: 'King John\'s heavy taxation, military failures, and conflicts with the Pope led English barons to rebel. They captured London and forced the King to negotiate at Runnymede.',
  keyPrinciples: [
    {
      clause: 'Clause 39',
      original: 'No free man shall be seized, imprisoned, dispossessed, outlawed, exiled, or ruined in any way... except by the lawful judgment of his peers or by the law of the land.',
      influence: '5th Amendment (due process), 6th Amendment (trial by jury)',
    },
    {
      clause: 'Clause 40',
      original: 'To no one will we sell, to no one will we refuse or delay, right or justice.',
      influence: '6th Amendment (speedy trial), Equal Protection',
    },
    {
      clause: 'Clause 12',
      original: 'No taxation without the common consent of the realm.',
      influence: 'No taxation without representation (Revolutionary rallying cry)',
    },
    {
      clause: 'Clause 20',
      original: 'A free man shall be amerced [fined] for a small offence only according to the degree of the offence.',
      influence: '8th Amendment (no excessive fines)',
    },
  ],
  timeline: [
    { year: 1215, event: 'Original Magna Carta signed at Runnymede (annulled within weeks by Pope)' },
    { year: 1216, event: 'Reissued after King John\'s death' },
    { year: 1217, event: 'Reissued again with revisions' },
    { year: 1225, event: 'Final "definitive" version issued by Henry III' },
    { year: 1297, event: 'Confirmed by Edward I and entered into statute law' },
    { year: 1776, event: 'Founders cite Magna Carta principles in Declaration' },
    { year: 1791, event: 'Bill of Rights incorporates Magna Carta concepts' },
  ],
  stillInForce: 'Three clauses remain in English law today: freedom of the English Church, the "ancient liberties" of London, and the right to due process.',
  resources: [
    { name: 'British Library - Magna Carta', url: 'https://www.bl.uk/magna-carta' },
    { name: 'National Archives (UK)', url: 'https://www.nationalarchives.gov.uk/education/resources/magna-carta/' },
    { name: 'Library of Congress - Magna Carta Legacy', url: 'https://www.loc.gov/exhibits/magna-carta-muse-and-mentor/' },
  ],
}

// FEDERALIST PAPERS
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
    { number: 10, author: 'Madison', title: 'Factions', summary: 'A large republic can control the dangers of factions (interest groups) better than a small one. Diversity of interests prevents any one group from dominating.' },
    { number: 51, author: 'Madison', title: 'Separation of Powers', summary: '"Ambition must be made to counteract ambition." Each branch must have means to check the others. "If men were angels, no government would be necessary."' },
    { number: 70, author: 'Hamilton', title: 'Executive Energy', summary: 'A single executive (President) is necessary for "energy" in government—decisiveness, secrecy, and accountability.' },
    { number: 78, author: 'Hamilton', title: 'Judicial Review', summary: 'The judiciary is the "least dangerous branch" but must have power to declare laws unconstitutional. Basis for Marbury v. Madison (1803).' },
    { number: 84, author: 'Hamilton', title: 'Against Bill of Rights', summary: 'Argued a bill of rights was unnecessary and potentially dangerous—listing some rights might imply others don\'t exist. (Later addressed by 9th Amendment)' },
  ],
  antifederalistResponse: {
    title: 'Anti-Federalist Papers',
    description: 'Responses by "Brutus," "Cato," "Federal Farmer" and others arguing for states\' rights and a bill of rights. Their concerns led to the Bill of Rights.',
    keyArguments: [
      'Federal government too powerful',
      'No bill of rights to protect individuals',
      'President could become a king',
      'Federal courts would overpower state courts',
    ],
  },
  resources: [
    { name: 'Library of Congress - Federalist Papers', url: 'https://guides.loc.gov/federalist-papers' },
    { name: 'Yale Law - Avalon Project', url: 'https://avalon.law.yale.edu/subject_menus/fed.asp' },
    { name: 'Constitution Center - Federalist Papers', url: 'https://constitutioncenter.org/the-constitution/historic-document-library/detail/the-federalist-papers' },
  ],
}

// ARTICLES OF CONFEDERATION
const ARTICLES_OF_CONFEDERATION = {
  title: 'Articles of Confederation',
  years: '1781-1789',
  summary: 'America\'s first constitution. Created a "firm league of friendship" between states but gave Congress almost no power. Its failures led directly to the Constitutional Convention.',
  keyWeaknesses: [
    { issue: 'No executive branch', consequence: 'No one to enforce laws or conduct foreign policy consistently' },
    { issue: 'No power to tax', consequence: 'Congress had to request money from states (who often refused)' },
    { issue: 'No power to regulate commerce', consequence: 'States imposed tariffs on each other, economic chaos' },
    { issue: 'Unanimous consent for amendments', consequence: 'Impossible to fix problems (all 13 states had to agree)' },
    { issue: 'One vote per state', consequence: 'Rhode Island had same power as Virginia' },
    { issue: 'No national judiciary', consequence: 'No way to resolve interstate disputes' },
  ],
  crises: [
    { name: 'Shays\' Rebellion (1786-87)', description: 'Farmers in Massachusetts rebelled over debt. Congress couldn\'t raise an army to respond. This crisis convinced many that a stronger government was needed.' },
    { name: 'Trade Wars', description: 'States taxed each other\'s goods. New York taxed New Jersey vegetables, New Jersey taxed New York firewood.' },
    { name: 'Worthless Currency', description: 'Each state printed its own money. Continental dollars became so worthless it spawned the phrase "not worth a Continental."' },
  ],
  resources: [
    { name: 'National Archives - Articles of Confederation', url: 'https://www.archives.gov/milestone-documents/articles-of-confederation' },
    { name: 'Library of Congress', url: 'https://www.loc.gov/item/90898154/' },
  ],
}

// MAYFLOWER COMPACT
const MAYFLOWER_COMPACT = {
  title: 'Mayflower Compact',
  year: '1620',
  summary: 'The first governing document of Plymouth Colony, signed by 41 male passengers on the Mayflower. Established the principle of self-government and majority rule in America.',
  significance: [
    'First written framework for self-government in the New World',
    'Established consent of the governed as basis for authority',
    'Created precedent for written constitutions',
    'Influenced later colonial charters and eventually the Constitution',
  ],
  fullText: 'In the name of God, Amen. We whose names are underwritten, the loyal subjects of our dread Sovereign Lord King James... Having undertaken, for the Glory of God and advancement of the Christian Faith and Honour of our King and Country, a Voyage to plant the First Colony in the Northern Parts of Virginia, do by these presents solemnly and mutually in the presence of God and one of another, Covenant and Combine ourselves together in a Civil Body Politic, for our better ordering and preservation... and by virtue hereof to enact, constitute and frame such just and equal Laws, Ordinances, Acts, Constitutions and Offices from time to time, as shall be thought most meet and convenient for the general good of the Colony, unto which we promise all due submission and obedience.',
  laymans: 'We\'re agreeing to form our own government and make fair laws for everyone. We\'ll all follow these laws. This was revolutionary—ordinary people deciding to govern themselves by mutual agreement.',
  resources: [
    { name: 'Pilgrim Hall Museum', url: 'https://www.pilgrimhall.org/mayflower_compact.htm' },
    { name: 'Library of Congress', url: 'https://www.loc.gov/item/90898037/' },
  ],
}

// ALL 27 AMENDMENTS (keeping from v3.1.2)
const ALL_AMENDMENTS = [
  { number: 1, year: 1791, title: 'Freedom of Religion, Speech, Press, Assembly, Petition', status: 'active', fullText: 'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.', laymans: 'The government cannot: establish an official religion, stop you from practicing your religion, limit your free speech, restrict the press, prevent peaceful protests, or stop you from asking the government to fix problems.' },
  { number: 2, year: 1791, title: 'Right to Bear Arms', status: 'active', fullText: 'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.', laymans: 'Because a trained citizen military is important for a free country\'s security, people have the right to own and carry weapons. This is one of the most debated amendments.' },
  { number: 3, year: 1791, title: 'Quartering of Soldiers', status: 'active', fullText: 'No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.', laymans: 'The government can\'t force you to let soldiers live in your home during peacetime.' },
  { number: 4, year: 1791, title: 'Search and Seizure', status: 'active', fullText: 'The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.', laymans: 'Police need a warrant with probable cause to search your home or belongings.' },
  { number: 5, year: 1791, title: 'Grand Jury, Double Jeopardy, Self-Incrimination, Due Process', status: 'active', fullText: 'No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury, except in cases arising in the land or naval forces, or in the Militia, when in actual service in time of War or public danger; nor shall any person be subject for the same offence to be twice put in jeopardy of life or limb; nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation.', laymans: 'Grand jury for serious crimes. No double jeopardy. Right to remain silent. Due process required. Fair payment if government takes your property.' },
  { number: 6, year: 1791, title: 'Right to Speedy Trial, Witnesses, Counsel', status: 'active', fullText: 'In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury of the State and district wherein the crime shall have been committed...', laymans: 'Fast public trial, impartial jury, right to a lawyer, right to face your accusers.' },
  { number: 7, year: 1791, title: 'Civil Trial by Jury', status: 'active', fullText: 'In Suits at common law, where the value in controversy shall exceed twenty dollars, the right of trial by jury shall be preserved...', laymans: 'Jury trial right in civil cases over $20.' },
  { number: 8, year: 1791, title: 'Excessive Bail, Cruel and Unusual Punishment', status: 'active', fullText: 'Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted.', laymans: 'No extreme bail or fines. No cruel or unusual punishment.' },
  { number: 9, year: 1791, title: 'Rights Retained by the People', status: 'active', fullText: 'The enumeration in the Constitution, of certain rights, shall not be construed to deny or disparage others retained by the people.', laymans: 'Just because a right isn\'t listed doesn\'t mean you don\'t have it.' },
  { number: 10, year: 1791, title: 'Powers Reserved to States', status: 'active', fullText: 'The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.', laymans: 'Powers not given to federal government belong to states or people.' },
  { number: 11, year: 1795, title: 'Suits Against States', status: 'active', fullText: 'The Judicial power of the United States shall not be construed to extend to any suit in law or equity, commenced or prosecuted against one of the United States by Citizens of another State, or by Citizens or Subjects of any Foreign State.', laymans: 'You can\'t sue a state in federal court if you\'re from another state.' },
  { number: 12, year: 1804, title: 'Election of President and Vice President', status: 'active', fullText: 'The Electors shall meet in their respective states and vote by ballot for President and Vice-President, one of whom, at least, shall not be an inhabitant of the same state with themselves...', laymans: 'Electors vote separately for President and VP (fixing a flaw where the runner-up became VP).' },
  { number: 13, year: 1865, title: 'Abolition of Slavery', status: 'active', fullText: 'Section 1. Neither slavery nor involuntary servitude, except as a punishment for crime whereof the party shall have been duly convicted, shall exist within the United States, or any place subject to their jurisdiction.', laymans: 'Slavery abolished. Only exception: prison labor for convicted criminals.' },
  { number: 14, year: 1868, title: 'Citizenship, Due Process, Equal Protection', status: 'active', fullText: 'Section 1. All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States and of the State wherein they reside...', laymans: 'Born here = citizen. States must provide equal protection and due process to everyone.' },
  { number: 15, year: 1870, title: 'Voting Rights (Race)', status: 'active', fullText: 'Section 1. The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude.', laymans: 'Can\'t deny voting based on race, color, or former slavery.' },
  { number: 16, year: 1913, title: 'Income Tax', status: 'active', fullText: 'The Congress shall have power to lay and collect taxes on incomes, from whatever source derived, without apportionment among the several States, and without regard to any census or enumeration.', laymans: 'Congress can collect income tax directly.' },
  { number: 17, year: 1913, title: 'Direct Election of Senators', status: 'active', fullText: 'The Senate of the United States shall be composed of two Senators from each State, elected by the people thereof, for six years...', laymans: 'Senators elected by the people, not state legislatures.' },
  { number: 18, year: 1919, title: 'Prohibition of Alcohol', status: 'REPEALED', fullText: 'Section 1. After one year from the ratification of this article the manufacture, sale, or transportation of intoxicating liquors within, the importation thereof into, or the exportation thereof from the United States and all territory subject to the jurisdiction thereof for beverage purposes is hereby prohibited.', laymans: '⚠️ REPEALED: Banned alcohol. Repealed by 21st Amendment in 1933 after Prohibition failed.' },
  { number: 19, year: 1920, title: 'Women\'s Suffrage', status: 'active', fullText: 'The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of sex.', laymans: 'Women have the right to vote.' },
  { number: 20, year: 1933, title: 'Presidential Terms and Succession', status: 'active', fullText: 'Section 1. The terms of the President and the Vice President shall end at noon on the 20th day of January...', laymans: 'President\'s term ends January 20th at noon (shortened "lame duck" period).' },
  { number: 21, year: 1933, title: 'Repeal of Prohibition', status: 'active', fullText: 'Section 1. The eighteenth article of amendment to the Constitution of the United States is hereby repealed.', laymans: 'Repeals 18th Amendment. Alcohol is legal again. Only amendment that repeals another.' },
  { number: 22, year: 1951, title: 'Presidential Term Limits', status: 'active', fullText: 'Section 1. No person shall be elected to the office of the President more than twice...', laymans: 'President limited to two terms (8 years max). Passed after FDR served four terms.' },
  { number: 23, year: 1961, title: 'Washington D.C. Electoral Votes', status: 'active', fullText: 'Section 1. The District constituting the seat of Government of the United States shall appoint in such manner as Congress may direct: A number of electors of President and Vice President...', laymans: 'D.C. residents can vote for President (gets 3 electoral votes).' },
  { number: 24, year: 1964, title: 'Abolition of Poll Tax', status: 'active', fullText: 'Section 1. The right of citizens of the United States to vote in any primary or other election for President or Vice President... shall not be denied or abridged by the United States or any State by reason of failure to pay poll tax or other tax.', laymans: 'Can\'t require payment to vote. Banned poll taxes used to suppress minority voting.' },
  { number: 25, year: 1967, title: 'Presidential Succession and Disability', status: 'active', fullText: 'Section 1. In case of the removal of the President from office or of his death or resignation, the Vice President shall become President...', laymans: 'VP becomes President if President dies/resigns. Process for replacing VP and handling presidential disability.' },
  { number: 26, year: 1971, title: 'Voting Age (18)', status: 'active', fullText: 'Section 1. The right of citizens of the United States, who are eighteen years of age or older, to vote shall not be denied or abridged by the United States or by any State on account of age.', laymans: '18-year-olds can vote. "Old enough to fight, old enough to vote."' },
  { number: 27, year: 1992, title: 'Congressional Compensation', status: 'active', fullText: 'No law, varying the compensation for the services of the Senators and Representatives, shall take effect, until an election of Representatives shall have intervened.', laymans: 'Congress pay raises don\'t take effect until after next election. Proposed 1789, ratified 1992—203 years!' },
]

const DECLARATION_DATA = {
  title: 'Declaration of Independence',
  year: '1776',
  summary: 'The document that announced America\'s independence from Britain and articulated the philosophical basis for the new nation.',
  resources: [
    { name: 'National Archives (Full Text + Image)', url: 'https://www.archives.gov/founding-docs/declaration-transcript' },
    { name: 'Library of Congress', url: 'https://www.loc.gov/item/mtjbib000159/' },
  ],
}

const CONSTITUTION_DATA = {
  title: 'U.S. Constitution',
  year: '1787',
  summary: 'The supreme law of the United States establishing the structure of the federal government and the rights of citizens.',
  resources: [
    { name: 'National Archives (Full Text)', url: 'https://www.archives.gov/founding-docs/constitution-transcript' },
    { name: 'Constitution Center (Interactive)', url: 'https://constitutioncenter.org/the-constitution' },
    { name: 'Congress.gov (Annotated)', url: 'https://constitution.congress.gov/' },
  ],
}

export default function FoundingDocsView() {
  const [activeDoc, setActiveDoc] = useState('overview')
  const [expandedSection, setExpandedSection] = useState(null)
  const [amendmentSearch, setAmendmentSearch] = useState('')

  const documents = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'magnacarta', label: 'Magna Carta', icon: Globe },
    { id: 'mayflower', label: 'Mayflower', icon: Feather },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'federalist', label: 'Federalist', icon: Feather },
    { id: 'billhistory', label: 'Bill of Rights History', icon: History },
    { id: 'amendments', label: 'All Amendments', icon: Scale },
  ]

  const filteredAmendments = ALL_AMENDMENTS.filter(a => 
    !amendmentSearch || 
    a.title.toLowerCase().includes(amendmentSearch.toLowerCase()) ||
    a.number.toString() === amendmentSearch
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-copper/10">
            <BookOpen size={24} className="text-copper" />
          </div>
          <div>
            <h2 className="font-headline text-xl font-semibold text-ink dark:text-paper">Founding Documents</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              From Magna Carta to the 27th Amendment—the documents that shaped American liberty
            </p>
          </div>
        </div>
      </div>

      {/* Research Mode Teaser */}
      <div className="p-3 rounded-lg bg-steel/10 border border-steel/20 flex items-center gap-2">
        <Search size={16} className="text-steel" />
        <span className="text-xs text-ink/60 dark:text-paper/60">
          Use <strong>Research Mode</strong> (coming soon) for safe comparison of sources and scholarly interpretations.
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
          <h3 className="card-headline mb-4">The Chain of Liberty</h3>
          <p className="text-sm text-ink/70 dark:text-paper/70 mb-6">
            American constitutional government didn't appear from nowhere. It evolved over 575+ years through these key documents:
          </p>
          
          <div className="space-y-4">
            {[
              { year: '1215', title: 'Magna Carta', desc: 'Established rule of law over kings. Due process, jury trials, no taxation without consent.', link: 'magnacarta' },
              { year: '1620', title: 'Mayflower Compact', desc: 'First self-government in America. Consent of the governed.', link: 'mayflower' },
              { year: '1776', title: 'Declaration of Independence', desc: 'Natural rights, equality, right to revolution.', link: null },
              { year: '1781', title: 'Articles of Confederation', desc: 'First constitution. Too weak—showed what NOT to do.', link: 'articles' },
              { year: '1787-88', title: 'Federalist Papers', desc: '85 essays explaining and defending the Constitution.', link: 'federalist' },
              { year: '1787', title: 'U.S. Constitution', desc: 'Supreme law. Separation of powers, federalism.', link: null },
              { year: '1791', title: 'Bill of Rights', desc: 'First 10 amendments. Individual liberties.', link: 'billhistory' },
              { year: '1791-1992', title: '27 Amendments', desc: 'Slavery abolished, voting expanded, rights protected.', link: 'amendments' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
                <div className="text-center flex-shrink-0">
                  <span className="text-lg font-bold text-copper">{item.year}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-ink dark:text-paper">{item.title}</h4>
                  <p className="text-sm text-ink/60 dark:text-paper/60">{item.desc}</p>
                </div>
                {item.link && (
                  <button onClick={() => setActiveDoc(item.link)} className="text-copper hover:underline text-sm">
                    View →
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-copper/10 border border-copper/20">
            <h4 className="font-semibold text-copper mb-2">Quick Links to Full Documents</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { name: 'Declaration of Independence', url: 'https://www.archives.gov/founding-docs/declaration-transcript' },
                { name: 'U.S. Constitution', url: 'https://www.archives.gov/founding-docs/constitution-transcript' },
                { name: 'Bill of Rights', url: 'https://www.archives.gov/founding-docs/bill-of-rights-transcript' },
                { name: 'All Amendments', url: 'https://constitution.congress.gov/constitution/' },
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-copper hover:underline">
                  <ExternalLink size={12} /> {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MAGNA CARTA */}
      {activeDoc === 'magnacarta' && (
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Globe size={24} className="text-copper" />
            <div>
              <h3 className="font-headline text-lg font-semibold text-ink dark:text-paper">{MAGNA_CARTA.title}</h3>
              <p className="text-sm text-ink/60 dark:text-paper/60">{MAGNA_CARTA.fullTitle}</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-forest/10 border border-forest/20 mb-4">
            <p className="text-sm text-forest">{MAGNA_CARTA.summary}</p>
          </div>

          <div className="mb-4 p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
            <h4 className="font-semibold text-ink dark:text-paper mb-2">Historical Context</h4>
            <p className="text-sm text-ink/70 dark:text-paper/70">{MAGNA_CARTA.historicalContext}</p>
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-3">Key Principles → American Influence</h4>
          <div className="space-y-3 mb-4">
            {MAGNA_CARTA.keyPrinciples.map((principle, i) => (
              <div key={i} className="p-3 rounded-lg border border-ink/10 dark:border-paper/10">
                <p className="text-xs text-copper font-mono mb-1">{principle.clause}</p>
                <p className="text-sm italic text-ink/70 dark:text-paper/70 mb-2">"{principle.original}"</p>
                <p className="text-sm text-forest">→ {principle.influence}</p>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-3">Timeline</h4>
          <div className="space-y-2 mb-4">
            {MAGNA_CARTA.timeline.map((item, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="font-mono text-copper w-12">{item.year}</span>
                <span className="text-ink/70 dark:text-paper/70">{item.event}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-steel/10 border border-steel/20 mb-4">
            <p className="text-xs text-ink/60 dark:text-paper/60"><strong>Still in Force:</strong> {MAGNA_CARTA.stillInForce}</p>
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-2">Comprehensive Resources</h4>
          <div className="space-y-2">
            {MAGNA_CARTA.resources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-steel hover:text-copper">
                <ExternalLink size={12} /> {r.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* MAYFLOWER COMPACT */}
      {activeDoc === 'mayflower' && (
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Feather size={24} className="text-copper" />
            <div>
              <h3 className="font-headline text-lg font-semibold text-ink dark:text-paper">{MAYFLOWER_COMPACT.title}</h3>
              <p className="text-sm text-ink/60 dark:text-paper/60">{MAYFLOWER_COMPACT.year}</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-forest/10 border border-forest/20 mb-4">
            <p className="text-sm text-forest">{MAYFLOWER_COMPACT.summary}</p>
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-3">Significance</h4>
          <ul className="space-y-2 mb-4">
            {MAYFLOWER_COMPACT.significance.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink/70 dark:text-paper/70">
                <span className="text-copper">•</span> {item}
              </li>
            ))}
          </ul>

          <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 border-l-4 border-copper mb-4">
            <p className="text-xs text-copper font-medium mb-1">Original Text:</p>
            <p className="text-sm italic text-ink/70 dark:text-paper/70">{MAYFLOWER_COMPACT.fullText}</p>
          </div>

          <div className="p-3 rounded-lg bg-forest/10 border border-forest/20 mb-4">
            <p className="text-xs text-forest font-medium mb-1">In Plain English:</p>
            <p className="text-sm text-ink/80 dark:text-paper/80">{MAYFLOWER_COMPACT.laymans}</p>
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-2">Comprehensive Resources</h4>
          <div className="space-y-2">
            {MAYFLOWER_COMPACT.resources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-steel hover:text-copper">
                <ExternalLink size={12} /> {r.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ARTICLES OF CONFEDERATION */}
      {activeDoc === 'articles' && (
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={24} className="text-copper" />
            <div>
              <h3 className="font-headline text-lg font-semibold text-ink dark:text-paper">{ARTICLES_OF_CONFEDERATION.title}</h3>
              <p className="text-sm text-ink/60 dark:text-paper/60">{ARTICLES_OF_CONFEDERATION.years} • America's First Constitution</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-burgundy/10 border border-burgundy/20 mb-4">
            <p className="text-sm text-burgundy">{ARTICLES_OF_CONFEDERATION.summary}</p>
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-3">Key Weaknesses</h4>
          <div className="space-y-2 mb-4">
            {ARTICLES_OF_CONFEDERATION.keyWeaknesses.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 border-l-4 border-burgundy">
                <p className="font-medium text-sm text-ink dark:text-paper">{item.issue}</p>
                <p className="text-xs text-ink/60 dark:text-paper/60">→ {item.consequence}</p>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-3">Crises That Proved Reform Necessary</h4>
          <div className="space-y-3 mb-4">
            {ARTICLES_OF_CONFEDERATION.crises.map((crisis, i) => (
              <div key={i} className="p-3 rounded-lg border border-ink/10 dark:border-paper/10">
                <p className="font-semibold text-copper text-sm">{crisis.name}</p>
                <p className="text-sm text-ink/70 dark:text-paper/70">{crisis.description}</p>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-2">Comprehensive Resources</h4>
          <div className="space-y-2">
            {ARTICLES_OF_CONFEDERATION.resources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-steel hover:text-copper">
                <ExternalLink size={12} /> {r.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* FEDERALIST PAPERS */}
      {activeDoc === 'federalist' && (
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Feather size={24} className="text-copper" />
            <div>
              <h3 className="font-headline text-lg font-semibold text-ink dark:text-paper">{FEDERALIST_PAPERS.title}</h3>
              <p className="text-sm text-ink/60 dark:text-paper/60">{FEDERALIST_PAPERS.years} • {FEDERALIST_PAPERS.count} Essays</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-forest/10 border border-forest/20 mb-4">
            <p className="text-sm text-forest">{FEDERALIST_PAPERS.summary}</p>
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-3">Authors ("Publius")</h4>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            {FEDERALIST_PAPERS.authors.map((author, i) => (
              <div key={i} className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 text-center">
                <p className="font-semibold text-copper">{author.name}</p>
                <p className="text-xs text-ink/60 dark:text-paper/60">{author.essays}</p>
                <p className="text-xs text-ink/50 dark:text-paper/50 mt-1">{author.focus}</p>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-3">Key Essays</h4>
          <div className="space-y-3 mb-4">
            {FEDERALIST_PAPERS.keyEssays.map((essay, i) => (
              <div key={i} className="p-3 rounded-lg border border-ink/10 dark:border-paper/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono bg-copper/20 text-copper px-2 py-0.5 rounded">#{essay.number}</span>
                  <span className="text-xs text-ink/50 dark:text-paper/50">({essay.author})</span>
                </div>
                <p className="font-semibold text-sm text-ink dark:text-paper">{essay.title}</p>
                <p className="text-sm text-ink/70 dark:text-paper/70">{essay.summary}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-burgundy/10 border border-burgundy/20 mb-4">
            <h4 className="font-semibold text-burgundy mb-2">{FEDERALIST_PAPERS.antifederalistResponse.title}</h4>
            <p className="text-sm text-burgundy/80 mb-2">{FEDERALIST_PAPERS.antifederalistResponse.description}</p>
            <ul className="text-xs text-burgundy/70 space-y-1">
              {FEDERALIST_PAPERS.antifederalistResponse.keyArguments.map((arg, i) => (
                <li key={i}>• {arg}</li>
              ))}
            </ul>
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-2">Comprehensive Resources</h4>
          <div className="space-y-2">
            {FEDERALIST_PAPERS.resources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-steel hover:text-copper">
                <ExternalLink size={12} /> {r.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* BILL OF RIGHTS HISTORY */}
      {activeDoc === 'billhistory' && (
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <History size={24} className="text-copper" />
            <div>
              <h3 className="font-headline text-lg font-semibold text-ink dark:text-paper">{BILL_OF_RIGHTS_HISTORY.title}</h3>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-forest/10 border border-forest/20 mb-4">
            <p className="text-sm text-forest">{BILL_OF_RIGHTS_HISTORY.summary}</p>
          </div>

          <div className="space-y-4 mb-6">
            {BILL_OF_RIGHTS_HISTORY.attempts.map((attempt, i) => (
              <div key={i} className={`p-4 rounded-lg border-2 ${
                attempt.outcome === 'RATIFIED' ? 'border-forest bg-forest/5' :
                attempt.outcome === 'REJECTED' ? 'border-burgundy bg-burgundy/5' :
                'border-copper bg-copper/5'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    attempt.outcome === 'RATIFIED' ? 'bg-forest text-white' :
                    attempt.outcome === 'REJECTED' ? 'bg-burgundy text-white' :
                    'bg-copper text-white'
                  }`}>
                    Attempt {attempt.attempt}: {attempt.outcome}
                  </span>
                  <span className="text-sm font-mono text-ink/50 dark:text-paper/50">{attempt.year}</span>
                </div>
                <h4 className="font-semibold text-ink dark:text-paper mb-2">{attempt.title}</h4>
                <p className="text-sm text-ink/70 dark:text-paper/70 mb-2">{attempt.description}</p>
                <p className="text-xs text-ink/60 dark:text-paper/60 mb-2">
                  <strong>Key Figures:</strong> {attempt.keyFigures.join(', ')}
                </p>
                {attempt.whyFailed && (
                  <p className="text-xs text-burgundy"><strong>Why it failed:</strong> {attempt.whyFailed}</p>
                )}
                {attempt.keyDifference && (
                  <p className="text-xs text-copper"><strong>Key development:</strong> {attempt.keyDifference}</p>
                )}
                {attempt.whatChanged && (
                  <p className="text-xs text-forest"><strong>What changed:</strong> {attempt.whatChanged}</p>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-steel/10 border border-steel/20 mb-4">
            <h4 className="font-semibold text-steel mb-2">The Two That Weren't Ratified (in 1791)</h4>
            {BILL_OF_RIGHTS_HISTORY.twoNotRatified.map((item, i) => (
              <div key={i} className="mb-2">
                <p className="text-sm font-medium text-ink dark:text-paper">{item.title}</p>
                <p className="text-xs text-ink/60 dark:text-paper/60">{item.text}</p>
                <p className="text-xs text-copper italic">{item.note}</p>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-ink dark:text-paper mb-2">Comprehensive Resources</h4>
          <div className="space-y-2">
            {BILL_OF_RIGHTS_HISTORY.resources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-steel hover:text-copper">
                <ExternalLink size={12} /> {r.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ALL 27 AMENDMENTS */}
      {activeDoc === 'amendments' && (
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Scale size={24} className="text-copper" />
            <div>
              <h3 className="font-headline text-lg font-semibold text-ink dark:text-paper">All 27 Amendments</h3>
              <p className="text-sm text-ink/60 dark:text-paper/60">Complete text with plain English explanations</p>
            </div>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-paper/40" size={16} />
            <input
              type="text"
              value={amendmentSearch}
              onChange={(e) => setAmendmentSearch(e.target.value)}
              placeholder="Search amendments (try 'voting' or '18')..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-ink/20 dark:border-paper/20 
                       bg-paper dark:bg-ink text-ink dark:text-paper
                       focus:outline-none focus:ring-2 focus:ring-copper/50"
            />
          </div>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {filteredAmendments.map((amendment) => (
              <div key={amendment.number} className={`border rounded-lg overflow-hidden ${
                amendment.status === 'REPEALED' ? 'border-burgundy/30 bg-burgundy/5' : 'border-ink/10 dark:border-paper/10'
              }`}>
                <button
                  onClick={() => setExpandedSection(expandedSection === `a${amendment.number}` ? null : `a${amendment.number}`)}
                  className="w-full p-3 text-left hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-copper">{amendment.number}{['st','nd','rd'][amendment.number-1] || 'th'}</span>
                      <span className="text-xs text-ink/40 dark:text-paper/40">({amendment.year})</span>
                      {amendment.status === 'REPEALED' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-burgundy/20 text-burgundy">REPEALED</span>
                      )}
                    </div>
                    {expandedSection === `a${amendment.number}` ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  <p className="font-medium text-sm text-ink dark:text-paper mt-1">{amendment.title}</p>
                </button>

                {expandedSection === `a${amendment.number}` && (
                  <div className="px-3 pb-3 space-y-2">
                    <div className="p-2 rounded bg-ink/5 dark:bg-paper/5 border-l-2 border-copper">
                      <p className="text-[10px] text-copper mb-1">Full Text:</p>
                      <p className="text-xs text-ink/70 dark:text-paper/70">{amendment.fullText}</p>
                    </div>
                    <div className={`p-2 rounded border-l-2 ${amendment.status === 'REPEALED' ? 'bg-burgundy/10 border-burgundy' : 'bg-forest/10 border-forest'}`}>
                      <p className={`text-[10px] mb-1 ${amendment.status === 'REPEALED' ? 'text-burgundy' : 'text-forest'}`}>Plain English:</p>
                      <p className="text-xs text-ink/80 dark:text-paper/80">{amendment.laymans}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <a href="https://constitution.congress.gov/constitution/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-copper hover:underline">
              <ExternalLink size={14} /> Full text on Congress.gov
            </a>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="card">
        <h3 className="card-headline mb-4">Quick Reference</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
            <p className="text-2xl font-bold text-copper">1215</p>
            <p className="text-xs text-ink/50 dark:text-paper/50">Magna Carta</p>
          </div>
          <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
            <p className="text-2xl font-bold text-copper">85</p>
            <p className="text-xs text-ink/50 dark:text-paper/50">Federalist Papers</p>
          </div>
          <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5">
            <p className="text-2xl font-bold text-copper">27</p>
            <p className="text-xs text-ink/50 dark:text-paper/50">Amendments</p>
          </div>
          <div className="p-3 rounded-lg bg-burgundy/10">
            <p className="text-2xl font-bold text-burgundy">1</p>
            <p className="text-xs text-burgundy/70">Repealed</p>
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
