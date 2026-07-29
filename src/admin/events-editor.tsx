import { Archive, CalendarBlank, PencilSimple, Plus, Trash } from "@phosphor-icons/react"
import { useMutation, useQuery } from "convex/react"
import { useCallback, useMemo, useState } from "react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"
import MediaLibrary from "./media-library"
import type { MediaSelection } from "./media-library"
import {
  EmptyState,
  Field,
  Input,
  Modal,
  PageHeading,
  PrimaryButton,
  SecondaryButton,
  Textarea,
} from "./ui"

type EventForm = {
  id?: Id<"events">
  title: string
  description: string
  date: string
  bookingUrl: string
  image?: string
  imageUrl?: string
  imageMediaId?: Id<"mediaAssets">
}

function toDateInput(timestamp: number) {
  const date = new Date(timestamp)
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(timestamp - offset).toISOString().slice(0, 16)
}

const emptyEvent: EventForm = {
  title: "",
  description: "",
  date: toDateInput(Date.now() + 7 * 86_400_000),
  bookingUrl: "",
}

export default function EventsEditor() {
  const events = useQuery(api.events.listAdmin)
  const createEvent = useMutation(api.events.create)
  const updateEvent = useMutation(api.events.update)
  const setStatus = useMutation(api.events.setStatus)
  const removeEvent = useMutation(api.events.remove)
  const [tab, setTab] = useState<"published" | "archived">("published")
  const [editing, setEditing] = useState<EventForm | null>(null)
  const [showMedia, setShowMedia] = useState(false)
  const [saving, setSaving] = useState(false)
  const visibleEvents = useMemo(
    () => (events ?? []).filter((event) => event.status === tab),
    [events, tab],
  )

  const save = useCallback(async () => {
    if (!editing || !editing.title.trim()) return
    setSaving(true)
    const values = {
      title: editing.title.trim(),
      description: editing.description.trim(),
      startsAt: new Date(editing.date).getTime(),
      bookingUrl: editing.bookingUrl.trim(),
      imageUrl: editing.imageUrl,
      imageMediaId: editing.imageMediaId,
    }
    try {
      if (editing.id) await updateEvent({ id: editing.id, ...values })
      else await createEvent(values)
      setEditing(null)
    } finally {
      setSaving(false)
    }
  }, [createEvent, editing, updateEvent])

  const selectMedia = useCallback((selection: MediaSelection) => {
    setEditing((current) =>
      current
        ? { ...current, image: selection.url, imageMediaId: selection.id, imageUrl: undefined }
        : current,
    )
    setShowMedia(false)
  }, [])

  return (
    <div className="grid gap-6">
      <PageHeading
        actions={
          <PrimaryButton onClick={() => setEditing(emptyEvent)}>
            <Plus size={17} /> Add event
          </PrimaryButton>
        }
        description="Create and update events, change their booking links, or move finished events into the archive."
        title="Events"
      />
      <div className="flex w-fit rounded-lg border border-slate-200 bg-white p-1">
        {(["published", "archived"] as const).map((status) => (
          <button
            className={`rounded-md px-4 py-2 text-xs font-semibold capitalize transition ${
              tab === status ? "bg-aberdeen-blue text-white" : "text-slate-500 hover:bg-slate-50"
            }`}
            key={status}
            onClick={() => setTab(status)}
            type="button"
          >
            {status}
          </button>
        ))}
      </div>
      {visibleEvents.length === 0 ? (
        <EmptyState>
          <div>
            <CalendarBlank className="mx-auto mb-2 text-slate-400" size={28} />
            No {tab} events.
          </div>
        </EmptyState>
      ) : (
        <div className="grid gap-3">
          {visibleEvents.map((event) => (
            <article
              className="grid gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-aberdeen-blue/20 hover:shadow-md sm:grid-cols-[120px_1fr_auto] sm:items-center"
              key={event._id}
            >
              <img
                alt=""
                className="aspect-[4/3] w-full rounded-lg bg-slate-100 object-cover sm:w-[120px]"
                src={event.image}
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-sm font-semibold text-slate-900">{event.title}</h2>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
                      event.status === "published"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-aberdeen-blue">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(event.startsAt)}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                  {event.description}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  aria-label="Edit event"
                  className="rounded-lg p-2.5 text-slate-400 hover:bg-slate-100 hover:text-aberdeen-blue"
                  onClick={() =>
                    setEditing({
                      id: event._id,
                      title: event.title,
                      description: event.description,
                      date: toDateInput(event.startsAt),
                      bookingUrl: event.bookingUrl,
                      image: event.image,
                      imageUrl: event.imageUrl,
                      imageMediaId: event.imageMediaId,
                    })
                  }
                  type="button"
                >
                  <PencilSimple size={17} />
                </button>
                <button
                  aria-label={event.status === "published" ? "Archive event" : "Restore event"}
                  className="rounded-lg p-2.5 text-slate-400 hover:bg-slate-100 hover:text-aberdeen-blue"
                  onClick={() =>
                    void setStatus({
                      id: event._id,
                      status: event.status === "published" ? "archived" : "published",
                    })
                  }
                  type="button"
                >
                  <Archive size={17} />
                </button>
                <button
                  aria-label="Delete event"
                  className="rounded-lg p-2.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  onClick={() => {
                    if (window.confirm(`Permanently delete ${event.title}?`)) {
                      void removeEvent({ id: event._id })
                    }
                  }}
                  type="button"
                >
                  <Trash size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {editing ? (
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Edit event" : "Add event"}>
          <div className="grid gap-4">
            <button
              className="group relative h-48 overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50"
              onClick={() => setShowMedia(true)}
              type="button"
            >
              {editing.image ? (
                <img alt="" className="h-full w-full object-cover" src={editing.image} />
              ) : (
                <span className="text-sm text-slate-500">Choose event image</span>
              )}
              <span className="absolute inset-x-3 bottom-3 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 opacity-0 shadow transition group-hover:opacity-100">
                Choose from media library
              </span>
            </button>
            <Field label="Event title">
              <Input
                onChange={(event) =>
                  setEditing((current) =>
                    current ? { ...current, title: event.target.value } : current,
                  )
                }
                value={editing.title}
              />
            </Field>
            <Field label="Description">
              <Textarea
                onChange={(event) =>
                  setEditing((current) =>
                    current ? { ...current, description: event.target.value } : current,
                  )
                }
                value={editing.description}
              />
            </Field>
            <Field label="Date and time">
              <Input
                onChange={(event) =>
                  setEditing((current) =>
                    current ? { ...current, date: event.target.value } : current,
                  )
                }
                type="datetime-local"
                value={editing.date}
              />
            </Field>
            <Field hint="Optional. Leave blank if booking is not available." label="Booking link">
              <Input
                onChange={(event) =>
                  setEditing((current) =>
                    current ? { ...current, bookingUrl: event.target.value } : current,
                  )
                }
                placeholder="https://"
                value={editing.bookingUrl}
              />
            </Field>
            <div className="flex justify-end gap-3 pt-2">
              <SecondaryButton onClick={() => setEditing(null)}>Cancel</SecondaryButton>
              <PrimaryButton disabled={saving} onClick={() => void save()}>
                {saving ? "Saving…" : "Save event"}
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      ) : null}
      {showMedia ? (
        <Modal onClose={() => setShowMedia(false)} title="Choose event image" wide>
          <MediaLibrary
            acceptedKinds={["image"]}
            onSelect={selectMedia}
            selectedId={editing?.imageMediaId}
          />
        </Modal>
      ) : null}
    </div>
  )
}
