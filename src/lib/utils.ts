import { products } from "@wix/stores";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { Playfair_Display, Montserrat } from "next/font/google";
import { collections } from "@wix/stores";

export const playfair = Playfair_Display({
  subsets: ["latin"],
});

export const playfairItalic = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
});

export const twConfig = resolveConfig(tailwindConfig);
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function replaceRupeesSymbol(text: string) {
  return text.replace("₹", "Rs ").replace(".00", "");
}

export function formatPrice(
  price: number | string = 0,
  currency: string = "INR",
) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(Number(price));
}

export function findVariant(
  product: products.Product,
  selectedOptions: Record<string, string>,
) {
  if (!product.manageVariants) return null;

  return (
    product.variants?.find((variant) => {
      return Object.entries(selectedOptions).every(
        ([key, value]) => variant.choices?.[key] === value,
      );
    }) || null
  );
}

export function checkInStock(
  product: products.Product,
  selectedOptions: Record<string, string>,
) {
  const variant = findVariant(product, selectedOptions);
  return variant
    ? variant.stock?.quantity !== 0 && variant.stock?.inStock
    : product.stock?.inventoryStatus === products.InventoryStatus.IN_STOCK ||
        product.stock?.inventoryStatus ===
          products.InventoryStatus.PARTIALLY_OUT_OF_STOCK;
}

interface CategoryGroup {
  header: string;
  collections: collections.Collection[];
}

export function organizeCollections(
  collections: collections.Collection[],
): CategoryGroup[] {
  const orderMap = new Map([
    ['product type', 0],
    ['scent family', 1],
    ['shop by scent', 1],
    ['mood', 3],
    ['room', 2],
    ['scent', 4], // alternative name for 'shop by scent'
  ]);
  
  const groups = new Map<string, collections.Collection[]>();
  
  collections.forEach((collection) => {
    if (collection.visible) {
      const collectionName = collection.name;
      const nameParts = collectionName?.split(/[-–]/);
      if (nameParts && nameParts.length > 1) {
        const header = nameParts[1].trim().toLowerCase();
        if (!groups.has(header)) {
          groups.set(header, []);
        }
        groups.get(header)?.push(collection);
      }
    }
  });

  // Convert to array and sort based on the orderMap
  const result: CategoryGroup[] = Array.from(groups.entries())
    .map(([header, collections]) => ({
      header: header.charAt(0).toUpperCase() + header.slice(1),
      collections,
    }))
    .sort((a, b) => {
      const orderA = orderMap.get(a.header.toLowerCase()) ?? 999;
      const orderB = orderMap.get(b.header.toLowerCase()) ?? 999;
      return orderA - orderB;
    });

  return result;
}

interface MediaItem {
  items: any[]; // You can make this more specific if needed
}

interface Collection {
  name: string;
  media: MediaItem;
  numberOfProducts: number;
  description: string;
  slug: string;
  visible: boolean;
  _id: string;
}

export interface CollectionGroup {
  header: string;
  collections: Collection[];
}

export function formatCategoryTitle(category: string): string {
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
