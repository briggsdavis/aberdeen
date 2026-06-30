import { motion } from "motion/react"
import { fadeIn, fadeInPlace } from "../lib/motion"

const events = [
  {
    day: "06",
    title: "Oyster Hour",
    time: "5 PM",
    copy: "A raw bar evening with both coasts on ice, bright mignonettes, and cold martinis.",
  },
  {
    day: "12",
    title: "Blue Spritz Night",
    time: "6 PM",
    copy: "A playful bar feature built around bubbles, citrus, and Aberdeen blue.",
  },
  {
    day: "18",
    title: "Coastal Supper",
    time: "7 PM",
    copy: "A family-style dinner of whole fish, shellfish, summer vegetables, and shared sides.",
  },
  {
    day: "27",
    title: "Late Light Dinner",
    time: "8 PM",
    copy: "A slower evening menu for two, built around wine, seafood, and dessert at the bar.",
  },
]

function EventsPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <CalendarSection />
      <PrivateEventsSection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt="People gathered around a restaurant table with drinks"
        className="absolute inset-y-0 right-0 h-full w-full object-cover md:w-[52%]"
        src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,#2A3B92_48%,rgba(42,59,146,0.86)_56%,rgba(42,59,146,0.38)_70%,rgba(42,59,146,0)_90%)]" />
      <motion.div
        className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Events</p>
        <h1 className="max-w-5xl font-display text-6xl leading-none md:text-8xl">
          Seasonal nights worth circling.
        </h1>
      </motion.div>
    </section>
  )
}

function CalendarSection() {
  const emptyDays = Array.from({ length: 3 }, (_, index) => index)
  const trailingDays = Array.from({ length: 21 }, (_, index) => index)

  return (
    <section className="bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <motion.div className="mb-10 flex flex-wrap items-end justify-between gap-6" {...fadeIn()}>
        <div>
          <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
            June
          </p>
          <h2 className="mt-4 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
            Aberdeen calendar
          </h2>
        </div>
        <p className="max-w-md leading-7 text-kelp-ink/80">
          Event details open inline in this calendar-style view. Future CMS entries will replace
          this starter schedule.
        </p>
      </motion.div>
      <div className="grid grid-cols-7 border-t border-l border-aberdeen-blue/25">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            className="border-r border-b border-aberdeen-blue/25 p-3 font-utility text-xs tracking-[0.14em] text-aberdeen-blue uppercase"
            key={day}
          >
            {day}
          </div>
        ))}
        {emptyDays.map((day) => (
          <div
            className="min-h-24 border-r border-b border-aberdeen-blue/25 bg-aberdeen-peach/40"
            key={day}
          />
        ))}
        {events.map((event, index) => (
          <motion.article
            className="min-h-48 border-r border-b border-aberdeen-blue/25 bg-aberdeen-peach p-3 text-aberdeen-blue md:p-5"
            key={event.title}
            {...fadeInPlace(index * 0.06)}
          >
            <p className="font-utility text-xs tracking-[0.16em] uppercase">{event.day}</p>
            <h3 className="mt-8 font-display text-3xl leading-none">{event.title}</h3>
            <p className="mt-2 font-utility text-xs tracking-[0.14em] uppercase">{event.time}</p>
            <p className="mt-4 text-sm leading-6 text-kelp-ink/80">{event.copy}</p>
          </motion.article>
        ))}
        {trailingDays.map((day) => (
          <div
            className="min-h-24 border-r border-b border-aberdeen-blue/25 bg-white/35"
            key={day}
          />
        ))}
      </div>
    </section>
  )
}

function PrivateEventsSection() {
  return (
    <section className="grid gap-10 bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:grid-cols-[1fr_0.9fr] md:px-8 md:py-24">
      <motion.div {...fadeIn()}>
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Private events</p>
        <h2 className="mt-5 max-w-3xl font-playful text-5xl leading-none md:text-7xl">
          Gatherings with seafood, spirits, and a room already dressed for it.
        </h2>
      </motion.div>
      <motion.div className="self-end border border-aberdeen-peach p-5" {...fadeIn(0.12)}>
        <p className="mb-6 text-lg leading-8">
          For birthdays, group dinners, brand nights, and seasonal parties, Aberdeen can shape the
          table around the moment.
        </p>
        <a
          className="inline-block bg-aberdeen-peach px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-blue uppercase"
          href="/contact"
        >
          Start planning
        </a>
      </motion.div>
    </section>
  )
}

export default EventsPage
