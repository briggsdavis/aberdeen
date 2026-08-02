import { ConvexError, v } from "convex/values"
import type { Doc, Id } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import type { MutationCtx, QueryCtx } from "./_generated/server"
import { requireAdmin } from "./lib/admin"

const layoutValidator = v.union(
  v.literal("imageLeft"),
  v.literal("imageRight"),
  v.literal("paired"),
)
const backgroundValidator = v.union(v.literal("oyster"), v.literal("peach"), v.literal("blue"))

async function assetUrl(ctx: QueryCtx, id: Id<"mediaAssets"> | undefined) {
  if (!id) return null
  const asset = await ctx.db.get(id)
  if (!asset) return null
  return asset.storageId ? await ctx.storage.getUrl(asset.storageId) : (asset.sourceUrl ?? null)
}

const menuUsagePage = (pageId: Id<"menuPages">) => `menu:${pageId}`

async function setMediaUsage(
  ctx: MutationCtx,
  pageId: Id<"menuPages">,
  slotKey: string,
  mediaId: Id<"mediaAssets"> | undefined,
  role: "content" | "decorative" | "background",
) {
  const page = menuUsagePage(pageId)
  const existing = await ctx.db
    .query("mediaUsages")
    .withIndex("by_page_and_slotKey", (q) => q.eq("page", page).eq("slotKey", slotKey))
    .unique()
  if (!mediaId) {
    if (existing) await ctx.db.delete(existing._id)
    return
  }
  if (existing) {
    await ctx.db.patch(existing._id, { mediaId, role })
  } else {
    await ctx.db.insert("mediaUsages", { page, slotKey, mediaId, role })
  }
}

async function syncSectionMediaUsages(
  ctx: MutationCtx,
  pageId: Id<"menuPages">,
  sectionId: Id<"menuSections">,
  values: {
    mapMediaId?: Id<"mediaAssets">
    imageMediaId?: Id<"mediaAssets">
    postcardOneMediaId?: Id<"mediaAssets">
    postcardTwoMediaId?: Id<"mediaAssets">
    postcardThreeMediaId?: Id<"mediaAssets">
  },
) {
  await setMediaUsage(ctx, pageId, `section:${sectionId}:map`, values.mapMediaId, "decorative")
  await setMediaUsage(ctx, pageId, `section:${sectionId}:image`, values.imageMediaId, "content")
  await setMediaUsage(
    ctx,
    pageId,
    `section:${sectionId}:postcard-1`,
    values.postcardOneMediaId,
    "content",
  )
  await setMediaUsage(
    ctx,
    pageId,
    `section:${sectionId}:postcard-2`,
    values.postcardTwoMediaId,
    "content",
  )
  await setMediaUsage(
    ctx,
    pageId,
    `section:${sectionId}:postcard-3`,
    values.postcardThreeMediaId,
    "content",
  )
}

async function nestedPage(ctx: QueryCtx, page: Doc<"menuPages">) {
  const sections = await ctx.db
    .query("menuSections")
    .withIndex("by_pageId_and_order", (q) => q.eq("pageId", page._id))
    .collect()

  return {
    ...page,
    heroImage: await assetUrl(ctx, page.heroMediaId),
    sections: await Promise.all(
      sections.map(async (section) => {
        const groups = await ctx.db
          .query("menuGroups")
          .withIndex("by_sectionId_and_order", (q) => q.eq("sectionId", section._id))
          .collect()
        return {
          ...section,
          mapImage: (await assetUrl(ctx, section.mapMediaId)) ?? section.mapImage,
          image: await assetUrl(ctx, section.imageMediaId),
          postcards: await Promise.all([
            assetUrl(ctx, section.postcardOneMediaId),
            assetUrl(ctx, section.postcardTwoMediaId),
            assetUrl(ctx, section.postcardThreeMediaId),
          ]),
          groups: await Promise.all(
            groups.map(async (group) => ({
              ...group,
              items: await ctx.db
                .query("menuItems")
                .withIndex("by_groupId_and_order", (q) => q.eq("groupId", group._id))
                .collect(),
            })),
          ),
        }
      }),
    ),
  }
}

