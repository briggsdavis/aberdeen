import { motion } from "motion/react"
import { Link } from "react-router"
import { PhotoCorners, RopeDivider } from "../components/nautical-details"
import { fadeIn } from "../lib/motion"

type MenuItem = {
  name: string
  description: string
  image: {
    alt: string
    src: string
  }
  price: string
}

type MenuGroup = {
  title: string
  note?: string
  items: MenuItem[]
}

const rawBar: MenuGroup = {
  title: "Raw Bar",
  note: "Shucked to order",
  items: [
    {
      name: "East Coast Oysters",
      description: "Briny and cold, classic mignonette, lemon",
      image: {
        alt: "Oysters on ice with lemon",
        src: "https://images.unsplash.com/photo-1679694140422-aecfd3d5dd0b?auto=format&fit=crop&w=500&q=85",
      },
      price: "4 ea",
    },
    {
      name: "West Coast Oysters",
      description: "Sweet and cucumber-bright, yuzu kosho",
      image: {
        alt: "Fresh oysters on a seafood platter",
        src: "https://images.unsplash.com/photo-1633321094192-388268512e0f?auto=format&fit=crop&w=500&q=85",
      },
      price: "4 ea",
    },
    {
      name: "Tuna Crudo",
      description: "Blood orange, fennel, chili oil, sea salt",
      image: {
        alt: "Thinly sliced raw fish with citrus",
        src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=85",
      },
      price: "21",
    },
    {
      name: "Hamachi",
      description: "Green apple, jalapeño, citrus ponzu",
      image: {
        alt: "Sliced raw fish arranged on a plate",
        src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=85",
      },
      price: "23",
    },
    {
      name: "Jumbo Shrimp Cocktail",
      description: "Horseradish cocktail sauce, charred lemon",
      image: {
        alt: "Shrimp with herbs in a bowl",
        src: "https://images.unsplash.com/photo-1595579547936-c3a0e6c171fc?auto=format&fit=crop&w=500&q=85",
      },
      price: "19",
    },
  ],
}

const towers: MenuGroup = {
  title: "For the Table",
  note: "Built on ice",
  items: [
    {
      name: "Aberdeen Tower",
      description: "Oysters, shrimp, chilled lobster, snow crab, crudo",
      image: {
        alt: "Seafood platter with oysters on ice",
        src: "https://images.unsplash.com/photo-1679694140422-aecfd3d5dd0b?auto=format&fit=crop&w=500&q=85",
      },
      price: "market",
    },
    {
      name: "Half Tower",
      description: "Oysters, shrimp, mussels, lemon, three sauces",
      image: {
        alt: "Oysters and shellfish with lemon",
        src: "https://images.unsplash.com/photo-1633321094192-388268512e0f?auto=format&fit=crop&w=500&q=85",
      },
      price: "68",
    },
  ],
}

const starters: MenuGroup = {
  title: "Starters",
  items: [
    {
      name: "New England Clam Chowder",
      description: "Smoked bacon, fingerling potato, oyster cracker",
      image: {
        alt: "Creamy seafood soup in a bowl",
        src: "https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?auto=format&fit=crop&w=500&q=85",
      },
      price: "14",
    },
    {
      name: "Crispy Calamari",
      description: "Pickled chili, lemon aioli, sea herbs",
      image: {
        alt: "Crispy fried seafood with lemon",
        src: "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=500&q=85",
      },
      price: "17",
    },
    {
      name: "Grilled Octopus",
      description: "Gigante beans, salsa verde, smoked paprika",
      image: {
        alt: "Grilled seafood with greens on a plate",
        src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=85",
      },
      price: "22",
    },
    {
      name: "Maryland Crab Cake",
      description: "Lump crab, remoulade, shaved celery",
      image: {
        alt: "Golden seafood cake with greens",
        src: "https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?auto=format&fit=crop&w=500&q=85",
      },
      price: "24",
    },
    {
      name: "Steamed Mussels",
      description: "White wine, garlic, calabrian butter, grilled bread",
      image: {
        alt: "Shellfish served in a bowl",
        src: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=500&q=85",
      },
      price: "20",
    },
    {
      name: "Little Gem Salad",
      description: "Buttermilk, herbs, cucumber, sourdough crumb",
      image: {
        alt: "Fresh green salad with herbs",
        src: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=85",
      },
      price: "15",
    },
  ],
}

