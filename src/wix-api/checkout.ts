import { WixClient } from "@/lib/wix-client.base";
import { checkout, checkoutSettings } from "@wix/ecom";
import { env } from "@/env";
import { products } from "@wix/stores";
import { findVariant } from "@/lib/utils";
import { WIX_STORE_APP_ID } from "@/lib/constants";

export async function getCheckoutUrlForCurrentCart(wixClient: WixClient) {
  const { checkoutId } =
    await wixClient.currentCart.createCheckoutFromCurrentCart({
      channelType: checkout.ChannelType.WEB,
    });

  const { redirectSession } = await wixClient.redirects.createRedirectSession({
    ecomCheckout: { checkoutId },
    callbacks: {
      postFlowUrl: window.location.href,
      thankYouPageUrl: env.NEXT_PUBLIC_BASE_URL + "/checkout-success",
    },
  });

  if (!redirectSession) {
    throw new Error("Failed to create redirect session");
  }

  return redirectSession.fullUrl;
}

export interface GetCheckoutUrlForProductProps {
  product: products.Product;
  quantity: number;
  selectedOptions: Record<string, string>;
}

export async function getCheckoutUrlForProduct(
  wixClient: WixClient,
  { product, quantity, selectedOptions }: GetCheckoutUrlForProductProps,
) {
  const selectedVariant = findVariant(product, selectedOptions);
  if (!selectedVariant) {
    throw new Error("No variant found for selected options");
  }
  const { _id } = await wixClient.checkout.createCheckout({
    channelType: checkout.ChannelType.WEB,
    lineItems: [
      {
        catalogReference: {
          appId: WIX_STORE_APP_ID,
          catalogItemId: product._id,
          options: selectedVariant
            ? {
                variantId: selectedVariant._id,
              }
            : {
                options: selectedOptions,
              },
        },
        quantity,
      },
    ],
  });

  if (!_id) {
    throw new Error("Failed to create checkout");
  }

  const { redirectSession } = await wixClient.redirects.createRedirectSession({
    ecomCheckout: { checkoutId: _id },
    callbacks: {
      postFlowUrl: window.location.href,
      thankYouPageUrl: env.NEXT_PUBLIC_BASE_URL + "/checkout-success",
    },
  });

  if (!redirectSession) {
    throw new Error("Failed to create redirect session");
  }

  return redirectSession.fullUrl;
}

export async function getCheckoutPolicies (wixClient: WixClient){
 return await wixClient.checkoutSettings.getCheckoutSettings()
}