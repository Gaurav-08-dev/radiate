import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import logo from "@/assets/logo.svg";
import { ShoppingCartButton } from "@/components/ShoppingCartButton";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import UserButton from "./UserButton";
import { getLoggedInMember } from "@/wix-api/members";

const navigation = [
  { name: "SCENTED CANDLES", href: "/scented-candles" },
  { name: "PILLAR CANDLES", href: "/pillar-candles" },
  { name: "GIFTING COMBOS", href: "/gifting-combos" },
  { name: "ABOUT US", href: "#about" },
  { name: "CONTACT", href: "/contact" },
];

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
          <span className="text-2xl font-bold text-white">RADIATE</span>
        </Link>

        <nav className="text-white">
          <ul className="container flex items-center justify-center space-x-8 py-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm hover:text-white-500/50"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
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
