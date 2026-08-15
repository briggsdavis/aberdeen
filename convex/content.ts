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
      return { text: {}, links: {}, media: {} }
    }

    const mediaByKey: Record<
      string,
      { kind: "image" | "video"; thumbnailUrl: string | null; url: string }
    > = {}

    await Promise.all(
      Object.entries(page.images).map(async ([key, mediaId]) => {
        if (mediaId === null) return
        const asset = await ctx.db.get(mediaId)
        if (!asset) return
        const [url, thumbnailUrl] = await Promise.all([
          asset.storageId ? ctx.storage.getUrl(asset.storageId) : asset.sourceUrl,
          asset.thumbnailStorageId ? ctx.storage.getUrl(asset.thumbnailStorageId) : null,
        ])
        if (url) mediaByKey[key] = { kind: asset.kind, thumbnailUrl, url }
      }),
    )

    return {
      text: page.text,
      links: page.links,
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
    await Promise.all(oldUsages.map((usage) => ctx.db.delete("mediaUsages", usage._id)))
    await Promise.all(
      Object.entries(args.images).map(([slotKey, mediaId]) =>
        mediaId === null
          ? null
          : ctx.db.insert("mediaUsages", {
              mediaId,
              page: args.page,
              slotKey,
              role: args.imageRoles[slotKey] ?? "content",
            }),
      ),
    )
    return null
  },
})
