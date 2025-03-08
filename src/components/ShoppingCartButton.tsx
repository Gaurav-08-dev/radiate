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
import { products } from "@wix/stores";
import { AddToCartButton } from "./AddToCartButton";
import { playfair,montserrat } from "@/lib/utils";

interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
  featuredProducts: products.Product[];
}
export function ShoppingCartButton({ initialData, featuredProducts }: ShoppingCartButtonProps) {
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const cart = useCart(initialData);
  const totalQuantity = cart?.data?.lineItems?.reduce(
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
        <SheetContent className="flex w-11/12 flex-col md:max-w-lg rounded-none">
          <SheetHeader className="border-b pb-4 text-center">
            <SheetTitle className="mx-auto text-center text-[#25291C]">SHOPPING CART</SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex grow flex-col space-y-5 overflow-y-auto scroll-smooth pt-1 px-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
            {cart?.data?.lineItems && cart?.data?.lineItems?.length > 0 && <ul className="space-y-5">
              {cart?.data?.lineItems?.map((item) => (
                <ShoppingCartItem
                  key={item._id}
                  item={item}
                  onProductLinkClicked={() => setIsSheetOpen(false)}
                />
              ))}
            </ul>}
            {cart?.isPending && <Loader2 className="mx-auto animate-spin" />}
            {cart?.error && (
              <p className="text-destructive">{cart?.error.message}</p>
            )}
            {!cart?.isPending && !cart?.data?.lineItems?.length && (
              <div className="flex flex-col gap-10 grow items-center justify-center text-center">
                {/* <div className="space-y-2"> */}
                  <p className={`${montserrat.className} text-lg font-semibold text-gray-400`}>Your cart is empty</p>
                  <Link
                    href="/shop"
                    className="text-white w-full p-2 bg-primary border font-medium"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    Continue shopping
                  </Link>
                {/* </div> */}
              </div>
            )}
            {!cart?.isPending && !cart?.data?.lineItems?.length && featuredProducts && featuredProducts.length > 0 && (
              <div className="mt-8 flex flex-col gap-4">
                <h3 className={`${playfair.className} mb-4 text-center text-sm md:text-xl font-medium uppercase`}>
                  You may like
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {featuredProducts.slice(0, 4).map((product) => (
                    <div key={product?._id} className="flex gap-4 border-b pb-3">
                      <WixImage
                        mediaIdentifier={product?.media?.mainMedia?.image?.url}
                        alt={product?.name}
                        width={80}
                        height={80}
                        className="h-auto w-[100px] rounded-none object-cover"
                      />
                      <div className="flex flex-col justify-between gap-2">
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/products/${product?.slug}`}
                            className="line-clamp-2 text-xs font-medium"
                            onClick={() => setIsSheetOpen(false)}
                          >
                            {product?.name}
                          </Link>
                          <div
                            className="text-xs font-normal text-[#5F5F5F]"
                            dangerouslySetInnerHTML={{
                              __html: product?.additionalInfoSections?.find(
                                (section) => section?.title?.toLowerCase() === "subtitle"
                              )?.description || "",
                            }}
                          />
                        </div>
                        <div className="text-xs font-medium">
                          {product?.price?.formatted?.price}
                        </div>
                        <AddToCartButton
                          variant="default"
                          size="sm"
                          className="w-[100px] rounded-none bg-[#500769] px-2 text-xs hover:bg-[#500769]/90"
                          product={product}
                          quantity={1}
                          disabled={!product?.stock?.inStock}
                          buttonText={product?.stock?.inStock ? "Add to my bag" : "Out of stock"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/shop"
                  className="mx-auto mt-4 w-fit border border-purple-600 p-2 text-sm font-medium text-purple-600 hover:text-purple-800"
                  onClick={() => setIsSheetOpen(false)}
                >
                  Explore all products
                </Link>
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
        <div className="flex justify-between gap-2">
          <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
            <p className="text-sm font-medium line-clamp-2 min-w-[100px] md:min-w-[200px]">
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
              type="button"
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
