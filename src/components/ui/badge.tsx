import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn("px-2 py-1 w-fit rounded-md capitalize bg-primary text-white ",className)}>
      {children}
    </span>
  );
}

