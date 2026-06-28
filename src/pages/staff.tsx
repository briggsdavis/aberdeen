import { ParallaxLayer, Reveal, RevealImage, Rise } from "../components/motion"

const staff = [
  {
    name: "Marin Vale",
    role: "Executive Chef",
    note: "Builds the menu around shellfish, citrus, smoke, and the day's best catch.",
    image:
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Elliot Crane",
    role: "Chef de Cuisine",
    note: "Keeps the line precise, fast, and generous.",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Simone Hart",
    role: "Beverage Director",
    note: "Writes the drinks list in blue, citrus, salt, and sparkle.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Theo Banks",
    role: "General Manager",
    note: "Makes the room feel easy before the first glass lands.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "June Mercer",
    role: "Events Lead",
    note: "Shapes private dinners, seasonal nights, and celebrations around the table.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Nico Reyes",
    role: "Raw Bar Lead",
    note: "Keeps the ice cold, the oysters clean, and the counter moving.",
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=900&q=85",
  },
]

function StaffPage() {
  return (
    <div className="overflow-hidden">
      <ParallaxLayer index={0}>
        <HeroSection />
      </ParallaxLayer>
      <ParallaxLayer index={1}>
        <RosterSection />
      </ParallaxLayer>
      <ParallaxLayer index={2}>
        <HiringSection />
      </ParallaxLayer>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative bg-aberdeen-blue text-aberdeen-peach">
      <RevealImage
        alt="Restaurant team preparing a dining room"
        className="absolute inset-y-0 right-0 h-full w-full object-cover mix-blend-luminosity md:w-[52%]"
        finalOpacity={0.4}
        src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,rgba(42,59,146,0.92)_45%,rgba(42,59,146,0)_100%)]" />
      <div className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <Reveal as="p" className="font-utility text-sm tracking-[0.22em] uppercase">
          Staff
        </Reveal>
        <Rise as="h1" className="max-w-5xl font-display text-6xl leading-none md:text-8xl">
          The people who keep the room glowing.
        </Rise>
      </div>
    </section>
  )
}

function RosterSection() {
  return (
    <section className="bg-oyster-white px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-5 md:grid-cols-3">
        {staff.map((person, index) => (
          <article
            className={`group relative bg-aberdeen-peach text-aberdeen-blue ${
              index % 3 === 1 ? "md:mt-16" : index % 3 === 2 ? "md:mt-8" : ""
            }`}
            key={person.name}
          >
            <div className="aspect-[3/4] overflow-hidden">
              <div className="h-full w-full transition duration-700 group-hover:scale-105">
                <RevealImage
                  alt={person.name}
                  className="h-full w-full object-cover"
                  src={person.image}
                />
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-aberdeen-blue px-3 py-2 font-utility text-xs tracking-[0.16em] text-aberdeen-peach uppercase">
              {person.role}
            </div>
            <Reveal className="p-5" delay={(index % 3) * 90}>
              <h2 className="font-display text-4xl leading-none">{person.name}</h2>
              <p className="mt-4 leading-7 text-kelp-ink/80">{person.note}</p>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  )
}

function HiringSection() {
  return (
    <section className="grid gap-10 bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:grid-cols-[1fr_0.9fr] md:px-8 md:py-24">
      <Rise as="h2" className="max-w-3xl font-playful text-5xl leading-none md:text-7xl">
        Hospitality is the house style.
      </Rise>
      <Reveal as="p" className="self-end text-lg leading-8" delay={120}>
        The Aberdeen team is built around warmth, precision, and the good timing that makes a busy
        room feel effortless.
      </Reveal>
    </section>
  )
}

export default StaffPage
