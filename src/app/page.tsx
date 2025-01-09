import { HeroSection } from "@/components/heroSection";
import { ProductGrid } from "@/components/productGrid";
import SignatureSection from "@/components/SignatureSection";
import { ShopByScent } from "@/components/ShopByScent";
import { AboutSection } from "@/components/AboutSection";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-12 bg-[#faf5ff]">
        <HeroSection />
        <Suspense fallback={<StorySkeletonSection />}>
          <ProductGrid />
        </Suspense>
        <SignatureSection />
        <ShopByScent />
        <AboutSection />
       
      </main>
    </>
  );
}


function StorySkeletonSection() {
  return (
    <div className="relative w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
          {/* Diamond Icon Skeleton */}
          <Skeleton className="w-12 h-12 mb-6" />

          {/* Heading Skeleton */}
          <Skeleton className="h-10 w-[300px] md:w-[500px] mb-6" />

          {/* Description Skeleton - Multiple lines */}
          <div className="w-full space-y-2 mb-12">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%] mx-auto" />
          </div>

          {/* Images Skeleton Container */}
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <Skeleton className="w-full md:w-1/2 aspect-square rounded-lg" />
            <Skeleton className="w-full md:w-1/2 aspect-square rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}