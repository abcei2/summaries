import Image from "next/image";
import { useState } from "react";
const CustomImage = ({
  src,
  alt,
  onClick,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Image src={src} alt={alt} fill onClick={() => onClick && onClick()} />
    </div>
  );
};

export default CustomImage;
