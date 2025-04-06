import { Mail, Phone } from "lucide-react";
import { SUPPORT_EMAIL, PHONE_NUMBER  } from "@/lib/constants";
export const policyFAQs = [
  {
    emoji: "🚚",
    question: "What is your shipping policy?",
    answer:
      <div className="text-justify">
        We are pleased to offer shipping services across India. However, transit times may vary based on destination, courier delays, or unforeseen circumstances like weather disruptions or strikes. Orders are processed and shipped within 1-2 business days after payment confirmation. We ship it as quickly as possible via our trusted shipping agents. Estimated delivery timelines: Metro Areas: 2-4 business days, Regional Areas: 2-7 business days. Factors such as distance, courier operations, and unexpected events may occasionally cause slight delays in delivery.
      </div>
  },
  {
    emoji: "📦",
    question: "How does order tracking work?",
    answer:
      <div className="text-justify">
        Once your order is shipped, you will receive an email with tracking details, including the courier partner's name and tracking number. Tracking updates may sometimes be delayed due to unforeseen courier issues. If you do not receive tracking details within 3 business days, please contact us at radiate.candles@gmail.com for assistance.
      </div>
  },
  {
    emoji: "📦",
    question: "What happens with lost, delayed or returned packages?",
    answer:
      <div className="text-justify">
        If your order is lost in transit, held at clearance, or returned to us, we take full responsibility and will promptly arrange a replacement with priority shipping. While we cannot control logistics once the package has been shipped, we will assist in resolving any courier-related issues.
      </div>
  },
  {
    emoji: "⏰",
    question: "What about extended shipping delays?",
    answer:
      <div className="text-justify">
        Although we strive to meet estimated delivery timelines, unexpected delays can sometimes occur. If your order takes longer than the stated delivery window, please reach out to us, and we will investigate the issue with our shipping partners.
      </div>
  },
  {
    emoji: "📍",
    question: "What shipping details do I need to provide?",
    answer:
      <div className="text-justify">
        To ensure smooth delivery, please provide a complete and accurate address, including: Pin code, Landmark (if applicable), Active mobile number and name for delivery updates. Any errors in the address may result in delays or return-to-sender issues.
      </div>
  },
  {
    emoji: "💳",
    question: "What payment methods do you accept?",
    answer:
      <div className="text-justify">
        We accept: All major debit & credit cards (Mastercard, Visa, American Express), Net Banking across major banks, UPI payments. Currently, we do not offer Cash on Delivery (COD), but we will introduce it soon!
      </div>
  },
  {
    emoji: "🔄",
    question: "What is your exchange policy for damaged or incorrect orders?",
    answer: (
      <div className="text-justify">
        If you receive a damaged, incorrect, or tampered product, we are happy
        to offer an exchange. To process your request: Record an unboxing video
        from start to finish within 24 hours of receiving the product as proof
        for this policy to be applicable. 
        <p>Email us at{" "}<a href={`mailto:${SUPPORT_EMAIL}`} className="inline-block items-center gap-2 text-[#500769] hover:underline"><span className="break-all">{SUPPORT_EMAIL}</span></a>{" "}with the video and details of the issue. If the claim is approved, we will send a replacement</p>
      </div>
    ),
  },
  {
    emoji: "↩️",
    question: "What is your return & refund policy?",
    answer:
      "We offer a 100% refund for any product that is damaged or incorrect. And 7 days return policy for change of mind purchases.",
  },
  {
    emoji: "❓",
    question: "How can I be sure about a product before purchasing?",
    answer:
      <div className="space-y-2 text-justify">
        <p>Since candles are a sensory product, we encourage you to explore before purchasing:</p>
        <ul>
          <li>1️. Live Videos & Photos – DM us on Instagram or WhatsApp for real-time product showcase.</li>
          <li>2️. Customer Reviews & Pictures – Check out real customer feedback on our Instagram highlights.</li>
          <li>3️. Fragrance Descriptions – Read detailed scent descriptions to find your perfect match.</li>
        </ul>
      </div>
  },
  {
    emoji: "📞",
    question: "How can I contact you for support?",
    answer: (
      <div className="mt-4 space-y-2 text-justify">
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="flex items-center gap-2 text-[#500769] hover:underline"
        >
          <Mail className="h-4 w-4" />
          <span className="break-all">{SUPPORT_EMAIL}</span>
        </a>
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex items-center gap-2 text-[#500769] hover:underline"
        >
          <Phone className="h-4 w-4" />
          <span>{PHONE_NUMBER}</span>
        </a>
      </div>
    ),
  },
];
