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
            "bg-black/60 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:duration-200 data-[state=closed]:duration-170",
            "md:hidden"
          )}
        />
        <DialogPrimitive.Content
          id={panelId}
          ref={contentRef}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-sm translate-x-[-50%] translate-y-[-50%]",
            "h-auto max-h-[85vh] overflow-y-auto",
            "rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 flex flex-col gap-6 text-[var(--fg)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            "data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:duration-200 data-[state=closed]:duration-170",
            "outline-none shadow-lg",
            "md:hidden"
          )}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <DialogPrimitive.Title id="mobile-nav-title" asChild>
            <VisuallyHidden>Mobile navigation</VisuallyHidden>
          </DialogPrimitive.Title>
          <div className="flex h-full flex-col gap-6">
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
                className="rounded-sm opacity-70 ring-offset-[var(--bg)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </DialogPrimitive.Close>
            </div>
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <AppLink
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "w-full rounded-md px-3 py-2.5 text-left text-sm font-medium transition",
                      "text-[var(--fg)] hover:bg-[var(--muted)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                      isActive && "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent)]"
                    )}
                    onClick={() => onOpenChange(false)}
                  >
                    {link.label}
                  </AppLink>
                );
              })}
            </nav>
            <div className="pt-2 border-t border-[var(--border)]">
              <button
                type="button"
                className={cn(
                  "w-full rounded-md px-3 py-2.5 text-sm font-semibold text-center",
                  "bg-[var(--btn-olive)] text-[var(--btn-olive-foreground)]",
                  "transition hover:bg-[var(--btn-olive-hover)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                )}
                onClick={() => {
                  openContactModal();
                  onOpenChange(false);
                }}
              >
                {cta.label}
              </button>
            </div>
            <footer className="pt-3 text-[11px] text-[var(--secondary)]" style={{ fontFamily: "var(--font-mono)" }}>
              © {new Date().getFullYear()} Apigen. All rights reserved.
            </footer>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
