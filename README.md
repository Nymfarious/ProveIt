# P R O V E I T

> *"Veritas Lux"* — Truth is Light

A personal fact-checking and news bias analysis tool that combines the wisdom of the printing press era with futuristic AI-powered analysis.

```
╔═══════════════════════════════════════════════════════════╗
║                      P R O V E I T                        ║
║              ─────── ✦ ───────                           ║
║                 "Veritas Lux"                             ║
╚═══════════════════════════════════════════════════════════╝
```

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/Nymfarious/ProveIt.git
cd ProveIt

# Copy environment file and add your API keys
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/ProveIt/`

## 🔑 API Keys Required

Create a `.env` file with your API keys:

```env
VITE_NEWSDATA_KEY=your_newsdata_key
VITE_GEMINI_API_KEY=your_gemini_key
```

| Service | Purpose | Get Key |
|---------|---------|---------|
| [NewsData.io](https://newsdata.io) | News aggregation (free: 200/day) | Required |
| [Google Gemini](https://ai.google.dev) | AI fact-checking (free tier) | Required |

## ✨ Features

### 🔍 Fact Check (Search View)
- Paste any URL or claim to verify
- AI-powered analysis with confidence scores
- Verdict: TRUE / MOSTLY TRUE / MIXED / MOSTLY FALSE / FALSE

### 📰 News Feed
- Live news from NewsData.io
- Category filtering (Top, Politics, Business, Tech, Science, Health)
- Bias indicators per source (coming soon)

### 📊 Your Stats
- See where you lean on the political spectrum
- Reading distribution visualization
- Weekly trend tracking
- Top sources breakdown

### 📁 Ignored Sources ("Spam Folder")
- Filter extreme left/right sources
- Quarantine conspiracy/disinfo sites
- Still see summaries of what they're saying

### ⚙️ Settings
- API key configuration
- Privacy controls (pause/wipe/export)
- Email report scheduling

### 🔧 DevTools
- Personal API status
- Usage tracking
- Endpoint documentation

## 🎨 Design Philosophy

**Gutenberg Meets Futuristic Newsroom**

- **Typography**: Serif mastheads (Playfair Display) + clean sans body (Inter)
- **Colors**: Ink black, cream paper, copper accents, steel blue
- **Aesthetic**: Paper textures, ornamental dividers, printing press imagery

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Google Gemini SDK
- **News**: NewsData.io API

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx      # Masthead
│   │   ├── Navigation.jsx  # Icon nav
│   │   └── Footer.jsx      # Printing press footer
│   ├── features/
│   │   ├── SearchView.jsx  # Fact-checking
│   │   ├── FeedView.jsx    # News feed
│   │   ├── StatsView.jsx   # Analytics
│   │   ├── IgnoredView.jsx # Filtered sources
│   │   ├── SettingsView.jsx
│   │   └── DevToolsView.jsx
│   └── ui/
│       └── BiasBar.jsx     # Bias visualization
├── lib/
│   ├── gemini.js   # AI integration
│   ├── news.js     # NewsData.io client
│   ├── supabase.js # Database (optional)
│   └── utils.js    # Helpers
└── index.css       # Tailwind + custom styles
```

## 🚢 Deployment

### GitHub Pages (Automatic)

Push to `main` branch → GitHub Actions deploys to Pages automatically.

**Setup once:**
1. Go to repo Settings → Pages
2. Source: "GitHub Actions"
3. Add secrets (Settings → Secrets → Actions):
   - `VITE_NEWSDATA_KEY`
   - `VITE_GEMINI_API_KEY`

### Manual Build

```bash
npm run build
# Output in ./dist
```

## 📊 Roadmap

- [x] v0.1.0 - Core UI, Gemini integration, NewsData.io
- [ ] v0.2.0 - MBFC bias database, source ratings
- [ ] v0.3.0 - Multi-AI comparison (Claude, ChatGPT)
- [ ] v0.4.0 - Email reports, Personal API
- [ ] v1.0.0 - Full feature parity, Little Sister (simplified version)

## 📜 License

MIT License

---

<p align="center">
  <em>"The press is the best instrument for enlightening the mind of man"</em><br>
  <small>— Thomas Jefferson, 1786</small>
</p>
