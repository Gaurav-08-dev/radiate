import ProductGridUnit from "./ProductGridUnit";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getRelatedProducts } from "@/wix-api/products";
interface YouMayLikeSectionProps {
  productId?: string | undefined;
}
export default async function YouMayLikeSection({
  productId,
}: YouMayLikeSectionProps) {
  if (!productId) return null;

  const relatedProducts = await getRelatedProducts(
    getWixServerClient(),
    productId || "",
  );

  if (!relatedProducts.length) return null;
  return (
    <div className="px-44">
      <h1 className="py-8 text-center text-4xl font-semibold">
        You may also like
      </h1>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid lg:grid-cols-4">
        {relatedProducts.slice(0, 4).map((product) => (
          <ProductGridUnit key={product._id} product={product} width={800} height={800}/>
        ))}
      </div>
    </div>
  );
}



