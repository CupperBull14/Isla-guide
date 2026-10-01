import { site } from '../../data/site'

export function PatchBadge({ patch }: { patch: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      {site.patchLabel} {patch}
    </span>
  )
}
