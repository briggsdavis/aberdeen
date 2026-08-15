import { motion } from "motion/react"
import { useState } from "react"
import { DecorativeBackdrop } from "../components/decorative-media"
import { ImageTilt } from "../components/image-tilt"
import { RopeDivider } from "../components/nautical-details"
import { FAQSection } from "../components/site-extras"
import { useCmsRuntime } from "../lib/cms-runtime"
import { googleMapsPlaceUrl, restaurantAddress } from "../lib/location"
import { fadeIn } from "../lib/motion"

const antiqueMapFour = "/maps/antique-map-04.png"

function ContactPage() {
  return (
    <div className="contact-page page-shell">
      <ContactDetails />
      <MapSection />
      <FAQSection blue expanded />
    </div>
  )
}

function ContactDetails() {
  const { site } = useCmsRuntime()
  const details = site?.contactDetails.length
    ? site.contactDetails.map(({ label, value, note }) => [label, value, note])
    : [
        ["Visit", restaurantAddress, "Find us by the water."],
        ["Call", "Phone coming soon", "For reservations, private dinners, and general questions"],
        ["Write", "hello@aberdeen.example", "Press, events, and restaurant inquiries"],
      ]

  return (
    <section className="relative isolate grid gap-6 overflow-hidden bg-oyster-white px-5 py-12 md:min-h-svh md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-8 md:py-16">
      <DecorativeBackdrop imageClassName="object-cover" opacity={0.14} src={antiqueMapFour} />
      <div className="relative z-10">
        <motion.h1
          className="mb-8 font-display text-6xl leading-none text-aberdeen-blue md:text-8xl"
          {...fadeIn()}
        >
          Contact Us
        </motion.h1>
        <div className="grid gap-3">
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
      </div>
      <motion.div className="relative z-10" {...fadeIn(0.12)}>
        <ImageTilt className="relative h-56 overflow-hidden md:h-64">
          <img
            alt="Aberdeen dining room table"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85"
          />
        </ImageTilt>
        <div className="mt-6 text-aberdeen-blue">
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
  const mapLocation = site?.settings.mapLocation?.trim() || restaurantAddress

  return (
    <section className="grid gap-0 bg-aberdeen-peach md:grid-cols-[0.9fr_1.1fr] md:items-stretch">
      <motion.div className="px-5 py-16 md:px-8 md:py-24" {...fadeIn()}>
        <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">Hours</p>
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
        <div className="teak-grain relative h-full min-h-[24rem] overflow-hidden border border-aberdeen-blue/15 p-2 shadow-[0_18px_44px_rgb(from_var(--color-kelp-ink)_r_g_b/0.12)]">
          <iframe
            className="block h-full min-h-[24rem] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-popups"
            src={`https://www.google.com/maps?q=${encodeURIComponent(mapLocation)}&output=embed`}
            title={`Map showing Aberdeen at ${mapLocation}`}
          />
          <a
            className="absolute right-5 bottom-5 z-10 border border-aberdeen-blue bg-oyster-white px-3 py-2 font-utility text-xs tracking-[0.14em] text-aberdeen-blue uppercase shadow-[4px_4px_0_var(--color-citrus)] transition-transform hover:-translate-y-1"
            href={googleMapsPlaceUrl(mapLocation)}
            rel="noreferrer"
            target="_blank"
          >
            View on Google Maps ↗
          </a>
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
  const fieldClassName =
    "w-full rounded-none border-aberdeen-blue/40 bg-transparent px-0 py-3 text-aberdeen-blue outline-none transition-colors [border-width:0_0_1px_0] placeholder:text-aberdeen-blue/55 focus:border-aberdeen-blue focus:ring-0"

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
          className={fieldClassName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First name"
          required
          value={firstName}
        />
        <input
          className={fieldClassName}
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Last name"
          required
          value={lastName}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className={fieldClassName}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
          type="email"
          value={email}
        />
        <input
          className={fieldClassName}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone (optional)"
          type="tel"
          value={phone}
        />
      </div>
      <select
        className={`${fieldClassName} appearance-none`}
        onChange={(event) => setType(event.target.value as typeof type)}
        value={type}
      >
        <option value="contact">General contact</option>
        <option value="privateEvent">Private event inquiry</option>
      </select>
      <textarea
        className={`${fieldClassName} min-h-24 resize-y`}
        onChange={(event) => setMessage(event.target.value)}
        placeholder={type === "privateEvent" ? "Tell us about your event" : "Message"}
        required
        value={message}
      />
      {result ? (
        <p className={`text-sm ${result.kind === "success" ? "text-success" : "text-danger"}`}>
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
