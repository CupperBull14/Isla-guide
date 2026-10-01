import type { Source } from '../../types'

export function SourcesList({ sources }: { sources: Source[] }) {
  return (
    <ul className="space-y-2">
      {sources.map((s) => (
        <li key={s.id} className="rounded-xl border border-isle-600 bg-isle-800 p-3 text-sm">
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-amber-400 hover:underline">
            {s.title}
          </a>
          <div className="mt-1 text-xs text-bone-500">
            Дата источника: {s.date} · проверено: {s.accessed}
          </div>
        </li>
      ))}
    </ul>
  )
}
