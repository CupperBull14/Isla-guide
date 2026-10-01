import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import Home from './pages/Home'
const Dinosaurs = lazy(() => import('./pages/Dinosaurs'))
const DinosaurDetail = lazy(() => import('./pages/DinosaurDetail'))
const Guides = lazy(() => import('./pages/Guides'))
const Mechanics = lazy(() => import('./pages/Mechanics'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Tools = lazy(() => import('./pages/Tools'))

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
      <Suspense fallback={<div className="flex-1" aria-busy="true" />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/dinosaurs" element={<Dinosaurs />} />
          <Route path="/dinosaurs/:id" element={<DinosaurDetail />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      </Suspense>
      <Footer />
    </div>
  )
}
