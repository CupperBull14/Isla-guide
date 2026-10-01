import { useEffect } from 'react'
import { site } from '../data/site'

interface PageMeta {
  /** Заголовок страницы без имени сайта. Пусто — главная. */
  title?: string
  description: string
  /** true — не индексировать (например, 404). */
  noindex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Обновляет title/description/Open Graph при смене страницы (SPA).
 * Поисковики и соцсети, не исполняющие JS, видят значения по умолчанию из index.html.
 */
export function usePageMeta({ title, description, noindex = false }: PageMeta): void {
  useEffect(() => {
    const full = title ? `${title} — ${site.name}` : `${site.name} — гайды по The Isle: Evrima`
    const url = `${window.location.origin}${window.location.pathname}`
    const ogImage = `${window.location.origin}${import.meta.env.BASE_URL}og-image.png`
    document.title = full
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:locale', 'ru_RU')
    setMeta('property', 'og:site_name', site.name)
    setMeta('property', 'og:image', ogImage)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)
    setCanonical(url)
  }, [title, description, noindex])
}
