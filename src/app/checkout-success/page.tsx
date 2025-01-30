import Order from "@/components/order";

import { getWixServerClient } from "@/lib/wix-client.server";
import { getLoggedInMember } from "@/wix-api/members";
import { getOrder } from "@/wix-api/orders";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClearCart from "./ClearCart";
export const metadata: Metadata = {
  title: "Checkout Success",
};

interface PageProps {
  searchParams: {
    orderId: string;
  };
}

export default async function Page({ searchParams: { orderId } }: PageProps) {
  const wixClient = getWixServerClient();
  const [order, loggedInMember] = await Promise.all([
    getOrder(wixClient, orderId),
    getLoggedInMember(wixClient),
  ]);

  if (!order) {
    return notFound();
  }

  const orderCreatedAt = order._createdDate
    ? new Date(order._createdDate)
    : null;
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center space-y-5 px-5 py-10">
      <h1 className="text-2xl font-medium">Order Placed!!</h1>
      <p className="text-sm text-gray-500">
        We've received your order and will process it as soon as possible. You
        will receive an email with your order details.
      </p>
      {/* <h2 className="text-2xl font-normal">Order Details</h2> */}
      <Order order={order} />
      {loggedInMember && (
        <Link href="/profile" className="block text-primary hover:underline">
          View all Orders
        </Link>
      )}
      {orderCreatedAt &&
        orderCreatedAt.getTime() > Date.now() - 1000 * 60 * 5 && <ClearCart />}

      {/* <Button className="w-full rounded bg-[#500769] py-3 text-white hover:bg-[#500769]/80">
        <Link href="/">Continue Shopping</Link>
      </Button> */}
    </main>
  );
}
