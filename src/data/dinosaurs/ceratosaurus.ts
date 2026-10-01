import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const ceratosaurus: Dinosaur = {
  id: "ceratosaurus",
  name: "Ceratosaurus",
  nameRu: "Цератозавр",
  diet: "carnivore",
  category: "apex-carnivore",
  tags: [
    "бактерии",
    "падаль",
    "агрессор"
  ],
  overview: [
    "Ceratosaurus — хищник на 1,45 т, 40,3 км/ч, рост 6 часов. Его особенность — «бактериальный» укус: цель может вырвать, а за каждый укус тратится около 10% желчи. Стая — 5 особей (патч 0.21.321 довёл лимит до 5).",
    "Вид может есть гнилые туши и кости, сильнее чует запах, а рядом с трупами получает защиту: на 25–50% меньше урона в радиусе 30 метров. Сводные рейтинги ставят его в середину ростера."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 1450, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 40.3, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 150, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 360, max: statScales.growth, unit: "мин", note: "6 ч ", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 60, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 45, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 5, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 3, max: 8, unit: "шт.", note: "Тип гнезда: Debris. ⚠️ EQG: 3 на странице вида, 4 в сводной таблице; жажда: 45 против 60 в таблице", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 30,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 2,2 кг · скорость 8,8 км/ч · Bite 0,18"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 60,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 442 кг · скорость 34,3 км/ч · Bite 53,3"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 120,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 812–1450 кг · скорость 38,7–40,3 км/ч · Bite 93,7–150"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 150,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 1450–1950–1950 кг · скорость 40,3–39,7–36 км/ч · Bite 150–172,5–127,5\nFrail Elder: Вес 1450 кг · скорость 39,4–33,1 км/ч · Bite 150–97,5"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 442 кг, скорость 34,3 км/ч, Bite 53,3 (EQG).",
      "За первые 10 минут уйдёт около 17% сытости и 22% воды (расчёт по линейному убыванию: желудок пустеет за 60 мин, вода — за 45 мин, EQG).",
      "Особое для вида: падаль и кости — доступная еда; используй обострённый запах (EQG)."
  ],
  feeding: "α (углеводы): Stegosaurus, Tenontosaurus, Pachycephalosaurus, Ceratosaurus, Kentrosaurus\nβ (белки): Carnotaurus, Deinosuchus, Omniraptor, Diabloceratops, Deer\nγ (липиды): Dilophosaurus, Beipiaosaurus, Goat\nЖелудок пустеет за 60 мин, вода — за 45 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nМожет есть гнилые туши и кости (EQG).",
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
    "Bacteria Bite: укус может вызвать рвоту у цели; стоит около 10% желчи за укус (EQG).",
    "Рядом с трупами (30 м) защита: на 25–50% меньше урона (EQG).",
    "Питание: может есть гнилые туши и кости, усиленный запах (EQG)."
  ],
  pros: [
    "Бактериальный укус и защита рядом с падалью (EQG).",
    "Падаль и кости как еда (EQG).",
    "Стая до 5 (EQG; патч 0.21.321 в сводке theisle-game.com)."
  ],
  cons: [
    "Укус расходует желчь — около 10% за раз (EQG).",
    "Данные по яйцам и жажде расходятся между страницей и таблицей ⚠️ (EQG).",
    "Не самый быстрый: 40,3 км/ч (EQG)."
  ],
  tips: [
    "Дерись рядом с телами: защита 25–50% в радиусе 30 метров (EQG).",
    "Следи за желчью — каждый бактериальный укус стоит около 10% (EQG).",
    "Ешь падаль и кости, когда хорошей добычи нет (EQG).",
    "Используй сильный нюх для поиска туш (EQG).",
    "Желудок пустеет за 60 минут, вода — за 45 по странице вида (в таблице 60) ⚠️ (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Ceratosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/ceratosaurus",
      "date": "не указана",
      "accessed": "2026-10-01"
    },
    {
      "id": "patch-0-21-321",
      "title": "The Isle — Patch 0.21.321 (официальный пост)",
      "url": "https://www.theisle-game.com/en/news/merry-x-mas-and-a-happy-new-patch-0-21-321",
      "date": "2025-12-28",
      "accessed": "2026-10-01"
    },
    {
      "id": "eqg-table-carnivores",
      "title": "Evrima Quick Guide — Quick facts (carnivores)",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores",
      "date": "2026-09-04",
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
