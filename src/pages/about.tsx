function AboutPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <StorySection />
      <GroupSection />
      <RoomSection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative bg-aberdeen-blue text-aberdeen-peach">
      <img
        alt="Sunlit restaurant table with glassware and coastal plates"
        className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-40 mix-blend-luminosity md:w-[55%]"
        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#2A3B92_0%,rgba(42,59,146,0.96)_45%,rgba(42,59,146,0.34)_100%)]" />
      <div className="relative z-10 grid gap-10 px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <p className="font-utility text-sm tracking-[0.22em] uppercase">About Aberdeen</p>
        <h1 className="max-w-5xl font-display text-6xl leading-none md:text-8xl">
          A coastal room with a Pittsburgh pulse.
        </h1>
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section className="grid gap-12 bg-oyster-white px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-24">
      <p className="font-playful text-3xl leading-tight font-bold text-aberdeen-blue md:text-5xl">
        The story
      </p>
      <div className="max-w-4xl space-y-8">
        <h2 className="font-display text-5xl leading-none text-aberdeen-blue md:text-7xl">
          Seafood, bright spirits, and a dining room made for lingering.
        </h2>
        <p className="max-w-3xl text-lg leading-8">
          Aberdeen brings coastal ease to the city: oysters on ice, citrus-forward plates, generous
          mains, and a bar that keeps the evening moving. The feeling is editorial but relaxed, like
          a postcard from somewhere sunnier pinned to a Pittsburgh wall.
        </p>
      </div>
    </section>
  )
}

function GroupSection() {
  return (
    <section className="bg-aberdeen-peach px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-8 md:grid-cols-[1fr_1fr_1fr]">
        {[
          [
            "01",
            "From the group",
            "A restaurant shaped with the polish and hospitality of Richard DeShantz Restaurant Group.",
          ],
          [
            "02",
            "From the water",
            "A menu language of shellfish, whole fish, citrus, herbs, brine, butter, and cold glass.",
          ],
          [
            "03",
            "For the room",
            "A place for early drinks, long dinners, date nights, celebrations, and one more round.",
          ],
        ].map(([label, title, copy]) => (
          <article className="border-t border-aberdeen-blue pt-5" key={title}>
            <p className="font-utility text-sm tracking-[0.18em] text-aberdeen-blue uppercase">
              {label}
            </p>
            <h3 className="mt-8 font-display text-4xl leading-none text-aberdeen-blue">{title}</h3>
            <p className="mt-5 leading-7 text-kelp-ink/80">{copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function RoomSection() {
  return (
    <section className="grid gap-3 bg-aberdeen-blue p-3 md:grid-cols-[1.2fr_0.8fr] md:gap-8 md:p-8">
      <img
        alt="Restaurant bar with warm lights and bottles"
        className="h-[30rem] w-full object-cover md:h-[42rem]"
        src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=85"
      />
      <div className="grid gap-3 md:gap-8">
        <img
          alt="Seafood dish with wine on a dining table"
          className="h-64 w-full object-cover md:h-full"
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1000&q=85"
        />
        <div className="bg-aberdeen-peach p-6 text-aberdeen-blue md:p-8">
          <p className="font-utility text-sm tracking-[0.18em] uppercase">The room</p>
          <p className="mt-6 font-playful text-4xl leading-none">
            Bright by day. Blue by night. Always built around the table.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
