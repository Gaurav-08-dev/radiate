/* eslint-disable @next/next/no-img-element */
import { ImgHTMLAttributes } from "react";
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
  placeholder = "/placeholder.png",
  alt,
  ...props
}: WixImageProps) {
  const image = mediaIdentifier
    ? props.scaledToFill || props.scaledToFill === undefined
      ? wixMedia.getScaledToFillImageUrl(
          mediaIdentifier,
          'width' in props ? props.width : 0,
          'height' in props ? props.height : 0,
          {},
        )
      : wixMedia.getImageUrl(mediaIdentifier).url
    : placeholder;

  return <img src={image} alt={alt || ""} {...props} />;
}
