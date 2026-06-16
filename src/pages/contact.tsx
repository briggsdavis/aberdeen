function ContactPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <ContactDetails />
      <MapSection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt="Restaurant table set with glasses and warm light"
        className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-40 mix-blend-luminosity md:w-[52%]"
        src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,rgba(42,59,146,0.96)_45%,rgba(42,59,146,0.34)_100%)]" />
      <div className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <p className="font-utility text-sm tracking-[0.22em] uppercase">Contact</p>
        <h1 className="max-w-5xl font-display text-6xl leading-none md:text-8xl">
          Find the table, call the room, plan the night.
        </h1>
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
          <p className="font-utility text-sm tracking-[0.18em] text-aberdeen-blue uppercase">
            {label}
          </p>
          <p className="mt-8 font-display text-4xl leading-none text-aberdeen-blue">{lineOne}</p>
          <p className="mt-5 leading-7 text-kelp-ink/80">{lineTwo}</p>
        </article>
      ))}
    </section>
  )
}

function MapSection() {
  return (
    <section className="grid gap-0 bg-aberdeen-peach md:grid-cols-[0.9fr_1.1fr]">
      <div className="px-5 py-16 md:px-8 md:py-24">
        <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">Hours</p>
        <dl className="mt-10 space-y-5 text-lg">
          {[
            ["Monday - Thursday", "5 PM - 10 PM"],
            ["Friday", "5 PM - 11 PM"],
            ["Saturday", "4 PM - 11 PM"],
            ["Sunday", "4 PM - 9 PM"],
          ].map(([day, hours]) => (
            <div className="flex items-baseline gap-4" key={day}>
              <dt className="min-w-0 font-display text-2xl text-aberdeen-blue">{day}</dt>
              <span className="grow border-b border-dotted border-aberdeen-blue/25" />
              <dd className="font-utility text-sm tracking-[0.12em] text-aberdeen-blue uppercase">
                {hours}
              </dd>
            </div>
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
