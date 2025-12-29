/**
 * useAnalytics.js - The "Memory Engine" for ProveIt v2.3.3
 * 
 * Handles all local tracking, scoring, and data portability.
 * Privacy-first: Everything stays in localStorage unless explicitly exported.
 */

import { useState, useEffect, useCallback } from 'react'

// Bias weights for scoring
const BIAS_WEIGHTS = {
  'far-left': -3,
  'left': -2,
  'lean-left': -1,
  'center': 0,
  'lean-right': 1,
  'right': 2,
  'far-right': 3,
}

// Storage keys
const STORAGE_KEYS = {
  history: 'proveit_history',
  stats: 'proveit_stats',
  preferences: 'proveit_preferences',
  lastReport: 'proveit_last_report',
  lastLogin: 'proveit_last_login',
}

// Default preferences
const DEFAULT_PREFERENCES = {
  theme: 'dark',
  trackingEnabled: true,
  retentionDays: 30,
  fontSize: 'medium',
}

// Simple obfuscation (not encryption, but not plaintext)
const obfuscate = (data) => {
  try {
    return btoa(encodeURIComponent(JSON.stringify(data)))
  } catch {
    return JSON.stringify(data)
  }
}

const deobfuscate = (data) => {
  try {
    return JSON.parse(decodeURIComponent(atob(data)))
  } catch {
    try {
      return JSON.parse(data)
    } catch {
      return null
    }
  }
}

