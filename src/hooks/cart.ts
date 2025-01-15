import { wixBrowserClient } from "@/lib/wix-client.browser";
import { addToCart, AddToCartValues, getCart } from "@/wix-api/cart";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";

const queryKey: QueryKey = ["cart"];
export function useCart(initialData?: currentCart.Cart | null) {
  return useQuery({
    queryKey,
    queryFn: () => getCart(wixBrowserClient),
    initialData,
  });
}

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: AddToCartValues) =>
      addToCart(wixBrowserClient, values),
    onSuccess(data) {
      toast({ description: "Item added to your cart" });
      queryClient.cancelQueries({ queryKey });
      console.log(data);
      queryClient.setQueryData(queryKey, data.cart);
    },
    onError(error){
      console.error(error);
      toast({ 
        description: "Error adding item to cart, please try again",
        variant: "destructive",
      });
    }
  });
};

