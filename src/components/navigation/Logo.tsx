"use client";
import React, { useState } from "react";
import AppLink from "@/components/AppLink";
import AppImage from "@/components/AppImage";

export function Logo({
  text = "",
  imageSrc = "/hero/logo-header.png",
  showImage = true,
}: {
  text?: string;
  imageSrc?: string;
  showImage?: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const currentImageSrc = imageError ? imageSrc : "/hero/logo-header.png";

  return (
    <AppLink href="/" aria-label="Apigen home" className="inline-flex flex-col items-start leading-tight">
      {showImage && !imageError ? (
        <span className="block h-10 md:h-12 w-auto overflow-hidden">
          <AppImage
            key={currentImageSrc} // Force re-render when src changes
            src={currentImageSrc}
            alt="Apigen logo with wordmark"
            width={200}
            height={80}
            sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 220px"
            className="h-full w-auto object-contain"
            priority // LCP optimization for header logo
            onError={handleImageError}
          />
        </span>
      ) : null}
      {(!showImage || imageError) && text ? (
        <span className="text-lg font-semibold tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)" }}>
          {text || "APIGEN"}
        </span>
      ) : null}
    </AppLink>
  );
}

