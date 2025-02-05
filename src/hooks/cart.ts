import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  addToCart,
  AddToCartValues,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
  UpdateCartItemQuantityValues,
  clearCart,
} from "@/wix-api/cart";
import {
  MutationKey,
  QueryKey,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { useMutation } from "@tanstack/react-query";
import { toast, useToast } from "./use-toast";

const queryKey: QueryKey = ["cart"];
export function useCart(initialData?: currentCart.Cart | null) {
  return useQuery({
    queryKey,
    queryFn: () => getCart(wixBrowserClient),
    initialData,
  });
}

// ! SAME IMPLEMENTATION CAN BE USED FOR MEMBERS UPDATE
export const useAddItemToCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: AddToCartValues) =>
      addToCart(wixBrowserClient, values),
    onSuccess(data) {
      toast({ description: "Item added to your cart", duration: 2000 });
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, data.cart);
    },
    onError(error) {
      console.error(error);
      toast({
        description: "Error adding item to cart, please try again",
        variant: "destructive",
        duration: 2000,
      });
    },
  });
};

export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();
  const mutationKey: MutationKey = ["updateCartItemQuantity"];
  return useMutation({
    mutationKey: mutationKey,

    mutationFn: (values: UpdateCartItemQuantityValues) =>
      updateCartItemQuantity(wixBrowserClient, values),

    onMutate: async ({ productId, newQuantity }) => {
      await queryClient.cancelQueries({ queryKey }); // cancel any ongoing queries
      const previousCart = queryClient.getQueryData<currentCart.Cart>(queryKey); // get the previous cart
      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      }));
      return { previousCart }; // return the previous cart to be used in onError
    },

    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousCart); // revert to the previous cart if there is an error
      toast({
        description: "Error updating item quantity, please try again",
        variant: "destructive",
        duration: 2000,
      });
    },
    
    onSettled() {
      if (queryClient.isMutating({ mutationKey }) === 1) {
        queryClient.invalidateQueries({ queryKey }); // invalidate the query to get the latest data
      }
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) =>
      removeCartItem(wixBrowserClient, productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey });
      const previousCart = queryClient.getQueryData<currentCart.Cart>(queryKey);
      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.filter((item) => item._id !== productId),
      }));
      return { previousCart };
    },

    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousCart);
      console.error(error);
      toast({
        description: "Error removing item from cart, please try again",
        variant: "destructive",
        duration: 2000,
      });
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey }); // invalidate the query to get the latest data
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => clearCart(wixBrowserClient),
    onSuccess() {
      queryClient.setQueryData(queryKey, null);
      queryClient.invalidateQueries({ queryKey });
      
    },
    retry: 3,
  });
};
