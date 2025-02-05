import ProductGridUnit from "./ProductGridUnit";
import { products } from "@wix/stores";

interface YouMayLikeSectionProps {
  productId?: string;
}
export default function YouMayLikeSection({
  productId,
}: YouMayLikeSectionProps) {

  if (!productId) return null;

  return (
    <div className="px-44 py-12">
      {/* {product?.length ?  */}
      <h1 className="py-8 text-center text-4xl font-semibold">
        You may also like
      </h1> 
      // : null
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
