"use client";
import React from "react";
import AppLink from "@/components/AppLink";

export function NavLink({ href, label, active = false }: { href: string; label: string; active?: boolean }) {
  return (
    <AppLink
      href={href}
      aria-current={active ? "page" : undefined}
      className={
        "inline-flex h-full items-center text-base md:text-lg font-medium text-[var(--primary)] dark:text-[var(--fg)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] " +
        (active ? " underline decoration-[var(--accent)] decoration-2 underline-offset-4" : "")
      }
    >
      {label}
    </AppLink>
  );
}

