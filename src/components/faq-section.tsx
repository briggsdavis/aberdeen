import { Plus } from "@phosphor-icons/react"
import { motion } from "motion/react"
import { useId, useState } from "react"
import { restaurantAddress } from "../lib/location"
import { fadeIn } from "../lib/motion"

const restaurantFaqs = [
  {
    question: "Do you take reservations?",
    answer: "Yes. Reservation links will be connected when booking opens.",
  },
  {
    question: "Do you host private events?",
    answer: "Yes. Aberdeen can shape group dinners and seasonal gatherings.",
  },
  {
    question: "Are menus seasonal?",
    answer: "Yes. Dishes and drinks shift with the catch, the market, and the weather.",
  },
  {
    question: "Where are you located?",
    answer: restaurantAddress,
  },
  {
    question: "Can you handle allergies?",
    answer: "Tell the team when booking and again when you arrive.",
  },
  {
    question: "Is there a raw bar?",
    answer: "Yes, oysters and chilled seafood are core to the room.",
  },
] as const

export const homepageFaqs = restaurantFaqs.slice(0, 3)

const iconClosed = { rotate: 0 }
const iconOpen = { rotate: 45 }
const iconTransition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }
const contentClosed = { height: 0, opacity: 0 }
const contentOpen = { height: "auto", opacity: 1 }
const contentTransition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const }

export function FaqSection({
  cmsKeyPrefix,
  ctaHref,
  ctaLabel,
  items = restaurantFaqs,
}: {
  cmsKeyPrefix: string
  ctaHref?: string
  ctaLabel?: string
  items?: readonly { answer: string; question: string }[]
}) {
  return (
    <section className="relative overflow-hidden bg-aberdeen-blue px-5 py-16 text-aberdeen-peach md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="font-display text-5xl leading-none md:text-7xl"
          data-cms-text-key={`${cmsKeyPrefix}.title`}
          {...fadeIn()}
        >
          Frequently asked
        </motion.h2>
        <div className="mt-10 border-t border-aberdeen-peach/35">
          {items.map((faq, index) => (
            <FaqItem
              answer={faq.answer}
              cmsKeyPrefix={cmsKeyPrefix}
              index={index}
              key={faq.question}
              question={faq.question}
            />
          ))}
        </div>
        {ctaHref && ctaLabel ? (
          <motion.a
            className="aberdeen-action mt-10 bg-aberdeen-peach text-aberdeen-blue"
            data-cms-link-key={`${cmsKeyPrefix}.link`}
            href={ctaHref}
            {...fadeIn(0.15)}
          >
            {ctaLabel}
          </motion.a>
        ) : null}
      </div>
    </section>
  )
}

function FaqItem({
  answer,
  cmsKeyPrefix,
  index,
  question,
}: {
  answer: string
  cmsKeyPrefix: string
  index: number
  question: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const contentId = useId()

  return (
    <motion.div className="border-b border-aberdeen-peach/35" {...fadeIn(index * 0.05)}>
      <button
        aria-controls={contentId}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-2xl leading-tight md:text-3xl"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span data-cms-text-key={`${cmsKeyPrefix}.${index + 1}.question`}>{question}</span>
        <motion.span
          animate={isOpen ? iconOpen : iconClosed}
          aria-hidden="true"
          className="shrink-0"
          transition={iconTransition}
        >
          <Plus size={24} />
        </motion.span>
      </button>
      <motion.div
        animate={isOpen ? contentOpen : contentClosed}
        aria-hidden={!isOpen}
        className="overflow-hidden"
        id={contentId}
        initial={false}
        transition={contentTransition}
      >
        <p
          className="max-w-3xl pb-7 text-lg leading-8 text-aberdeen-peach/80"
          data-cms-text-key={`${cmsKeyPrefix}.${index + 1}.answer`}
        >
          {answer}
        </p>
      </motion.div>
    </motion.div>
  )
}
