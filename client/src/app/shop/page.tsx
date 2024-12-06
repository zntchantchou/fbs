"use client";
import { useGetProductsQuery } from "@/state/api";
import Header from "../(components)/Header";
import ProductCard from "../(components)/shop/ProductCard/ProductCard";

function Shop() {
  const { data: products, isLoading: isLoadingProducts } =
    useGetProductsQuery();
  if (isLoadingProducts) return <div>loading...</div>;
  return (
    <>
      <Header name="All Basses" />
      {/* GRID */}
      <div className="w-full flex justify-center py-6">
        <div className="sm:w-[90%] md:w-[80%] lg:w-[60%] max-w-[100%] grid gap-4 grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))]">
          {products
            ? products.map((p) => <ProductCard key={p.id} product={p} />)
            : null}
        </div>
      </div>
    </>
  );
}

export default Shop;
