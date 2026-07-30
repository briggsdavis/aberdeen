export const maritimeFlagPatterns = [
  "linear-gradient(90deg,#fff8f0 0 50%,#2a3b92 50% 100%)",
  "conic-gradient(#2a3b92 0 25%,#fff8f0 0 50%,#2a3b92 0 75%,#fff8f0 0)",
  "linear-gradient(45deg,transparent 42%,#d43f2f 42% 58%,transparent 58%),linear-gradient(135deg,transparent 42%,#d43f2f 42% 58%,transparent 58%),#fff8f0",
  "linear-gradient(135deg,#f7b733 0 50%,#d43f2f 50% 100%)",
  "linear-gradient(90deg,transparent 38%,#fff8f0 38% 62%,transparent 62%),linear-gradient(0deg,transparent 38%,#fff8f0 38% 62%,transparent 62%),#2a3b92",
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
    <div
      aria-hidden="true"
      className={`h-3 rounded-full ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg,#2a3b92 0 8px,#fff8f0 8px 16px,#f7b733 16px 24px,#fff8f0 24px 32px)",
      }}
    />
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
