import type { Diet } from '../types'

export const site = {
  name: 'Isla Guide',
  tagline: 'Структурированные гайды по The Isle: Evrima',
  disclaimer:
    'Fan-made проект. Не связан с The Isle Development / Afterthought LLC. Только ветка Evrima.',
  patchLabel: 'Актуально для патча',
  noData: 'данных нет',
  nav: [
    { to: '/', label: 'Главная' },
    { to: '/dinosaurs', label: 'Динозавры' },
    { to: '/guides', label: 'Гайды' },
    { to: '/mechanics', label: 'Механики' },
  ],
} as const

export const dietLabels: Record<Diet, string> = {
  carnivore: 'Хищник',
  herbivore: 'Травоядный',
  omnivore: 'Всеядный',
}
