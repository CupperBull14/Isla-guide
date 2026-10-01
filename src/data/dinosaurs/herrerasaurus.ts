import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const herrerasaurus: Dinosaur = {
  id: "herrerasaurus",
  name: "Herrerasaurus",
  nameRu: "Геррерозавр",
  diet: "carnivore",
  category: "mid-carnivore",
  tags: [
    "лазание",
    "прыжок",
    "большая стая"
  ],
  overview: [
    "Herrerasaurus — малый быстрый хищник: взрослый весит 175 кг, бегает 45 км/ч, растёт 5 ч 25 мин. Умеет лазать: ПКМ — зацепиться, пробел — перепрыгнуть; прыжок-атака с высоты (ПКМ + пробел) наносит урон в зависимости от веса цели.",
    "Вид наносит кровотечение, может действовать большой стаей до 10 особей и видит под водой ночью. В рейтинге theisledinoguide (апрель 2026) он отнесён к D-tier, но в списке для новичков того же сайта — к A-tier."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 175, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 45, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 30, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: 325, max: statScales.growth, unit: "мин", note: "5 ч 25 мин при 1 нутриенте; с тремя нутриентами ≈ 1 ч 48 мин (рост ×3).", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 50, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 45, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 10, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 6, max: 8, unit: "шт.", note: "Тип гнезда: Debris.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": 25,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес 0,21 кг · скорость 4,7 км/ч · Bite 0,04"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": 50,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 64,2 кг · скорость 25,3 км/ч · Bite 10,9"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": 110,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 111,9–175 кг · скорость 33,9–45 км/ч · Bite 19,3–30"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": 140,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 175–225 кг · скорость 45–46,8–37,7 км/ч · Bite 30–34,5–24\nFrail Elder: Вес 175 кг · скорость 43,6–28,7 км/ч · Bite 30–18"
    }
  ],
  curve: {
    "normal": [
      {
        "pct": 0,
        "weight": 0.21,
        "speed": 4.7,
        "bite": 0.04
      },
      {
        "pct": 25,
        "weight": 64.2,
        "speed": 25.3,
        "bite": 10.9
      },
      {
        "pct": 50,
        "weight": 111.9,
        "speed": 33.9,
        "bite": 19.3
      },
      {
        "pct": 75,
        "weight": 175,
        "speed": 45,
        "bite": 30
      },
      {
        "pct": 87.5,
        "weight": 175,
        "speed": 43.6,
        "bite": 30
      },
      {
        "pct": 100,
        "weight": 175,
        "speed": 28.7,
        "bite": 18
      }
    ],
    "prime": [
      {
        "pct": 0,
        "weight": 0.21,
        "speed": 4.7,
        "bite": 0.04
      },
      {
        "pct": 25,
        "weight": 64.2,
        "speed": 25.3,
        "bite": 10.9
      },
      {
        "pct": 50,
        "weight": 111.9,
        "speed": 33.9,
        "bite": 19.3
      },
      {
        "pct": 75,
        "weight": 175,
        "speed": 45,
        "bite": 30
      },
      {
        "pct": 87.5,
        "weight": 225,
        "speed": 46.8,
        "bite": 34.5
      },
      {
        "pct": 100,
        "weight": 225,
        "speed": 37.7,
        "bite": 24
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
    "Стартовая стадия — Juvenile (25% роста): вес 64,2 кг, скорость 25,3 км/ч, Bite 10,9 (EQG).",
      "За первые 10 минут уйдёт около 20% сытости и 22% воды (расчёт по линейному убыванию: желудок пустеет за 50 мин, вода — за 45 мин, EQG).",
      "Особое для вида: лазание отключается при нулевой стамине — береги её в первые минуты (EQG)."
  ],
  feeding: "α (углеводы): Crab, schooling fish, Tenontosaurus, Pachycephalosaurus, boar\nβ (белки): Bullfrog, Omniraptor, Hypsilophodon, chicken\nγ (липиды): Dryosaurus, Pteranodon, Beipiaosaurus, goat, sea turtle, Gallimimus\nЖелудок пустеет за 50 мин, вода — за 45 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nКислород под водой — 25 секунд (EQG).",
  matchups: [
    {
      "opponent": "hypsilophodon",
      "verdict": "risk",
      "note": "Плевок Hypsilophodon может сбросить Herrerasaurus при лазании (EQG).",
      "basis": "derived",
      "source": "eqg"
    },
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
    "Лазание: удерживай ПКМ для зацепа, пробел — перепрыгнуть между поверхностями; на нуле стамины лазание отключено (EQG).",
    "Прыжок-атака: ПКМ + пробел, урон зависит от веса цели (EQG).",
    "Alt + ЛКМ — быстрый укус; ЛКМ — обычный; атаки накладывают кровотечение (EQG).",
    "Плевок Hypsilophodon может сбросить Herrerasaurus (EQG)."
  ],
  pros: [
    "Лазание и прыжок-атака (EQG).",
    "Стая до 10 особей (EQG).",
    "Под водой 25 секунд кислорода и ночное зрение (EQG)."
  ],
  cons: [
    "Слабый Bite 30 и вес 175 кг (EQG).",
    "Лазание отключается без стамины (EQG).",
    "Жалобы на лазание после патча 0.21.772 (комментарии к патчноуту, не перепроверено ⚠️)."
  ],
  tips: [
    "Береги стамину — без неё лазание не работает (EQG).",
    "Держи дистанцию от плюющихся Hypsilophodon: плевок может сбросить тебя с поверхности (EQG).",
    "Держись стаей: до 10 особей (EQG).",
    "Используй высоту для прыжка-атаки (EQG).",
    "Желудок 50 минут, вода 45 (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Herrerasaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/herrerasaurus",
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
      "id": "tier-list-beginners",
      "title": "theisledinoguide.com — Beginner tier list",
      "url": "https://www.theisledinoguide.com/tier-list/beginners",
      "date": "2026-04",
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
