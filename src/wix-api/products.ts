import { WixClient } from "@/lib/wix-client.base";
import { cache } from "react";

type ProductSort = "last_updated" | "price_asc" | "price_desc";

interface QueryProductsFilter{
    collectionIds?: string[] | string;
    sort?: ProductSort;
    skip?: number; // skip n results
    limit?: number; // results per page
}
export async function queryProducts(wixClient: WixClient, {
    collectionIds,
    sort = "last_updated",
    skip,
    limit,
}: QueryProductsFilter) {
  let query = wixClient.products.queryProducts();

  const collectionIdsArray = collectionIds ? (Array.isArray(collectionIds) ? collectionIds : [collectionIds]) : [];
  
  if (collectionIdsArray.length) {
    query = query.hasSome("collectionIds", collectionIdsArray);
  }

  switch (sort) {
    case "last_updated":
      query = query.descending("lastUpdated");
      break;
    case "price_asc":
      query = query.ascending("price");
      break;
    case "price_desc":
      query = query.descending("price");
      break;
  }

  if(limit) {
    query = query.limit(limit);
  }

  if(skip) {
    query = query.skip(skip);
  }

  return query.find();
}

export const getProductBySlug = cache(async (wixClient: WixClient, slug: string) => {
  const {items} = await wixClient.products.queryProducts().eq("slug", slug).limit(1).find();
  const product = items[0];
  if (!product || !product.visible) {
    return null;
  }
  return product;
});
