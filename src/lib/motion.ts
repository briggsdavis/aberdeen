export const fadeIn = (delay = 0) => {
  return {
    initial: { opacity: 0, y: 26 },
    transition: { delay, duration: 0.88, ease: [0.22, 1, 0.36, 1] },
    viewport: { amount: 0.16, once: true },
    whileInView: { opacity: 1, y: 0 },
  } as const
}

export const fadeInPlace = (delay = 0) => {
  return {
    initial: { opacity: 0 },
    transition: { delay, duration: 0.82, ease: [0.22, 1, 0.36, 1] },
    viewport: { amount: 0.16, once: true },
    whileInView: { opacity: 1 },
  } as const
}
