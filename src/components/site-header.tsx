import { useCallback, useState } from "react"
import { Link, useLocation } from "react-router"

const navItems = [
  { label: "About", to: "/about" },
  { label: "Menus", to: "/menu/food" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
]

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => setIsMenuOpen((isOpen) => !isOpen), [])

  return (
    <header className="absolute inset-x-0 top-0 z-20 text-aberdeen-peach">
      <div className="flex items-center justify-between px-5 py-5 md:px-8">
        <Link
          className="block w-36 transition-opacity duration-300 hover:opacity-80 md:w-44"
          onClick={closeMenu}
          to="/"
        >
          <img alt="Aberdeen" src="/wordmark-peach.png" />
        </Link>
        <nav className="hidden items-center gap-7 font-utility text-sm tracking-[0.16em] uppercase md:flex">
          {navItems.map((item) => (
            <Link
              className="transition-colors duration-300 hover:text-citrus"
              key={item.label}
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link
            className="border border-aberdeen-peach px-4 py-2 font-utility text-sm tracking-[0.14em] uppercase transition-colors duration-300 hover:bg-aberdeen-peach hover:text-aberdeen-blue"
            to="/contact"
          >
            Reserve
          </Link>
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
        className={`mx-5 border border-aberdeen-peach bg-aberdeen-blue/95 p-5 backdrop-blur md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
        id="mobile-navigation"
      >
        <div className="grid gap-4">
          {navItems.map((item) => (
            <Link
              className={`font-display text-4xl leading-none transition-colors duration-300 hover:text-citrus ${
                location.pathname.startsWith(item.to) ? "text-citrus" : ""
              }`}
              key={item.label}
              onClick={closeMenu}
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="mt-3 inline-block w-fit bg-aberdeen-peach px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-blue uppercase transition-colors duration-300 hover:bg-citrus"
            onClick={closeMenu}
            to="/contact"
          >
            Reserve
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default SiteHeader
