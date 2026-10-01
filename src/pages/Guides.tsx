import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Search } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { PageHeader } from '../components/ui/PageHeader'
import { PatchBadge } from '../components/ui/PatchBadge'
import { AccordionItem } from '../components/ui/AccordionItem'
import { SourceLinks } from '../components/ui/SourceLinks'
import { faq, firstDaySteps, glossary } from '../data/guides'
import { currentPatch } from '../data/site'

type Tab = 'day' | 'glossary' | 'faq'
const tabs: readonly { id: Tab; label: string }[] = [
  { id: 'day', label: 'Первый день' },
  { id: 'glossary', label: 'Глоссарий' },
  { id: 'faq', label: 'FAQ' },
]

function FirstDay() {
  const [active, setActive] = useState(0)
  const [done, setDone] = useState<ReadonlySet<string>>(new Set())
  const step = firstDaySteps[active]
  const total = firstDaySteps.reduce((n, s) => n + s.checklist.length, 0)
  const pct = total === 0 ? 0 : Math.round((done.size / total) * 100)

  const toggle = (id: string) =>
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between text-xs text-bone-500">
          <span>Прогресс чек-листа</span>
          <span>{pct}%</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-isle-600">
          <motion.div className="h-full bg-gradient-to-r from-moss-600 to-amber-400" animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <ol className="relative space-y-1 border-l border-isle-500 pl-5">
          {firstDaySteps.map((s, i) => {
            const stepDone = s.checklist.every((_, k) => done.has(`${s.id}-${k}`))
            return (
              <li key={s.id} className="relative">
                <span
                  className={`absolute -left-[27px] top-3.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-isle-900 ${
                    stepDone ? 'bg-moss-400' : i === active ? 'bg-amber-400' : 'bg-isle-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative w-full rounded-xl px-3 py-2.5 text-left transition-colors ${i === active ? 'text-amber-300' : 'text-bone-300 hover:text-bone-100'}`}
                >
                  {i === active ? <motion.span layoutId="day-step" className="absolute inset-0 rounded-xl bg-amber-500/10" /> : null}
                  <span className="relative block text-xs text-bone-500">{s.when}</span>
                  <span className="relative block text-sm font-semibold">{s.title}</span>
                </button>
              </li>
            )
          })}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-isle-600 bg-isle-800 p-5"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-moss-400">{step.when}</div>
            <h2 className="mt-1 text-xl font-bold text-bone-100">{step.title}</h2>
            <p className="mt-3 text-bone-300">{step.body}</p>
            <ul className="mt-4 space-y-2">
              {step.checklist.map((item, k) => {
                const id = `${step.id}-${k}`
                const checked = done.has(id)
                return (
                  <li key={id}>
                    <button type="button" onClick={() => toggle(id)} className="flex w-full items-center gap-3 rounded-xl border border-isle-600 p-3 text-left text-sm text-bone-300 hover:border-isle-500">
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${checked ? 'border-moss-400 bg-moss-500/30 text-moss-300' : 'border-isle-500'}`}>
                        {checked ? <Check className="h-3.5 w-3.5" /> : null}
                      </span>
                      <span className={checked ? 'text-bone-500 line-through' : ''}>{item}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <SourceLinks sources={step.sources} />
            <div className="mt-5 flex justify-between">
              <button type="button" disabled={active === 0} onClick={() => setActive(active - 1)} className="rounded-lg border border-isle-600 px-3 py-1.5 text-sm text-bone-300 enabled:hover:border-amber-500/60 disabled:opacity-40">
                ← Назад
              </button>
              <button type="button" disabled={active === firstDaySteps.length - 1} onClick={() => setActive(active + 1)} className="rounded-lg bg-amber-400 px-3 py-1.5 text-sm font-semibold text-isle-950 enabled:hover:bg-amber-300 disabled:opacity-40">
                Дальше →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Glossary() {
  const [query, setQuery] = useState('')
  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return glossary.filter((t) => !q || [t.en, t.ru, t.meaning].some((s) => s.toLowerCase().includes(q)))
  }, [query])

  return (
    <div>
      <p className="mb-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-bone-300">
        ⚠️ Английские термины взяты из перечисленных источников. Русские названия — перевод или калька автора сайта: подтверждённого русскоязычного
        сленга сообщества в источниках найти не удалось.
      </p>
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по термину (RU / EN)"
          className="w-full rounded-xl border border-isle-600 bg-isle-800 py-2.5 pl-10 pr-3 text-sm text-bone-100 placeholder:text-bone-500 focus:border-amber-500/60 focus:outline-none"
        />
      </div>
      <motion.ul layout className="grid gap-3 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((t) => (
            <motion.li key={t.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }} className="rounded-xl border border-isle-600 bg-isle-800 p-4">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-bold text-bone-100">{t.en}</span>
                <span className="text-sm text-amber-300">{t.ru}</span>
              </div>
              <p className="mt-2 text-sm text-bone-300">{t.meaning}</p>
              <SourceLinks sources={[t.source]} label="Источник" />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 ? <p className="mt-6 text-bone-300">Ничего не найдено.</p> : null}
    </div>
  )
}

function Faq() {
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <div className="space-y-3">
      {faq.map((f) => (
        <AccordionItem key={f.id} title={f.question} open={openId === f.id} onToggle={() => setOpenId(openId === f.id ? null : f.id)}>
          <p className="text-sm text-bone-300">{f.answer}</p>
          {f.caveat ? <p className="mt-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-bone-300">{f.caveat}</p> : null}
          {f.sources.length > 0 ? <SourceLinks sources={f.sources} /> : <p className="mt-3 text-xs text-bone-500">Источников нет — данных нет.</p>}
        </AccordionItem>
      ))}
    </div>
  )
}

export default function Guides() {
  const [tab, setTab] = useState<Tab>('day')
  return (
    <PageWrapper>
      <PageHeader title="Гайды" subtitle="Первый день на острове, глоссарий терминов и ответы на частые вопросы. Всё — с источниками." />
      <PatchBadge patch={currentPatch.number} className="mb-6" />
      <div role="tablist" className="mb-8 inline-flex flex-wrap rounded-xl border border-isle-600 bg-isle-800 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === t.id ? 'text-isle-950' : 'text-bone-300 hover:text-bone-100'}`}
          >
            {tab === t.id ? <motion.span layoutId="guides-tab" className="absolute inset-0 rounded-lg bg-amber-400" /> : null}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {tab === 'day' ? <FirstDay /> : tab === 'glossary' ? <Glossary /> : <Faq />}
        </motion.div>
      </AnimatePresence>
    </PageWrapper>
  )
}
