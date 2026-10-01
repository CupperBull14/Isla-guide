import { motion, useReducedMotion } from 'framer-motion'
import type { Stat } from '../../types'
import { site } from '../../data/site'

function fillPercent(stat: Stat): number | null {
  if (stat.value === null || stat.max === null || stat.max <= 0) return null
  const ratio = stat.scale === 'sqrt' ? Math.sqrt(stat.value / stat.max) : stat.value / stat.max
  return Math.max(2, Math.min(100, ratio * 100))
}

export function StatBar({ stat, index = 0 }: { stat: Stat; index?: number }) {
  const reduce = useReducedMotion()
  const pct = fillPercent(stat)
  const valueText =
    stat.value === null ? site.noData : `${stat.value.toLocaleString('ru-RU')}${stat.unit ? ` ${stat.unit}` : ''}`

  return (
    <div className="rounded-xl border border-isle-600 bg-isle-800 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-bone-300">{stat.label}</span>
        <span className="text-sm font-semibold text-bone-100">{valueText}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-isle-600">
        {pct !== null ? (
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-moss-600 to-amber-400"
            initial={{ width: reduce ? `${pct}%` : 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
          />
        ) : null}
      </div>
      {stat.note ? <p className="mt-2 text-xs leading-relaxed text-bone-500">{stat.note}</p> : null}
    </div>
  )
}
