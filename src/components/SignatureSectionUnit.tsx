"use client";
import React from "react";
import WixImage from "./WixImage";
import { replaceRupeesSymbol } from "@/lib/utils";
import { products } from "@wix/stores";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";
interface SignatureSectionUnitProps {
  product: products.Product;
}

const SignatureSectionUnit = ({ product }: SignatureSectionUnitProps) => {
  const mainImage = product.media?.mainMedia?.image;
  const priceData = product?.priceData;
  const productOptions = product?.productOptions;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12">
      <h1 className="py-8 text-center font-serif text-5xl font-medium tracking-tight">
        Discover Our Signature Candle
      </h1>

      <div className="flex items-center justify-center bg-[#F8D7E3]">
        <div className="h-full min-h-[400px] w-1/2 overflow-hidden">
          <WixImage
            mediaIdentifier={mainImage?.url}
            alt={mainImage?.altText}
            width={700}
            height={600}
            className="object-fill transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="mx-auto flex w-1/2 flex-col items-center gap-8 px-4">
          <div className="flex items-center justify-center md:flex-row">
            <div className="flex flex-col gap-6">
              <Link href={`/products/${product.slug}`}>
                <h1 className="font-serif text-5xl font-medium">
                  {product.name}
                </h1>
              </Link>

              <div
                className="text-zinc-600 w-[80%]"
                dangerouslySetInnerHTML={{
                  __html: product.description || "",
                }}
              />

              <div className="space-y-4">
                <div className="space-y-2">
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
                  <p className="text-xl font-bold">
                    {replaceRupeesSymbol(priceData?.formatted?.price || "")}
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-4">
                <AddToCartButton
                  product={product}
                  quantity={1}
                  className="h-14 w-1/2 bg-[#500769] text-xl text-white hover:bg-[#500769]/90"
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
