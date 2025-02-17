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
    <div
      className={cn(
        `flex h-[400px] w-[160px] sm:h-[450px] sm:w-[280px] flex-col overflow-hidden`,
        className,
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        prefetch={true}
        className={`${playfair.className}`}
      >
        <div className="relative mb-3 sm:mb-4 aspect-auto h-[180px] w-[160px] sm:h-[250px] sm:w-[280px] overflow-hidden">
          <WixImage
            mediaIdentifier={mainImage?.url}
            alt={mainImage?.altText}
            width={width}
            height={height}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="no-scrollbar mb-2 line-clamp-2 h-10 sm:h-12 overflow-y-hidden text-ellipsis text-[0.75rem] sm:text-[0.850rem]/tight font-semibold">
          {product.name}
        </div>
      </Link>

      <div className={`flex flex-grow flex-col gap-2 sm:gap-4 ${montserrat.className}`}>
        <div className="flex min-h-[36px] sm:min-h-[42px] items-center justify-between">
          {netWeight && (
            <div
              className="text-xs sm:text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: netWeight || "" }}
            />
          )}
          {showOptions && product.productOptions?.length ? (
            <div className="flex min-h-[32px] sm:min-h-[39px] gap-1 sm:gap-2">
              <ProductOptions
                product={product}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            </div>
          ) : (
            <div
              className="text-xs sm:text-sm text-gray-600"
              dangerouslySetInnerHTML={{
                __html:
                  product.additionalInfoSections?.find(
                    (section) => section.title?.toLowerCase() === "subtitle",
                  )?.description || "",
              }}
            />
          )}
        </div>

        <div className="flex flex-col gap-1 sm:gap-2">
          <div className="flex items-baseline gap-1 sm:gap-2">
            {discount?.value ? (
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                {priceData?.formatted?.price}
              </span>
            ) : (
              ""
            )}
            <span className="text-xs sm:text-sm font-semibold">
              {priceData?.formatted?.discountedPrice ||
                priceData?.formatted?.price}
            </span>
          </div>

          {showAddToCart && (
            <AddToCartButton
              selectedOptions={selectedOptions}
              variant="default"
              size="sm"
              className="w-full rounded-none text-xs sm:text-sm bg-[#500769] hover:bg-[#500769]/90"
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
