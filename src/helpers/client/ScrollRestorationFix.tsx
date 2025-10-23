"use client";

import { useEffect } from "react";

/**
 * Forces the initial load to start at scroll position 0.
 * Browsers try to restore scroll on refresh, which clashes with our fixed header.
 */
export default function ScrollRestorationFix() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  return null;
}
