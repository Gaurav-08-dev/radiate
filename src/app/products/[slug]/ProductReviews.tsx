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
      select: (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          items: page.items.filter(
            (item) =>
              item.moderation?.moderationStatus ===
              reviews.ModerationModerationStatus.APPROVED,
          ),
        })),
      }),
      getNextPageParam: (lastPage) => lastPage.cursors.next,
      initialPageParam: null as string | null,
    });

  const reviewItems = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="space-y-5 p-4 md:p-0 md:border-none">
      {status === "pending" && <ProductReviewsLoadingSkeleton />}
      {status === "error" && (
        <p className="text-destructive">Error loading reviews</p>
      )}
      {status === "success" && !reviewItems.length && !hasNextPage && (
        <p className="text-muted-foreground text-center text-xl">No reviews yet</p>
      )}

      <div className="flex flex-col gap-5 justify-center items-center w-full">
        {reviewItems.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </div>
      
      {hasNextPage && (
        <div className="flex justify-center">
          <LoadingButton
            isLoading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="h-10 px-4 py-2 text-sm md:text-base rounded-none bg-[#500769] text-white hover:bg-[#500769]/90"
          >
            Load more reviews
          </LoadingButton>
        </div>
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
    <div className="p-4 md:py-5 md:first:pt-4 border  w-full">
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-1 md:gap-2">
          <span className="font-bold text-sm md:text-base">{author?.authorName || "Anonymous"}</span>
          {verified && <VerifiedIcon className="size-4 md:size-5 text-green-700" />}
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "size-3.5 md:size-5 text-primary",
                  i < (content?.rating || 0) && "fill-primary",
                )}
              />
            ))}
          </div>
        </div>
        {content?.title && (
          <h3 className="font-bold text-sm md:text-base">{content.title}</h3>
        )}
        {content?.body && (
          <div className="whitespace-pre-line text-xs md:text-sm">{content.body}</div>
        )}
      </div>
      {reply?.message && (
        <div className="ms-6 md:ms-10 mt-2 md:mt-2.5 space-y-1 pt-2 md:pt-2.5 border-t border-gray-100">
          <div className="flex items-center gap-1.5 md:gap-2">
            <CornerDownRight className="size-4 md:size-5" />
            <Image
              src={logo}
              alt="Radiate logo"
              width={20}
              height={20}
              className="size-4 md:size-5"
            />
            <span className="font-bold text-xs md:text-sm">Radiate Team</span>
          </div>
          <div className="whitespace-pre-line text-xs md:text-sm">{reply.message}</div>
        </div>
      )}
    </div>
  );
}
