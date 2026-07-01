import { motion } from "motion/react"
import { fadeIn } from "../lib/motion"

function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <IntroSection />
      <MenuSection />
      <GallerySection />
      <ReservationsSection />
      <EventsSection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-svh bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt="Sunlit coastal restaurant dining room"
        className="absolute inset-y-0 right-0 h-full w-full object-cover md:w-[58%]"
        src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,#2A3B92_42%,rgba(42,59,146,0.88)_50%,rgba(42,59,146,0.42)_66%,rgba(42,59,146,0)_88%)]" />
      <motion.div
        className="absolute right-5 bottom-8 z-10 hidden w-[28.8rem] -rotate-3 text-aberdeen-blue md:right-8 md:bottom-10 md:block"
        {...fadeIn(0.25)}
      >
        <Tape className="top-2 left-44" />
        <FramedPhoto
          alt="People relaxing on a boat on blue water"
          src="https://images.unsplash.com/photo-1643075301353-dc7db55ad49b?auto=format&fit=crop&w=900&q=85"
        />
      </motion.div>
      <div className="relative z-10 grid min-h-svh items-end px-5 pt-24 pb-8 md:px-8 md:pt-28 md:pb-10">
        <motion.div className="flex max-w-6xl flex-col items-start gap-7" {...fadeIn()}>
          <p className="max-w-[42rem] font-playful text-3xl leading-tight md:text-5xl">
            Seafood, bright spirits, and a room that keeps the afternoon glowing after dark.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              className="border border-aberdeen-peach px-5 py-3 font-utility text-sm tracking-[0.16em] uppercase transition hover:bg-aberdeen-peach hover:text-aberdeen-blue"
              href="#reservations"
            >
              Reserve a table
            </a>
            <a
              className="bg-aberdeen-peach px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-blue uppercase transition hover:bg-oyster-white"
              href="/menu/food"
            >
              View menu
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FramedPhoto({ alt, src }: { alt: string; src: string }) {
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
        <img alt={alt} className="h-full w-full object-cover" src={src} />
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
        <span
          className="h-8 w-8"
          key={background}
          style={{ background }}
        />
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

function IntroSection() {
  return (
    <section className="grid gap-10 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-24">
      <motion.div className="space-y-5" {...fadeIn()}>
        <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
          Richard DeShantz Restaurant Group
        </p>
        <MaritimeFlags />
      </motion.div>
      <motion.div className="max-w-4xl" {...fadeIn(0.1)}>
        <h2 className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
          Built like a coastal postcard, served with Savannah appetite.
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-8">
          Aberdeen is a bright, editorial restaurant centered on seafood, cocktails, and the easy
          ceremony of gathering around a good table.
        </p>
      </motion.div>
    </section>
  )
}

function MenuSection() {
  const menus = [
    {
      title: "Food",
      href: "/menu/food",
      image:
        "https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?auto=format&fit=crop&w=900&q=85",
      copy: "Cold oysters, coastal plates, and generous mains.",
      label: "Raw bar",
    },
    {
      title: "Spirits",
      href: "/menu/spirits",
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=85",
      copy: "Crisp cocktails, blue-hour pours, and bottles for the table.",
      label: "Blue hour",
    },
    {
      title: "Beverages",
      href: "/menu/beverages",
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85",
      copy: "Sparkling, zero-proof, coffee, tea, and easy afternoon refreshers.",
      label: "Sparkling",
    },
  ]

  return (
    <section className="bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <motion.div className="mb-10 flex items-end justify-between gap-6" {...fadeIn()}>
        <div>
          <h2 className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
            Menus
          </h2>
        </div>
        <a
          className="hidden font-utility text-sm tracking-[0.18em] text-aberdeen-blue uppercase underline decoration-citrus decoration-2 underline-offset-8 md:block"
          href="/menu/food"
        >
          View food menu
        </a>
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
            <RopeDivider className="rounded-none" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                src={menu.image}
              />
              <div className="absolute right-4 bottom-4 rounded-full border border-aberdeen-blue bg-oyster-white px-5 py-3 font-playful text-2xl leading-none text-aberdeen-blue">
                <p className="mt-1.25">{menu.label}</p>
              </div>
            </div>
            <div className="min-h-44 p-5">
              <h3 className="font-display text-5xl decoration-citrus decoration-2 underline-offset-8 group-hover:underline">
                {menu.title}
              </h3>
              <p className="mt-3 max-w-sm text-base leading-7 text-kelp-ink">{menu.copy}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

function GallerySection() {
  return (
    <section className="relative bg-aberdeen-peach py-16 md:py-24">
      <motion.div
        className="mb-10 flex items-center justify-between gap-6 px-5 md:px-8"
        {...fadeIn()}
      >
        <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
          From the scrapbook
        </p>
        <MaritimeFlags />
      </motion.div>
      <div className="grid grid-cols-2 gap-6 px-3 md:grid-cols-4 md:px-8">
        {[
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=85",
          "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=85",
          "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=900&q=85",
          "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=900&q=85",
        ].map((image, index) => (
          <motion.div
            className={`relative h-72 w-full md:h-[34rem] ${index % 2 === 0 ? "md:mt-12" : ""}`}
            key={image}
            {...fadeIn(index * 0.08)}
          >
            <img alt="" className="h-full w-full object-cover" src={image} />
            <PhotoCorners />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ReservationsSection() {
  return (
    <section
      className="grid gap-10 bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:grid-cols-[1fr_0.9fr] md:px-8 md:py-24"
      id="reservations"
    >
      <motion.div {...fadeIn()}>
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Reservations</p>
        <h2 className="mt-5 max-w-3xl font-display text-5xl leading-none md:text-8xl">
          Join us where the table catches the light.
        </h2>
      </motion.div>
      <motion.div
        className="relative self-end rotate-1 bg-oyster-white p-6 text-aberdeen-blue shadow-[10px_10px_0_#f7b733]"
        {...fadeIn(0.12)}
      >
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="font-utility text-xs tracking-[0.18em] uppercase">Postcard from</p>
            <p className="mt-2 font-playful text-5xl leading-none">Aberdeen</p>
          </div>
          <div className="grid h-20 w-16 place-items-center border border-dashed border-aberdeen-blue bg-aberdeen-peach p-2">
            <img alt="" className="h-full w-full object-contain" src="/circle-a-blue.png" />
          </div>
        </div>
        <p className="mb-6 text-lg leading-8">
          OpenTable will live here once the client provides the embed snippet.
        </p>
        <div className="mb-8 flex items-center justify-between gap-6">
          <Postmark />
          <MaritimeFlags />
        </div>
        <a
          className="inline-block bg-aberdeen-blue px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-peach uppercase"
          href="/contact"
        >
          Plan a visit
        </a>
      </motion.div>
    </section>
  )
}

function EventsSection() {
  return (
    <section className="grid gap-8 px-5 py-16 md:grid-cols-[1fr_1fr] md:px-8 md:py-24">
      <motion.h2
        className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl"
        {...fadeIn()}
      >
        Seasonal nights, private dinners, reasons to circle the date.
      </motion.h2>
      <motion.div
        className="relative self-end bg-oyster-white p-6 text-aberdeen-blue shadow-[8px_8px_0_rgba(42,59,146,0.18)]"
        {...fadeIn(0.12)}
      >
        <div className="mb-8 grid grid-cols-[auto_1fr] gap-5 border-b border-dotted border-aberdeen-blue/35 pb-5">
          <div className="grid h-20 w-20 place-items-center bg-citrus font-display text-5xl leading-none">
            06
          </div>
          <div>
            <p className="font-utility text-xs tracking-[0.18em] uppercase">Harbor ticket</p>
            <p className="mt-2 font-playful text-4xl leading-none">Seasonal Nights</p>
          </div>
        </div>
        <p className="text-lg leading-8">
          Aberdeen events bring the coastal mood into dinners, tastings, and gathered evenings built
          around the calendar.
        </p>
        <a
          className="mt-8 inline-block bg-aberdeen-blue px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-peach uppercase"
          href="/events"
        >
          View events
        </a>
      </motion.div>
    </section>
  )
}

export default HomePage
