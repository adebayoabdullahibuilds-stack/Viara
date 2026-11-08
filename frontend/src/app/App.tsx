import { Link, Route, Routes } from 'react-router-dom'

function FoundationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8f6] px-6 py-16 text-[#202821]">
      <section className="w-full max-w-xl">
        <p className="text-sm font-semibold tracking-[0.18em] text-[#42684e]">
          VIARA
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          See your money.
          <br />
          Understand it.
          <br />
          Manage it better.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-[#59635b]">
          Your financial companion is getting ready. The project foundation is
          in place; product features will follow in later phases.
        </p>
        <Link
          className="mt-8 inline-flex rounded-md text-sm font-medium text-[#42684e] underline decoration-[#9ab29e] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42684e]"
          to="/"
        >
          Foundation preview
        </Link>
      </section>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<FoundationPage />} />
      <Route path="*" element={<FoundationPage />} />
    </Routes>
  )
}

export default App
