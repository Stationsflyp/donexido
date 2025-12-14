"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useState, useEffect } from "react"
import type { Language } from "@/lib/i18n"

interface LanguageSwitcherProps {
  onLanguageChange?: (lang: Language) => void
}

export function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const [language, setLanguage] = useState<Language>("en")
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "es")) {
      setLanguage(savedLang)
    }
  }, [])

  const toggleLanguage = () => {
    setIsAnimating(true)

    const newLang: Language = language === "en" ? "es" : "en"
    setLanguage(newLang)
    localStorage.setItem("language", newLang)
    if (onLanguageChange) {
      onLanguageChange(newLang)
    }

    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={`gap-2 transition-all duration-500 ${isAnimating ? "scale-110 rotate-12" : "scale-100 rotate-0"}`}
    >
      <Globe className={`h-4 w-4 transition-transform duration-500 ${isAnimating ? "rotate-180" : "rotate-0"}`} />
      <span className="font-semibold">{language.toUpperCase()}</span>
    </Button>
  )
}
