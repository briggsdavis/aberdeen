import type { MenuNavigationPage, MenuPage } from "../lib/menu"
import {
  desserts as beverageDesserts,
  land as beverageLand,
  mains as beverageMains,
  rawBar as beverageRawBar,
  sides as beverageSides,
  starters as beverageStarters,
  towers as beverageTowers,
} from "./menu-beverages"
import {
  desserts as foodDesserts,
  land as foodLand,
  mains as foodMains,
  rawBar as foodRawBar,
  sides as foodSides,
  starters as foodStarters,
  towers as foodTowers,
} from "./menu-food"
import {
  desserts as spiritDesserts,
  land as spiritLand,
  mains as spiritMains,
  rawBar as spiritRawBar,
  sides as spiritSides,
  starters as spiritStarters,
  towers as spiritTowers,
} from "./menu-spirits"

type SourceGroup = {
  title: string
  note?: string
  items: Array<{ name: string; description: string; price: string }>
}

function group(source: SourceGroup) {
  return {
    title: source.title,
    note: source.note ?? "",
    items: source.items.map(({ name, description, price }) => ({ name, description, price })),
  }
}

const postcards = [
  "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=85",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=85",
  "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=500&q=85",
]

export const defaultMenus = [
  {
    title: "Food",
    description:
      "Cold oysters, coastal plates, and generous mains. Sourced from both coasts, served in a room that keeps the afternoon glowing after dark.",
    heroUrl:
      "https://images.unsplash.com/photo-1633321094192-388268512e0f?auto=format&fit=crop&w=1800&q=85",
    sections: [
      {
        layout: "imageLeft" as const,
        background: "oyster" as const,
        mapImage: "/maps/antique-map-01.png",
        imageUrl:
          "https://images.unsplash.com/photo-1679694140422-aecfd3d5dd0b?auto=format&fit=crop&w=1000&q=85",
        imageCaption: "Daily selection from both coasts, shucked at the bar.",
        postcardUrls: postcards,
        groups: [group(foodRawBar)],
      },
      {
        layout: "paired" as const,
        background: "peach" as const,
        mapImage: "/maps/peloponnese-chart.png",
        imageCaption: "",
        postcardUrls: [],
        groups: [group(foodTowers), group(foodStarters)],
      },
      {
        layout: "imageRight" as const,
        background: "oyster" as const,
        mapImage: "/maps/thimble-islands-chart.png",
        imageUrl:
          "https://images.unsplash.com/photo-1777891257650-5dedbba89dd4?auto=format&fit=crop&w=1200&q=85",
        imageCaption: "Whole fish, shellfish, and coastal plates served for the table.",
        postcardUrls: postcards,
        groups: [group(foodMains)],
      },
      {
        layout: "imageLeft" as const,
        background: "peach" as const,
        mapImage: "/maps/antique-map-02.png",
        imageUrl:
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85",
        imageCaption: "Dry-aged steak and roast chicken with bright, coastal accompaniments.",
        postcardUrls: postcards,
        groups: [group(foodLand)],
      },
      {
        layout: "paired" as const,
        background: "oyster" as const,
        mapImage: "/maps/antique-map-03.png",
        imageCaption: "",
        postcardUrls: [],
        groups: [group(foodSides), group(foodDesserts)],
      },
    ],
  },
  {
    title: "Spirits",
    description:
      "Cocktails, coastal classics, and bottles for lingering. Bright, briny, botanical, and built for the room after dark.",
    heroUrl:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1800&q=85",
    sections: [
      {
        layout: "imageLeft" as const,
        background: "oyster" as const,
        mapImage: "/maps/antique-map-03.png",
        imageUrl:
          "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1000&q=85",
        imageCaption: "Built bright, cold, and coastal from the first pour.",
        postcardUrls: postcards,
        groups: [group(spiritRawBar)],
      },
      {
        layout: "paired" as const,
        background: "peach" as const,
        mapImage: "/maps/peloponnese-chart.png",
        imageCaption: "",
        postcardUrls: [],
        groups: [group(spiritTowers), group(spiritStarters)],
      },
      {
        layout: "imageRight" as const,
        background: "oyster" as const,
        mapImage: "/maps/antique-map-01.png",
        imageUrl:
          "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=85",
        imageCaption: "Botanical gin and crisp vodka, poured neat or mixed into a classic.",
        postcardUrls: postcards,
        groups: [group(spiritMains)],
      },
      {
        layout: "imageLeft" as const,
        background: "peach" as const,
        mapImage: "/maps/antique-map-02.png",
        imageUrl:
          "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=85",
        imageCaption: "Rum, agave, bourbon, and rye selected for sipping and cocktails.",
        postcardUrls: postcards,
        groups: [group(spiritLand)],
      },
      {
        layout: "paired" as const,
        background: "oyster" as const,
        mapImage: "/maps/antique-map-03.png",
        imageCaption: "",
        postcardUrls: [],
        groups: [group(spiritSides), group(spiritDesserts)],
      },
    ],
  },
  {
    title: "Beverages",
    description:
      "Sparkling, zero-proof, coffee, tea, and daytime refreshers. Made for long lunches, early dinners, and one more round without the proof.",
    heroUrl:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1800&q=85",
    sections: [
      {
        layout: "imageLeft" as const,
        background: "oyster" as const,
        mapImage: "/maps/antique-map-02.png",
        imageUrl:
          "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1000&q=85",
        imageCaption: "Sparkling, citrusy, and built with the same care as the bar.",
        postcardUrls: postcards,
        groups: [group(beverageRawBar)],
      },
      {
        layout: "paired" as const,
        background: "peach" as const,
        mapImage: "/maps/thimble-islands-chart.png",
        imageCaption: "",
        postcardUrls: [],
        groups: [group(beverageTowers), group(beverageStarters)],
      },
      {
        layout: "imageRight" as const,
        background: "oyster" as const,
        mapImage: "/maps/antique-map-01.png",
        imageUrl:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
        imageCaption:
          "Espresso, cold brew, and familiar favorites for mornings through after dinner.",
        postcardUrls: postcards,
        groups: [group(beverageMains)],
      },
      {
        layout: "imageLeft" as const,
        background: "peach" as const,
        mapImage: "/maps/antique-map-03.png",
        imageUrl:
          "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1200&q=85",
        imageCaption: "Black, green, and herbal teas served hot or over ice.",
        postcardUrls: postcards,
        groups: [group(beverageLand)],
      },
      {
        layout: "paired" as const,
        background: "oyster" as const,
        mapImage: "/maps/thimble-islands-chart.png",
        imageCaption: "",
        postcardUrls: [],
        groups: [group(beverageSides), group(beverageDesserts)],
      },
    ],
  },
]

