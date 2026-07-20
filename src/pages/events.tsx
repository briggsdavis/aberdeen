import { motion } from "motion/react"
import { useState } from "react"
import { MaritimeFlags, RopeDivider } from "../components/nautical-details"
import { HeroCarouselButtons, RippleSection, useHeroCarousel } from "../components/site-extras"
import { fadeIn, fadeInPlace } from "../lib/motion"

const events = [
  {
    day: "06",
    weekday: "Friday",
    month: "June",
    title: "Oyster Hour",
    time: "5 PM",
    copy: "A raw bar evening with both coasts on ice, bright mignonettes, and cold martinis.",
    image:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=900&q=85",
  },
  {
    day: "12",
    weekday: "Thursday",
    month: "June",
    title: "Blue Spritz Night",
    time: "6 PM",
    copy: "A playful bar feature built around bubbles, citrus, and Aberdeen blue.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=85",
  },
  {
    day: "18",
    weekday: "Wednesday",
    month: "June",
    title: "Coastal Supper",
    time: "7 PM",
    copy: "A family-style dinner of whole fish, shellfish, summer vegetables, and shared sides.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85",
  },
  {
    day: "27",
    weekday: "Friday",
    month: "June",
    title: "Late Light Dinner",
    time: "8 PM",
    copy: "A slower evening menu for two, built around wine, seafood, and dessert at the bar.",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=85",
  },
]

const calendarWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const calendarWeekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1)
const firstEventDay = Number(events[0]?.day ?? 1)
const firstEventWeekdayIndex = events[0] ? calendarWeekdayNames.indexOf(events[0].weekday) : 0
const calendarStartOffset =
  firstEventWeekdayIndex >= 0 ? (firstEventWeekdayIndex - ((firstEventDay - 1) % 7) + 7) % 7 : 0
const leadingCalendarDays = Array.from({ length: calendarStartOffset }, (_, index) => index)
const trailingCalendarDays = Array.from(
  { length: (7 - ((calendarStartOffset + calendarDays.length) % 7)) % 7 },
  (_, index) => index,
)
const eventsByDay = new Map(events.map((event, index) => [Number(event.day), { event, index }]))

type EventsView = "list" | "calendar"

function EventsPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <ScheduleSection />
      <PrivateEventsSection />
    </div>
  )
}

