import { getCheckoutPolicies } from "@/wix-api/checkout";
import { getWixServerClient } from "@/lib/wix-client.server";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Radiate",
  description:
    "Review the terms and conditions for using Radiate’s website and services",

  openGraph: {
    title: "Terms & Conditions | Radiate",
    description:
      "Review the terms and conditions for using Radiate’s website and services",
  },
  twitter: {
    title: "Terms & Conditions | Radiate",
    description:
      "Review the terms and conditions for using Radiate’s website and services",
  },
};
export default async function TermsAndConditions() {
  const checkoutPolicies = await getCheckoutPolicies(getWixServerClient());
  const checkoutSettings = checkoutPolicies?.checkoutSettings;

  const returnPolicy =
    checkoutSettings?.checkoutPolicies?.returnPolicy?.content?.split("\n");
  const termsAndConditions =
    checkoutSettings?.checkoutPolicies?.termsAndConditions?.content?.split(
      "\n",
    );
  const privacyPolicy =
    checkoutSettings?.checkoutPolicies?.privacyPolicy?.content?.split("\n");

  return (
    <Suspense>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Terms & Conditions</h1>
        </div>
        <div className="space-y-6">
          {privacyPolicy?.map((policy) => (
            <section key={policy} className="mb-4">
              <p className="mb-4">{policy}</p>
            </section>
          ))}
          {termsAndConditions?.map((term) => (
            <section key={term} className="mb-4">
              <p className="mb-4">{term}</p>
            </section>
          ))}
          {returnPolicy?.map((policy) => (
            <section key={policy} className="mb-4">
              <p className="mb-4">{policy}</p>
            </section>
          ))}
        </div>
      </main>
    </Suspense>
  );
}
