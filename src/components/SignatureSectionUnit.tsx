"use client";
import React from "react";
import WixImage from "./WixImage";
import { playfair, playfairItalic } from "@/lib/utils";
import { products } from "@wix/stores";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";

interface SignatureSectionUnitProps {
  product: products.Product;
}

const SignatureSectionUnit = ({ product }: SignatureSectionUnitProps) => {
  const mainImage = product.media?.mainMedia?.image;
  const priceData = product?.priceData;
  const originalPrice = priceData?.formatted?.price;
  const discount = priceData?.formatted?.discountedPrice;
  const productOptions = product?.productOptions;
  const title =
    product?.additionalInfoSections?.find(
      (section) => section.title?.toLowerCase() === "landing page title",
    )?.description || product.name;
  
  // Add state to track if description is expanded
  const [isExpanded, setIsExpanded] = React.useState(false);

  const subtitle = product?.additionalInfoSections?.find(section => section.title?.toLowerCase() === "subtitle")?.description || "";
  const description = product?.description || "";

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 overflow-hidden md:gap-12 mt-5 md:mt-0">
      <div className="w-full flex items-center justify-between md:justify-center mt-8 md:mt-0">
        <div className="block h-[0.5px] w-[8%] bg-gray-200 md:hidden" />
        <h1
          className={`${playfair.className} text-center font-serif text-2xl font-medium tracking-tight md:py-8 md:text-5xl`}
        >
          Discover Our Signature Candle
        </h1>
        <div className="block h-[0.5px] w-[8%] bg-gray-200 md:hidden" />
      </div>

      <div className="flex flex-col gap-8 md:flex-row items-center justify-center md:bg-white">
        <div className="h-full min-h-fit w-full md:w-1/2 overflow-hidden">
        <Link href={`/products/${product.slug}`} legacyBehavior passHref>
          <WixImage
            mediaIdentifier={mainImage?.url}
            alt={mainImage?.altText}
            width={800}
            height={600}
            className="object-fill transition-transform duration-300 hover:scale-105"
          />
          </Link>
        </div>
        <div className="mx-auto flex w-full md:w-1/2 flex-col items-center gap-8 px-4">
          <div className="flex w-full items-center justify-center md:flex-row">
            <div className="flex flex-col items-center md:items-start gap-5 md:gap-10 w-full">
              <Link href={`/products/${product.slug}`}>
                <div
                  className={`${playfairItalic.className} text-2xl md:text-5xl font-medium text-center md:text-left`}
                  dangerouslySetInnerHTML={{
                    __html: title || "",
                  }}
                />
              </Link>

              {/* <div className="line-clamp-1 relative md:hidden w-full md:w-[80%] text-center md:text-justify text-zinc-600 text-sm md:text-base">
                <div
                  className={`${isExpanded ? '' : 'line-clamp-3'}`}
                  dangerouslySetInnerHTML={{
                    __html: subtitle,
                  }}
                />
                
                {subtitle && subtitle.length > 100 && (
                  <button 
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-block ml-1 text-[#500769] text-sm font-medium hover:underline"
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div> */}

              <div className="block relative w-full md:w-[80%] space-y-2 text-center md:text-justify text-zinc-600 text-sm md:text-xl">
                <div
                  className={`${isExpanded ? '' : 'line-clamp-3 md:line-clamp-none'}`}
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
                
                {description && description.length > 100 && (
                  <button 
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-block ml-1 text-[#500769]  text-sm font-medium hover:underline md:hidden"
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>

              <div className="space-y-4 text-center md:text-left">
                {productOptions && productOptions.length > 0 && (
                  <div className="space-y-2">
                    {productOptions?.map((variant) => (
                      <div key={variant.name}>
                        <span className="flex gap-1 text-xs md:text-sm font-bold justify-center md:justify-start">
                        {variant.name} -
                        <span className="font-normal text-gray-500">
                          {variant.choices?.map((item) => item.value)}
                        </span>
                      </span>
                    </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-center md:justify-start gap-2">
                  {originalPrice && (
                    <p
                      className={`text-sm md:text-base font-bold ${discount ? "text-gray-500 line-through" : ""}`}
                    >
                      {originalPrice}
                    </p>
                  )}
                  {discount && <p className="text-base md:text-xl font-bold">{discount}</p>}
                </div>
              </div>

              <div className="flex w-full flex-col items-center md:items-start gap-4">
                <AddToCartButton
                  product={product}
                  quantity={1}
                  className="h-10 md:h-14 w-1/2 rounded-none bg-[#500769] text-base md:text-xl text-white hover:bg-[#500769]/90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureSectionUnit;
