import { site } from '../../data/site'

export function Footer() {
  return (
    <footer className="border-t border-isle-600/60 bg-isle-950/60">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-bone-500 sm:px-6 lg:px-8">
        {site.disclaimer}
      </div>
    </footer>
  )
}
