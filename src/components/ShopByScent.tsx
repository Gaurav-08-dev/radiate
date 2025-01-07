"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import scent from "@/assets/scent.jpg"
import { Button } from "@/components/ui/button"

interface FragranceSlide {
  title: string
  image: string
  alt: string
}

const fragrances: FragranceSlide[] = [
  {
    title: "Sweet & Floral",
    image: scent.src,
    alt: "Pink candle surrounded by fresh flowers and citrus"
  },
  {
    title: "Gourmand",
    image: scent.src,
    alt: "White candle with hazelnuts and chocolate"
  },
  {
    title: "Woody & Musky",
    image: scent.src,
    alt: "Beige candle in wooden setting"
  }
]

export function ShopByScent() {
  return (
    <div className="w-full">
        <h1 className="text-4xl font-serif text-center py-8">Shop By Scent</h1>
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {fragrances.map((fragrance, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
              <div className="p-1">
                <Card className="border-0 bg-transparent">
                  <CardContent className="relative aspect-square p-0">
                    <Image
                      src={fragrance.image}
                      alt={fragrance.alt}
                      fill
                      className="object-cover rounded-lg"
                      priority={index === 0}
                    />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                      <Button 
                        variant="secondary" 
                        className="text-xl md:text-2xl font-medium whitespace-nowrap"
                      >
                        {fragrance.title}
                      </Button>
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
      <div className="flex justify-center gap-2 mt-6">
        {fragrances.map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full bg-white opacity-50 hover:opacity-100 transition-opacity"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

