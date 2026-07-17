import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { ConvexReactClient } from "convex/react"
import { MotionConfig } from "motion/react"
import { StrictMode } from "react"
import type { ReactNode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
// oxlint-disable-next-line import/no-unassigned-import
import "./index.css"
import App from "./app.tsx"

const convexUrl = import.meta.env.VITE_CONVEX_URL
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null

function Providers({ children }: { children: ReactNode }) {
  const app = (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>{children}</BrowserRouter>
    </MotionConfig>
  )

  if (!convex) {
    return app
  }

  return <ConvexAuthProvider client={convex}>{app}</ConvexAuthProvider>
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
)
