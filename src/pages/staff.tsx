import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { useLayoutEffect, useRef } from "react"
import { useLocation } from "react-router"
import { Decoration } from "../components/decoration"
import { ImageTilt } from "../components/image-tilt"
import type { PublicStaffMember } from "../data/default-staff"
import { fadeIn } from "../lib/motion"
import { usePublicStaff, useRequiredPageImage } from "../lib/public-data"

const staffHeroImage =
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=85"

function StaffPage() {
  const location = useLocation()
  const previewScope = new URLSearchParams(location.search).get("cmsScope")
  const introductionOnly = previewScope === "staff-introduction"

  return (
    <div className="page-shell">
      <HeroSection />
      <RosterSection introductionOnly={introductionOnly} />
      {introductionOnly ? null : <HiringSection />}
    </div>
  )
}

function HeroSection() {
  const image = useRequiredPageImage("hero", staffHeroImage)

  return (
    <section className="relative min-h-[42rem] overflow-hidden bg-oyster-white text-aberdeen-blue md:min-h-[68svh]">
      {image ? (
        <img
          alt="Restaurant team preparing a dining room"
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
            data-cms-text-key="staff.hero.title"
          >
            The people who keep the room glowing.
          </h1>
        </div>
      </motion.div>
    </section>
  )
}

function RosterSection({ introductionOnly = false }: { introductionOnly?: boolean }) {
  const staff = usePublicStaff()
  const introRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const intro = introRef.current
    if (!intro || introductionOnly) return

    const updateHeight = () => {
      intro.style.setProperty("--staff-intro-height", `${intro.offsetHeight}px`)
    }
    const observer = new ResizeObserver(updateHeight)

    updateHeight()
    observer.observe(intro)
    return () => observer.disconnect()
  }, [introductionOnly])

  return (
    <section className="relative isolate overflow-clip bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <Decoration
        className="top-24 -right-20 -z-10 w-60 rotate-12 md:top-40 md:right-4 md:w-72"
        name="anchor"
      />
      <div
        className={`relative grid gap-12 ${
          introductionOnly ? "mx-auto max-w-4xl" : "md:grid-cols-[0.75fr_1.25fr]"
        }`}
      >
        <div
          className={`self-start ${introductionOnly ? "" : "staff-intro-sticky md:sticky"}`}
          data-testid="staff-intro"
          ref={introRef}
        >
          <motion.div {...fadeIn()}>
            <h2
              className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl"
              data-cms-text-key="staff.introduction.title"
            >
              Careful hands, clear timing, warm rooms.
            </h2>
            <p
              className="mt-8 max-w-lg text-lg leading-8 text-kelp-ink/80"
              data-cms-text-key="staff.introduction.copy"
            >
              The team is built around craft and ease: people who know when to guide, when to
              vanish, and when to make the night feel a little brighter.
            </p>
          </motion.div>
          <div aria-hidden="true" className="relative mt-8 h-48" data-cms-no-edit>
            <Decoration
              className="top-0 left-0 h-44 w-44 -rotate-6 object-contain drop-shadow-xl"
              name="nautilus"
            />
          </div>
        </div>
        {introductionOnly ? null : (
          <div className="grid gap-16" data-cms-no-edit>
            {staff.map((person, index) => (
              <StaffCard index={index} key={person.name} person={person} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function StaffCard({ index, person }: { index: number; person: PublicStaffMember }) {
  const cardRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.08, 0.9])
  const scale = useSpring(rawScale, { damping: 26, stiffness: 110, mass: 0.9 })

  return (
    <motion.article
      className="grid min-h-[80svh] items-center shadow-none"
      ref={cardRef}
      style={{ scale: shouldReduceMotion ? 1 : scale }}
      {...fadeIn(index * 0.04)}
    >
      <ImageTilt className="relative mx-auto w-full max-w-md bg-aberdeen-peach p-4 text-aberdeen-blue">
        <div className="teak-grain p-[1.2rem]">
          <div className="relative aspect-[4/5] overflow-hidden shadow-[0_18px_38px_rgb(from_var(--color-kelp-ink)_r_g_b/0.24)]">
            <img
              alt={person.name}
              className="no-under-shadow h-full w-full object-cover"
              src={person.image}
            />
          </div>
        </div>
        <div className="p-5">
          <p className="font-utility text-xs tracking-[0.18em] uppercase">{person.role}</p>
          <h2 className="mt-3 font-display text-5xl leading-none">{person.name}</h2>
          <p className="mt-4 leading-7 text-kelp-ink/80">{person.biography}</p>
        </div>
      </ImageTilt>
    </motion.article>
  )
}

function HiringSection() {
  return (
    <section className="grid gap-10 bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:grid-cols-[1fr_0.9fr] md:px-8 md:py-24">
      <motion.div {...fadeIn()}>
        <h2
          className="max-w-3xl font-playful text-5xl leading-none md:text-7xl"
          data-cms-text-key="staff.hiring.title"
        >
          Hospitality is the house style.
        </h2>
        <img
          alt=""
          aria-hidden="true"
          className="mt-8 h-auto w-full max-w-56 object-contain drop-shadow-xl"
          src="/ship1.png"
        />
      </motion.div>
      <motion.p
        className="self-end text-lg leading-8"
        data-cms-text-key="staff.hiring.copy"
        {...fadeIn(0.12)}
      >
        The Aberdeen team is built around warmth, precision, and the good timing that makes a busy
        room feel effortless.
      </motion.p>
    </section>
  )
}

export default StaffPage
