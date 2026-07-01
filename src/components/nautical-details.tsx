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
  return (
    <>
      <span className="absolute -top-1 -left-1 z-10 h-14 w-14 bg-[#f6c7b2] [clip-path:polygon(0_0,100%_0,0_100%)]" />
      <span className="absolute -top-1 -right-1 z-10 h-14 w-14 bg-[#f6c7b2] [clip-path:polygon(0_0,100%_0,100%_100%)]" />
      <span className="absolute -bottom-1 -left-1 z-10 h-14 w-14 bg-[#f6c7b2] [clip-path:polygon(0_0,100%_100%,0_100%)]" />
      <span className="absolute -right-1 -bottom-1 z-10 h-14 w-14 bg-[#f6c7b2] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
    </>
  )
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
