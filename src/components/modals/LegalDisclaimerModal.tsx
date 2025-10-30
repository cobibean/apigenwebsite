"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LegalDisclaimerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const disclaimerItems = [
  "The information provided on this website is for general informational purposes only. Apigen (Experion Biotechnologies Inc.) makes no representations or warranties of any kind, express or implied, about the accuracy, reliability, suitability, or availability of the information, products, or related graphics contained on this site. Any reliance you place on such information is therefore strictly at your own risk.",
  "Apigen operates in compliance with Canadian cannabis regulations. Access to this site is restricted to individuals who are of legal age to possess cannabis in their jurisdiction. Products and information on this website are intended only for use in areas where such use and possession are legally permitted.",
  "Nothing on this website is intended to provide medical advice or to substitute for the advice of a qualified healthcare professional. Always consult your physician or other healthcare provider regarding any questions you may have about cannabis or related products.",
  "Apigen does not promote or advertise cannabis for recreational use. The content of this website is intended for informational, professional, and educational purposes only, within jurisdictions where cannabis-related activities are lawful.",
  "All research, data, and scientific information presented are provided for educational and research purposes and should not be interpreted as clinical or regulatory validation. Apigen is not responsible for the content of any third-party websites that may be linked to or from this site. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.",
  "All trademarks, logos, and product names displayed on this website are the property of Apigen or their respective owners. Unauthorized use, reproduction, or distribution of any materials on this website is strictly prohibited.",
  "This website is governed by the laws of the Province of British Columbia, Canada. Any disputes arising from its use shall be subject to the exclusive jurisdiction of the courts located in British Columbia.",
  "By using this website, you acknowledge and agree to the terms of this disclaimer.",
];

export default function LegalDisclaimerModal({ open, onOpenChange }: LegalDisclaimerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[min(92vw,380px)] sm:max-w-[540px] max-h-[92vh] overflow-y-auto">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-xl sm:text-2xl italic" style={{ fontFamily: "var(--font-sans)" }}>
            Legal Disclaimer
          </DialogTitle>
          <DialogDescription className="italic text-sm text-[var(--secondary)]" style={{ fontFamily: "var(--font-body)" }}>
            Please review the following terms that govern the use of this website.
          </DialogDescription>
        </DialogHeader>
        <ol
          className="mt-4 ml-4 list-[lower-roman] space-y-3 text-sm italic leading-relaxed text-[var(--muted-foreground)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {disclaimerItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </DialogContent>
    </Dialog>
  );
}
