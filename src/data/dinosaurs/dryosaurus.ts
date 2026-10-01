import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const dryosaurus: Dinosaur = {
  id: "dryosaurus",
  name: "Dryosaurus",
  nameRu: "Дриозавр",
  diet: "herbivore",
  category: "small-herbivore",
  tags: [
    "новичкам",
    "уклонение",
    "быстрый рост"
  ],
  overview: [
    "Dryosaurus — мелкий быстрый травоядный: взрослая особь весит 130 кг и разгоняется до 45 км/ч. Игра за него построена на уклонении, а не на силе: у вида два заряда dodge, которые не тратят стамину и восстанавливаются за 10 секунд.",
    "Полный рост занимает 4 ч 25 мин — один из самых коротких среди видов ростера, поэтому официальный гайд (30 мая 2026) ставит его первым в списке для новичков. Платой за это служат хрупкость и слабый укус (Bite 20): в прямом бою с взрослыми хищниками он не выигрывает."
  ],
  stats: [
    { label: "Вес взрослого", value: 130, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { label: "Скорость взрослого", value: 45, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { label: "Bite Force", value: 20, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { label: "Время роста", value: 265, max: statScales.growth, unit: "мин", note: "4 ч 25 мин", source: 'eqg' },
    { label: "Голод: 100→0%", value: 30, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { label: "Жажда: 100→0%", value: 45, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { label: "Лимит стаи", value: 10, max: 12, unit: "особей", source: 'eqg' },
    { label: "Яиц в кладке", value: 8, max: 8, unit: "шт.", note: "Тип гнезда: Mound.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 20,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 0,155 кг · скорость 5,6 км/ч · Bite 0,02"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 45,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 23,2 кг · скорость 29,8 км/ч · Bite 4,5"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 90,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 60,7–130 кг · скорость 39,3–45 км/ч · Bite 9,4–20"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 110,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 130–185–185 кг · скорость 45–50,4–39,6 км/ч · Bite 20–23–16\nFrail Elder: Вес 130 кг · скорость 44–32,4 км/ч · Bite 20–12"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 23,2 кг, скорость 29,8 км/ч, Bite 4,5 (EQG).",
      "За первые 10 минут уйдёт около 33% сытости и 22% воды (расчёт по линейному убыванию: желудок пустеет за 30 мин, вода — за 45 мин, EQG).",
      "Особое для вида: два заряда уклонения (ПКМ) доступны сразу, но расходовать их стоит только на реальный контакт, а не на каждое сближение (Field Guide, 29 авг 2026)."
  ],
  feeding: "α (углеводы): Horned Melon, Variegated Orange, Marigold, Red Currant, Azure Apollan K-Trifolium\nβ (белки): Sumac, Chanterelle Mushroom, Crimson Apollan K-Trifolium, Agave, Sunchoke Flowers, Wild Potato Root\nγ (липиды): Russula, Cashew, Pumpkin, Wild Potato Vine\nЖелудок пустеет за 30 мин, вода — за 45 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nНельзя уклоняться, пока несёшь еду.",
  matchups: [
    {
      "opponent": "carnotaurus",
      "verdict": "flee",
      "note": "На открытых равнинах Carnotaurus назван главной угрозой (theisle.info, без даты).",
      "basis": "weak",
      "source": "tig"
    },
    {
      "opponent": "deinosuchus",
      "verdict": "flee",
      "note": "Рядом с водой Deinosuchus назван главной угрозой (theisle.info, без даты).",
      "basis": "weak",
      "source": "tig"
    },
    {
      "opponent": "tyrannosaurus",
      "verdict": "flee",
      "note": "Взрослый Rex может прижать и добить цель легче ~4650 кг; не принимай бой (EQG).",
      "basis": "derived",
      "source": "eqg-tyrannosaurus"
    }
  ],
  combat: [
    "ПКМ — уклонение: 2 заряда, перезарядка 10 с, стамину не тратит; с едой в пасти уклониться нельзя (EQG).",
    "ЛКМ при ходьбе — удар ногой, при спринте — укус, по бокам и сзади — удар хвостом (EQG).",
    "Вид собран под тактику «ударил и ушёл»; заряды уклонения нужны, чтобы сорвать уже начатую атаку, а не чтобы начинать погоню (EQG; Field Guide, 29 авг 2026)."
  ],
  pros: [
    "Быстрый рост: 4 ч 25 мин (EQG).",
    "Два заряда уклонения без траты стамины (EQG).",
    "Стая до 10 особей, до 8 яиц в кладке (EQG).",
    "Играя за этот вид, засчитывается одно из 10 условий Prime Elder (EQG, Elder-система)."
  ],
  cons: [
    "Слабый урон: Bite 20 у взрослого; HP равно весу, то есть порядка 130 (EQG).",
    "Опасные подходы к воде и громкие крики выдают положение (Field Guide, 29 авг 2026).",
    "Растраченные заряды уклонения оставляют без защиты (Field Guide, 29 авг 2026)."
  ],
  tips: [
    "Не трать все заряды уклонения в начале погони — держи их на момент реального контакта (Field Guide, 29 авг 2026).",
    "Заранее планируй путь к воде и еде и держи укрытие в пределах спринта (theisle.info, без даты ⚠️).",
    "Желудок пустеет за 30 минут, вода — за 45 (EQG); другие источники дают иные значения (Field Guide: 40/40), сверяйся с игрой.",
    "Не уклоняйся с едой в пасти — механика заблокирована (EQG): сначала положи еду.",
    "Следи за тем, чтобы не кричать без нужды: избыточные вокализации — один из слабых мест вида (Field Guide, 29 авг 2026)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Dryosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-herbivores/dryosaurus",
      "date": "не указана",
      "accessed": "2026-10-01"
    },
    {
      "id": "fg",
      "title": "The Isle Field Guide — Dryosaurus",
      "url": "https://theislefieldguide.com/creatures/dryosaurus",
      "date": "2026-08-29",
      "accessed": "2026-10-01"
    },
    {
      "id": "tig",
      "title": "theisle.info — Dryosaurus",
      "url": "https://www.theisle.info/dinosaurs/dryosaurus",
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
      "id": "eqg-elder",
      "title": "Evrima Quick Guide — Elder System",
      "url": "https://www.evrimaquickguide.com/gameplay/elder-system",
      "date": "не указана (страница WIP)",
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
