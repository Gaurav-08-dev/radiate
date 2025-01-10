import ProductGridUnit from "@/components/ProductGridUnit";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";

export async function ProductGrid() {
  
const collection = await getCollectionBySlug("customer-favourites");
  if (!collection) {
    return null;
  }
  const featuredProducts = await queryProducts({
    collectionIds: collection._id ? collection._id : undefined,
  });

  if (!featuredProducts.items.length) return null;

  return (
    <div className="px-44 py-12">
      <h1 className="py-8 text-center font-serif text-4xl">
        Customer Favorites
      </h1>

      <nav className="flex justify-center gap-8 p-6 text-xl font-medium tracking-wider">
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
        <Carousel className="mx-auto w-[80%]">
          <CarouselContent className="-ml-1">
            {featuredProducts?.items?.map((product) => (
              <CarouselItem
                key={product.numericId}
                className="pl-1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
              >
                <ProductGridUnit product={product} width={700} height={700} />
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
