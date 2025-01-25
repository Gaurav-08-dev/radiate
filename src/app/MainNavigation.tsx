"use client";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { collections } from "@wix/stores";
import Link from "next/link";

const navigation = [
  {
    name: "Shop",
    href: "/products",
    childNav: [
      {
        name: " Scentend Candles",
        href: "/collections/scented-candles",
      },
      {
        name: " Designer Pillar Candles",
        href: "/collections/designer-pillar-candles",
      },
      {
        name: "Floating Candles",
        href: "/collections/floating-candles",
      },
      {
        name: "Gifting Combos",
        href: "/collections/gifting-combos",
      },
    ],
  },
  {
    name: "Best Sellers",
    href: "/collections/best-sellers",
  },
  {
    name: "Contact Us",
    href: "#contact",
  },
];
interface MainNavigationProps {
  collections?: collections.Collection[];
  className?: string;
}
const MainNavigation = ({ className }: MainNavigationProps) => {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="flex items-center justify-center gap-8 text-white">
        {navigation.map((item) =>
          item.childNav ? (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuTrigger className="focus:bg-transparent m-0 p-0 text-white bg-transparent hover:bg-transparent hover:text-white ">{item.name}</NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="p-4">
                  {item.childNav.map((child, index) => (
                    <li key={child.name + index}>
                      <Link href={child.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "w-full justify-start whitespace-nowrap hover:bg-[#500769]/40",
                          )}
                        >
                          {child.name}
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.name} >
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink>{item.name}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
