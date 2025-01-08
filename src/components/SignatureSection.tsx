import React from "react";
import Image from "next/image";
import signatureCandle from "@/assets/signature-candle.jpg";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const SignatureSection = () => {
  const product = {
    name: "Symphony: Life's Rythms",
    price: 999,
    weight: "200 gm/ 7.05oz",
    image: signatureCandle,
  };
  return (
    <div className="pb-12">
      <div className="container mx-auto flex flex-col items-center gap-8 px-4">
        <h1 className="py-8 text-center font-serif text-4xl">
          Discover Our Signature Candle
        </h1>
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square h-[500px] w-full overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6 pl-12">
            <h1 className="font-serif text-4xl">{product.name}</h1>
            {/* Product Description */}
            <div className="prose prose-invert max-w-none">
              <p className="text-zinc-600">
                In life&apos;s rush, Symphony invites you to slow down and savor
                the moments that matter—shared laughter with loved ones, the
                quiet joy of self-care, & peace. Inspired by the eternal dance
                of the sun & moon, this candle embodies harmony with a blend of
                sweet, earthy, soothing notes that uplift & ground you.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-zinc-400">{product.weight}</p>
                <p className="text-2xl font-bold">Rs {product.price}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-[300px]">
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
