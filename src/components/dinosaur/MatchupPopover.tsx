import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Matchup } from '../../types'
import { basisLabels, site, verdictLabels } from '../../data/site'
import { verdictStyles } from './VerdictBadge'

export interface PopoverTarget {
  rowName: string
  colName: string
  matchup: Matchup | undefined
  sourceTitle?: string
  rect: DOMRect
}

interface Props {
  target: PopoverTarget
  onClose: () => void
}

const WIDTH = 320
const MARGIN = 8

/** Поповер у ячейки матрицы. Закрывается по клику вне, Esc, скроллу окна и ресайзу. */
export function MatchupPopover({ target, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: -9999, top: -9999 })

  useLayoutEffect(() => {
    const el = ref.current
    const height = el?.offsetHeight ?? 120
    const width = Math.min(WIDTH, window.innerWidth - MARGIN * 2)
    const { rect } = target
    let left = rect.left + rect.width / 2 - width / 2
    left = Math.max(MARGIN, Math.min(left, window.innerWidth - width - MARGIN))
    let top = rect.bottom + MARGIN
    if (top + height > window.innerHeight - MARGIN) top = Math.max(MARGIN, rect.top - height - MARGIN)
    setPos({ left, top })
  }, [target])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    window.addEventListener('scroll', onClose, { passive: true })
    window.addEventListener('resize', onClose)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('scroll', onClose)
      window.removeEventListener('resize', onClose)
    }
  }, [onClose])

  const { matchup } = target
  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-label={`${target.rowName} против ${target.colName}`}
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.15 }}
      style={{ position: 'fixed', left: pos.left, top: pos.top, width: Math.min(WIDTH, window.innerWidth - MARGIN * 2) }}
      className="z-50 rounded-xl border border-isle-500 bg-isle-800 p-4 text-sm shadow-2xl"
    >
      {matchup ? (
        <>
          <div className="font-semibold text-bone-100">
            {target.rowName} vs {target.colName} —{' '}
            <span className={`rounded-md border px-1.5 py-0.5 text-xs ${verdictStyles[matchup.verdict]}`}>
              {verdictLabels[matchup.verdict]}
            </span>
          </div>
          <p className="mt-2 text-bone-300">{matchup.note}</p>
          <p className="mt-2 text-xs text-bone-500">
            {matchup.basis ? basisLabels[matchup.basis] : null}
            {target.sourceTitle ? ` · ${target.sourceTitle}` : ''}
          </p>
        </>
      ) : (
        <>
          <div className="font-semibold text-bone-100">
            {target.rowName} vs {target.colName}
          </div>
          <p className="mt-2 text-bone-300">Нет данных: подтверждённого вердикта для этой пары в базе нет ({site.noData}).</p>
        </>
      )}
    </motion.div>
  )
}
