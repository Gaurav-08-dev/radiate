"use client";
import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import WixImage from "@/components/WixImage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import YouMayLikeSection from "@/components/YouMayLikeSection";
import { useGetMayLike } from "@/hooks/use-get-mayLike";
import Loading from "./loading";
import { Progress } from "@/components/ui/progress";
import Confetti from "react-confetti";
import CheckoutButton from "@/components/CheckoutButton";

interface CartProps {
  initialCart: currentCart.Cart | null;
}
export default function Cart({ initialCart }: CartProps) {
  const cart = useCart(initialCart);

  const lineItems = cart?.data?.lineItems;
  const mayLike = useGetMayLike();

  // const isLoading = cart.isFetching || mayLike.isFetching;
  const isPending = cart.isPending || mayLike.isPending;

  const totalQuantity =
    cart?.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0,
    ) || 0;
  if (isPending) return <Loading />;

  return (
    <main>
      <div className="mx-auto max-w-6xl p-6">
        {cart?.data?.lineItems?.length ? (
          <h1 className="mb-6 text-center text-3xl font-bold">
            My Shopping Bag
          </h1>
        ) : null}

        {cart?.data?.lineItems?.length ? (
          <div className="flex gap-8">
            <div className="flex-grow">
              {lineItems?.map((item) => (
                <ShoppingCartItem item={item} key={item._id} />
              ))}
            </div>

            <div className="relative w-80">
              {
                // @ts-expect-error Server component type mismatch with client component
                (cart?.data?.subtotal?.amount / 999) * 100 >= 100 ? (
                  <div className="absolute -translate-x-1/2 -translate-y-1/2">
                    <Confetti
                      recycle={false}
                      tweenDuration={1000}
                      numberOfPieces={200}
                      width={300}
                      height={100}
                      style={{ top: "20px" }}
                    />
                  </div>
                ) : null
              }
              <div className="rounded bg-gray-50 p-4">
                <Progress
                  value={
                    /* @ts-expect-error Server component type mismatch with client component */
                    (cart?.data?.subtotal?.amount / 999) * 100 > 100
                      ? 100
                      : /* @ts-expect-error Server component type mismatch with client component */
                        (cart?.data?.subtotal?.amount / 999) * 100
                  }
                  className="h-4"
                  max={100}
                />
                <div className="mb-4 ml-2 text-xs">
                  {/* @ts-expect-error Server component type mismatch with client component */}
                  {cart?.data?.subtotal?.amount >= 999 ? (
                    <p>
                      Your order is eligible for{" "}
                      <span className="font-semibold text-[#26A459]">
                        free delivery
                      </span>
                    </p>
                  ) : (
                    <p className="text-m text-gray-500">
                      Free delivery for orders over ₹999
                    </p>
                  )}
                </div>

                <div className="mb-4 flex justify-between">
                  <span className="pl-1">
                    {`Total (${totalQuantity} ${totalQuantity > 1 ? "items" : "item"}):`}
                  </span>

                  <span className="font-semibold">
                    {/* @ts-expect-error Server component type mismatch with client component */}
                    {cart?.data?.subtotal?.formattedAmount}
                  </span>
                </div>

                <CheckoutButton
                  disabled={!cart?.data?.lineItems?.length}
                  className="w-full rounded bg-[#500769] py-3 text-white hover:bg-[#500769]/80"
                />
              </div>
            </div>
          </div>
        ) : (
          <NoItemsInCart />
        )}
      </div>
      <YouMayLikeSection product={mayLike?.data || []} />
    </main>
  );
}

function ShoppingCartItem({ item }: { item: currentCart.LineItem }) {
  console.log(item.descriptionLines);
  const removeCartItemMutation = useRemoveCartItem();
  const updateCartItemQuantityMutation = useUpdateCartItemQuantity();

  const productId = item._id;
  if (!productId) return null;

  const slug = item.url?.split("/").pop();
  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability?.quantityAvailable;

  return (
    <div className="mb-6 border-b pb-6">
      <div className="flex gap-4">
        <div className="relative h-24 w-24">
          <Link href={`/products/${slug}`}>
            <WixImage
              mediaIdentifier={item.image}
              alt={item.productName?.original || "Product Image"}
              className="object-cover"
              width={200}
              height={200}
            />
          </Link>
        </div>

        <div className="flex-grow">
          <div className="flex justify-between gap-4">
            <h3 className="line-clamp-2 flex-1 whitespace-normal break-words font-semibold">
              {item.productName?.original}
            </h3>
            <div className="flex-shrink-0 text-right">
              <div className="font-semibold">{item.price?.formattedAmount}</div>
              <div className="text-xs text-gray-500 line-through">
                {item.fullPrice?.formattedAmount}
              </div>
            </div>
          </div>
          {item.descriptionLines?.[0]?.colorInfo?.original?.includes("&") ? (
              <div className="h-4 w-4 overflow-hidden border border-gray-200">
                <div className="flex h-full">
                  <div
                    style={{
                      backgroundColor:
                        item.descriptionLines?.[0]?.colorInfo?.original
                          .split("&")[0]
                          .trim()
                          .toLowerCase(),
                    }}
                    className="h-full w-1/2"
                  />
                  <div
                    style={{
                      backgroundColor:
                        item.descriptionLines?.[0]?.colorInfo?.original
                          .split("&")[1]
                          .trim()
                          .toLowerCase(),
                    }}
                    className="h-full w-1/2"
                  />
                </div>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor:
                    item.descriptionLines?.[0]?.colorInfo?.original?.toLowerCase(),
                }}
                className="h-4 w-4"
              />
            )}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex rounded border">
              <button
                disabled={item.quantity === 1}
                type="button"
                className="px-3 py-1"
                onClick={() =>
                  updateCartItemQuantityMutation.mutate({
                    productId,
                    newQuantity: !item?.quantity ? 0 : item.quantity - 1,
                  })
                }
              >
                -
              </button>
              <input
                title="Quantity"
                type="number"
                className="w-12 pl-3 text-center"
                value={item.quantity}
                readOnly
              />
              <button
                type="button"
                className="px-3 py-1"
                onClick={() =>
                  updateCartItemQuantityMutation.mutate({
                    productId,
                    newQuantity: !item?.quantity ? 0 : item.quantity + 1,
                  })
                }
                disabled={quantityLimitReached}
              >
                +
              </button>
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
              <button
                className="font-semibold text-red-500"
                type="button"
                onClick={() => removeCartItemMutation.mutate(productId)}
              >
                Delete
              </button>
              {/* <span className="text-gray-500">|</span>
              <button className="text-gray-500 font-semibold" type="button">Save for later</button>
              <span className="text-gray-500">|</span>
              <button className="text-gray-500 font-semibold" type="button">Share</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoItemsInCart() {
  return (
    <div className="mt-16 text-center">
      <p className="text-lg text-gray-500">Your shopping bag is empty</p>
      <Link href="/">
        <Button className="mt-4 bg-[#500769] text-white hover:bg-[#500769]/80">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}
