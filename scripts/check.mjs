#!/usr/bin/env node
/**
 * Проверка целостности проекта без внешних зависимостей (использует установленный typescript).
 * Запуск: npm run check
 *  1) данные: уникальные id, ссылки на источники/соперников, кривые роста, поля;
 *  2) код: запрещённые паттерны (регрессии прошлых багов, any).
 * Любая ошибка → код выхода 1.
 */
import { createRequire } from 'node:module'
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const require = createRequire(import.meta.url)
const ts = require('typescript')
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const warnings = []
const err = (m) => errors.push(m)
const warn = (m) => warnings.push(m)

/* ---------- загрузка данных: транспиляция src/data и src/utils во временную папку ---------- */
async function walk(dir) {
  const out = []
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else out.push(p)
  }
  return out
}

async function loadData() {
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'isla-check-'))
  const srcDirs = ['data', 'utils', 'types']
  for (const d of srcDirs) {
    const base = path.join(root, 'src', d)
    for (const file of await walk(base)) {
      if (!/\.tsx?$/.test(file) || /\.d\.ts$/.test(file)) continue
      const rel = path.relative(path.join(root, 'src'), file).replace(/\.tsx?$/, '.mjs')
      let code = ts.transpileModule(await fs.readFile(file, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
      }).outputText
      code = code.replace(/(from\s+['"])(\.{1,2}\/[^'"]*)(['"])/g, (_m, a, spec, c) => {
        const target = path.resolve(path.dirname(file), spec)
        const isDir = (() => {
          try {
            return require('node:fs').statSync(target).isDirectory()
          } catch {
            return false
          }
        })()
        return `${a}${spec}${isDir ? '/index' : ''}.mjs${c}`
      })
      const out = path.join(tmp, rel)
      await fs.mkdir(path.dirname(out), { recursive: true })
      await fs.writeFile(out, code)
    }
  }
  const load = (rel) => import(pathToFileURL(path.join(tmp, rel)).href)
  return { load, tmp }
}

/* ---------- проверки данных ---------- */
const STAT_KEYS = ['weight', 'speed', 'bite', 'growth', 'hunger', 'thirst', 'pack', 'eggs']
const PCTS = [0, 25, 50, 75, 87.5, 100]
const VERDICTS = ['win', 'risk', 'flee']

