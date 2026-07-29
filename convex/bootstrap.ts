import { mutation } from "./_generated/server"
import { requireAdmin } from "./lib/admin"

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
    const initialized = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "adminInitialized"))
      .unique()

    if (initialized) return false

    const now = Date.now()
    const settings = {
      adminInitialized: "true",
      address: "123 Harbor Way, Savannah, Georgia 31401",
      mapLocation: "Savannah, Georgia",
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
      ["Visit", "123 Harbor Way, Savannah, Georgia 31401", "Find us by the water."],
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
