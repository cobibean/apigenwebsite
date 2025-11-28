"use client";
import React, { useState } from "react";
import AppLink from "@/components/AppLink";
import AppImage from "@/components/AppImage";

export function Logo({
  text = "APIGEN",
  imageSrc = "/hero/logo-header.png",
  showImage = true,
}: {
  text?: string;
  imageSrc?: string;
  showImage?: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <AppLink href="/" aria-label="Apigen home" className="inline-flex flex-col items-start leading-tight">
      {showImage && !imageError ? (
        <span className="block h-10 md:h-12 w-auto overflow-hidden">
          <AppImage
            key={imageSrc}
            src={imageSrc}
            alt="Apigen logo with wordmark"
            width={200}
            height={80}
            sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 220px"
            className="h-full w-auto object-contain"
            priority // LCP optimization for header logo
            onError={() => setImageError(true)}
          />
        </span>
      ) : null}
      {/* Fallback text when image fails or showImage is false - always shows APIGEN as fallback */}
      {(!showImage || imageError) ? (
        <span className="text-lg font-semibold tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)" }}>
          {text}
        </span>
      ) : null}
    </AppLink>
  );
}
