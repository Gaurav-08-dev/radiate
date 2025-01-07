import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.svg";

const navigation = [
  { name: "SCENTED CANDLES", href: "/scented-candles" },
  { name: "PILLAR CANDLES", href: "/pillar-candles" },
  { name: "GIFTING COMBOS", href: "/gifting-combos" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#4B0082]">
      <div className="flex h-16 items-center justify-between px-11">
        <button 
          type="button"
          className="text-white h-10 w-10" 
          aria-label="Search"
        >
          <Search />
        </button>

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

        <div className="flex items-center space-x-4">
        <button 
          type="button"
          className="text-white h-10 w-10" 
          aria-label="User"
        >
          <User />
        </button>
        <button 
          type="button"
          className="text-white h-10 w-10" 
          aria-label="Shopping Cart"
        >
          <ShoppingCart />
        </button>
        </div>
      </div>

      <nav className="border-t border-white/20">
        <ul className="container flex items-center justify-center space-x-8 py-4">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-sm text-white hover:text-white/80"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
