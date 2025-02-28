import { Button } from "@/components/ui/button";
import Image from "next/image";
import banner from "@/assets/banner.jpg";
import Link from "next/link";
import { playfairDisplayt } from "@/app/layout";
export function HeroSection() {
  return (
    <section className="relative md:bg-[#F8D7E3]">
      <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-1">
        <div className="relative order-1 h-fit md:order-2 md:h-[500px] lg:h-fit overflow-hidden">
          <Image
            src={banner}
            alt="Radiate Fragrances Display"
            className="object-cover object-right"
            priority
            // width={1000}
            // height={1000}
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="order-2 flex flex-col justify-center space-y-4 p-6 text-center md:order-1 md:p-12 md:text-left">
          <h1
            className={`text-xl font-bold tracking-tight md:text-4xl lg:text-5xl ${playfairDisplayt.className}`}
          >
            Fragrances that speaks to your soul
          </h1>
          <p className="mx-auto max-w-xl text-pretty text-base text-[#5f5f5f] md:mx-0 md:text-lg">
            Candles designed for self-care and meaningful moments. Uniquely
            blended scents to match every mood, and unforgettable gifting.
            Because every time they smell it, they&apos;ll remember you
          </p>

          <Link href="/shop">
            <Button className="mt-2 h-12 w-3/4 mx-auto min-w-fit rounded-none bg-[#500769] px-8 py-6 text-xl text-white hover:bg-[#500769]/90 md:w-1/2 md:text-2xl">
              Find your scent
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
