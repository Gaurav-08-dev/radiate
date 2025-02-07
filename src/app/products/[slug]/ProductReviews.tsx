"use client";

import { wixBrowserClient } from "@/lib/wix-client.browser";
import { useInfiniteQuery } from "@tanstack/react-query";
import { products } from "@wix/stores";
import { getProductReviews } from "@/wix-api/reviews";
import { reviews } from "@wix/reviews";
import LoadingButton from "@/components/LoadingButton";
import { CornerDownRight, StarIcon, VerifiedIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/assets/logo.svg";
interface ProductReviewsProps {
  product: products.Product;
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["product-reviews", product._id],
      queryFn: async ({ pageParam }) => {
        if (!product._id) {
          throw Error("Product Id missing");
        }
        const pageSize = 2;
        return getProductReviews(wixBrowserClient, {
          productId: product._id,
          limit: pageSize,
          cursor: pageParam,
        });
      },
      getNextPageParam: (lastPage) => lastPage.cursors.next,
      initialPageParam: null as string | null,
    });

  const reviewItems = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="space-y-5">
      {status === "pending" && <ProductReviewsLoadingSkeleton />}
      {status === "error" && (
        <p className="text-destructive">Error loading reviews</p>
      )}
      {status === "success" && !reviewItems.length && !hasNextPage && (
        <p className="text-muted-foreground">No reviews yet</p>
      )}

      <div className="flex flex-col gap-5 justify-center items-center">
        {reviewItems.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
        
      </div>
      {hasNextPage && (
        <LoadingButton
          isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Load more reviews
        </LoadingButton>
      )}
    </div>
  );
}

export function ProductReviewsLoadingSkeleton() {
  return (
    <div className="flex w-full justify-center py-4">
      <div className="flex gap-1">
        <div className="h-1.5 w-1.5 animate-[bounce_0.5s_infinite] rounded-full bg-primary [animation-delay:-0.1s]" />
        <div className="h-1.5 w-1.5 animate-[bounce_0.5s_infinite] rounded-full bg-primary [animation-delay:-0.2s]" />
        <div className="h-1.5 w-1.5 animate-[bounce_0.5s_infinite] rounded-full bg-primary [animation-delay:-0.3s]" />
      </div>
    </div>
  );
}

interface ReviewItemProps {
  review: reviews.Review;
}

function ReviewItem({
  review: { author, content, reply, verified },
}: ReviewItemProps) {
  return (
    <div className="py-5 first:pt-0 border-b last:border-b-0 last:pb-0 w-full">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="font-bold">{author?.authorName || "Anonymous"}</span>
          {verified && <VerifiedIcon className="size-5 text-green-700" />}
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={cn(
                "size-5 text-primary",
                i < (content?.rating || 0) && "fill-primary",
              )}
            />
          ))}
          {content?.title && <h3 className="font-bold">{content.title}</h3>}
        </div>
        {content?.body && (
          <div className="whitespace-pre-line">{content.body}</div>
        )}
        {/* {!!content?.media?.length && (
          <div className="flex flex-wrap gap-2">
            {content.media.map((media) => (
              <MediaAttachment key={media.image || media.video} media={media} />
            ))}
          </div>
        )} */}
      </div>
      {reply?.message && (
        <div className="ms-10 mt-2.5 space-y-1 pt-2.5">
          <div className="flex items-center gap-2">
            <CornerDownRight className="size-5" />
            <Image
              src={logo}
              alt="Flow Store logo"
              width={24}
              height={24}
              className="size-5"
            />
            <span className="font-bold">Radiate Team</span>
          </div>
          <div className="whitespace-pre-line">{reply.message}</div>
        </div>
      )}
    </div>
  );
}
