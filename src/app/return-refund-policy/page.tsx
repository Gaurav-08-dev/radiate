import ReturnRefundPolicyPage from "./ReturnRefundPolicyPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping, Return & Refund Policy I Radiate",
  description:
    "Read Radiate's shipping policy, return policy for damaged, defective, or unsatisfactory items & Refund policy",

  openGraph: {
    title: "Shipping, Return & Refund Policy I Radiate",
    description:
      "Read Radiate's shipping policy, return policy for damaged, defective, or unsatisfactory items & Refund policy",
  },
  twitter: {
    title: "Shipping, Return & Refund Policy I Radiate",
    description:
      "Read Radiate's shipping policy, return policy for damaged, defective, or unsatisfactory items & Refund policy",
  },
};

export default function ReturnRefundPolicy() {
  return <ReturnRefundPolicyPage />;
}
