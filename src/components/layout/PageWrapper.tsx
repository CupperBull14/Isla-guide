import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
  /** Без ограничения ширины и отступов — для страниц с полноэкранным hero. */
  fullBleed?: boolean
}

/** Обёртка страницы: fade/slide-переход (работает вместе с AnimatePresence в App). */
export function PageWrapper({ children, fullBleed = false }: PageWrapperProps) {
  const reduce = useReducedMotion()
  const shift = reduce ? 0 : 16

  return (
    <motion.main
      initial={{ opacity: 0, y: shift }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -shift / 2 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={
        fullBleed
          ? 'flex-1'
          : 'mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-28 sm:px-6 lg:px-8'
      }
    >
      {children}
    </motion.main>
  )
}
