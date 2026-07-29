import {
  ArrowDown,
  ArrowUp,
  ImageSquare,
  PencilSimple,
  Plus,
  Trash,
} from "@phosphor-icons/react"
import { useMutation, useQuery } from "convex/react"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router"
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
  inputClass,
} from "./ui"

const maps = [
  ["Antique map I", "/maps/antique-map-01.png"],
  ["Antique map II", "/maps/antique-map-02.png"],
  ["Antique map III", "/maps/antique-map-03.png"],
  ["Antique map IV", "/maps/antique-map-04.png"],
  ["Antique map V", "/maps/antique-map-05.png"],
  ["Peloponnese chart", "/maps/peloponnese-chart.png"],
  ["Thimble Islands chart", "/maps/thimble-islands-chart.png"],
] as const

type ImageChoice = { id: Id<"mediaAssets">; url: string }
type Layout = "imageLeft" | "imageRight" | "paired"
type Background = "oyster" | "peach" | "blue"
type PickerTarget = "hero" | "section" | "postcardOne" | "postcardTwo" | "postcardThree"

type SectionDraft = {
  id?: Id<"menuSections">
  layout: Layout
  background: Background
  mapImage: string
  image: ImageChoice | null
  imageCaption: string
  postcards: Array<{ show: boolean; image: ImageChoice | null }>
  groups: Array<{ title: string; note: string }>
}

const emptySection: SectionDraft = {
  layout: "imageLeft",
  background: "oyster",
  mapImage: maps[0][1],
  image: null,
  imageCaption: "",
  postcards: [
    { show: false, image: null },
    { show: false, image: null },
    { show: false, image: null },
  ],
  groups: [{ title: "", note: "" }],
}

function ImageField({
  image,
  label,
  onChoose,
}: {
  image: ImageChoice | null
  label: string
  onChoose: () => void
}) {
  return (
    <Field label={label}>
      <button
        className="group relative grid min-h-32 place-items-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50"
        onClick={onChoose}
        type="button"
      >
        {image ? (
          <img alt="" className="h-40 w-full object-cover" src={image.url} />
        ) : (
          <span className="inline-flex items-center gap-2 text-sm text-slate-500">
            <ImageSquare size={19} /> Choose image
          </span>
        )}
        {image ? (
          <span className="absolute inset-x-3 bottom-3 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 opacity-0 shadow transition group-hover:opacity-100">
            Replace image
          </span>
        ) : null}
      </button>
    </Field>
  )
}

