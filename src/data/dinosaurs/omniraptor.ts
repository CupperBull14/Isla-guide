import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const omniraptor: Dinosaur = {
  id: "omniraptor",
  name: "Omniraptor",
  nameRu: "Омнираптор",
  diet: "carnivore",
  category: "mid-carnivore",
  tags: [
    "pounce",
    "стая 8",
    "групповой захват"
  ],
  overview: [
    "Omniraptor — быстрый хищник среднего размера: взрослый весит 395 кг (Prime — до 660 кг), бегает 46,8 км/ч, Bite 65. Построен вокруг pounce: на крупных целях вызывает кровотечение, мелких — прижимает.",
    "Рост занимает 5 ч 55 мин. Пара и более Omniraptor, нацелившихся на одну жертву, запускают координированный захват (EQG). Стая — до 8 особей, гнездо Mound до 6 яиц."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 395, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 46.8, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 65, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 355, max: statScales.growth, unit: "мин", note: "5 ч 55 мин при 1 нутриенте; с тремя нутриентами ≈ 1 ч 58 мин (рост ×3).", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 50, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 60, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 8, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 6, max: 8, unit: "шт.", note: "Тип гнезда: Mound.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 25,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 0,607 кг · скорость 8,8 км/ч · Bite 0,08"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 60,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 129,5 кг · скорость 46,9 км/ч · Bite 14,3"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 120,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 274,5–395 кг · скорость 50,2–46,8 км/ч · Bite 28,5–65"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 150,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 394,9–660 кг · скорость 46,8–52,3–43,2 км/ч · Bite 65–75,75–58,5\nFrail Elder: Вес 395 кг · скорость 46,1–35,1 км/ч · Bite 65–45,5"
    }
  ],
  curve: {
    "normal": [
      {
        "pct": 0,
        "weight": 0.607,
        "speed": 8.8,
        "bite": 0.08
      },
      {
        "pct": 25,
        "weight": 129.5,
        "speed": 46.9,
        "bite": 14.3
      },
      {
        "pct": 50,
        "weight": 274.5,
        "speed": 50.2,
        "bite": 28.5
      },
      {
        "pct": 75,
        "weight": 395,
        "speed": 46.8,
        "bite": 65
      },
      {
        "pct": 87.5,
        "weight": 395,
        "speed": 46.1,
        "bite": 65
      },
      {
        "pct": 100,
        "weight": 395,
        "speed": 35.1,
        "bite": 45.5
      }
    ],
    "prime": [
      {
        "pct": 0,
        "weight": 0.607,
        "speed": 8.8,
        "bite": 0.08
      },
      {
        "pct": 25,
        "weight": 129.5,
        "speed": 46.9,
        "bite": 14.3
      },
      {
        "pct": 50,
        "weight": 274.5,
        "speed": 50.2,
        "bite": 28.5
      },
      {
        "pct": 75,
        "weight": 394.9,
        "speed": 46.8,
        "bite": 65
      },
      {
        "pct": 87.5,
        "weight": 660,
        "speed": 52.3,
        "bite": 75.75
      },
      {
        "pct": 100,
        "weight": 660,
        "speed": 43.2,
        "bite": 58.5
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
    "Стартовая стадия — Juvenile (25% роста): вес 129,5 кг, скорость 46,9 км/ч, Bite 14,3 (EQG).",
      "За первые 10 минут уйдёт около 20% сытости и 17% воды (расчёт по линейному убыванию: желудок пустеет за 50 мин, вода — за 60 мин, EQG).",
      "Особое для вида: желудок пустеет за 50 минут, вода — за 60 (EQG)."
  ],
  feeding: "α (углеводы): Boar, Herrerasaurus, Pachycephalosaurus, Ceratosaurus, Stegosaurus, Kentrosaurus\nβ (белки): Carnotaurus, Diabloceratops, Troodon, Deer, Rabbit\nγ (липиды): Dryosaurus, Psittacosaurus, Gallimimus, Maiasaura\nЖелудок пустеет за 50 мин, вода — за 60 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\n⚠️ Страница EQG перечисляет в рационе животных (Boar, Herrerasaurus и др.); точность списка не перепроверена.",
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
    },
    {
      "opponent": "kentrosaurus",
      "verdict": "risk",
      "note": "Защитная стойка Kentrosaurus отражает урон и блокирует часть умений (EQG); какие именно — не указано, поэтому оценка слабая.",
      "basis": "weak",
      "source": "eqg-kentrosaurus"
    }
  ],
  combat: [
    "Pounce: кровотечение на крупных целях, прижим мелких (EQG).",
    "Позиции pounce переключаются клавишами A/D (EQG).",
    "Координированный захват при 2+ Omniraptor на одной жертве (EQG).",
    "Доступны удар в прыжке и прыжок с ударом ногой (EQG)."
  ],
  pros: [
    "Скорость до 52,3 км/ч у Prime Elder (EQG).",
    "Групповой захват (EQG).",
    "Bite 65 у взрослого (EQG)."
  ],
  cons: [
    "Рост 5 ч 55 мин (EQG).",
    "Желудок пустеет за 50 минут (EQG).",
    "Данных нет: числа урона pounce (EQG)."
  ],
  tips: [
    "Охотьтесь вдвоём и более: координированный захват (EQG).",
    "Меняй позицию pounce клавишами A/D (EQG).",
    "Помни про 50-минутный желудок — планируй охоту заранее (EQG).",
    "Используй прыжок с ударом для сближения (EQG).",
    "Крупных целей лучше кровоточить pounce, а не добивать в лоб (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Omniraptor",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/omniraptor",
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
    },
    {
      "id": "hunt",
      "title": "XGamingServer — Evrima Carnivore Hunting & Ambush Guide",
      "url": "https://xgamingserver.com/blog/the-isle-evrima-hunting-ambush-guide/",
      "date": "2026-06-12",
      "accessed": "2026-10-01"
    },
    {
      "id": "eqg-kentrosaurus",
      "title": "Evrima Quick Guide — Kentrosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-herbivores/kentrosaurus",
      "date": "не указана",
      "accessed": "2026-10-01"
    }
  ],
}
