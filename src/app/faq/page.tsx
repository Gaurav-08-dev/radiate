import FAQPage from "./FaqPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Radiate Candles",
  description:"Find answers to common questions about us, customizations and candle care at Radiate",

  openGraph: {
    title: "Frequently Asked Questions | Radiate Candles",
    description:
      "Find answers to common questions about us, customizations and candle care at Radiate",
  },
  twitter: {
    title: "Frequently Asked Questions | Radiate Candles",
    description:
      "Find answers to common questions about us, customizations and candle care at Radiate",
  },
};

export default function FaqPage() {
  return <FAQPage />;
}
