import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { ShoppingCartButton } from "@/components/ShoppingCartButton";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import UserButton from "./UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import MainNavigation from "@/app/MainNavigation";
import SearchField from "@/components/SearchField";
import {
  getCollectionsForHeader,
  getCustomerFavorites,
} from "@/wix-api/collections";
import { MobileMenu } from "@/app/MobileMenu";
import { Suspense } from "react";
import { playfairDisplayt } from "@/app/layout";

export async function SiteHeader() {
  const wixClient = getWixServerClient();
  const [cart, loggedInMember, collections, customerFavorites] =
    await Promise.all([
      getCart(wixClient),
      getLoggedInMember(wixClient),
      getCollectionsForHeader(wixClient),
      getCustomerFavorites(wixClient),
    ]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div className="flex h-16 items-center justify-between bg-[#500769] px-2 lg:px-11">
          <div className="flex items-center space-x-1 lg:hidden">
            <Suspense>
              <MobileMenu
                collections={collections}
                loggedInMember={loggedInMember}
              />
            </Suspense>
            <SearchField className="w-auto" />
          </div>
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 lg:h-12 lg:w-12">
              <Image
                src={logo}
                alt="Radiate Logo Diamond"
                fill
                className="object-contain"
              />
            </div>
            <span
              className={`font-semibold lg:font-normal text-xl text-white lg:text-3xl ${playfairDisplayt.className}`}
            >
              RADIATE
            </span>
          </Link>
          <div className="hidden lg:block">
            <MainNavigation
              collections={collections || []}
              customerFavorites={customerFavorites || []}
            />
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <SearchField className="hidden max-w-96 lg:block" />
            <UserButton
              className="text-white outline-none pt-[3px]"
              loggedInMember={loggedInMember}
            />
            <ShoppingCartButton initialData={cart} />
          </div>
        </div>
      </header>
    </>
  );
}
