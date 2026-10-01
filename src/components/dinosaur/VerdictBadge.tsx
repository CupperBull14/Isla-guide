import type { MatchupVerdict } from '../../types'
import { verdictLabels } from '../../data/site'

export const verdictStyles: Record<MatchupVerdict, string> = {
  win: 'border-moss-500/50 bg-moss-500/15 text-moss-300',
  risk: 'border-amber-500/50 bg-amber-500/15 text-amber-300',
  flee: 'border-blood-500/50 bg-blood-500/15 text-blood-400',
}

export function VerdictBadge({ verdict }: { verdict: MatchupVerdict }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${verdictStyles[verdict]}`}>
      {verdictLabels[verdict]}
    </span>
  )
}
