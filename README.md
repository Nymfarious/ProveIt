# ProveIt v3.1.1 - Bug Fix + Feature Release

**v3.1.1 = Bug Fix (3.1.0) + Features (3.1.1) combined**

---

## 🐛 Bug Fix (from v3.1.0)

### Source Category Toggles
- **Issue:** Users couldn't disable Legal or Medical sources as trusted resources
- **Fix:** Added toggle controls in Trusted Sources view
- **How it works:**
  - Three toggles for Political, Legal, Medical
  - Disabled categories show "(off)" indicator
  - Preferences saved to localStorage
  - Disabled sources won't be used in fact-check analysis

---

## 🆕 New Features (v3.1.1)

### 1. Justice Bias Meters (Supreme Court View)
- Visual bias meter for each justice (-2 to +2 scale)
- Based on Martin-Quinn scores and voting patterns
- Labels: Very Liberal → Liberal → Conservative → Very Conservative
- Agreement rate percentage with majority decisions
- "About Bias Ratings" explainer popup

### 2. Case POV Analysis (Supreme Court View)
- 5 perspectives on each major ruling:
  - Far Left, Left, Center, Right, Far Right
- Color-coded panels for each viewpoint
- Collapsible under "View Perspectives Analysis" button
- Disclaimer that these are synthesized from common arguments

### 3. Media Authenticity Checker (NEW VIEW)
- Upload images, GIFs, or videos for analysis
- **18+ detection markers** in 3 categories:
  - **Common:** Fingers, text, symmetry, lighting, edges
  - **Uncommon:** Earrings, teeth, hair, patterns, reflections
  - **Advanced:** Metadata, compression, noise, perspective, watermarks
- Authenticity spectrum (Likely Fake ↔ Likely Real)
- Expandable checklist showing detected issues
- Download report button

### 4. Founding Documents Hub (NEW VIEW)
- **Declaration of Independence**
- **U.S. Constitution**
- **Bill of Rights & Amendments**
- Each section includes:
  - Original text excerpt (italic)
  - "Plain English" layman's explanation (freshman US History level)
  - Links to trusted resources (National Archives, LOC)
- Quick Facts panel (56 signers, 7 articles, 27 amendments)

---

## 📁 Files Added/Changed

```
ProveIt-v3.1.1/
├── src/
│   ├── App.jsx                      ← Added 2 new views
│   └── components/
│       ├── layout/
│       │   └── Navigation.jsx       ← Camera + BookOpen icons
│       └── features/
│           ├── SourcesView.jsx      ← BUG FIX: Toggle controls
│           ├── SupremeCourtView.jsx ← Bias meters + POV analysis
│           ├── MediaCheckerView.jsx ← NEW: Authenticity checker
│           └── FoundingDocsView.jsx ← NEW: Documents hub
└── README.md
```

---

## 🧪 Testing Checklist

### Trusted Sources (Bug Fix)
- [ ] Navigate to Shield icon → Sources
- [ ] See "Active Source Categories" section at top
- [ ] Toggle Political OFF → shows "(off)" in tab
- [ ] Toggle Legal OFF → disabled sources won't be used
- [ ] Toggle Medical OFF → same behavior
- [ ] Refresh page → preferences persist

### Justice Bias Meters
- [ ] Navigate to Supreme Court → The Court tab
- [ ] Each justice shows gradient bias bar
- [ ] Marker position reflects liberal ↔ conservative lean
- [ ] Bias label shows (Very Liberal, Liberal, Conservative, etc.)
- [ ] Agreement % shows on right side
- [ ] "About Bias Ratings" info popup works

### Case POV Analysis
- [ ] Navigate to Supreme Court → Current Docket
- [ ] Expand a case (e.g., Trump v. United States)
- [ ] Click "View Perspectives Analysis"
- [ ] 5 colored panels appear (Far Left → Far Right)
- [ ] Each has appropriate background color
- [ ] Collapse works

### Media Authenticity Checker
- [ ] Navigate to Camera icon
- [ ] Drop zone appears for upload
- [ ] Upload an image → preview shows
- [ ] Click "Check Authenticity"
- [ ] Loading spinner appears
- [ ] Results show: verdict, score, spectrum
- [ ] Expand checklist sections
- [ ] Detected issues show AlertTriangle icon
- [ ] Clear issues show CheckCircle icon
- [ ] "Check Another" clears state

### Founding Documents Hub
- [ ] Navigate to BookOpen icon
- [ ] Three document cards show (Declaration, Constitution, Amendments)
- [ ] Click each → content changes
- [ ] Expand sections → original + plain English show
- [ ] "Trusted Resources" links work
- [ ] Quick Facts show at bottom

### Navigation
- [ ] 11 icons total now
- [ ] Scrollable on mobile if needed
- [ ] All icons lead to correct views

---

## 🎨 UI/UX Notes

### Bias Meter Colors
- Blue gradient = Liberal/Left
- Slate gray = Center
- Red gradient = Conservative/Right

### POV Panel Colors
- Far Left: Blue-900 (dark blue)
- Left: Blue-600
- Center: Slate-500
- Right: Red-600
- Far Right: Red-900 (dark red)

### Media Checker Severity
- High severity: Burgundy
- Medium severity: Copper
- Low severity: Steel

---

## 🚀 Deployment

```bash
cd ~/path/to/ProveIt
# Extract v3.1.1 files
npm run build
# Deploy as usual
```

---

*ProveIt v3.1.1 - "Veritas Lux" • Truth is Light*
