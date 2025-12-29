/**
 * useAnalytics.js - The "Memory Engine" for ProveIt
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
    // Load history
    const storedHistory = localStorage.getItem(STORAGE_KEYS.history)
    if (storedHistory) {
      const parsed = deobfuscate(storedHistory)
      if (parsed) setHistory(parsed)
    }

    // Load preferences
    const storedPrefs = localStorage.getItem(STORAGE_KEYS.preferences)
    if (storedPrefs) {
      const parsed = deobfuscate(storedPrefs)
      if (parsed) setPreferences({ ...DEFAULT_PREFERENCES, ...parsed })
    }

    // Load last login
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

  /**
   * Track an article view
   * @param {Object} article - { title, source, url, biasRating, timestamp }
   */
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

  /**
   * Calculate aggregated stats from history
   */
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

    // Filter by retention period
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - preferences.retentionDays)
    const filteredData = data.filter(item => new Date(item.timestamp) > cutoffDate)

    // Calculate lean score (weighted average, clamped to -10 to +10)
    const totalWeight = filteredData.reduce((sum, item) => sum + item.weight, 0)
    const rawLean = filteredData.length > 0 ? totalWeight / filteredData.length : 0
    const leanScore = Math.max(-10, Math.min(10, rawLean * 3)) // Scale up for visibility

    // Bias distribution
    const biasDistribution = filteredData.reduce((acc, item) => {
      const bias = item.biasRating || 'center'
      acc[bias] = (acc[bias] || 0) + 1
      return acc
    }, {})

    // Source counts
    const sourceCounts = filteredData.reduce((acc, item) => {
      acc[item.source] = (acc[item.source] || 0) + 1
      return acc
    }, {})

    // Top sources
    const topSources = Object.entries(sourceCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    // Source diversity (unique sources / total reads)
    const sourceDiversity = Object.keys(sourceCounts).length / Math.max(filteredData.length, 1)

    // Weekly trend (last 5 weeks)
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

  /**
   * Clear history by duration
   */
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
        // Clear everything
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

  /**
   * Update preferences
   */
  const updatePreferences = useCallback((newPrefs) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPrefs }
      saveToStorage(STORAGE_KEYS.preferences, updated)
      return updated
    })
  }, [])

  /**
   * Export all data as JSON
   */
  const exportData = useCallback(() => {
    const exportPayload = {
      version: '2.3.0',
      exportDate: new Date().toISOString(),
      preferences,
      stats,
      history: history.slice(0, 1000), // Limit to last 1000 entries
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
   * Import data from JSON file
   */
  const importData = useCallback((jsonData) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData

      // Validate structure
      if (!data.version || !data.history) {
        throw new Error('Invalid ProveIt export file')
      }

      // Import preferences (merge with current)
      if (data.preferences) {
        updatePreferences(data.preferences)
      }

      // Import history (append, avoiding duplicates)
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

  /**
   * Mark report as sent (resets stale timer)
   */
  const markReportSent = useCallback(() => {
    const now = new Date().toISOString()
    localStorage.setItem(STORAGE_KEYS.lastReport, now)
    setIsStale(false)
  }, [])

  /**
   * Get stats (computed)
   */
  const getStats = useCallback(() => {
    return stats || calculateStats(history)
  }, [stats, history])

  return {
    // State
    history,
    stats: getStats(),
    preferences,
    isStale,
    lastLogin,

    // Actions
    trackView,
    clearHistory,
    updatePreferences,
    exportData,
    importData,
    markReportSent,
    getStats,
  }
}

export default useAnalytics
