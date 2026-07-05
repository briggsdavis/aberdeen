import { motion } from "motion/react"
import { Link } from "react-router"
import { PhotoCorners, RopeDivider } from "../components/nautical-details"
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

const lemonadeImage: MenuImage = {
  alt: "Sparkling lemonade with citrus",
  src: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=500&q=85",
}

const citrusDrinkImage: MenuImage = {
  alt: "Iced citrus drink with herbs",
  src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=85",
}

const coffeeImage: MenuImage = {
  alt: "Coffee cup on a cafe table",
  src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=85",
}

const sparklingImage: MenuImage = {
  alt: "Sparkling water and cold drinks",
  src: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=85",
}

const teaImage: MenuImage = {
  alt: "Warm tea and cafe drinks",
  src: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=500&q=85",
}

const itemImagesByGroup: Record<string, MenuImage[]> = {
  "Zero-Proof": [lemonadeImage, citrusDrinkImage, sparklingImage],
  "For the Table": [lemonadeImage, citrusDrinkImage],
  "Sparkling & Still": [sparklingImage, lemonadeImage, citrusDrinkImage],
  Coffee: [coffeeImage],
  Tea: [teaImage, coffeeImage],
  Juice: [citrusDrinkImage, lemonadeImage, sparklingImage],
  "After Dinner": [coffeeImage, teaImage],
}

function getMenuItemImage(group: MenuGroup, index: number) {
  const images = itemImagesByGroup[group.title] ?? [sparklingImage]
  return images[index % images.length]
}

const rawBar: MenuGroup = {
  title: "Zero-Proof",
  note: "Built like cocktails",
  items: [
    {
      name: "Salt Air Paloma",
      description: "Grapefruit, lime, agave, soda, smoked salt",
      price: "12",
    },
    {
      name: "Sea Glass Fizz",
      description: "Cucumber, mint, lemon, tonic, blue spirulina",
      price: "12",
    },
    {
      name: "Peach Tide",
      description: "White peach, ginger, lime, sparkling water",
      price: "11",
    },
    {
      name: "Garden Spritz",
      description: "Basil, lemon, elderflower, soda",
      price: "11",
    },
    {
      name: "Bitter Orange Cooler",
      description: "Italian orange, rosemary, tonic, citrus",
      price: "12",
    },
  ],
}

const towers: MenuGroup = {
  title: "For the Table",
  note: "Pitchers",
  items: [
    {
      name: "Sparkling Lemonade",
      description: "Lemon, cane sugar, mineral water, mint",
      price: "34",
    },
    {
      name: "Iced Tea Service",
      description: "Black tea, peach, lemon, seasonal herbs",
      price: "30",
    },
  ],
}

const starters: MenuGroup = {
  title: "Sparkling & Still",
  items: [
    {
      name: "San Pellegrino",
      description: "Sparkling mineral water",
      price: "8",
    },
    {
      name: "Acqua Panna",
      description: "Still mineral water",
      price: "8",
    },
    {
      name: "Topo Chico",
      description: "Extra-sparkling mineral water",
      price: "7",
    },
    {
      name: "Mexican Coca-Cola",
      description: "Cane sugar cola",
      price: "6",
    },
    {
      name: "Ginger Beer",
      description: "Spicy ginger, lime, bubbles",
      price: "6",
    },
    {
      name: "House Soda",
      description: "Rotating seasonal fruit syrup",
      price: "6",
    },
  ],
}

const mains: MenuGroup = {
  title: "Coffee",
  items: [
    {
      name: "Drip Coffee",
      description: "Medium roast, balanced and round",
      price: "5",
    },
    {
      name: "Espresso",
      description: "Single origin, pulled short",
      price: "4",
    },
    {
      name: "Americano",
      description: "Espresso, hot water",
      price: "5",
    },
    {
      name: "Cappuccino",
      description: "Espresso, steamed milk, foam",
      price: "6",
    },
    {
      name: "Iced Coffee",
      description: "Cold, bright, lightly sweet on request",
      price: "6",
    },
    {
      name: "Espresso Tonic",
      description: "Espresso, tonic, orange peel",
      price: "8",
    },
  ],
}

const land: MenuGroup = {
  title: "Tea",
  items: [
    {
      name: "Earl Grey",
      description: "Black tea, bergamot, citrus",
      price: "6",
    },
    {
      name: "Jasmine Green",
      description: "Green tea, soft floral finish",
      price: "6",
    },
    {
      name: "Mint Verbena",
      description: "Herbal, cooling, clean",
      price: "6",
    },
    {
      name: "Chamomile",
      description: "Honeyed, gentle, late-night",
      price: "6",
    },
  ],
}

