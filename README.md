# ProveIt v3.2.0 - Founding Documents Expansion

## 📚 New Documents Added

### 1. Magna Carta (1215)
- Full historical context
- Key clauses → American influence mapping
- Timeline from 1215 to Bill of Rights
- "Still in force" facts
- Links to British Library, UK National Archives, LOC

### 2. Mayflower Compact (1620)
- Complete original text
- Plain English explanation
- Significance to self-government
- Links to Pilgrim Hall Museum, LOC

### 3. Articles of Confederation (1781-1789)
- 6 key weaknesses explained
- 3 crises that proved reform necessary (Shays' Rebellion, Trade Wars, Currency)
- Why it failed → led to Constitutional Convention
- Links to National Archives

### 4. Federalist Papers Briefing (1787-1788)
- All 3 authors with essay counts and focus areas
- 5 key essays summarized (#10, #51, #70, #78, #84)
- Anti-Federalist response section
- Links to LOC, Yale Avalon Project, Constitution Center

### 5. Bill of Rights: Three Attempts History
- **Attempt 1 (1787):** Constitutional Convention - REJECTED
  - George Mason proposed, defeated 10-0
  - Why it failed: delegates tired, feared omissions
- **Attempt 2 (1787-88):** Ratification Debates - PROMISED
  - Anti-Federalists demanded, Federalists promised
  - States submitted 200+ proposed amendments
- **Attempt 3 (1789-91):** First Congress - RATIFIED
  - Madison introduced 19, House approved 17, Senate reduced to 12, states ratified 10
  - Drew from Virginia Declaration of Rights
- The 2 that weren't ratified (one became 27th Amendment 203 years later!)

### 6. All 27 Amendments (unchanged from v3.1.2)
- Complete text, searchable
- REPEALED badge on 18th

---

## 🔌 SYSTEM STATUS BRIEFING

### ✅ FULLY HOOKED UP & WORKING

| Feature | Status | Storage |
|---------|--------|---------|
| Dark/Light Mode | ✅ Working | localStorage |
| Navigation + Overflow | ✅ Working | - |
| Rate Limiting (5/day) | ✅ Working | localStorage |
| Source Category Toggles | ✅ Working | localStorage |
| Feed History (30 days) | ✅ Working | In-memory |
| SCOTUS Justice Data | ✅ Static data | - |
| All 27 Amendments | ✅ Complete text | - |
| All Founding Documents | ✅ NEW in v3.2.0 | - |
| Bias Meters | ✅ Working | - |
| POV Analysis | ✅ Working | - |
| DevTools Unlock | ✅ Working | localStorage |

### ⚠️ NEEDS API KEYS (Demo mode until configured)

| Feature | API Needed | How to Enable | Current Fallback |
|---------|------------|---------------|------------------|
| **Fact-checking AI** | Google Gemini | Add key in DevTools or .env | Shows error message |
| **Live News Feed** | NewsData.io | Add `VITE_NEWSDATA_KEY` | Returns 3 demo articles |
| **SCOTUS News** | (none needed) | Static mock data | Shows mock headlines |

### 🔧 HOOKING UP IN v3.2.0

| Feature | What Changed |
|---------|--------------|
| Founding Docs Hub | Complete rewrite with 7 document sections |
| External Links | Every section now has "Comprehensive Resources" |
| Bill of Rights History | Full 3-attempts narrative |
| Federalist Briefing | Key essays with summaries |

### 🔜 STILL PENDING (Future Versions)

| Feature | Target | Notes |
|---------|--------|-------|
| Research Mode | v3.3.0 | Side-by-side source comparison |
| Quote Cycling | v3.3.0 | Rotating footer quotes |
| Magic Link Invites | v3.4.0 | Email-based unlimited access |
| Real Media AI Detection | v3.5.0 | Needs vision API integration |
| Score Change Tracking | v3.4.0 | Week-over-week bias trends |
| Narrative Match Detection | v4.0.0 | Advanced NLP feature |
| Auto-Snapshots | v4.0.0 | WoW/MoM/QoQ reports |

---

## 📜 What's in the Founding Documents Hub

```
Overview ─────────── Timeline from Magna Carta to 27th Amendment
│
├── Magna Carta (1215)
│   ├── Historical context
│   ├── 4 key clauses → American influence
│   ├── Timeline (1215-1791)
│   └── Resources: British Library, UK Archives, LOC
│
├── Mayflower Compact (1620)
│   ├── Full original text
│   ├── Plain English
│   ├── 4 significance points
│   └── Resources: Pilgrim Hall, LOC
│
├── Articles of Confederation (1781)
│   ├── 6 key weaknesses
│   ├── 3 crises
│   └── Resources: National Archives
│
├── Federalist Papers (1787-88)
│   ├── 3 authors with focus areas
│   ├── 5 key essays (#10, 51, 70, 78, 84)
│   ├── Anti-Federalist response
│   └── Resources: LOC, Yale Avalon, Constitution Center
│
├── Bill of Rights History
│   ├── Attempt 1: 1787 Convention (REJECTED)
│   ├── Attempt 2: 1787-88 Ratification (PROMISED)
│   ├── Attempt 3: 1789-91 Congress (RATIFIED)
│   ├── The 2 not ratified
│   └── Resources: Archives, LOC, Constitution Center
│
└── All 27 Amendments (1791-1992)
    ├── Searchable
    ├── Full text + plain English
    └── REPEALED badge on 18th
```

---

## 🔗 External Resource Links Added

### Magna Carta
- https://www.bl.uk/magna-carta (British Library)
- https://www.nationalarchives.gov.uk/education/resources/magna-carta/
- https://www.loc.gov/exhibits/magna-carta-muse-and-mentor/

### Mayflower Compact
- https://www.pilgrimhall.org/mayflower_compact.htm
- https://www.loc.gov/item/90898037/

### Articles of Confederation
- https://www.archives.gov/milestone-documents/articles-of-confederation
- https://www.loc.gov/item/90898154/

### Federalist Papers
- https://guides.loc.gov/federalist-papers
- https://avalon.law.yale.edu/subject_menus/fed.asp (Yale Avalon)
- https://constitutioncenter.org/the-constitution/historic-document-library/detail/the-federalist-papers

### Bill of Rights
- https://www.archives.gov/founding-docs/bill-of-rights
- https://www.loc.gov/exhibits/creating-the-united-states/creating-the-bill-of-rights.html
- https://constitutioncenter.org/the-constitution/amendments

### Declaration & Constitution
- https://www.archives.gov/founding-docs/declaration-transcript
- https://www.archives.gov/founding-docs/constitution-transcript
- https://constitutioncenter.org/the-constitution
- https://constitution.congress.gov/

---

## 🧪 Testing Checklist

### New Document Sections
- [ ] Overview → shows timeline from 1215 to 1992
- [ ] Magna Carta → 4 clauses with American influence
- [ ] Mayflower → full text + plain English
- [ ] Articles → 6 weaknesses + 3 crises
- [ ] Federalist → 3 authors + 5 key essays
- [ ] Bill of Rights History → 3 attempts with outcomes
- [ ] All Amendments → searchable, 27 entries

### External Links
- [ ] All "Comprehensive Resources" links open in new tab
- [ ] Links in Overview "Quick Links" section work
- [ ] Constitution Center, LOC, Archives all accessible

### Existing Features (Regression)
- [ ] Dark mode toggle works
- [ ] Nav overflow "More" menu works
- [ ] Rate limiting counter shows
- [ ] Source toggles save preferences
- [ ] SCOTUS bias meters display

---

## 📁 Files Changed

```
ProveIt-v3.2.0/
└── src/components/features/
    └── FoundingDocsView.jsx  ← MAJOR REWRITE (700+ lines)
```

All other files: version bump only (3.1.2 → 3.2.0)

---

## 🎯 What Else Is Relevant?

Documents we could add in future versions:
- **Virginia Declaration of Rights (1776)** - Mason's template for Bill of Rights
- **Northwest Ordinance (1787)** - Banned slavery in new territories
- **English Bill of Rights (1689)** - Direct Magna Carta → US influence link
- **Declaration of the Rights of Man (1789)** - French parallel, Lafayette + Jefferson
- **Emancipation Proclamation (1863)** - Led to 13th Amendment
- **Civil Rights Act (1964)** - 14th Amendment enforcement

---

*ProveIt v3.2.0 - "Veritas Lux" • Truth is Light*
