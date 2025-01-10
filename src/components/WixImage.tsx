/* eslint-disable @next/next/no-img-element */
"use client";
import { ImgHTMLAttributes, useEffect, useState } from "react";
import { media as wixMedia } from "@wix/sdk";

type WixImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "alt"
> & {
  mediaIdentifier: string | undefined;
  placeholder?: string;
  alt?: string | undefined | null;
} & (
    | {
        scaledToFill?: true;
        width: number;
        height: number;
      }
    | {
        scaledToFill?: false;
      }
  );

export default function WixImage({
  mediaIdentifier,
  placeholder = "/placeholder.jpg",
  alt,
  ...props
}: WixImageProps) {
  const [imageUrl, setImageUrl] = useState(placeholder);

  useEffect(() => {
    if (mediaIdentifier) {
      const url = props.scaledToFill || props.scaledToFill === undefined
        ? wixMedia.getScaledToFillImageUrl(
            mediaIdentifier,
            'width' in props ? props.width : 0,
            'height' in props ? props.height : 0,
            {},
          )
        : wixMedia.getImageUrl(mediaIdentifier).url
      setImageUrl(url);
    }
  }, [mediaIdentifier, props]);

  return <img src={imageUrl} alt={alt || ""} {...props} />;
}
