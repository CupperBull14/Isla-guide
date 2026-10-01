import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Сбрасывает ошибку при смене маршрута. */
  resetKey: string
}

interface State {
  error: Error | null
}

/** Ловит падение страницы (например, не загрузился кусок кода) и даёт обновить её, а не показывает пустой экран. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null })
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Ошибка страницы:', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 pb-16 pt-28 text-center">
        <h1 className="font-display text-2xl font-bold text-bone-100">Страница не загрузилась</h1>
        <p className="mt-3 text-bone-300">Скорее всего, сайт только что обновился. Обнови страницу — данные подтянутся заново.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-xl bg-amber-400 px-5 py-2.5 font-semibold text-isle-950 hover:bg-amber-300"
        >
          Обновить страницу
        </button>
      </main>
    )
  }
}
