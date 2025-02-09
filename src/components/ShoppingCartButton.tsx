"use client";
import { Loader2, ShoppingCart, X } from "lucide-react";
import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import Link from "next/link";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CheckoutButton from "./CheckoutButton";
import WixImage from "./WixImage";
import { Button } from "./ui/button";
interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
}
export function ShoppingCartButton({ initialData }: ShoppingCartButtonProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const cart = useCart(initialData);
  const totalQuantity =
    cart?.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0,
    ) || 0;

  return (
    <>
      <button
        type="button"
        className="relative h-20 w-10 text-white"
        aria-label="Shopping Cart"
        onClick={() => setIsSheetOpen(true)}
      >
        <ShoppingCart className="size-6" />
        {totalQuantity > 0 && (
          <span className="absolute right-1 top-4 rounded-full bg-[#FF9C46] px-2 py-1 text-xs font-semibold text-[#500769]">
            {totalQuantity}
          </span>
        )}
      </button>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="flex flex-col sm:max-w-lg">
          <SheetHeader className="absolute left-5 top-2">
            <SheetTitle>
              Cart{" "}
              <span className="text-base">
                ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex grow flex-col space-y-5 overflow-y-auto scroll-smooth pt-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
            <ul className="space-y-5">
              {cart?.data?.lineItems?.map((item) => (
                <ShoppingCartItem
                  key={item._id}
                  item={item}
                  onProductLinkClicked={() => setIsSheetOpen(false)}
                />
              ))}
            </ul>
            {cart?.isPending && <Loader2 className="mx-auto animate-spin" />}
            {cart?.error && (
              <p className="text-destructive">{cart?.error.message}</p>
            )}
            {!cart?.isPending && !cart?.data?.lineItems?.length && (
              <div className="flex grow items-center justify-center text-center">
                <div className="space-y-1.5">
                  <p className="text-lg font-semibold">Your cart is empty</p>
                  <Link
                    href="/shop"
                    className="text-primary hover:underline"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    Start shopping now
                  </Link>
                </div>
              </div>
            )}
          </div>
          <hr />
          <div className="flex items-center justify-between gap-5">
            <div className="space-y-0.5">
              <p className="text-sm">Subtotal amount:</p>
              <p className="font-bold">
                {/* @ts-expect-error */}
                {cart?.data?.subtotal?.formattedConvertedAmount}
              </p>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
            </div>
            <CheckoutButton
              size="lg"
              disabled={!totalQuantity || cart?.isFetching}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface ShoppingCartItemProps {
  item: currentCart.LineItem;
  onProductLinkClicked: () => void;
}

function ShoppingCartItem({
  item,
  onProductLinkClicked,
}: ShoppingCartItemProps) {
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemMutation = useRemoveCartItem();
  const productId = item._id;

  if (!productId) return null;

  const slug = item.url?.split("/").pop();

  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  return (
    <li className="flex items-center justify-between gap-3 pr-2">
      <div className="flex items-start gap-3">
        <div className="relative size-fit flex-none">
          <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
            <WixImage
              mediaIdentifier={item.image}
              width={110}
              height={110}
              alt={item.productName?.translated || "Product image"}
              className="flex-none bg-secondary"
            />
          </Link>
          <button
            type="button"
            aria-label="Remove item"
            className="absolute -right-1 -top-1 rounded-full border bg-background p-0.5"
            onClick={() => removeItemMutation.mutate(productId)}
          >
            <X className="size-3" />
          </button>
        </div>
        <div className="space-y-1.5 text-sm">
          <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
            <p className="font-bold">
              {item.productName?.translated || "Item"}
            </p>
          </Link>
          {!!item.descriptionLines?.length && (
            <p>
              {item.descriptionLines
                .map(
                  (line) =>
                    line.colorInfo?.translated || line.plainText?.translated,
                )
                .join(", ")}
            </p>
          )}
          <div className="flex items-center gap-2">
            {item.quantity} x {item.price?.formattedConvertedAmount}
            {item.fullPrice && item.fullPrice.amount !== item.price?.amount && (
              <span className="text-muted-foreground line-through">
                {item.fullPrice.formattedConvertedAmount}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 bg-primary text-white">
        <Button
          className="hover:bg-transparent"
          variant="ghost"
          size="sm"
          disabled={item.quantity === 1}
          onClick={() =>
            updateQuantityMutation.mutate({
              productId,
              newQuantity: !item.quantity ? 0 : item.quantity - 1,
            })
          }
        >
          -
        </Button>
        <span className="text-white">{item.quantity}</span>
        <Button
          variant="ghost"
          size="sm"
          disabled={quantityLimitReached}
          onClick={() =>
            updateQuantityMutation.mutate({
              productId,
              newQuantity: !item.quantity ? 1 : item.quantity + 1,
            })
          }
        >
          +
        </Button>
        {quantityLimitReached && <span>Quantity limit reached</span>}
      </div>
    </li>
  );
}
