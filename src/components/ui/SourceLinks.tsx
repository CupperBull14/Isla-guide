import type { SourceRef } from '../../types'

export function SourceLinks({ sources, label = 'Источники' }: { sources: readonly SourceRef[]; label?: string }) {
  if (sources.length === 0) return null
  return (
    <div className="mt-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-bone-500">{label}</div>
      <ul className="mt-2 space-y-1 text-xs">
        {sources.map((s) => (
          <li key={s.url || s.title}>
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
                {s.title}
              </a>
            ) : (
              <span className="text-bone-300">{s.title}</span>
            )}
            <span className="text-bone-500"> · {s.date}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
