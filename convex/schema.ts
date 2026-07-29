import { authTables } from "@convex-dev/auth/server"
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  ...authTables,
  pageOverrides: defineTable({
    page: v.string(),
    text: v.record(v.string(), v.string()),
    links: v.record(
      v.string(),
      v.object({
        href: v.string(),
        text: v.string(),
      }),
    ),
    images: v.record(v.string(), v.id("mediaAssets")),
    updatedAt: v.number(),
  }).index("by_page", ["page"]),
  mediaAssets: defineTable({
    storageId: v.optional(v.id("_storage")),
    sourceUrl: v.optional(v.string()),
    thumbnailStorageId: v.optional(v.id("_storage")),
    filename: v.string(),
    alt: v.string(),
    contentType: v.string(),
    kind: v.union(v.literal("image"), v.literal("video")),
    size: v.number(),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    duration: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_kind_and_createdAt", ["kind", "createdAt"])
    .index("by_sourceUrl", ["sourceUrl"]),
  mediaUsages: defineTable({
    mediaId: v.id("mediaAssets"),
    page: v.string(),
    slotKey: v.string(),
    role: v.union(v.literal("content"), v.literal("decorative"), v.literal("background")),
  })
    .index("by_mediaId", ["mediaId"])
    .index("by_page", ["page"])
    .index("by_page_and_slotKey", ["page", "slotKey"]),
  staffMembers: defineTable({
    name: v.string(),
    role: v.string(),
    biography: v.string(),
    imageUrl: v.optional(v.string()),
    imageMediaId: v.optional(v.id("mediaAssets")),
    order: v.number(),
  }).index("by_order", ["order"]),
  events: defineTable({
    title: v.string(),
    description: v.string(),
    startsAt: v.number(),
    imageUrl: v.optional(v.string()),
    imageMediaId: v.optional(v.id("mediaAssets")),
    bookingUrl: v.string(),
    status: v.union(v.literal("published"), v.literal("archived")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_startsAt", ["startsAt"])
    .index("by_status_and_startsAt", ["status", "startsAt"]),
  siteSettings: defineTable({
    key: v.string(),
    value: v.string(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
  contactDetails: defineTable({
    label: v.string(),
    value: v.string(),
    note: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),
  openingHours: defineTable({
    label: v.string(),
    value: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),
  socialLinks: defineTable({
    platform: v.string(),
    url: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),
  inquiries: defineTable({
    type: v.union(v.literal("contact"), v.literal("privateEvent")),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
    status: v.union(v.literal("new"), v.literal("read"), v.literal("archived")),
    starred: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_status_and_createdAt", ["status", "createdAt"])
    .index("by_type_and_createdAt", ["type", "createdAt"]),
  pageViews: defineTable({
    path: v.string(),
    sessionId: v.string(),
    createdAt: v.number(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_path_and_createdAt", ["path", "createdAt"]),
})
