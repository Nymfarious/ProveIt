# ProveIt v2.3.4 Update

## What's New

### Quick Fixes
| Fix | Details |
|-----|---------|
| **Tab title** | "ProveIt" (one word, two caps) |
| **Tab icon** | Green magnifying glass (was lightning) |
| **Shortcut** | `CTRL+ALT+V` for DevTools (was ALT+SHIFT+D) |
| **Terminology** | "Source Variance Score", "spectrum", "threshold" |

### Terminology Changes
- "Source Diversity Score" → **"Source Variance Score"**
- "diverse reading habits" → **"perspective range"**
- Better neutral language throughout

### Feed Improvements
- New filters: **Medical**, **Movies/TV**, **International**
- **Region filter** (US, UK, World)
- **Colorful balance bar** (not gray)
- Al Jazeera, BBC, Reuters in International info

### Stats View
- **Source Variance Score** with 0-100 scale
- Colorful spectrum visualization
- Info popup explaining variance
- **Top 10 Sources** (explicit count)

### Ignored Sources
- **Conspiracy/Disinfo section moved to top**
- **Extreme Left & Right on same row** (Left on left, Right on right)
- **RT explanation** with research context
- **User curation section** with star rating (1-3)
- 2-minute timer explanation

### Settings Reorg
- **Tabbed interface** (Privacy, My Data, API Keys, Email)
- **Current Data Summary moved ABOVE Clear Tracking Data**
- **Subtle export buttons** (not loud chunky ones)
- **Data Retention popup** explaining WoW/MoM/QoQ
- **Auto Weekly Snapshot** toggle

## Files to Replace

```
ProveIt/
├── public/
│   └── favicon.svg              ← REPLACE
├── src/
│   ├── App.jsx                  ← REPLACE
│   └── components/
│       └── features/
│           ├── FeedView.jsx     ← REPLACE
│           ├── IgnoredView.jsx  ← REPLACE
│           ├── SettingsView.jsx ← REPLACE
│           └── StatsView.jsx    ← REPLACE
└── index.html                   ← REPLACE
```

## Keyboard Shortcut

**CTRL+ALT+V** → Toggle DevTools view

---

*ProveIt v2.3.4 - "Veritas Lux"*
