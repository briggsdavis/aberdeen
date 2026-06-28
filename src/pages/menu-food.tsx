import {
  attachImages,
  MenuCardSection,
  MenuClosingNote,
  type MenuGroup,
  MenuHero,
  MenuReserve,
  type RawGroup,
} from "../components/menu"
import { ParallaxLayer } from "../components/motion"

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
        <MenuHero
          active="food"
          image="https://images.unsplash.com/photo-1633321094192-388268512e0f?auto=format&fit=crop&w=1800&q=85"
          imageAlt="A plate of oysters on ice with lemon wedges"
          intro="Cold oysters, coastal plates, and generous mains. Sourced from both coasts, served in a room that keeps the afternoon glowing after dark."
          title="Food"
        />
      </ParallaxLayer>
      {groups.map((group, index) => (
        <ParallaxLayer index={index + 1} key={group.title}>
          <MenuCardSection group={group} tone={tones[index % tones.length]} />
        </ParallaxLayer>
      ))}
      <ParallaxLayer index={groups.length + 1}>
        <MenuClosingNote>
          Menus change with the season and the day's catch. Please let us know about any allergies —
          a 20% service charge is added to parties of six or more.
        </MenuClosingNote>
      </ParallaxLayer>
      <ParallaxLayer index={groups.length + 2}>
        <MenuReserve
          body="Book a table and let the kitchen send out the day's best from the raw bar."
          heading="Come hungry, stay for the light."
        />
      </ParallaxLayer>
    </div>
  )
}

export default FoodMenuPage
