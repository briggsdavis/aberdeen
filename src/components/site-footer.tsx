function SiteFooter() {
  return (
    <footer className="bg-oyster-white px-5 pt-12 pb-5 text-aberdeen-blue md:px-8">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <img alt="Aberdeen" className="w-64 md:w-96" src="/wordmark-blue.png" />
        </div>
        <div>
          <p className="font-utility text-sm tracking-[0.18em] uppercase">Visit</p>
          <p className="mt-4 leading-7 text-kelp-ink">
            Savannah, Georgia
            <br />
            Address coming soon
          </p>
        </div>
        <div>
          <p className="font-utility text-sm tracking-[0.18em] uppercase">Hours</p>
          <p className="mt-4 leading-7 text-kelp-ink">
            Dinner daily
            <br />
            Full hours coming soon
          </p>
        </div>
      </div>
      <div className="mt-12 border-t border-aberdeen-blue/15 pt-5 pb-1">
        <p className="font-utility text-xs tracking-[0.14em] text-aberdeen-blue/60 uppercase">
          Made by{" "}
          <a
            className="underline decoration-citrus decoration-2 underline-offset-4"
            href="https://socialsatisfaction.agency"
            rel="noreferrer"
            target="_blank"
          >
            Social Satisfaction
          </a>
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
