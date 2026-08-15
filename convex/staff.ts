import { v } from "convex/values"
import type { Id } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import type { MutationCtx, QueryCtx } from "./_generated/server"
import { requireAdmin } from "./lib/admin"

async function hydrateImage(
  ctx: QueryCtx,
  member: {
    imageUrl?: string
    imageMediaId?: Id<"mediaAssets">
  },
) {
  if (member.imageMediaId) {
    const media = await ctx.db.get("mediaAssets", member.imageMediaId)
    if (media) {
      return (
        (media.storageId ? await ctx.storage.getUrl(media.storageId) : media.sourceUrl) ??
        member.imageUrl ??
        ""
      )
    }
  }
  return member.imageUrl ?? ""
}

async function syncUsage(
  ctx: MutationCtx,
  memberId: Id<"staffMembers">,
  mediaId?: Id<"mediaAssets">,
) {
  const slotKey = `staff:${memberId}`
  const existing = await ctx.db
    .query("mediaUsages")
    .withIndex("by_page_and_slotKey", (q) => q.eq("page", "/staff").eq("slotKey", slotKey))
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
      page: "/staff",
      slotKey,
      role: "content",
    })
  }
}

export const listPublic = query({
  args: {},
  handler: async (ctx) => {
    const members = await ctx.db.query("staffMembers").withIndex("by_order").take(100)
    return await Promise.all(
      members.map(async (member) => ({
        ...member,
        image: await hydrateImage(ctx, member),
      })),
    )
  },
})

export const listAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    const members = await ctx.db.query("staffMembers").withIndex("by_order").take(100)
    return await Promise.all(
      members.map(async (member) => ({
        ...member,
        image: await hydrateImage(ctx, member),
      })),
    )
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    biography: v.string(),
    imageUrl: v.optional(v.string()),
    imageMediaId: v.optional(v.id("mediaAssets")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const rows = await ctx.db.query("staffMembers").withIndex("by_order").order("desc").take(1)
    const id = await ctx.db.insert("staffMembers", {
      ...args,
      order: (rows[0]?.order ?? -1) + 1,
    })
    await syncUsage(ctx, id, args.imageMediaId)
    return id
  },
})

export const update = mutation({
  args: {
    id: v.id("staffMembers"),
    name: v.string(),
    role: v.string(),
    biography: v.string(),
    imageUrl: v.optional(v.string()),
    imageMediaId: v.optional(v.id("mediaAssets")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const { id, ...values } = args
    await ctx.db.patch("staffMembers", id, values)
    await syncUsage(ctx, id, args.imageMediaId)
    return null
  },
})

export const remove = mutation({
  args: { id: v.id("staffMembers") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await syncUsage(ctx, args.id)
    await ctx.db.delete("staffMembers", args.id)
    return null
  },
})

export const reorder = mutation({
  args: { ids: v.array(v.id("staffMembers")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await Promise.all(args.ids.map((id, order) => ctx.db.patch("staffMembers", id, { order })))
    return null
  },
})
