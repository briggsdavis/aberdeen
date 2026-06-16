import { Password } from "@convex-dev/auth/providers/Password"
import { convexAuth } from "@convex-dev/auth/server"
import { ConvexError } from "convex/values"

declare const process: {
  env: {
    ADMIN_EMAILS?: string
  }
}

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const email = String(params.email ?? "")
          .trim()
          .toLowerCase()
        const adminEmails = (process.env.ADMIN_EMAILS ?? "")
          .split(",")
          .map((adminEmail: string) => adminEmail.trim().toLowerCase())
          .filter(Boolean)

        if (!email || !adminEmails.includes(email)) {
          throw new ConvexError("Only approved admin emails can sign up.")
        }

        return { email }
      },
    }),
  ],
})
