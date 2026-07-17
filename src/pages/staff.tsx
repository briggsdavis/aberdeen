import { motion } from "motion/react"
import { PhotoCorners } from "../components/nautical-details"
import { TiltWrap } from "../components/site-extras"
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
  return (
    <div className="overflow-x-clip">
      <HeroSection />
      <RosterSection />
      <HiringSection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt="Restaurant team preparing a dining room"
        className="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="hero-radial-glow absolute inset-0 z-[1]" />
      <motion.div
        className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Staff</p>
        <h1 className="max-w-5xl font-display text-6xl leading-none md:text-8xl">
          The people who keep the room glowing.
        </h1>
      </motion.div>
    </section>
  )
}

function RosterSection() {
  return (
    <section className="relative bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <div className="relative grid gap-12 md:grid-cols-[0.75fr_1.25fr]">
        <div
          className="self-start md:sticky md:top-28"
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
              The team is built around craft and ease: people who know when to guide, when to vanish,
              and when to make the night feel a little brighter.
            </p>
          </motion.div>
        </div>
        <div className="grid gap-16">
          {staff.map((person, index) => (
            <motion.article
              className="grid min-h-[80svh] items-center"
              key={person.name}
              {...fadeIn(index * 0.04)}
            >
              <TiltWrap className="relative mx-auto w-full max-w-xl rotate-1 bg-aberdeen-peach p-4 text-aberdeen-blue shadow-[12px_12px_0_rgb(42_59_146/0.14)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img alt={person.name} className="h-full w-full object-cover" src={person.image} />
                  <PhotoCorners />
                </div>
                <div className="p-5">
                  <p className="font-utility text-xs tracking-[0.18em] uppercase">{person.role}</p>
                  <h2 className="mt-3 font-display text-5xl leading-none">{person.name}</h2>
                  <p className="mt-4 leading-7 text-kelp-ink/80">{person.note}</p>
                </div>
              </TiltWrap>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HiringSection() {
  return (
    <section className="grid gap-10 bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:grid-cols-[1fr_0.9fr] md:px-8 md:py-24">
      <motion.h2 className="max-w-3xl font-playful text-5xl leading-none md:text-7xl" {...fadeIn()}>
        Hospitality is the house style.
      </motion.h2>
      <motion.p className="self-end text-lg leading-8" {...fadeIn(0.12)}>
        The Aberdeen team is built around warmth, precision, and the good timing that makes a busy
        room feel effortless.
      </motion.p>
    </section>
  )
}

export default StaffPage
