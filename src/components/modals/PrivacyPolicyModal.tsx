"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const privacyPolicyItems = [
  "Your privacy is important to us, and we are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Website www.apigen.ca",
  "By using our Website, you consent to the collection and use of your information in accordance with this Privacy Policy. If you do not agree, please refrain from using our Website.",
  "Information We Collect",
  "We may collect and process the following types of information:",
  "Personal Information",
  "Name",
  "Email address",
  "Phone number",
  "Mailing address",
  "Payment details (if applicable)",
  "Non-Personal Information",
  "IP address",
  "Browser type",
  "Device information",
  "Cookies and tracking data",
  "Website usage statistics",
  "How We Use Your Information",
  "We use the collected data for the following purposes:",
  "To provide and improve our services",
  "To communicate with you regarding inquiries, updates, and promotions",
  "To personalize user experience",
  "To process payments (if applicable)",
  "To analyze Website performance and user behavior",
  "To comply with legal obligations",
  "Cookies and Tracking Technologies",
  "We use cookies and similar tracking technologies to improve user experience. You can adjust your browser settings to refuse cookies; however, this may impact the Website's functionality.",
  "How We Share Your Information",
  "We do not sell, trade, or rent your personal information. However, we may share your data with:",
  "Service providers assisting in Website operation (e.g., payment processors, email services)",
  "Legal authorities when required by law",
  "Business partners or affiliates (with your consent)",
  "Data Security",
  "We implement appropriate security measures to protect your data from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure.",
  "Your Rights & Choices",
  "Depending on your jurisdiction, you may have the right to:",
  "Access, update, or delete your personal data",
  "Opt-out of marketing communications",
  "Withdraw consent for data collection",
  "To exercise these rights, contact us at [insert contact email].",
  "Third-Party Links",
  "Our Website may contain links to third-party sites. We are not responsible for their privacy practices and encourage you to review their policies.",
  "Children's Privacy",
  "Our Website is not intended for individuals under the age of 19. We do not knowingly collect data from minors.",
  "Changes to This Policy",
  "We may update this Privacy Policy periodically. Any changes will be posted with the updated date.",
  "Contact Us",
  "If you have any questions regarding this Privacy Policy, you can contact us."
];

export default function PrivacyPolicyModal({ open, onOpenChange }: PrivacyPolicyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[min(92vw,380px)] sm:max-w-[540px] max-h-[92vh] overflow-y-auto">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-xl sm:text-2xl italic" style={{ fontFamily: "var(--font-sans)" }}>
            Privacy Policy
          </DialogTitle>
          <DialogDescription className="italic text-sm text-[var(--secondary)]" style={{ fontFamily: "var(--font-body)" }}>
            Please review our privacy practices and data handling policies.
          </DialogDescription>
        </DialogHeader>
        <div
          className="mt-4 space-y-3 text-sm italic leading-relaxed text-[var(--muted-foreground)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <p>{privacyPolicyItems[0]}</p>
          <p>{privacyPolicyItems[1]}</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">2. {privacyPolicyItems[2]}</h3>
          <p>{privacyPolicyItems[3]}</p>

          <h4 className="font-semibold text-[var(--foreground)] not-italic ml-4">2.1 {privacyPolicyItems[4]}</h4>
          <ul className="list-disc ml-8 space-y-1">
            <li>{privacyPolicyItems[5]}</li>
            <li>{privacyPolicyItems[6]}</li>
            <li>{privacyPolicyItems[7]}</li>
            <li>{privacyPolicyItems[8]}</li>
            <li>{privacyPolicyItems[9]}</li>
          </ul>

          <h4 className="font-semibold text-[var(--foreground)] not-italic ml-4">2.2 {privacyPolicyItems[10]}</h4>
          <ul className="list-disc ml-8 space-y-1">
            <li>{privacyPolicyItems[11]}</li>
            <li>{privacyPolicyItems[12]}</li>
            <li>{privacyPolicyItems[13]}</li>
            <li>{privacyPolicyItems[14]}</li>
            <li>{privacyPolicyItems[15]}</li>
          </ul>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">3. {privacyPolicyItems[16]}</h3>
          <p>{privacyPolicyItems[17]}</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>{privacyPolicyItems[18]}</li>
            <li>{privacyPolicyItems[19]}</li>
            <li>{privacyPolicyItems[20]}</li>
            <li>{privacyPolicyItems[21]}</li>
            <li>{privacyPolicyItems[22]}</li>
            <li>{privacyPolicyItems[23]}</li>
          </ul>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">4. {privacyPolicyItems[24]}</h3>
          <p>{privacyPolicyItems[25]}</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">5. {privacyPolicyItems[26]}</h3>
          <p>{privacyPolicyItems[27]}</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>{privacyPolicyItems[28]}</li>
            <li>{privacyPolicyItems[29]}</li>
            <li>{privacyPolicyItems[30]}</li>
          </ul>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">6. {privacyPolicyItems[31]}</h3>
          <p>{privacyPolicyItems[32]}</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">7. {privacyPolicyItems[33]}</h3>
          <p>{privacyPolicyItems[34]}</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>{privacyPolicyItems[35]}</li>
            <li>{privacyPolicyItems[36]}</li>
            <li>{privacyPolicyItems[37]}</li>
          </ul>
          <p>{privacyPolicyItems[38]}</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">8. {privacyPolicyItems[39]}</h3>
          <p>{privacyPolicyItems[40]}</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">9. {privacyPolicyItems[41]}</h3>
          <p>{privacyPolicyItems[42]}</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">10. {privacyPolicyItems[43]}</h3>
          <p>{privacyPolicyItems[44]}</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">11. {privacyPolicyItems[45]}</h3>
          <p>{privacyPolicyItems[46]}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
