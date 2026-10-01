import type { CompareRow, PickerQuestion, ToolInfo } from '../types'
import { refs } from './sources'

export const tools: readonly ToolInfo[] = [
  {
    id: 'picker',
    title: 'Подбор динозавра',
    short: 'Подбор',
    description: 'Ответь на несколько вопросов — подберём виды по параметрам из базы. Это не рейтинг силы, а совпадение с твоими предпочтениями.',
  },
  {
    id: 'compare',
    title: 'Сравнение',
    short: 'Сравнение',
    description: 'До трёх динозавров рядом: параметры, стадии роста, матчапы между ними, плюсы и минусы.',
  },
  {
    id: 'calc',
    title: 'Калькулятор жизни',
    short: 'Калькулятор',
    description: 'Сколько реального времени до взрослой стадии и как часто придётся есть и пить за игровую сессию.',
  },
  {
    id: 'counter',
    title: 'Как играть против',
    short: 'Контр-гайд',
    description: 'Всё, что известно о сопернике: кто его прижимает, для кого он опасен, чем бьёт и где слаб.',
  },
]

/** Пороги подбора. Это настройка инструмента, а не игровые данные. */
export const pickerThresholds = {
  bigPack: 6,
  fastGrowthMinutes: 360,
  smallWeight: 500,
  largeWeight: 2000,
  fastSpeed: 42,
} as const

/** Теги, которыми помечены виды, рекомендованные новичкам официальным гайдом (30 мая 2026). */
export const newbieTag = 'новичкам'
export const newbieSource = refs.officialBeginner

export const pickerQuestions: readonly PickerQuestion[] = [
  {
    id: 'diet',
    title: 'Кем хочешь играть?',
    options: [
      { id: 'any', label: 'Без разницы' },
      { id: 'carnivore', label: 'Хищник' },
      { id: 'herbivore', label: 'Травоядный' },
      { id: 'omnivore', label: 'Всеядный' },
    ],
  },
  {
    id: 'group',
    title: 'Как играешь?',
    options: [
      { id: 'any', label: 'Неважно' },
      { id: 'pack', label: 'Большой группой', hint: `лимит стаи от ${pickerThresholds.bigPack}` },
      { id: 'small', label: 'Соло или вдвоём-втроём', hint: `лимит стаи до ${pickerThresholds.bigPack - 1}` },
    ],
  },
  {
    id: 'pace',
    title: 'Сколько готов расти?',
    options: [
      { id: 'any', label: 'Неважно' },
      { id: 'fast', label: 'Хочу вырасти быстро', hint: `полный рост до ${pickerThresholds.fastGrowthMinutes / 60} ч` },
      { id: 'long', label: 'Готов к долгой игре', hint: `больше ${pickerThresholds.fastGrowthMinutes / 60} ч` },
    ],
  },
  {
    id: 'size',
    title: 'Какой размер?',
    options: [
      { id: 'any', label: 'Неважно' },
      { id: 'small', label: 'Маленький', hint: `до ${pickerThresholds.smallWeight} кг` },
      { id: 'mid', label: 'Средний', hint: `${pickerThresholds.smallWeight}–${pickerThresholds.largeWeight} кг` },
      { id: 'large', label: 'Крупный', hint: `от ${pickerThresholds.largeWeight} кг` },
    ],
  },
  {
    id: 'speed',
    title: 'Важна скорость?',
    options: [
      { id: 'any', label: 'Неважно' },
      { id: 'fast', label: 'Да, хочу убегать и догонять', hint: `от ${pickerThresholds.fastSpeed} км/ч у взрослого` },
    ],
  },
  {
    id: 'newbie',
    title: 'Ты новичок?',
    options: [
      { id: 'any', label: 'Нет / неважно' },
      { id: 'yes', label: 'Да, первый раз', hint: 'виды из официального списка для новичков' },
    ],
  },
]

export const compareRows: readonly CompareRow[] = [
  { key: 'weight', label: 'Вес взрослого', unit: 'кг', leader: 'high', leaderHint: 'тяжелее' },
  { key: 'speed', label: 'Скорость взрослого', unit: 'км/ч', leader: 'high', leaderHint: 'быстрее' },
  { key: 'bite', label: 'Bite (не урон)', unit: '', leader: 'high', leaderHint: 'выше' },
  { key: 'growth', label: 'Полный рост', unit: 'мин', leader: 'low', leaderHint: 'быстрее растёт' },
  { key: 'hunger', label: 'Желудок 100→0%', unit: 'мин', leader: 'high', leaderHint: 'дольше сыт' },
  { key: 'thirst', label: 'Вода 100→0%', unit: 'мин', leader: 'high', leaderHint: 'дольше без воды' },
  { key: 'pack', label: 'Лимит стаи', unit: 'особей', leader: 'high', leaderHint: 'больше стая' },
  { key: 'eggs', label: 'Яиц в кладке', unit: 'шт.', leader: 'high', leaderHint: 'больше яиц' },
]

export const maxCompare = 3

export const calcNotes: readonly string[] = [
  'Внутри стадии рост считается равномерным — это допущение калькулятора, а не игровая механика.',
  'Диета: 1 нутриент — 100% скорости роста, 2 — 200%, 3 — 300% (EQG, theisle.info). Время в таблицах — для одного нутриента и x1.',
  'Множитель сервера: официальные серверы — x1; на community-серверах рост часто ускорен (x2 и выше).',
  'Вес, скорость и Bite между точками таблицы EQG (0, 25, 50, 75, 87,5, 100%) — линейная оценка сайта. Здоровье равно весу (EQG).',
  'Голод и жажда считаются по линейному убыванию от 100% до 0% (таймеры EQG); бег, бой и вынашивание яиц ускоряют расход.',
  'Игрок обычно появляется Juvenile на 25% роста, поэтому по умолчанию отсчёт идёт с 25%.',
]

export const counterNotes: readonly string[] = [
  'Собрано только из подтверждённых матчапов и описаний умений; пустой блок — данных нет.',
  'Скорость — значение взрослого из таблиц EQG. Стамину, рельеф и умения таблица не учитывает.',
]