export function useAnalytics() {
  const [history, setHistory] = useState([])
  const [stats, setStats] = useState(null)
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES)
  const [isStale, setIsStale] = useState(false)
  const [lastLogin, setLastLogin] = useState(null)

  // Load data on mount
  useEffect(() => {
    loadFromStorage()
    updateLastLogin()
  }, [])

  // Recalculate stats when history changes
  useEffect(() => {
    if (history.length > 0) {
      const newStats = calculateStats(history)
      setStats(newStats)
      saveToStorage(STORAGE_KEYS.stats, newStats)
    }
  }, [history])

  // Check for stale security (30 days since last report)
  useEffect(() => {
    const lastReportDate = localStorage.getItem(STORAGE_KEYS.lastReport)
    if (lastReportDate) {
      const daysSinceReport = (Date.now() - new Date(lastReportDate).getTime()) / (1000 * 60 * 60 * 24)
      setIsStale(daysSinceReport > 30)
    }
  }, [])

  const loadFromStorage = () => {
    const storedHistory = localStorage.getItem(STORAGE_KEYS.history)
    if (storedHistory) {
      const parsed = deobfuscate(storedHistory)
      if (parsed) setHistory(parsed)
    }

    const storedPrefs = localStorage.getItem(STORAGE_KEYS.preferences)
    if (storedPrefs) {
      const parsed = deobfuscate(storedPrefs)
      if (parsed) setPreferences({ ...DEFAULT_PREFERENCES, ...parsed })
    }

    const storedLogin = localStorage.getItem(STORAGE_KEYS.lastLogin)
    if (storedLogin) setLastLogin(storedLogin)
  }

  const saveToStorage = (key, data) => {
    localStorage.setItem(key, obfuscate(data))
  }

  const updateLastLogin = () => {
    const now = new Date().toISOString()
    localStorage.setItem(STORAGE_KEYS.lastLogin, now)
    setLastLogin(now)
  }

  const trackView = useCallback((article) => {
    if (!preferences.trackingEnabled) return

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: article.title || 'Unknown',
      source: article.source || 'Unknown',
      url: article.url || '',
      biasRating: article.biasRating || 'center',
      timestamp: article.timestamp || new Date().toISOString(),
      weight: BIAS_WEIGHTS[article.biasRating] || 0,
    }

    setHistory(prev => {
      const updated = [entry, ...prev]
      saveToStorage(STORAGE_KEYS.history, updated)
      return updated
    })
  }, [preferences.trackingEnabled])

  const calculateStats = (data) => {
    if (!data || data.length === 0) {
      return {
        leanScore: 0,
        totalReads: 0,
        biasDistribution: {},
        sourceDiversity: 0,
        topSources: [],
        weeklyTrend: [],
      }
    }

    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - preferences.retentionDays)
    const filteredData = data.filter(item => new Date(item.timestamp) > cutoffDate)

    const totalWeight = filteredData.reduce((sum, item) => sum + item.weight, 0)
    const rawLean = filteredData.length > 0 ? totalWeight / filteredData.length : 0
    const leanScore = Math.max(-10, Math.min(10, rawLean * 3))

    const biasDistribution = filteredData.reduce((acc, item) => {
      const bias = item.biasRating || 'center'
      acc[bias] = (acc[bias] || 0) + 1
      return acc
    }, {})

    const sourceCounts = filteredData.reduce((acc, item) => {
      acc[item.source] = (acc[item.source] || 0) + 1
      return acc
    }, {})

    const topSources = Object.entries(sourceCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    const sourceDiversity = Object.keys(sourceCounts).length / Math.max(filteredData.length, 1)
    const weeklyTrend = calculateWeeklyTrend(filteredData)

    return {
      leanScore: Math.round(leanScore * 10) / 10,
      totalReads: filteredData.length,
      biasDistribution,
      sourceDiversity: Math.round(sourceDiversity * 100),
      topSources,
      weeklyTrend,
    }
  }

  const calculateWeeklyTrend = (data) => {
    const weeks = []
    const now = new Date()
    
    for (let i = 4; i >= 0; i--) {
      const weekStart = new Date(now)
      weekStart.setDate(weekStart.getDate() - (i + 1) * 7)
      const weekEnd = new Date(now)
      weekEnd.setDate(weekEnd.getDate() - i * 7)

      const weekData = data.filter(item => {
        const date = new Date(item.timestamp)
        return date >= weekStart && date < weekEnd
      })

      if (weekData.length > 0) {
        const avgWeight = weekData.reduce((sum, item) => sum + item.weight, 0) / weekData.length
        weeks.push(Math.round(avgWeight * 10) / 10)
      } else {
        weeks.push(0)
      }
    }

    return weeks
  }

  const clearHistory = useCallback((duration) => {
    let cutoffDate = new Date()

    switch (duration) {
      case '12 hours':
        cutoffDate.setHours(cutoffDate.getHours() - 12)
        break
      case '24 hours':
        cutoffDate.setDate(cutoffDate.getDate() - 1)
        break
      case '7 days':
        cutoffDate.setDate(cutoffDate.getDate() - 7)
        break
      case '30 days':
        cutoffDate.setDate(cutoffDate.getDate() - 30)
        break
      case 'all':
      default:
        setHistory([])
        localStorage.removeItem(STORAGE_KEYS.history)
        localStorage.removeItem(STORAGE_KEYS.stats)
        return
    }

    setHistory(prev => {
      const filtered = prev.filter(item => new Date(item.timestamp) > cutoffDate)
      saveToStorage(STORAGE_KEYS.history, filtered)
      return filtered
    })
  }, [])

  const updatePreferences = useCallback((newPrefs) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPrefs }
      saveToStorage(STORAGE_KEYS.preferences, updated)
      return updated
    })
  }, [])

  /**
   * Export as JSON (for data portability)
   */
  const exportData = useCallback(() => {
    const exportPayload = {
      version: '2.3.3',
      exportDate: new Date().toISOString(),
      preferences,
      stats,
      history: history.slice(0, 1000),
      summary: {
        totalArticles: history.length,
        leanScore: stats?.leanScore || 0,
        topSources: stats?.topSources || [],
        dateRange: {
          oldest: history.length > 0 ? history[history.length - 1].timestamp : null,
          newest: history.length > 0 ? history[0].timestamp : null,
        }
      }
    }

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `proveit-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)

    return exportPayload
  }, [history, stats, preferences])

  /**
   * Generate styled HTML report content
   */
  const generateReportHTML = useCallback(() => {
    const currentStats = stats || calculateStats(history)
    const reportDate = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })

    const getLeanLabel = (score) => {
      if (score <= -6) return 'Far Left'
      if (score <= -3) return 'Left'
      if (score <= -1) return 'Lean Left'
      if (score <= 1) return 'Center'
      if (score <= 3) return 'Lean Right'
      if (score <= 6) return 'Right'
      return 'Far Right'
    }

    const biasColors = {
      'far-left': '#1e3a8a',
      'left': '#3b82f6',
      'lean-left': '#60a5fa',
      'center': '#6b7280',
      'lean-right': '#f87171',
      'right': '#ef4444',
      'far-right': '#991b1b',
    }

    const totalDist = Object.values(currentStats.biasDistribution || {}).reduce((a, b) => a + b, 0)
    const distBars = Object.entries(currentStats.biasDistribution || {})
      .map(([bias, count]) => {
        const pct = totalDist > 0 ? Math.round((count / totalDist) * 100) : 0
        return `<div style="display:flex;align-items:center;gap:8px;margin:4px 0;">
          <span style="width:80px;font-size:11px;text-transform:uppercase;">${bias.replace('-', ' ')}</span>
          <div style="flex:1;height:16px;background:#e5e5e5;border-radius:8px;overflow:hidden;">
            <div style="width:${pct}%;height:100%;background:${biasColors[bias] || '#6b7280'}"></div>
          </div>
          <span style="width:50px;font-size:12px;text-align:right;">${count} (${pct}%)</span>
        </div>`
      })
      .join('')

    const sourcesList = (currentStats.topSources || [])
      .map((s, i) => `<li>${i + 1}. <strong>${s.name}</strong> — ${s.count} articles</li>`)
      .join('')

    const recentHistory = history.slice(0, 20)
      .map(h => `<tr>
        <td style="padding:8px;border-bottom:1px solid #eee;font-size:12px;">${new Date(h.timestamp).toLocaleDateString()}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${h.title.substring(0, 60)}${h.title.length > 60 ? '...' : ''}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;"><span style="background:${biasColors[h.biasRating] || '#6b7280'};color:white;padding:2px 6px;border-radius:4px;font-size:10px;text-transform:uppercase;">${h.biasRating}</span></td>
      </tr>`)
      .join('')

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ProveIt Reading Report - ${reportDate}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Inter', sans-serif; 
      background: #f5f2e8; 
      color: #1a1a1a; 
      line-height: 1.6;
      padding: 40px 20px;
    }
    .container { max-width: 800px; margin: 0 auto; }
    .header { 
      text-align: center; 
      margin-bottom: 40px; 
      padding-bottom: 20px;
      border-bottom: 2px solid #c45d2c;
    }
    .header h1 { 
      font-family: 'Playfair Display', serif; 
      font-size: 36px; 
      letter-spacing: 8px;
      margin-bottom: 8px;
    }
    .header .tagline { 
      font-family: 'Crimson Text', serif; 
      font-style: italic; 
      color: #666;
    }
    .header .date { font-size: 12px; color: #999; margin-top: 8px; }
    .card { 
      background: white; 
      border-radius: 12px; 
      padding: 24px; 
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .card h2 { 
      font-family: 'Crimson Text', serif;
      font-size: 20px;
      margin-bottom: 16px;
      color: #c45d2c;
    }
    .lean-score { text-align: center; padding: 20px; }
    .lean-score .score { font-size: 48px; font-weight: bold; color: #c45d2c; }
    .lean-score .label { font-size: 18px; font-weight: 600; margin-top: 8px; }
    .spectrum { height: 20px; border-radius: 10px; display: flex; overflow: hidden; margin: 20px 0; }
    .spectrum > div { flex: 1; }
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center; }
    .stat-item .value { font-size: 28px; font-weight: bold; color: #c45d2c; }
    .stat-item .label { font-size: 12px; color: #666; text-transform: uppercase; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 12px 8px; border-bottom: 2px solid #c45d2c; font-size: 12px; text-transform: uppercase; }
    .footer { 
      text-align: center; 
      padding-top: 20px; 
      border-top: 1px solid #ddd;
      margin-top: 40px;
      font-size: 12px;
      color: #999;
    }
    .footer .quote { font-family: 'Crimson Text', serif; font-style: italic; margin-bottom: 8px; }
    .no-print { margin-bottom: 20px; text-align: center; }
    .no-print button {
      background: #c45d2c;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      margin: 0 8px;
    }
    .no-print button:hover { background: #a34a1f; }
    .no-print button.secondary {
      background: #4a6fa5;
    }
    .no-print button.secondary:hover { background: #3a5a8a; }
    .privacy-notice {
      background: #fef3cd;
      border: 1px solid #ffc107;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 16px;
      font-size: 12px;
      color: #856404;
    }
    @media print {
      body { background: white; padding: 20px; }
      .card { box-shadow: none; border: 1px solid #eee; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Print Controls (hidden when printing) -->
    <div class="no-print">
      <div class="privacy-notice">
        🔒 <strong>Privacy Notice:</strong> Printing uses your browser's built-in print function. 
        Your data is processed locally and is not sent to any external print services. 
        For added security, use a directly connected printer rather than cloud printing services.
      </div>
      <button onclick="window.print()">🖨️ Print to PDF / Printer</button>
      <button class="secondary" onclick="window.close()">Close</button>
    </div>

    <div class="header">
      <div style="color:#c45d2c;margin-bottom:8px;">❧ ✦ ☙</div>
      <h1>P R O V E I T</h1>
      <p class="tagline">Veritas Lux — Truth is Light</p>
      <p class="date">Reading Report • ${reportDate}</p>
    </div>

    <div class="card">
      <h2>📊 Your Political Lean</h2>
      <div class="lean-score">
        <div class="score">${currentStats.leanScore > 0 ? '+' : ''}${currentStats.leanScore}</div>
        <div class="label">${getLeanLabel(currentStats.leanScore)}</div>
      </div>
      <div class="spectrum">
        <div style="background:#1e3a8a"></div>
        <div style="background:#3b82f6"></div>
        <div style="background:#60a5fa"></div>
        <div style="background:#6b7280"></div>
        <div style="background:#f87171"></div>
        <div style="background:#ef4444"></div>
        <div style="background:#991b1b"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11px;color:#666;">
        <span>FAR LEFT</span>
        <span>CENTER</span>
        <span>FAR RIGHT</span>
      </div>
    </div>

    <div class="card">
      <h2>📈 Summary Statistics</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="value">${currentStats.totalReads}</div>
          <div class="label">Articles Read</div>
        </div>
        <div class="stat-item">
          <div class="value">${currentStats.sourceDiversity}%</div>
          <div class="label">Source Diversity</div>
        </div>
        <div class="stat-item">
          <div class="value">${(currentStats.topSources || []).length}</div>
          <div class="label">Unique Sources</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>📰 Reading Distribution</h2>
      ${distBars || '<p style="color:#666;">No data yet</p>'}
    </div>

    <div class="card">
      <h2>🏆 Top Sources</h2>
      ${sourcesList ? `<ol style="padding-left:20px;">${sourcesList}</ol>` : '<p style="color:#666;">No sources tracked yet</p>'}
    </div>

    <div class="card">
      <h2>📜 Recent History</h2>
      ${recentHistory ? `
        <table>
          <thead>
            <tr>
              <th style="width:80px;">Date</th>
              <th>Article</th>
              <th style="width:100px;">Bias</th>
            </tr>
          </thead>
          <tbody>${recentHistory}</tbody>
        </table>
      ` : '<p style="color:#666;">No reading history yet</p>'}
    </div>

    <div class="footer">
      <p class="quote">"The press is the best instrument for enlightening the mind of man"</p>
      <p>ProveIt v2.3.3 • Personal Edition</p>
      <p style="margin-top:8px;">This report was generated from your local data. Your reading history never leaves your device.</p>
    </div>
  </div>
</body>
</html>`
  }, [history, stats, preferences])

  /**
   * Export as styled HTML report (for viewing/printing)
   */
  const exportReport = useCallback(() => {
    const html = generateReportHTML()
    
    // Open in new tab
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    
    // Also offer download
    setTimeout(() => {
      const a = document.createElement('a')
      a.href = url
      a.download = `proveit-report-${new Date().toISOString().split('T')[0]}.html`
      a.click()
    }, 100)

    return html
  }, [generateReportHTML])

  /**
   * Print report directly (opens print dialog)
   */
  const printReport = useCallback(() => {
    const html = generateReportHTML()
    
    // Open in new window and trigger print
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(html)
      printWindow.document.close()
      // Focus is needed for some browsers
      printWindow.focus()
    }
  }, [generateReportHTML])

  const importData = useCallback((jsonData) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData

      if (!data.version || !data.history) {
        throw new Error('Invalid ProveIt export file')
      }

      if (data.preferences) {
        updatePreferences(data.preferences)
      }

      if (data.history && Array.isArray(data.history)) {
        setHistory(prev => {
          const existingIds = new Set(prev.map(item => item.id))
          const newItems = data.history.filter(item => !existingIds.has(item.id))
          const merged = [...prev, ...newItems].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )
          saveToStorage(STORAGE_KEYS.history, merged)
          return merged
        })
      }

      return { success: true, summary: data.summary }
    } catch (error) {
      console.error('Import error:', error)
      return { success: false, error: error.message }
    }
  }, [updatePreferences])

  const markReportSent = useCallback(() => {
    const now = new Date().toISOString()
    localStorage.setItem(STORAGE_KEYS.lastReport, now)
    setIsStale(false)
  }, [])

  const getStats = useCallback(() => {
    return stats || calculateStats(history)
  }, [stats, history])

  return {
    history,
    stats: getStats(),
    preferences,
    isStale,
    lastLogin,
    trackView,
    clearHistory,
    updatePreferences,
    exportData,
    exportReport,
    printReport,      // NEW: Direct print function
    importData,
    markReportSent,
    getStats,
  }
}

export default useAnalytics
