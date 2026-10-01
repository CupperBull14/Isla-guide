import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const pteranodon: Dinosaur = {
  id: "pteranodon",
  name: "Pteranodon",
  nameRu: "Птеранодон",
  diet: "carnivore",
  category: "flyer",
  tags: [
    "полёт",
    "зацеп",
    "стая 6"
  ],
  overview: [
    "Pteranodon — летающий хищник: взрослый весит 90 кг (Prime — до 120 кг), наземная скорость 37,8 км/ч, Bite 20. Главное — полёт, который по описанию EQG работает при любых переломах, кроме переломов ног.",
    "Рост занимает 4 ч 30 мин. Вид скользит над водой, делает бочки и цепляется за поверхности; зацепившись при выносливости от 20%, восстанавливает её. Взрослый способен нести краба, лягушку, кролика и курицу (EQG)."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 90, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 37.8, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 20, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 270, max: statScales.growth, unit: "мин", note: "4 ч 30 мин при 1 нутриенте; с тремя нутриентами ≈ 1 ч 30 мин (рост ×3).", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 50, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 45, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 6, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 4, max: 8, unit: "шт.", note: "Тип гнезда: Debris.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 20,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 0,095 кг · скорость 3,6 км/ч · Bite 0,02"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 40,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 1,22 кг · скорость 8,8 км/ч · Bite 0,6"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 90,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 35–90 кг · скорость 22,4–37,8 км/ч · Bite 9,46–20"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 120,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 90–120 кг · скорость 37,8–39,4–35,1 км/ч · Bite 20–23–16\nFrail Elder: Вес 90 кг · скорость 37,5–28,5 км/ч · Bite 20–12"
    }
  ],
  curve: {
    "normal": [
      {
        "pct": 0,
        "weight": 0.095,
        "speed": 3.6,
        "bite": 0.02
      },
      {
        "pct": 25,
        "weight": 1.22,
        "speed": 8.8,
        "bite": 0.6
      },
      {
        "pct": 50,
        "weight": 35,
        "speed": 22.4,
        "bite": 9.46
      },
      {
        "pct": 75,
        "weight": 90,
        "speed": 37.8,
        "bite": 20
      },
      {
        "pct": 87.5,
        "weight": 90,
        "speed": 37.5,
        "bite": 20
      },
      {
        "pct": 100,
        "weight": 90,
        "speed": 28.5,
        "bite": 12
      }
    ],
    "prime": [
      {
        "pct": 0,
        "weight": 0.095,
        "speed": 3.6,
        "bite": 0.02
      },
      {
        "pct": 25,
        "weight": 1.22,
        "speed": 8.8,
        "bite": 0.6
      },
      {
        "pct": 50,
        "weight": 35,
        "speed": 22.4,
        "bite": 9.46
      },
      {
        "pct": 75,
        "weight": 90,
        "speed": 37.8,
        "bite": 20
      },
      {
        "pct": 87.5,
        "weight": 120,
        "speed": 39.4,
        "bite": 23
      },
      {
        "pct": 100,
        "weight": 120,
        "speed": 35.1,
        "bite": 16
      }
    ],
    "notes": [
      "Точки 0, 25, 50, 75, 87,5 и 100% — из таблицы EQG; между точками значения рассчитаны линейно (оценка сайта).",
      "⚠️ Для Prime источник даёт 2 значения на 3 точки (вес): значение на 100% принято равным 87,5%."
    ],
    "source": "eqg"
  },
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 1,22 кг, скорость 8,8 км/ч, Bite 0,6 (EQG).",
      "За первые 10 минут уйдёт около 20% сытости и 22% воды (расчёт по линейному убыванию: желудок пустеет за 50 мин, вода — за 45 мин, EQG).",
      "Особое для вида: желудок пустеет за 50 минут, вода — за 45 (EQG)."
  ],
  feeding: "α (углеводы): Schooling Fish, Crab, Clam\nβ (белки): Chicken, Hypsilophodon, Bullfrog, Rabbit, Troodon\nγ (липиды): Sea Turtle, Psittacosaurus, Beipiaosaurus, Pterodactylus\nЖелудок пустеет за 50 мин, вода — за 45 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nДанных по костям в источнике нет.",
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
    "Полёт доступен при всех переломах, кроме переломов ног (EQG).",
    "Зацеп за поверхности восстанавливает выносливость при её уровне от 20% (EQG).",
    "Скольжение над водой и бочки используются для мобильности и ухода (EQG)."
  ],
  pros: [
    "Полёт при большинстве переломов (EQG).",
    "Скольжение, бочки и зацеп для ухода (EQG).",
    "Перенос мелкой добычи во взрослой стадии (EQG)."
  ],
  cons: [
    "Малый вес 90 кг (EQG).",
    "Вода пустеет за 45 минут (EQG).",
    "Стая лишь 6 особей (EQG)."
  ],
  tips: [
    "Зацепляйся за поверхности для восстановления выносливости — работает от 20% (EQG).",
    "Береги ноги: перелом ног отключает полёт (EQG).",
    "Используй скольжение над водой для охоты на рыбу и черепах (EQG).",
    "Взрослый может нести мелкую добычу — пользуйся этим (EQG).",
    "Вода пустеет за 45 минут — держи озеро рядом (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Pteranodon",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/pteranodon",
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
      "id": "eqg-tyrannosaurus",
      "title": "Evrima Quick Guide — Tyrannosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/tyrannosaurus",
      "date": "не указана",
      "accessed": "2026-10-01"
    }
  ],
}
