import {
  Anchor,
  CornerStamp,
  JournalCard,
  PhotoMount,
  RopeRule,
  SetSailBadge,
  Shell,
  ShipWheel,
  StripeBand,
  Tape,
} from "../components/scrapbook"

const PHOTO =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=85"

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="text-center">
      <div className={`h-20 w-full rounded-sm border border-kelp-ink/15 ${className}`} />
      <p className="mt-2 font-utility text-xs tracking-[0.12em] text-aberdeen-blue uppercase">
        {name}
      </p>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-aberdeen-blue/20 px-5 py-12 md:px-8">
      <h2 className="mb-8 font-display text-3xl text-aberdeen-blue md:text-4xl">{title}</h2>
      {children}
    </section>
  )
}

function KitPage() {
  return (
    <div className="overflow-hidden bg-oyster-white pt-24 pb-16">
      <header className="px-5 pb-6 md:px-8">
        <p className="font-utility text-sm tracking-[0.22em] text-aberdeen-blue uppercase">
          Internal preview
        </p>
        <h1 className="mt-3 font-display text-6xl text-aberdeen-blue md:text-7xl">Scrapbook kit</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8">
          Every reusable nautical / scrapbook piece in one place. Inline-SVG die-cuts stand in until
          real transparent PNGs are dropped via each component's <code>src</code> prop.
        </p>
      </header>

      <Block title="Colors">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
          <Swatch className="bg-aberdeen-blue" name="Aberdeen Blue" />
          <Swatch className="bg-aberdeen-peach" name="Aberdeen Peach" />
          <Swatch className="bg-oyster-white" name="Oyster White" />
          <Swatch className="bg-harbor-teal" name="Harbor Teal" />
          <Swatch className="bg-rope-red" name="Rope Red" />
          <Swatch className="bg-citrus" name="Citrus" />
          <Swatch className="bg-shell-pink" name="Shell Pink" />
          <Swatch className="bg-paper-cream" name="Paper Cream" />
          <Swatch className="bg-kelp-ink" name="Kelp Ink" />
        </div>
      </Block>

      <Block title="Textures: stripes & rope">
        <div className="space-y-6">
          <StripeBand />
          <RopeRule />
          <div className="sb-paper bg-aberdeen-peach p-8">
            <p className="font-display text-2xl text-aberdeen-blue">
              .sb-paper grain overlay on a peach band
            </p>
          </div>
        </div>
      </Block>

      <Block title="Die-cuts (inline SVG placeholders)">
        <div className="flex flex-wrap items-center gap-10">
          <div className="h-24 w-24">
            <Anchor />
          </div>
          <div className="h-24 w-24">
            <ShipWheel />
          </div>
          <div className="h-24 w-24">
            <Shell />
          </div>
          <SetSailBadge />
        </div>
      </Block>

      <Block title="Tape">
        <div className="relative inline-block bg-aberdeen-peach p-10">
          <p className="font-display text-2xl text-aberdeen-blue">Taped to the corners</p>
          <Tape at="tl" />
          <Tape at="br" />
        </div>
      </Block>

      <Block title="Journal card">
        <div className="max-w-md">
          <JournalCard>
            On Day 4 of the cruise we tried a sailing excursion. So fun, a bit scary — would love to
            go again.
          </JournalCard>
        </div>
      </Block>

      <Block title="Photo mounts">
        <div className="flex flex-wrap items-start gap-14 py-8">
          <PhotoMount alt="" className="w-60" src={PHOTO} tilt={-3} tape={["tl", "br"]} />
          <PhotoMount
            alt=""
            className="w-60"
            corner={{ at: "br", node: <ShipWheel className="h-16 w-16 drop-shadow-md" /> }}
            src={PHOTO}
            tilt={2.5}
          />
          <div className="relative">
            <PhotoMount
              alt=""
              className="w-60"
              corner={{ at: "tl", node: <Shell className="h-16 w-16 drop-shadow-md" /> }}
              src={PHOTO}
              tilt={-1.5}
            />
            <CornerStamp at="br" rotate={12} size={70}>
              <Anchor />
            </CornerStamp>
          </div>
        </div>
      </Block>
    </div>
  )
}

export default KitPage