export const listPublicNavigation = query({
  args: {},
  handler: async (ctx) => {
    const pages = await ctx.db.query("menuPages").withIndex("by_order").collect()
    return await Promise.all(
      pages.map(async (page) => {
        const sections = await ctx.db
          .query("menuSections")
          .withIndex("by_pageId_and_order", (q) => q.eq("pageId", page._id))
          .collect()
        const sectionGroups = await Promise.all(
          sections.map((section) =>
            ctx.db
              .query("menuGroups")
              .withIndex("by_sectionId_and_order", (q) => q.eq("sectionId", section._id))
              .collect(),
          ),
        )

        return {
          ...page,
          heroImage: await assetUrl(ctx, page.heroMediaId),
          sectionTitles: sectionGroups
            .flat()
            .map((group) => group.title)
            .slice(0, 3),
        }
      }),
    )
  },
})

export const getPublicBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const page = await ctx.db
      .query("menuPages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique()
    return page ? await nestedPage(ctx, page) : null
  },
})

export const listAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    return await ctx.db.query("menuPages").withIndex("by_order").collect()
  },
})

export const getAdmin = query({
  args: { id: v.id("menuPages") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const page = await ctx.db.get(args.id)
    return page ? await nestedPage(ctx, page) : null
  },
})

function normalizedSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

async function assertUniqueSlug(ctx: MutationCtx, slug: string, except?: Id<"menuPages">) {
  const existing = await ctx.db
    .query("menuPages")
    .withIndex("by_slug", (q) => q.eq("slug", slug))
    .unique()
  if (existing && existing._id !== except) {
    throw new ConvexError("A menu page already uses this URL.")
  }
}

export const createPage = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    heroMediaId: v.id("mediaAssets"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const slug = normalizedSlug(args.title)
    if (!slug) throw new ConvexError("Enter a valid menu page title.")
    await assertUniqueSlug(ctx, slug)
    const pages = await ctx.db.query("menuPages").withIndex("by_order").collect()
    const now = Date.now()
    const id = await ctx.db.insert("menuPages", {
      ...args,
      slug,
      order: pages.length,
      createdAt: now,
      updatedAt: now,
    })
    await setMediaUsage(ctx, id, "hero", args.heroMediaId, "background")
    return id
  },
})

export const updatePage = mutation({
  args: {
    id: v.id("menuPages"),
    title: v.string(),
    description: v.string(),
    heroMediaId: v.id("mediaAssets"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const slug = normalizedSlug(args.title)
    if (!slug) throw new ConvexError("Enter a valid menu page title.")
    await assertUniqueSlug(ctx, slug, args.id)
    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
      heroMediaId: args.heroMediaId,
      slug,
      updatedAt: Date.now(),
    })
    await setMediaUsage(ctx, args.id, "hero", args.heroMediaId, "background")
    return slug
  },
})

async function deleteSection(ctx: MutationCtx, id: Id<"menuSections">) {
  const section = await ctx.db.get(id)
  const groups = await ctx.db
    .query("menuGroups")
    .withIndex("by_sectionId_and_order", (q) => q.eq("sectionId", id))
    .collect()
  for (const group of groups) {
    const items = await ctx.db
      .query("menuItems")
      .withIndex("by_groupId_and_order", (q) => q.eq("groupId", group._id))
      .collect()
    for (const item of items) await ctx.db.delete(item._id)
    await ctx.db.delete(group._id)
  }
  if (section) {
    await syncSectionMediaUsages(ctx, section.pageId, id, {})
  }
  await ctx.db.delete(id)
}

export const removePage = mutation({
  args: { id: v.id("menuPages") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const sections = await ctx.db
      .query("menuSections")
      .withIndex("by_pageId_and_order", (q) => q.eq("pageId", args.id))
      .collect()
    for (const section of sections) await deleteSection(ctx, section._id)
    await setMediaUsage(ctx, args.id, "hero", undefined, "background")
    await ctx.db.delete(args.id)
    return null
  },
})

