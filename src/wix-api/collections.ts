import { WixClient } from "@/lib/wix-client.base";

export const getCollectionBySlug = async (wixClient: WixClient, slug: string) => {

  const {collection} = await (await wixClient)?.collections?.getCollectionBySlug(slug);
  return collection || null;
}

