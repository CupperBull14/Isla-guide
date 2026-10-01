import { Link } from 'react-router-dom'
import type { Matchup } from '../../types'
import { basisLabels, site } from '../../data/site'
import { getDinosaurById } from '../../data/dinosaurs'
import { VerdictBadge } from './VerdictBadge'

export function MatchupTable({ matchups }: { matchups: Matchup[] }) {
  if (matchups.length === 0) {
    return <p className="rounded-xl border border-isle-600 bg-isle-800 p-4 text-bone-300">Матчапы: {site.noData}.</p>
  }
  return (
    <div className="overflow-hidden rounded-xl border border-isle-600">
      <ul className="divide-y divide-isle-600">
        {matchups.map((m) => {
          const opp = getDinosaurById(m.opponent)
          return (
            <li key={`${m.opponent}-${m.verdict}-${m.note}`} className="bg-isle-800 p-4">
              <div className="flex flex-wrap items-center gap-3">
                {opp ? (
                  <Link to={`/dinosaurs/${opp.id}`} className="font-semibold text-bone-100 hover:text-amber-400">
                    {opp.nameRu}
                  </Link>
                ) : (
                  <span className="font-semibold text-bone-100">{m.opponent}</span>
                )}
                <VerdictBadge verdict={m.verdict} />
                {m.basis ? <span className="text-xs text-bone-500">{basisLabels[m.basis]}</span> : null}
              </div>
              <p className="mt-2 text-sm text-bone-300">{m.note}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
