import { getProductBySlug, queryProducts } from "@/wix-api/products";
import { getCollectionBySlug } from "@/wix-api/collections";
import ProductDetails from "./ProductDetail";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWixServerClient } from "@/lib/wix-client.server";
import YouMayLikeSection from "@/components/YouMayLikeSection";
interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(getWixServerClient(), slug);
  if (!product?._id) notFound();

  const mainImage = product.media?.mainMedia?.image;
  return {
    title: `${product?.name}`,
    description: "Get this product on Radiate",
    openGraph: {
      images: mainImage?.url ? [{url: mainImage.url,
        width: mainImage.width,
        height: mainImage.height,
        alt: product.name || "Radiate Product",
      }] : undefined,
    },
  };
}


export default async function Page({ params:{slug} }: PageProps) {
  const product = await getProductBySlug(getWixServerClient(), slug);
  if (!product?._id) {
    return notFound();
  }

  const collection = await getCollectionBySlug(getWixServerClient(), "scented-candle");
  if (!collection) {
    return null;
  }
  const scentedCandles = await queryProducts(getWixServerClient(), {
    collectionIds: collection._id ? collection._id : undefined,
  });

  if (!scentedCandles.items.length) return null;

  return (
    <main>
      <ProductDetails product={product} />
      <YouMayLikeSection product={scentedCandles.items} />
      
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
    </main>
  );
}
