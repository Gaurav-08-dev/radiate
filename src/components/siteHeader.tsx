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
  getCollectionsByScent,
  getCollectionBySlug
} from "@/wix-api/collections";
import { MobileMenu } from "@/app/MobileMenu";
import { Suspense } from "react";
import { playfairDisplayt } from "@/app/layout";
import { queryProducts } from "@/wix-api/products";
import { cache } from "react";

// Create a single function to fetch all header data
const getHeaderData = cache(async () => {
  const wixClient = getWixServerClient();
  
  const [
    cart, 
    loggedInMember, 
    collections, 
    customerFavorites, 
    collectionsByScent, 
    customerFavoritesCollection
  ] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollectionsForHeader(wixClient),
    getCustomerFavorites(wixClient),
    getCollectionsByScent(wixClient),
    getCollectionBySlug(wixClient, "customer-favourites"),
  ]);
  
  const featuredProducts = customerFavoritesCollection?._id 
    ? await queryProducts(wixClient, {
        collectionIds: customerFavoritesCollection._id,
        limit: 6, // Limit to improve performance
      })
    : { items: [] };
    
  return {
    cart,
    loggedInMember,
    collections,
    customerFavorites,
    collectionsByScent,
    featuredProducts: featuredProducts.items
  };
});

export async function SiteHeader() {
  const {
    cart,
    loggedInMember,
    collections,
    customerFavorites,
    collectionsByScent,
    featuredProducts
  } = await getHeaderData();

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div className="flex h-16 items-center justify-between bg-[#500769] px-2 lg:px-11">
          <div className="flex items-center space-x-1 lg:hidden">
            <Suspense>
              <MobileMenu
                collections={collectionsByScent}
                featuredProducts={featuredProducts}
              />
            </Suspense>
            <SearchField className="w-auto" featuredProducts={featuredProducts} />
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
              className={`relative text-xl font-semibold text-white lg:text-3xl lg:font-normal ${playfairDisplayt.className}`}
            >
              RADIATE 
              <span className="absolute top-[-4px]  right-[-13px] md:top-[-7px] md:right-[-18px] bg-transparent text-white">
                &reg;
              </span>
            </span>
          </Link>
          <div className="hidden lg:block">
            <MainNavigation
              collections={collections || []}
              customerFavorites={customerFavorites || []}
            />
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <SearchField className="hidden max-w-96 lg:block" 
            featuredProducts={featuredProducts}
            />
            <UserButton
              className="pt-[3px] text-white outline-none"
              loggedInMember={loggedInMember}
            />
            <ShoppingCartButton initialData={cart} 
            featuredProducts={featuredProducts}
            />
          </div>
        </div>
      </header>
    </>
  );
}
