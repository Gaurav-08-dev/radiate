/* eslint-disable @typescript-eslint/ban-ts-comment */
import ProductGridUnit from "@/components/ProductGridUnit";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { getWixServerClient } from "@/lib/wix-client.server";

export async function ProductGrid() {
  const wixServerClient = getWixServerClient();

  const collection = await getCollectionBySlug(
    wixServerClient,
    "customer-favourites",
  );
  if (!collection) {
    return null;
  }

  const featuredProducts = await queryProducts(wixServerClient, {
    collectionIds: collection._id ? collection._id : undefined,
  });

  if (!featuredProducts.items.length) return null;

  return (
    <div className="px-10 pt-0">
      <h1 className="py-12 text-center font-serif text-5xl">
        Customer Favorites
      </h1>

      <div className="">
        <Carousel
        opts={{
          slidesToScroll:1,
          loop: true,
          breakpoints: {
            '(min-width: 640px)': {
              slidesToScroll: 2,
            },
          '(min-width: 768px)': {
            slidesToScroll: 2,
          },
          '(min-width: 1024px)': {
            slidesToScroll: 4,
            },
          },
        }}
        className="mx-auto max-w-7xl">
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredProducts?.items?.map((product) => (
              <CarouselItem
              
                key={product.numericId}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/4 flex justify-center"
              >
                <ProductGridUnit product={product} width={300} height={300} className="h-[450px] w-[280px]" />
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
