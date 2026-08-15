import { mutation } from "./_generated/server"
import type { MutationCtx } from "./_generated/server"
import { requireAdmin } from "./lib/admin"

const reservationBeachImage =
  "https://images.unsplash.com/photo-1672841828459-bc913fdcd995?auto=format&fit=crop&w=1800&q=85"
const reservationYachtImage =
  "https://images.unsplash.com/photo-1641787540215-53a5914bdef3?auto=format&fit=crop&w=1800&q=85"
const homeHeroImage =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=85"
const homeHeroPostcardImage =
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1000&q=85"
const menuFoodImage =
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=85"
const menuSpiritsImage =
  "https://images.unsplash.com/photo-1551024709-f90425340c7e?auto=format&fit=crop&w=1000&q=85"
const menuBeveragesImage =
  "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1000&q=85"

const reservationText = {
  "home.reservations.editorial.title": "A beautiful evening begins by the water.",
  "home.reservations.editorial.copy":
    "Come for bright seafood, cold martinis, and a table made for lingering. Reserve your evening at Aberdeen and let the coast set the pace.",
  "home.reservations.editorial.note":
    "Sunset tables go quickly. Choose your evening now, and we’ll have the welcome waiting when you arrive.",
} as const

const reservationLinks = {
  "home.reservations.editorial.primary-link": {
    href: "/contact",
    text: "Reserve your table",
  },
  "home.reservations.editorial.secondary-link": {
    href: "/contact",
    text: "Make a reservation",
  },
} as const

async function sourceImage(ctx: MutationCtx, url: string, filename: string, alt: string) {
  const existing = await ctx.db
    .query("mediaAssets")
    .withIndex("by_sourceUrl", (q) => q.eq("sourceUrl", url))
    .first()
  if (existing) return existing._id

  return await ctx.db.insert("mediaAssets", {
    sourceUrl: url,
    filename,
    alt,
    contentType: "image/jpeg",
    kind: "image",
    size: 0,
    createdAt: Date.now(),
  })
}

async function syncHomepageDefaults(ctx: MutationCtx) {
  const heroId = await sourceImage(
    ctx,
    homeHeroImage,
    "home-hero.jpg",
    "Sunlit coastal restaurant dining room",
  )
  const postcardId = await sourceImage(
    ctx,
    homeHeroPostcardImage,
    "home-hero-postcard.jpg",
    "Seafood spread on a restaurant table",
  )
  const foodId = await sourceImage(ctx, menuFoodImage, "home-menu-food.jpg", "Coastal seafood dish")
  const spiritsId = await sourceImage(
    ctx,
    menuSpiritsImage,
    "home-menu-spirits.jpg",
    "Bright cocktail",
  )
  const beveragesId = await sourceImage(
    ctx,
    menuBeveragesImage,
    "home-menu-beverages.jpg",
    "Refreshing coastal drink",
  )
  const beachId = await sourceImage(
    ctx,
    reservationBeachImage,
    "reservation-beach.jpg",
    "Palm-lined beach beside clear turquoise water",
  )
  const yachtId = await sourceImage(
    ctx,
    reservationYachtImage,
    "reservation-yacht.jpg",
    "Luxury yacht cruising across calm blue water",
  )
  const defaultImages = {
    hero: heroId,
    "home-hero-postcard": postcardId,
    "home.menus.food.image": foodId,
    "home.menus.spirits.image": spiritsId,
    "home.menus.beverages.image": beveragesId,
    "home.reservations.editorial.beach": beachId,
    "home.reservations.editorial.yacht": yachtId,
  }
  const existing = await ctx.db
    .query("pageOverrides")
    .withIndex("by_page", (q) => q.eq("page", "/"))
    .unique()
  const needsUpdate =
    !existing ||
    Object.keys(reservationText).some((key) => existing.text[key] === undefined) ||
    Object.keys(reservationLinks).some((key) => existing.links[key] === undefined) ||
    Object.keys(defaultImages).some((key) => existing.images[key] === undefined)
  const values = {
    text: { ...reservationText, ...existing?.text },
    links: { ...reservationLinks, ...existing?.links },
    images: { ...defaultImages, ...existing?.images },
    updatedAt: Date.now(),
  }

  if (!existing) {
    await ctx.db.insert("pageOverrides", { page: "/", ...values })
  } else if (needsUpdate) {
    await ctx.db.patch("pageOverrides", existing._id, values)
  }

  for (const [slotKey, mediaId] of Object.entries(defaultImages)) {
    const role = slotKey === "hero" ? "background" : "content"
    const usage = await ctx.db
      .query("mediaUsages")
      .withIndex("by_page_and_slotKey", (q) => q.eq("page", "/").eq("slotKey", slotKey))
      .first()
    if (usage) {
      await ctx.db.patch("mediaUsages", usage._id, { mediaId, role })
    } else {
      await ctx.db.insert("mediaUsages", {
        mediaId,
        page: "/",
        slotKey,
        role,
      })
    }
  }
}

