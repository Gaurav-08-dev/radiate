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
    .ne("_id", "00000000-000000-000000-000000000001")
    .ne("_id","2398b8e1-88a1-93c4-2323-9a74d09770f8")
    .find()
    return collection.items;
  }
)