import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const pachycephalosaurus: Dinosaur = {
  id: "pachycephalosaurus",
  name: "Pachycephalosaurus",
  nameRu: "Пахицефалозавр",
  diet: "herbivore",
  category: "mid-herbivore",
  tags: [
    "переломы",
    "таран",
    "мелкий хищник — угроза"
  ],
  overview: [
    "Pachycephalosaurus — травоядный среднего размера: взрослый весит 700 кг (страница вида EQG; в старой сводной таблице указано 500 кг, это устарело), бежит 41,8 км/ч, растёт 6 ч 15 мин. Его главная черта — таран головой, который вызывает переломы; по описанию EQG это единственный вид с такой механикой.",
    "Таран не действует на цели тяжелее 3 тонн. Вид плохо плавает и уязвим к падениям, зато получает меньше урона в голову и тратит мало стамины на спец-атаки."
  ],
  stats: [
    { label: "Вес взрослого", value: 700, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { label: "Скорость взрослого", value: 41.8, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { label: "Bite Force", value: 30, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { label: "Время роста", value: 375, max: statScales.growth, unit: "мин", note: "6 ч 15 мин", source: 'eqg' },
    { label: "Голод: 100→0%", value: 45, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { label: "Жажда: 100→0%", value: 45, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { label: "Лимит стаи", value: 8, max: 12, unit: "особей", source: 'eqg' },
    { label: "Яиц в кладке", value: 6, max: 8, unit: "шт.", note: "Тип гнезда: Mound.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 25,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 0,616 кг · скорость 8,2 км/ч · Bite 0,04"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 50,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 147,2 кг · скорость 44,3 км/ч · Bite 7,9"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 140,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 308,7–700 кг · скорость 47,2–41,8 км/ч · Bite 16,1–30"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 160,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 700–910 кг · скорость 41,8–46,5–39,5 км/ч · Bite 30–34,5–25,5\nFrail Elder: Вес 700 кг · скорость 41,8–30,6 км/ч · Bite 30–19,5"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 147,2 кг, скорость 44,3 км/ч, Bite 7,9 (EQG).",
      "За первые 10 минут уйдёт около 22% сытости и 22% воды (расчёт по линейному убыванию: желудок пустеет за 45 мин, вода — за 45 мин, EQG).",
      "Особое для вида: держись подальше от воды — Pachycephalosaurus плохо плавает (EQG)."
  ],
  feeding: "α (углеводы): Azure Apollan K-Trifolium, Mango, Variegated Orange, Marigold, Banana, Jackfruit\nβ (белки): Fireweed, Agave, Sunchoke Flowers, Fiddlehead, Trillium, Crimson Apollan K-Trifolium\nγ (липиды): Russula, Coconut, Cashew, Pumpkin, Papaya, Brazilnuts\nЖелудок пустеет за 45 мин, вода — за 45 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).",
  matchups: [
    {
      "opponent": "deinosuchus",
      "verdict": "flee",
      "note": "В воде вид назван беспомощным: медленное плавание и меньше 10 с кислорода (theisle.info, без даты, содержит устаревшие данные).",
      "basis": "weak",
      "source": "tig"
    },
    {
      "opponent": "tyrannosaurus",
      "verdict": "risk",
      "note": "Таран не наносит урон целям тяжелее 3 т, а Tyrannosaurus весит около 9,3 т (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "triceratops",
      "verdict": "risk",
      "note": "Таран не наносит урон целям тяжелее 3 т, а Triceratops весит около 9,5 т (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "stegosaurus",
      "verdict": "risk",
      "note": "Таран не наносит урон целям тяжелее 3 т, а Stegosaurus весит около 6 т (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
    {
      "opponent": "maiasaura",
      "verdict": "risk",
      "note": "Таран не наносит урон целям тяжелее 3 т, а Maiasaura весит около 3,7 т (EQG).",
      "basis": "derived",
      "source": "eqg"
    }
  ],
  combat: [
    "ПКМ — таранный бросок головой, вызывает переломы; по целям тяжелее 3 т не действует (EQG).",
    "Alt + ЛКМ — взмах головой с нокдауном; ЛКМ — укус (EQG).",
    "Кровотечение вид нанести не может — только переломы (EQG)."
  ],
  pros: [
    "Таран с переломами — уникальная механика среди травоядных (EQG).",
    "Сниженный урон по голове, низкий расход стамины на спец-атаки (EQG).",
    "Стая до 8 особей (EQG)."
  ],
  cons: [
    "Таран бесполезен против целей тяжелее 3 т (EQG).",
    "Плохо плавает, слаб к падениям (EQG).",
    "Рост долгий — 6 ч 15 мин (EQG)."
  ],
  tips: [
    "Выбирай цели легче 3 тонн — против них таран работает (EQG).",
    "Избегай воды и высоких обрывов: вид плох в плавании и падениях (EQG).",
    "Голод и вода — по 45 минут (EQG).",
    "Помни, что кровотечения нет — ставь на переломы и нокдаун (EQG).",
    "Расхождение по весу: 700 кг (страница вида) против 500 кг (старая таблица) — доверяй игре и патчноутам ⚠️."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Pachycephalosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-herbivores/pachycephalosaurus",
      "date": "не указана",
      "accessed": "2026-10-01"
    },
    {
      "id": "tig",
      "title": "theisle.info — Pachycephalosaurus",
      "url": "https://www.theisle.info/dinosaurs/pachycephalosaurus",
      "date": "не указана",
      "accessed": "2026-10-01"
    },
    {
      "id": "official-beginner",
      "title": "The Isle: Best Beginner Dinosaurs (Evrima) — официальный гайд",
      "url": "https://www.theisle-game.com/en/guides/best-beginner-dinosaurs-evrima",
      "date": "2026-05-30",
      "accessed": "2026-10-01"
    }
  ],
}
