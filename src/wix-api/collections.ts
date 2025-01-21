import { WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export const getCollectionBySlug = cache(async (wixClient: WixClient, slug: string) => {
  const {collection} = await wixClient?.collections?.getCollectionBySlug(slug);
  return collection || null;
})

export const getCollections = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collection = await wixClient.collections.queryCollections()
    .find()
    return collection.items;
  }
)