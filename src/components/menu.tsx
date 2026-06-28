import { Link } from "react-router"
import { RevealImage, Rise } from "./motion"

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
          <p className={`font-utility text-xs tracking-[0.18em] uppercase ${toneNote[tone]}`}>
            {group.note}
          </p>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((item) => (
          <article className="group overflow-hidden bg-oyster-white text-kelp-ink" key={item.name}>
            <div className="aspect-[4/3] overflow-hidden">
              <div className="h-full w-full transition duration-700 group-hover:scale-105">
                <RevealImage
                  alt={item.name}
                  className="h-full w-full object-cover"
                  src={item.image}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl text-aberdeen-blue">{item.name}</h3>
                <span className="shrink-0 font-utility text-sm tracking-[0.12em] text-aberdeen-blue uppercase">
                  {item.price}
                </span>
              </div>
              <p className="text-sm leading-6 text-kelp-ink/80">{item.description}</p>
            </div>
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
    <nav className="flex flex-wrap gap-x-6 gap-y-2 font-utility text-sm tracking-[0.18em] uppercase">
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
    </nav>
  )
}