function checkDinosaurs(dinosaurs, patchNumber) {
  const ids = new Set()
  for (const d of dinosaurs) {
    const where = `dinosaurs/${d.id}`
    if (!d.id || ids.has(d.id)) err(`${where}: пустой или повторяющийся id`)
    ids.add(d.id)
  }
  for (const d of dinosaurs) {
    const w = `dinosaurs/${d.id}`
    for (const f of ['name', 'nameRu', 'diet', 'category', 'patch']) if (!d[f]) err(`${w}: нет поля ${f}`)
    if (!Array.isArray(d.overview) || d.overview.length === 0) err(`${w}: пустой overview`)
    if (d.tips?.length !== 5) warn(`${w}: советов ${d.tips?.length}, ожидается 5`)
    if (d.patch !== patchNumber) warn(`${w}: patch ${d.patch} ≠ currentPatch ${patchNumber}`)

    const srcIds = new Set((d.sources ?? []).map((s) => s.id))
    for (const s of d.sources ?? []) {
      if (!s.title || !s.date || !s.accessed) err(`${w}: источник ${s.id} без title/date/accessed`)
    }
    // параметры
    const keys = (d.stats ?? []).map((s) => s.key)
    for (const k of STAT_KEYS) if (!keys.includes(k)) err(`${w}: нет параметра ${k}`)
    for (const s of d.stats ?? []) {
      if (s.value !== null && (typeof s.value !== 'number' || !Number.isFinite(s.value))) err(`${w}: параметр ${s.key} — не число`)
      if (s.source && !srcIds.has(s.source)) err(`${w}: параметр ${s.key} ссылается на неизвестный источник ${s.source}`)
    }
    // стадии
    if (d.growth?.length !== 4) err(`${w}: стадий роста ${d.growth?.length}, ожидается 4`)
    const known = (d.growth ?? []).map((g) => g.minutes)
    const growthStat = (d.stats ?? []).find((s) => s.key === 'growth')?.value
    if (known.every((m) => m !== null) && growthStat != null && known.reduce((a, b) => a + b, 0) !== growthStat) {
      err(`${w}: сумма стадий ${known.reduce((a, b) => a + b, 0)} ≠ время роста ${growthStat}`)
    }
    // кривые
    for (const path_ of ['normal', 'prime']) {
      const pts = d.curve?.[path_]
      if (!pts || pts.length !== PCTS.length) {
        err(`${w}: curve.${path_} должна иметь ${PCTS.length} точек`)
        continue
      }
      pts.forEach((p, i) => {
        if (p.pct !== PCTS[i]) err(`${w}: curve.${path_}[${i}].pct = ${p.pct}, ожидается ${PCTS[i]}`)
        for (const k of ['weight', 'speed', 'bite']) {
          if (p[k] !== null && (typeof p[k] !== 'number' || p[k] < 0)) err(`${w}: curve.${path_}[${i}].${k} некорректно`)
        }
      })
    }
    if (d.curve) {
      for (let i = 0; i < 3; i++) {
        const n = d.curve.normal[i], p = d.curve.prime[i]
        if (n && p && n.weight !== null && p.weight !== null && p.weight + 1e-9 < n.weight) warn(`${w}: Prime легче обычного на ${PCTS[i]}%`)
      }
      if (d.curve.source && !srcIds.has(d.curve.source)) err(`${w}: curve.source ${d.curve.source} не найден`)
    }
    // матчапы
    const seen = new Set()
    for (const m of d.matchups ?? []) {
      if (!ids.has(m.opponent)) err(`${w}: матчап с неизвестным соперником ${m.opponent}`)
      if (m.opponent === d.id) err(`${w}: матчап против самого себя`)
      if (seen.has(m.opponent)) err(`${w}: дубль матчапа против ${m.opponent}`)
      seen.add(m.opponent)
      if (!VERDICTS.includes(m.verdict)) err(`${w}: вердикт ${m.verdict} вне списка`)
      if (!m.note) err(`${w}: матчап против ${m.opponent} без пояснения`)
      if (!m.basis) warn(`${w}: матчап против ${m.opponent} без basis`)
      if (m.source && !srcIds.has(m.source)) err(`${w}: матчап против ${m.opponent} ссылается на неизвестный источник ${m.source}`)
    }
    // мусор в тексте
    const blob = JSON.stringify([d.overview, d.freshSpawn, d.feeding, d.combat, d.pros, d.cons, d.tips, d.growth])
    if (/undefined|NaN|\[object/.test(blob)) err(`${w}: в текстах найдено undefined/NaN/[object]`)
  }
  return ids
}

function checkSourceRef(r, w) {
  if (!r?.title || !r?.date) err(`${w}: источник без title/date`)
  if (r && r.url !== '' && !/^https?:\/\//.test(r.url ?? '')) err(`${w}: некорректный url «${r.url}»`)
}

function checkContent(mechanics, guides) {
  const mIds = new Set()
  for (const m of mechanics) {
    const w = `mechanics/${m.id}`
    if (mIds.has(m.id)) err(`${w}: повторяющийся id`)
    mIds.add(m.id)
    if (!m.title || !m.summary || !m.details?.length) err(`${w}: пустые title/summary/details`)
    if (!m.sources?.length) err(`${w}: нет источников`)
    m.sources?.forEach((s) => checkSourceRef(s, w))
  }
  const all = [['firstDaySteps', guides.firstDaySteps, 'sources'], ['faq', guides.faq, 'sources']]
  for (const [name, list, field] of all) {
    const seen = new Set()
    for (const it of list) {
      if (seen.has(it.id)) err(`guides/${name}: повторяющийся id ${it.id}`)
      seen.add(it.id)
      if (it.id !== 'trophies' && !it[field]?.length) err(`guides/${name}/${it.id}: нет источников`)
      it[field]?.forEach((s) => checkSourceRef(s, `guides/${name}/${it.id}`))
    }
  }
  const seen = new Set()
  for (const t of guides.glossary) {
    if (seen.has(t.id)) err(`glossary: повтор ${t.id}`)
    seen.add(t.id)
    checkSourceRef(t.source, `glossary/${t.id}`)
  }
}

/* ---------- проверки кода ---------- */
const FORBIDDEN = [
  {
    re: /mode=["'](wait|sync)["']/,
    why: 'AnimatePresence mode="wait" уже вызывал «зависание» вкладок (см. docs/DECISIONS.md, ADR-004). Используй enter-only анимации.',
  },
  { re: /\bas any\b|:\s*any\b|<any>/, why: 'Запрещён any (строгий TypeScript).' },
  { re: /dangerouslySetInnerHTML/, why: 'Контент рендерится только из данных, без сырого HTML.' },
]

async function checkCode() {
  for (const file of await walk(path.join(root, 'src'))) {
    if (!/\.tsx?$/.test(file)) continue
    const text = await fs.readFile(file, 'utf8')
    const rel = path.relative(root, file)
    const lines = text.split('\n')
    lines.forEach((line, i) => {
      const t = line.trim()
      if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('{/*')) return
      for (const f of FORBIDDEN) if (f.re.test(line)) err(`${rel}:${i + 1}: ${f.why}`)
    })
    // exit-анимации допустимы только там, где есть AnimatePresence (иначе мёртвый код)
    if (/\bexit=\{/.test(text) && !/AnimatePresence/.test(text)) warn(`${rel}: exit без AnimatePresence — не сработает`)
  }
}

/* ---------- запуск ---------- */
const { load, tmp } = await loadData()
try {
  const { dinosaurs } = await load('data/dinosaurs/index.mjs')
  const { mechanics } = await load('data/mechanics.mjs')
  const guides = await load('data/guides.mjs')
  const { currentPatch } = await load('data/site.mjs')
  checkDinosaurs(dinosaurs, currentPatch.number)
  checkContent(mechanics, guides)
  await checkCode()
  console.log(`Проверено: ${dinosaurs.length} динозавров, ${mechanics.length} механик, ${guides.faq.length} FAQ, ${guides.glossary.length} терминов.`)
} finally {
  await fs.rm(tmp, { recursive: true, force: true })
}

for (const w of warnings) console.warn('⚠️  ' + w)
if (errors.length) {
  for (const e of errors) console.error('✖ ' + e)
  console.error(`\nОшибок: ${errors.length}. Исправь их до коммита.`)
  process.exit(1)
}
console.log(`✔ Проверка пройдена${warnings.length ? ` (предупреждений: ${warnings.length})` : ''}.`)
