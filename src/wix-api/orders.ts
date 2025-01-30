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
