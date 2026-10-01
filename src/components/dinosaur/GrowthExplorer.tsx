import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Dumbbell, Gauge, Heart, Info, Swords } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Dinosaur } from '../../types'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import { GrowthChart } from './GrowthChart'
import { curveMax, curveOf, formatStat, growthMarks, valueAt, type CurveKey, type GrowthPath } from '../../utils/growth'

interface Props {
  dino: Dinosaur
  pct: number
  onPct: (pct: number) => void
  path: GrowthPath
  onPath: (path: GrowthPath) => void
  /** Показывать таблицу по точкам источника. */
  showTable?: boolean
}

interface Metric {
  key: CurveKey
  label: string
  unit: string
  icon: LucideIcon
  hint?: string
}

const metrics: readonly Metric[] = [
  { key: 'weight', label: 'Вес', unit: 'кг', icon: Dumbbell },
  { key: 'speed', label: 'Скорость', unit: 'км/ч', icon: Gauge },
  { key: 'bite', label: 'Bite', unit: '', icon: Swords, hint: 'не эквивалентно урону' },
]

const quick = [25, 50, 75, 87.5, 100] as const
/** Стабильные функции форматирования (не пересоздаются между рендерами). */
const formatters = new Map<string, (v: number) => string>()
function fmt(unit: string): (v: number) => string {
  let f = formatters.get(unit)
  if (!f) {
    f = (v: number) => formatStat(v, unit)
    formatters.set(unit, f)
  }
  return f
}

const fmtPct = (p: number) => `${p.toLocaleString('ru-RU', { maximumFractionDigits: 1 })}%`

export function GrowthExplorer({ dino, pct, onPct, path, onPath, showTable = false }: Props) {
  const sliderId = useId()
  const [metric, setMetric] = useState<CurveKey>('weight')
  const points = curveOf(dino, path)
  const spawn = (key: CurveKey) => valueAt(points, key, 25).value
  const hp = valueAt(points, 'weight', pct).value

  return (
    <div className="rounded-2xl border border-isle-600 bg-isle-800/80 p-4 sm:p-5">
      {/* Шапка: путь роста и большой процент */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div role="radiogroup" aria-label="Путь роста" className="inline-flex rounded-xl border border-isle-600 bg-isle-900/60 p-1">
          {(['normal', 'prime'] as const).map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={path === p}
              onClick={() => onPath(p)}
              className={`relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${path === p ? 'text-isle-950' : 'text-bone-300 hover:text-bone-100'}`}
            >
              {path === p ? <motion.span layoutId={`path-${dino.id}`} className="absolute inset-0 rounded-lg bg-amber-400" transition={{ type: 'spring', stiffness: 400, damping: 32 }} /> : null}
              {p === 'prime' ? <Crown className="relative h-3.5 w-3.5" aria-hidden /> : null}
              <span className="relative">{p === 'prime' ? 'Prime' : 'Обычный'}</span>
            </button>
          ))}
        </div>
        <div className="text-right">
          <label htmlFor={sliderId} className="block text-xs uppercase tracking-wider text-bone-500">
            Рост
          </label>
          <div className="font-display text-4xl font-extrabold leading-none text-transparent bg-gradient-to-r from-moss-400 to-amber-300 bg-clip-text">{fmtPct(pct)}</div>
        </div>
      </div>

      {/* Ползунок */}
      <div className="mt-5">
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={pct}
          onChange={(e) => onPct(Number(e.target.value))}
          className="growth-range"
          style={{ ['--fill' as string]: `${pct}%` }}
          aria-valuetext={`${fmtPct(pct)} роста`}
        />
        <div className="relative mt-2 hidden h-8 text-[10px] text-bone-500 sm:block" aria-hidden>
          {growthMarks.map((m) => (
            <span
              key={m.pct}
              className="absolute -translate-x-1/2 whitespace-nowrap text-center first:translate-x-0 last:-translate-x-full"
              style={{ left: `${m.pct}%` }}
            >
              {fmtPct(m.pct)}
              <br />
              {m.label}
            </span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {quick.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onPct(q)}
              className={`rounded-lg border px-2.5 py-1 text-xs transition-colors ${pct === q ? 'border-amber-500 bg-amber-500/15 text-amber-200' : 'border-isle-600 text-bone-300 hover:border-isle-500'}`}
            >
              {fmtPct(q)}
            </button>
          ))}
        </div>
      </div>

      {path === 'prime' && pct < 75 ? (
        <p className="mt-3 text-xs text-amber-300">Prime отличается от обычного пути только с 75% роста — до этого значения одинаковые.</p>
      ) : null}

      {/* Карточки статов */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-isle-600 bg-isle-900/50 p-3">
          <div className="flex items-center gap-1.5 text-xs text-bone-500">
            <Heart className="h-3.5 w-3.5 text-blood-400" aria-hidden /> Здоровье
          </div>
          <div className="mt-1 font-display text-xl font-bold text-bone-100">
            {hp === null ? <span className="text-base text-bone-500">данных нет</span> : <AnimatedNumber value={hp} format={fmt('HP')} />}
          </div>
          <div className="mt-1 text-[11px] text-bone-500">HP = вес (EQG)</div>
        </div>
        {metrics.map((m) => {
          const cur = valueAt(points, m.key, pct)
          const base = spawn(m.key)
          const normal = valueAt(dino.curve.normal, m.key, pct).value
          const max = curveMax(dino.curve.prime, m.key) ?? curveMax(dino.curve.normal, m.key)
          const Icon = m.icon
          const active = metric === m.key
          const delta = cur.value !== null && base !== null && pct !== 25 ? cur.value - base : null
          const primeGain = path === 'prime' && pct > 75 && cur.value !== null && normal !== null ? cur.value - normal : null
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setMetric(m.key)}
              aria-pressed={active}
              className={`rounded-xl border p-3 text-left transition-colors ${active ? 'border-amber-500/60 bg-amber-500/5' : 'border-isle-600 bg-isle-900/50 hover:border-isle-500'}`}
            >
              <div className="flex items-center justify-between gap-2 text-xs text-bone-500">
                <span className="inline-flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-amber-400" aria-hidden /> {m.label}
                </span>
                <span className={`rounded px-1.5 py-0.5 text-[10px] ${cur.exact ? 'bg-moss-500/15 text-moss-300' : 'bg-isle-600 text-bone-500'}`}>
                  {cur.exact ? 'таблица' : 'оценка'}
                </span>
              </div>
              <div className="mt-1 font-display text-xl font-bold text-bone-100">
                {cur.value === null ? <span className="text-base text-bone-500">данных нет</span> : <AnimatedNumber value={cur.value} format={fmt(m.unit)} />}
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-isle-600">
                {cur.value !== null && max ? (
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-moss-600 to-amber-400" animate={{ width: `${Math.max(2, (cur.value / max) * 100)}%` }} transition={{ duration: 0.3 }} />
                ) : null}
              </div>
              <div className="mt-1.5 space-y-0.5 text-[11px]">
                {delta !== null ? (
                  <div className={delta >= 0 ? 'text-moss-300' : 'text-blood-400'}>
                    {delta >= 0 ? '+' : '−'}
                    {formatStat(Math.abs(delta), m.unit)} к спавну (25%)
                  </div>
                ) : null}
                {primeGain !== null && Math.abs(primeGain) > 0.001 ? (
                  <div className="text-amber-300">
                    {primeGain >= 0 ? '+' : '−'}
                    {formatStat(Math.abs(primeGain), m.unit)} к обычному
                  </div>
                ) : null}
                {m.hint ? <div className="text-bone-500">{m.hint}</div> : null}
              </div>
            </button>
          )
        })}
      </div>

      {/* График */}
      <div className="mt-5 rounded-xl border border-isle-600 bg-isle-900/40 p-3">
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-xs text-bone-500">
          <span>
            График: <span className="text-bone-100">{metrics.find((m) => m.key === metric)?.label}</span> (нажми на карточку, чтобы сменить)
          </span>
          <span className="flex gap-3">
            <span className="inline-flex items-center gap-1">
              <span className="h-0.5 w-4 bg-moss-400" /> обычный
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-0.5 w-4 border-t-2 border-dashed border-amber-400" /> Prime
            </span>
          </span>
        </div>
        <GrowthChart dino={dino} metric={metric} pct={pct} />
      </div>

      {showTable ? <GrowthTable dino={dino} pct={pct} onPct={onPct} /> : null}

      <ul className="mt-4 space-y-1 text-xs text-bone-500">
        {dino.curve.notes.map((n) => (
          <li key={n} className="flex gap-2">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> {n}
          </li>
        ))}
      </ul>
    </div>
  )
}

