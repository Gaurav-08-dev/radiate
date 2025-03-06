import { AddressProps, updateMemberAddress, updateMemberInfo, UpdateMemberInfoProps } from "@/wix-api/members";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { wixBrowserClient } from "@/lib/wix-client.browser";

export function useMembersUpdate() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: (variables: UpdateMemberInfoProps) =>
      updateMemberInfo(wixBrowserClient, variables),
    onSuccess: () => {
      toast({
        description: "Member info updated",
      });
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to update member info",
      });
    },
  });
}

export function useMembersAddress() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: (variables: AddressProps) =>
      updateMemberAddress(wixBrowserClient, variables),
    onSuccess: () => {
      toast({
        description: "Address updated",
      });
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to update address",
      });
    },
  });
}


