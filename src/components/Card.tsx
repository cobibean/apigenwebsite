import React from "react";

export interface CardProps {
  title: string;
  description: string;
  /** Optional custom className to merge with base styles */
  className?: string;
  /** Adjust border radius: 'sm' = 20px, 'md' = 24px, 'lg' = 28px */
  radius?: "sm" | "md" | "lg";
  /** Adjust internal padding */
  padding?: "sm" | "md" | "lg";
  /** Gradient direction for hover effect */
  gradientDirection?: "tl" | "tr" | "bl" | "br";
}

export default function Card({
  title,
  description,
  className = "",
  radius = "sm",
  padding = "md",
  gradientDirection = "bl",
}: CardProps) {
  // Border radius mapping
  const radiusClasses = {
    sm: "rounded-[20px]",
    md: "rounded-[24px]",
    lg: "rounded-[28px]",
  };

  // Padding mapping
  const paddingClasses = {
    sm: "p-4 sm:p-5",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-7",
  };

  // Gradient direction mapping
  const gradientDirections = {
    tl: "315deg", // top-left
    tr: "225deg", // top-right
    bl: "45deg",  // bottom-left (default for About cards)
    br: "135deg", // bottom-right (default for Brands cards)
  };

  const gradientAngle = gradientDirections[gradientDirection];

  return (
    <div
      className={`
        group relative overflow-hidden border border-[var(--border)] bg-[var(--card)]
        shadow-[0px_16px_32px_rgba(19,21,21,0.06)]
        transition-all duration-300
        hover:border-[var(--accent)]
        hover:shadow-[0px_24px_48px_rgba(19,21,21,0.12)]
        motion-safe:hover:-translate-y-1
        ${radiusClasses[radius]}
        ${paddingClasses[padding]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(${gradientAngle}, color-mix(in oklab, var(--accent) 12%, transparent) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative space-y-2">
        <h3
          className="text-base font-semibold text-[var(--primary)] sm:text-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed text-[var(--secondary)] sm:text-base"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

