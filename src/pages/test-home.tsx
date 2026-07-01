import { motion } from "motion/react"
import { Link } from "react-router"
import { fadeIn, fadeInPlace } from "../lib/motion"

const scrapbookImages = [
  {
    alt: "Sailboat on bright blue water",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
  },
  {
    alt: "Vintage poolside chairs in the sun",
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85",
  },
  {
    alt: "Cocktails by the water",
    src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85",
  },
]

const menus = [
  {
    title: "Raw Bar",
    copy: "Cold oysters, shellfish, lemon, and the good silver trays.",
    href: "/menu/food",
    image:
      "https://images.unsplash.com/photo-1679694140422-aecfd3d5dd0b?auto=format&fit=crop&w=900&q=85",
    sticker: "Shucked daily",
  },
  {
    title: "Blue Drinks",
    copy: "Martinis, spritzes, coastal classics, and boat-club pours.",
    href: "/menu/spirits",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=85",
    sticker: "Bar book",
  },
  {
    title: "Daylight",
    copy: "Sparkling, citrus, coffee, tea, and zero-proof refreshers.",
    href: "/menu/beverages",
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=85",
    sticker: "Poolside",
  },
]

const events = [
  ["06", "Oyster Hour", "Two coasts on ice, cold martinis, lemon, salt."],
  ["12", "Blue Spritz Night", "A house spritz list clipped from the bar notebook."],
  ["18", "Harbor Supper", "Whole fish, shellfish, shared sides, long tables."],
]

function TestHomePage() {
  return (
    <div className="overflow-hidden bg-aberdeen-peach">
      <HeroSection />
      <ScrapbookStrip />
      <MenuSection />
      <BoatClubSection />
      <FlagTabsSection />
      <MapRouteSection />
      <StickerLabSection />
      <EventsSection />
      <PostcardSection />
    </div>
  )
}

const tornClip =
  "polygon(0% 2%,7% 0%,15% 3%,24% 1%,34% 3%,43% 0%,55% 2%,66% 0%,75% 3%,86% 1%,100% 3%,98% 15%,100% 26%,97% 39%,100% 52%,98% 65%,100% 78%,97% 91%,99% 100%,88% 98%,76% 100%,64% 97%,52% 100%,39% 98%,27% 100%,15% 97%,3% 100%,1% 88%,3% 76%,0% 63%,2% 50%,0% 38%,3% 25%,0% 13%)"

