"use client";
import React, { useRef, useState, createContext, useContext, ReactNode } from "react";
import GlassEffect from "@/components/ui/liquid-glass";
import { Logo } from "@/components/navigation/Logo";
import { NavLink } from "@/components/navigation/NavLink";
import { MobileSidebar } from "@/components/navigation/MobileSidebar";
import { useScrolled } from "@/hooks/useScrolled";
import AppLink from "@/components/AppLink";
import { buttonClass } from "@/lib/utils";

// Header visibility context
interface HeaderContextType {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

export const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}

interface HeaderProviderProps {
  children: ReactNode;
}

export function HeaderProvider({ children }: HeaderProviderProps) {
  const [hidden, setHidden] = useState(false);

  return (
    <HeaderContext.Provider value={{ hidden, setHidden }}>
      {children}
    </HeaderContext.Provider>
  );
}

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
  logoText = "APIGEN",
  logoImageSrc = "/hero/logo-text.png",
  showLogoImage = true,
  activeHref,
  glassOpacity = 0.01,
  glassDistort = false,
}: HeaderProps) {
  const scrolled = useScrolled(8);
  const { hidden } = useHeader();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarId = "mobile-sidebar-panel";

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 inset-x-0 z-50 pt-3 supports-[height:100svh]:pt-3 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <GlassEffect backgroundOpacity={glassOpacity} distort={glassDistort} className={(scrolled ? " shadow-lg ring-1 ring-black/5 " : "") + " transition-all "}>
          <nav className={"relative h-16 md:h-20 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-5 px-4 md:px-5"} aria-label="Primary">
            {/* Logo - Left side */}
            <div className="flex items-center gap-3">
              <Logo text={logoText} imageSrc={logoImageSrc} showImage={showLogoImage} />
            </div>
            
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
                ref={menuButtonRef}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls={sidebarId}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_85%,var(--surface)_15%)] text-[var(--primary)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
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
        <MobileSidebar
          open={open}
          onOpenChange={handleOpenChange}
          links={links}
          cta={cta}
          activeHref={activeHref}
          panelId={sidebarId}
          returnFocusRef={menuButtonRef}
        />
      </div>
    </header>
  );
}
