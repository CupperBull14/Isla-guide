import { PageWrapper } from '../components/layout/PageWrapper'
import { PageHeader } from '../components/ui/PageHeader'
import { mechanics } from '../data/mechanics'

export default function Mechanics() {
  return (
    <PageWrapper>
      <PageHeader title="Механики" subtitle="Игровые механики Evrima: только проверенные факты с источниками." />
      {mechanics.length === 0 ? (
        <p className="rounded-xl border border-dashed border-isle-500 p-6 text-bone-500">
          Механики пока не добавлены.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {mechanics.map((m) => (
            <article key={m.id} className="rounded-2xl border border-isle-600 bg-isle-800 p-5">
              <h2 className="text-lg font-bold">{m.title}</h2>
              <p className="mt-2 text-bone-300">{m.summary}</p>
            </article>
          ))}
        </div>
      )}
    </PageWrapper>
  )
}
