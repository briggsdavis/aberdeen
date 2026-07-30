import { useAuthActions } from "@convex-dev/auth/react"
import {
  ArrowSquareOut,
  CalendarBlank,
  CaretDown,
  ChartLineUp,
  Coffee,
  EnvelopeSimple,
  ForkKnife,
  House,
  ImageSquare,
  Info,
  List,
  Plus,
  SignOut,
  SlidersHorizontal,
  Users,
  Wine,
  X,
} from "@phosphor-icons/react"
import { Authenticated, AuthLoading, Unauthenticated, useMutation, useQuery } from "convex/react"
import { useCallback, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { Link, Navigate, NavLink, Route, Routes, useLocation } from "react-router"
import { api } from "../../convex/_generated/api"
import Dashboard from "../admin/dashboard"
import EventsEditor from "../admin/events-editor"
import InquiryInbox from "../admin/inquiry-inbox"
import MediaLibrary from "../admin/media-library"
import MenuPagesEditor from "../admin/menu-pages-editor"
import PageEditor from "../admin/page-editor"
import SettingsEditor from "../admin/settings-editor"
import StaffEditor from "../admin/staff-editor"
import { PageHeading } from "../admin/ui"
import { defaultMenus } from "../data/default-menus"

type AuthFlow = "signIn" | "signUp"

function AdminPage() {
  return (
    <div className="min-h-svh bg-slate-50 text-slate-900">
      <AuthLoading>
        <div className="grid min-h-svh place-items-center">
          <p className="text-sm font-medium text-slate-500">Loading Aberdeen Admin…</p>
        </div>
      </AuthLoading>
      <Unauthenticated>
        <AdminAuthForm />
      </Unauthenticated>
      <Authenticated>
        <AdminShell />
      </Authenticated>
    </div>
  )
}

function AdminAuthForm() {
  const { signIn } = useAuthActions()
  const [flow, setFlow] = useState<AuthFlow>("signIn")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setError("")
      setIsSubmitting(true)
      const formData = new FormData(event.currentTarget)
      formData.set("flow", flow)
      void signIn("password", formData)
        .catch((signInError: unknown) => {
          setError(signInError instanceof Error ? signInError.message : "Authentication failed.")
        })
        .finally(() => setIsSubmitting(false))
    },
    [flow, signIn],
  )

  return (
    <main className="grid min-h-svh lg:grid-cols-[0.85fr_1.15fr]">
      <section className="relative hidden overflow-hidden bg-aberdeen-blue p-10 text-aberdeen-peach lg:flex lg:flex-col lg:justify-between">
        <img
          alt=""
          aria-hidden="true"
          className="absolute -right-28 -bottom-24 w-[34rem] opacity-15"
          src="/illustrations/nautical/compass-rose-detailed.png"
        />
        <img alt="Aberdeen" className="relative w-44" src="/brand/aberdeen-wordmark-peach.png" />
        <div className="relative max-w-xl">
          <p className="font-utility text-xs tracking-[0.2em] uppercase">Content management</p>
          <h1 className="mt-5 font-display text-6xl leading-none">
            Keep the room current, from anywhere.
          </h1>
        </div>
      </section>
      <section className="grid place-items-center bg-white px-6 py-12">
        <form className="w-full max-w-sm space-y-5" onSubmit={handleSubmit}>
          <img
            alt="Aberdeen"
            className="mb-10 w-40 lg:hidden"
            src="/brand/aberdeen-wordmark-blue.png"
          />
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-aberdeen-blue uppercase">
              Aberdeen Admin
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none text-aberdeen-blue">
              {flow === "signIn" ? "Welcome back." : "Create account."}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {flow === "signIn"
                ? "Sign in to manage the Aberdeen website."
                : "Only approved administrator emails can create an account."}
            </p>
          </div>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold text-slate-700">Email</span>
            <input
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm transition outline-none focus:border-aberdeen-blue focus:ring-3 focus:ring-aberdeen-blue/10"
              name="email"
              required
              type="email"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold text-slate-700">Password</span>
            <input
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm transition outline-none focus:border-aberdeen-blue focus:ring-3 focus:ring-aberdeen-blue/10"
              minLength={8}
              name="password"
              required
              type="password"
            />
          </label>
          {error ? (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          ) : null}
          <button
            className="w-full rounded-lg bg-aberdeen-blue px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#21317d] disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Working…" : flow === "signIn" ? "Sign in" : "Create account"}
          </button>
          <button
            className="w-full text-sm font-medium text-slate-500 transition hover:text-aberdeen-blue"
            onClick={() => {
              setError("")
              setFlow((current) => (current === "signIn" ? "signUp" : "signIn"))
            }}
            type="button"
          >
            {flow === "signIn" ? "Need to create an approved account?" : "Already have an account?"}
          </button>
        </form>
      </section>
    </main>
  )
}

