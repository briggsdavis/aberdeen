import { type CSSProperties, useEffect, useState } from "react"
import { type Location, useLocation } from "react-router"

/**
 * Page-navigation curtain.
 *
 * On navigation a solid Aberdeen-blue panel rises from the bottom of the
 * screen, fills it with the circle-A mark centered, then retracts back
 * down to reveal the new page. The new route is swapped in while the
 * screen is fully covered, so the change is never seen mid-animation.
 *
 * Render this with the current location and a render-prop for the routed
 * content; it hands back the *display* location to render so the swap can
 * be held until the curtain is up.
 */

type Stage = "idle" | "rising" | "falling"

const RISE_MS = 620
const HOLD_MS = 180

type PageTransitionProps = {
  children: (displayLocation: Location) => React.ReactNode
}

function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [stage, setStage] = useState<Stage>("idle")

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) {
      return
    }
    setStage("rising")
    const riseTimer = setTimeout(() => {
      setDisplayLocation(location)
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
      const holdTimer = setTimeout(() => setStage("falling"), HOLD_MS)
      return () => clearTimeout(holdTimer)
    }, RISE_MS)
    return () => clearTimeout(riseTimer)
  }, [location, displayLocation])

  const covered = stage === "rising"
  const active = stage !== "idle"

  const curtainStyle: CSSProperties = {
    transform: stage === "rising" ? "translateY(0)" : "translateY(100%)",
    transition: `transform ${RISE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
    willChange: "transform",
  }

  const handleTransitionEnd = () => {
    if (stage === "falling") {
      setStage("idle")
    }
  }

  return (
    <>
      {children(displayLocation)}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-aberdeen-blue"
        onTransitionEnd={handleTransitionEnd}
        style={curtainStyle}
      >
        <img
          alt=""
          className="w-28 md:w-36"
          src="/circle-a-peach.png"
          style={{
            opacity: covered ? 1 : 0,
            transform: covered ? "scale(1)" : "scale(0.86)",
            transition: active
              ? "opacity 360ms ease, transform 520ms cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
          }}
        />
      </div>
    </>
  )
}

export default PageTransition
