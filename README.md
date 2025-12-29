# ProveIt v3.0.0 - Major Release

## 🎉 What's New

### Footer Fixes
- ✅ Dark curved hover tooltips (removed white ones)
- ✅ Removed gray Oyez explainer text (hover does the job)
- ✅ Removed bottom flourish (was redundant)
- ✅ Changed diamond (✦) to bullet (•) between version/edition

### Rate Limiting
- ✅ **5 fact-checks/day** for free users
- ✅ Usage counter displayed in Search view
- ✅ "Add your own API key" for unlimited access
- ✅ Dev Mode toggle in DevTools for developers

### IMDB Integration
- ✅ Movies/TV articles show IMDB search links
- ✅ Auto-extracts search terms from headlines

### Supreme Court Enhancements
- ✅ **Justice portraits** from official SCOTUS website (public domain)
- ✅ **Wikipedia links** for each justice
- ✅ **SCOTUS News panel** (collapsible, 3/7 day filter)
- ✅ News articles show source bias indicators

### Pre-Approved Sources System (NEW VIEW)
- ✅ **Political Sources** - 20+ sources with bias ratings (-3 to +3)
- ✅ **Legal Sources** - Oyez, Cornell Law, SCOTUSblog, PACER, etc.
- ✅ **Medical Sources** - Tiered system (1-3) with credibility ratings
- ✅ **Medical Disclaimer** - Full popup with legal coverage
- ✅ **Blocked Medical Sources** - Known misinformation sites
- ✅ Searchable source database

### DevTools Improvements
- ✅ **Unlock Unlimited** toggle for developers
- ✅ **User API Key** input - add your own Gemini key for unlimited
- ✅ API test buttons
- ✅ What each API powers (explained)

---

## 📁 Files Changed/Added

```
ProveIt-v3.0.0/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx                      ← Rate limiting logic
│   ├── lib/
│   │   ├── gemini.js               ← AI integration
│   │   ├── news.js                 ← News API
│   │   └── trustedSources.js       ← NEW: Source database
│   └── components/
│       ├── ui/
│       │   └── BiasBar.jsx
│       ├── layout/
│       │   ├── Navigation.jsx      ← Added Sources icon
│       │   └── Footer.jsx          ← Fixed hovers, removed extras
│       └── features/
│           ├── SearchView.jsx      ← Rate limiting UI
│           ├── FeedView.jsx        ← IMDB links
│           ├── SupremeCourtView.jsx ← Portraits, news panel
│           ├── SourcesView.jsx     ← NEW: Trusted sources
│           ├── DevToolsView.jsx    ← Unlock unlimited
│           ├── SettingsView.jsx
│           ├── StatsView.jsx
│           ├── IgnoredView.jsx
│           └── HelpView.jsx
├── index.html
└── README.md
```

---

## 🧪 Testing Checklist

### Footer
- [ ] Dark curved tooltips appear on hover (no white)
- [ ] No gray Oyez text below links
- [ ] No double flourish at bottom
- [ ] Version shows "v3.0.0" with bullet (•) separator

### Rate Limiting
- [ ] Usage counter shows "X fact-checks remaining"
- [ ] After 5 checks, button shows "Limit Reached"
- [ ] Error message suggests adding API key
- [ ] Resets at midnight (check localStorage)

### DevTools
- [ ] "Unlock Unlimited" toggle works
- [ ] Adding Gemini API key unlocks unlimited
- [ ] Test buttons work
- [ ] API explanations visible

### IMDB Links
- [ ] Movies/TV category shows film icon
- [ ] Each article has IMDB link
- [ ] IMDB link opens search in new tab

### Supreme Court
- [ ] Justice portraits load (or show initials fallback)
- [ ] Wikipedia links work
- [ ] News button opens panel
- [ ] News filter (3/7 days) works
- [ ] Source bias dots show on news items

### Trusted Sources (New!)
- [ ] Navigate via Shield icon in nav
- [ ] Political tab shows bias bars
- [ ] Legal tab shows trusted sources with links
- [ ] Medical tab shows tiered sources
- [ ] Medical disclaimer popup works
- [ ] Blocked sources show in red
- [ ] Search filters sources

### Navigation
- [ ] Shield icon appears for Sources
- [ ] All nav items work
- [ ] Active state highlights correctly

---

## 💰 Cost Model

| User Type | Fact-Checks | How |
|-----------|-------------|-----|
| Free User | 5/day | Uses app's embedded key |
| Own Key | Unlimited | Adds their Gemini API key |
| Developer | Unlimited | Enables Dev Mode toggle |
| Magic Link | Unlimited | Invited by email hash |

---

## 🚀 Deployment

```bash
cd ~/path/to/ProveIt
# Copy all files from zip
npm install  # if new dependencies
npm run build
npm run deploy  # or push to GitHub Pages
```

---

*ProveIt v3.0.0 - "Veritas Lux" • Truth is Light*
