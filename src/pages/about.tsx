import { motion } from "motion/react"
import { FramedPhoto } from "../components/framed-photo"
import { ImageTilt } from "../components/image-tilt"
import { RestaurantGroupSection } from "../components/site-extras"
import { fadeIn } from "../lib/motion"
import { usePageImage, useRequiredPageImage } from "../lib/public-data"

const aboutPillarsImage =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85"
const aboutFramedImage =
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1000&q=85"

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

function HeroSection() {
  const heroImage = useRequiredPageImage("hero")
  const framedImage = usePageImage("about-hero-postcard") ?? aboutFramedImage

  return (
    <section className="relative min-h-[42rem] overflow-hidden bg-oyster-white text-aberdeen-blue md:min-h-[68svh]">
      {heroImage ? (
        <img
          alt="Sunlit restaurant table with glassware and coastal plates"
          className="absolute inset-0 h-full w-full object-cover"
          data-cms-accepts-video
          data-cms-media-role="background"
          data-cms-slot="hero"
          src={heroImage}
        />
      ) : null}
      <div className="events-hero-cream-gradient absolute inset-0 z-[1]" />
      <motion.div
        className="relative z-10 flex min-h-[42rem] flex-col items-stretch justify-end gap-8 px-5 pt-32 pb-8 md:min-h-[68svh] md:flex-row md:items-end md:justify-between md:px-8 md:pt-40 md:pb-10"
        {...fadeIn()}
      >
        <div className="max-w-4xl">
          <h1
            className="font-display text-6xl leading-none md:text-8xl"
            data-cms-text-key="about.hero.title"
          >
            A coastal room with a Savannah pulse.
          </h1>
        </div>
        <motion.div
          className="relative z-20 w-[min(82vw,24rem)] self-end md:-mr-6 md:-mb-10 md:w-[min(38rem,40vw)]"
          {...fadeIn(0.18)}
        >
          <FramedPhoto
            alt="People on a catamaran sailboat in the ocean"
            className="w-full"
            imageCmsSlot="about-hero-postcard"
            src={framedImage}
            variant="02"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

function StorySection() {
  const framedImage = usePageImage("about-hero-postcard") ?? aboutFramedImage

  return (
    <section className="relative isolate grid gap-12 overflow-hidden bg-oyster-white px-5 pt-16 pb-4 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:pt-24 md:pb-6">
      <motion.div className="relative z-10 self-start" {...fadeIn()}>
        <FramedPhoto
          alt="People on a catamaran sailboat in the ocean"
          className="w-full"
          imageCmsSlot="about-hero-postcard"
          src={framedImage}
          variant="03"
        />
      </motion.div>
      <motion.div className="relative z-10 max-w-4xl space-y-8" {...fadeIn(0.1)}>
        <h2
          className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl"
          data-cms-text-key="about.story.title"
        >
          Seafood, bright spirits, and a dining room made for lingering.
        </h2>
        <p className="max-w-3xl text-lg leading-8" data-cms-text-key="about.story.copy">
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
    <section className="relative isolate grid gap-12 overflow-hidden bg-oyster-white px-5 pt-4 pb-16 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:pt-6 md:pb-24">
      <motion.div
        className="relative z-10 max-w-3xl space-y-6 self-center text-lg leading-8 md:pl-12 xl:pl-16"
        {...fadeIn()}
      >
        <p data-cms-text-key="about.owner.copy-1">
          Aberdeen is imagined as a coastal room with a city pulse: bright enough for lunch,
          polished enough for celebrations, and relaxed enough to make one more round feel
          inevitable.
        </p>
        <p data-cms-text-key="about.owner.copy-2">
          The restaurant group brings a practiced eye for warm service, sharp menus, and rooms that
          feel alive without feeling rushed.
        </p>
        <p data-cms-text-key="about.owner.copy-3">
          Here, that hospitality is filtered through seafood, citrus, cold glass, and a Savannah
          sense of lingering.
        </p>
      </motion.div>
      <motion.div className="relative z-10 text-center text-aberdeen-blue" {...fadeIn(0.12)}>
        <ImageTilt className="teak-grain mx-auto h-80 w-80 overflow-hidden rounded-full p-[0.6rem]">
          <img
            alt="Portrait of Aberdeen owner"
            className="no-scroll-reveal h-full w-full rounded-full object-cover"
            data-cms-slot="about.owner.image"
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85"
          />
        </ImageTilt>
        <h2
          className="mt-6 font-display text-4xl leading-none"
          data-cms-text-key="about.owner.name"
        >
          Richard DeShantz
        </h2>
      </motion.div>
    </section>
  )
}

function GroupSection() {
  const stickyImage = usePageImage("about-pillars-sticky-image") ?? aboutPillarsImage
  const cards = [
    {
      key: "group",
      label: "01",
      title: "From the group",
      copy: "A restaurant shaped with the polish and hospitality of Richard DeShantz Restaurant Group.",
      supplementary:
        "That experience shows up in the details: confident service, thoughtful pacing, and a room designed to feel effortless from the first drink onward.",
    },
    {
      key: "water",
      label: "02",
      title: "From the water",
      copy: "A menu language of shellfish, whole fish, citrus, herbs, brine, butter, and cold glass.",
    },
    {
      key: "room",
      label: "03",
      title: "For the room",
      copy: "A place for early drinks, long dinners, date nights, celebrations, and one more round.",
    },
  ]

  return (
    <section className="relative isolate overflow-clip bg-aberdeen-peach px-5 py-16 md:px-8 md:py-24">
      <div className="relative z-10 grid items-start gap-10 md:grid-cols-[0.88fr_1.12fr] md:gap-14">
        <div>
          <motion.div className="mb-10 max-w-2xl md:mb-0" {...fadeIn()}>
            <h2
              className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl"
              data-cms-text-key="about.pillars.title"
            >
              Three notes from the coast.
            </h2>
          </motion.div>
          <div className="grid gap-4 md:mt-8">
            {cards.map((card, index) => (
              <div className="flex" key={card.title}>
                <motion.article
                  className="w-full bg-oyster-white p-6 text-aberdeen-blue shadow-[0_18px_34px_rgb(from_var(--color-kelp-ink)_r_g_b/0.1)] md:p-8"
                  {...fadeIn(index * 0.08)}
                >
                  <p
                    className="font-utility text-sm tracking-[0.18em] uppercase"
                    data-cms-text-key={`about.pillars.${card.key}.label`}
                  >
                    {card.label}
                  </p>
                  <h3
                    className="mt-8 font-display text-4xl leading-none md:text-5xl"
                    data-cms-text-key={`about.pillars.${card.key}.title`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mt-5 text-lg leading-8 text-kelp-ink/80"
                    data-cms-text-key={`about.pillars.${card.key}.copy`}
                  >
                    {card.copy}
                  </p>
                  {card.supplementary ? (
                    <p
                      className="mt-5 text-lg leading-8 text-kelp-ink/80"
                      data-cms-text-key="about.pillars.group.supplementary"
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
            className="about-pillars-image relative h-[28rem] md:h-full"
            {...fadeIn(0.12)}
          >
            <ImageTilt className="teak-grain relative h-full w-full overflow-hidden p-[0.6rem]">
              <img
                alt="Aberdeen dining room set for an evening by the coast"
                className="h-full w-full object-cover"
                data-cms-slot="about-pillars-sticky-image"
                src={stickyImage}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-aberdeen-blue/20 via-transparent to-transparent" />
            </ImageTilt>
          </motion.div>
          <motion.div
            className="about-pillars-image relative mt-12 h-72 md:mt-24 md:h-[68%]"
            {...fadeIn(0.2)}
          >
            <ImageTilt className="teak-grain h-full w-full overflow-hidden p-[0.6rem]">
              <img
                alt="A bright coastal table setting at Aberdeen"
                className="h-full w-full object-cover"
                data-cms-slot="about.pillars.secondary-image"
                src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85"
              />
            </ImageTilt>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function RoomSection() {
  return (
    <section className="relative isolate overflow-hidden bg-oyster-white p-5 md:p-8">
      <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
        <motion.div className="relative h-[30rem] w-full md:h-[42rem]" {...fadeIn()}>
          <ImageTilt className="h-full w-full overflow-hidden">
            <img
              alt="Restaurant bar with warm lights and bottles"
              className="h-full w-full object-cover"
              data-cms-slot="about.room.primary-image"
              src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=85"
            />
          </ImageTilt>
        </motion.div>
        <div className="grid gap-3 md:gap-8">
          <motion.div className="relative h-64 w-full md:h-full" {...fadeIn(0.08)}>
            <ImageTilt className="h-full w-full overflow-hidden">
              <img
                alt="Seafood dish with wine on a dining table"
                className="h-full w-full object-cover"
                data-cms-slot="about.room.secondary-image"
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1000&q=85"
              />
            </ImageTilt>
          </motion.div>
          <motion.div
            className="flex items-center justify-center bg-aberdeen-peach p-6 text-center text-aberdeen-blue md:p-8"
            {...fadeIn(0.16)}
          >
            <p className="font-playful text-4xl leading-none" data-cms-text-key="about.room.note">
              Bright by day. Blue by night. Always built around the table.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
