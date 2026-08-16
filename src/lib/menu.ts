export type MenuItem = {
  _id?: string
  name: string
  description: string
  price: string
  likes?: number
}

export type MenuGroup = {
  _id: string
  title: string
  note: string
  items: MenuItem[]
}

export type PostcardContent = {
  image: string
  message: string
}

export const defaultPostcardMessages = [
  "The yachts are in, the river is gold, and dinner is waiting by the water.",
  "White sails, salt air, and one more beautiful evening in Savannah, Georgia.",
  "Meet us where the yachts pass at sunset. Savannah has saved you a seat.",
] as const

export type MenuSection = {
  _id: string
  layout: "imageLeft" | "imageRight" | "paired"
  background: "oyster" | "peach" | "blue"
  mapImage: string
  image: string | null
  imageCaption: string
  showPostcardOne: boolean
  showPostcardTwo: boolean
  showPostcardThree: boolean
  postcards: Array<{ image: string | null; message: string }>
  groups: MenuGroup[]
}

export type MenuPage = {
  _id: string
  title: string
  slug: string
  description: string
  heroImage: string | null
  sections: MenuSection[]
}

export type MenuNavigationPage = {
  _id: string
  title: string
  slug: string
  order: number
  heroImage: string | null
  sectionTitles: string[]
}
