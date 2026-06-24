import { Outlet } from "react-router"
import { ScrapbookDefs } from "./scrapbook"
import SiteFooter from "./site-footer"
import SiteHeader from "./site-header"

function SiteLayout() {
  return (
    <div className="relative flex min-h-svh flex-col bg-aberdeen-peach text-kelp-ink">
      <ScrapbookDefs />
      <SiteHeader />
      <main className="grow">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default SiteLayout
