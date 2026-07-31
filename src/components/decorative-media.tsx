import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react"

type DecorativeBackdropProps = {
  className?: string
  imageClassName?: string
  opacity?: number
  src: string
}

export function DecorativeBackdrop(_props: DecorativeBackdropProps) {
  return null
}

export function ScrollRotatingWheel({ compact = false }: { compact?: boolean }) {
  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, (position) => position * 0.22)

  if (compact) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none mt-2 grid place-items-start pt-2 pb-16"
      >
        <motion.img
          alt=""
          className="no-scroll-reveal h-auto w-[min(60%,15rem)] -translate-y-6 object-contain opacity-60 motion-reduce:!transform-none"
          src="/illustrations/nautical/ship-wheel.png"
          style={{ rotate }}
        />
      </div>
    )
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="sticky top-[12svh] ml-auto grid h-[76svh] w-[min(64vw,58rem)] place-items-center">
        <motion.img
          alt=""
          className="no-scroll-reveal h-full w-full object-contain opacity-60 motion-reduce:!transform-none"
          src="/illustrations/nautical/ship-wheel.png"
          style={{ rotate }}
        />
      </div>
    </div>
  )
}

export function CursorCompass() {
  const compassRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const handlePointerMove = (event: globalThis.PointerEvent) => {
      const rect = compassRef.current?.getBoundingClientRect()
      if (!rect) return
      const footerRect = compassRef.current?.closest("footer")?.getBoundingClientRect()
      if (
        footerRect &&
        (event.clientX < footerRect.left ||
          event.clientX > footerRect.right ||
          event.clientY < footerRect.top ||
          event.clientY > footerRect.bottom)
      ) {
        setRotation(0)
        return
      }

      const x = event.clientX - (rect.left + rect.width / 2)
      const y = event.clientY - (rect.top + rect.height / 2)
      setRotation((Math.atan2(y, x) * 180) / Math.PI + 90)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [])

  return (
    <div aria-hidden="true" className="grid w-full max-w-52 place-items-center" ref={compassRef}>
      <img
        alt=""
        className="aspect-[810/1013] w-full object-contain opacity-60 transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:!transform-none"
        src="/illustrations/nautical/compass-rose-detailed.png"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  )
}
