import WixImage from "@/components/WixImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCollectionsByScent } from "@/wix-api/collections";
import { getWixServerClient } from "@/lib/wix-client.server";
import Link from "next/link";
import { playfair } from "@/lib/utils";

export async function ShopByScent() {
  const wixClient = getWixServerClient();
  const collections = await getCollectionsByScent(wixClient);

  return (
    <div className="mt-5 w-full overflow-hidden md:mt-0 ">
      <div className="flex items-center justify-between md:justify-center">
        <div className="block h-[1px] w-[28%] bg-gray-200 md:hidden"></div>
        <h1
          className={`${playfair.className} py-6 text-center text-2xl md:py-12 md:text-5xl`}
        >
          Shop By Scent
        </h1>
        <div className="block h-[1px] w-[28%] bg-gray-200 md:hidden"></div>
      </div>
      <Carousel
        className="mx-auto w-full max-w-7xl px-4 md:px-0"
        opts={{
          slidesToScroll: 2,
          loop: true,
          breakpoints: {
            "(min-width: 640px)": {
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
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {collections?.map((collection, index) => (
            <CarouselItem
              key={index}
              className="flex basis-1/2 justify-center pl-2 sm:basis-1/2 md:basis-1/2 md:pl-4 lg:basis-1/4"
            >
              <div className="p-1">
                <Card className="border-0 bg-transparent">
                  <Link
                    href={`/shop?collection=${collection._id}`}
                    legacyBehavior
                    passHref
                  >
                    <CardContent className="relative aspect-square p-0">
                      <WixImage
                        mediaIdentifier={
                          collection.media?.mainMedia?.image?.url || ""
                        }
                        alt={collection.name?.split("-")[0] || ""}
                        className="rounded-none object-cover"
                        width={700}
                        height={700}
                      />
                      <div className="absolute bottom-6 left-1/2 w-5/6 -translate-x-1/2 translate-y-1/2 md:w-fit md:translate-y-0">
                        <Button
                          variant="secondary"
                          className="w-full whitespace-nowrap rounded-none p-1 text-sm font-medium md:text-2xl"
                        >
                          {collection.name?.split("-")[0] || ""}
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:inline-flex" />
        <CarouselNext className="hidden lg:inline-flex" />
      </Carousel>

      <div className="mt-6 flex justify-center gap-2">
        {collections?.map((_, index) => (
          <button
            type="button"
            key={index}
            className="h-2 w-2 rounded-full bg-white opacity-50 transition-opacity hover:opacity-100"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
