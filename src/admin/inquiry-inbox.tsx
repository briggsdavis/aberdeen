import { Archive, EnvelopeOpen, MagnifyingGlass, Star, Trash } from "@phosphor-icons/react"
import { useMutation, useQuery } from "convex/react"
import { useMemo, useState } from "react"
import { api } from "../../convex/_generated/api"
import type { Doc } from "../../convex/_generated/dataModel"
import { EmptyState, Input, Modal, PageHeading, SecondaryButton, inputClass } from "./ui"

type Inquiry = Doc<"inquiries">

export default function InquiryInbox() {
  const inquiries = useQuery(api.inquiries.listAdmin)
  const setStatus = useMutation(api.inquiries.setStatus)
  const setStarred = useMutation(api.inquiries.setStarred)
  const removeInquiry = useMutation(api.inquiries.remove)
  const [search, setSearch] = useState("")
  const [type, setType] = useState<"all" | Inquiry["type"]>("all")
  const [status, setStatusFilter] = useState<"active" | "new" | "read" | "archived">("active")
  const [starredOnly, setStarredOnly] = useState(false)
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase()
    return (inquiries ?? []).filter((inquiry) => {
      const matchesSearch =
        !needle ||
        `${inquiry.name} ${inquiry.email} ${inquiry.message}`.toLowerCase().includes(needle)
      const matchesType = type === "all" || inquiry.type === type
      const matchesStatus =
        status === "active" ? inquiry.status !== "archived" : inquiry.status === status
      return matchesSearch && matchesType && matchesStatus && (!starredOnly || inquiry.starred)
    })
  }, [inquiries, search, starredOnly, status, type])

  const openInquiry = (inquiry: Inquiry) => {
    setSelected(inquiry)
    if (inquiry.status === "new") void setStatus({ id: inquiry._id, status: "read" })
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    setDeleteError("")
    try {
      await removeInquiry({ id: deleteTarget._id })
      if (selected?._id === deleteTarget._id) setSelected(null)
      setDeleteTarget(null)
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "The inquiry could not be deleted.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="grid gap-6">
      <PageHeading
        description="Search contact and private-event messages, then star important inquiries or archive completed conversations."
        title="Inquiries"
      />
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_auto_auto_auto]">
        <div className="relative">
          <MagnifyingGlass
            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            size={17}
          />
          <Input
            className="pl-9"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, email, or message"
            value={search}
          />
        </div>
        <select
          className={inputClass}
          onChange={(event) => setType(event.target.value as typeof type)}
          value={type}
        >
          <option value="all">All inquiry types</option>
          <option value="contact">General contact</option>
          <option value="privateEvent">Private events</option>
        </select>
        <select
          className={inputClass}
          onChange={(event) => setStatusFilter(event.target.value as typeof status)}
          value={status}
        >
          <option value="active">Active</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="archived">Archived</option>
        </select>
        <button
          aria-pressed={starredOnly}
          className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
            starredOnly
              ? "border-amber-300 bg-amber-50 text-amber-700"
              : "border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}
          onClick={() => setStarredOnly((current) => !current)}
          type="button"
        >
          <Star size={16} weight={starredOnly ? "fill" : "regular"} /> Starred
        </button>
      </div>
      {filtered.length === 0 ? (
        <EmptyState>
          <div>
            <EnvelopeOpen className="mx-auto mb-2 text-slate-400" size={28} />
            No inquiries match these filters.
          </div>
        </EmptyState>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {filtered.map((inquiry) => (
            <article
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-slate-100 px-4 py-4 transition last:border-0 hover:bg-slate-50 ${
                inquiry.status === "new" ? "bg-aberdeen-peach/25" : ""
              }`}
              key={inquiry._id}
            >
              <button
                aria-label={inquiry.starred ? "Remove star" : "Star inquiry"}
                className="rounded-md p-1.5 text-slate-300 hover:bg-white hover:text-amber-500"
                onClick={(event) => {
                  event.stopPropagation()
                  void setStarred({ id: inquiry._id, starred: !inquiry.starred })
                }}
                type="button"
              >
                <Star size={17} weight={inquiry.starred ? "fill" : "regular"} />
              </button>
              <button
                className="grid min-w-0 cursor-pointer gap-1 text-left md:grid-cols-[180px_130px_1fr] md:items-center md:gap-4"
                onClick={() => openInquiry(inquiry)}
                type="button"
              >
                <div className="min-w-0">
                  <p
                    className={`truncate text-sm ${inquiry.status === "new" ? "font-bold" : "font-semibold"} text-slate-800`}
                  >
                    {inquiry.name}
                  </p>
                  <p className="truncate text-xs text-slate-500">{inquiry.email}</p>
                </div>
                <span className="w-fit rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
                  {inquiry.type === "privateEvent" ? "Private event" : "Contact"}
                </span>
                <p className="truncate text-xs text-slate-500">{inquiry.message}</p>
              </button>
              <div className="flex items-center gap-1 text-right">
                <div>
                  <p className="text-[11px] text-slate-400">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                    }).format(inquiry.createdAt)}
                  </p>
                  <button
                    aria-label="Archive inquiry"
                    className="mt-1 rounded-md p-1.5 text-slate-300 hover:bg-white hover:text-aberdeen-blue"
                    onClick={(event) => {
                      event.stopPropagation()
                      void setStatus({
                        id: inquiry._id,
                        status: inquiry.status === "archived" ? "read" : "archived",
                      })
                    }}
                    type="button"
                  >
                    <Archive size={16} />
                  </button>
                </div>
                <button
                  aria-label="Delete inquiry"
                  className="rounded-md p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-600"
                  onClick={(event) => {
                    event.stopPropagation()
                    setDeleteError("")
                    setDeleteTarget(inquiry)
                  }}
                  type="button"
                >
                  <Trash size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {selected ? (
        <Modal onClose={() => setSelected(null)} title="Inquiry details">
          <div className="grid gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{selected.name}</h3>
                <a
                  className="text-sm text-aberdeen-blue hover:underline"
                  href={`mailto:${selected.email}`}
                >
                  {selected.email}
                </a>
                {selected.phone ? (
                  <p className="mt-1 text-sm text-slate-500">{selected.phone}</p>
                ) : null}
              </div>
              <span className="rounded-full bg-aberdeen-peach/55 px-3 py-1 text-xs font-semibold text-aberdeen-blue">
                {selected.type === "privateEvent" ? "Private event" : "General contact"}
              </span>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 text-sm leading-7 whitespace-pre-wrap text-slate-700">
              {selected.message}
            </div>
            <p className="text-xs text-slate-400">
              Received{" "}
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
                timeStyle: "short",
              }).format(selected.createdAt)}
            </p>
            <div className="flex flex-wrap justify-end gap-3">
              <SecondaryButton
                onClick={() => void setStarred({ id: selected._id, starred: !selected.starred })}
              >
                <Star size={16} weight={selected.starred ? "fill" : "regular"} />
                {selected.starred ? "Unstar" : "Star"}
              </SecondaryButton>
              <SecondaryButton
                onClick={() => {
                  void setStatus({
                    id: selected._id,
                    status: selected.status === "archived" ? "read" : "archived",
                  })
                  setSelected(null)
                }}
              >
                <Archive size={16} />
                {selected.status === "archived" ? "Restore" : "Archive"}
              </SecondaryButton>
              <SecondaryButton
                className="text-red-600"
                onClick={() => {
                  setDeleteError("")
                  setDeleteTarget(selected)
                }}
              >
                <Trash size={16} />
                Delete
              </SecondaryButton>
              <a
                className="inline-flex items-center justify-center rounded-lg bg-aberdeen-blue px-4 py-2.5 text-sm font-semibold text-white"
                href={`mailto:${selected.email}`}
              >
                Reply by email
              </a>
            </div>
          </div>
        </Modal>
      ) : null}
      {deleteTarget ? (
        <Modal onClose={() => !deleting && setDeleteTarget(null)} title="Delete inquiry?">
          <div className="grid gap-5">
            <div className="rounded-xl bg-red-50 p-4">
              <p className="font-semibold text-red-900">
                Permanently delete the inquiry from {deleteTarget.name}?
              </p>
              <p className="mt-2 text-sm leading-6 text-red-700">
                This removes the message from the inbox and cannot be undone.
              </p>
            </div>
            {deleteError ? <p className="text-sm text-red-700">{deleteError}</p> : null}
            <div className="flex justify-end gap-3">
              <SecondaryButton disabled={deleting} onClick={() => setDeleteTarget(null)}>
                Cancel
              </SecondaryButton>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:pointer-events-none disabled:opacity-50"
                disabled={deleting}
                onClick={() => void confirmDelete()}
                type="button"
              >
                <Trash size={16} />
                {deleting ? "Deleting…" : "Delete inquiry"}
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}
