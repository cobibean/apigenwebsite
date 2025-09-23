import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

export default function AppImage({ src, alt, width, height, sizes, ...rest }: Props) {
  const isAbsolute = /^https?:\/\//.test(src);
  if (!alt) {
    throw new Error("AppImage requires alt text");
  }
  if (!width || !height) {
    // Allow responsive images when sizes is provided
    if (!sizes) {
      throw new Error("AppImage requires width & height or sizes");
    }
  }
  // For absolute URLs, just pass through; Next/Image supports remote patterns via config if needed.
  return <Image src={src} alt={alt} width={width as any} height={height as any} sizes={sizes} {...(rest as any)} />;
}


