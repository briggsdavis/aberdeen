import { Heart } from "@phosphor-icons/react"
import { useMutation } from "convex/react"
import { motion } from "motion/react"
import { useState } from "react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"
import { fadeIn } from "../lib/motion"
import { standardActionTone } from "../lib/standard-action"

const restaurantCards = [
  { href: "/", image: "/favicon.ico", name: "Aberdeen", featured: true },
  {
    href: "https://meatandpotatoespgh.com/",
    image: "/restaurants/meat-and-potatoes.webp",
    name: "Meat and Potatoes",
  },
  {
    href: "https://butcherandtherye.com/",
    image: "/restaurants/butcher-and-the-rye.webp",
    name: "Butcher and the Rye",
  },
  { href: "https://takopgh.com/", image: "/restaurants/tako.webp", name: "Tako" },
  {
    href: "https://pouletbleupgh.com/",
    image: "/restaurants/poulet-bleu.webp",
    name: "Poulet Bleu",
  },
  {
    href: "https://fishnorfowlpgh.com/",
    image: "/restaurants/fish-nor-fowl.webp",
    name: "Fish Nor Fowl",
  },
  {
    href: "https://coopdevillepgh.com/",
    image: "/restaurants/coop-de-ville.webp",
    name: "Coop de Ville",
  },
  { href: "https://gi-jin.com/", image: "/restaurants/gi-jin.webp", name: "Gi-Jin" },
  {
    href: "https://takotorta.com/",
    image: "/restaurants/tako-torta.webp",
    name: "Tako Torta",
  },
  {
    href: "https://ribroompgh.com/",
    image: "/restaurants/rib-room.webp",
    name: "Rib Room",
  },
  {
    href: "https://sallyannspgh.com/",
    image: "/restaurants/sally-anns.webp",
    name: "Sally Ann's",
  },
  {
    href: "https://goldengaipgh.com/",
    image: "/restaurants/golden-gai.webp",
    name: "Golden Gai",
  },
  {
    href: "https://www.preampcoffeestudio.com/",
    image: "/brand/preamp-logo.png",
    name: "Preamp Coffee Studio",
  },
  {
    href: "https://www.seamonkeypgh.com/",
    image: "/restaurants/sea-monkey.webp",
    name: "Sea Monkey",
  },
  {
    href: "https://www.seamonkeypgh.com/vieux-carre",
    image: "/restaurants/vieux-carre.webp",
    name: "Vieux Carré",
  },
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

export function RestaurantGroupSection({ actionToneIndex = 0 }: { actionToneIndex?: number }) {
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
        className="relative z-10 mx-auto mt-9 grid w-full max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5"
        initial="hidden"
        variants={restaurantCardSequence}
        viewport={{ amount: 0.12, once: true }}
        whileInView="visible"
      >
        {restaurantCards.map((restaurant) => (
          <motion.a
            aria-label={`Visit ${restaurant.name}`}
            className="restaurant-logo-card teak-grain group relative aspect-square overflow-hidden p-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-citrus md:p-4"
            href={restaurant.href}
            key={restaurant.name}
            rel={restaurant.href === "/" ? undefined : "noreferrer"}
            target={restaurant.href === "/" ? undefined : "_blank"}
            variants={restaurantCardReveal}
          >
            <span
              className={`grid h-full w-full place-items-center overflow-hidden ${
                restaurant.featured ? "bg-aberdeen-blue" : "bg-oyster-white"
              }`}
            >
              <img
                alt={`${restaurant.name} logo`}
                className={`no-scroll-reveal h-full w-full object-contain transition duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] ${
                  restaurant.featured ? "p-8 brightness-0 invert" : ""
                }`}
                src={restaurant.image}
              />
            </span>
          </motion.a>
        ))}
      </motion.div>
      <div className="relative z-10 mt-8 text-center">
        <a
          className="aberdeen-action standard-action"
          data-cms-link-key="restaurant-group.link"
          data-standard-action-tone={standardActionTone(actionToneIndex)}
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
