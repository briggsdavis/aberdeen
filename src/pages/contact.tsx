import { ParallaxLayer, Reveal, RevealImage, Rise } from "../components/motion"

function ContactPage() {
  return (
    <div className="overflow-hidden">
      <ParallaxLayer index={0}>
        <HeroSection />
      </ParallaxLayer>
      <ParallaxLayer index={1}>
        <ContactDetails />
      </ParallaxLayer>
      <ParallaxLayer index={2}>
        <MapSection />
      </ParallaxLayer>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="bg-aberdeen-blue text-aberdeen-peach">
      <div className="grid md:grid-cols-2">
        <div className="grid content-start gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
          <Reveal as="p" className="font-utility text-sm tracking-[0.22em] uppercase">
            Contact
          </Reveal>
          <Rise as="h1" className="font-display text-5xl leading-none md:text-7xl">
            Find the table, call the room, plan the night.
          </Rise>
        </div>
        <div className="relative order-first min-h-[40svh] md:order-none md:min-h-0">
          <RevealImage
            alt="Restaurant table set with glasses and warm light"
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1800&q=85"
          />
        </div>
      </div>
    </section>
  )
}

function ContactDetails() {
  return (
    <section className="grid gap-10 bg-oyster-white px-5 py-16 md:grid-cols-[1fr_1fr_1fr] md:px-8 md:py-24">
      {[
        ["Visit", "Savannah, Georgia", "Address coming soon"],
        ["Call", "Phone coming soon", "For reservations, private dinners, and general questions"],
        ["Write", "hello@aberdeen.example", "Press, events, and restaurant inquiries"],
      ].map(([label, lineOne, lineTwo]) => (
        <article className="border-t border-aberdeen-blue pt-5" key={label}>
          <Reveal
            as="p"
            className="font-utility text-sm tracking-[0.18em] text-aberdeen-blue uppercase"
          >
            {label}
          </Reveal>
          <Rise as="p" className="mt-8 font-display text-4xl leading-none text-aberdeen-blue">
            {lineOne}
          </Rise>
          <Reveal as="p" className="mt-5 leading-7 text-kelp-ink/80" delay={120}>
            {lineTwo}
          </Reveal>
        </article>
      ))}
    </section>
  )
}

function MapSection() {
  return (
    <section className="grid gap-0 bg-aberdeen-peach md:grid-cols-[0.9fr_1.1fr]">
      <div className="px-5 py-16 md:px-8 md:py-24">
        <Reveal
          as="p"
          className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase"
        >
          Hours
        </Reveal>
        <dl className="mt-10 space-y-5 text-lg">
          {[
            ["Monday - Thursday", "5 PM - 10 PM"],
            ["Friday", "5 PM - 11 PM"],
            ["Saturday", "4 PM - 11 PM"],
            ["Sunday", "4 PM - 9 PM"],
          ].map(([day, hours], index) => (
            <Reveal as="div" className="flex items-baseline gap-4" delay={index * 70} key={day}>
              <dt className="min-w-0 font-display text-2xl text-aberdeen-blue">{day}</dt>
              <span className="grow border-b border-dotted border-aberdeen-blue/25" />
              <dd className="font-utility text-sm tracking-[0.12em] text-aberdeen-blue uppercase">
                {hours}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
      <div className="min-h-[28rem] bg-aberdeen-blue p-3 md:p-8">
        <iframe
          className="h-full min-h-[28rem] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-popups"
          src="https://www.google.com/maps?q=Savannah%2C%20Georgia&output=embed"
          title="Map showing Savannah, Georgia"
        />
      </div>
    </section>
  )
}

export default ContactPage
