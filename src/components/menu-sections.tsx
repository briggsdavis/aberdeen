import { motion } from "motion/react"
import { Link } from "react-router"
import { DecorativeBackdrop } from "./decorative-media"
import { PhotoCorners, RopeDivider } from "./nautical-details"
import { MenuLikeButton, PostcardImageStack, RippleSection } from "./site-extras"
import { useCmsRuntime } from "../lib/cms-runtime"
import { fadeIn } from "../lib/motion"

export type StandardMenuGroup = {
  title: string
  note?: string
  items: Array<{
    name: string
    description: string
    price: string
  }>
}

const tabs = [
  { label: "Food", to: "/menu/food" },
  { label: "Spirits", to: "/menu/spirits" },
  { label: "Beverages", to: "/menu/beverages" },
]

export function MenuPageHero({
  activePath,
  alt,
  description,
  image,
  title,
}: {
  activePath: string
  alt: string
  description: string
  image: string
  title: string
}) {
  const { page } = useCmsRuntime()
  const managedHero = page.media.hero?.url ?? page.images.hero

  return (
    <section className="relative bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        data-cms-slot="hero"
        src={managedHero ?? image}
      />
      <div className="hero-radial-glow absolute inset-0 z-[1]" />
      <motion.div
        className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Menus</p>
        <div className="max-w-5xl">
          <h1 className="font-display text-6xl leading-none md:text-8xl">{title}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8">{description}</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-utility text-sm tracking-[0.18em] uppercase">
          {tabs.map((tab) => (
            <Link
              className={
                tab.to === activePath
                  ? "underline decoration-citrus decoration-2 underline-offset-8"
                  : "decoration-citrus decoration-2 underline-offset-8 opacity-70 transition hover:underline hover:opacity-100"
              }
              key={tab.label}
              to={tab.to}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </motion.div>
    </section>
  )
}

function MenuList({ delay = 0, group }: { delay?: number; group: StandardMenuGroup }) {
  return (
    <motion.div {...fadeIn(delay)}>
      <RopeDivider className="mb-6 rounded-none" />
      <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-aberdeen-blue/20 pb-3">
        <h2 className="font-display text-3xl leading-none text-aberdeen-blue md:text-4xl">
          {group.title}
        </h2>
        {group.note ? (
          <p className="font-utility text-xs tracking-[0.18em] text-aberdeen-blue/70 uppercase">
            {group.note}
          </p>
        ) : null}
      </div>
      <ul className="space-y-5">
        {group.items.map((item) => (
          <li className="flex items-center gap-4" key={item.name}>
            <div className="grid min-w-0 grow grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <div className="min-w-0">
                <p className="font-display text-xl leading-none text-aberdeen-blue">{item.name}</p>
                <p className="mt-2 leading-7 text-kelp-ink/80">{item.description}</p>
              </div>
              <span className="font-utility text-sm leading-none tracking-[0.12em] text-aberdeen-blue uppercase">
                {item.price}
              </span>
            </div>
            <MenuLikeButton itemName={item.name} />
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export function MenuImageSection({
  alt,
  background = "oyster",
  caption,
  group,
  image,
  imagePosition,
  map,
}: {
  alt: string
  background?: "oyster" | "peach"
  caption?: string
  group: StandardMenuGroup
  image: string
  imagePosition: "left" | "right"
  map: string
}) {
  const imagePanel = (
    <motion.div
      className={`${imagePosition === "left" ? "md:order-1" : "md:order-2"} self-start md:sticky md:top-24`}
      {...fadeIn(0.08)}
    >
      <div className="relative aspect-[4/5]">
        <img alt={alt} className="h-full w-full object-cover" src={image} />
        <PostcardImageStack />
        <PhotoCorners />
      </div>
      {caption ? (
        <p className="mt-4 max-w-sm font-utility text-xs tracking-[0.18em] text-aberdeen-blue/70 uppercase">
          {caption}
        </p>
      ) : null}
    </motion.div>
  )

  return (
    <section
      className={`relative isolate overflow-hidden px-5 py-16 md:px-8 md:py-24 ${
        background === "peach" ? "bg-aberdeen-peach" : "bg-oyster-white"
      }`}
    >
      <DecorativeBackdrop imageClassName="object-cover" opacity={0.14} src={map} />
      <div className="relative z-10 grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        {imagePanel}
        <div className={imagePosition === "left" ? "md:order-2" : "md:order-1"}>
          <MenuList group={group} />
        </div>
      </div>
    </section>
  )
}

export function MenuPairSection({
  background = "oyster",
  first,
  footnote,
  map,
  second,
}: {
  background?: "oyster" | "peach"
  first: StandardMenuGroup
  footnote?: string
  map: string
  second: StandardMenuGroup
}) {
  return (
    <section
      className={`relative isolate overflow-hidden px-5 py-16 md:px-8 md:py-24 ${
        background === "peach" ? "bg-aberdeen-peach" : "bg-oyster-white"
      }`}
    >
      <DecorativeBackdrop imageClassName="object-cover" opacity={0.12} src={map} />
      <div className="relative z-10 grid gap-12 md:grid-cols-2 md:gap-16">
        <MenuList group={first} />
        <MenuList delay={0.08} group={second} />
      </div>
      {footnote ? (
        <motion.p
          className="relative z-10 mt-12 max-w-3xl leading-8 text-kelp-ink/80"
          {...fadeIn(0.12)}
        >
          {footnote}
        </motion.p>
      ) : null}
    </section>
  )
}

export function MenuReservation({
  copy,
  label,
  number,
  title,
}: {
  copy: string
  label: string
  number: string
  title: string
}) {
  return (
    <RippleSection className="relative isolate overflow-hidden bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:px-8 md:py-24">
      <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_0.9fr]">
        <motion.div {...fadeIn()}>
          <p className="font-utility text-sm tracking-[0.22em] uppercase">Reservations</p>
          <h2 className="mt-5 max-w-3xl font-display text-5xl leading-none md:text-7xl">
            {title}
          </h2>
          <img
            alt=""
            aria-hidden="true"
            className="mt-8 h-auto w-full max-w-md object-contain opacity-75"
            src="/illustrations/nautical/schooner.png"
          />
        </motion.div>
        <motion.div className="self-end bg-oyster-white p-6 text-aberdeen-blue" {...fadeIn(0.12)}>
          <RopeDivider className="mb-6 rounded-none" />
          <div className="mb-8 grid grid-cols-[auto_1fr] gap-5 border-b border-dotted border-aberdeen-blue/35 pb-5">
            <div className="grid h-20 w-20 place-items-center bg-citrus font-display text-5xl leading-none">
              {number}
            </div>
            <div>
              <p className="font-utility text-xs tracking-[0.18em] uppercase">Harbor check</p>
              <p className="mt-2 font-playful text-4xl leading-none">{label}</p>
            </div>
          </div>
          <p className="mb-6 text-lg leading-8">{copy}</p>
          <Link className="aberdeen-action bg-aberdeen-blue text-aberdeen-peach" to="/contact">
            Plan a visit
          </Link>
        </motion.div>
      </div>
    </RippleSection>
  )
}
