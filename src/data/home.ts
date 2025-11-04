export interface HeroContent {
  eyebrow: string;
  subtitle: string;
  title: string;
  copy: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface MissionContent {
  eyebrow: string;
  taglinePrimary: string;
  taglineSecondary: string;
  lead: string;
  body: string;
  cta: {
    label: string;
    href: string;
  };
}

export interface GalleryContent {
  title: string;
  subtitle: string;
  size: "full" | "compact";
}

export interface CTAContent {
  title: string;
  copy: string;
  label: string;
  href: string;
  variant: "brown" | "olive" | "neutral";
}

export interface ProductShowcaseConfig {
  productIds: string[];
  layoutPattern: ("left" | "right")[];
  styling: {
    hideSupporting: boolean;
    sectionBgColor: "default" | "olive";
    contentTextColor: "default" | "white";
    headerBorderColor: "none" | "copper" | "black";
    cardBorderColor: "default" | "copper" | "black";
  };
}

export interface SectionStyling {
  backgroundClass?: string;
  theme?: "default" | "olive" | "dark";
  className?: string;
}

export interface HomeContent {
  hero: HeroContent & { styling?: SectionStyling };
  mission: MissionContent & { styling?: SectionStyling };
  gallery: GalleryContent & { styling?: SectionStyling };
  cta: CTAContent & { styling?: SectionStyling };
  productShowcases: ProductShowcaseConfig;
  metadata: {
    title: string;
    description: string;
  };
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Apigen",
    subtitle: "PREMIUM QUALITY DRIED CANNABIS EXPORTER",
    title: "Premium dried cannabis, exported consistently.",
    copy: "Ethical, compliant, patient-first.",
    ctaLabel: "Get in touch",
    ctaHref: "/contact"
    // Hero has internal video background - no additional styling needed
  },
  mission: {
    eyebrow: "Our Mission",
    taglinePrimary: "TO SET A NEW INDUSTRY\nSTANDARD WITH",
    taglineSecondary: "PREMIUM MEDICINAL\nCANNABIS FLOWER",
    lead: "We're not just providing exceptional medication. We're pioneers of quality, transparency, and patient‑centric treatments.",
    body: "Uncompromising pharmaceutical‑grade quality is not just a goal for us — it's embedded in our DNA and the standards we set for ourselves and for the industry. Our commitment goes beyond profits — we're for doing what’s right by the plant, our patients, and the planet.",
    cta: { label: "About Apigen", href: "/about" },
    styling: {
      backgroundClass: "bg-[var(--surface-olive)]"
    }
  },
  gallery: {
    title: "Our Premium Strains",
    subtitle: "Explore Cadillac Rainbow and Dante's Inferno up close",
    size: "compact"
    // Gallery uses default background - no additional styling needed
  },
  cta: {
    title: "Ready to talk?",
    copy: "Let's discuss your needs and timelines.",
    label: "Get in touch",
    href: "/contact",
    variant: "olive",
    styling: {
      backgroundClass: "bg-[var(--surface)]"
    }
  },
  productShowcases: {
    productIds: ["cadillac-rainbow", "dantes-inferno"], // Use all products or specific ones
    layoutPattern: ["left", "right"], // Pattern repeats for any number of products
    styling: {
      hideSupporting: true,
      sectionBgColor: "olive",
      contentTextColor: "white",
      headerBorderColor: "copper",
      cardBorderColor: "copper"
    }
  },
  metadata: {
    title: "Apigen | Premium dried cannabis exporter",
    description: "Premium dried cannabis, exported consistently. Ethical, compliant, patient-first."
  }
};
