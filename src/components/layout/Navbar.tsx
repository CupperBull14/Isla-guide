import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Leaf } from 'lucide-react'
import { site } from '../../data/site'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-isle-600 text-amber-300' : 'text-bone-300 hover:bg-isle-700 hover:text-bone-100'
  }`

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-isle-600/60 bg-isle-900/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-sm font-bold text-bone-100">
          <Leaf className="h-5 w-5 text-moss-400" aria-hidden />
          {site.name}
        </Link>

        <nav className="hidden gap-1 md:flex" aria-label="Основная навигация">
          {site.nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-bone-300 hover:bg-isle-700 md:hidden"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-isle-600/60 px-4 py-3 md:hidden" aria-label="Мобильная навигация">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
