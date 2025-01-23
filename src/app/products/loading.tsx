import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Filters Sidebar Skeleton */}
        <div className="w-full md:w-1/4">
          <div className="rounded-lg bg-white p-4">
            <Skeleton className="mb-4 h-6 w-24" />
            <Skeleton className="mb-6 h-10 w-full" />

            {/* Filter sections */}
            {[1, 2, 3, 4].map((section) => (
              <div key={section} className="mb-6">
                <Skeleton className="mb-3 h-5 w-32" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid and Pagination */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col gap-10">
            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
                <div key={product} className="rounded-lg bg-white p-4">
                  <Skeleton className="mb-4 aspect-square w-full rounded-lg" />
                  <Skeleton className="mb-2 h-6 w-3/4" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <div className="mb-4 flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Skeleton key={item} className="h-10 w-10 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
