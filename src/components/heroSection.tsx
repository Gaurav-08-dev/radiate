import { Button } from "@/components/ui/button";
import Image from "next/image";
import banner from "@/assets/banner.jpg";
import Link from "next/link";
import { playfairDisplayt } from "@/app/layout";
export function HeroSection() {
  return (
    <section className="relative bg-[#F8D7E3]">
      <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-1">
        <div className="flex flex-col justify-center space-y-6 p-6 text-center md:p-12 md:text-left">
          <h1
            className={`text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${playfairDisplayt.className}`}
          >
            Fragrances that speaks to your soul
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-800 md:mx-0 md:text-lg text-justify">
            Candles designed for self-care and meaningful moments. Uniquely
            blended scents to match every mood, and unforgettable gifting.
            Because every time they smell it, they&apos;ll remember you.
          </p>

          <Link href="/shop">
            <Button className="h-12 w-full min-w-fit rounded-none bg-[#500769] px-8 py-6 text-xl text-white hover:bg-[#500769]/90 md:w-1/2 md:text-2xl">
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
