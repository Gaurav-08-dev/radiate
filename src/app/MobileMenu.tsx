"use client";

import { collections } from "@wix/stores";
import { members } from "@wix/members";
import { useEffect, useState } from "react";
import Link from "next/link";
import { twConfig } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
        className=" p-2 hover:bg-transparent lg:hidden"
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
      <Sheet open={true} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="rounded-tr rounded-br outline-none w-3/4 bg-[#F7F2FA] ">
          <SheetHeader className="relative flex items-center justify-between px-11">
          <div className="absolute left-0 top-[-2px]">
              <input
                type="search"
                placeholder="Scented candles"
                className="w-[260px] rounded-full bg-white/80 py-2 pl-4 text-sm outline-none" 
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700"
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
          <div className=" flex flex-col items-center space-y-10 px-11 py-10">
            
            
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
