import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const dilophosaurus: Dinosaur = {
  id: "dilophosaurus",
  name: "Dilophosaurus",
  nameRu: "Дилофозавр",
  diet: "carnivore",
  category: "mid-carnivore",
  tags: [
    "яд",
    "галлюцинации",
    "ночь"
  ],
  overview: [
    "Dilophosaurus — лёгкий быстрый хищник на 700 кг: 47,5 км/ч, Bite 85, рост 6 часов. Его фирменная механика — яд, вызывающий галлюцинации: у отравленной цели ограничено зрение, а ПКМ призывает «клонов» атаковать её (перезарядка 10 секунд). Клоны видит только отравленный игрок.",
    "По описанию theisle.info (дата не указана), у вида лучшее ночное зрение в ростере. Патч 0.21.734 (9 июл 2026) исправил масштабирование яда. Низкий укус он компенсирует манёвренностью и тактикой «ударил и отошёл»."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 700, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 47.5, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 85, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 360, max: statScales.growth, unit: "мин", note: "6 ч ", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 60, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 60, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 4, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 6, max: 8, unit: "шт.", note: "Тип гнезда: Mound.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 20,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 1,27 кг · скорость 8 км/ч · Bite 0,1"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 60,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 20,03 кг · скорость 25 км/ч · Bite 2,55"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 120,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 411,3–700 кг · скорость 50,5–47,5 км/ч · Bite 49,9–85"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 160,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 700–977 кг · скорость 47,5–52,3–41,4 км/ч · Bite 85–97,75–68\nFrail Elder: Вес 700 кг · скорость 44,6–35,5 км/ч · Bite 85–51"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 20,03 кг, скорость 25 км/ч, Bite 2,55 (EQG).",
      "За первые 10 минут уйдёт около 17% сытости и 17% воды (расчёт по линейному убыванию: желудок пустеет за 60 мин, вода — за 60 мин, EQG).",
      "Особое для вида: ночное зрение лучше, чем у остальных — по описанию theisle.info (дата не указана)."
  ],
  feeding: "α (углеводы): Boar, Tenontosaurus, Herrerasaurus, Ceratosaurus\nβ (белки): Diabloceratops, Carnotaurus, Hypsilophodon, Deer, Chicken\nγ (липиды): Gallimimus, Maiasaura, Goat, Seaturtle, Dryosaurus\nЖелудок пустеет за 60 мин, вода — за 60 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).",
  matchups: [
    {
      "opponent": "tyrannosaurus",
      "verdict": "flee",
      "note": "Взрослый Rex может прижать и добить цель легче ~4650 кг; не принимай бой (EQG).",
      "basis": "derived",
      "source": "eqg-tyrannosaurus"
    },
    {
      "opponent": "triceratops",
      "verdict": "risk",
      "note": "Общее утверждение для хищников (вид не указан): заход в группу Triceratops/Stegosaurus грозит переломами ног (XGamingServer, 12 июн 2026).",
      "basis": "derived",
      "source": "hunt"
    },
    {
      "opponent": "stegosaurus",
      "verdict": "risk",
      "note": "Общее утверждение для хищников (вид не указан): заход в группу Triceratops/Stegosaurus грозит переломами ног (XGamingServer, 12 июн 2026).",
      "basis": "derived",
      "source": "hunt"
    }
  ],
  combat: [
    "Яд: укус вызывает галлюцинации, ограничение обзора и копии, видимые только жертве (EQG).",
    "ПКМ — призыв клонов для атаки отравленной цели, перезарядка 10 с (EQG).",
    "ЛКМ — быстрый укус; Alt + ЛКМ — ещё быстрее с быстрым поворотом (EQG)."
  ],
  pros: [
    "Яд с галлюцинациями и клонами (EQG).",
    "Скорость 47,5 км/ч (EQG).",
    "Лучшее ночное зрение по описанию theisle.info (без даты)."
  ],
  cons: [
    "Слабый Bite 85 и вес 700 кг (EQG).",
    "Рост 6 часов (EQG).",
    "Рейтинг theisledinoguide (апрель 2026) — C-tier («при правильных руках»)."
  ],
  tips: [
    "Отравляй и отходи: яд делает работу, пока ты на дистанции (EQG).",
    "Используй клонов (ПКМ) на отравленной цели, перезарядка 10 секунд (EQG).",
    "Охоться ночью: у вида лучшее ночное зрение (theisle.info, без даты ⚠️).",
    "Стая — 4 особи (EQG).",
    "Желудок и вода — по 60 минут (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Dilophosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/dilophosaurus",
      "date": "не указана",
      "accessed": "2026-10-01"
    },
    {
      "id": "tier-list",
      "title": "theisledinoguide.com — Evrima Tier List",
      "url": "https://www.theisledinoguide.com/tier-list",
      "date": "2026-04",
      "accessed": "2026-10-01"
    },
    {
      "id": "eqg-tyrannosaurus",
      "title": "Evrima Quick Guide — Tyrannosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/tyrannosaurus",
      "date": "не указана",
      "accessed": "2026-10-01"
    },
    {
      "id": "hunt",
      "title": "XGamingServer — Evrima Carnivore Hunting & Ambush Guide",
      "url": "https://xgamingserver.com/blog/the-isle-evrima-hunting-ambush-guide/",
      "date": "2026-06-12",
      "accessed": "2026-10-01"
    }
  ],
}
