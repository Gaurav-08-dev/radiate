export default function Loading() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Product Details Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Skeleton */}
          <div className="w-full md:w-1/2">
            <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
          
          {/* Product Info Skeleton */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
            </div>
            <div className="h-12 bg-gray-200 animate-pulse rounded w-1/3"></div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="mt-16">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-64 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

