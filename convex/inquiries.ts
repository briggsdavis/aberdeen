import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireAdmin } from "./lib/admin"

const inquiryType = v.union(v.literal("contact"), v.literal("privateEvent"))
const inquiryStatus = v.union(v.literal("new"), v.literal("read"), v.literal("archived"))

export const submit = mutation({
  args: {
    type: inquiryType,
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim()
    const email = args.email.trim().toLowerCase()
    const phone = args.phone?.trim() || undefined
    const message = args.message.trim()

    if (!name || !email.includes("@") || !message) {
      throw new Error("Please provide your name, a valid email, and a message.")
    }
    if (name.length > 160 || email.length > 320 || (phone?.length ?? 0) > 160) {
      throw new Error("Please shorten your contact details and try again.")
    }
    if (message.length > 4000) {
      throw new Error("Please shorten your message to 4,000 characters or fewer.")
    }

    return await ctx.db.insert("inquiries", {
      type: args.type,
      name,
      email,
      ...(phone ? { phone } : {}),
      message,
      status: "new",
      starred: false,
      createdAt: Date.now(),
    })
  },
})

export const listAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    return await ctx.db.query("inquiries").withIndex("by_createdAt").order("desc").take(500)
  },
})

export const setStatus = mutation({
  args: { id: v.id("inquiries"), status: inquiryStatus },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.patch("inquiries", args.id, { status: args.status })
    return null
  },
})

export const setStarred = mutation({
  args: { id: v.id("inquiries"), starred: v.boolean() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.patch("inquiries", args.id, { starred: args.starred })
    return null
  },
})

export const remove = mutation({
  args: { id: v.id("inquiries") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.delete(args.id)
    return null
  },
})
