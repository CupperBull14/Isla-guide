import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Diet } from '../../types'
import { dinosaurs } from '../../data/dinosaurs'
import { dietLabels } from '../../data/site'

interface DinoSelectProps {
  value: string
  onChange: (id: string) => void
  label: string
  placeholder?: string
  exclude?: readonly string[]
  className?: string
}

const groups: readonly Diet[] = ['carnivore', 'herbivore', 'omnivore']

/** Нативный select (доступен с клавиатуры и на телефоне), сгруппированный по рациону. */
export function DinoSelect({ value, onChange, label, placeholder = 'Выбери динозавра', exclude = [], className = '' }: DinoSelectProps) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-bone-500">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-isle-600 bg-isle-800 py-2.5 pl-3 pr-10 text-base text-bone-100 transition-colors hover:border-isle-500 focus:border-amber-500/60 focus:outline-none sm:text-sm"
        >
          <option value="">{placeholder}</option>
          {groups.map((g) => (
            <optgroup key={g} label={dietLabels[g]}>
              {dinosaurs
                .filter((d) => d.diet === g && !exclude.includes(d.id))
                .map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nameRu} · {d.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-500" aria-hidden />
      </div>
    </div>
  )
}
