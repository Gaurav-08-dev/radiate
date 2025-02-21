"use client";

import { collections } from "@wix/stores";
import { members } from "@wix/members";
import { useEffect, useState } from "react";
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

import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
interface MobileMenuProps {
  className?: string;
  collections?: collections.Collection[];
  loggedInMember?: members.Member | null;
}

export function MobileMenu({ collections, loggedInMember }: MobileMenuProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(true);

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
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="left"
          className="rounded-br rounded-tr bg-[#F7F2FA] outline-none"
        >
          <SheetHeader className="relative flex w-[91%] items-start">
            <div className="relative min-w-full">
              <input
                type="search"
                placeholder="Search"
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
          <div className="flex flex-col items-start space-y-10 px-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="shop">
                <AccordionTrigger className={cn(playfair.className, "text-sm hover:no-underline")}>
                  Shop
                </AccordionTrigger>
                <AccordionContent className={cn(montserrat.className)}>
                  <div className="flex flex-col space-y-4">
                    <Link
                      href="/shop/scented-candles"
                      className="flex items-center gap-2"
                    >
                      <span className="h-5 w-5">🕯️</span> Scented Candles
                    </Link>
                    <Link
                      href="/shop/pillar-candles"
                      className="flex items-center gap-2"
                    >
                      <span className="h-5 w-5">🕯️</span> Pillar Candles
                    </Link>
                    <Link
                      href="/shop/gifting-combos"
                      className="flex items-center gap-2"
                    >
                      <span className="h-5 w-5">🎁</span> Gifting Combos
                    </Link>
                    <Link
                      href="/shop/floating-candles"
                      className="flex items-center gap-2"
                    >
                      <span className="h-5 w-5">🕯️</span> Floating Candles
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <div className="py-4">
                <Link
                  href="/best-sellers"
                  className={cn(playfair.className, "text-sm font-medium")}
                >
                  Best-sellers
                </Link>
              </div>

              <AccordionItem value="scent">
                <AccordionTrigger className={cn(playfair.className, "text-sm hover:no-underline")}>
                  Shop by scent
                </AccordionTrigger>
                <AccordionContent className={cn(montserrat.className)}>
                  <div className="flex flex-col space-y-4">
                    <Link
                      href="/scent/floral-aromatic"
                      className="flex items-center gap-2"
                    >
                      <span className="h-5 w-5">🌸</span> Floral & Aromatic
                    </Link>
                    <Link
                      href="/scent/sweet-gourmand"
                      className="flex items-center gap-2"
                    >
                      <span className="h-5 w-5">🍬</span> Sweet & Gourmand
                    </Link>
                    <Link
                      href="/scent/woody-amber"
                      className="flex items-center gap-2"
                    >
                      <span className="h-5 w-5">🌳</span> Woody & Amber
                    </Link>
                    <Link
                      href="/scent/fruity-citrus"
                      className="flex items-center gap-2"
                    >
                      <span className="h-5 w-5">🍊</span> Fruity & Citrus
                    </Link>
                    <Link
                      href="/scent/unique-blends"
                      className="flex items-center gap-2"
                    >
                      <span className="h-5 w-5">🌿</span> Unique Blends
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className={cn(playfair.className, "flex flex-col space-y-6 text-sm font-medium")}>
              <Link href="/faqs">FAQs</Link>
              <Link href="/shipping">Return & shipping policy</Link>
              <Link href="/about">About us</Link>
              <Link href="/contact">Contact us</Link>
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href="https://instagram.com"
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
                href="https://youtube.com"
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
        </SheetContent>
      </Sheet>
    </>
  );
}
