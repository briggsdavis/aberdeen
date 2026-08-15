import {
  Check,
  FileVideo,
  ImageSquare,
  SpinnerGap,
  Trash,
  UploadSimple,
  WarningCircle,
} from "@phosphor-icons/react"
import { useMutation, usePaginatedQuery } from "convex/react"
import { useCallback, useMemo, useRef, useState } from "react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"
import { EmptyState, Input, PrimaryButton, SecondaryButton } from "./ui"

type MediaKind = "image" | "video"
type MediaFilter = "photos" | "videos" | "decorations"

export type MediaSelection = {
  id: Id<"mediaAssets">
  url: string
  thumbnailUrl: string | null
  alt: string
  kind: MediaKind
}

type UploadItem = {
  id: string
  name: string
  progress: number
  status: "queued" | "uploading" | "done" | "error"
  error?: string
}

const pageLabels: Record<string, string> = {
  "/": "Home page",
  "/about": "About page",
  "/contact": "Contact page",
  "/events": "Events page",
  "/staff": "Staff page",
  "/menu/food": "Food menu",
  "/menu/spirits": "Spirits menu",
  "/menu/beverages": "Beverages menu",
}

const allMediaKinds: MediaKind[] = ["image", "video"]

function uploadToStorage(
  url: string,
  body: Blob,
  contentType: string,
  onProgress: (progress: number) => void,
) {
  return new Promise<Id<"_storage">>((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open("POST", url)
    request.setRequestHeader("Content-Type", contentType)
    request.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) onProgress(event.loaded / event.total)
    })
    request.addEventListener("load", () => {
      if (request.status < 200 || request.status >= 300) {
        reject(new Error("Upload failed."))
        return
      }
      const response = JSON.parse(request.responseText) as { storageId: Id<"_storage"> }
      resolve(response.storageId)
    })
    request.addEventListener("error", () => reject(new Error("Upload failed.")))
    request.send(body)
  })
}

function imageMetadata(file: File) {
  return new Promise<{ height: number; width: number }>((resolve, reject) => {
    const image = new Image()
    const url = URL.createObjectURL(file)
    image.addEventListener("load", () => {
      resolve({ height: image.naturalHeight, width: image.naturalWidth })
      URL.revokeObjectURL(url)
    })
    image.addEventListener("error", () => {
      URL.revokeObjectURL(url)
      reject(new Error("This image could not be read."))
    })
    image.src = url
  })
}

function videoMetadata(file: File) {
  return new Promise<{
    duration: number
    height: number
    thumbnail: Blob
    width: number
  }>((resolve, reject) => {
    const video = document.createElement("video")
    const url = URL.createObjectURL(file)
    video.muted = true
    video.preload = "metadata"
    video.addEventListener("loadedmetadata", () => {
      video.currentTime = Math.min(0.2, Math.max(0, video.duration / 10))
    })
    video.addEventListener("seeked", () => {
      const width = video.videoWidth
      const height = video.videoHeight
      const maxWidth = 960
      const scale = Math.min(1, maxWidth / width)
      const canvas = document.createElement("canvas")
      canvas.width = Math.max(1, Math.round(width * scale))
      canvas.height = Math.max(1, Math.round(height * scale))
      canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        (thumbnail) => {
          URL.revokeObjectURL(url)
          if (!thumbnail) {
            reject(new Error("A video poster could not be generated."))
            return
          }
          resolve({ duration: video.duration, height, thumbnail, width })
        },
        "image/jpeg",
        0.82,
      )
    })
    video.addEventListener("error", () => {
      URL.revokeObjectURL(url)
      reject(new Error("This video could not be read."))
    })
    video.src = url
  })
}

