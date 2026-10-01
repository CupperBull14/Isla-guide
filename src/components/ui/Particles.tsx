import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  phase: number
  speed: number
  color: string
}

const COLORS = ['246,185,74', '143,193,119', '180,217,160'] as const

function makeParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.6 + Math.random() * 1.8,
    vx: (Math.random() - 0.5) * 0.15,
    vy: -0.05 - Math.random() * 0.25,
    phase: Math.random() * Math.PI * 2,
    speed: 0.4 + Math.random() * 0.9,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

interface ParticlesProps {
  count?: number
  className?: string
}

/** Лёгкие «светлячки/споры» на canvas. Учитывает reduced-motion и скрытую вкладку. */
export function Particles({ count = 46, className = '' }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let particles: Particle[] = []
    let raf = 0
    let last = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = w < 640 ? Math.round(count * 0.55) : count
      particles = Array.from({ length: n }, () => makeParticle(w, h))
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t / 1000 * p.speed + p.phase))
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
        g.addColorStop(0, `rgba(${p.color},${0.55 * tw})`)
        g.addColorStop(1, `rgba(${p.color},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = (now: number) => {
      const dt = Math.min(now - last, 50) / 16.67
      last = now
      for (const p of particles) {
        p.x += (p.vx + Math.sin(now / 2000 + p.phase) * 0.08) * dt
        p.y += p.vy * dt
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
      }
      draw(now)
      raf = requestAnimationFrame(step)
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else if (!reduce) {
        last = performance.now()
        raf = requestAnimationFrame(step)
      }
    }

    resize()
    if (reduce) {
      draw(0)
    } else {
      raf = requestAnimationFrame(step)
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduce) draw(0)
    })
    ro.observe(parent)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [count])

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
