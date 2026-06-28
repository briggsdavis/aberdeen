import type { ReactNode } from "react"
import { Link } from "react-router"
import { Reveal, RevealImage, Rise } from "./motion"

export type MenuItem = {
  name: string
  description: string
  price: string
  image: string
}

export type MenuGroup = {
  title: string
  note?: string
  items: MenuItem[]
}

/** Raw group as authored in the page files, before images are attached. */
export type RawGroup = {
  title: string
  note?: string
  items: { name: string; description: string; price: string }[]
}

/**
 * Give every menu item its own image by zipping a themed pool across all
 * items in order, so neighbouring cards differ even when the pool repeats.
 * Images are temporary Unsplash scaffolding per DESIGN.md.
 */
export function attachImages(groups: RawGroup[], pool: string[]): MenuGroup[] {
  let cursor = 0
  return groups.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      const image = pool[cursor % pool.length]
      cursor += 1
      return { ...item, image }
    }),
  }))
}

type Tone = "light" | "peach" | "blue"

const toneBand: Record<Tone, string> = {
  light: "bg-oyster-white",
  peach: "bg-aberdeen-peach",
  blue: "bg-aberdeen-blue",
}

const toneTitle: Record<Tone, string> = {
  light: "text-aberdeen-blue",
  peach: "text-aberdeen-blue",
  blue: "text-aberdeen-peach",
}

const toneNote: Record<Tone, string> = {
  light: "text-aberdeen-blue/70",
  peach: "text-aberdeen-blue/70",
  blue: "text-aberdeen-peach/70",
}

export function MenuCardSection({ group, tone }: { group: MenuGroup; tone: Tone }) {
  return (
    <section className={`px-5 py-14 md:px-8 md:py-20 ${toneBand[tone]}`}>
      <div
        className={`mb-8 flex items-baseline justify-between gap-4 border-b pb-3 md:mb-10 ${
          tone === "blue" ? "border-aberdeen-peach/25" : "border-aberdeen-blue/20"
        }`}
      >
        <Rise
          as="h2"
          className={`font-display text-4xl leading-none md:text-6xl ${toneTitle[tone]}`}
        >
          {group.title}
        </Rise>
        {group.note ? (
          <Reveal
            as="p"
            className={`font-utility text-xs tracking-[0.18em] uppercase ${toneNote[tone]}`}
          >
            {group.note}
          </Reveal>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((item, index) => (
          <article className="group overflow-hidden bg-oyster-white text-kelp-ink" key={item.name}>
            <div className="aspect-[4/3] overflow-hidden">
              <div className="h-full w-full transition duration-700 group-hover:scale-105">
                <RevealImage
                  alt={item.name}
                  className="h-full w-full object-cover"
                  delay={Math.min(index, 5) * 60}
                  src={item.image}
                />
              </div>
            </div>
            <Reveal className="flex flex-col gap-2 p-4" delay={Math.min(index, 5) * 60 + 80}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl text-aberdeen-blue">{item.name}</h3>
                <span className="shrink-0 font-utility text-sm tracking-[0.12em] text-aberdeen-blue uppercase">
                  {item.price}
                </span>
              </div>
              <p className="text-sm leading-6 text-kelp-ink/80">{item.description}</p>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  )
}

type MenuKey = "food" | "spirits" | "beverages"

export function MenuTabs({ active }: { active: MenuKey }) {
  const tabs: { label: string; to: string; key: MenuKey }[] = [
    { label: "Food", to: "/menu/food", key: "food" },
    { label: "Spirits", to: "/menu/spirits", key: "spirits" },
    { label: "Beverages", to: "/menu/beverages", key: "beverages" },
  ]

  return (
    <Reveal
      as="nav"
      className="flex flex-wrap gap-x-6 gap-y-2 font-utility text-sm tracking-[0.18em] uppercase"
    >
      {tabs.map((tab) => (
        <Link
          className={
            tab.key === active
              ? "underline decoration-citrus decoration-2 underline-offset-8"
              : "opacity-70 transition hover:opacity-100"
          }
          key={tab.key}
          to={tab.to}
        >
          {tab.label}
        </Link>
      ))}
    </Reveal>
  )
}

export function MenuHero({
  title,
  intro,
  image,
  imageAlt,
  active,
}: {
  title: string
  intro: string
  image: string
  imageAlt: string
  active: MenuKey
}) {
  return (
    <section className="relative bg-aberdeen-blue text-aberdeen-peach">
      <RevealImage
        alt={imageAlt}
        className="absolute inset-y-0 right-0 h-full w-full object-cover mix-blend-luminosity md:w-[52%]"
        finalOpacity={0.4}
        src={image}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,rgba(42,59,146,0.92)_44%,rgba(42,59,146,0)_100%)]" />
      <div className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <Reveal as="p" className="font-utility text-sm tracking-[0.22em] uppercase">
          Menus
        </Reveal>
        <div className="max-w-5xl">
          <Rise as="h1" className="font-display text-6xl leading-none md:text-8xl">
            {title}
          </Rise>
          <Reveal as="p" className="mt-8 max-w-2xl text-lg leading-8" delay={120}>
            {intro}
          </Reveal>
        </div>
        <MenuTabs active={active} />
      </div>
    </section>
  )
}

export function MenuClosingNote({ children }: { children: ReactNode }) {
  return (
    <section className="bg-oyster-white px-5 pb-16 md:px-8 md:pb-24">
      <Reveal as="p" className="max-w-3xl leading-8 text-kelp-ink/80">
        {children}
      </Reveal>
    </section>
  )
}

export function MenuReserve({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="grid gap-10 bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:grid-cols-[1fr_0.9fr] md:px-8 md:py-24">
      <div>
        <Reveal as="p" className="font-utility text-sm tracking-[0.22em] uppercase">
          Reservations
        </Reveal>
        <Rise as="h2" className="mt-5 max-w-3xl font-display text-5xl leading-none md:text-7xl">
          {heading}
        </Rise>
      </div>
      <div className="self-end border border-aberdeen-peach p-5">
        <Reveal as="p" className="mb-6 text-lg leading-8">
          {body}
        </Reveal>
        <Reveal delay={120}>
          <Link
            className="inline-block bg-aberdeen-peach px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-blue uppercase"
            to="/contact"
          >
            Plan a visit
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
