import { ArrowRight, CircleHelp } from 'lucide-react'
import { Link } from 'react-router-dom'
import EmptyState from '../../components/EmptyState'
import PageHeading from '../../components/PageHeading'

const metrics = [
  { label: 'Income recorded', note: 'For your selected period' },
  { label: 'Expenses recorded', note: 'For your selected period' },
  { label: 'Available amount', note: 'Calculated from your records' },
  { label: 'Savings progress', note: 'Based on contributions you record' },
]

function DashboardPage() {
  return (
    <div className="space-y-7">
      <PageHeading
        description="A clear overview of your money starts with records you choose to add."
        eyebrow="Overview"
        title="A fresh start"
        action={
          <label className="flex items-center gap-2 text-xs font-medium text-[#59675d]">
            Period
            <select
              aria-label="Select dashboard period"
              className="min-h-10 rounded-xl border border-[#e0e7de] bg-white px-3 text-xs text-[#35473a] outline-none focus:border-[#668f6d] focus:ring-4 focus:ring-[#668f6d]/10"
              defaultValue="month"
            >
              <option value="month">This month</option>
              <option value="last-month">Last month</option>
              <option value="year">This year</option>
            </select>
          </label>
        }
      />

      <div className="flex items-start gap-3 rounded-2xl border border-[#dce8da] bg-[#f1f6ef] px-4 py-3.5">
        <CircleHelp aria-hidden="true" className="mt-0.5 shrink-0 text-[#5b7c5e]" size={17} />
        <p className="text-xs leading-5 text-[#536957]">
          <span className="font-semibold">Preview only.</span> No account is signed in and no
          financial records are connected. Values will appear when the API and your records are
          available.
        </p>
      </div>

      <section aria-label="Financial summary" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article className="rounded-2xl border border-[#e5ebe3] bg-white p-4 sm:p-5" key={metric.label}>
            <p className="text-xs font-medium text-[#758076]">{metric.label}</p>
            <p aria-label={`${metric.label}: no data available`} className="mt-4 text-2xl font-semibold tracking-tight text-[#849087]">
              —
            </p>
            <p className="mt-2 text-[11px] leading-4 text-[#8a948b]">{metric.note}</p>
          </article>
        ))}
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="rounded-2xl border border-[#e5ebe3] bg-white">
          <div className="flex items-center justify-between border-b border-[#eef1ed] px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-[#35473a]">Income and spending</h2>
              <p className="mt-1 text-[11px] text-[#849087]">Your selected period</p>
            </div>
            <Link className="text-xs font-medium text-[#4c7651] hover:underline" to="/analytics">
              Analytics <ArrowRight aria-hidden="true" className="ml-1 inline" size={13} />
            </Link>
          </div>
          <EmptyState
            description="Once records are connected, this view will help you compare your income and spending over time."
            title="No financial data to chart yet"
          />
        </section>

        <section className="rounded-2xl border border-[#e5ebe3] bg-white">
          <div className="border-b border-[#eef1ed] px-5 py-4">
            <h2 className="text-sm font-semibold text-[#35473a]">Recent activity</h2>
            <p className="mt-1 text-[11px] text-[#849087]">Manually recorded transactions</p>
          </div>
          <EmptyState
            description="Viara does not import transactions. Records will show here when you choose to add them."
            title="Nothing recorded yet"
          />
        </section>
      </div>

      <section className="rounded-2xl border border-[#e5ebe3] bg-white">
        <div className="border-b border-[#eef1ed] px-5 py-4">
          <h2 className="text-sm font-semibold text-[#35473a]">Spending by category</h2>
        </div>
        <EmptyState
          description="Category insights are based only on the records you add. No categories or amounts are shown in this preview."
          title="Your spending picture will grow over time"
        />
      </section>
    </div>
  )
}

export default DashboardPage
