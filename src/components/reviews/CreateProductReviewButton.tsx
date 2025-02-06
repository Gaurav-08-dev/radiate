"use client";
import { useState } from "react";
import { products } from "@wix/stores";
import { members } from "@wix/members";
import { useCreateProductReview } from "@/hooks/reviews";
import { Button } from "@/components/ui/button";
import CreateProductReviewDialog from "./CreateProductReviewDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
interface CreateProductReviewButtonProps {
  product: products.Product;
  loggedInMember: members.Member;
}

export default function CreateProductReviewButton({
  product,
  loggedInMember,
}: CreateProductReviewButtonProps) {
  const { mutate, isPending } = useCreateProductReview();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  return (
    <>
      <Button
        disabled={!loggedInMember}
        onClick={() => setShowReviewForm(true)}
      >
        {loggedInMember ? "Write a review" : "Login to write a review"}
      </Button>
      <CreateProductReviewDialog
        product={product}
        open={showReviewForm}
        onOpenChange={setShowReviewForm}
        onSubmitted={() => {
          setShowReviewForm(false);
        }}
      />
      <ReviewSubmittedDialog
        open={showConfirmationDialog}
        onOpenChange={setShowConfirmationDialog}
      />
    </>
  );
}

interface ReviewSubmittedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ReviewSubmittedDialog({
  open,
  onOpenChange,
}: ReviewSubmittedDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review submitted</DialogTitle>
          <DialogDescription>
            Your review has been submitted!!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
