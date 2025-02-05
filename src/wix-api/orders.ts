import { WixClient } from "@/lib/wix-client.base";
export async function getOrder(wixClient: WixClient, orderId: string) {
  try {
    const order = await wixClient.orders.getOrder(orderId);
    return order;
  } catch (error) {
    if ((error as any).details.applicationError.code === "NOT_FOUND") {
      return null;
    } else {
      throw error;
    }
  }
}

export interface GetUserOrdersFilters {
  limit?: number;
  cursor?: string | null; // cursor is the id of the last order in the previous page
}

export async function getUserOrders(
  wixClient: WixClient,
  { limit, cursor }: GetUserOrdersFilters,
) {
  const orders = await wixClient.orders.searchOrders({
    search: {
      cursorPaging: {
        limit,
        cursor,
      },
    },
  });
  return orders;
}
