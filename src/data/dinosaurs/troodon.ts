import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const troodon: Dinosaur = {
  id: "troodon",
  name: "Troodon",
  nameRu: "Троодон",
  diet: "carnivore",
  category: "small-carnivore",
  tags: [
    "яд",
    "прыжок 360°",
    "стая 10"
  ],
  overview: [
    "Troodon — лёгкий хищник: взрослый весит 60 кг (Prime — до 79,8 кг), бегает около 45 км/ч, Bite 15. Главная особенность — ядовитый прыжок с круговой (360°) направленностью по ПКМ.",
    "Рост занимает 3 ч 10 мин. Для полноценного яда нужны три стадии отравления (Envenomed), и лишь после этого групповой урон раскрывается максимально (EQG). Стая — до 10 особей, гнездо Mound до 5 яиц."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 60, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 45, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 15, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 190, max: statScales.growth, unit: "мин", note: "3 ч 10 мин при 1 нутриенте; с тремя нутриентами ≈ 1 ч 3 мин (рост ×3).", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 60, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 50, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 10, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 5, max: 8, unit: "шт.", note: "Тип гнезда: Mound.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 20,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 0,07 кг · скорость 6,3 км/ч · Bite 0,02"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 40,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 11,1 кг · скорость 39,8 км/ч · Bite 2,24"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 60,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 31,2–60 кг · скорость 41,5–44 км/ч · Bite 4,9–15"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 70,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 60–79,8 кг · скорость 45–52,2–41,4 км/ч · Bite 15–17,25–13,5\nFrail Elder: Вес 60 кг · скорость 44,1–33,3 км/ч · Bite 15–10,5"
    }
  ],
  curve: {
    "normal": [
      {
        "pct": 0,
        "weight": 0.07,
        "speed": 6.3,
        "bite": 0.02
      },
      {
        "pct": 25,
        "weight": 11.1,
        "speed": 39.8,
        "bite": 2.24
      },
      {
        "pct": 50,
        "weight": 31.2,
        "speed": 41.5,
        "bite": 4.9
      },
      {
        "pct": 75,
        "weight": 60,
        "speed": 44,
        "bite": 15
      },
      {
        "pct": 87.5,
        "weight": 60,
        "speed": 44.1,
        "bite": 15
      },
      {
        "pct": 100,
        "weight": 60,
        "speed": 33.3,
        "bite": 10.5
      }
    ],
    "prime": [
      {
        "pct": 0,
        "weight": 0.07,
        "speed": 6.3,
        "bite": 0.02
      },
      {
        "pct": 25,
        "weight": 11.1,
        "speed": 39.8,
        "bite": 2.24
      },
      {
        "pct": 50,
        "weight": 31.2,
        "speed": 41.5,
        "bite": 4.9
      },
      {
        "pct": 75,
        "weight": 60,
        "speed": 45,
        "bite": 15
      },
      {
        "pct": 87.5,
        "weight": 79.8,
        "speed": 52.2,
        "bite": 17.25
      },
      {
        "pct": 100,
        "weight": 79.8,
        "speed": 41.4,
        "bite": 13.5
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
    "Стартовая стадия — Juvenile (25% роста): вес 11,1 кг, скорость 39,8 км/ч, Bite 2,24 (EQG).",
      "За первые 10 минут уйдёт около 17% сытости и 20% воды (расчёт по линейному убыванию: желудок пустеет за 60 мин, вода — за 50 мин, EQG).",
      "Особое для вида: желудок пустеет за 60 минут, вода — за 50 (EQG)."
  ],
  feeding: "α (углеводы): Stegosaurus, Crab, Pachycephalosaurus, Tenontosaurus, Kentrosaurus\nβ (белки): Bullfrog, Chicken, Deer, Rabbit, Compsognathus, Hypsilophodon\nγ (липиды): Goat, Psittacosaurus, Dryosaurus, Pteranodon, Maiasaura\nЖелудок пустеет за 60 мин, вода — за 50 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nДанных по костям в источнике нет.",
  matchups: [
    {
      "opponent": "tyrannosaurus",
      "verdict": "flee",
      "note": "Взрослый Rex может прижать и добить цель легче ~4650 кг; не принимай бой (EQG).",
      "basis": "derived",
      "source": "eqg-tyrannosaurus"
    },
    {
      "opponent": "triceratops",
      "verdict": "risk",
      "note": "Общее утверждение для хищников (вид не указан): заход в группу Triceratops/Stegosaurus грозит переломами ног (XGamingServer, 12 июн 2026).",
      "basis": "derived",
      "source": "hunt"
    },
    {
      "opponent": "stegosaurus",
      "verdict": "risk",
      "note": "Общее утверждение для хищников (вид не указан): заход в группу Triceratops/Stegosaurus грозит переломами ног (XGamingServer, 12 июн 2026).",
      "basis": "derived",
      "source": "hunt"
    }
  ],
  combat: [
    "ПКМ — ядовитый прыжок с направленной атакой на 360° (EQG).",
    "Для статуса Envenomed нужны три стадии яда; затем групповой урон максимален (EQG)."
  ],
  pros: [
    "Скорость до 52 км/ч у Prime Elder (EQG).",
    "Стая до 10 особей (EQG).",
    "Быстрый рост — 3 ч 10 мин (EQG)."
  ],
  cons: [
    "Малый вес 60 кг (EQG).",
    "Эффективность яда зависит от трёх стадий (EQG).",
    "Данных нет: числа урона яда (EQG)."
  ],
  tips: [
    "Охотись стаей — яд раскрывается лучше при групповой атаке (EQG).",
    "Не начинай бой с крупными целями в одиночку: вес 60 кг (EQG).",
    "Используй ПКМ-прыжок для атаки по направлению 360° (EQG).",
    "Желудок пустеет за 60 минут, вода — за 50 (EQG).",
    "Планируй рост: полный цикл занимает 3 ч 10 мин (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Troodon",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/troodon",
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
    },
    {
      "id": "hunt",
      "title": "XGamingServer — Evrima Carnivore Hunting & Ambush Guide",
      "url": "https://xgamingserver.com/blog/the-isle-evrima-hunting-ambush-guide/",
      "date": "2026-06-12",
      "accessed": "2026-10-01"
    }
  ],
}
