import { Skeleton } from "@/components/ui/skeleton";
import { products } from "@wix/stores";

interface ProductReviewsProps {
  product: products.Product;
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  return <div>ProductReviews</div>;
}

export function ProductReviewsLoadingSkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-16 w-72" />
        </div>
      ))}
    </div>
  );
}