export const localMenuPages: MenuPage[] = defaultMenus.map((page) => {
  const slug = page.title.toLowerCase()
  return {
    _id: `local:${slug}`,
    title: page.title,
    slug,
    description: page.description,
    heroImage: page.heroUrl,
    sections: page.sections.map((section, sectionIndex) => ({
      _id: `local:${slug}:section:${sectionIndex}`,
      layout: section.layout,
      background: section.background,
      mapImage: section.mapImage,
      image: section.imageUrl ?? null,
      imageCaption: section.imageCaption,
      showPostcardOne: Boolean(section.postcardUrls[0]),
      showPostcardTwo: Boolean(section.postcardUrls[1]),
      showPostcardThree: Boolean(section.postcardUrls[2]),
      postcards: section.postcardUrls,
      groups: section.groups.map((source, groupIndex) => ({
        _id: `local:${slug}:section:${sectionIndex}:group:${groupIndex}`,
        ...source,
      })),
    })),
  }
})

export const localMenuNavigation: MenuNavigationPage[] = localMenuPages.map((page, order) => ({
  _id: page._id,
  title: page.title,
  slug: page.slug,
  order,
  heroImage: page.heroImage,
  sectionTitles: page.sections
    .flatMap((section) => section.groups.map((menuGroup) => menuGroup.title))
    .slice(0, 3),
}))