function GrowthTable({ dino, pct, onPct }: { dino: Dinosaur; pct: number; onPct: (p: number) => void }) {
  const rows = dino.curve.normal.map((n, i) => ({ n, p: dino.curve.prime[i] }))
  const cell = (v: number | null, unit = '') => formatStat(v, unit, '—')
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-isle-600">
      <table className="w-full min-w-[36rem] text-sm">
        <caption className="sr-only">Вес, скорость и Bite по точкам роста: обычный путь и Prime</caption>
        <thead className="bg-isle-900/70 text-xs text-bone-500">
          <tr>
            <th scope="col" rowSpan={2} className="p-2 text-left font-medium">Рост</th>
            <th scope="colgroup" colSpan={3} className="border-l border-isle-600 p-2 font-medium text-moss-300">Обычный</th>
            <th scope="colgroup" colSpan={3} className="border-l border-isle-600 p-2 font-medium text-amber-300">Prime</th>
          </tr>
          <tr>
            {['Вес, кг', 'км/ч', 'Bite', 'Вес, кг', 'км/ч', 'Bite'].map((h, i) => (
              <th key={i} scope="col" className={`p-2 text-right font-medium ${i % 3 === 0 ? 'border-l border-isle-600' : ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ n, p }) => {
            const on = Math.abs(n.pct - pct) < 1e-6
            return (
              <tr key={n.pct} className={`border-t border-isle-700 transition-colors ${on ? 'bg-amber-500/10' : 'hover:bg-white/5'}`}>
                <th scope="row" className="p-2 text-left font-medium">
                  <button type="button" onClick={() => onPct(n.pct)} className="text-bone-100 hover:text-amber-300">
                    {fmtPct(n.pct)}
                  </button>
                </th>
                <td className="border-l border-isle-700 p-2 text-right text-bone-300">{cell(n.weight)}</td>
                <td className="p-2 text-right text-bone-300">{cell(n.speed)}</td>
                <td className="p-2 text-right text-bone-300">{cell(n.bite)}</td>
                <td className="border-l border-isle-700 p-2 text-right text-bone-100">{cell(p.weight)}</td>
                <td className="p-2 text-right text-bone-100">{cell(p.speed)}</td>
                <td className="p-2 text-right text-bone-100">{cell(p.bite)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
