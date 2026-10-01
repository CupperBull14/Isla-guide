import { usePageMeta } from '../utils/seo'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { HeroBackground } from '../components/ui/HeroBackground'
import { SectionCard } from '../components/ui/SectionCard'
import { CountUp } from '../components/ui/CountUp'
import { PatchBadge } from '../components/ui/PatchBadge'
import { dinosaurs } from '../data/dinosaurs'
import { mechanics } from '../data/mechanics'
import { currentPatch, homeSections, site, updateSteps } from '../data/site'
import { pluralRu } from '../utils/plural'

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Home() {
  usePageMeta({ description: 'Фанатский справочник по The Isle: Evrima: гайды по 22 динозаврам, стадии роста, матрица матчапов и механики. Только Evrima, с источниками и датами.' })
  const dinoCount = dinosaurs.length
  const mechCount = mechanics.length

  return (
    <PageWrapper fullBleed>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <HeroBackground />
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="relative mx-auto max-w-6xl px-4 pb-24 pt-36 sm:px-6 sm:pb-32 sm:pt-44 lg:px-8"
        >
          <motion.p variants={heroItem} className="text-sm font-semibold uppercase tracking-[0.25em] text-moss-400">
            The Isle: Evrima
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-4 bg-gradient-to-br from-bone-100 via-bone-100 to-amber-300 bg-clip-text text-5xl font-extrabold leading-[1.05] text-transparent sm:text-7xl"
          >
            {site.name}
          </motion.h1>
          <motion.p variants={heroItem} className="mt-5 max-w-2xl text-lg text-bone-100/90 sm:text-xl">
            {site.tagline}
          </motion.p>
          <motion.p variants={heroItem} className="mt-3 max-w-2xl text-bone-300">
            {site.heroLead}
          </motion.p>

          <motion.div variants={heroItem} className="mt-6 flex flex-wrap items-center gap-3">
            <PatchBadge patch={currentPatch.number} />
            <span className="text-xs text-bone-500">
              {currentPatch.branch}, {currentPatch.date}
            </span>
          </motion.div>

          <motion.div variants={heroItem} className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/dinosaurs"
              className="group inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-semibold text-isle-950 shadow-glow transition-colors hover:bg-amber-400"
            >
              К динозаврам
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              to="/mechanics"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-bone-100 backdrop-blur transition-colors hover:border-moss-400 hover:bg-white/10"
            >
              Механики
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <div className="mx-auto max-w-6xl space-y-24 px-4 pb-20 sm:px-6 lg:px-8">
        {/* СЧЁТЧИКИ */}
        <ScrollReveal>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-isle-500/70 bg-isle-800/60 p-6">
              <dt className="text-sm text-bone-500">В базе гайдов</dt>
              <dd className="mt-2 font-display text-4xl font-extrabold text-amber-300">
                <CountUp value={dinoCount} />
              </dd>
              <dd className="mt-1 text-sm text-bone-300">{pluralRu(dinoCount, ['динозавр', 'динозавра', 'динозавров'])}</dd>
            </div>
            <div className="rounded-2xl border border-isle-500/70 bg-isle-800/60 p-6">
              <dt className="text-sm text-bone-500">Описано</dt>
              <dd className="mt-2 font-display text-4xl font-extrabold text-moss-400">
                <CountUp value={mechCount} />
              </dd>
              <dd className="mt-1 text-sm text-bone-300">{pluralRu(mechCount, ['механика', 'механики', 'механик'])}</dd>
            </div>
            <div className="rounded-2xl border border-isle-500/70 bg-isle-800/60 p-6">
              <dt className="text-sm text-bone-500">Актуальный патч</dt>
              <dd className="mt-2 font-display text-3xl font-extrabold text-bone-100">{currentPatch.number}</dd>
              <dd className="mt-1 text-sm text-bone-300">{currentPatch.date}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-bone-500">
            Счётчики считаются из данных сайта. Пока в базе гайдов только тестовая запись — остальные виды добавляются по мере проверки источников.
          </p>
        </ScrollReveal>

        {/* РАЗДЕЛЫ */}
        <section>
          <ScrollReveal>
            <h2 className="text-2xl font-bold sm:text-3xl">Разделы сайта</h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-moss-500 to-amber-400" />
          </ScrollReveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeSections.map((section, i) => (
              <ScrollReveal key={section.title} delay={i * 0.07} className="h-full">
                <SectionCard section={section} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* КАК ОБНОВЛЯЕТСЯ САЙТ */}
        <section>
          <ScrollReveal>
            <h2 className="text-2xl font-bold sm:text-3xl">Как обновляется сайт</h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-moss-500 to-amber-400" />
            <p className="mt-4 max-w-2xl text-bone-300">
              Игра меняется от патча к патчу, поэтому каждый гайд привязан к версии. Вот как данные попадают на сайт.
            </p>
          </ScrollReveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {updateSteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.07}>
                <div className="flex h-full gap-4 rounded-2xl border border-isle-500/70 bg-isle-800/60 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/15 font-display text-sm font-bold text-amber-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-bone-100">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-bone-300">{step.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  )
}
