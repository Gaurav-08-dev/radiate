import { products } from "@wix/stores";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
interface ProductOptionsProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
  className?: string;
  
}

export default function ProductOptions({
  product,
  selectedOptions,
  setSelectedOptions,
  className,
}: ProductOptionsProps) {

  const id = product._id;
  const inventoryStatus =
    product.stock?.inventoryStatus?.toLowerCase() === "out_of_stock"
      ? true: false;
  
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {product.productOptions?.map((option) => (
        <Select   
          key={`${option.name} + ${id}`}
          disabled={inventoryStatus}
          onValueChange={(value) => {
            setSelectedOptions({
              ...selectedOptions,
              [option.name || ""]: value || "",
            });
  
          }}
          value={selectedOptions[option.name || ""] || option.choices?.[0]?.description || ""}
          aria-label={`Select ${option.name || "option"}`}
        >
          <SelectTrigger 
            className="min-w-fit md:h-16 max-h-fit rounded-none"
            aria-label={`${option.name || "Option"} selector`}
          >
            <SelectValue placeholder={selectedOptions[option.name || ""] || option.choices?.[0]?.description || ""} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{option.name}</SelectLabel>
              {option.choices?.map((choice) => (
                <SelectItem
                  key={`${choice.description} + ${id}`}
                  value={choice.description || ""}
                >
                  {option.name?.toLowerCase() === 'color' ? (
                    <div className="flex items-center gap-2" aria-label={`Color: ${choice.description}`}>
                      {choice.description?.includes('&') ? (
                        <div className="h-4 w-4 overflow-hidden" aria-hidden="true">
                          <div className="flex h-full">
                            <div 
                              style={{ 
                                backgroundColor: choice.description
                                  .split('&')[0]
                                  .trim()
                                  .toLowerCase()
                              }} 
                              className="w-1/2 h-full"
                            />
                            <div 
                              style={{ 
                                backgroundColor: choice.description
                                  .split('&')[1]
                                  .trim()
                                  .toLowerCase()
                              }} 
                              className="w-1/2 h-full"
                            />
                          </div>
                        </div>
                      ) : (
                        <div 
                          style={{ 
                            backgroundColor: choice?.description?.toLowerCase()
                          }} 
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      )}
                      {choice.description}
                    </div>
                  ) : (
                    choice.description
                  )}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}

{
  /* <fieldset
          key={`${option.name} + ${id}}`}
          className="space-y-1.5"
          disabled={inventoryStatus}
        >
          <div className="flex flex-wrap items-center gap-1.5">
            {option.choices?.map((choice, index) => (
              <div key={`${choice.description} + ${id} + ${index}`}>
                <input
                  title={choice.description}
                  type="radio"
                  id={`${choice.description} + ${id} + ${index}`}
                  name={`${option.name}_${id}`}
                  value={choice.description}
                  checked={
                    selectedOptions[option.name || ""] === choice.description
                  }
                  className="peer hidden"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedOptions({
                        ...selectedOptions,
                        [option.name || ""]: choice.description || "",
                      });
                    }
                  }}
                />
                <Label
                  htmlFor={`${choice.description} + ${id} + ${index}`}
                  className={cn(
                    "flex min-w-14 cursor-pointer items-center justify-center gap-1.5 rounded-md border p-2 peer-checked:border-primary",
                    !checkInStock(product, {
                      ...selectedOptions,
                      [option.name || ""]: choice.description || "",
                    }) && "cursor-not-allowed opacity-50",
                  )}
                >
                  {choice.description}
                </Label>
              </div>
            ))}
          </div>
        </fieldset> */
}
