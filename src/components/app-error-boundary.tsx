import { WarningCircle } from "@phosphor-icons/react"
import { Component } from "react"
import type { ErrorInfo, ReactNode } from "react"

type Props = { children: ReactNode }
type State = { hasError: boolean }

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Aberdeen page error", error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-aberdeen-blue px-5 py-20 text-aberdeen-peach">
        <img
          alt=""
          aria-hidden="true"
          className="absolute -right-32 -bottom-32 w-[42rem] opacity-10"
          src="/illustrations/nautical/compass-rose-detailed.png"
        />
        <div className="relative max-w-2xl text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-aberdeen-peach/35">
            <WarningCircle size={28} />
          </span>
          <p className="mt-8 font-utility text-sm tracking-[0.22em] uppercase">
            A little rough water
          </p>
          <h1 className="mt-5 font-display text-6xl leading-none md:text-8xl">
            Something went off course.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-aberdeen-peach/80">
            The page hit an unexpected problem. Try it once more, or head back to calmer waters.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button
              className="aberdeen-action bg-aberdeen-peach text-aberdeen-blue"
              onClick={() => window.location.reload()}
              type="button"
            >
              Try again
            </button>
            <a
              className="aberdeen-action border border-aberdeen-peach text-aberdeen-peach"
              href="/"
            >
              Return home
            </a>
          </div>
        </div>
      </main>
    )
  }
}
