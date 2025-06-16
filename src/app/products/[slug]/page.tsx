import { getProductBySlug, queryProducts } from "@/wix-api/products";
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
import ProductReviews, {
  ProductReviewsLoadingSkeleton,
} from "./ProductReviews";
import { cn, playfair } from "@/lib/utils";
import Script from "next/script";
import { getProductReviews } from "@/wix-api/reviews";
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
  const review = await getProductReviews(getWixServerClient(), {
    productId: product?._id || "",
  });


   const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product?.name,
    image: product?.media?.mainMedia?.image?.url || "",
    description: product?.description || "",
    brand: {
      "@type": "Brand",
      name: "Radiate",
    },
    sku: product?.sku || "",
    offers: {
      "@type": "Offer",
      url: `https://radiate.in/products/${product?.slug}`,
      priceCurrency: "INR",
      price: product?.priceData?.formatted?.discountedPrice || "",
      priceValidUntil: "2025-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: review?.items?.[0]?.content?.rating || "",
      bestRating: "5",
      worstRating: "1",
      ratingCount: review?.items?.length || 0,
      reviewCount: review?.items?.length || 0,
    },
    review: {
      "@type": "Review",
      name: review?.items?.[0]?.author?.authorName || "",
      reviewBody: review?.items?.[0]?.content?.body || "",
      reviewRating: {
        "@type": "Rating",
        ratingValue: review?.items?.[0]?.content?.rating || "",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: review?.items?.[0]?.author?.authorName || "Anonymous",
      },
      publisher: {
        "@type": "Organization",
        name: "Radiate",
      },
    },
  };
  if (!product?._id) {
    return notFound();
  }

  return (
    <>
      <Script
        id="product-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-10">
        <ProductDetails product={product} />
        <Suspense fallback={<RelatedProductsLoadingSkeleton />}>
          <YouMayLikeSection productId={product._id} />
        </Suspense>

        <div className="space-y-10 px-4 py-10 md:px-44">
          <h2
            className={cn(
              "text-center text-2xl font-bold md:text-4xl",
              playfair.className,
            )}
          >
            Customer Reviews
          </h2>
          <Suspense fallback={<ProductReviewsLoadingSkeleton />}>
            <ProductReviewsSection product={product} />
          </Suspense>
        </div>
      </div>
    </>
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
