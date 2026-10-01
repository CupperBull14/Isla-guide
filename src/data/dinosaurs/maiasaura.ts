import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const maiasaura: Dinosaur = {
  id: "maiasaura",
  name: "Maiasaura",
  nameRu: "Маиазавр",
  diet: "herbivore",
  category: "mid-herbivore",
  tags: [
    "стадо",
    "двуногая/четвероногая",
    "танк"
  ],
  overview: [
    "Maiasaura — крупный гадрозавр: взрослая весит 3,7 т, бежит 42,3 км/ч, растёт 7 часов. Особенность — два режима движения: двуногий увеличивает скорость вперёд, четвероногий даёт устойчивость.",
    "Бой зависит от режима: в двуногом ЛКМ даёт круговой удар когтями, в беге — комбо; в четвероногом направление удара определяется камерой (удары передние, задние, боковые). Часть механик в EQG помечена как неуточнённая."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 3700, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 42.3, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 50, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 420, max: statScales.growth, unit: "мин", note: "7 ч ", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 60, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 30, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 10, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 8, max: 8, unit: "шт.", note: "Тип гнезда: Mound.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 30,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 4,53 кг · скорость 9,8 км/ч · Bite 0,06"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 100,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 83 кг · скорость 19,4 км/ч · Bite 1,5"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 140,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 1875–3700 кг · скорость 46,9–42,3 км/ч · Bite 23,64–50"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 150,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 3700–5300–5400 кг · скорость 42,3–40,1–37,8 км/ч · Bite 50–57,5–40\nFrail Elder: Вес 3700 кг · скорость 39,1–36 км/ч · Bite 50–30"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 83 кг, скорость 19,4 км/ч, Bite 1,5 (EQG).",
      "За первые 10 минут уйдёт около 17% сытости и 33% воды (расчёт по линейному убыванию: желудок пустеет за 60 мин, вода — за 30 мин, EQG).",
      "Особое для вида: вода пустеет за 30 минут — найди водопой раньше, чем еду (EQG)."
  ],
  feeding: "α (углеводы): Variegated Orange, Marigold, Mountain Ash, Red Currant, Azure Apollan K-Trifolium\nβ (белки): Agave, Sunchoke Flowers, Radish Flower, Fireweed, Wild Potato Root, Crimson Apollan K-Trifolium\nγ (липиды): Cashew, Pumpkin, Radish Root, Violet Apollan K-Trifolium, Wild Potato Vine\nЖелудок пустеет за 60 мин, вода — за 30 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).",
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
    "CTRL / пробел — переключение двуногий/четвероногий режим (EQG).",
    "Двуногий: ЛКМ на месте — круговой удар когтями, в беге — комбо; ПКМ — толчок/удар (механика не уточнена в EQG).",
    "Четвероногий: направление удара задаёт камера — перед, зад, бока; ПКМ — удар головой/укус (механика не уточнена в EQG)."
  ],
  pros: [
    "Двуногий режим повышает скорость, четвероногий — устойчивость (EQG).",
    "Стая до 10 особей, до 8 яиц (EQG).",
    "Крупный вес 3,7 т (EQG)."
  ],
  cons: [
    "Вода пустеет за 30 минут (EQG).",
    "Часть боевых механик в источнике не уточнена (EQG).",
    "Рост 7 часов (EQG)."
  ],
  tips: [
    "Переключайся между режимами: двуногий — для бегства и скорости, четвероногий — для устойчивости в бою (EQG).",
    "Держись стада — вид стадный (описание theisle.info, без даты).",
    "Следи за водой: она кончается быстрее еды — 30 против 60 минут (EQG).",
    "Целься атаками по направлению камеры в четвероногом режиме (EQG).",
    "Не рассчитывай на неподтверждённые умения — часть ПКМ-атак в источнике помечена «?» (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Maiasaura",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-herbivores/maiasaura",
      "date": "не указана",
      "accessed": "2026-10-01"
    },
    {
      "id": "tig",
      "title": "theisle.info — Dinosaurs (Evrima roster)",
      "url": "https://www.theisle.info/dinosaurs",
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
