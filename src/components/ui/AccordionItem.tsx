import { useId, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface AccordionItemProps {
  title: string
  subtitle?: string
  open: boolean
  onToggle: () => void
  children: ReactNode
}

/** Карточка-аккордеон с плавным раскрытием высоты. */
export function AccordionItem({ title, subtitle, open, onToggle, children }: AccordionItemProps) {
  const panelId = useId()
  return (
    <div className={`rounded-2xl border bg-isle-800 transition-colors ${open ? 'border-amber-500/50' : 'border-isle-600 hover:border-isle-500'}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start justify-between gap-4 p-5 text-left"
      >
        <span>
          <span className="block text-lg font-bold text-bone-100">{title}</span>
          {subtitle ? <span className="mt-1 block text-sm text-bone-300">{subtitle}</span> : null}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="mt-1 shrink-0 text-amber-400">
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-isle-600 p-5 pt-4">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
