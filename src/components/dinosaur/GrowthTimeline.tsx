import { motion, useReducedMotion } from 'framer-motion'
import type { GrowthStage } from '../../types'
import { site } from '../../data/site'

function formatMinutes(minutes: number | null): string {
  if (minutes === null) return site.noData
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} мин`
  return m === 0 ? `${h} ч` : `${h} ч ${m} мин`
}

export function GrowthTimeline({ stages }: { stages: GrowthStage[] }) {
  const reduce = useReducedMotion()
  return (
    <ol className="relative space-y-4 border-l border-isle-500 pl-6">
      {stages.map((stage, i) => (
        <motion.li
          key={stage.name}
          className="relative rounded-xl border border-isle-600 bg-isle-800 p-4"
          initial={{ opacity: 0, x: reduce ? 0 : -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
        >
          <span className="absolute -left-[31px] top-5 h-3 w-3 rounded-full border-2 border-isle-900 bg-amber-400" />
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-bold text-bone-100">
              {stage.nameRu} <span className="text-sm font-normal text-bone-500">· {stage.name}</span>
            </h3>
            <span className="text-sm font-semibold text-amber-300">
              {formatMinutes(stage.minutes)}
              {stage.minutes !== null ? <span className="ml-2 text-xs font-normal text-bone-500">≈ {formatMinutes(Math.round(stage.minutes / 3))} с 3 нутриентами</span> : null}
              {stage.age ? <span className="ml-2 font-normal text-bone-500">({stage.age})</span> : null}
            </span>
          </div>
          <p className="mt-2 text-sm text-bone-300">{stage.focus}</p>
          {stage.details ? (
            <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-bone-500">{stage.details}</p>
          ) : null}
        </motion.li>
      ))}
    </ol>
  )
}
