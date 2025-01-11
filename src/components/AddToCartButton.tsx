import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addToCart } from "@/wix-api/cart";
import { products } from "@wix/stores";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions?: Record<string, string>;
  quantity: number;
  buttonText?: string;
}

export function AddToCartButton({
  product,
  selectedOptions = {},
  quantity,
  className,
  buttonText = 'Add to My Bag',
  ...props
}: AddToCartButtonProps) {
  return (
    <Button
      onClick={() => addToCart({ product, selectedOptions, quantity })}
      className={cn("w-full", className)}
      {...props}
    >
      {buttonText}
    </Button>
  );
}
