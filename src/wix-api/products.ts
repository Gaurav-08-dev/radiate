import { getWixClient } from "@/lib/wix-client.base";

type ProductSort = "last_updated" | "price_asc" | "price_desc";

interface QueryProductsFilter{
    collectionIds?: string[] | string;
    sort?: ProductSort;
}
export async function queryProducts({
    collectionIds,
    sort = "last_updated",
}: QueryProductsFilter) {
  const wixClient = await getWixClient();
  
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

  return query.find();
}

export async function getProductBySlug(slug: string) {
  const wixClient = await getWixClient();
  const {items} = await wixClient.products.queryProducts().eq("slug", slug).limit(1).find();
  const product = items[0];
  if (!product || !product.visible) {
    return null;
  }
  return product;
}
