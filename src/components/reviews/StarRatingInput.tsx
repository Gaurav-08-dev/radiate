import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
}
export default function StarRatingInput({
  value,
  onChange,
}: StarRatingInputProps) {
  const ratingsText = ["Terrible", "Poor", "Average", "Good", "Excellent"];
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 5 }).map((_, index: number) => (
        <button
          title={ratingsText[index]}
          key={index}
          onClick={() => onChange(index + 1)}
          type="button"
        >
          <StarIcon
            className={cn(
              "size-7 text-primary",
              index < value && "fill-primary",
            )}
          />
        </button>
      ))}
      <span className="text-sm font-semibold">{ratingsText[value - 1]}</span>
    </div>
  );
}
