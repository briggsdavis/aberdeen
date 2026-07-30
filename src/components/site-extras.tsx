import { CaretLeft, CaretRight, Heart } from "@phosphor-icons/react"
import { useMutation } from "convex/react"
import { AnimatePresence, motion } from "motion/react"
import type { CSSProperties, MouseEvent, ReactNode } from "react"
import { useState } from "react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"
import { fadeIn } from "../lib/motion"
import { DecorativeBackdrop } from "./decorative-media"

export const heroImages = [
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=85",
]

export function useHeroCarousel(images = heroImages) {
  const [index, setIndex] = useState(0)
  const next = () => setIndex((current) => (current + 1) % images.length)
  const previous = () => setIndex((current) => (current - 1 + images.length) % images.length)

  return { image: images[index], index, next, previous }
}

export function HeroCarouselButtons({
  className = "",
  onNext,
  onPrevious,
}: {
  className?: string
  onNext: () => void
  onPrevious: () => void
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        aria-label="Previous image"
        className="nautical-arrow"
        onClick={onPrevious}
        type="button"
      >
        <CaretLeft aria-hidden="true" size={20} />
      </button>
      <button aria-label="Next image" className="nautical-arrow" onClick={onNext} type="button">
        <CaretRight aria-hidden="true" size={20} />
      </button>
    </div>
  )
}

export function RippleSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section className={className} id={id}>
      {children}
    </section>
  )
}

