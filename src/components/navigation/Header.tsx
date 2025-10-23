"use client";
import React, { useState } from "react";
import GlassEffect from "@/components/ui/liquid-glass";
import { Logo } from "@/components/navigation/Logo";
import { NavLink } from "@/components/navigation/NavLink";
import { MobileDrawer } from "@/components/navigation/MobileDrawer";
import { useScrolled } from "@/hooks/useScrolled";
import AppLink from "@/components/AppLink";
import { buttonClass } from "@/lib/utils";

type HeaderProps = {
  links?: { label: string; href: string }[];
  cta?: { label: string; href: string };
  logoText?: string;
  logoImageSrc?: string;
  showLogoImage?: boolean;
  activeHref?: string;
  transparentUntilScroll?: boolean;
  glassOpacity?: number;
  glassDistort?: boolean;
};

export default function Header({
  links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Brands", href: "/brands" },
    { label: "Contact", href: "/contact" },
  ],
  cta = { label: "Get in touch", href: "/contact" },
  logoText = "",
  logoImageSrc = "/hero/logo%20+%20text.png",
  showLogoImage = true,
  activeHref,
  glassOpacity = 0.01,
  glassDistort = false,
}: HeaderProps) {
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);

  return (
    <header role="banner" className="fixed top-0 inset-x-0 z-50 pt-3 supports-[height:100svh]:pt-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <GlassEffect backgroundOpacity={glassOpacity} distort={glassDistort} className={(scrolled ? " shadow-lg ring-1 ring-black/5 " : "") + " transition-all "}>
          <nav className={"relative h-16 md:h-20 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-5 px-4 md:px-5"} aria-label="Primary">
            {/* Logo - Left side */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:block">
                <Logo text={logoText} imageSrc={logoImageSrc} showImage={showLogoImage} />
              </span>
              <span className="sm:hidden block">
                <Logo text="" imageSrc="/hero/transparentlogo.png" showImage={true} />
              </span>
            </div>
            
            {/* Mobile APIGEN text - Center */}
            <span className="md:hidden pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-semibold">APIGEN</span>
            
            {/* Desktop Navigation - Center column (true centered) */}
            <div className="hidden md:flex items-center gap-6 justify-self-center">
              {links.map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} active={activeHref === l.href} />
              ))}
            </div>
            
            {/* Desktop CTA - Right side */}
            <div className="hidden md:flex h-full items-center justify-self-end">
              <AppLink href={cta.href} className={buttonClass({ variant: "olive", size: "md" })}>
                {cta.label}
              </AppLink>
            </div>
            
            {/* Mobile Hamburger - Right side */}
            <div className="md:hidden justify-self-end col-start-3">
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-drawer"
                className="rounded-md border p-2 text-sm inline-flex items-center justify-center"
                onClick={() => setOpen(true)}
              >
                <span className="relative block w-5 h-3">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-current"></span>
                  <span aria-hidden className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-current"></span>
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-current"></span>
                </span>
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
