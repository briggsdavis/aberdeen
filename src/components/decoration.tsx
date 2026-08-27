type DecorationProps = {
  className?: string
  name: "anchor" | "lobster" | "message-bottle" | "oyster-shell" | "sailor-hat" | "whale-tail"
}

export function Decoration({ className = "", name }: DecorationProps) {
  return (
    <img
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${className}`}
      draggable={false}
      loading="lazy"
      src={`/decorations/${name}.png`}
    />
  )
}
