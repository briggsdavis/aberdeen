import { CaretLeft, CaretRight, X } from "@phosphor-icons/react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { FramedPhoto } from "../components/framed-photo"
import { fadeIn, fadeInPlace } from "../lib/motion"
import { usePageImage, usePublicEvents, useRequiredPageImage } from "../lib/public-data"
import { standardActionTone } from "../lib/standard-action"

const privateEventsImage =
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85"

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
  recurrence?: "daily" | "weekly" | "monthly"
}

const calendarWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

type EventsView = "list" | "calendar"

function EventsPage() {
  const publicEvents = usePublicEvents()
  const events = publicEvents.map((event) => {
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
      recurrence: event.recurrence,
    }
  })

  return (
    <div className="page-shell">
      <HeroSection />
      <ScheduleSection events={events} key={publicEvents[0]?._id ?? "events"} />
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
  const [calendarDate, setCalendarDate] = useState(() => getInitialCalendarDate(events))
  const firstEvent = events[0]
  const bookingUrl = events.find((event) => event.bookingUrl)?.bookingUrl
  const calendarMonth = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(calendarDate)

  return (
    <section className="relative isolate overflow-hidden bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <motion.div
        className="relative z-10 mb-10 flex flex-wrap items-end justify-between gap-6"
        {...fadeIn()}
      >
        <div>
          <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
            {view === "calendar"
              ? calendarMonth
              : firstEvent
                ? `${firstEvent.month} ${firstEvent.year}`
                : "Upcoming"}
          </p>
          <h2
            className="mt-4 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl"
            data-cms-text-key="events.calendar.title"
          >
            Aberdeen calendar
          </h2>
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
        {view === "list" ? (
          <UpcomingList events={events} />
        ) : (
          <CalendarGrid
            calendarDate={calendarDate}
            events={events}
            onCalendarDateChange={setCalendarDate}
          />
        )}
      </div>
    </section>
  )
}

