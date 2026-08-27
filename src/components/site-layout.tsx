import { MotionConfig, useReducedMotion } from "motion/react"
import { useEffect, useRef } from "react"
import { Outlet, useLocation } from "react-router"
import { getCmsPreview } from "../lib/cms-page-content"
import CmsDomBridge from "./cms-dom-bridge"
import { PageTransitionProvider } from "./page-transition"
import SiteFooter from "./site-footer"
import SiteHeader from "./site-header"
import SmoothScroll from "./smooth-scroll"

function SiteLayout() {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const hasPlayedHomeIntro = useRef(
    typeof window !== "undefined" &&
      sessionStorage.getItem("aberdeen-home-intro-played") === "true",
  )
  const playHomeIntro =
    location.pathname === "/" && !shouldReduceMotion && !hasPlayedHomeIntro.current
  const preview = getCmsPreview(location.search)
  const editorPreview = Boolean(preview)
  const focusedEditorPreview = preview?.scope === "staff-introduction"

  useEffect(() => {
    if (!playHomeIntro) return
    hasPlayedHomeIntro.current = true
    sessionStorage.setItem("aberdeen-home-intro-played", "true")
  }, [playHomeIntro])

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

  const content = (
    <MotionConfig reducedMotion={editorPreview ? "always" : "user"}>
      <div className="site-texture relative min-h-svh bg-aberdeen-peach text-kelp-ink">
        <PageTransitionProvider>
          {focusedEditorPreview ? null : <SiteHeader playHomeIntro={playHomeIntro} />}
          <main className="public-site-main relative min-h-svh bg-white">
            <Outlet context={{ playHomeIntro }} />
          </main>
          <CmsDomBridge />
          {focusedEditorPreview ? null : <SiteFooter />}
        </PageTransitionProvider>
      </div>
    </MotionConfig>
  )

  return editorPreview ? content : <SmoothScroll>{content}</SmoothScroll>
}

export default SiteLayout
