import { useEffect } from "react"
import { useLocation } from "react-router"
import { useCmsRuntime } from "../lib/cms-runtime"

type MediaRole = "content" | "decorative" | "background"

type TextTarget = {
  key: string
  node: Text
  parent: HTMLElement
}

type ImageTarget = {
  acceptsVideo: boolean
  element: HTMLImageElement
  key: string
  role: MediaRole
  videoElement?: HTMLVideoElement
}

type LinkTarget = {
  key: string
  element: HTMLAnchorElement
}

type AppliedMedia = {
  kind: "image" | "video"
  thumbnailUrl: string | null
  url: string
}

function elementPath(element: Element, root: Element) {
  const parts: string[] = []
  let current: Element | null = element

  while (current && current !== root) {
    const parent: Element | null = current.parentElement
    if (!parent) break
    const siblings = [...parent.children].filter((child) => child.tagName === current!.tagName)
    parts.unshift(`${current.tagName.toLowerCase()}:${siblings.indexOf(current)}`)
    current = parent
  }

  return parts.join("/")
}

function legacyCompatiblePath(path: string, page: string) {
  if (page !== "/") return path

  return path.replace(/^(div:0\/section:)(\d+)/, (match, prefix: string, section: string) => {
    const sectionIndex = Number(section)
    return sectionIndex >= 2 ? `${prefix}${sectionIndex - 1}` : match
  })
}

function imageRole(element: HTMLImageElement, root: HTMLElement): MediaRole {
  const firstSection = root.querySelector("section")
  const isHeroBackground =
    firstSection?.contains(element) &&
    element.classList.contains("absolute") &&
    element.classList.contains("inset-0") &&
    element.classList.contains("object-cover")

  if (isHeroBackground) return "background"
  if (
    element.src.includes("/maps/") ||
    element.src.includes("/illustrations/") ||
    element.closest("[aria-hidden='true'], .pointer-events-none")
  ) {
    return "decorative"
  }
  return "content"
}

function isFixedAsset(element: HTMLImageElement) {
  return (
    element.src.includes("/frames/") ||
    element.src.includes("/brand/") ||
    Boolean(element.closest("[data-cms-no-edit]"))
  )
}

function isStructuredLink(element: HTMLAnchorElement) {
  return Boolean(
    element.dataset.cmsStructuredLink !== undefined ||
    element.querySelector("article, div, h1, h2, h3, h4, h5, h6, img, p, picture, section, video"),
  )
}

function collectTargets(root: HTMLElement, page: string) {
  const text: TextTarget[] = []
  const images: ImageTarget[] = []
  const links: LinkTarget[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)

  while (walker.nextNode()) {
    const node = walker.currentNode as Text
    const parent = node.parentElement
    const hasNamedTextKey = Boolean(parent?.dataset.cmsTextKey)
    if (
      !parent ||
      !node.nodeValue?.trim() ||
      parent.closest("[data-cms-no-edit]") ||
      parent.closest("script, style") ||
      (!hasNamedTextKey && parent.closest("a, button"))
    ) {
      continue
    }
    const childIndex = [...parent.childNodes].indexOf(node)
    text.push({
      key:
        parent.dataset.cmsTextKey ??
        `${legacyCompatiblePath(elementPath(parent, root), page)}|text:${childIndex}`,
      node,
      parent,
    })
  }

  for (const element of root.querySelectorAll<HTMLImageElement>("img")) {
    if (isFixedAsset(element)) continue
    const role = imageRole(element, root)
    images.push({
      acceptsVideo: Boolean(
        role === "background" && root.querySelector("section")?.contains(element),
      ),
      key: element.dataset.cmsSlot ?? legacyCompatiblePath(elementPath(element, root), page),
      element,
      role,
    })
  }

  for (const element of root.querySelectorAll<HTMLAnchorElement>("a")) {
    if (
      !element.textContent?.trim() ||
      element.closest("[data-cms-no-edit]") ||
      isStructuredLink(element)
    ) {
      continue
    }
    links.push({
      key:
        element.dataset.cmsLinkKey ?? legacyCompatiblePath(elementPath(element, root), page),
      element,
    })
  }

  return { text, images, links }
}

