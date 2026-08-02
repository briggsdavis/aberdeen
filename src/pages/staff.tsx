import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { useRef } from "react"
import { useLocation } from "react-router"
import { ScrollRotatingWheel } from "../components/decorative-media"
import { MaritimeFlags } from "../components/nautical-details"
import { HeroCarouselButtons, useHeroCarousel } from "../components/site-extras"
import { useCmsRuntime } from "../lib/cms-runtime"
import { fadeIn } from "../lib/motion"

const staff = [
  {
    name: "Marin Vale",
    role: "Executive Chef",
    note: "Builds the menu around shellfish, citrus, smoke, and the day's best catch.",
    image:
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Elliot Crane",
    role: "Chef de Cuisine",
    note: "Keeps the line precise, fast, and generous.",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Simone Hart",
    role: "Beverage Director",
    note: "Writes the drinks list in blue, citrus, salt, and sparkle.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Theo Banks",
    role: "General Manager",
    note: "Makes the room feel easy before the first glass lands.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "June Mercer",
    role: "Events Lead",
    note: "Shapes private dinners, seasonal nights, and celebrations around the table.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Nico Reyes",
    role: "Raw Bar Lead",
    note: "Keeps the ice cold, the oysters clean, and the counter moving.",
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=900&q=85",
  },
]

function StaffPage() {
  const location = useLocation()
  const previewScope = new URLSearchParams(location.search).get("cmsScope")
  const introductionOnly = previewScope === "staff-introduction"

  return (
    <div className="page-shell">
      <HeroSection />
      <RosterSection introductionOnly={introductionOnly} />
      {introductionOnly ? null : <HiringSection />}
    </div>
  )
}

function HeroSection() {
  const { page } = useCmsRuntime()
  const managedHero = page.media.hero?.url ?? page.images.hero
  const defaultHeroImages = [
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1800&q=85",
  ]
  const { image, next, previous } = useHeroCarousel(
    managedHero ? [managedHero, ...defaultHeroImages.slice(1)] : defaultHeroImages,
  )

  return (
    <section className="relative min-h-[42rem] overflow-hidden bg-oyster-white text-aberdeen-blue md:min-h-[68svh]">
      <img
        alt="Restaurant team preparing a dining room"
        className="absolute inset-0 h-full w-full object-cover"
        data-cms-slot="hero"
        src={image}
      />
      <div className="events-hero-cream-gradient absolute inset-0 z-[1]" />
      <motion.div
        className="relative z-10 flex min-h-[42rem] flex-col items-stretch justify-end gap-8 px-5 pt-32 pb-8 md:min-h-[68svh] md:flex-row md:items-end md:justify-between md:px-8 md:pt-40 md:pb-10"
        {...fadeIn()}
      >
        <div className="max-w-5xl">
          <p className="font-utility text-sm tracking-[0.22em] uppercase" data-cms-no-edit>
            Staff
          </p>
          <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">
            The people who keep the room glowing.
          </h1>
        </div>
        <motion.div
          className="relative z-20 flex shrink-0 flex-col items-end gap-4 self-end"
          {...fadeIn(0.18)}
        >
          <MaritimeFlags />
          <HeroCarouselButtons onNext={next} onPrevious={previous} />
        </motion.div>
      </motion.div>
    </section>
  )
}

function RosterSection({ introductionOnly = false }: { introductionOnly?: boolean }) {
  const { staff: managedStaff } = useCmsRuntime()
  const visibleStaff = managedStaff?.length
    ? managedStaff.map((person) => ({
        name: person.name,
        role: person.role,
        note: person.biography,
        image: person.image,
      }))
    : staff

  return (
    <section className="relative bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <div
        className={`relative grid gap-12 ${
          introductionOnly ? "mx-auto max-w-4xl" : "md:grid-cols-[0.75fr_1.25fr]"
        }`}
      >
        <div
          className={`self-start ${introductionOnly ? "" : "md:sticky md:top-28"}`}
          data-testid="staff-intro"
        >
          <motion.div {...fadeIn()}>
            <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
              Aberdeen staff
            </p>
            <h2 className="mt-5 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
              Careful hands, clear timing, warm rooms.
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-8 text-kelp-ink/80">
              The team is built around craft and ease: people who know when to guide, when to
              vanish, and when to make the night feel a little brighter.
            </p>
          </motion.div>
          <div data-cms-no-edit>
            <ScrollRotatingWheel compact />
          </div>
        </div>
        {introductionOnly ? null : (
          <div className="grid gap-16" data-cms-no-edit>
            {visibleStaff.map((person, index) => (
              <StaffCard index={index} key={person.name} person={person} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function StaffCard({
  index,
  person,
}: {
  index: number
  person: { name: string; role: string; note: string; image: string }
}) {
  const cardRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.08, 0.9])
  const scale = useSpring(rawScale, { damping: 26, stiffness: 110, mass: 0.9 })

  return (
    <motion.article
      className="grid min-h-[80svh] items-center shadow-none"
      ref={cardRef}
      style={{ scale: shouldReduceMotion ? 1 : scale }}
      {...fadeIn(index * 0.04)}
    >
      <div className="relative mx-auto w-full max-w-md bg-aberdeen-peach p-4 text-aberdeen-blue shadow-[0_24px_65px_rgb(29_42_47/0.18)]">
        <div className="relative aspect-[4/5] overflow-hidden shadow-[0_18px_38px_rgb(29_42_47/0.24)]">
          <img
            alt={person.name}
            className="no-under-shadow h-full w-full object-cover"
            src={person.image}
          />
        </div>
        <div className="p-5">
          <p className="font-utility text-xs tracking-[0.18em] uppercase">{person.role}</p>
          <h2 className="mt-3 font-display text-5xl leading-none">{person.name}</h2>
          <p className="mt-4 leading-7 text-kelp-ink/80">{person.note}</p>
        </div>
      </div>
    </motion.article>
  )
}

function HiringSection() {
  return (
    <section className="grid gap-10 bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:grid-cols-[1fr_0.9fr] md:px-8 md:py-24">
      <motion.div {...fadeIn()}>
        <h2 className="max-w-3xl font-playful text-5xl leading-none md:text-7xl">
          Hospitality is the house style.
        </h2>
        <img
          alt=""
          aria-hidden="true"
          className="white-compass mt-8 h-auto w-full max-w-48 object-contain opacity-70"
          src="/illustrations/nautical/compass-rose-detailed.png"
        />
      </motion.div>
      <motion.p className="self-end text-lg leading-8" {...fadeIn(0.12)}>
        The Aberdeen team is built around warmth, precision, and the good timing that makes a busy
        room feel effortless.
      </motion.p>
    </section>
  )
}

export default StaffPage
