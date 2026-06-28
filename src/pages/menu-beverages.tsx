import { Link } from "react-router"
import {
  attachImages,
  MenuCardSection,
  type MenuGroup,
  MenuTabs,
  type RawGroup,
} from "../components/menu"
import { ParallaxLayer, RevealImage, Rise } from "../components/motion"

const zeroProof: RawGroup = {
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

const pitchers: RawGroup = {
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

const sparklingStill: RawGroup = {
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

const coffee: RawGroup = {
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

const tea: RawGroup = {
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

const juice: RawGroup = {
  title: "Juice",
  items: [
    { name: "Orange", description: "Fresh pressed", price: "7" },
    { name: "Grapefruit", description: "Ruby red, bright acid", price: "7" },
    { name: "Pineapple", description: "Sweet, tropical, chilled", price: "7" },
    { name: "Cranberry", description: "Tart and clean", price: "6" },
  ],
}

const afterDinner: RawGroup = {
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

const POOL = [
  "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
]

const tones = ["light", "peach", "blue"] as const
const groups: MenuGroup[] = attachImages(
  [zeroProof, pitchers, sparklingStill, coffee, tea, juice, afterDinner],
  POOL,
)

function BeveragesMenuPage() {
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
        alt="A bottle of sparkling water next to lemonade"
        className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-40 mix-blend-luminosity md:w-[52%]"
        src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,rgba(42,59,146,0.92)_44%,rgba(42,59,146,0)_100%)]" />
      <div className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Menus</p>
        <div className="max-w-5xl">
          <Rise as="h1" className="font-display text-6xl leading-none md:text-8xl">
            Beverages
          </Rise>
          <p className="mt-8 max-w-2xl text-lg leading-8">
            Sparkling, zero-proof, coffee, tea, and daytime refreshers. Made for long lunches, early
            dinners, and one more round without the proof.
          </p>
        </div>
        <MenuTabs active="beverages" />
      </div>
    </section>
  )
}

function ClosingNote() {
  return (
    <section className="bg-oyster-white px-5 pb-16 md:px-8 md:pb-24">
      <p className="max-w-3xl leading-8 text-kelp-ink/80">
        Beverage selections change with the season. Ask for the current house soda, iced tea, or
        zero-proof special.
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
          Stay for one more sparkling thing.
        </Rise>
      </div>
      <div className="self-end border border-aberdeen-peach p-5">
        <p className="mb-6 text-lg leading-8">
          Book a table for bright refreshers, coffee after dinner, and something sparkling between
          courses.
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

export default BeveragesMenuPage
