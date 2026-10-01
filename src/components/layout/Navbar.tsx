import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { site } from '../../data/site'

function BurgerIcon({ open }: { open: boolean }) {
  const common = { transition: { duration: 0.25 }, className: 'absolute left-0 h-0.5 w-6 rounded bg-current' }
  return (
    <span className="relative block h-5 w-6" aria-hidden>
      <motion.span {...common} style={{ top: 2 }} animate={open ? { top: 9, rotate: 45 } : { top: 2, rotate: 0 }} />
      <motion.span {...common} style={{ top: 9 }} animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} />
      <motion.span {...common} style={{ top: 16 }} animate={open ? { top: 9, rotate: -45 } : { top: 16, rotate: 0 }} />
    </span>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Закрывать меню при смене страницы и по Escape
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ${
        scrolled || open
          ? 'border-white/10 bg-isle-900/70 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]'
          : 'border-white/5 bg-isle-900/30'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2 font-display text-sm font-bold text-bone-100">
          <Leaf
            className="h-5 w-5 text-moss-400 transition-transform duration-300 group-hover:rotate-12 group-hover:text-amber-400"
            aria-hidden
          />
          {site.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
          {site.nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className="relative rounded-lg px-3 py-2 text-sm font-medium">
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/10 ring-1 ring-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span
                    className={`relative transition-colors ${
                      isActive ? 'text-amber-300' : 'text-bone-300 hover:text-bone-100'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-bone-300 transition-colors hover:bg-white/10 hover:text-bone-100 md:hidden"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <BurgerIcon open={open} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            id="mobile-nav"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/10 md:hidden"
            aria-label="Мобильная навигация"
          >
            <ul className="flex flex-col gap-1 px-4 py-3">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                        isActive ? 'bg-white/10 text-amber-300' : 'text-bone-300 hover:bg-white/5 hover:text-bone-100'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
