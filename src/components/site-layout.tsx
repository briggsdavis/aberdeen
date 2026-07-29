import { useReducedMotion } from "motion/react"
import { Outlet, useLocation } from "react-router"
import CmsDomBridge from "./cms-dom-bridge"
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
  const focusedEditorPreview =
    new URLSearchParams(location.search).get("cmsScope") === "staff-introduction"

  return (
    <SmoothScroll>
      <div className="relative min-h-svh bg-aberdeen-peach text-kelp-ink">
        <PageTransitionProvider>
          {focusedEditorPreview ? null : <SiteHeader playHomeIntro={playHomeIntro} />}
          <main className="relative">
            <Outlet context={{ playHomeIntro }} />
          </main>
          <CmsDomBridge />
          {focusedEditorPreview ? null : <SiteFooter />}
        </PageTransitionProvider>
      </div>
    </SmoothScroll>
  )
}

export default SiteLayout
