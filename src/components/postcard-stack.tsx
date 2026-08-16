import { motion } from "motion/react"
import type { PostcardContent } from "../lib/menu"
import { Postcard } from "./postcard"

const initial = { opacity: 0, scale: 0.82, y: 24 }
const viewport = { amount: 0.55, once: false }
const cards = [
  { key: "one", position: { left: "-3%", top: "7%" }, rotate: -8 },
  { key: "two", position: { right: "-3%", top: "20%" }, rotate: 9 },
  { key: "three", position: { bottom: "6%", left: "10%" }, rotate: 6 },
].map((card, index) => ({
  key: card.key,
  style: { ...card.position, rotate: card.rotate, zIndex: index + 1 },
  whileInView: {
    opacity: 1,
    rotate: card.rotate,
    scale: 1,
    y: 0,
    transition: { delay: index * 0.12, duration: 0.576 },
  },
}))

export function PostcardStack({ postcards }: { postcards: PostcardContent[] }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-visible"
      data-testid="postcard-stack"
    >
      {postcards.map((postcard, index) => (
        <motion.div
          className="absolute aspect-[8/5] w-[min(74%,15rem)]"
          initial={initial}
          key={cards[index]?.key}
          style={cards[index]?.style}
          viewport={viewport}
          whileInView={cards[index]?.whileInView}
        >
          <Postcard
            imageAlt=""
            imageSrc={postcard.image}
            inverted={index === 1}
            message={postcard.message}
          />
        </motion.div>
      ))}
    </div>
  )
}
