import { Tape } from "./framed-photo"

type ScrapbookSceneVariant = "calendar" | "harbor" | "voyage"

const scenes = {
  calendar: {
    illustration: "/illustrations/nautical/compass-rose-simple.png",
    map: "/maps/thimble-islands-chart.png",
    stamp: "/stamps/star.png",
  },
  harbor: {
    illustration: "/illustrations/nautical/sailboat.png",
    map: "/maps/antique-map-03.png",
    stamp: "/stamps/float.png",
  },
  voyage: {
    illustration: "/illustrations/nautical/sailing-ship.png",
    map: "/maps/antique-map-05.png",
    stamp: "/stamps/wheel.png",
  },
} satisfies Record<ScrapbookSceneVariant, { illustration: string; map: string; stamp: string }>

export function ScrapbookScene({
  className = "",
  variant,
}: {
  className?: string
  variant: ScrapbookSceneVariant
}) {
  const scene = scenes[variant]

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative aspect-square select-none ${className}`}
    >
      <div className="scene-paper absolute inset-[9%_5%_8%_10%] rotate-3 overflow-hidden bg-oyster-white p-3 shadow-xl">
        <div className="relative h-full overflow-hidden border border-aberdeen-blue/15 bg-aberdeen-peach">
          <div className="scene-stripes absolute inset-x-0 top-0 h-[18%]" />
          <img
            alt=""
            className="absolute inset-x-0 bottom-0 h-[88%] w-full object-cover opacity-35 mix-blend-multiply"
            src={scene.map}
          />
        </div>
      </div>

      <div className="absolute top-[5%] left-[3%] h-[30%] w-[38%] -rotate-6 bg-aberdeen-blue p-2 shadow-lg">
        <div className="postcard-paper h-full border border-oyster-white/50 bg-aberdeen-blue" />
      </div>

      <img
        alt=""
        className="absolute right-[3%] bottom-[8%] z-10 h-auto w-[72%] object-contain drop-shadow-xl"
        src={scene.illustration}
      />

      <div className="absolute top-[8%] right-[4%] z-20 grid aspect-square w-[25%] rotate-6 place-items-center rounded-full border-4 border-oyster-white bg-citrus p-1 shadow-lg">
        <img alt="" className="h-full w-full object-contain" src={scene.stamp} />
      </div>

      <Tape className="top-[4%] left-[31%] w-[30%] -rotate-3" />
      <span className="scene-rope absolute right-0 bottom-[16%] left-0 z-20 h-3 -rotate-3 drop-shadow-md" />
    </div>
  )
}

export function ScrapbookCornerScene({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative aspect-[5/4] select-none ${className}`}
    >
      <div className="scene-paper absolute inset-[4%_3%_9%_16%] -rotate-3 overflow-hidden bg-oyster-white p-3 shadow-xl">
        <div className="relative h-full overflow-hidden border border-aberdeen-blue/15 bg-aberdeen-peach">
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-multiply"
            src="/maps/peloponnese-chart.png"
          />
        </div>
      </div>

      <div className="scene-paper absolute top-[8%] left-[3%] h-[48%] w-[38%] rotate-6 bg-oyster-white p-2 shadow-lg">
        <div className="scene-stripes h-full w-full" />
      </div>

      <img
        alt=""
        className="absolute top-0 right-[2%] z-20 h-auto w-[43%] rotate-6 object-contain drop-shadow-xl"
        src="/stamps/float.png"
      />
      <img
        alt=""
        className="absolute bottom-0 left-[2%] z-10 h-auto w-[56%] -rotate-6 object-contain drop-shadow-xl"
        src="/decorations/anchor.png"
      />
      <img
        alt=""
        className="absolute right-[15%] bottom-[5%] z-20 h-auto w-[27%] -rotate-3 rounded-full border-4 border-oyster-white bg-citrus p-1 shadow-lg"
        src="/stamps/seahorse.png"
      />

      <Tape className="top-[3%] left-[33%] w-[32%] rotate-2" />
      <span className="scene-rope absolute right-[-3%] bottom-[19%] left-[8%] z-30 h-3 rotate-6 drop-shadow-md" />
    </div>
  )
}