function applyMedia(target: ImageTarget, media: AppliedMedia) {
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

export default function CmsDomBridge() {
  const location = useLocation()
  const { page, pageReady } = useCmsRuntime()

  useEffect(() => {
    if (!pageReady) return
    const root = document.querySelector<HTMLElement>("main")
    if (!root) return
    const preview = new URLSearchParams(location.search).has("cmsPreview")
    const targets = collectTargets(root, location.pathname)

    for (const target of targets.text) {
      if (page.text[target.key] !== undefined) target.node.nodeValue = page.text[target.key]!
    }
    for (const target of targets.links) {
      const override = page.links[target.key]
      if (override) {
        target.element.textContent = override.text
        target.element.href = override.href
      }
    }
    for (const target of targets.images) {
      const media = page.media[target.key]
      if (media) applyMedia(target, media)
      else if (page.images[target.key]) {
        applyMedia(target, {
          kind: "image",
          thumbnailUrl: null,
          url: page.images[target.key]!,
        })
      }
    }

    if (!preview) {
      return () => {
        for (const target of targets.images) {
          target.videoElement?.remove()
          target.element.style.visibility = ""
        }
      }
    }

    const cleanups: Array<() => void> = []
    document.documentElement.classList.add("cms-preview-mode")

    for (const target of targets.text) {
      const span = document.createElement("span")
      span.dataset.cmsText = target.key
      span.contentEditable = "true"
      span.spellcheck = true
      span.textContent = target.node.nodeValue
      target.node.replaceWith(span)
      const handleInput = () => {
        window.parent.postMessage(
          {
            source: "aberdeen-cms",
            type: "text",
            key: target.key,
            value: span.textContent ?? "",
          },
          window.location.origin,
        )
      }
      span.addEventListener("input", handleInput)
      cleanups.push(() => span.removeEventListener("input", handleInput))
      cleanups.push(() => {
        target.node.nodeValue = span.textContent
        if (span.isConnected) span.replaceWith(target.node)
      })
    }

    for (const target of targets.images) {
      const interactiveElement = target.videoElement ?? target.element
      interactiveElement.dataset.cmsImage = target.key
      interactiveElement.dataset.cmsMediaRole = target.role
      interactiveElement.title =
        target.role === "content" || target.acceptsVideo
          ? "Click to replace"
          : `Double-click to replace ${target.role} image`
      const blockedParent = interactiveElement.closest<HTMLElement>(".pointer-events-none")
      if (blockedParent) blockedParent.dataset.cmsEditableContainer = ""
    }

    const openMedia = (event: MouseEvent, interaction: "single" | "double") => {
      if (!(event.target instanceof Element)) return
      let element = event.target.closest<HTMLElement>("[data-cms-image]")
      let target = targets.images.find((item) => item.key === element?.dataset.cmsImage)

      if (!target && interaction === "single") {
        const heroTarget = targets.images.find((item) => item.key === "hero")
        const heroSection = heroTarget?.element.closest("section")
        const clickedEditableContent = event.target.closest(
          "[data-cms-text], [data-cms-link], a, button, input, select, textarea",
        )
        if (heroTarget && heroSection?.contains(event.target) && !clickedEditableContent) {
          target = heroTarget
          element = heroTarget.videoElement ?? heroTarget.element
        }
      }

      if (!target) return
      const opensOnSingleClick = target.role === "content" || target.acceptsVideo
      if ((interaction === "single") !== opensOnSingleClick) return
      event.preventDefault()
      event.stopPropagation()
      window.parent.postMessage(
        {
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
        },
        window.location.origin,
      )
    }
    const handleClick = (event: MouseEvent) => openMedia(event, "single")
    const handleDoubleClick = (event: MouseEvent) => openMedia(event, "double")
    root.addEventListener("click", handleClick)
    root.addEventListener("dblclick", handleDoubleClick)
    cleanups.push(() => root.removeEventListener("click", handleClick))
    cleanups.push(() => root.removeEventListener("dblclick", handleDoubleClick))

    const handleParentMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.source !== "aberdeen-cms-parent") {
        return
      }
      if (event.data.type === "applyMedia") {
        const matchingTargets = targets.images.filter((item) => item.key === event.data.key)
        if (
          matchingTargets.length &&
          (event.data.kind === "image" || event.data.kind === "video") &&
          typeof event.data.url === "string"
        ) {
          for (const target of matchingTargets) {
            applyMedia(target, {
              kind: event.data.kind,
              thumbnailUrl:
                typeof event.data.thumbnailUrl === "string" ? event.data.thumbnailUrl : null,
              url: event.data.url,
            })
            const element = target.videoElement ?? target.element
            element.dataset.cmsImage = target.key
            element.dataset.cmsMediaRole = target.role
            element.title =
              target.role === "content" || target.acceptsVideo
                ? "Click to replace"
                : `Double-click to replace ${target.role} image`
          }
        }
      }
      if (event.data.type === "applyLink") {
        const target = targets.links.find((item) => item.key === event.data.key)
        if (!target) return
        if (typeof event.data.text === "string") target.element.textContent = event.data.text
        if (typeof event.data.href === "string") target.element.href = event.data.href
      }
    }
    window.addEventListener("message", handleParentMessage)
    cleanups.push(() => window.removeEventListener("message", handleParentMessage))

    for (const target of targets.links) target.element.dataset.cmsLink = target.key

    const handlePreviewLinkClick = (event: MouseEvent) => {
      const element = (event.target as Element).closest<HTMLAnchorElement>("[data-cms-link]")
      if (!element || !root.contains(element)) return

      // Let editable images nested inside a link use the media picker. The image
      // handler will still prevent the link's default navigation.
      if ((event.target as Element).closest("[data-cms-image]")) return

      const target = targets.links.find((item) => item.key === element.dataset.cmsLink)
      if (!target) return
      event.preventDefault()
      event.stopPropagation()
      window.parent.postMessage(
        {
          source: "aberdeen-cms",
          type: "link",
          key: target.key,
          text: target.element.textContent?.trim() ?? "",
          href: target.element.getAttribute("href") ?? "",
        },
        window.location.origin,
      )
    }
    document.addEventListener("click", handlePreviewLinkClick, true)
    cleanups.push(() => document.removeEventListener("click", handlePreviewLinkClick, true))

    window.parent.postMessage(
      {
        source: "aberdeen-cms",
        type: "ready",
        page: location.pathname,
        text: Object.fromEntries(
          targets.text.map((target) => [target.key, target.node.nodeValue ?? ""]),
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
      },
      window.location.origin,
    )

    return () => {
      document.documentElement.classList.remove("cms-preview-mode")
      for (const target of targets.images) {
        target.videoElement?.remove()
        target.element.style.visibility = ""
        target.element
          .closest<HTMLElement>("[data-cms-editable-container]")
          ?.removeAttribute("data-cms-editable-container")
      }
      for (const cleanup of cleanups) cleanup()
    }
  }, [location.pathname, location.search, page, pageReady])

  return null
}
