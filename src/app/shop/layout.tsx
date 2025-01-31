import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections } from "@/wix-api/collections";
import FiltersSectionComponent from "./FiltersSection";

export default async function Layout({children}: {children: React.ReactNode}){
    const collections = await getCollections(getWixServerClient());
    
    return <FiltersSectionComponent collections={collections}>{children}</FiltersSectionComponent>;
}