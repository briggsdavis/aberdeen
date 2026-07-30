import { useReducedMotion } from "motion/react"
import { useEffect, useLayoutEffect } from "react"
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

  useLayoutEffect(() => {
    if (shouldReduceMotion) return

    const main = document.querySelector(".public-site-main")
    if (!main) return

    const images = Array.from(
      main.querySelectorAll<HTMLImageElement>(
        "section:not(:first-child) img:not([aria-hidden='true']):not(.no-scroll-reveal)",
      ),
    )
    images.forEach((image) => image.classList.add("site-image-wipe-up"))

    let animationFrame = 0
    const revealVisibleImages = () => {
      animationFrame = 0
      const revealLine = window.innerHeight * 0.92
      images.forEach((image) => {
        if (image.classList.contains("is-revealed")) return
        const rect = image.getBoundingClientRect()
        if (rect.top <= revealLine && rect.bottom >= 0) image.classList.add("is-revealed")
      })
    }
    const scheduleRevealCheck = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(revealVisibleImages)
    }

    scheduleRevealCheck()
    window.addEventListener("scroll", scheduleRevealCheck, { passive: true })
    window.addEventListener("resize", scheduleRevealCheck, { passive: true })
    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("scroll", scheduleRevealCheck)
      window.removeEventListener("resize", scheduleRevealCheck)
    }
  }, [location.pathname, shouldReduceMotion])

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
          <main className="public-site-main relative">
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