const staff = [
  [
    "Marin Vale",
    "Executive Chef",
    "Builds the menu around shellfish, citrus, smoke, and the day's best catch.",
    "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Elliot Crane",
    "Chef de Cuisine",
    "Keeps the line precise, fast, and generous.",
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Simone Hart",
    "Beverage Director",
    "Writes the drinks list in blue, citrus, salt, and sparkle.",
    "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Theo Banks",
    "General Manager",
    "Makes the room feel easy before the first glass lands.",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "June Mercer",
    "Events Lead",
    "Shapes private dinners, seasonal nights, and celebrations around the table.",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Nico Reyes",
    "Raw Bar Lead",
    "Keeps the ice cold, the oysters clean, and the counter moving.",
    "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=900&q=85",
  ],
] as const

const events = [
  [
    "Oyster Hour",
    "A raw bar evening with both coasts on ice, bright mignonettes, and cold martinis.",
    "2027-06-06T17:00:00-04:00",
    "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Blue Spritz Night",
    "A playful bar feature built around bubbles, citrus, and Aberdeen blue.",
    "2027-06-12T18:00:00-04:00",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Coastal Supper",
    "A family-style dinner of whole fish, shellfish, summer vegetables, and shared sides.",
    "2027-06-18T19:00:00-04:00",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85",
  ],
] as const

export const ensureInitialized = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    await syncHomepageDefaults(ctx)
    const initialized = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "adminInitialized"))
      .unique()

    if (initialized) return false

    const now = Date.now()
    const settings = {
      adminInitialized: "true",
      address: "301 Passage Way B101, Savannah, GA 31401",
      mapLocation: "301 Passage Way B101, Savannah, GA 31401",
      phone: "(912) 555-0147",
      email: "hello@aberdeen.example",
      reservationUrl: "/contact",
      footerTagline: "Seafood, bright spirits, good evenings.",
      footerCopyright: "Aberdeen. All rights reserved.",
    }

    for (const [key, value] of Object.entries(settings)) {
      await ctx.db.insert("siteSettings", { key, value, updatedAt: now })
    }

    const contactDetails = [
      ["Visit", "301 Passage Way B101, Savannah, GA 31401", "Find us by the water."],
      ["Call", "(912) 555-0147", "For reservations and general questions."],
      ["Write", "hello@aberdeen.example", "Press, events, and restaurant inquiries."],
    ]
    for (const [order, [label, value, note]] of contactDetails.entries()) {
      await ctx.db.insert("contactDetails", { label, value, note, order })
    }

    const hours = [
      ["Monday – Thursday", "5 PM – 10 PM"],
      ["Friday – Saturday", "4 PM – 11 PM"],
      ["Sunday", "4 PM – 9 PM"],
    ]
    for (const [order, [label, value]] of hours.entries()) {
      await ctx.db.insert("openingHours", { label, value, order })
    }

    for (const [order, [platform, url]] of [
      ["Instagram", ""],
      ["Facebook", ""],
    ].entries()) {
      await ctx.db.insert("socialLinks", { platform, url, order })
    }

    for (const [order, [name, role, biography, imageUrl]] of staff.entries()) {
      const mediaId = await ctx.db.insert("mediaAssets", {
        sourceUrl: imageUrl,
        filename: `${name.toLowerCase().replaceAll(" ", "-")}.jpg`,
        alt: name,
        contentType: "image/jpeg",
        kind: "image",
        size: 0,
        createdAt: now,
      })
      const memberId = await ctx.db.insert("staffMembers", {
        name,
        role,
        biography,
        imageUrl,
        imageMediaId: mediaId,
        order,
      })
      await ctx.db.insert("mediaUsages", {
        mediaId,
        page: "/staff",
        slotKey: `staff:${memberId}`,
        role: "content",
      })
    }

    for (const [title, description, date, imageUrl] of events) {
      const mediaId = await ctx.db.insert("mediaAssets", {
        sourceUrl: imageUrl,
        filename: `${title.toLowerCase().replaceAll(" ", "-")}.jpg`,
        alt: title,
        contentType: "image/jpeg",
        kind: "image",
        size: 0,
        createdAt: now,
      })
      const eventId = await ctx.db.insert("events", {
        title,
        description,
        startsAt: Date.parse(date),
        imageUrl,
        imageMediaId: mediaId,
        bookingUrl: "",
        status: "published",
        createdAt: now,
        updatedAt: now,
      })
      await ctx.db.insert("mediaUsages", {
        mediaId,
        page: "/events",
        slotKey: `event:${eventId}`,
        role: "content",
      })
    }

    return true
  },
})