export const reorderPages = mutation({
  args: { ids: v.array(v.id("menuPages")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    for (const [order, id] of args.ids.entries()) await ctx.db.patch(id, { order })
    return null
  },
})

const sectionFields = {
  layout: layoutValidator,
  background: backgroundValidator,
  mapImage: v.string(),
  mapMediaId: v.optional(v.id("mediaAssets")),
  imageMediaId: v.optional(v.id("mediaAssets")),
  imageCaption: v.string(),
  showPostcardOne: v.boolean(),
  postcardOneMediaId: v.optional(v.id("mediaAssets")),
  showPostcardTwo: v.boolean(),
  postcardTwoMediaId: v.optional(v.id("mediaAssets")),
  showPostcardThree: v.boolean(),
  postcardThreeMediaId: v.optional(v.id("mediaAssets")),
}

export const createSection = mutation({
  args: {
    pageId: v.id("menuPages"),
    ...sectionFields,
    groups: v.array(v.object({ title: v.string(), note: v.string() })),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const expectedGroups = args.layout === "paired" ? 2 : 1
    if (args.groups.length !== expectedGroups) {
      throw new ConvexError(`This layout requires ${expectedGroups} menu list(s).`)
    }
    const sections = await ctx.db
      .query("menuSections")
      .withIndex("by_pageId_and_order", (q) => q.eq("pageId", args.pageId))
      .collect()
    const { groups, ...values } = args
    const now = Date.now()
    const sectionId = await ctx.db.insert("menuSections", {
      ...values,
      order: sections.length,
      createdAt: now,
      updatedAt: now,
    })
    for (const [order, group] of groups.entries()) {
      await ctx.db.insert("menuGroups", { sectionId, ...group, order })
    }
    await syncSectionMediaUsages(ctx, args.pageId, sectionId, values)
    return sectionId
  },
})

export const updateSection = mutation({
  args: { id: v.id("menuSections"), ...sectionFields },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const section = await ctx.db.get(args.id)
    if (!section) throw new ConvexError("Menu section not found.")
    const { id, ...values } = args
    await ctx.db.patch(id, { ...values, updatedAt: Date.now() })
    await syncSectionMediaUsages(ctx, section.pageId, id, values)
    return null
  },
})

export const removeSection = mutation({
  args: { id: v.id("menuSections") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const section = await ctx.db.get(args.id)
    if (!section) throw new ConvexError("Menu section not found.")
    await deleteSection(ctx, args.id)
    return null
  },
})

export const reorderSections = mutation({
  args: { pageId: v.id("menuPages"), ids: v.array(v.id("menuSections")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    for (const [order, id] of args.ids.entries()) await ctx.db.patch(id, { order })
    return null
  },
})

export const moveSection = mutation({
  args: { id: v.id("menuSections"), destinationPageId: v.id("menuPages") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const section = await ctx.db.get(args.id)
    if (!section) throw new ConvexError("Menu section not found.")
    const sections = await ctx.db
      .query("menuSections")
      .withIndex("by_pageId_and_order", (q) => q.eq("pageId", args.destinationPageId))
      .collect()
    await ctx.db.patch(args.id, {
      pageId: args.destinationPageId,
      order: sections.length,
      updatedAt: Date.now(),
    })
    await syncSectionMediaUsages(ctx, section.pageId, args.id, {})
    await syncSectionMediaUsages(ctx, args.destinationPageId, args.id, section)
    return null
  },
})

export const updateGroup = mutation({
  args: {
    id: v.id("menuGroups"),
    title: v.string(),
    note: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.patch(args.id, { title: args.title, note: args.note })
    return null
  },
})

export const createItem = mutation({
  args: {
    groupId: v.id("menuGroups"),
    name: v.string(),
    description: v.string(),
    price: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const items = await ctx.db
      .query("menuItems")
      .withIndex("by_groupId_and_order", (q) => q.eq("groupId", args.groupId))
      .collect()
    return await ctx.db.insert("menuItems", { ...args, likes: 0, order: items.length })
  },
})

export const updateItem = mutation({
  args: {
    id: v.id("menuItems"),
    name: v.string(),
    description: v.string(),
    price: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const { id, ...values } = args
    await ctx.db.patch(id, values)
    return null
  },
})

export const removeItem = mutation({
  args: { id: v.id("menuItems") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.delete(args.id)
    return null
  },
})

export const reorderItems = mutation({
  args: { groupId: v.id("menuGroups"), ids: v.array(v.id("menuItems")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    for (const [order, id] of args.ids.entries()) await ctx.db.patch(id, { order })
    return null
  },
})

export const likeItem = mutation({
  args: { id: v.id("menuItems") },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id)
    if (!item) throw new ConvexError("Menu item not found.")
    await ctx.db.patch(args.id, { likes: item.likes + 1 })
    return item.likes + 1
  },
})

