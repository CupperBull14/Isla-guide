import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const carnotaurus: Dinosaur = {
  id: "carnotaurus",
  name: "Carnotaurus",
  nameRu: "Карнотавр",
  diet: "carnivore",
  category: "apex-carnivore",
  tags: [
    "скорость",
    "таран",
    "открытая местность"
  ],
  overview: [
    "Carnotaurus — самый быстрый наземный апекс-хищник: 49,5 км/ч у взрослого, вес 1,3 т, рост 7 ч 40 мин. XGamingServer (12 июн 2026) пишет, что он «догонит почти всех».",
    "Вид специализируется на рывках: ПКМ — таран-charge с перезарядкой, Alt + ЛКМ — быстрый укус. Он силён на открытой местности и хуже в лесу; на полном спринте у него широкий радиус поворота."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 1300, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 49.5, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 150, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 460, max: statScales.growth, unit: "мин", note: "7 ч 40 мин", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 75, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 60, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 3, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 3, max: 8, unit: "шт.", note: "Тип гнезда: Debris. ⚠️ EQG: 3 на странице вида, 6 в сводной таблице", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 40,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 3,95 кг · скорость 13,9 км/ч · Bite 0,018"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 90,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 496 кг · скорость 43,4 км/ч · Bite 53"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 120,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 854–1300 кг · скорость 47,9–49,5 км/ч · Bite 94–150"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 210,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 1300–1800 кг · скорость 49,5–55,6–45 км/ч · Bite 150–172,5–120\nFrail Elder: Вес 1300 кг · скорость 48,7–39,6 км/ч · Bite 150–90"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 496 кг, скорость 43,4 км/ч, Bite 53 (EQG).",
      "За первые 10 минут уйдёт около 13% сытости и 17% воды (расчёт по линейному убыванию: желудок пустеет за 75 мин, вода — за 60 мин, EQG).",
      "Особое для вида: хищнику нужна еда с первых минут — желудок пустеет за 75 минут, вода за 60 (EQG)."
  ],
  feeding: "α (углеводы): Pachycephalosaurus, Tenontosaurus, Herrerasaurus, Boar\nβ (белки): Omniraptor, Diabloceratops, Troodon, Deer\nγ (липиды): Dryosaurus, Gallimimus, Maiasaura\nЖелудок пустеет за 75 мин, вода — за 60 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).",
  matchups: [
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
    "ПКМ — таран-charge: коснуться и бежать, перезарядка между рывками (EQG).",
    "Alt + ЛКМ — быстрый укус, склоняет голову к земле, тратит стамину; ЛКМ — обычный укус (EQG).",
    "Удар головой при удержании ПКМ и ЛКМ добавлен в патче 0.21.321 (официальный патчноут, 28 дек 2025).",
    "Широкий радиус поворота на полном спринте (XGamingServer, 12 июн 2026)."
  ],
  pros: [
    "Самая высокая скорость среди апекс-хищников: 49,5 км/ч (EQG).",
    "Сильный на открытой местности (EQG).",
    "Таран-charge и удар головой (EQG; патч 0.21.321)."
  ],
  cons: [
    "Широкий радиус поворота на полном спринте (XGamingServer, 12 июн 2026).",
    "Слабее в лесу (EQG).",
    "Стая всего 3 особи (EQG)."
  ],
  tips: [
    "Бей из открытого пространства, не загоняй себя в чащу (EQG).",
    "Береги перезарядку charge: между рывками бить нечем (EQG).",
    "Не лезь в группы Triceratops и Stegosaurus: удар головой или хвоста может сломать ноги (XGamingServer, 12 июн 2026).",
    "Выбирай одиночных или отбившихся от стада жертв (XGamingServer, 12 июн 2026).",
    "Желудок 75 минут, вода 60 — не пускай показатели в ноль перед боем (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Carnotaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/carnotaurus",
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
      "id": "apex",
      "title": "XGamingServer — Evrima Best Apex Dinosaurs",
      "url": "https://xgamingserver.com/blog/the-isle-evrima-best-apex-dinosaurs/",
      "date": "2026-06-12 (обновлено 2026-06-15)",
      "accessed": "2026-10-01"
    },
    {
      "id": "patch-0-21-321",
      "title": "The Isle — Patch 0.21.321 (официальный пост)",
      "url": "https://www.theisle-game.com/en/news/merry-x-mas-and-a-happy-new-patch-0-21-321",
      "date": "2025-12-28",
      "accessed": "2026-10-01"
    },
    {
      "id": "eqg-table-carnivores",
      "title": "Evrima Quick Guide — Quick facts (carnivores)",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores",
      "date": "2026-09-04",
      "accessed": "2026-10-01"
    }
  ],
}
