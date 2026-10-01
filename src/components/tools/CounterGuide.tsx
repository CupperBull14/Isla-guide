import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gauge, Info, ShieldAlert, Swords, TriangleAlert, Zap } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Dinosaur, Matchup } from '../../types'
import { dinosaurs, getDinosaurById } from '../../data/dinosaurs'
import { categoryLabels, dietLabels } from '../../data/site'
import { counterNotes } from '../../data/tools'
import { statValue } from '../../utils/dino'
import { VerdictBadge } from '../dinosaur/VerdictBadge'
import { DinoSelect } from './DinoSelect'

interface Props {
  id: string
  onChange: (id: string) => void
}

interface Entry {
  dino: Dinosaur
  matchup: Matchup
}

function Panel({ icon, title, hint, children, empty }: { icon: ReactNode; title: string; hint: string; children: ReactNode; empty: boolean }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-isle-600 bg-isle-800 p-4"
    >
      <h3 className="flex items-center gap-2 font-bold text-bone-100">
        <span className="text-amber-400">{icon}</span>
        {title}
      </h3>
      <p className="mt-1 text-xs text-bone-500">{hint}</p>
      <div className="mt-3">{empty ? <p className="text-sm text-bone-500">Данных нет.</p> : children}</div>
    </motion.section>
  )
}

function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="space-y-2">
      {entries.map(({ dino, matchup }) => (
        <li key={`${dino.id}-${matchup.verdict}`} className="rounded-xl border border-isle-600/70 bg-isle-900/40 p-3 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/dinosaurs/${dino.id}`} className="font-semibold text-bone-100 hover:text-amber-400">
              {dino.nameRu}
            </Link>
            <VerdictBadge verdict={matchup.verdict} />
          </div>
          <p className="mt-1 text-bone-300">{matchup.note}</p>
        </li>
      ))}
    </ul>
  )
}

export function CounterGuide({ id, onChange }: Props) {
  const x = getDinosaurById(id)

  if (!x) {
    return (
      <div>
        <DinoSelect label="Соперник" value="" onChange={onChange} placeholder="Против кого играешь?" className="mb-6 max-w-sm" />
        <p className="rounded-2xl border border-dashed border-isle-500 p-8 text-center text-bone-300">
          Выбери динозавра-соперника — соберём всё, что о нём известно из подтверждённых данных.
        </p>
      </div>
    )
  }

  // Чужие оценки ПРОТИВ X (строка = другой дино, столбец = X)
  const against: Entry[] = dinosaurs.flatMap((d) => d.matchups.filter((m) => m.opponent === x.id).map((m) => ({ dino: d, matchup: m })))
  const strongVsX = against.filter((e) => e.matchup.verdict === 'win')
  const fearX = against.filter((e) => e.matchup.verdict !== 'win')
  // Собственные оценки X
  const own = x.matchups
    .map((m) => ({ dino: getDinosaurById(m.opponent), matchup: m }))
    .filter((e): e is Entry => e.dino !== undefined)
  const xWeakVs = own.filter((e) => e.matchup.verdict !== 'win')

  const xSpeed = statValue(x, 'speed')
  const faster =
    xSpeed === null
      ? []
      : dinosaurs
          .filter((d) => d.id !== x.id)
          .map((d) => ({ d, s: statValue(d, 'speed') }))
          .filter((e): e is { d: Dinosaur; s: number } => e.s !== null && e.s > xSpeed)
          .sort((a, b) => b.s - a.s)

  return (
    <div>
      <DinoSelect label="Соперник" value={x.id} onChange={onChange} className="mb-6 max-w-sm" />

      <div className="mb-6 rounded-2xl border border-isle-600 bg-gradient-to-br from-isle-700 to-isle-800 p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-moss-400">
          {dietLabels[x.diet]} · {categoryLabels[x.category]}
        </div>
        <h2 className="mt-1 text-2xl font-bold text-bone-100">Как играть против: {x.nameRu}</h2>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {(['weight', 'speed', 'pack'] as const).map((k) => {
            const v = statValue(x, k)
            const label = k === 'weight' ? 'вес' : k === 'speed' ? 'скорость' : 'стая до'
            const unit = k === 'weight' ? 'кг' : k === 'speed' ? 'км/ч' : ''
            return (
              <span key={k} className="rounded-lg bg-isle-900/60 px-2.5 py-1 text-bone-300">
                {label}: <span className="font-semibold text-bone-100">{v === null ? 'данных нет' : `${v.toLocaleString('ru-RU')} ${unit}`.trim()}</span>
              </span>
            )
          })}
          <Link to={`/dinosaurs/${x.id}`} className="rounded-lg px-2.5 py-1 text-amber-400 hover:underline">
            Полный гайд →
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel icon={<Swords className="h-4 w-4" />} title={`Кто сильнее ${x.nameRu}`} hint="Виды, у которых в данных стоит «преимущество» против него." empty={strongVsX.length === 0}>
          <EntryList entries={strongVsX} />
        </Panel>
        <Panel icon={<TriangleAlert className="h-4 w-4" />} title={`Для кого ${x.nameRu} опасен`} hint="Виды с оценкой «риск» или «бежать» против него: им лучше не связываться." empty={fearX.length === 0}>
          <EntryList entries={fearX} />
        </Panel>
        <Panel icon={<ShieldAlert className="h-4 w-4" />} title={`Где ${x.nameRu} уязвим`} hint="Его собственные оценки «риск» и «бежать», плюс известные минусы вида." empty={xWeakVs.length === 0 && x.cons.length === 0}>
          {xWeakVs.length > 0 ? <EntryList entries={xWeakVs} /> : null}
          {x.cons.length > 0 ? (
            <ul className={`${xWeakVs.length > 0 ? 'mt-3' : ''} list-inside list-disc space-y-1 text-sm text-bone-300`}>
              {x.cons.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          ) : null}
        </Panel>
        <Panel icon={<Zap className="h-4 w-4" />} title="Чего ждать в бою" hint="Умения и приёмы вида по источникам." empty={x.combat.length === 0}>
          <ul className="list-inside list-disc space-y-1 text-sm text-bone-300">
            {x.combat.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Panel>
        <Panel
          icon={<Gauge className="h-4 w-4" />}
          title={`Кто быстрее ${x.nameRu}`}
          hint={xSpeed === null ? 'Скорость вида: данных нет.' : `Взрослые виды со скоростью выше ${xSpeed} км/ч.`}
          empty={faster.length === 0}
        >
          <ul className="flex flex-wrap gap-2">
            {faster.map(({ d, s }) => (
              <li key={d.id}>
                <Link to={`/dinosaurs/${d.id}`} className="inline-flex rounded-lg border border-isle-600 px-2.5 py-1 text-sm text-bone-300 hover:border-amber-500/60 hover:text-amber-300">
                  {d.nameRu} <span className="ml-1 text-bone-500">{s} км/ч</span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <ul className="mt-5 space-y-1.5 rounded-xl border border-isle-600 bg-isle-900/60 p-4 text-xs text-bone-500">
        {counterNotes.map((n) => (
          <li key={n} className="flex gap-2">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> {n}
          </li>
        ))}
      </ul>
    </div>
  )
}
