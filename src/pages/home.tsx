import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"
import { useRef } from "react"
import { useOutletContext } from "react-router"
import { FaqSection, homepageFaqs } from "../components/faq-section"
import { FramedPhoto } from "../components/framed-photo"
import { ImageTilt } from "../components/image-tilt"
import { LocationMap } from "../components/location-map"
import { RestaurantGroupSection } from "../components/site-extras"
import { restaurantAddress } from "../lib/location"
import { fadeIn, fadeInPlace } from "../lib/motion"
import { usePageImage, useRequiredPageImage, useShellData } from "../lib/public-data"
import { standardActionTone } from "../lib/standard-action"

const homeHeroImage =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=85"
const homeFramedImage =
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1000&q=85"
const menuFoodImage =
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=85"
const menuSpiritsImage =
  "https://images.unsplash.com/photo-1551024709-f90425340c7e?auto=format&fit=crop&w=1000&q=85"
const menuBeveragesImage =
  "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1000&q=85"
const reservationBeachImage =
  "https://images.unsplash.com/photo-1672841828459-bc913fdcd995?auto=format&fit=crop&w=1800&q=85"
const reservationYachtImage =
  "https://images.unsplash.com/photo-1641787540215-53a5914bdef3?auto=format&fit=crop&w=1800&q=85"

function HomePage() {
  const { playHomeIntro } = useOutletContext<{ playHomeIntro: boolean }>()

  return (
    <div className="page-shell">
      <HeroSection playIntro={playHomeIntro} />
      <CoastalTextMarquee />
      <IntroSection />
      <ReservationEditorialSection />
      <MenuSection />
      <ReservationsSection />
      <ScrollGallerySection />
      <EventsSection />
      <FaqSection
        cmsKeyPrefix="home.faq"
        ctaHref="/contact"
        ctaLabel="View all FAQs"
        ctaToneIndex={6}
        items={homepageFaqs}
      />
      <RestaurantGroupSection actionToneIndex={7} />
    </div>
  )
}

const coastalPhrases = [
  { label: "Savannah, Georgia", style: "font-normal" },
  { label: "By the Ocean", style: "font-bold" },
  { label: "Coastal Seafood", style: "font-normal" },
  { label: "Bright Spirits", style: "font-bold" },
  { label: "Oysters on Ice", style: "font-normal" },
  { label: "Lowcountry Evenings", style: "font-normal" },
  { label: "Fresh Catch", style: "font-bold" },
]
const marqueeColorCount = 4
const coastalMarqueeItems = Array.from({ length: marqueeColorCount }, (_, cycle) =>
  coastalPhrases.map((phrase) => ({ cycle, phrase })),
).flat()

function wrap(min: number, max: number, value: number) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

