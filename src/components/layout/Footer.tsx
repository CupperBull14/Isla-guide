import { currentPatch, dataCheckedAt, site } from '../../data/site'
import { PatchBadge } from '../ui/PatchBadge'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-isle-950/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-xl space-y-2 text-xs text-bone-500">
          <p>{site.disclaimer}</p>
          <p>Данные сверены {dataCheckedAt}. Источники и даты — в базе знаний проекта.</p>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <PatchBadge patch={currentPatch.number} />
          <a
            href={currentPatch.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-bone-500 underline-offset-2 hover:text-amber-300 hover:underline"
          >
            Патчноут от {currentPatch.date}
          </a>
        </div>
      </div>
    </footer>
  )
}
