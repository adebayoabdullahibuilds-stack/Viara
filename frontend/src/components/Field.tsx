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
      <label className="block text-sm font-medium text-[#27362d]" htmlFor={fieldId}>
        {label}
      </label>
      <div className="flex min-h-12 items-center gap-3 rounded-xl border border-[#dfe5df] bg-white px-3.5 transition focus-within:border-[#467853] focus-within:ring-4 focus-within:ring-[#467853]/10">
        {leading ? (
          <span aria-hidden="true" className="shrink-0 text-[#7b887e]">
            {leading}
          </span>
        ) : null}
        <input
          className={`min-w-0 flex-1 bg-transparent text-sm text-[#202821] outline-none placeholder:text-[#9aa39b] ${className}`}
          id={fieldId}
          {...props}
        />
      </div>
      {hint ? <p className="text-xs leading-5 text-[#6d796f]">{hint}</p> : null}
    </div>
  )
}

export default Field
