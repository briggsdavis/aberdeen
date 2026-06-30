import { Outlet } from "react-router"
import { PageTransitionProvider } from "./page-transition"
import SiteFooter from "./site-footer"
import SiteHeader from "./site-header"

function SiteLayout() {
  return (
    <div className="relative flex min-h-svh flex-col bg-aberdeen-peach text-kelp-ink">
      <PageTransitionProvider>
        <SiteHeader />
        <main className="grow">
          <Outlet />
        </main>
        <SiteFooter />
      </PageTransitionProvider>
    </div>
  )
}

export default SiteLayout
