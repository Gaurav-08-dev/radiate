import { products } from "@wix/stores";
import { WixClient } from "@/lib/wix-client.base";
import { findVariant } from "@/lib/utils";
import { 
    // WIX_STORES_APP_ID_BACK_IN_STOCK_NOTIFICATIONS ,
    WIX_STORE_APP_ID
} from "@/lib/constants";
export interface CreateBackInStockNotificationRequestValues {
  product: products.Product;
  email: string;
  itemUrl: string;
  selectedOptions: Record<string, string>;
}

export async function createBackInStockNotificationRequest(
  wixClient: WixClient,
  {
    email,
    itemUrl,
    product,
    selectedOptions,
  }: CreateBackInStockNotificationRequestValues,
) {
  const selectedVariant = findVariant(product, selectedOptions);
  return (
    await wixClient
  ).backInStockNotifications.createBackInStockNotificationRequest(
    {
      email,
      itemUrl,
      catalogReference: {
        appId: WIX_STORE_APP_ID,
        catalogItemId: product._id,
        options: selectedVariant
          ? {
              variantId: selectedVariant._id,
            }
          : { options: selectedOptions },
      },
    },
    {
      name: product.name ?? undefined,
      image: product.media?.mainMedia?.image?.url ?? undefined,
      price:
        product.priceData?.discountedPrice?.toFixed(2) ??
        product.priceData?.price?.toFixed(2) ??
        undefined,
    },
  );
}
