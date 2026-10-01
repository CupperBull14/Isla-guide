import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import Home from './pages/Home'
import Dinosaurs from './pages/Dinosaurs'
import DinosaurDetail from './pages/DinosaurDetail'
import Guides from './pages/Guides'
import Mechanics from './pages/Mechanics'
import NotFound from './pages/NotFound'
import Tools from './pages/Tools'

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
      <Footer />
    </div>
  )
}
