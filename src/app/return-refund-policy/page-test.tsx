import ReturnFaqItems from "@/components/ReturnFaqItems";
import { policyFAQs } from "@/constants/Refund Policy";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Return & Shipping Policy</h1>
      <div className="max-w-full">
        {policyFAQs.map((faq, index) => (
          <ReturnFaqItems key={index} {...faq} isLast={index === policyFAQs.length - 1} />
        ))}
      </div>
    </div>
  );
}

