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

export async function ShopByScent() {
  const wixClient = getWixServerClient();
  const collections = await getCollectionsByScent(wixClient);

  return (
    <div className="w-full">
      <h1 className="py-12 text-center font-serif text-5xl">Shop By Scent</h1>
      <Carousel className="mx-auto w-full max-w-7xl"
        opts={{
          slidesToScroll: 4,
        }}
      >
        <CarouselContent>
          {collections?.map((collection, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/4 lg:basis-1/4"
            >
              <div className="p-1">
                <Card className="border-0 bg-transparent">
                  <CardContent className="relative aspect-square p-0">
                    <WixImage
                      mediaIdentifier={
                        collection.media?.mainMedia?.image?.url || ""
                      }
                      alt={collection.name?.split("-")[0] || ""}
                      className="rounded-lg object-cover"
                      width={700}
                      height={700}
                    />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                      <Link
                        href={`/shop?collection=${collection._id}`}
                        legacyBehavior
                        passHref
                      >
                        <Button
                          variant="secondary"
                          className="whitespace-nowrap text-xl font-medium md:text-2xl"
                        >
                          {collection.name?.split("-")[0] || ""}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      {/* Custom Dots Navigation */}
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
