import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { useCmsRuntime } from "../lib/cms-runtime"
import { CursorCompass } from "./decorative-media"
import { TransitionLink } from "./page-transition"

const pageLinks = [
  ["About", "/about"],
  ["Events", "/events"],
  ["Our Team", "/staff"],
  ["Contact", "/contact"],
]

const hours = [
  ["Monday – Thursday", "5 PM – 10 PM"],
  ["Friday – Saturday", "4 PM – 11 PM"],
  ["Sunday", "4 PM – 9 PM"],
]

function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  })
  const footerY = useTransform(scrollYProgress, [0, 1], [42, 0])
  const currentYear = new Date().getFullYear()
  const { menuPages, site } = useCmsRuntime()
  const visiblePageLinks = [
    pageLinks[0]!,
    ...(menuPages?.length
      ? menuPages.map((page) => [page.title, `/menu/${page.slug}`])
      : [
          ["Food", "/menu/food"],
          ["Spirits", "/menu/spirits"],
          ["Beverages", "/menu/beverages"],
        ]),
    ...pageLinks.slice(1),
  ]
  const visibleHours = site?.openingHours.length
    ? site.openingHours.map(({ label, value }) => [label, value])
    : hours
  const address = site?.settings.address ?? "123 Harbor Way\nSavannah, Georgia 31401"
  const phone = site?.settings.phone ?? "(912) 555-0147"
  const email = site?.settings.email ?? "hello@aberdeen.example"
  const tagline = site?.settings.footerTagline ?? "Seafood, bright spirits, good evenings."
  const copyright = site?.settings.footerCopyright ?? "Aberdeen. All rights reserved."

  return (
    <footer
      className="site-footer overflow-hidden bg-oyster-white px-5 py-6 text-aberdeen-blue md:px-8 md:py-7"
      ref={footerRef}
    >
      <motion.div
        className="flex min-h-[70svh] flex-col"
        style={{ y: shouldReduceMotion ? 0 : footerY }}
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div>
            <p className="font-utility text-xs tracking-[0.24em] uppercase">A table by the water</p>
            <img
              alt="Aberdeen"
              className="mt-4 w-full max-w-md"
              src="/brand/aberdeen-wordmark-blue.png"
            />
          </div>
          <div className="mx-auto w-28 lg:mx-0 lg:w-32">
            <CursorCompass />
          </div>
          <p className="max-w-lg font-playful text-2xl leading-tight text-aberdeen-blue md:text-3xl lg:justify-self-end">
            {tagline}
          </p>
        </div>

        <div aria-hidden="true" className="h-5 md:h-7" />

        <div className="grid grow content-start gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div>
            <p className="font-utility text-xs tracking-[0.2em] uppercase">Explore</p>
            <nav aria-label="Footer navigation" className="mt-5 grid gap-2">
              {visiblePageLinks.map(([label, to]) => (
                <TransitionLink
                  className="menu-tab-underline w-fit font-display text-xl leading-none"
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
              <p className="leading-7 whitespace-pre-line">{address}</p>
              <p>{phone}</p>
              <p>{email}</p>
              {site?.socialLinks.some((social) => social.url) ? (
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {site.socialLinks
                    .filter((social) => social.url)
                    .map((social) => (
                      <a
                        className="underline decoration-citrus decoration-2 underline-offset-4"
                        href={social.url}
                        key={social._id}
                      >
                        {social.platform}
                      </a>
                    ))}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <p className="font-utility text-xs tracking-[0.2em] uppercase">Hours</p>
            <dl className="mt-5 space-y-3 text-sm text-kelp-ink">
              {visibleHours.map(([day, time]) => (
                <div className="flex items-baseline gap-3" key={day}>
                  <dt>{day}</dt>
                  <span className="min-w-4 grow border-b border-dotted border-aberdeen-blue/25" />
                  <dd className="shrink-0 font-utility text-sm tracking-[0.08em] uppercase">
                    {time}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-5 border-t border-aberdeen-blue/20 pt-3">
          <div className="flex flex-col gap-4 font-utility text-[0.68rem] tracking-[0.13em] text-aberdeen-blue/65 uppercase md:flex-row md:items-center md:justify-between">
            <p>
              © {currentYear} {copyright}
            </p>
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
      </motion.div>
    </footer>
  )
}

export default SiteFooter
