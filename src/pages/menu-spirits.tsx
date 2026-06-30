import { motion } from "motion/react"
import { Link } from "react-router"
import { fadeIn } from "../lib/motion"

type MenuItem = {
  name: string
  description: string
  price: string
}

type MenuImage = {
  alt: string
  src: string
}

type MenuGroup = {
  title: string
  note?: string
  items: MenuItem[]
}

const cocktailImage: MenuImage = {
  alt: "Colorful cocktail in a glass",
  src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=85",
}

const barImage: MenuImage = {
  alt: "Cocktails served on a bar",
  src: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=500&q=85",
}

const stirredDrinkImage: MenuImage = {
  alt: "Bartender stirring a drink over ice",
  src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=500&q=85",
}

const bottleImage: MenuImage = {
  alt: "Bottles and glassware behind a restaurant bar",
  src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=500&q=85",
}

const citrusDrinkImage: MenuImage = {
  alt: "Citrus drink with ice and garnish",
  src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=85",
}

const itemImagesByGroup: Record<string, MenuImage[]> = {
  "House Cocktails": [cocktailImage, citrusDrinkImage, barImage, cocktailImage, stirredDrinkImage],
  "For the Table": [barImage, citrusDrinkImage],
  Classics: [
    stirredDrinkImage,
    bottleImage,
    citrusDrinkImage,
    cocktailImage,
    barImage,
    stirredDrinkImage,
  ],
  "Gin & Vodka": [
    bottleImage,
    stirredDrinkImage,
    bottleImage,
    cocktailImage,
    citrusDrinkImage,
    bottleImage,
  ],
  "Rum, Tequila & Whiskey": [bottleImage, citrusDrinkImage, bottleImage, stirredDrinkImage],
  "Wine by the Glass": [barImage, citrusDrinkImage, bottleImage],
  "After Dinner": [bottleImage, stirredDrinkImage, barImage],
}

function getMenuItemImage(group: MenuGroup, index: number) {
  const images = itemImagesByGroup[group.title] ?? [cocktailImage]
  return images[index % images.length]
}

const rawBar: MenuGroup = {
  title: "House Cocktails",
  note: "Bright and coastal",
  items: [
    {
      name: "Blue Hour Martini",
      description: "Gin, dry vermouth, sea salt, lemon oil",
      price: "17",
    },
    {
      name: "Aberdeen Spritz",
      description: "Aperitivo, sparkling wine, grapefruit, soda",
      price: "16",
    },
    {
      name: "Pearl Diver",
      description: "Rum, pineapple, lime, almond, bitters",
      price: "18",
    },
    {
      name: "Sea Glass Sour",
      description: "Vodka, blue curaçao, lemon, egg white",
      price: "17",
    },
    {
      name: "Low Tide Negroni",
      description: "Gin, bitter orange, blanc vermouth, saline",
      price: "18",
    },
  ],
}

const towers: MenuGroup = {
  title: "For the Table",
  note: "Large format",
  items: [
    {
      name: "Harbor Punch",
      description: "Rum, citrus, passionfruit, sparkling water, mint",
      price: "58",
    },
    {
      name: "Spritz Service",
      description: "Aperitivo, bubbles, soda, orange, olives",
      price: "64",
    },
  ],
}

const starters: MenuGroup = {
  title: "Classics",
  items: [
    {
      name: "Gin Martini",
      description: "London dry gin, dry vermouth, lemon or olive",
      price: "16",
    },
    {
      name: "Old Fashioned",
      description: "Bourbon, demerara, bitters, orange",
      price: "17",
    },
    {
      name: "Daiquiri",
      description: "White rum, lime, cane sugar",
      price: "15",
    },
    {
      name: "Margarita",
      description: "Blanco tequila, lime, orange, sea salt",
      price: "16",
    },
    {
      name: "French 75",
      description: "Gin, lemon, sugar, sparkling wine",
      price: "17",
    },
    {
      name: "Espresso Martini",
      description: "Vodka, espresso, coffee liqueur, vanilla",
      price: "18",
    },
  ],
}

const mains: MenuGroup = {
  title: "Gin & Vodka",
  items: [
    {
      name: "Plymouth Gin",
      description: "Soft juniper, citrus, coastal herbs",
      price: "14",
    },
    {
      name: "Hendrick's",
      description: "Cucumber, rose, clean botanical finish",
      price: "15",
    },
    {
      name: "Monkey 47",
      description: "Black Forest botanicals, citrus, spice",
      price: "18",
    },
    {
      name: "Grey Goose",
      description: "French wheat vodka, clean and round",
      price: "15",
    },
    {
      name: "Tito's",
      description: "Corn vodka, soft texture, easy finish",
      price: "13",
    },
    {
      name: "Belvedere",
      description: "Polish rye vodka, mineral and crisp",
      price: "16",
    },
  ],
}

