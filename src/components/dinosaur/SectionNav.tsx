import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export interface NavSection {
  id: string
  label: string
}

/** Липкая навигация по разделам страницы со scroll-spy. */
export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-120px 0px -60% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="Разделы гайда"
      className="sticky top-16 z-30 -mx-4 mb-8 overflow-x-auto border-y border-isle-600 bg-isle-900/85 px-4 backdrop-blur sm:mx-0 sm:rounded-xl sm:border"
    >
      <ul className="flex min-w-max gap-1 py-2">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={`relative block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                active === s.id ? 'text-amber-300' : 'text-bone-300 hover:text-bone-100'
              }`}
            >
              {active === s.id ? (
                <motion.span layoutId="section-nav-active" className="absolute inset-0 rounded-lg bg-amber-500/10" />
              ) : null}
              <span className="relative">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
