import { ChartNoAxesCombined } from 'lucide-react'

type EmptyStateProps = {
  title: string
  description: string
}

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center px-5 py-10 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-[#edf4eb] text-[#4c7852]">
        <ChartNoAxesCombined aria-hidden="true" size={21} />
      </span>
      <h3 className="mt-4 text-sm font-semibold text-[#34473a]">{title}</h3>
      <p className="mt-2 max-w-sm text-xs leading-5 text-[#78847a]">{description}</p>
    </div>
  )
}

export default EmptyState
