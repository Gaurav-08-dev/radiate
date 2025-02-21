import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import {
  createProductReview,
  CreateProductReviewValues,
} from "@/wix-api/reviews";
import { wixBrowserClient } from "@/lib/wix-client.browser";

export function useCreateProductReview() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: CreateProductReviewValues) =>
      createProductReview(wixBrowserClient, values),

    onError: (error) => {
      toast({
        title: "Error creating review!! Please try again",
        description: error.message,
        variant: "destructive",
        duration: 2000,
      });
    },

    // onSuccess: () => {
    //   toast({
    //     title: "Review created",
    //   });
    // },
  });
}
