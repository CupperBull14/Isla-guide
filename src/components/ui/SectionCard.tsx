import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Cog, Grid3x3, PawPrint, Scale, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { HomeSection, SectionIcon } from '../../data/site'

const icons: Record<SectionIcon, LucideIcon> = {
  dinosaurs: PawPrint,
  guides: BookOpen,
  mechanics: Cog,
  matchups: Grid3x3,
  picker: Sparkles,
  compare: Scale,
}

export function SectionCard({ section }: { section: HomeSection }) {
  const Icon = icons[section.icon]

  return (
    <motion.div whileHover={{ y: -6 }} whileTap={{ scale: 0.99 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="h-full">
      <Link
        to={section.to}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-isle-500/70 bg-isle-800/70 p-6 backdrop-blur transition-all duration-300 hover:border-amber-500/60 hover:shadow-glow"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-isle-600 text-moss-400 transition-all duration-300 group-hover:rotate-6 group-hover:bg-amber-500/15 group-hover:text-amber-300">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <h3 className="text-lg font-bold text-bone-100">{section.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-bone-300">{section.description}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-amber-400">
          Открыть
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </Link>
    </motion.div>
  )
}
