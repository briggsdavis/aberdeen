import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCallback, useEffect, useState } from "react"
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

const fallbackMenuPreviews = [
  {
    title: "Food",
    slug: "food",
    heroImage:
      "https://images.unsplash.com/photo-1715249792962-5359b4b17f21?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Spirits",
    slug: "spirits",
    heroImage:
      "https://images.unsplash.com/photo-1582993232955-39424b2cef01?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Beverages",
    slug: "beverages",
    heroImage:
      "https://images.unsplash.com/photo-1683463787127-9d472af2a9e3?auto=format&fit=crop&w=900&q=85",
  },
]

function SiteHeader({ playHomeIntro }: { playHomeIntro: boolean }) {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isHomeIntroActive, setIsHomeIntroActive] = useState(playHomeIntro)
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuPreviewOpen, setMenuPreviewOpen] = useState(false)
  const { menuPages, site } = useCmsRuntime()
  const reservationUrl = site?.settings.reservationUrl ?? "/contact"
  const menuPreviews = menuPages?.length
    ? menuPages.slice(0, 3).map((page) => ({
        title: page.title,
        slug: page.slug,
        heroImage:
          page.heroImage ??
          fallbackMenuPreviews.find((fallback) => fallback.slug === page.slug)?.heroImage ??
          fallbackMenuPreviews[0]!.heroImage,
      }))
    : fallbackMenuPreviews
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => setIsMenuOpen((isOpen) => !isOpen), [])

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
    const introTimer = window.setTimeout(() => setIsHomeIntroActive(false), 2220)
    return () => window.clearTimeout(introTimer)
  }, [playHomeIntro, shouldReduceMotion])

  return (
    <motion.header
      animate={{ y: isHidden || isHomeIntroActive ? "-100%" : "0%" }}
      className={`fixed inset-x-0 top-0 z-40 bg-aberdeen-blue text-aberdeen-peach will-change-transform ${
        isScrolled ? "shadow-[0_12px_30px_rgb(14_24_69/0.2)]" : "shadow-none"
      }`}
      initial={false}
      onFocusCapture={() => setIsHidden(false)}
      transition={{
        duration: shouldReduceMotion ? 0 : isHomeIntroActive ? 0.3 : 0.864,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <TransitionLink className="nav-logo block w-36 md:w-44" onClick={closeMenu} to="/">
          <img alt="Aberdeen" src="/brand/aberdeen-wordmark-peach.png" />
        </TransitionLink>
        <nav className="hidden items-center gap-7 font-utility text-sm tracking-[0.16em] uppercase md:flex">
          {navItems.map((item) =>
            item.label === "Menus" ? (
              <div
                className="relative"
                key={item.label}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setMenuPreviewOpen(false)
                }}
                onMouseLeave={() => setMenuPreviewOpen(false)}
              >
                <TransitionLink
                  aria-expanded={menuPreviewOpen}
                  className="nav-underline"
                  onFocus={() => setMenuPreviewOpen(true)}
                  onMouseEnter={() => setMenuPreviewOpen(true)}
                  to={item.to}
                >
                  {item.label}
                </TransitionLink>
                <AnimatePresence>
                  {menuPreviewOpen ? (
                    <motion.div
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute top-full left-1/2 w-[min(68vw,67rem)] -translate-x-1/2 pt-5"
                      exit={{ opacity: 0, scale: 0.99, y: -4 }}
                      initial={{ opacity: 0, scale: 0.985, y: -4 }}
                      transition={{ duration: 1.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="bg-white p-8 text-aberdeen-blue shadow-[0_28px_70px_rgb(14_24_69/0.2)] lg:p-10">
                        <div className="grid grid-cols-3 gap-7">
                          {menuPreviews.map((menu) => (
                            <TransitionLink
                              className="group block"
                              key={menu.slug}
                              to={`/menu/${menu.slug}`}
                            >
                              <span className="block aspect-[32/25] overflow-hidden bg-oyster-white">
                                <img
                                  alt=""
                                  className="menu-image-hover h-full w-full object-cover"
                                  src={menu.heroImage}
                                />
                              </span>
                              <span className="menu-tab-underline mt-6 inline-block font-display text-3xl leading-none tracking-normal normal-case">
                                {menu.title}
                              </span>
                            </TransitionLink>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <TransitionLink className="nav-underline" key={item.label} to={item.to}>
                {item.label}
              </TransitionLink>
            ),
          )}
        </nav>
        <div className="hidden md:block">
          <a
            className="aberdeen-action border border-white bg-white px-4 py-2 font-utility text-sm tracking-[0.14em] text-black uppercase [--action-fill:var(--color-aberdeen-blue)] hover:text-white"
            href={reservationUrl}
          >
            Reserve
          </a>
        </div>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-aberdeen-peach md:hidden"
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
      </div>
      <nav
        className={`mx-5 border border-aberdeen-peach bg-aberdeen-blue p-5 md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
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
