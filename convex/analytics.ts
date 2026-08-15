import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import type { MutationCtx } from "./_generated/server"
import { requireAdmin } from "./lib/admin"

const staticPublicPaths = new Set(["/", "/about", "/contact", "/events", "/staff", "/test"])
const legacyMenuPaths = new Set(["/menu/food", "/menu/spirits", "/menu/beverages"])

async function isValidPublicPath(ctx: MutationCtx, path: string) {
  if (staticPublicPaths.has(path) || legacyMenuPaths.has(path)) return true
  if (!path.startsWith("/menu/")) return false
  const slug = path.slice("/menu/".length)
  if (!slug || slug.includes("/")) return false
  return Boolean(
    await ctx.db
      .query("menuPages")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique(),
  )
}

export const trackPageView = mutation({
  args: { path: v.string(), sessionId: v.string() },
  handler: async (ctx, args) => {
    if (!args.path.startsWith("/") || args.path.startsWith("/admin")) return null
    if (args.path.length > 160 || args.sessionId.length > 100) return null
    if (!(await isValidPublicPath(ctx, args.path))) return null
    await ctx.db.insert("pageViews", { ...args, createdAt: Date.now() })
    return null
  },
})

export const dashboard = query({
  args: { now: v.number(), days: v.number() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const days = Math.max(7, Math.min(90, Math.round(args.days)))
    const since = args.now - days * 24 * 60 * 60 * 1000
    const [storedViews, inquiries, menuPages] = await Promise.all([
      ctx.db
        .query("pageViews")
        .withIndex("by_createdAt", (q) => q.gte("createdAt", since))
        .take(5000),
      ctx.db
        .query("inquiries")
        .withIndex("by_createdAt", (q) => q.gte("createdAt", since))
        .take(1000),
      ctx.db.query("menuPages").withIndex("by_order").collect(),
    ])
    const validPaths = new Set([
      ...staticPublicPaths,
      ...legacyMenuPaths,
      ...menuPages.map((page) => `/menu/${page.slug}`),
    ])
    const views = storedViews.filter((view) => validPaths.has(view.path))
    const uniqueVisitors = new Set(views.map((view) => view.sessionId)).size
    const pathCounts = new Map<string, number>()
    const dailyViews = Array.from({ length: days }, (_, index) => ({
      date: new Date(since + index * 86_400_000).toISOString().slice(0, 10),
      views: 0,
    }))

    for (const view of views) {
      pathCounts.set(view.path, (pathCounts.get(view.path) ?? 0) + 1)
      const index = Math.min(
        days - 1,
        Math.max(0, Math.floor((view.createdAt - since) / 86_400_000)),
      )
      dailyViews[index]!.views += 1
    }

    return {
      pageViews: views.length,
      uniqueVisitors,
      inquiries: inquiries.length,
      contactInquiries: inquiries.filter((inquiry) => inquiry.type === "contact").length,
      privateEventInquiries: inquiries.filter((inquiry) => inquiry.type === "privateEvent").length,
      conversionRate: uniqueVisitors ? (inquiries.length / uniqueVisitors) * 100 : 0,
      popularPages: [...pathCounts.entries()]
        .toSorted((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([path, viewsForPath]) => ({ path, views: viewsForPath })),
      dailyViews,
    }
  },
})
