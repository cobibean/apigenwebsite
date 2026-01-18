import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

export default function AppImage({ src, alt, width, height, sizes, fill, ...rest }: Props) {
  if (alt === undefined || alt === null) {
    throw new Error("AppImage requires alt text");
  }
  
  // When using fill, don't require or pass width/height
  if (fill) {
    return (
      <Image src={src} alt={alt} fill sizes={sizes} {...rest} />
    );
  }
  
  // For non-fill images, require dimensions or sizes
  if (!width || !height) {
    if (!sizes) {
      throw new Error("AppImage requires width & height or sizes");
    }
  }
  
  return (
    <Image src={src} alt={alt} width={width} height={height} sizes={sizes} {...rest} />
  );
}


