import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="flex gap-8">
          {/* Cart Items Section */}
          <div className="flex-grow">
            {/* Repeat this block 3 times to simulate multiple items */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-6 flex gap-4">
                {/* Product Image */}
                <Skeleton className="h-24 w-24" />
                
                {/* Product Details */}
                <div className="flex-grow">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                
                {/* Price */}
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="w-80">
            <div className="rounded bg-gray-50 p-4">
              <Skeleton className="h-6 w-full mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </div>
        </div>
      </div>
  );
}
