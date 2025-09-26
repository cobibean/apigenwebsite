"use client";
import React from "react";
import AppLink from "@/components/AppLink";
import { usePathname } from "next/navigation";

export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <AppLink
      href={href}
      aria-current={active ? "page" : undefined}
      className={
        "min-h-[44px] text-sm font-medium text-neutral-900/90 dark:text-neutral-100/90 hover:text-emerald-700 dark:hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] " +
        (active ? " underline decoration-emerald-600 decoration-2 underline-offset-4" : "")
      }
    >
      {label}
    </AppLink>
  );
}


