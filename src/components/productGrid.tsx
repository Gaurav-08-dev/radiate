/* eslint-disable @typescript-eslint/ban-ts-comment */
import ProductGridUnit from "@/components/ProductGridUnit";
import ProductGridUnitMobile from "@/components/ProductGridUnitMobile";
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
import { montserrat, playfair } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cache } from "react";

// Cache the data fetching function
const getFeaturedProducts = cache(async () => {
  const wixServerClient = getWixServerClient();
  const collection = await getCollectionBySlug(
    wixServerClient,
    "customer-favourites",
  );
  
  if (!collection) {
    return { items: [] };
  }

  return await queryProducts(wixServerClient, {
    collectionIds: collection._id ? collection._id : undefined,
    limit: 8, // Limit the number of products to improve performance
  });
});

export async function ProductGrid() {
  const featuredProducts = await getFeaturedProducts();

  if (!featuredProducts.items?.length) {
    return null;
  }

  return (
    <div className="overflow-hidden px-0 md:px-4 pt-0">
      <div className="flex items-center justify-between md:justify-center">
        <div className="h-[1px] w-[20%] bg-gray-200 block md:hidden" />
        <h1
          className={`${playfair.className} flex items-center justify-center gap-2 py-6 text-center font-serif text-2xl font-medium md:text-5xl lg:py-12`}
        >
          Customer Favorites
        </h1>
        <div className="h-[1px] w-[20%] bg-gray-200 block md:hidden" />
      </div>

      <div className="space-y-6 px-0">
        <Carousel
          opts={{
            slidesToScroll: 2,
            loop: true,
            breakpoints: {
              "(max-width: 640px)": {
                slidesToScroll: 1,
              },
              "(min-width: 768px)": {
                slidesToScroll: 2,
              },
              "(min-width: 1024px)": {
                slidesToScroll: 4,
              },
            },
          }}

          className="mx-auto max-w-7xl"
        >
          <CarouselContent className="md:-ml-4s gap-0 md:gap-4">
            {featuredProducts?.items?.map((product) => (
              <CarouselItem
                key={product.numericId}
                className="flex basis-[90%] justify-center sm:basis-[45%] md:basis-[45%] pl-0 md:pl-4 lg:basis-[23%]"
              >
                <ProductGridUnit
                  product={product}
                  width={300}
                  height={300}
                  className="hidden md:block h-[350px] w-[190px] lg:h-[450px] lg:w-[280px]"
                />

                <ProductGridUnitMobile
                  product={product}
                  width={400}
                  height={400}
                  className="block md:hidden h-[550px] w-full lg:h-[450px] lg:w-[280px]"
                />

              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex" />
          <CarouselNext className="hidden sm:inline-flex" />
        </Carousel>

        <div className="flex justify-center">
          <Link href="/shop">
            <Button
              className={`${montserrat.className} h-8 w-40 rounded-none border-2 border-[#500769] px-5 py-4 hover:bg-transparent text-sm text-[#500769] bg-transparent md:hidden`}
            >
              Explore all products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
