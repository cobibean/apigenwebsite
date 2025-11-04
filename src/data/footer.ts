export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  copyrightPrefix: string;
  disclaimer: string;
  navigationLinks: FooterLink[];
}

export const footerContent: FooterContent = {
  copyrightPrefix: "© Apigen ",
  disclaimer: "Legal Disclaimer",
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
