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
      <header className="sticky top-0 z-50 hidden w-full lg:block">
        <div className="flex h-16 items-center justify-between bg-[#500769] px-11">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-12 w-12">
              <Image
                src={logo}
                alt="Radiate Logo Diamond"
                fill
                className="object-contain"
              />
            </div>
            <span
              className={`text-3xl text-white ${playfairDisplayt.className}`}
            >
              RADIATE
            </span>
          </Link>
          <MainNavigation
            collections={collections || []}
            customerFavorites={customerFavorites || []}
          />
          <div className="flex items-center space-x-4">
            <SearchField className="max-w-96" />
            <UserButton
              className="text-white outline-none"
              loggedInMember={loggedInMember}
            />
            <ShoppingCartButton initialData={cart} />
          </div>
        </div>
      </header>
      <Suspense>
        <MobileMenu collections={collections} loggedInMember={loggedInMember} />
      </Suspense>
    </>
  );
}
