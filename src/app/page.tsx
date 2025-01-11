import { Suspense } from "react";
import { HeroSection } from "@/components/heroSection";
import { ProductGrid } from "@/components/productGrid";
import SignatureSection from "@/components/SignatureSection";
import { ShopByScent } from "@/components/ShopByScent";
import { AboutSection } from "@/components/AboutSection";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-12 bg-[#faf5ff]">
        <HeroSection />
        <Suspense fallback={<StorySkeletonSection />}>
          <ProductGrid />
          <SignatureSection />
        </Suspense>
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
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          
          <Skeleton className="mb-6 h-12 w-12 animate-pulse bg-gray-200" />

          <Skeleton className="mb-6 h-10 w-[300px] animate-pulse bg-gray-200 md:w-[500px]" />
          
          <div className="mb-12 w-full space-y-2">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="mx-auto h-4 w-[80%] animate-pulse bg-gray-200" />
          </div>
          
          <div className="flex w-full flex-col gap-8 md:flex-row">
            <Skeleton className="aspect-square w-full animate-pulse rounded-lg bg-gray-200 md:w-1/2" />
            <Skeleton className="aspect-square w-full animate-pulse rounded-lg bg-gray-200 md:w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
