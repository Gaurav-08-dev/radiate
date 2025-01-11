import { getProductBySlug, queryProducts } from "@/wix-api/products";
import { getCollectionBySlug } from "@/wix-api/collections";
import ProductDetails from "./ProductDetail";
import ProductGridUnit from "@/components/ProductGridUnit";
import { Metadata } from "next";
import { notFound } from "next/navigation";
interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(slug);
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


export default async function Page({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product?._id) {
    return notFound();
  }

  const collection = await getCollectionBySlug("scented-candle");
  if (!collection) {
    return null;
  }
  const scentedCandles = await queryProducts({
    collectionIds: collection._id ? collection._id : undefined,
  });

  if (!scentedCandles.items.length) return null;

  return (
    <main>
      <ProductDetails product={product} />
      <div className="px-44 py-12">
        <h1 className="py-8 text-center text-4xl font-semibold">
          You may also like
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {scentedCandles.items.slice(0, 3).map((product) => (
            <ProductGridUnit
              key={product.numericId}
              product={product}
              width={800}
              height={800}
            />
          ))}
        </div>
      </div>
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
    </main>
  );
}
