"use client"
import { scents } from "@/constants/scents"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ShopByScent() {
  return (
    <div className="w-full">
        <h1 className="text-5xl font-serif text-center py-12">Shop By Scent</h1>
      <Carousel className="w-full max-w-7xl mx-auto">
        <CarouselContent>
          {scents.map((scent, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/4 lg:basis-1/4">
              <div className="p-1">
                <Card className="border-0 bg-transparent">
                  <CardContent className="relative aspect-square p-0">
                    <Image
                      src={scent.img}
                      alt={scent.name}
                      fill
                      className="object-cover rounded-lg"
                      priority={index === 0}
                    />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                      <Button 
                        variant="secondary" 
                        className="text-xl md:text-2xl font-medium whitespace-nowrap"
                      >
                        {scent.name}
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
        {scents.map((_, index) => (
          <button
            type="button"
            key={index}
            className="w-2 h-2 rounded-full bg-white opacity-50 hover:opacity-100 transition-opacity"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        
      </div>
    </div>
  )
}

