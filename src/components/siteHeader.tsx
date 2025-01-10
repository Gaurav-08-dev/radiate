
import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.svg";
import { getCart } from "@/wix-api/cart";
const navigation = [
  { name: "SCENTED CANDLES", href: "/scented-candles" },
  { name: "PILLAR CANDLES", href: "/pillar-candles" },
  { name: "GIFTING COMBOS", href: "/gifting-combos" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];



export async function SiteHeader() {
  const cart = await getCart();
  const totalQuantity = cart?.lineItems?.reduce((acc: number, item: { quantity: number }) => acc + (item.quantity || 0), 0) || 0;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex h-16 items-center justify-between px-11  bg-[#500769]">
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
          className="text-white h-20 w-10 relative" 
          aria-label="Shopping Cart"
         
        >
          <ShoppingCart />
          {totalQuantity > 0 && <span className="absolute top-4 right-1 bg-[#FF9C46] text-[#500769] text-xs font-semibold rounded-full px-2 py-1">
            {totalQuantity}
          </span>}
        </button>
        </div>
      </div>

      <nav className=" bg-[#500769]/90 backdrop-blur-md">
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
