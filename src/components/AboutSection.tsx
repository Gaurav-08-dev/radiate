import Image from "next/image";
import leftCandle from "@/assets/left.jpg";
import rightCandle from "@/assets/right.jpg";
import logo from "@/assets/logo.svg";
export function AboutSection() {
  return (
    <div className=" w-full py-16 md:py-24">
      
        <div className="relative mx-auto flex w-full items-center justify-center text-center overflow-clip">            
          <div className="lg:block md:hidden absolute aspect-square w-[400px] h-[300px] rotate-[10deg] top-10 left-[-35px]">
            <Image
              src={leftCandle}
              alt="Candle making process - pouring wax into containers"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex flex-col items-center w-[50%]">
            <div className="mb-6 h-20 w-20">
              <Image src={logo} alt="Diamond" className="h-full w-full" />
            </div>

            <h2 className="mb-6 font-serif text-3xl italic md:text-4xl">
              Crafted With Love, Inspired By India
            </h2>

            <p className="mb-12 leading-relaxed text-gray-700">
              We&apos;re a women-led startup from Delhi, creating handmade
              candles that do more than just light up your space. Radiate
              Candles was born from a belief in bringing warmth, love, and care
              to every moment. Each scent is rooted in Indian heritage,
              thoughtfully crafted to evoke nostalgia and celebrate our culture.
              A familiar fragrance can soothe the soul, boost memory, and
              connect us to cherished moments—making each Radiate candle a
              heartfelt gift and a piece of home, wherever you are.
            </p>
          </div>

          <div className="lg:block md:hidden absolute aspect-square w-[400px] h-[300px] rotate-[-10deg] top-10 right-[-35px]">
            <Image
              src={rightCandle}
              alt="Candle packaging process"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
    </div>
  );
}
