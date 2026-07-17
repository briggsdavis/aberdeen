import { Navigate, Route, Routes } from "react-router"
import SiteLayout from "./components/site-layout"
import AboutPage from "./pages/about"
import AdminPage from "./pages/admin"
import ContactPage from "./pages/contact"
import EventsPage from "./pages/events"
import HomePage from "./pages/home"
import BeveragesMenuPage from "./pages/menu-beverages"
import FoodMenuPage from "./pages/menu-food"
import SpiritsMenuPage from "./pages/menu-spirits"
import StaffPage from "./pages/staff"
import TestHomePage from "./pages/test-home"

const siteLayoutRoute = <SiteLayout />
const homeRoute = <HomePage />
const aboutRoute = <AboutPage />
const menuRedirectRoute = <Navigate replace to="/menu/food" />
const foodMenuRoute = <FoodMenuPage />
const spiritsMenuRoute = <SpiritsMenuPage />
const beveragesMenuRoute = <BeveragesMenuPage />
const contactRoute = <ContactPage />
const staffRoute = <StaffPage />
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
const testHomeRoute = <TestHomePage />

function App() {
  return (
    <Routes>
      <Route element={siteLayoutRoute}>
        <Route index element={homeRoute} />
        <Route path="about" element={aboutRoute} />
        <Route path="menu" element={menuRedirectRoute} />
        <Route path="menu/food" element={foodMenuRoute} />
        <Route path="menu/spirits" element={spiritsMenuRoute} />
        <Route path="menu/beverages" element={beveragesMenuRoute} />
        <Route path="contact" element={contactRoute} />
        <Route path="staff" element={staffRoute} />
        <Route path="events" element={eventsRoute} />
        <Route path="admin" element={adminRoute} />
        <Route path="test" element={testHomeRoute} />
      </Route>
    </Routes>
  )
}

export default App
