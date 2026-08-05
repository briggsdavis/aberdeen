import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router"
import { useCmsRuntime } from "../lib/cms-runtime"
import { TransitionLink } from "./page-transition"

const navItems = [
  { label: "About", to: "/about" },
  { label: "Menus", to: "/menu/food" },
  { label: "Events", to: "/events" },
  { label: "Staff", to: "/staff" },
  { label: "Contact", to: "/contact" },
]

function SiteHeader({ playHomeIntro }: { playHomeIntro: boolean }) {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isHomeIntroActive, setIsHomeIntroActive] = useState(playHomeIntro)
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuPreviewOpen, setMenuPreviewOpen] = useState(false)
  const menuCloseTimer = useRef<number | null>(null)
  const [activeMenuPreviewSlug, setActiveMenuPreviewSlug] = useState<string | null>(null)
  const isContactPage = location.pathname === "/contact"
  const { menuPages, site } = useCmsRuntime()
  const reservationUrl = site?.settings.reservationUrl ?? "/contact"
  const menuPreviews = (menuPages ?? []).slice(0, 3).map((page) => {
    if (!page.heroImage) throw new Error(`Missing menu hero image: ${page.slug}`)

    return {
      title: page.title,
      slug: page.slug,
      sectionTitles: page.sectionTitles,
      heroImage: page.heroImage,
    }
  })
  const activeMenuPreview =
    activeMenuPreviewSlug === null
      ? menuPreviews[0]
      : menuPreviews.find((menu) => menu.slug === activeMenuPreviewSlug)
  const isNavigationActive = isContactPage || isScrolled || isMenuOpen
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => setIsMenuOpen((isOpen) => !isOpen), [])
  const cancelMenuPreviewClose = useCallback(() => {
    if (menuCloseTimer.current === null) return
    window.clearTimeout(menuCloseTimer.current)
    menuCloseTimer.current = null
  }, [])
  const openMenuPreview = useCallback(() => {
    cancelMenuPreviewClose()
    setMenuPreviewOpen(true)
  }, [cancelMenuPreviewClose])
  const scheduleMenuPreviewClose = useCallback(() => {
    cancelMenuPreviewClose()
    menuCloseTimer.current = window.setTimeout(() => {
      setMenuPreviewOpen(false)
      menuCloseTimer.current = null
    }, 240)
  }, [cancelMenuPreviewClose])

  useEffect(
    () => () => {
      if (menuCloseTimer.current !== null) window.clearTimeout(menuCloseTimer.current)
    },
    [],
  )

  useEffect(() => {
    let lastScrollY = window.scrollY
    let accumulatedDistance = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 12)
      const distance = currentScrollY - lastScrollY
      const changedDirection =
        (distance > 0 && accumulatedDistance < 0) || (distance < 0 && accumulatedDistance > 0)

      accumulatedDistance = changedDirection ? distance : accumulatedDistance + distance

      if (isMenuOpen || currentScrollY < 96) {
        setIsHidden(false)
        accumulatedDistance = 0
      } else if (accumulatedDistance > 30) {
        setIsHidden(true)
        accumulatedDistance = 0
      } else if (accumulatedDistance < -14) {
        setIsHidden(false)
        accumulatedDistance = 0
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMenuOpen])

  useEffect(() => {
    setIsHidden(false)
  }, [location.pathname])

  useEffect(() => {
    if (!playHomeIntro || shouldReduceMotion) {
      setIsHomeIntroActive(false)
      return
    }

    setIsHomeIntroActive(true)
    const introTimer = window.setTimeout(() => setIsHomeIntroActive(false), 3050)
    return () => window.clearTimeout(introTimer)
  }, [playHomeIntro, shouldReduceMotion])

  const homeIntroReveal = (order: number) => ({
    animate: { opacity: isHomeIntroActive ? 0 : 1, x: isHomeIntroActive ? -10 : 0 },
    initial: false,
    transition: {
      delay: !isHomeIntroActive && playHomeIntro ? order * 0.03 : 0,
      duration: shouldReduceMotion ? 0 : 0.48,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  })

  return (
    <motion.header
      animate={{ y: isHidden || isHomeIntroActive ? "-100%" : "0%" }}
      className={`fixed inset-x-0 top-0 z-40 text-aberdeen-peach transition-[background-color,box-shadow] duration-500 will-change-transform ${
        isNavigationActive
          ? "bg-aberdeen-blue shadow-[0_12px_30px_color-mix(in_srgb,var(--color-aberdeen-blue)_20%,transparent)]"
          : "bg-transparent shadow-none"
      }`}
      initial={false}
      onFocusCapture={() => setIsHidden(false)}
      transition={{
        duration: shouldReduceMotion ? 0 : isHomeIntroActive ? 0.3 : 0.864,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <motion.div {...homeIntroReveal(0)}>
          <TransitionLink className="nav-logo block w-36 md:w-44" onClick={closeMenu} to="/">
            <img
              alt="Aberdeen"
              className={`transition-[filter] duration-500 ${
                location.pathname === "/" && !isNavigationActive
                  ? "drop-shadow-[0_2px_4px_color-mix(in_srgb,var(--color-aberdeen-blue)_24%,transparent)]"
                  : "drop-shadow-none"
              }`}
              src="/brand/aberdeen-wordmark-peach.png"
            />
          </TransitionLink>
        </motion.div>
        <motion.nav
          className={`hidden items-center gap-7 font-utility text-sm tracking-[0.16em] uppercase transition-colors duration-500 md:flex ${
            isNavigationActive ? "text-white" : "text-aberdeen-blue"
          }`}
          {...homeIntroReveal(1)}
        >
          {navItems.map((item, index) => (
            <motion.div key={item.label} {...homeIntroReveal(index + 1)}>
              {item.label === "Menus" ? (
                <div
                  className="relative"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget))
                      setMenuPreviewOpen(false)
                  }}
                  onMouseEnter={cancelMenuPreviewClose}
                  onMouseLeave={scheduleMenuPreviewClose}
                >
                  <TransitionLink
                    aria-expanded={menuPreviewOpen}
                    className="nav-underline"
                    onFocus={openMenuPreview}
                    onMouseEnter={openMenuPreview}
                    to={item.to}
                  >
                    {item.label}
                  </TransitionLink>
                  <AnimatePresence>
                    {menuPreviewOpen && activeMenuPreview ? (
                      <motion.div
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="fixed top-[4.5rem] left-1/2 w-[min(68vw,67rem)] -translate-x-1/2 pt-5"
                        exit={{ opacity: 0, scale: 0.99, y: -4 }}
                        initial={{ opacity: 0, scale: 0.985, y: -4 }}
                        onMouseEnter={cancelMenuPreviewClose}
                        onMouseLeave={scheduleMenuPreviewClose}
                        transition={{ duration: 1.08, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="bg-white p-8 text-aberdeen-blue shadow-[0_28px_70px_color-mix(in_srgb,var(--color-aberdeen-blue)_20%,transparent)] lg:p-10">
                          <div className="grid min-h-[30rem] grid-cols-[0.72fr_1.28fr] gap-10">
                            <div className="flex flex-col justify-center border-r border-aberdeen-blue/15 pr-10">
                              {menuPreviews.map((menu) => {
                                return (
                                  <TransitionLink
                                    className="group border-b border-aberdeen-blue/10 py-7 text-aberdeen-blue transition-transform duration-700 first:pt-0 last:border-b-0 last:pb-0 hover:translate-x-2 focus-visible:translate-x-2"
                                    key={menu.slug}
                                    onFocus={() => setActiveMenuPreviewSlug(menu.slug)}
                                    onMouseEnter={() => setActiveMenuPreviewSlug(menu.slug)}
                                    to={`/menu/${menu.slug}`}
                                  >
                                    <span className="menu-tab-underline inline-block font-display text-4xl leading-none tracking-normal normal-case transition-colors duration-700 group-hover:text-aberdeen-blue">
                                      {menu.title}
                                    </span>
                                    <span className="mt-3 block font-utility text-[0.62rem] leading-5 tracking-[0.13em] uppercase opacity-65">
                                      {menu.sectionTitles.slice(0, 3).join(" · ")}...
                                    </span>
                                  </TransitionLink>
                                )
                              })}
                            </div>
                            <div className="relative min-h-[30rem] overflow-hidden bg-oyster-white">
                              <AnimatePresence initial={false} mode="sync">
                                <motion.img
                                  alt={`${activeMenuPreview.title} menu`}
                                  animate={{ opacity: 1 }}
                                  className="absolute inset-0 h-full w-full object-cover"
                                  exit={{ opacity: 0 }}
                                  initial={{ opacity: 0 }}
                                  key={activeMenuPreview.slug}
                                  src={activeMenuPreview.heroImage}
                                  transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
                                />
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ) : (
                <TransitionLink className="nav-underline" to={item.to}>
                  {item.label}
                </TransitionLink>
              )}
            </motion.div>
          ))}
        </motion.nav>
        <motion.div className="hidden md:block" {...homeIntroReveal(navItems.length + 1)}>
          <a
            className={`aberdeen-action border border-white bg-white px-4 py-2 font-utility text-sm tracking-[0.14em] text-near-black uppercase transition-[box-shadow] duration-500 [--action-fill:var(--color-aberdeen-blue)] hover:text-white ${
              isNavigationActive
                ? "shadow-none"
                : "shadow-[0_3px_10px_color-mix(in_srgb,var(--color-aberdeen-blue)_20%,transparent)]"
            }`}
            href={reservationUrl}
          >
            Reserve
          </a>
        </motion.div>
        <motion.div className="md:hidden" {...homeIntroReveal(1)}>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-aberdeen-peach"
            onClick={toggleMenu}
            type="button"
          >
            <span
              className={`h-px w-5 bg-aberdeen-peach transition ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-aberdeen-peach transition ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-5 bg-aberdeen-peach transition ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </motion.div>
      </div>
      <nav
        className={`mx-5 bg-aberdeen-blue p-5 md:hidden ${isMenuOpen ? "block" : "hidden"}`}
        id="mobile-navigation"
      >
        <div className="grid gap-4">
          {navItems.map((item) => (
            <TransitionLink
              className={`nav-underline font-display text-4xl leading-none ${
                location.pathname.startsWith(item.to) ? "text-citrus" : ""
              }`}
              key={item.label}
              onClick={closeMenu}
              to={item.to}
            >
              {item.label}
            </TransitionLink>
          ))}
          <a
            className="aberdeen-action mt-3 w-fit bg-aberdeen-peach px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-blue uppercase"
            onClick={closeMenu}
            href={reservationUrl}
          >
            Reserve
          </a>
        </div>
      </nav>
    </motion.header>
  )
}

export default SiteHeader
