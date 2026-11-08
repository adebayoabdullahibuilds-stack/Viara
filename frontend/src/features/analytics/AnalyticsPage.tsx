import { ArrowDownToLine, CircleHelp } from 'lucide-react'
import { useState } from 'react'
import EmptyState from '../../components/EmptyState'
import PageHeading from '../../components/PageHeading'

const periods = ['This month', 'Last month', 'Last 3 months', 'This year']

const analyses = [
  {
    title: 'Income and expenses over time',
    description: 'Compare recorded income and expenditure by month.',
  },
  {
    title: 'Spending by category',
    description: 'See which categories account for your recorded expenses.',
  },
  {
    title: 'Budget and savings progress',
    description: 'Review how recorded activity compares with your plans.',
  },
]

function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])

  return (
    <div className="space-y-7">
      <PageHeading
        action={
          <button
            className="inline-flex min-h-10 items-center gap-2 self-start rounded-xl border border-viara-border bg-viara-surface px-3.5 text-xs font-medium text-viara-secondary-text disabled:cursor-not-allowed disabled:opacity-60"
            disabled
            title="Export will be available when analytics data is connected"
            type="button"
          >
            <ArrowDownToLine aria-hidden="true" size={15} /> Export
          </button>
        }
        description="Useful patterns, calculated from your own records — never from guessed or imported data."
        eyebrow="Your patterns"
        title="Financial analytics"
      />

      <div className="flex items-start gap-3 rounded-2xl border border-viara-border bg-viara-lavender px-4 py-3.5">
        <CircleHelp aria-hidden="true" className="mt-0.5 shrink-0 text-viara-accent" size={17} />
        <p className="text-xs leading-5 text-viara-secondary-text">
          <span className="font-semibold">No data is connected.</span> This preview does not show
          account figures, demo transactions, or estimates.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Analytics period">
        {periods.map((period) => (
          <button
            aria-pressed={selectedPeriod === period}
            className={`min-h-9 rounded-lg px-3 text-xs font-medium transition ${
              selectedPeriod === period
                ? 'bg-viara-lavender text-viara-accent'
                : 'border border-viara-border bg-viara-surface text-viara-secondary-text hover:bg-viara-background'
            }`}
            key={period}
            onClick={() => setSelectedPeriod(period)}
            type="button"
          >
            {period}
          </button>
        ))}
      </div>

      <section aria-label="Analytics summaries" className="grid gap-4 lg:grid-cols-2">
        {analyses.map((analysis) => (
          <article className="rounded-2xl border border-viara-border bg-viara-surface" key={analysis.title}>
            <div className="border-b border-viara-border px-5 py-4">
              <h2 className="text-sm font-semibold text-viara-primary-text">{analysis.title}</h2>
              <p className="mt-1 text-[11px] leading-5 text-viara-secondary-text">{analysis.description}</p>
            </div>
            <EmptyState
              description="Add and connect your own records to see this analysis. No values are estimated."
              title="Waiting for your records"
            />
          </article>
        ))}
      </section>
    </div>
  )
}

export default AnalyticsPage
