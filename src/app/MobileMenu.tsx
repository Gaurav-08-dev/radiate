"use client";

import { collections } from "@wix/stores";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { cn, twConfig } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { playfair, montserrat } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import floatingCandleIcon from "../assets/mobilenavico/floating-candle-icon.png";
import giftingComboIcon from "../assets/mobilenavico/gifitng-combo-icon.png";
import pillarCandleIcon from "../assets/mobilenavico/pillar-candle-icon.png";
import scentedCandleIcon from "../assets/mobilenavico/scented-candles-icon.png";

import floralAromaticIcon from "../assets/mobilenavico/floral-aromatic-icon.png";
import fruityCitrusIcon from "../assets/mobilenavico/fruity-citrus-icon.png";
import woodyAmberIcon from "../assets/mobilenavico/woody-amber-icon.png";
import uniqueBlendsIcon from "../assets/mobilenavico/unique-blends-icon.png";
import sweetGourmandIcon from "../assets/mobilenavico/sweet-gourmand-icon.png";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { debounce } from "lodash";
import { queryProducts } from "@/wix-api/products";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { products } from "@wix/stores";
import WixImage from "@/components/WixImage";
import { AddToCartButton } from "@/components/AddToCartButton";

interface MobileMenuProps {
  className?: string;
  collections?: collections.Collection[];
  featuredProducts?: products.Product[];
}

