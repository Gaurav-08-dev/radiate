import React, { Suspense } from "react";
import { getWixServerClient } from "@/lib/wix-client.server";
import Loading from "./loading";
import ProductGridUnit from "@/components/ProductGridUnit";
import { ProductSort, queryProducts } from "@/wix-api/products";
import { notFound } from "next/navigation";
import PaginationBar from "@/components/PaginationBar";

interface PageProps {
  searchParams: {
    query?: string;
    collection?: string[];
    page?: string;
    sort?: ProductSort;
  };
}

export default async function Page({
  searchParams: { page = "1", collection: collectionIds, query, sort },
}: PageProps) {
  return (
    <div className="flex flex-col group-has-[[data-pending]]:animate-pulse">
      <Suspense fallback={<Loading />} key={`${page}-${query}`}>
        <Products
          collectionIds={collectionIds}
          page={parseInt(page)}
          sort={sort}
        />
      </Suspense>
    </div>
  );
}

interface ProductProps {
  page: number;
  collectionIds?: string[];
  sort?: ProductSort;
}
async function Products({ page, collectionIds, sort }: ProductProps) {
  const pageSize = 12;
  let products = await queryProducts(getWixServerClient(), {
    collectionIds: collectionIds?.length
      ? collectionIds
      : ["00000000-000000-000000-000000000001"],
    limit: pageSize,
    skip: (page - 1) * pageSize,
    sort: sort ? sort : undefined,
  });

  
  if (!products.length) notFound();

  if (page > (products.totalPages || 1)) notFound();

  return (
    <>
      <h1 className="mb-6 font-serif text-2xl text-gray-600">
        {collectionIds?.length
          ? `${products.totalCount} ${products.totalCount === 1 ? "product" : "products"} in collection`
          : `Showing all products`}
      </h1>
      <div className="flex h-full flex-col items-center justify-between gap-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {products?.items?.map((product) => (
            <ProductGridUnit
              product={product}
              key={product._id}
              width={280}
              height={250}
              className="h-[450px] w-[280px]"
            />
          ))}
        </div>
        <PaginationBar
          currentPage={page}
          totalPages={products.totalPages || 1}
        />
      </div>
    </>
  );
}
