import type { CSSProperties } from "react"

type DecorationProps = {
  className?: string
  name:
    | "anchor"
    | "bigship"
    | "lifebuoy"
    | "map"
    | "nautilus"
    | "oyster"
    | "shell"
    | "ship1"
    | "ship2"
  style?: CSSProperties
}

export function Decoration({ className = "", name, style }: DecorationProps) {
  return (
    <img
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${className}`}
      draggable={false}
      loading="lazy"
      src={`/${name}.png`}
      style={style}
    />
  )
}