function UpcomingList({ events }: { events: DisplayEvent[] }) {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)

  return (
    <motion.div className="grid gap-6" {...fadeInPlace()}>
      {events.map((event, index) => (
        <motion.article
          className={`event-row grid overflow-hidden rounded-2xl md:flex ${
            index % 2 === 1 ? "bg-aberdeen-blue" : "bg-aberdeen-peach"
          } ${
            hoveredEvent === index ? "is-event-hovered" : ""
          } ${index % 2 === 1 ? "event-row-reversed md:flex-row-reverse" : ""}`}
          key={event.title}
          onBlur={(blurEvent) => {
            if (!blurEvent.currentTarget.contains(blurEvent.relatedTarget)) setHoveredEvent(null)
          }}
          onFocus={() => setHoveredEvent(index)}
          onMouseEnter={() => setHoveredEvent(index)}
          onMouseLeave={() => setHoveredEvent(null)}
          tabIndex={0}
          {...fadeInPlace(index * 0.06)}
        >
          <div className="event-row-image-frame aspect-[4/3] w-full overflow-hidden md:self-start">
            <img
              alt={event.title}
              className="event-row-image h-full object-cover"
              src={event.image}
            />
          </div>
          <div className="event-row-copy min-w-0 flex-1 p-6 md:p-10">
            <p
              className={`font-utility text-sm tracking-[0.18em] uppercase ${
                index % 2 === 1 ? "text-aberdeen-peach" : "text-aberdeen-blue"
              }`}
            >
              {event.weekday}, {event.month} {event.day} · {event.time}
            </p>
            <h3
              className={`mt-4 font-display text-4xl leading-none md:text-5xl ${
                index % 2 === 1 ? "text-aberdeen-peach" : "text-aberdeen-blue"
              }`}
            >
              {event.title}
            </h3>
            <p
              className={`event-row-description mt-5 max-w-2xl text-lg leading-8 ${
                index % 2 === 1 ? "text-oyster-white/80" : "text-kelp-ink/80"
              }`}
            >
              {event.copy}
            </p>
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}

function HeroSection() {
  const image = useRequiredPageImage("hero")

  return (
    <section className="relative min-h-[42rem] overflow-hidden bg-oyster-white text-aberdeen-blue md:min-h-[68svh]">
      {image ? (
        <img
          alt="People gathered around a restaurant table with drinks"
          className="absolute inset-0 h-full w-full object-cover"
          data-cms-accepts-video
          data-cms-media-role="background"
          data-cms-slot="hero"
          src={image}
        />
      ) : null}
      <div className="events-hero-cream-gradient absolute inset-0 z-[1]" />
      <motion.div
        className="relative z-10 flex min-h-[42rem] flex-col items-stretch justify-end gap-8 px-5 pt-32 pb-8 md:min-h-[68svh] md:flex-row md:items-end md:justify-between md:px-8 md:pt-40 md:pb-10"
        {...fadeIn()}
      >
        <div className="max-w-5xl">
          <h1
            className="font-display text-6xl leading-none md:text-8xl"
            data-cms-text-key="events.hero.title"
          >
            Seasonal nights worth circling.
          </h1>
        </div>
      </motion.div>
    </section>
  )
}

function CalendarGrid({
  calendarDate,
  events,
  onCalendarDateChange,
}: {
  calendarDate: Date
  events: DisplayEvent[]
  onCalendarDateChange: (date: Date) => void
}) {
  const [selectedEvent, setSelectedEvent] = useState<DisplayEvent | null>(null)
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
  const eventsByDay = new Map<number, Array<{ event: DisplayEvent; index: number }>>()

  for (const day of calendarDays) {
    const date = new Date(year, month, day)
    const scheduledEvents = events
      .map((event, index) => ({ event, index }))
      .filter(({ event }) => occursOnDate(event, date))
    if (scheduledEvents.length) eventsByDay.set(day, scheduledEvents)
  }

  const changeMonth = (offset: number) => {
    onCalendarDateChange(new Date(year, month + offset, 1))
  }

  return (
    <motion.div {...fadeInPlace()}>
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          aria-label="Previous month"
          className="grid h-10 w-10 place-items-center rounded-full border border-aberdeen-blue/25 bg-oyster-white text-aberdeen-blue transition hover:bg-aberdeen-peach"
          onClick={() => changeMonth(-1)}
          type="button"
        >
          <CaretLeft size={18} />
        </button>
        <button
          aria-label="Next month"
          className="grid h-10 w-10 place-items-center rounded-full border border-aberdeen-blue/25 bg-oyster-white text-aberdeen-blue transition hover:bg-aberdeen-peach"
          onClick={() => changeMonth(1)}
          type="button"
        >
          <CaretRight size={18} />
        </button>
      </div>
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
            className="h-48 border-r border-b border-aberdeen-blue/25 bg-aberdeen-peach/40 md:h-64"
            key={`leading-${day}`}
          />
        ))}
        {calendarDays.map((day) => {
          const scheduledEvents = eventsByDay.get(day)

          if (!scheduledEvents) {
            return (
              <div
                className="h-48 border-r border-b border-aberdeen-blue/25 bg-white/35 p-3 font-utility text-xs tracking-[0.14em] text-aberdeen-blue/45 uppercase md:h-64 md:p-5"
                key={`day-${day}`}
              >
                {day}
              </div>
            )
          }

          const mainEvent = scheduledEvents.length === 1 ? scheduledEvents[0] : undefined

          if (mainEvent && !mainEvent.event.recurrence) {
            return (
              <MainCalendarEvent
                day={day}
                event={mainEvent.event}
                fillsCell
                index={mainEvent.index}
                key={`event-${mainEvent.event.startsAt}`}
                onSelect={setSelectedEvent}
              />
            )
          }

          return (
            <div
              className="relative h-48 overflow-y-auto border-r border-b border-aberdeen-blue/25 bg-white/35 p-3 text-aberdeen-blue md:h-64 md:p-5"
              key={`events-${day}`}
            >
              <p className="font-utility text-xs tracking-[0.14em] text-aberdeen-blue/45 uppercase">
                {day}
              </p>
              <div className="mt-3 grid gap-2">
                {scheduledEvents.map(({ event, index }) =>
                  event.recurrence ? (
                    <motion.div
                      className="border-l-2 border-aberdeen-blue/25 bg-aberdeen-blue/5 px-2.5 py-2"
                      key={`${event.title}-${event.startsAt}-${index}`}
                      {...fadeInPlace(index * 0.03)}
                    >
                      <p className="font-utility text-[10px] tracking-[0.12em] text-aberdeen-blue/55 uppercase">
                        {event.time}
                      </p>
                      <h3 className="mt-1 text-sm leading-tight font-medium text-aberdeen-blue/75">
                        {event.title}
                      </h3>
                    </motion.div>
                  ) : (
                    <MainCalendarEvent
                      day={day}
                      event={event}
                      index={index}
                      key={`${event.title}-${event.startsAt}-${index}`}
                      onSelect={setSelectedEvent}
                    />
                  ),
                )}
              </div>
            </div>
          )
        })}
        {trailingCalendarDays.map((day) => (
          <div
            className="h-48 border-r border-b border-aberdeen-blue/25 bg-white/35 md:h-64"
            key={`trailing-${day}`}
          />
        ))}
      </div>
      {selectedEvent ? (
        <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      ) : null}
    </motion.div>
  )
}

