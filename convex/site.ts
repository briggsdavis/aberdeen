import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireAdmin } from "./lib/admin"

const collectionValidator = v.union(
  v.literal("contactDetails"),
  v.literal("openingHours"),
  v.literal("socialLinks"),
)

export const getPublicSettings = query({
  args: {},
  handler: async (ctx) => {
    const [settings, contactDetails, openingHours, socialLinks] = await Promise.all([
      ctx.db.query("siteSettings").take(50),
      ctx.db.query("contactDetails").withIndex("by_order").take(50),
      ctx.db.query("openingHours").withIndex("by_order").take(50),
      ctx.db.query("socialLinks").withIndex("by_order").take(50),
    ])

    return {
      settings: Object.fromEntries(settings.map((setting) => [setting.key, setting.value])),
      contactDetails,
      openingHours,
      socialLinks,
    }
  },
})

export const getAdminSettings = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    const [settings, contactDetails, openingHours, socialLinks] = await Promise.all([
      ctx.db.query("siteSettings").take(50),
      ctx.db.query("contactDetails").withIndex("by_order").take(50),
      ctx.db.query("openingHours").withIndex("by_order").take(50),
      ctx.db.query("socialLinks").withIndex("by_order").take(50),
    ])

    return {
      settings: Object.fromEntries(settings.map((setting) => [setting.key, setting.value])),
      contactDetails,
      openingHours,
      socialLinks,
    }
  },
})

export const saveSetting = mutation({
  args: { key: v.string(), value: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique()

    if (existing) {
      await ctx.db.patch("siteSettings", existing._id, {
        value: args.value,
        updatedAt: Date.now(),
      })
      return existing._id
    }

    return await ctx.db.insert("siteSettings", { ...args, updatedAt: Date.now() })
  },
})

export const saveGlobal = mutation({
  args: {
    settings: v.record(v.string(), v.string()),
    contactDetails: v.array(v.object({ label: v.string(), value: v.string(), note: v.string() })),
    openingHours: v.array(v.object({ label: v.string(), value: v.string() })),
    socialLinks: v.array(v.object({ platform: v.string(), url: v.string() })),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const now = Date.now()

    for (const [key, value] of Object.entries(args.settings)) {
      const existing = await ctx.db
        .query("siteSettings")
        .withIndex("by_key", (q) => q.eq("key", key))
        .unique()
      if (existing) {
        await ctx.db.patch("siteSettings", existing._id, { value, updatedAt: now })
      } else {
        await ctx.db.insert("siteSettings", { key, value, updatedAt: now })
      }
    }

    for (const row of await ctx.db.query("contactDetails").take(100)) {
      await ctx.db.delete("contactDetails", row._id)
    }
    for (const row of await ctx.db.query("openingHours").take(100)) {
      await ctx.db.delete("openingHours", row._id)
    }
    for (const row of await ctx.db.query("socialLinks").take(100)) {
      await ctx.db.delete("socialLinks", row._id)
    }

    for (const [order, row] of args.contactDetails.entries()) {
      await ctx.db.insert("contactDetails", { ...row, order })
    }
    for (const [order, row] of args.openingHours.entries()) {
      await ctx.db.insert("openingHours", { ...row, order })
    }
    for (const [order, row] of args.socialLinks.entries()) {
      await ctx.db.insert("socialLinks", { ...row, order })
    }

    return null
  },
})

export const addCollectionItem = mutation({
  args: {
    collection: collectionValidator,
    label: v.optional(v.string()),
    value: v.optional(v.string()),
    note: v.optional(v.string()),
    platform: v.optional(v.string()),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)

    if (args.collection === "contactDetails") {
      const rows = await ctx.db.query("contactDetails").withIndex("by_order").order("desc").take(1)
      return await ctx.db.insert("contactDetails", {
        label: args.label ?? "Contact",
        value: args.value ?? "",
        note: args.note ?? "",
        order: (rows[0]?.order ?? -1) + 1,
      })
    }

    if (args.collection === "openingHours") {
      const rows = await ctx.db.query("openingHours").withIndex("by_order").order("desc").take(1)
      return await ctx.db.insert("openingHours", {
        label: args.label ?? "Day",
        value: args.value ?? "",
        order: (rows[0]?.order ?? -1) + 1,
      })
    }

    const rows = await ctx.db.query("socialLinks").withIndex("by_order").order("desc").take(1)
    return await ctx.db.insert("socialLinks", {
      platform: args.platform ?? "Instagram",
      url: args.url ?? "",
      order: (rows[0]?.order ?? -1) + 1,
    })
  },
})

export const updateContactDetail = mutation({
  args: {
    id: v.id("contactDetails"),
    label: v.string(),
    value: v.string(),
    note: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.patch("contactDetails", args.id, {
      label: args.label,
      value: args.value,
      note: args.note,
    })
    return null
  },
})

export const updateOpeningHour = mutation({
  args: { id: v.id("openingHours"), label: v.string(), value: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.patch("openingHours", args.id, { label: args.label, value: args.value })
    return null
  },
})

export const updateSocialLink = mutation({
  args: { id: v.id("socialLinks"), platform: v.string(), url: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.patch("socialLinks", args.id, { platform: args.platform, url: args.url })
    return null
  },
})

export const removeCollectionItem = mutation({
  args: {
    collection: collectionValidator,
    id: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)

    if (args.collection === "contactDetails") {
      await ctx.db.delete("contactDetails", args.id as never)
    } else if (args.collection === "openingHours") {
      await ctx.db.delete("openingHours", args.id as never)
    } else {
      await ctx.db.delete("socialLinks", args.id as never)
    }
    return null
  },
})

export const reorderCollection = mutation({
  args: {
    collection: collectionValidator,
    ids: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)

    for (const [order, id] of args.ids.entries()) {
      if (args.collection === "contactDetails") {
        await ctx.db.patch("contactDetails", id as never, { order })
      } else if (args.collection === "openingHours") {
        await ctx.db.patch("openingHours", id as never, { order })
      } else {
        await ctx.db.patch("socialLinks", id as never, { order })
      }
    }
    return null
  },
})
