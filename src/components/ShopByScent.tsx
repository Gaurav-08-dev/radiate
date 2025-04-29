
import { getCollectionsByScent } from "@/wix-api/collections";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShopByScentCarousel from "./ShopByScentCarousel";
import { playfair } from "@/lib/utils";

export async function ShopByScent() {
  const wixClient = getWixServerClient();
  const collections = await getCollectionsByScent(wixClient);

  return (
    <div className="mt-5 w-full overflow-hidden md:mt-0">
      <div className="flex items-center justify-between md:justify-center">
        <div className="block h-[1px] w-[28%] bg-gray-200 md:hidden"></div>
        <h1
          className={`${playfair.className} py-6 text-center text-2xl md:py-12 md:text-5xl`}
        >
          Shop By Scent
        </h1>
        <div className="block h-[1px] w-[28%] bg-gray-200 md:hidden"></div>
      </div>
      <ShopByScentCarousel collections={collections}/>
    </div>
  );
}
