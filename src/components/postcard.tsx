export function Postcard({
  eyebrow = "Wish you were here",
  imageAlt,
  imageCmsSlot,
  imageSrc,
  message,
  size,
}: {
  eyebrow?: string
  imageAlt: string
  imageCmsSlot?: string
  imageSrc: string | null
  message: string
  size: "large" | "small"
}) {
  const isLarge = size === "large"

  return (
    <article
      className={`postcard-paper aspect-[8/5] overflow-hidden bg-white text-aberdeen-blue shadow-[0_18px_46px_color-mix(in_srgb,var(--color-aberdeen-blue)_24%,transparent)] ${
        isLarge ? "p-4" : "p-2"
      }`}
    >
      <div className={`grid h-full grid-cols-2 ${isLarge ? "gap-4" : "gap-2"}`}>
        <div
          className={`flex min-h-0 flex-col border-r border-aberdeen-blue/55 ${
            isLarge ? "pr-4" : "pr-2"
          }`}
        >
          <p
            className={`shrink-0 font-utility font-semibold tracking-[0.18em] uppercase ${
              isLarge ? "mb-2 text-xs" : "mb-1 text-[0.4rem]"
            }`}
          >
            {eyebrow}
          </p>
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

        <div className="flex min-w-0 flex-col">
          <div
            className={`ml-auto overflow-hidden border-2 border-aberdeen-blue/65 ${
              isLarge ? "h-12 w-12" : "h-7 w-7"
            }`}
          >
            <img alt="" className="h-full w-full object-cover" src="/stamps/star.png" />
          </div>
          <p
            className={`font-playful leading-[1.05] ${
              isLarge ? "mt-3 text-lg md:text-xl" : "mt-1.5 text-[0.58rem] sm:text-[0.68rem]"
            }`}
          >
            {message}
          </p>
          <div
            aria-hidden="true"
            className={`mt-auto pb-1 ${isLarge ? "space-y-2" : "space-y-1.5"}`}
          >
            <div className="border-b border-aberdeen-blue/55" />
            <div className="border-b border-aberdeen-blue/55" />
            <div className="border-b border-aberdeen-blue/55" />
          </div>
          <p
            className={`font-utility tracking-[0.17em] uppercase opacity-65 ${
              isLarge ? "mt-2 text-[0.55rem]" : "mt-1 text-[0.34rem]"
            }`}
          >
            Savannah, Georgia
          </p>
        </div>
      </div>
    </article>
  )
}
