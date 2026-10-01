import { useEffect, useRef } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

interface Props {
  value: number
  format: (v: number) => string
  className?: string
}

/** Плавно «докручивает» число при изменении значения. */
export function AnimatedNumber({ value, format, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduce) {
      el.textContent = format(value)
      prev.current = value
      return
    }
    const controls = animate(prev.current, value, {
      duration: 0.35,
      ease: 'easeOut',
      onUpdate: (v) => {
        el.textContent = format(v)
      },
    })
    prev.current = value
    return () => controls.stop()
  }, [value, format, reduce])

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  )
}
