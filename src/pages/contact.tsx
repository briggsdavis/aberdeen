import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react"
import { motion } from "motion/react"
import { useCallback, useState } from "react"
import type { FormEvent } from "react"
import { FaqSection } from "../components/faq-section"
import { googleMapsEmbedUrl, googleMapsPlaceUrl, restaurantAddress } from "../lib/location"
import { fadeIn } from "../lib/motion"
import { useShellData, useSubmitInquiry } from "../lib/public-data"
import { standardActionTone } from "../lib/standard-action"

type SubmissionState = "idle" | "submitting" | "success" | "error"

function settingOrFallback(value: string | undefined, fallback: string) {
  return value?.trim() || fallback
}

function ContactPage() {
  const { site } = useShellData()
  const submitInquiry = useSubmitInquiry()
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle")
  const [submissionMessage, setSubmissionMessage] = useState("")
  const address = settingOrFallback(site?.settings.address, restaurantAddress)
  const mapLocation = settingOrFallback(site?.settings.mapLocation, address)
  const phone = settingOrFallback(site?.settings.phone, "(912) 555-0147")
  const email = settingOrFallback(site?.settings.email, "hello@aberdeen.example")
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, "")}`

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!submitInquiry || submissionState === "submitting") return

      const form = event.currentTarget
      const data = new FormData(form)
      const phoneValue = String(data.get("phone") ?? "").trim()

      setSubmissionState("submitting")
      setSubmissionMessage("")

      try {
        await submitInquiry({
          type: data.get("type") === "privateEvent" ? "privateEvent" : "contact",
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: phoneValue || undefined,
          message: String(data.get("message") ?? ""),
        })
        form.reset()
        setSubmissionState("success")
        setSubmissionMessage("Thank you. Your inquiry is in the hands of our team.")
      } catch (error) {
        setSubmissionState("error")
        setSubmissionMessage(
          error instanceof Error
            ? error.message
            : "Your inquiry could not be sent. Please try again.",
        )
      }
    },
    [submissionState, submitInquiry],
  )

  return (
    <div className="page-shell">
      <section className="relative flex min-h-[42rem] items-end overflow-hidden bg-aberdeen-blue px-5 pt-32 pb-16 text-aberdeen-peach md:min-h-[68svh] md:px-8 md:pt-40 md:pb-20">
        <img
          alt=""
          aria-hidden="true"
          className="no-under-shadow absolute -top-20 -right-32 w-[42rem] rotate-12 opacity-10 md:w-[55rem]"
          src="/illustrations/nautical/compass-rose-detailed.png"
        />
        <motion.div className="relative z-10 max-w-6xl" {...fadeIn()}>
          <h1
            className="font-display text-6xl leading-none md:text-8xl"
            data-cms-text-key="contact.hero.title"
          >
            Come ashore. We’d love to hear from you.
          </h1>
        </motion.div>
      </section>

      <section className="relative isolate overflow-hidden bg-aberdeen-peach px-5 py-16 md:px-8 md:py-24">
        <div className="relative z-10 grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <motion.div {...fadeIn()}>
            <h2
              className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl"
              data-cms-text-key="contact.details.title"
            >
              Find Aberdeen
            </h2>
            <dl className="mt-10 grid gap-8">
              <div>
                <dt className="font-utility text-xs tracking-[0.2em] text-aberdeen-blue uppercase">
                  Address
                </dt>
                <dd className="mt-2 font-display text-2xl leading-tight text-kelp-ink">
                  <a
                    className="underline decoration-citrus decoration-2 underline-offset-4"
                    href={googleMapsPlaceUrl(mapLocation)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {address}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-utility text-xs tracking-[0.2em] text-aberdeen-blue uppercase">
                  Phone
                </dt>
                <dd className="mt-2 font-display text-2xl leading-tight text-kelp-ink">
                  <a
                    className="underline decoration-citrus decoration-2 underline-offset-4"
                    href={phoneHref}
                  >
                    {phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-utility text-xs tracking-[0.2em] text-aberdeen-blue uppercase">
                  Email
                </dt>
                <dd className="mt-2 font-display text-2xl leading-tight text-kelp-ink">
                  <a
                    className="underline decoration-citrus decoration-2 underline-offset-4"
                    href={`mailto:${email}`}
                  >
                    {email}
                  </a>
                </dd>
              </div>
            </dl>
          </motion.div>

          <motion.div className="bg-oyster-white p-6 shadow-xl md:p-10" {...fadeIn(0.1)}>
            <h2
              className="font-display text-5xl leading-none text-aberdeen-blue md:text-6xl"
              data-cms-text-key="contact.form.title"
            >
              Send an inquiry
            </h2>
            <form className="mt-8 grid gap-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Name" name="name" required />
                <FormField label="Email" name="email" required type="email" />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Phone" name="phone" type="tel" />
                <label className="grid gap-2 font-utility text-xs tracking-[0.16em] text-aberdeen-blue uppercase">
                  Inquiry type
                  <select
                    className="min-h-12 rounded-none border border-aberdeen-blue/25 bg-white px-4 font-body text-base tracking-normal text-kelp-ink normal-case transition outline-none focus:border-aberdeen-blue focus:ring-2 focus:ring-citrus/50"
                    name="type"
                  >
                    <option value="contact">General contact</option>
                    <option value="privateEvent">Private event</option>
                  </select>
                </label>
              </div>
              <label className="grid gap-2 font-utility text-xs tracking-[0.16em] text-aberdeen-blue uppercase">
                Message
                <textarea
                  className="min-h-40 resize-y rounded-none border border-aberdeen-blue/25 bg-white px-4 py-3 font-body text-base leading-7 tracking-normal text-kelp-ink normal-case transition outline-none focus:border-aberdeen-blue focus:ring-2 focus:ring-citrus/50"
                  maxLength={4000}
                  name="message"
                  required
                />
              </label>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  className="aberdeen-action standard-action disabled:pointer-events-none disabled:opacity-50"
                  data-standard-action-tone={standardActionTone(0)}
                  disabled={!submitInquiry || submissionState === "submitting"}
                  type="submit"
                >
                  {submissionState === "submitting" ? "Sending…" : "Send inquiry"}
                </button>
                <output
                  aria-live="polite"
                  className={`flex items-center gap-2 text-sm ${
                    submissionState === "error" ? "text-danger" : "text-success"
                  }`}
                >
                  {submissionState === "success" ? <CheckCircle size={18} weight="fill" /> : null}
                  {submitInquiry
                    ? submissionMessage
                    : "Online inquiries are temporarily unavailable. Please email us instead."}
                </output>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-oyster-white px-5 py-16 md:px-8 md:py-24">
        <motion.div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]" {...fadeIn()}>
          <div>
            <h2
              className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl"
              data-cms-text-key="contact.map.title"
            >
              On the river
            </h2>
            <a
              className="mt-8 inline-flex items-center gap-2 font-utility text-sm tracking-[0.14em] text-aberdeen-blue uppercase underline decoration-citrus decoration-2 underline-offset-4"
              href={googleMapsPlaceUrl(mapLocation)}
              rel="noreferrer"
              target="_blank"
            >
              Open in Google Maps <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="h-96 overflow-hidden border-8 border-aberdeen-peach shadow-xl md:h-[34rem]">
            <iframe
              allowFullScreen
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-popups"
              src={googleMapsEmbedUrl(mapLocation)}
              title={`Map showing Aberdeen at ${address}`}
            />
          </div>
        </motion.div>
      </section>

      <FaqSection cmsKeyPrefix="contact.faq" />
    </div>
  )
}

function FormField({
  label,
  name,
  required = false,
  type = "text",
}: {
  label: string
  name: string
  required?: boolean
  type?: "email" | "tel" | "text"
}) {
  return (
    <label className="grid gap-2 font-utility text-xs tracking-[0.16em] text-aberdeen-blue uppercase">
      {label}
      <input
        className="min-h-12 rounded-none border border-aberdeen-blue/25 bg-white px-4 font-body text-base tracking-normal text-kelp-ink normal-case transition outline-none focus:border-aberdeen-blue focus:ring-2 focus:ring-citrus/50"
        maxLength={type === "email" ? 320 : 160}
        name={name}
        required={required}
        type={type}
      />
    </label>
  )
}

export default ContactPage
