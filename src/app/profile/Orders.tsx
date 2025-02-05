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
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Your Orders</h2>

      {status === "pending" && <OrdersLoadingSkeleton />}

      {status === "error" && (
        <div className="text-destructive">
          <p>Error fetching orders</p>
        </div>
      )}
      {status === "success" && !orders.length && !hasNextPage && (
        <p>No orders found</p>
      )}
      {orders.map((order) => (
        <Order order={order} key={order.number} />
      ))}

      {hasNextPage && (
        <LoadingButton
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
        >
          Load More
        </LoadingButton>
      )}
    </div>
  );
}

function OrdersLoadingSkeleton() {
  return (
    <div>
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-[64px]" />
      ))}
    </div>
  );
}
