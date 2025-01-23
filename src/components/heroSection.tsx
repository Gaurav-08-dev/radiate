import { Button } from "@/components/ui/button";
import Image from "next/image";
import banner from "@/assets/banner.jpg";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative bg-[#F8D7E3]">
      <div className="grid grid-cols-2 grid-rows-1">
        <div className="flex flex-col justify-center space-y-6 p-12">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Fragrances that speaks to your soul
          </h1>
          <p className="max-w-xl text-lg text-gray-800 lg:text-lg">
            Candles designed for self-care and meaningful moments. Uniquely
            blended scents to match every mood, and unforgettable gifting.
            Because every time they smell it, they&apos;ll remember you.
          </p>

          <Link href="/products">
            <Button
              // size="lg"
              className="h-12 w-1/2 bg-[#500769] px-8 py-6 text-2xl text-white hover:bg-[#500769]/90"
            >
            Find your scent
          </Button>
          </Link>
        </div>

        <div className="relative h-[500px] lg:h-[600px]">
          <Image
            src={banner}
            alt="Radiate Fragrances Display"
            fill
            className="object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}