const sides: MenuGroup = {
  title: "Juice",
  items: [
    { name: "Orange", description: "Fresh pressed", price: "7" },
    { name: "Grapefruit", description: "Ruby red, bright acid", price: "7" },
    { name: "Pineapple", description: "Sweet, tropical, chilled", price: "7" },
    { name: "Cranberry", description: "Tart and clean", price: "6" },
  ],
}

const desserts: MenuGroup = {
  title: "After Dinner",
  items: [
    {
      name: "Affogato",
      description: "Vanilla gelato, hot espresso",
      price: "10",
    },
    {
      name: "Hot Chocolate",
      description: "Dark chocolate, steamed milk, sea salt",
      price: "8",
    },
    {
      name: "Golden Milk",
      description: "Turmeric, ginger, honey, oat milk",
      price: "8",
    },
    {
      name: "Decaf Espresso",
      description: "Late-night pull, no buzz",
      price: "4",
    },
  ],
}

function BeveragesMenuPage() {
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
    { label: "Spirits", to: "/menu/spirits", active: false },
    { label: "Beverages", to: "/menu/beverages", active: true },
  ]

  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-2 font-utility text-sm tracking-[0.18em] uppercase">
      {tabs.map((tab) => (
        <Link
          className={
            tab.active
              ? "underline decoration-citrus decoration-2 underline-offset-8"
              : "decoration-citrus decoration-2 underline-offset-8 opacity-70 transition hover:underline hover:opacity-100"
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
        alt="A bottle of sparkling water next to lemonade"
        className="absolute inset-y-0 right-0 h-full w-full object-cover md:w-[52%]"
        src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,#2A3B92_48%,rgba(42,59,146,0.86)_56%,rgba(42,59,146,0.38)_70%,rgba(42,59,146,0)_90%)]" />
      <motion.div
        className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Menus</p>
        <div className="max-w-5xl">
          <h1 className="font-display text-6xl leading-none md:text-8xl">Beverages</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8">
            Sparkling, zero-proof, coffee, tea, and daytime refreshers. Made for long lunches, early
            dinners, and one more round without the proof.
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
      <RopeDivider className="mb-6 rounded-none" />
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
          <div className="relative aspect-[4/5]">
            <img
              alt="Sparkling lemonade and mineral water on a table"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1000&q=85"
            />
            <PhotoCorners />
          </div>
          <p className="mt-4 max-w-sm font-utility text-xs tracking-[0.18em] text-aberdeen-blue/70 uppercase">
            Sparkling, citrusy, and built with the same care as the bar.
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
          <div className="relative aspect-[4/5]">
            <img
              alt="Iced citrus drink with herbs"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=85"
            />
            <PhotoCorners />
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
            Coffee, tea, and one more glass.
          </motion.h2>
          <MainsList delay={0.08} group={mains} />
        </div>
        <div className="space-y-12">
          <motion.div className="relative aspect-[16/10]" {...fadeIn(0.08)}>
            <img
              alt="Coffee cups gathered on a restaurant table"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85"
            />
            <PhotoCorners />
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
      <RopeDivider className="mb-6 rounded-none" />
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
        Beverage selections change with the season. Ask for the current house soda, iced tea, or
        zero-proof special.
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
          Stay for one more sparkling thing.
        </h2>
      </motion.div>
      <motion.div className="self-end bg-oyster-white p-6 text-aberdeen-blue" {...fadeIn(0.12)}>
        <RopeDivider className="mb-6 rounded-none" />
        <div className="mb-8 grid grid-cols-[auto_1fr] gap-5 border-b border-dotted border-aberdeen-blue/35 pb-5">
          <div className="grid h-20 w-20 place-items-center bg-citrus font-display text-5xl leading-none">
            03
          </div>
          <div>
            <p className="font-utility text-xs tracking-[0.18em] uppercase">Harbor check</p>
            <p className="mt-2 font-playful text-4xl leading-none">Sparkling</p>
          </div>
        </div>
        <p className="mb-6 text-lg leading-8">
          Book a table for bright refreshers, coffee after dinner, and something sparkling between
          courses.
        </p>
        <Link
          className="inline-block bg-aberdeen-blue px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-peach uppercase"
          to="/contact"
        >
          Plan a visit
        </Link>
      </motion.div>
    </section>
  )
}

export default BeveragesMenuPage
