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
  return (
    <div
      className={`image-tilt ${className}`}
      onPointerCancel={resetTilt}
      onPointerLeave={resetTilt}
      onPointerMove={handlePointerMove}
      style={style}
    >
      {children}
    </div>
  )
}
