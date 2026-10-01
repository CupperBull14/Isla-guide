import type { SourceRef } from '../types'

/** Реестр источников для механик и гайдов (соответствует БАЗА_ЗНАНИЙ.md, раздел 9). Даты — как указано на странице. */
const eqg = (title: string, path: string, date = 'не указана'): SourceRef => ({
  title: `Evrima Quick Guide — ${title}`,
  url: `https://www.evrimaquickguide.com/${path}`,
  date,
})

export const refs = {
  eqgDiet: eqg('Diet & Nutrients', 'gameplay/diet-food/diet-nutrients', '3 июля 2026'),
  eqgStamina: eqg('Stamina', 'gameplay/health-statuses/stamina'),
  eqgHealth: eqg('Health & Injuries', 'gameplay/health-statuses/health-injuries'),
  eqgNesting: eqg('Courting & Nesting', 'gameplay/group-play/courting-nesting'),
  eqgPacks: eqg('Packs & Herds', 'gameplay/group-play/packs-herds', 'актуальность «v0.18.11» — устарело'),
  eqgMigration: eqg('Migrations & Patrol Zones', 'gameplay/group-play/migrations-patrol-zones'),
  eqgSanctuary: eqg('Sanctuary', 'gameplay/group-play/sanctuary'),
  eqgElder: eqg('Elder System', 'gameplay/elder-system', 'не указана (страница помечена WIP)'),
  eqgFighting: eqg('Fighting & Effects', 'gameplay/group-play/fighting-effects'),
  eqgCarnivores: eqg('Quick facts: Carnivores', 'playables/quick-facts-carnivores', '4 сентября 2026'),
  eqgHerbivores: eqg('Quick facts: Herbivores', 'playables/quick-facts-herbivores', '4 сентября 2026'),
  eqgOmnivores: eqg('Quick facts: Omnivores', 'playables/quick-facts-omnivores', '4 сентября 2026'),
  patch321: {
    title: 'The Isle — Patch 0.21.321 (официальный пост)',
    url: 'https://www.theisle-game.com/en/news/merry-x-mas-and-a-happy-new-patch-0-21-321',
    date: '28 декабря 2025',
  },
  patch772: {
    title: 'Steam — Patch 0.21.772',
    url: 'https://store.steampowered.com/news/app/376210/view/717912016810936296',
    date: '3 августа 2026',
  },
  devblog72: {
    title: 'The Isle — DevBlog #72',
    url: 'https://www.theisle-game.com/en/news/the-isle-devblog-72-oviraptor-ahead-of-the-horde-test-new-baryonyx-mechanics',
    date: '1–2 сентября 2026',
  },
  officialBeginner: {
    title: 'The Isle — Best Beginner Dinosaurs (Evrima), официальный гайд',
    url: 'https://www.theisle-game.com/en/guides/best-beginner-dinosaurs-evrima',
    date: '30 мая 2026',
  },
  officialInfo: {
    title: 'The Isle — Beginner\'s Guide',
    url: 'https://www.theisle-game.com/en/info',
    date: 'не указана',
  },
  tigHowToPlay: { title: 'theisle.info — How to play', url: 'https://www.theisle.info/guide/how-to-play', date: 'не указана' },
  tigPrime: { title: 'theisle.info — Prime & Prime Elder', url: 'https://www.theisle.info/guide/prime', date: '28 мая 2026' },
  xgsApex: {
    title: 'XGamingServer — Best Apex Dinosaurs',
    url: 'https://xgamingserver.com/blog/the-isle-evrima-best-apex-dinosaurs/',
    date: '12 июня 2026 (обновлено 15 июня)',
  },
  xgsCalls: {
    title: 'XGamingServer — Calls & Vocalizations',
    url: 'https://xgamingserver.com/blog/the-isle-evrima-calls-vocals-guide/',
    date: '12 июня 2026 (обновлено 15 июня)',
  },
  supercraftMutations: {
    title: 'Supercraft — Mutations & Entombing',
    url: 'https://supercraft.host/wiki/the-isle/mutations_and_entombing/',
    date: 'сентябрь 2026',
  },
  supercraftRoadmap: {
    title: 'Supercraft — Roadmap 2026',
    url: 'https://supercraft.host/article/the-isle-roadmap-2026/',
    date: '22 августа 2026 (обновлено 26 августа)',
  },
  changelog: { title: 'changelog.gg — The Isle: история обновлений', url: 'https://changelog.gg/games/the-isle-376210/updates', date: 'до 1 октября 2026' },
  servers: { title: 'theisle.fans — Official Evrima servers', url: 'https://theisle.fans/en/servers', date: 'снимок 30 сентября 2026' },
  dayNight: {
    title: 'Steam — «Evrima day/night cycle time?»',
    url: 'https://steamcommunity.com/app/376210/discussions/14/3120424524448868754/',
    date: '31 октября 2021 (устарело)',
  },
  fieldGuideAustro: { title: 'The Isle Field Guide — Austroraptor', url: 'https://theislefieldguide.com/creatures/austroraptor', date: 'август 2026' },
} as const satisfies Record<string, SourceRef>
