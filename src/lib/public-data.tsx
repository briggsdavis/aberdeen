import { useMutation, useQuery } from "convex/react"
import { createContext, useContext, useEffect, useMemo } from "react"
import type { ReactNode } from "react"
import { useLocation } from "react-router"
import { api } from "../../convex/_generated/api"
import { defaultEvents } from "../data/default-events"
import type { PublicEvent } from "../data/default-events"
import { localMenuNavigation, localMenuPages } from "../data/default-menus"
import { defaultStaff } from "../data/default-staff"
import type { PublicStaffMember } from "../data/default-staff"
import { emptyPageContent, getCmsPreview, pageImage } from "./cms-page-content"
import type { MenuNavigationPage, MenuPage } from "./menu"

type SiteData = {
  settings: Record<string, string>
  contactDetails: Array<{
    _id: string
    label: string
    value: string
    note: string
    order: number
  }>
  openingHours: Array<{ _id: string; label: string; value: string; order: number }>
  socialLinks: Array<{ _id: string; platform: string; url: string; order: number }>
}

type InquiryInput = {
  type: "contact" | "privateEvent"
  name: string
  email: string
  phone?: string
  message: string
}

const PageContentContext = createContext({ content: emptyPageContent, ready: true })
const ShellDataContext = createContext<{
  menuPages: MenuNavigationPage[] | undefined
  site: SiteData | undefined
}>({ menuPages: localMenuNavigation, site: undefined })
const MenuDataContext = createContext<{
  backendEnabled: boolean
  menu: MenuPage | null | undefined
  navigation: MenuNavigationPage[] | undefined
}>({ backendEnabled: false, menu: undefined, navigation: localMenuNavigation })
const EventsContext = createContext<PublicEvent[]>(defaultEvents)
const StaffContext = createContext<PublicStaffMember[]>(defaultStaff)
const InquiryContext = createContext<((input: InquiryInput) => Promise<unknown>) | null>(null)

function getSessionId() {
  const key = "aberdeen-analytics-session"
  const existing = sessionStorage.getItem(key)
  if (existing) return existing
  const id = crypto.randomUUID()
  sessionStorage.setItem(key, id)
  return id
}

export function PublicDataProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith("/admin")
  const content = useQuery(api.content.getPage, isAdmin ? "skip" : { page: location.pathname })
  const site = useQuery(api.site.getPublicSettings, isAdmin ? "skip" : {})
  const staff = useQuery(api.staff.listPublic, location.pathname === "/staff" ? {} : "skip")
  const events = useQuery(api.events.listPublic, location.pathname === "/events" ? {} : "skip")
  const menuSlug = location.pathname.startsWith("/menu/")
    ? location.pathname.slice("/menu/".length)
    : ""
  const menu = useQuery(api.menus.getPublicBySlug, menuSlug ? { slug: menuSlug } : "skip")
  const menuPages = useQuery(api.menus.listPublicNavigation, isAdmin ? "skip" : {})
  const trackPageView = useMutation(api.analytics.trackPageView)
  const submitInquiry = useMutation(api.inquiries.submit)

  useEffect(() => {
    if (isAdmin || getCmsPreview(location.search)) return
    void trackPageView({ path: location.pathname, sessionId: getSessionId() })
  }, [isAdmin, location.pathname, location.search, trackPageView])

  const pageContent = useMemo(
    () => ({ content: content ?? emptyPageContent, ready: content !== undefined || isAdmin }),
    [content, isAdmin],
  )
  const shellData = useMemo(() => ({ menuPages, site }), [menuPages, site])
  const menuData = useMemo(
    () => ({ backendEnabled: true, menu, navigation: menuPages }),
    [menu, menuPages],
  )
  const visibleEvents = events?.length ? events : defaultEvents
  const visibleStaff = staff?.length ? staff : defaultStaff

  return (
    <PageContentContext.Provider value={pageContent}>
      <ShellDataContext.Provider value={shellData}>
        <MenuDataContext.Provider value={menuData}>
          <EventsContext.Provider value={visibleEvents}>
            <StaffContext.Provider value={visibleStaff}>
              <InquiryContext.Provider value={submitInquiry}>{children}</InquiryContext.Provider>
            </StaffContext.Provider>
          </EventsContext.Provider>
        </MenuDataContext.Provider>
      </ShellDataContext.Provider>
    </PageContentContext.Provider>
  )
}

export function usePageContent() {
  return useContext(PageContentContext)
}

export function usePageImage(key: string) {
  const { content, ready } = usePageContent()
  return ready ? pageImage(content, key) : null
}

export function useRequiredPageImage(key: string, fallback?: string) {
  const { content, ready } = usePageContent()
  const location = useLocation()
  if (!ready) return null

  const media = content.media[key]
  if (!media) {
    if (fallback) return fallback
    if (getCmsPreview(location.search)) return null
    throw new Error(`Missing required page image: ${key}`)
  }
  if (media.kind === "image") return media.url
  if (media.thumbnailUrl) return media.thumbnailUrl
  if (getCmsPreview(location.search)) return null
  throw new Error(`Missing required page video poster: ${key}`)
}

export function useShellData() {
  return useContext(ShellDataContext)
}

export function useMenuData(slug: string) {
  const data = useContext(MenuDataContext)
  if (!data.backendEnabled) {
    return {
      menu: localMenuPages.find((page) => page.slug === slug) ?? null,
      navigation: localMenuNavigation,
      ready: true,
    }
  }
  return {
    menu: data.menu,
    navigation: data.navigation ?? [],
    ready: data.menu !== undefined && data.navigation !== undefined,
  }
}

export function usePublicEvents() {
  return useContext(EventsContext)
}

export function usePublicStaff() {
  return useContext(StaffContext)
}

export function useSubmitInquiry() {
  return useContext(InquiryContext)
}
