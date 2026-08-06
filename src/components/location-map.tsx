import { motion, useReducedMotion } from "motion/react"
import { googleMapsPlaceUrl } from "../lib/location"

type LocationMapProps = {
  location: string
}

const riverPath =
  "M-80 120C91 171 239 207 390 198C550 189 735 127 880 82V320C690 369 496 372 351 350C205 328 69 284-80 233Z"

const northShorePath = "M-80 0H880V82C735 127 550 189 390 198C239 207 91 171-80 120Z"

const southShorePath = "M-80 233C69 284 205 328 351 350C496 372 690 369 880 320V600H-80Z"

const locationStarInitial = { rotate: -18, scale: 0 }
const locationStarVisible = { rotate: 0, scale: 1 }
const locationStarTransition = {
  damping: 16,
  delay: 0.7,
  stiffness: 220,
  type: "spring" as const,
}
const locationStarViewport = { amount: 0.6, once: true }
const locationPulseInitial = { opacity: 0.65, scale: 0.7 }
const locationPulseVisible = { opacity: 0, scale: 1.65 }
const locationPulseTransition = {
  delay: 1.2,
  duration: 1.15,
  ease: "easeOut" as const,
  repeat: 2,
}
const boatAnimation = {
  left: ["-10%", "18%", "46%", "74%", "104%"],
  rotate: [-7, 4, 0, -7, -10],
  top: ["31%", "34%", "39%", "34%", "29%"],
}
const boatTransition = {
  duration: 14,
  ease: "easeInOut" as const,
  repeat: Infinity,
  repeatDelay: 1.5,
}

function Boat() {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 56 34">
      <path d="M7 15h42l-8 13H15Z" fill="var(--color-oyster-white)" />
      <path d="M20 7h17l5 8H17Z" fill="var(--color-nautical-red)" />
      <path d="M28 0h3v15h-3z" fill="var(--color-oyster-white)" />
      <path
        d="M2 31c8-4 13 4 21 0s13 4 21 0 8 0 10 1"
        fill="none"
        stroke="var(--color-citrus)"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  )
}

function LocationStar({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      className="group absolute top-[90%] left-[41%] z-10 -translate-x-1/2 -translate-y-1/2"
      initial={reducedMotion ? false : locationStarInitial}
      transition={locationStarTransition}
      viewport={locationStarViewport}
      whileInView={reducedMotion ? undefined : locationStarVisible}
    >
      <div className="relative grid h-12 w-12 place-items-center">
        {reducedMotion ? null : (
          <motion.span
            aria-hidden="true"
            className="absolute inset-1 rounded-full border-2 border-nautical-red"
            initial={locationPulseInitial}
            transition={locationPulseTransition}
            viewport={locationStarViewport}
            whileInView={locationPulseVisible}
          />
        )}
        <svg
          aria-hidden="true"
          className="relative h-full w-full drop-shadow-[0_5px_0_rgb(from_var(--color-kelp-ink)_r_g_b/0.12)]"
          viewBox="0 0 64 64"
        >
          <path
            d="m32 3 8.1 18.8 20.4 1.9-15.4 13.5 4.5 20-17.6-10.5-17.6 10.5 4.5-20L3.5 23.7l20.4-1.9Z"
            fill="var(--color-nautical-red)"
            stroke="var(--color-oyster-white)"
            strokeLinejoin="round"
            strokeWidth="4"
          />
        </svg>
        <span className="absolute top-1/2 left-11 -translate-y-1/2 border border-aberdeen-blue bg-oyster-white px-3 py-2 font-utility text-xs tracking-[0.16em] whitespace-nowrap text-aberdeen-blue uppercase shadow-[4px_4px_0_var(--color-citrus)] md:left-12">
          Aberdeen
        </span>
      </div>
    </motion.div>
  )
}