const mains: MenuGroup = {
  title: "From the Sea",
  items: [
    {
      name: "Whole Roasted Branzino",
      description: "Charred lemon, grilled vegetables, salsa verde",
      image: {
        alt: "Whole grilled fish with herbs",
        src: "https://images.unsplash.com/photo-1777891257650-5dedbba89dd4?auto=format&fit=crop&w=500&q=85",
      },
      price: "42",
    },
    {
      name: "Pan-Seared Scallops",
      description: "Sweet corn, brown butter, lime, sea beans",
      image: {
        alt: "Seared seafood on a composed plate",
        src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=85",
      },
      price: "44",
    },
    {
      name: "Cedar Plank Salmon",
      description: "Roasted potatoes, heirloom tomato, dill",
      image: {
        alt: "Roasted fish with vegetables",
        src: "https://images.unsplash.com/photo-1777891257650-5dedbba89dd4?auto=format&fit=crop&w=500&q=85",
      },
      price: "38",
    },
    {
      name: "Cioppino",
      description: "Lobster, clams, mussels, shrimp, tomato saffron broth",
      image: {
        alt: "Seafood stew with shellfish",
        src: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=500&q=85",
      },
      price: "46",
    },
    {
      name: "Linguine Vongole",
      description: "Manila clams, white wine, chili, parsley",
      image: {
        alt: "Seafood pasta with clams",
        src: "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=500&q=85",
      },
      price: "32",
    },
    {
      name: "Aberdeen Lobster Roll",
      description: "Warm butter or chilled herb mayo, hand-cut fries",
      image: {
        alt: "Seafood sandwich with fries",
        src: "https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?auto=format&fit=crop&w=500&q=85",
      },
      price: "34",
    },
  ],
}

const land: MenuGroup = {
  title: "From the Land",
  items: [
    {
      name: "Dry-Aged Strip",
      description: "Maître d' butter, watercress, charred lemon",
      image: {
        alt: "Sliced steak on a plate",
        src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=85",
      },
      price: "52",
    },
    {
      name: "Roast Chicken",
      description: "Lemon, garlic, schmaltz potatoes, salsa verde",
      image: {
        alt: "Roasted entree with herbs and lemon",
        src: "https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?auto=format&fit=crop&w=500&q=85",
      },
      price: "34",
    },
  ],
}

const sides: MenuGroup = {
  title: "Sides",
  items: [
    {
      name: "Hand-Cut Fries",
      description: "Old Bay, lemon aioli",
      image: {
        alt: "Crispy fries in a bowl",
        src: "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=500&q=85",
      },
      price: "10",
    },
    {
      name: "Charred Broccolini",
      description: "Chili, garlic, citrus",
      image: {
        alt: "Green vegetable side dish",
        src: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=85",
      },
      price: "12",
    },
    {
      name: "Heirloom Tomatoes",
      description: "Sea salt, olive oil, herbs",
      image: {
        alt: "Fresh tomatoes with herbs",
        src: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=85",
      },
      price: "13",
    },
    {
      name: "Whipped Potatoes",
      description: "Brown butter, chive",
      image: {
        alt: "Creamy potato side dish",
        src: "https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?auto=format&fit=crop&w=500&q=85",
      },
      price: "11",
    },
  ],
}

const desserts: MenuGroup = {
  title: "Dessert",
  items: [
    {
      name: "Citrus Olive Oil Cake",
      description: "Blood orange, crème fraîche, candied peel",
      image: {
        alt: "Citrus cake on a plate",
        src: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=500&q=85",
      },
      price: "13",
    },
    {
      name: "Key Lime Tart",
      description: "Torched meringue, lime zest, graham",
      image: {
        alt: "Tart dessert with citrus",
        src: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=500&q=85",
      },
      price: "13",
    },
    {
      name: "Chocolate Pot de Crème",
      description: "Sea salt, olive oil, shortbread",
      image: {
        alt: "Chocolate dessert in a dish",
        src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=85",
      },
      price: "12",
    },
    {
      name: "Seasonal Sorbet",
      description: "Three scoops, fresh citrus, mint",
      image: {
        alt: "Light citrus dessert with fresh garnish",
        src: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=85",
      },
      price: "11",
    },
  ],
}

