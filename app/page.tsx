"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"
import { TermsDialog } from "@/components/terms-dialog"
import { useToast } from "@/hooks/use-toast"
import type { Language } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"

export default function HomePage() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<{ username: string; avatar: string; plan?: string } | null>(null)
  const [showTerms, setShowTerms] = useState(false)
  const [language, setLanguage] = useState<Language>("en")
  const { toast } = useToast()

  useEffect(() => {
    console.log("[v0] HomePage mounted, checking auth state...")

    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "es")) {
      setLanguage(savedLang)
    }

    const pendingToken = localStorage.getItem("oxcyshop_pending_token")
    const pendingUser = localStorage.getItem("oxcyshop_pending_user")

    if (pendingToken && pendingUser) {
      console.log("[v0] Found pending login, processing...")
      localStorage.removeItem("oxcyshop_pending_token")
      localStorage.removeItem("oxcyshop_pending_user")
      handleLogin(pendingToken, JSON.parse(pendingUser))
      return
    }

    const savedToken = localStorage.getItem("oxcyshop_token")
    const savedUser = localStorage.getItem("oxcyshop_user")

    if (savedToken && savedUser) {
      console.log("[v0] Found existing session")
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    } else {
      console.log("[v0] No existing session found")
    }
  }, [])

  const handleLogin = (userToken: string, userData: { username: string; avatar: string; plan?: string }) => {
    console.log("[v0] handleLogin called with user:", userData.username)
    const hasAcceptedTerms = localStorage.getItem("oxcyshop_terms_accepted")

    if (!hasAcceptedTerms) {
      console.log("[v0] Terms not accepted, showing dialog")
      setToken(userToken)
      setUser(userData)
      setShowTerms(true)
    } else {
      console.log("[v0] Terms already accepted, logging in directly")
      localStorage.setItem("oxcyshop_token", userToken)
      localStorage.setItem("oxcyshop_user", JSON.stringify(userData))
      setToken(userToken)
      setUser(userData)
    }
  }

  const handleAcceptTerms = () => {
    console.log("[v0] Terms accepted")
    localStorage.setItem("oxcyshop_terms_accepted", "true")
    if (token && user) {
      localStorage.setItem("oxcyshop_token", token)
      localStorage.setItem("oxcyshop_user", JSON.stringify(user))
    }
    setShowTerms(false)
  }

  const handleRejectTerms = () => {
    console.log("[v0] Terms rejected")

    setToken(null)
    setUser(null)
    setShowTerms(false)

    toast({
      variant: "destructive",
      title: language === "en" ? "Terms Required" : "Términos Requeridos",
      description:
        language === "en"
          ? "You must accept the terms of service to use this platform."
          : "Debes aceptar los términos de servicio para usar esta plataforma.",
      duration: 5000,
    })
  }

  const handleLogout = () => {
    console.log("[v0] Logging out")
    localStorage.removeItem("oxcyshop_token")
    localStorage.removeItem("oxcyshop_user")
    setToken(null)
    setUser(null)
  }

  console.log("[v0] Render - token:", token ? "exists" : "null", "user:", user?.username || "null")

  return (
    <main className="min-h-screen bg-background">
      {!token || !user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <Dashboard token={token} user={user} onLogout={handleLogout} />
          <TermsDialog open={showTerms} language={language} onAccept={handleAcceptTerms} onReject={handleRejectTerms} />
        </>
      )}
    </main>
  )
}
