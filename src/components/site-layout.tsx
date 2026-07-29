import { useReducedMotion } from "motion/react"
import { useEffect } from "react"
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
  const editorPreview = new URLSearchParams(location.search).has("cmsPreview")
  const focusedEditorPreview =
    new URLSearchParams(location.search).get("cmsScope") === "staff-introduction"

  useEffect(() => {
    if (!editorPreview) return

    const blockSiteInteraction = (event: MouseEvent) => {
      const eventTarget = event.target
      if (!(eventTarget instanceof Element)) return
      const interactive = eventTarget.closest<HTMLElement>(
        "a, button, [role='button'], input[type='submit']",
      )
      if (!interactive) return

      // The CMS bridge owns editable links and images. Everything else in a
      // preview is display-only and must never trigger site behavior.
      if (eventTarget.closest("[data-cms-link], [data-cms-image]")) return

      event.preventDefault()
      event.stopPropagation()
    }

    document.addEventListener("click", blockSiteInteraction, true)
    return () => document.removeEventListener("click", blockSiteInteraction, true)
  }, [editorPreview])

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
