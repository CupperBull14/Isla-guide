import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const allosaurus: Dinosaur = {
  id: "allosaurus",
  name: "Allosaurus",
  nameRu: "Аллозавр",
  diet: "carnivore",
  category: "apex-carnivore",
  tags: [
    "pounce",
    "кровотечение",
    "стая"
  ],
  overview: [
    "Allosaurus — быстрый и агрессивный апекс-хищник на 2,6 т: Bite 175, скорость 39,8 км/ч, рост 10 часов. Добавлен в патче 0.21.321. Главное оружие — pounce (ПКМ + пробел): бросок с кровотечением, который прижимает цель до 50% своего веса (до 75%, если у цели снижены стамина, здоровье или есть кровотечение); жертва может сбросить хищника удержанием E.",
    "Когти (бег + удержание ЛКМ) накладывают стакающееся кровотечение с независимыми таймерами. XGamingServer (12 июн 2026) называет его ближайшим к «королю горы» хищником Evrima. Стая — 3 особи."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 2600, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 39.8, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 175, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 600, max: statScales.growth, unit: "мин", note: "10 ч  при 1 нутриенте; с тремя нутриентами ≈ 3 ч 20 мин (рост ×3).", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 60, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 60, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 3, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 4, max: 8, unit: "шт.", note: "Тип гнезда: Debris.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 60,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 2,3 кг · скорость 13,8 км/ч · Bite 0,21"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 120,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 49,2 кг · скорость 25,4 км/ч · Bite 5,52"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 200,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 1058–2600 кг · скорость 41,4–39,8 км/ч · Bite 79,3–175"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 220,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 2600–3700 кг · скорость 39,8–35,6 км/ч · Bite 175–201–140\nFrail Elder: Вес 2600 кг · скорость 38,6–33,6 км/ч · Bite 175–105"
    }
  ],
  curve: {
    "normal": [
      {
        "pct": 0,
        "weight": 2.3,
        "speed": 13.8,
        "bite": 0.21
      },
      {
        "pct": 25,
        "weight": 49.2,
        "speed": 25.4,
        "bite": 5.52
      },
      {
        "pct": 50,
        "weight": 1058,
        "speed": 41.4,
        "bite": 79.3
      },
      {
        "pct": 75,
        "weight": 2600,
        "speed": 39.8,
        "bite": 175
      },
      {
        "pct": 87.5,
        "weight": 2600,
        "speed": 38.6,
        "bite": 175
      },
      {
        "pct": 100,
        "weight": 2600,
        "speed": 33.6,
        "bite": 105
      }
    ],
    "prime": [
      {
        "pct": 0,
        "weight": 2.3,
        "speed": 13.8,
        "bite": 0.21
      },
      {
        "pct": 25,
        "weight": 49.2,
        "speed": 25.4,
        "bite": 5.52
      },
      {
        "pct": 50,
        "weight": 1058,
        "speed": 41.4,
        "bite": 79.3
      },
      {
        "pct": 75,
        "weight": 2600,
        "speed": 39.8,
        "bite": 175
      },
      {
        "pct": 87.5,
        "weight": 3700,
        "speed": 35.6,
        "bite": 201
      },
      {
        "pct": 100,
        "weight": 3700,
        "speed": 35.6,
        "bite": 140
      }
    ],
    "notes": [
      "Точки 0, 25, 50, 75, 87,5 и 100% — из таблицы EQG; между точками значения рассчитаны линейно (оценка сайта).",
      "⚠️ Для Prime источник даёт 2 значения на 3 точки (вес, скорость): значение на 100% принято равным 87,5%."
    ],
    "source": "eqg"
  },
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 49,2 кг, скорость 25,4 км/ч, Bite 5,52 (EQG).",
      "За первые 10 минут уйдёт около 17% сытости и 17% воды (расчёт по линейному убыванию: желудок пустеет за 60 мин, вода — за 60 мин, EQG).",
      "Особое для вида: Allosaurus держится на давлении и позиции, а не на грубой силе — первые минуты лучше тратить на еду и воду (EQG)."
  ],
  feeding: "α (углеводы): Stegosaurus, Tenontosaurus, Boar, Kentrosaurus\nβ (белки): Diabloceratops, Triceratops, Deer\nγ (липиды): Maiasaura, Dryosaurus, Goat\nЖелудок пустеет за 60 мин, вода — за 60 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).",
  matchups: [
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
    "Pounce (удерживай ПКМ, отпусти пробелом): бросок с кровотечением, больший урон при прижиме; прижимает цели до 50% своего веса (до 75% при сниженных показателях цели) (EQG).",
    "Alt + ЛКМ — направленная атака в сторону камеры; ЛКМ — укус вниз с короткой перезарядкой (EQG).",
    "Бег + удержание ЛКМ — когти: стакающееся кровотечение с независимыми таймерами (EQG)."
  ],
  pros: [
    "Сильное стакающееся кровотечение и pounce (EQG).",
    "Скорость 39,8 км/ч (EQG).",
    "Ближайший к «королю горы» в ростере по оценке XGamingServer, 12 июн 2026."
  ],
  cons: [
    "Стая всего 3 особи (EQG).",
    "Жертва может сбросить прижим удержанием E (EQG).",
    "Рост 10 часов (EQG)."
  ],
  tips: [
    "Используй pounce на целях легче 50% твоего веса — их можно прижать (EQG).",
    "Бей по ослабленным целям: порог прижима растёт до 75% веса, если у цели мало стамины или есть кровотечение (EQG).",
    "Держись стаей, но помни о лимите в 3 особи (EQG).",
    "Не заходи в группы Triceratops и Stegosaurus (XGamingServer, 12 июн 2026).",
    "Желудок и вода — по 60 минут; оставшиеся проценты × 60 дают оценку минут (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Allosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/allosaurus",
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
      "id": "apex",
      "title": "XGamingServer — Evrima Best Apex Dinosaurs",
      "url": "https://xgamingserver.com/blog/the-isle-evrima-best-apex-dinosaurs/",
      "date": "2026-06-12 (обновлено 2026-06-15)",
      "accessed": "2026-10-01"
    },
    {
      "id": "hunt",
      "title": "XGamingServer — Evrima Carnivore Hunting & Ambush Guide",
      "url": "https://xgamingserver.com/blog/the-isle-evrima-hunting-ambush-guide/",
      "date": "2026-06-12",
      "accessed": "2026-10-01"
    },
    {
      "id": "patch-0-21-321",
      "title": "The Isle — Patch 0.21.321 (официальный пост)",
      "url": "https://www.theisle-game.com/en/news/merry-x-mas-and-a-happy-new-patch-0-21-321",
      "date": "2025-12-28",
      "accessed": "2026-10-01"
    }
  ],
}
