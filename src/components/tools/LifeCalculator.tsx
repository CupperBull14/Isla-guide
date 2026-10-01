import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Droplets, Hourglass, Info, Utensils } from 'lucide-react'
import type { ReactNode } from 'react'
import { getDinosaurById } from '../../data/dinosaurs'
import { calcNotes } from '../../data/tools'
import { formatMinutes, growthTime, statValue } from '../../utils/dino'
import { DinoSelect } from './DinoSelect'

interface Props {
  id: string
  onChange: (id: string) => void
}

const sessions = [1, 2, 3, 4, 6] as const
const stageColors = ['bg-isle-500', 'bg-moss-700', 'bg-moss-500', 'bg-amber-500'] as const

function ResultCard({ icon, title, value, note }: { icon: ReactNode; title: string; value: string; note?: string }) {
  return (
    <motion.div layout className="rounded-2xl border border-isle-600 bg-isle-800 p-4">
      <div className="flex items-center gap-2 text-sm text-bone-300">
        <span className="text-amber-400">{icon}</span>
        {title}
      </div>
      <div className="mt-2 font-display text-2xl font-bold text-bone-100">{value}</div>
      {note ? <p className="mt-1 text-xs text-bone-500">{note}</p> : null}
    </motion.div>
  )
}

export function LifeCalculator({ id, onChange }: Props) {
  const sliderId = useId()
  const [pct, setPct] = useState(25)
  const [hours, setHours] = useState<number>(2)
  const dino = getDinosaurById(id)

  const toAdult = dino ? growthTime(dino, pct, 75) : null
  const toFull = dino ? growthTime(dino, pct, 100) : null
  const hunger = dino ? statValue(dino, 'hunger') : null
  const thirst = dino ? statValue(dino, 'thirst') : null
  const sessionMin = hours * 60
  const stageMinutes = dino?.growth.map((g) => g.minutes) ?? []
  const perStageKnown = stageMinutes.length === 4 && stageMinutes.every((m) => m !== null)
  const widths = perStageKnown ? stageMinutes.map((m) => m ?? 0) : [1, 1, 1, 1]
  const widthTotal = widths.reduce((a, b) => a + b, 0)
  // Позиция маркера по ВРЕМЕНИ: доля времени роста, прошедшая к текущему проценту
  const elapsed = dino ? growthTime(dino, 0, pct).minutes : null
  const totalAll = dino ? growthTime(dino, 0, 100).minutes : null
  const marker = perStageKnown && elapsed !== null && totalAll ? (elapsed / totalAll) * 100 : pct

  const approx = (e: { approximate: boolean } | null) => (e?.approximate ? '⚠️ оценка по общему времени: по стадиям данных нет' : undefined)

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      <div className="space-y-5">
        <DinoSelect label="Динозавр" value={id} onChange={onChange} />
        <div>
          <label htmlFor={sliderId} className="mb-1.5 flex justify-between text-xs font-semibold uppercase tracking-wider text-bone-500">
            <span>Текущий рост</span>
            <span className="text-amber-300">{pct}%</span>
          </label>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={100}
            step={1}
            value={pct}
            onChange={(e) => setPct(Number(e.target.value))}
            className="w-full accent-amber-400"
          />
          <div className="mt-1 flex justify-between text-[11px] text-bone-500">
            <span>0%</span>
            <button type="button" onClick={() => setPct(25)} className="hover:text-amber-300">
              25% — спавн
            </button>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
        <fieldset>
          <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-bone-500">Длина игровой сессии</legend>
          <div className="flex flex-wrap gap-2">
            {sessions.map((h) => (
              <button
                key={h}
                type="button"
                aria-pressed={hours === h}
                onClick={() => setHours(h)}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                  hours === h ? 'border-amber-500 bg-amber-500/15 text-amber-200' : 'border-isle-600 text-bone-300 hover:border-isle-500'
                }`}
              >
                {h} ч
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        {!dino ? (
          <p className="rounded-2xl border border-dashed border-isle-500 p-8 text-center text-bone-300">Выбери динозавра, чтобы посчитать время роста и питание.</p>
        ) : (
          <>
            <div className="mb-5 rounded-2xl border border-isle-600 bg-isle-800 p-4">
              <div className="mb-2 flex items-baseline justify-between text-sm">
                <Link to={`/dinosaurs/${dino.id}`} className="font-display font-bold text-bone-100 hover:text-amber-400">
                  {dino.nameRu}
                </Link>
                <span className="text-bone-500">полный рост {formatMinutes(statValue(dino, 'growth'))}</span>
              </div>
              <div className="relative flex h-4 overflow-hidden rounded-full">
                {dino.growth.map((g, i) => (
                  <div key={g.name} className={`${stageColors[i]} h-full border-r border-isle-900 last:border-r-0`} style={{ width: `${(widths[i] / widthTotal) * 100}%` }} title={`${g.nameRu}: ${formatMinutes(g.minutes)}`} />
                ))}
                <motion.div
                  className="absolute top-0 h-full w-1 rounded bg-bone-100 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  animate={{ left: `calc(${Math.min(marker, 100)}% - 2px)` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                />
              </div>
              <div className="mt-2 grid grid-cols-4 gap-1 text-[11px] text-bone-500">
                {dino.growth.map((g) => (
                  <span key={g.name}>
                    {g.nameRu}
                    <br />
                    {formatMinutes(g.minutes)}
                  </span>
                ))}
              </div>
              {!perStageKnown ? <p className="mt-2 text-xs text-amber-300">⚠️ Длительности стадий: данных нет — шкала условная.</p> : null}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ResultCard
                icon={<Hourglass className="h-4 w-4" />}
                title="До взрослой стадии (75%)"
                value={pct >= 75 ? 'уже взрослый' : formatMinutes(toAdult?.minutes ?? null)}
                note={pct >= 75 ? undefined : approx(toAdult)}
              />
              <ResultCard
                icon={<Hourglass className="h-4 w-4" />}
                title="До 100% роста"
                value={pct >= 100 ? 'рост завершён' : formatMinutes(toFull?.minutes ?? null)}
                note={pct >= 100 ? undefined : approx(toFull)}
              />
              <ResultCard
                icon={<Utensils className="h-4 w-4" />}
                title={`Еда за сессию ${hours} ч`}
                value={hunger === null ? 'данных нет' : `≈ ${(sessionMin / hunger).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} желудка`}
                note={hunger === null ? undefined : `Полный желудок пустеет за ${formatMinutes(hunger)} — ешь не реже этого.`}
              />
              <ResultCard
                icon={<Droplets className="h-4 w-4" />}
                title={`Вода за сессию ${hours} ч`}
                value={thirst === null ? 'данных нет' : `≈ ${(sessionMin / thirst).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} запаса`}
                note={thirst === null ? undefined : `Полный запас воды кончается за ${formatMinutes(thirst)}.`}
              />
            </div>
            {toFull?.minutes != null && pct < 100 ? (
              <p className="mt-4 text-sm text-bone-300">
                При сессиях по {hours} ч до 100% понадобится примерно{' '}
                <span className="font-semibold text-amber-300">{Math.ceil(toFull.minutes / sessionMin)}</span> сесс. (без учёта бонусов диеты).
              </p>
            ) : null}
          </>
        )}
        <ul className="mt-5 space-y-1.5 rounded-xl border border-isle-600 bg-isle-900/60 p-4 text-xs text-bone-500">
          {calcNotes.map((n) => (
            <li key={n} className="flex gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
