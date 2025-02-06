import { products } from "@wix/stores";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProductReview } from "@/hooks/reviews";
import { Label } from "@/components/ui/label";
import WixImage from "@/components/WixImage";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Must be at least 5 characters")
    .max(100, "Must be less than 100 characters")
    .or(z.literal("")),

  body: z
    .string()
    .trim()
    .min(10, "Must be at least 10 characters")
    .max(3000, "Must be less than 3000 characters")
    .or(z.literal("")),

  rating: z.number().int().min(1).max(5, "Must be between 1 and 5"),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface CreateProductReviewDialogProps {
  product: products.Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: () => void;
}

export default function CreateProductReviewDialog({
  product,
  open,
  onOpenChange,
  onSubmitted,
}: CreateProductReviewDialogProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      rating: 0,
    },
  });

  const mutation = useCreateProductReview();

  async function onSubmit(data: FormSchemaType) {}
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a review</DialogTitle>
          <DialogDescription>
            Please share your thoughts about {product.name}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Product</Label>
            <div className="flex items-center gap-3">
              <WixImage
                mediaIdentifier={product.media?.mainMedia?.image?.url}
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
