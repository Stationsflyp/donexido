"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState("Authenticating with Discord...")

  useEffect(() => {
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    console.log("[v0] Auth callback - code:", code ? "received" : "none", "error:", error)

    if (error) {
      console.error("[v0] Discord OAuth error:", error)
      setStatus("Discord authentication cancelled. Redirecting...")
      setTimeout(() => router.push("/"), 1500)
      return
    }

    if (code) {
      exchangeCodeForToken(code)
    } else {
      console.log("[v0] No code, redirecting to home")
      router.push("/")
    }
  }, [searchParams, router])

  const exchangeCodeForToken = async (code: string) => {
    try {
      console.log("[v0] Starting authentication process...")
      setStatus("Exchanging code for token...")

      const response = await fetch("/api/auth/discord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
          console.error("[v0] Authentication failed:", errorData)
        } catch (e) {
          const errorText = await response.text()
          console.error("[v0] Authentication failed (text response):", errorText)
          errorData = { error: errorText }
        }
        setStatus(`Authentication failed: ${errorData.error || "Unknown error"}. Redirecting...`)
        setTimeout(() => router.push("/"), 2500)
        return
      }

      const data = await response.json()
      console.log("[v0] Authentication successful!")

      setStatus("Login successful! Redirecting...")

      localStorage.setItem("oxcyshop_pending_token", data.token)
      localStorage.setItem("oxcyshop_pending_user", JSON.stringify(data.user))

      await new Promise((resolve) => setTimeout(resolve, 500))

      console.log("[v0] Redirecting to dashboard...")
      window.location.href = "/"
    } catch (error) {
      console.error("[v0] Error during authentication:", error)
      console.error("[v0] Error details:", {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      })
      setStatus("Authentication error. Redirecting...")
      setTimeout(() => router.push("/"), 2500)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">{status}</p>
      </div>
    </div>
  )
}
