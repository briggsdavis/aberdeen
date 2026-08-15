import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { ConvexReactClient } from "convex/react"
import { MotionConfig } from "motion/react"
import { StrictMode } from "react"
import type { ReactNode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
// oxlint-disable-next-line import/no-unassigned-import
import "lenis/dist/lenis.css"
// oxlint-disable-next-line import/no-unassigned-import
import "./index.css"
import App from "./app.tsx"
import AppErrorBoundary from "./components/app-error-boundary.tsx"
import { PublicDataProvider } from "./lib/public-data.tsx"

const convexUrl = import.meta.env.VITE_CONVEX_URL
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null

function Providers({ children }: { children: ReactNode }) {
  if (!convex) {
    return (
      <MotionConfig reducedMotion="user">
        <BrowserRouter>{children}</BrowserRouter>
      </MotionConfig>
    )
  }

  return (
    <ConvexAuthProvider client={convex}>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <PublicDataProvider>{children}</PublicDataProvider>
        </BrowserRouter>
      </MotionConfig>
    </ConvexAuthProvider>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppErrorBoundary>
      <Providers>
        <App />
      </Providers>
    </AppErrorBoundary>
  </StrictMode>,
)
