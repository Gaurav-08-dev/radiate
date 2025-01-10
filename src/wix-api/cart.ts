/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWixClient } from "@/lib/wix-client.base";

export async function getCart() {
  const wixClient = await getWixClient();
  try {
    const cart = await wixClient.currentCart.getCurrentCart();
    return cart;
  } catch (error) {
    if((error as any).details.applicationError.code === "OWNED_CART_NOT_FOUND") {
      return null;
    }
    else {
      throw error;
    }
  }
}
