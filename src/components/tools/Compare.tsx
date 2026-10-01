import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Crown, X } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Dinosaur } from '../../types'
import { getDinosaurById } from '../../data/dinosaurs'
import { categoryLabels, dietLabels } from '../../data/site'
import { compareRows, maxCompare } from '../../data/tools'
import { formatMinutes, formatNumber, matchupOf, statValue } from '../../utils/dino'
import { VerdictBadge } from '../dinosaur/VerdictBadge'
import { DinoSelect } from './DinoSelect'

interface CompareProps {
  ids: readonly string[]
  onChange: (ids: string[]) => void
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="mb-3 text-lg font-bold text-bone-100">{title}</h3>
      {children}
    </section>
  )
}

export function Compare({ ids, onChange }: CompareProps) {
  const list: Dinosaur[] = ids.map((id) => getDinosaurById(id)).filter((d): d is Dinosaur => d !== undefined)
  const cols = `minmax(8.5rem, 10rem) repeat(${Math.max(list.length, 1)}, minmax(11rem, 1fr))`
  const add = (id: string) => id && onChange([...list.map((d) => d.id), id])
  const remove = (id: string) => onChange(list.map((d) => d.id).filter((x) => x !== id))

  return (
    <div>
      {list.length < maxCompare ? (
        <DinoSelect
          label={`Добавить в сравнение (${list.length} из ${maxCompare})`}
          value=""
          onChange={add}
          exclude={list.map((d) => d.id)}
          className="mb-6 max-w-sm"
        />
      ) : null}

      {list.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-isle-500 p-8 text-center text-bone-300">
          Выбери двух или трёх динозавров — параметры, рост и матчапы появятся рядом.
        </p>
      ) : (
        <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <div className="min-w-max sm:min-w-0">
            {/* Шапка */}
            <div className="grid gap-2" style={{ gridTemplateColumns: cols }}>
              <div />
              <AnimatePresence initial={false} mode="popLayout">
                {list.map((d) => (
                  <motion.div
                    key={d.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative rounded-2xl border border-isle-600 bg-gradient-to-b from-isle-700 to-isle-800 p-4"
                  >
                    <button
                      type="button"
                      onClick={() => remove(d.id)}
                      aria-label={`Убрать ${d.nameRu} из сравнения`}
                      className="absolute right-2 top-2 rounded-lg p-1 text-bone-500 hover:bg-white/5 hover:text-blood-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-moss-400">{dietLabels[d.diet]}</div>
                    <Link to={`/dinosaurs/${d.id}`} className="block pr-6 font-display font-bold text-bone-100 hover:text-amber-400">
                      {d.nameRu}
                    </Link>
                    <div className="text-xs text-bone-500">{categoryLabels[d.category]}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Block title="Параметры">
              <div className="space-y-2">
                {compareRows.map((row) => {
                  const values = list.map((d) => statValue(d, row.key))
                  const nums = values.filter((v): v is number => v !== null)
                  const max = nums.length ? Math.max(...nums) : 0
                  const lead = nums.length >= 2 ? (row.leader === 'high' ? max : Math.min(...nums)) : null
                  return (
                    <div key={row.key} className="grid items-stretch gap-2" style={{ gridTemplateColumns: cols }}>
                      <div className="flex items-center text-sm text-bone-300">{row.label}</div>
                      {list.map((d, i) => {
                        const v = values[i]
                        const isLead = v !== null && v === lead && new Set(nums).size > 1
                        return (
                          <div
                            key={d.id}
                            className={`rounded-xl border p-3 ${isLead ? 'border-amber-500/50 bg-amber-500/5' : 'border-isle-600 bg-isle-800'}`}
                          >
                            <div className="flex items-center justify-between gap-2 text-sm">
                              <span className="font-semibold text-bone-100">
                                {row.key === 'growth' ? formatMinutes(v) : formatNumber(v, row.unit)}
                              </span>
                              {isLead ? (
                                <span className="inline-flex items-center gap-1 text-[11px] text-amber-300">
                                  <Crown className="h-3 w-3" aria-hidden /> {row.leaderHint}
                                </span>
                              ) : null}
                            </div>
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-isle-600">
                              {v !== null && max > 0 ? (
                                <motion.div
                                  className="h-full rounded-full bg-gradient-to-r from-moss-600 to-amber-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.max(3, (v / max) * 100)}%` }}
                                  transition={{ duration: 0.6, ease: 'easeOut' }}
                                />
                              ) : null}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
              <p className="mt-2 text-xs text-bone-500">Полосы — относительно максимума среди выбранных. Bite — не эквивалент урона.</p>
            </Block>

            <Block title="Рост по стадиям">
              <div className="space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="grid gap-2" style={{ gridTemplateColumns: cols }}>
                    <div className="flex items-center text-sm text-bone-300">
                      {list[0]?.growth[i]?.nameRu ?? '—'} <span className="ml-1 text-xs text-bone-500">{list[0]?.growth[i]?.age}</span>
                    </div>
                    {list.map((d) => (
                      <div key={d.id} className="rounded-xl border border-isle-600 bg-isle-800 p-3 text-sm text-bone-100">
                        {formatMinutes(d.growth[i]?.minutes ?? null)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Block>
          </div>
        </div>
      )}

      {list.length >= 2 ? (
        <Block title="Матчапы между ними">
          <ul className="grid gap-2 md:grid-cols-2">
            {list.flatMap((a) =>
              list
                .filter((b) => b.id !== a.id)
                .map((b) => {
                  const m = matchupOf(a, b.id)
                  return (
                    <li key={`${a.id}-${b.id}`} className="rounded-xl border border-isle-600 bg-isle-800 p-3 text-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-bone-100">
                          {a.nameRu} → {b.nameRu}
                        </span>
                        {m ? <VerdictBadge verdict={m.verdict} /> : <span className="text-xs text-bone-500">нет данных</span>}
                      </div>
                      {m ? <p className="mt-1.5 text-bone-300">{m.note}</p> : null}
                    </li>
                  )
                }),
            )}
          </ul>
          <p className="mt-2 text-xs text-bone-500">«A → B» — оценка за A против B. Обратное направление не выводится.</p>
        </Block>
      ) : null}

      {list.length > 0 ? (
        <Block title="Плюсы и минусы">
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(15rem, 1fr))` }}>
            {list.map((d) => (
              <div key={d.id} className="rounded-2xl border border-isle-600 bg-isle-800 p-4">
                <div className="font-display font-bold text-bone-100">{d.nameRu}</div>
                <ul className="mt-3 space-y-1.5">
                  {d.pros.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-bone-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-moss-400" aria-hidden /> {p}
                    </li>
                  ))}
                  {d.cons.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-bone-300">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-blood-400" aria-hidden /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Block>
      ) : null}
    </div>
  )
}
