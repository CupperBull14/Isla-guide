/** Параметр дино. null = «данных нет» (выдумывать цифры запрещено). */
export interface Stat {
  label: string
  value: number | null
  max: number | null
  note?: string
  /** Единица измерения для отображения (кг, км/ч, мин ...). */
  unit?: string
  /** 'sqrt' — шкала бара по корню (для разброса от 20 кг до 9 т). */
  scale?: 'linear' | 'sqrt'
  /** id источника из Dinosaur.sources. */
  source?: string
}

export interface GrowthStage {
  name: string
  nameRu: string
  /** Длительность стадии в минутах; null = данных нет */
  minutes: number | null
  focus: string
  /** Диапазон роста, например «25–50%». */
  age?: string
  /** Вес / скорость / Bite на стадии (строка для показа). */
  details?: string
}

export type MatchupVerdict = 'win' | 'risk' | 'flee'

/**
 * stated  — вердикт прямо сформулирован в источнике;
 * derived — следует из подтверждённой механики (источник указан);
 * weak    — источник без даты/устаревший/вторичный, нужна перепроверка.
 */
export type MatchupBasis = 'stated' | 'derived' | 'weak'

export interface Matchup {
  /** id динозавра-соперника (см. src/data/dinosaurs). */
  opponent: string
  verdict: MatchupVerdict
  note: string
  basis?: MatchupBasis
  /** id источника из Dinosaur.sources. */
  source?: string
}

export type Diet = 'carnivore' | 'herbivore' | 'omnivore'

export type DinoCategory =
  | 'apex-carnivore'
  | 'mid-carnivore'
  | 'small-carnivore'
  | 'aquatic'
  | 'flyer'
  | 'large-herbivore'
  | 'mid-herbivore'
  | 'small-herbivore'
  | 'omnivore'

export interface Source {
  id: string
  title: string
  url: string
  /** Дата источника (YYYY-MM-DD или «не указана»). */
  date: string
  /** Дата, когда факт проверен. */
  accessed: string
}

export interface Dinosaur {
  id: string
  name: string
  nameRu: string
  diet: Diet
  category: DinoCategory
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
