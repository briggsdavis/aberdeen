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
import { DecorativeBackdrop } from "../components/decorative-media"
import {
  FAQSection,
  HeroPostcard,
  RestaurantGroupSection,
  RippleSection,
  TiltWrap,
} from "../components/site-extras"
import { useCmsRuntime, useRequiredPageImage } from "../lib/cms-runtime"
import { fadeIn } from "../lib/motion"

const antiqueMapOne = "/maps/antique-map-01.png"
const antiqueMapTwo = "/maps/antique-map-02.png"
const antiqueMapThree = "/maps/antique-map-03.png"

function HomePage() {
  const { playHomeIntro } = useOutletContext<{ playHomeIntro: boolean }>()

  return (
    <div className="page-shell">
      <HeroSection playIntro={playHomeIntro} />
      <CoastalTextMarquee />
      <IntroSection />
      <MenuSection />
      <ScrollGallerySection />
      <ReservationsSection />
      <EventsSection />
      <FAQSection cardsFirst />
      <RestaurantGroupSection />
    </div>
  )
}

const coastalPhrases = [
  { label: "Savannah, Georgia", style: "font-normal italic" },
  { label: "By the Ocean", style: "font-bold not-italic" },
  { label: "Coastal Seafood", style: "font-normal not-italic" },
  { label: "Bright Spirits", style: "font-bold italic" },
  { label: "Oysters on Ice", style: "font-normal not-italic" },
  { label: "Lowcountry Evenings", style: "font-normal italic" },
  { label: "Fresh Catch", style: "font-bold not-italic" },
]

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
    const distance = direction.current * 1.4 * speedMultiplier * (delta / 1000)
    baseX.set(baseX.get() + distance)
  })

  return (
    <section
      aria-label="The spirit of Aberdeen"
      className="overflow-hidden border-y border-kelp-ink/20 bg-oyster-white py-5 text-kelp-ink md:py-7"
    >
      <motion.div
        className="flex w-max will-change-transform"
        style={{ x: shouldReduceMotion ? "-8%" : x }}
      >
        {[0, 1].map((copy) => (
          <div aria-hidden={copy === 1} className="flex shrink-0 items-center" key={copy}>
            {coastalPhrases.map((phrase) => (
              <div className="flex shrink-0 items-center" key={`${copy}-${phrase.label}`}>
                <span
                  className={`px-5 font-display text-3xl leading-none whitespace-nowrap md:px-8 md:text-5xl ${phrase.style}`}
                >
                  {phrase.label}
                </span>
                <span
                  aria-hidden="true"
                  className="font-playful text-xl leading-none text-kelp-ink md:text-2xl"
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
  const image = useRequiredPageImage("hero")
  const postcardImage = useRequiredPageImage("home-hero-postcard")
  const shouldReduceMotion = useReducedMotion()
  const animateIntro = playIntro && !shouldReduceMotion
  const introDelay = animateIntro ? 3.95 : 0

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
          delay: animateIntro ? 2 : 0,
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
            data-cms-slot="hero"
            initial={
              animateIntro
                ? { filter: "blur(22px)", opacity: 0 }
                : { filter: "blur(0px)", opacity: 1 }
            }
            src={image}
            transition={{
              delay: animateIntro ? 2 : 0,
              duration: animateIntro ? 1.215 : 0,
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
          delay: animateIntro ? 3.65 : 0,
          duration: animateIntro ? 0.864 : 0,
        }}
      />
      <div className="relative z-10 grid min-h-svh items-end px-5 pt-28 pb-6 md:px-8 md:pt-32 md:pb-10">
        <div className="grid w-full items-end gap-6 md:grid-cols-[minmax(0,1fr)_minmax(22rem,31rem)] md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(27rem,34rem)]">
          <div className="flex max-w-[46rem] flex-col items-start gap-6 text-left md:gap-7">
            <motion.p
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              className="home-hero-intro max-w-[42rem] font-playful text-3xl leading-[1.08] text-white md:text-5xl"
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
                delay: animateIntro ? 4.08 : 0,
                duration: animateIntro ? 0.864 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                className="aberdeen-action min-w-0 flex-1 [--surface-action-background:#fff] [--surface-action-color:var(--color-aberdeen-blue)] [--surface-action-fill:var(--color-aberdeen-peach)] [--surface-action-hover-color:var(--color-aberdeen-blue)]"
                data-cms-link-key="home.hero.reserve"
                href="#reservations"
              >
                Reserve
              </a>
              <a
                className="aberdeen-action min-w-0 flex-1 [--surface-action-background:#fff] [--surface-action-color:var(--color-aberdeen-blue)] [--surface-action-fill:var(--color-aberdeen-peach)] [--surface-action-hover-color:var(--color-aberdeen-blue)]"
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
              delay: animateIntro ? 4.18 : 0,
              duration: animateIntro ? 1.08 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <HeroPostcard imageSrc={postcardImage} />
          </motion.div>
        </div>
      </div>
    </section>
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

function IntroSection() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-16 md:px-8 md:py-24">
      <DecorativeBackdrop imageClassName="object-cover" opacity={0.15} src={antiqueMapOne} />
      <div className="relative z-10 grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-stretch">
        <motion.div className="relative h-[34rem] md:h-auto md:self-stretch" {...fadeIn()}>
          <img
            alt="Portrait of a warmly lit restaurant dining detail"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85"
          />
          <PhotoCorners />
        </motion.div>
        <motion.div className="flex h-full max-w-4xl flex-col justify-center" {...fadeIn(0.1)}>
          <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
            Richard DeShantz Restaurant Group
          </p>
          <h2 className="mt-5 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
            Built like a coastal postcard, served with Savannah appetite.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8">
            Aberdeen is a bright, editorial restaurant centered on seafood, cocktails, and the easy
            ceremony of gathering around a good table.
          </p>
          <div className="relative mt-10 h-72">
            <img
              alt="Seafood spread on a restaurant table"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=85"
            />
            <PhotoCorners />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function MenuSection() {
  const { menuPages } = useCmsRuntime()
  const foodImage = useRequiredPageImage("div:0/section:2/div:2/a:0/div:1/img:0")
  const spiritsImage = useRequiredPageImage("div:0/section:2/div:2/a:1/div:1/img:0")
  const beveragesImage = useRequiredPageImage("div:0/section:2/div:2/a:2/div:1/img:0")
  const menus = [
    {
      title: "Food",
      href: "/menu/food",
      image: foodImage,
      height: "h-[23rem] md:h-[22.4rem]",
      imagePosition: "object-top",
      position: "md:left-[15%] md:top-0",
      slot: "div:0/section:2/div:2/a:0/div:1/img:0",
    },
    {
      title: "Spirits",
      href: "/menu/spirits",
      image: spiritsImage,
      height: "h-[27rem] md:h-[31.1rem]",
      imagePosition: "object-center",
      position: "md:left-[43%] md:top-12",
      slot: "div:0/section:2/div:2/a:1/div:1/img:0",
    },
    {
      title: "Beverages",
      href: "/menu/beverages",
      image: beveragesImage,
      height: "h-[23rem] md:h-[29rem]",
      imagePosition: "object-center",
      position: "md:left-[70%] md:top-36",
      slot: "div:0/section:2/div:2/a:2/div:1/img:0",
    },
  ].map((menu, index) => ({
    ...menu,
    href: menuPages?.[index] ? `/menu/${menuPages[index].slug}` : menu.href,
    title: menuPages?.[index]?.title ?? menu.title,
  }))

  return (
    <section className="relative isolate overflow-hidden bg-oyster-white px-5 pt-16 pb-24 md:px-8 md:pt-10 md:pb-12">
      <DecorativeBackdrop imageClassName="object-cover" opacity={0.13} src={antiqueMapTwo} />
      <motion.div
        className="relative z-10 mb-10 flex items-end justify-between gap-8 md:mb-10"
        {...fadeIn()}
      >
        <div className="max-w-3xl">
          <p
            className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase"
            data-cms-text-key="home.menus.eyebrow"
          >
            Explore Aberdeen
          </p>
          <h2
            className="mt-4 font-display text-5xl leading-none text-aberdeen-blue md:text-5xl"
            data-cms-text-key="home.menus.title"
          >
            Our Curated Menus
          </h2>
          <p
            className="mt-4 max-w-2xl text-sm leading-6 text-kelp-ink/75"
            data-cms-text-key="home.menus.copy"
          >
            Choose from our curated collection of coastal dishes, bright spirits, and refreshing
            pours.
          </p>
        </div>
        <a
          className="aberdeen-action hidden border border-aberdeen-blue text-aberdeen-blue md:inline-flex"
          data-cms-link-key="home.menus.primary-link"
          href="/menu/food"
        >
          View food menu
        </a>
      </motion.div>
      <div className="relative z-10 grid gap-8 md:block md:h-[39rem]">
        {menus.map((menu, index) => (
          <a
            aria-label={`View ${menu.title} menu`}
            className={`group grid grid-cols-[minmax(0,1fr)_minmax(0,3fr)] items-center gap-4 text-aberdeen-blue md:absolute md:block md:w-[17%] ${menu.position}`}
            data-cms-structured-link
            href={menu.href}
            key={menu.title}
          >
            <div aria-hidden="true" className="hidden" data-cms-structure="rope-divider" />
            <div className="flex h-full items-center justify-center md:absolute md:right-[calc(100%+0.7rem)] md:bottom-0 md:h-auto md:items-end md:whitespace-nowrap">
              <h3
                className="menu-tab-underline font-display text-3xl leading-none md:text-4xl"
                data-cms-text-key={`home.menus.item-${index + 1}.title`}
              >
                {menu.title}
              </h3>
            </div>
            <div className={`relative w-full overflow-hidden ${menu.height}`}>
              {menu.image ? (
                <img
                  alt=""
                  className={`h-full w-full object-cover ${menu.imagePosition}`}
                  data-cms-slot={menu.slot}
                  src={menu.image}
                />
              ) : null}
            </div>
          </a>
        ))}
      </div>
      <motion.img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 left-5 z-10 hidden h-auto w-[min(25.92vw,14.4rem)] object-contain opacity-55 md:left-24 md:block"
        src="/illustrations/nautical/schooner.png"
        {...fadeIn(0.16)}
      />
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
      <DecorativeBackdrop imageClassName="object-cover" opacity={0.13} src={antiqueMapThree} />
      <motion.div
        className="relative z-10 mb-10 flex items-center justify-between gap-6 px-5 md:px-8"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
          From the scrapbook
        </p>
        <MaritimeFlags />
      </motion.div>
      <motion.div
        className="relative z-10 flex w-max gap-5 px-3 will-change-transform md:gap-7 md:px-8"
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
            <TiltWrap className="soft-card-shadow h-full w-full">
              <img alt="" className="h-full w-full object-cover" src={image} />
              <PhotoCorners />
            </TiltWrap>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function ReservationsSection() {
  return (
    <RippleSection
      className="bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:px-8 md:py-24"
      id="reservations"
    >
      <div className="grid gap-10 md:grid-cols-[0.9fr_1fr]">
        <motion.div
          className="relative order-2 self-end bg-aberdeen-peach p-6 text-aberdeen-blue shadow-[10px_10px_0_#f7b733] md:order-1"
          {...fadeIn(0.3)}
        >
          <div className="mb-8 flex items-start justify-between gap-6">
            <div>
              <p className="font-utility text-xs tracking-[0.18em] uppercase">Postcard from</p>
              <p className="mt-2 font-playful text-5xl leading-none">Aberdeen</p>
            </div>
            <div className="grid h-20 w-16 place-items-center border border-dashed border-aberdeen-blue bg-aberdeen-peach p-2">
              <img
                alt=""
                className="h-full w-full object-contain"
                src="/brand/aberdeen-monogram-circle-blue.png"
              />
            </div>
          </div>
          <p className="mb-6 text-lg leading-8">
            OpenTable will live here once the client provides the embed snippet.
          </p>
          <div className="mb-8 flex items-center justify-between gap-6">
            <Postmark />
            <MaritimeFlags />
          </div>
          <a className="aberdeen-action bg-aberdeen-blue text-aberdeen-peach" href="/contact">
            Plan a visit
          </a>
        </motion.div>
        <div className="order-1 md:order-2">
          <motion.p className="font-utility text-sm tracking-[0.22em] uppercase" {...fadeIn()}>
            Reservations
          </motion.p>
          <motion.h2
            className="mt-5 max-w-3xl font-display text-5xl leading-none md:text-8xl"
            {...fadeIn(0.14)}
          >
            Join us where the table catches the light.
          </motion.h2>
        </div>
      </div>
    </RippleSection>
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
          <p className="font-utility text-sm tracking-[0.22em] uppercase">
            Events & private dining
          </p>
          <h2 className="mt-5 font-display text-5xl leading-none md:text-7xl">
            A table made for the moment.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-kelp-ink/80">
            From candlelit dinners to full-room celebrations, Aberdeen shapes the menu, mood, and
            pacing around the people you bring together.
          </p>
          <a
            className="aberdeen-action mt-8 bg-aberdeen-blue text-aberdeen-peach [--action-fill:var(--color-oyster-white)]"
            href="/events"
          >
            View events
          </a>
        </div>
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-[26%] h-auto w-32 object-contain opacity-35 md:w-44"
          src="/illustrations/nautical/compass-rose-simple.png"
        />
        <div className="relative mt-10 h-[34rem] overflow-hidden shadow-[0_30px_70px_rgb(29_42_47/0.3)] md:mt-0 md:h-[43rem]">
          <img
            alt="A candlelit table set for an Aberdeen private dinner"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1646473334251-827ea2e0b9ea?auto=format&fit=crop&w=1200&q=85"
          />
        </div>
        <div className="relative h-[28rem] overflow-hidden shadow-[0_28px_64px_rgb(29_42_47/0.28)] md:mt-24 md:h-[34rem]">
          <img
            alt="Guests gathered around a private dining table"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=85"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default HomePage
