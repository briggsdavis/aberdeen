import { Outlet } from "react-router"
import { NauticalCoordinates } from "./nautical-details"
import { PageTransitionProvider } from "./page-transition"
import SiteFooter from "./site-footer"
import SiteHeader from "./site-header"
import SmoothScroll from "./smooth-scroll"

function SiteLayout() {
  return (
    <SmoothScroll>
      <div className="relative min-h-svh bg-aberdeen-peach text-kelp-ink">
        <PageTransitionProvider>
          <SiteHeader />
          <main className="relative">
            <NauticalCoordinates
              className="absolute top-24 right-5 z-30 py-2 [text-shadow:0_1px_8px_rgb(14_24_69/0.7)] md:top-28 md:right-8"
              light
            />
            <Outlet />
          </main>
          <SiteFooter />
        </PageTransitionProvider>
      </div>
    </SmoothScroll>
  )
}

export default SiteLayout
