import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Droplets, Hourglass, Info, Utensils } from 'lucide-react'
import type { ReactNode } from 'react'
import { getDinosaurById } from '../../data/dinosaurs'
import { calcNotes } from '../../data/tools'
import { formatMinutes, growthTime, statValue } from '../../utils/dino'
import type { GrowthPath } from '../../utils/growth'
import { GrowthExplorer } from '../dinosaur/GrowthExplorer'
import { DinoSelect } from './DinoSelect'

interface Props {
  id: string
  onChange: (id: string) => void
}

const sessions = [1, 2, 3, 4, 6] as const
const nutrients = [
  { n: 1, label: '1 нутриент', hint: '×1' },
  { n: 2, label: '2 нутриента', hint: '×2' },
  { n: 3, label: 'Все 3', hint: '×3' },
] as const
const servers = [1, 2, 3] as const

function Segmented<T extends number>({ legend, items, value, onChange }: { legend: string; items: readonly { v: T; label: string; hint?: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-bone-500">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <button
            key={it.v}
            type="button"
            aria-pressed={value === it.v}
            onClick={() => onChange(it.v)}
            className={`rounded-lg border px-3 py-1.5 text-left text-sm transition-colors ${value === it.v ? 'border-amber-500 bg-amber-500/15 text-amber-200' : 'border-isle-600 text-bone-300 hover:border-isle-500'}`}
          >
            {it.label}
            {it.hint ? <span className="ml-1 text-[11px] text-bone-500">{it.hint}</span> : null}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

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
  const [pct, setPct] = useState(25)
  const [path, setPath] = useState<GrowthPath>('normal')
  const [diet, setDiet] = useState<number>(3)
  const [server, setServer] = useState<number>(1)
  const [hours, setHours] = useState<number>(2)
  const dino = getDinosaurById(id)
  const speedUp = diet * server

  const scaled = (from: number, to: number) => {
    if (!dino) return { minutes: null as number | null, approximate: false }
    const g = growthTime(dino, from, to)
    return { minutes: g.minutes === null ? null : g.minutes / speedUp, approximate: g.approximate }
  }
  const toAdult = scaled(pct, 75)
  const toFull = scaled(pct, 100)
  const hunger = dino ? statValue(dino, 'hunger') : null
  const thirst = dino ? statValue(dino, 'thirst') : null
  const sessionMin = hours * 60
  const approxNote = (a: boolean) => (a ? '⚠️ оценка по общему времени: по стадиям данных нет' : undefined)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DinoSelect label="Динозавр" value={id} onChange={onChange} className="md:col-span-2 lg:col-span-1" />
        <Segmented legend="Диета" items={nutrients.map((x) => ({ v: x.n as number, label: x.label, hint: x.hint }))} value={diet} onChange={setDiet} />
        <Segmented legend="Множитель сервера" items={servers.map((s) => ({ v: s as number, label: `x${s}`, hint: s === 1 ? 'официальные' : undefined }))} value={server} onChange={setServer} />
        <Segmented legend="Сессия" items={sessions.map((h) => ({ v: h as number, label: `${h} ч` }))} value={hours} onChange={setHours} />
      </div>

      {!dino ? (
        <p className="rounded-2xl border border-dashed border-isle-500 p-8 text-center text-bone-300">Выбери динозавра — потяни ползунок роста и смотри, как меняются вес, скорость и Bite, сколько осталось расти и сколько есть.</p>
      ) : (
        <>
          <div className="flex items-baseline justify-between gap-3">
            <Link to={`/dinosaurs/${dino.id}`} className="font-display text-xl font-bold text-bone-100 hover:text-amber-400">
              {dino.nameRu}
            </Link>
            <span className="text-sm text-bone-500">
              полный рост: {formatMinutes(statValue(dino, 'growth'))} (×1) → <span className="text-amber-300">{formatMinutes(scaled(0, 100).minutes)}</span> (×{speedUp})
            </span>
          </div>
          <GrowthExplorer dino={dino} pct={pct} onPct={setPct} path={path} onPath={setPath} />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard icon={<Hourglass className="h-4 w-4" />} title="До взрослого (75%)" value={pct >= 75 ? 'уже взрослый' : formatMinutes(toAdult.minutes)} note={pct >= 75 ? undefined : approxNote(toAdult.approximate)} />
            <ResultCard icon={<Hourglass className="h-4 w-4" />} title="До 100%" value={pct >= 100 ? 'рост завершён' : formatMinutes(toFull.minutes)} note={pct >= 100 ? undefined : approxNote(toFull.approximate) ?? (toFull.minutes !== null ? `≈ ${Math.max(1, Math.ceil(toFull.minutes / sessionMin))} сесс. по ${hours} ч` : undefined)} />
            <ResultCard
              icon={<Utensils className="h-4 w-4" />}
              title={`Еда за ${hours} ч`}
              value={hunger === null ? 'данных нет' : `≈ ${(sessionMin / hunger).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} желудка`}
              note={hunger === null ? undefined : `Полный желудок пустеет за ${formatMinutes(hunger)}.`}
            />
            <ResultCard
              icon={<Droplets className="h-4 w-4" />}
              title={`Вода за ${hours} ч`}
              value={thirst === null ? 'данных нет' : `≈ ${(sessionMin / thirst).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} запаса`}
              note={thirst === null ? undefined : `Полный запас воды кончается за ${formatMinutes(thirst)}.`}
            />
          </div>
        </>
      )}

      <ul className="space-y-1.5 rounded-xl border border-isle-600 bg-isle-900/60 p-4 text-xs text-bone-500">
        {calcNotes.map((n) => (
          <li key={n} className="flex gap-2">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> {n}
          </li>
        ))}
      </ul>
    </div>
  )
}