export function LocationMap({ location }: LocationMapProps) {
  const shouldReduceMotion = useReducedMotion() ?? false
  const placeUrl = googleMapsPlaceUrl(location)

  return (
    <a
      aria-label={`Open Aberdeen on Google Maps at ${location}`}
      className="group relative block h-full min-h-72 overflow-hidden bg-oyster-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-citrus"
      href={placeUrl}
      rel="noreferrer"
      target="_blank"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="-80 25 960 500"
      >
        <rect x="-80" width="960" height="600" fill="var(--color-oyster-white)" />

        <path d={northShorePath} fill="var(--color-aberdeen-peach)" />
        <g fill="var(--color-citrus)" opacity=".82">
          <circle cx="-31" cy="38" r="48" />
          <circle cx="45" cy="46" r="53" />
          <circle cx="119" cy="53" r="61" />
          <circle cx="199" cy="66" r="72" />
          <circle cx="289" cy="67" r="78" />
          <circle cx="384" cy="74" r="79" />
          <circle cx="482" cy="62" r="82" />
          <circle cx="582" cy="49" r="90" />
          <circle cx="689" cy="35" r="93" />
          <circle cx="782" cy="24" r="87" />
          <circle cx="863" cy="18" r="70" />
        </g>
        <g fill="var(--color-shell-pink)" opacity=".72">
          <circle cx="-13" cy="91" r="35" />
          <circle cx="85" cy="108" r="40" />
          <circle cx="172" cy="125" r="46" />
          <circle cx="270" cy="137" r="43" />
          <circle cx="371" cy="140" r="45" />
          <circle cx="480" cy="132" r="49" />
          <circle cx="594" cy="107" r="53" />
          <circle cx="712" cy="79" r="58" />
          <circle cx="824" cy="57" r="48" />
        </g>

        <path d={riverPath} fill="var(--color-aberdeen-blue)" />
        <text
          fill="var(--color-oyster-white)"
          fontFamily="var(--font-utility)"
          fontSize="21"
          letterSpacing="5"
          opacity=".88"
          transform="rotate(-3 529 266)"
          x="529"
          y="266"
        >
          SAVANNAH RIVER
        </text>

        <path d={southShorePath} fill="var(--color-oyster-white)" />
        <path
          d="M707 358c-15 57-15 118-34 162-11 25-28 50-45 80h103c-5-25-4-45 4-69 15-45 27-101 28-184Z"
          fill="var(--color-aberdeen-blue)"
        />
        <path
          d="M-80 255c156 51 289 87 433 107 169 23 347 15 527-28"
          fill="none"
          opacity=".75"
          stroke="var(--color-shell-pink)"
          strokeWidth="5"
        />

        <g fill="var(--color-aberdeen-peach)">
          <path d="m21 329 119 26-20 58L3 388Z" />
          <path d="m154 361 96 17-9 70-108-23Z" />
          <path d="m266 383 99 13-3 66-107-11Z" />
          <path d="m382 398 106 6 4 63-112-5Z" />
          <path d="m507 402 88-1 8 61-95 5Z" />
          <path d="m617 394 63-5-7 74-59-1Z" />
          <path d="m28 431 85 13-14 69-81-10Z" />
          <path d="m128 450 111 17-5 61-118-13Z" />
          <path d="m253 471 109 9 3 60-116-8Z" />
          <path d="m382 483 111 1 8 62-119-5Z" />
          <path d="m516 484 87-6 10 61-92 8Z" />
          <path d="m624 482 45-7-19 66-29-1Z" />
        </g>
        <g fill="var(--color-shell-pink)">
          <path d="m47 349 67 15-8 25-70-16Z" />
          <path d="m179 381 45 8-3 28-49-9Z" />
          <path d="m399 417 70 4 2 27-74-3Z" />
          <path d="m525 417 53-1 4 26-55 3Z" />
          <path d="m630 405 36-3-2 29-37 3Z" />
          <path d="m44 451 44 6-6 32-46-6Z" />
          <path d="m278 491 60 5 1 27-63-4Z" />
          <path d="m408 500 64 1 3 27-68-2Z" />
        </g>
        <g fill="none" stroke="var(--color-aberdeen-blue)" strokeWidth="5">
          <path d="M8 420c198 35 401 72 670 48" opacity=".38" />
          <path d="M0 520c217 29 437 43 632 30" opacity=".38" />
          <path d="m143 341-35 259" opacity=".28" />
          <path d="m252 367-10 233" opacity=".28" />
          <path d="m371 385 11 215" opacity=".28" />
          <path d="m497 389 23 211" opacity=".28" />
          <path d="m609 377 32 223" opacity=".28" />
        </g>
        <text
          fill="var(--color-aberdeen-blue)"
          fontFamily="var(--font-utility)"
          fontSize="16"
          fontWeight="700"
          letterSpacing="4"
          opacity=".65"
          transform="rotate(9 67 406)"
          x="67"
          y="406"
        >
          RIVER STREET
        </text>
        <g fill="var(--color-aberdeen-blue)" opacity=".55">
          <path d="M742 28h3v55h-3z" />
          <path d="m725 44 18-21 18 21-18-7Z" />
          <text fontFamily="var(--font-utility)" fontSize="13" fontWeight="700" x="738" y="101">
            N
          </text>
        </g>
      </svg>

      {shouldReduceMotion ? null : (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-[31%] left-[-10%] z-10 h-8 w-14"
          animate={boatAnimation}
          transition={boatTransition}
        >
          <Boat />
        </motion.div>
      )}

      <LocationStar reducedMotion={shouldReduceMotion} />

      <span className="absolute right-4 bottom-4 border border-aberdeen-blue bg-oyster-white px-3 py-2 font-utility text-xs tracking-[0.14em] text-aberdeen-blue uppercase shadow-[4px_4px_0_var(--color-citrus)] transition-transform group-hover:-translate-y-1 md:right-6 md:bottom-6">
        Google Maps ↗
      </span>
    </a>
  )
}
