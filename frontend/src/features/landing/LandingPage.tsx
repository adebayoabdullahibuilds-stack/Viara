import {
  ArrowDownRight,
  ArrowRight,
  Bot,
  Briefcase,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  Compass,
  GraduationCap,
  Laptop,
  Lightbulb,
  Lock,
  Menu,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Brand from '../../components/Brand'

// Audience personas
const audiences = [
  {
    icon: Laptop,
    tag: 'Variable Cashflow',
    title: 'Freelancers & Creatives',
    description:
      'Plan around irregular client milestones. Smooth feast-and-famine cycles and allocate for taxes or gear without touching rent money.',
    quote: 'Helped me survive client payment delays without touching rent money.',
  },
  {
    icon: GraduationCap,
    tag: 'Stipends & Allowances',
    title: 'Students & NYSC Corpers',
    description:
      'Make every naira count. Stretch your monthly allowance or federal stipend, prevent mid-month dry spells, and build your first emergency buffer.',
    quote: 'I finished my service year with actual savings instead of a zero balance.',
  },
  {
    icon: Briefcase,
    tag: 'Starting Out',
    title: 'Early-Career Professionals',
    description:
      'Navigate entry-level salaries with rising living expenses. Budget for black tax, commute, and personal growth without feeling constantly depleted.',
    quote: 'Gave me clarity on what is truly available versus committed expenses.',
  },
  {
    icon: Wallet,
    tag: 'Multiple Streams',
    title: 'Side Hustlers & Solopreneurs',
    description:
      'Consolidate earnings from digital products, client projects, and daytime work into one unified, private dashboard without bookkeeping friction.',
    quote: 'Finally I can see how my side income actually impacts my long-term goals.',
  },
]

// Feature Tabs Data
const featureTabs = [
  {
    id: 'tracking',
    label: 'Calm Tracking',
    icon: Wallet,
    title: 'Manual logging that takes five seconds.',
    description:
      'Record income and expenses on your terms. No sensitive banking credentials, no broken account syncs, and no invasive automated data harvesting.',
    bullets: [
      'Fast single-screen entry for income and expenses',
      'Context-aware tags: Feeding, Transport, Freelance, Subscriptions',
      '100% private and user-controlled data records',
      'Supports irregular and non-monthly inflow schedules',
    ],
    preview: {
      type: 'tracking',
      title: 'Recent Entries',
      badge: 'Manual & Private',
      items: [
        { label: 'Client milestone payout', cat: 'Freelance Inflow', amount: '+₦85,000', type: 'in' },
        { label: 'Monthly grocery refill', cat: 'Food & Feeding', amount: '-₦24,500', type: 'out' },
        { label: 'Internet data plan', cat: 'Utilities & Work', amount: '-₦11,000', type: 'out' },
      ],
    },
  },
  {
    id: 'budgeting',
    label: 'Budgets That Breathe',
    icon: Compass,
    title: 'Realistic budgets that bend when life happens.',
    description:
      'Rigid budgets break when unexpected costs arise. Viara uses flexible category envelopes so you stay aware without guilt trips or alarmist warnings.',
    bullets: [
      'Separation of essentials (Needs) and discretionary (Wants)',
      'Adjustable mid-cycle allocations without penalty',
      'Clear remaining limits calculated deterministically',
      'No guilt-inducing red alerts or shame banners',
    ],
    preview: {
      type: 'budgeting',
      title: 'Monthly Envelopes',
      badge: 'Active Cycle',
      envelopes: [
        { name: 'Essentials & Utilities', used: 68, cap: '₦72,000 / ₦105,000', color: 'bg-viara-accent' },
        { name: 'Transport & Commute', used: 45, cap: '₦18,000 / ₦40,000', color: 'bg-viara-brand' },
        { name: 'Personal & Leisure', used: 82, cap: '₦28,500 / ₦35,000', color: 'bg-amber-600' },
      ],
    },
  },
  {
    id: 'goals',
    label: 'Doable Goals',
    icon: PiggyBank,
    title: 'Savings goals linked to real milestones.',
    description:
      'Whether building a three-month emergency cushion or saving for upfront apartment rent, Viara tracks your progress calmly based on what you actually set aside.',
    bullets: [
      'Define clear target amounts and target dates',
      'Visual progress pacing with realistic completion estimates',
      'Keep goal allocations distinct from daily spending',
      'Celebrate milestones quietly without gamified noise',
    ],
    preview: {
      type: 'goals',
      title: 'Active Savings Targets',
      badge: '3 Goals Active',
      goals: [
        { name: 'Emergency Buffer', target: '₦150,000', current: '₦95,000', pct: 63 },
        { name: 'Work Laptop Upgrade', target: '₦280,000', current: '₦140,000', pct: 50 },
        { name: 'Annual Rent Cushion', target: '₦450,000', current: '₦180,000', pct: 40 },
      ],
    },
  },
  {
    id: 'analytics',
    label: 'Deterministic Analytics',
    icon: ChartNoAxesCombined,
    title: 'Honest arithmetic. Zero speculative guessing.',
    description:
      'See where your money actually went with transparent category breakdowns and trends over time. We answer the questions that matter without cluttered complexity.',
    bullets: [
      'Available funds calculated directly from verified records',
      'Net monthly trajectory comparing income vs. expenses',
      'Category distribution charts with accessible text summaries',
      'Exportable summaries whenever you want your data',
    ],
    preview: {
      type: 'analytics',
      title: 'Monthly Breakdown',
      badge: 'Calculated Position',
      stats: [
        { label: 'Recorded Inflow', val: '₦245,000' },
        { label: 'Recorded Outflow', val: '₦118,500' },
        { label: 'Calculated Available', val: '₦126,500' },
      ],
    },
  },
]

// AI Prompts and Responses
const aiPrompts = [
  {
    userQuestion: 'I just got a ₦60,000 freelance milestone payout. What is the most balanced way to split it?',
    aiResponse:
      'Congratulations on the milestone! Looking at your current records, you are ₦30,000 away from your 3-month emergency fund target. Here is a balanced, low-stress suggestion:\n\n• ₦25,000 to your Emergency Fund (brings you to 83% of your target)\n• ₦20,000 to upcoming bills and utilities due next week\n• ₦15,000 into your flexible discretionary envelope for personal guilt-free spending\n\nThis keeps your momentum going while giving you breathing room right now.',
  },
  {
    userQuestion: 'Where did most of my spending drift compared to last month?',
    aiResponse:
      'Comparing your recorded expenses between this month and last month:\n\n• Transport & ride-hails increased by ₦14,800 (+26%), largely concentrated around late evenings.\n• Food & dining stayed steady within 4% of your normal average.\n• Utilities decreased by ₦5,000 due to recurring plan adjustments.\n\nOverall, your essentials remain healthy. If you want to free up more room, shifting 2–3 commute trips to daytime transport could save roughly ₦8,000 next cycle.',
  },
  {
    userQuestion: 'Can I comfortably afford a ₦45,000 work monitor this week without derailing rent?',
    aiResponse:
      'Let’s check your recorded commitments before the 28th:\n\n• Your recorded available balance is ₦94,000.\n• You have ₦40,000 earmarked for upcoming rent contribution.\n• Essential food and transport commitments are estimated at roughly ₦22,000.\n\nPurchasing the monitor immediately for ₦45,000 would leave you with approximately ₦7,000 in buffer, which is quite tight. Consider splitting the expense across two cycles or waiting until your next client invoice is logged.',
  },
]

// FAQ Items
const faqs = [
  {
    q: 'Do I need to link my bank account or enter my BVN?',
    a: 'Never. Viara is strictly privacy-first. We do not connect to Open Banking, we never request bank passwords, and we never ask for your BVN or card details. You manually log your numbers in seconds, keeping you in complete control.',
  },
  {
    q: 'Can Viara handle irregular income and multiple gigs?',
    a: 'Yes, that is exactly why Viara was built. Unlike traditional tools that assume a rigid 30-day 9-to-5 paycheck, Viara lets you log income whenever it arrives, calculating your available position smoothly across variable pay dates.',
  },
  {
    q: 'How does the AI financial companion work?',
    a: 'Viara’s AI provides contextual decision support. It analyzes your recorded patterns to answer questions like "Can I afford this purchase?" or "How should I allocate this bonus?". It never shames you, never commands you, and never gives risky speculative stock advice.',
  },
  {
    q: 'Is Viara completely free to use?',
    a: 'Yes! Viara is completely free to get started with. As part of an academic research project into AI financial literacy and habit formation, our primary mission is helping young adults build sustainable financial well-being.',
  },
  {
    q: 'What is the difference between Viara and an expense spreadsheet?',
    a: 'Spreadsheets are tedious, break easily on mobile, and only show cold numbers. Viara offers frictionless mobile logging, instant deterministic calculations, goal progress tracking, and conversational AI insights that actually explain what the numbers mean.',
  },
  {
    q: 'Can I export or delete my data whenever I choose?',
    a: 'Absolutely. You maintain complete ownership of every record you add. You can export your financial history or clear your profile at any time with a single click.',
  },
]

// Savings calculator presets
const savingsPresets = [
  { label: 'Emergency Fund', target: 150000, desc: '3-month buffer for peace of mind' },
  { label: 'Upfront Rent', target: 450000, desc: 'Annual or bi-annual apartment rent' },
  { label: 'Work Equipment', target: 240000, desc: 'Laptop or workspace upgrade' },
  { label: 'Skill Certification', target: 80000, desc: 'Professional exam or training course' },
]

function LandingPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeAiIndex, setActiveAiIndex] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Savings calculator state
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0)
  const [monthlyContribution, setMonthlyContribution] = useState(25000)

  const activeGoal = savingsPresets[selectedGoalIndex]
  const monthsToReach = Math.ceil(activeGoal.target / monthlyContribution)

  return (
    <main className="overflow-hidden bg-viara-background text-viara-primary-text selection:bg-viara-lavender selection:text-viara-brand">
      {/* ── Top Header ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-viara-border/70 bg-viara-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Brand />

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-medium text-viara-secondary-text lg:flex">
            <a className="transition hover:text-viara-brand" href="#features">
              Features
            </a>
            <a className="transition hover:text-viara-brand" href="#audience">
              Who It's For
            </a>
            <a className="transition hover:text-viara-brand" href="#companion">
              AI Companion
            </a>
            <a className="transition hover:text-viara-brand" href="#calculator">
              Goal Calculator
            </a>
            <a className="transition hover:text-viara-brand" href="#difference">
              The Difference
            </a>
            <a className="transition hover:text-viara-brand" href="#faq">
              FAQ
            </a>
          </nav>

          {/* CTA & Auth Links */}
          <div className="flex items-center gap-3">
            <Link
              className="hidden rounded-xl px-4 py-2 text-sm font-medium text-viara-primary-text transition hover:bg-viara-lavender sm:inline-flex"
              to="/login"
            >
              Log in
            </Link>
            <Link
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-viara-brand px-4 text-sm font-semibold text-white shadow-xs transition hover:bg-viara-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-viara-accent"
              to="/onboarding"
            >
              Get started <ArrowRight aria-hidden="true" size={16} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-viara-border bg-viara-surface text-viara-primary-text transition hover:bg-viara-lavender lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
            >
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav aria-label="Mobile navigation" className="border-t border-viara-border bg-viara-surface px-5 py-4 shadow-lg lg:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium text-viara-primary-text">
              <a
                className="rounded-lg px-3 py-2 transition hover:bg-viara-lavender"
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                className="rounded-lg px-3 py-2 transition hover:bg-viara-lavender"
                href="#audience"
                onClick={() => setMobileMenuOpen(false)}
              >
                Who It's For
              </a>
              <a
                className="rounded-lg px-3 py-2 transition hover:bg-viara-lavender"
                href="#companion"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Financial Companion
              </a>
              <a
                className="rounded-lg px-3 py-2 transition hover:bg-viara-lavender"
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
              >
                Goal Calculator
              </a>
              <a
                className="rounded-lg px-3 py-2 transition hover:bg-viara-lavender"
                href="#difference"
                onClick={() => setMobileMenuOpen(false)}
              >
                The Viara Difference
              </a>
              <a
                className="rounded-lg px-3 py-2 transition hover:bg-viara-lavender"
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
              >
                Frequently Asked Questions
              </a>
              <div className="mt-2 flex flex-col gap-2 border-t border-viara-border pt-3">
                <Link
                  className="rounded-lg px-3 py-2 font-medium text-viara-primary-text hover:bg-viara-lavender"
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-viara-brand px-4 text-sm font-semibold text-white"
                  to="/onboarding"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get started <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* ── 1. Hero Section ────────────────────────────────────────── */}
      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-10 sm:px-8 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12 lg:pb-28 lg:pt-14">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-viara-border bg-viara-surface px-3.5 py-2 text-xs font-medium text-viara-accent shadow-xs">
            <span className="size-2 rounded-full bg-viara-accent animate-pulse" />
            A clearer relationship with your money
          </p>
          <h1 className="max-w-2xl text-[2.85rem] font-semibold leading-[1.04] tracking-[-0.065em] text-viara-primary-text sm:text-6xl lg:text-[4.25rem]">
            Money makes more sense when you can <em className="font-serif font-medium text-viara-accent">see it clearly.</em>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-viara-secondary-text sm:text-lg sm:leading-8">
            Understand your spending, make room for what matters, and build steadier money habits — one small step at a time.
            No judgment, no invasive bank connections.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-viara-brand px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-viara-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-viara-accent"
              to="/onboarding"
            >
              Start your journey <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-viara-border bg-viara-surface px-4 text-sm font-semibold text-viara-primary-text transition hover:bg-viara-lavender"
              to="/dashboard"
            >
              Explore the preview <ArrowDownRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-viara-secondary-text">
            {['You stay in control', 'No bank connection needed', 'Start at your own pace', 'Free for young earners'].map(
              (item) => (
                <span className="inline-flex items-center gap-1.5" key={item}>
                  <Check aria-hidden="true" className="text-viara-accent" size={15} />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Hero Visual Card */}
        <div
          aria-label="Illustration of a calm financial overview"
          className="relative mx-auto w-full max-w-[520px]"
          role="img"
        >
          <div className="absolute -left-10 top-16 size-36 rounded-full bg-viara-lavender/70 blur-3xl" />
          <div className="absolute -right-8 bottom-12 size-40 rounded-full bg-viara-lavender/80 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-viara-border bg-viara-surface p-5 shadow-[0_28px_90px_-48px_rgba(37,36,91,0.18)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-viara-secondary-text">Your money, made clearer</p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-viara-primary-text">October Overview</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-viara-lavender px-3 py-1.5 text-[11px] font-medium text-viara-accent">
                <Lock size={12} /> Private by design
              </span>
            </div>

            {/* Calculated summary widget */}
            <div className="mt-6 rounded-2xl bg-viara-background p-5 border border-viara-border/60">
              <div className="flex items-center justify-between">
                <p className="text-xs text-viara-secondary-text">Calculated Available Balance</p>
                <span className="text-[10px] uppercase tracking-wider text-viara-accent font-semibold">Deterministic</span>
              </div>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-viara-primary-text">
                ₦142,500<span className="text-sm font-normal text-viara-secondary-text">.00</span>
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs">
                <span className="text-viara-success font-medium inline-flex items-center gap-1">
                  <TrendingUp size={13} /> +₦210,000 recorded
                </span>
                <span className="text-viara-secondary-text">•</span>
                <span className="text-viara-secondary-text">-₦67,500 spent</span>
              </div>

              {/* Pacing bar chart representation */}
              <div className="mt-5 flex h-20 items-end gap-1.5" aria-hidden="true">
                {[32, 48, 38, 62, 52, 78, 65, 88, 70, 84, 75, 94].map((height, index) => (
                  <div className="flex-1 flex flex-col items-center gap-1" key={index}>
                    <span
                      className={`w-full rounded-t-md transition-all ${
                        index === 11 ? 'bg-viara-accent' : 'bg-viara-lavender'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-viara-secondary-text">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span className="font-semibold text-viara-accent">Today</span>
              </div>
            </div>

            {/* Two mini preview widgets */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-viara-border p-4 bg-viara-surface">
                <span className="grid size-8 place-items-center rounded-lg bg-viara-lavender text-viara-accent">
                  <ChartNoAxesCombined aria-hidden="true" size={16} />
                </span>
                <p className="mt-3 text-xs font-semibold text-viara-primary-text">Spending, understood</p>
                <p className="mt-1 text-[11px] leading-4 text-viara-secondary-text">Essentials 62% • Flexible 18%</p>
              </div>
              <div className="rounded-2xl border border-viara-border p-4 bg-viara-surface">
                <span className="grid size-8 place-items-center rounded-lg bg-viara-lavender text-viara-accent">
                  <PiggyBank aria-hidden="true" size={16} />
                </span>
                <p className="mt-3 text-xs font-semibold text-viara-primary-text">Emergency Goal</p>
                <p className="mt-1 text-[11px] leading-4 text-viara-accent font-medium">₦95,000 of ₦150,000</p>
              </div>
            </div>
          </div>

          {/* Floating gentle AI check-in badge */}
          <div className="absolute -bottom-6 -left-3 hidden rounded-2xl border border-viara-border bg-viara-surface p-4 shadow-xl sm:block max-w-[320px]">
            <div className="flex items-center gap-2 text-viara-accent">
              <Sparkles size={15} />
              <p className="text-xs font-semibold">Gentle Observation</p>
            </div>
            <p className="mt-1 text-xs text-viara-secondary-text leading-relaxed">
              "You have ₦18,000 in your flexible envelope this week with zero pressure on your rent goal."
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Who Viara is Built For (Audience & Real Context) ──── */}
      <section className="border-t border-viara-border bg-viara-surface py-16 sm:py-20 lg:py-24" id="audience">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-viara-accent">
              Designed for real life
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-viara-primary-text sm:text-4xl">
              Built for irregular income, variable gigs, and real ambitions.
            </h2>
            <p className="mt-4 text-base leading-7 text-viara-secondary-text">
              Traditional banking apps assume an identical 9-to-5 paycheck on the last Friday of every month. Viara is
              built around the reality of how young people actually earn and manage cashflow.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map(({ icon: Icon, tag, title, description, quote }) => (
              <article
                className="flex flex-col justify-between rounded-2xl border border-viara-border bg-viara-background p-6 transition hover:border-viara-accent/50 hover:shadow-sm"
                key={title}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-viara-lavender text-viara-accent">
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full bg-viara-surface border border-viara-border px-2.5 py-1 text-[11px] font-medium text-viara-secondary-text">
                      {tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-viara-primary-text">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-viara-secondary-text">{description}</p>
                </div>
                <div className="mt-6 border-t border-viara-border/80 pt-4">
                  <p className="text-xs italic text-viara-secondary-text">"{quote}"</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Four Core Capabilities (Interactive Feature Deep Dive) ─ */}
      <section className="border-t border-viara-border py-16 sm:py-20 lg:py-24" id="features">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-viara-accent">
              Core Capabilities
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-viara-primary-text sm:text-4xl">
              Simple, deliberate tools. Zero unnecessary friction.
            </h2>
            <p className="mt-4 text-base leading-7 text-viara-secondary-text">
              We left out complex trading graphs, credit card spam, and guilt-inducing alarms. Everything here is
              designed to bring you clarity and peace of mind.
            </p>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="mt-10 flex flex-wrap gap-2 border-b border-viara-border pb-4">
            {featureTabs.map((tab, index) => {
              const TabIcon = tab.icon
              const isActive = activeTab === index
              return (
                <button
                  aria-selected={isActive}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-viara-brand text-white shadow-xs'
                      : 'bg-viara-surface text-viara-secondary-text hover:bg-viara-lavender hover:text-viara-primary-text'
                  }`}
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  role="tab"
                  type="button"
                >
                  <TabIcon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Active Tab Panel */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold tracking-tight text-viara-primary-text">
                {featureTabs[activeTab].title}
              </h3>
              <p className="text-base leading-7 text-viara-secondary-text">
                {featureTabs[activeTab].description}
              </p>
              <ul className="space-y-3">
                {featureTabs[activeTab].bullets.map((bullet) => (
                  <li className="flex items-start gap-3 text-sm text-viara-primary-text" key={bullet}>
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-viara-lavender text-viara-accent">
                      <Check size={12} />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Link
                  className="inline-flex items-center gap-2 text-sm font-semibold text-viara-accent hover:underline"
                  to="/onboarding"
                >
                  Experience this in Viara <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Feature Mockup Preview Card */}
            <div className="rounded-3xl border border-viara-border bg-viara-surface p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-viara-border pb-4">
                <div>
                  <p className="text-xs font-semibold text-viara-secondary-text uppercase tracking-wider">
                    Feature Preview
                  </p>
                  <p className="text-base font-semibold text-viara-primary-text">
                    {featureTabs[activeTab].preview.title}
                  </p>
                </div>
                <span className="rounded-full bg-viara-lavender px-3 py-1 text-xs font-medium text-viara-accent">
                  {featureTabs[activeTab].preview.badge}
                </span>
              </div>

              {/* Dynamic preview content based on tab */}
              <div className="mt-6">
                {featureTabs[activeTab].preview.type === 'tracking' && (
                  <div className="space-y-3">
                    {featureTabs[activeTab].preview.items?.map((item) => (
                      <div
                        className="flex items-center justify-between rounded-xl border border-viara-border bg-viara-background p-3.5"
                        key={item.label}
                      >
                        <div>
                          <p className="text-sm font-semibold text-viara-primary-text">{item.label}</p>
                          <p className="text-xs text-viara-secondary-text">{item.cat}</p>
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            item.type === 'in' ? 'text-viara-success' : 'text-viara-primary-text'
                          }`}
                        >
                          {item.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {featureTabs[activeTab].preview.type === 'budgeting' && (
                  <div className="space-y-4">
                    {featureTabs[activeTab].preview.envelopes?.map((env) => (
                      <div className="rounded-xl border border-viara-border bg-viara-background p-4" key={env.name}>
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-viara-primary-text">{env.name}</span>
                          <span className="text-viara-secondary-text">{env.cap}</span>
                        </div>
                        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-viara-lavender">
                          <div
                            className={`h-full rounded-full ${env.color}`}
                            style={{ width: `${env.used}%` }}
                          />
                        </div>
                        <p className="mt-2 text-[11px] text-viara-secondary-text">
                          {env.used}% allocated • ₦{env.used > 70 ? 'Tight buffer' : 'Healthy pace'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {featureTabs[activeTab].preview.type === 'goals' && (
                  <div className="space-y-4">
                    {featureTabs[activeTab].preview.goals?.map((goal) => (
                      <div className="rounded-xl border border-viara-border bg-viara-background p-4" key={goal.name}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-viara-primary-text">{goal.name}</span>
                          <span className="text-viara-accent font-semibold">{goal.pct}%</span>
                        </div>
                        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-viara-lavender">
                          <div
                            className="h-full rounded-full bg-viara-accent"
                            style={{ width: `${goal.pct}%` }}
                          />
                        </div>
                        <div className="mt-2 flex justify-between text-[11px] text-viara-secondary-text">
                          <span>{goal.current} saved</span>
                          <span>Target: {goal.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {featureTabs[activeTab].preview.type === 'analytics' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {featureTabs[activeTab].preview.stats?.map((stat) => (
                        <div
                          className="rounded-xl border border-viara-border bg-viara-background p-3 text-center"
                          key={stat.label}
                        >
                          <p className="text-[11px] text-viara-secondary-text">{stat.label}</p>
                          <p className="mt-1 text-sm font-semibold text-viara-primary-text">{stat.val}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-viara-border bg-viara-background p-4 text-xs text-viara-secondary-text">
                      <p className="font-semibold text-viara-primary-text mb-1">Deterministic guarantee:</p>
                      Viara never guesses account balances. Every number is calculated transparently from transactions
                      you choose to record.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. The AI Financial Companion (Conversational Support) ─── */}
      <section className="border-t border-viara-border bg-viara-surface py-16 sm:py-20 lg:py-24" id="companion">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-viara-accent">
                AI Decision Support
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-viara-primary-text sm:text-4xl">
                Ask questions naturally. Get grounded, compassionate answers.
              </h2>
              <p className="mt-4 text-base leading-7 text-viara-secondary-text">
                Viara's conversational companion does not preach, scold, or sell credit cards. It helps you navigate
                real-life trade-offs, understand where your money went, and prepare for upcoming goals.
              </p>

              {/* Ethics / Principles Pills */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-viara-lavender text-viara-accent">
                    <ShieldCheck size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-viara-primary-text">Grounded in your actual records</p>
                    <p className="text-xs text-viara-secondary-text">
                      No speculative stock tips or fabricated balance forecasts. Answers reflect only what you record.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-viara-lavender text-viara-accent">
                    <Lightbulb size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-viara-primary-text">Non-judgmental & respectful</p>
                    <p className="text-xs text-viara-secondary-text">
                      No guilt trips when plans change. Guidance is offered as calm suggestions, not mandatory rules.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-viara-lavender text-viara-accent">
                    <Lock size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-viara-primary-text">Completely confidential</p>
                    <p className="text-xs text-viara-secondary-text">
                      Your financial entries are never shared or used to train public models.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Chat Demo */}
            <div className="rounded-3xl border border-viara-border bg-viara-background p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-viara-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-viara-brand text-white">
                    <Bot size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-viara-primary-text">Viara Companion</p>
                    <p className="text-xs text-viara-accent">Interactive Demo</p>
                  </div>
                </div>
                <span className="rounded-full bg-viara-lavender px-3 py-1 text-[11px] font-medium text-viara-accent">
                  Context-Aware
                </span>
              </div>

              {/* Question selector tabs */}
              <div className="mt-5">
                <p className="text-xs font-semibold text-viara-secondary-text uppercase tracking-wider mb-2">
                  Select a prompt to preview:
                </p>
                <div className="flex flex-col gap-2">
                  {aiPrompts.map((p, idx) => (
                    <button
                      className={`text-left rounded-xl px-3.5 py-2.5 text-xs font-medium transition border ${
                        activeAiIndex === idx
                          ? 'border-viara-accent bg-viara-surface text-viara-primary-text shadow-xs'
                          : 'border-viara-border bg-viara-surface/60 text-viara-secondary-text hover:bg-viara-surface'
                      }`}
                      key={idx}
                      onClick={() => setActiveAiIndex(idx)}
                      type="button"
                    >
                      "{p.userQuestion}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat messages */}
              <div className="mt-6 space-y-4 rounded-2xl border border-viara-border bg-viara-surface p-5">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-viara-brand px-4 py-3 text-xs leading-5 text-white">
                    {aiPrompts[activeAiIndex].userQuestion}
                  </div>
                </div>

                {/* AI Message */}
                <div className="flex gap-3">
                  <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-viara-lavender text-viara-accent">
                    <Sparkles size={14} />
                  </div>
                  <div className="max-w-[90%] rounded-2xl rounded-tl-xs bg-viara-background border border-viara-border px-4 py-3 text-xs leading-5 text-viara-primary-text whitespace-pre-line">
                    {aiPrompts[activeAiIndex].aiResponse}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Interactive Goal & Savings Calculator ───────────────── */}
      <section className="border-t border-viara-border py-16 sm:py-20 lg:py-24" id="calculator">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-viara-accent">
              Interactive habit simulator
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-viara-primary-text sm:text-4xl">
              See how small, consistent steps add up.
            </h2>
            <p className="mt-4 text-base leading-7 text-viara-secondary-text">
              Saving doesn’t require massive sacrifices. Choose a goal and see how steady allocations bring clarity and
              peace of mind.
            </p>
          </div>

          <div className="mt-12 mx-auto max-w-3xl rounded-3xl border border-viara-border bg-viara-surface p-6 shadow-sm sm:p-10">
            {/* Goal preset buttons */}
            <div>
              <label className="text-xs font-semibold text-viara-secondary-text uppercase tracking-wider">
                Select your target milestone
              </label>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {savingsPresets.map((preset, index) => (
                  <button
                    className={`rounded-xl border p-3 text-left transition ${
                      selectedGoalIndex === index
                        ? 'border-viara-accent bg-viara-lavender/50 text-viara-primary-text ring-1 ring-viara-accent'
                        : 'border-viara-border bg-viara-background text-viara-secondary-text hover:bg-viara-surface'
                    }`}
                    key={preset.label}
                    onClick={() => setSelectedGoalIndex(index)}
                    type="button"
                  >
                    <p className="text-xs font-semibold">{preset.label}</p>
                    <p className="mt-1 text-xs font-medium text-viara-accent">₦{preset.target.toLocaleString()}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-viara-secondary-text uppercase tracking-wider" htmlFor="monthly-saving-range">
                  Monthly contribution pace
                </label>
                <span className="text-lg font-bold text-viara-primary-text">
                  ₦{monthlyContribution.toLocaleString()}<span className="text-xs font-normal text-viara-secondary-text"> / month</span>
                </span>
              </div>
              <input
                className="mt-3 w-full accent-viara-accent cursor-pointer"
                id="monthly-saving-range"
                max={75000}
                min={5000}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                step={5000}
                type="range"
                value={monthlyContribution}
              />
              <div className="mt-1.5 flex justify-between text-[11px] text-viara-secondary-text">
                <span>₦5,000 / mo</span>
                <span>₦40,000 / mo</span>
                <span>₦75,000 / mo</span>
              </div>
            </div>

            {/* Result callout */}
            <div className="mt-8 rounded-2xl bg-viara-background border border-viara-border p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-viara-accent">
                  Estimated Timeline
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-viara-primary-text">
                  {monthsToReach} {monthsToReach === 1 ? 'Month' : 'Months'}
                </p>
                <p className="mt-1 text-xs text-viara-secondary-text">
                  At ₦{monthlyContribution.toLocaleString()}/month to reach your ₦{activeGoal.target.toLocaleString()}{' '}
                  milestone.
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-viara-brand px-5 text-sm font-semibold text-white shadow-xs transition hover:bg-viara-brand/90"
                  to="/onboarding"
                >
                  Track this goal in Viara <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. How Viara Works (Three-Step Flow) ────────────────────── */}
      <section className="border-t border-viara-border bg-viara-surface py-16 sm:py-20 lg:py-24" id="how-it-works">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-viara-accent">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-viara-primary-text sm:text-4xl">
              Three deliberate steps to financial calm.
            </h2>
            <p className="mt-4 text-base leading-7 text-viara-secondary-text">
              No complicated onboarding, no syncing delays, and no algorithmic assumptions about your life.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                num: '01',
                title: 'Log at your own rhythm',
                text: 'Record your earnings and expenses manually in a few taps. No third-party bank scraping, no BVN disclosure, zero security anxiety.',
                icon: Wallet,
              },
              {
                num: '02',
                title: 'See your real position',
                text: 'Viara deterministically calculates your available balance, category distributions, and goal pacing without guessing or estimates.',
                icon: Compass,
              },
              {
                num: '03',
                title: 'Grow with calm guidance',
                text: 'Use the AI companion to ask questions, explore upcoming trade-offs, and develop financial discipline that actually sticks.',
                icon: Sparkles,
              },
            ].map(({ num, title, text, icon: Icon }) => (
              <div className="rounded-2xl border border-viara-border bg-viara-background p-7" key={num}>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-viara-lavender text-viara-accent">
                    <Icon size={19} />
                  </span>
                  <span className="text-xs font-bold text-viara-secondary-text">{num}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-viara-primary-text">{title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-viara-secondary-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. The Viara Difference (Comparison) ──────────────────── */}
      <section className="border-t border-viara-border py-16 sm:py-20 lg:py-24" id="difference">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-viara-accent">
              The Viara Difference
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-viara-primary-text sm:text-4xl">
              Why people choose Viara over traditional finance apps.
            </h2>
            <p className="mt-4 text-base leading-7 text-viara-secondary-text">
              We designed Viara to fix what makes standard personal finance tools so stressful and ineffective.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-viara-border bg-viara-surface shadow-xs">
            <div className="grid grid-cols-1 divide-y divide-viara-border md:grid-cols-3 md:divide-x md:divide-y-0">
              {/* Header column on mobile / left */}
              <div className="p-6 sm:p-8 bg-viara-background/60">
                <p className="text-xs font-semibold text-viara-secondary-text uppercase tracking-wider">Design Focus</p>
                <h3 className="mt-2 text-xl font-semibold text-viara-primary-text">A companion, not a creditor</h3>
                <p className="mt-3 text-xs leading-6 text-viara-secondary-text">
                  Most apps want to sell loans, credit lines, or monetize your transaction data. Viara is an educational
                  companion built to foster clarity and self-sufficiency.
                </p>
              </div>

              {/* Traditional Apps Column */}
              <div className="p-6 sm:p-8">
                <span className="inline-block rounded-full bg-viara-danger-bg px-3 py-1 text-xs font-medium text-viara-danger">
                  Traditional Finance Apps
                </span>
                <ul className="mt-6 space-y-4 text-xs leading-5 text-viara-secondary-text">
                  <li className="flex items-start gap-2">
                    <span className="text-viara-danger shrink-0 font-bold">✕</span>
                    Demands online banking passwords, BVN, and full transaction scraping
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-viara-danger shrink-0 font-bold">✕</span>
                    Assumes rigid monthly 9-to-5 salaries and fails with gig cashflow
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-viara-danger shrink-0 font-bold">✕</span>
                    Harsh red badges, alarms, and guilt-inducing notifications
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-viara-danger shrink-0 font-bold">✕</span>
                    Promotes high-interest quick loans and partner financial products
                  </li>
                </ul>
              </div>

              {/* Viara Column */}
              <div className="p-6 sm:p-8 bg-viara-lavender/20">
                <span className="inline-block rounded-full bg-viara-lavender px-3 py-1 text-xs font-semibold text-viara-accent">
                  The Viara Way
                </span>
                <ul className="mt-6 space-y-4 text-xs leading-5 text-viara-primary-text font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-viara-accent shrink-0 font-bold">✓</span>
                    100% manual, private by design; zero bank links or passwords
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-viara-accent shrink-0 font-bold">✓</span>
                    Tailored for irregular, freelance, and multiple income streams
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-viara-accent shrink-0 font-bold">✓</span>
                    Calm, compassionate observations that encourage healthy discipline
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-viara-accent shrink-0 font-bold">✓</span>
                    Pure educational support with zero loan ads or sponsored spam
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Real Reflections / Testimonials ─────────────────────── */}
      <section className="border-t border-viara-border bg-viara-surface py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-viara-accent">
              Early Reflections
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-viara-primary-text sm:text-4xl">
              Trusted by young earners building steadier habits.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                name: 'Tobi A.',
                role: 'Freelance Brand Designer, Lagos',
                quote:
                  'Every other budgeting app broke because my client payments never come on the 25th. Viara is the first companion that lets me budget by milestone without screaming in red when dates fluctuate.',
              },
              {
                name: 'Chidinma O.',
                role: 'NYSC Member, Abuja',
                quote:
                  'Living on the monthly government stipend felt like a constant gamble. With Viara, I was able to build a three-month cushion before passing out of service. It kept me grounded.',
              },
              {
                name: 'Kelechi E.',
                role: 'Junior Frontend Developer, Ibadan',
                quote:
                  'I refuse to give financial apps my banking passwords. Viara’s manual logging takes me 10 seconds a day, and the AI answers give actual context instead of meaningless pie charts.',
              },
            ].map(({ name, role, quote }) => (
              <div className="flex flex-col justify-between rounded-2xl border border-viara-border bg-viara-background p-6" key={name}>
                <p className="text-xs leading-6 text-viara-secondary-text">"{quote}"</p>
                <div className="mt-6 border-t border-viara-border pt-4">
                  <p className="text-sm font-semibold text-viara-primary-text">{name}</p>
                  <p className="text-[11px] text-viara-secondary-text">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Frequently Asked Questions (Accordion) ───────────────── */}
      <section className="border-t border-viara-border py-16 sm:py-20 lg:py-24" id="faq">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-viara-accent">
              Got Questions?
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-viara-primary-text sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base leading-7 text-viara-secondary-text">
              Everything you need to know about Viara, privacy, and how it works.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  className="rounded-2xl border border-viara-border bg-viara-surface transition"
                  key={faq.q}
                >
                  <button
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-viara-primary-text sm:p-6"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    type="button"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-lg bg-viara-lavender text-viara-accent transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs leading-6 text-viara-secondary-text border-t border-viara-border/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 10. Final Call to Action ────────────────────────────────── */}
      <section className="border-t border-viara-border bg-viara-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl bg-viara-brand px-6 py-14 text-white sm:px-12 sm:py-20 lg:px-16">
            <div className="absolute -right-16 -top-16 size-80 rounded-full bg-viara-accent/25 blur-3xl" />
            <div className="absolute -left-12 -bottom-12 size-72 rounded-full bg-viara-accent/20 blur-3xl" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-viara-lavender backdrop-blur-sm">
                <Sparkles size={13} /> Begin your journey today
              </span>
              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Step into a calmer relationship with your money.
              </h2>
              <p className="mt-5 text-sm leading-7 text-viara-lavender/90 sm:text-base sm:leading-8">
                Join young professionals, students, and freelancers who are replacing financial anxiety with steady,
                intentional habits. Completely private. No bank link required.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-viara-brand shadow-sm transition hover:bg-viara-lavender focus-visible:outline-2 focus-visible:outline-white"
                  to="/onboarding"
                >
                  Start your journey <ArrowRight size={17} />
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                  to="/dashboard"
                >
                  Explore preview <ArrowDownRight size={17} />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-viara-lavender/80">
                <span className="inline-flex items-center gap-1.5">
                  <Check size={14} /> 100% Free to use
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check size={14} /> Zero bank account syncing
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check size={14} /> Start in under two minutes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Comprehensive Footer ────────────────────────────────── */}
      <footer className="border-t border-viara-border bg-viara-background py-14 text-xs text-viara-secondary-text">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Col 1: Brand & Mission */}
            <div className="space-y-4">
              <Brand />
              <p className="leading-6 max-w-xs">
                An intelligent, privacy-first personal finance companion designed for young people to understand their
                money and build sustainable habits.
              </p>
              <p className="text-[11px] text-viara-accent font-medium">
                Built to help you understand your money, not move it.
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <p className="text-xs font-semibold text-viara-primary-text uppercase tracking-wider">Product</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a className="hover:text-viara-brand transition" href="#features">
                    Core Capabilities
                  </a>
                </li>
                <li>
                  <a className="hover:text-viara-brand transition" href="#audience">
                    Who It's For
                  </a>
                </li>
                <li>
                  <a className="hover:text-viara-brand transition" href="#companion">
                    AI Financial Companion
                  </a>
                </li>
                <li>
                  <a className="hover:text-viara-brand transition" href="#calculator">
                    Savings Calculator
                  </a>
                </li>
                <li>
                  <Link className="hover:text-viara-brand transition" to="/dashboard">
                    Dashboard Preview
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Principles & Privacy */}
            <div>
              <p className="text-xs font-semibold text-viara-primary-text uppercase tracking-wider">Trust & Ethics</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <span className="hover:text-viara-brand transition cursor-default">
                    Privacy-by-Design
                  </span>
                </li>
                <li>
                  <span className="hover:text-viara-brand transition cursor-default">
                    No Bank Account Syncing
                  </span>
                </li>
                <li>
                  <span className="hover:text-viara-brand transition cursor-default">
                    Non-Judgmental Guidance
                  </span>
                </li>
                <li>
                  <span className="hover:text-viara-brand transition cursor-default">
                    Deterministic Financial Logic
                  </span>
                </li>
                <li>
                  <Link className="hover:text-viara-brand transition" to="/login">
                    Account Sign In
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Academic Pedigree */}
            <div>
              <p className="text-xs font-semibold text-viara-primary-text uppercase tracking-wider">Research Initiative</p>
              <p className="mt-4 leading-relaxed">
                Developed as part of an undergraduate research project titled:
              </p>
              <p className="mt-2 font-medium text-viara-primary-text italic">
                "Design and Implementation of an AI-Powered Personal Finance Assistant"
              </p>
              <p className="mt-3 text-[11px] leading-5">
                Exploring how AI improves financial literacy, budgeting behavior, and decision-making for young adults.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-viara-border pt-8 text-[11px] sm:flex-row">
            <p>© 2026 Viara. All rights reserved.</p>
            <p className="text-center sm:text-right">
              Viara is an educational and informational personal finance companion, not a licensed banking institution
              or financial adviser.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default LandingPage
