export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterDisclaimer {
  label: string;
  type: 'legal' | 'privacy' | 'terms';
}

export interface FooterContent {
  copyrightPrefix: string;
  disclaimers: FooterDisclaimer[];
  navigationLinks: FooterLink[];
}

export const footerContent: FooterContent = {
  copyrightPrefix: "© Apigen ALL RIGHTS RESERVED ",
  disclaimers: [
    { label: "Privacy Policy", type: "privacy" },
    { label: "Terms & Conditions", type: "terms" },
    { label: "Legal Disclaimer", type: "legal" },
  ],
  navigationLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Brands", href: "/brands" },
    { label: "Contact", href: "/contact" },
  ]
};

// Utility function for dynamic copyright
export function getCopyrightText(prefix: string): string {
  return `${prefix}${new Date().getFullYear()}`;
}
