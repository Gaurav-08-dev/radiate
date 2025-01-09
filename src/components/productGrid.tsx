import ProductGridUnit from "@/components/ProductGridUnit";
import { getWixClient } from "@/lib/wix-client.base";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export async function ProductGrid() {
  const wixClient = await getWixClient();
  const { collection } = await wixClient.collections.getCollectionBySlug(
    "customer-favourites",
  );
  if (!collection) {
    return null;
  }

  const featuredProducts = await wixClient.products
    .queryProducts()
    .hasSome("collectionIds", [collection._id])
    .descending("lastUpdated")
    .find();

  if (!featuredProducts.items.length) return null;

  console.log(featuredProducts.items)
  
  return (
    <div className="px-44 py-12">
      <h1 className="py-8 text-center font-serif text-4xl">
        Customer Favorites
      </h1>

      <nav className="flex gap-8 p-6 text-xl font-medium tracking-wider justify-center">
        <a href="#" className="hover:text-purple-600">
          VIEW ALL
        </a>
        <a href="#" className="hover:text-purple-600">
          SCENTED CANDLES
        </a>
        <a href="#" className="hover:text-purple-600">
          PILLAR CANDLES
        </a>
      </nav>

      <div className="px-6">
        <Carousel className="w-[80%] mx-auto">
          <CarouselContent className="-ml-1">
            {featuredProducts?.items?.map((product) => (
              <CarouselItem
                key={product.numericId}
                className="pl-1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
              >
                <ProductGridUnit product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </div>
  );
}




