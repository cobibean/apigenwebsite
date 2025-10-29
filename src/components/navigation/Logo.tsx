"use client";
import React from "react";
import AppLink from "@/components/AppLink";
import AppImage from "@/components/AppImage";

export function Logo({
  text = "",
  imageSrc = "/hero/logo%20+%20text.png",
  showImage = true,
}: {
  text?: string;
  imageSrc?: string;
  showImage?: boolean;
}) {
  return (
    <AppLink href="/" aria-label="Apigen home" className="inline-flex flex-col items-start leading-tight">
      {showImage ? (
        <span className="block h-10 md:h-12 w-auto overflow-hidden">
          <AppImage
            src={imageSrc}
            alt="Apigen logo with wordmark"
            width={200}
            height={80}
            sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 220px"
            className="h-full w-auto object-contain"
          />
        </span>
      ) : null}
      {!showImage && text ? (
        <span className="text-lg font-semibold tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)" }}>
          {text}
        </span>
      ) : null}
    </AppLink>
  );
}

