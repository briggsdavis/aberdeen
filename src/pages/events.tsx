import { motion } from "motion/react"
import { useState } from "react"
import { DecorativeBackdrop } from "../components/decorative-media"
import { MaritimeFlags, RopeDivider } from "../components/nautical-details"
import { HeroCarouselButtons, RippleSection, useHeroCarousel } from "../components/site-extras"
import { useCmsRuntime } from "../lib/cms-runtime"
import { fadeIn, fadeInPlace } from "../lib/motion"

const antiqueMapFive = "/maps/antique-map-05.png"
const sailboat = "/illustrations/nautical/sailboat.png"

type DisplayEvent = {
  day: string
  weekday: string
  month: string
  year: number
  title: string
  time: string
  copy: string
  image: string
  bookingUrl: string
  startsAt: number
}

const defaultEvents: DisplayEvent[] = [
  {
    day: "06",
    weekday: "Friday",
    month: "June",
    title: "Oyster Hour",
    time: "5 PM",
    copy: "A raw bar evening with both coasts on ice, bright mignonettes, and cold martinis.",
    image:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=900&q=85",
    year: 2027,
    bookingUrl: "",
    startsAt: Date.parse("2027-06-06T17:00:00-04:00"),
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
    year: 2027,
    bookingUrl: "",
    startsAt: Date.parse("2027-06-12T18:00:00-04:00"),
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
    year: 2027,
    bookingUrl: "",
    startsAt: Date.parse("2027-06-18T19:00:00-04:00"),
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
    year: 2027,
    bookingUrl: "",
    startsAt: Date.parse("2027-06-27T20:00:00-04:00"),
  },
]

const calendarWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

type EventsView = "list" | "calendar"

function EventsPage() {
  const { events: managedEvents } = useCmsRuntime()
  const events = managedEvents?.length
    ? managedEvents.map((event) => {
        const date = new Date(event.startsAt)
        return {
          day: String(date.getDate()).padStart(2, "0"),
          weekday: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date),
          month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(date),
          year: date.getFullYear(),
          title: event.title,
          time: new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: date.getMinutes() ? "2-digit" : undefined,
          }).format(date),
          copy: event.description,
          image: event.image,
          bookingUrl: event.bookingUrl,
          startsAt: event.startsAt,
        }
      })
    : defaultEvents

  return (
    <div className="page-shell">
      <HeroSection />
      <ScheduleSection events={events} />
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

function ScheduleSection({ events }: { events: DisplayEvent[] }) {
  const [view, setView] = useState<EventsView>("list")
  const firstEvent = events[0]
  const bookingUrl = events.find((event) => event.bookingUrl)?.bookingUrl

  return (
    <section className="relative isolate overflow-hidden bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <DecorativeBackdrop imageClassName="object-cover" opacity={0.16} src={antiqueMapFive} />
      <motion.div
        className="relative z-10 mb-10 flex flex-wrap items-end justify-between gap-6"
        {...fadeIn()}
      >
        <div>
          <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
            {firstEvent ? `${firstEvent.month} ${firstEvent.year}` : "Upcoming"}
          </p>
          <h2 className="mt-4 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
            Aberdeen calendar
          </h2>
          <RopeDivider className="mt-5 w-64" />
        </div>
        <div className="flex flex-wrap items-stretch gap-3">
          <ViewToggle onChange={setView} view={view} />
          {bookingUrl ? (
            <a
              className="aberdeen-action rounded-full bg-aberdeen-blue text-aberdeen-peach"
              href={bookingUrl}
              rel="noreferrer"
              target="_blank"
            >
              Book now
            </a>
          ) : null}
        </div>
      </motion.div>
      <div className="relative z-10">
        {view === "list" ? <UpcomingList events={events} /> : <CalendarGrid events={events} />}
      </div>
    </section>
  )
}

function UpcomingList({ events }: { events: DisplayEvent[] }) {
  return (
    <motion.div className="grid gap-6" {...fadeInPlace()}>
      {events.map((event, index) => (
        <motion.article
          className="event-row grid overflow-hidden rounded-2xl bg-aberdeen-peach md:grid-cols-[minmax(0,340px)_1fr]"
          key={event.title}
          {...fadeInPlace(index * 0.06)}
        >
          <div className="event-row-image-frame aspect-[4/3] w-full overflow-hidden md:self-start">
            <img
              alt={event.title}
              className="event-row-image h-full object-cover"
              src={event.image}
            />
          </div>
          <div className="event-row-copy p-6 md:p-10">
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
  const { page } = useCmsRuntime()
  const managedHero = page.media.hero?.url ?? page.images.hero
  const defaultHeroImages = [
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1800&q=85",
  ]
  const { image, next, previous } = useHeroCarousel(
    managedHero ? [managedHero, ...defaultHeroImages.slice(1)] : defaultHeroImages,
  )

  return (
    <section className="relative bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt="People gathered around a restaurant table with drinks"
        className="absolute inset-0 h-full w-full object-cover"
        data-cms-slot="hero"
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

function CalendarGrid({ events }: { events: DisplayEvent[] }) {
  const firstEvent = events[0]
  const calendarDate = firstEvent ? new Date(firstEvent.startsAt) : new Date()
  const month = calendarDate.getMonth()
  const year = calendarDate.getFullYear()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const calendarDays = Array.from({ length: daysInMonth }, (_, index) => index + 1)
  const calendarStartOffset = new Date(year, month, 1).getDay()
  const leadingCalendarDays = Array.from({ length: calendarStartOffset }, (_, index) => index)
  const trailingCalendarDays = Array.from(
    { length: (7 - ((calendarStartOffset + calendarDays.length) % 7)) % 7 },
    (_, index) => index,
  )
  const eventsByDay = new Map(
    events
      .filter((event) => {
        const date = new Date(event.startsAt)
        return date.getMonth() === month && date.getFullYear() === year
      })
      .map((event, index) => [Number(event.day), { event, index }]),
  )

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
          <img
            alt=""
            aria-hidden="true"
            className="mt-8 h-auto w-full max-w-md object-contain opacity-75"
            src={sailboat}
          />
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
