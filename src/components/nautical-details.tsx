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