export function MobileMenu({ collections, featuredProducts }: MobileMenuProps) {
  const scentEmoji = {
    "floral&aromatic": floralAromaticIcon,
    "sweet&gourmand": sweetGourmandIcon,
    "woody&amber": woodyAmberIcon,
    "fruity&citrus": fruityCitrusIcon,
    uniqueblends: uniqueBlendsIcon,
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<string[]>([
    // "shop",
    // "scent",
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<products.Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsLoading(false);
        setHasSearched(false);
        return;
      }

      setHasSearched(true);
      const { items: products } = await queryProducts(wixBrowserClient, {
        search: query,
        limit: 6,
      });

      setSearchResults(products);
      setIsLoading(false);
    }, 300),
    [],
  );

  // Handle input change
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsLoading(true);
    debouncedSearch(query);
  };

  const resetSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    setIsOpen(false);
  };

  const sheetContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > parseInt(twConfig.theme.screens.lg)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (isOpen && sheetContentRef.current) {
      sheetContentRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        title="Menu"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-transparent lg:hidden"
      >
        {/* absolute left-0 top-0 z-50 */}
        {/* <MenuIcon size={30} className="text-white"/>
         */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
          className="text-white"
        >
          <line x1="4" y1="12" x2="18" y2="12" />
          <line x1="4" y1="6" x2="25" y2="6" />
          <line x1="4" y1="18" x2="10" y2="18" />
        </svg>
      </button>
      {/* isOpen */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          ref={sheetContentRef}
          tabIndex={-1} // Make it focusable but not in tab order
          side="left"
          className="w-[85%] max-w-md overflow-y-auto rounded-none bg-[#F7F2FA] shadow-xl outline-none"
        >
          <SheetHeader className="relative flex w-full items-start">
            <div className="relative min-w-[95%]">
              <input
                type="search"
                placeholder="Search"
                autoFocus={false}
                value={searchQuery}
                onChange={handleSearchInput}
                className="h-8 w-full rounded-full bg-white/80 py-2 pl-4 text-sm outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              <svg
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </SheetHeader>
          <div className="scrollbar-hide mt-4 flex max-h-[90%] flex-col items-start space-y-5 overflow-y-auto [&::-webkit-scrollbar]:hidden">
            {searchQuery.trim() ? (
              <div className="w-full">
                {isLoading ? (
                  <div className="flex w-full justify-center py-4">
                    <div className="flex gap-1">
                      <div className="h-1.5 w-1.5 animate-[bounce_0.5s_infinite] rounded-full bg-[#500769] [animation-delay:-0.1s]" />
                      <div className="h-1.5 w-1.5 animate-[bounce_0.5s_infinite] rounded-full bg-[#500769] [animation-delay:-0.2s]" />
                      <div className="h-1.5 w-1.5 animate-[bounce_0.5s_infinite] rounded-full bg-[#500769] [animation-delay:-0.3s]" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid auto-rows-auto grid-cols-1 gap-4">
                      {searchResults.length === 0 && hasSearched ? (
                        <div className="flex flex-col gap-4">
                          <div className="text-center text-gray-500">
                            No products found
                          </div>

                          {featuredProducts && featuredProducts.length > 0 && (
                            <div className="mt-4 flex flex-col gap-4">
                              <h3
                                className={cn(
                                  playfair.className,
                                  "mb-4 text-center text-sm font-medium uppercase",
                                )}
                              >
                                Trending Now
                              </h3>
                              <div className="grid grid-cols-1 gap-4">
                                {featuredProducts
                                  .slice(0, 4)
                                  .map((product: products.Product) => (
                                    <div
                                      key={product?._id}
                                      className="flex gap-4 border-b pb-3"
                                    >
                                      <WixImage
                                        mediaIdentifier={
                                          product?.media?.mainMedia?.image?.url
                                        }
                                        alt={product?.name}
                                        width={80}
                                        height={80}
                                        className="h-auto w-[100px] rounded-none object-cover"
                                      />

                                      <div className="flex flex-col justify-between gap-2">
                                        <div className="flex flex-col gap-2">
                                          <Link
                                            href={`/products/${product?.slug}`}
                                            className={`${playfair.className} line-clamp-2 text-xs font-medium`}
                                            onClick={resetSearch}
                                          >
                                            {product?.name}
                                          </Link>
                                          <div
                                            className="text-xs font-normal text-[#5F5F5F]"
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                product?.additionalInfoSections?.find(
                                                  (section) =>
                                                    section?.title?.toLowerCase() ===
                                                    "subtitle",
                                                )?.description || "",
                                            }}
                                          />
                                        </div>
                                        <div className="text-xs font-medium">
                                          {product?.price?.formatted?.price}
                                        </div>
                                        <AddToCartButton
                                          variant="default"
                                          size="sm"
                                          className="w-[10%] rounded-none bg-[#500769] px-2 text-xs hover:bg-[#500769]/90"
                                          product={product}
                                          quantity={1}
                                          disabled={!product?.stock?.inStock}
                                          buttonText={
                                            product?.stock?.inStock
                                              ? "Add to my bag"
                                              : "Out of stock"
                                          }
                                        />
                                      </div>
                                    </div>
                                  ))}
                              </div>
                              <Link
                                href="/shop"
                                className="w-fit p-2 text-sm mt-4 ml-[27%] border border-purple-600 font-medium text-purple-600 hover:text-purple-800"
                                onClick={resetSearch}
                              >
                                Explore all products
                              </Link>
                            </div>
                          )}
                        </div>
                      ) : (
                        searchResults?.map((result: any, index) => (
                          <div
                            key={result?._id + index}
                            className="cursor-pointer rounded-md p-2 hover:bg-accent"
                          >
                            <div className="flex gap-4">
                              <WixImage
                                mediaIdentifier={
                                  result.media.mainMedia.image?.url
                                }
                                alt={result.brand}
                                width={120}
                                height={100}
                                className="h-auto rounded-none object-cover"
                              />
                              <div className="flex flex-col justify-between gap-4">
                                <Link
                                  href={`/products/${result.slug}`}
                                  className="flex flex-col"
                                  onClick={resetSearch}
                                >
                                  <div className="line-clamp-2 text-ellipsis font-medium">
                                    {result.name}
                                  </div>
                                </Link>
                                {/* <div className="text-sm text-gray-600">
                                    {result.productOptions?.length > 0 && 
                                      `${result.productOptions[0]?.choices?.length || 0} variants`}
                                  </div> */}
                                <div className="flex flex-col gap-2">
                                  <div className="font-medium">
                                    Rs {result.price?.price}
                                  </div>
                                  <AddToCartButton
                                    // selectedOptions={selectedOptions}
                                    variant="default"
                                    size="sm"
                                    className="w-[20%] rounded-none bg-[#500769] px-2 text-xs hover:bg-[#500769]/90 sm:text-xs lg:w-full"
                                    product={result}
                                    quantity={1}
                                    disabled={!result?.stock?.inStock}
                                    buttonText={
                                      result?.stock?.inStock
                                        ? "Add to my bag"
                                        : "Out of stock"
                                    }
                                  />
                                </div>
                              </div>
                            </div>
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
            ) : (
              <Accordion
                type="multiple"
                value={openAccordions}
                onValueChange={setOpenAccordions}
                className="w-full"
              >
                <AccordionItem value="shop" className="border-b-0">
                  <AccordionTrigger
                    className={cn(
                      playfair.className,
                      "pt-0 text-sm hover:no-underline",
                    )}
                  >
                    Shop
                  </AccordionTrigger>
                  <AccordionContent className={cn(montserrat.className)}>
                    <div className="flex flex-col space-y-4 text-[#5F5F5F]">
                      <Link
                        href="/shop?collection=79f1e1c4-9d44-8a1a-ebcc-3c840d3b4d37"
                        className="flex items-center gap-2"
                      >
                        <Image
                          src={scentedCandleIcon}
                          alt="Scented Candle"
                          width={20}
                          height={20}
                        />
                        <span className="h-5 w-fit font-medium">
                          Scented Candles
                        </span>
                      </Link>
                      <Link
                        href="/shop?collection=dd036eb5-7484-5053-e35e-d3fc046f6417"
                        className="flex items-center gap-2"
                      >
                        <Image
                          src={pillarCandleIcon}
                          alt="Pillar Candle"
                          width={20}
                          height={20}
                        />
                        <span className="h-5 w-fit font-medium">
                          Pillar Candles
                        </span>
                      </Link>
                      <Link
                        href="/shop?collection=e8752ab7-08e0-39a7-5fc8-88df885512b7"
                        className="flex items-center gap-2"
                      >
                        <Image
                          src={giftingComboIcon}
                          alt="Gifting Combo"
                          width={20}
                          height={20}
                        />
                        <span className="h-5 w-fit font-medium">
                          Gifting Combos
                        </span>
                      </Link>
                      <Link
                        href="/shop?collection=e47a30b0-abed-082b-89e5-771ea279deae"
                        className="flex items-center gap-2"
                      >
                        <Image
                          src={floatingCandleIcon}
                          alt="Floating Candle"
                          width={20}
                          height={20}
                        />
                        <span className="h-5 w-fit font-medium">
                          Floating Candles
                        </span>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <div className="py-0">
                  <Link
                    href="/shop?collection=2398b8e1-88a1-93c4-2323-9a74d09770f8"
                    className={cn(playfair.className, "text-sm font-medium")}
                  >
                    Best-sellers
                  </Link>
                </div>

                <AccordionItem value="scent" className="border-b-0">
                  <AccordionTrigger
                    className={cn(
                      playfair.className,
                      "text-sm hover:no-underline",
                    )}
                  >
                    Shop by scent
                  </AccordionTrigger>
                  <AccordionContent className={cn(montserrat.className)}>
                    <div className="flex flex-col space-y-4 text-[#5F5F5F]">
                      {collections?.map((collection) => (
                        <Link
                          href={`/shop?collection=${collection._id}`}
                          className="flex items-center gap-2 font-medium"
                          key={collection._id}
                        >
                          <Image
                            src={
                              scentEmoji[
                                collection.name
                                  ?.split("-")?.[0]
                                  ?.replace(/\s+/g, "")
                                  .toLowerCase() as keyof typeof scentEmoji
                              ]
                            }
                            alt={collection.name ?? ""}
                            width={20}
                            height={20}
                          />
                          {collection.name
                            ?.split("-")?.[0]
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
          {!searchQuery.trim() && (
            <div className="flex flex-col items-start space-y-3 pt-4 text-sm font-medium">
              <div
                className={cn(
                  playfair.className,
                  "flex flex-col space-y-3 text-sm font-medium",
                )}
              >
                <Link href="/faq">FAQs</Link>
                <Link href="/return-refund-policy">
                  Return & shipping policy
                </Link>
                <Link href="/about-us">About us</Link>
                <Link href="#contact">Contact us</Link>
              </div>

              <div className="flex gap-4 pt-4">
                <Link
                  href="https://www.instagram.com/letsradiate.in/#"
                  className="text-gray-800 hover:text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
                <Link
                  href="https://youtube.com/@letsradiate-in"
                  className="text-gray-800 hover:text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </Link>
                <Link
                  href="https://facebook.com"
                  className="text-gray-800 hover:text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
