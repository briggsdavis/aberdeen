import { Link } from "react-router"

type MenuItem = {
  name: string
  description: string
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

const towers: MenuGroup = {
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

const starters: MenuGroup = {
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

const mains: MenuGroup = {
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

const land: MenuGroup = {
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

const sides: MenuGroup = {
  title: "Sides",
  items: [
    { name: "Hand-Cut Fries", description: "Old Bay, lemon aioli", price: "10" },
    { name: "Charred Broccolini", description: "Chili, garlic, citrus", price: "12" },
    { name: "Heirloom Tomatoes", description: "Sea salt, olive oil, herbs", price: "13" },
    { name: "Whipped Potatoes", description: "Brown butter, chive", price: "11" },
  ],
}

const desserts: MenuGroup = {
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
              : "opacity-70 transition hover:opacity-100"
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
        className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-40 mix-blend-luminosity md:w-[52%]"
        src="https://images.unsplash.com/photo-1633321094192-388268512e0f?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,rgba(42,59,146,0.96)_44%,rgba(42,59,146,0.36)_100%)]" />
      <div className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Menus</p>
        <div className="max-w-5xl">
          <h1 className="font-display text-6xl leading-none md:text-8xl">Food</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8">
            Cold oysters, coastal plates, and generous mains. Sourced from both coasts, served in a
            room that keeps the afternoon glowing after dark.
          </p>
        </div>
        <MenuTabs />
      </div>
    </section>
  )
}

function MenuList({ group }: { group: MenuGroup }) {
  return (
    <div>
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
          <li className="flex items-baseline gap-4" key={item.name}>
            <div className="min-w-0">
              <p className="font-display text-xl text-aberdeen-blue">{item.name}</p>
              <p className="mt-1 leading-7 text-kelp-ink/80">{item.description}</p>
            </div>
            <span className="grow border-b border-dotted border-aberdeen-blue/25" />
            <span className="font-utility text-sm tracking-[0.12em] text-aberdeen-blue uppercase">
              {item.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RawBarSection() {
  return (
    <section className="bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1fr_0.9fr] md:gap-16">
        <div className="space-y-12">
          <MenuList group={rawBar} />
          <MenuList group={towers} />
        </div>
        <div className="self-start md:sticky md:top-8">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              alt="An oyster platter on ice with lemon"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1679694140422-aecfd3d5dd0b?auto=format&fit=crop&w=1000&q=85"
            />
          </div>
          <p className="mt-4 max-w-sm font-utility text-xs tracking-[0.18em] text-aberdeen-blue/70 uppercase">
            Daily selection from both coasts, shucked at the bar.
          </p>
        </div>
      </div>
    </section>
  )
}

function StartersSection() {
  return (
    <section className="bg-aberdeen-peach px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1fr] md:gap-16">
        <div className="order-2 md:order-1">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              alt="Cooked shrimp with greens in a blue ceramic bowl"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1595579547936-c3a0e6c171fc?auto=format&fit=crop&w=1000&q=85"
            />
          </div>
        </div>
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
      <div className="mb-12 grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
        <h2 className="font-display text-5xl leading-none md:text-7xl">
          Plates that carry the table.
        </h2>
        <div className="aspect-[16/10] overflow-hidden">
          <img
            alt="Whole grilled fish topped with fresh salsa on a plate"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1777891257650-5dedbba89dd4?auto=format&fit=crop&w=1200&q=85"
          />
        </div>
      </div>
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <MainsList group={mains} />
        <MainsList group={land} />
      </div>
    </section>
  )
}

function MainsList({ group }: { group: MenuGroup }) {
  return (
    <div>
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
          <li className="flex items-baseline gap-4" key={item.name}>
            <div className="min-w-0">
              <p className="font-display text-xl">{item.name}</p>
              <p className="mt-1 leading-7 text-aberdeen-peach/80">{item.description}</p>
            </div>
            <span className="grow border-b border-dotted border-aberdeen-peach/30" />
            <span className="font-utility text-sm tracking-[0.12em] uppercase">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SidesAndDessertSection() {
  return (
    <section className="bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <MenuList group={sides} />
        <MenuList group={desserts} />
      </div>
      <p className="mt-12 max-w-3xl leading-8 text-kelp-ink/80">
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
        <h2 className="mt-5 max-w-3xl font-display text-5xl leading-none md:text-7xl">
          Come hungry, stay for the light.
        </h2>
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
