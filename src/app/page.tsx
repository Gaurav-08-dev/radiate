import { Suspense } from "react";
import { HeroSection } from "@/components/heroSection";
import { ProductGrid } from "@/components/productGrid";
import SignatureSection from "@/components/SignatureSection";
import { ShopByScent } from "@/components/ShopByScent";
import { AboutSection } from "@/components/AboutSection";
import { Skeleton } from "@/components/ui/skeleton";
import { ShopByCategory } from "@/components/ShopByCategory";
import { ReviewSection } from "@/components/ReviewSection";
export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-0 md:gap-12 bg-[#F7F2FA]">
        <HeroSection />
        <Suspense fallback={<StorySkeletonSection />}>
          <ProductGrid />
          <SignatureSection />
        </Suspense>
        <ShopByScent />
        <ShopByCategory />
        <AboutSection />
        <ReviewSection
          headersText="WHAT OUR CUSTOMERS SAY"
        />
      </main>
    </>
  );
}

function StorySkeletonSection() {
  return (
    <div className="relative w-full py-8 sm:py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          
          <Skeleton className="mb-4 sm:mb-6 h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 animate-pulse bg-gray-200" />

          <Skeleton className="mb-4 sm:mb-6 h-8 sm:h-9 md:h-10 w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] animate-pulse bg-gray-200" />
          
          <div className="mb-8 sm:mb-10 md:mb-12 w-full space-y-1.5 sm:space-y-2">
            <Skeleton className="h-3 sm:h-4 w-full bg-gray-200" />
            <Skeleton className="h-3 sm:h-4 w-full bg-gray-200" />
            <Skeleton className="h-3 sm:h-4 w-full bg-gray-200" />
            <Skeleton className="mx-auto h-3 sm:h-4 w-[90%] sm:w-[85%] md:w-[80%] animate-pulse bg-gray-200" />
          </div>
          
          <div className="flex w-full flex-col gap-4 sm:gap-6 md:gap-8 md:flex-row">
            <Skeleton className="aspect-square w-full animate-pulse rounded-lg bg-gray-200 md:w-1/2" />
            <Skeleton className="aspect-square w-full animate-pulse rounded-lg bg-gray-200 md:w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
