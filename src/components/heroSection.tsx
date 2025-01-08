import { Button } from "@/components/ui/button"
import Image from "next/image"
import banner from "@/assets/banner.jpg"

export function HeroSection() {
  return (
    <section className="relative  bg-[#F8D7E3]">
      <div className="container grid lg:grid-cols-2 gap-8 px-12 py-12 lg:py-20">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            Fragrances that speaks to your soul
          </h1>
          <p className="text-lg lg:text-xl text-gray-800 max-w-xl">
            Candles designed for self-care and meaningful moments. Uniquely blended scents to match every mood, and unforgettable gifting. Because every time they smell it, they&apos;ll remember you.
          </p>
          <div>
            <Button 
              size="lg" 
              className="bg-[#500769] hover:bg-[#500769]/90 text-white px-8 py-6 text-lg"
            >
              Find your scent
            </Button>
          </div>
        </div>
        
        <div className="relative h-[500px] lg:h-[600px]">
          <Image
            src={banner}
            alt="Radiate Fragrances Display"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  )
}

