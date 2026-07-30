import { motion } from "motion/react"
import { useState } from "react"
import { DecorativeBackdrop } from "../components/decorative-media"
import { MaritimeFlags, RopeDivider } from "../components/nautical-details"
import { FAQSection, HeroCarouselButtons, useHeroCarousel } from "../components/site-extras"
import { useCmsRuntime } from "../lib/cms-runtime"
import { fadeIn } from "../lib/motion"

const antiqueMapFour = "/maps/antique-map-04.png"

function ContactPage() {
  return (
    <div className="contact-page page-shell">
      <HeroSection />
      <ContactDetails />
      <MapSection />
      <FAQSection blue expanded />
    </div>
  )
}

function FramedPhoto({
  alt,
  imageClassName = "",
  src,
}: {
  alt: string
  imageClassName?: string
  src: string
}) {
  return (
    <div className="relative aspect-[1339/1016]">
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: "url('/frames/torn-paper/mask-01.png')",
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskImage: "url('/frames/torn-paper/mask-01.png')",
          maskPosition: "center",
          maskRepeat: "no-repeat",
          maskSize: "100% 100%",
        }}
      >
        <img alt={alt} className={`h-full w-full object-cover ${imageClassName}`} src={src} />
      </div>
      <img
        alt=""
        className="pointer-events-none absolute inset-0 z-20 h-full w-full object-fill"
        src="/frames/torn-paper/frame-01.png"
      />
    </div>
  )
}

function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-30 h-8 w-24 rotate-[7deg] bg-oyster-white/70 shadow-sm ${className}`}
    />
  )
}

function HeroSection() {
  const { page } = useCmsRuntime()
  const managedHero = page.media.hero?.url ?? page.images.hero
  const defaultHeroImages = [
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=85",
  ]
  const { image, next, previous } = useHeroCarousel(
    managedHero ? [managedHero, ...defaultHeroImages.slice(1)] : defaultHeroImages,
  )

  return (
    <section className="relative min-h-[44rem] bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt="Restaurant table set with glasses and warm light"
        className="absolute inset-0 h-full w-full object-cover"
        data-cms-slot="hero"
        src={image}
      />
      <div className="hero-radial-glow absolute inset-0 z-[1]" />
      <motion.div
        className="absolute right-5 bottom-24 z-10 hidden w-[25rem] text-aberdeen-blue md:right-8 md:block"
        {...fadeIn(0.2)}
      >
        <Tape className="-top-12 left-40" />
        <div className="rotate-90">
          <FramedPhoto
            alt="Yacht deck with blue water beyond"
            imageClassName="-rotate-90 scale-[1.35]"
            src="https://images.unsplash.com/photo-1745875513449-f54f017b880d?auto=format&fit=crop&w=900&q=85"
          />
        </div>
      </motion.div>
      <motion.div
        className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Contact</p>
        <h1 className="max-w-5xl font-display text-6xl leading-none md:text-8xl">
          Find the table, call the room, plan the night.
        </h1>
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-5 z-10 md:bottom-10 md:left-8"
        {...fadeIn(0.12)}
      >
        <HeroCarouselButtons onNext={next} onPrevious={previous} />
      </motion.div>
    </section>
  )
}

function ContactDetails() {
  const { site } = useCmsRuntime()
  const details = site?.contactDetails.length
    ? site.contactDetails.map(({ label, value, note }) => [label, value, note])
    : [
        ["Visit", "Savannah, Georgia", "Address coming soon"],
        ["Call", "Phone coming soon", "For reservations, private dinners, and general questions"],
        ["Write", "hello@aberdeen.example", "Press, events, and restaurant inquiries"],
      ]

  return (
    <section className="relative isolate grid gap-6 overflow-hidden bg-oyster-white px-5 py-12 md:min-h-svh md:grid-cols-[0.72fr_1.28fr] md:items-center md:px-8 md:py-16">
      <DecorativeBackdrop imageClassName="object-cover" opacity={0.14} src={antiqueMapFour} />
      <div className="relative z-10 grid gap-3">
        {details.map(([label, lineOne, lineTwo], index) => (
          <motion.article
            className="bg-aberdeen-peach text-aberdeen-blue"
            key={label}
            {...fadeIn(index * 0.08)}
          >
            <RopeDivider className="rounded-none" />
            <div className="p-4 md:p-5">
              <p className="font-utility text-sm tracking-[0.18em] uppercase">{label}</p>
              <p className="mt-3 font-display text-3xl leading-none">{lineOne}</p>
              <p className="mt-3 leading-6 text-kelp-ink/80">{lineTwo}</p>
            </div>
          </motion.article>
        ))}
      </div>
      <motion.div className="relative z-10 bg-aberdeen-blue p-4 md:p-5" {...fadeIn(0.12)}>
        <div className="relative h-48 md:h-52">
          <img
            alt="Aberdeen dining room table"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85"
          />
        </div>
        <div className="mt-4 bg-oyster-white p-5 text-aberdeen-blue md:p-6">
          <h2 className="font-display text-4xl leading-none">Send a note</h2>
          <InquiryForm />
        </div>
      </motion.div>
    </section>
  )
}

function MapSection() {
  const { site } = useCmsRuntime()
  const visibleHours = site?.openingHours.length
    ? site.openingHours.map(({ label, value }) => [label, value])
    : [
        ["Monday - Thursday", "5 PM - 10 PM"],
        ["Friday", "5 PM - 11 PM"],
        ["Saturday", "4 PM - 11 PM"],
        ["Sunday", "4 PM - 9 PM"],
      ]
  const mapLocation = site?.settings.mapLocation ?? "Savannah, Georgia"

  return (
    <section className="grid gap-0 bg-aberdeen-peach md:grid-cols-[0.9fr_1.1fr] md:items-stretch">
      <motion.div className="px-5 py-16 md:px-8 md:py-24" {...fadeIn()}>
        <div className="flex items-center justify-between gap-6">
          <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
            Hours
          </p>
          <MaritimeFlags />
        </div>
        <dl className="mt-10 space-y-5 text-lg">
          {visibleHours.map(([day, hours]) => (
            <div className="flex items-baseline gap-4" key={day}>
              <dt className="min-w-0 font-display text-2xl text-aberdeen-blue">{day}</dt>
              <span className="grow border-b border-dotted border-aberdeen-blue/25" />
              <dd className="font-utility text-sm tracking-[0.12em] text-aberdeen-blue uppercase">
                {hours}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
      <motion.div className="min-h-[28rem] p-5 md:p-8 md:pl-4" {...fadeIn(0.12)}>
        <div className="h-full min-h-[24rem] overflow-hidden border border-aberdeen-blue/15 bg-oyster-white p-2 shadow-[0_18px_44px_rgb(29_42_47/0.12)]">
          <iframe
            className="block h-full min-h-[24rem] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-popups"
            src={`https://www.google.com/maps?q=${encodeURIComponent(mapLocation)}&output=embed`}
            title="Map showing Savannah, Georgia"
          />
        </div>
      </motion.div>
    </section>
  )
}

