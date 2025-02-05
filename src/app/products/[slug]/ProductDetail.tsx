"use client";
import { useState } from "react";
import WixImage from "@/components/WixImage";
import { products } from "@wix/stores";
import ProductDescription from "@/components/ProductDescription";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Check } from "lucide-react";
// import BuyNowButton from "@/components/BuyNowButton";
// import ProductOptions from "@/components/ProductOptions";
interface ProductDetailProps {
  product: products.Product;
}
export default function ProductDetails({ product }: ProductDetailProps) {
  const [selectedOptions] = useState<Record<string, string>>(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0]?.description || "",
      }))
      ?.reduce((acc, option) => ({ ...acc, ...option }), {}) || {},
  );

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(
    product.media?.mainMedia?.image,
  );

  const imagesList = product.media?.items;
  const priceData = product.priceData;
  const productAdditionalDetails = product.additionalInfoSections;
  const features = productAdditionalDetails?.find(
    (detail) => detail.title?.toLowerCase() === "features",
  );

  const featuresList = features?.description
    ?.replace(/&amp;/g, "&")
    ?.replace(/&lt;/g, "<")
    ?.replace(/&gt;/g, ">")
    ?.replace(/&quot;/g, '"')
    ?.replace(/&#39;/g, "'")
    ?.replace(/&nbsp;/g, "")
    ?.replace(/<[^>]*>/g, "")
    ?.split("\n")
    ?.map((feature) => feature.trim())
    ?.filter(Boolean)?.[0];

  const productIngredients = productAdditionalDetails?.find(
    (detail) =>
      detail.title?.toLowerCase() === "product details and ingredients",
  );
  const productDirections = productAdditionalDetails?.find(
    (detail) => detail.title?.toLowerCase() === "directions of use",
  );
  const productIdealFor = productAdditionalDetails?.find(
    (detail) => detail.title?.toLowerCase() === "ideal for",
  );
  const handleImageClick = (image: products.MediaItem) => {
    setCurrentImage(image.image);
  };

  const ribbon = product.ribbon;

  const isInStock = product?.stock?.quantity && product?.stock?.quantity > 0;

  //   const availableQuantity = product.stock?.quantity;
  //   const availableQuantityExceeded = !!availableQuantity && quantity > availableQuantity;
  //   const inStock = checkInStock(product, selectedOptions); 3:57:57

  return (
    <div className="container mx-auto px-40 py-24">
      <div className="flex flex-col gap-12 md:flex-row">
        <div className="w-[40%] space-y-4">
          <div className="relative aspect-square max-h-fit max-w-fit overflow-hidden rounded-none">
            <WixImage
              mediaIdentifier={currentImage?.url}
              alt={currentImage?.altText}
              width={400}
              height={400}
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {imagesList?.map((img, i) => (
              <div
                key={i}
                className="relative h-28 w-28 flex-shrink-0 cursor-pointer rounded-none"
                onClick={() => handleImageClick(img)}
              >
                <WixImage
                  mediaIdentifier={img?.image?.url}
                  alt={img?.image?.altText}
                  width={112}
                  height={112}
                  className="rounded-none object-cover"
                />
                {img?.image?.url === currentImage?.url && (
                  <div className="absolute inset-0 rounded-none bg-black/50"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-[60%] space-y-6">
          <h1 className="text-4xl font-semibold">{product.name}</h1>

          <div
            className="space-y-4 text-base text-gray-600"
            dangerouslySetInnerHTML={{
              __html: product.description || "",
            }}
          />

          <div className="flex flex-wrap gap-4">
            {featuresList?.split(",").map((feature, i) => (
              <span key={i} className="text-sm font-medium">
                <span className="flex items-center gap-1">
                  <Check
                    size={20}
                    className="text-[#500769]"
                    strokeWidth={3}
                    absoluteStrokeWidth
                  />
                  {feature.trim()}
                </span>
              </span>
            ))}
          </div>

          <div className="h-[1px] w-full bg-gray-200" />

          <div className="flex items-center gap-20">
            <div className="flex flex-col gap-2">
                  <span className="rounded-none text-center bg-red-600 px-1 py-1 text-sm font-medium text-white">
                    {ribbon?.trim()}
                  </span>
              <div className="flex items-center gap-4">
                <span className="font-semibold">MRP</span>
                <span className="text-gray-400 line-through">
                  {priceData?.formatted?.price}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-4xl font-semibold">
                  {priceData?.formatted?.discountedPrice ||
                    priceData?.formatted?.price}
                </span>
                {product?.discount?.value ? (
                  <span className="text-[#1D9C50]">{`You save ₹${product?.discount?.value}`}</span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div
              className={`mt-10 flex h-[50px] w-[400px] max-w-fit gap-10 overflow-hidden rounded-none`}
            >
              {/* <ProductOptions
                  product={product}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  className="w-[80px]"
                /> */}
              {isInStock ? (
                <div className="flex rounded-none border">
                  <button
                    disabled={quantity === 1}
                    type="button"
                    className="px-3 py-1"
                    onClick={() => setQuantity(quantity - 1)}
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
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              ) : null}

              <div className="flex gap-2">
                {/* <BuyNowButton
                  product={product}
                  quantity={quantity}
                  selectedOptions={{}}
                  disabled={!isInStock}
                /> */}
                <AddToCartButton
                  className={`h-full flex-1 bg-[#500769] text-xl text-white hover:bg-[#500769]/90`}
                  product={product}
                  quantity={quantity}
                  buttonText={isInStock ? "Add to My Bag" : "Out of stock"}
                  disabled={!isInStock}
                  selectedOptions={selectedOptions}
                />
              </div>
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
