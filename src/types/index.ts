/** Параметр дино. null = «данных нет» (выдумывать цифры запрещено). */
export interface Stat {
  label: string
  value: number | null
  max: number | null
  note?: string
}

export interface GrowthStage {
  name: string
  nameRu: string
  /** Время стадии в минутах; null = данных нет */
  minutes: number | null
  focus: string
}

export type MatchupVerdict = 'win' | 'risk' | 'flee'

export interface Matchup {
  opponent: string
  verdict: MatchupVerdict
  note: string
}

export type Diet = 'carnivore' | 'herbivore' | 'omnivore'

export interface Source {
  title: string
  url: string
  /** Дата, когда факт проверен (YYYY-MM-DD) */
  date: string
}

export interface Dinosaur {
  id: string
  name: string
  nameRu: string
  diet: Diet
  tags: string[]
  overview: string[]
  stats: Stat[]
  growth: GrowthStage[]
  freshSpawn: string[]
  feeding: string
  matchups: Matchup[]
  combat: string[]
  pros: string[]
  cons: string[]
  tips: string[]
  /** Номер патча Evrima, для которого актуальны данные */
  patch: string
  sources: Source[]
}

export interface Mechanic {
  id: string
  title: string
  summary: string
  details: string[]
  tips: string[]
}
