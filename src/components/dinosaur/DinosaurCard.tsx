import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Diet, Dinosaur } from '../../types'
import { categoryLabels, dietLabels } from '../../data/site'
import { formatMinutes, statValue } from '../../utils/dino'

const accent: Record<Diet, string> = {
  carnivore: 'from-blood-500/70',
  herbivore: 'from-moss-500/70',
  omnivore: 'from-amber-500/70',
}

export function DinosaurCard({ dino }: { dino: Dinosaur }) {
  const weight = statValue(dino, 'weight')
  const speed = statValue(dino, 'speed')
  const growth = statValue(dino, 'growth')
  const mini: [string, string][] = [
    ['вес', weight === null ? '—' : `${weight.toLocaleString('ru-RU')} кг`],
    ['скорость', speed === null ? '—' : `${speed} км/ч`],
    ['рост', growth === null ? '—' : formatMinutes(growth)],
  ]

  return (
    <motion.div className="h-full" whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
      <Link
        to={`/dinosaurs/${dino.id}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-isle-600 bg-isle-800 p-5 transition-colors hover:border-amber-500/60 hover:shadow-glow"
      >
        <span aria-hidden className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accent[dino.diet]} to-transparent`} />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="text-xs font-semibold uppercase tracking-wider text-moss-400">
          {dietLabels[dino.diet]} · {categoryLabels[dino.category]}
        </div>
        <h3 className="mt-2 text-xl font-bold text-bone-100">{dino.nameRu}</h3>
        <p className="text-sm text-bone-500">{dino.name}</p>
        <dl className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-isle-900/50 p-2.5 text-center">
          {mini.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[10px] uppercase tracking-wider text-bone-500">{k}</dt>
              <dd className="mt-0.5 text-xs font-semibold text-bone-100">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          {dino.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-isle-600 px-2 py-0.5 text-xs text-bone-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-amber-400">
          Открыть гайд
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  )
}
