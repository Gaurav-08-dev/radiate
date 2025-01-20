import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { ShoppingCartIcon } from "lucide-react";
import LoadingButton from "./LoadingButton";
import { useAddItemToCart } from "@/hooks/cart";

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
  buttonText = 'Add to my bag',
  ...props
}: AddToCartButtonProps) {

  const { mutate, isPending } = useAddItemToCart();
  return (
    <LoadingButton
      isLoading={isPending}
      onClick={() => mutate({ product, selectedOptions, quantity })}
      className={cn("w-full flex items-center justify-center gap-2", className)}
      {...props}
    >
      <ShoppingCartIcon className=""/>
      {buttonText}
    </LoadingButton>
  );
}
