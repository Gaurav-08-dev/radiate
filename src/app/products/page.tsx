import React, { Suspense } from "react";
import { getCollectionBySlug } from "@/wix-api/collections";
import { getWixServerClient } from "@/lib/wix-client.server";
import Loading from "./loading";
import FiltersSectionComponent from "./FiltersSection";
import ProductGridUnit from "@/components/ProductGridUnit";
import { queryProducts } from "@/wix-api/products";
import { notFound } from "next/navigation";
import PaginationBar from "@/components/PaginationBar";

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { page?: string };
}

export default async function Page({
  params: { slug },
  searchParams: { page = "1" },
}: PageProps) {
  const pageSize = 12;
  const pageNumber = parseInt(page);
  const collection = await getCollectionBySlug(
    getWixServerClient(),
    "all-products",
  );

  const products = await queryProducts(getWixServerClient(), {
    collectionIds: collection?._id ? collection._id : undefined,
    limit: pageSize,
    skip: (pageNumber - 1) * pageSize,
  });

  if (!products.length) notFound();

  if (pageNumber > (products.totalPages || 1)) notFound();

  return (
    <div className="flex gap-8 p-10">
      <FiltersSectionComponent className="max-h-fit w-1/5" />
      <div className="flex flex-col">
        <h1 className="mb-6 text-2xl font-serif text-gray-600">Showing all products</h1>
        <Suspense fallback={<Loading />} key={pageNumber}>
          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products?.items?.map((product) => (
              <ProductGridUnit product={product} key={product._id} />
            ))}
          </div>
        <PaginationBar
          currentPage={pageNumber}
          totalPages={products.totalPages || 1}
        />
        </Suspense>
      </div>
    </div>
  );
}
