"use client";
import { useState } from "react";
import WixImage from "@/components/WixImage";
import { products } from "@wix/stores";
// import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import ProductDescription from "@/components/ProductDescription";

const descriptionDetails = [
  {
    title: "Product details & ingredients",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Directions of use",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Ideal For",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
];
interface ProductDetailProps {
  product: products.Product;
}
export default function ProductDetails({ product }: ProductDetailProps) {
  const [currentImage, setCurrentImage] = useState(
    product.media?.mainMedia?.image,
  );
  const imagesList = product.media?.items;
  const priceData = product.priceData;
  const handleImageClick = (image: products.MediaItem) => {
    setCurrentImage(image.image);
  };

  return (
    <div className="container mx-auto px-40 py-24">
      <div className="flex flex-col gap-12 md:flex-row">
        <div className="w-[40%] space-y-4">
          <div className="relative aspect-square max-h-fit max-w-fit overflow-hidden rounded-lg">
            <WixImage
              mediaIdentifier={currentImage?.url}
              alt={currentImage?.altText}
              width={500}
              height={500}
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {imagesList?.map((img, i) => (
              <div
                key={i}
                className="relative h-28 w-28 flex-shrink-0 cursor-pointer rounded-lg"
                onClick={() => handleImageClick(img)}
              >
                <WixImage
                  mediaIdentifier={img?.image?.url}
                  alt={img?.image?.altText}
                  width={112}
                  height={112}
                  className="rounded object-cover"
                />
                {img?.image?.url === currentImage?.url && (
                  <div className="absolute inset-0 rounded-sm bg-black/50"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-[60%] space-y-6">
          <h1 className="text-5xl font-semibold">{product.name}</h1>

          {/* <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < product?.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-sm text-gray-600">
              ({product?.reviews} Reviews)
            </span>
          </div> */}

          <div
            className="text-2xl text-gray-700"
            dangerouslySetInnerHTML={{
              __html: product.description || "",
            }}
          />

          {/* <div className="flex flex-wrap gap-2">
            {product?.features?.map((feature, i) => (
              <span
                key={i}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm"
              >
                {feature}
              </span>
            ))}
          </div> */}

          <div className="h-[1px] w-full bg-gray-200" />

          <div className="flex items-center gap-20">
            {/* <div className="flex items-baseline "> */}
            {/* Display ribbon here - limited time offer */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span className="font-semibold">MRP</span>
                <span className="text-gray-400 line-through">
                  {priceData?.formatted?.price}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-5xl font-semibold">
                  {priceData?.formatted?.discountedPrice ||
                    priceData?.formatted?.price}
                </span>
                {priceData?.formatted?.discountedPrice &&
                  priceData?.price &&
                  priceData?.discountedPrice && (
                    <span className="text-[#1D9C50]">{`You save ₹${priceData.price - priceData.discountedPrice}`}</span>
                  )}
              </div>
              {/* </div> */}
            </div>

            <div
              className={`mt-10 flex h-[50px] w-[400px] overflow-hidden rounded-sm`}
            >
              <Select value={"1"} onValueChange={() => {}}>
                <SelectTrigger className="h-full w-1/6 rounded-sm rounded-r-none border-r-0 border-[#500769] bg-white">
                  <SelectValue defaultValue={1} />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                // onClick={() => onAdd?.(Number(quantity))}
                className="h-full flex-1 rounded-l-none rounded-r-sm bg-[#500769] text-xl text-white hover:bg-[#500769]/90"
              >
                ADD TO MY BAG
              </Button>
            </div>
          </div>
          <div className="space-y-4 pt-6">
            {descriptionDetails.map((detail) => (
              <ProductDescription
                key={detail.title}
                title={detail.title}
                description={detail.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// function ProductSkeleton() {
//     return (
//         <div className="container mx-auto px-40 py-24">
//           <div className="flex flex-col gap-12 md:flex-row">
//             <div className="w-[40%] space-y-4">
//               <div className="relative aspect-square max-h-fit max-w-fit overflow-hidden rounded-lg">
//                 <div className="h-[500px] w-[500px] animate-pulse rounded-lg bg-gray-200" />
//               </div>
//               <div className="flex gap-2">
//                 {[...Array(4)].map((_, i) => (
//                   <div key={i} className="h-28 w-28 animate-pulse rounded-lg bg-gray-200" />
//                 ))}
//               </div>
//             </div>

//             <div className="w-[60%] space-y-6">
//               <div className="h-12 w-3/4 animate-pulse rounded bg-gray-200" />

//               <div className="flex items-center gap-2">
//                 {[...Array(5)].map((_, i) => (
//                   <div key={i} className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
//                 ))}
//                 <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
//               </div>

//               <div className="h-8 w-1/4 animate-pulse rounded bg-gray-200" />
//               <div className="h-10 w-1/3 animate-pulse rounded bg-gray-200" />
//               <div className="h-12 w-full animate-pulse rounded bg-gray-200" />
//             </div>
//           </div>
//         </div>
//     )
// }
