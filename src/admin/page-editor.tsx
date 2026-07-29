import {
  CheckCircle,
  Desktop,
  DeviceMobile,
  ImageSquare,
  LinkSimple,
  SpinnerGap,
} from "@phosphor-icons/react"
import { useMutation, useQuery } from "convex/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"
import MediaLibrary from "./media-library"
import type { MediaSelection } from "./media-library"
import { Field, Input, Modal, PageHeading, PrimaryButton, SecondaryButton } from "./ui"

type EditorMessage =
  | {
      source: "aberdeen-cms"
      type: "ready"
      page: string
      text: Record<string, string>
      links: Record<string, { text: string; href: string }>
      images: Array<{
        acceptsVideo: boolean
        alt: string
        role: "content" | "decorative" | "background"
        slotKey: string
        url: string
      }>
    }
  | { source: "aberdeen-cms"; type: "text"; key: string; value: string }
  | {
      source: "aberdeen-cms"
      type: "image"
      key: string
      src: string
      alt: string
      acceptsVideo: boolean
      role: "content" | "decorative" | "background"
    }
  | { source: "aberdeen-cms"; type: "link"; key: string; text: string; href: string }

type SelectedImage = {
  key: string
  src: string
  alt: string
  acceptsVideo: boolean
  role: "content" | "decorative" | "background"
}
type SelectedLink = { key: string; text: string; href: string }

const pageNames: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/staff": "Staff page",
}

