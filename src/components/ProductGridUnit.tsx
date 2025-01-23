"use client";
import React, { useState } from "react";
import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "./WixImage";
// import Badge from "./ui/badge";

import { AddToCartButton } from "./AddToCartButton";
import ProductOptions from "./ProductOptions";
// import { findVariant } from "@/lib/utils";

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
  const priceData = product?.priceData;
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0]?.description || "",
      }))
      ?.reduce((acc, option) => ({ ...acc, ...option }), {}) || {},
  );

  // const selectedVariant = findVariant(product, selectedOptions);
  
  return (
    <div className="flex h-[500px] w-72 flex-col overflow-hidden rounded-lg p-4">
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
        <div className="line-clamp-1 h-6 overflow-hidden text-ellipsis font-semibold">
          {product.name}
        </div>
      </Link>

      <div className="mt-2 flex flex-grow flex-col justify-between gap-2">
        <div>
          <div
            className={`prose my-2 text-ellipsis text-sm text-gray-600 dark:prose-invert ${!product.productOptions?.length ? "line-clamp-2" : "line-clamp-1"}`}
            dangerouslySetInnerHTML={{ __html: product.description || "" }}
          />
          <div className="flex min-h-[39px] gap-2">
            <ProductOptions
              product={product}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
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
          </div>

          <AddToCartButton
            variant="default"
            size="lg"
            className="bg-[#500769] hover:bg-purple-700"
            product={product}
            quantity={1}
            disabled={!product?.stock?.inStock}
            buttonText={
              product?.stock?.inStock ? "Add to my bag" : "Out of stock"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGridUnit;
