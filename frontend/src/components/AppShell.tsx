import {
  ArrowUpRight,
  ChartNoAxesCombined,
  CircleHelp,
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Brand from './Brand'

const navigation = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/analytics', label: 'Analytics', icon: ChartNoAxesCombined },
]

function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f7f9f6] text-[#202821]">
      <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#e6ebe4] bg-white/95 px-4 backdrop-blur sm:px-7 lg:hidden">
        <Brand />
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          className="grid size-10 place-items-center rounded-xl text-[#405247] hover:bg-[#f1f5f0]"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-[#e5ebe3] bg-white px-5 py-6 lg:flex">
        <Brand />
        <div className="mt-8 rounded-xl border border-[#e3ece1] bg-[#f4f8f2] px-3 py-2.5">
          <p className="text-[11px] font-semibold text-[#416348]">Preview mode</p>
          <p className="mt-1 text-[10px] leading-4 text-[#718074]">Not connected to account data</p>
        </div>
        <nav aria-label="Workspace" className="mt-8 space-y-1">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#939d94]">
            Your space
          </p>
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink
              className={({ isActive }) =>
                `flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#edf4eb] text-[#285337]'
                    : 'text-[#68766b] hover:bg-[#f6f8f5] hover:text-[#314a38]'
                }`
              }
              key={to}
              onClick={() => setMenuOpen(false)}
              to={to}
            >
              <Icon aria-hidden="true" size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-[#f5f7f3] p-4">
          <CircleHelp aria-hidden="true" className="text-[#66816b]" size={18} />
          <p className="mt-3 text-xs font-semibold text-[#3d5142]">Just exploring?</p>
          <p className="mt-1 text-[11px] leading-5 text-[#758076]">
            This preview has no personal financial data.
          </p>
          <Link className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#3e7048]" to="/">
            Learn about Viara <ArrowUpRight aria-hidden="true" size={13} />
          </Link>
        </div>
      </aside>

      {menuOpen ? (
        <div className="fixed inset-0 z-20 bg-[#173d2b]/20 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 size-full cursor-default"
            onClick={() => setMenuOpen(false)}
            type="button"
          />
          <nav
            aria-label="Workspace"
            className="relative mt-[68px] border-b border-[#e5ebe3] bg-white px-4 py-4 shadow-lg"
          >
            <p className="mb-3 rounded-xl bg-[#f4f8f2] px-3 py-2 text-[11px] text-[#557159]">
              Preview mode — no account data
            </p>
            {navigation.map(({ to, label, icon: Icon }) => (
              <NavLink
                className={({ isActive }) =>
                  `flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium ${
                    isActive ? 'bg-[#edf4eb] text-[#285337]' : 'text-[#68766b]'
                  }`
                }
                key={to}
                onClick={() => setMenuOpen(false)}
                to={to}
              >
                <Icon aria-hidden="true" size={17} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}

      <div className="lg:pl-[248px]">
        <header className="hidden h-[68px] items-center justify-between border-b border-[#e5ebe3] bg-white px-8 lg:flex">
          <div className="text-xs text-[#79847b]">Your financial companion</div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#e3ece1] bg-[#f4f8f2] px-3 py-1.5 text-[11px] font-medium text-[#557159]">
              Preview — no account data
            </span>
            <Link className="text-xs font-medium text-[#4c6151] hover:text-[#1f5137]" to="/login">
              Log in
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-7 pb-10 sm:px-7 sm:py-9 lg:px-9">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppShell
