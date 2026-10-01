import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const beipiaosaurus: Dinosaur = {
  id: "beipiaosaurus",
  name: "Beipiaosaurus",
  nameRu: "Бейпяозавр",
  diet: "omnivore",
  category: "omnivore",
  tags: [
    "полуводный",
    "стая 12",
    "всеядный"
  ],
  overview: [
    "Beipiaosaurus — маленький всеядный динозавр: взрослый весит 90 кг, бегает около 32 км/ч, Bite 20. Полуводный: очень плавучий и сам всплывает, запас воздуха под водой — 1 мин 45 с, в воде двигается ловко (EQG).",
    "Рост занимает 3 ч 40 мин. Вид не умеет пастись, зато стая достигает 12 особей, а гнездо Debris — до 8 яиц. Желудок пустеет всего за 30 минут, вода — за 20."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 90, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 32, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 20, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 220, max: statScales.growth, unit: "мин", note: "3 ч 40 мин при 1 нутриенте; с тремя нутриентами ≈ 1 ч 13 мин (рост ×3).", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 30, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 20, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 12, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 8, max: 8, unit: "шт.", note: "Тип гнезда: Debris.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 20,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 0,106 кг · скорость 3,6 км/ч · Bite 0,02"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 40,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 2,7 кг · скорость 10,7 км/ч · Bite 0,66"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 70,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 45,3–90 кг · скорость 32,4–32 км/ч · Bite 9,52–20"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 90,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 90 кг · скорость 32–32,9–29,5 км/ч · Bite 20–23–16\nFrail Elder: Вес 90 кг · скорость 31,6–26,8 км/ч · Bite 20–12"
    }
  ],
  curve: {
    "normal": [
      {
        "pct": 0,
        "weight": 0.106,
        "speed": 3.6,
        "bite": 0.02
      },
      {
        "pct": 25,
        "weight": 2.7,
        "speed": 10.7,
        "bite": 0.66
      },
      {
        "pct": 50,
        "weight": 45.3,
        "speed": 32.4,
        "bite": 9.52
      },
      {
        "pct": 75,
        "weight": 90,
        "speed": 32,
        "bite": 20
      },
      {
        "pct": 87.5,
        "weight": 90,
        "speed": 31.6,
        "bite": 20
      },
      {
        "pct": 100,
        "weight": 90,
        "speed": 26.8,
        "bite": 12
      }
    ],
    "prime": [
      {
        "pct": 0,
        "weight": 0.106,
        "speed": 3.6,
        "bite": 0.02
      },
      {
        "pct": 25,
        "weight": 2.7,
        "speed": 10.7,
        "bite": 0.66
      },
      {
        "pct": 50,
        "weight": 45.3,
        "speed": 32.4,
        "bite": 9.52
      },
      {
        "pct": 75,
        "weight": 90,
        "speed": 32,
        "bite": 20
      },
      {
        "pct": 87.5,
        "weight": 90,
        "speed": 32.9,
        "bite": 23
      },
      {
        "pct": 100,
        "weight": 90,
        "speed": 29.5,
        "bite": 16
      }
    ],
    "notes": [
      "Точки 0, 25, 50, 75, 87,5 и 100% — из таблицы EQG; между точками значения рассчитаны линейно (оценка сайта)."
    ],
    "source": "eqg"
  },
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 2,7 кг, скорость 10,7 км/ч, Bite 0,66 (EQG).",
      "За первые 10 минут уйдёт около 33% сытости и 50% воды (расчёт по линейному убыванию: желудок пустеет за 30 мин, вода — за 20 мин, EQG).",
      "Особое для вида: желудок пустеет за 30 минут, вода — за 20 — ищи еду и воду немедленно (EQG)."
  ],
  feeding: "α (углеводы): Horned Melon, Crab, Schooling Fish, Mountain Ash, Marigold, Banana, Jackfruit, Red Currant, Azure Apollan K-Trifolium\nβ (белки): Sumac, Bullfrog, Chanterelle Mushroom, Crimson Apollan K-Trifolium, Radish Flower, Fireweed, Fiddlehead, Trillium, Wild Potato Root\nγ (липиды): Russula, Radish Root, Violet Apollan K-Trifolium, Papaya, Brazilnuts, Wild Potato Vine\nЖелудок пустеет за 30 мин, вода — за 20 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nПастись не умеет (EQG).",
  matchups: [
    {
      "opponent": "tyrannosaurus",
      "verdict": "flee",
      "note": "Взрослый Rex может прижать и добить цель легче ~4650 кг; не принимай бой (EQG).",
      "basis": "derived",
      "source": "eqg-tyrannosaurus"
    }
  ],
  combat: [
    "Данных нет: подтверждённых боевых умений в источнике не указано."
  ],
  pros: [
    "Стая до 12 особей (EQG).",
    "Ловкость в воде и запас воздуха 1 мин 45 с (EQG).",
    "Быстрый рост — 3 ч 40 мин (EQG)."
  ],
  cons: [
    "Желудок пустеет за 30 минут, вода — за 20 (EQG).",
    "Малый вес 90 кг (EQG).",
    "Не умеет пастись (EQG)."
  ],
  tips: [
    "Держи воду и еду рядом: запасы кончаются быстро (EQG).",
    "Используй воду для ухода от погони — вид ловок в воде (EQG).",
    "Помни про плавучесть: вид всплывает сам, под водой надолго не остаться (EQG).",
    "Собирай группу до 12 особей (EQG).",
    "Не рассчитывай на пастьбу — ищи плоды и добычу (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Beipiaosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-omnivores/beipiaosaurus",
      "date": "не указана",
      "accessed": "2026-10-01"
    },
    {
      "id": "tig-growth",
      "title": "theisle.info — Growth guide (базовое время = 1 нутриент, ×2/×3 от диеты)",
      "url": "https://www.theisle.info/guide/growth",
      "date": "2026-05-28",
      "accessed": "2026-10-01"
    },
    {
      "id": "eqg-elder",
      "title": "Evrima Quick Guide — Elder System",
      "url": "https://www.evrimaquickguide.com/gameplay/elder-system",
      "date": "не указана (страница WIP)",
      "accessed": "2026-10-01"
    },
    {
      "id": "eqg-tyrannosaurus",
      "title": "Evrima Quick Guide — Tyrannosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/tyrannosaurus",
      "date": "не указана",
      "accessed": "2026-10-01"
    }
  ],
}
