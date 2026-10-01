import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Dinosaur } from '../../types'
import { dietLabels } from '../../data/site'

export function DinosaurCard({ dino }: { dino: Dinosaur }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
      <Link
        to={`/dinosaurs/${dino.id}`}
        className="group block rounded-2xl border border-isle-600 bg-isle-800 p-5 transition-colors hover:border-amber-500/60 hover:shadow-glow"
      >
        <div className="text-xs font-semibold uppercase tracking-wider text-moss-400">
          {dietLabels[dino.diet]}
        </div>
        <h3 className="mt-2 text-xl font-bold text-bone-100">{dino.nameRu}</h3>
        <p className="text-sm text-bone-500">{dino.name}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {dino.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-isle-600 px-2 py-0.5 text-xs text-bone-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-1 text-sm font-medium text-amber-400">
          Открыть гайд
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  )
}
