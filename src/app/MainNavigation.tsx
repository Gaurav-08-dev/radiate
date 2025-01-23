"use client";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { collections } from "@wix/stores";
import Link from "next/link";

const navigation = [
  { name: "Shop", href: "/products" },
  // { name: "Gifting Combos", href: "/products?gifting-combos" },
  // { name: "About Us", href: "#about" },
  // { name: "Contact", href: "#contact" },
];
interface MainNavigationProps {
  collections?: collections.Collection[];
  className?: string;
}
const MainNavigation = ({ className }: MainNavigationProps) => {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="flex items-center justify-center gap-8 text-white">
        {/* {collections.map((collection) => (
          <NavigationMenuItem key={collection.id}>
            
          </NavigationMenuItem>
        ))} */}

        {navigation.map((item) => (
          <NavigationMenuItem key={item.name}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink>{item.name}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
