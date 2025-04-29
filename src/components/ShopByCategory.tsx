import { getCollections } from "@/wix-api/collections";
import { getWixServerClient } from "@/lib/wix-client.server";
import { playfair } from "@/lib/utils";

import ShopByCategoryCarousel from "./ShopByCategoryCarousel";

export async function ShopByCategory() {
  const wixClient = getWixServerClient();
  const collections = await getCollections(wixClient);

  const filteredCollections = collections.filter((collection) =>
    collection.name?.toLowerCase().includes("product type"),
  );

  return (
    <div className="block w-full overflow-hidden md:hidden md:bg-[#faf5ff]">
      <div className="flex items-center justify-between">
        <div className="block h-[0.5px] w-[25%] bg-gray-200 md:hidden" />
        <h1
          className={`${playfair.className} py-6 text-center text-2xl md:py-12 md:text-5xl`}
        >
          Shop By Category
        </h1>
        <div className="block h-[0.5px] w-[25%] bg-gray-200 md:hidden" />
      </div>
      <ShopByCategoryCarousel collections={filteredCollections} />
    </div>
  );
}
