"use client";
import Link from "next/link";
import { AnchorHTMLAttributes, ComponentProps } from "react";
import { useContactModal } from "@/providers/ContactModalProvider";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
  newTab?: boolean;
  openModal?: boolean; // Explicit flag to trigger modal
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">
  & Omit<ComponentProps<typeof Link>, "href">;

export default function AppLink({
  href,
  children,
  className,
  prefetch,
  newTab,
  openModal,
  ...rest
}: Props) {
  const { openContactModal } = useContactModal();
  const isExternal =
    /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

  // Check if this link should open the contact modal
  const shouldOpenModal = openModal || (href === "/contact" && !isExternal);

  if (shouldOpenModal) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          openContactModal();
        }}
        className={className}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }

  if (isExternal || newTab) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={prefetch} className={className} {...(rest as Omit<ComponentProps<typeof Link>, "href">)}>
      {children}
    </Link>
  );
}
