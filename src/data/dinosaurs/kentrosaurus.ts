import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const kentrosaurus: Dinosaur = {
  id: "kentrosaurus",
  name: "Kentrosaurus",
  nameRu: "Кентрозавр",
  diet: "herbivore",
  category: "large-herbivore",
  tags: [
    "защитная стойка",
    "отражение урона",
    "рост 11 ч"
  ],
  overview: [
    "Kentrosaurus — шипастый травоядный: взрослый весит 1,95 т (Prime — до 2,2 т), бегает около 39,6 км/ч, Bite 30. Ключевая механика — переключаемая защитная стойка: в ней растут отражённый урон и устойчивость, а часть способностей противника блокируется (EQG).",
    "Рост самый долгий в этой группе — 11 ч 5 мин. Желудок пустеет за 90 минут, вода — за 60. Стая — до 5 особей, гнездо Mound до 5 яиц."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 1950, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 39.6, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 30, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 665, max: statScales.growth, unit: "мин", note: "11 ч 5 мин", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 90, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 60, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 5, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 5, max: 8, unit: "шт.", note: "Тип гнезда: Mound.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 60,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 1,25 кг · скорость 4,3 км/ч · Bite 0,03"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 100,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 38 кг · скорость 17,9 км/ч · Bite 0,3"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 240,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 1000–1950 кг · скорость 43,9–39,6 км/ч · Bite 14,01–30"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 265,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 1950–2200 кг · скорость 39,6–37,8 км/ч · Bite 30–34,5–25,5\nFrail Elder: Вес 1950 кг · скорость 39,1–34,2 км/ч · Bite 30–19,5"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 38 кг, скорость 17,9 км/ч, Bite 0,3 (EQG).",
      "За первые 10 минут уйдёт около 11% сытости и 17% воды (расчёт по линейному убыванию: желудок пустеет за 90 мин, вода — за 60 мин, EQG).",
      "Особое для вида: первая стадия роста длится 60 минут — дольше, чем у большинства видов (EQG)."
  ],
  feeding: "α (углеводы): Azure Apollan K-Trifolium, Mango, Mountain Ash, Marigold, Variegated Orange\nβ (белки): Fireweed, Radish Flower, Sunchoke Flowers, Agave\nγ (липиды): Coconut, Russula, Radish Root, Violet Apollan K-Trifolium\nЖелудок пустеет за 90 мин, вода — за 60 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nДанных по спазмам от растений в источнике нет.",
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
    "Переключатель защитной стойки: больше отражённого урона и устойчивости, блокировка части умений (EQG)."
  ],
  pros: [
    "Отражение урона в защитной стойке (EQG).",
    "Желудок держится 90 минут (EQG).",
    "Скорость до 43,9 км/ч у Sub Adult (EQG)."
  ],
  cons: [
    "Рост 11 ч 5 мин (EQG).",
    "Стая лишь 5 особей (EQG).",
    "Данных нет: числа отражённого урона (EQG)."
  ],
  tips: [
    "Включай защитную стойку, когда на тебя идёт хищник (EQG).",
    "Помни: часть умений в стойке блокируется (EQG).",
    "Рост долгий — не рискуй в первые часы (EQG).",
    "Желудок пустеет за 90 минут, вода — за 60 (EQG).",
    "Держись стаи до 5 особей (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Kentrosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-herbivores/kentrosaurus",
      "date": "не указана",
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
