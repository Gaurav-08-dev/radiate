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


  const collection = await getCollectionBySlug(
    getWixServerClient(),
    "all-products",
  );
  if (!collection?._id) notFound();

  return (
      <Suspense fallback={<Loading />} key={page}>
    <div className="flex gap-8 p-10">
        <FiltersSectionComponent className="max-h-fit w-1/5" />
        <div className="flex flex-col">
          <h1 className="mb-6 font-serif text-2xl text-gray-600">
            Showing all products
          </h1>
          <Products
            collectionId={collection?._id || ""}
            page={parseInt(page)}
          />
        </div>
    </div>
      </Suspense>
  );
}

interface ProductProps {
  collectionId: string;
  page: number;
}
async function Products({ collectionId, page }: ProductProps) {
  const pageSize = 12;

  const products = await queryProducts(getWixServerClient(), {
    collectionIds: collectionId ? collectionId : undefined,
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });

  if (!products.length) notFound();

  if (page > (products.totalPages || 1)) notFound();
  return (
    <div className="flex h-full flex-col items-center justify-between">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.items?.map((product) => (
          <ProductGridUnit product={product} key={product._id} />
        ))}
      </div>
      <PaginationBar currentPage={page} totalPages={products.totalPages || 1} />
    </div>
  );
}