export function TiltWrap({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 9
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -9
    setTilt({ x, y })
  }

  return (
    <div
      className={`scrapbook-tilt ${className}`}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onMouseMove={handleMove}
      style={
        {
          "--tilt-x": `${tilt.x}deg`,
          "--tilt-y": `${tilt.y}deg`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

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

export function RestaurantGroupSection() {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-oyster-white px-5 py-12 md:px-8 md:py-14">
      <DecorativeBackdrop imageClassName="object-cover" src="/maps/antique-map-02.png" />
      <motion.div
        className="relative z-10 mx-auto max-w-6xl text-center text-aberdeen-blue"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Proud to be part of</p>
        <h2 className="mt-3 font-display text-5xl leading-none md:text-6xl">
          Richard DeShantz Restaurant Group
        </h2>
      </motion.div>
      <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 md:grid-cols-7">
        {restaurantCards.map((restaurant, index) => (
          <motion.article
            className={`restaurant-logo-card group relative aspect-square overflow-hidden ${
              restaurant.featured ? "bg-aberdeen-blue" : "bg-oyster-white"
            }`}
            key={restaurant.name}
            {...fadeIn(index * 0.025)}
          >
            <img
              alt={`${restaurant.name} logo`}
              className={`h-full w-full object-contain transition duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] ${
                restaurant.featured ? "p-8 brightness-0 invert" : ""
              }`}
              src={restaurant.image}
            />
            <h3 className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-2 pt-8 pb-2.5 text-center font-utility text-[0.62rem] leading-tight tracking-[0.08em] text-oyster-white uppercase [text-shadow:0_2px_7px_rgb(0_0_0/0.85)] lg:text-xs">
              {restaurant.name}
            </h3>
          </motion.article>
        ))}
      </div>
      <div className="relative z-10 mt-8 text-center">
        <a
          className="aberdeen-action bg-aberdeen-blue text-oyster-white"
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

export function FAQSection({
  blue = false,
  cardsFirst = false,
  expanded = false,
}: {
  blue?: boolean
  cardsFirst?: boolean
  expanded?: boolean
}) {
  const questions = [
    ["Do you take reservations?", "Yes. Reservation links will be connected when booking opens."],
    [
      "Do you host private events?",
      "Yes. Aberdeen can shape group dinners and seasonal gatherings.",
    ],
    [
      "Are menus seasonal?",
      "Yes. Dishes and drinks shift with the catch, the market, and the weather.",
    ],
    ["Where are you located?", "The Savannah address is coming soon."],
    ["Can you handle allergies?", "Tell the team when booking and again when you arrive."],
    ["Is there a raw bar?", "Yes, oysters and chilled seafood are core to the room."],
  ]
  const visible = expanded ? questions : questions.slice(0, 3)

  return (
    <section
      className={`relative isolate overflow-hidden ${blue ? "bg-aberdeen-blue" : "bg-oyster-white"} px-5 py-16 md:px-8 md:py-24`}
    >
      <div
        className={`relative z-10 grid gap-10 ${
          cardsFirst ? "md:grid-cols-[1.3fr_0.7fr]" : "md:grid-cols-[0.7fr_1.3fr]"
        }`}
      >
        <div className={cardsFirst ? "md:order-2" : ""}>
          <p
            className={`font-utility text-sm tracking-[0.22em] uppercase ${blue ? "text-oyster-white" : "text-aberdeen-blue"}`}
          >
            FAQ
          </p>
          <h2
            className={`mt-4 font-display text-5xl leading-none md:text-7xl ${blue ? "text-oyster-white" : "text-aberdeen-blue"}`}
          >
            Good things to know.
          </h2>
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none mt-8 h-auto w-full max-w-64 scale-x-[-1] -rotate-6 object-contain opacity-60 md:mt-10"
            src="/illustrations/nautical/sailing-ship.png"
          />
          {!expanded ? (
            <a
              className={`aberdeen-action mt-8 border ${
                blue
                  ? "border-oyster-white text-oyster-white"
                  : "border-aberdeen-blue text-aberdeen-blue"
              }`}
              href="/contact"
            >
              More questions
            </a>
          ) : null}
        </div>
        <div className={`space-y-3 ${cardsFirst ? "md:order-1" : ""}`}>
          {visible.map(([question, answer]) => (
            <FAQItem answer={answer} key={question} question={question} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ answer, question }: { answer: string; question: string }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="faq-item bg-aberdeen-peach text-aberdeen-blue">
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 p-5 text-left"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className="font-display text-2xl leading-none">{question}</span>
        <span
          aria-hidden="true"
          className={`faq-toggle grid h-8 w-8 shrink-0 place-items-center border border-aberdeen-blue font-utility text-xl ${
            open ? "is-open" : ""
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.384, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-5 pb-5 leading-7 text-kelp-ink/80">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
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
      className={`group flex h-11 w-16 shrink-0 items-center justify-center gap-1.5 border px-3 font-utility text-xs transition duration-[480ms] ${
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
        size={18}
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
      className={`group flex h-11 w-16 shrink-0 items-center justify-center gap-1.5 border px-3 font-utility text-xs transition duration-[480ms] ${
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
        size={18}
        weight={liked ? "fill" : "regular"}
      />
      <span>{count}</span>
    </button>
  )
}

export function PostcardImageStack({
  images: managedImages,
  tone = "blue",
}: {
  images?: string[]
  tone?: "blue" | "peach"
}) {
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

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      data-testid="postcard-stack"
    >
      {images.map((image, index) => (
        <motion.div
          className="absolute w-[11.7rem] bg-oyster-white p-2 shadow-[0_16px_26px_rgb(29_42_47/0.2)]"
          initial={{ opacity: 0, scale: 0.82, y: 24 }}
          key={image}
          style={placements[index]}
          viewport={{ amount: 0.55, once: false }}
          whileInView={{
            opacity: 1,
            rotate: placements[index].rotate,
            scale: 1,
            y: 0,
            transition: { delay: index * 0.12, duration: 0.576 },
          }}
        >
          <img alt="" className="aspect-[4/3] w-full object-cover" src={image} />
          <div
            className={`mt-2 h-2 ${tone === "blue" ? "bg-aberdeen-blue" : "bg-aberdeen-peach"}`}
          />
        </motion.div>
      ))}
    </div>
  )
}
