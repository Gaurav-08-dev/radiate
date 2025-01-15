import ProductGridUnit from "./ProductGridUnit";
import { products } from "@wix/stores";

interface YouMayLikeSectionProps {
  product?: products.Product[] | null;
}
export default async function YouMayLikeSection({
  product,
}: YouMayLikeSectionProps) {

  if (!product) return null;

  return (
    <div className="px-44 py-12">
      <h1 className="py-8 text-center text-4xl font-semibold">
        You may also like
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
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
      </div>
    </div>
  );
}
