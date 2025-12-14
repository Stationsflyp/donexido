"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Lock, Users, Database, Crown, Code } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getTranslation, type Language } from "@/lib/i18n"

export default function TermsOfService() {
  const [language, setLanguage] = useState<Language>("en")
  const t = getTranslation(language)

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "es")) {
      setLanguage(savedLang)
    }
  }, [])

  useEffect(() => {
    const preventCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault()
    }

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    document.addEventListener("copy", preventCopyPaste)
    document.addEventListener("cut", preventCopyPaste)
    document.addEventListener("paste", preventCopyPaste)
    document.addEventListener("contextmenu", preventContextMenu)

    return () => {
      document.removeEventListener("copy", preventCopyPaste)
      document.removeEventListener("cut", preventCopyPaste)
      document.removeEventListener("paste", preventCopyPaste)
      document.removeEventListener("contextmenu", preventContextMenu)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 select-none">
      <div className="fixed top-4 right-4 z-50 animate-slideInRight">
        <LanguageSwitcher onLanguageChange={setLanguage} />
      </div>

      <div className="fixed top-4 left-4 z-50 animate-slideInLeft">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/80 backdrop-blur-sm border border-primary/30 shadow-lg">
          <Code className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {t.terms.developer}: <span className="text-primary">Oxcy 666</span>
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold gradient-text mb-2">{t.terms.title}</h1>
          <p className="text-muted-foreground">{t.terms.subtitle}</p>
        </div>

        <div className="space-y-6">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users className="h-5 w-5" />
                {t.terms.privateFriends}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
              <p>{t.terms.privateFriendsDesc1}</p>
              <p>{t.terms.privateFriendsDesc2}</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                {t.terms.prohibited}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground">{t.terms.prohibitedWarning}</p>
              <p>{t.terms.prohibitedDesc1}</p>
              <p className="text-destructive font-semibold">{t.terms.prohibitedDesc2}</p>
              <p>{t.terms.prohibitedDesc3}</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Database className="h-5 w-5" />
                {t.terms.storagePlans}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="space-y-2">
                <p className="font-semibold text-foreground">{t.terms.basicPlan}</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>{t.terms.basicMaxFile}</li>
                  <li>{t.terms.basicStorage}</li>
                  <li>{t.terms.basicSpeed}</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <Crown className="h-4 w-4 text-primary" />
                  {t.terms.premiumPlan}
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>{t.terms.premiumMaxFile}</li>
                  <li>{t.terms.premiumStorage}</li>
                  <li>{t.terms.premiumSpeed}</li>
                  <li>{t.terms.premiumRetention}</li>
                </ul>
              </div>

              <p className="text-sm">{t.terms.fileSizeNote}</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Shield className="h-5 w-5" />
                {t.terms.liability}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground">{t.terms.liabilityDesc}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t.terms.liabilityItem1}</li>
                <li>{t.terms.liabilityItem2}</li>
                <li>{t.terms.liabilityItem3}</li>
                <li>{t.terms.liabilityItem4}</li>
                <li>{t.terms.liabilityItem5}</li>
              </ul>
              <p className="mt-4">{t.terms.liabilityDisclaimer}</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Lock className="h-5 w-5" />
                {t.terms.privacy}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
              <p>{t.terms.privacyDesc1}</p>
              <p>{t.terms.privacyDesc2}</p>
              <p>{t.terms.privacyDesc3}</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-primary">{t.terms.acceptable}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
              <p>{t.terms.acceptableDesc}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t.terms.acceptableItem1}</li>
                <li>{t.terms.acceptableItem2}</li>
                <li>{t.terms.acceptableItem3}</li>
                <li>{t.terms.acceptableItem4}</li>
                <li>{t.terms.acceptableItem5}</li>
                <li>{t.terms.acceptableItem6}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-primary">{t.terms.changes}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>{t.terms.changesDesc}</p>
            </CardContent>
          </Card>

          <div className="text-center pt-4 pb-8">
            <p className="text-sm text-muted-foreground mb-4">
              {t.terms.lastUpdated} {new Date().toLocaleDateString()}
            </p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">{t.terms.backToLogin}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
