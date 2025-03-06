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
import { montserrat, playfair } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <div className="overflow-hidden px-0 md:px-4 pt-0 ">
      <div className="flex items-center justify-between md:justify-center">
        <div className="h-[1px] w-[20%] bg-gray-200 block md:hidden" />
        <h1
          className={`${playfair.className} flex items-center justify-center gap-2 py-6 text-center font-serif text-2xl font-medium md:text-5xl lg:py-12`}
        >
          Customer Favorites
        </h1>
        <div className="h-[1px] w-[20%] bg-gray-200 block md:hidden" />
      </div>

      <div className="space-y-6 px-4 md:px-0">
        <Carousel
          opts={{
            slidesToScroll: 2,
            loop: true,
            breakpoints: {
              "(max-width: 640px)": {
                slidesToScroll: 2,
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
          <CarouselContent className="md:-ml-4s -ml-2">
            {featuredProducts?.items?.map((product) => (
              <CarouselItem
                key={product.numericId}
                className="flex basis-1/2 justify-center sm:basis-1/2 md:basis-1/2 pl-0 md:pl-4 lg:basis-1/4"
              >
                <ProductGridUnit
                  product={product}
                  width={300}
                  height={300}
                  className="h-[350px] w-[190px] lg:h-[450px] lg:w-[280px]"
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
