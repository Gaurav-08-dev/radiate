import ProductGridUnit from "./ProductGridUnit";
import { products } from "@wix/stores";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getRelatedProducts } from "@/wix-api/products";
interface YouMayLikeSectionProps {
  productId?: string | undefined;
}
export default async function YouMayLikeSection({
  productId,
}: YouMayLikeSectionProps) {
  const relatedProducts = await getRelatedProducts(
    getWixServerClient(),
    productId || "",
  );
  console.log(relatedProducts);
  if (!productId) return null;

  return (
    <div className="px-44 py-12">
      {/* {product?.length ?  */}
      <h1 className="py-8 text-center text-4xl font-semibold">
        You may also like
      </h1>
      {/* // : null */}
      {/* } */}
      {/* <div className="flex flex-wrap justify-center gap-8">
        {product
          ?.slice(0, 3)
          .map((item) => (
            <ProductGridUnit
              key={item.numericId}
              product={item}
              width={800}
              height={800}
            />
          ))}
      </div> */}
    </div>
  );
}
