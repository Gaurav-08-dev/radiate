

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star, BadgeCheck } from "lucide-react";
import { playfair } from "@/lib/utils";
import { getAllReviews } from "@/wix-api/reviews";
import { wixBrowserClient } from "@/lib/wix-client.browser";


export async function ReviewSection({headersText}: {headersText: string}) {
    const reviews = await getAllReviews(wixBrowserClient);
    
  return (
    <div className="w-full py-12 px-4 md:px-0 md:py-16 bg-transparent">
      <div className="flex flex-col items-center justify-center">
        <h1 className={`${playfair.className} text-center text-2xl md:text-4xl font-medium max-w-[90%] mx-auto`}>
          {headersText}
        </h1>
      </div>

      <div className="mt-8 md:mt-12">
        <Carousel
        
          opts={{
            align: "start",
            loop: true,
            
            breakpoints: {
              "(max-width: 768px)": {
                slidesToScroll: 1,
              },
              "(min-width: 768px)": {
                slidesToScroll: 2,
              },
              "(min-width: 1024px)": {
                slidesToScroll: 3,
              },
            },
          }}
          className="mx-auto w-full max-w-7xl"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem 
                key={index} 
                className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 "
              >
                <Card className="border border-[#E1E1E1] h-[250px]">
                  <CardContent className="p-6 h-full">
                    <div className="space-y-4 h-full flex flex-col">
                        <div className="flex justify-between items-center flex-wrap gap-2 md:gap-4 md:flex-none">
                      <div className="flex items-center gap-2">
                        {review?.verified && <BadgeCheck className="h-4 w-4 text-[#1D9C50]" />}
                        <span className="font-medium capitalize">{review?.author?.authorName}</span>
                      </div>
                      <div className="flex gap-1">
                        {Array(Number(review?.content?.rating ?? 0)).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-5 w-5 fill-[#500769] text-[#500769]" 
                          />
                        ))}
                      </div>
                      </div>
                      <div className="space-y-2 flex-grow">
                        <h3 className="font-medium">{review?.content?.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3">{review?.content?.body}</p>
                        {/* <p className="text-sm italic text-gray-500 mt-auto">{review.productName}</p> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </div>
  );
}
