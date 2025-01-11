/* eslint-disable @typescript-eslint/no-explicit-any */
import { WIX_STORE_APP_ID } from "@/lib/constants";
import { findVariant } from "@/lib/utils";
import { getWixClient } from "@/lib/wix-client.base";
import { products } from "@wix/stores";

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

interface AddToCartValues {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}
export async function addToCart({product, selectedOptions, quantity}: AddToCartValues) {
  const wixClient =  await getWixClient();
  const selectedVariant = findVariant(product, selectedOptions);

    await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference:{
            appId:WIX_STORE_APP_ID,
            catalogItemId: product._id,
            options: selectedVariant ? {
              variantId: selectedVariant._id,
            }:{
              options: selectedOptions,
            }
          },
          quantity,
        }
      ],
    });
}

