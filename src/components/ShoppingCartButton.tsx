"use client";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import Link from "next/link";

interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
}
export function ShoppingCartButton({ initialData }: ShoppingCartButtonProps) {
  const cart = useCart(initialData);
  const totalQuantity =
    cart?.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0,
    ) || 0;

  return (
    <button
      type="button"
      className="relative h-20 w-10 text-white"
      aria-label="Shopping Cart"
    >
      <Link href="/cart">
        <ShoppingCart className="size-6" />
        {totalQuantity > 0 && (
          <span className="absolute right-1 top-4 rounded-full bg-[#FF9C46] px-2 py-1 text-xs font-semibold text-[#500769]">
            {totalQuantity}
          </span>
        )}
      </Link>
    </button>
  );
}
