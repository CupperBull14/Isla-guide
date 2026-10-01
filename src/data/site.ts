import type { Diet, DinoCategory, MatchupBasis, MatchupVerdict } from '../types'

/**
 * Актуальный патч Evrima. Источник: БАЗА_ЗНАНИЙ.md, S1 (Steam-новости The Isle).
 * Обновлять вручную после проверки нового патчноута.
 */
export const currentPatch = {
  number: '0.21.772',
  date: '3 августа 2026',
  branch: 'Evrima Public Branch',
  sourceTitle: 'Steam: Patch 0.21.772 is now available',
  sourceUrl: 'https://store.steampowered.com/news/app/376210/view/717912016810936296',
} as const

/** Дата последней сверки базы знаний. */
export const dataCheckedAt = '1 октября 2026'

export const site = {
  name: 'Isla Guide',
  tagline: 'Структурированные гайды по The Isle: Evrima',
  heroLead:
    'Динозавры, стадии роста, механики и матчапы — только ветка Evrima, только с источниками и датой. Чего нет в проверенных данных, помечено прямо: «данных нет».',
  disclaimer:
    'Fan-made проект. Не связан с The Isle Development / Afterthought LLC. Только ветка Evrima.',
  patchLabel: 'Актуально для патча',
  noData: 'данных нет',
  nav: [
    { to: '/', label: 'Главная' },
    { to: '/dinosaurs', label: 'Динозавры' },
    { to: '/guides', label: 'Гайды' },
    { to: '/mechanics', label: 'Механики' },
    { to: '/tools', label: 'Инструменты' },
  ],
} as const

export type SectionIcon = 'dinosaurs' | 'guides' | 'mechanics' | 'matchups' | 'picker' | 'compare'

export interface HomeSection {
  to: string
  title: string
  description: string
  icon: SectionIcon
}

export const homeSections: readonly HomeSection[] = [
  {
    to: '/dinosaurs',
    title: 'Динозавры',
    description: 'Карточки видов: параметры, стадии роста, диета и слабые места. Каждое значение — с источником.',
    icon: 'dinosaurs',
  },
  {
    to: '/mechanics',
    title: 'Механики',
    description: 'Голод и жажда, стамина, нутриенты, Elder и Entomb, гнездование, миграции.',
    icon: 'mechanics',
  },
  {
    to: '/guides',
    title: 'Гайды',
    description: 'Первый день на острове по шагам, глоссарий терминов и ответы на частые вопросы.',
    icon: 'guides',
  },
  {
    to: '/dinosaurs?tab=matrix',
    title: 'Матрица матчапов',
    description: 'Таблица «кто кого» по всему ростеру. Только подтверждённые вердикты — пустая клетка честно значит «данных нет».',
    icon: 'matchups',
  },
  {
    to: '/tools?tool=picker',
    title: 'Подбор динозавра',
    description: 'Несколько вопросов о стиле игры — и список видов, которые подходят по параметрам.',
    icon: 'picker',
  },
  {
    to: '/tools?tool=compare',
    title: 'Сравнение и калькулятор',
    description: 'До трёх видов рядом, время роста до взрослого и расход еды и воды за сессию.',
    icon: 'compare',
  },
]

export interface UpdateStep {
  title: string
  text: string
}

export const updateSteps: readonly UpdateStep[] = [
  {
    title: 'Читаем патчноуты',
    text: 'Отправная точка — официальные Steam-новости и девблоги The Isle. Фан-вики и гайды идут вторым слоем.',
  },
  {
    title: 'Проверяем источник и дату',
    text: 'У каждого значимого факта есть ссылка и дата. Всё, что старше года или без привязки к Evrima, отбрасывается.',
  },
  {
    title: 'Пишем своими словами',
    text: 'Тексты оригинальные, без копирования с вики. Цифры берутся только из подтверждённых источников.',
  },
  {
    title: 'Помечаем пробелы',
    text: 'Если данных нет — так и написано. Спорные места отмечены, а плашка патча показывает, на какую версию рассчитан гайд.',
  },
]

export const dietLabels: Record<Diet, string> = {
  carnivore: 'Хищник',
  herbivore: 'Травоядный',
  omnivore: 'Всеядный',
}

export const categoryLabels: Record<DinoCategory, string> = {
  'apex-carnivore': 'Апекс-хищник',
  'mid-carnivore': 'Средний хищник',
  'small-carnivore': 'Малый хищник',
  aquatic: 'Водный апекс',
  flyer: 'Летающий',
  'large-herbivore': 'Крупный травоядный',
  'mid-herbivore': 'Средний травоядный',
  'small-herbivore': 'Малый травоядный',
  omnivore: 'Всеядный',
}

export const verdictLabels: Record<MatchupVerdict, string> = {
  win: 'Преимущество',
  risk: 'Риск',
  flee: 'Бежать',
}

export const basisLabels: Record<MatchupBasis, string> = {
  stated: 'прямо сказано в источнике',
  derived: 'вывод из подтверждённой механики',
  weak: 'слабый источник, нужна перепроверка',
}
