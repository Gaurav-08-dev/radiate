"use client";
import { useCart } from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import WixImage from "@/components/WixImage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import YouMayLikeSection from "@/components/YouMayLikeSection";

interface CartProps {
  initialCart: currentCart.Cart | null;
}
export default function Cart({ initialCart }: CartProps) {
  const cart = useCart(initialCart);
  const lineItems = cart?.data?.lineItems;

  
  return (
      <main>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-center">My Shopping Bag</h1>
        
        {(!cart.isPending && !cart?.data?.lineItems?.length) && <NoItemsInCart />}

        {cart?.data?.lineItems?.length && <div className="flex gap-8">
          <div className="flex-grow">
            {lineItems?.map((item) => (
              <ShoppingCartItem item={item} key={item._id} />
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="w-80">
            <div className="rounded bg-gray-50 p-4">
              <div className="mb-4 rounded bg-green-100 p-2 text-green-600">
                Your order is eligible for free delivery
              </div>

              <div className="mb-4 flex justify-between">
                <span>Total (2 items):</span>
                <span className="font-semibold">₹1198</span>
              </div>

              <button
                type="button"
                className="w-full rounded bg-purple-700 py-3 text-white"
              >
                Proceed to buy
              </button>
            </div>
          </div>
        </div>}
      </div>
      <YouMayLikeSection />
    </main>
  );
}

function ShoppingCartItem({ item }: { item: currentCart.LineItem }) {
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
          <div className="flex justify-between">
            <h3 className="font-semibold">{item.productName?.original}</h3>
            <div className="text-right">
              {/* <div className="text-red-500">-7%</div> */}
              <div className="font-semibold">{item.price?.formattedAmount}</div>
              <div className="text-xs text-gray-500 line-through">
                {item.fullPrice?.formattedAmount}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex rounded border">
              <button
                disabled={item.quantity === 1}
                type="button"
                className="px-3 py-1"
                // onClick={() => setQuantity(quantity - 1)}
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
                // onClick={() => setQuantity(quantity + 1)}
                disabled={quantityLimitReached}
              >
                +
              </button>
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
              <button type="button">Delete</button>
              <span>|</span>
              <button type="button">Save for later</button>
              <span>|</span>
              <button type="button">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoItemsInCart() {
  return <div className="text-center mt-16">
    <p className="text-lg text-gray-500">Your Shopping Bag is empty</p>
    <Link href="/">
        <Button className="mt-4 bg-[#500769] hover:bg-[#500769]/80 text-white">Continue Shopping</Button>
    </Link>
    </div>;
}
