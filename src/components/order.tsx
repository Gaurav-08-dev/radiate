import { SUPPORT_EMAIL } from "@/lib/constants";
import { orders } from "@wix/ecom";
import { formatDate } from "date-fns";
import Badge from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import WixImage from "./WixImage";

interface OrderProps {
  order: orders.Order;
}

export default function Order({ order }: OrderProps) {
  console.log(order);
  const shippingDestination =
    order?.shippingInfo?.logistics?.shippingDestination;
  // @ts-expect-error
  const paymentStatusMap: Record<orders.PaymentStatus, string> = {
    [orders.PaymentStatus.PENDING]: "Pending",
    [orders.PaymentStatus.PAID]: "Paid",
    [orders.PaymentStatus.PARTIALLY_PAID]: "Partially Paid",
    [orders.PaymentStatus.NOT_PAID]: "Not Paid",
    [orders.PaymentStatus.FULLY_REFUNDED]: "Fully Refunded",
    [orders.PaymentStatus.PARTIALLY_REFUNDED]: "Partially Refunded",
    [orders.PaymentStatus.UNSPECIFIED]: "No Information",
  };

  const fulfillmentStatusMap: Record<orders.FulfillmentStatus, string> = {
    [orders.FulfillmentStatus.NOT_FULFILLED]: "Not Fulfilled",
    [orders.FulfillmentStatus.FULFILLED]: "Delivered",
    [orders.FulfillmentStatus.PARTIALLY_FULFILLED]: "Partially Delivered",
  };

  const paymentStatus = order?.paymentStatus
    ? paymentStatusMap[order?.paymentStatus]
    : null;

  const fulfillmentStatus = order?.fulfillmentStatus
    ? fulfillmentStatusMap[order?.fulfillmentStatus]
    : null;

  return (
    <div className="w-full space-y-5 border p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-bold">Order #{order.number}</span>
        {order._createdDate && (
          <span className="text-sm text-gray-500">
            {formatDate(order._createdDate, "MMM d, yyyy")}
          </span>
        )}
        <Link
          href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
            `Order #${order.number} help`,
          )}&body=${encodeURIComponent(
            `Hi, I need help with my order #${order.number}\n\n<Describe your problem>`,
          )}`}
          className="ms-auto text-sm text-primary hover:underline"
        >
          Need help?
        </Link>
      </div>
      <div className="flex justify-between gap-3 text-sm">
        <div className="basis-auto">
          <div className="space-y-0.5">
            <div className="flex items-center gap-3 font-semibold">
              <span>
                Subtotal: {order.priceSummary?.subtotal?.formattedAmount}
              </span>
              <Badge
                className={cn(
                  "rounded-none bg-secondary text-xs text-secondary-foreground",
                  paymentStatus === "Paid" && "bg-green-500 text-white",
                  paymentStatus === "Pending" && "bg-yellow-500 text-white",
                  paymentStatus === "Not Paid" && "bg-red-500 text-white",
                  paymentStatus === "Partially Paid" &&
                    "bg-orange-500 text-white",
                  paymentStatus === "No Information" &&
                    "bg-gray-500 text-white",
                )}
              >
                {paymentStatus}
              </Badge>
              <div className="font-semibold">{fulfillmentStatus || ""}</div>
            </div>
            <div className="divide-y">
              {order.lineItems?.map((item) => (
                <OrderItem item={item} key={item._id} />
              ))}
            </div>
          </div>
        </div>
        {shippingDestination && (
          <div className="space-y-2">
            <div className="font-semibold">Delivery Address:</div>
            <p>
              {shippingDestination?.contactDetails?.firstName}{" "}
              {shippingDestination?.contactDetails?.lastName}
            </p>
            <p>
              {shippingDestination?.address?.streetAddress?.name}{" "}
              {shippingDestination?.address?.streetAddress?.number}
            </p>
            <p>
              {shippingDestination?.address?.postalCode}{" "}
              {shippingDestination?.address?.city}
            </p>
            <p>
              {shippingDestination?.address?.subdivision ||
                shippingDestination?.address?.country}
            </p>
            <p className="font-semibold">{order.shippingInfo?.title}</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface OrderItemProps {
  item: orders.OrderLineItem;
}
function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="flex flex-wrap items-center gap-10 py-5 last:pb-0">
      <WixImage
        mediaIdentifier={item.image}
        alt={item.productName?.translated}
        width={110}
        height={110}
        className="flex-none bg-secondary"
      />
      <div className="space-y-0.5">
        <p className="line-clamp-2 font-semibold">
          {item.productName?.translated}
        </p>
        <p className="">
          {item.quantity} x {item.price?.formattedAmount}
        </p>
        <p className="text-sm text-gray-500">
          {item.descriptionLines
            ?.map(
              (line) => line.colorInfo?.translated || line.plainText?.translated,
            )
            .join(", ")}
        </p>
      </div>
    </div>
  );
}
