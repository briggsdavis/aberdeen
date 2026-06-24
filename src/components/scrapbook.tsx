import type { CSSProperties, ReactNode } from "react"

/**
 * Scrapbook / nautical kit.
 *
 * Builds the "magazine cut-out" collage look on top of the existing
 * blue + peach brand: torn-paper photo mounts, tape, twisted-rope rules,
 * awning stripes, handwritten journal cards, and corner die-cuts.
 *
 * Die-cuts are currently inline SVG so the look works with zero assets.
 * To swap in real transparent PNGs later, pass `src` to <CornerStamp> /
 * <DieCut> instead of an inline SVG child.
 */

type Corner = "tl" | "tr" | "bl" | "br"

const cornerClass: Record<Corner, string> = {
  tl: "top-0 left-0 -translate-x-1/3 -translate-y-1/3",
  tr: "top-0 right-0 translate-x-1/3 -translate-y-1/3",
  bl: "bottom-0 left-0 -translate-x-1/3 translate-y-1/3",
  br: "bottom-0 right-0 translate-x-1/3 translate-y-1/3",
}

/**
 * Mount this once near the root so the torn-edge SVG filter is available.
 * Already rendered by SiteLayout.
 */
export function ScrapbookDefs() {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0" focusable="false">
      <filter id="sb-torn">
        <feTurbulence
          baseFrequency="0.012 0.014"
          numOctaves="3"
          result="noise"
          type="fractalNoise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="9"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}

/** A photo on a torn white paper mat, tilted and dropped like it was glued down. */
export function PhotoMount({
  src,
  alt = "",
  tilt = -2,
  tape,
  corner,
  className = "",
  aspect = "aspect-[4/5]",
}: {
  src: string
  alt?: string
  tilt?: number
  /** show a tape strip; pick which corners */
  tape?: Corner[]
  /** a die-cut tucked into one corner of the photo */
  corner?: { node: ReactNode; at: Corner }
  className?: string
  aspect?: string
}) {
  return (
    <figure
      className={`relative inline-block ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="sb-torn bg-oyster-white p-2.5 sm:p-3">
        <div className={`overflow-hidden ${aspect}`}>
          <img alt={alt} className="h-full w-full object-cover" src={src} />
        </div>
      </div>
      {tape?.map((c) => (
        <Tape at={c} key={c} />
      ))}
      {corner ? (
        <span className={`absolute z-20 ${cornerClass[corner.at]}`}>{corner.node}</span>
      ) : null}
    </figure>
  )
}

/** A short translucent tape strip pinned to a corner. */
export function Tape({ at = "tl" }: { at?: Corner }) {
  const rot = at === "tl" || at === "br" ? -38 : 38
  return (
    <span
      aria-hidden
      className={`sb-tape absolute z-20 h-6 w-20 ${cornerClass[at]}`}
      style={{ transform: `rotate(${rot}deg)` }}
    />
  )
}

/** Absolutely-positioned decoration tucked into a corner of its relative parent. */
export function CornerStamp({
  at,
  size = 88,
  rotate = 0,
  src,
  alt = "",
  children,
  className = "",
}: {
  at: Corner
  size?: number
  rotate?: number
  /** real PNG die-cut; falls back to `children` (inline SVG) when omitted */
  src?: string
  alt?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <span
      aria-hidden={!alt}
      className={`pointer-events-none absolute z-30 ${cornerClass[at]} ${className}`}
      style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}
    >
      {src ? (
        <img alt={alt} className="h-full w-full object-contain drop-shadow-md" src={src} />
      ) : (
        children
      )}
    </span>
  )
}

/** Teal/white awning-stripe band. */
export function StripeBand({
  className = "",
  height = "h-10",
}: {
  className?: string
  height?: string
}) {
  return <div aria-hidden className={`sb-stripes w-full ${height} ${className}`} />
}

/** Twisted red rope rule. */
export function RopeRule({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`sb-rope h-2.5 w-full ${className}`} />
}

/** Handwritten note on a torn paper card. */
export function JournalCard({
  children,
  tilt = 1.5,
  className = "",
  style,
}: {
  children: ReactNode
  tilt?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={`sb-torn bg-paper-cream p-6 md:p-8 ${className}`}
      style={{ transform: `rotate(${tilt}deg)`, ...style }}
    >
      <div className="font-playful text-2xl leading-snug text-kelp-ink md:text-3xl">{children}</div>
    </div>
  )
}

/* ---- Die-cuts (real transparent PNGs in /public/diecuts) ---- */

const stamp = "h-full w-full object-contain drop-shadow-md"

function diecut(src: string, alt: string) {
  return function DieCut({ className = stamp }: { className?: string }) {
    return <img alt={alt} className={className} src={src} />
  }
}

export const Anchor = diecut("/diecuts/anchor.png", "Anchor")
export const ShipWheel = diecut("/diecuts/wheel.png", "Ship's wheel")
export const Shell = diecut("/diecuts/shell-one.png", "Seashell")
export const ShellTwo = diecut("/diecuts/shell-two.png", "Seashell")
export const Sailboat = diecut("/diecuts/sailboat.png", "Sailboat")

/** "SET SAIL"-style die-cut sign, built from type + the anchor cut-out. */
export function SetSailBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 drop-shadow-md ${className}`}>
      <span className="bg-oyster-white px-2 py-1 font-display text-sm tracking-wide text-aberdeen-blue">
        SET
      </span>
      <span className="grid h-9 w-9 place-items-center rounded-full border-4 border-aberdeen-blue bg-oyster-white">
        <Anchor className="h-5 w-5 object-contain" />
      </span>
      <span className="bg-oyster-white px-2 py-1 font-display text-sm tracking-wide text-aberdeen-blue">
        SAIL
      </span>
    </div>
  )
}
