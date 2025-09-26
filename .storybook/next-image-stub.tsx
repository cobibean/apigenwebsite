import React from "react";
type Props = React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean };
const Image = ({ src = "", alt = "", ...rest }: Props) => <img src={String(src)} alt={alt} {...rest} />;
export default Image as any;

