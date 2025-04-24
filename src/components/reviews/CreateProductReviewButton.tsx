"use client";
import { useState } from "react";
import { products } from "@wix/stores";
import { members } from "@wix/members";
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
import { useRouter } from "next/navigation";

interface CreateProductReviewButtonProps {
  product: products.Product;
  loggedInMember: members.Member | null;
}

export default function CreateProductReviewButton({
  product,
  loggedInMember,
}: CreateProductReviewButtonProps) {
  const router = useRouter();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  return (
    <div className="flex justify-center">
      <Button
        // disabled={!loggedInMember}
        onClick={() => loggedInMember ? setShowReviewForm(true) : router.push("/signin")}
        className="bg-[#500769] text-white rounded-none hover:bg-[#500769]/80"
      >
        {loggedInMember ? "Write a review" : "SignIn to write a review"}
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
    </div>
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
