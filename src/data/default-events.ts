export type PublicEvent = {
  _id: string
  title: string
  description: string
  startsAt: number
  recurrence?: "daily" | "weekly" | "monthly"
  image: string
  bookingUrl: string
  status: "published" | "archived"
}

export const defaultEvents: PublicEvent[] = [
  {
    _id: "local:oyster-hour",
    title: "Oyster Hour",
    description:
      "A raw bar evening with both coasts on ice, bright mignonettes, and cold martinis.",
    startsAt: Date.parse("2027-06-06T17:00:00-04:00"),
    image:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=900&q=85",
    bookingUrl: "",
    status: "published",
  },
  {
    _id: "local:blue-spritz-night",
    title: "Blue Spritz Night",
    description: "A playful bar feature built around bubbles, citrus, and Aberdeen blue.",
    startsAt: Date.parse("2027-06-12T18:00:00-04:00"),
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=85",
    bookingUrl: "",
    status: "published",
  },
  {
    _id: "local:coastal-supper",
    title: "Coastal Supper",
    description:
      "A family-style dinner of whole fish, shellfish, summer vegetables, and shared sides.",
    startsAt: Date.parse("2027-06-18T19:00:00-04:00"),
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85",
    bookingUrl: "",
    status: "published",
  },
  {
    _id: "local:late-light-dinner",
    title: "Late Light Dinner",
    description:
      "A slower evening menu for two, built around wine, seafood, and dessert at the bar.",
    startsAt: Date.parse("2027-06-27T20:00:00-04:00"),
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=85",
    bookingUrl: "",
    status: "published",
  },
]
