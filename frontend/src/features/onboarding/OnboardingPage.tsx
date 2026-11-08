import { ArrowLeft, ArrowRight, Check, CircleHelp } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Brand from '../../components/Brand'
import PrimaryButton from '../../components/PrimaryButton'
import useOnboardingStore from '../../stores/onboardingStore'
import type { FinancialFocus, IncomePattern } from '../../types/onboarding'

const incomeOptions: { value: IncomePattern; title: string; detail: string }[] = [
  { value: 'regular', title: 'Mostly regular', detail: 'A regular salary or allowance' },
  { value: 'irregular', title: 'It varies', detail: 'Different amounts or timing' },
  { value: 'multiple', title: 'More than one source', detail: 'A mix of work, support, or side income' },
]

const focusOptions: { value: FinancialFocus; title: string; detail: string }[] = [
  { value: 'understand-spending', title: 'Understand my spending', detail: 'See where my money goes' },
  { value: 'build-budget', title: 'Make a realistic budget', detail: 'Plan around what I have' },
  { value: 'save-consistently', title: 'Save more consistently', detail: 'Build a habit at my own pace' },
  { value: 'plan-ahead', title: 'Feel more prepared', detail: 'Get ready for upcoming needs' },
]

function OnboardingPage() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useOnboardingStore()
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')

  function continueToNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (step === 1) {
      if (!profile.displayName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
        setError('Enter your name and a valid email address to continue.')
        return
      }
      setStep(2)
      return
    }

    if (!profile.incomePattern || !profile.financialFocus) {
      setError('Choose an income pattern and the area you would like to focus on.')
      return
    }
    navigate('/register')
  }

  return (
    <main className="min-h-screen bg-viara-background px-5 py-5 text-viara-primary-text sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Brand />
        <Link className="text-sm font-medium text-viara-secondary-text hover:text-viara-accent" to="/login">
          Already have an account? <span className="text-viara-accent">Log in</span>
        </Link>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-20">
        <aside className="hidden lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-viara-accent">A few thoughtful steps</p>
          <h1 className="mt-4 max-w-md text-4xl font-semibold leading-tight tracking-[-0.055em] text-viara-primary-text">
            Start with what matters to you.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-viara-secondary-text">
            There is no perfect way to manage money. A little context helps Viara
            feel more relevant to your life.
          </p>
          <div className="mt-10 space-y-5">
            {[
              ['01', 'A little about you', 'Your name and the best email to reach you'],
              ['02', 'Your preferences', 'The kind of income you work with and your focus'],
              ['03', 'Your account', 'Create a password to get started'],
            ].map(([number, title, description], index) => (
              <div className="flex gap-4" key={number}>
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                    step > index
                      ? 'bg-viara-lavender text-viara-accent'
                      : 'bg-viara-surface text-viara-secondary-text ring-1 ring-viara-accent'
                  }`}
                >
                  {step > index ? <Check aria-hidden="true" size={15} /> : number}
                </span>
                <div>
                  <p className="text-sm font-semibold text-viara-primary-text">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-viara-secondary-text">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex max-w-sm gap-3 rounded-2xl border border-viara-border bg-viara-surface p-4">
            <CircleHelp aria-hidden="true" className="mt-0.5 shrink-0 text-viara-accent" size={17} />
            <p className="text-xs leading-5 text-viara-secondary-text">
              Your answers stay in this browser session until account setup is
              connected. We never ask for your bank password.
            </p>
          </div>
        </aside>

        <section className="mx-auto w-full max-w-xl">
          <div className="mb-8 lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-viara-accent">
              Step {step} of 2
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-viara-primary-text">
              {step === 1 ? 'A little about you' : 'What brings you here?'}
            </h1>
          </div>
          <div aria-label={`Step ${step} of 2`} className="mb-8 flex gap-2">
            <span className="h-1.5 flex-1 rounded-full bg-viara-lavender" />
            <span className={`h-1.5 flex-1 rounded-full ${step === 2 ? 'bg-viara-lavender' : 'bg-viara-lavender'}`} />
          </div>
          <form className="rounded-[1.75rem] border border-viara-border bg-viara-surface p-5 shadow-[0_20px_70px_-50px_rgba(37,36,91,0.14)] sm:p-8" onSubmit={continueToNext}>
            <div className="hidden lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-viara-accent">
                Step {step} of 2
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-viara-primary-text">
                {step === 1 ? 'A little about you' : 'What brings you here?'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-viara-secondary-text">
                {step === 1
                  ? 'We will use this to personalize your Viara experience.'
                  : 'There are no right answers. Your preferences can change later.'}
              </p>
            </div>

            {step === 1 ? (
              <div className="mt-7 space-y-5">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-viara-primary-text">What should we call you?</span>
                  <input
                    autoComplete="name"
                    className="min-h-12 w-full rounded-xl border border-viara-border px-3.5 text-sm outline-none transition placeholder:text-viara-secondary-text focus:border-viara-accent focus:ring-4 focus:ring-viara-accent/10"
                    onChange={(event) => updateProfile({ displayName: event.target.value })}
                    placeholder="Your name"
                    required
                    value={profile.displayName}
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-viara-primary-text">Email address</span>
                  <input
                    autoComplete="email"
                    className="min-h-12 w-full rounded-xl border border-viara-border px-3.5 text-sm outline-none transition placeholder:text-viara-secondary-text focus:border-viara-accent focus:ring-4 focus:ring-viara-accent/10"
                    onChange={(event) => updateProfile({ email: event.target.value })}
                    placeholder="you@example.com"
                    required
                    type="email"
                    value={profile.email}
                  />
                </label>
                <div className="space-y-2">
                  <span className="block text-sm font-medium text-viara-primary-text">Preferred currency</span>
                  <div className="flex min-h-12 items-center justify-between rounded-xl border border-viara-border bg-viara-background px-3.5">
                    <span className="text-sm text-viara-primary-text">Nigerian Naira</span>
                    <span className="text-sm font-medium text-viara-secondary-text">NGN ₦</span>
                  </div>
                  <p className="text-xs text-viara-secondary-text">More currency options may be added later.</p>
                </div>
              </div>
            ) : (
              <div className="mt-7 space-y-7">
                <fieldset className="space-y-3">
                  <legend className="mb-3 text-sm font-medium text-viara-primary-text">
                    How does income usually come to you?
                  </legend>
                  {incomeOptions.map((option) => (
                    <label
                      className={`flex cursor-pointer gap-3 rounded-xl border p-3.5 transition ${
                        profile.incomePattern === option.value
                          ? 'border-viara-accent bg-viara-lavender'
                          : 'border-viara-border hover:border-viara-accent'
                      }`}
                      key={option.value}
                    >
                      <input
                        checked={profile.incomePattern === option.value}
                        className="mt-1 accent-viara-accent"
                        name="incomePattern"
                        onChange={() => updateProfile({ incomePattern: option.value })}
                        type="radio"
                        value={option.value}
                      />
                      <span>
                        <span className="block text-sm font-medium text-viara-primary-text">{option.title}</span>
                        <span className="mt-1 block text-xs text-viara-secondary-text">{option.detail}</span>
                      </span>
                    </label>
                  ))}
                </fieldset>
                <fieldset className="space-y-3">
                  <legend className="mb-3 text-sm font-medium text-viara-primary-text">
                    What would you like help with first?
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {focusOptions.map((option) => (
                      <label
                        className={`flex min-h-20 cursor-pointer items-start gap-2.5 rounded-xl border p-3.5 transition ${
                          profile.financialFocus === option.value
                            ? 'border-viara-accent bg-viara-lavender'
                            : 'border-viara-border hover:border-viara-accent'
                        }`}
                        key={option.value}
                      >
                        <input
                          checked={profile.financialFocus === option.value}
                          className="mt-0.5 accent-viara-accent"
                          name="financialFocus"
                          onChange={() => updateProfile({ financialFocus: option.value })}
                          type="radio"
                          value={option.value}
                        />
                        <span>
                          <span className="block text-xs font-semibold text-viara-primary-text">{option.title}</span>
                          <span className="mt-1 block text-[11px] leading-4 text-viara-secondary-text">{option.detail}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {error ? (
              <p aria-live="polite" className="mt-5 rounded-lg bg-viara-danger-bg px-3.5 py-3 text-sm text-viara-danger" role="alert">
                {error}
              </p>
            ) : null}

            <div className="mt-8 flex items-center justify-between gap-4">
              {step === 2 ? (
                <button
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl px-3 text-sm font-medium text-viara-secondary-text hover:bg-viara-background"
                  onClick={() => {
                    setError('')
                    setStep(1)
                  }}
                  type="button"
                >
                  <ArrowLeft aria-hidden="true" size={16} /> Back
                </button>
              ) : (
                <Link className="text-sm text-viara-secondary-text hover:text-viara-accent" to="/">
                  Back home
                </Link>
              )}
              <PrimaryButton type="submit">
                {step === 1 ? 'Continue' : 'Create my account'}
                <ArrowRight aria-hidden="true" size={16} />
              </PrimaryButton>
            </div>
          </form>
          <p className="mt-5 text-center text-xs leading-5 text-viara-secondary-text">
            No bank details, balances, or transaction history are requested here.
          </p>
        </section>
      </div>
    </main>
  )
}

export default OnboardingPage