const land: MenuGroup = {
  title: "Rum, Tequila & Whiskey",
  items: [
    {
      name: "Plantation 3 Star",
      description: "White rum, vanilla, citrus, cane",
      price: "12",
    },
    {
      name: "Don Julio Blanco",
      description: "Agave, lime peel, pepper",
      price: "15",
    },
    {
      name: "Casamigos Reposado",
      description: "Roasted agave, caramel, oak",
      price: "17",
    },
    {
      name: "Four Roses Single Barrel",
      description: "Bourbon, cherry, spice, cocoa",
      price: "16",
    },
    {
      name: "Highland Park 12",
      description: "Island malt, honey, heather smoke",
      price: "18",
    },
    {
      name: "Redbreast 12",
      description: "Irish whiskey, orchard fruit, toasted grain",
      price: "19",
    },
  ],
}

const sides: MenuGroup = {
  title: "Wine by the Glass",
  items: [
    { name: "Brut Cava", description: "Green apple, lemon, mineral", price: "14" },
    { name: "Albariño", description: "Saline, citrus, stone fruit", price: "15" },
    { name: "Sancerre", description: "Gooseberry, chalk, bright acid", price: "18" },
    { name: "Chablis", description: "Oyster shell, pear, clean finish", price: "19" },
    { name: "Rosé", description: "Strawberry, melon, sea breeze", price: "15" },
    { name: "Pinot Noir", description: "Cherry, tea, soft spice", price: "17" },
  ],
}

const desserts: MenuGroup = {
  title: "After Dinner",
  items: [
    {
      name: "Amaro Montenegro",
      description: "Orange peel, baking spice, bittersweet herbs",
      price: "12",
    },
    {
      name: "Averna",
      description: "Cola, herbs, caramel, bitter orange",
      price: "12",
    },
    {
      name: "Taylor Fladgate 10 Year Tawny",
      description: "Dried fig, walnut, orange peel",
      price: "14",
    },
    {
      name: "Caffè Corretto",
      description: "Espresso with a measure of grappa",
      price: "13",
    },
  ],
}

function SpiritsMenuPage() {
  return (
    <div className="overflow-hidden">
      <MenuHero />
      <RawBarSection />
      <StartersSection />
      <MainsSection />
      <SidesAndDessertSection />
      <ReserveSection />
    </div>
  )
}

