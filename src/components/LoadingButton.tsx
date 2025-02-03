import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

export default function LoadingButton({
  isLoading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={cn("flex items-center gap-2 rounded-none bg-[#500769] hover:bg-[#500769]/80", className)}
      {...props}
    >
      {props.children}
      {isLoading && (
        <Loader2 className="size-5 animate-spin" />
      )}
    </Button>
  );
}
