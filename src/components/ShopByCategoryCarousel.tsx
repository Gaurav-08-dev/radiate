"use client";

import React, { useState, useCallback, useEffect } from "react";
import WixImage from "@/components/WixImage";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { collections } from "@wix/stores";
import { EmblaCarouselType } from "embla-carousel";

const ShopByCategoryCarousel = ({
  collections = [],
}: {
  collections: collections.Collection[];
}) => {
  const carouselDotCount = collections.length / 2 + (collections.length % 2);
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = useCallback((emblaApi: EmblaCarouselType) => {
    setCurrentIndex(emblaApi.selectedScrollSnap());
    api?.off("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!api) return;

    if (api) {
      setCurrentIndex(api.selectedScrollSnap());
      api.on("scroll", handleScroll);
    }
  }, [api]);

  return (
    <Carousel
    setApi={setApi}
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
            <div className="overflow-x-clip p-1">
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
                      className="rounded-none object-cover transition-transform duration-300 hover:scale-105"
                      width={700}
                      height={700}
                    />
                    <div className="absolute bottom-6 left-1/2 w-11/12 min-w-fit -translate-x-1/2 translate-y-1/2 md:w-1/2 md:translate-y-0">
                      <Button
                        variant="secondary"
                        className="w-full whitespace-nowrap rounded-none p-1 text-xs font-medium md:text-2xl"
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
      <div className="flex justify-center gap-2 py-4 md:hidden">
        {Array.from({length:carouselDotCount}).map(
          (_, index) => (
            <button
              type="button"
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-[#500769]" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ),
        )}
      </div>
    </Carousel>
  );
};

export default ShopByCategoryCarousel;
