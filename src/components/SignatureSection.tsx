import React from "react";
import SignatureSectionUnit from "./SignatureSectionUnit";
import { getWixServerClient } from "@/lib/wix-client.server";

const SignatureSection = async () => {
  const wixClient =  getWixServerClient();
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