function TornPaper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative bg-oyster-white p-3 shadow-[0_18px_34px_rgba(29,42,47,0.26)] ${className}`}
      style={{ clipPath: tornClip }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35 mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(42,59,146,0.16) 0 1px, transparent 1px), radial-gradient(circle at 70% 80%, rgba(29,42,47,0.12) 0 1px, transparent 1px)",
          backgroundSize: "18px 18px, 23px 23px",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

function CutImage({
  alt,
  className = "",
  src,
}: {
  alt: string
  className?: string
  src: string
}) {
  return (
    <img
      alt={alt}
      className={`object-cover shadow-[0_18px_34px_rgba(29,42,47,0.24)] ${className}`}
      src={src}
      style={{ clipPath: tornClip }}
    />
  )
}

function FramedPhoto({
  alt,
  className = "",
  src,
}: {
  alt: string
  className?: string
  src: string
}) {
  return (
    <div className={`relative aspect-[1339/1016] ${className}`}>
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
        <img
          alt={alt}
          className="h-full w-full object-cover"
          src={src}
        />
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
      className={`absolute z-20 h-8 w-24 rotate-[7deg] bg-oyster-white/70 shadow-sm ${className}`}
    />
  )
}

function PhotoCorners() {
  return (
    <>
      <span className="absolute top-3 left-3 z-20 h-12 w-12 border-t-8 border-l-8 border-oyster-white shadow-sm" />
      <span className="absolute top-3 right-3 z-20 h-12 w-12 border-t-8 border-r-8 border-oyster-white shadow-sm" />
      <span className="absolute bottom-3 left-3 z-20 h-12 w-12 border-b-8 border-l-8 border-oyster-white shadow-sm" />
      <span className="absolute right-3 bottom-3 z-20 h-12 w-12 border-r-8 border-b-8 border-oyster-white shadow-sm" />
    </>
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

function CompassStamp({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`grid h-28 w-28 rotate-[-10deg] place-items-center rounded-full border-2 border-aberdeen-blue text-aberdeen-blue ${className}`}
    >
      <div className="grid h-20 w-20 place-items-center rounded-full border border-aberdeen-blue/70">
        <div className="h-12 w-12 bg-aberdeen-blue [clip-path:polygon(50%_0,62%_38%,100%_50%,62%_62%,50%_100%,38%_62%,0_50%,38%_38%)]" />
      </div>
    </div>
  )
}

function ObjectSticker({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span
      className={`inline-grid h-20 w-20 place-items-center rounded-full border-[6px] border-oyster-white bg-citrus font-playful text-4xl leading-none text-aberdeen-blue shadow-[0_12px_24px_rgba(29,42,47,0.22)] ${className}`}
    >
      {children}
    </span>
  )
}

function WaveDivider() {
  return (
    <div
      aria-hidden="true"
      className="h-10 bg-aberdeen-blue"
      style={{
        clipPath:
          "polygon(0 45%,8% 25%,16% 45%,24% 65%,32% 45%,40% 25%,48% 45%,56% 65%,64% 45%,72% 25%,80% 45%,88% 65%,96% 45%,100% 35%,100% 100%,0 100%)",
      }}
    />
  )
}

function SignalFlags() {
  return (
    <div aria-hidden="true" className="flex gap-1.5">
      {["bg-citrus", "bg-shell-pink", "bg-aberdeen-blue", "bg-oyster-white", "bg-citrus"].map(
        (color, index) => (
          <span
            className={`h-8 w-5 border border-aberdeen-blue/30 ${color} ${
              index % 2 === 0 ? "[clip-path:polygon(0_0,100%_0,100%_70%,50%_100%,0_70%)]" : ""
            }`}
            key={`${color}-${index}`}
          />
        ),
      )}
    </div>
  )
}

function NauticalBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex rotate-[-4deg] items-center border border-aberdeen-blue bg-oyster-white px-3 py-2 font-utility text-xs tracking-[0.16em] text-aberdeen-blue uppercase shadow-[5px_5px_0_#f7b733]">
      {children}
    </span>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-svh bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt="Savannah square with trees and a monument"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=2000&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,rgba(42,59,146,0.92)_40%,rgba(42,59,146,0.48)_100%)]" />
      <motion.div
        className="relative z-10 grid min-h-svh items-end px-5 pt-28 pb-8 md:px-8 md:pb-10"
        {...fadeIn()}
      >
        <div className="max-w-6xl">
          <div className="mb-7 flex flex-wrap items-center gap-4">
            <NauticalBadge>Boat club notes</NauticalBadge>
            <SignalFlags />
          </div>
          <h1 className="max-w-5xl font-display text-6xl leading-none md:text-9xl">
            Aberdeen by sea, sun, and Savannah.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8">
            A scrapbook test for coastal dining, clipped postcards, bright drinks, shellfish, and a
            little Palm Springs boat-club energy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="bg-aberdeen-peach px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-blue uppercase transition hover:bg-oyster-white"
              href="#test-reservations"
            >
              Reserve
            </a>
            <Link
              className="border border-aberdeen-peach px-5 py-3 font-utility text-sm tracking-[0.16em] uppercase transition hover:bg-aberdeen-peach hover:text-aberdeen-blue"
              to="/menu/food"
            >
              View menus
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-4 bottom-6 z-10 hidden w-[24rem] rotate-3 text-aberdeen-blue md:block"
        {...fadeIn(0.18)}
      >
        <Tape className="top-0 left-32" />
        <div className="relative">
          <FramedPhoto
            alt="Poolside table with drinks and yellow chairs"
            className="w-full"
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85"
          />
          <div className="absolute top-4 right-3 z-20 rotate-6 rounded-full bg-citrus px-4 py-3 font-utility text-xs tracking-[0.14em] uppercase">
            Now hiring
          </div>
        </div>
        <p className="mt-3 w-fit bg-oyster-white px-4 py-3 font-playful text-3xl leading-none">
          Pool light, oyster ice, blue hour.
        </p>
      </motion.div>
    </section>
  )
}

function ScrapbookStrip() {
  return (
    <section className="bg-oyster-white px-5 py-14 md:px-8 md:py-20">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <motion.div {...fadeIn()}>
          <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
            Visual system test
          </p>
          <h2 className="mt-5 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
            Corners become little clipped stories.
          </h2>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-3">
          {scrapbookImages.map((image, index) => (
            <motion.figure
              className={`relative ${
                index === 0 ? "-rotate-2" : index === 1 ? "rotate-2 md:mt-12" : "-rotate-1"
              }`}
              key={image.src}
              {...fadeIn(index * 0.08)}
            >
              <Tape className="-top-3 left-1/2 -translate-x-1/2" />
              <CutImage alt={image.alt} className="aspect-[4/5] w-full" src={image.src} />
              <figcaption className="mt-3 w-fit bg-oyster-white px-3 py-2 font-utility text-xs tracking-[0.16em] text-aberdeen-blue uppercase shadow-sm">
                Clipped reference {index + 1}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function MenuSection() {
  return (
    <section className="bg-aberdeen-peach px-5 py-16 md:px-8 md:py-24">
      <motion.div className="mb-10 flex flex-wrap items-end justify-between gap-6" {...fadeIn()}>
        <div>
          <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
            Menus
          </p>
          <h2 className="mt-3 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
            Nautical labels, pasted over the good stuff.
          </h2>
        </div>
        <SignalFlags />
      </motion.div>
      <div className="grid gap-6 md:grid-cols-3">
        {menus.map((menu, index) => (
          <motion.article
            className={`relative text-aberdeen-blue ${index === 1 ? "md:mt-12" : ""}`}
            key={menu.title}
            {...fadeIn(index * 0.08)}
          >
            <div className="relative">
              <CutImage
                alt=""
                className="aspect-[4/5] w-full"
                src={menu.image}
              />
              <span className="absolute top-4 right-3 z-20 rotate-6 bg-citrus px-3 py-2 font-utility text-xs tracking-[0.14em] uppercase">
                {menu.sticker}
              </span>
              <span className="absolute top-20 left-4 z-20 rounded-full border border-aberdeen-blue bg-oyster-white px-4 py-3 font-playful text-2xl leading-none">
                {index === 0 ? "Oysters" : index === 1 ? "Spritz" : "Citrus"}
              </span>
              <div className="absolute right-4 bottom-4 left-4 z-20 rotate-[-1deg] bg-oyster-white p-5 shadow-[0_12px_24px_rgba(29,42,47,0.18)]">
                <h3 className="font-display text-5xl leading-none">{menu.title}</h3>
                <p className="mt-4 leading-7 text-kelp-ink/80">{menu.copy}</p>
                <Link
                  className="mt-6 inline-block font-utility text-sm tracking-[0.16em] uppercase underline decoration-citrus decoration-2 underline-offset-8"
                  to={menu.href}
                >
                  Open section
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function BoatClubSection() {
  return (
    <section className="grid gap-0 bg-aberdeen-blue text-aberdeen-peach md:grid-cols-[1.1fr_0.9fr]">
      <motion.div className="relative min-h-[34rem] p-5 md:min-h-[44rem] md:p-8" {...fadeIn()}>
        <CutImage
          alt="Restaurant table set with seafood and wine"
          className="h-full min-h-[32rem] w-full"
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=85"
        />
        <div className="absolute right-8 bottom-8 max-w-xs rotate-3 bg-aberdeen-peach p-5 text-aberdeen-blue shadow-[0_18px_34px_rgba(29,42,47,0.35)]">
          <p className="font-utility text-xs tracking-[0.18em] uppercase">Found object</p>
          <p className="mt-5 font-playful text-4xl leading-none">Savannah Yacht Lunch, clipped.</p>
        </div>
      </motion.div>
      <motion.div className="flex flex-col justify-center px-5 py-16 md:px-8 md:py-24" {...fadeIn(0.12)}>
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Boat club mood</p>
        <h2 className="mt-5 max-w-2xl font-display text-5xl leading-none md:text-7xl">
          Rope, flags, stamps, sun, and sharp blue shadows.
        </h2>
        <div className="mt-10 grid gap-4">
          {["Signal flag tabs", "Torn paper image frames", "Stamped reservation cards"].map(
            (item, index) => (
              <div
                className="flex items-center justify-between border-t border-aberdeen-peach/35 pt-4"
                key={item}
              >
                <p className="font-display text-3xl leading-none">{item}</p>
                <span className="font-utility text-xs tracking-[0.18em] uppercase">
                  0{index + 1}
                </span>
              </div>
            ),
          )}
        </div>
      </motion.div>
    </section>
  )
}

function FlagTabsSection() {
  const tabs = ["Food", "Spirits", "Beverages", "Private Parties", "Raw Bar"]

  return (
    <section className="bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <motion.div className="mb-10 grid gap-8 md:grid-cols-[0.8fr_1.2fr]" {...fadeIn()}>
        <div>
          <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
            Navigation test
          </p>
          <h2 className="mt-4 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
            Menu tabs as signal flags.
          </h2>
        </div>
        <div className="self-end">
          <RopeDivider />
        </div>
      </motion.div>
      <nav className="grid gap-4 md:grid-cols-5">
        {tabs.map((tab, index) => (
          <motion.a
            className={`relative min-h-36 border border-aberdeen-blue p-4 text-aberdeen-blue shadow-[7px_7px_0_rgba(42,59,146,0.16)] ${
              index % 2 === 0 ? "bg-citrus" : "bg-shell-pink"
            } ${index === 1 ? "rotate-2" : index === 3 ? "-rotate-2" : ""}`}
            href="#test-reservations"
            key={tab}
            {...fadeIn(index * 0.05)}
          >
            <span className="font-utility text-xs tracking-[0.18em] uppercase">Signal</span>
            <span className="mt-8 block font-display text-4xl leading-none">{tab}</span>
            <span className="absolute right-0 bottom-0 h-10 w-10 bg-oyster-white [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
          </motion.a>
        ))}
      </nav>
    </section>
  )
}

function MapRouteSection() {
  const stops = [
    ["01", "Dock"],
    ["02", "Raw bar"],
    ["03", "Blue room"],
    ["04", "After dinner"],
  ]

  return (
    <section className="relative bg-aberdeen-peach px-5 py-16 md:px-8 md:py-24">
      <motion.div className="relative z-10 max-w-5xl" {...fadeIn()}>
        <NauticalBadge>Map route idea</NauticalBadge>
        <h2 className="mt-6 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
          Dotted route lines can connect clipped moments.
        </h2>
      </motion.div>
      <div className="relative mt-12 grid gap-8 md:grid-cols-4">
        <div
          aria-hidden="true"
          className="absolute top-20 left-[8%] hidden h-1 w-[84%] border-t-4 border-dotted border-aberdeen-blue/45 md:block"
        />
        {stops.map(([number, label], index) => (
          <motion.div
            className={`relative z-10 ${index % 2 === 0 ? "-rotate-2" : "rotate-2 md:mt-20"}`}
            key={label}
            {...fadeIn(index * 0.08)}
          >
            <TornPaper className="min-h-56 text-aberdeen-blue">
              <PhotoCorners />
              <div className="grid h-16 w-16 place-items-center rounded-full bg-aberdeen-blue font-utility text-sm tracking-[0.16em] text-aberdeen-peach">
                {number}
              </div>
              <p className="mt-8 font-display text-4xl leading-none">{label}</p>
              <p className="mt-4 leading-7 text-kelp-ink/75">
                Small content cards can feel pinned along a coastal route.
              </p>
            </TornPaper>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function StickerLabSection() {
  return (
    <section className="bg-aberdeen-blue text-aberdeen-peach">
      <WaveDivider />
      <div className="grid gap-10 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-24">
        <motion.div className="relative min-h-[34rem]" {...fadeIn()}>
          <div className="absolute top-0 left-0 w-72 -rotate-3 text-aberdeen-blue">
            <Tape className="-top-4 left-20" />
            <CutImage
              alt="Oysters and lemons on ice"
              className="aspect-[4/5] w-full"
              src="https://images.unsplash.com/photo-1633321094192-388268512e0f?auto=format&fit=crop&w=700&q=85"
            />
            <span className="absolute right-2 bottom-16 z-20 rotate-12 bg-aberdeen-blue px-3 py-2 font-utility text-xs tracking-[0.14em] text-aberdeen-peach uppercase">
              Shell club
            </span>
          </div>
          <div className="absolute right-0 bottom-0 w-80 rotate-3 text-aberdeen-blue">
            <PhotoCorners />
            <CutImage
              alt="Boat on blue water"
              className="aspect-[5/4] w-full"
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=85"
            />
          </div>
          <ObjectSticker className="absolute top-40 left-52 rotate-12">⚓</ObjectSticker>
          <ObjectSticker className="absolute right-56 bottom-28 -rotate-12 bg-shell-pink">☼</ObjectSticker>
          <CompassStamp className="absolute top-10 right-20 bg-oyster-white/85" />
        </motion.div>
        <motion.div className="self-center" {...fadeIn(0.12)}>
          <p className="font-utility text-sm tracking-[0.22em] uppercase">Sticker lab</p>
          <h2 className="mt-5 max-w-3xl font-display text-5xl leading-none md:text-7xl">
            Object stickers, photo corners, stamps, wave breaks.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {["Compass stamp", "Anchor sticker", "Photo mounts", "Wave divider"].map((item) => (
              <div className="border-t border-aberdeen-peach/30 pt-4" key={item}>
                <p className="font-playful text-4xl leading-none">{item}</p>
                <p className="mt-3 text-sm leading-6 text-aberdeen-peach/75">
                  A louder motif to test whether it helps the scrapbook language.
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function EventsSection() {
  return (
    <section className="bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <motion.div className="mb-10 max-w-4xl" {...fadeIn()}>
        <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
          Bulletin board
        </p>
        <h2 className="mt-4 font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
          Events can feel like club flyers pinned near the bar.
        </h2>
      </motion.div>
      <div className="grid gap-5 md:grid-cols-3">
        {events.map(([day, title, copy], index) => (
          <motion.article
            className={`relative min-h-80 border border-aberdeen-blue bg-aberdeen-peach p-5 text-aberdeen-blue shadow-[8px_8px_0_rgba(42,59,146,0.18)] ${
              index === 0 ? "-rotate-1" : index === 1 ? "rotate-1 md:mt-10" : "-rotate-2"
            }`}
            key={title}
            {...fadeInPlace(index * 0.08)}
            style={{
              clipPath:
                index === 1
                  ? "polygon(0 0,100% 0,100% 100%,58% 100%,50% 90%,42% 100%,0 100%)"
                  : undefined,
            }}
          >
            <Tape className="-top-4 left-8" />
            {index === 2 ? <CompassStamp className="absolute top-4 right-5 h-20 w-20 opacity-30" /> : null}
            <p className="font-utility text-sm tracking-[0.2em] uppercase">June {day}</p>
            <h3 className="mt-12 font-display text-5xl leading-none">{title}</h3>
            <p className="mt-6 leading-7 text-kelp-ink/80">{copy}</p>
            <div className="absolute right-5 bottom-5 rounded-full border border-aberdeen-blue px-4 py-3 font-playful text-2xl">
              RSVP
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function PostcardSection() {
  return (
    <section
      className="grid gap-10 bg-aberdeen-peach px-5 py-16 text-aberdeen-blue md:grid-cols-[1fr_0.9fr] md:px-8 md:py-24"
      id="test-reservations"
    >
      <motion.div {...fadeIn()}>
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Reservations</p>
        <h2 className="mt-5 max-w-3xl font-display text-5xl leading-none md:text-8xl">
          Send yourself to the table.
        </h2>
      </motion.div>
      <motion.div
        className="relative rotate-1 border border-aberdeen-blue bg-oyster-white p-6 shadow-[10px_10px_0_#2a3b92]"
        {...fadeIn(0.12)}
      >
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="font-utility text-xs tracking-[0.18em] uppercase">Postcard from</p>
            <p className="mt-2 font-playful text-5xl leading-none">Aberdeen</p>
          </div>
          <div className="grid h-20 w-16 place-items-center border border-aberdeen-blue font-utility text-[0.65rem] tracking-[0.14em] uppercase">
            Stamp
          </div>
        </div>
        <p className="text-lg leading-8 text-kelp-ink/80">
          Test treatment for a reservation block: postal marks, paper texture, corner stickers, and
          a clear call to action.
        </p>
        <Link
          className="mt-8 inline-block bg-aberdeen-blue px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-peach uppercase"
          to="/contact"
        >
          Plan a visit
        </Link>
      </motion.div>
    </section>
  )
}

export default TestHomePage
