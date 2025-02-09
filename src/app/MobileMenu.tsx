"use client";

import { collections } from "@wix/stores";
import { members } from "@wix/members";
import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.svg";
import { twConfig } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import UserButton from "@/components/UserButton";
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

  const [isOpen, setIsOpen] = useState(false);

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
        className="absolute left-0 top-0 z-50 p-2 hover:bg-transparent lg:hidden"
      >
        <MenuIcon size={30} />
      </button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="border-none outline-none w-full bg-[#500769] text-white">
          <SheetHeader className="relative flex items-center justify-between px-11">
            <Link href="/" className="absolute left-[-17px] top-[-16px]">
              <SheetTitle className="flex items-center gap-2">
                <Image
                  src={logo}
                  alt="Radiate Logo Diamond"
                  className="h-10 w-10 object-contain"
                />
                <span className="font-playfair-display text-white">
                  RADIATE
                </span>
              </SheetTitle>
            </Link>
          </SheetHeader>
          <div className="flex flex-col items-center space-y-10 px-11 py-10">
            <ul className="space-y-5 text-center text-lg">
              {collections?.map((collection) => (
                <li key={collection._id}>
                  <Link
                    className="font-semibold hover:underline"
                    href={`/shop?collection=${collection._id}`}
                  >
                    {collection.name?.split("-")?.[0]}
                  </Link>
                </li>
              ))}
            </ul>
            <UserButton loggedInMember={loggedInMember || null} />
            
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
