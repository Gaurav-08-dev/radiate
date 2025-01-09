/* eslint-disable @next/next/no-img-element */
import React from "react";
import { products } from "@wix/stores";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { media as wixMedia } from "@wix/sdk";

interface ProductGridUnitProps {
  product: products.Product;
}

const ProductGridUnit = ({ product }: ProductGridUnitProps) => {
  const mainImage = product.media?.mainMedia?.image;
  const resizedImageUrl = mainImage?.url
    ? wixMedia.getScaledToFillImageUrl(mainImage.url, 700, 700, {})
    : null;
  const productOptions = product.productOptions;
  const priceData = product.priceData;

  return (
    <div className="mx-auto flex h-[500px] w-72 flex-col rounded-lg border-[0.5px] border-purple-200 p-4">
      <div className="relative mb-4 aspect-square h-[250px] overflow-hidden rounded-lg">
        <img
          src={resizedImageUrl || ""}
          alt={product.slug}
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-grow flex-col justify-items-end">
        <Link href={`/products/${product.slug}`} className="">
          {product.name}
        </Link>
        <div
          className="my-2 text-sm text-gray-600"
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        />
        <div className="flex gap-2">
          {productOptions?.map((variant) => (
            <div key={variant.name}>
              <span className="flex gap-1 text-sm font-bold">
                {variant.name} -
                <span className="font-normal text-gray-500">
                  {variant.choices?.map((item) => item.value)}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-xl">
            {priceData?.formatted?.price
              ?.replace("₹", "Rs ")
              .replace(".00", "")}
          </span>
        </div>

        <Button
          variant="default"
          size="lg"
          className="mt-auto bg-[#500769] hover:bg-purple-700"
        >
          ADD TO MY BAG
        </Button>
      </div>
    </div>
  );
};

export default ProductGridUnit;
