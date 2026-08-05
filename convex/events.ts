import { v } from "convex/values"
import type { Doc } from "./_generated/dataModel"
import type { Id } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import type { QueryCtx } from "./_generated/server"
import type { MutationCtx } from "./_generated/server"
import { requireAdmin } from "./lib/admin"

const eventFields = {
  title: v.string(),
  description: v.string(),
  startsAt: v.number(),
  recurrence: v.optional(v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly"))),
  imageUrl: v.optional(v.string()),
  imageMediaId: v.optional(v.id("mediaAssets")),
  bookingUrl: v.string(),
}

async function withImage(ctx: QueryCtx, event: Doc<"events">) {
  if (event.imageMediaId) {
    const media = await ctx.db.get(event.imageMediaId)
    if (media) {
      const url = media.storageId ? await ctx.storage.getUrl(media.storageId) : media.sourceUrl
      return { ...event, image: url ?? event.imageUrl ?? "" }
    }
  }
  return { ...event, image: event.imageUrl ?? "" }
}

async function syncUsage(ctx: MutationCtx, eventId: Id<"events">, mediaId?: Id<"mediaAssets">) {
  const slotKey = `event:${eventId}`
  const existing = await ctx.db
    .query("mediaUsages")
    .withIndex("by_page_and_slotKey", (q) => q.eq("page", "/events").eq("slotKey", slotKey))
    .unique()
  if (!mediaId) {
    if (existing) await ctx.db.delete("mediaUsages", existing._id)
    return
  }
  if (existing) {
    await ctx.db.patch("mediaUsages", existing._id, { mediaId })
  } else {
    await ctx.db.insert("mediaUsages", {
      mediaId,
      page: "/events",
      slotKey,
      role: "content",
    })
  }
}

export const listPublic = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db
      .query("events")
      .withIndex("by_status_and_startsAt", (q) => q.eq("status", "published"))
      .take(100)
    return await Promise.all(events.map((event) => withImage(ctx, event)))
  },
})

export const listAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    const events = await ctx.db.query("events").withIndex("by_startsAt").order("desc").take(250)
    return await Promise.all(events.map((event) => withImage(ctx, event)))
  },
})

export const create = mutation({
  args: eventFields,
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const now = Date.now()
    const id = await ctx.db.insert("events", {
      ...args,
      status: "published",
      createdAt: now,
      updatedAt: now,
    })
    await syncUsage(ctx, id, args.imageMediaId)
    return id
  },
})

export const update = mutation({
  args: { id: v.id("events"), ...eventFields },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const { id, ...values } = args
    await ctx.db.patch("events", id, { ...values, updatedAt: Date.now() })
    await syncUsage(ctx, id, args.imageMediaId)
    return null
  },
})

export const setStatus = mutation({
  args: {
    id: v.id("events"),
    status: v.union(v.literal("published"), v.literal("archived")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.patch("events", args.id, { status: args.status, updatedAt: Date.now() })
    return null
  },
})

export const remove = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await syncUsage(ctx, args.id)
    await ctx.db.delete("events", args.id)
    return null
  },
})
