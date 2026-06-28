import {
  type CSSProperties,
  type ElementType,
  type ImgHTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"

/**
 * Scroll-triggered motion kit.
 *
 * - useInView: fire once when an element scrolls into view.
 * - RevealImage: images blur and rise into focus as they enter view.
 * - Rise: titles rise and fade up as they enter view.
 * - ParallaxLayer: a section lags slightly on scroll while the next,
 *   opaque, higher-stacked section wipes up over it (reveal-from-under).
 *
 * Everything is plain IntersectionObserver + inline transforms so it
 * composes with the existing Tailwind classes and ships no new deps.
 */

export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) {
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}

type RevealImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Extra travel distance in px for the rise-in (default 18). */
  rise?: number
}

export function RevealImage({ rise = 18, style, ...props }: RevealImageProps) {
  const { ref, inView } = useInView<HTMLImageElement>()

  const motionStyle: CSSProperties = {
    ...style,
    filter: inView ? "blur(0px)" : "blur(22px)",
    transform: inView ? "translateY(0)" : `translateY(${rise}px)`,
    transition: "filter 1100ms ease, transform 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "filter, transform",
  }

  // oxlint-disable-next-line jsx-a11y/alt-text
  return <img ref={ref} style={motionStyle} {...props} />
}

type RiseProps = {
  as?: ElementType
  className?: string
  children: ReactNode
  /** Delay before the rise begins, in ms. */
  delay?: number
}

export function Rise({ as: Tag = "div", className, children, delay = 0 }: RiseProps) {
  const { ref, inView } = useInView<HTMLElement>()

  const style: CSSProperties = {
    transform: inView ? "translateY(0)" : "translateY(42px)",
    opacity: inView ? 1 : 0,
    transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 900ms ease ${delay}ms`,
    willChange: "transform, opacity",
  }

  return (
    <Tag className={className} ref={ref} style={style}>
      {children}
    </Tag>
  )
}

type ParallaxLayerProps = {
  /** Paint order: higher index sits on top and wipes over lower ones. */
  index: number
  children: ReactNode
}

export function ParallaxLayer({ index, children }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) {
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const past = Math.min(Math.max(-rect.top, 0), 600)
      const offset = Math.min(past * 0.12, 80)
      el.style.transform = `translate3d(0, ${offset}px, 0)`
    }
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) {
        cancelAnimationFrame(frame)
      }
    }
  }, [])

  return (
    <div ref={ref} style={{ position: "relative", zIndex: index + 1, willChange: "transform" }}>
      {children}
    </div>
  )
}
