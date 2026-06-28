import { Link } from "react-router"
import {
  attachImages,
  MenuCardSection,
  type MenuGroup,
  MenuTabs,
  type RawGroup,
} from "../components/menu"
import { ParallaxLayer, RevealImage, Rise } from "../components/motion"

const houseCocktails: RawGroup = {
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

const largeFormat: RawGroup = {
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

const classics: RawGroup = {
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

const ginVodka: RawGroup = {
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

const brownSpirits: RawGroup = {
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

const wine: RawGroup = {
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

const afterDinner: RawGroup = {
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

const POOL = [
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
]

const tones = ["light", "peach", "blue"] as const
const groups: MenuGroup[] = attachImages(
  [houseCocktails, largeFormat, classics, ginVodka, brownSpirits, wine, afterDinner],
  POOL,
)

function SpiritsMenuPage() {
  return (
    <div className="overflow-hidden">
      <ParallaxLayer index={0}>
        <MenuHero />
      </ParallaxLayer>
      {groups.map((group, index) => (
        <ParallaxLayer index={index + 1} key={group.title}>
          <MenuCardSection group={group} tone={tones[index % tones.length]} />
        </ParallaxLayer>
      ))}
      <ParallaxLayer index={groups.length + 1}>
        <ClosingNote />
      </ParallaxLayer>
      <ParallaxLayer index={groups.length + 2}>
        <ReserveSection />
      </ParallaxLayer>
    </div>
  )
}

function MenuHero() {
  return (
    <section className="relative bg-aberdeen-blue text-aberdeen-peach">
      <RevealImage
        alt="Blue cocktail on a wooden bar"
        className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-40 mix-blend-luminosity md:w-[52%]"
        src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,rgba(42,59,146,0.92)_44%,rgba(42,59,146,0)_100%)]" />
      <div className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Menus</p>
        <div className="max-w-5xl">
          <Rise as="h1" className="font-display text-6xl leading-none md:text-8xl">
            Spirits
          </Rise>
          <p className="mt-8 max-w-2xl text-lg leading-8">
            Cocktails, coastal classics, and bottles for lingering. Bright, briny, botanical, and
            built for the room after dark.
          </p>
        </div>
        <MenuTabs active="spirits" />
      </div>
    </section>
  )
}

function ClosingNote() {
  return (
    <section className="bg-oyster-white px-5 pb-16 md:px-8 md:pb-24">
      <p className="max-w-3xl leading-8 text-kelp-ink/80">
        Spirits, wine, and cocktail selections shift with the season. Ask the bar for the night's
        favorite bottle, spritz, or zero-proof build.
      </p>
    </section>
  )
}

function ReserveSection() {
  return (
    <section className="grid gap-10 bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:grid-cols-[1fr_0.9fr] md:px-8 md:py-24">
      <div>
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Reservations</p>
        <Rise as="h2" className="mt-5 max-w-3xl font-display text-5xl leading-none md:text-7xl">
          Come hungry, stay for the light.
        </Rise>
      </div>
      <div className="self-end border border-aberdeen-peach p-5">
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
      </div>
    </section>
  )
}

export default SpiritsMenuPage
