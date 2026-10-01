# Isla Guide — фанатский гайд по The Isle: Evrima

Справочник на русском: динозавры (22 играбельных), стадии роста, матрица матчапов, механики, гайды, глоссарий и FAQ. Только ветка **Evrima**. Каждый факт — с источником и датой; чего нет в проверенных данных, помечено «данных нет».

> Fan-made проект. Не связан с The Isle Development / Afterthought LLC.

**Стек:** React 18 · TypeScript (strict) · Vite 5 · Tailwind CSS 3.4 · Framer Motion 11 · React Router.

## Команды

```bash
npm install        # установка зависимостей
npm run dev        # dev-сервер (http://localhost:5173)
npm run typecheck  # проверка типов
npm run build      # проверка типов + сборка в dist/
npm run preview    # локальный просмотр собранной версии
```

## Структура

```
src/
  pages/        Home, Dinosaurs, DinosaurDetail, Guides, Mechanics, NotFound
  components/   layout/, ui/, dinosaur/
  data/         ВЕСЬ контент: dinosaurs/*.ts, mechanics.ts, guides.ts, sources.ts, site.ts
  types/        все интерфейсы
  utils/        seo.ts (title/description/OG), plural.ts
public/         favicon.svg, og-image.png, robots.txt, _redirects
```

Контент не хардкодится в компонентах: страницы только рисуют данные из `src/data/`.

## Как обновлять контент после патча

1. Прочитай патчноут и обнови факты **только по источникам** (числа не выдумываем: нет данных — пиши «данных нет» / `null`).
2. Правь файлы в `src/data/`:
   - `site.ts` — номер и дата патча (`currentPatch`), дата сверки (`dataCheckedAt`);
   - `dinosaurs/{id}.ts` — параметры, рост, питание, матчапы, источники и `patch`;
   - `mechanics.ts`, `guides.ts` — механики, шаги гайда, глоссарий, FAQ;
   - `sources.ts` — ссылки на источники (с датой).
3. Новый динозавр: создай `dinosaurs/{id}.ts` по типу `Dinosaur` и добавь его в `dinosaurs/index.ts`.
4. Матчап добавляется в `matchups[]` динозавра-**строки** (вердикт — оценка этого динозавра против `opponent`); обратная пара не выводится автоматически.
5. Проверь: `npm run build`, затем закоммить и задеплой.

Фактическую базу (факты + источники) веди в `БАЗА_ЗНАНИЙ.md`, прогресс — в `СТАТУС.md`.

## Деплой

### Vercel (через GitHub) — рекомендуется

1. Создай репозиторий на GitHub и запушь проект (`git remote add origin …`, `git push -u origin master`).
2. На vercel.com: **Add New → Project → Import** репозиторий.
3. Framework Preset — **Vite**; Build Command `npm run build`; Output Directory `dist`.
4. Deploy. Маршрутизация SPA настроена в `vercel.json`. Дальше каждый `git push` публикуется автоматически.

### Netlify Drop (без GitHub)

1. Выполни `npm run build`.
2. Открой app.netlify.com/drop и перетащи папку **`dist`**. Файл `public/_redirects` попадёт в `dist` и обеспечит переходы по прямым ссылкам.

### После деплоя

- В `index.html` замени относительный `og:image` на абсолютный адрес (`https://твой-домен/og-image.png`): соцсети не читают относительные пути.
- Мета-теги страниц обновляются скриптом (`src/utils/seo.ts`); боты без JS видят значения по умолчанию из `index.html`.

### GitHub Pages (через GitHub Actions)

Уже настроено: `.github/workflows/deploy.yml`, `base` в `vite.config.ts` (берётся из `VITE_BASE`), `basename` у роутера и `404.html` для прямых ссылок.

1. Запушь проект в ветку `master`.
2. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Вкладка **Actions** покажет сборку; сайт появится по адресу `https://ЛОГИН.github.io/ИМЯ_РЕПОЗИТОРИЯ/`.
4. Каждый `git push` в `master` публикует свежую версию.
