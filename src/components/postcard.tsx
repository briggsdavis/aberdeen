import { useState } from "react"
import { ImageTilt } from "./image-tilt"

const stampImages = ["/lifebuoy.png", "/nautilus.png", "/oyster.png", "/shell.png"]

export function Postcard({
  imageAlt,
  imageSrc,
  inverted = false,
  message,
}: {
  imageAlt: string
  imageSrc: string
  inverted?: boolean
  message: string
}) {
  const [stampSrc] = useState(() => stampImages[Math.floor(Math.random() * stampImages.length)]!)
  const lineColor = inverted ? "border-white/55" : "border-aberdeen-blue/55"
  const stampBorderColor = inverted ? "border-white/65" : "border-aberdeen-blue/65"

  return (
    <ImageTilt>
      <article
        className={`postcard-paper relative aspect-[8/5] overflow-hidden text-[0.5rem] ${
          inverted ? "bg-aberdeen-blue text-white" : "bg-white text-aberdeen-blue"
        }`}
      >
        <div className="absolute inset-2 grid grid-cols-2 gap-2">
          <div className={`flex min-h-0 flex-col border-r pr-2 ${lineColor}`}>
            <div className="min-h-0 flex-1 overflow-hidden bg-oyster-white">
              <img alt={imageAlt} className="h-full w-full object-cover" src={imageSrc} />
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-col">
            <div
              className={`ml-auto h-7 w-7 shrink-0 overflow-hidden border-2 p-0.5 ${stampBorderColor}`}
            >
              <img alt="" className="h-full w-full object-contain" src={stampSrc} />
            </div>
            <p className="mt-1.5 font-playful leading-[1.05]">{message}</p>
            <div aria-hidden="true" className="mt-auto space-y-1.5 pb-1">
              <div className={`border-b ${lineColor}`} />
              <div className={`border-b ${lineColor}`} />
              <div className={`border-b ${lineColor}`} />
            </div>
            <p className="mt-1 font-utility tracking-[0.17em] uppercase opacity-65">
              Savannah, Georgia
            </p>
          </div>
        </div>
      </article>
    </ImageTilt>
  )
}