export default function MediaLibrary({
  onSelect,
  selectedId,
  acceptedKinds = allMediaKinds,
  initialFilter = "photos",
}: {
  onSelect?: (selection: MediaSelection) => void
  selectedId?: Id<"mediaAssets">
  acceptedKinds?: MediaKind[]
  initialFilter?: MediaFilter
}) {
  const [filter, setFilter] = useState<MediaFilter>(initialFilter)
  const { results, status, loadMore } = usePaginatedQuery(
    api.media.list,
    { kind: filter === "videos" ? "video" : "image" },
    { initialNumItems: 24 },
  )
  const generateUploadUrl = useMutation(api.media.generateUploadUrl)
  const saveMedia = useMutation(api.media.save)
  const removeMedia = useMutation(api.media.remove)
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState("")
  const [uploads, setUploads] = useState<UploadItem[]>([])
  const [dragging, setDragging] = useState(false)
  const [selectedForDelete, setSelectedForDelete] = useState<Set<Id<"mediaAssets">>>(
    () => new Set(),
  )
  const [error, setError] = useState("")
  const filtered = useMemo(
    () =>
      results.filter((asset) => {
        const isDecoration = asset.usageRoles.some(
          (role) => role === "decorative" || role === "background",
        )
        const matchesCategory =
          filter === "videos"
            ? asset.kind === "video"
            : filter === "decorations"
              ? asset.kind === "image" && isDecoration
              : asset.kind === "image" && !isDecoration
        return (
          matchesCategory &&
          `${asset.filename} ${asset.alt}`.toLowerCase().includes(search.toLowerCase())
        )
      }),
    [filter, results, search],
  )

  const updateUpload = useCallback((id: string, values: Partial<UploadItem>) => {
    setUploads((current) =>
      current.map((upload) => (upload.id === id ? { ...upload, ...values } : upload)),
    )
  }, [])

  const uploadOne = useCallback(
    async (file: File, id: string) => {
      const kind: MediaKind = file.type.startsWith("video/") ? "video" : "image"
      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        throw new Error("Only image and video files are supported.")
      }
      if (kind === "video" && !["video/mp4", "video/webm"].includes(file.type)) {
        throw new Error("Videos must be MP4 or WebM.")
      }
      if (!acceptedKinds.includes(kind)) {
        throw new Error(
          kind === "video" ? "Only images can be used here." : "Images are not accepted here.",
        )
      }
      if (kind === "video" && file.size > 100 * 1024 * 1024) {
        throw new Error("Videos must be 100 MB or smaller.")
      }

      updateUpload(id, { progress: 0.02, status: "uploading" })
      const metadata =
        kind === "video"
          ? await videoMetadata(file)
          : { ...(await imageMetadata(file)), duration: undefined, thumbnail: undefined }
      const uploadUrl = await generateUploadUrl()
      const storageId = await uploadToStorage(uploadUrl, file, file.type, (progress) =>
        updateUpload(id, { progress: 0.08 + progress * 0.78 }),
      )
      let thumbnailStorageId: Id<"_storage"> | undefined
      if (metadata.thumbnail) {
        const thumbnailUrl = await generateUploadUrl()
        thumbnailStorageId = await uploadToStorage(
          thumbnailUrl,
          metadata.thumbnail,
          "image/jpeg",
          (progress) => updateUpload(id, { progress: 0.86 + progress * 0.1 }),
        )
      }
      const mediaId = await saveMedia({
        storageId,
        thumbnailStorageId,
        filename: file.name,
        alt: file.name.replace(/\.[^.]+$/, "").replaceAll(/[-_]/g, " "),
        contentType: file.type,
        kind,
        size: file.size,
        width: metadata.width,
        height: metadata.height,
        duration: metadata.duration,
      })
      updateUpload(id, { progress: 1, status: "done" })
      return {
        alt: file.name.replace(/\.[^.]+$/, "").replaceAll(/[-_]/g, " "),
        id: mediaId,
        kind,
        thumbnailUrl: metadata.thumbnail ? URL.createObjectURL(metadata.thumbnail) : null,
        url: URL.createObjectURL(file),
      } satisfies MediaSelection
    },
    [acceptedKinds, generateUploadUrl, saveMedia, updateUpload],
  )

  const uploadFiles = useCallback(
    async (files: File[]) => {
      const items = files.map((file) => ({
        file,
        id: crypto.randomUUID(),
      }))
      setUploads((current) => [
        ...items.map(({ file, id }) => ({
          id,
          name: file.name,
          progress: 0,
          status: "queued" as const,
        })),
        ...current.filter((item) => item.status === "uploading"),
      ])
      setError("")
      let nextIndex = 0
      let lastSelection: MediaSelection | null = null
      const worker = async () => {
        while (nextIndex < items.length) {
          const item = items[nextIndex]
          nextIndex += 1
          if (!item) return
          try {
            lastSelection = await uploadOne(item.file, item.id)
          } catch (uploadError) {
            updateUpload(item.id, {
              error: uploadError instanceof Error ? uploadError.message : "Upload failed.",
              status: "error",
            })
          }
        }
      }
      await Promise.all(Array.from({ length: Math.min(4, items.length) }, () => worker()))
      if (items.length === 1 && lastSelection && onSelect) onSelect(lastSelection)
    },
    [onSelect, updateUpload, uploadOne],
  )

  const deleteIds = useCallback(
    async (ids: Id<"mediaAssets">[]) => {
      if (
        !ids.length ||
        !window.confirm(`Delete ${ids.length} unused media item${ids.length > 1 ? "s" : ""}?`)
      ) {
        return
      }
      setError("")
      try {
        await removeMedia({ ids })
        setSelectedForDelete(new Set())
      } catch (removeError) {
        setError(
          removeError instanceof Error
            ? removeError.message
            : "The selected media could not be deleted.",
        )
      }
    },
    [removeMedia],
  )

  const toggleDeleteSelection = useCallback((id: Id<"mediaAssets">) => {
    setSelectedForDelete((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <div className="grid gap-4">
      <div
        className={`rounded-xl border-2 border-dashed p-4 transition ${
          dragging
            ? "border-aberdeen-blue bg-aberdeen-blue/5"
            : "border-kelp-ink/15 bg-oyster-white"
        }`}
        onDragEnter={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragging(false)
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          void uploadFiles([...event.dataTransfer.files])
        }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-52 grow">
            <p className="text-sm font-semibold text-kelp-ink/80">
              Drop {acceptedKinds.includes("video") ? "images or videos" : "images"} here
            </p>
            <p className="mt-1 text-xs text-kelp-ink/60">
              {acceptedKinds.includes("video")
                ? "Images, MP4, and WebM videos up to 100 MB."
                : "Images only."}
            </p>
          </div>
          <input
            accept={acceptedKinds.includes("video") ? "image/*,video/mp4,video/webm" : "image/*"}
            className="hidden"
            multiple
            onChange={(event) => {
              void uploadFiles([...(event.target.files ?? [])])
              event.target.value = ""
            }}
            ref={inputRef}
            type="file"
          />
          <PrimaryButton onClick={() => inputRef.current?.click()} type="button">
            <UploadSimple size={17} /> Upload new
          </PrimaryButton>
        </div>
      </div>
      {uploads.length ? (
        <div className="grid gap-2 rounded-xl border border-kelp-ink/15 bg-white p-3">
          {uploads.map((upload) => (
            <div className="grid grid-cols-[1fr_auto] items-center gap-3" key={upload.id}>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="truncate font-medium text-kelp-ink/80">{upload.name}</span>
                  <span className={upload.status === "error" ? "text-danger" : "text-kelp-ink/45"}>
                    {upload.status === "error"
                      ? upload.error
                      : upload.status === "done"
                        ? "Complete"
                        : `${Math.round(upload.progress * 100)}%`}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-aberdeen-peach/40">
                  <div
                    className={`h-full rounded-full transition-all ${upload.status === "error" ? "bg-danger/60" : "bg-aberdeen-blue"}`}
                    style={{ width: `${upload.progress * 100}%` }}
                  />
                </div>
              </div>
              {upload.status === "uploading" ? (
                <SpinnerGap className="animate-spin text-aberdeen-blue" size={16} />
              ) : upload.status === "error" ? (
                <WarningCircle className="text-danger" size={16} />
              ) : (
                <Check className="text-success" size={16} />
              )}
            </div>
          ))}
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Input
          className="min-w-56 grow"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search loaded media"
          value={search}
        />
        <div className="flex rounded-lg border border-kelp-ink/15 bg-white p-1">
          {(["photos", "videos", "decorations"] as const).map((kind) => (
            <button
              className={`rounded-md px-3 py-2 text-xs font-semibold capitalize transition ${
                filter === kind
                  ? "bg-aberdeen-blue text-white"
                  : "text-kelp-ink/60 hover:bg-oyster-white"
              }`}
              key={kind}
              onClick={() => setFilter(kind)}
              type="button"
            >
              {kind}
            </button>
          ))}
        </div>
        {selectedForDelete.size ? (
          <SecondaryButton
            className="text-danger"
            onClick={() => void deleteIds([...selectedForDelete])}
          >
            <Trash size={16} /> Delete {selectedForDelete.size}
          </SecondaryButton>
        ) : null}
      </div>
      {error ? (
        <p className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
      ) : null}
      {!onSelect ? (
        <p className="text-xs text-kelp-ink/60">
          Click any unused media item to select it, then use Delete selected. Items marked In use
          must be removed from their page before they can be deleted.
        </p>
      ) : null}
      {status === "LoadingFirstPage" ? (
        <div className="h-56 animate-pulse rounded-xl bg-aberdeen-peach/40" />
      ) : filtered.length === 0 ? (
        <EmptyState>
          <div>
            <ImageSquare className="mx-auto mb-2" size={28} />
            No media found. Upload the first files to the library.
          </div>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {filtered.map((asset) => {
            const inUse = asset.usageCount > 0
            const selected = selectedId === asset._id
            const compatible = acceptedKinds.includes(asset.kind)
            const checked = selectedForDelete.has(asset._id)
            const selectingForDelete = !onSelect
            const cardEnabled = selectingForDelete ? !inUse : compatible && Boolean(asset.url)
            return (
              <article
                className={`group relative overflow-hidden rounded-xl border bg-aberdeen-peach/40 transition hover:-translate-y-0.5 hover:shadow-md ${
                  selected || checked
                    ? "border-aberdeen-blue ring-2 ring-aberdeen-blue/15"
                    : "border-kelp-ink/15"
                }`}
                key={asset._id}
              >
                <button
                  aria-pressed={selectingForDelete ? checked : undefined}
                  className={`block w-full text-left ${cardEnabled ? "" : "cursor-not-allowed opacity-55"}`}
                  disabled={!cardEnabled}
                  onClick={() => {
                    if (selectingForDelete) {
                      toggleDeleteSelection(asset._id)
                    } else if (asset.url) {
                      onSelect({
                        id: asset._id,
                        url: asset.url,
                        thumbnailUrl: asset.thumbnailUrl,
                        alt: asset.alt || asset.filename,
                        kind: asset.kind,
                      })
                    }
                  }}
                  type="button"
                >
                  <div className="relative aspect-square bg-aberdeen-peach/55">
                    {asset.thumbnailUrl || (asset.kind === "image" && asset.url) ? (
                      <img
                        alt={asset.alt}
                        className={`h-full w-full object-cover transition group-hover:scale-[1.02] ${inUse ? "opacity-70" : ""}`}
                        loading="lazy"
                        src={asset.thumbnailUrl ?? asset.url ?? ""}
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-kelp-ink/45">
                        <FileVideo size={38} />
                      </div>
                    )}
                    <span className="absolute top-2 left-2 rounded-md bg-kelp-ink/70 px-2 py-1 text-[9px] font-bold tracking-wide text-white uppercase">
                      {asset.kind}
                    </span>
                    {selected || checked ? (
                      <span className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-aberdeen-blue text-white">
                        <Check size={15} weight="bold" />
                      </span>
                    ) : null}
                    {!selectingForDelete && !compatible ? (
                      <span className="absolute inset-x-2 bottom-2 rounded-md bg-white/95 px-2 py-1.5 text-center text-[10px] font-semibold text-kelp-ink/70">
                        Hero sections only
                      </span>
                    ) : null}
                    {selectingForDelete && inUse ? (
                      <span className="absolute right-2 bottom-2 rounded-md bg-white/95 px-2 py-1.5 text-[10px] font-semibold text-kelp-ink/70">
                        In use
                      </span>
                    ) : null}
                  </div>
                  <div className="min-h-24 bg-aberdeen-peach/40 p-2.5">
                    <p className="truncate text-xs font-semibold text-kelp-ink/80">
                      {asset.filename}
                    </p>
                    <div className="mt-2 space-y-0.5 text-[10px] leading-4 text-kelp-ink/60">
                      {asset.usages.length ? (
                        asset.usages.map((usage) => (
                          <p key={usage.page}>
                            {pageLabels[usage.page] ?? usage.page} · {usage.count}
                          </p>
                        ))
                      ) : (
                        <p>Not currently used</p>
                      )}
                    </div>
                  </div>
                </button>
              </article>
            )
          })}
        </div>
      )}
      {status === "CanLoadMore" ? (
        <SecondaryButton className="mx-auto" onClick={() => loadMore(24)}>
          Load more
        </SecondaryButton>
      ) : null}
    </div>
  )
}
