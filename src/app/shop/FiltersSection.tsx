"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { collections } from "@wix/stores";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductSort } from "@/wix-api/products";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

const sortOptions = [
  { label: "Featured", value: "last_updated" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function FiltersSectionComponent({
  children,
  collections,
}: {
  children: React.ReactNode;
  collections: collections.Collection[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [optimisticFilters, setOptimisticFilters] = useOptimistic({
    collection: searchParams.getAll("collection") || [],
    sort: searchParams.get("sort") || "last_updated",
  });
  const [isPending, startTransition] = useTransition();

  function updateFilters(updates: Partial<typeof optimisticFilters>) {
    const newFilters = { ...optimisticFilters, ...updates };
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      newSearchParams.delete(key);
      if (Array.isArray(value)) {
        value.forEach((v) => newSearchParams.append(key, v));
      } else if (value) {
        newSearchParams.set(key, value);
      }
    });

    newSearchParams.delete("page");

    startTransition(() => {
      setOptimisticFilters(newFilters);
      router.push(`?${newSearchParams.toString()}`);
    });
  }

  return (
    <main className="group flex gap-8 p-10">
      <aside
        data-pending={isPending ? "" : undefined}
        className="flex max-h-fit w-1/5 gap-8 lg:sticky lg:left-0 lg:top-10 lg:w-1/5"
      >
        <div className="w-64 space-y-6">
          <SortFilter
            selectedSortOption={optimisticFilters?.sort}
            updateSortOption={(sortOption) => updateFilters({ sort: sortOption })}
          />
          <CollectionsFilter
            collections={collections}
            selectedCollectionIds={optimisticFilters?.collection}
            updateCollectionIds={(collectionIds) => {
              updateFilters({ collection: collectionIds });
            }}
          />
        </div>
      </aside>
      {children}
    </main>
  );
}

interface CollectionsFilterProps {
  collections: collections.Collection[];
  selectedCollectionIds?: string[];
  updateCollectionIds: (collectionIds: string[]) => void;
}
function CollectionsFilter({
  collections,
  selectedCollectionIds,
  updateCollectionIds,
}: CollectionsFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="text-lg font-medium">Collections</div>
        {/* {selectedCollectionIds.length > 0 && (
          <Button
            variant="outline"
            onClick={() => updateCollectionIds([])}
            className="hover:bg-red-500 hover:text-white"
            title="Clear Filters"
            style={{width: "fit-content", height: "fit-content", padding: "2px 10px"}}
          >
            Clear
            <X className="h-5 w-5" />
          </Button>
        )} */}
      </div>
      <ul className="space-y-1.5">
        {collections.map((collection) => {
          const collectionId = collection._id;
          if (!collectionId) return null;
          return (
            <li key={collectionId}>
              <label className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  id={collectionId}
                  checked={selectedCollectionIds?.includes(collectionId)}
                  onCheckedChange={(checked) => {
                    updateCollectionIds(
                      checked
                        ? [...(selectedCollectionIds || []), collectionId]
                        : (selectedCollectionIds || []).filter(
                            (id) => id !== collectionId,
                          ),
                    );
                  }}
                />
                <span className="line-clamp-1 break-all">
                  {collection.name}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface SortFilterProps {
  selectedSortOption: string | undefined;
  updateSortOption: (sortOption: ProductSort) => void;
}
function SortFilter({ selectedSortOption, updateSortOption }: SortFilterProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 text-xl">
        <SlidersHorizontal className="h-5 w-5" strokeWidth={2} />
        <span className="text-lg font-medium">Sort By</span>
      </div>
      <Select
        value={selectedSortOption || "last_updated"}
        onValueChange={updateSortOption}
      >
        <SelectTrigger>
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
