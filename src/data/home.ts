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
  copy?: string;
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
    taglinePrimary: "TO SET A NEW GLOBAL STANDARD FOR",
    taglineSecondary: "PREMIUM, CLINICAL-GRADE CANNABIS FLOWER FOR MEDICAL AND ADULT USE.",
    lead: "We are not simply a cannabis cultivator. We are a standards-driven company building a new benchmark for how premium flower is grown, tested, and released into both medical and adult-use markets.",
    body: "Every cultivar we produce is developed under pharmaceutical-grade processes, rigorous quality systems, and export-level compliance — ensuring that the same uncompromising standard reaches both patients and adult-use consumers.\n\nOur commitment extends beyond profitability. We exist to do what is right by the plant, the people who rely on it, and the future of responsible cannabis worldwide.",
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
      headerBorderColor: "black",
      cardBorderColor: "black"
    }
  },
  metadata: {
    title: "Apigen | Premium dried cannabis exporter",
    description: "Premium dried cannabis, exported consistently. Ethical, compliant, patient-first."
  }
};
