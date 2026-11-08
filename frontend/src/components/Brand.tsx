import { Link } from 'react-router-dom'

type BrandProps = {
  light?: boolean
  to?: string
}

function Brand({ light = false, to = '/' }: BrandProps) {
  return (
    <Link
      aria-label="Viara home"
      className={`inline-flex items-center gap-2.5 font-semibold tracking-[-0.04em] ${
        light ? 'text-white' : 'text-[#173c2c]'
      }`}
      to={to}
    >
      <span className="grid size-9 place-items-center rounded-xl bg-[#dce9df] text-[#315d41]">
        <svg
          aria-hidden="true"
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 17.5 11.5 5l2.2 4.2L18 5l-4.9 14-2.2-4.1L8.7 19 5 17.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      </span>
      <span className="text-xl">viara</span>
    </Link>
  )
}

export default Brand
