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
import { playfair } from "@/lib/utils";

export async function ProductGrid() {


  const wixServerClient = getWixServerClient();

  // const bestSellers = await getBestSellers(wixServerClient);
  // console.log("bestSellers", bestSellers);
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
    <div className="px-4 pt-0 overflow-hidden">
      <h1 className={`${playfair.className} font-medium py-6 lg:py-12 text-center font-serif text-[1.13rem] md:text-5xl flex items-center justify-center gap-2 before:content-[''] before:h-[1px] before:w-20 before:bg-gray-300 after:content-[''] after:h-[1px] after:w-20 after:bg-gray-300 md:before:hidden md:after:hidden`}>
        Customer Favorites
      </h1>

      <div className="">
        <Carousel
        opts={{
          slidesToScroll: 2,
          loop: true,
          breakpoints: {
            '(max-width: 640px)': {
              slidesToScroll: 2,
            },
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
          <CarouselContent className="-ml-2 md:-ml-4s ">
            {featuredProducts?.items?.map((product) => (
              <CarouselItem
                key={product.numericId}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/2 lg:basis-1/4 flex justify-center"
              >
                <ProductGridUnit product={product} width={300} height={300} className="h-[350px] lg:h-[450px] w-[170px] lg:w-[280px]" />
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
