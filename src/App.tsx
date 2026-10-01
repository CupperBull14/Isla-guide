import { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import { lazyPage } from './utils/lazyPage'
import Home from './pages/Home'
const Dinosaurs = lazyPage(() => import('./pages/Dinosaurs'))
const DinosaurDetail = lazyPage(() => import('./pages/DinosaurDetail'))
const Guides = lazyPage(() => import('./pages/Guides'))
const Mechanics = lazyPage(() => import('./pages/Mechanics'))
const NotFound = lazyPage(() => import('./pages/NotFound'))
const Tools = lazyPage(() => import('./pages/Tools'))

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-amber-400 px-4 py-2 font-semibold text-isle-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        К содержимому
      </a>
      <Navbar />
      {/* Без exit-анимации: AnimatePresence mode="wait" при быстром «Назад» иногда оставлял пустую страницу.
          Плавное появление делает PageWrapper при каждой смене маршрута. */}
      <ErrorBoundary resetKey={location.pathname}>
      <Suspense fallback={<div className="flex-1" aria-busy="true" />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/dinosaurs" element={<Dinosaurs />} />
          <Route path="/dinosaurs/:id" element={<DinosaurDetail />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </ErrorBoundary>
      <Footer />
    </div>
  )
}
