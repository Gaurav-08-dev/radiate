"use client";
import LoadingButton from "@/components/LoadingButton";
import Order from "@/components/order";
import { Skeleton } from "@/components/ui/skeleton";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { getUserOrders } from "@/wix-api/orders";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Orders() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["orders"], // cache key
      queryFn: async ({ pageParam }) =>
        getUserOrders(wixBrowserClient, {
          limit: 10,
          cursor: pageParam,
        }),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.metadata?.cursors?.next,
    });

  const orders = data?.pages.flatMap((page) => page.orders) ?? [];

  return (
    <div className="space-y-4 px-2 sm:px-4 py-4 sm:py-6">
      <h2 className="text-xl sm:text-2xl font-bold">Your Orders</h2>

      {status === "pending" && <OrdersLoadingSkeleton />}

      {status === "error" && (
        <div className="text-destructive bg-destructive/10 p-3 rounded-md">
          <p className="text-sm">Error fetching orders</p>
        </div>
      )}
      
      {status === "success" && !orders.length && !hasNextPage && (
        <div className="bg-gray-50 rounded-md p-4 text-center">
          <p className="text-gray-600 text-sm">No orders found</p>
        </div>
      )}
      
      <div className="space-y-3 sm:space-y-4">
        {orders.map((order) => (
          <Order order={order} key={order.number} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <LoadingButton
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            className="w-full sm:w-auto text-sm py-2"
          >
            Load More
          </LoadingButton>
        </div>
      )}
    </div>
  );
}

function OrdersLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-[80px] sm:h-[64px] rounded-md" />
      ))}
    </div>
  );
}
