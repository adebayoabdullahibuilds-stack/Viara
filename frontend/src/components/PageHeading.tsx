import type { ReactNode } from 'react'

type PageHeadingProps = {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
}

function PageHeading({ eyebrow, title, description, action }: PageHeadingProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6a836e]">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#20372a] sm:text-[2.15rem]">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#707c72]">{description}</p>
      </div>
      {action}
    </div>
  )
}

export default PageHeading
