import { useAuthActions } from "@convex-dev/auth/react"
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react"
import { useCallback, useState } from "react"
import { api } from "../../convex/_generated/api"

type AuthFlow = "signIn" | "signUp"

function AdminPage() {
  return (
    <section className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center px-6 py-12">
      <AuthLoading>
        <p className="text-sm tracking-widest uppercase">Loading</p>
      </AuthLoading>
      <Unauthenticated>
        <AdminAuthForm />
      </Unauthenticated>
      <Authenticated>
        <AdminDashboard />
      </Authenticated>
    </section>
  )
}

function AdminAuthForm() {
  const { signIn } = useAuthActions()
  const [flow, setFlow] = useState<AuthFlow>("signIn")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setError("")
      setIsSubmitting(true)

      const formData = new FormData(event.currentTarget)
      formData.set("flow", flow)

      void signIn("password", formData)
        .catch((signInError: unknown) => {
          setError(signInError instanceof Error ? signInError.message : "Authentication failed.")
        })
        .finally(() => setIsSubmitting(false))
    },
    [flow, signIn],
  )
  const handleFlowToggle = useCallback(() => {
    setError("")
    setFlow((currentFlow) => (currentFlow === "signIn" ? "signUp" : "signIn"))
  }, [])

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <p className="text-sm tracking-widest uppercase">Aberdeen Admin</p>
        <h1 className="text-4xl font-semibold">
          {flow === "signIn" ? "Sign in" : "Create admin account"}
        </h1>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-medium">Email</span>
        <input
          aria-label="Email"
          className="w-full border border-aberdeen-blue bg-white px-4 py-3 text-base text-neutral-950 outline-none"
          name="email"
          required
          type="email"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">Password</span>
        <input
          aria-label="Password"
          className="w-full border border-aberdeen-blue bg-white px-4 py-3 text-base text-neutral-950 outline-none"
          minLength={8}
          name="password"
          required
          type="password"
        />
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        className="w-full bg-aberdeen-blue px-5 py-3 font-medium text-white disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Working..." : flow === "signIn" ? "Sign in" : "Sign up"}
      </button>
      <button
        className="w-full border border-aberdeen-blue px-5 py-3 font-medium"
        onClick={handleFlowToggle}
        type="button"
      >
        {flow === "signIn" ? "Need to sign up?" : "Already have an account?"}
      </button>
    </form>
  )
}

function AdminDashboard() {
  const { signOut } = useAuthActions()
  const admin = useQuery(api.admin.currentAdmin)
  const handleSignOut = useCallback(() => {
    void signOut()
  }, [signOut])

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm tracking-widest uppercase">Aberdeen Admin</p>
        <h1 className="text-4xl font-semibold">Dashboard</h1>
      </div>
      <p>{admin?.email ?? "Signed in"}</p>
      <button
        className="bg-aberdeen-blue px-5 py-3 font-medium text-white"
        onClick={handleSignOut}
        type="button"
      >
        Sign out
      </button>
    </div>
  )
}

export default AdminPage
