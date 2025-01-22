"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, SlidersHorizontal } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { scents } from "@/constants/scents";

interface FilterOptions {
  candleType?: string[];
  scentFamily?: string[];
  mood?: string[];
  room?: string[];
  specialDays?: string[];
  availability?: string[];
}

const sortOptions = [
  { label: "Featured", value: "Featured" },
  { label: "Price: Low to High", value: "Price: Low to High" },
  { label: "Price: High to Low", value: "Price: High to Low" },
];

export default function FiltersSectionComponent({className}: {className?: string}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Featured");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterOptions>({});

  // Initialize filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const urlFilters: FilterOptions = {};

    // Parse URL params into filters
    params.forEach((value, key) => {
      if (value) {
        urlFilters[key as keyof FilterOptions] = value.split(",");
      }
    });

    setFilters(urlFilters);
    setValue(params.get("sortBy") || "Featured");
  }, [searchParams]);

  const updateFilters = (category: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters };

    if (!newFilters[category]) {
      newFilters[category] = [value];
    } else if (newFilters[category]?.includes(value)) {
      newFilters[category] = newFilters[category]?.filter((v) => v !== value);
      if (newFilters[category]?.length === 0) {
        delete newFilters[category];
      }
    } else {
      newFilters[category] = [...(newFilters[category] || []), value];
    }

    // Update URL
    const params = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, values]) => {
      if (values?.length) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
    setFilters(newFilters);
  };

  return (
    <div className={cn("flex gap-8 ", className)}>
      <div className="w-64 space-y-6">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 text-xl">
            <SlidersHorizontal className="h-5 w-5" strokeWidth={2} />
            <label className="block">Sort By</label>
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? sortOptions.find((option) => option.value === value)?.label
                  : "Select sort option..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {sortOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === option.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <FilterSection
          title="Candle Type"
          options={[
            "Signature Candles",
            "Scented Votive Candles",
            "Designer Pillars Candles",
            "Floating Candles",
          ]}
          selected={filters.candleType || []}
          onChange={(value) => updateFilters("candleType", value)}
        />
        <FilterSection
          title="Scent Family"
          options={scents.map((scent) => scent.name)}
          selected={filters.scentFamily || []}
          onChange={(value) => updateFilters("scentFamily", value)}
        />

        <FilterSection
          title="Mood"
          options={["Active & Happy", "Relaxing", "Romantic"]}
          selected={filters.mood || []}
          onChange={(value) => updateFilters("mood", value)}
        />
        <FilterSection
          title="Room/Location"
          options={["Study/Office","Bathroom", "Bedroom/Living Room", "Meditation"]}
          selected={filters.room || []}
          onChange={(value) => updateFilters("room", value)}
        />
        <FilterSection
          title="Special Days"
          options={["Valentine's", "Birthdays", "Anniversaries","Festivals"]}
          selected={filters.specialDays || []}
          onChange={(value) => updateFilters("specialDays", value)}
        />
        <FilterSection
          title="Availability"
          options={["In Stock", "Out of Stock"]}
          selected={filters.availability || []}
          onChange={(value) => updateFilters("availability", value)}
        />
        {/* Add other filter sections similarly */}
      </div>
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}

function FilterSection({
  title,
  options,
  selected,
  onChange,
}: FilterSectionProps) {
  return (
    <div>
      <h3 className="mb-2 font-medium">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
