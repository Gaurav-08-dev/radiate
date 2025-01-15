"use client";
import React from "react";
import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "./WixImage";
// import Badge from "./ui/badge";

import { AddToCartButton } from "./AddToCartButton";

interface ProductGridUnitProps {
  product: products.Product;
  width?: number;
  height?: number;
}

const ProductGridUnit = ({
  product,
  width = 700,
  height = 700,
}: ProductGridUnitProps) => {
  const mainImage = product.media?.mainMedia?.image;
  const discount = product.discount;
  const productOptions = product?.productOptions;
  const priceData = product?.priceData;

  return (
    <div className="flex h-[500px] w-72 flex-col rounded-lg p-4">
      <Link href={`/products/${product.slug}`}>
        <div className="relative mb-4 aspect-square h-[250px] overflow-hidden rounded-lg">
          <WixImage
            mediaIdentifier={mainImage?.url}
            alt={mainImage?.altText}
            width={width}
            height={height}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        {product.name}
      </Link>

      <div className="mt-2 flex flex-grow flex-col justify-items-end gap-2">
        <div
          className="prose dark:prose-invert my-2 text-sm text-gray-600"
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

        <div className="flex items-baseline gap-2">
          {discount?.value ? (
            <span className="text-sm text-gray-400 line-through">
              {priceData?.formatted?.price}
            </span>
          ) : (
            ""
          )}
          <span className="text-sm font-semibold">
            {priceData?.formatted?.discountedPrice ||
              priceData?.formatted?.price}
          </span>

          {/* {product.ribbon && <Badge className="text-xs">{product.ribbon}</Badge>} */}
        </div>

        <AddToCartButton
          variant="default"
          size="lg"
          className="mt-auto bg-[#500769] hover:bg-purple-700"
          product={product}
          quantity={1}
        />
      </div>
    </div>
  );
};

export default ProductGridUnit;
