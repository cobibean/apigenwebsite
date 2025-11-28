"use client"

import React, { useEffect, useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden";
import AppLink from "@/components/AppLink";
import AppImage from "@/components/AppImage";
import { useContactModal } from "@/providers/ContactModalProvider";
import { cn } from "@/lib/utils";

type MobileSidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
  activeHref?: string;
  panelId?: string;
  returnFocusRef?: React.RefObject<HTMLButtonElement | null>;
};

export function MobileSidebar({
  open,
  onOpenChange,
  links,
  cta,
  activeHref,
  panelId = "mobile-sidebar",
  returnFocusRef,
}: MobileSidebarProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const prevOpenRef = useRef(open);
  const { openContactModal } = useContactModal();

  useEffect(() => {
    if (prevOpenRef.current && !open && returnFocusRef?.current) {
      returnFocusRef.current.focus({ preventScroll: true });
    }
    prevOpenRef.current = open;
  }, [open, returnFocusRef]);

  useEffect(() => {
    if (!open) return;
    const node = contentRef.current;
    if (!node) return;

    let startX: number | null = null;
    const threshold = 64;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (startX === null) return;
      const currentX = event.touches[0].clientX;
      const delta = currentX - startX;
      if (delta > threshold) {
        startX = null;
        onOpenChange(false);
      }
    };

    const handleTouchEnd = () => {
      startX = null;
    };

    node.addEventListener("touchstart", handleTouchStart, { passive: true });
    node.addEventListener("touchmove", handleTouchMove, { passive: true });
    node.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchmove", handleTouchMove);
      node.removeEventListener("touchend", handleTouchEnd);
    };
  }, [open, onOpenChange]);

  const navLinks = links.filter((link) => link.href !== "/contact");

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-40",
            "bg-[color-mix(in_oklab,var(--bg)_50%,#061614)]/30",
            "backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "md:hidden"
          )}
        />
        <DialogPrimitive.Content
          id={panelId}
          ref={contentRef}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-sm translate-x-[-50%] translate-y-[-50%]",
            "h-auto max-h-[85vh] overflow-y-auto",
            "rounded-[32px] border p-6 flex flex-col gap-6 text-[var(--fg-on-olive)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            "data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:slide-out-to-top-[48%]",
            "duration-200 outline-none shadow-[0_32px_80px_rgba(8,19,17,0.32)]",
            "md:hidden"
          )}
          style={{
            background: "var(--surface-olive)",
            borderColor: "color-mix(in_oklab,var(--fg-on-olive)_24%,transparent)",
            fontFamily: "var(--font-sans)",
            backdropFilter: "blur(24px)",
          }}
        >
          <DialogPrimitive.Title id="mobile-nav-title" asChild>
            <VisuallyHidden>Mobile navigation</VisuallyHidden>
          </DialogPrimitive.Title>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_65%)] pointer-events-none rounded-[32px]" aria-hidden="true" />
          <div className="relative z-10 flex h-full flex-col gap-6">
            <div className="flex items-center justify-between gap-3">
              <AppImage
                src="/hero/herotext/APIGEN_hero_text_COPPER.svg"
                alt="Apigen wordmark"
                width={120}
                height={28}
                className="h-6 w-auto"
                priority
              />
              <DialogPrimitive.Close
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--fg-on-olive)_35%,transparent)] bg-[color-mix(in_oklab,var(--surface-olive)_65%,black)] text-[var(--fg-on-olive)] backdrop-blur-sm transition hover:bg-[color-mix(in_oklab,var(--surface-olive)_80%,black)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_oklab,var(--surface-olive)_85%,black)]"
              >
                <span className="sr-only">Close</span>
                <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </DialogPrimitive.Close>
            </div>
            <nav aria-label="Mobile" className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <AppLink
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "w-full rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition",
                      "border text-[var(--fg-on-olive)]",
                      "bg-[color-mix(in_oklab,var(--surface-olive)_62%,black)] border-[color-mix(in_oklab,var(--fg-on-olive)_20%,transparent)]",
                      "hover:bg-[color-mix(in_oklab,var(--surface-olive)_78%,black)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_oklab,var(--surface-olive)_82%,black)]",
                      isActive ? "bg-[var(--accent)] text-[var(--accent-foreground)] border-transparent shadow-[0_12px_30px_rgba(174,85,33,0.35)]" : undefined
                    )}
                    onClick={() => onOpenChange(false)}
                  >
                    <span style={{ fontFamily: "var(--font-sans)" }}>{link.label}</span>
                  </AppLink>
                );
              })}
            </nav>
            <div className="pt-2">
              <button
                type="button"
                className={cn(
                  "w-full rounded-2xl px-3 py-2.5 text-sm font-semibold tracking-[0.06em] text-center",
                  "bg-[#AE5521] text-[#FAFAFA]",
                  "border border-[rgba(250,250,250,0.25)]",
                  "shadow-[0_6px_26px_rgba(174,85,33,0.35)]",
                  "transition hover:bg-[#9A4A1D]"
                )}
                onClick={() => {
                  openContactModal();
                  onOpenChange(false);
                }}
              >
                {cta.label}
              </button>
            </div>
            <footer className="mt-2 pt-3 text-[11px] text-[color-mix(in_oklab,var(--fg-on-olive)_65%,black)]" style={{ fontFamily: "var(--font-mono)" }}>
              © {new Date().getFullYear()} Apigen. All rights reserved.
            </footer>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
