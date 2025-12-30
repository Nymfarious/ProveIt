# ProveIt v3.4.2 Update Notes

**Release Date:** December 30, 2025  
**Type:** Minor Update (Bug Fixes + Developer Features)

---

## What Changed

### 1. Contraction Removal (Professional Polish)
All contractions have been replaced with full words throughout the interface:

| File | Original | Fixed |
|------|----------|-------|
| SourcesView.jsx | "don't trust" | "do not trust" |
| SourcesView.jsx | "don't want" | "do not want" |
| SourcesView.jsx | "won't be used" (2x) | "will not be used" |
| ResearchView.jsx | "that's likely" | "that is likely" |
| StatsView.jsx | "you're exposed" | "you are exposed" |
| StatsView.jsx | "you're reading" | "you are reading" |
| SettingsView.jsx | "doesn't send" | "does not send" |
| IgnoredView.jsx | "you've viewed" | "you have viewed" |
| WISHLIST.md | "that's the point" | "that is the point" |

### 2. DevTools: 7-Day Test Data Generator
New feature for testers to simulate a week of app usage:

- **Load 7 Days of Test Data** button generates:
  - Realistic reading history across bias spectrum
  - Weekday vs weekend usage patterns
  - Sample fact-checks and media checks
  - Sample feedback entries (bugs, suggestions, etc.)
  
- **Clear All Test Data** button removes all generated data

### 3. DevTools: API Key Clarity
Added clear explanation about where API keys are stored:

```
• DevTools key     → Saved in your browser (localStorage)
• .env file        → Used at build time only (for deployment)
• Supabase secrets → Backup for deployed app
```

**Important:** Keys entered in DevTools do NOT modify any files. They persist only in that specific browser.

### 4. Version Bump
- Footer updated to v3.4.2
- DevToolsView system info shows v3.4.2

---

## Files to Replace

Copy these files to your project, replacing existing versions:

```
src/components/features/
├── DevToolsView.jsx      ← NEW: Test data generator + API clarity
├── SourcesView.jsx       ← FIXED: Contractions
├── ResearchView.jsx      ← FIXED: Contractions
├── StatsView.jsx         ← FIXED: Contractions
├── SettingsView.jsx      ← FIXED: Contractions
├── IgnoredView.jsx       ← FIXED: Contractions
├── MediaCheckerView.jsx  ← No changes (confirmed contraction-free)

src/components/layout/
├── Footer.jsx            ← Updated version number

WISHLIST.md               ← FIXED: Contractions
```

---

## Deployment Steps

1. **Backup current files** (or rely on git)

2. **Copy new files** to your local repo:
   ```bash
   # From the extracted zip:
   cp -r src/components/features/*.jsx /path/to/ProveIt/src/components/features/
   cp src/components/layout/Footer.jsx /path/to/ProveIt/src/components/layout/
   cp WISHLIST.md /path/to/ProveIt/
   ```

3. **Commit and push:**
   ```bash
   git add -A
   git commit -m "v3.4.2: Remove contractions, add test data generator"
   git push origin main
   ```

4. **Wait for GitHub Actions** to deploy

---

## Testing Checklist

After deployment, verify:

- [ ] DevTools unlocks with "VERITAS"
- [ ] "Load 7 Days of Test Data" populates Score Tracking
- [ ] "Load 7 Days of Test Data" populates Feedback section
- [ ] "Clear All Test Data" removes everything
- [ ] API key explanation text is visible and clear
- [ ] Footer shows "v3.4.2"
- [ ] Search "don't" in codebase returns 0 results
- [ ] All screens render without errors

---

## Notes for Tester

1. **API Keys in DevTools vs .env:**
   - If you add a key in DevTools, it only works in YOUR browser
   - The deployed app uses keys from GitHub Secrets → Vercel/Supabase
   - Both can be set; DevTools key takes priority if present

2. **Test Data is Realistic:**
   - Shows slight left-leaning reading pattern (common in news readers)
   - Weekend activity is lower than weekdays
   - Feedback samples cover different categories

3. **No Contractions Policy:**
   - Professional documentation standard
   - Easier for non-native English speakers
   - Cleaner for potential translation

---

*Last updated: v3.4.2*
