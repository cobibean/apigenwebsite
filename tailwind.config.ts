import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./docs/**/*.{md,mdx}",
    "./app/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--fg)",
        card: "var(--card)",
        popover: "var(--popover)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        ring: "var(--ring)",
        input: "var(--input)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        heading: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        serif: ["var(--font-serif)"],
      },
      // fontSize, spacing, and container max-width mappings are commented out
      // until CSS variables are defined in theme tokens.
      // fontSize: {
      //   "display-xl": ["var(--font-size-display-xl)", { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-h1)" }],
      //   "display-lg": ["var(--font-size-display-lg)", { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-h1)" }],
      //   h1: ["var(--font-size-h1)", { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-h1)" }],
      //   h2: ["var(--font-size-h2)", { lineHeight: "var(--leading-snug)", letterSpacing: "var(--tracking-h2)" }],
      //   h3: ["var(--font-size-h3)", { lineHeight: "var(--leading-snug)", letterSpacing: "var(--tracking-h3)" }],
      //   eyebrow: ["var(--font-size-eyebrow)", { letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase" }],
      //   body: ["var(--font-size-body)", { lineHeight: "var(--leading-normal)", letterSpacing: "var(--tracking-body)" }],
      //   "body-sm": ["var(--font-size-body-sm)", { lineHeight: "var(--leading-normal)" }],
      //   caption: ["var(--font-size-caption)", { lineHeight: "var(--leading-normal)" }],
      // },
      // spacing: {
      //   "3xs": "var(--space-3xs)",
      //   "2xs": "var(--space-2xs)",
      //   xs: "var(--space-xs)",
      //   sm: "var(--space-sm)",
      //   md: "var(--space-md)",
      //   lg: "var(--space-lg)",
      //   xl: "var(--space-xl)",
      //   "2xl": "var(--space-2xl)",
      //   "3xl": "var(--space-3xl)",
      //   "4xl": "var(--space-4xl)",
      // },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        inner: "var(--shadow-inner)",
      },
      // maxWidth: {
      //   "container-narrow": "var(--container-narrow)",
      //   "container-regular": "var(--container-regular)",
      //   "container-wide": "var(--container-wide)",
      //   "container-max": "var(--container-max)",
      // },
      transitionDuration: {
        fast: "var(--motion-duration-fast)",
        base: "var(--motion-duration-base)",
        slow: "var(--motion-duration-slow)",
      },
      transitionTimingFunction: {
        out: "var(--motion-ease-out)",
        "in-out": "var(--motion-ease-in-out)",
      },
      translate: {
        appear: "var(--motion-appear-distance)",
      },
    },
  },
};

export default config;
