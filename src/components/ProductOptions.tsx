import { products } from "@wix/stores";
import { Label } from "./ui/label";

interface ProductOptionsProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

export default function ProductOptions({ product, selectedOptions, setSelectedOptions }: ProductOptionsProps) {
  const id = product._id;
  const inventoryStatus = product.stock?.inventoryStatus?.toLowerCase() === "out_of_stock" ? true : false;
  console.log(product.productOptions)
  return (
      <div className="flex flex-wrap gap-2">
      {product.productOptions?.map((option) => (
          <fieldset key={`${option.name} + ${id}}`} className="space-y-1.5" disabled={inventoryStatus}>
          {/* <legend>
            <Label asChild>
              <span>{option.name}</span>
            </Label>
          </legend> */}
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
                  className="flex min-w-14 cursor-pointer items-center justify-center gap-1.5 border rounded-md p-2 peer-checked:border-primary"
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
