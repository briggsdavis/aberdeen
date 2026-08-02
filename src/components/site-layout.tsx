import { MotionConfig, useReducedMotion } from "motion/react"
import { useEffect, useLayoutEffect, useRef } from "react"
import { Outlet, useLocation } from "react-router"
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
  const editorPreview = new URLSearchParams(location.search).has("cmsPreview")
  const focusedEditorPreview =
    new URLSearchParams(location.search).get("cmsScope") === "staff-introduction"

  useEffect(() => {
    if (!playHomeIntro) return
    hasPlayedHomeIntro.current = true
    sessionStorage.setItem("aberdeen-home-intro-played", "true")
  }, [playHomeIntro])

  useLayoutEffect(() => {
    if (editorPreview || shouldReduceMotion) return

    const main = document.querySelector(".public-site-main")
    if (!main) return

    const images = Array.from(
      main.querySelectorAll<HTMLImageElement>(
        "section:not(:first-child) img:not([aria-hidden='true']):not(.no-scroll-reveal)",
      ),
    )
    images.forEach((image) => image.classList.add("site-image-wipe-up"))

    const shadowHosts = new Set<HTMLElement>()
    images.forEach((image) => {
      const host = image.closest<HTMLElement>(
        "[class*='shadow'], article, .soft-card-shadow, .restaurant-logo-card",
      )
      if (!host) return
      host.classList.add("site-shadow-wipe-host", "site-shadow-pending")
      shadowHosts.add(host)
    })

    let animationFrame = 0
    const shadowCleanupTimers: number[] = []
    const revealVisibleImages = () => {
      animationFrame = 0
      const revealLine = window.innerHeight * 0.92
      images.forEach((image) => {
        if (image.classList.contains("is-revealed")) return
        const rect = image.getBoundingClientRect()
        if (rect.top <= revealLine && rect.bottom >= 0) {
          image.classList.add("is-revealed")
          const host = image.closest<HTMLElement>(".site-shadow-wipe-host")
          if (
            host &&
            !host.querySelector("img.site-image-wipe-up:not(.is-revealed)") &&
            host.classList.contains("site-shadow-pending")
          ) {
            host.classList.remove("site-shadow-pending")
            shadowCleanupTimers.push(
              window.setTimeout(() => host.classList.remove("site-shadow-wipe-host"), 2900),
            )
          }
        }
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
      shadowCleanupTimers.forEach((timer) => window.clearTimeout(timer))
      shadowHosts.forEach((host) =>
        host.classList.remove("site-shadow-wipe-host", "site-shadow-pending"),
      )
      window.removeEventListener("scroll", scheduleRevealCheck)
      window.removeEventListener("resize", scheduleRevealCheck)
    }
  }, [editorPreview, location.pathname, shouldReduceMotion])

  useLayoutEffect(() => {
    if (editorPreview || shouldReduceMotion) return

    const content = document.querySelector<HTMLElement>(".public-site-main")
    if (!content) return

    let frame = 0
    const revealVisibleText = () => {
      frame = 0
      const revealLine = window.innerHeight * 0.9
      content.querySelectorAll<HTMLElement>(".text-reveal").forEach((element) => {
        if (element.classList.contains("is-text-revealed")) return
        const rect = element.getBoundingClientRect()
        if (rect.top <= revealLine && rect.bottom >= 0) element.classList.add("is-text-revealed")
      })
    }
    const scheduleRevealCheck = () => {
      if (frame) return
      frame = window.requestAnimationFrame(revealVisibleText)
    }

    const revealNewText = () => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(
          "main h1, main h2, main h3, main p, main li, main dt, main dd, footer h2, footer h3, footer p, footer li",
        ),
      ).filter(
        (element) =>
          !element.classList.contains("text-reveal") &&
          !element.closest("[data-hero-intro]") &&
          !element.querySelector("h1, h2, h3, p, li, dt, dd"),
      )

      targets.forEach((element) => {
        const section = element.closest("section, footer") ?? content
        const position = section.querySelectorAll(".text-reveal").length
        element.style.setProperty("--text-reveal-delay", `${Math.min(position * 65, 260)}ms`)
        element.classList.add("text-reveal")
      })
      scheduleRevealCheck()
    }

    revealNewText()

    let mutationFrame = 0
    const contentObserver = new MutationObserver(() => {
      if (mutationFrame) return
      mutationFrame = window.requestAnimationFrame(() => {
        mutationFrame = 0
        revealNewText()
      })
    })
    contentObserver.observe(document.body, { childList: true, subtree: true })
    window.addEventListener("scroll", scheduleRevealCheck, { passive: true })
    window.addEventListener("resize", scheduleRevealCheck, { passive: true })

    return () => {
      contentObserver.disconnect()
      window.cancelAnimationFrame(frame)
      window.cancelAnimationFrame(mutationFrame)
      window.removeEventListener("scroll", scheduleRevealCheck)
      window.removeEventListener("resize", scheduleRevealCheck)
    }
  }, [editorPreview, location.pathname, shouldReduceMotion])

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
      <div className="relative min-h-svh bg-aberdeen-peach text-kelp-ink">
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
