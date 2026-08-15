import { useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"
import type { CSSProperties, PointerEvent, ReactNode } from "react"

function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType === "touch") return

  const rect = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 9
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * -9
  event.currentTarget.style.setProperty("--tilt-x", `${x}deg`)
  event.currentTarget.style.setProperty("--tilt-y", `${y}deg`)
}

function resetTilt(event: PointerEvent<HTMLDivElement>) {
  event.currentTarget.style.removeProperty("--tilt-x")
  event.currentTarget.style.removeProperty("--tilt-y")
}

export function ImageTilt({
  children,
  className = "",
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.08, once: true })
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={`image-tilt site-image-reveal ${inView || reduceMotion ? "is-image-revealed" : ""} ${className}`}
      onPointerCancel={resetTilt}
      onPointerLeave={resetTilt}
      onPointerMove={handlePointerMove}
      ref={ref}
      style={style}
    >
      {children}
    </div>
  )
}
