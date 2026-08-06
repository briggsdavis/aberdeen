import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireAdmin } from "./lib/admin"

const linkValidator = v.object({
  href: v.string(),
  text: v.string(),
})

export const getPage = query({
  args: { page: v.string() },
  handler: async (ctx, args) => {
    const page = await ctx.db
      .query("pageOverrides")
      .withIndex("by_page", (q) => q.eq("page", args.page))
      .unique()

    if (!page) {
      return { text: {}, links: {}, images: {}, media: {} }
    }

    const images: Record<string, string> = {}
    const mediaByKey: Record<
      string,
      { kind: "image" | "video"; thumbnailUrl: string | null; url: string }
    > = {}

    for (const [key, mediaId] of Object.entries(page.images)) {
      if (mediaId === null) continue
      const asset = await ctx.db.get(mediaId)
      if (!asset) continue
      const url = asset.storageId
        ? await ctx.storage.getUrl(asset.storageId)
        : (asset.sourceUrl ?? null)
      const thumbnailUrl = asset.thumbnailStorageId
        ? await ctx.storage.getUrl(asset.thumbnailStorageId)
        : null
      if (url) {
        images[key] = url
        mediaByKey[key] = { kind: asset.kind, thumbnailUrl, url }
      }
    }

    return {
      text: page.text,
      links: page.links,
      images,
      media: mediaByKey,
    }
  },
})

export const getPageAdmin = query({
  args: { page: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    return await ctx.db
      .query("pageOverrides")
      .withIndex("by_page", (q) => q.eq("page", args.page))
      .unique()
  },
})

export const savePage = mutation({
  args: {
    page: v.string(),
    text: v.record(v.string(), v.string()),
    links: v.record(v.string(), linkValidator),
    images: v.record(v.string(), v.union(v.id("mediaAssets"), v.null())),
    imageRoles: v.record(
      v.string(),
      v.union(v.literal("content"), v.literal("decorative"), v.literal("background")),
    ),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const existing = await ctx.db
      .query("pageOverrides")
      .withIndex("by_page", (q) => q.eq("page", args.page))
      .unique()
    const values = {
      text: args.text,
      links: args.links,
      images: args.images,
      updatedAt: Date.now(),
    }

    if (existing) {
      await ctx.db.patch("pageOverrides", existing._id, values)
    } else {
      await ctx.db.insert("pageOverrides", { page: args.page, ...values })
    }

    const oldUsages = await ctx.db
      .query("mediaUsages")
      .withIndex("by_page", (q) => q.eq("page", args.page))
      .take(500)
    for (const usage of oldUsages) {
      await ctx.db.delete("mediaUsages", usage._id)
    }
    for (const [slotKey, mediaId] of Object.entries(args.images)) {
      if (mediaId === null) continue
      await ctx.db.insert("mediaUsages", {
        mediaId,
        page: args.page,
        slotKey,
        role: args.imageRoles[slotKey] ?? "content",
      })
    }
    return null
  },
})
