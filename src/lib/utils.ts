import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Tiny analytics helper (no-op by default). Later phases can replace implementation.
export type AnalyticsEvent = {
  name: string
  payload?: Record<string, unknown>
}

export function trackEvent(event: AnalyticsEvent) {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event.name, event.payload || {})
  }
}

// Button helper --------------------------------------------------------------
export type ButtonVariant = "brown" | "olive" | "neutral"
export type ButtonSize = "md" | "lg"

/**
 * Returns Tailwind className for brand buttons matching the reference visuals.
 * Uses CSS variables from theme.css so colors can be tuned centrally.
 */
export function buttonClass(options?: {
  variant?: ButtonVariant
  size?: ButtonSize
  withBorder?: boolean
}): string {
  const { variant = "olive", size = "lg", withBorder = true } = options || {}

  const base =
    "inline-flex items-center justify-center rounded-xl font-medium uppercase tracking-[0.12em] whitespace-nowrap select-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent"

  const sizeClass = size === "lg" ? "px-6 py-3 text-sm md:text-base" : "px-4 py-2.5 text-sm"

  const byVariant: Record<ButtonVariant, string> = {
    brown:
      "bg-[var(--btn-brown)] text-[var(--btn-brown-foreground)] hover:bg-[var(--btn-brown-hover)]",
    olive:
      "bg-[var(--btn-olive)] text-[var(--btn-olive-foreground)] hover:bg-[var(--btn-olive-hover)]",
    neutral:
      "bg-[var(--btn-neutral)] text-[var(--btn-neutral-foreground)] hover:bg-[var(--btn-neutral-hover)]",
  }

  const border = withBorder ? "border border-[var(--btn-neutral-border)]" : ""

  return cn(base, sizeClass, byVariant[variant], border)
}
