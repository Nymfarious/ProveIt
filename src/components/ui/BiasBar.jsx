import { motion } from 'framer-motion'

const biasConfig = [
  { key: 'farLeft', label: 'Far Left', color: 'bg-blue-900' },
  { key: 'left', label: 'Left', color: 'bg-blue-600' },
  { key: 'leanLeft', label: 'Lean Left', color: 'bg-blue-400' },
  { key: 'center', label: 'Center', color: 'bg-gray-400' },
  { key: 'leanRight', label: 'Lean Right', color: 'bg-red-400' },
  { key: 'right', label: 'Right', color: 'bg-red-600' },
  { key: 'farRight', label: 'Far Right', color: 'bg-red-900' },
]

export default function BiasBar({ sources, showLabels = true }) {
  const total = Object.values(sources || {}).reduce((a, b) => a + b, 0)
  if (total === 0) return null

  const activeSegments = biasConfig.filter(b => (sources[b.key] || 0) > 0)

  return (
    <div className="space-y-3">
      {/* Stacked bar */}
      <div className="flex h-8 rounded-lg overflow-hidden border border-ink/10 dark:border-paper/10">
        {activeSegments.map((bias, index) => {
          const count = sources[bias.key] || 0
          const percentage = (count / total) * 100
          
          return (
            <motion.div
              key={bias.key}
              className={`${bias.color} relative group cursor-pointer flex items-center justify-center`}
              style={{ width: `${percentage}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-ink dark:bg-paper text-paper dark:text-ink text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                {bias.label}: {count} ({Math.round(percentage)}%)
              </div>
              
              {/* Count */}
              {percentage > 12 && (
                <span className="text-white text-sm font-medium">
                  {count}
                </span>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      {showLabels && (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
          {activeSegments.map((bias) => (
            <div key={bias.key} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded ${bias.color}`} />
              <span className="text-ink/60 dark:text-paper/60">
                {bias.label} ({sources[bias.key]})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
