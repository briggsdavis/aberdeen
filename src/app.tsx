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
const adminRoute = <AdminPage />

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
      </Route>
    </Routes>
  )
}

export default App
