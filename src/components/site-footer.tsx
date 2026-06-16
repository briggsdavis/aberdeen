function SiteFooter() {
  return (
    <footer className="bg-oyster-white px-5 py-12 text-aberdeen-blue md:px-8">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <img alt="Aberdeen" className="w-64 md:w-96" src="/wordmark-blue.png" />
        </div>
        <div>
          <p className="font-utility text-sm tracking-[0.18em] uppercase">Visit</p>
          <p className="mt-4 leading-7 text-kelp-ink">
            Pittsburgh, Pennsylvania
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
    </footer>
  )
}

export default SiteFooter
