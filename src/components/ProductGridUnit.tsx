"use client";
import React, { useState } from "react";
import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "./WixImage";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "./AddToCartButton";
import ProductOptions from "./ProductOptions";
import { playfair, montserrat } from "@/lib/utils";
interface ProductGridUnitProps {
  product: products.Product;
  width?: number;
  height?: number;
  showDescription?: boolean;
  showAddToCart?: boolean;
  showOptions?: boolean;
  className?: string;
}


const ProductGridUnit = ({
  product,
  showAddToCart = true,
  showOptions = true,
  width = 300,
  height = 250,
  className,
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

  const netWeight = product.additionalInfoSections?.find(
    (section) => section.title?.toLowerCase() === "net weight",
  )?.description;

  // const selectedVariant = findVariant(product, selectedOptions);

  return (
    <div className={cn(`flex h-[450px] w-[280px] flex-col overflow-hidden`, className)}>
      <Link href={`/products/${product.slug}`} prefetch={true} className={`${playfair.className}`}>
        <div className="relative mb-4 aspect-auto h-[250px] w-[280px] overflow-hidden">
          <WixImage
            mediaIdentifier={mainImage?.url}
            alt={mainImage?.altText}
            width={width}
            height={height}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="line-clamp-2 h-12 overflow-y-hidden text-ellipsis font-semibold mb-2 text-[0.850rem]/tight no-scrollbar">
          {product.name}
        </div>
      </Link>

      <div className={`flex flex-grow flex-col gap-4 ${montserrat.className}`}>
        <div className="flex items-center justify-between min-h-[42px]">
          {netWeight && (
            <div
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: netWeight || "" }}
            />
          )}
          {showOptions && product.productOptions?.length ? (
            <div className="flex min-h-[39px] gap-2">
              <ProductOptions
                product={product}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            </div>
          ) : (
            ""
          )}
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

          {showAddToCart && (
            <AddToCartButton
              variant="default"
              size="lg"
              className="w-full rounded-none bg-[#500769] hover:bg-[#500769]/90"
              product={product}
              quantity={1}
              disabled={!product?.stock?.inStock}
              buttonText={
                product?.stock?.inStock ? "Add to my bag" : "Out of stock"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGridUnit;
