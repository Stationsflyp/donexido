"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle } from "lucide-react"
import { getTranslation, type Language } from "@/lib/i18n"

interface TermsDialogProps {
  open: boolean
  language: Language
  onAccept: () => void
  onReject: () => void
}

export function TermsDialog({ open, language, onAccept, onReject }: TermsDialogProps) {
  const t = getTranslation(language).terms

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-3xl max-h-[80vh]" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">{t.title}</DialogTitle>
          <DialogDescription>{t.subtitle}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[50vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t.privateFriends}</h3>
              <p className="text-muted-foreground mb-2">{t.privateFriendsDesc1}</p>
              <p className="text-muted-foreground">{t.privateFriendsDesc2}</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-destructive mb-2">{t.prohibited}</h3>
              <p className="text-destructive font-bold mb-2">{t.prohibitedWarning}</p>
              <p className="text-muted-foreground mb-2">{t.prohibitedDesc1}</p>
              <p className="text-destructive font-bold mb-2">{t.prohibitedDesc2}</p>
              <p className="text-muted-foreground">{t.prohibitedDesc3}</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t.storagePlans}</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-foreground mb-2">{t.basicPlan}</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>{t.basicMaxFile}</li>
                    <li>{t.basicStorage}</li>
                    <li>{t.basicSpeed}</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-2">{t.premiumPlan}</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>{t.premiumMaxFile}</li>
                    <li>{t.premiumStorage}</li>
                    <li>{t.premiumSpeed}</li>
                    <li>{t.premiumRetention}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t.liability}</h3>
              <p className="text-muted-foreground mb-2">{t.liabilityDesc}</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>{t.liabilityItem1}</li>
                <li>{t.liabilityItem2}</li>
                <li>{t.liabilityItem3}</li>
                <li>{t.liabilityItem4}</li>
                <li>{t.liabilityItem5}</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t.acceptable}</h3>
              <p className="text-muted-foreground mb-2">{t.acceptableDesc}</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>{t.acceptableItem1}</li>
                <li>{t.acceptableItem2}</li>
                <li>{t.acceptableItem3}</li>
                <li>{t.acceptableItem4}</li>
                <li>{t.acceptableItem5}</li>
                <li>{t.acceptableItem6}</li>
              </ul>
            </section>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onReject}
            className="gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
          >
            <XCircle className="h-4 w-4" />
            {language === "en" ? "Reject" : "Rechazar"}
          </Button>
          <Button onClick={onAccept} className="gap-2">
            <CheckCircle className="h-4 w-4" />
            {language === "en" ? "Accept" : "Aceptar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
