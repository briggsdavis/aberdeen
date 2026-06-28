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
        <MenuHero
          active="beverages"
          image="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1800&q=85"
          imageAlt="A bottle of sparkling water next to lemonade"
          intro="Sparkling, zero-proof, coffee, tea, and daytime refreshers. Made for long lunches, early dinners, and one more round without the proof."
          title="Beverages"
        />
      </ParallaxLayer>
      {groups.map((group, index) => (
        <ParallaxLayer index={index + 1} key={group.title}>
          <MenuCardSection group={group} tone={tones[index % tones.length]} />
        </ParallaxLayer>
      ))}
      <ParallaxLayer index={groups.length + 1}>
        <MenuClosingNote>
          Beverage selections change with the season. Ask for the current house soda, iced tea, or
          zero-proof special.
        </MenuClosingNote>
      </ParallaxLayer>
      <ParallaxLayer index={groups.length + 2}>
        <MenuReserve
          body="Book a table for bright refreshers, coffee after dinner, and something sparkling between courses."
          heading="Stay for one more sparkling thing."
        />
      </ParallaxLayer>
    </div>
  )
}

export default BeveragesMenuPage
