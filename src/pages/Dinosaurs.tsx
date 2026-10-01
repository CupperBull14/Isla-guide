import { PageWrapper } from '../components/layout/PageWrapper'
import { PageHeader } from '../components/ui/PageHeader'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { DinosaurCard } from '../components/dinosaur/DinosaurCard'
import { dinosaurs } from '../data/dinosaurs'

export default function Dinosaurs() {
  return (
    <PageWrapper>
      <PageHeader title="Динозавры" subtitle="Каталог динозавров Evrima. Вкладка «Матрица матчапов» появится на следующих этапах." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dinosaurs.map((dino, i) => (
          <ScrollReveal key={dino.id} delay={i * 0.05}>
            <DinosaurCard dino={dino} />
          </ScrollReveal>
        ))}
      </div>
    </PageWrapper>
  )
}
