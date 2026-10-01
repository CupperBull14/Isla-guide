import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const tenontosaurus: Dinosaur = {
  id: "tenontosaurus",
  name: "Tenontosaurus",
  nameRu: "Тенонтозавр",
  diet: "herbivore",
  category: "mid-herbivore",
  tags: [
    "много атак",
    "универсал"
  ],
  overview: [
    "Tenontosaurus — травоядный на 1,6 т с самым широким набором атак в игре по описанию EQG: удар задней ногой (275 урона, 412,5 в голову) с нокдауном и кровотечением, удар хвостом (150/225) и когти (125/187), которыми можно бить на ходу. Рост — 5 ч 40 мин.",
    "Вид выносливый и подходит как «второй выбор» новичкам (официальный гайд, 30 мая 2026), но при кровотечении получает сильные штрафы к движению. Урон обычного укуса в источнике не указан."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 1600, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 40.7, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 35, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 340, max: statScales.growth, unit: "мин", note: "5 ч 40 мин", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 60, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 30, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 8, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 6, max: 8, unit: "шт.", note: "Тип гнезда: Mound.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 20,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 1,03 кг · скорость 5,7 км/ч · Bite 0,04"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 90,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 520 кг · скорость 41,7 км/ч · Bite 10,7"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 110,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 988–1600 кг · скорость 44,1–40,7 км/ч · Bite 20,1–35"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 120,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 1600–1830 кг · скорость 40,7–43,2–36,4 км/ч · Bite 35–40,25–31,5\nFrail Elder: Вес 1600 кг · скорость 40,7–31,9 км/ч · Bite 35–24,5"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 520 кг, скорость 41,7 км/ч, Bite 10,7 (EQG).",
      "За первые 10 минут уйдёт около 17% сытости и 33% воды (расчёт по линейному убыванию: желудок пустеет за 60 мин, вода — за 30 мин, EQG).",
      "Особое для вида: вода пустеет всего за 30 минут — первым делом найди водопой (EQG)."
  ],
  feeding: "α (углеводы): Azure Apollan K-Trifolium, Mango, Marigold, Banana, Jackfruit, Red Currant\nβ (белки): Fireweed, Fiddlehead, Trillium, Crimson Apollan K-Trifolium, Wild Potato Root\nγ (липиды): Russula, Coconut, Papaya, Brazilnuts, Wild Potato Vine\nЖелудок пустеет за 60 мин, вода — за 30 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nHorned Melon вызывает спазмы (EQG).",
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
    "ПКМ — удар задней ногой: 275 урона (412,5 в голову), нокдаун и кровотечение (EQG).",
    "Alt + ПКМ — удар хвостом: 150/225, нокдаун/пошатывание, но низкий урон (EQG).",
    "Alt + ЛКМ — когти: 125/187, можно использовать на ходу, но не в спринте (EQG).",
    "ЛКМ — укус; значения урона и перезарядки умений в источнике не указаны."
  ],
  pros: [
    "Больше атак, чем у любого другого вида, по описанию EQG.",
    "Кровотечение при ударе в голову сравнимо с апекс-хищниками (EQG).",
    "Хорошая выносливость (официальный гайд, 30 мая 2026)."
  ],
  cons: [
    "Сильные штрафы к движению при кровотечении (официальный гайд, 30 мая 2026).",
    "Вода пустеет за 30 минут (EQG).",
    "Рост 5 ч 40 мин (EQG)."
  ],
  tips: [
    "Целься задней ногой в голову — это самый сильный удар вида (EQG).",
    "Не ешь Horned Melon: он вызывает спазмы (EQG).",
    "Береги себя от кровотечений — они замедляют (официальный гайд, 30 мая 2026).",
    "Прикидывай запас по еде: оставшиеся проценты × 28 даёт оценку минут до пустого желудка (EQG).",
    "Когтями можно бить на ходу, но не в спринте — не рассчитывай на них при бегстве (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Tenontosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-herbivores/tenontosaurus",
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
      "id": "eqg-tyrannosaurus",
      "title": "Evrima Quick Guide — Tyrannosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/tyrannosaurus",
      "date": "не указана",
      "accessed": "2026-10-01"
    }
  ],
}
