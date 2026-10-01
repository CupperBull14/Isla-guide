import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const stegosaurus: Dinosaur = {
  id: "stegosaurus",
  name: "Stegosaurus",
  nameRu: "Стегозавр",
  diet: "herbivore",
  category: "large-herbivore",
  tags: [
    "хвост",
    "кровотечение",
    "рост 18 ч"
  ],
  overview: [
    "Stegosaurus — тяжёлый бронированный травоядный на 6 т с ударом хвоста: базовый урон Alt + ЛКМ — 1200, по голове ×1,52 (1824), по другим стегозаврам ×2,08 (2500,5). По описанию EQG, у вида самое сильное кровотечение среди играбельных динозавров.",
    "Рост занимает 17 ч 55 мин, скорость — около 26 км/ч. Вид уязвим к одновременному давлению нескольких противников, но против среднеразмерных хищников устойчив."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 6000, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 26.2, max: statScales.speed, unit: "км/ч", note: "⚠️ EQG: 26,2 в сводной таблице, 29,1 в строке Sub Adult", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 50, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 1075, max: statScales.growth, unit: "мин", note: "17 ч 55 мин", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 90, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 60, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 5, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 5, max: 8, unit: "шт.", note: "Тип гнезда: Mound.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 45,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 5,6 кг · скорость 5,7 км/ч · Bite 0,06"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 180,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес данных нет (в источнике опечатка) кг · скорость 29 км/ч · Bite 8,4"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 405,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 2900–6000 кг · скорость 29,1 (ориентир по странице) км/ч · Bite 28,4–50"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 445,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 6000–9300 кг · скорость 25,2–30,6 км/ч · Bite 45–57,5\nFrail Elder: Вес 6000 кг · скорость 24,3–28,4 км/ч · Bite 37,5–50"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес данных нет (в источнике опечатка) кг, скорость 29 км/ч, Bite 8,4 (EQG).",
      "За первые 10 минут уйдёт около 11% сытости и 17% воды (расчёт по линейному убыванию: желудок пустеет за 90 мин, вода — за 60 мин, EQG).",
      "Особое для вида: рост долгий (17 ч 55 мин), поэтому первые стадии — время прятаться в стаде или среди укрытий (EQG)."
  ],
  feeding: "α (углеводы): Marigold, Banana, Jackfruit\nβ (белки): Fiddlehead, Trillium, Crimson Apollan K-Trifolium\nγ (липиды): Papaya, Brazilnuts\nЖелудок пустеет за 90 мин, вода — за 60 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).",
  matchups: [
    {
      "opponent": "carnotaurus",
      "verdict": "win",
      "note": "Общее утверждение для хищников (вид не указан): заход в группу Triceratops/Stegosaurus грозит переломами ног; в одиночку шансы ниже (XGamingServer, 12 июн 2026).",
      "basis": "derived",
      "source": "hunt"
    },
    {
      "opponent": "allosaurus",
      "verdict": "win",
      "note": "Общее утверждение для хищников (вид не указан): заход в группу Triceratops/Stegosaurus грозит переломами ног; в одиночку шансы ниже (XGamingServer, 12 июн 2026).",
      "basis": "derived",
      "source": "hunt"
    },
    {
      "opponent": "ceratosaurus",
      "verdict": "win",
      "note": "Общее утверждение для хищников (вид не указан): заход в группу Triceratops/Stegosaurus грозит переломами ног; в одиночку шансы ниже (XGamingServer, 12 июн 2026).",
      "basis": "derived",
      "source": "hunt"
    },
    {
      "opponent": "dilophosaurus",
      "verdict": "win",
      "note": "Общее утверждение для хищников (вид не указан): заход в группу Triceratops/Stegosaurus грозит переломами ног; в одиночку шансы ниже (XGamingServer, 12 июн 2026).",
      "basis": "derived",
      "source": "hunt"
    },
    {
      "opponent": "omniraptor",
      "verdict": "win",
      "note": "Общее утверждение для хищников (вид не указан): заход в группу Triceratops/Stegosaurus грозит переломами ног; в одиночку шансы ниже (XGamingServer, 12 июн 2026).",
      "basis": "derived",
      "source": "hunt"
    },
    {
      "opponent": "troodon",
      "verdict": "win",
      "note": "Общее утверждение для хищников (вид не указан): заход в группу Triceratops/Stegosaurus грозит переломами ног; в одиночку шансы ниже (XGamingServer, 12 июн 2026).",
      "basis": "derived",
      "source": "hunt"
    },
    {
      "opponent": "herrerasaurus",
      "verdict": "win",
      "note": "Общее утверждение для хищников (вид не указан): заход в группу Triceratops/Stegosaurus грозит переломами ног; в одиночку шансы ниже (XGamingServer, 12 июн 2026).",
      "basis": "derived",
      "source": "hunt"
    },
    {
      "opponent": "austroraptor",
      "verdict": "win",
      "note": "Общее утверждение для хищников (вид не указан): заход в группу Triceratops/Stegosaurus грозит переломами ног; в одиночку шансы ниже (XGamingServer, 12 июн 2026).",
      "basis": "derived",
      "source": "hunt"
    }
  ],
  combat: [
    "Alt + ЛКМ — взмах хвостом: 1200 урона, ×1,52 в голову (1824), против других стегозавров ×2,08 (2500,5); разные углы удара (EQG).",
    "ПКМ — рывок (перезарядка снята, стамина тратится) (EQG).",
    "ЛКМ — укус; на 50% роста Bite около 23 (EQG).",
    "Кровотечение зависит от движения цели: шаг ×1,1, рысь ×1,7, спринт ×2,4 (EQG).",
    "Уклонение от выстрелов в голову: чередуй A/D (EQG)."
  ],
  pros: [
    "Самый сильный удар хвостом в игре по описанию theisle.info (дата не указана).",
    "Самое высокое кровотечение среди играбельных (EQG).",
    "Устойчив к средним хищникам (EQG)."
  ],
  cons: [
    "Уязвим к нескольким противникам сразу (EQG).",
    "Рост 17 ч 55 мин (EQG).",
    "Медленный: около 26 км/ч (EQG)."
  ],
  tips: [
    "Бей хвостом в голову: множитель ×1,52, а по стегозаврам ×2,08 (EQG).",
    "Кровотечение сильнее, когда цель бежит: спринт ×2,4 (EQG).",
    "Чередуй A/D, чтобы уклоняться от укусов в голову (EQG).",
    "Держись в группе: в стаде хищники рискуют получить переломы (XGamingServer, 12 июн 2026).",
    "Желудок 90 минут, вода 60 — планируй маршрут (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Stegosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-herbivores/stegosaurus",
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
      "id": "tig",
      "title": "theisle.info — Dinosaurs (Evrima roster)",
      "url": "https://www.theisle.info/dinosaurs",
      "date": "не указана",
      "accessed": "2026-10-01"
    }
  ],
}
