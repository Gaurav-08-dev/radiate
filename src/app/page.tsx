import { Suspense } from "react";
import { HeroSection } from "@/components/heroSection";
import { ProductGrid } from "@/components/productGrid";
import SignatureSection from "@/components/SignatureSection";
import { ShopByScent } from "@/components/ShopByScent";
import { AboutSection } from "@/components/AboutSection";
import { Skeleton } from "@/components/ui/skeleton";
import { ShopByCategory } from "@/components/ShopByCategory";
import { ReviewSection } from "@/components/ReviewSection";
import { Metadata } from "next";
import banner from "@/assets/banner.jpg";

export const metadata: Metadata = {
  title: "Buy Best Scented Candles & Gifts | Radiate Shop",
  description:'Shop all handmade soy wax scented candles—jars, pillars and romantic gift sets. Soot-free, long-lasting, perfect for self-care and gifting',

  openGraph: {
    title: "Buy Best Scented Candles & Gifts | Radiate Shop",
    description: 'Shop all handmade soy wax scented candles—jars, pillars and romantic gift sets. Soot-free, long-lasting, perfect for self-care and gifting',
    images: [
      {
        url: `${banner?.src}`,
        width: 1200,
        height: 630,
        alt: "Buy Best Scented Candles & Gifts | Radiate Shop",
      },
    ],
  },
  twitter: {
    title: "Buy Best Scented Candles & Gifts | Radiate Shop",
    description: 'Shop all handmade soy wax scented candles—jars, pillars and romantic gift sets. Soot-free, long-lasting, perfect for self-care and gifting',
  },
};

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-0 md:gap-12 bg-[#F7F2FA]">
        <HeroSection />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
        <Suspense fallback={<SignatureSectionSkeleton />}>
          <SignatureSection />
        </Suspense>
        <Suspense fallback={<ShopByScentSkeleton />}>
          <ShopByScent />
        </Suspense>
        <Suspense fallback={<ShopByCategorySkeleton />}>
          <ShopByCategory />
        </Suspense>
        <AboutSection />
        <Suspense fallback={<ReviewSectionSkeleton />}>
          <ReviewSection headersText="What Our Customers Say" />
        </Suspense>
      </main>
    </>
  );
}

// Add appropriate skeleton components for each section
function ProductGridSkeleton() {
  return (
    <div className="px-0 md:px-4 pt-0">
      <div className="flex items-center justify-between md:justify-center">
        <div className="h-[1px] w-[20%] bg-gray-200 block md:hidden" />
        <h1 className="flex items-center justify-center gap-2 py-6 text-center font-serif text-2xl font-medium md:text-5xl lg:py-12">
          Customer Favorites
        </h1>
        <div className="h-[1px] w-[20%] bg-gray-200 block md:hidden" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-[350px] w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function SignatureSectionSkeleton() {
  return <Skeleton className="h-[400px] w-full" />;
}

function ShopByScentSkeleton() {
  return (
    <div className="px-4 py-8">
      <Skeleton className="h-10 w-64 mx-auto mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function ShopByCategorySkeleton() {
  return (
    <div className="px-4 py-8">
      <Skeleton className="h-10 w-64 mx-auto mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function ReviewSectionSkeleton() {
  return (
    <div className="px-4 py-8">
      <Skeleton className="h-10 w-64 mx-auto mb-6" />
      <div className="flex justify-center gap-4 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[200px] w-[300px] rounded-lg" />
        ))}
      </div>
    </div>
  );
}
