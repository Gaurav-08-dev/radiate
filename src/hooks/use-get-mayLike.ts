import { wixBrowserClient } from "@/lib/wix-client.browser";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { QueryKey, useQuery } from "@tanstack/react-query";

const queryKey: QueryKey = ["mayLike"];
export function useGetMayLike() {
  return useQuery({
    queryKey,
    queryFn: async () => {
        const collection = await getCollectionBySlug(wixBrowserClient, "scented-candle")
        if (!collection) return null;
        const products = await queryProducts(wixBrowserClient, {
            collectionIds: collection._id ? collection._id : undefined,
        })
        return products.items;
    },
  });
}