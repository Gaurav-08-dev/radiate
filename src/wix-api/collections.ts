import { WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export const getCollectionBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    const { collection } =
      await wixClient?.collections?.getCollectionBySlug(slug);

    return collection || null;
  },
);

export const getCollections = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collection = await wixClient.collections
      .queryCollections()
      .ne("_id", "00000000-000000-000000-000000000001")
      // .ne("_id", "2398b8e1-88a1-93c4-2323-9a74d09770f8")
      .find();
    return collection.items;
  },
);

export const getCollectionsForHeader = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collection = await wixClient.collections
      .queryCollections()
      .hasSome("_id", [
        "79f1e1c4-9d44-8a1a-ebcc-3c840d3b4d37",
        "dd036eb5-7484-5053-e35e-d3fc046f6417",
        "e47a30b0-abed-082b-89e5-771ea279deae",
        "e8752ab7-08e0-39a7-5fc8-88df885512b7",
      ])
      .find();

    return collection.items;
  },
);

export const getCollectionsByScent = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collection = await wixClient.collections
      .queryCollections()
      .hasSome("_id", [
        "0705f988-6b9b-cfd4-296a-81b835ac22ff",
        "8b2f6a78-9ea4-3c53-5359-c946045d16c3",
        "fa453f5a-7162-f28a-c205-442224c79c95",
        "9f745162-1d4c-228c-dd85-2690e9a9ac74",
        "d34b9d62-5973-004a-b3b4-c59377471213",
      ])
      .find();
    return collection.items;
  },
);

export const getCustomerFavorites = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collection = await wixClient.collections
      .queryCollections()
      .eq("_id", "2398b8e1-88a1-93c4-2323-9a74d09770f8")
      .find();
    return collection.items;
  },
);