function MainCalendarEvent({
  day,
  event,
  fillsCell = false,
  index,
  onSelect,
}: {
  day: number
  event: DisplayEvent
  fillsCell?: boolean
  index: number
  onSelect: (event: DisplayEvent) => void
}) {
  return (
    <motion.button
      className={`relative overflow-y-auto bg-aberdeen-peach p-3 text-left text-aberdeen-blue md:p-5 ${
        fillsCell
          ? "h-48 border-r border-b border-aberdeen-blue/25 md:h-64"
          : "w-full border border-aberdeen-blue/25"
      }`}
      onClick={() => onSelect(event)}
      type="button"
      {...fadeInPlace(index * 0.06)}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center bg-citrus font-display text-3xl leading-none">
          {day}
        </span>
        <span className="font-utility text-xs tracking-[0.14em] uppercase">{event.time}</span>
      </span>
      <span className="mt-4 block font-display text-3xl leading-none">{event.title}</span>
      <img alt="" className="mt-4 h-24 w-full object-cover" src={event.image} />
    </motion.button>
  )
}

function EventDetailsModal({ event, onClose }: { event: DisplayEvent; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") onClose()
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [onClose])

  const eventDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(event.startsAt)

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <button
        aria-label="Close event details"
        className="absolute inset-0 bg-kelp-ink/75"
        onClick={onClose}
        type="button"
      />
      <motion.dialog
        aria-labelledby="event-details-title"
        aria-modal="true"
        className="relative z-10 m-0 grid max-h-svh w-full max-w-4xl overflow-y-auto border-0 bg-oyster-white p-0 shadow-2xl md:grid-cols-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        open
      >
        <img alt={event.title} className="h-64 w-full object-cover md:h-full" src={event.image} />
        <div className="relative p-6 text-aberdeen-blue md:p-10">
          <button
            aria-label="Close event details"
            className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-aberdeen-blue/20 transition hover:bg-aberdeen-peach"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
          <p className="pr-12 font-utility text-xs tracking-[0.18em] uppercase">{eventDate}</p>
          <h2
            className="mt-5 font-display text-5xl leading-none md:text-6xl"
            id="event-details-title"
          >
            {event.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-kelp-ink/80">{event.copy}</p>
          {event.bookingUrl ? (
            <a
              className="aberdeen-action mt-8 rounded-full bg-aberdeen-blue text-aberdeen-peach"
              href={event.bookingUrl}
              rel="noreferrer"
              target="_blank"
            >
              Book now
            </a>
          ) : null}
        </div>
      </motion.dialog>
    </div>
  )
}

function getInitialCalendarDate(events: DisplayEvent[]) {
  const today = new Date()
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

  if (
    Array.from({ length: daysInCurrentMonth }, (_, index) => index + 1).some((day) =>
      events.some((event) =>
        occursOnDate(event, new Date(today.getFullYear(), today.getMonth(), day)),
      ),
    )
  ) {
    return currentMonth
  }

  const upcomingEvent = events.find((event) => event.startsAt >= currentMonth.getTime())
  return upcomingEvent ? new Date(upcomingEvent.startsAt) : currentMonth
}

function occursOnDate(event: DisplayEvent, date: Date) {
  const startsAt = new Date(event.startsAt)
  const occurrenceDay = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  const firstDay = Date.UTC(startsAt.getFullYear(), startsAt.getMonth(), startsAt.getDate())
  const daysSinceStart = (occurrenceDay - firstDay) / 86_400_000

  if (daysSinceStart < 0) return false
  if (!event.recurrence) return daysSinceStart === 0
  if (event.recurrence === "daily") return true
  if (event.recurrence === "weekly") return daysSinceStart % 7 === 0
  return date.getDate() === startsAt.getDate()
}

function PrivateEventsSection() {
  const image = usePageImage("events.private.image") ?? privateEventsImage

  return (
    <section className="bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:px-8 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_0.9fr]">
        <motion.div {...fadeIn()}>
          <h2
            className="max-w-3xl font-playful text-5xl leading-none md:text-7xl"
            data-cms-text-key="events.private.title"
          >
            Gatherings with seafood, spirits, and a room already dressed for it.
          </h2>
          <p
            className="mt-8 max-w-2xl text-lg leading-8 text-oyster-white/80"
            data-cms-text-key="events.private.copy"
          >
            For birthdays, group dinners, brand nights, and seasonal parties, Aberdeen can shape the
            table around the moment.
          </p>
          <a
            className="aberdeen-action standard-action mt-8"
            data-cms-link-key="events.private.link"
            data-standard-action-tone={standardActionTone(0)}
            href="/contact"
          >
            Start planning
          </a>
        </motion.div>
        <motion.div {...fadeIn(0.12)}>
          <FramedPhoto
            alt="Guests gathered around a restaurant table"
            className="w-full"
            imageCmsSlot="events.private.image"
            src={image}
            variant="03"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default EventsPage
