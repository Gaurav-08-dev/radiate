import Image from "next/image";
import logo from "@/assets/logo.svg";  // Adjust the path as needed

export default function AboutUs() {
  return (
    <main className="h-screen overflow-hidden flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="mb-6 h-20 w-20">
            <Image src={logo} alt="Diamond" className="h-full w-full" />
          </div>

          <h1 className="mb-6 font-serif text-3xl italic md:text-4xl">
            Crafted With Love, Inspired By India
          </h1>

          <p className="mb-12 leading-relaxed text-gray-700 text-center max-w-2xl">
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
      </div>
    </main>
  );
}
