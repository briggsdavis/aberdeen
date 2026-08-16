const standardActionTones = ["orange", "blue", "gray", "navy"] as const

export function standardActionTone(index: number) {
  return standardActionTones[index % standardActionTones.length]
}
