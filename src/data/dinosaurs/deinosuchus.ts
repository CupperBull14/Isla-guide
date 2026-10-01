import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const deinosuchus: Dinosaur = {
  id: "deinosuchus",
  name: "Deinosuchus",
  nameRu: "Деинозух",
  diet: "carnivore",
  category: "aquatic",
  tags: [
    "вода",
    "засада",
    "рост 23 ч"
  ],
  overview: [
    "Deinosuchus — полуводный апекс весом 8 т (Prime Elder — до 13,5 т) с Bite 500. В воде он быстрее: 30 км/ч под водой и 27 на поверхности, на суше — самый медленный динозавр ростера (18 км/ч), с большим штрафом к поворотам и водой, которая уходит быстрее.",
    "Рост — 23 ч 3 мин. Оценка XGamingServer (12 июн 2026): «доминирует в воде, но на суше медлителен и уязвим». Для вида жажда критична: вода пустеет всего за 10 минут."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 8000, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 18, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 500, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 1383, max: statScales.growth, unit: "мин", note: "23 ч 3 мин", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 90, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 10, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 2, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 5, max: 8, unit: "шт.", note: "Тип гнезда: Debris.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 33,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 0,6 кг · скорость 5,5 км/ч · Bite 0,55"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 200,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 678 кг · скорость 13,3 км/ч · Bite 76"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 500,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 2200–8000 кг · скорость 15,4–18 км/ч · Bite 212–500"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 650,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 8000–10700–13500 кг · скорость 18–19,7–21,4 км/ч · Bite 500–575–550\nFrail Elder: Вес 8700–9500 кг · скорость 18,4–18,9 км/ч · Bite 500–450"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 678 кг, скорость 13,3 км/ч, Bite 76 (EQG).",
      "За первые 10 минут уйдёт около 11% сытости и 100% воды (расчёт по линейному убыванию: желудок пустеет за 90 мин, вода — за 10 мин, EQG).",
      "Особое для вида: вода пустеет за 10 минут — держись у воды (EQG)."
  ],
  feeding: "α (углеводы): Stegosaurus, Tenontosaurus, Pachycephalosaurus, Ceratosaurus, Kentrosaurus\nβ (белки): Carnotaurus, Omniraptor, Diabloceratops, Deinosuchus, Troodon, Bullfrog\nγ (липиды): Elite Fish, Gallimimus, Beipiaosaurus, Maiasaura, Sea Turtle\nЖелудок пустеет за 90 мин, вода — за 10 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nНельзя спринтовать с добычей на суше; не чувствует существ под водой; вид иммунен к перееданию (EQG).",
  matchups: [],
  combat: [
    "ПКМ — бросок из воды и укус при захвате; захват требует веса, вдвое большего веса цели (порог растёт, если цель плывёт) (EQG).",
    "Alt + ЛКМ — укус на 360° по направлению взгляда; ЛКМ — обычный укус (EQG).",
    "Под водой 30 км/ч и 500 м запаса, на поверхности 27 км/ч и 450 м (EQG).",
    "На суше: самый медленный динозавр, хуже поворот, выше риск падения, быстрее тратится вода (EQG)."
  ],
  pros: [
    "Bite 500 и огромный вес (EQG).",
    "Скорость в воде 27–30 км/ч (EQG).",
    "Иммунитет к перееданию (EQG)."
  ],
  cons: [
    "На суше самый медленный: 18 км/ч (EQG).",
    "Вода пустеет за 10 минут (EQG).",
    "Рост 23 ч 3 мин; не слышит и не чувствует существ под водой (EQG)."
  ],
  tips: [
    "Охоться из воды и ждай добычу на берегу (XGamingServer, 12 июн 2026).",
    "Следи за жаждой: вода кончается за 10 минут — не уходи далеко от воды (EQG).",
    "Помни, что захват требует двукратного веса цели; на плавающей цели порог выше (EQG).",
    "На суше не спринтуй с добычей — вид этого не умеет (EQG).",
    "Игра за Deinosuchus засчитывается как одно из 10 условий Prime Elder (EQG, Elder-система)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Deinosuchus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/deinosuchus",
      "date": "не указана",
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
      "id": "patch-0-21-321",
      "title": "The Isle — Patch 0.21.321 (официальный пост)",
      "url": "https://www.theisle-game.com/en/news/merry-x-mas-and-a-happy-new-patch-0-21-321",
      "date": "2025-12-28",
      "accessed": "2026-10-01"
    },
    {
      "id": "eqg-elder",
      "title": "Evrima Quick Guide — Elder System",
      "url": "https://www.evrimaquickguide.com/gameplay/elder-system",
      "date": "не указана (страница WIP)",
      "accessed": "2026-10-01"
    }
  ],
}
