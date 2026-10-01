import { motion } from 'framer-motion'
import { Calculator, Scale, Sparkles, Swords } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { PageHeader } from '../components/ui/PageHeader'
import { PatchBadge } from '../components/ui/PatchBadge'
import { Picker } from '../components/tools/Picker'
import { Compare } from '../components/tools/Compare'
import { LifeCalculator } from '../components/tools/LifeCalculator'
import { CounterGuide } from '../components/tools/CounterGuide'
import { getDinosaurById } from '../data/dinosaurs'
import { currentPatch } from '../data/site'
import { maxCompare, tools } from '../data/tools'
import type { ToolId } from '../types'
import { usePageMeta } from '../utils/seo'

const icons: Record<ToolId, LucideIcon> = { picker: Sparkles, compare: Scale, calc: Calculator, counter: Swords }
const isTool = (v: string | null): v is ToolId => tools.some((t) => t.id === v)

export default function Tools() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('tool')
  const tool: ToolId = isTool(raw) ? raw : 'picker'
  const info = tools.find((t) => t.id === tool) ?? tools[0]
  const id = params.get('id') ?? ''
  const ids = (params.get('ids') ?? '')
    .split(',')
    .filter((x, i, arr) => x && getDinosaurById(x) && arr.indexOf(x) === i)
    .slice(0, maxCompare)

  usePageMeta({ title: info.title, description: info.description })

  const update = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
    setParams(next, { replace: true })
  }

  return (
    <PageWrapper>
      <PageHeader title="Инструменты" subtitle="Подбор, сравнение, калькулятор и контр-гайд — всё считается из тех же проверенных данных, что и гайды." />
      <PatchBadge patch={currentPatch.number} className="mb-6" />

      <div role="tablist" aria-label="Инструменты" className="mb-3 grid grid-cols-2 gap-1 rounded-2xl border border-isle-600 bg-isle-800 p-1 sm:inline-grid sm:grid-cols-4">
        {tools.map((t) => {
          const Icon = icons[t.id]
          const on = t.id === tool
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={on}
              onClick={() => update({ tool: t.id })}
              className={`relative flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${on ? 'text-isle-950' : 'text-bone-300 hover:text-bone-100'}`}
            >
              {on ? <motion.span layoutId="tools-tab" className="absolute inset-0 rounded-xl bg-amber-400" transition={{ type: 'spring', stiffness: 380, damping: 32 }} /> : null}
              <Icon className="relative h-4 w-4" aria-hidden />
              <span className="relative">{t.short}</span>
            </button>
          )
        })}
      </div>
      <p className="mb-8 max-w-2xl text-sm text-bone-300">{info.description}</p>

        <motion.div key={tool} role="tabpanel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {tool === 'picker' ? <Picker /> : null}
          {tool === 'compare' ? <Compare ids={ids} onChange={(next) => update({ ids: next.join(',') })} /> : null}
          {tool === 'calc' ? <LifeCalculator id={id} onChange={(v) => update({ id: v })} /> : null}
          {tool === 'counter' ? <CounterGuide id={id} onChange={(v) => update({ id: v })} /> : null}
        </motion.div>
    </PageWrapper>
  )
}
