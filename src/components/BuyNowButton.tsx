import { ButtonProps } from "@/components/ui/button";
import { useQuickCheckout } from "@/hooks/checkout";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import LoadingButton from "./LoadingButton";

interface BuyNowButtonProps extends ButtonProps {
  product: products.Product;
  quantity: number;
  selectedOptions: Record<string, string>;
}

export default function BuyNowButton({
  product,
  quantity,
  selectedOptions,
  className,
  ...props
}: BuyNowButtonProps) {
  const { startCheckoutFlow, pending } = useQuickCheckout();
  return (
    <LoadingButton
      variant="secondary"
      isLoading={pending}
      className={cn("flex gap-2", className)}
      {...props}
      onClick={() => startCheckoutFlow({ product, quantity, selectedOptions })}
    >
      Buy Now
    </LoadingButton>
  );
}
