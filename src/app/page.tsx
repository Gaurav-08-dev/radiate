import { HeroSection } from "@/components/heroSection";
import { ProductGrid } from "@/components/productGrid";
import SignatureSection from "@/components/SignatureSection";
import { ShopByScent } from "@/components/ShopByScent";
import { AboutSection } from "@/components/AboutSection";
export default function Home() {
  return (
    <>
    <main className="bg-[#faf5ff] flex flex-col gap-12">
      <HeroSection/>
      <ProductGrid/>
      <SignatureSection/>
      <ShopByScent/>
      <AboutSection/>
    </main>
    </>
  );
}
