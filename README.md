# ProveIt

**Personal Fact-Checker & Media Bias Tracker**

*Veritas Lux — Truth is Light*

---

## Overview

ProveIt is a privacy-first news consumption tool that helps you understand the political lean of your reading habits. It tracks the bias of news sources you read, calculates your "political lean score," and provides factuality ratings for sources.

**Key Features:**
- 📊 Real-time bias tracking with visual lean score
- 🛡️ Factuality ratings (High/Mixed/Low/Unverified)
- 📰 News feed with bias indicators
- 📈 Reading statistics and trends
- 📧 Email reports via Supabase Auth
- 🖨️ Privacy-first PDF/print export
- 💾 JSON data export/import for portability

---

## Privacy Commitment

ProveIt operates on a **"Local-First"** architecture:

- ✅ All analytics calculated on YOUR device
- ✅ Reading history stored in browser localStorage
- ✅ No tracking across websites
- ✅ No data sold or shared
- ✅ Export/delete your data anytime
- ✅ Open source (MIT License)

---

## Tech Stack

- **Frontend:** React 19 + Vite 7
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **Auth:** Supabase (Magic Link)
- **AI:** Google Gemini SDK
- **News API:** NewsData.io
- **Hosting:** GitHub Pages

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- API Keys for:
  - [NewsData.io](https://newsdata.io/)
  - [Google Gemini](https://ai.google.dev/)
  - [Supabase](https://supabase.com/) (optional, for email reports)

### Installation

```bash
# Clone the repository
git clone https://github.com/Nymfarious/ProveIt.git
cd ProveIt

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your API keys to .env
VITE_NEWSDATA_KEY=your_newsdata_key
VITE_GEMINI_API_KEY=your_gemini_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start development server
npm run dev
```

### Deployment

```bash
# Build for production
npm run build

# Deploy to GitHub Pages (via Actions)
git push origin main
```

---

## Features

### Bias Ratings

Sources are rated on a 7-point scale:
- **Far Left** (-3)
- **Left** (-2)
- **Lean Left** (-1)
- **Center** (0)
- **Lean Right** (+1)
- **Right** (+2)
- **Far Right** (+3)

Ratings sourced from [Media Bias/Fact Check](https://mediabiasfactcheck.com/).

### Factuality Ratings

- 🛡️ **High** — Strong track record, rarely publishes false info
- ⚠️ **Mixed** — Inconsistent, occasional errors
- 🚨 **Low** — Poor track record, may promote misinformation
- ❓ **Unverified** — Not in our database

### Developer Tools

Press `Alt + Shift + D` to toggle DevTools panel.

---

## Roadmap

### v2.4.0
- [ ] Historical import (up to 12 months)
- [ ] Source drift tracking over time

### v2.5.0
- [ ] International comparison (US vs EU spectrum)
- [ ] UK, France, Germany overlays

### v3.0.0 (Congress Edition)
- [ ] Library of Congress data
- [ ] Voting record analysis

### v4.0.0 (Courts Edition)
- [ ] SCOTUS Justice tracking
- [ ] Constitutional interpretation scale

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024-2025 Nymfarious (Shannon)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## Contributing

Contributions welcome! Please read our contributing guidelines before submitting PRs.

---

## Credits

- Bias data: [Media Bias/Fact Check](https://mediabiasfactcheck.com/)
- News API: [NewsData.io](https://newsdata.io/)
- AI: [Google Gemini](https://ai.google.dev/)
- Design: "Gutenberg meets futuristic newsroom" aesthetic

---

## Contact

- GitHub: [@Nymfarious](https://github.com/Nymfarious)
- Project: [ProveIt](https://github.com/Nymfarious/ProveIt)

---

*"The press is the best instrument for enlightening the mind of man" — Thomas Jefferson, 1786*
