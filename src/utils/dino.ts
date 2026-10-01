import type { Dinosaur, Matchup, StatKey } from '../types'

/** Значение параметра по ключу; null — данных нет. */
export function statValue(dino: Dinosaur, key: StatKey): number | null {
  return dino.stats.find((s) => s.key === key)?.value ?? null
}

/** «1 ч 25 мин» / «данных нет». */
export function formatMinutes(minutes: number | null, noData = 'данных нет'): string {
  if (minutes === null || !Number.isFinite(minutes)) return noData
  const total = Math.round(minutes)
  const h = Math.floor(total / 60)
  const m = total % 60
  if (h === 0) return `${m} мин`
  return m === 0 ? `${h} ч` : `${h} ч ${m} мин`
}

export function formatNumber(value: number | null, unit = '', noData = 'данных нет'): string {
  if (value === null) return noData
  return `${value.toLocaleString('ru-RU')}${unit ? ` ${unit}` : ''}`
}

/** Границы стадий роста (в процентах): Hatchling 0–25, Juvenile 25–50, Subadult 50–75, Adult 75–100. */
const STAGE_BOUNDS: readonly [number, number][] = [
  [0, 25],
  [25, 50],
  [50, 75],
  [75, 100],
]

export interface GrowthEstimate {
  minutes: number | null
  /** true — расчёт по общему времени (по стадиям данных нет), равномерный рост — оценка. */
  approximate: boolean
}

/**
 * Время от роста `from`% до `to`%. Внутри стадии рост считается равномерным (допущение).
 * Если длительности стадий неизвестны, но известно общее время 0–100% — равномерная оценка по нему.
 */
export function growthTime(dino: Dinosaur, from: number, to: number): GrowthEstimate {
  if (to <= from) return { minutes: 0, approximate: false }
  const stages = dino.growth
  if (stages.length === STAGE_BOUNDS.length && stages.every((s) => s.minutes !== null)) {
    let sum = 0
    stages.forEach((s, i) => {
      const [a, b] = STAGE_BOUNDS[i]
      const overlap = Math.max(0, Math.min(b, to) - Math.max(a, from))
      sum += ((s.minutes ?? 0) * overlap) / (b - a)
    })
    return { minutes: sum, approximate: false }
  }
  const total = statValue(dino, 'growth')
  if (total === null) return { minutes: null, approximate: true }
  return { minutes: (total * (to - from)) / 100, approximate: true }
}

/** Матчап строки `row` против `col` — строго в этом направлении. */
export function matchupOf(row: Dinosaur, colId: string): Matchup | undefined {
  return row.matchups.find((m) => m.opponent === colId)
}
