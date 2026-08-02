export function HeroPostcard({
  cmsSlot = "home-hero-postcard",
  imageAlt = "A guest enjoying dinner at Aberdeen",
  imageSrc,
}: {
  cmsSlot?: string
  imageAlt?: string
  imageSrc: string | null
}) {
  return (
    <article className="home-hero-postcard aspect-[16/9] bg-white p-3 text-aberdeen-blue shadow-[0_18px_46px_rgb(14_24_69/0.34)] md:p-4">
      <div className="grid h-full grid-cols-[1.05fr_0.95fr] gap-3 md:gap-4">
        <div className="flex min-h-0 flex-col">
          <p className="mb-2 font-utility text-[0.55rem] font-semibold tracking-[0.2em] uppercase md:text-[0.65rem]">
            Wish you were here
          </p>
          <div className="min-h-0 flex-1 overflow-hidden bg-oyster-white">
            {imageSrc ? (
              <img
                alt={imageAlt}
                className="h-full w-full object-cover"
                data-cms-slot={cmsSlot}
                src={imageSrc}
              />
            ) : null}
          </div>
        </div>
        <div className="flex min-w-0 flex-col border-l border-aberdeen-blue/45 pl-3 md:pl-4">
          <div className="ml-auto grid h-9 w-9 place-items-center border-2 border-aberdeen-blue/65 md:h-11 md:w-11">
            <img
              alt=""
              className="h-6 w-6 object-contain opacity-70 md:h-7 md:w-7"
              src="/illustrations/nautical/sailboat.png"
            />
          </div>
          <p className="mt-2 font-playful text-sm leading-[1.05] sm:text-base md:mt-3 md:text-xl">
            Meet us where the yachts pass at sunset. Savannah has saved you a seat.
          </p>
          <div aria-hidden="true" className="mt-auto space-y-2 pb-1">
            <div className="border-b border-aberdeen-blue/55" />
            <div className="border-b border-aberdeen-blue/55" />
            <div className="border-b border-aberdeen-blue/55" />
          </div>
          <p className="mt-2 font-utility text-[0.42rem] tracking-[0.17em] uppercase opacity-65 md:text-[0.5rem]">
            Savannah, Georgia
          </p>
        </div>
      </div>
    </article>
  )
}
