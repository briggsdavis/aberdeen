import Lenis from "lenis"
import { useEffect, type ReactNode } from "react"

function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.08,
      easing: (value) => Math.min(1, 1.001 - 2 ** (-10 * value)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 0.88,
    })

    let frame = 0
    const update = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(update)
    }

    frame = window.requestAnimationFrame(update)

    return () => {
      window.cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return children
}

export default SmoothScroll
