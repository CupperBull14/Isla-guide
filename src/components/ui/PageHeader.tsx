interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-extrabold text-bone-100 sm:text-4xl">{title}</h1>
      {subtitle ? <p className="mt-3 max-w-2xl text-bone-300">{subtitle}</p> : null}
      <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-moss-500 to-amber-400" />
    </header>
  )
}
