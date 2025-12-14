"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HardDrive, Lock, Users } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getTranslation, type Language } from "@/lib/i18n"

interface LoginFormProps {
  onLogin: (token: string, user: { username: string; avatar: string; plan?: string }) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [language, setLanguage] = useState<Language>("en")
  const [isLoading, setIsLoading] = useState(false)
  const t = getTranslation(language)

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "es")) {
      setLanguage(savedLang)
    }
  }, [])

  const handleDiscordLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI

    if (!clientId || clientId === "undefined") {
      console.error("[v0] Discord Client ID is missing")
      alert("Error: Por favor reinicia el servidor de desarrollo (npm run dev)")
      return
    }

    if (!redirectUri || redirectUri === "undefined") {
      console.error("[v0] Discord Redirect URI is missing")
      alert("Error: Por favor reinicia el servidor de desarrollo (npm run dev)")
      return
    }

    setIsLoading(true)
    const encodedRedirectUri = encodeURIComponent(redirectUri)

    setTimeout(() => {
      window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUri}&scope=identify+email`
    }, 500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-20 animate-fadeIn">
        <LanguageSwitcher onLanguageChange={setLanguage} />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-20 right-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl relative z-10 animate-scaleIn">
        <CardHeader className="space-y-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/30 animate-pulse-glow">
            <HardDrive className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-bold gradient-text">{t.login.title}</CardTitle>
            <p className="text-lg font-semibold text-primary">{t.login.subtitle}</p>
          </div>

          <div
            className="flex items-center justify-center gap-2 text-muted-foreground animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            <Lock className="h-4 w-4" />
            <p className="text-sm">{t.login.privateExclusive}</p>
          </div>

          <CardDescription
            className="text-muted-foreground text-base leading-relaxed animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          >
            {t.login.description}
          </CardDescription>

          <div
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
          >
            <Users className="h-4 w-4 text-primary" />
            <p className="text-sm text-foreground font-medium">{t.login.joinFriends}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 animate-fadeIn" style={{ animationDelay: "0.5s" }}>
          <Button
            onClick={handleDiscordLogin}
            disabled={isLoading}
            className="w-full h-14 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {/* ...el resto del botón y SVGs igual */}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              {t.login.termsPrefix}{" "}
              <Link href="/terms" className="text-primary hover:underline font-medium">
                {t.login.termsLink}
              </Link>
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              <span>{t.login.secured}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
