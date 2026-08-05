import { ArrowDown, ArrowUp, PencilSimple, Plus, Trash } from "@phosphor-icons/react"
import { useMutation, useQuery } from "convex/react"
import { useCallback, useEffect, useState } from "react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"
import MediaLibrary from "./media-library"
import type { MediaSelection } from "./media-library"
import PageEditor from "./page-editor"
import { Field, Input, Modal, PageHeading, PrimaryButton, SecondaryButton, Textarea } from "./ui"

type StaffForm = {
  id?: Id<"staffMembers">
  name: string
  role: string
  biography: string
  imageUrl?: string
  imageMediaId?: Id<"mediaAssets">
  image?: string
}

const emptyStaff: StaffForm = {
  name: "",
  role: "",
  biography: "",
}

export default function StaffEditor() {
  const members = useQuery(api.staff.listAdmin)
  const createMember = useMutation(api.staff.create)
  const updateMember = useMutation(api.staff.update)
  const removeMember = useMutation(api.staff.remove)
  const reorderMembers = useMutation(api.staff.reorder)
  const [orderedIds, setOrderedIds] = useState<Array<Id<"staffMembers">>>([])
  const [editing, setEditing] = useState<StaffForm | null>(null)
  const [showMedia, setShowMedia] = useState(false)
  const [saving, setSaving] = useState(false)
  const [orderDirty, setOrderDirty] = useState(false)

  useEffect(() => {
    if (members && !orderDirty) setOrderedIds(members.map((member) => member._id))
  }, [members, orderDirty])

  const orderedMembers = orderedIds
    .map((id) => members?.find((member) => member._id === id))
    .filter((member): member is NonNullable<typeof member> => Boolean(member))

  const move = useCallback((index: number, direction: -1 | 1) => {
    setOrderedIds((current) => {
      const target = index + direction
      if (target < 0 || target >= current.length) return current
      const next = [...current]
      ;[next[index], next[target]] = [next[target]!, next[index]!]
      return next
    })
    setOrderDirty(true)
  }, [])

  const saveOrder = useCallback(async () => {
    await reorderMembers({ ids: orderedIds })
    setOrderDirty(false)
  }, [orderedIds, reorderMembers])

  const saveMember = useCallback(async () => {
    if (!editing || !editing.name.trim() || !editing.role.trim()) return
    setSaving(true)
    const values = {
      name: editing.name.trim(),
      role: editing.role.trim(),
      biography: editing.biography.trim(),
      imageUrl: editing.imageUrl,
      imageMediaId: editing.imageMediaId,
    }
    try {
      if (editing.id) {
        await updateMember({ id: editing.id, ...values })
      } else {
        await createMember(values)
      }
      setEditing(null)
    } finally {
      setSaving(false)
    }
  }, [createMember, editing, updateMember])

  const selectMedia = useCallback((selection: MediaSelection) => {
    setEditing((current) =>
      current
        ? {
            ...current,
            imageMediaId: selection.id,
            image: selection.url,
            imageUrl: undefined,
          }
        : current,
    )
    setShowMedia(false)
  }, [])

  return (
    <div className="grid gap-6">
      <PageHeading
        description="Edit the page introduction in place, then manage the people displayed in the staff roster."
        title="Staff editor"
      />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.65fr)]">
        <PageEditor compact page="/staff" previewScope="staff-introduction" />
        <aside className="sticky top-6 grid gap-4 rounded-xl border border-kelp-ink/15 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-kelp-ink">Staff members</h2>
              <p className="mt-1 text-xs text-kelp-ink/60">Edit or change the display order.</p>
            </div>
            <button
              aria-label="Add staff member"
              className="grid h-9 w-9 place-items-center rounded-lg bg-aberdeen-blue text-white transition hover:-translate-y-0.5"
              onClick={() => setEditing(emptyStaff)}
              type="button"
            >
              <Plus size={17} weight="bold" />
            </button>
          </div>
          <div className="grid gap-2">
            {orderedMembers.map((member, index) => (
              <article
                className="group flex items-center gap-3 rounded-lg border border-kelp-ink/15 p-2.5 transition hover:border-aberdeen-blue/25 hover:bg-oyster-white"
                key={member._id}
              >
                <img
                  alt=""
                  className="h-11 w-11 rounded-lg bg-aberdeen-peach/40 object-cover"
                  src={member.image}
                />
                <button
                  className="min-w-0 grow text-left"
                  onClick={() =>
                    setEditing({
                      id: member._id,
                      name: member.name,
                      role: member.role,
                      biography: member.biography,
                      imageUrl: member.imageUrl,
                      imageMediaId: member.imageMediaId,
                      image: member.image,
                    })
                  }
                  type="button"
                >
                  <p className="truncate text-sm font-semibold text-kelp-ink/90">{member.name}</p>
                  <p className="truncate text-xs text-kelp-ink/60">{member.role}</p>
                </button>
                <div className="flex items-center">
                  <button
                    aria-label="Move up"
                    className="p-1.5 text-kelp-ink/45 hover:text-aberdeen-blue disabled:opacity-25"
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                    type="button"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    aria-label="Move down"
                    className="p-1.5 text-kelp-ink/45 hover:text-aberdeen-blue disabled:opacity-25"
                    disabled={index === orderedMembers.length - 1}
                    onClick={() => move(index, 1)}
                    type="button"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    aria-label="Edit"
                    className="p-1.5 text-kelp-ink/45 hover:text-aberdeen-blue"
                    onClick={() =>
                      setEditing({
                        id: member._id,
                        name: member.name,
                        role: member.role,
                        biography: member.biography,
                        imageUrl: member.imageUrl,
                        imageMediaId: member.imageMediaId,
                        image: member.image,
                      })
                    }
                    type="button"
                  >
                    <PencilSimple size={14} />
                  </button>
                  <button
                    aria-label="Delete"
                    className="p-1.5 text-kelp-ink/45 hover:text-danger"
                    onClick={() => {
                      if (window.confirm(`Delete ${member.name}?`)) {
                        void removeMember({ id: member._id })
                      }
                    }}
                    type="button"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          {orderDirty ? (
            <PrimaryButton onClick={() => void saveOrder()}>Save staff order</PrimaryButton>
          ) : null}
        </aside>
      </div>
      {editing ? (
        <Modal
          onClose={() => setEditing(null)}
          title={editing.id ? "Edit staff member" : "Add staff member"}
        >
          <div className="grid gap-4">
            <button
              className="group relative h-44 overflow-hidden rounded-xl border border-dashed border-kelp-ink/25 bg-oyster-white"
              onClick={() => setShowMedia(true)}
              type="button"
            >
              {editing.image ? (
                <img alt="" className="h-full w-full object-cover" src={editing.image} />
              ) : (
                <span className="text-sm text-kelp-ink/60">Choose a portrait</span>
              )}
              <span className="absolute inset-x-3 bottom-3 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-kelp-ink/80 opacity-0 shadow transition group-hover:opacity-100">
                Choose from media library
              </span>
            </button>
            <Field label="Name">
              <Input
                onChange={(event) =>
                  setEditing((current) =>
                    current ? { ...current, name: event.target.value } : current,
                  )
                }
                value={editing.name}
              />
            </Field>
            <Field label="Role">
              <Input
                onChange={(event) =>
                  setEditing((current) =>
                    current ? { ...current, role: event.target.value } : current,
                  )
                }
                value={editing.role}
              />
            </Field>
            <Field label="Biography">
              <Textarea
                onChange={(event) =>
                  setEditing((current) =>
                    current ? { ...current, biography: event.target.value } : current,
                  )
                }
                value={editing.biography}
              />
            </Field>
            <div className="flex justify-end gap-3 pt-2">
              <SecondaryButton onClick={() => setEditing(null)}>Cancel</SecondaryButton>
              <PrimaryButton disabled={saving} onClick={() => void saveMember()}>
                {saving ? "Saving…" : "Save staff member"}
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      ) : null}
      {showMedia ? (
        <Modal onClose={() => setShowMedia(false)} title="Choose staff portrait" wide>
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
