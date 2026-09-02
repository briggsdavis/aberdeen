import { motion } from "motion/react"
import { Link } from "react-router"
import type { MenuGroup, PostcardContent } from "../lib/menu"
import { fadeIn } from "../lib/motion"
import { standardActionTone } from "../lib/standard-action"
import { ImageTilt } from "./image-tilt"
import { TransitionLink } from "./page-transition"
import { PostcardStack } from "./postcard-stack"
import { MenuLikeButton } from "./site-extras"

const tabs = [
  { label: "Food", to: "/menu/food" },
  { label: "Spirits", to: "/menu/spirits" },
  { label: "Beverages", to: "/menu/beverages" },
]

export function MenuPageHero({
  activePath,
  description,
  image,
  menuPages,
  title,
}: {
  activePath: string
  description: string
  image: string | null
  menuPages?: Array<{ slug: string; title: string }>
  title: string
}) {
  const visibleTabs =
    menuPages?.map((menuPage) => ({
      label: menuPage.title,
      to: `/menu/${menuPage.slug}`,
    })) ?? tabs

  return (
    <section className="relative isolate overflow-hidden bg-aberdeen-blue text-aberdeen-peach">
      {image ? (
        <img
          alt={`${title} menu hero`}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          src={image}
        />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-aberdeen-blue/65" />
      <motion.div
        className="grid min-h-[34rem] content-end justify-items-center gap-7 px-5 pt-32 pb-14 text-center md:min-h-[44rem] md:px-8 md:pt-40 md:pb-20"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Menus</p>
        <h1 className="font-display text-6xl leading-none md:text-8xl">{title}</h1>
        <p className="max-w-2xl text-lg leading-8 text-oyster-white/90">{description}</p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-utility text-sm tracking-[0.18em] uppercase">
          {visibleTabs.map((tab) => (
            <TransitionLink
              className={
                tab.to === activePath
                  ? "menu-tab-underline is-active"
                  : "menu-tab-underline opacity-70 hover:opacity-100"
              }
              key={tab.label}
              to={tab.to}
            >
              {tab.label}
            </TransitionLink>
          ))}
        </nav>
      </motion.div>
    </section>
  )
}

function MenuList({
  delay = 0,
  group,
  inverted = false,
}: {
  delay?: number
  group: MenuGroup
  inverted?: boolean
}) {
  return (
    <motion.div {...fadeIn(delay)}>
      <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-aberdeen-blue/20 pb-3">
        <h2
          className={`font-display text-5xl leading-none md:text-6xl ${
            inverted ? "text-aberdeen-peach" : "text-aberdeen-blue"
          }`}
        >
          {group.title}
        </h2>
        {group.note ? (
          <p
            className={`font-utility text-base tracking-[0.18em] uppercase ${
              inverted ? "text-aberdeen-peach/70" : "text-aberdeen-blue/70"
            }`}
          >
            {group.note}
          </p>
        ) : null}
      </div>
      <ul className="space-y-5">
        {group.items.map((item) => (
          <li className="menu-item-row flex items-center gap-4" key={item.name}>
            <div className="grid min-w-0 grow grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <div className="min-w-0">
                <p
                  className={`font-display text-3xl leading-none ${
                    inverted ? "text-aberdeen-peach" : "text-aberdeen-blue"
                  }`}
                >
                  {item.name}
                </p>
                <p
                  className={`mt-2 text-xl leading-7 ${
                    inverted ? "text-oyster-white/75" : "text-kelp-ink/80"
                  }`}
                >
                  {item.description}
                </p>
              </div>
              <span
                className={`font-utility text-lg leading-none tracking-[0.12em] uppercase ${
                  inverted ? "text-aberdeen-peach" : "text-aberdeen-blue"
                }`}
              >
                {item.price}
              </span>
            </div>
            <MenuLikeButton initialCount={item.likes} itemId={item._id} itemName={item.name} />
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export function MenuImageSection({
  alt,
  background = "oyster",
  group,
  image,
  imagePanelDescription,
  imagePosition,
  map,
  postcards,
}: {
  alt: string
  background?: "oyster" | "peach" | "blue"
  group: MenuGroup
  image: string
  imagePanelDescription: string
  imagePosition: "left" | "right"
  map: string
  postcards?: PostcardContent[]
}) {
  const imagePanel = (
    <motion.div
      className={`${imagePosition === "left" ? "md:order-1" : "md:order-2"} self-start md:sticky md:top-24`}
      {...fadeIn(0.08)}
    >
      <ImageTilt>
        <div className="relative aspect-[4/5]">
          <img alt={alt} className="h-full w-full object-cover" src={image} />
          {postcards?.length ? <PostcardStack postcards={postcards} /> : null}
        </div>
        <div className="bg-aberdeen-peach p-5 text-aberdeen-blue">
          <h3 className="font-display text-7xl">{group.title}</h3>
          <p className="mt-3 max-w-sm text-xl leading-7 text-kelp-ink">{imagePanelDescription}</p>
        </div>
      </ImageTilt>
    </motion.div>
  )

  return (
    <section
      className={`relative isolate overflow-hidden px-5 py-16 md:px-8 md:py-24 ${
        background === "peach"
          ? "bg-aberdeen-peach"
          : background === "blue"
            ? "bg-aberdeen-blue"
            : "bg-oyster-white"
      }`}
    >
      {map ? (
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-[0.12]"
          src={map}
        />
      ) : null}
      <div className="relative z-10 grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        {imagePanel}
        <div
          className={`${imagePosition === "left" ? "md:order-2" : "md:order-1"} md:grid md:content-center`}
        >
          <MenuList group={group} inverted={background === "blue"} />
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
  background?: "oyster" | "peach" | "blue"
  first: MenuGroup
  footnote?: string
  map: string
  second: MenuGroup
}) {
  return (
    <section
      className={`relative isolate overflow-hidden px-5 py-16 md:px-8 md:py-24 ${
        background === "peach"
          ? "bg-aberdeen-peach"
          : background === "blue"
            ? "bg-aberdeen-blue"
            : "bg-oyster-white"
      }`}
    >
      {map ? (
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-[0.1]"
          src={map}
        />
      ) : null}
      <div className="relative z-10 grid gap-12 md:grid-cols-2 md:gap-16">
        <MenuList group={first} inverted={background === "blue"} />
        <MenuList delay={0.08} group={second} inverted={background === "blue"} />
      </div>
      {footnote ? (
        <motion.p
          className="relative z-10 mt-12 max-w-3xl text-xl leading-8 text-kelp-ink/80"
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
    <section className="relative isolate overflow-hidden bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:px-8 md:py-24">
      <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_0.9fr]">
        <motion.div {...fadeIn()}>
          <h2 className="max-w-3xl font-display text-5xl leading-none md:text-7xl">{title}</h2>
          <img
            alt=""
            aria-hidden="true"
            className="mt-8 h-auto w-full max-w-md object-contain opacity-75"
            src="/illustrations/nautical/schooner.png"
          />
        </motion.div>
        <motion.div className="self-end bg-oyster-white p-6 text-aberdeen-blue" {...fadeIn(0.12)}>
          <div className="mb-8 grid grid-cols-[auto_1fr] gap-5 border-b border-dotted border-aberdeen-blue/35 pb-5">
            <div className="grid h-20 w-20 place-items-center bg-citrus font-display text-5xl leading-none">
              {number}
            </div>
            <div>
              <p className="font-playful text-4xl leading-none">{label}</p>
            </div>
          </div>
          <p className="mb-6 text-lg leading-8">{copy}</p>
          <Link
            className="aberdeen-action standard-action"
            data-standard-action-tone={standardActionTone(0)}
            to="/contact"
          >
            Plan a visit
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