function InquiryForm() {
  const { submitInquiry } = useCmsRuntime()
  const [type, setType] = useState<"contact" | "privateEvent">("contact")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ kind: "success" | "error"; message: string } | null>(null)

  return (
    <form
      className="mt-5 grid gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        if (!submitInquiry) {
          setResult({ kind: "error", message: "The contact form is temporarily unavailable." })
          return
        }
        setSubmitting(true)
        setResult(null)
        void submitInquiry({
          type,
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone: phone.trim() || undefined,
          message,
        })
          .then(() => {
            setFirstName("")
            setLastName("")
            setEmail("")
            setPhone("")
            setMessage("")
            setResult({
              kind: "success",
              message: "Thank you. Your message has been sent to the Aberdeen team.",
            })
          })
          .catch((error: unknown) =>
            setResult({
              kind: "error",
              message: error instanceof Error ? error.message : "Your message could not be sent.",
            }),
          )
          .finally(() => setSubmitting(false))
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="border border-aberdeen-blue/25 bg-white px-4 py-2.5"
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First name"
          required
          value={firstName}
        />
        <input
          className="border border-aberdeen-blue/25 bg-white px-4 py-2.5"
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Last name"
          required
          value={lastName}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="border border-aberdeen-blue/25 bg-white px-4 py-2.5"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
          type="email"
          value={email}
        />
        <input
          className="border border-aberdeen-blue/25 bg-white px-4 py-2.5"
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone (optional)"
          type="tel"
          value={phone}
        />
      </div>
      <select
        className="border border-aberdeen-blue/25 bg-white px-4 py-2.5"
        onChange={(event) => setType(event.target.value as typeof type)}
        value={type}
      >
        <option value="contact">General contact</option>
        <option value="privateEvent">Private event inquiry</option>
      </select>
      <textarea
        className="min-h-24 border border-aberdeen-blue/25 bg-white px-4 py-2.5"
        onChange={(event) => setMessage(event.target.value)}
        placeholder={type === "privateEvent" ? "Tell us about your event" : "Message"}
        required
        value={message}
      />
      {result ? (
        <p className={`text-sm ${result.kind === "success" ? "text-emerald-700" : "text-red-700"}`}>
          {result.message}
        </p>
      ) : null}
      <button
        className="aberdeen-action w-fit bg-aberdeen-blue text-aberdeen-peach disabled:opacity-60"
        disabled={submitting}
        type="submit"
      >
        {submitting ? "Sending…" : "Send"}
      </button>
    </form>
  )
}

export default ContactPage
