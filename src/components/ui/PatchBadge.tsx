import { site } from '../../data/site'

interface PatchBadgeProps {
  patch: string
  className?: string
}

export function PatchBadge({ patch, className = '' }: PatchBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
      </span>
      {patch === site.noData ? `Патч: ${site.noData}` : `${site.patchLabel} №${patch}`}
    </span>
  )
}