function FoodMenuPage() {
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
    { label: "Food", to: "/menu/food", active: true },
    { label: "Spirits", to: "/menu/spirits", active: false },
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
        alt="A plate of oysters on ice with lemon wedges"
        className="absolute inset-y-0 right-0 h-full w-full object-cover md:w-[52%]"
        src="https://images.unsplash.com/photo-1633321094192-388268512e0f?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,#2A3B92_48%,rgba(42,59,146,0.86)_56%,rgba(42,59,146,0.38)_70%,rgba(42,59,146,0)_90%)]" />
      <motion.div
        className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Menus</p>
        <div className="max-w-5xl">
          <h1 className="font-display text-6xl leading-none md:text-8xl">Food</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8">
            Cold oysters, coastal plates, and generous mains. Sourced from both coasts, served in a
            room that keeps the afternoon glowing after dark.
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
        {group.items.map((item) => (
          <li className="flex items-center gap-4" key={item.name}>
            <img
              alt={item.image.alt}
              className="aspect-square w-20 shrink-0 object-cover md:w-24"
              src={item.image.src}
            />
            <div className="min-w-0 grow">
              <div className="grid grid-cols-[auto_minmax(1rem,1fr)_auto] items-end gap-4">
                <p className="font-display text-xl leading-none text-aberdeen-blue">{item.name}</p>
                <span className="mb-1 border-b border-dotted border-aberdeen-blue/25" />
                <span className="font-utility text-sm leading-none tracking-[0.12em] text-aberdeen-blue uppercase">
                  {item.price}
                </span>
              </div>
              <p className="mt-2 leading-7 text-kelp-ink/80">{item.description}</p>
            </div>
          </li>
        ))}
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
              alt="An oyster platter on ice with lemon"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1679694140422-aecfd3d5dd0b?auto=format&fit=crop&w=1000&q=85"
            />
            <PhotoCorners />
          </div>
          <p className="mt-4 max-w-sm font-utility text-xs tracking-[0.18em] text-aberdeen-blue/70 uppercase">
            Daily selection from both coasts, shucked at the bar.
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
              alt="Cooked shrimp with greens in a blue ceramic bowl"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1595579547936-c3a0e6c171fc?auto=format&fit=crop&w=1000&q=85"
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
            Plates that carry the table.
          </motion.h2>
          <MainsList delay={0.08} group={mains} />
        </div>
        <div className="space-y-12">
          <motion.div className="relative aspect-[16/10]" {...fadeIn(0.08)}>
            <img
              alt="Whole grilled fish topped with fresh salsa on a plate"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1777891257650-5dedbba89dd4?auto=format&fit=crop&w=1200&q=85"
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
        {group.items.map((item) => (
          <li className="flex items-center gap-4" key={item.name}>
            <img
              alt={item.image.alt}
              className="aspect-square w-20 shrink-0 object-cover md:w-24"
              src={item.image.src}
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
        ))}
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
        Menus change with the season and the day's catch. Please let us know about any allergies — a
        20% service charge is added to parties of six or more.
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
      <motion.div className="self-end bg-oyster-white p-6 text-aberdeen-blue" {...fadeIn(0.12)}>
        <RopeDivider className="mb-6 rounded-none" />
        <div className="mb-8 grid grid-cols-[auto_1fr] gap-5 border-b border-dotted border-aberdeen-blue/35 pb-5">
          <div className="grid h-20 w-20 place-items-center bg-citrus font-display text-5xl leading-none">
            01
          </div>
          <div>
            <p className="font-utility text-xs tracking-[0.18em] uppercase">Harbor check</p>
            <p className="mt-2 font-playful text-4xl leading-none">Raw Bar Seat</p>
          </div>
        </div>
        <p className="mb-6 text-lg leading-8">
          Book a table and let the kitchen send out the day's best from the raw bar.
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

export default FoodMenuPage
