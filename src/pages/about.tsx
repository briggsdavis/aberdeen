import { motion } from "motion/react"
import { DecorativeBackdrop } from "../components/decorative-media"
import { HeroPostcard } from "../components/hero-postcard"
import { RestaurantGroupSection, RippleSection } from "../components/site-extras"
import { useRequiredPageImage } from "../lib/cms-runtime"
import { fadeIn } from "../lib/motion"

const antiqueMapOne = "/maps/antique-map-01.png"
const antiqueMapTwo = "/maps/antique-map-02.png"
const antiqueMapThree = "/maps/antique-map-03.png"
const antiqueMapFour = "/maps/antique-map-04.png"

function AboutPage() {
  return (
    <div className="page-shell">
      <HeroSection />
      <StorySection />
      <OwnerSection />
      <GroupSection />
      <RoomSection />
      <RestaurantGroupSection />
    </div>
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

function PhotoCorners() {
  return null
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
  const heroImage = useRequiredPageImage("hero")
  const postcardImage = useRequiredPageImage("about-hero-postcard")

  return (
    <section className="relative min-h-[42rem] overflow-hidden bg-oyster-white text-aberdeen-blue md:min-h-[68svh]">
      {heroImage ? (
        <img
          alt="Sunlit restaurant table with glassware and coastal plates"
          className="absolute inset-0 h-full w-full object-cover"
          data-cms-slot="hero"
          src={heroImage}
        />
      ) : null}
      <div className="events-hero-cream-gradient absolute inset-0 z-[1]" />
      <motion.div
        className="relative z-10 flex min-h-[42rem] flex-col items-stretch justify-end gap-8 px-5 pt-32 pb-8 md:min-h-[68svh] md:flex-row md:items-end md:justify-between md:px-8 md:pt-40 md:pb-10"
        {...fadeIn()}
      >
        <div className="max-w-5xl">
          <p className="font-utility text-sm tracking-[0.22em] uppercase">About Aberdeen</p>
          <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">
            A coastal room with a Savannah pulse.
          </h1>
        </div>
        <motion.div
          className="relative z-20 w-[min(82vw,24rem)] self-end md:w-[min(34rem,38vw)]"
          {...fadeIn(0.18)}
        >
          <HeroPostcard
            cmsSlot="about-hero-postcard"
            imageAlt="People on a catamaran sailboat in the ocean"
            imageSrc={postcardImage}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

function StorySection() {
  return (
    <section className="relative isolate grid gap-12 overflow-hidden bg-oyster-white px-5 pt-16 pb-8 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:pt-24 md:pb-12">
      <DecorativeBackdrop imageClassName="object-cover" opacity={0.13} src={antiqueMapOne} />
      <motion.div
        className="relative z-10 self-start bg-aberdeen-peach p-6 text-aberdeen-blue shadow-[8px_8px_0_rgba(42,59,146,0.16)]"
        {...fadeIn()}
      >
        <p className="font-utility text-xs tracking-[0.18em] uppercase">Postcard note</p>
        <p className="mt-4 font-playful text-5xl leading-none">The story</p>
        <div className="mt-8 flex items-center justify-between gap-6">
          <Postmark />
          <img
            alt=""
            className="h-14 w-14 object-contain"
            src="/brand/aberdeen-monogram-circle-blue.png"
          />
        </div>
      </motion.div>
      <motion.div className="relative z-10 max-w-4xl space-y-8" {...fadeIn(0.1)}>
        <h2 className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
          Seafood, bright spirits, and a dining room made for lingering.
        </h2>
        <div aria-hidden="true" className="hidden" data-cms-structure="rope-divider" />
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
    <section className="relative isolate grid gap-12 overflow-hidden bg-oyster-white px-5 pt-8 pb-16 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:pt-12 md:pb-24">
      <DecorativeBackdrop imageClassName="object-cover" opacity={0.12} src={antiqueMapTwo} />
      <motion.div className="relative z-10 text-center text-aberdeen-blue" {...fadeIn()}>
        <div className="mx-auto h-72 w-72 overflow-hidden rounded-full border-8 border-aberdeen-peach">
          <img
            alt="Portrait of Aberdeen owner"
            className="no-scroll-reveal h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85"
          />
        </div>
        <h2 className="mt-6 font-display text-4xl leading-none">Richard DeShantz</h2>
        <p className="mt-2 font-utility text-xs tracking-[0.18em] uppercase">
          Restaurant Group Founder
        </p>
      </motion.div>
      <motion.div
        className="relative z-10 max-w-3xl space-y-6 self-center text-lg leading-8"
        {...fadeIn(0.12)}
      >
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
  const stickyImage = useRequiredPageImage("about-pillars-sticky-image")
  const cards = [
    {
      label: "01",
      title: "From the group",
      copy: "A restaurant shaped with the polish and hospitality of Richard DeShantz Restaurant Group.",
      supplementary:
        "That experience shows up in the details: confident service, thoughtful pacing, and a room designed to feel effortless from the first drink onward.",
    },
    {
      label: "02",
      title: "From the water",
      copy: "A menu language of shellfish, whole fish, citrus, herbs, brine, butter, and cold glass.",
    },
    {
      label: "03",
      title: "For the room",
      copy: "A place for early drinks, long dinners, date nights, celebrations, and one more round.",
    },
  ]

  return (
    <section className="relative isolate overflow-clip bg-aberdeen-peach px-5 py-16 md:px-8 md:py-24">
      <DecorativeBackdrop imageClassName="object-cover" opacity={0.13} src={antiqueMapThree} />
      <div className="relative z-10 grid items-start gap-10 md:grid-cols-[0.88fr_1.12fr] md:gap-14">
        <div>
          <motion.div className="mb-10 max-w-2xl md:mb-0" {...fadeIn()}>
            <p
              className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase"
              data-cms-text-key="about.pillars.eyebrow"
            >
              The Aberdeen point of view
            </p>
            <h2
              className="mt-5 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl"
              data-cms-text-key="about.pillars.title"
            >
              Three notes from the coast.
            </h2>
          </motion.div>
          <div className="grid gap-4 md:mt-8">
            {cards.map((card, index) => (
              <div className="flex" key={card.title}>
                <motion.article
                  className="w-full bg-oyster-white p-6 text-aberdeen-blue shadow-[0_18px_34px_rgba(29,42,47,0.1)] md:p-8"
                  {...fadeIn(index * 0.08)}
                >
                  <div aria-hidden="true" className="hidden" data-cms-structure="rope-divider" />
                  <p
                    className="font-utility text-sm tracking-[0.18em] uppercase"
                    data-cms-text-key={`about.pillars.item-${index + 1}.label`}
                  >
                    {card.label}
                  </p>
                  <h3
                    className="mt-8 font-display text-4xl leading-none md:text-5xl"
                    data-cms-text-key={`about.pillars.item-${index + 1}.title`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mt-5 text-lg leading-8 text-kelp-ink/80"
                    data-cms-text-key={`about.pillars.item-${index + 1}.copy`}
                  >
                    {card.copy}
                  </p>
                  {card.supplementary ? (
                    <p
                      className="mt-5 leading-7 text-kelp-ink/65"
                      data-cms-text-key="about.pillars.item-1.supplementary"
                    >
                      {card.supplementary}
                    </p>
                  ) : null}
                </motion.article>
              </div>
            ))}
          </div>
        </div>
        <div className="order-first grid grid-cols-[1.08fr_0.92fr] items-start gap-4 md:sticky md:top-24 md:order-none md:h-[calc(100svh-8rem)] md:gap-6">
          <motion.div
            className="about-pillars-image relative h-[28rem] overflow-hidden shadow-[0_28px_64px_rgba(29,42,47,0.26)] md:h-full"
            {...fadeIn(0.12)}
          >
            {stickyImage ? (
              <img
                alt="Aberdeen dining room set for an evening by the coast"
                className="h-full w-full object-cover"
                data-cms-slot="about-pillars-sticky-image"
                src={stickyImage}
              />
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-aberdeen-blue/20 via-transparent to-transparent" />
          </motion.div>
          <motion.div
            className="about-pillars-image relative mt-12 h-72 overflow-hidden shadow-[0_24px_56px_rgba(29,42,47,0.24)] md:mt-24 md:h-[68%]"
            {...fadeIn(0.2)}
          >
            <img
              alt="A bright coastal table setting at Aberdeen"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function RoomSection() {
  return (
    <RippleSection className="relative isolate overflow-hidden bg-oyster-white p-5 md:p-8">
      <DecorativeBackdrop imageClassName="object-cover" opacity={0.11} src={antiqueMapFour} />
      <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
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
