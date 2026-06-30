export const fadeIn = (delay = 0) => {
  return {
    initial: { opacity: 0, y: 18 },
    transition: { delay, duration: 0.55, ease: "easeOut" },
    viewport: { amount: 0.2, once: true },
    whileInView: { opacity: 1, y: 0 },
  } as const
}

export const fadeInPlace = (delay = 0) => {
  return {
    initial: { opacity: 0 },
    transition: { delay, duration: 0.55, ease: "easeOut" },
    viewport: { amount: 0.2, once: true },
    whileInView: { opacity: 1 },
  } as const
}
