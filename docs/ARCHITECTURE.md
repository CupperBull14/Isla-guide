# Архитектура Isla Guide

## Слои (зависимости только сверху вниз)
```
pages/            ← маршруты, собирают экран из компонентов и данных
  components/     ← переиспользуемые куски UI (layout/, ui/, dinosaur/, tools/)
    utils/        ← чистые функции (расчёты, SEO, ленивая загрузка)
      data/       ← ВЕСЬ контент (типизированные объекты)
        types/    ← интерфейсы (единый контракт)
```
Правило: компоненты и страницы **не содержат контента** — только рендерят `src/data/*`. `data` не импортирует React и UI.

## Карта файлов
| Что | Где |
|---|---|
| Контракты данных | `src/types/index.ts` |
| Динозавры (22) | `src/data/dinosaurs/{id}.ts`, реестр `index.ts` (`dinosaurs`, `getDinosaurById`) |
| Шкалы для полос | `src/data/statScales.ts` |
| Общие советы спавна | `src/data/commonAdvice.ts` |
| Механики | `src/data/mechanics.ts` |
| Гайды, глоссарий, FAQ | `src/data/guides.ts` |
| Инструменты (пороги, вопросы, строки сравнения) | `src/data/tools.ts` |
| Реестр ссылок-источников для механик/гайдов | `src/data/sources.ts` |
| Патч, подписи, главная, меню | `src/data/site.ts` |
| Расчёты | `src/utils/dino.ts` (время роста), `src/utils/growth.ts` (кривые статов), `src/utils/seo.ts`, `src/utils/lazyPage.ts` |
| Страницы | `src/pages/{Home,Dinosaurs,DinosaurDetail,Guides,Mechanics,Tools,NotFound}.tsx` |
| Проверка целостности | `scripts/check.mjs` (`npm run check`) |
| Деплой | `.github/workflows/deploy.yml`, `vercel.json`, `public/_redirects` |

## Поток данных
`src/data/*` → страницы/компоненты → экран. Ничего не пишется в браузере, состояние (вкладки, фильтры) — в React-state и URL (`?tab=`, `?tool=`, `?ids=`, `?id=`), чтобы страницами можно было делиться.

## Модель динозавра (кратко)
- `stats[]` — 8 параметров по ключам `weight|speed|bite|growth|hunger|thirst|pack|eggs`; `growth` = минуты **при 1 нутриенте и x1** (с тремя нутриентами ≈ ÷3).
- `growth[]` — 4 стадии по 25% (минуты или `null`).
- `curve.normal` / `curve.prime` — 6 точек (0, 25, 50, 75, 87,5, 100%) для веса, скорости, Bite; между точками UI интерполирует линейно и помечает «оценка».
- `matchups[]` — оценка ЭТОГО динозавра против `opponent`; basis: `stated|derived|weak`.
- `sources[]` — все `source`-id внутри файла должны на них ссылаться (проверяет `npm run check`).

## Как добавить…
**…динозавра.** Скопируй близкий файл из `src/data/dinosaurs/`, заполни только подтверждённое, остальное `null` / «данных нет»; добавь импорт и элемент в `index.ts`; `npm run check`. Матчапы — только с источником; двустороннюю пару нужно вносить в оба файла отдельно.
**…механику / вопрос FAQ / термин.** Добавь объект в соответствующий массив с источником из `src/data/sources.ts` (или добавь источник туда).
**…инструмент.** Тип `ToolId` + запись в `tools` (`src/data/tools.ts`) + компонент в `src/components/tools/` + ветка во вкладках `src/pages/Tools.tsx`. Логику расчётов — в `src/utils/`, чистыми функциями.
**…страницу.** Файл в `src/pages/`, `lazyPage()` и `<Route>` в `App.tsx`, пункт в `site.nav`, `usePageMeta()` внутри страницы.
**…новое поле в тип динозавра.** Сделай его опциональным, поддержи в UI «данных нет», затем заполняй постепенно; обязательным делай только после заполнения у всех видов и правки `scripts/check.mjs`.

## Что менять после патча
1. `src/data/site.ts` → `currentPatch`, `dataCheckedAt`.
2. Затронутые виды в `src/data/dinosaurs/*.ts` (+ `patch` в файле), механики в `mechanics.ts`.
3. `БАЗА_ЗНАНИЙ.md` (факт + источник + дата), `СТАТУС.md`.
4. `npm run verify`.
