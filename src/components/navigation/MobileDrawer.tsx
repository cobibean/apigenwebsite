"use client";
import React from "react";
import AppLink from "@/components/AppLink";

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
        className="absolute right-0 top-0 h-full w-80 bg-white p-6 dark:bg-neutral-950"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="mb-4 rounded-md border px-3 py-2 text-sm"
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
          <AppLink
            href={cta.href}
            className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white dark:bg-emerald-600"
            onClick={() => onOpenChange(false)}
          >
            {cta.label}
          </AppLink>
        </div>
      </div>
    </div>
  );
}


