import { motion, useReducedMotion } from "motion/react"
import { Outlet, useLocation } from "react-router"
import { NauticalCoordinates } from "./nautical-details"
import { PageTransitionProvider } from "./page-transition"
import SiteFooter from "./site-footer"
import SiteHeader from "./site-header"
import SmoothScroll from "./smooth-scroll"

const homeIntroStorageKey = "aberdeen-home-intro-seen"
const isFirstSiteLoad = (() => {
  try {
    const isFirst = sessionStorage.getItem(homeIntroStorageKey) !== "true"
    if (isFirst) sessionStorage.setItem(homeIntroStorageKey, "true")
    return isFirst
  } catch {
    return true
  }
})()

function SiteLayout() {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const playHomeIntro = isFirstSiteLoad && location.pathname === "/" && !shouldReduceMotion

  return (
    <SmoothScroll>
      <div className="relative min-h-svh bg-aberdeen-peach text-kelp-ink">
        <PageTransitionProvider>
          <SiteHeader playHomeIntro={playHomeIntro} />
          <main className="relative">
            <motion.div
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              className="absolute top-24 right-5 z-30 py-2 [text-shadow:0_1px_8px_rgb(14_24_69/0.7)] md:top-28 md:right-8"
              initial={
                playHomeIntro
                  ? { filter: "blur(10px)", opacity: 0, y: -10 }
                  : { filter: "blur(0px)", opacity: 1, y: 0 }
              }
              transition={{
                delay: playHomeIntro ? 2.62 : 0,
                duration: playHomeIntro ? 0.72 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <NauticalCoordinates light />
            </motion.div>
            <Outlet context={{ playHomeIntro }} />
          </main>
          <SiteFooter />
        </PageTransitionProvider>
      </div>
    </SmoothScroll>
  )
}

export default SiteLayout
