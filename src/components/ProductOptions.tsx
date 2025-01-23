import { products } from "@wix/stores";
import { Label } from "./ui/label";
import { checkInStock, cn } from "@/lib/utils";

interface ProductOptionsProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

export default function ProductOptions({ product, selectedOptions, setSelectedOptions }: ProductOptionsProps) {

  const id = product._id;
  const inventoryStatus = product.stock?.inventoryStatus?.toLowerCase() === "out_of_stock" ? true : false;
  
  return (
      <div className="flex flex-wrap gap-2">
      {product.productOptions?.map((option) => (
          <fieldset key={`${option.name} + ${id}}`} className="space-y-1.5" disabled={inventoryStatus}>
          <div className="flex flex-wrap items-center gap-1.5">
            {option.choices?.map((choice, index) => (
                <div key={`${choice.description} + ${id} + ${index}`}>
                <input
                  title={choice.description}
                  type="radio"
                  id={`${choice.description} + ${id} + ${index}`}
                  name={`${option.name}_${id}`}
                  value={choice.description}
                  checked={selectedOptions[option.name || ""] === choice.description}
                  className="peer hidden"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedOptions({ 
                        ...selectedOptions, 
                        [option.name || ""]: choice.description || "" 
                      });
                    }
                  }}
                />
                <Label
                  htmlFor={`${choice.description} + ${id} + ${index}`}
                  className={cn("flex min-w-14 cursor-pointer items-center justify-center gap-1.5 border rounded-md p-2 peer-checked:border-primary",!checkInStock(product, {
                    ...selectedOptions,
                    [option.name || ""]: choice.description || "",
                  }) && "opacity-50 cursor-not-allowed")}
                >
                  {choice.description}
                </Label>
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>

  );
}
