import Lenis from "lenis"
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react"
import { useLocation } from "react-router"

function SmoothScroll({ children }: { children: ReactNode }) {
  const location = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useLayoutEffect(() => {
    lenisRef.current?.scrollTo(0, { force: true, immediate: true })
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [location.pathname])

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
    lenisRef.current = lenis

    let frame = 0
    const update = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(update)
    }

    frame = window.requestAnimationFrame(update)

    return () => {
      window.cancelAnimationFrame(frame)
      lenisRef.current = null
      lenis.destroy()
    }
  }, [])

  return children
}

export default SmoothScroll
