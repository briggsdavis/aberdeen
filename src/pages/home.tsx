import { Link } from "react-router"
import { ParallaxLayer, RevealImage, Rise } from "../components/motion"

function HomePage() {
  return (
    <div className="overflow-hidden">
      <ParallaxLayer index={0}>
        <HeroSection />
      </ParallaxLayer>
      <ParallaxLayer index={1}>
        <IntroSection />
      </ParallaxLayer>
      <ParallaxLayer index={2}>
        <MenuSection />
      </ParallaxLayer>
      <ParallaxLayer index={3}>
        <GallerySection />
      </ParallaxLayer>
      <ParallaxLayer index={4}>
        <ReservationsSection />
      </ParallaxLayer>
      <ParallaxLayer index={5}>
        <EventsSection />
      </ParallaxLayer>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-svh bg-aberdeen-blue text-aberdeen-peach">
      <RevealImage
        alt="Sunlit coastal restaurant dining room"
        className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-45 mix-blend-luminosity md:w-[58%]"
        src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,rgba(42,59,146,0.92)_42%,rgba(42,59,146,0)_100%)]" />
      <aside className="absolute right-5 bottom-8 z-10 hidden w-72 bg-aberdeen-peach p-5 text-aberdeen-blue md:right-8 md:bottom-10 md:block">
        <p className="font-utility text-xs tracking-[0.18em] uppercase">Today at the bar</p>
        <ul className="mt-8 space-y-5">
          {["East Coast oysters", "Blue Hour Martini", "Citrus olive oil cake"].map((item) => (
            <li
              className="border-t border-aberdeen-blue pt-3 font-display text-2xl leading-none"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>
      <div className="relative z-10 grid min-h-svh items-end px-5 pt-24 pb-8 md:px-8 md:pt-28 md:pb-10">
        <div className="flex max-w-6xl flex-col items-start gap-7">
          <Rise as="p" className="max-w-[42rem] font-playful text-3xl leading-tight md:text-5xl">
            Seafood, bright spirits, and a room that keeps the afternoon glowing after dark.
          </Rise>
          <div className="flex flex-wrap items-center gap-3">
            <a
              className="border border-aberdeen-peach px-5 py-3 font-utility text-sm tracking-[0.16em] uppercase transition hover:bg-aberdeen-peach hover:text-aberdeen-blue"
              href="#reservations"
            >
              Reserve a table
            </a>
            <Link
              className="bg-aberdeen-peach px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-blue uppercase transition hover:bg-citrus"
              to="/menu/food"
            >
              View menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function IntroSection() {
  return (
    <section className="grid gap-10 bg-aberdeen-peach px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-24">
      <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
        Richard DeShantz Restaurant Group
      </p>
      <div className="max-w-4xl">
        <Rise as="h2" className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
          Built like a coastal postcard, served with Savannah appetite.
        </Rise>
        <p className="mt-8 max-w-2xl text-lg leading-8">
          Aberdeen is a bright, editorial restaurant centered on seafood, cocktails, and the easy
          ceremony of gathering around a good table.
        </p>
      </div>
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
    },
    {
      title: "Spirits",
      href: "/menu/spirits",
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=85",
      copy: "Crisp cocktails, blue-hour pours, and bottles for the table.",
    },
    {
      title: "Beverages",
      href: "/menu/beverages",
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85",
      copy: "Sparkling, zero-proof, coffee, tea, and easy afternoon refreshers.",
    },
  ]

  return (
    <section className="bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <Rise as="h2" className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
          Menus
        </Rise>
        <Link
          className="hidden font-utility text-sm tracking-[0.18em] text-aberdeen-blue uppercase underline decoration-citrus decoration-2 underline-offset-8 md:block"
          to="/menu/food"
        >
          View food menu
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {menus.map((menu) => (
          <Link
            aria-label={`View ${menu.title} menu`}
            className="group block bg-aberdeen-peach text-aberdeen-blue"
            key={menu.title}
            to={menu.href}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <div className="h-full w-full transition duration-700 group-hover:scale-105">
                <RevealImage alt="" className="h-full w-full object-cover" src={menu.image} />
              </div>
            </div>
            <div className="min-h-44 p-5">
              <h3 className="font-display text-5xl">{menu.title}</h3>
              <p className="mt-3 max-w-sm text-base leading-7 text-kelp-ink">{menu.copy}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function GallerySection() {
  return (
    <section className="relative bg-aberdeen-peach py-16 md:py-24">
      <div className="grid grid-cols-2 gap-3 px-3 md:grid-cols-4 md:px-8">
        {[
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=85",
          "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=85",
          "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=900&q=85",
          "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=900&q=85",
        ].map((image, index) => (
          <RevealImage
            alt=""
            className={`h-72 w-full object-cover md:h-[34rem] ${index % 2 === 0 ? "md:mt-12" : ""}`}
            key={image}
            src={image}
          />
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
      <div>
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Reservations</p>
        <Rise as="h2" className="mt-5 max-w-3xl font-display text-5xl leading-none md:text-8xl">
          Join us where the table catches the light.
        </Rise>
      </div>
      <div className="self-end border border-aberdeen-peach p-5">
        <p className="mb-6 text-lg leading-8">
          OpenTable will live here once the client provides the embed snippet.
        </p>
        <Link
          className="inline-block bg-aberdeen-peach px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-blue uppercase"
          to="/contact"
        >
          Plan a visit
        </Link>
      </div>
    </section>
  )
}

function EventsSection() {
  return (
    <section className="grid gap-8 bg-aberdeen-peach px-5 py-16 md:grid-cols-[1fr_1fr] md:px-8 md:py-24">
      <Rise as="h2" className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
        Seasonal nights, private dinners, reasons to circle the date.
      </Rise>
      <div className="self-end">
        <p className="text-lg leading-8">
          Aberdeen events bring the coastal mood into dinners, tastings, and gathered evenings built
          around the calendar.
        </p>
        <Link
          className="mt-8 inline-block border border-aberdeen-blue px-5 py-3 font-utility text-sm tracking-[0.16em] text-aberdeen-blue uppercase"
          to="/events"
        >
          View events
        </Link>
      </div>
    </section>
  )
}

export default HomePage
