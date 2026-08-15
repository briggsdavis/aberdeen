export type MediaRole = "background" | "content" | "decorative"

export type PageMedia = {
  kind: "image" | "video"
  thumbnailUrl: string | null
  url: string
}

export type PageContent = {
  text: Record<string, string>
  links: Record<string, { href: string; text: string }>
  media: Record<string, PageMedia>
}

export type CmsPreviewMessage =
  | {
      source: "aberdeen-cms"
      type: "ready"
      page: string
      text: Record<string, string>
      links: Record<string, { href: string; text: string }>
      images: Array<{
        acceptsVideo: boolean
        alt: string
        role: MediaRole
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
      role: MediaRole
    }
  | { source: "aberdeen-cms"; type: "link"; key: string; text: string; href: string }

export type CmsEditorCommand =
  | { type: "applyLink"; key: string; text: string; href: string }
  | {
      type: "applyMedia"
      key: string
      kind: "image" | "video"
      thumbnailUrl: string | null
      url: string
    }
  | { type: "resetMedia"; key: string }

export type CmsEditorMessage = CmsEditorCommand & { source: "aberdeen-cms-parent" }

type TextTarget = {
  element: HTMLElement
  key: string
  originalText: string
}

type ImageTarget = {
  acceptsVideo: boolean
  element: HTMLImageElement
  key: string
  originalSrc: string
  role: MediaRole
  videoElement?: HTMLVideoElement
}

type LinkTarget = {
  element: HTMLAnchorElement
  key: string
  originalHref: string
  originalText: string
}

export const emptyPageContent: PageContent = { text: {}, links: {}, media: {} }

export function getCmsPreview(search: string) {
  const params = new URLSearchParams(search)
  return params.has("cmsPreview") ? { scope: params.get("cmsScope") } : null
}

export function pageImage(content: PageContent, key: string) {
  const media = content.media[key]
  return media?.kind === "image" ? media.url : null
}

function collectTargets(root: HTMLElement) {
  const editable = (element: Element) => !element.closest("[data-cms-no-edit]")
  const text: TextTarget[] = [...root.querySelectorAll<HTMLElement>("[data-cms-text-key]")]
    .filter(editable)
    .map((element) => ({
      element,
      key: element.dataset.cmsTextKey!,
      originalText: element.textContent ?? "",
    }))
  const images: ImageTarget[] = [...root.querySelectorAll<HTMLImageElement>("img[data-cms-slot]")]
    .filter(editable)
    .map((element) => ({
      acceptsVideo: element.dataset.cmsAcceptsVideo !== undefined,
      element,
      key: element.dataset.cmsSlot!,
      originalSrc: element.src,
      role: (element.dataset.cmsMediaRole as MediaRole | undefined) ?? "content",
    }))
  const links: LinkTarget[] = [...root.querySelectorAll<HTMLAnchorElement>("a[data-cms-link-key]")]
    .filter(editable)
    .map((element) => ({
      element,
      key: element.dataset.cmsLinkKey!,
      originalHref: element.getAttribute("href") ?? "",
      originalText: element.textContent ?? "",
    }))

  return { images, links, text }
}

function applyMedia(target: ImageTarget, media: PageMedia) {
  target.videoElement?.remove()
  target.videoElement = undefined
  target.element.style.visibility = ""

  if (media.kind === "video" && target.acceptsVideo) {
    const video = document.createElement("video")
    video.autoplay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    video.className = target.element.className
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.preload = "metadata"
    video.src = media.url
    if (media.thumbnailUrl) video.poster = media.thumbnailUrl
    video.dataset.cmsImage = target.key
    video.dataset.cmsMediaKind = "video"
    target.element.style.visibility = "hidden"
    target.element.insertAdjacentElement("afterend", video)
    target.videoElement = video
    return
  }

  target.element.src = media.url
  target.element.dataset.cmsMediaKind = "image"
}

function resetMedia(target: ImageTarget) {
  target.videoElement?.remove()
  target.videoElement = undefined
  target.element.src = target.originalSrc
  target.element.style.visibility = ""
  delete target.element.dataset.cmsMediaKind
}

function decorateMedia(target: ImageTarget) {
  const element = target.videoElement ?? target.element
  element.dataset.cmsImage = target.key
  element.dataset.cmsMediaRole = target.role
  element.title =
    target.role === "content" || target.acceptsVideo
      ? "Click to replace"
      : `Double-click to replace ${target.role} image`
  const blockedParent = element.closest<HTMLElement>(".pointer-events-none")
  if (blockedParent) blockedParent.dataset.cmsEditableContainer = ""
}

function postToEditor(message: CmsPreviewMessage) {
  window.parent.postMessage(message, window.location.origin)
}

export function mountCmsPageContent({
  content,
  page,
  preview,
  root,
}: {
  content: PageContent
  page: string
  preview: boolean
  root: HTMLElement
}) {
  const targets = collectTargets(root)

  for (const target of targets.text) {
    const text = content.text[target.key]
    if (text !== undefined) target.element.textContent = text
  }
  for (const target of targets.links) {
    const link = content.links[target.key]
    if (!link) continue
    target.element.textContent = link.text
    target.element.href = link.href
  }
  for (const target of targets.images) {
    const media = content.media[target.key]
    if (media) applyMedia(target, media)
  }

  const reset = () => {
    for (const target of targets.text) target.element.textContent = target.originalText
    for (const target of targets.links) {
      target.element.textContent = target.originalText
      target.element.setAttribute("href", target.originalHref)
    }
    for (const target of targets.images) resetMedia(target)
  }

  if (!preview) return reset

  const cleanups: Array<() => void> = [reset]
  document.documentElement.classList.add("cms-preview-mode")

  for (const target of targets.text) {
    target.element.contentEditable = "true"
    target.element.spellcheck = true
    target.element.dataset.cmsText = target.key
    const handleInput = () =>
      postToEditor({
        source: "aberdeen-cms",
        type: "text",
        key: target.key,
        value: target.element.textContent ?? "",
      })
    target.element.addEventListener("input", handleInput)
    cleanups.push(() => {
      target.element.removeEventListener("input", handleInput)
      target.element.removeAttribute("contenteditable")
      delete target.element.dataset.cmsText
    })
  }

  for (const target of targets.images) {
    decorateMedia(target)
  }

  const openMedia = (event: MouseEvent, interaction: "single" | "double") => {
    if (!(event.target instanceof Element)) return
    let element = event.target.closest<HTMLElement>("[data-cms-image]")
    let target = targets.images.find((item) => item.key === element?.dataset.cmsImage)

    if (!target && interaction === "single") {
      const hero = targets.images.find((item) => item.key === "hero")
      const section = hero?.element.closest("section")
      const editableContent = event.target.closest(
        "[data-cms-text], [data-cms-link], a, button, input, select, textarea",
      )
      if (hero && section?.contains(event.target) && !editableContent) {
        target = hero
        element = hero.videoElement ?? hero.element
      }
    }

    if (!target) return
    const singleClick = target.role === "content" || target.acceptsVideo
    if ((interaction === "single") !== singleClick) return
    event.preventDefault()
    event.stopPropagation()
    postToEditor({
      source: "aberdeen-cms",
      type: "image",
      key: target.key,
      src:
        element instanceof HTMLVideoElement
          ? element.currentSrc
          : (element?.getAttribute("src") ?? target.element.currentSrc),
      alt: target.element.alt,
      acceptsVideo: target.acceptsVideo,
      role: target.role,
    })
  }
  const handleClick = (event: MouseEvent) => openMedia(event, "single")
  const handleDoubleClick = (event: MouseEvent) => openMedia(event, "double")
  root.addEventListener("click", handleClick)
  root.addEventListener("dblclick", handleDoubleClick)
  cleanups.push(() => root.removeEventListener("click", handleClick))
  cleanups.push(() => root.removeEventListener("dblclick", handleDoubleClick))

  const handleParentMessage = (event: MessageEvent<CmsEditorMessage>) => {
    if (event.origin !== window.location.origin || event.data?.source !== "aberdeen-cms-parent")
      return
    const message = event.data
    if (message.type === "applyMedia") {
      for (const target of targets.images.filter((item) => item.key === message.key)) {
        applyMedia(target, message)
        decorateMedia(target)
      }
    } else if (message.type === "resetMedia") {
      for (const target of targets.images.filter((item) => item.key === message.key)) {
        resetMedia(target)
        decorateMedia(target)
      }
    } else if (message.type === "applyLink") {
      const target = targets.links.find((item) => item.key === message.key)
      if (!target) return
      target.element.textContent = message.text
      target.element.href = message.href
    }
  }
  window.addEventListener("message", handleParentMessage)
  cleanups.push(() => window.removeEventListener("message", handleParentMessage))

  for (const target of targets.links) target.element.dataset.cmsLink = target.key
  const handleLinkClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element) || event.target.closest("[data-cms-image]")) return
    const element = event.target.closest<HTMLAnchorElement>("[data-cms-link]")
    if (!element || !root.contains(element)) return
    const target = targets.links.find((item) => item.key === element.dataset.cmsLink)
    if (!target) return
    event.preventDefault()
    event.stopPropagation()
    postToEditor({
      source: "aberdeen-cms",
      type: "link",
      key: target.key,
      text: target.element.textContent?.trim() ?? "",
      href: target.element.getAttribute("href") ?? "",
    })
  }
  document.addEventListener("click", handleLinkClick, true)
  cleanups.push(() => document.removeEventListener("click", handleLinkClick, true))

  postToEditor({
    source: "aberdeen-cms",
    type: "ready",
    page,
    text: Object.fromEntries(
      targets.text.map((target) => [target.key, target.element.textContent ?? ""]),
    ),
    links: Object.fromEntries(
      targets.links.map((target) => [
        target.key,
        {
          text: target.element.textContent?.trim() ?? "",
          href: target.element.getAttribute("href") ?? "",
        },
      ]),
    ),
    images: targets.images.map((target) => ({
      acceptsVideo: target.acceptsVideo,
      alt: target.element.alt,
      role: target.role,
      slotKey: target.key,
      url: target.element.currentSrc || target.element.src,
    })),
  })

  return () => {
    document.documentElement.classList.remove("cms-preview-mode")
    for (const target of targets.images) {
      const element = target.videoElement ?? target.element
      element.removeAttribute("data-cms-image")
      target.element
        .closest<HTMLElement>("[data-cms-editable-container]")
        ?.removeAttribute("data-cms-editable-container")
    }
    for (const target of targets.links) delete target.element.dataset.cmsLink
    for (const cleanup of cleanups) cleanup()
  }
}
