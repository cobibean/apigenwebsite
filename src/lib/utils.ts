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
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event.name, event.payload || {})
  }
}
