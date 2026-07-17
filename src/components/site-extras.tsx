import { AnimatePresence, motion } from "motion/react"
import type { CSSProperties, MouseEvent, ReactNode } from "react"
import { useState } from "react"
import { fadeIn } from "../lib/motion"

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
        ‹
      </button>
      <button aria-label="Next image" className="nautical-arrow" onClick={onNext} type="button">
        ›
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

const restaurantNames = [
  "Meat and Potatoes",
  "Butcher and the Rye",
  "Tako",
  "Tako Torta",
  "Poulet Bleu",
  "Fish Nor Fowl",
  "Coupe de Ville",
  "Sally Ann's",
  "Golden Gai",
  "Vieux Carre",
  "Gi-Jin",
  "Sea Monkey",
  "Rib Room",
  "Preamp",
]

const restaurantCards = restaurantNames.map((name, index) => ({
  image: [
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=85",
  ][index % 4],
  name,
}))

export function RestaurantGroupSection() {
  return (
    <section className="bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <motion.div className="mx-auto max-w-6xl text-center" {...fadeIn()}>
        <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
          Proud to be part of
        </p>
        <h2 className="mt-4 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
          Richard DeShantz Restaurant Group
        </h2>
      </motion.div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
        {restaurantCards.map((restaurant, index) => (
          <motion.article
            className={`group relative aspect-square overflow-hidden bg-aberdeen-blue ${
              index === restaurantCards.length - 2 ? "lg:col-start-3" : ""
            }`}
            key={restaurant.name}
            {...fadeIn(index * 0.025)}
          >
            <img
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-108"
              src={restaurant.image}
            />
            <h3 className="absolute inset-x-3 bottom-3 font-display text-xl leading-none text-oyster-white">
              {restaurant.name}
            </h3>
          </motion.article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a
          className="aberdeen-action bg-aberdeen-blue text-aberdeen-peach"
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

export function FAQSection({ expanded = false }: { expanded?: boolean }) {
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
    [
      "Do you offer zero-proof drinks?",
      "Yes, the beverage menu includes bright nonalcoholic builds.",
    ],
    ["Is there outdoor seating?", "Details will be confirmed closer to opening."],
    ["Can I buy a gift card?", "Gift card information will be added soon."],
    ["How do I contact the team?", "Use the contact form or write to hello@aberdeen.example."],
  ]
  const visible = expanded ? questions : questions.slice(0, 3)

  return (
    <section className="bg-aberdeen-peach px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">FAQ</p>
          <h2 className="mt-4 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
            Good things to know.
          </h2>
          {!expanded ? (
            <a
              className="aberdeen-action mt-8 border border-aberdeen-blue text-aberdeen-blue"
              href="/contact"
            >
              More questions
            </a>
          ) : null}
        </div>
        <div className="space-y-3">
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
    <article className="faq-item bg-oyster-white text-aberdeen-blue">
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
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-5 pb-5 leading-7 text-kelp-ink/80">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  )
}

export function MenuLikeButton({ itemName }: { itemName: string }) {
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
      className={`grid h-10 w-14 shrink-0 grid-cols-[1fr_auto] items-center gap-1 border px-2 font-utility text-xs transition ${
        liked
          ? "border-citrus bg-citrus text-aberdeen-blue"
          : "border-current bg-transparent hover:bg-citrus hover:text-aberdeen-blue"
      }`}
      onClick={handleClick}
      type="button"
    >
      <span className="text-lg leading-none">♡</span>
      <span>{count}</span>
    </button>
  )
}

export function PostcardImageStack({ tone = "blue" }: { tone?: "blue" | "peach" }) {
  const images = [
    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=85",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=85",
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=500&q=85",
    "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=500&q=85",
  ]
  const placements = [
    { left: "-3%", top: "7%", rotate: -8 },
    { right: "-3%", top: "20%", rotate: 9 },
    { bottom: "6%", left: "10%", rotate: 6 },
    { bottom: "-2%", right: "15%", rotate: -7 },
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
            transition: { delay: index * 0.12, duration: 0.48 },
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
