import { useMutation, useQuery } from "convex/react"
import { createContext, useContext, useEffect, useMemo } from "react"
import type { ReactNode } from "react"
import { useLocation } from "react-router"
import { api } from "../../convex/_generated/api"

export type PageOverrides = {
  text: Record<string, string>
  links: Record<string, { href: string; text: string }>
  images: Record<string, string>
  media: Record<string, { kind: "image" | "video"; thumbnailUrl: string | null; url: string }>
}

type PublicStaffMember = {
  _id: string
  name: string
  role: string
  biography: string
  image: string
  order: number
}

type PublicEvent = {
  _id: string
  title: string
  description: string
  startsAt: number
  image: string
  bookingUrl: string
  status: "published" | "archived"
}

type SiteBundle = {
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

export type PublicMenuPage = {
  _id: string
  title: string
  slug: string
  description: string
  heroImage: string | null
  sections: Array<{
    _id: string
    layout: "imageLeft" | "imageRight" | "paired"
    background: "oyster" | "peach" | "blue"
    mapImage: string
    image: string | null
    imageCaption: string
    showPostcardOne: boolean
    showPostcardTwo: boolean
    showPostcardThree: boolean
    postcards: Array<string | null>
    groups: Array<{
      _id: string
      title: string
      note: string
      items: Array<{
        _id: string
        name: string
        description: string
        price: string
        likes: number
      }>
    }>
  }>
}

type InquiryInput = {
  type: "contact" | "privateEvent"
  name: string
  email: string
  phone?: string
  message: string
}

type CmsRuntimeValue = {
  backendEnabled: boolean
  page: PageOverrides
  pageReady: boolean
  staff: PublicStaffMember[] | undefined
  events: PublicEvent[] | undefined
  menu: PublicMenuPage | null | undefined
  menuPages:
    | Array<{
        _id: string
        title: string
        slug: string
        order: number
        heroImage: string | null
        sectionTitles: string[]
      }>
    | undefined
  site: SiteBundle | undefined
  submitInquiry: ((input: InquiryInput) => Promise<unknown>) | null
}

const emptyPage: PageOverrides = { text: {}, links: {}, images: {}, media: {} }
const CmsRuntimeContext = createContext<CmsRuntimeValue>({
  backendEnabled: false,
  page: emptyPage,
  pageReady: true,
  staff: undefined,
  events: undefined,
  menu: undefined,
  menuPages: undefined,
  site: undefined,
  submitInquiry: null,
})

function getSessionId() {
  const key = "aberdeen-analytics-session"
  const existing = sessionStorage.getItem(key)
  if (existing) return existing
  const id = crypto.randomUUID()
  sessionStorage.setItem(key, id)
  return id
}

export function CmsRuntimeProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith("/admin")
  const page = useQuery(api.content.getPage, isAdmin ? "skip" : { page: location.pathname })
  const site = useQuery(api.site.getPublicSettings, isAdmin ? "skip" : {})
  const staff = useQuery(api.staff.listPublic, location.pathname === "/staff" ? {} : "skip")
  const events = useQuery(api.events.listPublic, location.pathname === "/events" ? {} : "skip")
  const menuSlug = location.pathname.startsWith("/menu/")
    ? location.pathname.slice("/menu/".length)
    : ""
  const menu = useQuery(api.menus.getPublicBySlug, menuSlug ? { slug: menuSlug } : "skip")
  const menuPages = useQuery(api.menus.listPublicNavigation, isAdmin ? "skip" : {})
  const trackPageView = useMutation(api.analytics.trackPageView)
  const submitInquiryMutation = useMutation(api.inquiries.submit)

  useEffect(() => {
    if (isAdmin || new URLSearchParams(location.search).has("cmsPreview")) {
      return
    }

    const sessionId = getSessionId()
    void trackPageView({ path: location.pathname, sessionId })
  }, [isAdmin, location.pathname, location.search, trackPageView])

  const value = useMemo<CmsRuntimeValue>(
    () => ({
      backendEnabled: true,
      page: page ?? emptyPage,
      pageReady: page !== undefined || isAdmin,
      staff,
      events,
      menu,
      menuPages,
      site,
      submitInquiry: (input) => submitInquiryMutation(input),
    }),
    [events, isAdmin, menu, menuPages, page, site, staff, submitInquiryMutation],
  )

  return <CmsRuntimeContext.Provider value={value}>{children}</CmsRuntimeContext.Provider>
}

export function useCmsRuntime() {
  return useContext(CmsRuntimeContext)
}

export function useRequiredPageImage(key: string) {
  const { page, pageReady } = useCmsRuntime()

  if (!pageReady) return null

  const image = page.media[key]
  if (!image || image.kind !== "image") {
    throw new Error(`Missing required page image: ${key}`)
  }

  return image.url
}
