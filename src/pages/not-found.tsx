import { ArrowLeft, House } from "@phosphor-icons/react"
import { Link } from "react-router"

export default function NotFoundPage() {
  return (
    <div className="page-shell">
      <section className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-oyster-white px-5 pt-32 pb-20 text-center text-aberdeen-blue">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
          src="/maps/antique-map-03.png"
        />
        <img
          alt=""
          aria-hidden="true"
          className="absolute right-[-5rem] bottom-[-4rem] w-[24rem] rotate-[-8deg] opacity-15 md:w-[34rem]"
          src="/illustrations/nautical/schooner.png"
        />
        <div className="relative max-w-3xl">
          <p className="font-utility text-sm tracking-[0.24em] uppercase">404 · Uncharted waters</p>
          <h1 className="mt-5 font-display text-7xl leading-none md:text-9xl">
            This page drifted away.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-kelp-ink/75">
            The address may have changed, or the page may never have made it onto the map.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link className="aberdeen-action bg-aberdeen-blue text-aberdeen-peach" to="/">
              <House size={17} /> Return home
            </Link>
            <button
              className="aberdeen-action border border-aberdeen-blue text-aberdeen-blue"
              onClick={() => window.history.back()}
              type="button"
            >
              <ArrowLeft size={17} /> Go back
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
