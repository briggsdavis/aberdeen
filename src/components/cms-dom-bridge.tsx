import { useEffect } from "react"
import { useLocation } from "react-router"
import { getCmsPreview, mountCmsPageContent } from "../lib/cms-page-content"
import { usePageContent } from "../lib/public-data"

export default function CmsDomBridge() {
  const location = useLocation()
  const { content, ready } = usePageContent()

  useEffect(() => {
    if (!ready) return
    const root = document.querySelector<HTMLElement>("main")
    if (!root) return

    return mountCmsPageContent({
      content,
      page: location.pathname,
      preview: Boolean(getCmsPreview(location.search)),
      root,
    })
  }, [content, location.pathname, location.search, ready])

  return null
}
