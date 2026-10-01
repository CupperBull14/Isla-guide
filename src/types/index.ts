/** Машинный ключ параметра — для сравнения и инструментов. */
export type StatKey = 'weight' | 'speed' | 'bite' | 'growth' | 'hunger' | 'thirst' | 'pack' | 'eggs'

/** Параметр дино. null = «данных нет» (выдумывать цифры запрещено). */
export interface Stat {
  key: StatKey
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

/** Точка кривой роста (из таблицы EQG). null — данных нет. */
export interface GrowthPoint {
  pct: number
  weight: number | null
  speed: number | null
  bite: number | null
}

/** Кривая роста: обычный путь (без Prime, Frail после 87,5%) и Prime. */
export interface GrowthCurve {
  normal: GrowthPoint[]
  prime: GrowthPoint[]
  notes: string[]
  /** id источника из Dinosaur.sources */
  source: string
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
  /** Пусто — источник без ссылки (например, проверка в игре). */
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
  curve: GrowthCurve
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

/** Ссылка на источник для механик и гайдов. */
export interface SourceRef {
  title: string
  url: string
  /** Дата источника или «не указана». */
  date: string
}

export interface Mechanic {
  id: string
  title: string
  summary: string
  details: string[]
  tips: string[]
  /** Что неясно или противоречит друг другу (⚠️). */
  caveats?: string[]
  sources: SourceRef[]
}

export interface GuideStep {
  id: string
  /** Ориентир по времени, например «0–2 мин». Не игровая константа. */
  when: string
  title: string
  body: string
  checklist: string[]
  sources: SourceRef[]
}

export interface GlossaryTerm {
  id: string
  en: string
  ru: string
  /** Расшифровка своими словами. */
  meaning: string
  source: SourceRef
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  caveat?: string
  sources: SourceRef[]
}

/* ---------- Инструменты ---------- */

export type ToolId = 'picker' | 'compare' | 'calc' | 'counter'

export interface ToolInfo {
  id: ToolId
  title: string
  short: string
  description: string
}

export type PickerQuestionId = 'diet' | 'group' | 'pace' | 'size' | 'speed' | 'newbie'

export interface PickerOption {
  id: string
  label: string
  hint?: string
}

export interface PickerQuestion {
  id: PickerQuestionId
  title: string
  options: PickerOption[]
}

/** Строка сравнения: какой параметр и что считать «лидером». */
export interface CompareRow {
  key: StatKey
  label: string
  unit: string
  /** 'high' — выделяем наибольшее, 'low' — наименьшее. */
  leader: 'high' | 'low'
  leaderHint: string
}
