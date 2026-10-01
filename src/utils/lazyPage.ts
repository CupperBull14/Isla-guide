import { lazy, type ComponentType } from 'react'

const KEY = 'isla-chunk-reload'

/**
 * lazy() с защитой от «устаревших» файлов после нового деплоя: если кусок кода не нашёлся,
 * один раз перезагружаем страницу (новый index.html знает новые имена файлов).
 */
export function lazyPage<T extends ComponentType<object>>(load: () => Promise<{ default: T }>) {
  return lazy(async () => {
    try {
      const mod = await load()
      try {
        sessionStorage.removeItem(KEY)
      } catch {
        /* хранилище недоступно — не страшно */
      }
      return mod
    } catch (err) {
      let reloaded = false
      try {
        reloaded = sessionStorage.getItem(KEY) === '1'
        if (!reloaded) sessionStorage.setItem(KEY, '1')
      } catch {
        reloaded = true
      }
      if (!reloaded) {
        window.location.reload()
        return new Promise<{ default: T }>(() => {})
      }
      throw err
    }
  })
}
