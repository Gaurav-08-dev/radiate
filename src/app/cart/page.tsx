import Cart from "./cart";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import { Suspense } from "react";
import Loading from "../loading";

export default async function CartPage() {
  const cart = await getCart(getWixServerClient());

  return (
    <Suspense fallback={<Loading />}>
      <Cart initialCart={cart} />
    </Suspense>
  );
}
