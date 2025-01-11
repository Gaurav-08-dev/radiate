import React from "react";
import { getWixClient } from "@/lib/wix-client.base";
import SignatureSectionUnit from "./SignatureSectionUnit";

const SignatureSection = async () => {
  const wixClient = await getWixClient();
  const { collection } =
    await wixClient.collections.getCollectionBySlug("signature-candle");
  if (!collection) {
    return null;
  }

  const signatureCandle = await wixClient.products
    .queryProducts()
    .hasSome("collectionIds", [collection._id])
    .descending("lastUpdated")
    .find();

  if (!signatureCandle.items.length) return null;

  const product = signatureCandle.items[0];
  return <SignatureSectionUnit product={product} />;
};

export default SignatureSection;
