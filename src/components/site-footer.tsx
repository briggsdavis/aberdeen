import { CursorCompass } from "./decorative-media"
import { NauticalCoordinates } from "./nautical-details"
import { TransitionLink } from "./page-transition"

const pageLinks = [
  ["About", "/about"],
  ["Food", "/menu/food"],
  ["Spirits", "/menu/spirits"],
  ["Beverages", "/menu/beverages"],
  ["Events", "/events"],
  ["Our Team", "/staff"],
  ["Contact", "/contact"],
]

const hours = [
  ["Monday – Thursday", "5 PM – 10 PM"],
  ["Friday", "5 PM – 11 PM"],
  ["Saturday", "4 PM – 11 PM"],
  ["Sunday", "4 PM – 9 PM"],
]

function DecorativeRule() {
  return (
    <div
      aria-hidden="true"
      className="h-2 w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg,#2a3b92 0 8px,transparent 8px 15px,#f7b733 15px 19px,transparent 19px 27px)",
      }}
    />
  )
}

function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer flex min-h-svh flex-col bg-oyster-white px-5 py-8 text-aberdeen-blue md:px-8 md:py-10 lg:h-svh lg:overflow-hidden">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <p className="font-utility text-xs tracking-[0.24em] uppercase">A table by the water</p>
          <img alt="Aberdeen" className="mt-4 w-full max-w-md" src="/wordmark-blue.png" />
        </div>
        <p className="max-w-lg font-playful text-2xl leading-tight text-aberdeen-blue md:text-3xl lg:justify-self-end">
          Seafood, bright spirits, good evenings.
        </p>
      </div>

      <div className="my-6 md:my-8">
        <DecorativeRule />
      </div>

      <div className="grid grow content-start gap-9 md:grid-cols-2 lg:grid-cols-[0.8fr_1fr_0.9fr_1.3fr] lg:gap-10">
        <div>
          <p className="font-utility text-xs tracking-[0.2em] uppercase">Explore</p>
          <nav aria-label="Footer navigation" className="mt-5 grid gap-2">
            {pageLinks.map(([label, to]) => (
              <TransitionLink
                className="w-fit font-display text-xl leading-none decoration-citrus decoration-2 underline-offset-6 hover:underline"
                key={to}
                to={to}
              >
                {label}
              </TransitionLink>
            ))}
          </nav>
        </div>

        <div>
          <p className="font-utility text-xs tracking-[0.2em] uppercase">Visit & call</p>
          <div className="mt-5 space-y-4 text-sm text-kelp-ink">
            <NauticalCoordinates className="flex-wrap gap-y-2" />
            <p className="leading-7">
              Savannah, Georgia
              <br />
              Address and telephone coming soon
            </p>
            <a
              className="inline-block underline decoration-citrus decoration-2 underline-offset-4"
              href="mailto:hello@aberdeen.example"
            >
              hello@aberdeen.example
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start md:col-span-2 lg:col-span-1">
          <p className="mb-4 font-utility text-xs tracking-[0.2em] uppercase">Find your bearing</p>
          <CursorCompass />
        </div>

        <div>
          <p className="font-utility text-xs tracking-[0.2em] uppercase">Tentative hours</p>
          <dl className="mt-5 space-y-2 text-xs text-kelp-ink">
            {hours.map(([day, time]) => (
              <div className="flex items-baseline gap-3" key={day}>
                <dt>{day}</dt>
                <span className="min-w-4 grow border-b border-dotted border-aberdeen-blue/25" />
                <dd className="shrink-0 font-utility text-xs tracking-[0.08em] uppercase">
                  {time}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 border-t border-aberdeen-blue/20 pt-5">
            <p className="font-utility text-xs tracking-[0.2em] uppercase">Plan your evening</p>
            <TransitionLink
              className="aberdeen-action mt-4 bg-aberdeen-blue text-aberdeen-peach"
              to="/contact"
            >
              Contact Aberdeen
            </TransitionLink>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-aberdeen-blue/20 pt-4">
        <div className="flex flex-col gap-4 font-utility text-[0.68rem] tracking-[0.13em] text-aberdeen-blue/65 uppercase md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Aberdeen. All rights reserved.</p>
          <p>
            Part of{" "}
            <a
              className="underline decoration-citrus decoration-2 underline-offset-4"
              href="https://richarddeshantz.com/"
              rel="noreferrer"
              target="_blank"
            >
              Richard DeShantz Restaurant Group
            </a>
          </p>
          <p>
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
      </div>
    </footer>
  )
}

export default SiteFooter
