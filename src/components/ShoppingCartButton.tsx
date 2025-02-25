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

  const rupeeSymbol = "₹";
  const totaldiscount = cart?.data?.lineItems?.reduce(
    (acc, item) =>
      acc +
      (Number(item?.fullPrice?.amount) || 0) -
      (Number(item.price?.amount) || 0),
    0,
  );
  const totalPriceBeforeDiscount = cart?.data?.lineItems?.reduce(
    (acc, item) => acc + (Number(item?.fullPrice?.amount) || 0),
    0,
  );
  const totalPriceAfterDiscount = cart?.data?.lineItems?.reduce(
    (acc, item) => acc + (Number(item.price?.amount) || 0),
    0,
  ) ;

  // @ts-expect-error
  const totalPriceAfterDiscountWithGST = totalPriceAfterDiscount + totalPriceAfterDiscount * 0.12;
  // @ts-expect-error
  const totalGst = totalPriceAfterDiscount * 0.12;

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
        <SheetContent className="flex w-11/12 flex-col md:max-w-lg rounded-tl-xl rounded-bl-xl">
          <SheetHeader className="border-b pb-4 text-center">
            <SheetTitle className="mx-auto">SHOPPING CART</SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex grow flex-col space-y-5 overflow-y-auto scroll-smooth pt-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
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
          {/* @ts-expect-error  */}
          {cart?.data?.lineItems?.length > 0 && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-2 rounded-md bg-green-100 p-3">
                  <span className="text-md">🥳</span>
                <p className="text-sm text-green-800">
                  {`Woohoo! You saved ₹${totaldiscount} on your order`}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Bill details</h3>
                <div className="flex justify-between text-sm">
                  <span>Items total</span>
                  <div>
                    <span className="mr-2 text-xs text-gray-400 line-through">
                      {rupeeSymbol} {totalPriceBeforeDiscount}
                    </span>
                    <span className="font-medium">
                      {rupeeSymbol} {totalPriceAfterDiscount}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery charges</span>
                  <span className="font-medium text-green-600">
                    {/* @ts-expect-error */}
                    {totalPriceAfterDiscount >= 999
                      ? "FREE"
                      : `${rupeeSymbol} 999`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax- GST @12%</span>
                  <span className="font-medium">
                    {rupeeSymbol} {totalGst.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>Order total</span>
                  <span>
                    {rupeeSymbol} {totalPriceAfterDiscountWithGST}
                  </span>
                </div>
              </div>

              <CheckoutButton
                size="lg"
                className="w-full"
                disabled={!totalQuantity || cart?.isFetching}
              />
            </div>
          )}
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
    <li className="flex items-center gap-3 border-b pb-4">
      <div className="flex-shrink-0">
        <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
          <WixImage
            mediaIdentifier={item.image}
            width={80}
            height={80}
            alt={item.productName?.translated || "Product image"}
            className="rounded-md"
          />
        </Link>
      </div>

      <div className="flex-grow space-y-1">
        <div className="flex justify-between">
          <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
            <p className="text-sm font-medium">
              {item.productName?.translated || "Item"}
            </p>
          </Link>
          <div className="text-right">
            <p className="font-semibold">
              {item.price?.formattedConvertedAmount}
            </p>
            {item.fullPrice && item.fullPrice.amount !== item.price?.amount && (
              <p className="text-xs text-gray-400 line-through">
                {item.fullPrice.formattedConvertedAmount}
              </p>
            )}
          </div>
        </div>

        {!!item.descriptionLines?.length && (
          <p className="text-xs text-gray-500">
            {item.descriptionLines
              .map(
                (line) =>
                  line.colorInfo?.translated || line.plainText?.translated,
              )
              .join(", ")}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center rounded-md border">
            <button
              className="px-3 py-1 text-gray-500"
              disabled={item.quantity === 1}
              onClick={() =>
                updateQuantityMutation.mutate({
                  productId,
                  newQuantity: !item.quantity ? 0 : item.quantity - 1,
                })
              }
            >
              −
            </button>
            <span className="px-3 py-1">{item.quantity}</span>
            <button
              type="button"
              className="px-3 py-1 text-gray-500"
              disabled={quantityLimitReached}
              onClick={() =>
                updateQuantityMutation.mutate({
                  productId,
                  newQuantity: !item.quantity ? 1 : item.quantity + 1,
                })
              }
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="text-sm text-gray-500"
            onClick={() => removeItemMutation.mutate(productId)}
          >
            Remove
          </button>
        </div>

        {quantityLimitReached && (
          <p className="text-xs text-amber-600">Quantity limit reached</p>
        )}
      </div>
    </li>
  );
}
