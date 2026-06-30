import {
  createContext,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { motion } from "motion/react"
import {
  createPath,
  Link,
  useLocation,
  useNavigate,
  type LinkProps,
  type NavigateOptions,
  type To,
} from "react-router"

type TransitionPhase = "idle" | "enter" | "hold" | "exit"

type PageTransitionContextValue = {
  startPageTransition: (to: To, options?: NavigateOptions) => Promise<void>
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

const enterDuration = 0.65
const holdDuration = 0.3
const exitDuration = 0.65

const sleep = (seconds: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, seconds * 1000)
  })

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}

function toPath(to: To) {
  return typeof to === "string" ? to : createPath(to)
}

function shouldHandleClick(event: MouseEvent<HTMLAnchorElement>, target?: string) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    (!target || target === "_self")
  )
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<TransitionPhase>("idle")
  const isTransitioning = useRef(false)
  const location = useLocation()
  const navigate = useNavigate()
  const prefersReducedMotion = usePrefersReducedMotion()

  const startPageTransition = useCallback(
    async (to: To, options?: NavigateOptions) => {
      if (isTransitioning.current) {
        return
      }

      const currentPath = createPath(location)
      const nextPath = toPath(to)

      if (currentPath === nextPath || prefersReducedMotion) {
        navigate(to, options)
        return
      }

      isTransitioning.current = true
      setPhase("enter")
      await sleep(enterDuration)
      setPhase("hold")
      navigate(to, options)
      await sleep(holdDuration)
      setPhase("exit")
      await sleep(exitDuration)
      setPhase("idle")
      isTransitioning.current = false
    },
    [location, navigate, prefersReducedMotion],
  )

  const contextValue = useMemo(() => ({ startPageTransition }), [startPageTransition])

  return (
    <PageTransitionContext value={contextValue}>
      {children}
      {phase !== "idle" ? (
        <motion.div
          animate={{ y: phase === "exit" ? "-100%" : "0%" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-aberdeen-blue"
          initial={{ y: "100%" }}
          transition={{
            duration: phase === "hold" ? 0 : phase === "exit" ? exitDuration : enterDuration,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <img alt="" className="w-24 md:w-32" src="/standalone-peach.png" />
        </motion.div>
      ) : null}
    </PageTransitionContext>
  )
}

export function TransitionLink({
  onClick,
  preventScrollReset,
  relative,
  reloadDocument,
  replace,
  state,
  target,
  to,
  ...props
}: LinkProps) {
  const transition = useContext(PageTransitionContext)

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event)

      if (
        !transition ||
        event.defaultPrevented ||
        reloadDocument ||
        !shouldHandleClick(event, target)
      ) {
        return
      }

      event.preventDefault()
      void transition.startPageTransition(to, { preventScrollReset, relative, replace, state })
    },
    [onClick, preventScrollReset, relative, reloadDocument, replace, state, target, to, transition],
  )

  return (
    <Link
      onClick={handleClick}
      preventScrollReset={preventScrollReset}
      relative={relative}
      reloadDocument={reloadDocument}
      replace={replace}
      state={state}
      target={target}
      to={to}
      {...props}
    />
  )
}