export default function PageEditor({
  page,
  compact = false,
  previewScope,
}: {
  page: "/" | "/about" | "/staff"
  compact?: boolean
  previewScope?: "staff-introduction"
}) {
  const savedPage = useQuery(api.content.getPageAdmin, { page })
  const savePage = useMutation(api.content.savePage)
  const registerPageAssets = useMutation(api.media.registerPageAssets)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const savedImagesRef = useRef<Record<string, Id<"mediaAssets">>>({})
  const [text, setText] = useState<Record<string, string>>({})
  const [links, setLinks] = useState<Record<string, { text: string; href: string }>>({})
  const [images, setImages] = useState<Record<string, Id<"mediaAssets">>>({})
  const [imageRoles, setImageRoles] = useState<
    Record<string, "content" | "decorative" | "background">
  >({})
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null)
  const [selectedLink, setSelectedLink] = useState<SelectedLink | null>(null)
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop")
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState("")
  const pageDataReady = savedPage !== undefined

  useEffect(() => {
    if (!savedPage) return
    setText(savedPage.text)
    setLinks(savedPage.links)
    setImages(savedPage.images)
    savedImagesRef.current = savedPage.images
  }, [savedPage])

  useEffect(() => {
    const handleMessage = (event: MessageEvent<EditorMessage>) => {
      if (event.origin !== window.location.origin || event.data?.source !== "aberdeen-cms") return
      const message = event.data

      if (message.type === "ready" && message.page === page) {
        setText(message.text)
        setLinks(message.links)
        setImageRoles(
          Object.fromEntries(message.images.map((image) => [image.slotKey, image.role])),
        )
        const unregistered = message.images.filter(
          (image) => savedImagesRef.current[image.slotKey] === undefined,
        )
        if (unregistered.length) {
          void registerPageAssets({
            page,
            assets: unregistered.map(({ slotKey, url, alt, role }) => ({
              slotKey,
              url,
              alt,
              role,
            })),
          }).then((registered) => setImages((current) => ({ ...registered, ...current })))
        }
        setReady(true)
      } else if (message.type === "text") {
        setText((current) => ({ ...current, [message.key]: message.value }))
        setDirty(true)
        setSaved(false)
      } else if (message.type === "image") {
        setSelectedImage(message)
      } else if (message.type === "link") {
        setSelectedLink(message)
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [page, registerPageAssets])

  const postToPreview = useCallback((message: Record<string, unknown>) => {
    iframeRef.current?.contentWindow?.postMessage(
      { source: "aberdeen-cms-parent", ...message },
      window.location.origin,
    )
  }, [])

  const selectImage = useCallback(
    (selection: MediaSelection) => {
      if (!selectedImage) return
      setImages((current) => ({ ...current, [selectedImage.key]: selection.id }))
      postToPreview({
        type: "applyMedia",
        key: selectedImage.key,
        url: selection.url,
        thumbnailUrl: selection.thumbnailUrl,
        kind: selection.kind,
      })
      setDirty(true)
      setSaved(false)
      setSelectedImage(null)
    },
    [postToPreview, selectedImage],
  )

  const applyLink = useCallback(() => {
    if (!selectedLink) return
    setLinks((current) => ({
      ...current,
      [selectedLink.key]: { text: selectedLink.text, href: selectedLink.href },
    }))
    postToPreview({ type: "applyLink", ...selectedLink })
    setDirty(true)
    setSaved(false)
    setSelectedLink(null)
  }, [postToPreview, selectedLink])

  const handleSave = useCallback(async () => {
    setSaving(true)
    setError("")
    try {
      await savePage({ page, text, links, images, imageRoles })
      setDirty(false)
      setSaved(true)
      window.setTimeout(() => setSaved(false), 2400)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Changes could not be saved.")
    } finally {
      setSaving(false)
    }
  }, [imageRoles, images, links, page, savePage, text])

  return (
    <div className="grid gap-6">
      {!compact ? (
        <PageHeading
          actions={
            <div className="flex items-center gap-3">
              <div className="hidden rounded-lg border border-slate-200 bg-white p-1 sm:flex">
                <button
                  aria-label="Desktop preview"
                  className={`rounded-md p-2 ${viewport === "desktop" ? "bg-slate-100 text-aberdeen-blue" : "text-slate-400"}`}
                  onClick={() => setViewport("desktop")}
                  type="button"
                >
                  <Desktop size={18} />
                </button>
                <button
                  aria-label="Mobile preview"
                  className={`rounded-md p-2 ${viewport === "mobile" ? "bg-slate-100 text-aberdeen-blue" : "text-slate-400"}`}
                  onClick={() => setViewport("mobile")}
                  type="button"
                >
                  <DeviceMobile size={18} />
                </button>
              </div>
              <PrimaryButton
                disabled={!dirty || saving || !ready}
                onClick={() => void handleSave()}
              >
                {saving ? (
                  <SpinnerGap className="animate-spin" size={17} />
                ) : saved ? (
                  <CheckCircle size={17} />
                ) : null}
                {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
              </PrimaryButton>
            </div>
          }
          description="Click directly on text to edit it. Click an image to replace it, or click a link or button to change its label and destination."
          title={`${pageNames[page]} editor`}
        />
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {previewScope === "staff-introduction" ? "Hero & introduction" : "Page content"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {previewScope === "staff-introduction"
                ? "Edit the staff page hero and introductory copy here."
                : "Click text, images, and links in the preview."}
            </p>
          </div>
          <PrimaryButton disabled={!dirty || saving || !ready} onClick={() => void handleSave()}>
            {saving ? "Saving…" : saved ? "Saved" : "Save page changes"}
          </PrimaryButton>
        </div>
      )}
      {error ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-200 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <span className="ml-2 rounded-md bg-slate-100 px-3 py-1 text-[11px] text-slate-500">
            Live page preview
          </span>
          {dirty ? (
            <span className="ml-auto text-xs font-medium text-amber-600">Unsaved changes</span>
          ) : null}
        </div>
        <div className="flex justify-center overflow-auto bg-slate-200 p-0 md:p-4">
          {pageDataReady ? (
            <iframe
              className={`min-h-[76svh] bg-white transition-all ${viewport === "mobile" ? "w-[390px]" : "w-full"}`}
              key={page}
              ref={iframeRef}
              src={`${page}?cmsPreview=1${previewScope ? `&cmsScope=${previewScope}` : ""}`}
              title={`${pageNames[page]} editable preview`}
            />
          ) : (
            <div className="min-h-[76svh] w-full animate-pulse bg-white" />
          )}
        </div>
      </div>
      {selectedImage ? (
        <Modal onClose={() => setSelectedImage(null)} title="Choose a replacement image" wide>
          <div className="mb-4 flex items-center gap-3 rounded-lg bg-slate-50 p-3">
            <ImageSquare className="text-aberdeen-blue" size={22} />
            <div>
              <p className="text-sm font-semibold text-slate-800">Replace selected image</p>
              <p className="text-xs text-slate-500">
                Choose from the library or upload a new image.
              </p>
            </div>
          </div>
          <MediaLibrary
            acceptedKinds={selectedImage.acceptsVideo ? ["image", "video"] : ["image"]}
            onSelect={selectImage}
            selectedId={images[selectedImage.key]}
          />
        </Modal>
      ) : null}
      {selectedLink ? (
        <Modal onClose={() => setSelectedLink(null)} title="Edit link or button">
          <div className="grid gap-4">
            <Field label="Button text">
              <Input
                onChange={(event) =>
                  setSelectedLink((current) =>
                    current ? { ...current, text: event.target.value } : current,
                  )
                }
                value={selectedLink.text}
              />
            </Field>
            <Field
              hint="Use a site path such as /contact or a complete web address."
              label="Destination"
            >
              <Input
                onChange={(event) =>
                  setSelectedLink((current) =>
                    current ? { ...current, href: event.target.value } : current,
                  )
                }
                value={selectedLink.href}
              />
            </Field>
            <div className="flex justify-end gap-3 pt-2">
              <SecondaryButton onClick={() => setSelectedLink(null)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={applyLink}>
                <LinkSimple size={17} />
                Apply change
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}
