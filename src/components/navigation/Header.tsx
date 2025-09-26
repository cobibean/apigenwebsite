"use client";
import React, { useState } from "react";
import GlassEffect from "@/components/ui/liquid-glass";
import { Logo } from "@/components/navigation/Logo";
import { NavLink } from "@/components/navigation/NavLink";
import { MobileDrawer } from "@/components/navigation/MobileDrawer";
import { useScrolled } from "@/hooks/useScrolled";
import { NAV_LINKS, PRIMARY_CTA } from "@/config/nav.config";
import AppLink from "@/components/AppLink";

type HeaderProps = {
  links?: { label: string; href: string }[];
  cta?: { label: string; href: string };
  logoText?: string;
  transparentUntilScroll?: boolean;
};

export default function Header({
  links = NAV_LINKS,
  cta = PRIMARY_CTA,
  logoText = "APIGEN",
}: HeaderProps) {
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);

  return (
    <header role="banner" className="fixed top-3 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GlassEffect className={(scrolled ? " shadow-lg ring-1 ring-black/5 " : "") + " transition-all "}>
          <nav className={(scrolled ? "h-16" : "h-20") + " flex items-center justify-between gap-4 px-4"} aria-label="Primary">
            <Logo text={logoText} />
            <div className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} />)
              )}
            </div>
            <div className="hidden md:block">
              <AppLink href={cta.href} className="rounded-xl px-4 py-2 text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
                {cta.label}
              </AppLink>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-drawer"
                className="rounded-md border px-3 py-2 text-sm"
                onClick={() => setOpen(true)}
              >
                Menu
              </button>
            </div>
          </nav>
        </GlassEffect>
      </div>
      <div id="mobile-drawer">
        <MobileDrawer open={open} onOpenChange={setOpen} links={links} cta={cta} />
      </div>
    </header>
  );
}


