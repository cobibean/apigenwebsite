"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TermsAndConditionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TermsAndConditionsModal({ open, onOpenChange }: TermsAndConditionsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[min(92vw,380px)] sm:max-w-[540px] max-h-[92vh] overflow-y-auto">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-xl sm:text-2xl italic" style={{ fontFamily: "var(--font-sans)" }}>
            Terms & Conditions
          </DialogTitle>
          <DialogDescription className="italic text-sm text-[var(--secondary)]" style={{ fontFamily: "var(--font-body)" }}>
            Last Updated: November 4, 2025
          </DialogDescription>
        </DialogHeader>
        <div
          className="mt-4 space-y-3 text-sm italic leading-relaxed text-[var(--muted-foreground)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <p>Welcome to Apigen (&ldquo;Website,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of www.apigen.ca. By accessing or using our Website, you agree to comply with these Terms. If you do not agree, please do not use our Website.</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">1. Acceptance of Terms</h3>
          <p>By using this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms and all applicable laws and regulations.</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">2. Use of the Website</h3>
          <p>You agree to use this Website for lawful purposes only and in a way that does not infringe on the rights of others or restrict their use and enjoyment of the Website.</p>
          <p>You agree NOT to:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>Use the Website in any way that is fraudulent, harmful, or violates any law.</li>
            <li>Attempt to hack, disrupt, or interfere with the security or functionality of the Website.</li>
            <li>Use automated scripts, bots, or similar tools to access the Website without permission.</li>
          </ul>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">3. User Accounts (If Applicable)</h3>
          <p>To access certain features of the Website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and all activities that occur under your account. We reserve the right to suspend or terminate accounts that violate these Terms.</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">4. Intellectual Property Rights</h3>
          <p>All content on this Website, including text, images, logos, graphics, and software, is the property of [Your Company Name] or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or modify any content without our written permission.</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">5. Purchases and Payments (If Applicable)</h3>
          <p>If you purchase products or services through the Website, you agree to provide accurate payment information. We reserve the right to refuse or cancel any order at our discretion.</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">6. Disclaimer of Warranties</h3>
          <p>The Website and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any warranties, express or implied. We do not guarantee that the Website will be error-free, secure, or uninterrupted.</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">7. Limitation of Liability</h3>
          <p>To the fullest extent permitted by law, Apigen and its affiliates will not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Website, even if we have been advised of the possibility of such damages.</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">8. Third-Party Links</h3>
          <p>The Website may contain links to third-party websites that are not owned or controlled by us. We are not responsible for the content or privacy policies of these third-party sites.</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">9. Indemnification</h3>
          <p>You agree to indemnify and hold Apigen, its employees, affiliates, and partners harmless from any claims, liabilities, damages, or expenses arising from your use of the Website or violation of these Terms.</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">10. Governing Law</h3>
          <p>These Terms shall be governed and interpreted in accordance with the laws of British Columbia, Canada, without regard to conflict of law principles.</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">11. Changes to These Terms</h3>
          <p>We reserve the right to update or modify these Terms at any time. Continued use of the Website after changes are posted constitutes your acceptance of the revised Terms.</p>

          <h3 className="font-semibold text-[var(--foreground)] not-italic">12. Contact Information</h3>
          <p>If you have any questions about these Terms, please contact us.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
