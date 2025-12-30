// Political Sources with bias ratings (-3 far left to +3 far right)
const politicalSources = [
  { name: 'MSNBC', bias: -2.0, credibility: 'mixed', url: 'https://www.msnbc.com' },
  { name: 'CNN', bias: -1.5, credibility: 'mixed', url: 'https://www.cnn.com' },
  { name: 'New York Times', bias: -1.0, credibility: 'high', url: 'https://www.nytimes.com' },
  { name: 'NPR', bias: -1.0, credibility: 'high', url: 'https://www.npr.org' },
  { name: 'Washington Post', bias: -1.0, credibility: 'high', url: 'https://www.washingtonpost.com' },
  { name: 'Politico', bias: -0.5, credibility: 'high', url: 'https://www.politico.com' },
  { name: 'The Hill', bias: -0.3, credibility: 'high', url: 'https://thehill.com' },
  { name: 'Reuters', bias: 0, credibility: 'very-high', url: 'https://www.reuters.com' },
  { name: 'AP News', bias: 0, credibility: 'very-high', url: 'https://apnews.com' },
  { name: 'BBC', bias: 0, credibility: 'high', url: 'https://www.bbc.com' },
  { name: 'C-SPAN', bias: 0, credibility: 'very-high', url: 'https://www.c-span.org' },
  { name: 'Wall Street Journal', bias: 0.5, credibility: 'high', url: 'https://www.wsj.com' },
  { name: 'The Economist', bias: 0.5, credibility: 'high', url: 'https://www.economist.com' },
  { name: 'National Review', bias: 1.5, credibility: 'mixed', url: 'https://www.nationalreview.com' },
  { name: 'Fox News', bias: 2.0, credibility: 'mixed', url: 'https://www.foxnews.com' },
  { name: 'New York Post', bias: 1.5, credibility: 'mixed', url: 'https://nypost.com' },
  { name: 'Daily Wire', bias: 2.0, credibility: 'mixed', url: 'https://www.dailywire.com' },
  { name: 'Breitbart', bias: 2.5, credibility: 'low', url: 'https://www.breitbart.com' },
  { name: 'The Blaze', bias: 2.0, credibility: 'mixed', url: 'https://www.theblaze.com' },
  { name: 'Newsmax', bias: 2.0, credibility: 'low', url: 'https://www.newsmax.com' },
]

// Legal Sources - all nonpartisan
const legalSources = [
  { name: 'Oyez', url: 'https://www.oyez.org', description: 'Supreme Court multimedia archive with audio of oral arguments', bias: 0, credibility: 'very-high' },
  { name: 'Cornell Law LII', url: 'https://www.law.cornell.edu', description: 'Free legal information from Cornell Law School', bias: 0, credibility: 'very-high' },
  { name: 'SCOTUSblog', url: 'https://www.scotusblog.com', description: 'Independent Supreme Court analysis and news', bias: 0, credibility: 'very-high' },
  { name: 'Justia', url: 'https://www.justia.com', description: 'Free case law, codes, and legal information', bias: 0, credibility: 'high' },
  { name: 'FindLaw', url: 'https://www.findlaw.com', description: 'Legal information for consumers and professionals', bias: 0, credibility: 'high' },
  { name: 'PACER', url: 'https://pacer.uscourts.gov', description: 'Public Access to Court Electronic Records', bias: 0, credibility: 'very-high' },
  { name: 'Supreme Court Official', url: 'https://www.supremecourt.gov', description: 'Official Supreme Court website', bias: 0, credibility: 'very-high' },
  { name: 'Congress.gov', url: 'https://www.congress.gov', description: 'Official source for federal legislative information', bias: 0, credibility: 'very-high' },
  { name: 'National Archives', url: 'https://www.archives.gov', description: 'Keeper of federal records and founding documents', bias: 0, credibility: 'very-high' },
  { name: 'Library of Congress', url: 'https://www.loc.gov', description: 'Research library and primary source archive', bias: 0, credibility: 'very-high' },
]

