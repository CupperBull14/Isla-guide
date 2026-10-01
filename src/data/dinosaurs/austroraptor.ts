import type { Dinosaur } from '../../types'
import { freshSpawnGeneral } from '../commonAdvice'
import { statScales } from '../statScales'

/** Данные: Evrima Quick Guide и др. (см. sources), проверено 2026-10-01. Непроверенное помечено ⚠️ / «данных нет». */
export const austroraptor: Dinosaur = {
  id: "austroraptor",
  name: "Austroraptor",
  nameRu: "Аустрораптор",
  diet: "carnivore",
  category: "mid-carnivore",
  tags: [
    "новинка 0.21.772",
    "рыбалка",
    "прыжок из воды"
  ],
  overview: [
    "Austroraptor — береговой полуводный хищник, добавленный в патче 0.21.772 (3–4 авг 2026). Взрослый весит 240 кг, бегает 48,1 км/ч, Bite 40. Умения: ПКМ — pounce с прижимом, пробел — прыжок из воды с поверхности (water jump), G — стойка подводной охоты на рыбу, работающая только днём.",
    "Вид новый, поэтому часть данных ещё не собрана: время роста по стадиям и параметры детёныша в EQG помечены «?», а Field Guide называет баланс «продолжающимся»."
  ],
  stats: [
    { key: 'weight', label: "Вес взрослого", value: 240, max: statScales.weight, unit: "кг", scale: 'sqrt', source: 'eqg' },
    { key: 'speed', label: "Скорость взрослого", value: 48.1, max: statScales.speed, unit: "км/ч", source: 'eqg' },
    { key: 'bite', label: "Bite Force", value: 40, max: statScales.bite, unit: "", scale: 'sqrt', note: "Bite — не эквивалентно урону.", source: 'eqg' },
    { key: 'growth', label: "Время роста", value: null, max: statScales.growth, unit: "мин", note: "данных нет", source: 'eqg' },
    { key: 'hunger', label: "Голод: 100→0%", value: 75, max: statScales.hunger, unit: "мин", source: 'eqg' },
    { key: 'thirst', label: "Жажда: 100→0%", value: 60, max: statScales.thirst, unit: "мин", source: 'eqg' },
    { key: 'pack', label: "Лимит стаи", value: 8, max: 12, unit: "особей", source: 'eqg' },
    { key: 'eggs', label: "Яиц в кладке", value: 4, max: 8, unit: "шт.", note: "Тип гнезда: Debris.", source: 'eqg' },
  ],
  growth: [
    {
      "name": "Hatchling",
      "nameRu": "Детёныш",
      "minutes": null,
      "focus": "Стадия гнезда (Nested): вылупление; обычный игрок появляется сразу как Juvenile (EQG).",
      "age": "0–25%",
      "details": "Начало (0%): Вес данных нет · скорость данных нет · Bite данных нет"
    },
    {
      "name": "Juvenile",
      "nameRu": "Подросток",
      "minutes": null,
      "focus": "Стартовая стадия при появлении (Spawned), 25% роста (EQG).",
      "age": "25–50%",
      "details": "Начало (25%): Вес 12 кг · скорость 25,2 км/ч · Bite 1,2"
    },
    {
      "name": "Subadult",
      "nameRu": "Сабадульт",
      "minutes": null,
      "focus": "Вес и скорость растут до взрослых значений (EQG).",
      "age": "50–75%",
      "details": "50–75%: Вес 120–240 кг · скорость 36,7–48,1 км/ч · Bite 20–40"
    },
    {
      "name": "Adult",
      "nameRu": "Взрослый / Elder",
      "minutes": null,
      "focus": "Prime Elder 75–87,5% или Frail Elder после 87,5% (патч 0.21.321); условия Prime — в разделе «Механики».",
      "age": "75–100%",
      "details": "Prime Elder: Вес 240–350 кг · скорость 48,1–55,8–46,8 км/ч · Bite 40–46–32\nFrail Elder: Вес 240 кг · скорость 48,1–41,4 км/ч · Bite 40–24"
    }
  ],
  freshSpawn: [
    ...freshSpawnGeneral,
    "Стартовая стадия — Juvenile (25% роста): вес 12 кг, скорость 25,2 км/ч, Bite 1,2 (EQG).",
      "За первые 10 минут уйдёт около 13% сытости и 17% воды (расчёт по линейному убыванию: желудок пустеет за 75 мин, вода — за 60 мин, EQG).",
      "Особое для вида: в воде не чувствуй себя в безопасности — рыбалка уязвима для засады водных хищников (Field Guide, авг 2026)."
  ],
  feeding: "α (углеводы): Crab, schooling fish, clam\nβ (белки): Bullfrog, chicken, rabbit, Deinosuchus, Hypsilophodon\nγ (липиды): Beipiaosaurus, elite fish, Psittacosaurus, sea turtle\nЖелудок пустеет за 75 мин, вода — за 60 мин. Три нутриента одновременно ускоряют рост (подробности — в разделе «Механики»).\nКости не ест (EQG). Рыба доступна через spearfishing (G, только днём).",
  matchups: [
    {
      "opponent": "deinosuchus",
      "verdict": "risk",
      "note": "Полуводность не гарантирует защиту от водных апексов вроде Deinosuchus (Field Guide, авг 2026).",
      "basis": "stated",
      "source": "fg"
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
    },
    {
      "opponent": "kentrosaurus",
      "verdict": "risk",
      "note": "Защитная стойка Kentrosaurus отражает урон и блокирует часть умений (EQG); какие именно — не указано, поэтому оценка слабая.",
      "basis": "weak",
      "source": "eqg-kentrosaurus"
    }
  ],
  combat: [
    "ПКМ — pounce / прижим (EQG).",
    "Пробел — прыжок, в том числе из воды; можно атаковать в воздухе (EQG).",
    "G — стойка spearfishing, работает только днём (патч 0.21.772).",
    "Alt + ЛКМ — направленная атака; ЛКМ — укус (EQG)."
  ],
  pros: [
    "Рыбалка и атаки с воды (патч 0.21.772).",
    "Скорость 48,1 км/ч (EQG).",
    "Стая до 8 особей (EQG)."
  ],
  cons: [
    "Рыбалка уязвима для засады (Field Guide, авг 2026).",
    "Ошибка с pounce может оставить далеко от укрытия (Field Guide, авг 2026).",
    "Данных нет: время роста по стадиям, параметры детёныша (EQG)."
  ],
  tips: [
    "Учи water jump, spearfishing и pounce по отдельности, затем объединяй (Field Guide, авг 2026).",
    "Не считай воду безопасной: Deinosuchus и другие водные апексы опасны (Field Guide, авг 2026).",
    "Рыбачь только днём — стойка G не работает ночью (патч 0.21.772).",
    "Ограничивай риск pounce: промах может увести слишком далеко от безопасного места (Field Guide, авг 2026).",
    "Желудок пустеет за 75 минут, вода — за 60 (EQG)."
  ],
  patch: "0.21.772",
  sources: [
    {
      "id": "eqg",
      "title": "Evrima Quick Guide — Austroraptor",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-carnivores/austroraptor",
      "date": "не указана",
      "accessed": "2026-10-01"
    },
    {
      "id": "fg-austroraptor",
      "title": "The Isle Field Guide — Austroraptor",
      "url": "https://theislefieldguide.com/creatures/austroraptor",
      "date": "2026-08",
      "accessed": "2026-10-01"
    },
    {
      "id": "fg",
      "title": "The Isle Field Guide — Austroraptor",
      "url": "https://theislefieldguide.com/creatures/austroraptor",
      "date": "2026-08",
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
    },
    {
      "id": "eqg-kentrosaurus",
      "title": "Evrima Quick Guide — Kentrosaurus",
      "url": "https://www.evrimaquickguide.com/playables/quick-facts-herbivores/kentrosaurus",
      "date": "не указана",
      "accessed": "2026-10-01"
    }
  ],
}