export default function MenuPagesEditor({ creating = false }: { creating?: boolean }) {
  const navigate = useNavigate()
  const { pageId: rawPageId } = useParams()
  const pageId = rawPageId as Id<"menuPages"> | undefined
  const pages = useQuery(api.menus.listAdmin)
  const page = useQuery(api.menus.getAdmin, pageId && !creating ? { id: pageId } : "skip")
  const createPage = useMutation(api.menus.createPage)
  const updatePage = useMutation(api.menus.updatePage)
  const removePage = useMutation(api.menus.removePage)
  const reorderPages = useMutation(api.menus.reorderPages)
  const createSection = useMutation(api.menus.createSection)
  const updateSection = useMutation(api.menus.updateSection)
  const removeSection = useMutation(api.menus.removeSection)
  const reorderSections = useMutation(api.menus.reorderSections)
  const moveSection = useMutation(api.menus.moveSection)
  const updateGroup = useMutation(api.menus.updateGroup)
  const createItem = useMutation(api.menus.createItem)
  const updateItem = useMutation(api.menus.updateItem)
  const removeItem = useMutation(api.menus.removeItem)
  const reorderItems = useMutation(api.menus.reorderItems)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [hero, setHero] = useState<ImageChoice | null>(null)
  const [sectionDraft, setSectionDraft] = useState<SectionDraft | null>(null)
  const [picker, setPicker] = useState<PickerTarget | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [groupDraft, setGroupDraft] = useState<{
    id: Id<"menuGroups">
    title: string
    note: string
  } | null>(null)
  const [itemDraft, setItemDraft] = useState<{
    groupId: Id<"menuGroups">
    id?: Id<"menuItems">
    name: string
    description: string
    price: string
  } | null>(null)

  useEffect(() => {
    if (!page) return
    setTitle(page.title)
    setDescription(page.description)
    if (page.heroImage) setHero({ id: page.heroMediaId, url: page.heroImage })
  }, [page])

  const pageIndex = useMemo(
    () => pages?.findIndex((candidate) => candidate._id === pageId) ?? -1,
    [pageId, pages],
  )

  async function savePage() {
    if (!title.trim() || !description.trim() || !hero) {
      setError("Add a title, description, and hero image.")
      return
    }
    setSaving(true)
    setError("")
    try {
      if (creating) {
        const id = await createPage({
          title: title.trim(),
          description: description.trim(),
          heroMediaId: hero.id,
        })
        navigate(`/admin/menus/${id}`)
      } else if (pageId) {
        await updatePage({
          id: pageId,
          title: title.trim(),
          description: description.trim(),
          heroMediaId: hero.id,
        })
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "The menu page could not be saved.")
    } finally {
      setSaving(false)
    }
  }

  function draftFromSection(section: NonNullable<typeof page>["sections"][number]) {
    setSectionDraft({
      id: section._id,
      layout: section.layout,
      background: section.background,
      mapImage: section.mapImage,
      image:
        section.image && section.imageMediaId
          ? { id: section.imageMediaId, url: section.image }
          : null,
      imageCaption: section.imageCaption,
      postcards: [
        {
          show: section.showPostcardOne,
          image:
            section.postcards[0] && section.postcardOneMediaId
              ? { id: section.postcardOneMediaId, url: section.postcards[0] }
              : null,
        },
        {
          show: section.showPostcardTwo,
          image:
            section.postcards[1] && section.postcardTwoMediaId
              ? { id: section.postcardTwoMediaId, url: section.postcards[1] }
              : null,
        },
        {
          show: section.showPostcardThree,
          image:
            section.postcards[2] && section.postcardThreeMediaId
              ? { id: section.postcardThreeMediaId, url: section.postcards[2] }
              : null,
        },
      ],
      groups: section.groups.map(({ title: groupTitle, note }) => ({
        title: groupTitle,
        note,
      })),
    })
  }

  async function saveSection() {
    if (!sectionDraft || !pageId) return
    if (
      sectionDraft.groups.some((group) => !group.title.trim()) ||
      (sectionDraft.layout !== "paired" && !sectionDraft.image)
    ) {
      setError("Add every menu-list title and the main image required by this layout.")
      return
    }
    const values = {
      layout: sectionDraft.layout,
      background: sectionDraft.background,
      mapImage: sectionDraft.mapImage,
      imageMediaId: sectionDraft.image?.id,
      imageCaption: sectionDraft.imageCaption,
      showPostcardOne: sectionDraft.postcards[0]?.show ?? false,
      postcardOneMediaId: sectionDraft.postcards[0]?.image?.id,
      showPostcardTwo: sectionDraft.postcards[1]?.show ?? false,
      postcardTwoMediaId: sectionDraft.postcards[1]?.image?.id,
      showPostcardThree: sectionDraft.postcards[2]?.show ?? false,
      postcardThreeMediaId: sectionDraft.postcards[2]?.image?.id,
    }
    setSaving(true)
    setError("")
    try {
      if (sectionDraft.id) {
        await updateSection({ id: sectionDraft.id, ...values })
      } else {
        await createSection({
          pageId,
          ...values,
          groups: sectionDraft.groups.map((group) => ({
            title: group.title.trim(),
            note: group.note.trim(),
          })),
        })
      }
      setSectionDraft(null)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "The section could not be saved.")
    } finally {
      setSaving(false)
    }
  }

  function chooseImage(selection: MediaSelection) {
    const image = { id: selection.id, url: selection.url }
    if (picker === "hero") setHero(image)
    else if (sectionDraft && picker === "section") {
      setSectionDraft({ ...sectionDraft, image })
    } else if (
      sectionDraft &&
      (picker === "postcardOne" || picker === "postcardTwo" || picker === "postcardThree")
    ) {
      const index = { postcardOne: 0, postcardTwo: 1, postcardThree: 2 }[picker]
      const postcards = [...sectionDraft.postcards]
      postcards[index] = { show: true, image }
      setSectionDraft({ ...sectionDraft, postcards })
    }
    setPicker(null)
  }

  async function shiftPage(direction: -1 | 1) {
    if (!pages || pageIndex < 0) return
    const target = pageIndex + direction
    if (target < 0 || target >= pages.length) return
    const ids = pages.map((candidate) => candidate._id)
    ;[ids[pageIndex], ids[target]] = [ids[target]!, ids[pageIndex]!]
    await reorderPages({ ids })
  }

  async function shiftSection(index: number, direction: -1 | 1) {
    if (!page || !pageId) return
    const target = index + direction
    if (target < 0 || target >= page.sections.length) return
    const ids = page.sections.map((section) => section._id)
    ;[ids[index], ids[target]] = [ids[target]!, ids[index]!]
    await reorderSections({ pageId, ids })
  }

  async function shiftItem(
    groupId: Id<"menuGroups">,
    items: Array<{ _id: Id<"menuItems"> }>,
    index: number,
    direction: -1 | 1,
  ) {
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const ids = items.map((item) => item._id)
    ;[ids[index], ids[target]] = [ids[target]!, ids[index]!]
    await reorderItems({ groupId, ids })
  }

  if (!creating && page === undefined) {
    return <div className="h-72 animate-pulse rounded-xl bg-slate-100" />
  }

  if (!creating && page === null) {
    return <EmptyState>That menu page could not be found.</EmptyState>
  }

  return (
    <div className="grid gap-6">
      <PageHeading
        actions={
          !creating && pageId ? (
            <div className="flex flex-wrap gap-2">
              <SecondaryButton disabled={pageIndex <= 0} onClick={() => void shiftPage(-1)}>
                <ArrowUp size={16} /> Move page up
              </SecondaryButton>
              <SecondaryButton
                disabled={!pages || pageIndex === pages.length - 1}
                onClick={() => void shiftPage(1)}
              >
                <ArrowDown size={16} /> Move page down
              </SecondaryButton>
              <SecondaryButton
                className="text-red-600"
                onClick={() => {
                  if (window.confirm(`Delete the ${title} menu page and all of its sections?`)) {
                    void removePage({ id: pageId }).then(() => navigate("/admin"))
                  }
                }}
              >
                <Trash size={16} /> Delete page
              </SecondaryButton>
            </div>
          ) : undefined
        }
        description={
          creating
            ? "Add the page details. Its URL is generated automatically from the title."
            : "Manage this page, its sections, paired lists, images, and menu items."
        }
        title={creating ? "Add menu page" : `${page?.title ?? "Menu"} editor`}
      />

      {error ? <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

      <section className="grid gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[1fr_1fr]">
        <div className="grid content-start gap-4">
          <Field label="Page title">
            <Input onChange={(event) => setTitle(event.target.value)} value={title} />
          </Field>
          <Field hint={`Public URL: /menu/${title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`} label="Description">
            <Textarea
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          </Field>
          <PrimaryButton disabled={saving} onClick={() => void savePage()}>
            {saving ? "Saving…" : creating ? "Create and publish page" : "Save page details"}
          </PrimaryButton>
        </div>
        <ImageField image={hero} label="Hero banner image" onChoose={() => setPicker("hero")} />
      </section>

      {!creating && page ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl text-aberdeen-blue">Sections</h2>
              <p className="mt-1 text-sm text-slate-500">
                Sections publish immediately when saved.
              </p>
            </div>
            <PrimaryButton
              onClick={() =>
                setSectionDraft({
                  ...emptySection,
                  postcards: emptySection.postcards.map((postcard) => ({ ...postcard })),
                  groups: [{ title: "", note: "" }],
                })
              }
            >
              <Plus size={17} /> Add section
            </PrimaryButton>
          </div>

          {page.sections.length === 0 ? (
            <EmptyState>No sections yet. Add the first section to this menu page.</EmptyState>
          ) : (
            <div className="grid gap-4">
              {page.sections.map((section, sectionIndex) => (
                <article
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                  key={section._id}
                >
                  <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="rounded-full bg-aberdeen-blue/8 px-3 py-1 text-xs font-semibold text-aberdeen-blue">
                      {section.layout === "imageLeft"
                        ? "Image left"
                        : section.layout === "imageRight"
                          ? "Image right"
                          : "Paired lists"}
                    </span>
                    <span className="text-xs capitalize text-slate-500">
                      {section.background} · {maps.find((map) => map[1] === section.mapImage)?.[0] ?? "Map"}
                    </span>
                    <div className="ml-auto flex flex-wrap gap-1">
                      <button
                        aria-label="Move section up"
                        className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-aberdeen-blue"
                        disabled={sectionIndex === 0}
                        onClick={() => void shiftSection(sectionIndex, -1)}
                        type="button"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        aria-label="Move section down"
                        className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-aberdeen-blue"
                        disabled={sectionIndex === page.sections.length - 1}
                        onClick={() => void shiftSection(sectionIndex, 1)}
                        type="button"
                      >
                        <ArrowDown size={16} />
                      </button>
                      <button
                        aria-label="Edit section appearance"
                        className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-aberdeen-blue"
                        onClick={() => draftFromSection(section)}
                        type="button"
                      >
                        <PencilSimple size={16} />
                      </button>
                      <select
                        aria-label="Move section to another page"
                        className={`${inputClass} !w-auto !py-1.5`}
                        onChange={(event) => {
                          if (event.target.value) {
                            void moveSection({
                              id: section._id,
                              destinationPageId: event.target.value as Id<"menuPages">,
                            })
                          }
                        }}
                        value=""
                      >
                        <option value="">Move to…</option>
                        {pages
                          ?.filter((candidate) => candidate._id !== pageId)
                          .map((candidate) => (
                            <option key={candidate._id} value={candidate._id}>
                              {candidate.title}
                            </option>
                          ))}
                      </select>
                      <button
                        aria-label="Delete section"
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          if (window.confirm("Delete this section and all of its menu items?")) {
                            void removeSection({ id: section._id })
                          }
                        }}
                        type="button"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                  <div className={`grid gap-5 p-4 ${section.groups.length === 2 ? "xl:grid-cols-2" : ""}`}>
                    {section.groups.map((group) => (
                      <div className="rounded-xl border border-slate-200" key={group._id}>
                        <div className="flex items-start gap-3 border-b border-slate-200 px-4 py-3">
                          <div className="min-w-0 grow">
                            <h3 className="font-semibold text-slate-900">{group.title}</h3>
                            {group.note ? <p className="mt-1 text-xs text-slate-500">{group.note}</p> : null}
                          </div>
                          <button
                            aria-label="Edit menu-list title"
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-aberdeen-blue"
                            onClick={() =>
                              setGroupDraft({ id: group._id, title: group.title, note: group.note })
                            }
                            type="button"
                          >
                            <PencilSimple size={16} />
                          </button>
                          <PrimaryButton
                            className="!px-3 !py-2"
                            onClick={() =>
                              setItemDraft({
                                groupId: group._id,
                                name: "",
                                description: "",
                                price: "",
                              })
                            }
                          >
                            <Plus size={15} /> Item
                          </PrimaryButton>
                        </div>
                        <div className="divide-y divide-slate-100">
                          {group.items.length === 0 ? (
                            <p className="p-5 text-center text-sm text-slate-400">No menu items.</p>
                          ) : (
                            group.items.map((item, itemIndex) => (
                              <div className="flex items-center gap-3 px-4 py-3" key={item._id}>
                                <div className="min-w-0 grow">
                                  <p className="truncate text-sm font-semibold text-slate-800">
                                    {item.name}
                                  </p>
                                  <p className="truncate text-xs text-slate-500">
                                    {item.description}
                                  </p>
                                </div>
                                <span className="text-xs font-semibold text-aberdeen-blue">
                                  {item.price}
                                </span>
                                <button
                                  aria-label="Move item up"
                                  className="p-1 text-slate-400 hover:text-aberdeen-blue"
                                  disabled={itemIndex === 0}
                                  onClick={() => void shiftItem(group._id, group.items, itemIndex, -1)}
                                  type="button"
                                >
                                  <ArrowUp size={15} />
                                </button>
                                <button
                                  aria-label="Move item down"
                                  className="p-1 text-slate-400 hover:text-aberdeen-blue"
                                  disabled={itemIndex === group.items.length - 1}
                                  onClick={() => void shiftItem(group._id, group.items, itemIndex, 1)}
                                  type="button"
                                >
                                  <ArrowDown size={15} />
                                </button>
                                <button
                                  aria-label="Edit item"
                                  className="p-1 text-slate-400 hover:text-aberdeen-blue"
                                  onClick={() =>
                                    setItemDraft({
                                      groupId: group._id,
                                      id: item._id,
                                      name: item.name,
                                      description: item.description,
                                      price: item.price,
                                    })
                                  }
                                  type="button"
                                >
                                  <PencilSimple size={15} />
                                </button>
                                <button
                                  aria-label="Delete item"
                                  className="p-1 text-slate-400 hover:text-red-600"
                                  onClick={() => {
                                    if (window.confirm(`Delete ${item.name}?`)) {
                                      void removeItem({ id: item._id })
                                    }
                                  }}
                                  type="button"
                                >
                                  <Trash size={15} />
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      ) : null}

      {sectionDraft ? (
        <Modal
          onClose={() => setSectionDraft(null)}
          title={sectionDraft.id ? "Edit section appearance" : "Add menu section"}
          wide
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="grid content-start gap-4">
              <Field
                hint={sectionDraft.id ? "The layout is fixed after creation." : undefined}
                label="Section layout"
              >
                <select
                  className={inputClass}
                  disabled={Boolean(sectionDraft.id)}
                  onChange={(event) => {
                    const layout = event.target.value as Layout
                    setSectionDraft({
                      ...sectionDraft,
                      layout,
                      groups:
                        layout === "paired"
                          ? [
                              sectionDraft.groups[0] ?? { title: "", note: "" },
                              sectionDraft.groups[1] ?? { title: "", note: "" },
                            ]
                          : [sectionDraft.groups[0] ?? { title: "", note: "" }],
                    })
                  }}
                  value={sectionDraft.layout}
                >
                  <option value="imageLeft">Image left, menu right</option>
                  <option value="imageRight">Menu left, image right</option>
                  <option value="paired">Two menu lists side by side</option>
                </select>
              </Field>
              <Field label="Section color">
                <select
                  className={inputClass}
                  onChange={(event) =>
                    setSectionDraft({ ...sectionDraft, background: event.target.value as Background })
                  }
                  value={sectionDraft.background}
                >
                  <option value="oyster">Oyster white</option>
                  <option value="peach">Aberdeen peach</option>
                  <option value="blue">Aberdeen blue</option>
                </select>
              </Field>
              <Field label="Map background">
                <select
                  className={inputClass}
                  onChange={(event) =>
                    setSectionDraft({ ...sectionDraft, mapImage: event.target.value })
                  }
                  value={sectionDraft.mapImage}
                >
                  {maps.map(([label, value]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              {!sectionDraft.id
                ? sectionDraft.groups.map((group, index) => (
                    <div className="grid gap-3 rounded-xl bg-slate-50 p-4" key={index}>
                      <Field label={sectionDraft.layout === "paired" ? `Menu list ${index + 1} title` : "Section title"}>
                        <Input
                          onChange={(event) => {
                            const groups = [...sectionDraft.groups]
                            groups[index] = { ...group, title: event.target.value }
                            setSectionDraft({ ...sectionDraft, groups })
                          }}
                          value={group.title}
                        />
                      </Field>
                      <Field label="Optional note">
                        <Input
                          onChange={(event) => {
                            const groups = [...sectionDraft.groups]
                            groups[index] = { ...group, note: event.target.value }
                            setSectionDraft({ ...sectionDraft, groups })
                          }}
                          value={group.note}
                        />
                      </Field>
                    </div>
                  ))
                : null}
            </div>
            <div className="grid content-start gap-4">
              {sectionDraft.layout !== "paired" ? (
                <>
                  <ImageField
                    image={sectionDraft.image}
                    label="Main section image"
                    onChoose={() => setPicker("section")}
                  />
                  <Field label="Optional image caption">
                    <Input
                      onChange={(event) =>
                        setSectionDraft({ ...sectionDraft, imageCaption: event.target.value })
                      }
                      value={sectionDraft.imageCaption}
                    />
                  </Field>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {sectionDraft.postcards.map((postcard, index) => (
                      <div className="rounded-xl border border-slate-200 p-3" key={index}>
                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <input
                            checked={postcard.show}
                            onChange={(event) => {
                              const next = [...sectionDraft.postcards]
                              next[index] = { ...postcard, show: event.target.checked }
                              setSectionDraft({ ...sectionDraft, postcards: next })
                            }}
                            type="checkbox"
                          />
                          Show postcard {index + 1}
                        </label>
                        <button
                          className="mt-3 grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-lg bg-slate-100 text-xs text-slate-500"
                          onClick={() =>
                            setPicker(
                              (["postcardOne", "postcardTwo", "postcardThree"] as const)[index]!,
                            )
                          }
                          type="button"
                        >
                          {postcard.image ? (
                            <img alt="" className="h-full w-full object-cover" src={postcard.image.url} />
                          ) : (
                            "Choose image"
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="grid min-h-40 place-items-center rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
                  Paired sections use two menu lists and do not display a main or postcard image.
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <SecondaryButton onClick={() => setSectionDraft(null)}>Cancel</SecondaryButton>
            <PrimaryButton disabled={saving} onClick={() => void saveSection()}>
              {saving ? "Saving…" : sectionDraft.id ? "Save appearance" : "Create section"}
            </PrimaryButton>
          </div>
        </Modal>
      ) : null}

      {picker ? (
        <Modal onClose={() => setPicker(null)} title="Choose image" wide>
          <MediaLibrary acceptedKinds={["image"]} onSelect={chooseImage} />
        </Modal>
      ) : null}

      {groupDraft ? (
        <Modal onClose={() => setGroupDraft(null)} title="Edit menu-list heading">
          <div className="grid gap-4">
            <Field label="Title">
              <Input
                onChange={(event) => setGroupDraft({ ...groupDraft, title: event.target.value })}
                value={groupDraft.title}
              />
            </Field>
            <Field label="Optional note">
              <Input
                onChange={(event) => setGroupDraft({ ...groupDraft, note: event.target.value })}
                value={groupDraft.note}
              />
            </Field>
            <div className="flex justify-end gap-3">
              <SecondaryButton onClick={() => setGroupDraft(null)}>Cancel</SecondaryButton>
              <PrimaryButton
                onClick={() =>
                  void updateGroup({
                    id: groupDraft.id,
                    title: groupDraft.title.trim(),
                    note: groupDraft.note.trim(),
                  }).then(() => setGroupDraft(null))
                }
              >
                Save heading
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      ) : null}

      {itemDraft ? (
        <Modal onClose={() => setItemDraft(null)} title={itemDraft.id ? "Edit menu item" : "Add menu item"}>
          <div className="grid gap-4">
            <Field label="Item name">
              <Input
                onChange={(event) => setItemDraft({ ...itemDraft, name: event.target.value })}
                value={itemDraft.name}
              />
            </Field>
            <Field label="Description">
              <Textarea
                onChange={(event) => setItemDraft({ ...itemDraft, description: event.target.value })}
                value={itemDraft.description}
              />
            </Field>
            <Field label="Price">
              <Input
                onChange={(event) => setItemDraft({ ...itemDraft, price: event.target.value })}
                placeholder="$18 or market"
                value={itemDraft.price}
              />
            </Field>
            <div className="flex justify-end gap-3">
              <SecondaryButton onClick={() => setItemDraft(null)}>Cancel</SecondaryButton>
              <PrimaryButton
                onClick={() => {
                  const values = {
                    name: itemDraft.name.trim(),
                    description: itemDraft.description.trim(),
                    price: itemDraft.price.trim(),
                  }
                  const promise = itemDraft.id
                    ? updateItem({ id: itemDraft.id, ...values })
                    : createItem({ groupId: itemDraft.groupId, ...values })
                  void promise.then(() => setItemDraft(null))
                }}
              >
                Save item
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}
