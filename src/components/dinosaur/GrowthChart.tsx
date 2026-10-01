import { motion } from 'framer-motion'
import type { Dinosaur } from '../../types'
import { curveMax, type CurveKey } from '../../utils/growth'

const W = 600
const H = 180
const PAD = { l: 8, r: 8, t: 12, b: 22 }

interface Props {
  dino: Dinosaur
  metric: CurveKey
  pct: number
}

/** Кривые «обычный» и «Prime» по точкам таблицы; маркер — текущий рост. */
export function GrowthChart({ dino, metric, pct }: Props) {
  const maxN = curveMax(dino.curve.normal, metric) ?? 0
  const maxP = curveMax(dino.curve.prime, metric) ?? 0
  const max = Math.max(maxN, maxP) || 1
  const x = (p: number) => PAD.l + (p / 100) * (W - PAD.l - PAD.r)
  const y = (v: number) => PAD.t + (1 - v / max) * (H - PAD.t - PAD.b)

  const path = (pts: Dinosaur['curve']['normal']) => {
    const segs: string[] = []
    let open = false
    for (const p of pts) {
      const v = p[metric]
      if (v === null) {
        open = false
        continue
      }
      segs.push(`${open ? 'L' : 'M'}${x(p.pct).toFixed(1)},${y(v).toFixed(1)}`)
      open = true
    }
    return segs.join(' ')
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-44 w-full" role="img" aria-label="График параметра по росту: обычный путь и Prime">
      {[25, 50, 75, 87.5].map((g) => (
        <line key={g} x1={x(g)} x2={x(g)} y1={PAD.t} y2={H - PAD.b} stroke="rgba(236,231,218,0.08)" strokeDasharray="3 4" />
      ))}
      <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} stroke="rgba(236,231,218,0.15)" />
      {[0, 25, 50, 75, 100].map((g) => (
        <text key={g} x={x(g)} y={H - 6} textAnchor={g === 0 ? 'start' : g === 100 ? 'end' : 'middle'} fontSize="11" fill="#8f8a7a">
          {g}%
        </text>
      ))}
      <motion.path d={path(dino.curve.normal)} fill="none" stroke="#8fc177" strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} key={`n-${metric}-${dino.id}`} />
      <motion.path
        d={path(dino.curve.prime)}
        fill="none"
        stroke="#f6b94a"
        strokeWidth={2.5}
        strokeDasharray="6 5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        key={`p-${metric}-${dino.id}`}
      />
      <motion.line y1={PAD.t} y2={H - PAD.b} stroke="#ece7da" strokeWidth={1.5} animate={{ x1: x(pct), x2: x(pct) }} transition={{ type: 'spring', stiffness: 260, damping: 30 }} />
    </svg>
  )
}
