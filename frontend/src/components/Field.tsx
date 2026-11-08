import type { InputHTMLAttributes, ReactNode } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  leading?: ReactNode
}

function Field({ label, hint, leading, id, className = '', ...props }: FieldProps) {
  const fieldId = id ?? props.name

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-viara-primary-text" htmlFor={fieldId}>
        {label}
      </label>
      <div className="flex min-h-12 items-center gap-3 rounded-xl border border-viara-border bg-viara-surface px-3.5 transition focus-within:border-viara-accent focus-within:ring-4 focus-within:ring-viara-accent/10">
        {leading ? (
          <span aria-hidden="true" className="shrink-0 text-viara-secondary-text">
            {leading}
          </span>
        ) : null}
        <input
          className={`min-w-0 flex-1 bg-transparent text-sm text-viara-primary-text outline-none placeholder:text-viara-secondary-text ${className}`}
          id={fieldId}
          {...props}
        />
      </div>
      {hint ? <p className="text-xs leading-5 text-viara-secondary-text">{hint}</p> : null}
    </div>
  )
}

export default Field
