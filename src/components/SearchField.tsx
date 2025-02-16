"use client";

import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useState, useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { queryProducts } from "@/wix-api/products";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { products } from "@wix/stores";
import WixImage from "./WixImage";
import Link from "next/link";
import {debounce} from "lodash";
import { cn } from "@/lib/utils";


interface SearchFieldProps {
  className?: string;
  limit?: number;
}

export default function SearchField({
  limit = 6,
  className,
}: SearchFieldProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<products.Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const resetSearch = () => {
    setSearchResults([]);
    setHasSearched(false);
    setIsSearchOpen(false);
  };

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      setHasSearched(true);
      const { items: products } = await queryProducts(wixBrowserClient, {
        search: searchQuery,
        limit: limit,
      });

      setSearchResults(products);
      setIsLoading(false);
    }, 300),
    [limit]
  );

  // Handle input change instead of form submit
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setIsLoading(true);
    debouncedSearch(query);
  };


  return (
    <div className={cn("", className)}>
      <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <PopoverTrigger asChild>
          <button
          type="button"
          aria-label="Open search"
          className="text-white outline-none pt-[5px]"
        >
          <SearchIcon className="size-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={`rounded-none p-0 ${
          searchResults.length > 0 
            ? 'w-[300px] md:w-[600px] lg:w-[900px] min-h-[200px]' 
            : 'w-[300px] min-h-[100px]'
        }`}
        align="end"
        sideOffset={5}
      >
        <div className="p-4">
          <div className="">
            <Input
              name="search"
              type="text"
              placeholder="Search products..."
              className="relative border pe-10 w-full max-w-[300px]"
              autoFocus
              onChange={handleSearchInput}
            />
          </div>

          <div className={`mt-4 ${
            searchResults.length > 0 
              ? 'max-h-[400px] md:max-h-[600px]' 
              : 'max-h-[100px]'
            } overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2`}>
            {isLoading ? (
              <div className="absolute bottom-0 right-0 flex w-full justify-center py-4">
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 animate-[bounce_0.5s_infinite] rounded-full bg-[#500769] [animation-delay:-0.1s]" />
                  <div className="h-1.5 w-1.5 animate-[bounce_0.5s_infinite] rounded-full bg-[#500769] [animation-delay:-0.2s]" />
                  <div className="h-1.5 w-1.5 animate-[bounce_0.5s_infinite] rounded-full bg-[#500769] [animation-delay:-0.3s]" />
                </div>
              </div>
            ) : (
              <>
                <div className={`${
                  searchResults.length > 0 
                    ? 'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto' 
                    : ''
                }`}>
                  {searchResults.length === 0 && hasSearched ? (
                    <div className="text-center text-gray-500">
                      No products found
                    </div>
                  ) : (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    searchResults?.map((result: any) => (
                      <div
                        key={result.id}
                        className="cursor-pointer rounded-md p-2 hover:bg-accent"
                      >
                        <Link 
                          href={`/products/${result.slug}`} 
                          className="flex flex-col gap-2"
                          onClick={resetSearch}
                        >
                          <div className="flex flex-col gap-2">
                            <WixImage
                              mediaIdentifier={result.media.mainMedia.image?.url}
                              alt={result.brand}
                              width={250}
                              height={250}
                            className="object-cover w-full h-auto"
                          />
                          <div className="line-clamp-2 h-12 overflow-y-scroll text-ellipsis mt-2 no-scrollbar">
                            {result.name}
                          </div>
                        </div>
                        </Link>
                      </div>
                    ))
                  )}
                </div>
                
                {searchResults.length > 0 && (
                  <div className="mt-4 flex justify-center border-t pt-4">
                    <Link 
                      href="/shop" 
                      className="text-sm font-medium text-purple-600 hover:text-purple-800"
                      onClick={resetSearch}
                    >
                      View All Products →
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
    </div>
  );
}
