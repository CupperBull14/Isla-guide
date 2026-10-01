import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { PageHeader } from '../components/ui/PageHeader'
import { PatchBadge } from '../components/ui/PatchBadge'
import { DinosaurCard } from '../components/dinosaur/DinosaurCard'
import { MatchupMatrix } from '../components/dinosaur/MatchupMatrix'
import { dinosaurs } from '../data/dinosaurs'
import { categoryLabels, currentPatch, dietLabels } from '../data/site'
import type { Diet } from '../types'

type Tab = 'catalog' | 'matrix'
type DietFilter = Diet | 'all'

const dietFilters: readonly DietFilter[] = ['all', 'carnivore', 'herbivore', 'omnivore']

export default function Dinosaurs() {
  const [tab, setTab] = useState<Tab>('catalog')
  const [diet, setDiet] = useState<DietFilter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return dinosaurs.filter((d) => {
      if (diet !== 'all' && d.diet !== diet) return false
      if (!q) return true
      return [d.name, d.nameRu, categoryLabels[d.category], ...d.tags].some((s) => s.toLowerCase().includes(q))
    })
  }, [diet, query])

  return (
    <PageWrapper>
      <PageHeader
        title="Динозавры"
        subtitle={`Гайды по ${dinosaurs.length} играбельным существам Evrima: параметры, рост, матчапы и советы. Каждое число — с источником.`}
      />
      <PatchBadge patch={currentPatch.number} className="mb-6" />

      <div role="tablist" className="mb-6 inline-flex rounded-xl border border-isle-600 bg-isle-800 p-1">
        {([['catalog', 'Каталог'], ['matrix', 'Матрица матчапов']] as const).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === id ? 'text-isle-950' : 'text-bone-300 hover:text-bone-100'}`}
          >
            {tab === id ? <motion.span layoutId="dino-tab" className="absolute inset-0 rounded-lg bg-amber-400" /> : null}
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>

      {tab === 'catalog' ? (
        <>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-500" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск: название, класс, тег"
                className="w-full rounded-xl border border-isle-600 bg-isle-800 py-2.5 pl-10 pr-3 text-sm text-bone-100 placeholder:text-bone-500 focus:border-amber-500/60 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {dietFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setDiet(f)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    diet === f ? 'border-amber-500 bg-amber-500/15 text-amber-300' : 'border-isle-600 text-bone-300 hover:border-isle-500'
                  }`}
                >
                  {f === 'all' ? 'Все' : dietLabels[f]}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((dino) => (
                <motion.div
                  key={dino.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <DinosaurCard dino={dino} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {filtered.length === 0 ? <p className="mt-8 text-bone-300">Ничего не найдено.</p> : null}
        </>
      ) : (
        <MatchupMatrix />
      )}
    </PageWrapper>
  )
}
