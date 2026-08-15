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
  postcards: Array<string | null>
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
