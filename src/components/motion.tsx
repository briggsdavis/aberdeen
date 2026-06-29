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
 * - Reveal: any element (text or block) fades + blurs + rises into view.
 * - RevealImage: images fade + blur + rise into focus as they enter view.
 * - Rise: headings fade + blur + rise up as they enter view.
 * - ParallaxLayer: a section lags slightly on scroll while the next,
 *   opaque, higher-stacked section wipes up over it (reveal-from-under).
 *
 * Everything fades from fully transparent (opacity 0) so elements appear,
 * rather than only sharpening. Plain IntersectionObserver + inline styles,
 * so it composes with the existing Tailwind classes and ships no new deps.
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
  /** Opacity the image settles at once revealed (default 1). */
  finalOpacity?: number
  /** Delay before the reveal begins, in ms. */
  delay?: number
}

export function RevealImage({
  rise = 18,
  finalOpacity = 1,
  delay = 0,
  style,
  ...props
}: RevealImageProps) {
  const { ref, inView } = useInView<HTMLImageElement>()

  // Opacity runs longer than blur (both start together) so the reveal ends
  // on a fade rather than an opaque image clearing its last px of blur —
  // which is what reads as "just un-blurring".
  const motionStyle: CSSProperties = {
    ...style,
    opacity: inView ? finalOpacity : 0,
    filter: inView ? "blur(0px)" : "blur(18px)",
    transform: inView ? "translateY(0)" : `translateY(${rise}px)`,
    transition: `opacity 1200ms cubic-bezier(0.33, 0, 0.2, 1) ${delay}ms, filter 950ms linear ${delay}ms, transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, filter, transform",
  }

  // oxlint-disable-next-line jsx-a11y/alt-text
  return <img ref={ref} style={motionStyle} {...props} />
}

type RevealProps = {
  as?: ElementType
  className?: string
  children: ReactNode
  /** Vertical travel distance in px (default 24). */
  rise?: number
  /** Peak blur while hidden, in px (default 8). */
  blur?: number
  /** Delay before the reveal begins, in ms. */
  delay?: number
}

/** Fade + blur + rise any element (text or block) into view on scroll. */
export function Reveal({
  as: Tag = "div",
  className,
  children,
  rise = 24,
  blur = 8,
  delay = 0,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    filter: inView ? "blur(0px)" : `blur(${blur}px)`,
    transform: inView ? "translateY(0)" : `translateY(${rise}px)`,
    transition: `opacity 950ms cubic-bezier(0.33, 0, 0.2, 1) ${delay}ms, filter 760ms linear ${delay}ms, transform 950ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, filter, transform",
  }

  return (
    <Tag className={className} ref={ref} style={style}>
      {children}
    </Tag>
  )
}

type RiseProps = {
  as?: ElementType
  className?: string
  children: ReactNode
  /** Delay before the rise begins, in ms. */
  delay?: number
}

/** Headings: a taller, slower fade + blur + rise than Reveal. */
export function Rise({ as: Tag = "div", className, children, delay = 0 }: RiseProps) {
  const { ref, inView } = useInView<HTMLElement>()

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    filter: inView ? "blur(0px)" : "blur(12px)",
    transform: inView ? "translateY(0)" : "translateY(42px)",
    transition: `opacity 1050ms cubic-bezier(0.33, 0, 0.2, 1) ${delay}ms, filter 840ms linear ${delay}ms, transform 1050ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, filter, transform",
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
