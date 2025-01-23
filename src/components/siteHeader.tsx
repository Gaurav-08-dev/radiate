import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import logo from "@/assets/logo.svg";
import { ShoppingCartButton } from "@/components/ShoppingCartButton";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import UserButton from "./UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import MainNavigation from "@/app/MainNavigation";



export async function SiteHeader() {
  
  const wixClient = getWixServerClient();
  const [cart, loggedInMember] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
  ]);


  return (
    <header className="sticky top-0 z-50 w-full">
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
          <span className="text-2xl text-white">RADIATE</span>
        </Link>

        <MainNavigation collections={[]} />
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="h-10 w-6 text-white"
            aria-label="Search"
          >
            <Search />
          </button>
          <UserButton
            className="text-white outline-none"
            loggedInMember={loggedInMember}
          />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}
