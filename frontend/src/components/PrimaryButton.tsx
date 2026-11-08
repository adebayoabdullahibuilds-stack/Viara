import type { ButtonHTMLAttributes, ReactNode } from 'react'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  to?: string
}

function PrimaryButton({
  children,
  className = '',
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-viara-brand px-5 text-sm font-semibold text-white transition hover:bg-viara-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-viara-accent disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