// Medical Sources with tiers
const medicalSources = [
  // Tier 1: Government & Academic
  { name: 'CDC', url: 'https://www.cdc.gov', tier: 1, credibility: 'very-high', bias: 0, note: 'Centers for Disease Control and Prevention' },
  { name: 'NIH', url: 'https://www.nih.gov', tier: 1, credibility: 'very-high', bias: 0, note: 'National Institutes of Health' },
  { name: 'WHO', url: 'https://www.who.int', tier: 1, credibility: 'high', bias: 0, note: 'World Health Organization' },
  { name: 'FDA', url: 'https://www.fda.gov', tier: 1, credibility: 'very-high', bias: 0, note: 'Food and Drug Administration' },
  { name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', tier: 1, credibility: 'very-high', bias: 0, note: 'Database of peer-reviewed medical research' },
  { name: 'Mayo Clinic', url: 'https://www.mayoclinic.org', tier: 1, credibility: 'very-high', bias: 0, note: 'Nonprofit academic medical center' },
  { name: 'Cleveland Clinic', url: 'https://my.clevelandclinic.org', tier: 1, credibility: 'very-high', bias: 0, note: 'Nonprofit academic medical center' },
  // Tier 2: Reputable Medical News
  { name: 'WebMD', url: 'https://www.webmd.com', tier: 2, credibility: 'high', bias: 0.2, note: 'Check for pharma advertising influence' },
  { name: 'Healthline', url: 'https://www.healthline.com', tier: 2, credibility: 'high', bias: 0.2, note: 'Medically reviewed, ad-supported' },
  { name: 'Medical News Today', url: 'https://www.medicalnewstoday.com', tier: 2, credibility: 'high', bias: 0, note: 'Science-based health news' },
  { name: 'STAT News', url: 'https://www.statnews.com', tier: 2, credibility: 'high', bias: 0, note: 'Health and medicine journalism' },
  // Tier 3: Mixed Quality
  { name: 'Psychology Today', url: 'https://www.psychologytoday.com', tier: 3, credibility: 'mixed', bias: 0, note: 'Verify claims with Tier 1 sources' },
  { name: 'Verywell Health', url: 'https://www.verywellhealth.com', tier: 3, credibility: 'mixed', bias: 0.2, note: 'Cross-reference important claims' },
]

const medicalBlocked = [
  { name: 'Natural News', reason: 'Promotes conspiracy theories and medical misinformation' },
  { name: 'Mercola', reason: 'Anti-vaccine misinformation, FDA warning letters' },
  { name: 'InfoWars Health', reason: 'Known conspiracy theory promotion' },
  { name: 'GreenMedInfo', reason: 'Anti-vaccine, promotes unproven treatments' },
  { name: 'NaturalCures', reason: 'Promotes dangerous unproven treatments' },
]

export const TRUSTED_SOURCES = {
  political: politicalSources,
  legal: legalSources,
  medical: medicalSources,
  medicalBlocked,
}

export const getBiasLabel = (bias) => {
  if (bias <= -2.5) return { label: 'Far Left', color: 'text-blue-700' }
  if (bias <= -1.5) return { label: 'Left', color: 'text-blue-600' }
  if (bias <= -0.5) return { label: 'Lean Left', color: 'text-blue-400' }
  if (bias <= 0.5) return { label: 'Center', color: 'text-slate-500' }
  if (bias <= 1.5) return { label: 'Lean Right', color: 'text-red-400' }
  if (bias <= 2.5) return { label: 'Right', color: 'text-red-600' }
  return { label: 'Far Right', color: 'text-red-700' }
}

export const getCredibilityBadge = (credibility) => {
  switch (credibility) {
    case 'very-high': return { label: '✓✓ Very High', color: 'bg-forest/20 text-forest' }
    case 'high': return { label: '✓ High', color: 'bg-forest/10 text-forest' }
    case 'mixed': return { label: '~ Mixed', color: 'bg-copper/20 text-copper' }
    case 'low': return { label: '⚠ Low', color: 'bg-burgundy/20 text-burgundy' }
    default: return { label: '? Unknown', color: 'bg-steel/20 text-steel' }
  }
}

export const MEDICAL_DISCLAIMER = `⚕️ MEDICAL INFORMATION NOTICE

The medical sources listed here are provided for informational purposes only. Please keep in mind:

• Information found or linked through this app should not be used to self-diagnose conditions
• Medical test results should be interpreted by qualified healthcare professionals, not through online resources
• Always consult with a licensed healthcare provider for medical decisions
• When in doubt, seek professional medical advice

ProveIt aims to help you find reliable information, but medical decisions should always involve qualified professionals.`
