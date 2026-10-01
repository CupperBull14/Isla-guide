import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const tyrannosaurus: Dinosaur = {
  id: "tyrannosaurus",
  name: "Tyrannosaurus",
  nameRu: "Тираннозавр",
  diet: "carnivore",
  category: "apex-carnivore",
  tags: [
    "апекс",
    "переломы",
    "рост 35 ч"
  ],
  overview: [
    "Tyrannosaurus — самый тяжёлый наземный хищник ростера: взрослый весит 9,3 т (Prime Elder — до 12,3 т), но бегает лишь 29 км/ч, а Bite 699 — максимум в таблице EQG. Вид добавлен в патче 0.21.321 (28 дек 2025) с ударом мордой, укусом «crush» и броском (официальный патчноут).",
    "Полный рост занимает 35 ч 33 мин — самый долгий в игре. Все виды укуса вызывают переломы, а crush позволяет прижать и добить цель легче половины веса Rex. С 50% роста открывается Ambush: ускорение на 15 секунд с перезарядкой в минуту. С 5 тонн веса шаги становятся слышны."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 9300, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 29, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 699, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 2133, max: statScales.growth, unit: "мин", note: "35 ч 33 мин", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 75, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 60, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 2, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 5, max: 8, unit: "шт.", note: "Тип гнезда: Debris.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": null,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 4,5 кг · скорость 11,2 км/ч · Bite 0,72"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": null,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 50 кг · скорость 25,4 км/ч · Bite 5,95"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": null,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 2800–9300 кг · скорость 35–29 км/ч · Bite 317–699"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": null,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 9300–12300 кг · скорость 29–33,7–29,9 км/ч · Bite 700–770–630\nFrail Elder: Вес 9300–9400 кг · скорость 28,4–25,2 км/ч · Bite 700–490"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 50 кг, скорость 25,4 км/ч, Bite 5,95 (EQG).",
      "За первые 10 минут уйдёт около 13% сытости и 17% воды (расчёт по линейному убыванию: желудок пустеет за 75 мин, вода — за 60 мин, EQG).",
      "Особое для вида: рост 35 ч 33 мин — самый долгий; время по стадиям в источнике не указано (EQG)."
  ],
  feeding: "α (углеводы): Stegosaurus, Tenontosaurus, Pachycephalosaurus и другие травоядные\nβ (белки): Diabloceratops, Triceratops и мелкие травоядные\nγ (липиды): Maiasaura, Gallimimus, Dryosaurus\nЖелудок пустеет за 75 мин, вода — за 60 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nКости не ест (EQG).",
  matchups: [
    {
      "opponent": "dryosaurus",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Dryosaurus весит 130 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "hypsilophodon",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Hypsilophodon весит 20 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "pachycephalosaurus",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Pachycephalosaurus весит 700 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "tenontosaurus",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Tenontosaurus весит 1600 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "gallimimus",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Gallimimus весит 535 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "herrerasaurus",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Herrerasaurus весит 175 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "maiasaura",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Maiasaura весит 3700 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "dilophosaurus",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Dilophosaurus весит 700 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "austroraptor",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Austroraptor весит 240 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "troodon",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Troodon весит 60 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "omniraptor",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Omniraptor весит 395 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "pteranodon",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Pteranodon весит 90 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "diabloceratops",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Diabloceratops весит 3000 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "kentrosaurus",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Kentrosaurus весит 1950 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "beipiaosaurus",
      "verdict": "win",
      "note": "Crush позволяет прижать и добить цель легче половины веса Rex (~4650 кг); Beipiaosaurus весит 90 кг (EQG).",
      "basis": "derived",
      "source": "eqg"
    }
  ],
  combat: [
    "Crush: мощный бросок-укус с переломом; может прижать и добить цель легче половины веса Rex (EQG).",
    "Ambush: открывается с 50% роста, ускорение на 15 с, перезарядка 1 мин (EQG).",
    "Спарринг включается автоматически против другого Tyrannosaurus или Triceratops (EQG).",
    "Палео-вокал: уникальные призывы, доступны со стадии Adult (EQG).",
    "Все виды укуса (основной, альтернативный, crush) вызывают переломы (EQG)."
  ],
  pros: [
    "Самый сильный Bite в таблице — 699 (EQG).",
    "Crush и прижим цели (EQG).",
    "Ambush с 50% роста (EQG)."
  ],
  cons: [
    "Самый медленный из крупных хищников — 29 км/ч (EQG; theisle.info, без даты).",
    "Самый долгий рост — 35 ч 33 мин (EQG).",
    "С 5 тонн шаги слышны (EQG); стая всего 2 особи (EQG)."
  ],
  tips: [
    "Используй Ambush с 50% роста, чтобы сократить дистанцию — ускорение 15 секунд, перезарядка минута (EQG).",
    "Бей crush по целям легче половины твоего веса: их можно прижать и добить (EQG).",
    "Не рассчитывай догнать быстрых — вид медленный; охоться из засады (EQG).",
    "Желудок пустеет за 75 минут, вода — за 60: при долгом росте планируй еду заранее (EQG).",
    "Кости не ешь — вид их не усваивает (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Tyrannosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/tyrannosaurus",
      "date": "не указана",
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
