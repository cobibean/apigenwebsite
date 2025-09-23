import Link from "next/link";
import { AnchorHTMLAttributes, ComponentProps } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
  newTab?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">
  & Omit<ComponentProps<typeof Link>, "href">;

export default function AppLink({
  href,
  children,
  className,
  prefetch,
  newTab,
  ...rest
}: Props) {
  const isExternal =
    /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isExternal || newTab) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={prefetch} className={className} {...(rest as any)}>
      {children}
    </Link>
  );
}
