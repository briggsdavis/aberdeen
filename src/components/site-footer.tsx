import { Reveal, RevealImage } from "./motion"

function SiteFooter() {
  return (
    <footer className="bg-oyster-white px-5 py-12 text-aberdeen-blue md:px-8">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <RevealImage alt="Aberdeen" className="w-64 md:w-96" src="/wordmark-blue.png" />
        </div>
        <div>
          <Reveal as="p" className="font-utility text-sm tracking-[0.18em] uppercase" delay={80}>
            Visit
          </Reveal>
          <Reveal as="p" className="mt-4 leading-7 text-kelp-ink" delay={160}>
            Savannah, Georgia
            <br />
            Address coming soon
          </Reveal>
        </div>
        <div>
          <Reveal as="p" className="font-utility text-sm tracking-[0.18em] uppercase" delay={120}>
            Hours
          </Reveal>
          <Reveal as="p" className="mt-4 leading-7 text-kelp-ink" delay={200}>
            Dinner daily
            <br />
            Full hours coming soon
          </Reveal>
        </div>
      </div>
      <Reveal className="mt-12 border-t border-aberdeen-blue/20 pt-6">
        <p className="font-utility text-xs tracking-[0.16em] text-aberdeen-blue/70 uppercase">
          Made by{" "}
          <a
            className="underline decoration-citrus decoration-2 underline-offset-4 transition hover:text-aberdeen-blue"
            href="https://socialsatisfaction.agency/"
            rel="noreferrer"
            target="_blank"
          >
            SocialSatisfaction
          </a>
        </p>
      </Reveal>
    </footer>
  )
}

export default SiteFooter
