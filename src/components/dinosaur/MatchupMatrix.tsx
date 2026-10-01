import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Matchup } from '../../types'
import { dinosaurs } from '../../data/dinosaurs'
import { verdictLabels, site } from '../../data/site'
import { verdictStyles } from './VerdictBadge'

const cellMark: Record<Matchup['verdict'], string> = { win: '＋', risk: '!', flee: '✕' }

/** Матрица N×N: строка — «кто», столбец — «против кого». Пустая ячейка = данных нет. */
export function MatchupMatrix() {
  const [hover, setHover] = useState<{ row: string; col: string } | null>(null)
  const [picked, setPicked] = useState<{ row: string; col: string } | null>(null)

  const lookup = (rowId: string, colId: string): Matchup | undefined =>
    dinosaurs.find((d) => d.id === rowId)?.matchups.find((m) => m.opponent === colId)

  const total = dinosaurs.reduce((n, d) => n + d.matchups.length, 0)
  const cells = dinosaurs.length * (dinosaurs.length - 1)
  const active = picked ?? hover
  const activeMatchup = active ? lookup(active.row, active.col) : undefined
  const nameOf = (id: string) => dinosaurs.find((d) => d.id === id)?.nameRu ?? id

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-bone-300">
        {(['win', 'risk', 'flee'] as const).map((v) => (
          <span key={v} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${verdictStyles[v]}`}>
            {cellMark[v]} {verdictLabels[v]}
          </span>
        ))}
        <span className="text-bone-500">Пусто — {site.noData}. Заполнено {total} из {cells} пар: вердикты только с источником.</span>
      </div>

      <div className="overflow-auto rounded-xl border border-isle-600">
        <table className="border-collapse text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 bg-isle-900 p-2 text-left text-bone-500">кто ↓ / против →</th>
              {dinosaurs.map((c) => (
                <th key={c.id} className="h-28 min-w-[34px] bg-isle-900 p-1 align-bottom font-medium text-bone-300">
                  <Link to={`/dinosaurs/${c.id}`} className="block [writing-mode:vertical-rl] rotate-180 hover:text-amber-400">
                    {c.nameRu}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dinosaurs.map((r) => (
              <tr key={r.id}>
                <th className="sticky left-0 z-10 whitespace-nowrap bg-isle-900 p-2 text-left font-medium text-bone-300">
                  <Link to={`/dinosaurs/${r.id}`} className="hover:text-amber-400">{r.nameRu}</Link>
                </th>
                {dinosaurs.map((c) => {
                  if (r.id === c.id) return <td key={c.id} className="bg-isle-700/60 text-center text-bone-500">—</td>
                  const m = lookup(r.id, c.id)
                  const isActive = active?.row === r.id && active.col === c.id
                  return (
                    <td key={c.id} className="p-0">
                      {m ? (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.15 }}
                          onMouseEnter={() => setHover({ row: r.id, col: c.id })}
                          onMouseLeave={() => setHover(null)}
                          onClick={() => setPicked(isActive && picked ? null : { row: r.id, col: c.id })}
                          aria-label={`${r.nameRu} против ${c.nameRu}: ${verdictLabels[m.verdict]}`}
                          className={`h-8 w-full border text-sm font-bold ${verdictStyles[m.verdict]} ${isActive ? 'ring-2 ring-bone-100' : ''}`}
                        >
                          {cellMark[m.verdict]}
                        </motion.button>
                      ) : (
                        <div className="h-8 w-full border border-isle-700/60" />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 min-h-[4.5rem] rounded-xl border border-isle-600 bg-isle-800 p-4 text-sm text-bone-300">
        {active && activeMatchup ? (
          <>
            <div className="font-semibold text-bone-100">
              {nameOf(active.row)} против {nameOf(active.col)}: {verdictLabels[activeMatchup.verdict]}
            </div>
            <p className="mt-1">{activeMatchup.note}</p>
          </>
        ) : (
          'Наведи или нажми на заполненную ячейку, чтобы увидеть обоснование.'
        )}
      </div>
    </div>
  )
}
