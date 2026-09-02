import { ArrowLeft, House } from "@phosphor-icons/react"
import { Link } from "react-router"
import { standardActionTone } from "../lib/standard-action"

export default function NotFoundPage() {
  return (
    <div className="page-shell">
      <section className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-oyster-white px-5 pt-32 pb-20 text-center text-aberdeen-blue">
        <img
          alt=""
          aria-hidden="true"
          className="absolute -right-40 bottom-12 w-[38rem] rotate-3 object-contain drop-shadow-xl md:w-[52rem]"
          src="/map.png"
        />
        <img
          alt=""
          aria-hidden="true"
          className="absolute right-[-5rem] bottom-[-4rem] w-[24rem] rotate-[-8deg] drop-shadow-xl md:w-[34rem]"
          src="/ship2.png"
        />
        <div className="relative max-w-3xl">
          <h1 className="font-display text-7xl leading-none md:text-9xl">
            This page drifted away.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-kelp-ink/75">
            The address may have changed, or the page may never have made it onto the map.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              className="aberdeen-action standard-action"
              data-standard-action-tone={standardActionTone(0)}
              to="/"
            >
              <House size={17} /> Return home
            </Link>
            <button
              className="aberdeen-action standard-action"
              data-standard-action-tone={standardActionTone(1)}
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
