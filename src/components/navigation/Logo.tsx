"use client";
import React from "react";
import AppLink from "@/components/AppLink";

export function Logo({ text = "APIGEN" }: { text?: string }) {
  return (
    <AppLink href="/" aria-label="Apigen home" className="font-semibold tracking-wide">
      {text}
    </AppLink>
  );
}


