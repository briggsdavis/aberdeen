import { motion } from "motion/react"
import { RestaurantGroupSection, RippleSection } from "../components/site-extras"
import { fadeIn } from "../lib/motion"

function AboutPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <StorySection />
      <OwnerSection />
      <GroupSection />
      <RoomSection />
      <RestaurantGroupSection />
    </div>
  )
}

function FramedPhoto({
  alt,
  className = "",
  frameSrc = "/frame.png",
  maskSrc = "/frame-inner-mask.png",
  src,
}: {
  alt: string
  className?: string
  frameSrc?: string
  maskSrc?: string
  src: string
}) {
  return (
    <div className={`relative aspect-[1339/1016] ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: `url('${maskSrc}')`,
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskImage: `url('${maskSrc}')`,
          maskPosition: "center",
          maskRepeat: "no-repeat",
          maskSize: "100% 100%",
        }}
      >
        <img alt={alt} className="h-full w-full object-cover" src={src} />
      </div>
      <img
        alt=""
        className="pointer-events-none absolute inset-0 z-20 h-full w-full object-fill"
        src={frameSrc}
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

const maritimeFlagPatterns = [
  "linear-gradient(90deg,#fff8f0 0 50%,#2a3b92 50% 100%)",
  "conic-gradient(#2a3b92 0 25%,#fff8f0 0 50%,#2a3b92 0 75%,#fff8f0 0)",
  "linear-gradient(45deg,transparent 42%,#d43f2f 42% 58%,transparent 58%),linear-gradient(135deg,transparent 42%,#d43f2f 42% 58%,transparent 58%),#fff8f0",
  "linear-gradient(135deg,#f7b733 0 50%,#d43f2f 50% 100%)",
  "linear-gradient(90deg,transparent 38%,#fff8f0 38% 62%,transparent 62%),linear-gradient(0deg,transparent 38%,#fff8f0 38% 62%,transparent 62%),#2a3b92",
]

function MaritimeFlags() {
  return (
    <div aria-hidden="true" className="flex gap-2">
      {maritimeFlagPatterns.map((background) => (
        <span className="h-8 w-8" key={background} style={{ background }} />
      ))}
    </div>
  )
}

function RopeDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-3 rounded-full ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg,#2a3b92 0 8px,#fff8f0 8px 16px,#f7b733 16px 24px,#fff8f0 24px 32px)",
      }}
    />
  )
}

function PhotoCorners() {
  return (
    <>
      <span className="absolute -top-1 -left-1 z-10 h-14 w-14 bg-oyster-white [clip-path:polygon(0_0,100%_0,0_100%)]" />
      <span className="absolute -top-1 -right-1 z-10 h-14 w-14 bg-oyster-white [clip-path:polygon(0_0,100%_0,100%_100%)]" />
      <span className="absolute -bottom-1 -left-1 z-10 h-14 w-14 bg-oyster-white [clip-path:polygon(0_0,100%_100%,0_100%)]" />
      <span className="absolute -right-1 -bottom-1 z-10 h-14 w-14 bg-oyster-white [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
    </>
  )
}

function Postmark() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-1.5">
      <span className="h-px w-24 bg-aberdeen-blue/45" />
      <span className="h-px w-20 bg-aberdeen-blue/45" />
      <span className="h-px w-24 bg-aberdeen-blue/45" />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-[44rem] bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt="Sunlit restaurant table with glassware and coastal plates"
        className="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="hero-radial-glow absolute inset-0 z-[1]" />
      <motion.div
        className="absolute right-5 bottom-10 z-10 hidden w-[26rem] rotate-3 text-aberdeen-blue md:right-8 md:block"
        {...fadeIn(0.2)}
      >
        <Tape className="top-2 left-40" />
        <FramedPhoto
          alt="People on a catamaran sailboat in the ocean"
          frameSrc="/frame-180.png"
          maskSrc="/frame-inner-mask-180.png"
          src="https://images.unsplash.com/photo-1756163251150-3d4bfcfa52fe?auto=format&fit=crop&w=900&q=85"
        />
      </motion.div>
      <motion.div
        className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] uppercase">About Aberdeen</p>
        <h1 className="max-w-5xl font-display text-6xl leading-none md:text-8xl">
          A coastal room with a Savannah pulse.
        </h1>
      </motion.div>
    </section>
  )
}

function StorySection() {
  return (
    <section className="grid gap-12 bg-oyster-white px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-24">
      <motion.div
        className="self-start bg-aberdeen-peach p-6 text-aberdeen-blue shadow-[8px_8px_0_rgba(42,59,146,0.16)]"
        {...fadeIn()}
      >
        <p className="font-utility text-xs tracking-[0.18em] uppercase">Postcard note</p>
        <p className="mt-4 font-playful text-5xl leading-none">The story</p>
        <div className="mt-8 flex items-center justify-between gap-6">
          <Postmark />
          <img alt="" className="h-14 w-14 object-contain" src="/circle-a-blue.png" />
        </div>
      </motion.div>
      <motion.div className="max-w-4xl space-y-8" {...fadeIn(0.1)}>
        <h2 className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
          Seafood, bright spirits, and a dining room made for lingering.
        </h2>
        <RopeDivider className="w-64" />
        <p className="max-w-3xl text-lg leading-8">
          Aberdeen brings coastal ease to the city: oysters on ice, citrus-forward plates, generous
          mains, and a bar that keeps the evening moving. The feeling is editorial but relaxed, like
          a postcard from the water pinned to a Savannah wall.
        </p>
      </motion.div>
    </section>
  )
}

function OwnerSection() {
  return (
    <section className="grid gap-12 bg-oyster-white px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-24">
      <motion.div className="text-center text-aberdeen-blue" {...fadeIn()}>
        <div className="mx-auto h-72 w-72 overflow-hidden rounded-full border-8 border-aberdeen-peach">
          <img
            alt="Portrait of Aberdeen owner"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85"
          />
        </div>
        <h2 className="mt-6 font-display text-4xl leading-none">Richard DeShantz</h2>
        <p className="mt-2 font-utility text-xs tracking-[0.18em] uppercase">
          Restaurant Group Founder
        </p>
      </motion.div>
      <motion.div className="max-w-3xl space-y-6 self-center text-lg leading-8" {...fadeIn(0.12)}>
        <p>
          Aberdeen is imagined as a coastal room with a city pulse: bright enough for lunch,
          polished enough for celebrations, and relaxed enough to make one more round feel
          inevitable.
        </p>
        <p>
          The restaurant group brings a practiced eye for warm service, sharp menus, and rooms that
          feel alive without feeling rushed.
        </p>
        <p>
          Here, that hospitality is filtered through seafood, citrus, cold glass, and a Savannah
          sense of lingering.
        </p>
      </motion.div>
    </section>
  )
}

function GroupSection() {
  return (
    <section className="bg-aberdeen-peach px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-8 md:grid-cols-[1fr_1fr_1fr]">
        {[
          [
            "01",
            "From the group",
            "A restaurant shaped with the polish and hospitality of Richard DeShantz Restaurant Group.",
          ],
          [
            "02",
            "From the water",
            "A menu language of shellfish, whole fish, citrus, herbs, brine, butter, and cold glass.",
          ],
          [
            "03",
            "For the room",
            "A place for early drinks, long dinners, date nights, celebrations, and one more round.",
          ],
        ].map(([label, title, copy], index) => (
          <motion.article
            className="bg-oyster-white text-aberdeen-blue shadow-[0_18px_34px_rgba(29,42,47,0.1)]"
            key={title}
            {...fadeIn(index * 0.08)}
          >
            <RopeDivider className="rounded-none" />
            <div className="p-6">
              <p className="font-utility text-sm tracking-[0.18em] uppercase">{label}</p>
              <h3 className="mt-8 font-display text-4xl leading-none">{title}</h3>
              <p className="mt-5 leading-7 text-kelp-ink/80">{copy}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function RoomSection() {
  return (
    <RippleSection className="bg-aberdeen-blue p-5 md:p-8">
      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
        <motion.div className="relative h-[30rem] w-full md:h-[42rem]" {...fadeIn()}>
          <img
            alt="Restaurant bar with warm lights and bottles"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=85"
          />
          <PhotoCorners />
        </motion.div>
        <div className="grid gap-3 md:gap-8">
          <motion.div className="relative h-64 w-full md:h-full" {...fadeIn(0.08)}>
            <img
              alt="Seafood dish with wine on a dining table"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1000&q=85"
            />
            <PhotoCorners />
          </motion.div>
          <motion.div className="bg-aberdeen-peach p-6 text-aberdeen-blue md:p-8" {...fadeIn(0.16)}>
            <div className="flex items-center justify-between gap-6">
              <p className="font-utility text-sm tracking-[0.18em] uppercase">The room</p>
              <MaritimeFlags />
            </div>
            <p className="mt-6 font-playful text-4xl leading-none">
              Bright by day. Blue by night. Always built around the table.
            </p>
          </motion.div>
        </div>
      </div>
    </RippleSection>
  )
}

export default AboutPage