function CoastalTextMarquee() {
  const shouldReduceMotion = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 42,
    stiffness: 180,
    mass: 0.45,
  })
  const direction = useRef(-1)
  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`)

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) return

    const velocity = smoothVelocity.get()
    if (Math.abs(velocity) > 8) direction.current = velocity > 0 ? -1 : 1

    const speedMultiplier = 1 + Math.min(Math.abs(velocity) / 450, 4)
    const distance =
      (direction.current * 1.4 * speedMultiplier * (delta / 1000)) / marqueeColorCount
    baseX.set(baseX.get() + distance)
  })

  return (
    <section
      aria-label="The spirit of Aberdeen"
      className="overflow-hidden border-y border-kelp-ink/20 bg-oyster-white py-5 text-aberdeen-blue md:py-7"
    >
      <motion.div
        className="flex w-max will-change-transform"
        style={{ x: shouldReduceMotion ? "-8%" : x }}
      >
        {[0, 1].map((copy) => (
          <div aria-hidden={copy === 1} className="flex shrink-0 items-center" key={copy}>
            {coastalMarqueeItems.map(({ cycle, phrase }) => (
              <div
                aria-hidden={cycle > 0 || undefined}
                className="coastal-marquee-item flex shrink-0 items-center"
                key={`${copy}-${cycle}-${phrase.label}`}
              >
                <span
                  className={`px-5 font-display text-3xl leading-none whitespace-nowrap md:px-8 md:text-5xl ${phrase.style}`}
                >
                  {phrase.label}
                </span>
                <span
                  aria-hidden="true"
                  className="font-playful text-xl leading-none text-black md:text-2xl"
                >
                  ✶
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  )
}

function HeroSection({ playIntro }: { playIntro: boolean }) {
  const image = useRequiredPageImage("hero", homeHeroImage)
  const framedImage = useRequiredPageImage("home-hero-postcard", homeFramedImage)
  const shouldReduceMotion = useReducedMotion()
  const animateIntro = playIntro && !shouldReduceMotion
  const introDelay = animateIntro ? 2.95 : 0

  return (
    <section
      className="relative min-h-svh overflow-hidden bg-oyster-white text-aberdeen-peach"
      data-hero-intro
    >
      <motion.div
        animate={
          animateIntro
            ? {
                top: ["12.5%", "12.5%", "0%"],
                right: ["12.5%", "12.5%", "0%"],
                bottom: ["12.5%", "12.5%", "0%"],
                left: ["12.5%", "12.5%", "0%"],
              }
            : { top: "0%", right: "0%", bottom: "0%", left: "0%" }
        }
        className="absolute z-0 overflow-hidden will-change-transform"
        initial={
          animateIntro
            ? { top: "12.5%", right: "12.5%", bottom: "12.5%", left: "12.5%" }
            : { top: "0%", right: "0%", bottom: "0%", left: "0%" }
        }
        transition={{
          delay: animateIntro ? 1 : 0,
          duration: animateIntro ? 1.8 : 0,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.42, 1],
        }}
      >
        {image ? (
          <motion.img
            alt="Sunlit coastal restaurant dining room"
            animate={{ filter: "blur(0px)", opacity: 1 }}
            className="h-full w-full object-cover"
            fetchPriority="high"
            data-cms-accepts-video
            data-cms-media-role="background"
            data-cms-slot="hero"
            initial={
              animateIntro
                ? { filter: "blur(22px)", opacity: 0 }
                : { filter: "blur(0px)", opacity: 1 }
            }
            src={image}
            transition={{
              delay: animateIntro ? 1 : 0,
              duration: animateIntro ? 1.5 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ) : null}
      </motion.div>
      <motion.div
        animate={{ opacity: 1 }}
        className="home-hero-radial-glow absolute inset-0 z-[1]"
        initial={{ opacity: animateIntro ? 0 : 1 }}
        transition={{
          delay: animateIntro ? 2.65 : 0,
          duration: animateIntro ? 0.864 : 0,
        }}
      />
      <div className="relative z-10 grid min-h-svh items-end px-5 pt-28 pb-6 md:px-8 md:pt-32 md:pb-10">
        <div className="grid w-full items-end gap-6 md:grid-cols-[minmax(0,1fr)_minmax(22rem,31rem)] md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(27rem,34rem)]">
          <div className="flex max-w-[46rem] flex-col items-start gap-6 text-left md:gap-7">
            <motion.p
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              className="home-hero-intro max-w-[42rem] font-playful text-3xl leading-[1.08] text-aberdeen-peach md:text-5xl"
              data-cms-text-key="home.hero.intro"
              initial={
                !animateIntro
                  ? { filter: "blur(0px)", opacity: 1, y: 0 }
                  : { filter: "blur(18px)", opacity: 0, y: 22 }
              }
              transition={{
                delay: introDelay,
                duration: animateIntro ? 1.08 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Seafood, bright spirits, and a room that keeps the afternoon glowing after dark.
            </motion.p>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex w-full max-w-md gap-3"
              initial={animateIntro ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
              transition={{
                delay: animateIntro ? 3.08 : 0,
                duration: animateIntro ? 0.864 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                className="aberdeen-action min-w-0 flex-1 font-bold [--surface-action-background:white] [--surface-action-color:var(--color-aberdeen-blue)] [--surface-action-fill:var(--color-aberdeen-peach)] [--surface-action-hover-color:var(--color-aberdeen-blue)]"
                data-cms-link-key="home.hero.reserve"
                href="#reservations"
              >
                Reserve
              </a>
              <a
                className="aberdeen-action min-w-0 flex-1 font-bold [--surface-action-background:white] [--surface-action-color:var(--color-aberdeen-blue)] [--surface-action-fill:var(--color-aberdeen-peach)] [--surface-action-hover-color:var(--color-aberdeen-blue)]"
                data-cms-link-key="home.hero.menu"
                href="/menu/food"
              >
                Menu
              </a>
            </motion.div>
          </div>
          <motion.div
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            className="order-first w-[min(82vw,24rem)] justify-self-end will-change-transform md:order-none md:w-full"
            initial={
              !animateIntro
                ? { opacity: 1, scale: 1, x: 0, y: 0 }
                : { opacity: 0, scale: 0.96, x: 34, y: 18 }
            }
            transition={{
              delay: animateIntro ? 3.18 : 0,
              duration: animateIntro ? 1.08 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="rotate-2">
              <FramedPhoto
                alt="A guest enjoying dinner at Aberdeen"
                className="w-full"
                imageCmsSlot="home-hero-postcard"
                src={framedImage}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function IntroSection() {
  const { site } = useShellData()
  const mapLocation = site?.settings.mapLocation?.trim() || restaurantAddress

  return (
    <section className="relative isolate overflow-hidden px-5 py-16 md:px-8 md:py-24">
      <div className="relative z-10 grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-stretch">
        <motion.div className="relative h-[34rem] md:h-auto md:self-stretch" {...fadeIn()}>
          <ImageTilt className="teak-grain h-full w-full overflow-hidden p-[0.6rem]">
            <img
              alt="Portrait of a warmly lit restaurant dining detail"
              className="h-full w-full object-cover"
              data-cms-slot="home.intro.image"
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85"
            />
          </ImageTilt>
        </motion.div>
        <motion.div className="flex h-full max-w-4xl flex-col justify-center" {...fadeIn(0.1)}>
          <h2
            className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl"
            data-cms-text-key="home.intro.title"
          >
            Built like a coastal postcard, served with Savannah appetite.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8" data-cms-text-key="home.intro.copy">
            Aberdeen is a bright, editorial restaurant centered on seafood, cocktails, and the easy
            ceremony of gathering around a good table.
          </p>
          <LocationMap className="mt-10 max-w-3xl" location={mapLocation} />
        </motion.div>
      </div>
    </section>
  )
}

function MenuSection() {
  const { menuPages } = useShellData()
  const foodImage = useRequiredPageImage("home.menus.food.image", menuFoodImage)
  const spiritsImage = useRequiredPageImage("home.menus.spirits.image", menuSpiritsImage)
  const beveragesImage = useRequiredPageImage("home.menus.beverages.image", menuBeveragesImage)
  const menus = [
    {
      key: "food",
      title: "Food",
      href: "/menu/food",
      image: foodImage,
      slot: "home.menus.food.image",
      copy: "Cold oysters, coastal plates, and generous mains.",
      label: "Raw bar",
    },
    {
      key: "spirits",
      title: "Spirits",
      href: "/menu/spirits",
      image: spiritsImage,
      slot: "home.menus.spirits.image",
      copy: "Crisp cocktails, blue-hour pours, and bottles for the table.",
      label: "Blue hour",
    },
    {
      key: "beverages",
      title: "Beverages",
      href: "/menu/beverages",
      image: beveragesImage,
      slot: "home.menus.beverages.image",
      copy: "Sparkling, zero-proof, coffee, tea, and easy afternoon refreshers.",
      label: "Sparkling",
    },
  ].map((menu, index) => ({
    ...menu,
    href: menuPages?.[index] ? `/menu/${menuPages[index].slug}` : menu.href,
    title: menuPages?.[index]?.title ?? menu.title,
  }))

  return (
    <section className="bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <motion.div className="mb-10 flex items-end justify-between gap-6" {...fadeIn()}>
        <div>
          <h2
            className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl"
            data-cms-text-key="home.menus.title"
          >
            Menus
          </h2>
        </div>
      </motion.div>
      <div className="grid gap-5 md:grid-cols-3">
        {menus.map((menu, index) => (
          <motion.a
            aria-label={`View ${menu.title} menu`}
            className="group block bg-aberdeen-peach text-aberdeen-blue"
            href={menu.href}
            key={menu.title}
            {...fadeIn(index * 0.08)}
          >
            <div
              aria-hidden="true"
              className="h-3"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg,#2a3b92 0 8px,#fff8f0 8px 16px,#f7b733 16px 24px,#fff8f0 24px 32px)",
              }}
            />
            <div className="relative aspect-[4/5] overflow-hidden">
              {menu.image ? (
                <img
                  alt=""
                  className="menu-image-hover h-full w-full object-cover"
                  data-cms-slot={menu.slot}
                  src={menu.image}
                />
              ) : null}
              <div className="absolute right-4 bottom-4 rounded-full border border-aberdeen-blue bg-oyster-white px-5 py-3 font-playful text-2xl leading-none text-aberdeen-blue">
                <p className="mt-1.25" data-cms-text-key={`home.menus.${menu.key}.label`}>
                  {menu.label}
                </p>
              </div>
            </div>
            <div className="min-h-44 p-5">
              <h3
                className="font-display text-5xl decoration-citrus decoration-2 underline-offset-8 group-hover:underline"
                data-cms-text-key={`home.menus.${menu.key}.title`}
              >
                {menu.title}
              </h3>
              <p
                className="mt-3 max-w-sm text-base leading-7 text-kelp-ink"
                data-cms-text-key={`home.menus.${menu.key}.copy`}
              >
                {menu.copy}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

function ScrollGallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const weightedProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 95,
    mass: 0.75,
  })
  const x = useTransform(weightedProgress, [0, 1], ["5%", "-45%"])
  const images = [
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=85",
  ]

  return (
    <section
      className="relative isolate overflow-hidden bg-aberdeen-peach py-16 md:py-24"
      ref={sectionRef}
    >
      <motion.div
        className="scrapbook-gallery-track relative z-10 flex w-max gap-5 px-3 will-change-transform md:gap-7 md:px-8"
        style={{ x }}
      >
        {[...images, ...images].map((image, index) => (
          <motion.div
            className={`relative h-72 w-56 shrink-0 md:h-[34rem] md:w-[24rem] ${
              index % 2 === 0 ? "md:mt-12" : ""
            }`}
            aria-hidden={index >= images.length}
            key={`${image}-${index}`}
            {...fadeIn((index % images.length) * 0.08)}
          >
            <ImageTilt className="soft-card-shadow h-full w-full">
              <img
                alt=""
                className="h-full w-full object-cover"
                data-cms-slot={`home.scrapbook.image-${(index % images.length) + 1}`}
                src={image}
              />
            </ImageTilt>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function ReservationsSection() {
  const framedImage = useRequiredPageImage("home-hero-postcard", homeFramedImage)

  return (
    <section
      className="bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:px-8 md:py-24"
      id="reservations"
    >
      <div className="grid gap-10 md:grid-cols-[0.9fr_1fr] md:items-start">
        <motion.div className="relative order-2 self-end md:order-1 md:self-start" {...fadeIn(0.3)}>
          <FramedPhoto
            alt="Seafood spread on an Aberdeen table"
            className="w-full"
            imageCmsSlot="home-hero-postcard"
            src={framedImage}
            variant="02"
          />
        </motion.div>
        <div className="order-1 flex flex-col items-start md:order-2 md:pt-8">
          <motion.h2
            className="max-w-3xl font-display text-5xl leading-none md:text-7xl"
            data-cms-text-key="home.reservations.title"
            {...fadeInPlace()}
          >
            Join us where the table catches the light.
          </motion.h2>
          <motion.p
            className="mt-7 max-w-xl text-lg leading-8 text-oyster-white/80"
            data-cms-text-key="home.reservations.copy"
            {...fadeInPlace(0.08)}
          >
            Settle in for oysters on ice, bright coastal plates, and a round of cold drinks as
            afternoon slips into evening.
          </motion.p>
          <motion.a
            className="aberdeen-action standard-action mt-8"
            data-cms-link-key="home.reservations.plan-link"
            data-standard-action-tone={standardActionTone(4)}
            href="/contact"
            {...fadeInPlace(0.14)}
          >
            Plan a visit
          </motion.a>
        </div>
      </div>
    </section>
  )
}

function ReservationEditorialSection() {
  const beachImage = usePageImage("home.reservations.editorial.beach") ?? reservationBeachImage
  const yachtImage = usePageImage("home.reservations.editorial.yacht") ?? reservationYachtImage

  return (
    <section className="min-h-[120svh] overflow-hidden bg-oyster-white px-5 py-16 text-aberdeen-blue md:h-[120svh] md:min-h-[54rem] md:px-8 md:pt-28 md:pb-16">
      <div className="mx-auto grid max-w-[96rem] gap-y-14 md:relative md:block md:h-full">
        <motion.div
          className="relative z-10 max-w-2xl self-start md:absolute md:top-0 md:left-0 md:w-[46%] md:pr-10"
          {...fadeInPlace()}
        >
          <h2
            className="max-w-xl font-display text-5xl leading-[0.95] md:text-7xl"
            data-cms-text-key="home.reservations.editorial.title"
          >
            A beautiful evening begins by the water.
          </h2>
          <p
            className="mt-7 max-w-lg text-xl leading-8 text-kelp-ink/75 md:text-2xl"
            data-cms-text-key="home.reservations.editorial.copy"
          >
            Come for bright seafood, cold martinis, and a table made for lingering. Reserve your
            evening at Aberdeen and let the coast set the pace.
          </p>
          <a
            className="aberdeen-action standard-action mt-8 text-lg"
            data-cms-link-key="home.reservations.editorial.primary-link"
            data-standard-action-tone={standardActionTone(3)}
            href="/contact"
          >
            Reserve your table
          </a>
        </motion.div>

        <div className="relative h-[62svh] md:absolute md:top-0 md:right-0 md:h-[72%] md:w-[46%]">
          <ImageTilt className="teak-grain h-full w-full overflow-hidden p-[0.6rem]">
            <img
              alt="Luxury yacht cruising across calm blue water"
              className="h-full w-full object-cover"
              data-cms-slot="home.reservations.editorial.yacht"
              src={yachtImage}
            />
          </ImageTilt>
        </div>

        <div className="relative h-[66svh] md:absolute md:bottom-0 md:left-0 md:h-[56%] md:w-[46%]">
          <ImageTilt className="teak-grain h-full w-full overflow-hidden p-[0.6rem]">
            <img
              alt="Palm-lined beach beside clear turquoise water"
              className="h-full w-full object-cover"
              data-cms-slot="home.reservations.editorial.beach"
              src={beachImage}
            />
          </ImageTilt>
        </div>

        <motion.div
          className="self-end md:absolute md:right-0 md:bottom-0 md:w-[46%] md:pb-4"
          {...fadeInPlace(0.12)}
        >
          <p
            className="max-w-sm text-xl leading-8 text-kelp-ink/70 md:text-2xl"
            data-cms-text-key="home.reservations.editorial.note"
          >
            Sunset tables go quickly. Choose your evening now, and we’ll have the welcome waiting
            when you arrive.
          </p>
          <a
            className="mt-5 inline-flex border-b border-aberdeen-blue/45 pb-1 font-utility text-lg tracking-[0.16em] uppercase"
            data-cms-link-key="home.reservations.editorial.secondary-link"
            href="/contact"
          >
            Make a reservation
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function EventsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <motion.div
        className="relative z-10 grid items-center gap-10 md:grid-cols-[0.85fr_0.75fr_0.7fr]"
        {...fadeIn()}
      >
        <div className="text-aberdeen-blue">
          <h2
            className="font-display text-5xl leading-none md:text-7xl"
            data-cms-text-key="home.events.title"
          >
            A table made for the moment.
          </h2>
          <p
            className="mt-7 max-w-xl text-lg leading-8 text-kelp-ink/80"
            data-cms-text-key="home.events.copy"
          >
            From candlelit dinners to full-room celebrations, Aberdeen shapes the menu, mood, and
            pacing around the people you bring together.
          </p>
          <a
            className="aberdeen-action standard-action mt-8"
            data-cms-link-key="home.events.link"
            data-standard-action-tone={standardActionTone(5)}
            href="/events"
          >
            View events
          </a>
        </div>
        <div className="relative mt-10 h-[34rem] md:mt-0 md:h-[43rem]">
          <ImageTilt className="teak-grain h-full w-full overflow-hidden p-[0.6rem]">
            <img
              alt="A candlelit table set for an Aberdeen private dinner"
              className="h-full w-full object-cover"
              data-cms-slot="home.events.primary-image"
              src="https://images.unsplash.com/photo-1646473334251-827ea2e0b9ea?auto=format&fit=crop&w=1200&q=85"
            />
          </ImageTilt>
        </div>
        <div className="relative h-[28rem] md:h-[34rem]">
          <ImageTilt className="teak-grain h-full w-full overflow-hidden p-[0.6rem]">
            <img
              alt="Guests gathered around a private dining table"
              className="h-full w-full object-cover"
              data-cms-slot="home.events.secondary-image"
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=85"
            />
          </ImageTilt>
        </div>
      </motion.div>
    </section>
  )
}

export default HomePage
