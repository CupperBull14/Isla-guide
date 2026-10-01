import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import Home from './pages/Home'
import Dinosaurs from './pages/Dinosaurs'
import DinosaurDetail from './pages/DinosaurDetail'
import Guides from './pages/Guides'
import Mechanics from './pages/Mechanics'

export default function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/dinosaurs" element={<Dinosaurs />} />
          <Route path="/dinosaurs/:id" element={<DinosaurDetail />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
