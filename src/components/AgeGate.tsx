"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Appear from "@/components/motion/Appear";

const STORAGE_KEY = "apigen-age-verified";

export default function AgeGate() {
  const [needsGate, setNeedsGate] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored !== "true") {
      setNeedsGate(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const originalOverflow = document.documentElement.style.overflow;
    if (needsGate) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = originalOverflow || "";
    }
    return () => {
      document.documentElement.style.overflow = originalOverflow || "";
    };
  }, [needsGate, hydrated]);

  if (!hydrated || !needsGate) {
    return null;
  }

  const handleConfirm = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setNeedsGate(false);
  };

  const handleDecline = () => {
    window.location.href = "https://www.responsibility.org/";
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[color-mix(in_oklab,var(--bg) 50%,#061614)]/92 backdrop-blur-lg px-4">
      <Appear className="w-full max-w-lg">
        <div
          className="relative overflow-hidden rounded-[32px] border border-white/14 p-8 sm:p-10 text-center shadow-[0_32px_80px_rgba(8,19,17,0.32)]"
          style={{
            background:
              "linear-gradient(145deg, color-mix(in_oklab, #3bc1a0 78%, transparent) 0%, color-mix(in_oklab, #0f3b33 92%, transparent) 55%, #031d1a 100%)",
            fontFamily: "var(--font-sans)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_65%)] pointer-events-none" />
          <div className="relative flex flex-col items-center gap-6">
            <div className="flex h-10 w-auto items-center justify-center">
              <Image
                src="/hero/herotext/APIGEN_hero_text_FOREST_CHARCOAL.svg"
                alt="Apigen"
                width={144}
                height={40}
                priority
                className="h-10 w-auto"
              />
            </div>
            <div>
              <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Are you 19 years of age or older?
              </p>
              <p className="mt-3 text-sm text-white/85 sm:text-base">
                (18+ in Alberta or 21+ in Québec)
              </p>
            </div>
            <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full rounded-[24px] border border-white/20 bg-[var(--btn-olive)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-white transition-colors hover:bg-[var(--btn-olive-hover)] sm:w-auto"
              >
                Yes, continue
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="w-full rounded-[24px] border border-white/12 bg-[color-mix(in_oklab,#020809_88%,var(--bg) 12%)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-white transition-colors hover:bg-[color-mix(in_oklab,#0f2321_88%,var(--bg) 12%)] sm:w-auto"
              >
                No, exit
              </button>
            </div>
          </div>
        </div>
      </Appear>
    </div>
  );
}
