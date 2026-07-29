import { X } from "@phosphor-icons/react"
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react"

export const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-aberdeen-blue focus:ring-3 focus:ring-aberdeen-blue/10"

export function Field({
  children,
  label,
  hint,
}: {
  children: ReactNode
  label: string
  hint?: string
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold tracking-wide text-slate-700">{label}</span>
      {children}
      {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
    </label>
  )
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...props} className={`${inputClass} min-h-28 resize-y ${props.className ?? ""}`} />
  )
}

export function PrimaryButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-aberdeen-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#21317d] active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-aberdeen-blue/30 hover:bg-slate-50 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

export function PageHeading({
  title,
  description,
  actions,
}: {
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
      <div>
        <h1 className="font-display text-4xl leading-none text-aberdeen-blue">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {actions}
    </div>
  )
}

export function Modal({
  children,
  title,
  onClose,
  wide = false,
}: {
  children: ReactNode
  title: string
  onClose: () => void
  wide?: boolean
}) {
  return (
    <dialog
      aria-modal="true"
      className="fixed inset-0 z-[100] m-0 grid h-svh max-h-none w-screen max-w-none place-items-center border-0 bg-transparent p-4"
      open
    >
      <div
        className={`max-h-[90svh] w-full overflow-auto rounded-2xl bg-white shadow-2xl ${wide ? "max-w-5xl" : "max-w-lg"}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <button
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </dialog>
  )
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-48 place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
      {children}
    </div>
  )
}
