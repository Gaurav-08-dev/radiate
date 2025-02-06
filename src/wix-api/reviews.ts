import { WixClient } from "@/lib/wix-client.base";
import { getLoggedInMember } from "./members";

export interface CreateProductReviewValues {
  productId: string;
  title: string;
  body: string;
  rating: number;
}
export async function createProductReview(
  wixClient: WixClient,
  { productId, title, body, rating }: CreateProductReviewValues,
) {
  const member = await getLoggedInMember(wixClient);
  if (!member) throw Error("Must be logged in to create a review");

  const authorName =
    member.contact?.firstName && member.contact?.lastName
      ? `${member.contact.firstName} ${member.contact.lastName}`
      : member.contact?.firstName ||
        member.contact?.lastName ||
        member.profile?.nickname ||
        "User";

  return wixClient.reviews.createReview({
    author: {
      authorName,
      contactId: member.contactId,
    },
    entityId: productId,
    namespace: "stores",
    content: {
      title,
      body,
      rating,
    },
  });
}
