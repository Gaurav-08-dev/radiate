"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import WixImage from "@/components/WixImage";
import { products } from "@wix/stores";
import ProductDescription from "@/components/ProductDescription";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Check } from "lucide-react";
import { playfair } from "@/lib/utils";
// import BuyNowButton from "@/components/BuyNowButton";
// import ProductOptions from "@/components/ProductOptions";
import { EmblaCarouselType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  InstagramIcon,
} from 'next-share'
interface ProductDetailProps {
  product: products.Product;
}

export default function ProductDetails({ product }: ProductDetailProps) {
  
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [selectedOptions] = useState<Record<string, string>>(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0]?.description || "",
      }))
      ?.reduce((acc, option) => ({ ...acc, ...option }), {}) || {},
  );

  const [quantity, setQuantity] = useState(1);

  const imagesList = product.media?.items;
  const priceData = product.priceData;
  const productAdditionalDetails = product.additionalInfoSections;
  const features = productAdditionalDetails?.find(
    (detail) => detail.title?.toLowerCase() === "features",
  );

  const featuresList = features?.description?.replace(/&amp;/g, "&")
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
  const handleImageClick = (index:number) => {
    api?.scrollTo(index);
    setCurrentIndex(index);
  };

  const ribbon = product.ribbon;
  const isInStock = product?.stock?.quantity && product?.stock?.quantity > 0;

  //   const availableQuantity = product.stock?.quantity;
  //   const availableQuantityExceeded = !!availableQuantity && quantity > availableQuantity;
  //   const inStock = checkInStock(product, selectedOptions); 3:57:57

  const handleScroll = useCallback((emblaApi:EmblaCarouselType) => {
    setCurrentIndex(emblaApi.selectedScrollSnap())
    api?.off("scroll",handleScroll)
  },[])

  useEffect(() => {
    if (!api) return;
    
    if(api){ 
      setCurrentIndex(api.selectedScrollSnap())
      api.on("scroll", handleScroll)
    }

  }, [api]);

  const shareMenuRef = useRef<HTMLDivElement>(null);
  const shareButtonRef = useRef<HTMLButtonElement>(null);

  // Add this function to handle share button click
  const handleShareClick = () => {
    setShowShareMenu(!showShareMenu);
  };
  
  // Add this effect to handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareMenuRef.current && 
        !shareMenuRef.current.contains(event.target as Node) &&
        shareButtonRef.current && 
        !shareButtonRef.current.contains(event.target as Node)
      ) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="container mx-auto px-0 pt-0 md:px-40 md:pt-20">
      <div className="flex flex-col gap-6 md:flex-row md:gap-12">
        {/* Mobile layout - Image section */}
        <div className="w-full space-y-4 md:w-[40%]">
          <div className="relative aspect-square max-h-fit max-w-full overflow-hidden rounded-none md:max-w-fit">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                slidesToScroll: 1,
                loop: true,
              }} 
            >
              <CarouselContent>
                {imagesList?.map((img) => (
                  <CarouselItem key={img?.image?.url}>
                    <WixImage
                      mediaIdentifier={img?.image?.url}
                      alt={img?.image?.altText}
                      width={1000}
                      height={1000}
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="mx-4 flex gap-2 overflow-x-auto md:mx-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
            {imagesList?.map((img, i) => (
              <div
                key={i}
                className="relative h-20 w-20 flex-shrink-0 cursor-pointer rounded-none md:h-28 md:w-28"
                ref={currentIndex === i ? (el) => el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }) : undefined}
                onClick={() => handleImageClick(i)}
              >
                <WixImage
                  mediaIdentifier={img?.image?.url}
                  alt={img?.image?.altText}
                  width={112}
                  height={112}
                  className="rounded-none object-cover"
                />
                {currentIndex === i && (
                  <div className="absolute inset-0 rounded-none bg-black/50" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full space-y-4 px-4 md:w-[60%] md:space-y-6 md:px-0">
          {/* Product name */}
          <h1
            className={`${playfair.className} text-2xl font-semibold md:text-4xl`}
          >
            {product.name}
          </h1>

          {/* Ribbon - moved up for mobile */}
          {ribbon && (
            <span className="inline-block rounded-none bg-red-600 px-2 py-1 text-center text-sm font-medium text-white">
              {ribbon?.trim()}
            </span>
          )}

          {/* Features list - moved up for mobile */}
          {featuresList && (
            <div className="flex flex-wrap gap-3 md:gap-4">
              {featuresList?.split(",").map((feature, i) => (
                <span key={i} className="text-xs font-medium md:text-sm">
                  <span className="flex items-center gap-1">
                    <Check
                      size={16}
                      className="text-[#500769]"
                      strokeWidth={3}
                      absoluteStrokeWidth
                    />
                    {feature.trim()}
                  </span>
                </span>
              ))}
            </div>
          )}

          {/* Description - moved up for mobile */}
          <div>
            <div
              className={`${isExpanded ? "" : "line-clamp-3"}`}
              dangerouslySetInnerHTML={{
                __html: product.description || "",
              }}
            />

            {product.description && product.description.length > 100 && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-1 inline-block text-sm font-medium text-[#500769] hover:underline md:hidden"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
          {/* <div
            className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600"
            dangerouslySetInnerHTML={{
              __html: product.description || "",
            }}
          /> */}

          <div className="h-[1px] w-full bg-gray-200" />

          {/* Price section */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-20">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span className="font-semibold">MRP</span>
                <span className="text-gray-400 line-through">
                  {priceData?.formatted?.price}
                </span>
              </div>
              <div className="flex flex-col gap-2 md:gap-4">
                <span className="text-2xl font-semibold md:text-4xl">
                  {priceData?.formatted?.discountedPrice ||
                    priceData?.formatted?.price}
                </span>
                {product?.discount?.value ? (
                  <span className="text-sm text-[#1D9C50] md:text-base">{`You save ₹${product?.discount?.value}`}</span>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* Quantity , Add to cart , Sharebutton*/}
            <div
              className={`mt-4 flex w-full gap-4 md:mt-10 md:w-[400px] md:max-w-fit md:flex-row md:gap-10`}
            >
              {isInStock ? (
                <div className="flex max-w-fit rounded-none border">
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
                    className="w-12 pl-0 text-center md:pl-3"
                    value={quantity}
                    readOnly
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

              <div className="flex w-full">
                <AddToCartButton
                  className={`h-12 w-full flex-1 bg-[#500769] text-base text-white hover:bg-[#500769]/90 md:text-xl`}
                  product={product}
                  quantity={quantity}
                  buttonText={isInStock ? "Add to My Bag" : "Out of stock"}
                  disabled={!isInStock}
                  selectedOptions={selectedOptions}
                />
              </div>
                
              <div className="relative">
                <button
                  ref={shareButtonRef}
                  type="button"
                  className="flex h-12 items-center justify-center rounded-none"
                  onClick={handleShareClick}
                  aria-label="Share product"
                >
                  <Share2
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  />
                </button>
                
                {showShareMenu && (
                  <div 
                    ref={shareMenuRef}
                    className="absolute right-0 top-14 z-10 flex w-56 flex-col rounded-md bg-[#F7F2FA] p-3 shadow-2xl"
                  >
                    <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
                      <WhatsappShareButton url={window.location.href} 
                      // title={product.name || ''} 
                      >
                        <div className="flex flex-col items-center">
                          <WhatsappIcon size={40} round />
                        </div>
                      </WhatsappShareButton>
                      
                      <FacebookShareButton url={window.location.href} 
                      // title={product.name || ''}
                      >
                        <div className="flex flex-col items-center">
                          <FacebookIcon size={40} round />
                        </div>
                      </FacebookShareButton>
                      
                      <EmailShareButton url={window.location.href} 
                      // subject={product.name || ''} 
                      // body={product.description?.replace(/<[^>]*>/g, '') || ''}
                      >
                        <div className="flex flex-col items-center">
                          <EmailIcon size={40} round />
                        </div>
                      </EmailShareButton>
                      
                      <button 
                        type="button"
                        title="Copy Link"
                        className="flex flex-col items-center"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast({
                            title: "Link Copied",
                            duration: 1000,
                          });
                          setShowShareMenu(false);
                        }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product details sections */}
          <div className="space-y-3 border-t pt-4 md:space-y-4 md:pt-6">
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
