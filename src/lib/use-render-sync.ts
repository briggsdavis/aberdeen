import { useState } from "react"

const unseen = Symbol()

/** Runs `sync` during render whenever `value` changes (React's "adjust state on prop change" pattern). */
export function useRenderSync<T>(value: T, sync: (value: T) => void) {
  const [seen, setSeen] = useState<T | typeof unseen>(unseen)
  if (Object.is(seen, value)) return
  setSeen(() => value)
  sync(value)
}
