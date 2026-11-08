import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Brand from '../../components/Brand'
import Field from '../../components/Field'
import PrimaryButton from '../../components/PrimaryButton'
import apiClient from '../../services/api'
import useOnboardingStore from '../../stores/onboardingStore'

type AuthPageProps = {
  mode: 'login' | 'register'
}

function AuthPage({ mode }: AuthPageProps) {
  const isRegister = mode === 'register'
  const { profile, clearProfile } = useOnboardingStore()
  const [email, setEmail] = useState(isRegister ? profile.email : '')
  const [displayName, setDisplayName] = useState(profile.displayName)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageIsError, setMessageIsError] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    if (isRegister && password !== confirmPassword) {
      setMessage('Those passwords do not match. Check them and try again.')
      setMessageIsError(true)
      return
    }

    setSubmitting(true)
    try {
      if (isRegister) {
        await apiClient.post('/auth/register/', {
          email,
          display_name: displayName,
          password,
          password_confirmation: confirmPassword,
          preferences: {
            currency: profile.currency,
            income_pattern: profile.incomePattern,
            financial_focus: profile.financialFocus,
          },
        })
      } else {
        await apiClient.post('/auth/login/', { email, password })
      }

      setMessage(
        'The API accepted the request. Secure session handling is not connected in this frontend yet.',
      )
      setMessageIsError(false)
      if (isRegister) clearProfile()
    } catch (error) {
      const isNetworkError =
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'ERR_NETWORK'

      setMessage(
        isNetworkError
          ? 'The account service is not connected yet. Your information was not submitted.'
          : 'We could not complete that request. Check your details and try again.',
      )
      setMessageIsError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="grid min-h-screen bg-[#f8faf7] text-[#202821] lg:grid-cols-[0.9fr_1.1fr]">
      <section className="flex flex-col px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-md items-center justify-between lg:mx-0">
          <Brand />
          <Link className="inline-flex items-center gap-1.5 text-xs font-medium text-[#647268] hover:text-[#1f5137]" to="/">
            <ArrowLeft aria-hidden="true" size={14} /> Home
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#67806b]">
            {isRegister ? 'Your next chapter' : 'Welcome back'}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#203b2a] sm:text-4xl">
            {isRegister ? 'Create your Viara account' : 'Good to see you again.'}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#6c796f]">
            {isRegister
              ? 'A calmer, clearer way to understand your money starts here.'
              : 'Sign in to pick up where you left off.'}
          </p>

          <form className="mt-8 space-y-5" onSubmit={submit}>
            {isRegister ? (
              <Field
                autoComplete="name"
                label="Your name"
                name="displayName"
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Your name"
                required
                value={displayName}
              />
            ) : null}
            <Field
              autoComplete="email"
              label="Email address"
              leading={<Mail size={17} />}
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
            <Field
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              label="Password"
              leading={<LockKeyhole size={17} />}
              minLength={8}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder={isRegister ? 'At least 8 characters' : 'Enter your password'}
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
            />
            {isRegister ? (
              <Field
                autoComplete="new-password"
                label="Confirm password"
                leading={<LockKeyhole size={17} />}
                minLength={8}
                name="confirmPassword"
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Enter your password again"
                required
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
              />
            ) : null}
            <button
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="inline-flex min-h-9 items-center gap-2 rounded-lg text-xs font-medium text-[#5e7162] hover:text-[#1f5137] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315d41]"
              onClick={() => setShowPassword((visible) => !visible)}
              type="button"
            >
              {showPassword ? <EyeOff aria-hidden="true" size={15} /> : <Eye aria-hidden="true" size={15} />}
              {showPassword ? 'Hide passwords' : 'Show passwords'}
            </button>

            {message ? (
              <p
                aria-live="polite"
                className={`rounded-xl px-4 py-3 text-sm leading-5 ${
                  messageIsError
                    ? 'bg-[#fff3f0] text-[#9c392b]'
                    : 'bg-[#edf5eb] text-[#365e3a]'
                }`}
                role={messageIsError ? 'alert' : 'status'}
              >
                {message}
              </p>
            ) : null}

            <PrimaryButton className="w-full" disabled={submitting} type="submit">
              {submitting
                ? 'Connecting...'
                : isRegister
                  ? 'Create account'
                  : 'Log in'}
              {!submitting ? <ArrowRight aria-hidden="true" size={16} /> : null}
            </PrimaryButton>
          </form>

          <p className="mt-7 text-center text-sm text-[#6d796f]">
            {isRegister ? 'Already have an account?' : 'New to Viara?'}{' '}
            <Link
              className="font-semibold text-[#315d41] underline decoration-[#adc1ad] underline-offset-4 hover:text-[#1f5137]"
              to={isRegister ? '/login' : '/onboarding'}
            >
              {isRegister ? 'Log in' : 'Create an account'}
            </Link>
          </p>
          <p className="mt-8 text-center text-xs leading-5 text-[#889289]">
            Your password is sent only to the configured Viara API. It is not
            stored by this frontend.
          </p>
        </div>
      </section>

      <aside className="relative hidden overflow-hidden bg-[#173d2b] px-12 py-16 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-36 -top-32 size-[34rem] rounded-full border border-white/10" />
        <div className="absolute -right-8 -top-8 size-[26rem] rounded-full border border-white/10" />
        <div className="absolute -bottom-40 -left-24 size-[34rem] rounded-full bg-[#315d41]/50 blur-3xl" />
        <div className="relative">
          <span className="inline-flex rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-medium text-[#d7e5d7]">
            Your financial life, at your pace
          </span>
          <h2 className="mt-8 max-w-lg text-5xl font-medium leading-[1.08] tracking-[-0.06em]">
            Good money habits start with understanding.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#d0ddd1]">
            Viara helps you understand the choices you make with money — with
            practical guidance, not pressure.
          </p>
        </div>
        <div className="relative flex items-center justify-between gap-4 border-t border-white/15 pt-5 text-xs text-[#c8d8ca]">
          <span>See your money. Understand it.</span>
          <span>Made for real life.</span>
        </div>
      </aside>
    </main>
  )
}

export default AuthPage
