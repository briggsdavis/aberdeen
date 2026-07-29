import { getAuthUserId } from "@convex-dev/auth/server"
import { ConvexError } from "convex/values"
import type { MutationCtx, QueryCtx } from "../_generated/server"

type AdminCtx = QueryCtx | MutationCtx

export async function requireAdmin(ctx: AdminCtx) {
  const userId = await getAuthUserId(ctx)

  if (userId === null) {
    throw new ConvexError("You must be signed in to access the admin.")
  }

  const user = await ctx.db.get(userId)

  if (!user?.email) {
    throw new ConvexError("This account is not authorized.")
  }

  return { email: user.email, userId }
}
