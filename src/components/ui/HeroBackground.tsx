import { Particles } from './Particles'

/** Атмосферный фон hero: градиенты + дрейфующий туман (CSS) + частицы (canvas). */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_15%,rgba(79,132,61,0.35),transparent_55%),radial-gradient(ellipse_at_85%_5%,rgba(232,154,28,0.20),transparent_50%),linear-gradient(to_bottom,#0b110d,#070b08)]" />

      <div className="absolute -left-1/4 top-1/4 h-[28rem] w-[60rem] animate-fog-drift rounded-full bg-moss-600/20 blur-3xl" />
      <div className="absolute -right-1/4 top-1/2 h-[24rem] w-[55rem] animate-fog-drift-rev rounded-full bg-moss-700/25 blur-3xl" />
      <div className="absolute left-1/4 top-[55%] h-[20rem] w-[50rem] animate-fog-drift rounded-full bg-amber-600/10 blur-3xl [animation-delay:-12s]" />

      <Particles />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,11,8,0.75)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-isle-900" />
    </div>
  )
}
