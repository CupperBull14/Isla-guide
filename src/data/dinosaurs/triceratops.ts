import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const triceratops: Dinosaur = {
  id: "triceratops",
  name: "Triceratops",
  nameRu: "Трицератопс",
  diet: "herbivore",
  category: "large-herbivore",
  tags: [
    "танк",
    "спарринг",
    "блок"
  ],
  overview: [
    "Triceratops — крупный и тяжёлый цератопс: взрослый весит 9,5 т, но бегает всего 23,4 км/ч, а рост занимает 29 ч 10 мин — самый долгий среди травоядных. Урон растёт с размером, а блок ПКМ режет урон по голове вдвое.",
    "Бой строится на «точках» атак (каждая атака тратит одну, точка восстанавливается за 30 секунд), нокдауне и режиме спарринга (Ctrl). XGamingServer (12 июн 2026): Triceratops, развернувшийся лицом к нападающему, срывает большинство засад."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 9500, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 23.4, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 900, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону. ⚠️ EQG: 900 на странице вида, 600 в сводной таблице", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 1750, max: statScales.growth, unit: "мин", note: "29 ч 10 мин при 1 нутриенте; с тремя нутриентами ≈ 9 ч 43 мин (рост ×3). ⚠️ theisle.info (28 мая 2026) называет ≈12 ч базового роста — расхождение с EQG не снято.", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 90, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 60, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 4, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 6, max: 8, unit: "шт.", note: "Тип гнезда: Mound.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 60,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 4,54 кг · скорость 5,4 км/ч · Bite 0,98"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 200,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 85 кг · скорость 16,2 км/ч · Bite 12,6"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 640,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 3600–9500 кг · скорость 26,3–23,4 км/ч · Bite 435–900"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 850,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 9500–12500 кг · скорость 23,4–25,1–22 км/ч · Bite 900–1035–810\nFrail Elder: Вес 9500 кг · скорость 23,4–20,7 км/ч · Bite 900–630"
    }
  ],
  curve: {
    "normal": [
      {
        "pct": 0,
        "weight": 4.54,
        "speed": 5.4,
        "bite": 0.98
      },
      {
        "pct": 25,
        "weight": 85,
        "speed": 16.2,
        "bite": 12.6
      },
      {
        "pct": 50,
        "weight": 3600,
        "speed": 26.3,
        "bite": 435
      },
      {
        "pct": 75,
        "weight": 9500,
        "speed": 23.4,
        "bite": 900
      },
      {
        "pct": 87.5,
        "weight": 9500,
        "speed": 23.4,
        "bite": 900
      },
      {
        "pct": 100,
        "weight": 9500,
        "speed": 20.7,
        "bite": 630
      }
    ],
    "prime": [
      {
        "pct": 0,
        "weight": 4.54,
        "speed": 5.4,
        "bite": 0.98
      },
      {
        "pct": 25,
        "weight": 85,
        "speed": 16.2,
        "bite": 12.6
      },
      {
        "pct": 50,
        "weight": 3600,
        "speed": 26.3,
        "bite": 435
      },
      {
        "pct": 75,
        "weight": 9500,
        "speed": 23.4,
        "bite": 900
      },
      {
        "pct": 87.5,
        "weight": 12500,
        "speed": 25.1,
        "bite": 1035
      },
      {
        "pct": 100,
        "weight": 12500,
        "speed": 22,
        "bite": 810
      }
    ],
    "notes": [
      "Точки 0, 25, 50, 75, 87,5 и 100% — из таблицы EQG; между точками значения рассчитаны линейно (оценка сайта).",
      "⚠️ Для Prime источник даёт 2 значения на 3 точки (вес): значение на 100% принято равным 87,5%."
    ],
    "source": "eqg"
  },
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 85 кг, скорость 16,2 км/ч, Bite 12,6 (EQG).",
      "За первые 10 минут уйдёт около 11% сытости и 17% воды (расчёт по линейному убыванию: желудок пустеет за 90 мин, вода — за 60 мин, EQG).",
      "Особое для вида: первые минуты — самое уязвимое время: скорость малыша 16,2 км/ч, а полный рост — почти 30 часов (EQG)."
  ],
  feeding: "α (углеводы): Variegated Orange, Marigold, Banana, Jackfruit\nβ (белки): Agave, Sunchoke Flowers, Fiddlehead, Trillium, Crimson Apollan K-Trifolium\nγ (липиды): Cashew, Pumpkin, Papaya, Brazil nuts\nЖелудок пустеет за 90 мин, вода — за 60 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).",
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
    "ЛКМ — удар головой; удержание ЛКМ — нокдаун цели, совместим со спаррингом (EQG).",
    "Двойной клик ЛКМ — «thrash» по сбитой цели; Alt + ЛКМ — удар на 360° (EQG).",
    "Удержание ПКМ — блок: на 50% меньше урона по голове; режим «strafe» медленнее, но защищённее (EQG).",
    "Ctrl — режим спарринга; пробел в нём — уклонение вбок. Рога могут сцепиться — освободиться можно пробелом и клавишей движения (EQG).",
    "Каждая атака тратит одну точку (восстановление 30 с); без точек тратится стамина (EQG)."
  ],
  pros: [
    "Блок головой уменьшает урон вдвое (EQG).",
    "Лучший 1v1-«танк» среди травоядных по описанию theisle.info (дата не указана).",
    "Развёрнутый лицом Triceratops срывает большинство засад (XGamingServer, 12 июн 2026)."
  ],
  cons: [
    "Самый долгий рост среди травоядных — 29 ч 10 мин (EQG).",
    "Медленный: 23,4 км/ч (EQG).",
    "Каждая атака расходует «точку» на 30 секунд (EQG)."
  ],
  tips: [
    "Разворачивайся к нападающему лицом: так засада чаще срывается (XGamingServer, 12 июн 2026).",
    "Блок ПКМ — вдвое меньше урона по голове; держи его при сближении (EQG).",
    "Считай точки атак: без них бой тратит стамину (EQG).",
    "Держи группу: хищники в группах Triceratops рискуют получить переломы (XGamingServer, 12 июн 2026).",
    "Не ходи голодным: желудок пустеет 90 минут, вода — 60 (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Triceratops",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-herbivores/triceratops",
      "date": "не указана",
      "accessed": "2026-10-01"
    },
    {
      "id": "tig-growth",
      "title": "theisle.info — Growth guide (базовое время = 1 нутриент, ×2/×3 от диеты)",
      "url": "https://www.theisle.info/guide/growth",
      "date": "2026-05-28",
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
      "id": "tig",
      "title": "theisle.info — Dinosaurs (Evrima roster)",
      "url": "https://www.theisle.info/dinosaurs",
      "date": "не указана",
      "accessed": "2026-10-01"
    }
  ],
}
