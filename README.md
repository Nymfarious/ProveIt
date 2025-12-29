# ProveIt v2.4.0 Update

## What's New

### Bug Fixes
| Bug | Fix |
|-----|-----|
| **How to Use mixed with Search** | Separated into dedicated HelpView (? icon in nav) |
| **Flourish missing in footer** | Added ❧ ✦ ☙ flourish to Footer, Settings, throughout |

### New Features

#### Supreme Court Integration (Scale icon)
- **Current Docket**: Active cases with status, issue summaries, oral argument dates
- **Shadow Docket**: Emergency orders and stays with vote breakdowns
- **The Court**: All 9 justices with appointment info
- Links to supremecourt.gov and Oyez

#### Feed History (Clock icon in Feed)
- **30-day history** of previous feed refreshes
- Navigate between past feeds with timestamps
- "Live Feed" indicator for current content
- Compare what was trending at different times

### Navigation Updates
New icons in navigation bar:
- ⚖️ **Scale** - Supreme Court
- ❓ **Help Circle** - How to Use guide

### Files to Replace

```
ProveIt/
├── public/
│   └── favicon.svg              ← (same as v2.3.4)
├── src/
│   ├── App.jsx                  ← REPLACE (adds HelpView, SupremeCourtView)
│   └── components/
│       ├── layout/
│       │   ├── Navigation.jsx   ← REPLACE (new icons)
│       │   └── Footer.jsx       ← REPLACE (proper flourish)
│       └── features/
│           ├── SearchView.jsx       ← REPLACE (clean, no How to Use)
│           ├── HelpView.jsx         ← NEW FILE
│           ├── SupremeCourtView.jsx ← NEW FILE
│           ├── FeedView.jsx         ← REPLACE (history tabs)
│           ├── SettingsView.jsx     ← REPLACE (footer flourish)
│           ├── StatsView.jsx        ← (same as v2.3.4)
│           └── IgnoredView.jsx      ← (same as v2.3.4)
└── index.html                   ← (same as v2.3.4)
```

## How to Apply

```bash
cd ~/path/to/ProveIt

# Copy all files from the zip
# New files: HelpView.jsx, SupremeCourtView.jsx

git add .
git commit -m "v2.4.0 - Supreme Court, Feed History, How to Use page, flourish fix"
git push
```

## Keyboard Shortcut

**CTRL+ALT+V** → Toggle DevTools view

## Flourish Reference

The proper flourish used throughout:
```
❧ ─── ✦ ─── ☙
```

This appears in:
- Header (masthead)
- Footer
- Settings panel (About section)
- HelpView headers
- SupremeCourtView (with ⚖ variant)

---

*ProveIt v2.4.0 - "Veritas Lux"*
