import { HeroSection } from "@/components/heroSection";
import { ProductGrid } from "@/components/productGrid";
import SignatureSection from "@/components/SignatureSection";
import { ShopByScent } from "@/components/ShopByScent";
import { AboutSection } from "@/components/AboutSection";
import { delay } from "@/lib/utils";
import { Suspense } from "react";
import { getWixClient } from "@/lib/wix-client.base";

export default function Home() {
  return (
    <>
    <main className="bg-[#faf5ff] flex flex-col gap-12">
      <HeroSection/>
      <ProductGrid/>
      <SignatureSection/>
      <ShopByScent/>
      <AboutSection/>
      {/* <Suspense fallback={<div>Loading...</div>}>
      <FeaturedProducts/>
      </Suspense> */}
      {FeaturedProducts()}
    </main>
    </>
  );
}

async function FeaturedProducts() {
    await delay(1000);
    const wixClient = await getWixClient();
    const {collection} = await wixClient.collections.getCollectionBySlug('customer-favourites');

    if(!collection)  {
      return null
    };

    const featuredProducts = await wixClient.products.queryProducts().hasSome("collectionIds", [collection._id]).descending("lastUpdated").find();

    if(!featuredProducts.items.length) return null;
    console.log(featuredProducts)
}