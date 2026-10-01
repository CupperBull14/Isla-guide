import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const gallimimus: Dinosaur = {
  id: "gallimimus",
  name: "Gallimimus",
  nameRu: "Галлимим",
  diet: "omnivore",
  category: "omnivore",
  tags: [
    "скорость",
    "стая",
    "мобилизация"
  ],
  overview: [
    "Gallimimus — самый быстрый вид среди травоядных и всеядных: 45,6 км/ч у взрослого, а при наборе всех трёх нутриентов спринт достигает 55,4 км/ч (EQG; официальный гайд, 30 мая 2026). Рост — 5 ч 25 мин.",
    "Вид построен вокруг скорости и стаи: пассивный бафф ускоряет медленных членов группы, а «Mobilize Call» временно разгоняет соседей. Атаки не вызывают кровотечения, защита — бегство."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 535, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 45.6, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 25, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 325, max: statScales.growth, unit: "мин", note: "5 ч 25 мин", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 45, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 45, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 8, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 6, max: 8, unit: "шт.", note: "Тип гнезда: Mound.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 15,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 0,504 кг · скорость 21,3 км/ч · Bite 0,03"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 80,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 12,74 кг · скорость 46,8 км/ч · Bite 0,82"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 110,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 213,9–535 кг · скорость 46,8–45,6 км/ч · Bite 11,9–25"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 120,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 535–560 кг · скорость 46,8–54–41,4 км/ч · Bite 25–28,75–20\nFrail Elder: Вес 535 кг · скорость 45,6–34,2 км/ч · Bite 25–15"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 12,74 кг, скорость 46,8 км/ч, Bite 0,82 (EQG).",
      "За первые 10 минут уйдёт около 22% сытости и 22% воды (расчёт по линейному убыванию: желудок пустеет за 45 мин, вода — за 45 мин, EQG).",
      "Особое для вида: держись стаи — бафф скорости работает только в группе, соло «Mobilize Call» недоступен (EQG)."
  ],
  feeding: "α (углеводы): Variegated Orange, Crab, Marigold, Mountain Ash, Banana, Jackfruit\nβ (белки): Agave, bullfrog, Sunchoke Flowers, Radish Flower, Fireweed, Fiddlehead, Trillium, Crimson Apollan K-Trifolium\nγ (липиды): Pumpkin, Radish Root, Violet Apollan K-Trifolium, Papaya, Brazil nuts\nЖелудок пустеет за 45 мин, вода — за 45 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nКопать лягушек, крабов и компи: удерживай Q для поиска нор, E — чтобы копать (EQG).",
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
    "Mobilize Call — групповой бафф скорости для соседних членов стаи, соло недоступен (EQG).",
    "Пассивный бафф стаи: быстрые члены ускоряют медленных (EQG).",
    "Скавенджинг: Q — найти норы, E — копать лягушек, крабов, компи (EQG).",
    "Бой — только бегство: атаки не вызывают кровотечения (официальный гайд, 30 мая 2026)."
  ],
  pros: [
    "Самая высокая скорость среди травоядных/всеядных: 45,6 км/ч, до 55,4 с полной диетой (EQG).",
    "Групповой бафф скорости (EQG).",
    "Лёгкое питание падалью и подкопом (официальный гайд, 30 мая 2026)."
  ],
  cons: [
    "Нет кровотечения от атак, играть только на уклонении (официальный гайд, 30 мая 2026).",
    "Производит шум (официальный гайд, 30 мая 2026).",
    "Урон Bite 25 у взрослого (EQG)."
  ],
  tips: [
    "Играй в стае: бафф скорости и «Mobilize Call» работают только в группе (EQG).",
    "Собери все три нутриента — спринт вырастет до 55,4 км/ч (EQG).",
    "Используй скавенджинг (Q, затем E) для лёгкой еды (EQG).",
    "Не надейся на бой — выбирай маршрут бегства заранее (официальный гайд, 30 мая 2026).",
    "Голод и вода — по 45 минут по странице вида; в сводной таблице голод указан 40 ⚠️ (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Gallimimus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-omnivores/gallimimus",
      "date": "не указана",
      "accessed": "2026-10-01"
    },
    {
      "id": "official-beginner",
      "title": "The Isle: Best Beginner Dinosaurs (Evrima) — официальный гайд",
      "url": "https://www.theisle-game.com/en/guides/best-beginner-dinosaurs-evrima",
      "date": "2026-05-30",
      "accessed": "2026-10-01"
    },
    {
      "id": "eqg-table-omnivores",
      "title": "Evrima Quick Guide — Quick facts (omnivores)",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-omnivores",
      "date": "2026-09-04",
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
