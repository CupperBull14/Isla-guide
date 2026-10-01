import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { PageHeader } from '../components/ui/PageHeader'
import { PatchBadge } from '../components/ui/PatchBadge'
import { getDinosaurById } from '../data/dinosaurs'
import { dietLabels, site } from '../data/site'

export default function DinosaurDetail() {
  const { id } = useParams<{ id: string }>()
  const dino = id ? getDinosaurById(id) : undefined

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
      <PageHeader title={dino.nameRu} subtitle={`${dino.name} · ${dietLabels[dino.diet]}`} />
      <PatchBadge patch={dino.patch} />

      <section className="mt-8 space-y-3 text-bone-300">
        {dino.overview.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold">Параметры</h2>
        <ul className="grid gap-2 sm:grid-cols-3">
          {dino.stats.map((s) => (
            <li key={s.label} className="rounded-xl border border-isle-600 bg-isle-800 p-4">
              <div className="text-sm text-bone-500">{s.label}</div>
              <div className="mt-1 font-semibold text-bone-100">
                {s.value === null ? site.noData : `${s.value}${s.max !== null ? ` / ${s.max}` : ''}`}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </PageWrapper>
  )
}
