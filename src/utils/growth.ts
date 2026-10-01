import type { Dinosaur, GrowthPoint } from '../types'

export type GrowthPath = 'normal' | 'prime'
export type CurveKey = 'weight' | 'speed' | 'bite'

export interface CurveValue {
  value: number | null
  /** true — точка из таблицы источника; false — линейная оценка между точками. */
  exact: boolean
}

/** Значение параметра на росте pct% (0–100). Между точками таблицы — линейная интерполяция. */
export function valueAt(points: readonly GrowthPoint[], key: CurveKey, pct: number): CurveValue {
  const hit = points.find((p) => Math.abs(p.pct - pct) < 1e-6)
  if (hit) return { value: hit[key], exact: true }
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]
    const b = points[i + 1]
    if (pct > a.pct && pct < b.pct) {
      const va = a[key]
      const vb = b[key]
      if (va === null || vb === null) return { value: null, exact: false }
      return { value: va + ((vb - va) * (pct - a.pct)) / (b.pct - a.pct), exact: false }
    }
  }
  return { value: null, exact: false }
}

export function curveOf(dino: Dinosaur, path: GrowthPath): readonly GrowthPoint[] {
  return path === 'prime' ? dino.curve.prime : dino.curve.normal
}

/** Максимум параметра на кривой (для шкал и «пика Prime»). */
export function curveMax(points: readonly GrowthPoint[], key: CurveKey): number | null {
  const vals = points.map((p) => p[key]).filter((v): v is number => v !== null)
  return vals.length ? Math.max(...vals) : null
}

/** Форматирование с разумной точностью: мелкие значения — с дробью. */
export function formatStat(value: number | null, unit = '', noData = 'данных нет'): string {
  if (value === null) return noData
  const digits = Math.abs(value) < 10 ? 2 : Math.abs(value) < 100 ? 1 : 0
  const text = value.toLocaleString('ru-RU', { maximumFractionDigits: digits, minimumFractionDigits: 0 })
  return unit ? `${text} ${unit}` : text
}

/** Ключевые отметки шкалы роста. */
export const growthMarks: readonly { pct: number; label: string }[] = [
  { pct: 0, label: 'вылупление' },
  { pct: 25, label: 'спавн' },
  { pct: 50, label: 'сабадульт' },
  { pct: 75, label: 'взрослый · Prime' },
  { pct: 87.5, label: 'пик Prime' },
  { pct: 100, label: 'Elder' },
]
