import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const hypsilophodon: Dinosaur = {
  id: "hypsilophodon",
  name: "Hypsilophodon",
  nameRu: "Гипсилофодон",
  diet: "herbivore",
  category: "small-herbivore",
  tags: [
    "новичкам",
    "лазание",
    "самый быстрый рост"
  ],
  overview: [
    "Hypsilophodon — самый лёгкий вид в ростере: взрослый весит 20 кг и бежит 39,6 км/ч. Полный рост — всего 1 ч 50 мин, самый короткий в таблице EQG. Защита построена на плевке кислотой, временно ослепляющем цель, и на лазании: с ПКМ и пробелом он цепляется за поверхности (механика добавлена в патче 0.20.109).",
    "Прямого боя вид не выдерживает (Bite 2, HP равно весу), поэтому играть за него — значит прятаться, лазать и уходить от погони. Малыши ещё не умеют плеваться."
  ],
  stats: [
    { label: "Вес взрослого", value: 20, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { label: "Скорость взрослого", value: 39.6, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { label: "Bite Force", value: 2, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { label: "Время роста", value: 110, max: statScales.growth, unit: "мин", note: "1 ч 50 мин", source: 'eqg' },
    { label: "Голод: 100→0%", value: 30, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { label: "Жажда: 100→0%", value: 45, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { label: "Лимит стаи", value: 10, max: 12, unit: "особей", source: 'eqg' },
    { label: "Яиц в кладке", value: 6, max: 8, unit: "шт.", note: "Тип гнезда: Debris.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 20,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 0,023 кг · скорость 4 км/ч · Bite 0"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 20,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 0,4 кг · скорость 10,5 км/ч · Bite 0,02"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 30,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 5,7–20 кг · скорость 25,9–39,6 км/ч · Bite 0,05–2"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 40,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 20–22,5–23 кг · скорость 39,6–39,6–37,8 км/ч · Bite 2–2,3–1,8\nFrail Elder: Вес 20 кг · скорость 34,6–30,6 км/ч · Bite 2–1,4"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 0,4 кг, скорость 10,5 км/ч, Bite 0,02 (EQG).",
      "За первые 10 минут уйдёт около 33% сытости и 22% воды (расчёт по линейному убыванию: желудок пустеет за 30 мин, вода — за 45 мин, EQG).",
      "Особое для вида: лазание и перелёты по рельефу доступны с первых минут — используй деревья и склоны как укрытие (EQG)."
  ],
  feeding: "α (углеводы): Horned Melon, Azure Apollan K-Trifolium, Mango, Banana, Jackfruit\nβ (белки): Sumac, Chanterelle Mushroom, Crimson Apollan K-Trifolium, Fireweed, Fiddlehead, Trillium\nγ (липиды): Russula, Coconut, Papaya, Brazilnuts\nЖелудок пустеет за 30 мин, вода — за 45 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).",
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
    "ЛКМ — укус; удержание ЛКМ — плевок едкой желчью, временно ослепляющий цель (расходуемый ресурс) (EQG).",
    "ПКМ + пробел — лазание/прикрепление к поверхности с ограниченной дальностью прыжка и повышенной устойчивостью к падениям (EQG).",
    "Плевок может заставить Herrerasaurus сорваться при лазании (EQG, страница Herrerasaurus)."
  ],
  pros: [
    "Самый быстрый рост среди всех видов: 1 ч 50 мин (EQG).",
    "Ослепляющий плевок и лазание дают пути отхода (EQG).",
    "Стая до 10 особей (EQG).",
    "Играя за этот вид, засчитывается одно из 10 условий Prime Elder (EQG)."
  ],
  cons: [
    "Очень хрупкий: Bite 2, HP равно весу — порядка 20 (EQG).",
    "Малыши не умеют плеваться (EQG).",
    "Открытая местность без укрытий опасна (theisle.info, без даты ⚠️)."
  ],
  tips: [
    "Держись зарослей и вертикали: лазание — главный способ уйти от погони (EQG).",
    "Плевок лучше беречь для загнанной ситуации: он тратит ресурс (EQG; theisle.info, без даты).",
    "Голод 30 минут, вода 45 — планируй вылазки заранее (EQG).",
    "Не рассчитывай на плевок в детстве: малыши плеваться не могут (EQG).",
    "Ограничения лазания: дальность прыжка у поверхности небольшая — оценивай её до рывка (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Hypsilophodon",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-herbivores/hypsilophodon",
      "date": "не указана",
      "accessed": "2026-10-01"
    },
    {
      "id": "tig",
      "title": "theisle.info — Hypsilophodon",
      "url": "https://www.theisle.info/dinosaurs/hypsilophodon",
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
