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
    <div className="px-40 py-12">
      <h1 className="py-8 text-center font-serif text-5xl">
        Customer Favorites
      </h1>

      <nav className="flex justify-center gap-8 p-6 text-xl font-medium tracking-wider">
        <Link href="/products" className="hover:text-purple-600">
          VIEW ALL
        </Link>
        <Link href="/scented-candles" className="hover:text-purple-600">
          SCENTED CANDLES
        </Link>
        <Link href="/pillar-candles" className="hover:text-purple-600">
          PILLAR CANDLES
        </Link>
      </nav>

      <div className="px-6">
        <Carousel className="mx-auto max-w-fit">
          <CarouselContent className="-ml-1">
            {featuredProducts?.items?.map((product) => (
              <CarouselItem
                key={product.numericId}
                className="pl-1 sm:basis-1/2 md:basis-1/2 lg:basis-1/4"
              >
                <ProductGridUnit product={product} width={700} height={700} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="" />
          <CarouselNext className="" />
        </Carousel>
      </div>
    </div>
  );
}