function ViewToggle({
  view,
  onChange,
}: {
  view: EventsView
  onChange: (view: EventsView) => void
}) {
  const tabs: { id: EventsView; label: string }[] = [
    { id: "list", label: "Upcoming Events" },
    { id: "calendar", label: "Calendar" },
  ]

  return (
    <div className="inline-flex rounded-full border border-aberdeen-blue/25 bg-oyster-white p-1.5">
      {tabs.map((tab) => {
        const isActive = view === tab.id
        return (
          <button
            aria-pressed={isActive}
            className={`rounded-full px-6 py-2.5 font-utility text-sm tracking-[0.14em] uppercase transition ${
              isActive
                ? "bg-aberdeen-peach text-aberdeen-blue shadow-sm"
                : "text-aberdeen-blue/45 hover:text-aberdeen-blue"
            }`}
            key={tab.id}
            onClick={() => onChange(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

function ScheduleSection() {
  const [view, setView] = useState<EventsView>("list")

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
          <RopeDivider className="mt-5 w-64" />
        </div>
        <div className="flex flex-wrap items-stretch gap-3">
          <ViewToggle onChange={setView} view={view} />
          <a
            className="aberdeen-action rounded-full bg-aberdeen-blue text-aberdeen-peach"
            href="https://example.com"
            rel="noreferrer"
            target="_blank"
          >
            Book now
          </a>
        </div>
      </motion.div>
      {view === "list" ? <UpcomingList /> : <CalendarGrid />}
    </section>
  )
}

function UpcomingList() {
  return (
    <motion.div className="grid gap-6" {...fadeInPlace()}>
      {events.map((event, index) => (
        <motion.article
          className="grid overflow-hidden rounded-2xl bg-aberdeen-peach md:grid-cols-[minmax(0,340px)_1fr]"
          key={event.title}
          {...fadeInPlace(index * 0.06)}
        >
          <div className="aspect-[4/3] w-full overflow-hidden md:self-start">
            <img alt={event.title} className="h-full w-full object-cover" src={event.image} />
          </div>
          <div className="p-6 md:p-10">
            <p className="font-utility text-sm tracking-[0.18em] text-aberdeen-blue uppercase">
              {event.weekday}, {event.month} {event.day} · {event.time}
            </p>
            <h3 className="mt-4 font-display text-4xl leading-none text-kelp-ink md:text-5xl">
              {event.title}
            </h3>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-kelp-ink/80">{event.copy}</p>
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}

function HeroSection() {
  const { image, next, previous } = useHeroCarousel([
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1800&q=85",
  ])

  return (
    <section className="relative bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt="People gathered around a restaurant table with drinks"
        className="absolute inset-0 h-full w-full object-cover"
        src={image}
      />
      <div className="hero-radial-glow absolute inset-0 z-[1]" />
      <motion.div className="absolute right-5 bottom-8 z-10 md:right-8" {...fadeIn(0.18)}>
        <MaritimeFlags />
      </motion.div>
      <motion.div
        className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Events</p>
        <h1 className="max-w-5xl font-display text-6xl leading-none md:text-8xl">
          Seasonal nights worth circling.
        </h1>
        <HeroCarouselButtons onNext={next} onPrevious={previous} />
      </motion.div>
    </section>
  )
}

function CalendarGrid() {
  return (
    <motion.div {...fadeInPlace()}>
      <div className="grid grid-cols-7 border-t border-l border-aberdeen-blue/25">
        {calendarWeekdays.map((day) => (
          <div
            className="border-r border-b border-aberdeen-blue/25 p-3 font-utility text-xs tracking-[0.14em] text-aberdeen-blue uppercase"
            key={day}
          >
            {day}
          </div>
        ))}
        {leadingCalendarDays.map((day) => (
          <div
            className="min-h-24 border-r border-b border-aberdeen-blue/25 bg-aberdeen-peach/40"
            key={`leading-${day}`}
          />
        ))}
        {calendarDays.map((day) => {
          const scheduledEvent = eventsByDay.get(day)

          if (!scheduledEvent) {
            return (
              <div
                className="min-h-24 border-r border-b border-aberdeen-blue/25 bg-white/35 p-3 font-utility text-xs tracking-[0.14em] text-aberdeen-blue/45 uppercase md:min-h-48 md:p-5"
                key={`day-${day}`}
              >
                {day}
              </div>
            )
          }

          const { event, index } = scheduledEvent

          return (
            <motion.article
              className="relative min-h-48 border-r border-b border-aberdeen-blue/25 bg-aberdeen-peach p-3 text-aberdeen-blue md:p-5"
              key={`event-${event.day}`}
              {...fadeInPlace(index * 0.06)}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="grid h-12 w-12 place-items-center bg-citrus font-display text-3xl leading-none">
                  {event.day}
                </p>
                <p className="font-utility text-xs tracking-[0.14em] uppercase">{event.time}</p>
              </div>
              <h3 className="mt-8 font-display text-3xl leading-none">{event.title}</h3>
              <p className="mt-4 text-sm leading-6 text-kelp-ink/80">{event.copy}</p>
            </motion.article>
          )
        })}
        {trailingCalendarDays.map((day) => (
          <div
            className="min-h-24 border-r border-b border-aberdeen-blue/25 bg-white/35"
            key={`trailing-${day}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

function PrivateEventsSection() {
  return (
    <RippleSection className="bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:px-8 md:py-24">
      <div className="grid gap-10 md:grid-cols-[1fr_0.9fr]">
        <motion.div {...fadeIn()}>
          <p className="font-utility text-sm tracking-[0.22em] uppercase">Private events</p>
          <h2 className="mt-5 max-w-3xl font-playful text-5xl leading-none md:text-7xl">
            Gatherings with seafood, spirits, and a room already dressed for it.
          </h2>
        </motion.div>
        <FerryTicket />
      </div>
    </RippleSection>
  )
}

function FerryTicket() {
  return (
    <motion.div className="self-end bg-oyster-white text-aberdeen-blue" {...fadeIn(0.12)}>
      <div className="grid md:grid-cols-[1fr_auto]">
        <div className="p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-utility text-xs tracking-[0.18em] uppercase">Ferry ticket</p>
              <p className="mt-3 font-playful text-5xl leading-none">Private Passage</p>
            </div>
            <div className="grid h-16 w-16 place-items-center bg-citrus font-display text-4xl leading-none">
              27
            </div>
          </div>
          <RopeDivider className="mt-6 rounded-none" />
          <p className="mt-8 text-lg leading-8">
            For birthdays, group dinners, brand nights, and seasonal parties, Aberdeen can shape the
            table around the moment.
          </p>
          <a className="aberdeen-action mt-8 bg-aberdeen-blue text-aberdeen-peach" href="/contact">
            Start planning
          </a>
        </div>
        <div className="hidden border-l border-dotted border-aberdeen-blue/35 p-5 md:grid">
          <div className="flex flex-col items-center justify-between gap-8">
            <span className="font-utility text-xs tracking-[0.18em] uppercase [writing-mode:vertical-rl]">
              Savannah GA
            </span>
            <span className="h-24 w-px border-l border-dotted border-aberdeen-blue/35" />
            <span className="font-utility text-xs tracking-[0.18em] uppercase [writing-mode:vertical-rl]">
              Aberdeen
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EventsPage
