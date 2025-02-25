"use client";

import { useSearchParams, useRouter } from "next/navigation";
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
import {
  CollectionGroup,
  formatCategoryTitle,
  organizeCollections,
} from "@/lib/utils";
import { useState } from "react";

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
  const groupedCollections = organizeCollections(collections);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [optimisticFilters, setOptimisticFilters] = useOptimistic({
    collection: searchParams.getAll("collection") || [],
    sort: searchParams.get("sort") || "last_updated",
  });

  const [isPending, startTransition] = useTransition();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    <main className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-10 relative">
      {/* Mobile filter toggle button - smaller and right-aligned */}
      <div className="flex justify-end md:hidden mb-4">
        <button 
          title="Open Filters"
          type="button"
          className="flex items-center gap-1.5 text-xs font-medium p-1.5 border rounded-md"
          onClick={() => setIsFilterOpen(true)}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} />
          <span>Filter & Sort</span>
        </button>
      </div>

      {/* Mobile filter overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsFilterOpen(false)}
      />

      {/* Sidebar for filters */}
      <aside
        data-pending={isPending ? "" : undefined}
        className={`fixed md:static top-0 right-0 h-full md:h-auto z-50 bg-white md:bg-transparent
                   w-4/5 max-w-xs md:w-1/5 md:max-w-none overflow-auto
                   transition-transform duration-300 ease-in-out rounded-l-2xl
                   ${isFilterOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
                   md:sticky md:left-0 md:top-10`}
      >
        <div className="w-full md:w-64 space-y-5 md:space-y-6 p-5 md:p-0">
          {/* Mobile close button */}
          <div className="flex justify-between items-center md:hidden">
            <h2 className="font-semibold text-lg">Filters & Sort</h2>
            <button 
              title="Close Filters" 
              type="button" 
              onClick={() => setIsFilterOpen(false)} 
              className="p-1"
            >
              <X className="h-6 w-6 text-gray-500" strokeWidth={2} />
            </button>
          </div>
          
          <SortFilter
            selectedSortOption={optimisticFilters?.sort}
            updateSortOption={(sortOption) =>
              updateFilters({ sort: sortOption })
            }
          />
          <CollectionsFilter
            // @ts-expect-error
            collections={groupedCollections}
            selectedCollectionIds={optimisticFilters?.collection}
            updateCollectionIds={(collectionIds) => {
              updateFilters({ collection: collectionIds });
            }}
          />
        </div>
      </aside>
      <div className="w-full md:flex-1">{children}</div>
    </main>
  );
}

interface CollectionsFilterProps {
  collections: CollectionGroup[];
  selectedCollectionIds?: string[];
  updateCollectionIds: (collectionIds: string[]) => void;
  availability?: string[] | null;
  updateAvailability: (availability: string[] | null) => void;
}
function CollectionsFilter({
  collections,
  selectedCollectionIds,
  updateCollectionIds,
}: CollectionsFilterProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-4">
      <div className="space-y-3 md:space-y-3">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="text-base md:text-lg font-medium">Collections</div>
        </div>
        {collections.map((group) => (
          <div key={group.header} className="space-y-2 md:space-y-2">
            <h3 className="text-xs md:text-sm font-medium text-gray-500">
              {formatCategoryTitle(group.header)}
            </h3>
            <ul className="space-y-2 md:space-y-1.5" key={group?.header}>
              {group.collections.map((collection) => {
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
                        {collection.name?.split(/[-]/)?.[0]}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SortFilterProps {
  selectedSortOption: string | undefined;
  updateSortOption: (sortOption: ProductSort) => void;
}
function SortFilter({ selectedSortOption, updateSortOption }: SortFilterProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <div className="flex items-center gap-3 text-base md:text-lg">
        <SlidersHorizontal className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
        <span className="font-medium">Sort By</span>
      </div>
      <Select
        value={selectedSortOption || "last_updated"}
        onValueChange={updateSortOption}
        defaultValue="last_updated"
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
