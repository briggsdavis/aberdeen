import { Link } from "react-router"
import {
  attachImages,
  MenuCardSection,
  type MenuGroup,
  MenuTabs,
  type RawGroup,
} from "../components/menu"
import { ParallaxLayer, RevealImage, Rise } from "../components/motion"

const rawBar: RawGroup = {
  title: "Raw Bar",
  note: "Shucked to order",
  items: [
    {
      name: "East Coast Oysters",
      description: "Briny and cold, classic mignonette, lemon",
      price: "4 ea",
    },
    {
      name: "West Coast Oysters",
      description: "Sweet and cucumber-bright, yuzu kosho",
      price: "4 ea",
    },
    {
      name: "Tuna Crudo",
      description: "Blood orange, fennel, chili oil, sea salt",
      price: "21",
    },
    {
      name: "Hamachi",
      description: "Green apple, jalapeño, citrus ponzu",
      price: "23",
    },
    {
      name: "Jumbo Shrimp Cocktail",
      description: "Horseradish cocktail sauce, charred lemon",
      price: "19",
    },
  ],
}

const towers: RawGroup = {
  title: "For the Table",
  note: "Built on ice",
  items: [
    {
      name: "Aberdeen Tower",
      description: "Oysters, shrimp, chilled lobster, snow crab, crudo",
      price: "market",
    },
    {
      name: "Half Tower",
      description: "Oysters, shrimp, mussels, lemon, three sauces",
      price: "68",
    },
  ],
}

const starters: RawGroup = {
  title: "Starters",
  items: [
    {
      name: "New England Clam Chowder",
      description: "Smoked bacon, fingerling potato, oyster cracker",
      price: "14",
    },
    {
      name: "Crispy Calamari",
      description: "Pickled chili, lemon aioli, sea herbs",
      price: "17",
    },
    {
      name: "Grilled Octopus",
      description: "Gigante beans, salsa verde, smoked paprika",
      price: "22",
    },
    {
      name: "Maryland Crab Cake",
      description: "Lump crab, remoulade, shaved celery",
      price: "24",
    },
    {
      name: "Steamed Mussels",
      description: "White wine, garlic, calabrian butter, grilled bread",
      price: "20",
    },
    {
      name: "Little Gem Salad",
      description: "Buttermilk, herbs, cucumber, sourdough crumb",
      price: "15",
    },
  ],
}

const mains: RawGroup = {
  title: "From the Sea",
  items: [
    {
      name: "Whole Roasted Branzino",
      description: "Charred lemon, grilled vegetables, salsa verde",
      price: "42",
    },
    {
      name: "Pan-Seared Scallops",
      description: "Sweet corn, brown butter, lime, sea beans",
      price: "44",
    },
    {
      name: "Cedar Plank Salmon",
      description: "Roasted potatoes, heirloom tomato, dill",
      price: "38",
    },
    {
      name: "Cioppino",
      description: "Lobster, clams, mussels, shrimp, tomato saffron broth",
      price: "46",
    },
    {
      name: "Linguine Vongole",
      description: "Manila clams, white wine, chili, parsley",
      price: "32",
    },
    {
      name: "Aberdeen Lobster Roll",
      description: "Warm butter or chilled herb mayo, hand-cut fries",
      price: "34",
    },
  ],
}

const land: RawGroup = {
  title: "From the Land",
  items: [
    {
      name: "Dry-Aged Strip",
      description: "Maître d' butter, watercress, charred lemon",
      price: "52",
    },
    {
      name: "Roast Chicken",
      description: "Lemon, garlic, schmaltz potatoes, salsa verde",
      price: "34",
    },
  ],
}

const sides: RawGroup = {
  title: "Sides",
  items: [
    { name: "Hand-Cut Fries", description: "Old Bay, lemon aioli", price: "10" },
    { name: "Charred Broccolini", description: "Chili, garlic, citrus", price: "12" },
    { name: "Heirloom Tomatoes", description: "Sea salt, olive oil, herbs", price: "13" },
    { name: "Whipped Potatoes", description: "Brown butter, chive", price: "11" },
  ],
}

const desserts: RawGroup = {
  title: "Dessert",
  items: [
    {
      name: "Citrus Olive Oil Cake",
      description: "Blood orange, crème fraîche, candied peel",
      price: "13",
    },
    {
      name: "Key Lime Tart",
      description: "Torched meringue, lime zest, graham",
      price: "13",
    },
    {
      name: "Chocolate Pot de Crème",
      description: "Sea salt, olive oil, shortbread",
      price: "12",
    },
    {
      name: "Seasonal Sorbet",
      description: "Three scoops, fresh citrus, mint",
      price: "11",
    },
  ],
}

const POOL = [
  "https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1679694140422-aecfd3d5dd0b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1595579547936-c3a0e6c171fc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1777891257650-5dedbba89dd4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1633321094192-388268512e0f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
]

const tones = ["light", "peach", "blue"] as const
const groups: MenuGroup[] = attachImages(
  [rawBar, towers, starters, mains, land, sides, desserts],
  POOL,
)

function FoodMenuPage() {
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
        alt="A plate of oysters on ice with lemon wedges"
        className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-40 mix-blend-luminosity md:w-[52%]"
        src="https://images.unsplash.com/photo-1633321094192-388268512e0f?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,rgba(42,59,146,0.92)_44%,rgba(42,59,146,0)_100%)]" />
      <div className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Menus</p>
        <div className="max-w-5xl">
          <Rise as="h1" className="font-display text-6xl leading-none md:text-8xl">
            Food
          </Rise>
          <p className="mt-8 max-w-2xl text-lg leading-8">
            Cold oysters, coastal plates, and generous mains. Sourced from both coasts, served in a
            room that keeps the afternoon glowing after dark.
          </p>
        </div>
        <MenuTabs active="food" />
      </div>
    </section>
  )
}

function ClosingNote() {
  return (
    <section className="bg-oyster-white px-5 pb-16 md:px-8 md:pb-24">
      <p className="max-w-3xl leading-8 text-kelp-ink/80">
        Menus change with the season and the day's catch. Please let us know about any allergies — a
        20% service charge is added to parties of six or more.
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
          Book a table and let the kitchen send out the day's best from the raw bar.
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

export default FoodMenuPage
