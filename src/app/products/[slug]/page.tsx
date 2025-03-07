import { getProductBySlug, queryProducts } from "@/wix-api/products";
// import { getCollectionBySlug } from "@/wix-api/collections";
import ProductDetails from "./ProductDetail";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWixServerClient } from "@/lib/wix-client.server";
import YouMayLikeSection from "@/components/YouMayLikeSection";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { products } from "@wix/stores";
import { getLoggedInMember } from "@/wix-api/members";
import CreateProductReviewButton from "@/components/reviews/CreateProductReviewButton";
import ProductReviews, { ProductReviewsLoadingSkeleton } from "./ProductReviews";
import { cn, playfair } from "@/lib/utils";
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
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: product.name || "Radiate Product",
            },
          ]
        : undefined,
    },
  };
}

export default async function Page({ params: { slug } }: PageProps) {

  const product = await getProductBySlug(getWixServerClient(), slug);
  
  if (!product?._id) {
    return notFound();
  }

  // const collection = await getCollectionBySlug(
  //   getWixServerClient(),
  //   "scented-candle",
  // );

  // if (!collection) {
  //   return null;
  // }
  // const scentedCandles = await queryProducts(getWixServerClient(), {
  //   collectionIds: collection._id ? collection._id : undefined,
  // });

  // if (!scentedCandles.items.length) return null;


  return (
    <div className="space-y-10">
      <ProductDetails product={product} />
      <Suspense fallback={<RelatedProductsLoadingSkeleton />}>
        <YouMayLikeSection productId={product._id} />
      </Suspense>
      
      <div className="space-y-10 py-10 px-4 md:px-44">
        <h2 className={cn("text-center text-2xl md:text-4xl font-bold", playfair.className)}>Customer Reviews</h2>
        <Suspense fallback={<ProductReviewsLoadingSkeleton />}>
          <ProductReviewsSection product={product} />
        </Suspense>
      </div>
    </div>
  );
}

function RelatedProductsLoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}

interface ProductReviewsSectionProps {
  product: products.Product;
}

async function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  const wixClient = getWixServerClient();
  const loggedInMember = await getLoggedInMember(wixClient);

  return (
    <div className="space-y-10">
      <CreateProductReviewButton
        product={product}
        loggedInMember={loggedInMember}
      />
      <ProductReviews product={product} />
    </div>
  );
}
