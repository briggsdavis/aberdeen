import type { CSSProperties } from "react"
import { ImageTilt } from "./image-tilt"

type FrameVariant = "01" | "01-rotated" | "02" | "03"

function createFrameStyles(variant: FrameVariant, aspectRatio: string) {
  const maskSrc = `/frames/torn-paper/mask-${variant}.png`

  return {
    frame: { aspectRatio, boxShadow: "none" } satisfies CSSProperties,
    mask: {
      WebkitMaskImage: `url('${maskSrc}')`,
      WebkitMaskPosition: "center",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskSize: "100% 100%",
      maskImage: `url('${maskSrc}')`,
      maskPosition: "center",
      maskRepeat: "no-repeat",
      maskSize: "100% 100%",
    } satisfies CSSProperties,
  }
}

const frameStyles: Record<FrameVariant, ReturnType<typeof createFrameStyles>> = {
  "01": createFrameStyles("01", "1339 / 1016"),
  "01-rotated": createFrameStyles("01-rotated", "1339 / 1016"),
  "02": createFrameStyles("02", "4 / 3"),
  "03": createFrameStyles("03", "4 / 3"),
}

export function FramedPhoto({
  alt,
  className = "",
  imageClassName = "",
  imageCmsSlot,
  src,
  variant = "01",
}: {
  alt: string
  className?: string
  imageClassName?: string
  imageCmsSlot?: string
  src: string | null
  variant?: FrameVariant
}) {
  if (!src) return null

  const frameSrc = `/frames/torn-paper/frame-${variant}.png`
  const styles = frameStyles[variant]

  return (
    <ImageTilt className={`relative ${className}`} style={styles.frame}>
      <div className="absolute inset-0.5" style={styles.mask}>
        <img
          alt={alt}
          className={`h-full w-full object-cover ${imageClassName}`}
          data-cms-slot={imageCmsSlot}
          src={src}
        />
      </div>
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full object-fill"
        src={frameSrc}
      />
    </ImageTilt>
  )
}

export function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-30 h-8 w-24 rotate-[7deg] bg-oyster-white/70 shadow-sm ${className}`}
    />
  )
}
