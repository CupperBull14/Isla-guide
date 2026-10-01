import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Search } from 'lucide-react'
import type { Diet, Dinosaur, Matchup, MatchupVerdict } from '../../types'
import { dinosaurs } from '../../data/dinosaurs'
import { currentPatch, dietLabels, site, verdictLabels } from '../../data/site'
import { verdictStyles } from './VerdictBadge'
import { MatchupPopover, type PopoverTarget } from './MatchupPopover'

const cellMark: Record<MatchupVerdict, string> = { win: '＋', risk: '!', flee: '✕' }
const dietFilters: readonly (Diet | 'all')[] = ['all', 'carnivore', 'herbivore', 'omnivore']
const key = (row: string, col: string) => `${row}|${col}`

/** Индекс «строка|столбец» → матчап ИГРОКА-СТРОКИ против СТОЛБЦА. Обратное направление не выводится. */
const index = new Map<string, Matchup>()
for (const d of dinosaurs) {
  for (const m of d.matchups) {
    if (!index.has(key(d.id, m.opponent))) index.set(key(d.id, m.opponent), m)
  }
}
const totalMatchups = index.size

interface Cursor {
  row: string
  col: string
}

export function MatchupMatrix() {
  const reduce = useReducedMotion()
  const [diet, setDiet] = useState<Diet | 'all'>('all')
  const [query, setQuery] = useState('')
  const [hover, setHover] = useState<Cursor | null>(null)
  const [popover, setPopover] = useState<(PopoverTarget & Cursor) | null>(null)
  const intro = useRef(true)

  useEffect(() => {
    const t = window.setTimeout(() => {
      intro.current = false
    }, 2000)
    return () => window.clearTimeout(t)
  }, [])

  const list: Dinosaur[] = useMemo(() => {
    const q = query.trim().toLowerCase()
    return dinosaurs.filter((d) => {
      if (diet !== 'all' && d.diet !== diet) return false
      return !q || d.name.toLowerCase().includes(q) || d.nameRu.toLowerCase().includes(q)
    })
  }, [diet, query])

  const { filled, possible } = useMemo(() => {
    let f = 0
    for (const r of list) for (const c of list) if (r.id !== c.id && index.has(key(r.id, c.id))) f++
    return { filled: f, possible: list.length * (list.length - 1) }
  }, [list])

  const closePopover = useCallback(() => setPopover(null), [])

  const open = (r: Dinosaur, c: Dinosaur, el: HTMLElement) => {
    const matchup = index.get(key(r.id, c.id))
    setPopover({
      row: r.id,
      col: c.id,
      rowName: r.nameRu,
      colName: c.nameRu,
      matchup,
      sourceTitle: matchup?.source ? r.sources.find((s) => s.id === matchup.source)?.title : undefined,
      rect: el.getBoundingClientRect(),
    })
  }

  const percent = possible > 0 ? ((filled / possible) * 100).toFixed(1).replace('.', ',') : null

  return (
    <div>
      <div className="mb-4 rounded-xl border border-isle-600 bg-isle-800 p-4 text-sm text-bone-300">
        <div className="flex flex-wrap items-center gap-2">
          {(['win', 'risk', 'flee'] as const).map((v) => (
            <span key={v} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${verdictStyles[v]}`}>
              {cellMark[v]} {verdictLabels[v]}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-isle-500 px-2.5 py-1 text-xs text-bone-500">— нет данных</span>
        </div>
        <p className="mt-3">
          Строка — твой дино, столбец — противник. Зелёный — уверенная победа, жёлтый — 50/50, красный — убегай. Нажми на ячейку, чтобы
          увидеть обоснование.
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по имени"
            className="w-full rounded-xl border border-isle-600 bg-isle-800 py-2.5 pl-10 pr-3 text-base text-bone-100 sm:text-sm placeholder:text-bone-500 focus:border-amber-500/60 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {dietFilters.map((f) => (
            <button
              key={f}
              onClick={() => setDiet(f)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                diet === f ? 'border-amber-500 bg-amber-500/15 text-amber-300' : 'border-isle-600 text-bone-300 hover:border-isle-500'
              }`}
            >
              {f === 'all' ? 'Все' : dietLabels[f]}
            </button>
          ))}
        </div>
      </div>

      {totalMatchups === 0 ? (
        <p className="mb-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-300">
          Подтверждённых матчапов в базе пока нет — все ячейки пусты ({site.noData}).
        </p>
      ) : null}

      {list.length === 0 ? (
        <p className="rounded-xl border border-isle-600 bg-isle-800 p-6 text-center text-bone-300">Никого не найдено. Измени поиск или фильтр.</p>
      ) : (
        <div className="max-h-[75vh] overflow-auto rounded-xl border border-isle-600 bg-isle-900">
          <table className="border-separate border-spacing-0 text-xs">
            <caption className="sr-only">Матрица матчапов: строка — твой динозавр, столбец — противник</caption>
            <thead>
              <tr>
                <th scope="col" className="sticky left-0 top-0 z-30 min-w-[7.5rem] border-b border-r border-isle-600 bg-isle-900 p-2 text-left font-medium text-bone-500">
                  твой ↓ · против →
                </th>
                {list.map((c) => (
                  <th
                    scope="col"
                    key={c.id}
                    className={`sticky top-0 z-20 h-32 min-w-[40px] border-b border-isle-600 p-1 align-bottom font-medium transition-colors ${
                      hover?.col === c.id ? 'bg-isle-700 text-amber-300' : 'bg-isle-900 text-bone-300'
                    }`}
                  >
                    <Link to={`/dinosaurs/${c.id}`} title={c.name} className="block rotate-180 whitespace-nowrap [writing-mode:vertical-rl] hover:text-amber-400">
                      {c.nameRu}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
                {list.map((r, ri) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, delay: reduce || !intro.current ? 0 : ri * 0.03 }}
                  >
                    <th
                      scope="row"
                      className={`sticky left-0 z-10 whitespace-nowrap border-r border-t border-isle-600 p-2 text-left font-medium transition-colors ${
                        hover?.row === r.id ? 'bg-isle-700 text-amber-300' : 'bg-isle-900 text-bone-300'
                      }`}
                    >
                      <Link to={`/dinosaurs/${r.id}`} title={r.name} className="hover:text-amber-400">
                        {r.nameRu}
                      </Link>
                    </th>
                    {list.map((c, ci) => {
                      const same = r.id === c.id
                      const m = same ? undefined : index.get(key(r.id, c.id))
                      const lit = hover !== null && (hover.row === r.id || hover.col === c.id)
                      const delay = reduce || !intro.current ? 0 : Math.min((ri + ci) * 0.015, 0.7)
                      return (
                        <td key={c.id} className={`border-t border-isle-700/60 p-0.5 transition-colors ${lit ? 'bg-amber-400/10' : ''}`}>
                          {same ? (
                            <div className="flex h-10 min-w-[40px] items-center justify-center rounded-md bg-isle-700/50 text-bone-500" aria-hidden>
                              ·
                            </div>
                          ) : (
                            <motion.button
                              type="button"
                              initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.25, delay }}
                              whileHover={reduce ? undefined : { scale: 1.12 }}
                              whileTap={{ scale: 0.95 }}
                              onMouseEnter={() => setHover({ row: r.id, col: c.id })}
                              onMouseLeave={() => setHover(null)}
                              onFocus={() => setHover({ row: r.id, col: c.id })}
                              onBlur={() => setHover(null)}
                              onClick={(e) => open(r, c, e.currentTarget)}
                              title={m ? `${r.nameRu} vs ${c.nameRu}: ${verdictLabels[m.verdict]}` : 'нет данных'}
                              aria-label={`${r.nameRu} против ${c.nameRu}: ${m ? verdictLabels[m.verdict] : 'нет данных'}`}
                              className={`flex h-10 min-w-[40px] w-full items-center justify-center rounded-md border text-sm font-bold ${
                                m ? verdictStyles[m.verdict] : 'border-isle-600/60 bg-isle-800/60 font-normal text-bone-500'
                              } ${popover?.row === r.id && popover.col === c.id ? 'ring-2 ring-bone-100' : ''}`}
                            >
                              {m ? cellMark[m.verdict] : '—'}
                            </motion.button>
                          )}
                        </td>
                      )
                    })}
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {list.length === 1 ? (
        <p className="mt-3 text-xs text-bone-500">В фильтре один динозавр — сравнивать не с кем. Расширь фильтр, чтобы увидеть пары.</p>
      ) : null}

      <p className="mt-4 text-sm text-bone-300">
        {possible > 0 ? (
          <>
            Заполнено {percent}% пар ({filled} из {possible}). Актуально для патча №{currentPatch.number}.
          </>
        ) : (
          <>Пар для сравнения нет. Актуально для патча №{currentPatch.number}.</>
        )}{' '}
        <span className="text-bone-500">Пусто — данных нет; обратное направление пары не выводится.</span>
      </p>

      {popover ? <MatchupPopover key={key(popover.row, popover.col)} target={popover} onClose={closePopover} /> : null}
    </div>
  )
}
