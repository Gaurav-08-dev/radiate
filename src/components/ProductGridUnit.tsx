/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { products } from "@wix/stores";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WixImage from "./WixImage";
// import Badge from "./ui/badge";
import { replaceRupeesSymbol } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

interface ProductGridUnitProps {
  product: products.Product;
  width?: number;
  height?: number;
}

const ProductGridUnit = ({ product, width=700, height=700 }: ProductGridUnitProps) => {
  const mainImage = product.media?.mainMedia?.image;

  const productOptions = product?.productOptions;
  const priceData = product?.priceData;

  return (
    <div className="flex h-[500px] w-72 flex-col rounded-lg border-[0.5px] border-purple-200 p-4">
        <Link href={`/products/${product.slug}`} >
      <div className="relative mb-4 aspect-square h-[250px] overflow-hidden rounded-lg">
        <WixImage
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          width={width}
          height={height}
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
        </Link>

      <div className="flex flex-grow flex-col justify-items-end gap-2">
          {product.name}
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

        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm">
            {replaceRupeesSymbol(priceData?.formatted?.price || "")}
          </span>

          {/* {product.ribbon && <Badge className="text-xs">{product.ribbon}</Badge>} */}
        </div>

        <Button
          variant="default"
          size="lg"
          className="mt-auto bg-[#500769] hover:bg-purple-700"
        >
          <ShoppingBag />ADD TO MY BAG
        </Button>
      </div>
    </div>
  );
};

export default ProductGridUnit;
