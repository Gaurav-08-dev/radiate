import { Button } from "@/components/ui/button";
import Image from "next/image";
import banner from "@/assets/banner.jpg";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative bg-[#F8D7E3]">
      <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-1">
        <div className="flex flex-col justify-center space-y-6 p-6 md:p-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight lg:text-5xl">
            Fragrances that speaks to your soul
          </h1>
          <p className="max-w-xl text-base md:text-lg text-gray-800 mx-auto md:mx-0">
            Candles designed for self-care and meaningful moments. Uniquely
            blended scents to match every mood, and unforgettable gifting.
            Because every time they smell it, they&apos;ll remember you.
          </p>

          <Link href="/shop">
            <Button
              className="rounded-none h-12 min-w-fit w-full md:w-1/2 bg-[#500769] px-8 py-6 text-xl md:text-2xl text-white hover:bg-[#500769]/90"
            >
              Find your scent
            </Button>
          </Link>
        </div>

        <div className="relative h-[300px] md:h-[500px] lg:h-[600px]">
          <Image
            src={banner}
            alt="Radiate Fragrances Display"
            fill
            className="object-fill object-center"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </section>
  );
}
