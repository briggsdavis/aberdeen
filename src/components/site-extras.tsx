import { Heart } from "@phosphor-icons/react"
import { useMutation } from "convex/react"
import { motion } from "motion/react"
import { useState } from "react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"
import { fadeIn } from "../lib/motion"
import { Postcard } from "./postcard"

const restaurantCards = [
  { image: "/favicon.ico", name: "Aberdeen", featured: true },
  { image: "/restaurants/meat-and-potatoes.webp", name: "Meat and Potatoes" },
  { image: "/restaurants/butcher-and-the-rye.webp", name: "Butcher and the Rye" },
  { image: "/restaurants/tako.webp", name: "Tako" },
  { image: "/restaurants/tako-torta.webp", name: "Tako Torta" },
  { image: "/restaurants/poulet-bleu.webp", name: "Poulet Bleu" },
  { image: "/restaurants/fish-nor-fowl.webp", name: "Fish Nor Fowl" },
  { image: "/restaurants/coop-de-ville.webp", name: "Coupe de Ville" },
  { image: "/restaurants/sally-anns.webp", name: "Sally Ann's" },
  { image: "/restaurants/golden-gai.webp", name: "Golden Gai" },
  { image: "/restaurants/vieux-carre.webp", name: "Vieux Carre" },
  { image: "/restaurants/gi-jin.webp", name: "Gi-Jin" },
  { image: "/restaurants/sea-monkey.webp", name: "Sea Monkey" },
  { image: "/restaurants/rib-room.webp", name: "Rib Room" },
]
const restaurantCardSequence = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
}
const restaurantCardReveal = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function RestaurantGroupSection() {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-oyster-white px-5 py-12 md:px-8 md:py-14">
      <motion.div
        className="relative z-10 mx-auto max-w-6xl text-center text-aberdeen-blue"
        {...fadeIn()}
      >
        <h2
          className="font-display text-5xl leading-none md:text-7xl"
          data-cms-text-key="restaurant-group.title"
        >
          Richard DeShantz Restaurant Group
        </h2>
      </motion.div>
      <motion.div
        className="relative z-10 mt-8 grid grid-cols-2 gap-3 md:grid-cols-7"
        initial="hidden"
        variants={restaurantCardSequence}
        viewport={{ amount: 0.12, once: true }}
        whileInView="visible"
      >
        {restaurantCards.map((restaurant) => (
          <motion.article
            className={`restaurant-logo-card group relative aspect-square cursor-pointer overflow-hidden ${
              restaurant.featured ? "bg-aberdeen-blue" : "bg-oyster-white"
            }`}
            key={restaurant.name}
            variants={restaurantCardReveal}
          >
            <img
              alt={`${restaurant.name} logo`}
              className={`no-scroll-reveal h-full w-full object-contain transition duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] ${
                restaurant.featured ? "p-8 brightness-0 invert" : ""
              }`}
              src={restaurant.image}
            />
          </motion.article>
        ))}
      </motion.div>
      <div className="relative z-10 mt-8 text-center">
        <a
          className="aberdeen-action bg-aberdeen-blue text-oyster-white"
          data-cms-link-key="restaurant-group.link"
          href="https://richarddeshantz.com/"
          rel="noreferrer"
          target="_blank"
        >
          Find out more
        </a>
      </div>
    </section>
  )
}

export function MenuLikeButton({
  initialCount,
  itemId,
  itemName,
}: {
  initialCount?: number
  itemId?: string
  itemName: string
}) {
  return itemId ? (
    <StoredMenuLikeButton
      initialCount={initialCount ?? 0}
      itemId={itemId as Id<"menuItems">}
      itemName={itemName}
    />
  ) : (
    <LocalMenuLikeButton itemName={itemName} />
  )
}

