import type { Dinosaur } from '../../types'

/**
 * ТЕСТОВАЯ ЗАПИСЬ (этап 0): служит только для проверки рендера.
 * Игровых цифр и вердиктов здесь нет намеренно — данные будут добавлены
 * после веб-поиска с источниками.
 */
export const tyrannosaurus: Dinosaur = {
  id: 'tyrannosaurus',
  name: 'Tyrannosaurus',
  nameRu: 'Тираннозавр',
  diet: 'carnivore',
  tags: ['тестовая запись'],
  overview: ['Тестовая запись для проверки вёрстки. Реальное описание появится после сбора данных по Evrima.'],
  stats: [
    { label: 'Здоровье', value: null, max: null, note: 'данных нет' },
    { label: 'Скорость', value: null, max: null, note: 'данных нет' },
    { label: 'Стамина', value: null, max: null, note: 'данных нет' },
  ],
  growth: [
    { name: 'Hatchling', nameRu: 'Детёныш', minutes: null, focus: 'данных нет' },
    { name: 'Juvenile', nameRu: 'Подросток', minutes: null, focus: 'данных нет' },
    { name: 'Subadult', nameRu: 'Сабадульт', minutes: null, focus: 'данных нет' },
    { name: 'Adult', nameRu: 'Взрослый', minutes: null, focus: 'данных нет' },
  ],
  freshSpawn: [],
  feeding: 'данных нет',
  matchups: [],
  combat: [],
  pros: [],
  cons: [],
  tips: [],
  patch: 'данных нет',
  sources: [],
}
