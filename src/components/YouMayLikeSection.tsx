import ProductGridUnit from "./ProductGridUnit";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getRelatedProducts } from "@/wix-api/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface YouMayLikeSectionProps {
  productId?: string | undefined;
}

export default async function YouMayLikeSection({
  productId,
}: YouMayLikeSectionProps) {
  if (!productId) return null;

  const relatedProducts = await getRelatedProducts(
    getWixServerClient(),
    productId || "",
  );

  if (!relatedProducts.length) return null;
  
  return (
    <div className="px-4 md:px-44">
      <h1 className="py-6 md:py-8 text-center text-2xl md:text-4xl font-semibold">
        You may also like
      </h1>
      
      {/* Desktop version - Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
        {relatedProducts.slice(0, 4).map((product) => (
          <ProductGridUnit 
            key={product._id} 
            product={product} 
            width={800} 
            height={800}
          />
        ))}
      </div>
      
      {/* Mobile version - Carousel */}
      <div className="md:hidden">
        <Carousel
          opts={{
            slidesToScroll: 2,
            loop: true,
            breakpoints: {
              "(max-width: 640px)": {
                slidesToScroll: 2,
              },
            },
          }}
          className="mx-auto"
        >
          <CarouselContent className="-ml-2">
            {relatedProducts.slice(0, 4).map((product) => (
              <CarouselItem
                key={product._id}
                className="flex basis-1/2 justify-center pl-0 sm:pl-2"
              >
                <ProductGridUnit
                  product={product}
                  width={300}
                  height={300}
                  className="h-[350px] w-[170px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex" />
          <CarouselNext className="hidden sm:inline-flex" />
        </Carousel>
      </div>
    </div>
  );
}