function LocalMenuLikeButton({ itemName }: { itemName: string }) {
  const key = `aberdeen-liked-${itemName}`
  const [liked, setLiked] = useState(() => sessionStorage.getItem(key) === "true")
  const [count, setCount] = useState(() => 12 + (itemName.length % 9))

  function handleClick() {
    if (liked) return
    sessionStorage.setItem(key, "true")
    setLiked(true)
    setCount((current) => current + 1)
  }

  return (
    <button
      aria-label={`Like ${itemName}`}
      aria-pressed={liked}
      className={`group flex h-9 w-16 shrink-0 items-center justify-center gap-1.5 border px-2 font-utility text-sm transition duration-[480ms] ${
        liked
          ? "border-aberdeen-blue bg-aberdeen-blue text-oyster-white"
          : "border-current bg-transparent hover:border-aberdeen-blue hover:bg-aberdeen-blue hover:text-oyster-white"
      }`}
      onClick={handleClick}
      type="button"
    >
      <Heart
        aria-hidden="true"
        className="transition-transform group-hover:scale-110"
        size={16}
        weight={liked ? "fill" : "regular"}
      />
      <span>{count}</span>
    </button>
  )
}

function StoredMenuLikeButton({
  initialCount,
  itemId,
  itemName,
}: {
  initialCount: number
  itemId: Id<"menuItems">
  itemName: string
}) {
  const likeItem = useMutation(api.menus.likeItem)
  const key = `aberdeen-liked-menu-item-${itemId}`
  const [liked, setLiked] = useState(() => localStorage.getItem(key) === "true")
  const [count, setCount] = useState(initialCount)

  function handleClick() {
    if (liked) return
    localStorage.setItem(key, "true")
    setLiked(true)
    setCount((current) => current + 1)
    void likeItem({ id: itemId }).catch(() => {
      localStorage.removeItem(key)
      setLiked(false)
      setCount((current) => Math.max(initialCount, current - 1))
    })
  }

  return (
    <button
      aria-label={`Like ${itemName}`}
      aria-pressed={liked}
      className={`group flex h-9 w-16 shrink-0 items-center justify-center gap-1.5 border px-2 font-utility text-sm transition duration-[480ms] ${
        liked
          ? "border-aberdeen-blue bg-aberdeen-blue text-oyster-white"
          : "border-current bg-transparent hover:border-aberdeen-blue hover:bg-aberdeen-blue hover:text-oyster-white"
      }`}
      onClick={handleClick}
      type="button"
    >
      <Heart
        aria-hidden="true"
        className="transition-transform group-hover:scale-110"
        size={16}
        weight={liked ? "fill" : "regular"}
      />
      <span>{count}</span>
    </button>
  )
}

export function PostcardImageStack({ images: managedImages }: { images?: string[] }) {
  const images = managedImages ?? [
    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=85",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=85",
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=500&q=85",
  ]
  const placements = [
    { left: "-3%", top: "7%", rotate: -8 },
    { right: "-3%", top: "20%", rotate: 9 },
    { bottom: "6%", left: "10%", rotate: 6 },
  ]
  const postcardNotes = [
    {
      message: "The yachts are in, the river is gold, and dinner is waiting by the water.",
    },
    {
      message: "White sails, salt air, and one more beautiful evening in Savannah, Georgia.",
    },
    {
      message: "Meet us where the yachts pass at sunset. Savannah has saved you a seat.",
    },
  ]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-visible"
      data-testid="postcard-stack"
    >
      {images.map((image, index) => {
        const note = postcardNotes[index] ?? postcardNotes[0]!

        return (
          <motion.div
            className="absolute aspect-[8/5] w-[min(74%,15rem)]"
            initial={{ opacity: 0, scale: 0.82, y: 24 }}
            key={`${image}-${index}`}
            style={{ ...placements[index], zIndex: index + 1 }}
            viewport={{ amount: 0.55, once: false }}
            whileInView={{
              opacity: 1,
              rotate: placements[index].rotate,
              scale: 1,
              y: 0,
              transition: { delay: index * 0.12, duration: 0.576 },
            }}
          >
            <Postcard imageAlt="" imageSrc={image} message={note.message} size="small" />
          </motion.div>
        )
      })}
    </div>
  )
}
