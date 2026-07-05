import { motion } from "motion/react"
import { MaritimeFlags, PhotoCorners, RopeDivider } from "../components/nautical-details"
import { fadeIn } from "../lib/motion"

function ContactPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <ContactDetails />
      <MapSection />
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
          WebkitMaskImage: "url('/frame-inner-mask.png')",
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskImage: "url('/frame-inner-mask.png')",
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
        src="/frame.png"
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
  return (
    <section className="relative min-h-[44rem] bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt="Restaurant table set with glasses and warm light"
        className="absolute inset-y-0 right-0 h-full w-full object-cover md:w-[52%]"
        src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,#2A3B92_48%,rgba(42,59,146,0.86)_56%,rgba(42,59,146,0.38)_70%,rgba(42,59,146,0)_90%)]" />
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
    </section>
  )
}

function ContactDetails() {
  return (
    <section className="grid gap-10 bg-oyster-white px-5 py-16 md:grid-cols-[1fr_1fr_1fr] md:px-8 md:py-24">
      {[
        ["Visit", "Savannah, Georgia", "Address coming soon"],
        ["Call", "Phone coming soon", "For reservations, private dinners, and general questions"],
        ["Write", "hello@aberdeen.example", "Press, events, and restaurant inquiries"],
      ].map(([label, lineOne, lineTwo], index) => (
        <motion.article
          className="bg-aberdeen-peach text-aberdeen-blue"
          key={label}
          {...fadeIn(index * 0.08)}
        >
          <RopeDivider className="rounded-none" />
          <div className="p-6">
            <p className="font-utility text-sm tracking-[0.18em] uppercase">{label}</p>
            <p className="mt-8 font-display text-4xl leading-none">{lineOne}</p>
            <p className="mt-5 leading-7 text-kelp-ink/80">{lineTwo}</p>
          </div>
        </motion.article>
      ))}
    </section>
  )
}

function MapSection() {
  return (
    <section className="grid gap-0 bg-aberdeen-peach md:grid-cols-[0.9fr_1.1fr]">
      <motion.div className="px-5 py-16 md:px-8 md:py-24" {...fadeIn()}>
        <div className="flex items-center justify-between gap-6">
          <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
            Hours
          </p>
          <MaritimeFlags />
        </div>
        <dl className="mt-10 space-y-5 text-lg">
          {[
            ["Monday - Thursday", "5 PM - 10 PM"],
            ["Friday", "5 PM - 11 PM"],
            ["Saturday", "4 PM - 11 PM"],
            ["Sunday", "4 PM - 9 PM"],
          ].map(([day, hours]) => (
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
      <motion.div className="min-h-[28rem] bg-aberdeen-blue p-5 md:p-8" {...fadeIn(0.12)}>
        <div className="relative h-full min-h-[28rem]">
          <iframe
            className="h-full min-h-[28rem] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-popups"
            src="https://www.google.com/maps?q=Savannah%2C%20Georgia&output=embed"
            title="Map showing Savannah, Georgia"
          />
          <PhotoCorners />
        </div>
      </motion.div>
    </section>
  )
}

export default ContactPage
