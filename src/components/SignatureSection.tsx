import React from "react";;
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { getWixClient } from "@/lib/wix-client.base";
import WixImage from "./WixImage";
import { replaceRupeesSymbol } from "@/lib/utils";

const SignatureSection = async () => {
  const wixClient = await getWixClient();
  const { collection } =
    await wixClient.collections.getCollectionBySlug("signature-candle");
  if (!collection) {
    return null;
  }

  const signatureCandle = await wixClient.products
    .queryProducts()
    .hasSome("collectionIds", [collection._id])
    .descending("lastUpdated")
    .find();

  if (!signatureCandle.items.length) return null;

  const product = signatureCandle.items[0];
  const mainImage = product.media?.mainMedia?.image;
  const priceData = product?.priceData;
  const productOptions = product?.productOptions;
  return (
    <div className="pb-12 ">
      <div className="container mx-auto flex flex-col items-center gap-8 px-4">
        <h1 className="py-8 text-center font-serif text-4xl">
          Discover Our Signature Candle
        </h1>
        <div className="flex items-center justify-center md:flex-row">
          <div className="h-full w-1/2 overflow-hidden rounded-lg">
            <WixImage
              mediaIdentifier={mainImage?.url}
              alt={mainImage?.altText}
              width={600}
              height={600}
              className="object-fill transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex flex-col gap-6 pl-12">
            <h1 className="font-serif text-4xl">{product.name}</h1>

            <div
              className="text-zinc-800"
              dangerouslySetInnerHTML={{
                __html:
                  product.additionalInfoSections?.find(
                    (section) => section.title === "Special description",
                  )?.description || "",
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

            <div className="flex w-[300px] flex-col gap-4">
              <Button
                variant="default"
                size="lg"
                className="bg-[#500769] text-white hover:bg-[#500769]/90"
              >
                <ShoppingBag /> ADD TO MY BAG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureSection;
