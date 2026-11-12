import type { ReactNode } from "react"
import { Navigate, Route, Routes } from "react-router"
import SiteLayout from "./components/site-layout"
import { usePageVisibility, useShellData } from "./lib/public-data"
import type { ToggleablePage } from "./lib/public-data"
import AboutPage from "./pages/about"
import AdminPage from "./pages/admin"
import ContactPage from "./pages/contact"
import EventsPage from "./pages/events"
import HomePage from "./pages/home"
import MenuPage from "./pages/menu"
import NotFoundPage from "./pages/not-found"
import StaffPage from "./pages/staff"

const siteLayoutRoute = <SiteLayout />

function PageGate({ children, page }: { children: ReactNode; page: ToggleablePage }) {
  const visibility = usePageVisibility()
  if (!visibility.ready) return <div className="min-h-svh animate-pulse bg-oyster-white" />
  return visibility[page] ? children : <NotFoundPage />
}
const homeRoute = <HomePage />
const aboutRoute = <AboutPage />
function MenuRedirect() {
  const { menuPages } = useShellData()
  if (!menuPages) return <div className="min-h-svh animate-pulse bg-oyster-white" />
  const first = menuPages[0]
  return first ? <Navigate replace to={`/menu/${first.slug}`} /> : <NotFoundPage />
}

const menuRedirectRoute = <MenuRedirect />
const menuRoute = <MenuPage />
const contactRoute = <ContactPage />
const staffRoute = (
  <PageGate page="staff">
    <StaffPage />
  </PageGate>
)
const eventsRoute = <EventsPage />
const adminRoute = import.meta.env.VITE_CONVEX_URL ? (
  <AdminPage />
) : (
  <section className="grid min-h-svh place-items-center bg-oyster-white px-5 text-center text-aberdeen-blue">
    <div className="max-w-md">
      <p className="font-utility text-sm tracking-[0.22em] uppercase">Admin unavailable</p>
      <h1 className="mt-4 font-display text-5xl leading-none">Convex is not configured.</h1>
      <p className="mt-6 leading-7 text-kelp-ink/80">
        Run the full Convex development command or add VITE_CONVEX_URL to enable the admin tools.
      </p>
    </div>
  </section>
)

const notFoundRoute = <NotFoundPage />

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={adminRoute} />
      <Route path="/" element={siteLayoutRoute}>
        <Route index element={homeRoute} />
        <Route path="about" element={aboutRoute} />
        <Route path="menu" element={menuRedirectRoute} />
        <Route path="menu/:slug" element={menuRoute} />
        <Route path="contact" element={contactRoute} />
        <Route path="staff" element={staffRoute} />
        <Route path="events" element={eventsRoute} />
        <Route path="*" element={notFoundRoute} />
      </Route>
    </Routes>
  )
}

export default App
