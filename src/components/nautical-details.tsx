export const maritimeFlagPatterns = [
  "linear-gradient(90deg,var(--color-oyster-white) 0 50%,var(--color-aberdeen-blue) 50% 100%)",
  "conic-gradient(var(--color-aberdeen-blue) 0 25%,var(--color-oyster-white) 0 50%,var(--color-aberdeen-blue) 0 75%,var(--color-oyster-white) 0)",
  "linear-gradient(45deg,transparent 42%,var(--color-nautical-red) 42% 58%,transparent 58%),linear-gradient(135deg,transparent 42%,var(--color-nautical-red) 42% 58%,transparent 58%),var(--color-oyster-white)",
  "linear-gradient(135deg,var(--color-citrus) 0 50%,var(--color-nautical-red) 50% 100%)",
  "linear-gradient(90deg,transparent 38%,var(--color-oyster-white) 38% 62%,transparent 62%),linear-gradient(0deg,transparent 38%,var(--color-oyster-white) 38% 62%,transparent 62%),var(--color-aberdeen-blue)",
]

export function MaritimeFlags({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex gap-2 ${className}`}>
      {maritimeFlagPatterns.map((background) => (
        <span className="h-8 w-8" key={background} style={{ background }} />
      ))}
    </div>
  )
}

export function RopeDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`hidden ${className}`} data-cms-structure="rope-divider" />
  )
}

export function PhotoCorners() {
  return null
}

export function Postmark() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-1.5">
      <span className="h-px w-24 bg-aberdeen-blue/45" />
      <span className="h-px w-20 bg-aberdeen-blue/45" />
      <span className="h-px w-24 bg-aberdeen-blue/45" />
    </div>
  )
}

export function NauticalCoordinates({
  className = "",
  light = false,
}: {
  className?: string
  light?: boolean
}) {
  return (
    <div
      aria-label="Savannah coordinates: 32 degrees 4 minutes 52 seconds north, 81 degrees 5 minutes 28 seconds west"
      className={`inline-flex items-center gap-3 font-utility text-[0.65rem] tracking-[0.18em] uppercase ${
        light ? "text-aberdeen-peach" : "text-aberdeen-blue"
      } ${className}`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      <span>32° 04′ 52″ N</span>
      <span aria-hidden="true" className="h-1 w-1 rotate-45 border border-current" />
      <span>81° 05′ 28″ W</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
    </div>
  )
}
