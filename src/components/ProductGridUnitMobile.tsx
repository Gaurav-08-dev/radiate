"use client";
import React, { useState, useEffect } from "react";
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

const ProductGridUnitMobile = ({
  product,
  showAddToCart = true,
  showOptions = true,
  width = 300,
  height = 250,
  className,
}: ProductGridUnitProps) => {
  const [currentImage, setCurrentImage] = useState("");

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

  useEffect(() => {
    if(!product.productOptions?.length) return;
    const selectedVariant = product.productOptions?.find(
      (option) => option.name === "Color",
    );
    const selectedOption = selectedVariant?.choices?.find(
      (choice) => choice.description === selectedOptions.Color,
    );
    // @ts-ignore
    setCurrentImage(selectedOption?.media?.mainMedia?.image || mainImage);
  }, [selectedOptions]);

  return (
    <div
      className={cn(
        `flex h-[400px] w-[170px] flex-col overflow-hidden p-2 sm:h-[450px] sm:w-[280px] md:p-0`,
        className,
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        prefetch={true}
        className={`${playfair.className} lg:w-full`}
      >
        <div className="relative mb-3 h-[369px] w-full overflow-hidden sm:mb-4 sm:h-[250px] sm:w-[280px]">
          <WixImage
            // @ts-ignore
            mediaIdentifier={currentImage?.url || mainImage?.url}
            alt={mainImage?.altText}
            width={width}
            height={height}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div
          className={`${playfair.className} no-scrollbar mb-2 line-clamp-2 h-6 w-full overflow-y-hidden text-ellipsis text-sm font-semibold sm:h-12 sm:text-[0.850rem] lg:w-full`}
        >
          {product.name}
        </div>
      </Link>

      <div
        className={`flex flex-grow flex-col gap-2 sm:gap-4 ${montserrat.className}`}
      >
        <div className="flex min-h-[36px] items-center justify-between sm:min-h-[42px]">
          {netWeight && (
            <div
              className="text-sm text-gray-600 sm:text-sm"
              dangerouslySetInnerHTML={{ __html: netWeight || "" }}
            />
          )}
          {showOptions && product.productOptions?.length ? (
            <div className="flex min-h-[32px] gap-1">
              <ProductOptions
                product={product}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            </div>
          ) : (
            <div
              className="line-clamp-2 text-sm text-gray-600 sm:text-sm lg:line-clamp-none"
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
              <span className="text-sm text-gray-400 line-through sm:text-sm">
                {priceData?.formatted?.price}
              </span>
            ) : (
              ""
            )}
            <span className="text-sm font-semibold sm:text-sm">
              {priceData?.formatted?.discountedPrice ||
                priceData?.formatted?.price}
            </span>
          </div>

          {showAddToCart && (
            <AddToCartButton
              selectedOptions={selectedOptions}
              variant="default"
              size="sm"
              className="w-1/2 rounded-none bg-[#500769] text-sm hover:bg-[#500769]/90 sm:text-sm lg:w-full"
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

export default ProductGridUnitMobile;
