# ProveIt v3.4.1 - Bug Fix Patch

## 📋 ADDENDUM TO v3.4.0

This patch fixes bugs discovered before v3.4.0 launch.

---

## 🐛 BUGS FIXED IN v3.4.1

### 1. Duplicate Flourish on Supreme Court Tab
- **Issue:** Two decorative flourishes appeared at bottom of SCOTUS view
- **Fix:** Removed duplicate, kept only the scales (⚖) version

### 2. Duplicate Flourish on Founding Documents Tab
- **Issue:** Same double-flourish problem
- **Fix:** Kept single flourish with star (✦) center

### 3. Navigation Order Changed
- **Old:** Search, Feed, Research, SCOTUS, Sources, Flagged, Media, Founding...
- **New:** Search, Feed, Media Checker, My Stats, Trusted Sources, Flagged Sources, Supreme Court, Founding Documents...
- **Note:** "Founding Docs" → "Founding Documents" in hover tooltip

### 4. Broken Project 2025 Links Fixed
- **Reuters link:** Was broken → Replaced with Wikipedia
- **AP link:** Was broken → Removed
- **Prominence reduced:** Now just a small "Also:" note at bottom of Political Parties, not a featured section
- **Just the facts:** Three links (Official, Wikipedia, Ballotpedia) - no editorializing

### 5. Research Mode Improvements
- **Side-by-side columns:** Left, Center, Right clearly separated
- **Fringe exclusion:** Breitbart, InfoWars, OAN, Newsmax, Jacobin excluded by default
- **Actionable bias slider:**
  - Checkbox to enable/disable filtering
  - Dual sliders for Left bound and Right bound
  - Visual range indicator on gradient bar
  - Preset buttons: "Left Only", "Center Only", "Right Only", "All Sources"
  - "Refresh Results with New Range" button

---

## 🔧 FILES CHANGED IN v3.4.1

| File | Change |
|------|--------|
| Navigation.jsx | Reordered icons, "Founding Documents" spelled out |
| SupremeCourtView.jsx | Removed duplicate flourish, kept scales version |
| FoundingDocsView.jsx | Fixed Project 2025 links, removed duplicate flourish |
| ResearchView.jsx | Side-by-side columns, actionable bias slider |
| Footer.jsx | Version bump 3.4.0 → 3.4.1 |
| SettingsView.jsx | Version bump |
| DevToolsView.jsx | Version bump |

---

## 📊 NAVIGATION ORDER (v3.4.1)

| Position | Icon | View | Hover Text |
|----------|------|------|------------|
| 1 | 🔍 | search | Fact Check |
| 2 | 📰 | feed | My Feed |
| 3 | 📷 | mediachecker | Media Checker |
| 4 | 📊 | stats | My Stats |
| 5 | 🛡️ | sources | Trusted Sources |
| 6 | 📁 | ignored | Flagged Sources |
| 7 | ⚖️ | scotus | Supreme Court |
| 8 | 📖 | founding | **Founding Documents** |
| (overflow) | ↔️ | research | Research Mode |
| (overflow) | ❓ | help | How to Use |
| (overflow) | ⚙️ | settings | Settings |
| (overflow) | 🔧 | devtools | DevTools (CTRL+ALT+V) |

---

## 🔗 PROJECT 2025 (Minimal, Factual)

Just a small "Also:" note with three links - not prominently featured:
- Official Site
- Wikipedia  
- Ballotpedia

---

## ⚖️ RESEARCH MODE - BIAS SLIDER

### How It Works

1. **Enable filter:** Check the "Enable bias range filter" checkbox
2. **Set range:** Use sliders to set Left bound (-3 to +3) and Right bound (-3 to +3)
3. **Visual feedback:** Gradient bar shows your selected range
4. **Presets:** Quick buttons for common filters
5. **Refresh:** Click "Refresh Results with New Range" to apply

### Bias Scale
```
-3      -2      -1       0      +1      +2      +3
|       |       |        |       |       |       |
Far    Left   Lean    Center  Lean   Right   Far
Left          Left            Right          Right
```

### Excluded Fringe Sources
These are NEVER included regardless of bias settings:
- Breitbart
- InfoWars  
- OAN
- Newsmax
- Jacobin
- The Intercept

---

## ✅ COMPLETE FEATURE STATUS

### Working (No API Needed)
- ✅ All 12 navigation views
- ✅ Dark/Light mode
- ✅ Rate limiting (5/day)
- ✅ Source toggles & hiding
- ✅ SCOTUS justice data
- ✅ 27 Amendments
- ✅ Founding Documents (8 sections)
- ✅ Political parties (5)
- ✅ Audio/Voice AI detection
- ✅ Feedback system
- ✅ Score tracking
- ✅ Research Mode with bias slider

### Needs API Keys
- ⚠️ Fact-checking: Gemini API
- ⚠️ Live news: NewsData.io API

---

## 🧪 TESTING CHECKLIST FOR v3.4.1

### Navigation
- [ ] Order is: Search, Feed, Media, Stats, Trusted, Flagged, SCOTUS, Founding
- [ ] Hover on Founding shows "Founding Documents" (not "Founding Docs")
- [ ] Research Mode is in overflow menu

### Flourishes
- [ ] Supreme Court: SINGLE flourish with ⚖ scales
- [ ] Founding Documents: SINGLE flourish with ✦ star
- [ ] No double flourishes anywhere

### Project 2025 Links
- [ ] PBS News link works
- [ ] Wikipedia link works
- [ ] All 5 sources accessible

### Research Mode
- [ ] Side-by-side columns (Left, Center, Right)
- [ ] Bias filter checkbox works
- [ ] Sliders adjust range
- [ ] Presets apply correctly
- [ ] Refresh button updates results
- [ ] Fringe sources never appear

---

## 📝 INHERITED FROM v3.4.0

All features from v3.4.0 are included:
- Audio/Voice AI detection (MP3, WAV, M4A, OGG)
- Feedback system (Settings → DevTools)
- Score tracking foundation
- Research Mode (now improved with bias slider)

---

## 🔜 REMAINING FOR FUTURE VERSIONS

See WISHLIST.md for full roadmap:
- v3.5.0: Real Vision API integration
- v4.0.0: Full Research Mode with live aggregation
- Future: Quote cycling, mobile app, browser extension

---

*ProveIt v3.4.1 - "Veritas Lux" • Truth is Light*
