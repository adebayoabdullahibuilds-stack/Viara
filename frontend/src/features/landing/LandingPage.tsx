import {
  ArrowDownRight,
  ArrowRight,
  ChartNoAxesCombined,
  Check,
  Compass,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Brand from '../../components/Brand'

const benefits = [
  {
    icon: Compass,
    title: 'See the bigger picture',
    text: 'Bring the money you record into one clear view, at your pace.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Find your patterns',
    text: 'Understand where your money goes without judgment or guesswork.',
  },
  {
    icon: ShieldCheck,
    title: 'Stay in control',
    text: 'Your records are yours. Viara helps you make sense of them.',
  },
]

function LandingPage() {
  return (
    <main className="overflow-hidden bg-viara-background text-viara-primary-text">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Brand />
        <nav aria-label="Main navigation" className="flex items-center gap-3">
          <Link
            className="hidden rounded-lg px-4 py-2.5 text-sm font-medium text-viara-primary-text hover:bg-viara-lavender sm:inline-flex"
            to="/login"
          >
            Log in
          </Link>
          <Link
            className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-viara-brand px-4 text-sm font-semibold text-white hover:bg-viara-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-viara-accent"
            to="/onboarding"
          >
            Get started <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </nav>
      </header>

      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-10 sm:px-8 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12 lg:pb-32 lg:pt-14">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-viara-border bg-viara-surface px-3.5 py-2 text-xs font-medium text-viara-accent">
            <span className="size-2 rounded-full bg-viara-lavender" />
            A clearer relationship with your money
          </p>
          <h1 className="max-w-2xl text-[2.9rem] font-semibold leading-[1.04] tracking-[-0.065em] text-viara-primary-text sm:text-6xl lg:text-[4.35rem]">
            Money makes more sense when you can <em className="font-serif font-medium">see it clearly.</em>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-viara-secondary-text sm:text-lg sm:leading-8">
            Understand your spending, make room for what matters, and build
            steadier money habits — one small step at a time.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-viara-brand px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-viara-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-viara-accent"
              to="/onboarding"
            >
              Start your journey <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-viara-primary-text transition hover:bg-viara-lavender"
              to="/dashboard"
            >
              Explore the preview <ArrowDownRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-viara-secondary-text">
            {['You stay in control', 'No bank connection', 'Start at your own pace'].map(
              (item) => (
                <span className="inline-flex items-center gap-1.5" key={item}>
                  <Check aria-hidden="true" className="text-viara-accent" size={15} />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div
          aria-label="Illustration of a financial overview with no recorded data yet"
          className="relative mx-auto w-full max-w-[500px]"
          role="img"
        >
          <div className="absolute -left-10 top-16 size-28 rounded-full bg-viara-lavender blur-2xl" />
          <div className="absolute -right-8 bottom-12 size-32 rounded-full bg-viara-lavender blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-viara-border bg-viara-surface p-5 shadow-[0_28px_90px_-48px_rgba(37,36,91,0.14)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-viara-secondary-text">Your money, made clearer</p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-viara-primary-text">A fresh start</p>
              </div>
              <span className="rounded-full bg-viara-lavender px-3 py-1.5 text-[11px] font-medium text-viara-accent">
                Private by design
              </span>
            </div>
            <div className="mt-6 rounded-2xl bg-viara-background p-5">
              <p className="text-xs text-viara-secondary-text">Your overview begins here</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-viara-primary-text">A little more clarity.</p>
              <div className="mt-5 flex h-24 items-end gap-2" aria-hidden="true">
                {[30, 45, 37, 60, 49, 74, 62, 88, 69, 82, 72, 96].map(
                  (height, index) => (
                    <span
                      className={`flex-1 rounded-t-md ${index === 11 ? 'bg-viara-lavender' : 'bg-viara-lavender'}`}
                      key={index}
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
              <p className="mt-3 text-[11px] text-viara-secondary-text">An illustration — your records are not connected</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {['Spending, understood', 'Goals that feel doable'].map((title, index) => (
                <div className="rounded-2xl border border-viara-border p-4" key={title}>
                  <span className="grid size-8 place-items-center rounded-lg bg-viara-lavender text-viara-accent">
                    {index === 0 ? (
                      <ChartNoAxesCombined aria-hidden="true" size={16} />
                    ) : (
                      <Compass aria-hidden="true" size={16} />
                    )}
                  </span>
                  <p className="mt-3 text-xs font-semibold text-viara-secondary-text">{title}</p>
                  <p className="mt-1 text-[11px] leading-4 text-viara-secondary-text">Guidance shaped around you</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-viara-border bg-viara-surface px-4 py-3 shadow-lg sm:block">
            <p className="text-[11px] text-viara-secondary-text">Your pace, your priorities</p>
            <p className="mt-1 text-sm font-semibold text-viara-accent">No judgment. Just clarity.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-viara-border bg-viara-surface">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-viara-accent">A companion, not a ledger</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-viara-primary-text sm:text-4xl">
              Understand what your money is telling you.
            </h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <article className="border-t border-viara-border pt-5" key={title}>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-viara-lavender text-viara-accent">
                    <Icon aria-hidden="true" size={19} />
                  </span>
                  <span className="text-xs text-viara-secondary-text">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-viara-primary-text">{title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-viara-secondary-text">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-viara-secondary-text sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <Brand />
        <p>Built to help you understand your money, not move it.</p>
        <Link className="font-medium text-viara-accent hover:underline" to="/login">
          Already have an account? Log in
        </Link>
      </footer>
    </main>
  )
}

export default LandingPage