function SidebarLink({
  children,
  icon,
  to,
  nested = false,
  onClick,
}: {
  children: ReactNode
  icon?: ReactNode
  to: string
  nested?: boolean
  onClick?: () => void
}) {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
          nested ? "ml-4" : ""
        } ${
          isActive
            ? "bg-white/12 font-semibold text-white"
            : "text-white/68 hover:bg-white/7 hover:text-white"
        }`
      }
      end
      onClick={onClick}
      to={to}
    >
      {icon}
      {children}
    </NavLink>
  )
}

function AdminShell() {
  const { signOut } = useAuthActions()
  const admin = useQuery(api.admin.currentAdmin)
  const ensureInitialized = useMutation(api.bootstrap.ensureInitialized)
  const initializeMenus = useMutation(api.menus.initializeDefaults)
  const menuPages = useQuery(api.menus.listAdmin)
  const location = useLocation()
  const [editorOpen, setEditorOpen] = useState(location.pathname.includes("/pages/"))
  const [menusOpen, setMenusOpen] = useState(location.pathname.includes("/menus/"))
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    void ensureInitialized()
  }, [ensureInitialized])

  useEffect(() => {
    if (menuPages?.length === 0) {
      void initializeMenus({ pages: defaultMenus })
    }
  }, [initializeMenus, menuPages])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const sidebar = (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-[#101b4c] px-3 py-4 text-white">
      <div className="flex h-14 items-center justify-between px-2">
        <img alt="Aberdeen" className="w-36" src="/brand/aberdeen-wordmark-peach.png" />
        <button
          aria-label="Close navigation"
          className="grid h-9 w-9 place-items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
          onClick={() => setMobileOpen(false)}
          type="button"
        >
          <X size={18} />
        </button>
      </div>
      <nav className="mt-5 grid grow content-start gap-1 overflow-y-auto">
        <SidebarLink icon={<ChartLineUp size={18} />} to="/admin">
          Dashboard
        </SidebarLink>
        <button
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/68 transition hover:bg-white/7 hover:text-white"
          onClick={() => setEditorOpen((current) => !current)}
          type="button"
        >
          <List size={18} />
          <span className="grow text-left">Page editor</span>
          <CaretDown
            className={`transition-transform ${editorOpen ? "rotate-180" : ""}`}
            size={14}
          />
        </button>
        <div
          className={`grid overflow-hidden transition-all ${
            editorOpen ? "max-h-[32rem] gap-1 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <SidebarLink icon={<House size={16} />} nested to="/admin/pages/home">
            Home
          </SidebarLink>
          <SidebarLink icon={<Info size={16} />} nested to="/admin/pages/about">
            About
          </SidebarLink>
          <SidebarLink icon={<Users size={16} />} nested to="/admin/pages/staff">
            Staff
          </SidebarLink>
          <SidebarLink icon={<CalendarBlank size={16} />} nested to="/admin/pages/events">
            Events page
          </SidebarLink>
          <SidebarLink icon={<EnvelopeSimple size={16} />} nested to="/admin/pages/contact">
            Contact page
          </SidebarLink>
          <SidebarLink icon={<SlidersHorizontal size={16} />} nested to="/admin/pages/settings">
            Footer and Global
          </SidebarLink>
        </div>
        <button
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/68 transition hover:bg-white/7 hover:text-white"
          onClick={() => setMenusOpen((current) => !current)}
          type="button"
        >
          <ForkKnife size={18} />
          <span className="grow text-left">Menu pages</span>
          <CaretDown
            className={`transition-transform ${menusOpen ? "rotate-180" : ""}`}
            size={14}
          />
        </button>
        <div
          className={`grid overflow-hidden transition-all ${
            menusOpen ? "max-h-[28rem] gap-1 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {menuPages?.map((menuPage, index) => (
            <SidebarLink
              icon={
                index === 0 ? (
                  <ForkKnife size={16} />
                ) : index === 1 ? (
                  <Wine size={16} />
                ) : (
                  <Coffee size={16} />
                )
              }
              key={menuPage._id}
              nested
              to={`/admin/menus/${menuPage._id}`}
            >
              {menuPage.title}
            </SidebarLink>
          ))}
          <Link
            className="ml-4 flex items-center gap-3 rounded-lg border border-dashed border-white/20 px-3 py-2.5 text-sm text-white/68 transition hover:bg-white/7 hover:text-white"
            to="/admin/menus/new"
          >
            <Plus size={16} /> Add menu page
          </Link>
        </div>
        <div className="my-2 border-t border-white/10" />
        <SidebarLink icon={<CalendarBlank size={18} />} to="/admin/events">
          Events
        </SidebarLink>
        <SidebarLink icon={<EnvelopeSimple size={18} />} to="/admin/inquiries">
          Inquiries
        </SidebarLink>
        <SidebarLink icon={<ImageSquare size={18} />} to="/admin/media">
          Media library
        </SidebarLink>
      </nav>
      <div className="mt-auto border-t border-white/10 pt-4">
        <a
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/7 hover:text-white"
          href="/"
        >
          <ArrowSquareOut size={18} /> Back to site
        </a>
        <p className="truncate px-3 text-xs text-white/45">{admin?.email ?? "Signed in"}</p>
        <button
          className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/7 hover:text-white"
          onClick={() => void signOut()}
          type="button"
        >
          <SignOut size={18} /> Sign out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex min-h-svh">
      <div className="sticky top-0 hidden h-svh lg:block">{sidebar}</div>
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 flex bg-slate-950/40 lg:hidden">
          {sidebar}
          <button
            aria-label="Close navigation"
            className="grow"
            onClick={() => setMobileOpen(false)}
            type="button"
          />
        </div>
      ) : null}
      <div className="min-w-0 grow">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:hidden">
          <button
            aria-label="Open navigation"
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-aberdeen-blue"
            onClick={() => setMobileOpen(true)}
            type="button"
          >
            <List size={19} />
          </button>
          <img alt="Aberdeen" className="ml-4 w-32" src="/brand/aberdeen-wordmark-blue.png" />
        </header>
        <main className="mx-auto w-full max-w-[1700px] p-4 md:p-6 lg:p-8">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="pages/home" element={<PageEditor page="/" />} />
            <Route path="pages/about" element={<PageEditor page="/about" />} />
            <Route path="pages/staff" element={<StaffEditor />} />
            <Route path="pages/events" element={<PageEditor page="/events" />} />
            <Route path="pages/contact" element={<PageEditor page="/contact" />} />
            <Route path="pages/settings" element={<SettingsEditor />} />
            <Route path="events" element={<EventsEditor />} />
            <Route path="menus/new" element={<MenuPagesEditor creating />} />
            <Route path="menus/:pageId" element={<MenuPagesEditor />} />
            <Route path="inquiries" element={<InquiryInbox />} />
            <Route
              path="media"
              element={
                <div className="grid gap-6">
                  <PageHeading
                    description="Reusable photos, videos, decorations, and backgrounds used throughout the site."
                    title="Media library"
                  />
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <MediaLibrary />
                  </div>
                </div>
              }
            />
            <Route path="*" element={<Navigate replace to="/admin" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default AdminPage