const seedItemValidator = v.object({
  name: v.string(),
  description: v.string(),
  price: v.string(),
})
const seedGroupValidator = v.object({
  title: v.string(),
  note: v.string(),
  items: v.array(seedItemValidator),
})
const seedSectionValidator = v.object({
  layout: layoutValidator,
  background: backgroundValidator,
  mapImage: v.string(),
  imageUrl: v.optional(v.string()),
  imageCaption: v.string(),
  postcardUrls: v.array(v.string()),
  groups: v.array(seedGroupValidator),
})

async function sourceMedia(ctx: MutationCtx, url: string, alt: string): Promise<Id<"mediaAssets">> {
  const existing = await ctx.db
    .query("mediaAssets")
    .withIndex("by_sourceUrl", (q) => q.eq("sourceUrl", url))
    .unique()
  if (existing) return existing._id
  return await ctx.db.insert("mediaAssets", {
    sourceUrl: url,
    filename: decodeURIComponent(url.split("/").pop()?.split("?")[0] || "menu-image.jpg"),
    alt,
    contentType: url.endsWith(".png") ? "image/png" : "image/jpeg",
    kind: "image",
    size: 0,
    createdAt: Date.now(),
  })
}

export const initializeDefaults = mutation({
  args: {
    pages: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
        heroUrl: v.string(),
        sections: v.array(seedSectionValidator),
      }),
    ),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const existing = await ctx.db.query("menuPages").withIndex("by_order").take(1)
    if (existing.length) return false

    for (const [pageOrder, page] of args.pages.entries()) {
      const now = Date.now()
      const heroMediaId = await sourceMedia(ctx, page.heroUrl, `${page.title} menu hero`)
      const pageId = await ctx.db.insert("menuPages", {
        title: page.title,
        slug: normalizedSlug(page.title),
        description: page.description,
        heroMediaId,
        order: pageOrder,
        createdAt: now,
        updatedAt: now,
      })
      await setMediaUsage(ctx, pageId, "hero", heroMediaId, "background")

      for (const [sectionOrder, section] of page.sections.entries()) {
        const mapMediaId = await sourceMedia(
          ctx,
          section.mapImage,
          `${section.groups[0]?.title ?? page.title} map background`,
        )
        const imageMediaId = section.imageUrl
          ? await sourceMedia(
              ctx,
              section.imageUrl,
              `${section.groups[0]?.title ?? page.title} image`,
            )
          : undefined
        const postcardIds = await Promise.all(
          section.postcardUrls
            .slice(0, 3)
            .map((url, index) =>
              sourceMedia(
                ctx,
                url,
                `${section.groups[0]?.title ?? page.title} postcard ${index + 1}`,
              ),
            ),
        )
        const sectionId = await ctx.db.insert("menuSections", {
          pageId,
          layout: section.layout,
          background: section.background,
          mapImage: section.mapImage,
          mapMediaId,
          imageMediaId,
          imageCaption: section.imageCaption,
          showPostcardOne: Boolean(postcardIds[0]),
          postcardOneMediaId: postcardIds[0],
          showPostcardTwo: Boolean(postcardIds[1]),
          postcardTwoMediaId: postcardIds[1],
          showPostcardThree: Boolean(postcardIds[2]),
          postcardThreeMediaId: postcardIds[2],
          order: sectionOrder,
          createdAt: now,
          updatedAt: now,
        })
        await syncSectionMediaUsages(ctx, pageId, sectionId, {
          mapMediaId,
          imageMediaId,
          postcardOneMediaId: postcardIds[0],
          postcardTwoMediaId: postcardIds[1],
          postcardThreeMediaId: postcardIds[2],
        })

        for (const [groupOrder, group] of section.groups.entries()) {
          const groupId = await ctx.db.insert("menuGroups", {
            sectionId,
            title: group.title,
            note: group.note,
            order: groupOrder,
          })
          for (const [itemOrder, item] of group.items.entries()) {
            await ctx.db.insert("menuItems", {
              groupId,
              name: item.name,
              description: item.description,
              price: item.price,
              likes: 0,
              order: itemOrder,
            })
          }
        }
      }
    }
    return true
  },
})
