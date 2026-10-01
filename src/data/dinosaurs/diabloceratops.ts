import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const diabloceratops: Dinosaur = {
  id: "diabloceratops",
  name: "Diabloceratops",
  nameRu: "Диаблоцератопс",
  diet: "herbivore",
  category: "large-herbivore",
  tags: [
    "ловкий поворот",
    "толчок",
    "нокдаун"
  ],
  overview: [
    "Diabloceratops — рогатый травоядный: взрослый весит 3 т (Prime — до 3,9 т), бегает 34–38 км/ч, Bite 275. Боковым «шаффлом» быстро поворачивает на бегу, а уязвимость к ударам в голову снижена (EQG).",
    "Рост занимает 7 ч 45 мин. Вид умеет толкать цели на спринте, сбивать с ног более лёгких динозавров, бить головой вниз и защищаться в режиме strafe по ПКМ. Стая — до 6 особей, гнездо Mound до 6 яиц."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 3000, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 36, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 275, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 465, max: statScales.growth, unit: "мин", note: "7 ч 45 мин", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 80, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 60, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 6, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 6, max: 8, unit: "шт.", note: "Тип гнезда: Mound.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 45,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 3,52 кг · скорость 3,8 км/ч · Bite 0,33"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 90,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 1065 кг · скорость 12,8 км/ч · Bite 9,06"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 140,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 1510–3000 кг · скорость 36–34,2 км/ч · Bite 130,85–275,1"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 190,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 3000–3900 кг · скорость 34,2–37,8–32,4 км/ч · Bite 275,1–316,25–220\nFrail Elder: Вес 3000 кг · скорость 34,2–28,2 км/ч · Bite 275,1–165"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 1065 кг, скорость 12,8 км/ч, Bite 9,06 (EQG).",
      "За первые 10 минут уйдёт около 12% сытости и 17% воды (расчёт по линейному убыванию: желудок пустеет за 80 мин, вода — за 60 мин, EQG).",
      "Особое для вида: рост 7 ч 45 мин; желудок пустеет за 80 минут, вода — за 60 (EQG)."
  ],
  feeding: "α (углеводы): Horned Melon, Azure Apollan K-Trifolium, Mango, Mountain Ash\nβ (белки): Sumac, Chanterelle Mushroom, Crimson Apollan K-Trifolium, Fireweed, Radish Flower\nγ (липиды): Russula, Coconut, Radish Root, Violet Apollan K-Trifolium\nЖелудок пустеет за 80 мин, вода — за 60 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nДанных по спазмам от растений в источнике нет.",
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
    "Быстрый поворот на бегу боковым шаффлом (EQG).",
    "Толчок/отбрасывание на спринте; нокдаун более лёгких динозавров (EQG).",
    "Удар головой вниз (EQG).",
    "ПКМ — режим strafe для защитного позиционирования (EQG)."
  ],
  pros: [
    "Сниженная уязвимость к ударам в голову (EQG).",
    "Быстрый поворот на бегу (EQG).",
    "Нокдаун более лёгких динозавров (EQG)."
  ],
  cons: [
    "Долгий рост — 7 ч 45 мин (EQG).",
    "Желудок пустеет за 80 минут — нужно много еды (EQG).",
    "Стая 6 особей (EQG)."
  ],
  tips: [
    "Используй толчок на спринте против лёгких целей (EQG).",
    "В обороне включай strafe по ПКМ (EQG).",
    "Опирайся на быстрый поворот, чтобы не давать зайти сбоку (EQG).",
    "Следи за едой: желудок пустеет за 80 минут (EQG).",
    "Время роста велико — береги себя в первые часы (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Diabloceratops",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-herbivores/diabloceratops",
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
