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
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Redirecting to Discord...
              </>
            ) : (
              <>
                <svg width="24" height="24" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0)">
                    <path
                      d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="71" height="55" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {t.login.continueDiscord}
              </>
            )}
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
