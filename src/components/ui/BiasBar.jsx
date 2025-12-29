export default function BiasBar({ sources = {} }) {
  const { farLeft = 0, left = 0, leanLeft = 0, center = 0, leanRight = 0, right = 0, farRight = 0 } = sources
  const total = farLeft + left + leanLeft + center + leanRight + right + farRight

  if (total === 0) {
    return (
      <div className="h-8 rounded-full bg-ink/10 dark:bg-paper/10 flex items-center justify-center">
        <span className="text-xs text-ink/40 dark:text-paper/40">No data</span>
      </div>
    )
  }

  const getWidth = (value) => `${(value / total) * 100}%`

  return (
    <div className="space-y-2">
      <div className="h-6 rounded-full overflow-hidden flex shadow-inner">
        {farLeft > 0 && <div className="bg-blue-900 h-full transition-all" style={{ width: getWidth(farLeft) }} title={`Far Left: ${farLeft}`} />}
        {left > 0 && <div className="bg-blue-700 h-full transition-all" style={{ width: getWidth(left) }} title={`Left: ${left}`} />}
        {leanLeft > 0 && <div className="bg-blue-500 h-full transition-all" style={{ width: getWidth(leanLeft) }} title={`Lean Left: ${leanLeft}`} />}
        {center > 0 && <div className="bg-slate-400 h-full transition-all" style={{ width: getWidth(center) }} title={`Center: ${center}`} />}
        {leanRight > 0 && <div className="bg-red-500 h-full transition-all" style={{ width: getWidth(leanRight) }} title={`Lean Right: ${leanRight}`} />}
        {right > 0 && <div className="bg-red-700 h-full transition-all" style={{ width: getWidth(right) }} title={`Right: ${right}`} />}
        {farRight > 0 && <div className="bg-red-900 h-full transition-all" style={{ width: getWidth(farRight) }} title={`Far Right: ${farRight}`} />}
      </div>
      
      <div className="flex justify-between text-xs text-ink/50 dark:text-paper/50">
        <span>LEFT</span>
        <span>CENTER</span>
        <span>RIGHT</span>
      </div>
    </div>
  )
}
