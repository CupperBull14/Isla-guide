import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  /** Смещение по Y в пикселях, с которого элемент «всплывает». */
  y?: number
  className?: string
}

/** Универсальный scroll-reveal контейнер (whileInView, срабатывает один раз). */
export function ScrollReveal({ children, delay = 0, y = 24, className }: ScrollRevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
