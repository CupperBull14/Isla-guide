import { usePageMeta } from '../utils/seo'
import { useState } from 'react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { PageHeader } from '../components/ui/PageHeader'
import { PatchBadge } from '../components/ui/PatchBadge'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { AccordionItem } from '../components/ui/AccordionItem'
import { SourceLinks } from '../components/ui/SourceLinks'
import { mechanics } from '../data/mechanics'
import { currentPatch } from '../data/site'

export default function Mechanics() {
  usePageMeta({ title: 'Механики', description: 'Механики The Isle: Evrima — рост, Prime и Entomb, диета, стамина, гнездование, группы и серверы. Каждый факт с источником.' })
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <PageWrapper>
      <PageHeader title="Механики" subtitle="Игровые механики Evrima: только проверенные факты с источниками. Спорные места вынесены в блок «Что неясно»." />
      <PatchBadge patch={currentPatch.number} className="mb-8" />
      {mechanics.length === 0 ? (
        <p className="rounded-xl border border-dashed border-isle-500 p-6 text-bone-500">Механики пока не добавлены.</p>
      ) : (
        <div className="space-y-3">
          {mechanics.map((m, i) => (
            <ScrollReveal key={m.id} delay={Math.min(i, 4) * 0.04}>
              <AccordionItem title={m.title} subtitle={m.summary} open={openId === m.id} onToggle={() => setOpenId(openId === m.id ? null : m.id)}>
                <ul className="list-inside list-disc space-y-2 text-sm text-bone-300">
                  {m.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                {m.tips.length > 0 ? (
                  <div className="mt-4 rounded-xl border border-moss-600/40 bg-moss-700/10 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-moss-300">Советы</div>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-bone-300">
                      {m.tips.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {m.caveats && m.caveats.length > 0 ? (
                  <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">Что неясно</div>
                    <ul className="mt-2 space-y-1 text-sm text-bone-300">
                      {m.caveats.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <SourceLinks sources={m.sources} />
              </AccordionItem>
            </ScrollReveal>
          ))}
        </div>
      )}
    </PageWrapper>
  )
}