function MenuTabs() {
  const tabs = [
    { label: "Food", to: "/menu/food", active: false },
    { label: "Spirits", to: "/menu/spirits", active: true },
    { label: "Beverages", to: "/menu/beverages", active: false },
  ]

  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-2 font-utility text-sm tracking-[0.18em] uppercase">
      {tabs.map((tab) => (
        <Link
          className={
            tab.active
              ? "underline decoration-citrus decoration-2 underline-offset-8"
              : "opacity-70 decoration-citrus decoration-2 underline-offset-8 transition hover:underline hover:opacity-100"
          }
          key={tab.label}
          to={tab.to}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  )
}

function MenuHero() {
  return (
    <section className="relative bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt="Blue cocktail on a wooden bar"
        className="absolute inset-y-0 right-0 h-full w-full object-cover md:w-[52%]"
        src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,#2A3B92_48%,rgba(42,59,146,0.86)_56%,rgba(42,59,146,0.38)_70%,rgba(42,59,146,0)_90%)]" />
      <motion.div
        className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Menus</p>
        <div className="max-w-5xl">
          <h1 className="font-display text-6xl leading-none md:text-8xl">Spirits</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8">
            Cocktails, coastal classics, and bottles for lingering. Bright, briny, botanical, and
            built for the room after dark.
          </p>
        </div>
        <MenuTabs />
      </motion.div>
    </section>
  )
}

function MenuList({ delay = 0, group }: { delay?: number; group: MenuGroup }) {
  return (
    <motion.div {...fadeIn(delay)}>
      <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-aberdeen-blue/20 pb-3">
        <h3 className="font-display text-3xl text-aberdeen-blue md:text-4xl">{group.title}</h3>
        {group.note ? (
          <p className="font-utility text-xs tracking-[0.18em] text-aberdeen-blue/70 uppercase">
            {group.note}
          </p>
        ) : null}
      </div>
      <ul className="space-y-5">
        {group.items.map((item, index) => {
          const image = getMenuItemImage(group, index)

          return (
            <li className="flex items-center gap-4" key={item.name}>
              <img
                alt={image.alt}
                className="aspect-square w-20 shrink-0 object-cover md:w-24"
                src={image.src}
              />
              <div className="min-w-0 grow">
                <div className="grid grid-cols-[auto_minmax(1rem,1fr)_auto] items-end gap-4">
                  <p className="font-display text-xl leading-none text-aberdeen-blue">
                    {item.name}
                  </p>
                  <span className="mb-1 border-b border-dotted border-aberdeen-blue/25" />
                  <span className="font-utility text-sm leading-none tracking-[0.12em] text-aberdeen-blue uppercase">
                    {item.price}
                  </span>
                </div>
                <p className="mt-2 leading-7 text-kelp-ink/80">{item.description}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}

function RawBarSection() {
  return (
    <section className="bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1fr_0.9fr] md:gap-16">
        <div className="space-y-12">
          <MenuList group={rawBar} />
          <MenuList delay={0.08} group={towers} />
        </div>
        <motion.div className="self-start md:sticky md:top-8" {...fadeIn(0.12)}>
          <div className="aspect-[4/5] overflow-hidden">
            <img
              alt="Colorful cocktails served on a bar"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1000&q=85"
            />
          </div>
          <p className="mt-4 max-w-sm font-utility text-xs tracking-[0.18em] text-aberdeen-blue/70 uppercase">
            Built bright, cold, and coastal from the first pour.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function StartersSection() {
  return (
    <section className="bg-aberdeen-peach px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1fr] md:gap-16">
        <motion.div className="order-2 md:order-1" {...fadeIn(0.08)}>
          <div className="aspect-[4/5] overflow-hidden">
            <img
              alt="Bartender stirring a cocktail over ice"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1000&q=85"
            />
          </div>
        </motion.div>
        <div className="order-1 md:order-2">
          <MenuList group={starters} />
        </div>
      </div>
    </section>
  )
}

function MainsSection() {
  return (
    <section className="bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div className="space-y-12">
          <motion.h2 className="font-display text-5xl leading-none md:text-7xl" {...fadeIn()}>
            Bottles that carry the table.
          </motion.h2>
          <MainsList delay={0.08} group={mains} />
        </div>
        <div className="space-y-12">
          <motion.div className="aspect-[16/10] overflow-hidden" {...fadeIn(0.08)}>
            <img
              alt="Cocktail glasses lined up on a bar"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=85"
            />
          </motion.div>
          <MainsList delay={0.16} group={land} />
        </div>
      </div>
    </section>
  )
}

function MainsList({ delay = 0, group }: { delay?: number; group: MenuGroup }) {
  return (
    <motion.div {...fadeIn(delay)}>
      <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-aberdeen-peach/25 pb-3">
        <h3 className="font-display text-3xl md:text-4xl">{group.title}</h3>
        {group.note ? (
          <p className="font-utility text-xs tracking-[0.18em] text-aberdeen-peach/70 uppercase">
            {group.note}
          </p>
        ) : null}
      </div>
      <ul className="space-y-5">
        {group.items.map((item, index) => {
          const image = getMenuItemImage(group, index)

          return (
            <li className="flex items-center gap-4" key={item.name}>
              <img
                alt={image.alt}
                className="aspect-square w-20 shrink-0 object-cover md:w-24"
                src={image.src}
              />
              <div className="min-w-0 grow">
                <div className="grid grid-cols-[auto_minmax(1rem,1fr)_auto] items-end gap-4">
                  <p className="font-display text-xl leading-none">{item.name}</p>
                  <span className="mb-1 border-b border-dotted border-aberdeen-peach/30" />
                  <span className="font-utility text-sm leading-none tracking-[0.12em] uppercase">
                    {item.price}
                  </span>
                </div>
                <p className="mt-2 leading-7 text-aberdeen-peach/80">{item.description}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}

function SidesAndDessertSection() {
  return (
    <section className="bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <MenuList group={sides} />
        <MenuList delay={0.08} group={desserts} />
      </div>
      <motion.p className="mt-12 max-w-3xl leading-8 text-kelp-ink/80" {...fadeIn(0.12)}>
        Spirits, wine, and cocktail selections shift with the season. Ask the bar for the night's
        favorite bottle, spritz, or zero-proof build.
      </motion.p>
    </section>
  )
}
function ReserveSection() {
  return (
    <section className="grid gap-10 bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:grid-cols-[1fr_0.9fr] md:px-8 md:py-24">
      <motion.div {...fadeIn()}>
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Reservations</p>
        <h2 className="mt-5 max-w-3xl font-display text-5xl leading-none md:text-7xl">
          Come hungry, stay for the light.
        </h2>
      </motion.div>
      <motion.div className="self-end border border-aberdeen-peach p-5" {...fadeIn(0.12)}>
        <p className="mb-6 text-lg leading-8">
          Book a table and let the bar start the night with something cold, bright, and a little
          blue.
        </p>
        <Link
          className="inline-block bg-aberdeen-peach px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-blue uppercase"
          to="/contact"
        >
          Plan a visit
        </Link>
      </motion.div>
    </section>
  )
}

export default SpiritsMenuPage
