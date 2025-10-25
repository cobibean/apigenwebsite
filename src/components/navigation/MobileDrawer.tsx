"use client";
import React from "react";
import AppLink from "@/components/AppLink";
import { buttonClass } from "@/lib/utils";

export function MobileDrawer({
  open,
  onOpenChange,
  links,
  cta,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
}) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-0 z-[60] bg-black/60"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="absolute right-0 top-0 h-full w-80 bg-[var(--card)] text-[var(--primary)] p-6 dark:text-[var(--fg)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="mb-4 rounded-md border border-[var(--border)] px-3 py-2 text-sm"
          onClick={() => onOpenChange(false)}
        >
          Close
        </button>
        <nav className="flex flex-col gap-3" aria-label="Mobile">
          {links.map((l, i) => (
            <AppLink key={i} href={l.href} className="min-h-[44px] text-base" onClick={() => onOpenChange(false)}>
              {l.label}
            </AppLink>
          ))}
        </nav>
        <div className="mt-6">
          <AppLink href={cta.href} className={buttonClass({ variant: "olive", size: "md" })} onClick={() => onOpenChange(false)}>
            {cta.label}
          </AppLink>
        </div>
      </div>
    </div>
  );
}

