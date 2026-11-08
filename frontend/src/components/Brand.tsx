import { Link } from 'react-router-dom'

type BrandProps = {
  to?: string
}

function Brand({ to = '/' }: BrandProps) {
  return (
    <Link
      aria-label="Viara home"
      className="inline-flex items-center"
      to={to}
    >
      <img alt="" className="h-9 w-auto" src="/viara-logo.png" />
    </Link>
  )
}

export default Brand
