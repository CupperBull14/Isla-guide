import { Link } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { PageHeader } from '../components/ui/PageHeader'
import { usePageMeta } from '../utils/seo'

export default function NotFound() {
  usePageMeta({ title: 'Страница не найдена', description: 'Такой страницы на сайте нет.', noindex: true })
  return (
    <PageWrapper>
      <PageHeader title="Страница не найдена" subtitle="Такого адреса на сайте нет. Вернись на главную или открой каталог динозавров." />
      <div className="flex flex-wrap gap-3">
        <Link to="/" className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-isle-950 hover:bg-amber-300">
          На главную
        </Link>
        <Link to="/dinosaurs" className="rounded-lg border border-isle-600 px-4 py-2 text-sm text-bone-300 hover:border-amber-500/60">
          Динозавры
        </Link>
      </div>
    </PageWrapper>
  )
}
