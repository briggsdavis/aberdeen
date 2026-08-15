import { useState } from "react"
import { ImageTilt } from "./image-tilt"

const stampImages = [
  "/stamps/ball.png",
  "/stamps/float.png",
  "/stamps/seahorse.png",
  "/stamps/star.png",
  "/stamps/wheel.png",
]

export function Postcard({
  imageAlt,
  imageCmsSlot,
  imageSrc,
  message,
  messageCmsKey,
  size = "large",
  stampSrc,
}: {
  imageAlt: string
  imageCmsSlot?: string
  imageSrc: string | null
  message: string
  messageCmsKey?: string
  size?: "large" | "small"
  stampSrc?: string
}) {
  const isLarge = size === "large"
  const [randomStampSrc] = useState(
    () => stampImages[Math.floor(Math.random() * stampImages.length)]!,
  )

  return (
    <ImageTilt>
      <article className="postcard-paper relative aspect-[8/5] overflow-hidden bg-white text-aberdeen-blue">
        <div
          className={`absolute grid grid-cols-2 ${
            isLarge
              ? "inset-2.5 gap-2.5 text-sm lg:inset-4 lg:gap-4"
              : "inset-2 gap-2 text-[0.5rem]"
          }`}
        >
          <div
            className={`flex min-h-0 flex-col border-r border-aberdeen-blue/55 ${
              isLarge ? "pr-2.5 lg:pr-4" : "pr-2"
            }`}
          >
            <div className="min-h-0 flex-1 overflow-hidden bg-oyster-white">
              {imageSrc ? (
                <img
                  alt={imageAlt}
                  className="h-full w-full object-cover"
                  data-cms-slot={imageCmsSlot}
                  src={imageSrc}
                />
              ) : null}
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-col">
            <div
              className={`ml-auto aspect-square shrink-0 overflow-hidden border-2 border-aberdeen-blue/65 p-0.5 ${
                isLarge ? "h-8 w-8 lg:h-12 lg:w-12" : "h-7 w-7"
              }`}
            >
              <img alt="" className="h-full w-full object-cover" src={stampSrc ?? randomStampSrc} />
            </div>
            <p
              className={`font-playful leading-[1.05] ${isLarge ? "mt-1.5 lg:mt-3" : "mt-1.5"}`}
              data-cms-text-key={messageCmsKey}
            >
              {message}
            </p>
            <div
              aria-hidden="true"
              className={`mt-auto ${isLarge ? "space-y-1 pb-0.5 lg:space-y-2 lg:pb-1" : "space-y-1.5 pb-1"}`}
            >
              <div className="border-b border-aberdeen-blue/55" />
              <div className="border-b border-aberdeen-blue/55" />
              <div className="border-b border-aberdeen-blue/55" />
            </div>
            <p
              className={`font-utility tracking-[0.17em] uppercase opacity-65 ${
                isLarge ? "mt-1 lg:mt-2" : "mt-1"
              }`}
            >
              Savannah, Georgia
            </p>
          </div>
        </div>
      </article>
    </ImageTilt>
  )
}
