import { useState } from "react";
import { useToast } from "./use-toast";
import { getCheckoutUrlForCurrentCart } from "@/wix-api/checkout";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  getCheckoutUrlForProduct,
  GetCheckoutUrlForProductProps,
} from "@/wix-api/checkout";

export function useCartCheckout() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);
    try {
      const checkoutUrl = await getCheckoutUrlForCurrentCart(wixBrowserClient);
      window.location.href = checkoutUrl;
    } catch (error) {
      setPending(false);
      console.error(error);
      toast({
        title: "Failed to load checkout. Please try again later or try clearing your browser cache",
        variant: "destructive",
      });
    }
  }

  return { startCheckoutFlow, pending };
}

export function useQuickCheckout() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  async function startCheckoutFlow(values: GetCheckoutUrlForProductProps) {
    setPending(true);
    try {
      const checkoutUrl = await getCheckoutUrlForProduct(
        wixBrowserClient,
        values,
      );
      window.location.href = checkoutUrl;
    } catch (error) {
      setPending(false);
      console.error(error);
      toast({
        title: "Failed to load checkout. Please try again later.",
        variant: "destructive",
      });
    }
  }
  return { startCheckoutFlow, pending };
}
