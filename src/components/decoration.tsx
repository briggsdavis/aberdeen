import type { CSSProperties } from "react"

type DecorationProps = {
  className?: string
  name:
    | "seagull"
    | "beach-chair"
    | "sea-turtle"
    | "bikini-top"
    | "oyster"
    | "sunscreen-and-cocktail"
    | "sun-hat"
    | "beach-towel"
    | "flip-flops"
  style?: CSSProperties
}

const decorations = new Set<HTMLElement>()
const active = new Set<HTMLElement>()
let frame = 0
let pointer: { x: number; y: number } | null = null

function update() {
  frame = 0
  for (const element of decorations) {
    const rect = element.getBoundingClientRect()
    const inside =
      pointer &&
      pointer.x >= rect.left &&
      pointer.x <= rect.right &&
      pointer.y >= rect.top &&
      pointer.y <= rect.bottom

    if (inside && pointer) {
      const x = ((pointer.x - rect.left) / rect.width - 0.5) * 20
      const y = ((pointer.y - rect.top) / rect.height - 0.5) * -20
      element.style.setProperty("--tilt-x", `${x}deg`)
      element.style.setProperty("--tilt-y", `${y}deg`)
      active.add(element)
    } else if (active.has(element)) {
      element.style.removeProperty("--tilt-x")
      element.style.removeProperty("--tilt-y")
      active.delete(element)
    }
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update)
}

function handlePointerMove(event: PointerEvent) {
  if (event.pointerType === "touch") return
  pointer = { x: event.clientX, y: event.clientY }
  schedule()
}

function handlePointerLeave() {
  pointer = null
  schedule()
}

function register(element: HTMLElement | null) {
  if (!element) return
  if (decorations.size === 0) {
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("scroll", schedule, { passive: true })
    document.documentElement.addEventListener("pointerleave", handlePointerLeave)
  }
  decorations.add(element)

  return () => {
    decorations.delete(element)
    active.delete(element)
    if (decorations.size === 0) {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("scroll", schedule)
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
    }
  }
}

export function Decoration({ className = "", name, style }: DecorationProps) {
  return (
    <img
      ref={register}
      alt=""
      aria-hidden="true"
      className={`tilt-decoration pointer-events-none absolute select-none ${className}`}
      draggable={false}
      loading="lazy"
      src={`/${name}.png`}
      style={style}
    />
  )
}
