import { Link } from 'react-router-dom'
import { PageTransition } from '../components/ui/PageTransition'
import { Reveal } from '../components/ui/Reveal'
import { site } from '../data/site'

export default function Home() {
  return (
    <PageTransition>
      <section className="py-10 sm:py-20">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-moss-400">The Isle: Evrima</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
            {site.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-bone-300">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/dinosaurs"
              className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-isle-950 transition-colors hover:bg-amber-400"
            >
              Динозавры
            </Link>
            <Link
              to="/mechanics"
              className="rounded-xl border border-isle-500 px-5 py-3 font-semibold text-bone-100 transition-colors hover:border-moss-400"
            >
              Механики
            </Link>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
