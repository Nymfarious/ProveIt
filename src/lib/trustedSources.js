// ProveIt v3.0.0 - Trusted Sources Database
// Categories: Political News, Legal, Medical
// Each source has a bias rating from -3 (far left) to +3 (far right)
// Medical sources have additional credibility rating

export const TRUSTED_SOURCES = {
  // POLITICAL NEWS SOURCES
  political: [
    // Left
    { name: 'MSNBC', bias: -2, credibility: 'mixed' },
    { name: 'The Nation', bias: -2.5, credibility: 'mixed' },
    { name: 'Mother Jones', bias: -2, credibility: 'high' },
    { name: 'HuffPost', bias: -1.5, credibility: 'mixed' },
    
    // Lean Left
    { name: 'NPR', bias: -1, credibility: 'high' },
    { name: 'The New York Times', bias: -1, credibility: 'high' },
    { name: 'The Washington Post', bias: -1, credibility: 'high' },
    { name: 'The Guardian', bias: -1.5, credibility: 'high' },
    { name: 'CNN', bias: -1, credibility: 'mixed' },
    { name: 'Politico', bias: -0.5, credibility: 'high' },
    
    // Center
    { name: 'Reuters', bias: 0, credibility: 'very-high' },
    { name: 'AP News', bias: 0, credibility: 'very-high' },
    { name: 'BBC', bias: 0, credibility: 'high' },
    { name: 'PBS NewsHour', bias: 0, credibility: 'very-high' },
    { name: 'The Hill', bias: 0, credibility: 'high' },
    { name: 'C-SPAN', bias: 0, credibility: 'very-high' },
    
    // Lean Right
    { name: 'Wall Street Journal', bias: 0.5, credibility: 'high' },
    { name: 'The Economist', bias: 0.5, credibility: 'very-high' },
    { name: 'Forbes', bias: 0.5, credibility: 'high' },
    
    // Right
    { name: 'Fox News', bias: 2, credibility: 'mixed' },
    { name: 'New York Post', bias: 1.5, credibility: 'mixed' },
    { name: 'Washington Examiner', bias: 2, credibility: 'mixed' },
    { name: 'The Daily Wire', bias: 2.5, credibility: 'mixed' },
  ],

  // LEGAL SOURCES - Pre-approved for law/court information
  legal: [
    { name: 'Oyez', url: 'https://www.oyez.org', bias: 0, credibility: 'very-high', description: 'SCOTUS multimedia archive - Cornell Law & IIT Chicago-Kent' },
    { name: 'Cornell Law - LII', url: 'https://www.law.cornell.edu', bias: 0, credibility: 'very-high', description: 'Legal Information Institute - free legal encyclopedia' },
    { name: 'SCOTUSblog', url: 'https://www.scotusblog.com', bias: 0, credibility: 'very-high', description: 'Independent Supreme Court coverage since 2002' },
    { name: 'Justia', url: 'https://www.justia.com', bias: 0, credibility: 'high', description: 'Free case law and legal information' },
    { name: 'FindLaw', url: 'https://www.findlaw.com', bias: 0, credibility: 'high', description: 'Thomson Reuters legal resource' },
    { name: 'PACER', url: 'https://pacer.uscourts.gov', bias: 0, credibility: 'very-high', description: 'Official federal court records' },
    { name: 'Supreme Court Official', url: 'https://www.supremecourt.gov', bias: 0, credibility: 'very-high', description: 'Official U.S. Supreme Court website' },
    { name: 'Congress.gov', url: 'https://www.congress.gov', bias: 0, credibility: 'very-high', description: 'Official legislative information' },
    { name: 'National Archives', url: 'https://www.archives.gov', bias: 0, credibility: 'very-high', description: 'Founding documents and federal records' },
    { name: 'Library of Congress', url: 'https://www.loc.gov', bias: 0, credibility: 'very-high', description: 'America\'s national library' },
  ],

  // MEDICAL SOURCES - With credibility and bias ratings
  // Note: Medical bias can be subtle (pharma funding, alternative medicine, etc.)
  medical: [
    // Tier 1: Government & Academic (Very High Credibility)
    { name: 'CDC', url: 'https://www.cdc.gov', bias: 0, credibility: 'very-high', tier: 1, note: 'U.S. Centers for Disease Control' },
    { name: 'NIH', url: 'https://www.nih.gov', bias: 0, credibility: 'very-high', tier: 1, note: 'National Institutes of Health' },
    { name: 'WHO', url: 'https://www.who.int', bias: 0, credibility: 'very-high', tier: 1, note: 'World Health Organization' },
    { name: 'FDA', url: 'https://www.fda.gov', bias: 0, credibility: 'very-high', tier: 1, note: 'Food and Drug Administration' },
    { name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', bias: 0, credibility: 'very-high', tier: 1, note: 'Peer-reviewed medical research' },
    { name: 'Mayo Clinic', url: 'https://www.mayoclinic.org', bias: 0, credibility: 'very-high', tier: 1, note: 'Nonprofit medical practice' },
    { name: 'Cleveland Clinic', url: 'https://my.clevelandclinic.org', bias: 0, credibility: 'very-high', tier: 1, note: 'Nonprofit medical center' },
    
    // Tier 2: Reputable Medical News (High Credibility)
    { name: 'WebMD', url: 'https://www.webmd.com', bias: 0, credibility: 'high', tier: 2, note: 'Check for pharma ad influence' },
    { name: 'Healthline', url: 'https://www.healthline.com', bias: 0, credibility: 'high', tier: 2, note: 'Medically reviewed articles' },
    { name: 'Medical News Today', url: 'https://www.medicalnewstoday.com', bias: 0, credibility: 'high', tier: 2, note: 'Part of Healthline Media' },
    { name: 'STAT News', url: 'https://www.statnews.com', bias: -0.5, credibility: 'high', tier: 2, note: 'Health/science journalism' },
    
    // Tier 3: Mixed/Caution (Verify claims independently)
    { name: 'Psychology Today', url: 'https://www.psychologytoday.com', bias: -0.5, credibility: 'mixed', tier: 3, note: 'Quality varies by author' },
    { name: 'Verywell Health', url: 'https://www.verywellhealth.com', bias: 0, credibility: 'mixed', tier: 3, note: 'Dotdash Meredith - check sources' },
  ],

  // BLOCKED MEDICAL SOURCES - Known misinformation
  medicalBlocked: [
    { name: 'Natural News', reason: 'Health misinformation, anti-vaccine' },
    { name: 'Mercola', reason: 'COVID misinformation, FDA warnings' },
    { name: 'InfoWars Health', reason: 'Conspiracy theories, supplements sales' },
    { name: 'GreenMedInfo', reason: 'Anti-vaccine, pseudoscience' },
    { name: 'NaturalCures', reason: 'Unproven treatments' },
  ],
}

// Get bias label from score
export const getBiasLabel = (score) => {
  if (score <= -2.5) return { label: 'Far Left', color: 'text-blue-700' }
  if (score <= -1.5) return { label: 'Left', color: 'text-blue-600' }
  if (score <= -0.5) return { label: 'Lean Left', color: 'text-blue-400' }
  if (score <= 0.5) return { label: 'Center', color: 'text-slate-500' }
  if (score <= 1.5) return { label: 'Lean Right', color: 'text-red-400' }
  if (score <= 2.5) return { label: 'Right', color: 'text-red-600' }
  return { label: 'Far Right', color: 'text-red-700' }
}

// Get credibility badge
export const getCredibilityBadge = (level) => {
  switch (level) {
    case 'very-high': return { label: '✓✓ Very High', color: 'text-forest bg-forest/10' }
    case 'high': return { label: '✓ High', color: 'text-emerald-500 bg-emerald-500/10' }
    case 'mixed': return { label: '~ Mixed', color: 'text-copper bg-copper/10' }
    case 'low': return { label: '⚠ Low', color: 'text-burgundy bg-burgundy/10' }
    default: return { label: '? Unknown', color: 'text-ink/50 bg-ink/10' }
  }
}

// Medical disclaimer
export const MEDICAL_DISCLAIMER = `
⚕️ MEDICAL INFORMATION DISCLAIMER

ProveIt provides medical source ratings for informational purposes only. 
This is NOT medical advice.

• DO NOT use this to self-diagnose conditions
• DO NOT interpret your own test results
• DO NOT replace professional medical consultation
• DO consult licensed healthcare providers for health decisions

Medical information can be influenced by:
- Pharmaceutical funding and advertising
- Political perspectives on public health
- Alternative medicine advocacy
- Industry interests

Always verify medical claims with your doctor or multiple Tier 1 sources.
`

export default TRUSTED_SOURCES
