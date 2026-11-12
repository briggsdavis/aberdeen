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
      anchors: { offset: -96 },
      autoRaf: true,
      duration: 1.08,
      easing: (value) => Math.min(1, 1.001 - 2 ** (-10 * value)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 0.88,
    })
    lenisRef.current = lenis

    return () => {
      lenisRef.current = null
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!location.hash) return
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1))
      if (!target) return
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -96, immediate: true, force: true })
      } else {
        target.scrollIntoView({ behavior: "instant", block: "start" })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])

  return children
}

export default SmoothScroll
