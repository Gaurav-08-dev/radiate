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
import { useRouter } from "next/navigation";

interface MainNavigationProps {
  collections?: collections.Collection[];
  className?: string;
  customerFavorites?: collections.Collection[];
}
const MainNavigation = ({ className, collections, customerFavorites }: MainNavigationProps) => {
  const router = useRouter();
  return (
    <NavigationMenu>
      <NavigationMenuList
        className={cn(
          "flex items-center justify-center gap-8 text-white",
          className,
        )}
      >
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onClick={() => {
              router.push("/shop");
            }}
            className="m-0 bg-transparent p-0 text-white hover:bg-transparent hover:text-white focus:bg-transparent"
          >
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="p-4">
              {collections?.map((collection) => (
                <li key={collection._id}>
                  <Link
                    href={`/shop?collection=${collection._id}`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start whitespace-nowrap hover:bg-[#500769]/40 capitalize",
                      )}
                    >
                      {collection.name?.split('-')?.[0]}
                    </NavigationMenuLink>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href={`/shop?collection=${customerFavorites?.[0]?._id}`} legacyBehavior passHref>
            <NavigationMenuLink>Customer Favorites</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="#contact" legacyBehavior passHref>
            <NavigationMenuLink>Contact Us</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about-us" legacyBehavior passHref>
            <NavigationMenuLink>About Us</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
