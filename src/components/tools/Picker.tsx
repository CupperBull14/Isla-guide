import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, HelpCircle, RotateCcw, X } from 'lucide-react'
import type { Dinosaur, PickerQuestionId } from '../../types'
import { dinosaurs } from '../../data/dinosaurs'
import { categoryLabels, dietLabels } from '../../data/site'
import { newbieSource, newbieTag, pickerQuestions, pickerThresholds as T } from '../../data/tools'
import { formatMinutes, statValue } from '../../utils/dino'

type Answers = Record<PickerQuestionId, string>
const initial: Answers = { diet: 'any', group: 'any', pace: 'any', size: 'any', speed: 'any', newbie: 'any' }

interface Criterion {
  label: string
  /** null — данных нет */
  ok: boolean | null
  detail: string
}

function criteria(d: Dinosaur, a: Answers): Criterion[] {
  const out: Criterion[] = []
  const pack = statValue(d, 'pack')
  const growth = statValue(d, 'growth')
  const weight = statValue(d, 'weight')
  const speed = statValue(d, 'speed')
  if (a.group !== 'any') {
    out.push({
      label: a.group === 'pack' ? 'Большая группа' : 'Малая группа',
      ok: pack === null ? null : a.group === 'pack' ? pack >= T.bigPack : pack < T.bigPack,
      detail: pack === null ? 'лимит стаи: данных нет' : `лимит стаи ${pack}`,
    })
  }
  if (a.pace !== 'any') {
    out.push({
      label: a.pace === 'fast' ? 'Быстрый рост' : 'Долгая игра',
      ok: growth === null ? null : a.pace === 'fast' ? growth <= T.fastGrowthMinutes : growth > T.fastGrowthMinutes,
      detail: `рост ${formatMinutes(growth)}`,
    })
  }
  if (a.size !== 'any') {
    const ok =
      weight === null
        ? null
        : a.size === 'small'
          ? weight < T.smallWeight
          : a.size === 'large'
            ? weight >= T.largeWeight
            : weight >= T.smallWeight && weight < T.largeWeight
    out.push({ label: 'Размер', ok, detail: weight === null ? 'вес: данных нет' : `${weight.toLocaleString('ru-RU')} кг` })
  }
  if (a.speed === 'fast') {
    out.push({ label: 'Скорость', ok: speed === null ? null : speed >= T.fastSpeed, detail: speed === null ? 'данных нет' : `${speed} км/ч` })
  }
  if (a.newbie === 'yes') {
    const ok = d.tags.includes(newbieTag)
    out.push({ label: 'Для новичков', ok, detail: ok ? 'в официальном списке' : 'не в официальном списке' })
  }
  return out
}

export function Picker() {
  const [answers, setAnswers] = useState<Answers>(initial)
  const active = Object.entries(answers).filter(([k, v]) => k !== 'diet' && v !== 'any').length

  const results = useMemo(() => {
    return dinosaurs
      .filter((d) => answers.diet === 'any' || d.diet === answers.diet)
      .map((d) => {
        const c = criteria(d, answers)
        return { dino: d, criteria: c, score: c.filter((x) => x.ok === true).length }
      })
      .sort((a, b) => b.score - a.score || a.dino.nameRu.localeCompare(b.dino.nameRu, 'ru'))
  }, [answers])

  const best = results[0]?.score ?? 0

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        {pickerQuestions.map((q) => (
          <fieldset key={q.id}>
            <legend className="mb-2 text-sm font-semibold text-bone-100">{q.title}</legend>
            <div className="flex flex-wrap gap-2">
              {q.options.map((o) => {
                const on = answers[q.id] === o.id
                return (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setAnswers({ ...answers, [q.id]: o.id })}
                    className={`relative rounded-xl border px-3 py-1.5 text-left text-sm transition-colors ${
                      on ? 'border-amber-500 text-amber-200' : 'border-isle-600 text-bone-300 hover:border-isle-500 hover:text-bone-100'
                    }`}
                  >
                    {on ? <motion.span layoutId={`pick-${q.id}`} className="absolute inset-0 rounded-xl bg-amber-500/15" transition={{ type: 'spring', stiffness: 400, damping: 32 }} /> : null}
                    <span className="relative block">{o.label}</span>
                    {o.hint ? <span className="relative block text-[11px] text-bone-500">{o.hint}</span> : null}
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}
        <button type="button" onClick={() => setAnswers(initial)} className="inline-flex items-center gap-1.5 text-sm text-bone-500 hover:text-amber-300">
          <RotateCcw className="h-4 w-4" aria-hidden /> Сбросить
        </button>
        <p className="text-xs leading-relaxed text-bone-500">
          Подбор — только по параметрам из базы (EQG) и официальному списку для новичков ({newbieSource.date}). Это не рейтинг силы вида.
        </p>
      </div>

      <div>
        <div className="mb-3 text-sm text-bone-300" aria-live="polite">
          {results.length === 0
            ? 'Под такой рацион видов нет.'
            : active === 0
              ? `Видов: ${results.length}. Выбери предпочтения слева — список отсортируется.`
              : `Видов: ${results.length}. Лучшее совпадение — ${best} из ${active}.`}
        </div>
        <motion.ul layout className="space-y-3">
          <AnimatePresence initial={false} mode="popLayout">
            {results.map(({ dino, criteria: c, score }) => {
              const top = active > 0 && score === best && best > 0
              return (
                <motion.li
                  key={dino.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className={`rounded-2xl border bg-isle-800 p-4 ${top ? 'border-amber-500/50 shadow-glow' : 'border-isle-600'}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-moss-400">
                        {dietLabels[dino.diet]} · {categoryLabels[dino.category]}
                      </div>
                      <Link to={`/dinosaurs/${dino.id}`} className="font-display text-lg font-bold text-bone-100 hover:text-amber-400">
                        {dino.nameRu}
                      </Link>
                      <span className="ml-2 text-sm text-bone-500">{dino.name}</span>
                    </div>
                    {active > 0 ? (
                      <div className="min-w-[7rem] text-right">
                        <div className="text-sm font-semibold text-bone-100">
                          {score} из {active}
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-isle-600">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-moss-600 to-amber-400"
                            initial={false}
                            animate={{ width: `${(score / active) * 100}%` }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {c.length > 0 ? (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {c.map((x) => (
                        <li
                          key={x.label}
                          className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs ${
                            x.ok === true
                              ? 'border-moss-500/40 bg-moss-500/10 text-moss-300'
                              : x.ok === false
                                ? 'border-blood-500/30 bg-blood-500/10 text-blood-400'
                                : 'border-isle-500 text-bone-500'
                          }`}
                        >
                          {x.ok === true ? <Check className="h-3 w-3" aria-hidden /> : x.ok === false ? <X className="h-3 w-3" aria-hidden /> : <HelpCircle className="h-3 w-3" aria-hidden />}
                          {x.label}: {x.detail}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    <Link to={`/dinosaurs/${dino.id}`} className="text-amber-400 hover:underline">
                      Гайд
                    </Link>
                    <Link to={`/tools?tool=compare&ids=${dino.id}`} className="text-bone-300 hover:text-amber-300">
                      Сравнить
                    </Link>
                    <Link to={`/tools?tool=calc&id=${dino.id}`} className="text-bone-300 hover:text-amber-300">
                      Калькулятор
                    </Link>
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  )
}
