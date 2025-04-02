"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { SUPPORT_EMAIL, PHONE_NUMBER } from "@/lib/constants";

type FAQItemProps = {
  question: string;
  emoji?: string;
  answer: React.ReactNode;
};

function FAQItem({ question, emoji, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-4 w-full">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h3 className="font-medium flex items-center gap-2">
          {emoji && <span className="text-xl">{emoji}</span>}
          {question}
        </h3>
        <div
          className={`transform transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      {open && (
        <div className="mt-4 text-gray-600 space-y-2">
          {typeof answer === 'string' ? (
            <p>{answer}</p>
          ) : (
            answer
          )}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-3 md:mb-12">FAQs</h1>

      <div className="max-w-full">
        <FAQItem
          emoji="👋"
          question="Who are we and what makes Radiate special?"
          answer="Radiate is a women-led, homegrown Indian brand with its own in-house production unit. Every product is made with care, passion, and authenticity. To ensure trust and accountability, we are a registered trademark and have a valid GSTIN."
        />

        <FAQItem
          emoji="✨"
          question="How do you ensure the quality and safety of your candles?"
          answer={
            <div>
              <p>Every candle goes through rigorous quality checks and burn tests to ensure:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Strong hot & cold throw (fragrance strength)</li>
                <li>Full wax utilization (no wasted wax)</li>
                <li>Maximum burn limits for long-lasting use</li>
                <li>Allergy & safety testing for people with sensitive skin or respiratory concerns</li>
              </ul>
              <p className="mt-2">Our candles are toxin-free and safe to use, crafted with high-quality ingredients for a clean burn.</p>
            </div>
          }
        />

        <FAQItem
          emoji="🌺"
          question="What makes your fragrances different?"
          answer="Unlike many brands that copy Western trends, we create scents that are deeply rooted in Indian culture. Every fragrance is thoughtfully designed for the Indian audience, catering to our memories, preferences, and traditions."
        />

        <FAQItem
          emoji="🧪"
          question="How do you develop your fragrances?"
          answer="Our R&D process is inspired by ancient Indian fragrance knowledge, focusing on how scents affect our mood and environment. Just like our ancestors used natural aromas for peace, positivity, and well-being, we create fragrances that bring harmony into modern life."
        />

        <FAQItem
          emoji="💫"
          question="What is the philosophy behind Radiate?"
          answer="In today's fast-paced world, we believe in self-care and self-love. Our products are designed to help you slow down, embrace love, and create meaningful moments—whether through a cozy evening, a self-care ritual, or a heartfelt gift."
        />

        <FAQItem
          emoji="🇮🇳"
          question="Why is an Indian brand like ours important?"
          answer="For too long, foreign brands have dominated the Indian market, overlooking our rich traditions and preferences. At Radiate, we are proud to create products by the people of Bharat, for the people of Bharat. We are committed to Viksit Bharat—strengthening our economy and celebrating our culture."
        />

        <FAQItem
          emoji="💝"
          question="How should I take care of my candles?"
          answer={
            <div>
              <p>To get the best experience, follow these simple candle care tips:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Trim the wick to ¼ inch before each burn.</li>
                <li>Let the wax melt evenly across the surface to prevent tunneling.</li>
                <li>Avoid burning for more than 4 hours at a time.</li>
                <li>Place candles on a stable, heat-resistant surface and never leave them unattended.</li>
              </ul>
            </div>
          }
        />

        <FAQItem
          emoji="🎁"
          question="Can I request a custom order?"
          answer={
            <div>
              <p>Yes! Whether you want personalized gifts, special messages, or custom fragrances, we'd love to bring your vision to life. Just contact us via email or phone, and we'll discuss how we can make it happen.</p>
              <div className="mt-4 space-y-2">
                <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-2 text-[#500769] hover:underline">
                  <Mail className="h-4 w-4" />
                  <span className="break-all">{SUPPORT_EMAIL}</span>
                </a>
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 text-[#500769] hover:underline">
                  <Phone className="h-4 w-4" />
                  <span>{PHONE_NUMBER}</span>
                </a>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}