"use client";

import { useState } from "react";

type PolicyItemProps = {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};

function PolicyItem({ title, content, isOpen, onToggle }: PolicyItemProps) {
  return (
    <div className="border-b py-4 w-full">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={onToggle}
      >
        <h3 className="font-medium text-xl">{title}</h3>
        <div
          className={`transform transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
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
      {isOpen && (
        <div className="mt-4 text-gray-600 space-y-2">
          {content}
        </div>
      )}
    </div>
  );
}

export default function ReturnRefundPolicyPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (item: string) => {
    setOpenItem(prev => prev === item ? null : item);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Shipping, Return & Refund Policy</h1>
      
      <div className="bg-[#f9f5fa] p-6 rounded-lg mb-10 border border-[#e9d5f0]">
        <p className="text-lg"> 
          At Radiate, we want your shopping experience to be smooth, hassle-free, and enjoyable. We take great care in crafting and packaging our products, ensuring they reach you in perfect condition. 
          We are fully committed to promptly resolve any issues which may arise. Please read our policy carefully to ensure a seamless experience and to help you shop with confidence.
        </p>
      </div>

      <div className="max-w-full">
        <PolicyItem
          title="Shipping Policy"
          isOpen={openItem === "shipping"}
          onToggle={() => toggleItem("shipping")}
          content={
            <div>
              <p className="mb-4">We are pleased to offer shipping services across India. However, transit times may vary based on destination, courier delays, or unforeseen circumstances like weather disruptions or strikes. Below is everything you need to know about our shipping process.</p>
              
              <h4 className='text-xl font-bold mt-4'>Order Processing & Shipping Duration</h4>
              <ul className='list-disc pl-6 mt-2 space-y-1'>
                <li>Orders are processed and shipped <span className='font-bold'>within 1-2 business days</span> after payment confirmation. We ship it as quickly as possible via our trusted shipping agents.</li>
                <li>Estimated <span className='font-bold'>delivery timelines:</span></li>
                <li className='ml-4'><span className='font-bold'>Metro Areas:</span> 2-4 business days</li>
                <li className='ml-4'><span className='font-bold'>Regional Areas:</span> 2-7 business days</li>
                <li>Factors such as <span className='font-bold'>distance, courier operations, and unexpected events</span> may occasionally cause slight delays in delivery.</li>
              </ul>

              <h4 className='text-xl font-bold mt-4'>Order Tracking</h4>
              <ul className='list-disc pl-6 mt-2 space-y-1'>
                <li>Once your order is shipped, you will receive an <span className='font-bold'>email with tracking details</span>, including the courier partner's name and tracking number.</li>
                <li>Tracking updates may sometimes be delayed due to unforeseen courier issues. If you do not receive tracking details within <span className='font-bold'>3 business days</span>, please contact us at <a href="mailto:radiatecandles24@gmail.com" className="text-[#500769] hover:underline">radiatecandles24@gmail.com</a> for assistance.</li>
              </ul>
              
              <h4 className='text-xl font-bold mt-4'>Extended Shipping Delays</h4>
              <ul className='list-disc pl-6 mt-2 space-y-1'>
                <li>Although we strive to meet estimated delivery timelines, unexpected delays can sometimes occur.</li>
                <li>If your order takes longer than the <span className='font-bold'>stated delivery window</span>, please reach out to us, and we will investigate the issue with our shipping partners.</li>
              </ul>
              
              <h4 className='text-xl font-bold mt-4'>Accurate Shipping Details</h4>
              <ul className='list-disc pl-6 mt-2 space-y-1'>
                <li>To ensure smooth delivery, please provide a complete and accurate address, including:</li>
                <li>✅ Pin code</li>
                <li>✅ Landmark (if applicable)</li>
                <li>✅ Active mobile number and name for delivery updates</li>
                <li>Any errors in the address may result in delays or return-to-sender issues where the RTO fees is to be borne by the customer.</li>
              </ul>
            </div>
          }
        />

        <PolicyItem
          title="Exchange, Return & Refund Policy"
          isOpen={openItem === "return"}
          onToggle={() => toggleItem("return")}
          content={
            <div>
              <p>We take great pride in our handcrafted products and want you to love every purchase. However, we understand that issues may arise during shipping.</p>
              <p className="mt-2 p-3 bg-[#fff0f0] rounded border border-[#ffcccc]">🚫 Sorry <span className='font-bold'>we do not offer returns or refunds for change of mind purchases.</span></p>
              
              <h4 className='text-xl font-bold mt-4'>In case of Damaged or Incorrect Orders</h4>
              <ul className='list-disc pl-6 mt-2 space-y-1'>
                <li>If you receive a <span className='font-bold'>damaged, incorrect, or tampered product</span>, we are happy to offer an <span className='font-bold'>exchange/refund</span>. To process your request:</li>
                <li>Record an <span className='font-bold'>unboxing video from start to finish</span> within <span className='font-bold'>24 hours of receiving the product as proof </span>for this policy to be applicable.</li>
                <li>Email us at <a href="mailto:radiatecandles24@gmail.com" className="text-[#500769] hover:underline">radiatecandles24@gmail.com</a> with the video and details of the issue.</li>
                <li>If the claim is approved, we will send a replacement/ initiate refund process</li>
              </ul>
              
              <p className='mt-4'>We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically credited on your original payment method within 10 business days.</p>
              <p className='mt-4'>Please remember it can take some time for your bank or credit card company to process and post the refund too.</p>
               
              <p>If more than 15 business days have passed since we've approved your return, please contact us at <a href="mailto:radiatecandles24@gmail.com" className="text-[#500769] hover:underline">radiatecandles24@gmail.com</a></p>
            </div>
          }
        />

        <PolicyItem
          title="Modes of Payment"
          isOpen={openItem === "payment"}
          onToggle={() => toggleItem("payment")}
          content={
            <div>
              <ul className='list-disc pl-6 mt-2 space-y-1'>
                <li>We accept:
                ✅ All major debit & credit cards (Mastercard, Visa, American Express etc)</li>
                <li>✅ Net Banking across major banks</li>
                <li>✅ UPI payments</li>
              </ul>
              <p className='mt-4 p-3 bg-[#fff0f0] rounded border border-[#ffcccc]'>🚫 Currently, we do not offer Cash on Delivery (COD), but we will introduce it soon!</p>
            </div>
          }
        />

        <PolicyItem
          title="Not Sure About a Product? Let's Help You Decide!"
          isOpen={openItem === "product-help"}
          onToggle={() => toggleItem("product-help")}
          content={
            <div>
              <p>Since candles are a sensory product, we encourage you to explore before purchasing:</p>
              <ul className='list-disc pl-6 mt-2 space-y-1'>
                <li> Live Videos & Photos – DM us on Instagram or WhatsApp for real-time product showcase.</li>
                <li> Customer Reviews & Pictures – Check out real customer feedback on our Instagram highlights.</li>
                <li> Fragrance Descriptions – Read detailed scent descriptions to find your perfect match.</li>
              </ul>
              <p className='mt-4'>At Radiate Candles, we believe in honesty, transparency, and making sure you love what you buy. If you need any assistance, feel free to reach out!</p>
            </div>
          }
        />

        <PolicyItem
          title="Need Help? Contact Us!"
          isOpen={openItem === "contact"}
          onToggle={() => toggleItem("contact")}
          content={
            <div>
              <p>For any shipping-related queries, please feel free to contact us:</p>
              <div className="mt-4 space-y-2">
                <a href="mailto:radiatecandles24@gmail.com" className="flex items-center gap-2 text-[#500769] hover:underline">
                  <span className="text-xl">📧</span>
                  <span className="break-all">radiatecandles24@gmail.com</span>
                </a>
                <a href="https://www.instagram.com/letsradiate.in/" className="flex items-center gap-2 text-[#500769] hover:underline">
                  <span className="text-xl">📱</span>
                  <span>@letsradiate.in</span>
                </a>
                <a href="https://wa.me/917011145443" className="flex items-center gap-2 text-[#500769] hover:underline">
                  <span className="text-xl">💬</span>
                  <span>+91 7011145443</span>
                </a>
              </div>
              <p className='mt-4'>We appreciate your patience and support, and we're committed to delivering a seamless shopping experience! ✨</p>
            </div>
          }
        />
      </div>
    </div>
  );
}