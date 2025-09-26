import React from "react";
type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
const Link = ({ href, children, ...rest }: Props) => (
  <a href={href} {...rest}>
    {children}
  </a>
);
export default Link as any;

