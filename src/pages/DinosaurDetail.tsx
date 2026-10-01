import { usePageMeta } from '../utils/seo'
import { useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calculator, Check, Scale, Swords, X } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { PageHeader } from '../components/ui/PageHeader'
import { PatchBadge } from '../components/ui/PatchBadge'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { StatBar } from '../components/dinosaur/StatBar'
import { GrowthTimeline } from '../components/dinosaur/GrowthTimeline'
import { GrowthExplorer } from '../components/dinosaur/GrowthExplorer'
import type { GrowthPath } from '../utils/growth'
import { MatchupTable } from '../components/dinosaur/MatchupTable'
import { SectionNav, type NavSection } from '../components/dinosaur/SectionNav'
import { SourcesList } from '../components/dinosaur/SourcesList'
import { getDinosaurById } from '../data/dinosaurs'
import { categoryLabels, dietLabels } from '../data/site'
import { formatMinutes, statValue } from '../utils/dino'

const sections: NavSection[] = [
  { id: 'overview', label: 'Обзор' },
  { id: 'stats', label: 'Параметры' },
  { id: 'growth', label: 'Рост' },
  { id: 'curve', label: 'Статы и Prime' },
  { id: 'spawn', label: 'Первые 10 минут' },
  { id: 'feeding', label: 'Питание' },
  { id: 'matchups', label: 'Матчапы' },
  { id: 'combat', label: 'Бой' },
  { id: 'proscons', label: 'Плюсы и минусы' },
  { id: 'tips', label: '5 советов' },
  { id: 'sources', label: 'Источники' },
]

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      <ScrollReveal>
        <h2 className="mb-4 text-2xl font-bold text-bone-100">{title}</h2>
        {children}
      </ScrollReveal>
    </section>
  )
}

export default function DinosaurDetail() {
  const { id } = useParams<{ id: string }>()
  const dino = id ? getDinosaurById(id) : undefined
  const [pct, setPct] = useState(87.5)
  const [path, setPath] = useState<GrowthPath>('prime')
  usePageMeta(
    dino
      ? { title: `${dino.nameRu} (${dino.name}) — гайд`, description: `${dino.overview[0].slice(0, 150).trim()}…` }
      : { title: 'Динозавр не найден', description: 'Такого динозавра в базе нет.', noindex: true },
  )

  if (!dino) {
    return (
      <PageWrapper>
        <PageHeader title="Динозавр не найден" />
        <Link to="/dinosaurs" className="text-amber-400 hover:underline">
          ← К списку динозавров
        </Link>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Link to="/dinosaurs" className="mb-6 inline-flex items-center gap-1 text-sm text-bone-300 hover:text-amber-400">
        <ArrowLeft className="h-4 w-4" /> Все динозавры
      </Link>
      <PageHeader title={dino.nameRu} subtitle={`${dino.name} · ${dietLabels[dino.diet]} · ${categoryLabels[dino.category]}`} />
      <div className="flex flex-wrap items-center gap-2">
        <PatchBadge patch={dino.patch} />
        {[
          ['Вес', statValue(dino, 'weight'), 'кг'],
          ['Скорость', statValue(dino, 'speed'), 'км/ч'],
          ['Стая до', statValue(dino, 'pack'), ''],
        ].map(([label, v, unit]) => (
          <span key={String(label)} className="rounded-full border border-isle-600 bg-isle-800 px-3 py-1 text-xs text-bone-300">
            {label}: <span className="font-semibold text-bone-100">{v === null ? 'данных нет' : `${Number(v).toLocaleString('ru-RU')} ${unit}`.trim()}</span>
          </span>
        ))}
        <span className="rounded-full border border-isle-600 bg-isle-800 px-3 py-1 text-xs text-bone-300">
          Рост: <span className="font-semibold text-bone-100">{formatMinutes(statValue(dino, 'growth'))}</span>
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {[
          { to: `/tools?tool=compare&ids=${dino.id}`, label: 'Сравнить', Icon: Scale },
          { to: `/tools?tool=calc&id=${dino.id}`, label: 'Калькулятор роста', Icon: Calculator },
          { to: `/tools?tool=counter&id=${dino.id}`, label: 'Как играть против', Icon: Swords },
        ].map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            className="inline-flex items-center gap-2 rounded-xl border border-isle-600 bg-isle-800 px-3 py-2 text-sm text-bone-300 transition-colors hover:border-amber-500/60 hover:text-amber-300"
          >
            <Icon className="h-4 w-4" aria-hidden /> {label}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <SectionNav sections={sections} />
      </div>

      <div className="space-y-12">
        <Section id="overview" title="Обзор">
          <div className="space-y-3 text-bone-300">
            {dino.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="stats" title="Параметры">
          <div className="grid gap-3 sm:grid-cols-2">
            {dino.stats.map((s, i) => (
              <StatBar key={s.label} stat={s} index={i} />
            ))}
          </div>
        </Section>

        <Section id="growth" title="Рост по стадиям">
          <GrowthTimeline stages={dino.growth} />
        </Section>

        <Section id="curve" title="Статы по росту: обычный и Prime">
          <p className="mb-4 text-sm text-bone-300">
            Тяни ползунок — вес, здоровье, скорость и Bite пересчитываются на каждом проценте роста. Переключатель показывает разницу между обычной
            особью и Prime: с 75% у Prime выше вес и характеристики.
          </p>
          <GrowthExplorer dino={dino} pct={pct} onPct={setPct} path={path} onPath={setPath} showTable />
        </Section>

        <Section id="spawn" title="Свежий спавн: первые 10 минут">
          <ul className="space-y-2 text-bone-300">
            {dino.freshSpawn.map((t) => (
              <li key={t} className="rounded-xl border border-isle-600 bg-isle-800 p-3 text-sm">
                {t}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="feeding" title="Питание">
          <p className="whitespace-pre-line rounded-xl border border-isle-600 bg-isle-800 p-4 text-sm leading-relaxed text-bone-300">
            {dino.feeding}
          </p>
        </Section>

        <Section id="matchups" title="Матчапы">
          <MatchupTable matchups={dino.matchups} />
          <p className="mt-3 text-xs text-bone-500">
            В таблице только пары с подтверждённым обоснованием. Остальные — данных нет.
          </p>
        </Section>

        <Section id="combat" title="Боевые приёмы">
          <ul className="list-inside list-disc space-y-2 text-bone-300">
            {dino.combat.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Section>

        <Section id="proscons" title="Плюсы и минусы">
          <div className="grid gap-4 sm:grid-cols-2">
            <ul className="space-y-2 rounded-xl border border-moss-600/40 bg-moss-700/10 p-4">
              {dino.pros.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-bone-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-moss-400" /> {p}
                </li>
              ))}
            </ul>
            <ul className="space-y-2 rounded-xl border border-blood-500/40 bg-blood-500/10 p-4">
              {dino.cons.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-bone-300">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-blood-400" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="tips" title="5 советов">
          <ol className="space-y-2">
            {dino.tips.map((t, i) => (
              <li key={t} className="flex gap-3 rounded-xl border border-isle-600 bg-isle-800 p-3 text-sm text-bone-300">
                <span className="font-display text-amber-400">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="sources" title="Источники">
          <SourcesList sources={dino.sources} />
        </Section>
      </div>
    </PageWrapper>
  )
}
