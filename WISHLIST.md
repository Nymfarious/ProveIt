# ProveIt Wishlist & Roadmap

## ✅ COMPLETED (v3.4.0)

### Core Features
- [x] Fact-checking with AI (Gemini integration)
- [x] Live news feed (NewsData.io integration)
- [x] Rate limiting (5 checks/day, DevMode bypasses)
- [x] Dark/Light mode
- [x] Source bias ratings
- [x] 27 Amendments with full text
- [x] SCOTUS justice data with bias meters
- [x] POV analysis for court cases

### v3.3.0 Additions
- [x] Audio/Voice AI detection (MP3, WAV, M4A, OGG)
- [x] 18 voice detection markers
- [x] Individual source hiding (CDC, NIH, etc.)
- [x] Political party platforms (5 parties)
- [x] Project 2025 credible sources
- [x] English Bill of Rights (1689)
- [x] Emancipation Proclamation
- [x] 8 Federalist Papers with 9th grade explanations
- [x] 5 AI critical thinking questions

### v3.4.0 Additions
- [x] Feedback system (localStorage, viewable in DevTools)
- [x] Score tracking foundation
- [x] Research Mode (beta)
- [x] Softer medical disclaimers

---

## 🔜 PLANNED (Next Versions)

### v3.5.0 - Vision API Integration
- [ ] Real Gemini Vision API for images
- [ ] Actual AI-powered detection (not mock)
- [ ] Confidence scores from real model
- [ ] Spectral analysis for audio (if API supports)

### v4.0.0 - Full Research Mode
- [ ] Live aggregation from 20+ sources
- [ ] Side-by-side article text comparison
- [ ] Fact consensus highlighting
- [ ] Timeline view of coverage evolution
- [ ] Save and share research sessions

### v4.1.0 - Score Tracking Reports
- [ ] Week-over-week comparison
- [ ] Month-over-month trends
- [ ] Bias drift alerts
- [ ] Export as PDF report

---

## 💭 WISHLIST (Future Ideas)

### Content & Analysis
- [ ] Quote cycling in footer (rotating Founding Father quotes)
- [ ] Narrative match detection (NLP)
- [ ] Podcast/video transcript analysis
- [ ] Social media post analysis
- [ ] Claim database with history
- [ ] Integration with external fact-check databases (Snopes, PolitiFact API)

### User Features
- [ ] Magic link invites (share unlimited access tokens)
- [ ] User accounts with cloud sync
- [ ] Export fact-checks as shareable links
- [ ] Personal bias score over time
- [ ] Reading streaks and achievements

### Platform Expansion
- [ ] Mobile app (React Native or PWA)
- [ ] Browser extension
- [ ] Chrome/Firefox quick-check popup
- [ ] Slack/Discord bot integration
- [ ] API for third-party integration

### Accessibility & Localization
- [ ] Multi-language support
- [ ] Screen reader optimization
- [ ] High contrast mode
- [ ] Keyboard navigation improvements
- [ ] Reduced motion option

### Advanced Features
- [ ] Auto-snapshots (QoQ reports)
- [ ] Source reliability scoring (machine learning)
- [ ] Claim propagation tracking (how stories spread)
- [ ] Citation network visualization
- [ ] Fact-check collaboration (multiple users)

---

## 📝 Notes for Demo Tester

When testing, please note:
1. **Mock data:** Without API keys, some features show demo/mock results
2. **Feedback:** Submit via Settings → Send Feedback (stored locally)
3. **DevTools:** Unlock with code "VERITAS"
4. **Breaking anything:** Feel free to try breaking things - that is the point!

Priority areas to test:
- Flow from search → result → sources
- Dark mode across all screens
- Mobile responsiveness
- Navigation overflow on small screens
- All founding documents load correctly
- SCOTUS data is accurate

---

## 🔗 Integration Notes

### For Juniper Voice Assistant
- `gemini.js` exports: `checkFact(claim, apiKey)`
- `trustedSources.js` exports: `TRUSTED_SOURCES`, `getBiasLabel(bias)`
- Score data: `localStorage.getItem('proveit-score-history')`

### For MDT
- All localStorage keys start with `proveit-`
- Feedback format documented in README
- Export function available in Settings

---

*Last updated: v3.4.0*
