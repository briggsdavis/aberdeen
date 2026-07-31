import { paginationOptsValidator } from "convex/server"
import { ConvexError, v } from "convex/values"
import type { Doc, Id } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import type { MutationCtx, QueryCtx } from "./_generated/server"
import { requireAdmin } from "./lib/admin"

const mediaKind = v.union(v.literal("image"), v.literal("video"))
const mediaRole = v.union(v.literal("content"), v.literal("decorative"), v.literal("background"))

async function mediaUrls(ctx: QueryCtx, asset: Doc<"mediaAssets">) {
  const url = asset.storageId
    ? await ctx.storage.getUrl(asset.storageId)
    : (asset.sourceUrl ?? null)
  const thumbnailUrl = asset.thumbnailStorageId
    ? await ctx.storage.getUrl(asset.thumbnailStorageId)
    : null
  return { thumbnailUrl, url }
}

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    return await ctx.storage.generateUploadUrl()
  },
})

export const save = mutation({
  args: {
    storageId: v.id("_storage"),
    thumbnailStorageId: v.optional(v.id("_storage")),
    filename: v.string(),
    alt: v.string(),
    contentType: v.string(),
    kind: mediaKind,
    size: v.number(),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    duration: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    return await ctx.db.insert("mediaAssets", {
      ...args,
      createdAt: Date.now(),
    })
  },
})

export const list = query({
  args: {
    paginationOpts: paginationOptsValidator,
    kind: v.union(v.literal("all"), mediaKind),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    let result
    if (args.kind === "all") {
      result = await ctx.db
        .query("mediaAssets")
        .withIndex("by_createdAt")
        .order("desc")
        .paginate(args.paginationOpts)
    } else {
      const selectedKind = args.kind
      result = await ctx.db
        .query("mediaAssets")
        .withIndex("by_kind_and_createdAt", (q) => q.eq("kind", selectedKind))
        .order("desc")
        .paginate(args.paginationOpts)
    }

    return {
      ...result,
      page: await Promise.all(
        result.page.map(async (asset) => {
          const usages = await ctx.db
            .query("mediaUsages")
            .withIndex("by_mediaId", (q) => q.eq("mediaId", asset._id))
            .take(250)
          const pageCounts = new Map<string, number>()
          for (const usage of usages) {
            pageCounts.set(usage.page, (pageCounts.get(usage.page) ?? 0) + 1)
          }
          return {
            ...asset,
            ...(await mediaUrls(ctx, asset)),
            usageCount: usages.length,
            usageRoles: [...new Set(usages.map((usage) => usage.role))],
            usages: [...pageCounts.entries()].map(([page, count]) => ({ count, page })),
          }
        }),
      ),
    }
  },
})

export const registerPageAssets = mutation({
  args: {
    page: v.string(),
    assets: v.array(
      v.object({
        slotKey: v.string(),
        url: v.string(),
        alt: v.string(),
        role: mediaRole,
      }),
    ),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const ids: Record<string, Id<"mediaAssets">> = {}

    for (const item of args.assets.slice(0, 250)) {
      let asset = await ctx.db
        .query("mediaAssets")
        .withIndex("by_sourceUrl", (q) => q.eq("sourceUrl", item.url))
        .first()

      if (!asset) {
        const filename = decodeURIComponent(
          item.url.split("/").pop()?.split("?")[0] || "site-image",
        )
        const id = await ctx.db.insert("mediaAssets", {
          sourceUrl: item.url,
          filename,
          alt: item.alt,
          contentType: item.url.endsWith(".png")
            ? "image/png"
            : item.url.endsWith(".webp")
              ? "image/webp"
              : "image/jpeg",
          kind: "image",
          size: 0,
          createdAt: Date.now(),
        })
        asset = await ctx.db.get("mediaAssets", id)
      }
      if (!asset) continue
      ids[item.slotKey] = asset._id

      const existingUsage = await ctx.db
        .query("mediaUsages")
        .withIndex("by_page_and_slotKey", (q) =>
          q.eq("page", args.page).eq("slotKey", item.slotKey),
        )
        .first()
      if (existingUsage) {
        await ctx.db.patch("mediaUsages", existingUsage._id, {
          mediaId: asset._id,
          role: item.role,
        })
      } else {
        await ctx.db.insert("mediaUsages", {
          mediaId: asset._id,
          page: args.page,
          slotKey: item.slotKey,
          role: item.role,
        })
      }
    }

    return ids
  },
})

async function assertUnused(ctx: MutationCtx, ids: Id<"mediaAssets">[]) {
  for (const id of ids) {
    const usage = await ctx.db
      .query("mediaUsages")
      .withIndex("by_mediaId", (q) => q.eq("mediaId", id))
      .take(1)
    if (usage.length) {
      throw new ConvexError("Media currently used on the site cannot be deleted.")
    }
  }
}

export const remove = mutation({
  args: { ids: v.array(v.id("mediaAssets")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const ids = args.ids.slice(0, 100)
    await assertUnused(ctx, ids)
    for (const id of ids) {
      const asset = await ctx.db.get("mediaAssets", id)
      if (!asset) continue
      if (asset.storageId) await ctx.storage.delete(asset.storageId)
      if (asset.thumbnailStorageId) await ctx.storage.delete(asset.thumbnailStorageId)
      await ctx.db.delete("mediaAssets", id)
    }
    return null
  },
})
