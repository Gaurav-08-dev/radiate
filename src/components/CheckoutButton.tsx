import { ButtonProps } from "@/components/ui/button";
import { useCartCheckout } from "@/hooks/checkout";
import LoadingButton from "./LoadingButton";

export default function CheckoutButton(props: ButtonProps) {
  const { startCheckoutFlow, pending } = useCartCheckout();

  return (
    <LoadingButton {...props} isLoading={pending} onClick={startCheckoutFlow}>
      Proceed to buy
    </LoadingButton>
  );
}
