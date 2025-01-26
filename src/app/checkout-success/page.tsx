import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout Success",
};

export default function Page() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center space-y-5 px-5 py-10">
      <h1 className="text-3xl font-bold">Order Placed!!</h1>
      <p className="text-sm text-gray-500">
        We've received your order and will process it as soon as possible. You
        will receive an email with your order details.
      </p>
      <Button className="w-full rounded bg-[#500769] py-3 text-white hover:bg-[#500769]/80">
        <Link href="/">Continue Shopping</Link>
      </Button>
    </main>
  );
}
