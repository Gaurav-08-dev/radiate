"use client";
import { useState } from "react";
import WixImage from "@/components/WixImage";
import { products } from "@wix/stores";
// import { Star } from "lucide-react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import ProductDescription from "@/components/ProductDescription";
import { AddToCartButton } from "@/components/AddToCartButton";

interface ProductDetailProps {
  product: products.Product;
}
export default function ProductDetails({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(
    product.media?.mainMedia?.image,
  );

  const imagesList = product.media?.items;
  const priceData = product.priceData;
  const productAdditionalDetails = product.additionalInfoSections;

  const productIngredients = productAdditionalDetails?.find(
    (detail) => detail.title === "Product details & ingredients",
  );
  const productDirections = productAdditionalDetails?.find(
    (detail) => detail.title === "Directions of use",
  );
  const productIdealFor = productAdditionalDetails?.find(
    (detail) => detail.title === "Ideal for",
  );
  const handleImageClick = (image: products.MediaItem) => {
    setCurrentImage(image.image);
  };

  const isInStock = product?.stock?.quantity && product?.stock?.quantity > 0;
  //   const availableQuantity = product.stock?.quantity;
  //   const availableQuantityExceeded = !!availableQuantity && quantity > availableQuantity;
  //   const inStock = checkInStock(product, selectedOptions); 3:57:57

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
          <h1 className="text-3xl font-semibold">{product.name}</h1>

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
            className="text-xl text-gray-600"
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
                {product?.discount?.value ? (
                  <span className="text-[#1D9C50]">{`You save ₹${product?.discount?.value}`}</span>
                ) : (
                  ""
                )}
              </div>
              {/* </div> */}
            </div>

            <div
              className={`mt-10 flex h-[50px] w-[400px] overflow-hidden rounded-sm gap-10`}
            >
              {isInStock ? (
                <div className="flex rounded border">
                <button
                  disabled={quantity === 1}
                  type="button"
                  className="px-3 py-1"
                  onClick={() =>
                    setQuantity(quantity - 1)
                  }
                >
                  -
                </button>
                <input
                  title="Quantity"
                  type="number"
                  className="w-12 pl-3 text-center"
                  value={quantity}
                  readOnly
                  // onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <button
                  type="button"
                  className="px-3 py-1"
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              ) : null}

              <AddToCartButton
                className={`h-full flex-1 rounded-sm bg-[#500769] text-xl text-white hover:bg-[#500769]/90`}
                product={product}
                quantity={quantity}
                buttonText={isInStock ? "Add to My Bag" : "Out of stock"}
                disabled={!isInStock}
              />
            </div>
          </div>
          <div className="space-y-4 border-t pt-6">
            <ProductDescription
              key={productIngredients?.title}
              title={productIngredients?.title || ""}
              description={productIngredients?.description || ""}
            />
            <ProductDescription
              key={productDirections?.title}
              title={productDirections?.title || ""}
              description={productDirections?.description || ""}
            />
            <ProductDescription
              key={productIdealFor?.title}
              title={productIdealFor?.title || ""}
              description={productIdealFor?.description || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
