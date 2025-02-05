import { WixClient } from "@/lib/wix-client.base";
import { cache } from "react";
import { WIX_STORE_APP_ID } from "@/lib/constants";

export type ProductSort = "last_updated" | "price_asc" | "price_desc";

interface QueryProductsFilter {
  search?: string;
  collectionIds?: string[] | string;
  sort?: ProductSort;
  skip?: number; // skip n results
  limit?: number; // results per page
  priceMin?: number;
  priceMax?: number;
  availability?: string;
}
export async function queryProducts(
  wixClient: WixClient,
  {
    collectionIds,
    sort = "last_updated",
    skip,
    limit,
    search,
    priceMin,
    priceMax,
  }: QueryProductsFilter,
) {
  let query = wixClient.products.queryProducts();

  if (search) {
    query = query.startsWith("name", search);
  }

  const collectionIdsArray = collectionIds
    ? Array.isArray(collectionIds)
      ? collectionIds
      : [collectionIds]
    : [];

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

  if (limit) {
    query = query.limit(limit);
  }

  if (skip) {
    query = query.skip(skip);
  }

  if (priceMin) {
    query = query.ge("priceData.price", priceMin);
  }

  if (priceMax) {
    query = query.le("priceData.price", priceMax);
  }

  return query.find();
}

export const getProductBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    const { items } = await wixClient.products
      .queryProducts()
      .eq("slug", slug)
      .limit(1)
      .find();
    const product = items[0];
    if (!product || !product.visible) {
      return null;
    }
    return product;
  },
);

export async function getProductById(wixClient: WixClient, productId: string) {
  const result = await wixClient.products.getProduct(productId);
  return result.product;
}

export async function getRelatedProducts(
  wixClient: WixClient,
  productId: string,
) {
  const result = await wixClient.recommendations.getRecommendation(
    [
      {
        _id: "68ebce04-b96a-4c52-9329-08fc9d8c1253", // "From the same categories"
        appId: WIX_STORE_APP_ID,
      },
      {
        _id: "d5aac1e1-2e53-4d11-85f7-7172710b4783", // "Frequenly bought together"
        appId: WIX_STORE_APP_ID,
      },
      {
        _id: "ba491fd2-b172-4552-9ea6-7202e01d1d3c", // "From the best sellers"
        appId: WIX_STORE_APP_ID,
      },
    ],
    {
      items: [
        {
          appId: WIX_STORE_APP_ID,
          catalogItemId: productId,
        },
      ],
      minimumRecommendedItems: 3,
    },
  );

  const productIds = result.recommendation?.items
    .map((item) => item.catalogItemId)
    .filter((id) => id !== undefined);

  if (!productIds || !productIds.length) return [];

  const productsResult = await wixClient.products
    .queryProducts()
    .in("_id", productIds)
    .limit(4)
    .find();

  return productsResult.items;
}

export async function getBestSellers(wixClient: WixClient) {
  const result = await wixClient.recommendations.getRecommendation(
    [
      { _id: "ba491fd2-b172-4552-9ea6-7202e01d1d3c", appId: WIX_STORE_APP_ID },
      {
        _id: "68ebce04-b96a-4c52-9329-08fc9d8c1253",
        appId: WIX_STORE_APP_ID,
      },
    ],
    { items: [], minimumRecommendedItems: 3 },
  );
  const productIds = result.recommendation?.items;
  if (!productIds || !productIds.length) return [];
  const productsResult = await wixClient.products
    .queryProducts()
    .in("_id", productIds)
    .limit(4)
    .find();
  return productsResult.items;
}
